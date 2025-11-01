

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock API usage data (would be real data in production)
    const apiEndpoints = [
      {
        name: '/api/product/item-verify',
        description: 'Verify product item authenticity and genetics',
        calls: 847293,
        revenue: 169458,
        pricing: 0.20,
        category: 'Authentication'
      },
      {
        name: '/api/nft/mint',
        description: 'Create NFTs from product package scans',
        calls: 523847,
        revenue: 104769,
        pricing: 0.20,
        category: 'NFT Creation'
      },
      {
        name: '/api/lab/results',
        description: 'Access lab testing data and analytics',
        calls: 392847,
        revenue: 78569,
        pricing: 0.20,
        category: 'Lab Data'
      },
      {
        name: '/api/marketplace/search',
        description: 'Search product NFT marketplace',
        calls: 1847392,
        revenue: 18474,
        pricing: 0.01,
        category: 'Marketplace'
      },
      {
        name: '/api/analytics/insights',
        description: 'Product market analytics and trends',
        calls: 284739,
        revenue: 56948,
        pricing: 0.20,
        category: 'Analytics'
      }
    ];

    const apiClients = [
      {
        name: 'LeafTech Solutions',
        tier: 'Enterprise',
        calls: 2847392,
        revenue: 28474,
        status: 'Active'
      },
      {
        name: 'Product Analytics Pro',
        tier: 'Business',
        calls: 1293847,
        revenue: 12938,
        status: 'Active'
      },
      {
        name: 'GreenApp Mobile',
        tier: 'Developer',
        calls: 584729,
        revenue: 2924,
        status: 'Active'
      },
      {
        name: 'Dispensary Chain API',
        tier: 'Enterprise',
        calls: 3847293,
        revenue: 38473,
        status: 'Active'
      }
    ];

    const totalApiRevenue = apiEndpoints.reduce((sum, endpoint) => sum + endpoint.revenue, 0);
    const totalApiCalls = apiEndpoints.reduce((sum, endpoint) => sum + endpoint.calls, 0);

    return NextResponse.json({
      endpoints: apiEndpoints,
      clients: apiClients,
      totals: {
        revenue: totalApiRevenue,
        calls: totalApiCalls,
        monthlyProjection: totalApiRevenue * 12
      }
    });
  } catch (error) {
    console.error('API analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
