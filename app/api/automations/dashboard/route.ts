

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

    // Mock automation system data
    const automationSystems = [
      {
        id: 'enterprise-outreach',
        name: 'Enterprise Client Outreach AI',
        description: 'AI-powered personalized outreach to product enterprise prospects',
        category: 'outreach',
        status: 'active',
        performance: {
          success_rate: 23.4,
          volume: 1247,
          revenue_generated: 2890000,
          conversions: 89
        },
        config: {
          frequency: 'Every 2 hours',
          target_volume: 50,
          enabled: true
        }
      },
      {
        id: 'whitelabel-onboarding',
        name: 'White-Label Auto Onboarding',
        description: 'Automated dispensary partner onboarding and deployment',
        category: 'onboarding',
        status: 'active',
        performance: {
          success_rate: 87.2,
          volume: 234,
          revenue_generated: 1456000,
          conversions: 156
        },
        config: {
          frequency: 'Real-time',
          target_volume: 25,
          enabled: true
        }
      },
      {
        id: 'api-developer-acquisition',
        name: 'API Developer Acquisition Bot',
        description: 'Automated product tech developer recruitment and onboarding',
        category: 'marketing',
        status: 'active',
        performance: {
          success_rate: 15.7,
          volume: 5678,
          revenue_generated: 445000,
          conversions: 891
        },
        config: {
          frequency: 'Every hour',
          target_volume: 100,
          enabled: true
        }
      },
      {
        id: 'revenue-optimization',
        name: 'Dynamic Revenue Optimizer',
        description: 'AI-powered pricing and conversion optimization across all channels',
        category: 'revenue',
        status: 'active',
        performance: {
          success_rate: 94.1,
          volume: 12450,
          revenue_generated: 847250,
          conversions: 11720
        },
        config: {
          frequency: 'Continuous',
          target_volume: 1000,
          enabled: true
        }
      }
    ];

    const stats = {
      totalActive: automationSystems.filter(s => s.status === 'active').length,
      totalRevenue: automationSystems.reduce((sum: any, s: any) => sum + s.performance.revenue_generated, 0),
      totalConversions: automationSystems.reduce((sum: any, s: any) => sum + s.performance.conversions, 0),
      avgSuccessRate: automationSystems.reduce((sum: any, s: any) => sum + s.performance.success_rate, 0) / automationSystems.length
    };

    return NextResponse.json({ automationSystems, stats, success: true });
  } catch (error) {
    console.error('Automation dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, automationId } = await req.json();
    
    // Mock automation control actions
    const actions = {
      'toggle': `Automation ${automationId} status toggled successfully`,
      'optimize': `Optimization boost activated for ${automationId}`,
      'launch_all': 'All automation systems launched simultaneously',
      'boost_performance': `Performance boost activated for ${automationId}`
    };

    const message = actions[action as keyof typeof actions] || 'Automation action executed';
    
    return NextResponse.json({ 
      success: true,
      message,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Automation action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
