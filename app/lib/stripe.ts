
import Stripe from 'stripe';
import { GoolixTier } from './googlix-pricing';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
});

// ============================================
// AuthiChain Tier → Stripe Price ID Mapping
// ============================================
// All price IDs below are LIVE prices on acct_1SXIyEGqTruSqV8T
// Created 2026-03-10. Override via env vars for flexibility.
// ============================================

export const STRIPE_PRICE_IDS: Record<string, { monthly: string; yearly: string }> = {
  [GoolixTier.CREATOR]: {
    monthly: process.env.STRIPE_PRICE_CREATOR_MONTHLY || 'price_1T9aoZGqTruSqV8T2SGdXOpo',
    yearly: process.env.STRIPE_PRICE_CREATOR_ANNUAL || 'price_1T9aogGqTruSqV8TKEFwAGvH',
  },
  [GoolixTier.PRO]: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_1T9aouGqTruSqV8TEKCHR3xc',
    yearly: process.env.STRIPE_PRICE_PRO_ANNUAL || 'price_1T9aovGqTruSqV8Tv1ebVvQm',
  },
  [GoolixTier.ENTERPRISE]: {
    monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || 'price_1T9apFGqTruSqV8TLTGaNO7U',
    yearly: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL || 'price_1T9apHGqTruSqV8TxkeYQ0IX',
  },
  [GoolixTier.AGENCY]: {
    monthly: process.env.STRIPE_PRICE_AGENCY_MONTHLY || 'price_1T9apVGqTruSqV8T0EYpDuJt',
    yearly: process.env.STRIPE_PRICE_AGENCY_ANNUAL || 'price_1T9apWGqTruSqV8TR6KVb14i',
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
