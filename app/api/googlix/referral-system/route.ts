
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { db } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


// Referral system API based on Googlix high-ticket affiliate program
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's referral code and statistics
    const referralCode = await db.referralCode.findFirst({
      where: { userId: user.id },
      include: {
        referrals: {
          orderBy: { createdAt: 'desc' },
          take: 50
        }
      }
    });

    if (!referralCode) {
      return NextResponse.json(null);
    }

    // Calculate total earnings and format response
    const response = {
      code: referralCode.code,
      totalEarnings: referralCode.totalEarnings,
      usageCount: referralCode.usageCount,
      commission: referralCode.commission,
      isActive: referralCode.isActive,
      conversions: referralCode.referrals.map((referral: any) => ({
        id: referral.id,
        email: referral.convertedEmail,
        revenue: referral.revenue,
        commission: referral.commission,
        status: referral.status,
        createdAt: referral.createdAt.toISOString()
      }))
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Referral system GET error:', error);
    return NextResponse.json(
      { error: 'Failed to get referral data' },
      { status: 500 }
    );
  }
}

// Create new referral code
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user already has a referral code
    const existingCode = await db.referralCode.findFirst({
      where: { userId: user.id }
    });

    if (existingCode) {
      return NextResponse.json(
        { error: 'User already has a referral code' },
        { status: 400 }
      );
    }

    // Generate unique referral code
    const code = generateReferralCode(user.firstName || user.email);

    // Create referral code with Googlix-style 25% commission
    const newReferralCode = await db.referralCode.create({
      data: {
        code,
        userId: user.id,
        type: 'USER',
        commission: 0.25, // 25% commission like high-ticket programs
        isActive: true
      },
      include: {
        referrals: true
      }
    });

    const response = {
      code: newReferralCode.code,
      totalEarnings: 0,
      usageCount: 0,
      commission: newReferralCode.commission,
      isActive: newReferralCode.isActive,
      conversions: []
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Referral system POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create referral code' },
      { status: 500 }
    );
  }
}

// Process referral conversion (called when someone subscribes via referral link)
export async function PUT(request: NextRequest) {
  try {
    const { 
      referralCode, 
      convertedEmail, 
      subscriptionTier, 
      subscriptionAmount 
    } = await request.json();

    if (!referralCode || !convertedEmail || !subscriptionTier || !subscriptionAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the referral code
    const refCode = await db.referralCode.findUnique({
      where: { code: referralCode }
    });

    if (!refCode || !refCode.isActive) {
      return NextResponse.json(
        { error: 'Invalid or inactive referral code' },
        { status: 400 }
      );
    }

    // Calculate commission (25% like Googlix system)
    const commission = subscriptionAmount * refCode.commission;

    // Create referral conversion record
    const conversion = await db.referralConversion.create({
      data: {
        referralCodeId: refCode.id,
        convertedEmail,
        subscriptionTier,
        revenue: subscriptionAmount,
        commission,
        status: 'PENDING' // Will be marked as PAID during monthly payout
      }
    });

    // Update referral code statistics
    await db.referralCode.update({
      where: { id: refCode.id },
      data: {
        usageCount: { increment: 1 },
        totalEarnings: { increment: commission }
      }
    });

    // Track marketing event for analytics
    await db.marketingEvent.create({
      data: {
        email: convertedEmail,
        event: 'REFERRAL_CONVERSION',
        campaign: 'referral-program',
        source: 'referral',
        value: commission,
        subscriptionTier,
        metadata: {
          referralCode,
          originalRevenue: subscriptionAmount,
          commission,
          timestamp: new Date().toISOString()
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      commission,
      conversionId: conversion.id
    });

  } catch (error) {
    console.error('Referral conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to process referral conversion' },
      { status: 500 }
    );
  }
}

// Generate unique referral code
function generateReferralCode(name: string): string {
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 8);
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${cleanName}${randomSuffix}`;
}
