
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/prisma';
import { SubscriptionTier, SubscriptionStatus } from '@/lib/types';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      
      case 'invoice.finalized':
        await handleInvoiceFinalized(event.data.object);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      
      case 'payment_link.created':
        await handlePaymentLinkCreated(event.data.object);
        break;
      
      case 'quote.accepted':
        await handleQuoteAccepted(event.data.object);
        break;
      
      case 'quote.finalized':
        await handleQuoteFinalized(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: any) {
  const { userId, tier, type, nftId, originalPrice, originalCurrency } = session.metadata;
  
  if (type === 'nft_purchase') {
    // Handle NFT purchase
    console.log('Processing NFT purchase:', {
      userId,
      nftId,
      sessionId: session.id,
      amountTotal: session.amount_total,
      currency: session.currency,
      originalPrice,
      originalCurrency,
      customerId: session.customer,
      taxAmount: session.total_details?.amount_tax || 0,
      shippingAddress: session.shipping_details?.address,
      customerEmail: session.customer_details?.email
    });

    // Update user's Stripe customer ID if needed
    await db.user.update({
      where: { id: userId },
      data: {
        stripeCustomerId: session.customer
      }
    });

    // Log NFT purchase for business intelligence
    console.log('NFT purchase completed successfully:', {
      nftId,
      userId,
      purchaseAmount: session.amount_total,
      taxCalculated: session.automatic_tax?.enabled,
      taxAmount: session.total_details?.amount_tax || 0
    });

    // Here you could add logic to:
    // 1. Transfer NFT ownership to buyer's wallet
    // 2. Update NFT marketplace status
    // 3. Send confirmation emails
    // 4. Update analytics
    
  } else {
    // Handle subscription purchase
    await db.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: tier as SubscriptionTier,
        stripeCustomerId: session.customer
      }
    });

    await db.subscription.create({
      data: {
        userId,
        tier: tier as SubscriptionTier,
        status: SubscriptionStatus.ACTIVE,
        stripeSubscriptionId: session.subscription,
        stripePriceId: session.display_items?.[0]?.price?.id
      }
    });
  }
}

async function handlePaymentSucceeded(invoice: any) {
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
  
  await db.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: SubscriptionStatus.ACTIVE,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000)
    }
  });
}

async function handleSubscriptionUpdated(subscription: any) {
  await db.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status === 'active' ? SubscriptionStatus.ACTIVE : SubscriptionStatus.CANCELED,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end
    }
  });
}

async function handleSubscriptionDeleted(subscription: any) {
  const dbSubscription = await db.subscription.findFirst({
    where: { stripeSubscriptionId: subscription.id },
    include: { user: true }
  });

  if (dbSubscription) {
    await db.subscription.update({
      where: { id: dbSubscription.id },
      data: { status: SubscriptionStatus.CANCELED }
    });

    await db.user.update({
      where: { id: dbSubscription.userId },
      data: { subscriptionTier: SubscriptionTier.BASIC }
    });
  }
}

async function handleInvoiceFinalized(invoice: any) {
  console.log('Invoice finalized:', {
    invoiceId: invoice.id,
    customerId: invoice.customer,
    totalAmount: invoice.total,
    subtotalAmount: invoice.subtotal,
    taxAmount: invoice.tax || 0,
    currency: invoice.currency,
    automaticTax: invoice.automatic_tax
  });
  
  // Log tax information for compliance and reporting
  if (invoice.automatic_tax?.enabled && invoice.tax > 0) {
    console.log('Tax calculated automatically:', {
      taxAmount: invoice.tax,
      taxType: 'automatic',
      invoiceId: invoice.id
    });
  }
}

async function handlePaymentLinkCreated(paymentLink: any) {
  console.log('Payment link created:', {
    paymentLinkId: paymentLink.id,
    url: paymentLink.url,
    active: paymentLink.active,
    automaticTax: paymentLink.automatic_tax,
    metadata: paymentLink.metadata
  });
}

async function handleQuoteAccepted(quote: any) {
  console.log('Quote accepted:', {
    quoteId: quote.id,
    customerId: quote.customer,
    totalAmount: quote.amount_total,
    subtotalAmount: quote.amount_subtotal,
    taxAmount: quote.total_tax_amounts?.reduce((sum: number, tax: any) => sum + tax.amount, 0) || 0,
    currency: quote.currency,
    automaticTax: quote.automatic_tax
  });
  
  // Create invoice from accepted quote (Stripe does this automatically)
  // Log for business intelligence and tax reporting
  if (quote.automatic_tax?.enabled) {
    console.log('Quote with automatic tax accepted:', {
      quoteId: quote.id,
      taxCalculated: true
    });
  }
}

async function handleQuoteFinalized(quote: any) {
  console.log('Quote finalized:', {
    quoteId: quote.id,
    status: quote.status,
    hostedQuoteUrl: quote.hosted_quote_url,
    totalAmount: quote.amount_total,
    taxAmount: quote.total_tax_amounts?.reduce((sum: number, tax: any) => sum + tax.amount, 0) || 0,
    automaticTax: quote.automatic_tax
  });
}
