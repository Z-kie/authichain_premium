

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

    // Mock conversion funnel data
    const conversionFunnels = [
      {
        id: 'enterprise-sales',
        name: 'Enterprise Sales Funnel',
        description: 'MSO and dispensary chain lead conversion to enterprise contracts',
        visitors: 1247,
        conversions: 89,
        conversion_rate: 7.1,
        revenue: 2890000,
        optimization_score: 92,
        status: 'active'
      },
      {
        id: 'whitelabel-signup',
        name: 'White-Label Signup Funnel',
        description: 'Dispensary applications to white-label program activation',
        visitors: 3456,
        conversions: 156,
        conversion_rate: 4.5,
        revenue: 1456000,
        optimization_score: 87,
        status: 'testing'
      },
      {
        id: 'api-developer',
        name: 'API Developer Conversion',
        description: 'Developer signups to paid API tier conversions',
        visitors: 8901,
        conversions: 891,
        conversion_rate: 10.0,
        revenue: 445000,
        optimization_score: 94,
        status: 'active'
      }
    ];

    // Mock A/B test data
    const abTests = [
      {
        id: 'enterprise-headline',
        name: 'Enterprise Landing Headline',
        variant_a: 'Generate $2M+ Revenue with Product NFTs',
        variant_b: 'Transform Your Product Business with NFTs',
        conversion_a: 7.1,
        conversion_b: 9.8,
        winner: 'B',
        improvement: 38.0,
        revenue_impact: 456000
      },
      {
        id: 'pricing-page-layout',
        name: 'Pricing Page Layout',
        variant_a: 'Horizontal pricing cards',
        variant_b: 'Vertical comparison table',
        conversion_a: 4.5,
        conversion_b: 6.2,
        winner: 'B',
        improvement: 37.8,
        revenue_impact: 234000
      }
    ];

    const optimizationStats = {
      total_visitors: conversionFunnels.reduce((sum: any, f: any) => sum + f.visitors, 0),
      total_conversions: conversionFunnels.reduce((sum: any, f: any) => sum + f.conversions, 0),
      avg_conversion_rate: conversionFunnels.reduce((sum: any, f: any) => sum + f.conversion_rate, 0) / conversionFunnels.length,
      total_revenue: conversionFunnels.reduce((sum: any, f: any) => sum + f.revenue, 0),
      avg_optimization_score: conversionFunnels.reduce((sum: any, f: any) => sum + f.optimization_score, 0) / conversionFunnels.length,
      total_improvement: abTests.reduce((sum: any, t: any) => sum + t.improvement, 0) / abTests.length
    };

    return NextResponse.json({ 
      conversionFunnels, 
      abTests, 
      stats: optimizationStats, 
      success: true 
    });
  } catch (error) {
    console.error('Conversion optimization error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, funnelId, testId } = await req.json();
    
    // Mock conversion optimization actions
    const actions = {
      'optimize': `Conversion optimization launched for ${funnelId}! AI-powered testing and improvements activated.`,
      'implement': `A/B test winner implemented for ${testId}! Revenue optimization activated.`,
      'launch_tests': 'All conversion optimization tests launched! Maximum revenue optimization activated.',
      'boost': 'Performance boost activated! Conversion rates optimized across all funnels.'
    };

    const message = actions[action as keyof typeof actions] || 'Conversion optimization action completed';
    
    return NextResponse.json({ 
      success: true,
      message,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Conversion optimization action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
