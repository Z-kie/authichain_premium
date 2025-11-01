
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  DollarSign, 
  Mail,
  Users,
  Target,
  Zap,
  Calendar,
  Award
} from 'lucide-react';

interface GoogleixStats {
  totalRevenue: number;
  totalEvents: number;
  emailCaptures: number;
  subscriptions: number;
  conversionRate: number;
  googleixMetrics: {
    estimatedMonthlyRevenue: number;
    leadValue: number;
    revenuePerEvent: number;
  };
}

export function GooglixDashboard() {
  const [stats, setStats] = useState<GoogleixStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  useEffect(() => {
    fetchStats();
  }, [period]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/googlix/conversion-tracking?days=${period}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Googlix Revenue Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time tracking of the $32k/month system
          </p>
        </div>
        
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 Days</SelectItem>
            <SelectItem value="30">30 Days</SelectItem>
            <SelectItem value="90">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats?.totalRevenue || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly projection: {formatCurrency(stats?.googleixMetrics?.estimatedMonthlyRevenue || 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              Email Captures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats?.emailCaptures || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Value: {formatCurrency((stats?.emailCaptures || 0) * (stats?.googleixMetrics?.leadValue || 0))}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats?.conversionRate || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.subscriptions || 0} subscriptions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              Revenue/Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(stats?.googleixMetrics?.revenuePerEvent || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalEvents || 0} total events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Googlix System Comparison */}
      <Card className="bg-gradient-to-r from-green-900/20 to-purple-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-green-500" />
            Googlix System Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-green-400">🎯 Original Googlix Results</h4>
              <ul className="space-y-2 text-sm">
                <li>• Monthly Revenue: <strong>$32,000+</strong></li>
                <li>• Email Commissions: <strong>$150,000+</strong></li>
                <li>• Sales Revenue: <strong>$300,000+</strong></li>
                <li>• Google Payments: <strong>$2,000+</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-purple-400">🚀 AuthiChain Performance</h4>
              <ul className="space-y-2 text-sm">
                <li>• Current Revenue: <strong>{formatCurrency(stats?.totalRevenue || 0)}</strong></li>
                <li>• Projected Monthly: <strong>{formatCurrency(stats?.googleixMetrics?.estimatedMonthlyRevenue || 0)}</strong></li>
                <li>• Lead Value: <strong>{formatCurrency(stats?.googleixMetrics?.leadValue || 0)}</strong></li>
                <li>• Conversion Rate: <strong>{stats?.conversionRate || 0}%</strong></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-600/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-400">System Status</p>
                <p className="text-sm text-muted-foreground">
                  AuthiChain + Googlix integration active
                </p>
              </div>
              <Badge className="bg-green-600">
                {stats?.googleixMetrics?.estimatedMonthlyRevenue && stats.googleixMetrics.estimatedMonthlyRevenue > 1000 
                  ? 'PROFITABLE' 
                  : 'SCALING'
                }
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Optimization Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email capture rate</span>
              <Badge variant="outline">
                {stats?.emailCaptures && stats?.totalEvents 
                  ? `${((stats.emailCaptures / stats.totalEvents) * 100).toFixed(1)}%`
                  : '0%'
                }
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenue per lead</span>
              <Badge variant="outline">
                {formatCurrency(stats?.googleixMetrics?.leadValue || 0)}
              </Badge>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Target className="w-4 h-4 mr-2" />
              Optimize Funnel
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Scale to $32k/Month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current vs Target</span>
              <Badge variant="outline">
                {((stats?.googleixMetrics?.estimatedMonthlyRevenue || 0) / 32000 * 100).toFixed(1)}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Gap to close</span>
              <Badge variant="outline">
                {formatCurrency(32000 - (stats?.googleixMetrics?.estimatedMonthlyRevenue || 0))}
              </Badge>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Calendar className="w-4 h-4 mr-2" />
              Scale Marketing
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
