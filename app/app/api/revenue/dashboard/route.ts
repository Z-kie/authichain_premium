export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
);

/**
 * Revenue Dashboard API
 * GET /api/revenue/dashboard
 * Returns dashboard data optimized for visualization
 */
export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Fetch all active subscriptions
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active');

    if (subError) throw subError;

    // Fetch recent transactions
    const { data: recentActivity, error: activityError } = await supabase
      .from('nfts')
      .select('*')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(10);

    if (activityError) throw activityError;

    // Get daily revenue for last 30 days
    const dailyRevenue: Record<string, number> = {};
    for (let i = 0; i < 30; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split('T')[0];
      dailyRevenue[dateKey] = 0;
    }

    // Calculate daily revenue from subscriptions
    const tierPrices: Record<string, number> = {
      'free': 0,
      'starter': 299,
      'professional': 999,
      'business': 1999,
      'enterprise': 2999,
      'ultimate': 4999,
    };

    let totalMRR = 0;
    subscriptions?.forEach(sub => {
      const tier = sub.tier?.toLowerCase() || 'free';
      const price = tierPrices[tier] || 0;
      totalMRR += price;

      // Add to daily revenue on subscription date
      const subDate = new Date(sub.created_at).toISOString().split('T')[0];
      if (dailyRevenue.hasOwnProperty(subDate)) {
        dailyRevenue[subDate] += price;
      }
    });

    // Calculate growth indicators
    const last7DaysSubs = subscriptions?.filter(sub => {
      const subDate = new Date(sub.created_at);
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return subDate >= sevenDaysAgo;
    }) || [];

    // Top customers by revenue
    const customerRevenue: Record<string, { revenue: number; tier: string; userId: string }> = {};
    subscriptions?.forEach(sub => {
      const userId = sub.user_id || 'unknown';
      const tier = sub.tier?.toLowerCase() || 'free';
      const price = tierPrices[tier] || 0;
      
      if (!customerRevenue[userId]) {
        customerRevenue[userId] = { revenue: 0, tier, userId };
      }
      customerRevenue[userId].revenue += price;
    });

    const topCustomers = Object.values(customerRevenue)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Conversion funnel (placeholder data)
    const conversionFunnel = {
      visitors: 10000,
      signups: 500, // 5% conversion
      trials: 150, // 30% of signups start trial
      paid: 45, // 30% of trials convert to paid
    };

    // Revenue forecast (simple projection)
    const avgMonthlyGrowth = 1.15; // 15% growth rate
    const forecast = [];
    let projectedMRR = totalMRR;
    for (let i = 0; i < 6; i++) {
      forecast.push({
        month: new Date(now.getFullYear(), now.getMonth() + i, 1).toISOString().slice(0, 7),
        projected: Math.round(projectedMRR),
      });
      projectedMRR *= avgMonthlyGrowth;
    }

    // Churn analysis
    const { data: churnedSubs } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'cancelled')
      .gte('updated_at', thirtyDaysAgo.toISOString());

    const churnRate = subscriptions && subscriptions.length > 0
      ? ((churnedSubs?.length || 0) / subscriptions.length) * 100
      : 0;

    return NextResponse.json({
      success: true,
      overview: {
        mrr: totalMRR,
        arr: totalMRR * 12,
        activeSubscriptions: subscriptions?.length || 0,
        newSubscriptionsLast7Days: last7DaysSubs.length,
        churnRate: churnRate.toFixed(2),
        totalCustomers: new Set(subscriptions?.map(s => s.user_id)).size,
      },
      dailyRevenue: Object.entries(dailyRevenue)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, revenue]) => ({ date, revenue })),
      topCustomers,
      recentActivity: recentActivity?.map(activity => ({
        id: activity.id,
        type: 'minting',
        amount: 0.5, // Basic minting fee
        date: activity.created_at,
        description: `NFT minted: ${activity.name || 'Unnamed'}`,
      })) || [],
      conversionFunnel,
      forecast,
      tierBreakdown: subscriptions?.reduce((acc, sub) => {
        const tier = sub.tier || 'free';
        acc[tier] = (acc[tier] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {},
    });
  } catch (error) {
    console.error('Revenue dashboard error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
