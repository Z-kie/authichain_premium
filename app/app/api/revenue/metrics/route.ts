export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
);

/**
 * Revenue Metrics API
 * GET /api/revenue/metrics
 * Returns key performance indicators (KPIs) for revenue tracking
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric'); // mrr, arr, churn, ltv, cac

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch active subscriptions
    const { data: activeSubscriptions, error: activeError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active');

    if (activeError) throw activeError;

    // Fetch cancelled subscriptions (for churn)
    const { data: cancelledSubs, error: cancelledError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'cancelled')
      .gte('updated_at', lastMonth.toISOString());

    if (cancelledError) throw cancelledError;

    // Tier pricing
    const tierPrices: Record<string, number> = {
      'free': 0,
      'starter': 299,
      'professional': 999,
      'business': 1999,
      'enterprise': 2999,
      'ultimate': 4999,
    };

    // Calculate MRR
    let mrr = 0;
    activeSubscriptions?.forEach(sub => {
      const tier = sub.tier?.toLowerCase() || 'free';
      mrr += tierPrices[tier] || 0;
    });

    // Calculate ARR
    const arr = mrr * 12;

    // Calculate Churn Rate
    const totalActiveAtStart = (activeSubscriptions?.length || 0) + (cancelledSubs?.length || 0);
    const churnRate = totalActiveAtStart > 0
      ? ((cancelledSubs?.length || 0) / totalActiveAtStart) * 100
      : 0;

    // Calculate LTV (Customer Lifetime Value)
    const avgMonthlyRevenue = activeSubscriptions && activeSubscriptions.length > 0
      ? mrr / activeSubscriptions.length
      : 0;
    const avgCustomerLifetimeMonths = churnRate > 0 ? 100 / churnRate : 12; // If 5% churn = 20 months
    const ltv = avgMonthlyRevenue * avgCustomerLifetimeMonths;

    // Calculate CAC (Customer Acquisition Cost) - placeholder
    // In production, this would integrate with marketing spend data
    const cac = 150; // Assumed $150 per customer

    // LTV:CAC Ratio
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;

    // Net Revenue Retention (NRR)
    // Simplified: (Starting MRR + Expansion - Churn) / Starting MRR
    const nrr = 100; // Placeholder - needs historical data

    // Calculate ARPU (Average Revenue Per User)
    const arpu = activeSubscriptions && activeSubscriptions.length > 0
      ? mrr / activeSubscriptions.length
      : 0;

    // Customer cohorts
    const cohorts = activeSubscriptions?.reduce((acc, sub) => {
      const cohortMonth = new Date(sub.created_at).toISOString().slice(0, 7);
      if (!acc[cohortMonth]) {
        acc[cohortMonth] = { count: 0, revenue: 0 };
      }
      acc[cohortMonth].count += 1;
      const tier = sub.tier?.toLowerCase() || 'free';
      acc[cohortMonth].revenue += tierPrices[tier] || 0;
      return acc;
    }, {} as Record<string, { count: number; revenue: number }>) || {};

    // Revenue growth rate
    const { data: lastMonthSubs } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')
      .gte('created_at', lastMonth.toISOString())
      .lt('created_at', thisMonth.toISOString());

    let lastMonthMRR = 0;
    lastMonthSubs?.forEach(sub => {
      const tier = sub.tier?.toLowerCase() || 'free';
      lastMonthMRR += tierPrices[tier] || 0;
    });

    const growthRate = lastMonthMRR > 0
      ? ((mrr - lastMonthMRR) / lastMonthMRR) * 100
      : 0;

    // If specific metric requested, return only that
    if (metric) {
      const metrics: Record<string, any> = {
        mrr: { value: mrr, unit: 'USD', label: 'Monthly Recurring Revenue' },
        arr: { value: arr, unit: 'USD', label: 'Annual Recurring Revenue' },
        churn: { value: churnRate.toFixed(2), unit: '%', label: 'Churn Rate' },
        ltv: { value: ltv.toFixed(2), unit: 'USD', label: 'Customer Lifetime Value' },
        cac: { value: cac, unit: 'USD', label: 'Customer Acquisition Cost' },
        arpu: { value: arpu.toFixed(2), unit: 'USD', label: 'Average Revenue Per User' },
        growth: { value: growthRate.toFixed(2), unit: '%', label: 'Monthly Growth Rate' },
      };

      if (metrics[metric]) {
        return NextResponse.json({
          success: true,
          metric: metric,
          ...metrics[metric],
        });
      }
    }

    // Return all metrics
    return NextResponse.json({
      success: true,
      metrics: {
        mrr: {
          value: mrr,
          unit: 'USD',
          change: growthRate.toFixed(2),
        },
        arr: {
          value: arr,
          unit: 'USD',
          change: (growthRate * 12).toFixed(2),
        },
        churnRate: {
          value: churnRate.toFixed(2),
          unit: '%',
          target: '< 5%',
        },
        ltv: {
          value: ltv.toFixed(2),
          unit: 'USD',
        },
        cac: {
          value: cac,
          unit: 'USD',
        },
        ltvCacRatio: {
          value: ltvCacRatio.toFixed(2),
          unit: 'ratio',
          target: '> 3',
        },
        arpu: {
          value: arpu.toFixed(2),
          unit: 'USD',
        },
        nrr: {
          value: nrr,
          unit: '%',
          target: '> 100%',
        },
        activeCustomers: {
          value: activeSubscriptions?.length || 0,
          unit: 'customers',
        },
        growthRate: {
          value: growthRate.toFixed(2),
          unit: '%',
          target: '> 15%',
        },
      },
      cohorts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revenue metrics error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch revenue metrics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
