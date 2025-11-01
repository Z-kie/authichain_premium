
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { SubscriptionTier } from '@/lib/types';

// Helper function to retry database operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 2,
  delayMs: number = 100
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      console.log(`[Signup] Attempt ${attempt + 1} failed:`, error.message);
      
      // Don't retry on validation errors
      if (error.code === 'P2002') {
        throw error;
      }
      
      // Wait before retrying (except on last attempt)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs * (attempt + 1)));
      }
    }
  }
  
  throw lastError;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError: any) {
      console.error('[Signup] Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body', details: parseError.message },
        { status: 400 }
      );
    }

    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      username, 
      walletAddress, 
      subscriptionTier,
      acceptTerms 
    } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      console.error('Missing required fields:', { email: !!email, password: !!password, firstName: !!firstName, lastName: !!lastName });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('[Signup] Attempt for email:', email, 'with tier:', subscriptionTier);

    // Check if user already exists with retry logic
    let existingUser;
    try {
      existingUser = await retryOperation(() => 
        prisma.user.findUnique({ where: { email } })
      );

      if (existingUser) {
        console.log('[Signup] User already exists:', email);
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }
    } catch (findError: any) {
      console.error('[Signup] Error checking existing user:', findError);
      console.error('[Signup] Error code:', findError.code);
      console.error('[Signup] Error meta:', findError.meta);
      return NextResponse.json(
        { error: 'Database connection failed', details: findError.message },
        { status: 500 }
      );
    }

    // Check username availability if provided (with retry)
    if (username) {
      try {
        const existingUsername = await retryOperation(() =>
          prisma.user.findUnique({ where: { username } })
        );

        if (existingUsername) {
          console.log('[Signup] Username already taken:', username);
          return NextResponse.json(
            { error: 'Username already taken' },
            { status: 400 }
          );
        }
      } catch (usernameError: any) {
        console.error('[Signup] Error checking username:', usernameError);
        return NextResponse.json(
          { error: 'Database connection failed', details: usernameError.message },
          { status: 500 }
        );
      }
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
      console.log('Password hashed successfully');
    } catch (hashError: any) {
      console.error('Failed to hash password:', hashError);
      return NextResponse.json(
        { error: 'Failed to hash password', details: hashError.message },
        { status: 500 }
      );
    }

    // Determine subscription tier - use EXPLORER as default instead of BASIC
    const finalTier = subscriptionTier || SubscriptionTier.EXPLORER;
    console.log('[Signup] Creating user with tier:', finalTier);

    // Create user with retry logic
    let user;
    try {
      user = await retryOperation(() =>
        prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            username: username || null,
            walletAddress: walletAddress || null,
            subscriptionTier: finalTier,
            acceptTerms: acceptTerms || false,
          }
        })
      );
      console.log('[Signup] User created successfully:', user.id);
    } catch (createError: any) {
      console.error('[Signup] Failed to create user:', createError);
      console.error('[Signup] Error details:', {
        message: createError.message,
        code: createError.code,
        meta: createError.meta
      });
      return NextResponse.json(
        { error: 'Failed to create user', details: createError.message },
        { status: 500 }
      );
    }

    // Initialize usage record for the current month (with retry)
    try {
      const now = new Date();
      await retryOperation(() =>
        prisma.usageRecord.create({
          data: {
            userId: user.id,
            action: 'NFT_UPLOAD',
            count: 0,
            month: now.getMonth() + 1,
            year: now.getFullYear(),
          }
        })
      );
      console.log('[Signup] Usage record created successfully');
    } catch (usageError: any) {
      console.error('[Signup] Failed to create usage record:', usageError);
      // Don't fail the signup if usage record creation fails
      // The user is already created at this point
      console.warn('[Signup] Continuing despite usage record error');
    }

    const duration = Date.now() - startTime;
    console.log('[Signup] Completed successfully for:', email, `(${duration}ms)`);

    return NextResponse.json({ 
      message: 'User created successfully',
      requiresPayment: finalTier !== SubscriptionTier.EXPLORER && finalTier !== SubscriptionTier.BASIC,
      tier: finalTier
    });

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error('[Signup] Unexpected error:', error);
    console.error('[Signup] Error type:', error.constructor.name);
    console.error('[Signup] Error code:', error.code);
    console.error('[Signup] Duration before error:', duration, 'ms');
    
    // Check if it's a database connection error
    const isConnectionError = error.message?.includes('connection') || 
                              error.message?.includes('timeout') ||
                              error.code?.startsWith('P10');
    
    return NextResponse.json(
      { 
        error: isConnectionError ? 'Database connection failed' : 'Internal server error', 
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.code : undefined
      },
      { status: 500 }
    );
  }
}
// Deployment timestamp: 1761795500
// Updated: Wed Oct 30 2025 - Fixed serverless connection pooling + retry logic
