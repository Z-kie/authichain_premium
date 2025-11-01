
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { nftId, paymentMethod, amount, currency } = await request.json();

    // Mock NFT validation - replace with actual Prisma call when NFT model is ready
    const nftExists = true; // Mock validation
    
    if (!nftExists) {
      return NextResponse.json({ error: 'NFT not found' }, { status: 404 });
    }

    let paymentResult;

    if (paymentMethod === 'card') {
      // Get user for Stripe customer
      const user = await prisma.user.findUnique({
        where: { id: session.user.id }
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      let customerId = user.stripeCustomerId;
      
      // Create customer if doesn't exist
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          metadata: { userId: user.id },
        });
        
        customerId = customer.id;
        
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customerId }
        });
      }

      // Create Stripe checkout session for NFT purchase with automatic tax
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: `Product NFT #${nftId}`,
                description: 'Authentic product item NFT with verified genetics',
                metadata: { nftId, type: 'product_nft' }
              },
              unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        automatic_tax: {
          enabled: true,
        },
        success_url: `${process.env.NEXTAUTH_URL}/nft/${nftId}?payment=success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/marketplace?payment=canceled`,
        metadata: {
          nftId,
          userId: session.user.id,
          type: 'nft_purchase'
        },
      });

      paymentResult = {
        sessionId: checkoutSession.id,
        checkoutUrl: checkoutSession.url,
        paymentIntentId: null // Will be created after checkout completion
      };
    } else if (paymentMethod === 'crypto') {
      // Generate crypto payment address
      paymentResult = {
        paymentAddress: '0x1234567890123456789012345678901234567890',
        amount,
        currency,
        timeout: Date.now() + (30 * 60 * 1000) // 30 minutes
      };
    }

    // Mock transaction creation - replace with actual Prisma call when transaction model is ready
    const transaction = {
      id: `txn_${Date.now()}`,
      userId: session.user.id,
      nftId,
      amount,
      currency,
      paymentMethod,
      status: 'PENDING',
      metadata: paymentResult
    };

    return NextResponse.json({
      success: true,
      transactionId: transaction.id,
      paymentData: paymentResult
    });

  } catch (error) {
    console.error('NFT purchase error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate purchase' },
      { status: 500 }
    );
  }
}
