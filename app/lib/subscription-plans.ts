
import { SubscriptionTier, SubscriptionPlan } from './types';

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  // ========================================
  // New Googlix-based tiers (Active)
  // ========================================
  [SubscriptionTier.EXPLORER]: {
    tier: SubscriptionTier.EXPLORER,
    name: 'Explorer',
    price: 0,
    nfts_per_month: 0,
    features: [
      'Browse unlimited NFTs',
      'Basic authentication verification',
      'View seller profiles',
      '5 free authenticity checks/month',
      'Community forum access (read-only)',
      'Basic educational resources'
    ]
  },
  [SubscriptionTier.CREATOR]: {
    tier: SubscriptionTier.CREATOR,
    name: 'Creator',
    price: 29,
    nfts_per_month: 50,
    features: [
      'Mint up to 50 NFTs/month',
      'Advanced authentication tools',
      '50 authenticity verifications/month',
      'Custom storefront page',
      'Basic analytics dashboard',
      '5% platform fee on sales',
      'Email support',
      'Creator community access'
    ],
    stripePriceId: process.env.STRIPE_CREATOR_PRICE_ID || process.env.STRIPE_CREATOR_MONTHLY_PRICE_ID
  },
  [SubscriptionTier.PRO]: {
    tier: SubscriptionTier.PRO,
    name: 'Pro',
    price: 79,
    nfts_per_month: 250,
    features: [
      'Mint up to 250 NFTs/month',
      'Unlimited authenticity verifications',
      'Advanced analytics & insights',
      'Priority listing placement',
      'Custom branding & white-label options',
      '3% platform fee on sales',
      'API access (basic)',
      'Priority email support',
      'Escrow service included',
      'Multi-currency support'
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || process.env.STRIPE_PRO_MONTHLY_PRICE_ID
  },
  [SubscriptionTier.ENTERPRISE]: {
    tier: SubscriptionTier.ENTERPRISE,
    name: 'Enterprise',
    price: 299,
    nfts_per_month: -1, // Unlimited
    features: [
      'Unlimited NFT minting',
      'Dedicated account manager',
      'Custom smart contract deployment',
      'White-label platform instance',
      '1.5% platform fee on sales',
      'Full API access with webhooks',
      'Priority phone & chat support',
      'Custom integration services',
      'Marketing automation suite',
      'Advanced fraud protection'
    ],
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID
  },
  [SubscriptionTier.AGENCY]: {
    tier: SubscriptionTier.AGENCY,
    name: 'Agency',
    price: 999,
    nfts_per_month: -1, // Unlimited
    features: [
      'Manage up to 25 client accounts',
      'Full white-label rights',
      'Agency dashboard & reporting',
      '0% platform fee on client sales',
      'Reseller profit margins (50%+)',
      'Agency training & certification',
      'Co-marketing opportunities',
      'Custom pricing for clients',
      'Revenue sharing program'
    ],
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID || process.env.STRIPE_AGENCY_MONTHLY_PRICE_ID
  },

  // ========================================
  // Legacy tiers (Deprecated - for backwards compatibility)
  // ========================================
  [SubscriptionTier.FREE]: {
    tier: SubscriptionTier.FREE,
    name: 'Free (Legacy)',
    price: 0,
    nfts_per_month: 3,
    features: [
      '3 NFTs per month',
      'Basic profile',
      'Community support',
      'Standard upload quality'
    ]
  },
  [SubscriptionTier.BASIC]: {
    tier: SubscriptionTier.BASIC,
    name: 'Basic (Legacy)',
    price: 0,
    nfts_per_month: 5,
    features: [
      '5 NFTs per month',
      'Basic profile',
      'Community support',
      'Standard upload quality'
    ]
  },
  [SubscriptionTier.BRAND]: {
    tier: SubscriptionTier.BRAND,
    name: 'Brand (Legacy)',
    price: 99,
    nfts_per_month: -1,
    features: [
      'Unlimited NFTs',
      'Verified badge',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'API access',
      'White-label options'
    ],
    stripePriceId: process.env.STRIPE_BRAND_PRICE_ID
  },
  [SubscriptionTier.CORPORATE]: {
    tier: SubscriptionTier.CORPORATE,
    name: 'Corporate (Legacy)',
    price: 999,
    nfts_per_month: -1,
    features: [
      'Everything in Enterprise',
      'Unlimited API calls',
      'Unlimited locations',
      'Dedicated account manager',
      'Custom development hours',
      'Advanced lab integrations',
      'Real-time compliance monitoring',
      'White-label mobile apps'
    ],
    stripePriceId: process.env.STRIPE_CORPORATE_PRICE_ID
  }
};

export const getSubscriptionPlan = (tier: SubscriptionTier): SubscriptionPlan => {
  return SUBSCRIPTION_PLANS[tier];
};

export const canUploadNft = (currentCount: number, tier: SubscriptionTier): boolean => {
  const plan = SUBSCRIPTION_PLANS[tier];
  return plan.nfts_per_month === -1 || currentCount < plan.nfts_per_month;
};
