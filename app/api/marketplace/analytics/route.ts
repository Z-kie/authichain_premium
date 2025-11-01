

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

    // Mock advanced analytics data
    const analyticsMetrics = [
      {
        id: 'total_revenue',
        name: 'Total Revenue',
        value: 2847593,
        change: 47.8,
        trend: 'up',
        format: 'currency',
        category: 'revenue'
      },
      {
        id: 'nft_sales',
        name: 'NFT Sales',
        value: 12456,
        change: 23.4,
        trend: 'up',
        format: 'number',
        category: 'revenue'
      },
      {
        id: 'conversion_rate',
        name: 'Conversion Rate',
        value: 8.9,
        change: 12.3,
        trend: 'up',
        format: 'percentage',
        category: 'conversion'
      }
    ];

    const topProducts = [
      {
        item: 'Rare Diamond',
        sales_volume: 456789,
        avg_price: 3450,
        growth_rate: 67.8,
        popularity_score: 94,
        lab_score: 98,
        rarity_index: 87
      },
      {
        item: 'Blue Sapphire',
        sales_volume: 389456,
        avg_price: 2890,
        growth_rate: 45.2,
        popularity_score: 91,
        lab_score: 95,
        rarity_index: 82
      }
    ];

    const marketInsights = [
      {
        id: '1',
        type: 'opportunity',
        title: 'High CBD Strains Trending +156%',
        description: 'CBD-dominant items showing massive growth potential with medical product expansion',
        impact: 'high',
        actionable: true,
        revenue_potential: 890000
      },
      {
        id: '2',
        type: 'recommendation',
        title: 'Optimize Rare Diamond Pricing',
        description: 'Your Rare Diamond NFTs are underpriced by 23% compared to market demand',
        impact: 'medium',
        actionable: true,
        revenue_potential: 156000
      }
    ];

    return NextResponse.json({ 
      metrics: analyticsMetrics,
      topProducts,
      insights: marketInsights,
      success: true 
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
