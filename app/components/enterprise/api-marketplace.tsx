

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Code2,
  Database,
  Globe,
  Zap,
  DollarSign,
  Users,
  Activity,
  Key,
  Shield,
  Rocket,
  TrendingUp,
  Network
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ApiEndpoint {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: number;
  calls: number;
  revenue: number;
  developers: number;
  status: 'active' | 'beta' | 'planning';
}

interface Developer {
  id: string;
  name: string;
  company: string;
  tier: 'developer' | 'business' | 'enterprise';
  calls: number;
  revenue: number;
  status: 'active' | 'trial' | 'pending';
}

export function ApiMarketplace() {
  const [selectedTier, setSelectedTier] = useState('business');
  const [developerData, setDeveloperData] = useState({
    name: '',
    company: '',
    email: '',
    use_case: '',
    tier: 'developer',
    expected_calls: ''
  });

  const apiEndpoints: ApiEndpoint[] = [
    {
      id: 'item-verify',
      name: '/api/product/item-verify',
      description: 'Verify product item authenticity and genetics with lab-grade accuracy',
      category: 'Authentication',
      pricing: 0.20,
      calls: 847293,
      revenue: 169458,
      developers: 234,
      status: 'active'
    },
    {
      id: 'nft-mint',
      name: '/api/nft/mint',
      description: 'Create NFTs from product package scans with automatic metadata',
      category: 'NFT Creation',
      pricing: 0.20,
      calls: 523847,
      revenue: 104769,
      developers: 156,
      status: 'active'
    },
    {
      id: 'lab-results',
      name: '/api/lab/results',
      description: 'Access real-time lab testing data and certificates of analysis',
      category: 'Lab Data',
      pricing: 0.20,
      calls: 392847,
      revenue: 78569,
      developers: 89,
      status: 'active'
    },
    {
      id: 'marketplace-search',
      name: '/api/marketplace/search',
      description: 'Search product NFT marketplace with advanced filtering',
      category: 'Marketplace',
      pricing: 0.01,
      calls: 1847392,
      revenue: 18474,
      developers: 345,
      status: 'active'
    },
    {
      id: 'analytics-insights',
      name: '/api/analytics/insights',
      description: 'Product market analytics and trend insights powered by AI',
      category: 'Analytics',
      pricing: 0.20,
      calls: 284739,
      revenue: 56948,
      developers: 67,
      status: 'beta'
    },
    {
      id: 'compliance-check',
      name: '/api/compliance/check',
      description: 'Real-time compliance verification for product operations',
      category: 'Compliance',
      pricing: 0.25,
      calls: 0,
      revenue: 0,
      developers: 12,
      status: 'planning'
    }
  ];

  const topDevelopers: Developer[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      company: 'LeafTech Solutions',
      tier: 'enterprise',
      calls: 2847392,
      revenue: 28474,
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      company: 'Product Analytics Pro',
      tier: 'business',
      calls: 1293847,
      revenue: 12938,
      status: 'active'
    },
    {
      id: '3',
      name: 'Jennifer Park',
      company: 'GreenApp Mobile',
      tier: 'developer',
      calls: 584729,
      revenue: 2924,
      status: 'trial'
    },
    {
      id: '4',
      name: 'David Thompson',
      company: 'Dispensary Chain API',
      tier: 'enterprise',
      calls: 3847293,
      revenue: 38473,
      status: 'active'
    }
  ];

  const marketplaceStats = {
    totalEndpoints: apiEndpoints.length,
    activeDevelopers: 891,
    monthlyApiCalls: apiEndpoints.reduce((sum, ep) => sum + ep.calls, 0),
    monthlyRevenue: apiEndpoints.reduce((sum, ep) => sum + ep.revenue, 0),
    avgResponseTime: '47ms',
    uptime: '99.97%'
  };

  const pricingTiers = [
    {
      name: 'Developer',
      price: 0,
      limit: 10000,
      features: ['10k API calls/month', 'Basic endpoints', 'Community support', 'Rate limit: 100/hour'],
      color: 'green'
    },
    {
      name: 'Business',
      price: 299,
      limit: 500000,
      features: ['500k API calls/month', 'All endpoints', 'Priority support', 'Rate limit: 1000/hour', 'Custom integrations'],
      color: 'blue'
    },
    {
      name: 'Enterprise',
      price: 999,
      limit: -1,
      features: ['Unlimited API calls', 'All endpoints + premium', 'Dedicated support', 'No rate limits', 'Custom development', 'SLA guarantee'],
      color: 'purple'
    }
  ];

  const handleDeveloperSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`API developer account created for ${developerData.name} from ${developerData.company}! API keys and documentation sent to ${developerData.email}.`);
  };

  return (
    <div className="space-y-8">
      {/* API Marketplace Overview */}
      <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            AuthiChain Product NFT API Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{marketplaceStats.totalEndpoints}</div>
              <div className="text-blue-400">API Endpoints</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{marketplaceStats.activeDevelopers}</div>
              <div className="text-green-400">Active Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {(marketplaceStats.monthlyApiCalls / 1000000).toFixed(1)}M
              </div>
              <div className="text-purple-400">Monthly API Calls</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                ${(marketplaceStats.monthlyRevenue / 1000).toFixed(0)}k
              </div>
              <div className="text-green-400">Monthly Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{marketplaceStats.avgResponseTime}</div>
              <div className="text-yellow-400">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{marketplaceStats.uptime}</div>
              <div className="text-green-400">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints Catalog */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            Product NFT API Endpoints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.id}
                className="p-6 bg-slate-800/30 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    variant="outline" 
                    className={`
                      ${endpoint.status === 'active' ? 'text-green-400 border-green-500/30' : ''}
                      ${endpoint.status === 'beta' ? 'text-yellow-400 border-yellow-500/30' : ''}
                      ${endpoint.status === 'planning' ? 'text-gray-400 border-gray-500/30' : ''}
                    `}
                  >
                    {endpoint.status}
                  </Badge>
                  <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                    {endpoint.category}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <code className="text-green-400 font-mono text-sm bg-slate-900/50 px-2 py-1 rounded">
                    {endpoint.name}
                  </code>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{endpoint.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Pricing</div>
                    <div className="text-white font-medium">${endpoint.pricing}/call</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Monthly Calls</div>
                    <div className="text-white font-medium">{endpoint.calls.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Revenue</div>
                    <div className="text-green-400 font-medium">${endpoint.revenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Developers</div>
                    <div className="text-blue-400 font-medium">{endpoint.developers}</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  onClick={() => alert(`${endpoint.name} API documentation opened! Integration guide and examples available.`)}
                >
                  View Documentation
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Developer Signup Form */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-green-400" />
            Join Product NFT API Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeveloperSignup} className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  value={developerData.name}
                  onChange={(e) => setDeveloperData({...developerData, name: e.target.value})}
                  placeholder="e.g. Sarah Chen"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="company" className="text-white">Company</Label>
                <Input
                  id="company"
                  value={developerData.company}
                  onChange={(e) => setDeveloperData({...developerData, company: e.target.value})}
                  placeholder="e.g. LeafTech Solutions"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={developerData.email}
                  onChange={(e) => setDeveloperData({...developerData, email: e.target.value})}
                  placeholder="sarah@leaftech.com"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="tier" className="text-white">API Tier</Label>
                <Select value={developerData.tier} onValueChange={(value) => setDeveloperData({...developerData, tier: value})}>
                  <SelectTrigger className="bg-slate-800 border-gray-700">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer (Free - 10k calls)</SelectItem>
                    <SelectItem value="business">Business ($299 - 500k calls)</SelectItem>
                    <SelectItem value="enterprise">Enterprise ($999 - Unlimited)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="expected_calls" className="text-white">Expected Monthly API Calls</Label>
                <Input
                  id="expected_calls"
                  value={developerData.expected_calls}
                  onChange={(e) => setDeveloperData({...developerData, expected_calls: e.target.value})}
                  placeholder="e.g. 50000"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="use_case" className="text-white">Use Case Description</Label>
                <Textarea
                  id="use_case"
                  value={developerData.use_case}
                  onChange={(e) => setDeveloperData({...developerData, use_case: e.target.value})}
                  placeholder="Describe how you plan to use the product NFT APIs..."
                  className="bg-slate-800 border-gray-700"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                Get API Access + Documentation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Top Developers */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-yellow-400" />
            Top API Developers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {topDevelopers.map((developer, index) => (
              <motion.div
                key={developer.id}
                className="p-6 bg-slate-800/30 rounded-lg border border-gray-700"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-white">{developer.name}</h3>
                    <div className="text-sm text-gray-400">{developer.company}</div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${developer.tier === 'enterprise' ? 'text-purple-400 border-purple-500/30' : ''}
                      ${developer.tier === 'business' ? 'text-blue-400 border-blue-500/30' : ''}
                      ${developer.tier === 'developer' ? 'text-green-400 border-green-500/30' : ''}
                    `}
                  >
                    {developer.tier}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Monthly Calls</div>
                    <div className="text-white font-medium">
                      {(developer.calls / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Monthly Revenue</div>
                    <div className="text-green-400 font-medium">
                      ${developer.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Badge 
                    variant="outline" 
                    className={`
                      ${developer.status === 'active' ? 'text-green-400 border-green-500/30' : ''}
                      ${developer.status === 'trial' ? 'text-yellow-400 border-yellow-500/30' : ''}
                      ${developer.status === 'pending' ? 'text-gray-400 border-gray-500/30' : ''}
                    `}
                  >
                    {developer.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-16"
          onClick={() => alert('Developer portal launched! 891 product tech developers can now access comprehensive API documentation.')}
        >
          <div className="text-center">
            <Globe className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Launch Dev Portal</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-green-500/30 hover:bg-green-900/20"
          onClick={() => alert('API marketing campaign activated! Targeting 2,000+ product technology companies for integration.')}
        >
          <div className="text-center">
            <Rocket className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Marketing Blitz</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-purple-500/30 hover:bg-purple-900/20"
          onClick={() => alert('Enterprise API program launched! Custom integrations and dedicated support for high-volume clients.')}
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
          onClick={() => alert('Revenue optimization activated! API pricing and usage analytics optimized for maximum profitability.')}
        >
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Optimize Revenue</div>
          </div>
        </Button>
      </div>

      {/* Revenue Projections */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            API Marketplace Revenue Scaling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                ${(marketplaceStats.monthlyRevenue * 12 / 1000).toFixed(0)}k
              </div>
              <div className="text-green-400">Current Annual Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$2.4M</div>
              <div className="text-blue-400">With 1000 Developers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$5.8M</div>
              <div className="text-purple-400">With Enterprise Focus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">$12M</div>
              <div className="text-green-400">Full Ecosystem Scale</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
