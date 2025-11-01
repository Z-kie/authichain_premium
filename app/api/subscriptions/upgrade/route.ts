
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { getGoolixPlan, GoolixTier } from '@/lib/googlix-pricing';

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

    const { newTier } = await request.json();

    // Validate tier
    const newPlan = getGoolixPlan(newTier as GoolixTier);
    if (!newPlan) {
      return NextResponse.json({ error: 'Invalid plan tier' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentSubscription = user.subscriptions[0];

    // If no active subscription and trying to get a paid plan, create new subscription
    if (!currentSubscription && newPlan.price > 0) {
      const priceIdKey = `STRIPE_${newTier}_PRICE_ID`;
      const priceId = process.env[priceIdKey];

      if (!priceId) {
        return NextResponse.json(
          { error: 'Subscription configuration error' },
          { status: 500 }
        );
      }

      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          metadata: { userId: user.id },
        });
        customerId = customer.id;
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customerId },
        });
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.NEXTAUTH_URL}/dashboard/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
        metadata: { userId: user.id, tier: newTier },
        subscription_data: { metadata: { userId: user.id, tier: newTier } },
      });

      return NextResponse.json({
        sessionId: checkoutSession.id,
        url: checkoutSession.url,
      });
    }

    // Upgrade/downgrade existing subscription
    if (currentSubscription?.stripeSubscriptionId) {
      const stripeSubscription = await stripe.subscriptions.retrieve(
        currentSubscription.stripeSubscriptionId
      );

      const priceIdKey = `STRIPE_${newTier}_PRICE_ID`;
      const newPriceId = process.env[priceIdKey];

      if (!newPriceId) {
        return NextResponse.json(
          { error: 'Subscription configuration error' },
          { status: 500 }
        );
      }

      // Update subscription
      await stripe.subscriptions.update(currentSubscription.stripeSubscriptionId, {
        items: [
          {
            id: stripeSubscription.items.data[0].id,
            price: newPriceId,
          },
        ],
        proration_behavior: 'always_invoice',
      });

      // Update database
      await prisma.subscription.update({
        where: { id: currentSubscription.id },
        data: {
          tier: newTier,
          stripePriceId: newPriceId,
          updatedAt: new Date(),
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { subscriptionTier: newTier },
      });

      return NextResponse.json({
        success: true,
        message: 'Subscription upgraded successfully',
      });
    }

    return NextResponse.json({ error: 'Invalid subscription state' }, { status: 400 });
  } catch (error) {
    console.error('Subscription upgrade error:', error);
    return NextResponse.json(
      { error: 'Failed to upgrade subscription' },
      { status: 500 }
    );
  }
}
