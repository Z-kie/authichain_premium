
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMarketingData() {
  try {
    console.log('🌱 Seeding marketing data...');

    // Create promotional campaigns
    const launchCampaign = await prisma.promotionalCampaign.upsert({
      where: { name: 'Launch Week Specials' },
      update: {},
      create: {
        name: 'Launch Week Specials',
        type: 'launch_special',
        status: 'ACTIVE',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        targetMetrics: {
          signups: 500,
          revenue: 50000,
          conversionRate: 15
        },
        actualMetrics: {
          signups: 127,
          revenue: 12840,
          conversionRate: 18.2
        },
        configuration: {
          bonusValue: 15947,
          slotsRemaining: 373,
          urgencyMessage: "Limited to first 500 creators",
          packages: {
            CREATOR: { value: 2997, originalPrice: 29 },
            PRO: { value: 5497, originalPrice: 79 },
            ENTERPRISE: { value: 15947, originalPrice: 299 }
          }
        }
      }
    });

    // Create affiliate campaign
    const affiliateCampaign = await prisma.promotionalCampaign.upsert({
      where: { name: 'Affiliate Program Launch' },
      update: {},
      create: {
        name: 'Affiliate Program Launch',
        type: 'affiliate_promo',
        status: 'ACTIVE',
        startDate: new Date(),
        targetMetrics: {
          affiliateSignups: 200,
          totalCommissions: 25000
        },
        actualMetrics: {
          affiliateSignups: 89,
          totalCommissions: 8420
        },
        configuration: {
          commissionRates: {
            BRONZE: 25,
            SILVER: 30,
            GOLD: 35,
            PLATINUM: 40
          },
          tierRequirements: {
            SILVER: 1000,
            GOLD: 5000,
            PLATINUM: 10000
          }
        }
      }
    });

    // Create sample marketing leads
    const sampleLeads = [
      {
        email: 'creator@example.com',
        firstName: 'Alex',
        lastName: 'Creator',
        source: 'organic',
        campaign: 'launch-week',
        interests: ['NFT Creation', 'Digital Art', 'Marketing'],
        leadScore: 85,
        lifecycleStage: 'QUALIFIED'
      },
      {
        email: 'artist@example.com', 
        firstName: 'Jordan',
        lastName: 'Artist',
        source: 'social-media',
        campaign: 'free-resources',
        interests: ['Digital Art', 'Community Building'],
        leadScore: 72,
        lifecycleStage: 'LEAD'
      },
      {
        email: 'collector@example.com',
        firstName: 'Sam',
        lastName: 'Collector', 
        source: 'referral',
        campaign: 'affiliate',
        interests: ['Collecting', 'Investing', 'Authentication'],
        leadScore: 91,
        lifecycleStage: 'CUSTOMER'
      }
    ];

    for (const leadData of sampleLeads) {
      await prisma.marketingLead.upsert({
        where: { email: leadData.email },
        update: leadData,
        create: {
          ...leadData,
          status: 'ACTIVE',
          touchCount: Math.floor(Math.random() * 5) + 1,
          lastCampaign: leadData.campaign,
          lastSource: leadData.source,
          totalEngagements: Math.floor(Math.random() * 10) + 1,
          averageEngagementScore: Math.random() * 10,
          lastEngagementDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        }
      });
    }

    // Create sample marketing events
    const eventTypes = [
      'LEAD_CAPTURED', 'EMAIL_OPENED', 'EMAIL_CLICKED', 'PAGE_VIEWED',
      'SIGNUP_COMPLETED', 'SUBSCRIPTION_CREATED', 'NFT_MINTED', 'REFERRAL_CONVERTED'
    ];

    for (let i = 0; i < 50; i++) {
      const randomLead = sampleLeads[Math.floor(Math.random() * sampleLeads.length)];
      const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      await prisma.marketingEvent.create({
        data: {
          email: randomLead.email,
          event: randomEvent,
          campaign: randomLead.campaign,
          source: randomLead.source,
          value: Math.random() * 100,
          subscriptionTier: Math.random() > 0.7 ? 'PRO' : Math.random() > 0.5 ? 'CREATOR' : null,
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: 'Mozilla/5.0 (compatible; AuthiChain/1.0)',
            ip: `192.168.1.${Math.floor(Math.random() * 255)}`
          },
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date in last 30 days
        }
      });
    }

    // Create sample lead magnet downloads
    const leadMagnets = [
      { id: 'nft-success-guide', title: 'NFT Creator Success Guide 2025' },
      { id: 'authentication-checklist', title: 'NFT Authentication Checklist' },
      { id: 'email-templates', title: 'NFT Marketing Email Templates' },
      { id: 'pricing-calculator', title: 'NFT Pricing Calculator & Guide' }
    ];

    for (const lead of sampleLeads) {
      // Each lead downloads 1-3 magnets
      const downloadCount = Math.floor(Math.random() * 3) + 1;
      const shuffledMagnets = leadMagnets.sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < downloadCount; i++) {
        const magnet = shuffledMagnets[i];
        await prisma.leadMagnetDownload.create({
          data: {
            email: lead.email,
            magnetId: magnet.id,
            magnetTitle: magnet.title,
            downloadUrl: `/lead-magnets/${magnet.id}.pdf`,
            campaign: lead.campaign,
            source: lead.source,
            ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
            userAgent: 'Mozilla/5.0 (compatible; AuthiChain/1.0)',
            createdAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000)
          }
        });
      }
    }

    // Create sample campaign interactions
    for (let i = 0; i < 100; i++) {
      const randomLead = sampleLeads[Math.floor(Math.random() * sampleLeads.length)];
      const actions = ['view', 'click', 'conversion', 'dismiss'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      await prisma.campaignInteraction.create({
        data: {
          campaignId: Math.random() > 0.5 ? launchCampaign.id : affiliateCampaign.id,
          email: randomLead.email,
          action: randomAction,
          value: randomAction === 'conversion' ? Math.random() * 300 : 0,
          metadata: {
            page: Math.random() > 0.5 ? '/launch-specials' : '/pricing',
            deviceType: Math.random() > 0.6 ? 'mobile' : 'desktop',
            source: randomLead.source
          },
          ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
          userAgent: 'Mozilla/5.0 (compatible; AuthiChain/1.0)',
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        }
      });
    }

    console.log('✅ Marketing data seeded successfully!');
    console.log(`📊 Created campaigns: ${launchCampaign.name}, ${affiliateCampaign.name}`);
    console.log(`👥 Created ${sampleLeads.length} sample leads`);
    console.log(`📧 Created 50 marketing events`);
    console.log(`💾 Created lead magnet downloads`);
    console.log(`🎯 Created 100 campaign interactions`);

  } catch (error) {
    console.error('❌ Error seeding marketing data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedMarketingData()
    .then(() => {
      console.log('🌱 Marketing data seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Marketing data seeding failed:', error);
      process.exit(1);
    });
}

export { seedMarketingData };
