

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';


interface PaymentAnalytics {
  total_revenue: number;
  transaction_count: number;
  success_rate: number;
  avg_processing_time: number;
  payment_methods: {
    method: string;
    percentage: number;
    revenue: number;
    transactions: number;
  }[];
  monthly_trends: {
    month: string;
    revenue: number;
    transactions: number;
  }[];
  geographical_data: {
    country: string;
    revenue: number;
    transactions: number;
  }[];
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe') || '30d';
    const userEmail = session.user.email;

    // Mock comprehensive payment analytics data
    const analyticsData: PaymentAnalytics = {
      total_revenue: 15600000,
      transaction_count: 47892,
      success_rate: 98.7,
      avg_processing_time: 2.3,
      payment_methods: [
        {
          method: 'Credit/Debit Cards',
          percentage: 67.2,
          revenue: 10483200,
          transactions: 32179
        },
        {
          method: 'Cryptocurrency',
          percentage: 23.1,
          revenue: 3603600,
          transactions: 11063
        },
        {
          method: 'Mobile Payments',
          percentage: 7.8,
          revenue: 1216800,
          transactions: 3736
        },
        {
          method: 'Enterprise Billing',
          percentage: 1.9,
          revenue: 296400,
          transactions: 914
        }
      ],
      monthly_trends: [
        { month: '2024-03', revenue: 2100000, transactions: 6430 },
        { month: '2024-04', revenue: 2350000, transactions: 7210 },
        { month: '2024-05', revenue: 2780000, transactions: 8540 },
        { month: '2024-06', revenue: 3100000, transactions: 9520 },
        { month: '2024-07', revenue: 2950000, transactions: 9050 },
        { month: '2024-08', revenue: 3320000, transactions: 10200 }
      ],
      geographical_data: [
        { country: 'United States', revenue: 9360000, transactions: 28735 },
        { country: 'Canada', revenue: 3120000, transactions: 9579 },
        { country: 'Netherlands', revenue: 1560000, transactions: 4789 },
        { country: 'Germany', revenue: 936000, transactions: 2873 },
        { country: 'United Kingdom', revenue: 624000, transactions: 1916 }
      ]
    };

    // Calculate additional metrics
    const revenueGrowth = calculateRevenueGrowth(analyticsData.monthly_trends);
    const topPaymentMethod = analyticsData.payment_methods.reduce((prev, current) => 
      (prev.revenue > current.revenue) ? prev : current
    );

    // Product-specific insights
    const productInsights = {
      high_value_transactions: 1247, // Transactions > $5,000
      nft_vs_subscription: {
        nft_revenue: analyticsData.total_revenue * 0.78,
        subscription_revenue: analyticsData.total_revenue * 0.22
      },
      product_compliance_score: 94.2,
      peak_transaction_times: [
        { time: '20:00-21:00', percentage: 18.4 },
        { time: '19:00-20:00', percentage: 16.7 },
        { time: '21:00-22:00', percentage: 14.3 }
      ]
    };

    return NextResponse.json({
      success: true,
      timeframe,
      analytics: analyticsData,
      insights: {
        revenue_growth: revenueGrowth,
        top_payment_method: topPaymentMethod,
        product_insights: productInsights
      },
      metadata: {
        generated_at: new Date().toISOString(),
        user_email: userEmail,
        data_points: analyticsData.transaction_count
      }
    });

  } catch (error) {
    console.error('Payment analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch payment analytics' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, filters, export_format } = await req.json();

    switch (action) {
      case 'export_report':
        return await exportPaymentReport(filters, export_format, session.user.email);
      case 'generate_insights':
        return await generatePaymentInsights(filters, session.user.email);
      case 'compare_periods':
        return await comparePeriods(filters, session.user.email);
      default:
        return NextResponse.json({ error: 'Invalid analytics action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Payment analytics action error:', error);
    return NextResponse.json({ error: 'Analytics action failed' }, { status: 500 });
  }
}

function calculateRevenueGrowth(monthlyTrends: any[]) {
  if (monthlyTrends.length < 2) return 0;
  
  const currentMonth = monthlyTrends[monthlyTrends.length - 1];
  const previousMonth = monthlyTrends[monthlyTrends.length - 2];
  
  return ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
}

async function exportPaymentReport(filters: any, format: string, userEmail: string) {
  const reportData = {
    report_id: 'payment_report_' + Date.now(),
    format: format,
    filters: filters,
    generated_by: userEmail,
    generated_at: new Date().toISOString(),
    download_url: `/api/reports/payment_report_${Date.now()}.${format}`
  };

  return NextResponse.json({
    success: true,
    message: `Payment report generated in ${format.toUpperCase()} format`,
    report: reportData
  });
}

async function generatePaymentInsights(filters: any, userEmail: string) {
  const insights = {
    key_findings: [
      'Cryptocurrency payments have grown 156% in the last quarter',
      'Mobile payment adoption increased 45% among product businesses',
      'Enterprise clients show 23% higher transaction success rates',
      'Peak product NFT trading occurs between 8-10 PM EST'
    ],
    recommendations: [
      'Consider implementing additional cryptocurrency options',
      'Optimize mobile payment flow for better conversion',
      'Develop targeted enterprise payment solutions',
      'Implement time-based transaction fee optimization'
    ],
    risk_factors: [
      'Regulatory changes in product payment processing',
      'Cryptocurrency market volatility affecting adoption',
      'Mobile payment security concerns'
    ]
  };

  return NextResponse.json({
    success: true,
    insights,
    generated_by: userEmail,
    generated_at: new Date().toISOString()
  });
}

async function comparePeriods(filters: any, userEmail: string) {
  const comparison = {
    period_1: {
      start_date: filters.period_1_start,
      end_date: filters.period_1_end,
      revenue: 8900000,
      transactions: 27345,
      success_rate: 98.2
    },
    period_2: {
      start_date: filters.period_2_start,
      end_date: filters.period_2_end,
      revenue: 6700000,
      transactions: 20567,
      success_rate: 97.8
    },
    changes: {
      revenue_change: 32.8,
      transaction_change: 33.0,
      success_rate_change: 0.4
    }
  };

  return NextResponse.json({
    success: true,
    comparison,
    summary: 'Revenue increased by 32.8% with improved success rates'
  });
}
