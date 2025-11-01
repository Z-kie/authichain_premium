'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, Users, Percent, Activity, Target } from 'lucide-react';
import RevenueChart from '@/components/revenue/RevenueChart';
import MetricsGrid from '@/components/revenue/MetricsGrid';
import TopCustomers from '@/components/revenue/TopCustomers';
import ConversionFunnel from '@/components/revenue/ConversionFunnel';
import RevenueBreakdown from '@/components/revenue/RevenueBreakdown';

export default function RevenueDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [metricsData, setMetricsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    loadDashboardData();
  }, [period]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard data
      const dashboardRes = await fetch('/api/revenue/dashboard');
      const dashboard = await dashboardRes.json();
      setDashboardData(dashboard);

      // Fetch analytics data
      const analyticsRes = await fetch(`/api/revenue/analytics?period=${period}`);
      const analytics = await analyticsRes.json();
      setAnalyticsData(analytics);

      // Fetch metrics data
      const metricsRes = await fetch('/api/revenue/metrics');
      const metrics = await metricsRes.json();
      setMetricsData(metrics);

      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading revenue dashboard...</p>
        </div>
      </div>
    );
  }

  const overview = dashboardData?.overview || {};
  const metrics = metricsData?.metrics || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Revenue Dashboard</h1>
          <p className="text-gray-600">Track your revenue, growth, and key performance indicators</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Recurring Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">${overview.mrr?.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{metrics.mrr?.change}% vs last month
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Annual Recurring Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">${overview.arr?.toLocaleString()}</p>
                  <p className="text-sm text-blue-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    MRR × 12
                  </p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{overview.activeSubscriptions}</p>
                  <p className="text-sm text-purple-600 flex items-center mt-1">
                    <Users className="w-4 h-4 mr-1" />
                    +{overview.newSubscriptionsLast7Days} this week
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Churn Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{overview.churnRate}%</p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <Target className="w-4 h-4 mr-1" />
                    Target: &lt; 5%
                  </p>
                </div>
                <Percent className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend (Last 30 Days)</CardTitle>
                  <CardDescription>Daily revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart data={dashboardData?.dailyRevenue || []} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue by source</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueBreakdown data={analyticsData?.revenueBreakdown || {}} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                  <CardDescription>Highest revenue contributors</CardDescription>
                </CardHeader>
                <CardContent>
                  <TopCustomers customers={dashboardData?.topCustomers || []} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>Customer acquisition flow</CardDescription>
                </CardHeader>
                <CardContent>
                  <ConversionFunnel data={dashboardData?.conversionFunnel || {}} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <MetricsGrid metrics={metrics} />
            
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Detailed analytics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* LTV:CAC Ratio */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">LTV:CAC Ratio</span>
                      <span className="text-sm font-bold text-gray-900">{metrics.ltvCacRatio?.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${Math.min((parseFloat(metrics.ltvCacRatio?.value || 0) / 10) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Target: &gt; 3 (Healthy: {metrics.ltvCacRatio?.target})</p>
                  </div>

                  {/* Growth Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Monthly Growth Rate</span>
                      <span className="text-sm font-bold text-gray-900">{metrics.growthRate?.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.min(parseFloat(metrics.growthRate?.value || 0), 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Target: {metrics.growthRate?.target}</p>
                  </div>

                  {/* Net Revenue Retention */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Net Revenue Retention</span>
                      <span className="text-sm font-bold text-gray-900">{metrics.nrr?.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${Math.min(metrics.nrr?.value || 0, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Target: {metrics.nrr?.target}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Cohorts</CardTitle>
                <CardDescription>Customer acquisition by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData?.cohorts || {}).map(([month, count]: [string, any]) => (
                    <div key={month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">{month}</span>
                      <span className="text-lg font-bold text-purple-600">{count} customers</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Tier Distribution</CardTitle>
                <CardDescription>Customers by tier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(dashboardData?.tierBreakdown || {}).map(([tier, count]: [string, any]) => (
                    <div key={tier} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 capitalize">{tier}</span>
                        <span className="text-sm font-bold text-gray-900">{count} customers</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${(count / (overview.activeSubscriptions || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forecasts Tab */}
          <TabsContent value="forecasts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>6-Month Revenue Forecast</CardTitle>
                <CardDescription>Projected MRR growth (15% monthly growth assumed)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.forecast?.map((item: any, index: number) => (
                    <div key={item.month} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">{item.month}</p>
                          <p className="text-sm text-gray-500">Month {index + 1}</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">${item.projected.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Goals</CardTitle>
                <CardDescription>Track progress towards targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Q1 Goal: $50,000 MRR</span>
                      <span className="text-sm font-bold text-gray-900">{((overview.mrr / 50000) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                        style={{ width: `${Math.min((overview.mrr / 50000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Year 1 Goal: $200,000 MRR</span>
                      <span className="text-sm font-bold text-gray-900">{((overview.mrr / 200000) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full"
                        style={{ width: `${Math.min((overview.mrr / 200000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Active Customers Goal: 600</span>
                      <span className="text-sm font-bold text-gray-900">{((overview.activeSubscriptions / 600) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full"
                        style={{ width: `${Math.min((overview.activeSubscriptions / 600) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Period Selector */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-lg shadow-sm" role="group">
            {['day', 'week', 'month', 'year'].map((p: any) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`px-6 py-2 text-sm font-medium ${
                  period === p
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } ${p === 'day' ? 'rounded-l-lg' : ''} ${p === 'year' ? 'rounded-r-lg' : ''} border border-gray-200`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
