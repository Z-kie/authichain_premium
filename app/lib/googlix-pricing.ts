/**
 * Googlix Integration - Subscription Plans & Pricing
 * Based on the comprehensive monetization strategy
 */

export enum GoolixTier {
  EXPLORER = 'EXPLORER',
  CREATOR = 'CREATOR',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
  AGENCY = 'AGENCY'
}

export interface GoolixBonus {
  name: string;
  description: string;
  value: number;
  icon: string;
}

export interface GoolixPlan {
  tier: GoolixTier;
  name: string;
  tagline: string;
  price: number;
  billingPeriod: 'month' | 'year';
  popular?: boolean;
  features: string[];
  limits: {
    nftsPerMonth: number; // -1 for unlimited
    verificationsPerMonth: number; // -1 for unlimited
    storageGB: number; // -1 for unlimited
    apiCalls?: number; // -1 for unlimited
    clientAccounts?: number; // For Agency tier
  };
  platformFee: number; // Percentage
  bonuses?: GoolixBonus[];
  launchBonusUsers?: number; // First X users get special bonuses
  stripePriceId?: string;
}

export const GOOGLIX_BONUSES: Record<string, GoolixBonus[]> = {
  CREATOR_LAUNCH_KIT: [
    {
      name: 'NFT Marketing Masterclass',
      description: '5 modules, 2 hours of expert training',
      value: 299,
      icon: '🎓'
    },
    {
      name: '10 Pre-designed NFT Templates',
      description: 'PSD/AI source files with commercial rights',
      value: 199,
      icon: '🎨'
    },
    {
      name: 'Email Campaign Swipes',
      description: '5 complete email sequences for your launch',
      value: 249,
      icon: '📧'
    },
    {
      name: 'Community Growth Playbook',
      description: 'Social media strategies and content calendar',
      value: 149,
      icon: '📱'
    },
    {
      name: 'Monthly Creator Mastermind',
      description: 'Live sessions with expert speakers',
      value: 97,
      icon: '🤝'
    }
  ],
  PRO_LAUNCH_BUNDLE: [
    {
      name: '6-Figure NFT Collection Blueprint',
      description: 'Complete collection planning & strategy course',
      value: 697,
      icon: '💎'
    },
    {
      name: 'Viral Marketing Strategies',
      description: 'Social media virality tactics & influencer partnerships',
      value: 497,
      icon: '🚀'
    },
    {
      name: 'Done-For-You Launch Campaign',
      description: 'Complete launch timeline with templates',
      value: 597,
      icon: '📊'
    },
    {
      name: '1:1 Strategy Call',
      description: '60-minute consultation with personalized action plan',
      value: 500,
      icon: '📞'
    },
    {
      name: 'Advanced Analytics Masterclass',
      description: 'Data interpretation & optimization strategies',
      value: 297,
      icon: '📈'
    },
    {
      name: 'Pro Community Access',
      description: 'Private Slack/Discord with weekly office hours',
      value: 197,
      icon: '👥'
    },
    {
      name: 'Commercial License',
      description: 'Resell templates & use for client projects',
      value: 697,
      icon: '📜'
    }
  ],
  ENTERPRISE_DOMINATION_SUITE: [
    {
      name: 'Million-Dollar Launch Secrets',
      description: 'High-stakes launch strategies & institutional partnerships',
      value: 1997,
      icon: '💰'
    },
    {
      name: 'Institutional Investor Playbook',
      description: 'Pitch decks, due diligence prep & compliance guidance',
      value: 1497,
      icon: '🏛️'
    },
    {
      name: 'Done-For-You Marketing Funnels',
      description: '5 pre-built funnels with landing pages & automation',
      value: 997,
      icon: '🎯'
    },
    {
      name: 'Quarterly Strategy Sessions',
      description: '90-minute calls with executive team (4x/year)',
      value: 2000,
      icon: '🎤'
    },
    {
      name: 'VIP Mastermind Community',
      description: 'Exclusive network with monthly founder calls',
      value: 997,
      icon: '👑'
    },
    {
      name: 'White-Label Reseller Rights',
      description: 'Rebrand platform with custom pricing & revenue sharing',
      value: 2499,
      icon: '🏷️'
    },
    {
      name: 'Priority Feature Requests',
      description: 'Direct product team access & roadmap influence',
      value: 1000,
      icon: '⚡'
    }
  ],
  AGENCY_EMPIRE_BUILDER: [
    {
      name: 'Agency Launch Playbook',
      description: 'Complete agency setup & operations guide',
      value: 2997,
      icon: '📚'
    },
    {
      name: 'Client Acquisition Strategies',
      description: 'Sales funnels, proposals & contract templates',
      value: 1997,
      icon: '🎣'
    },
    {
      name: 'Agency Mastermind Network',
      description: 'Exclusive partner events & co-marketing opportunities',
      value: 2997,
      icon: '🌐'
    },
    {
      name: 'Agency Directory Listing',
      description: 'Featured placement in AuthiChain partner directory',
      value: 1997,
      icon: '📍'
    },
    {
      name: 'Client Onboarding System',
      description: '10+ funnel templates with complete automation',
      value: 1997,
      icon: '🔄'
    }
  ]
};

export const GOOGLIX_PLANS: GoolixPlan[] = [
  {
    tier: GoolixTier.EXPLORER,
    name: 'Explorer',
    tagline: 'Perfect for NFT curious browsers',
    price: 0,
    billingPeriod: 'month',
    features: [
      'Browse unlimited NFTs',
      'Basic authentication verification',
      'View seller profiles',
      '5 free authenticity checks/month',
      'Community forum access (read-only)',
      'Basic educational resources'
    ],
    limits: {
      nftsPerMonth: 0,
      verificationsPerMonth: 5,
      storageGB: 0
    },
    platformFee: 0
  },
  {
    tier: GoolixTier.CREATOR,
    name: 'Creator',
    tagline: 'Launch your NFT career',
    price: 29,
    billingPeriod: 'month',
    popular: true,
    features: [
      '✅ All Explorer features',
      'Mint up to 50 NFTs/month',
      'Advanced authentication tools',
      '50 authenticity verifications/month',
      'Custom storefront page',
      'Basic analytics dashboard',
      '5% platform fee on sales',
      'Email support',
      'Creator community access'
    ],
    limits: {
      nftsPerMonth: 50,
      verificationsPerMonth: 50,
      storageGB: 5
    },
    platformFee: 5,
    bonuses: GOOGLIX_BONUSES.CREATOR_LAUNCH_KIT,
    launchBonusUsers: 500,
    stripePriceId: process.env.STRIPE_CREATOR_PRICE_ID
  },
  {
    tier: GoolixTier.PRO,
    name: 'Pro',
    tagline: 'Scale your NFT business',
    price: 79,
    billingPeriod: 'month',
    features: [
      '✅ All Creator features',
      'Mint up to 250 NFTs/month',
      'Unlimited authenticity verifications',
      'Advanced analytics & insights',
      'Priority listing placement',
      'Custom branding & white-label options',
      '3% platform fee on sales',
      'API access (basic)',
      'Priority email support',
      'Escrow service included',
      'Multi-currency support',
      'Promotional tools & campaigns'
    ],
    limits: {
      nftsPerMonth: 250,
      verificationsPerMonth: -1,
      storageGB: 50,
      apiCalls: 10000
    },
    platformFee: 3,
    bonuses: GOOGLIX_BONUSES.PRO_LAUNCH_BUNDLE,
    launchBonusUsers: 300,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID
  },
  {
    tier: GoolixTier.ENTERPRISE,
    name: 'Enterprise',
    tagline: 'For major brands & large collections',
    price: 299,
    billingPeriod: 'month',
    features: [
      '✅ All Pro features',
      'Unlimited NFT minting',
      'Dedicated account manager',
      'Custom smart contract deployment',
      'White-label platform instance',
      '1.5% platform fee on sales',
      'Full API access with webhooks',
      'Priority phone & chat support',
      'Custom integration services',
      'Marketing automation suite',
      'Advanced fraud protection',
      'Multi-signature wallet support',
      'Institutional-grade security',
      'Custom subdomain'
    ],
    limits: {
      nftsPerMonth: -1,
      verificationsPerMonth: -1,
      storageGB: -1,
      apiCalls: -1
    },
    platformFee: 1.5,
    bonuses: GOOGLIX_BONUSES.ENTERPRISE_DOMINATION_SUITE,
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID
  },
  {
    tier: GoolixTier.AGENCY,
    name: 'Agency',
    tagline: 'For marketing agencies & resellers',
    price: 999,
    billingPeriod: 'month',
    features: [
      '✅ All Enterprise features',
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
    limits: {
      nftsPerMonth: -1,
      verificationsPerMonth: -1,
      storageGB: -1,
      apiCalls: -1,
      clientAccounts: 25
    },
    platformFee: 0,
    bonuses: GOOGLIX_BONUSES.AGENCY_EMPIRE_BUILDER,
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID
  }
];

export const getGoolixPlan = (tier: GoolixTier): GoolixPlan | undefined => {
  return GOOGLIX_PLANS.find(plan => plan.tier === tier);
};

export const calculateBonusValue = (bonuses?: GoolixBonus[]): number => {
  if (!bonuses) return 0;
  return bonuses.reduce((total, bonus) => total + bonus.value, 0);
};

export const canMintNft = (currentCount: number, tier: GoolixTier): boolean => {
  const plan = getGoolixPlan(tier);
  if (!plan) return false;
  return plan.limits.nftsPerMonth === -1 || currentCount < plan.limits.nftsPerMonth;
};

export const getReferralCommission = (tier: GoolixTier): number => {
  const commissions: Record<GoolixTier, number> = {
    [GoolixTier.EXPLORER]: 0,
    [GoolixTier.CREATOR]: 10,
    [GoolixTier.PRO]: 25,
    [GoolixTier.ENTERPRISE]: 75,
    [GoolixTier.AGENCY]: 200
  };
  return commissions[tier];
};

export const getAffiliateCommissionRate = (tier: GoolixTier, isAgency: boolean = false): number => {
  if (tier === GoolixTier.AGENCY) {
    return 40; // 40% for Agency tier
  }
  return 30; // 30% for all other tiers
};
