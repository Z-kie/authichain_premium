

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  TrendingUp,
  Target,
  Zap,
  DollarSign,
  Users,
  MousePointer,
  CreditCard,
  ShoppingCart,
  BarChart3,
  Settings,
  CheckCircle,
  ArrowRight,
  Bot,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ConversionFunnel {
  id: string;
  name: string;
  description: string;
  visitors: number;
  conversions: number;
  conversion_rate: number;
  revenue: number;
  optimization_score: number;
  status: 'active' | 'testing' | 'paused';
}

interface ABTest {
  id: string;
  name: string;
  variant_a: string;
  variant_b: string;
  conversion_a: number;
  conversion_b: number;
  winner: 'A' | 'B' | 'testing';
  improvement: number;
  revenue_impact: number;
}

export function ConversionOptimization() {
  const [masterOptimization, setMasterOptimization] = useState(true);
  
  const conversionFunnels: ConversionFunnel[] = [
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
    },
    {
      id: 'subscription-upgrade',
      name: 'Subscription Upgrade Flow',
      description: 'Free tier to premium subscription conversions',
      visitors: 5678,
      conversions: 234,
      conversion_rate: 4.1,
      revenue: 234000,
      optimization_score: 78,
      status: 'testing'
    },
    {
      id: 'product-onboarding',
      name: 'Product User Onboarding',
      description: 'New product users to active platform engagement',
      visitors: 12450,
      conversions: 3467,
      conversion_rate: 27.8,
      revenue: 156000,
      optimization_score: 89,
      status: 'active'
    }
  ];

  const abTests: ABTest[] = [
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
    },
    {
      id: 'signup-form-fields',
      name: 'API Signup Form Fields',
      variant_a: '7 fields (detailed)',
      variant_b: '3 fields (minimal)',
      conversion_a: 10.0,
      conversion_b: 14.7,
      winner: 'B',
      improvement: 47.0,
      revenue_impact: 167000
    },
    {
      id: 'product-cta-button',
      name: 'Product CTA Button',
      variant_a: 'Start Free Trial',
      variant_b: 'Launch Product NFTs',
      conversion_a: 4.1,
      conversion_b: 5.9,
      winner: 'B',
      improvement: 43.9,
      revenue_impact: 89000
    }
  ];

  const optimizationMetrics = {
    total_visitors: conversionFunnels.reduce((sum: any, f: any) => sum + f.visitors, 0),
    total_conversions: conversionFunnels.reduce((sum: any, f: any) => sum + f.conversions, 0),
    avg_conversion_rate: conversionFunnels.reduce((sum: any, f: any) => sum + f.conversion_rate, 0) / conversionFunnels.length,
    total_revenue: conversionFunnels.reduce((sum: any, f: any) => sum + f.revenue, 0),
    avg_optimization_score: conversionFunnels.reduce((sum: any, f: any) => sum + f.optimization_score, 0) / conversionFunnels.length,
    total_improvement: abTests.reduce((sum: any, t: any) => sum + t.improvement, 0) / abTests.length
  };

  const launchOptimization = (funnelId: string) => {
    alert(`Conversion optimization launched for ${funnelId}! AI-powered testing and improvements activated.`);
  };

  return (
    <div className="space-y-8">
      {/* Conversion Optimization Overview */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            📈 Product Conversion Optimization Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {(optimizationMetrics.total_visitors / 1000).toFixed(0)}k
              </div>
              <div className="text-blue-400">Monthly Visitors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {optimizationMetrics.total_conversions.toLocaleString()}
              </div>
              <div className="text-green-400">Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {optimizationMetrics.avg_conversion_rate.toFixed(1)}%
              </div>
              <div className="text-purple-400">Avg Conversion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                ${(optimizationMetrics.total_revenue / 1000000).toFixed(1)}M
              </div>
              <div className="text-green-400">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {optimizationMetrics.avg_optimization_score.toFixed(0)}
              </div>
              <div className="text-orange-400">Optimization Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                +{optimizationMetrics.total_improvement.toFixed(0)}%
              </div>
              <div className="text-green-400">Improvement</div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Switch
                id="master-optimization"
                checked={masterOptimization}
                onCheckedChange={setMasterOptimization}
              />
              <Label htmlFor="master-optimization" className="text-white text-lg">
                Master Conversion Optimization
              </Label>
              <Badge 
                variant="outline" 
                className={`${masterOptimization ? 'text-green-400 border-green-500/30' : 'text-red-400 border-red-500/30'}`}
              >
                {masterOptimization ? 'OPTIMIZING' : 'STANDBY'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnels */}
      <div className="grid lg:grid-cols-2 gap-6">
        {conversionFunnels.map((funnel, index) => (
          <motion.div
            key={funnel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-black/20 border-gray-700 hover:border-green-500/30">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{funnel.name}</CardTitle>
                    <div className="text-sm text-gray-400 mt-1">{funnel.description}</div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${funnel.status === 'active' ? 'text-green-400 border-green-500/30' : ''}
                      ${funnel.status === 'testing' ? 'text-yellow-400 border-yellow-500/30' : ''}
                      ${funnel.status === 'paused' ? 'text-red-400 border-red-500/30' : ''}
                    `}
                  >
                    {funnel.status === 'testing' && <Activity className="w-3 h-3 mr-1 animate-pulse" />}
                    {funnel.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="text-lg font-bold text-blue-400">
                      {funnel.visitors.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Visitors</div>
                  </div>
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="text-lg font-bold text-green-400">
                      {funnel.conversions.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Conversions</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Conversion Rate:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-medium">{funnel.conversion_rate}%</span>
                      <div className="w-16">
                        <Progress value={funnel.conversion_rate * 4} className="h-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Optimization Score:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-medium">{funnel.optimization_score}/100</span>
                      <div className="w-16">
                        <Progress value={funnel.optimization_score} className="h-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-700">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="text-green-400 font-medium">
                      ${funnel.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  onClick={() => launchOptimization(funnel.name)}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Optimize Funnel
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* A/B Test Results */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Active A/B Tests & Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {abTests.map((test, index) => (
              <motion.div
                key={test.id}
                className="p-6 bg-slate-800/30 rounded-lg border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-lg">{test.name}</h3>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={`${
                        test.winner === 'A' ? 'text-blue-400 border-blue-500/30' :
                        test.winner === 'B' ? 'text-green-400 border-green-500/30' :
                        'text-yellow-400 border-yellow-500/30'
                      }`}
                    >
                      {test.winner === 'testing' ? 'Testing' : `Winner: ${test.winner}`}
                    </Badge>
                    <Badge variant="outline" className="text-green-400 border-green-500/30">
                      +{test.improvement}% improvement
                    </Badge>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className={`p-4 rounded-lg border ${
                    test.winner === 'A' ? 'border-green-500/30 bg-green-900/10' : 'border-gray-600'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">Variant A</span>
                      <span className="text-blue-400 font-bold">{test.conversion_a}%</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">{test.variant_a}</div>
                    <Progress value={test.conversion_a * 5} className="h-2" />
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${
                    test.winner === 'B' ? 'border-green-500/30 bg-green-900/10' : 'border-gray-600'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">Variant B</span>
                      <span className="text-green-400 font-bold">{test.conversion_b}%</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">{test.variant_b}</div>
                    <Progress value={test.conversion_b * 5} className="h-2" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    Revenue Impact: <span className="text-green-400 font-medium">+${test.revenue_impact.toLocaleString()}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-green-500/30 hover:bg-green-900/20"
                    onClick={() => alert(`A/B test "${test.name}" winner implemented! Revenue optimization activated.`)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Implement Winner
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Performance */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            Conversion Optimization Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">+47%</div>
              <div className="text-gray-300">Avg Conversion Lift</div>
              <div className="text-sm text-green-400 mt-1">vs original baseline</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">$946k</div>
              <div className="text-gray-300">Additional Revenue</div>
              <div className="text-sm text-blue-400 mt-1">from optimization</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">24</div>
              <div className="text-gray-300">Active A/B Tests</div>
              <div className="text-sm text-purple-400 mt-1">running continuously</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-orange-400 mb-2">89</div>
              <div className="text-gray-300">Optimization Score</div>
              <div className="text-sm text-orange-400 mt-1">platform average</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Action Buttons */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-16"
          onClick={() => alert('🚀 Master optimization LAUNCHED! All product conversion funnels optimized simultaneously for maximum revenue.')}
        >
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Launch All Tests</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('🎯 Targeting optimization ACTIVATED! AI analyzing product user behavior for conversion improvements.')}
        >
          <div className="text-center">
            <Target className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Optimize Targeting</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-purple-500/30 hover:bg-purple-900/20"
          onClick={() => alert('💰 Revenue optimization MAXIMIZED! Dynamic pricing and funnel optimization for peak performance.')}
        >
          <div className="text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Maximize Revenue</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-orange-500/30 hover:bg-orange-900/20"
          onClick={() => alert('📊 Analytics ENHANCED! Advanced conversion tracking and attribution modeling activated.')}
        >
          <div className="text-center">
            <BarChart3 className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Advanced Analytics</div>
          </div>
        </Button>
      </div>

      {/* Success Summary */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">📈 Conversion Optimization Success</h2>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">+47%</div>
                <div className="text-gray-300">Average Conversion Lift</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">$946k</div>
                <div className="text-gray-300">Additional Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-gray-300">Continuous A/B Testing</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <p className="text-green-300 text-lg">
                📈 <strong>Optimization Status:</strong> All AuthiChain conversion funnels are OPTIMIZED with AI-powered 
                A/B testing generating +47% conversion lift and $946k additional revenue!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
