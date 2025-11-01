
import Stripe from 'stripe';
import { GoolixTier } from './googlix-pricing';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
});

// Googlix Tier to Stripe Price ID Mapping
// Updated to match existing Vercel environment variable names
export const STRIPE_PRICE_IDS: Record<string, { monthly: string; yearly: string }> = {
  [GoolixTier.CREATOR]: {
    monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY || 'price_1SKNnHBPgAq2ybOWrz7lekrZ',
    yearly: process.env.STRIPE_PRICE_STARTER_ANNUAL || 'price_1SKNnpBPgAq2ybOWqfeNLWEm',
  },
  [GoolixTier.PRO]: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_1SKNnIBPgAq2ybOWP8Fi7GC9',
    yearly: process.env.STRIPE_PRICE_PRO_ANNUAL || 'price_1SKNnpBPgAq2ybOWpVKdR5Zc',
  },
  [GoolixTier.ENTERPRISE]: {
    monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || 'price_1SKNnIBPgAq2ybOWniqFfRau',
    yearly: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL || 'price_1SKNnqBPgAq2ybOWFf1Qhmgt',
  },
  [GoolixTier.AGENCY]: {
    monthly: process.env.STRIPE_PRICE_AGENCY_MONTHLY || 'price_1SKNnJBPgAq2ybOWC8HCLD0E',
    yearly: process.env.STRIPE_PRICE_AGENCY_ANNUAL || 'price_1SKNnqBPgAq2ybOWY2ob8J5z',
  },
};

// Helper function to get price ID for a tier and billing period
export const getStripePriceId = (tier: GoolixTier, billingPeriod: 'month' | 'year'): string | null => {
  if (tier === GoolixTier.EXPLORER) {
    return null; // Free tier
  }
  
  const priceIds = STRIPE_PRICE_IDS[tier];
  if (!priceIds) return null;
  
  return billingPeriod === 'year' ? priceIds.yearly : priceIds.monthly;
};
