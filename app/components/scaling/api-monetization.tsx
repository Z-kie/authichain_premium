

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Code2,
  Database,
  Zap,
  DollarSign,
  TrendingUp,
  Users,
  Globe,
  Shield,
  Activity,
  BarChart3,
  Settings,
  Key,
  Network,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ApiEndpoint {
  name: string;
  description: string;
  calls: number;
  revenue: number;
  pricing: number;
  category: string;
}

interface ApiClient {
  name: string;
  tier: string;
  calls: number;
  revenue: number;
  status: string;
}

export function ApiMonetization() {
  const [selectedTier, setSelectedTier] = useState<string>('developer');

  const apiEndpoints: ApiEndpoint[] = [
    {
      name: '/api/product/item-verify',
      description: 'Verify product item authenticity and genetics',
      calls: 847293,
      revenue: 169458,
      pricing: 0.20,
      category: 'Authentication'
    },
    {
      name: '/api/nft/mint',
      description: 'Create NFTs from product package scans',
      calls: 523847,
      revenue: 104769,
      pricing: 0.20,
      category: 'NFT Creation'
    },
    {
      name: '/api/lab/results',
      description: 'Access lab testing data and analytics',
      calls: 392847,
      revenue: 78569,
      pricing: 0.20,
      category: 'Lab Data'
    },
    {
      name: '/api/marketplace/search',
      description: 'Search product NFT marketplace',
      calls: 1847392,
      revenue: 18474,
      pricing: 0.01,
      category: 'Marketplace'
    },
    {
      name: '/api/analytics/insights',
      description: 'Product market analytics and trends',
      calls: 284739,
      revenue: 56948,
      pricing: 0.20,
      category: 'Analytics'
    }
  ];

  const apiClients: ApiClient[] = [
    {
      name: 'LeafTech Solutions',
      tier: 'Enterprise',
      calls: 2847392,
      revenue: 28474,
      status: 'Active'
    },
    {
      name: 'Product Analytics Pro',
      tier: 'Business',
      calls: 1293847,
      revenue: 12938,
      status: 'Active'
    },
    {
      name: 'GreenApp Mobile',
      tier: 'Developer',
      calls: 584729,
      revenue: 2924,
      status: 'Active'
    },
    {
      name: 'Dispensary Chain API',
      tier: 'Enterprise',
      calls: 3847293,
      revenue: 38473,
      status: 'Active'
    }
  ];

  const pricingTiers = [
    {
      name: 'Developer',
      price: 0,
      limit: 10000,
      features: [
        '10k API calls/month',
        'Basic endpoints',
        'Community support',
        'Rate limit: 100/hour'
      ],
      color: 'green'
    },
    {
      name: 'Business',
      price: 299,
      limit: 500000,
      features: [
        '500k API calls/month',
        'All endpoints',
        'Priority support',
        'Rate limit: 1000/hour',
        'Custom integrations'
      ],
      color: 'blue'
    },
    {
      name: 'Enterprise',
      price: 999,
      limit: -1,
      features: [
        'Unlimited API calls',
        'All endpoints + premium',
        'Dedicated support',
        'No rate limits',
        'Custom development',
        'SLA guarantee'
      ],
      color: 'purple'
    }
  ];

  const totalApiRevenue = apiEndpoints.reduce((sum, endpoint) => sum + endpoint.revenue, 0);
  const totalApiCalls = apiEndpoints.reduce((sum, endpoint) => sum + endpoint.calls, 0);

  return (
    <div className="space-y-8">
      {/* API Overview */}
      <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            AuthiChain API Monetization Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {(totalApiCalls / 1000000).toFixed(1)}M
              </div>
              <div className="text-blue-400">Monthly API Calls</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                ${(totalApiRevenue / 1000).toFixed(0)}k
              </div>
              <div className="text-green-400">Monthly Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {apiClients.length}
              </div>
              <div className="text-purple-400">Active Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                ${((totalApiRevenue * 12) / 1000).toFixed(0)}k
              </div>
              <div className="text-green-400">Annual Projection</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="endpoints" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/5 border-gray-700">
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="clients">API Clients</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Tiers</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        {/* API Endpoints */}
        <TabsContent value="endpoints">
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/20 border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                            {endpoint.category}
                          </Badge>
                          <code className="text-green-400 font-mono text-sm bg-slate-800 px-2 py-1 rounded">
                            {endpoint.name}
                          </code>
                        </div>
                        <p className="text-gray-300 text-sm">{endpoint.description}</p>
                      </div>
                      
                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-white">
                          ${(endpoint.revenue / 1000).toFixed(0)}k
                        </div>
                        <div className="text-sm text-green-400">Monthly Revenue</div>
                      </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400 text-sm">
                          {endpoint.calls.toLocaleString()} calls/month
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400 text-sm">
                          ${endpoint.pricing}/call
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400 text-sm">
                          {((endpoint.calls * endpoint.pricing / endpoint.revenue - 1) * 100).toFixed(1)}% growth
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* API Clients */}
        <TabsContent value="clients">
          <div className="grid lg:grid-cols-2 gap-6">
            {apiClients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/20 border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{client.name}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${client.tier === 'Enterprise' ? 'text-purple-400 border-purple-500/30' : ''}
                          ${client.tier === 'Business' ? 'text-blue-400 border-blue-500/30' : ''}
                          ${client.tier === 'Developer' ? 'text-green-400 border-green-500/30' : ''}
                        `}
                      >
                        {client.tier}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Calls:</span>
                        <span className="text-white font-medium">
                          {(client.calls / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Revenue:</span>
                        <span className="text-green-400 font-medium">
                          ${client.revenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge 
                          variant="outline" 
                          className="text-green-400 border-green-500/30"
                        >
                          {client.status}
                        </Badge>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-700">
                        <div className="text-sm text-gray-400 mb-2">Usage Trend:</div>
                        <Progress value={85} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">
                          85% of tier limit used
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Pricing Tiers */}
        <TabsContent value="pricing">
          <div className="grid lg:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`border-gray-700 cursor-pointer transition-all ${
                    selectedTier === tier.name.toLowerCase() 
                      ? `bg-${tier.color}-900/20 border-${tier.color}-500` 
                      : 'bg-black/20 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedTier(tier.name.toLowerCase())}
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      {tier.name === 'Developer' && <Code2 className="w-5 h-5 text-green-400" />}
                      {tier.name === 'Business' && <Users className="w-5 h-5 text-blue-400" />}
                      {tier.name === 'Enterprise' && <Globe className="w-5 h-5 text-purple-400" />}
                      {tier.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">
                          ${tier.price}
                        </span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {tier.limit === -1 ? 'Unlimited calls' : `${tier.limit.toLocaleString()} calls included`}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 bg-${tier.color}-400 rounded-full`}></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full mt-6 bg-gradient-to-r from-${tier.color}-500 to-${tier.color}-600 hover:from-${tier.color}-600 hover:to-${tier.color}-700`}
                      onClick={() => alert(`${tier.name} API tier selected! Setting up developer portal...`)}
                    >
                      Select {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Performance Analytics */}
        <TabsContent value="analytics">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Usage Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={endpoint.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 text-sm">{endpoint.category}</span>
                        <span className="text-white text-sm">
                          {((endpoint.calls / totalApiCalls) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={(endpoint.calls / totalApiCalls) * 100} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Revenue Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={endpoint.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 text-sm">{endpoint.category}</span>
                        <span className="text-green-400 text-sm">
                          ${(endpoint.revenue / 1000).toFixed(1)}k
                        </span>
                      </div>
                      <Progress 
                        value={(endpoint.revenue / totalApiRevenue) * 100} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* API Actions */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-16"
          onClick={() => alert('Developer portal launched! Third-party integrations now live')}
        >
          <div className="text-center">
            <Code2 className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Launch Dev Portal</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-green-500/30 hover:bg-green-900/20"
          onClick={() => alert('API marketplace opened! Developers can now discover and integrate')}
        >
          <div className="text-center">
            <Globe className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">API Marketplace</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-purple-500/30 hover:bg-purple-900/20"
          onClick={() => alert('Enterprise API program launched! Custom integrations available')}
        >
          <div className="text-center">
            <Network className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Enterprise APIs</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-yellow-500/30 hover:bg-yellow-900/20"
          onClick={() => alert('API optimization tools activated! Maximizing monetization')}
        >
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Optimize Revenue</div>
          </div>
        </Button>
      </div>

      {/* Revenue Projections */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            API Revenue Scaling Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$960k</div>
              <div className="text-green-400">Current Annual Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$2.4M</div>
              <div className="text-blue-400">With Enterprise Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$4.8M</div>
              <div className="text-purple-400">With Marketplace Launch</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">$8M</div>
              <div className="text-green-400">Full Scale Target</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
