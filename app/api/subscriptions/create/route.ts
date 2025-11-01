
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { GOOGLIX_PLANS, getGoolixPlan, GoolixTier } from '@/lib/googlix-pricing';

export const dynamic = 'force-dynamic';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tier, billingPeriod = 'month' } = await request.json();

    // Validate tier
    const plan = getGoolixPlan(tier as GoolixTier);
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan tier' }, { status: 400 });
    }

    if (plan.price === 0) {
      return NextResponse.json({ error: 'Free tier does not require subscription' }, { status: 400 });
    }

    // Get or create Stripe customer
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Get the appropriate price ID from environment variables
    const priceIdKey = `STRIPE_${tier}_PRICE_ID`;
    const priceId = process.env[priceIdKey];

    if (!priceId) {
      console.error(`Missing Stripe price ID for tier: ${tier}`);
      return NextResponse.json(
        { error: 'Subscription configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
      metadata: {
        userId: user.id,
        tier: tier,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          tier: tier,
        },
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
