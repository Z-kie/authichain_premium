

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Globe,
  Cpu,
  Shield,
  BarChart3,
  Rocket,
  Crown,
  Star,
  Diamond,
  Target,
  Briefcase,
  Network,
  Database,
  Code2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnterpriseMetrics {
  totalRevenue: number;
  monthlyGrowth: number;
  enterpriseClients: number;
  apiCalls: number;
  whitelabelDeployments: number;
  dispensaryPartners: number;
}

export function EnterpriseDashboard() {
  const [metrics, setMetrics] = useState<EnterpriseMetrics>({
    totalRevenue: 847250,
    monthlyGrowth: 127,
    enterpriseClients: 34,
    apiCalls: 2847392,
    whitelabelDeployments: 12,
    dispensaryPartners: 156
  });

  const enterpriseTiers = [
    {
      name: 'Enterprise',
      price: 499,
      clients: 34,
      revenue: 16966,
      features: ['Custom Branding', 'API Access', 'Priority Support', 'Advanced Analytics']
    },
    {
      name: 'Corporate',
      price: 999,
      clients: 18,
      revenue: 17982,
      features: ['White-Label', 'Multi-Location', 'Custom Integrations', 'Dedicated Manager']
    },
    {
      name: 'Product Chain',
      price: 2499,
      clients: 8,
      revenue: 19992,
      features: ['Full Platform License', 'Unlimited Locations', 'Custom Development', 'Revenue Share']
    }
  ];

  const scalingOpportunities = [
    {
      title: 'Dispensary Partnerships',
      potential: '$2.4M ARR',
      status: 'Active',
      progress: 78,
      icon: Building2,
      description: '156 dispensaries using AuthiChain for package authentication'
    },
    {
      title: 'White-Label Licensing',
      potential: '$1.8M ARR',
      status: 'Scaling',
      progress: 65,
      icon: Globe,
      description: '12 white-label deployments generating recurring licensing fees'
    },
    {
      title: 'API Monetization',
      potential: '$960k ARR',
      status: 'Growing',
      progress: 42,
      icon: Code2,
      description: '2.8M+ API calls/month from product tech ecosystem'
    },
    {
      title: 'Product Analytics',
      potential: '$720k ARR',
      status: 'New',
      progress: 25,
      icon: BarChart3,
      description: 'Premium market intelligence and item analytics'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enterprise Revenue Overview */}
      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-400 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4" />
              Enterprise Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${metrics.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-green-400 mt-1">
              +{metrics.monthlyGrowth}% this month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-400 flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              Enterprise Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {metrics.enterpriseClients}
            </div>
            <div className="text-sm text-blue-400 mt-1">
              ${(metrics.totalRevenue / metrics.enterpriseClients).toFixed(0)} avg/client
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-sm">
              <Database className="w-4 h-4" />
              API Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(metrics.apiCalls / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-purple-400 mt-1">
              ${(metrics.apiCalls * 0.0002).toLocaleString()} revenue
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-400 flex items-center gap-2 text-sm">
              <Network className="w-4 h-4" />
              Dispensary Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {metrics.dispensaryPartners}
            </div>
            <div className="text-sm text-orange-400 mt-1">
              +23 this month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Tiers Performance */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            Enterprise Tier Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {enterpriseTiers.map((tier, index) => (
              <motion.div 
                key={tier.name}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">{tier.name}</h3>
                  <Badge variant="outline" className="text-green-400 border-green-500/30">
                    ${tier.price}/mo
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Clients:</span>
                    <span className="text-white font-medium">{tier.clients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Revenue:</span>
                    <span className="text-green-400 font-medium">${tier.revenue.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-700">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scaling Opportunities */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-purple-400" />
            Revenue Scaling Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {scalingOpportunities.map((opportunity, index) => (
              <motion.div 
                key={opportunity.title}
                className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/30">
                    <opportunity.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">{opportunity.title}</h3>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${opportunity.status === 'Active' ? 'text-green-400 border-green-500/30' : ''}
                          ${opportunity.status === 'Scaling' ? 'text-blue-400 border-blue-500/30' : ''}
                          ${opportunity.status === 'Growing' ? 'text-yellow-400 border-yellow-500/30' : ''}
                          ${opportunity.status === 'New' ? 'text-purple-400 border-purple-500/30' : ''}
                        `}
                      >
                        {opportunity.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{opportunity.description}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Revenue Potential:</span>
                      <span className="text-green-400 font-medium">{opportunity.potential}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Progress value={opportunity.progress} className="flex-1 h-2" />
                      <span className="text-white text-sm font-medium">{opportunity.progress}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-16"
          onClick={() => alert('Enterprise Sales Team activated! Targeting Fortune 500 product companies')}
        >
          <div className="text-center">
            <Target className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Launch Enterprise Sales</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('White-label program launched! Dispensaries can now license AuthiChain')}
        >
          <div className="text-center">
            <Globe className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Expand White-Label</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-purple-500/30 hover:bg-purple-900/20"
          onClick={() => alert('API marketplace opened! Third-party developers can now integrate')}
        >
          <div className="text-center">
            <Code2 className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Monetize API</div>
          </div>
        </Button>
      </div>

      {/* Revenue Projection */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Diamond className="w-5 h-5 text-green-400" />
            12-Month Revenue Projection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$1.2M</div>
              <div className="text-green-400">Q1 Target</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$2.8M</div>
              <div className="text-blue-400">Q2 Target</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$6.4M</div>
              <div className="text-purple-400">Q3 Target</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">$12M</div>
              <div className="text-green-400">Annual Target</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <p className="text-center text-green-300">
              🚀 With enterprise scaling, AuthiChain is projected to reach $12M ARR by combining subscription revenue, 
              white-label licensing, API monetization, and dispensary partnerships.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
