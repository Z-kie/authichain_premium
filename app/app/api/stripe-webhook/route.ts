
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { SubscriptionTier, SubscriptionStatus } from '@/lib/types';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const { userId, tier } = session.metadata;

        if (session.mode === 'subscription' && userId && tier) {
          // Update user subscription tier
          await prisma.user.update({
            where: { id: userId },
            data: { subscriptionTier: tier as SubscriptionTier }
          });

          // Create subscription record
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          
          await prisma.subscription.create({
            data: {
              userId: userId,
              tier: tier as SubscriptionTier,
              status: SubscriptionStatus.ACTIVE,
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0].price.id,
              currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
              currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            }
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;
        
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status === 'active' ? SubscriptionStatus.ACTIVE : SubscriptionStatus.CANCELED,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          }
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        
        // Update subscription status
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: SubscriptionStatus.CANCELED }
        });

        // Downgrade user to basic tier
        const userSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
          include: { user: true }
        });

        if (userSubscription) {
          await prisma.user.update({
            where: { id: userSubscription.userId },
            data: { subscriptionTier: SubscriptionTier.BASIC }
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
