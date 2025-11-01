
// Googlix Marketing System for AuthiChain
// Based on proven $32k/month funnel system

export const GOOGLIX_FUNNELS = {
  // Main conversion funnel (Free → Pro → Brand)
  MAIN_FUNNEL: {
    name: 'AuthiChain Product NFT Revolution',
    pages: [
      'landing-page', // Hook: "Turn Product Packaging Into $1000+ NFTs"
      'value-reveal', // Product NFT market size + opportunities  
      'demo-scan',    // QR code scanning demo
      'pricing-offer',// Limited time Pro plan discount
      'upsell-brand', // Upgrade to Brand ($99/mo) for artist marketplace
      'confirmation'  // Success + onboarding
    ],
    conversionGoal: 'Pro subscription ($29/mo)',
    targetRevenue: '$10k/month'
  },
  
  // High-ticket affiliate funnel (similar to Legendary Marketer)
  AFFILIATE_FUNNEL: {
    name: 'Product NFT Business Opportunity',
    pages: [
      'opportunity-landing',  // "How Product Growers Make $50k+ from NFTs"
      'case-study',          // Real grower success stories
      'training-offer',      // Free Product NFT masterclass
      'high-ticket-offer',   // $497 Product NFT Business Course
      'payment-plan'         // 3-pay option
    ],
    conversionGoal: 'High-ticket course sales',
    commission: '$250 per sale'
  }
};

export const GOOGLIX_EMAIL_CAMPAIGNS = {
  // 7-day conversion sequence (based on $150k campaign)
  WELCOME_SEQUENCE: [
    {
      day: 0,
      subject: "🌿 Your Product NFT Empire Starts Here",
      hook: "Product + NFTs = $1000+ per scan?",
      cta: "Scan your first package",
      goal: "Get first QR scan"
    },
    {
      day: 1, 
      subject: "This Grower Made $25k from ONE Strain 🚀",
      hook: "Case study: Myles High #001 sold for 0.85 ETH",
      cta: "Upgrade to Pro for unlimited scans",
      goal: "Drive Pro upgrade"
    },
    {
      day: 3,
      subject: "WARNING: Product NFT Gold Rush is Starting",
      hook: "Only early adopters will capture this market",
      cta: "Secure your Brand license",
      goal: "Create urgency for Brand plan"
    },
    {
      day: 5,
      subject: "🔥 LAST CHANCE: 50% Off Pro Plan",
      hook: "This offer expires in 24 hours...",
      cta: "Claim 50% discount now",
      goal: "Final conversion push"
    },
    {
      day: 7,
      subject: "Your Product NFT Journey Continues...",
      hook: "Free users are missing out on $5k+ profits",
      cta: "See what Pro members earn",
      goal: "Re-engage free users"
    }
  ],

  // High-value nurture sequence
  EDUCATION_SEQUENCE: [
    {
      topic: "Product NFT Market Analysis",
      value: "Exclusive industry report: $2.1B opportunity",
      cta: "Download full report (Pro members only)"
    },
    {
      topic: "Strain Genetics & Rarity Scoring",
      value: "How to identify high-value genetic combinations",
      cta: "Access genetics database"
    },
    {
      topic: "Artist Marketplace Profits", 
      value: "Artists earning $500+ per package design",
      cta: "Join artist marketplace"
    }
  ]
};

export const GOOGLIX_CONVERSION_SYSTEM = {
  // Based on $32k/month success metrics
  TARGETS: {
    monthlyVisitors: 10000,
    landingPageConversion: 0.15, // 15% email capture
    emailToProConversion: 0.08,  // 8% email → Pro
    proToBrandConversion: 0.25,  // 25% Pro → Brand
    monthlyRevenue: 15000,       // $15k/month target
    affiliateCommissions: 5000   // $5k/month from referrals
  },

  TRACKING: {
    googleAnalytics: 'G-XXXXXXXXXX',
    facebookPixel: 'XXXXXXXXXXXXXX', 
    stripeWebhooks: true,
    customEvents: [
      'qr_scan_completed',
      'nft_created',
      'subscription_upgraded',
      'referral_signed_up'
    ]
  }
};

export const GOOGLIX_OFFERS = {
  // Irresistible lead magnets
  LEAD_MAGNETS: [
    {
      title: "Product NFT Profit Calculator",
      description: "Calculate your potential monthly earnings from product NFTs",
      deliveryMethod: "Instant access after email signup",
      conversionValue: "High - addresses immediate desire"
    },
    {
      title: "50 Highest-Value Product Strains for NFTs",
      description: "Exclusive list of most profitable items with rarity scores",
      deliveryMethod: "PDF + bonus video training",
      conversionValue: "Very High - specific valuable information"
    }
  ],

  // Conversion offers (like Googlix's winning offers)
  CONVERSION_OFFERS: [
    {
      name: "Pro Plan Launch Special",
      discount: "50% off first 3 months",
      urgency: "Limited to first 500 members",
      bonus: "Free Product NFT Masterclass ($297 value)",
      timeline: "7-day countdown"
    },
    {
      name: "Brand Plan VIP Access",
      benefit: "Artist marketplace early access",
      exclusive: "Invite-only for Pro members", 
      commission: "50% revenue share on referrals",
      timeline: "Monthly limited spots"
    }
  ]
};

// Revenue tracking (like Googlix's $150k results)
export function calculateGoogleixRevenue(metrics: any) {
  const {
    visitors,
    emailConversion,
    proConversion, 
    brandConversion,
    proPrice = 29,
    brandPrice = 99
  } = metrics;

  const emailSignups = visitors * emailConversion;
  const proSubscriptions = emailSignups * proConversion;  
  const brandSubscriptions = proSubscriptions * brandConversion;

  return {
    monthlyRevenue: (proSubscriptions * proPrice) + (brandSubscriptions * brandPrice),
    annualRevenue: ((proSubscriptions * proPrice) + (brandSubscriptions * brandPrice)) * 12,
    emailAssetValue: emailSignups * 5, // $5 per email industry standard
    totalBusinessValue: ((proSubscriptions * proPrice) + (brandSubscriptions * brandPrice)) * 12 * 3 // 3x annual revenue
  };
}
