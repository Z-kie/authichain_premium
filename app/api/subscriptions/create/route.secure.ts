/**
 * Subscription Creation API - Secured Version
 * 
 * This is an example of how to use the security middleware in API routes.
 * This file demonstrates the new security features - you can replace the original route.ts
 */

import { NextRequest } from 'next/server';
import { createSecureHandler } from '@/lib/security-middleware';
import { successResponse, errorResponse, ErrorType } from '@/lib/error-handler';
import { subscriptionCreateSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { getGoolixPlan, GoolixTier } from '@/lib/googlix-pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

/**
 * Create a new subscription
 * 
 * Security features:
 * - Rate limiting (subscription tier)
 * - Authentication required
 * - CSRF protection
 * - Input validation
 * - Centralized error handling
 */
export const POST = createSecureHandler(
  async (request, { data, session, rateLimitHeaders }) => {
    // Data is already validated by the middleware
    const { tier, billingPeriod } = data!;
    
    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session!.user.email },
    });
    
    if (!user) {
      return errorResponse(
        ErrorType.NOT_FOUND,
        'User not found'
      );
    }
    
    // Validate plan
    const plan = getGoolixPlan(tier as GoolixTier);
    if (!plan || plan.price === 0) {
      return errorResponse(
        ErrorType.VALIDATION,
        'Invalid plan tier or free tier does not require subscription'
      );
    }
    
    // Get or create Stripe customer
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
    
    // Get price ID
    const priceIdKey = `STRIPE_${tier.toUpperCase()}_${billingPeriod.toUpperCase()}_PRICE_ID`;
    const priceId = process.env[priceIdKey];
    
    if (!priceId) {
      return errorResponse(
        ErrorType.INTERNAL,
        'Subscription configuration error. Please contact support.'
      );
    }
    
    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
      metadata: { userId: user.id, tier },
      subscription_data: {
        metadata: { userId: user.id, tier },
      },
    });
    
    return successResponse(
      {
        sessionId: checkoutSession.id,
        url: checkoutSession.url,
      },
      'Checkout session created successfully'
    );
  },
  {
    requireAuth: true,
    rateLimit: 'subscription',
    csrfProtection: true,
    validationSchema: subscriptionCreateSchema,
  }
);
