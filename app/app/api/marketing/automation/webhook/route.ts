
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const webhookSchema = z.object({
  event: z.string().min(1, 'Event is required'),
  email: z.string().email('Invalid email address'),
  userId: z.string().optional(),
  campaign: z.string().optional().default('general'),
  source: z.string().optional().default('webhook'),
  data: z.record(z.any()).optional().default({})
});

const supportedEvents = [
  'signup_completed',
  'subscription_created', 
  'subscription_upgraded',
  'subscription_cancelled',
  'nft_minted',
  'nft_sold',
  'referral_converted',
  'lead_captured',
  'page_viewed',
  'email_opened',
  'email_clicked',
  'trial_started',
  'trial_ended',
  'payment_failed'
];

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (in production, add proper verification)
    const signature = request.headers.get('x-authichain-signature');
    const expectedSignature = process.env.WEBHOOK_SECRET;
    
    if (process.env.NODE_ENV === 'production' && signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = webhookSchema.parse(body);

    // Validate event type
    if (!supportedEvents.includes(validatedData.event)) {
      return NextResponse.json(
        { error: 'Unsupported event type' },
        { status: 400 }
      );
    }

    // Process the event
    await processWebhookEvent(validatedData);

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully',
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid webhook data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function processWebhookEvent(data: z.infer<typeof webhookSchema>) {
  const { event, email, userId, campaign, source, data: eventData } = data;

  // Log the marketing event
  await prisma.marketingEvent.create({
    data: {
      email,
      event: event.toUpperCase(),
      campaign: campaign || 'general',
      source: source || 'webhook',
      value: eventData?.value || 0,
      subscriptionTier: eventData?.subscriptionTier,
      metadata: {
        userId,
        ...eventData,
        timestamp: new Date().toISOString(),
        source: 'webhook'
      }
    }
  });

  // Process specific event types
  switch (event) {
    case 'signup_completed':
      await handleSignupCompleted(email, eventData);
      break;
      
    case 'subscription_created':
      await handleSubscriptionCreated(email, eventData);
      break;
      
    case 'subscription_upgraded':
      await handleSubscriptionUpgraded(email, eventData);
      break;
      
    case 'nft_sold':
      await handleNFTSold(email, eventData);
      break;
      
    case 'referral_converted':
      await handleReferralConverted(email, eventData);
      break;
      
    case 'trial_ended':
      await handleTrialEnded(email, eventData);
      break;
  }
}

async function handleSignupCompleted(email: string, eventData: any) {
  // Update or create marketing lead
  await prisma.marketingLead.upsert({
    where: { email },
    update: {
      lastConversion: 'SIGNUP',
      lastConversionDate: new Date(),
      status: 'ACTIVE',
      touchCount: { increment: 1 }
    },
    create: {
      email,
      source: eventData?.source || 'organic',
      campaign: eventData?.campaign || 'signup',
      lastCampaign: eventData?.campaign || 'signup',
      lastSource: eventData?.source || 'organic',
      status: 'ACTIVE',
      touchCount: 1,
      lastConversion: 'SIGNUP',
      lastConversionDate: new Date(),
      tags: eventData?.interests || []
    }
  });

  // Trigger email automation sequences here
  console.log(`Triggering welcome email sequence for ${email}`);
}

async function handleSubscriptionCreated(email: string, eventData: any) {
  const revenue = eventData?.revenue || eventData?.amount || 0;
  const tier = eventData?.tier || eventData?.subscriptionTier || 'unknown';

  // Update marketing lead with conversion
  await prisma.marketingLead.upsert({
    where: { email },
    update: {
      lastConversion: 'SUBSCRIPTION',
      lastConversionValue: revenue,
      lastConversionDate: new Date(),
      status: 'CONVERTED',
      touchCount: { increment: 1 }
    },
    create: {
      email,
      source: eventData?.source || 'organic',
      campaign: eventData?.campaign || 'subscription',
      lastCampaign: eventData?.campaign || 'subscription',
      lastSource: eventData?.source || 'organic',
      status: 'CONVERTED',
      touchCount: 1,
      lastConversion: 'SUBSCRIPTION',
      lastConversionValue: revenue,
      lastConversionDate: new Date(),
      tags: [tier.toUpperCase()]
    }
  });

  // Trigger subscription welcome email
  console.log(`Triggering subscription welcome email for ${email} (${tier} plan)`);
}

async function handleSubscriptionUpgraded(email: string, eventData: any) {
  const newRevenue = eventData?.newRevenue || eventData?.amount || 0;
  const newTier = eventData?.newTier || eventData?.subscriptionTier || 'unknown';

  // Update marketing lead
  await prisma.marketingLead.upsert({
    where: { email },
    update: {
      lastConversion: 'UPGRADE',
      lastConversionValue: newRevenue,
      lastConversionDate: new Date(),
      touchCount: { increment: 1 }
    },
    create: {
      email,
      source: 'upgrade',
      campaign: 'upsell',
      lastCampaign: 'upsell',
      lastSource: 'upgrade',
      status: 'CONVERTED',
      touchCount: 1,
      lastConversion: 'UPGRADE',
      lastConversionValue: newRevenue,
      lastConversionDate: new Date(),
      tags: [newTier.toUpperCase()]
    }
  });

  console.log(`Triggering upgrade celebration email for ${email} (upgraded to ${newTier})`);
}

async function handleNFTSold(email: string, eventData: any) {
  const saleValue = eventData?.saleValue || eventData?.amount || 0;
  
  console.log(`NFT sold by ${email} for $${saleValue} - sending success email`);
}

async function handleReferralConverted(email: string, eventData: any) {
  const commission = eventData?.commission || 0;
  const referredEmail = eventData?.referredEmail || '';

  console.log(`Referral converted: ${email} earned $${commission} for referring ${referredEmail}`);
}

async function handleTrialEnded(email: string, eventData: any) {
  const converted = eventData?.converted || false;
  
  if (!converted) {
    console.log(`Trial ended without conversion for ${email} - triggering win-back sequence`);
  }
}

// GET endpoint for webhook testing
export async function GET() {
  return NextResponse.json({
    status: 'active',
    supportedEvents,
    webhook: {
      url: '/api/marketing/automation/webhook',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-authichain-signature': 'required_in_production'
      }
    },
    examples: {
      signup_completed: {
        event: 'signup_completed',
        email: 'user@example.com',
        campaign: 'launch-week',
        source: 'landing-page',
        data: {
          interests: ['NFT Creation', 'Digital Art'],
          referralCode: 'ABC123'
        }
      },
      subscription_created: {
        event: 'subscription_created',
        email: 'user@example.com',
        userId: 'user_123',
        campaign: 'pricing-page',
        data: {
          tier: 'PRO',
          revenue: 79,
          subscriptionId: 'sub_123'
        }
      }
    }
  });
}
