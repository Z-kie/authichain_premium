
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
);

/**
 * Revenue Analytics API
 * GET /api/revenue/analytics
 * Returns comprehensive revenue analytics and KPIs
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month'; // day, week, month, year
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Calculate date range
    const now = new Date();
    let fromDate = new Date();
    
    switch (period) {
      case 'day':
        fromDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        fromDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        fromDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        fromDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        fromDate.setMonth(now.getMonth() - 1);
    }

    const dateFrom = startDate || fromDate.toISOString();
    const dateTo = endDate || now.toISOString();

    // Fetch subscription revenue
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .gte('created_at', dateFrom)
      .lte('created_at', dateTo);

    if (subError) throw subError;

    // Fetch minting transactions
    const { data: mintings, error: mintError } = await supabase
      .from('nfts')
      .select('*')
      .gte('created_at', dateFrom)
      .lte('created_at', dateTo);

    if (mintError) throw mintError;

    // Calculate subscription revenue
    const tierPrices: Record<string, number> = {
      'free': 0,
      'starter': 299,
      'professional': 999,
      'business': 1999,
      'enterprise': 2999,
      'ultimate': 4999,
    };

    let subscriptionRevenue = 0;
    const activeSubscriptions = subscriptions?.filter(s => s.status === 'active') || [];
    activeSubscriptions.forEach(sub => {
      const tier = sub.tier?.toLowerCase() || 'free';
      subscriptionRevenue += tierPrices[tier] || 0;
    });

    // Calculate minting revenue (assume $0.50 per mint for basic)
    const mintingRevenue = (mintings?.length || 0) * 0.5;

    // Calculate marketplace revenue (2.5% of sales - placeholder)
    const marketplaceRevenue = 0; // TODO: Implement when we have sales data

    // Calculate API revenue
    const apiRevenue = 0; // TODO: Implement API usage tracking

    // Total revenue
    const totalRevenue = subscriptionRevenue + mintingRevenue + marketplaceRevenue + apiRevenue;

    // Calculate growth rate (compare to previous period)
    const prevFromDate = new Date(fromDate);
    switch (period) {
      case 'day':
        prevFromDate.setDate(prevFromDate.getDate() - 1);
        break;
      case 'week':
        prevFromDate.setDate(prevFromDate.getDate() - 7);
        break;
      case 'month':
        prevFromDate.setMonth(prevFromDate.getMonth() - 1);
        break;
      case 'year':
        prevFromDate.setFullYear(prevFromDate.getFullYear() - 1);
        break;
    }

    const { data: prevSubscriptions } = await supabase
      .from('subscriptions')
      .select('*')
      .gte('created_at', prevFromDate.toISOString())
      .lt('created_at', dateFrom);

    let prevSubscriptionRevenue = 0;
    prevSubscriptions?.forEach(sub => {
      const tier = sub.tier?.toLowerCase() || 'free';
      prevSubscriptionRevenue += tierPrices[tier] || 0;
    });

    const growthRate = prevSubscriptionRevenue > 0
      ? ((subscriptionRevenue - prevSubscriptionRevenue) / prevSubscriptionRevenue) * 100
      : 0;

    // Calculate churn rate
    const { data: cancelledSubs } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'cancelled')
      .gte('updated_at', dateFrom)
      .lte('updated_at', dateTo);

    const churnRate = activeSubscriptions.length > 0
      ? ((cancelledSubs?.length || 0) / activeSubscriptions.length) * 100
      : 0;

    // Customer Lifetime Value (simplified)
    const avgSubscriptionValue = subscriptionRevenue / Math.max(activeSubscriptions.length, 1);
    const avgLifetimeMonths = 12; // Assume 12 month average
    const ltv = avgSubscriptionValue * avgLifetimeMonths;

    // Calculate MRR (Monthly Recurring Revenue)
    const mrr = subscriptionRevenue;

    // ARR (Annual Recurring Revenue)
    const arr = mrr * 12;

    // Customer cohort analysis
    const cohorts: Record<string, number> = {};
    activeSubscriptions.forEach(sub => {
      const cohortMonth = new Date(sub.created_at).toISOString().slice(0, 7);
      cohorts[cohortMonth] = (cohorts[cohortMonth] || 0) + 1;
    });

    // Revenue breakdown
    const revenueBreakdown = {
      subscriptions: {
        amount: subscriptionRevenue,
        percentage: (subscriptionRevenue / totalRevenue) * 100,
      },
      minting: {
        amount: mintingRevenue,
        percentage: (mintingRevenue / totalRevenue) * 100,
      },
      marketplace: {
        amount: marketplaceRevenue,
        percentage: (marketplaceRevenue / totalRevenue) * 100,
      },
      api: {
        amount: apiRevenue,
        percentage: (apiRevenue / totalRevenue) * 100,
      },
    };

    // Tier distribution
    const tierDistribution: Record<string, number> = {};
    activeSubscriptions.forEach(sub => {
      const tier = sub.tier || 'free';
      tierDistribution[tier] = (tierDistribution[tier] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      period,
      dateRange: {
        from: dateFrom,
        to: dateTo,
      },
      metrics: {
        totalRevenue,
        mrr,
        arr,
        growthRate: growthRate.toFixed(2),
        churnRate: churnRate.toFixed(2),
        ltv: ltv.toFixed(2),
        activeSubscriptions: activeSubscriptions.length,
        totalMintings: mintings?.length || 0,
        arpu: (totalRevenue / Math.max(activeSubscriptions.length, 1)).toFixed(2),
      },
      revenueBreakdown,
      tierDistribution,
      cohorts,
      revenueBySource: {
        subscriptions: subscriptionRevenue,
        minting: mintingRevenue,
        marketplace: marketplaceRevenue,
        api: apiRevenue,
      },
    });
  } catch (error) {
    console.error('Revenue analytics error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch revenue analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
