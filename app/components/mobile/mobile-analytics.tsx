

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Zap,
  Eye,
  Calendar,
  ArrowRight,
  Smartphone,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  format: 'currency' | 'percentage' | 'number';
  icon: any;
  color: string;
}

interface QuickInsight {
  id: string;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

export function MobileAnalytics() {
  const [timeframe, setTimeframe] = useState('7d');

  const mobileMetrics: MobileMetric[] = [
    {
      id: 'portfolio_value',
      name: 'Portfolio Value',
      value: 47350,
      change: 12.8,
      trend: 'up',
      format: 'currency',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      id: 'nft_count',
      name: 'Product NFTs',
      value: 23,
      change: 4,
      trend: 'up',
      format: 'number',
      icon: Zap,
      color: 'text-blue-400'
    },
    {
      id: 'total_return',
      name: 'Total Return',
      value: 34.7,
      change: 8.2,
      trend: 'up',
      format: 'percentage',
      icon: TrendingUp,
      color: 'text-purple-400'
    },
    {
      id: 'daily_change',
      name: 'Today',
      value: -2.4,
      change: -1.8,
      trend: 'down',
      format: 'percentage',
      icon: Activity,
      color: 'text-red-400'
    }
  ];

  const quickInsights: QuickInsight[] = [
    {
      id: '1',
      title: 'Top Performer',
      value: 'Rare Diamond #1',
      change: '+67.8%',
      positive: true
    },
    {
      id: '2',
      title: 'New Opportunity',
      value: 'High CBD Strains',
      change: '+156% trend',
      positive: true
    },
    {
      id: '3',
      title: 'Market Alert',
      value: 'Blue Sapphire Rising',
      change: '+23.4% today',
      positive: true
    },
    {
      id: '4',
      title: 'Portfolio Health',
      value: 'Excellent',
      change: '94/100 score',
      positive: true
    }
  ];

  const topProducts = [
    { name: 'Rare Diamond', value: '$12,450', change: 67.8, owned: 3 },
    { name: 'Blue Sapphire', value: '$8,790', change: 45.2, owned: 5 },
    { name: 'Vintage Watch', value: '$6,340', change: 52.4, owned: 2 },
    { name: 'Ruby Collection', value: '$5,890', change: 38.7, owned: 4 }
  ];

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency': return `$${value.toLocaleString()}`;
      case 'percentage': return `${value}%`;
      default: return value.toString();
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Mobile Analytics Header */}
      <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-blue-500/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-400" />
                📊 Mobile Analytics
              </CardTitle>
              <p className="text-gray-400 text-sm mt-1">Product NFT performance on-the-go</p>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-500/30">
              Live Data
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {mobileMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/30 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className={`w-4 h-4 ${metric.color}`} />
                    <span className="text-gray-400 text-xs">{metric.name}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-white">
                      {formatValue(metric.value, metric.format)}
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${
                      metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-green-400" />
            Quick Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quickInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
              >
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{insight.title}</div>
                  <div className="text-gray-400 text-xs">{insight.value}</div>
                </div>
                <div className={`text-sm font-medium ${
                  insight.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {insight.change}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Strains */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Top Product Strains
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-700/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-white font-medium">{item.name}</div>
                    <Badge variant="outline" className="text-blue-400 border-blue-500/30 text-xs">
                      {item.owned} owned
                    </Badge>
                  </div>
                  <div className="text-gray-400 text-sm">{item.value}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-medium text-sm">
                    +{item.change}%
                  </div>
                  <div className="text-gray-400 text-xs">30d</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mobile Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 h-16 flex flex-col items-center justify-center"
          onClick={() => alert('📊 Full analytics dashboard opening! Comprehensive product market insights and performance data.')}
        >
          <BarChart3 className="w-6 h-6 mb-1" />
          <span className="text-sm">Full Analytics</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('🎯 AI insights activated! Machine learning predictions for product market opportunities.')}
        >
          <Target className="w-6 h-6 mb-1" />
          <span className="text-sm">AI Insights</span>
        </Button>
      </div>

      {/* Performance Summary */}
      <Card className="bg-gradient-to-r from-green-900/20 via-purple-900/20 to-blue-900/20 border border-green-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-white">📱 Mobile Analytics Performance</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$47.3k</div>
                <div className="text-gray-300 text-sm">Portfolio Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">+34.7%</div>
                <div className="text-gray-300 text-sm">Total Return</div>
              </div>
            </div>
            
            <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
              <p className="text-green-300 text-sm">
                📊 <strong>Mobile Analytics Active:</strong> Real-time product NFT performance 
                tracking with AI-powered insights and portfolio optimization!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
