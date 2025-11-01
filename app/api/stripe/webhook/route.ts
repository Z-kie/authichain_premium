
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { GoolixTier } from '@/lib/googlix-pricing';

export const dynamic = 'force-dynamic';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const tier = session.metadata?.tier as GoolixTier;

  if (!userId || !tier) {
    console.error('Missing metadata in checkout session');
    return;
  }

  const subscriptionId = session.subscription as string;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  await prisma.subscription.create({
    data: {
      userId,
      tier,
      status: 'ACTIVE',
      stripeSubscriptionId: subscriptionId,
      stripePriceId: subscription.items.data[0].price.id,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { subscriptionTier: tier },
  });

  // Check for launch bonuses eligibility
  await checkAndAwardLaunchBonuses(userId, tier);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;

  const tier = subscription.metadata?.tier as GoolixTier;

  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status === 'active' ? 'ACTIVE' : 'CANCELED',
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
    },
  });

  if (tier) {
    await prisma.user.update({
      where: { id: userId },
      data: { subscriptionTier: tier },
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: { status: 'CANCELED' },
  });

  const userId = subscription.metadata?.userId;
  if (userId) {
    await prisma.user.update({
      where: { id: userId },
      data: { subscriptionTier: 'EXPLORER' },
    });
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded for invoice:', invoice.id);
  // Additional logic for payment success (e.g., send receipt email)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed for invoice:', invoice.id);
  
  const subscriptionId = (invoice as any).subscription as string;
  if (subscriptionId) {
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: { status: 'PAST_DUE' },
    });
  }
}

async function checkAndAwardLaunchBonuses(userId: string, tier: GoolixTier) {
  // Get user signup number
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { signupNumber: true },
  });

  if (!user?.signupNumber) return;

  const bonuses = [];

  // Founder's Circle (First 100)
  if (user.signupNumber <= 100) {
    bonuses.push({
      userId,
      bonusType: 'FOUNDERS_CIRCLE',
      tier,
      bonusValue: 10000,
      resources: {
        discount: 0.5,
        founderBadge: true,
        genesisNFT: true,
        teamAccess: true,
      },
    });
  }

  // Launch Week Bonanza (First 500)
  if (user.signupNumber <= 500 && tier !== GoolixTier.EXPLORER) {
    bonuses.push({
      userId,
      bonusType: 'LAUNCH_WEEK_BONANZA',
      tier,
      bonusValue: 2497,
      resources: {
        freeMonths: 3,
        earlyAdopterBadge: true,
      },
    });
  }

  // Pioneer Program (First 2000)
  if (user.signupNumber <= 2000 && tier !== GoolixTier.EXPLORER) {
    bonuses.push({
      userId,
      bonusType: 'PIONEER_PROGRAM',
      tier,
      bonusValue: 997,
      resources: {
        freeMonths: 1,
        pioneerBadge: true,
      },
    });
  }

  // Create bonus records
  if (bonuses.length > 0) {
    await prisma.launchBonus.createMany({
      data: bonuses as any,
    });
  }
}
