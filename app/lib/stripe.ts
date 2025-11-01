
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
    monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY || 'price_1SNyVsBPgAq2ybOWeOkPSt6e', // $29/month
    yearly: process.env.STRIPE_PRICE_STARTER_ANNUAL || 'price_1SNyVsBPgAq2ybOWeOkPSt6e',
  },
  [GoolixTier.PRO]: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_1SNyVsBPgAq2ybOWcCbMozo9', // $79/month
    yearly: process.env.STRIPE_PRICE_PRO_ANNUAL || 'price_1SNyVsBPgAq2ybOWcCbMozo9',
  },
  [GoolixTier.ENTERPRISE]: {
    monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || 'price_1SNyWEBPgAq2ybOWeGgn8nL2', // $299/month
    yearly: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL || 'price_1SNyWEBPgAq2ybOWeGgn8nL2',
  },
  [GoolixTier.AGENCY]: {
    monthly: process.env.STRIPE_PRICE_AGENCY_MONTHLY || 'price_1SNyWIBPgAq2ybOWhRq1i9JY', // $999/month
    yearly: process.env.STRIPE_PRICE_AGENCY_ANNUAL || 'price_1SNyWIBPgAq2ybOWhRq1i9JY',
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
