

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { db } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock enterprise statistics (would be real data in production)
    const enterpriseStats = {
      totalRevenue: 847250,
      monthlyGrowth: 127,
      enterpriseClients: 34,
      apiCalls: 2847392,
      whitelabelDeployments: 12,
      dispensaryPartners: 156,
      enterpriseTiers: [
        {
          name: 'Enterprise',
          price: 499,
          clients: 34,
          revenue: 16966,
          features: ['Custom Branding', 'API Access', 'Priority Support', 'Advanced Analytics']
        },
        {
          name: 'Corporate',
          price: 999,
          clients: 18,
          revenue: 17982,
          features: ['White-Label', 'Multi-Location', 'Custom Integrations', 'Dedicated Manager']
        },
        {
          name: 'Product Chain',
          price: 2499,
          clients: 8,
          revenue: 19992,
          features: ['Full Platform License', 'Unlimited Locations', 'Custom Development', 'Revenue Share']
        }
      ],
      scalingOpportunities: [
        {
          title: 'Dispensary Partnerships',
          potential: '$2.4M ARR',
          status: 'Active',
          progress: 78,
          description: '156 dispensaries using AuthiChain for package authentication'
        },
        {
          title: 'White-Label Licensing',
          potential: '$1.8M ARR',
          status: 'Scaling',
          progress: 65,
          description: '12 white-label deployments generating recurring licensing fees'
        },
        {
          title: 'API Monetization',
          potential: '$960k ARR',
          status: 'Growing',
          progress: 42,
          description: '2.8M+ API calls/month from product tech ecosystem'
        },
        {
          title: 'Product Analytics',
          potential: '$720k ARR',
          status: 'New',
          progress: 25,
          description: 'Premium market intelligence and item analytics'
        }
      ]
    };

    return NextResponse.json(enterpriseStats);
  } catch (error) {
    console.error('Enterprise stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
