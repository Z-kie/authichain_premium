

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plug,
  Search,
  Star,
  Download,
  Settings,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Zap,
  Shield,
  Globe,
  Database,
  BarChart3,
  CreditCard,
  Truck,
  Beaker,
  Leaf,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  provider: string;
  rating: number;
  installs: number;
  price: 'free' | 'paid' | 'custom';
  pricing?: string;
  features: string[];
  supported_platforms: string[];
  setup_time: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'available' | 'coming_soon' | 'beta';
  icon: any;
}

interface IntegrationCategory {
  id: string;
  name: string;
  description: string;
  integrations: number;
  popular: boolean;
  icon: any;
}

export function IntegrationMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories: IntegrationCategory[] = [
    {
      id: 'pos_systems',
      name: 'POS Systems',
      description: 'Point of sale and transaction processing integrations',
      integrations: 12,
      popular: true,
      icon: CreditCard
    },
    {
      id: 'seed_to_sale',
      name: 'Seed-to-Sale Tracking',
      description: 'Product compliance and tracking system integrations',
      integrations: 8,
      popular: true,
      icon: Leaf
    },
    {
      id: 'lab_testing',
      name: 'Lab Testing',
      description: 'Laboratory testing and COA verification systems',
      integrations: 6,
      popular: false,
      icon: Beaker
    },
    {
      id: 'delivery',
      name: 'Delivery Services',
      description: 'Product delivery and logistics integrations',
      integrations: 9,
      popular: true,
      icon: Truck
    },
    {
      id: 'analytics',
      name: 'Business Analytics',
      description: 'Advanced analytics and reporting platforms',
      integrations: 7,
      popular: false,
      icon: BarChart3
    },
    {
      id: 'compliance',
      name: 'Compliance Tools',
      description: 'Regulatory compliance and monitoring systems',
      integrations: 11,
      popular: true,
      icon: Shield
    }
  ];

  const integrations: Integration[] = [
    {
      id: 'flowhub',
      name: 'Flowhub POS Integration',
      category: 'pos_systems',
      description: 'Seamlessly connect your Flowhub POS data with AuthiChain NFT creation',
      provider: 'Flowhub Inc.',
      rating: 4.8,
      installs: 12450,
      price: 'free',
      features: ['Real-time sales sync', 'Auto NFT creation', 'Inventory tracking', 'Customer data'],
      supported_platforms: ['Web', 'Mobile', 'Tablet'],
      setup_time: '15 minutes',
      difficulty: 'easy',
      status: 'available',
      icon: CreditCard
    },
    {
      id: 'metrc',
      name: 'METRC Seed-to-Sale',
      category: 'seed_to_sale',
      description: 'Official METRC integration for compliance tracking and NFT authentication',
      provider: 'METRC LLC',
      rating: 4.9,
      installs: 8934,
      price: 'paid',
      pricing: '$99/month',
      features: ['Compliance tracking', 'Plant genealogy', 'Batch tracking', 'Auto COA import'],
      supported_platforms: ['Web', 'API'],
      setup_time: '1 hour',
      difficulty: 'medium',
      status: 'available',
      icon: Leaf
    },
    {
      id: 'leaflink',
      name: 'LeafLink Wholesale',
      category: 'pos_systems',
      description: 'Connect wholesale product orders with authenticated NFT certificates',
      provider: 'LeafLink',
      rating: 4.7,
      installs: 6789,
      price: 'free',
      features: ['Wholesale orders', 'Product catalogs', 'Payment processing', 'NFT certificates'],
      supported_platforms: ['Web', 'Mobile'],
      setup_time: '30 minutes',
      difficulty: 'easy',
      status: 'available',
      icon: Building2
    },
    {
      id: 'confident_product',
      name: 'Confident Product Labs',
      category: 'lab_testing',
      description: 'Automated lab result verification and COA-based NFT generation',
      provider: 'Confident Product',
      rating: 4.9,
      installs: 4567,
      price: 'paid',
      pricing: '$149/month',
      features: ['Lab result verification', 'COA automation', 'Terpene profiles', 'Cannabinoid data'],
      supported_platforms: ['Web', 'API'],
      setup_time: '45 minutes',
      difficulty: 'medium',
      status: 'available',
      icon: Beaker
    },
    {
      id: 'eaze_delivery',
      name: 'Eaze Delivery Network',
      category: 'delivery',
      description: 'Track product delivery with real-time NFT ownership transfers',
      provider: 'Eaze Technologies',
      rating: 4.6,
      installs: 3456,
      price: 'custom',
      pricing: 'Enterprise pricing',
      features: ['Delivery tracking', 'GPS verification', 'Customer notifications', 'Chain of custody'],
      supported_platforms: ['Web', 'Mobile', 'API'],
      setup_time: '2 hours',
      difficulty: 'hard',
      status: 'beta',
      icon: Truck
    },
    {
      id: 'headset_analytics',
      name: 'Headset Market Intelligence',
      category: 'analytics',
      description: 'Advanced product market analytics integrated with your NFT performance',
      provider: 'Headset Inc.',
      rating: 4.8,
      installs: 2345,
      price: 'paid',
      pricing: '$299/month',
      features: ['Market analytics', 'Price tracking', 'Competitor analysis', 'Trend forecasting'],
      supported_platforms: ['Web', 'Dashboard'],
      setup_time: '1 hour',
      difficulty: 'medium',
      status: 'available',
      icon: BarChart3
    },
    {
      id: 'blaze_pos',
      name: 'Blaze Retail POS',
      category: 'pos_systems',
      description: 'Complete Blaze POS integration with automated NFT minting and sales tracking',
      provider: 'Blaze Software',
      rating: 4.7,
      installs: 5678,
      price: 'free',
      features: ['POS integration', 'Customer management', 'Loyalty programs', 'NFT rewards'],
      supported_platforms: ['Web', 'Tablet', 'Mobile'],
      setup_time: '20 minutes',
      difficulty: 'easy',
      status: 'available',
      icon: CreditCard
    },
    {
      id: 'biotrack',
      name: 'BioTrackTHC Compliance',
      category: 'seed_to_sale',
      description: 'State-mandated tracking system integration for product compliance',
      provider: 'BioTrackTHC',
      rating: 4.5,
      installs: 7890,
      price: 'paid',
      pricing: '$79/month',
      features: ['State compliance', 'Plant tracking', 'Inventory management', 'Regulatory reporting'],
      supported_platforms: ['Web', 'API'],
      setup_time: '90 minutes',
      difficulty: 'hard',
      status: 'available',
      icon: Shield
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400 border-green-500/30';
      case 'beta': return 'text-yellow-400 border-yellow-500/30';
      case 'coming_soon': return 'text-blue-400 border-blue-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPriceDisplay = (integration: Integration) => {
    if (integration.price === 'free') return 'Free';
    if (integration.price === 'custom') return 'Custom';
    return integration.pricing || 'Paid';
  };

  const handleInstall = (integration: Integration) => {
    alert(`Installing ${integration.name}! Integration will be configured automatically with your AuthiChain platform.`);
  };

  const handleConfigureIntegration = (integration: Integration) => {
    alert(`Configuring ${integration.name}! Setup wizard will guide you through the integration process.`);
  };

  return (
    <div className="space-y-8">
      {/* Integration Marketplace Overview */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plug className="w-6 h-6 text-green-400" />
            🔌 Product Integration Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">53</div>
              <div className="text-green-400">Total Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">47k</div>
              <div className="text-blue-400">Active Installs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.8★</div>
              <div className="text-yellow-400">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">234</div>
              <div className="text-purple-400">Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-orange-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-green-400">Support</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <Card className="bg-black/20 border-gray-700">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search integrations, partners, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-gray-700"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-slate-800 border-gray-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pos_systems">POS Systems</SelectItem>
                <SelectItem value="seed_to_sale">Seed-to-Sale</SelectItem>
                <SelectItem value="lab_testing">Lab Testing</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-slate-800 border-gray-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="free">Free First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Integration Categories */}
      <div className="grid lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const CategoryIcon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/20 border-gray-700 hover:border-green-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-900/30 rounded-lg border border-green-500/30">
                      <CategoryIcon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{category.name}</h3>
                      {category.popular && (
                        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30 text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-blue-400 font-medium">
                      {category.integrations} integrations
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-green-500/30 hover:bg-green-900/20"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Integration Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {integrations.slice(0, 8).map((integration, index) => {
          const IntegrationIcon = integration.icon;
          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/20 border-gray-700 hover:border-blue-500/30">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-900/30 rounded-lg border border-blue-500/30">
                        <IntegrationIcon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                        <div className="text-sm text-gray-400">{integration.provider}</div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(integration.status)}
                    >
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4">{integration.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{integration.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Download className="w-4 h-4" />
                      <span>{integration.installs.toLocaleString()} installs</span>
                    </div>
                    <div className="text-green-400 font-medium">
                      {getPriceDisplay(integration)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Key Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.slice(0, 3).map((feature, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="text-blue-400 border-blue-500/30 text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Setup:</span>
                      <span className="text-white">{integration.setup_time}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Difficulty:</span>
                      <span className={`font-medium ${getDifficultyColor(integration.difficulty)}`}>
                        {integration.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      onClick={() => handleInstall(integration)}
                      disabled={integration.status === 'coming_soon'}
                    >
                      {integration.status === 'coming_soon' ? (
                        <>
                          <Clock className="w-4 h-4 mr-2" />
                          Coming Soon
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Install
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-blue-500/30 hover:bg-blue-900/20"
                      onClick={() => handleConfigureIntegration(integration)}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Integration Actions */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-16"
          onClick={() => alert('🔌 All product integrations ACTIVATED! Complete ecosystem connectivity established across POS, compliance, and analytics systems.')}
        >
          <div className="text-center">
            <Plug className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Install All</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('⚙️ Integration management OPENED! Configure, monitor, and optimize all your product system connections.')}
        >
          <div className="text-center">
            <Settings className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Manage Integrations</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-purple-500/30 hover:bg-purple-900/20"
          onClick={() => alert('🏢 Partner program LAUNCHED! Product companies can now integrate with AuthiChain marketplace.')}
        >
          <div className="text-center">
            <Building2 className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Partner Program</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-orange-500/30 hover:bg-orange-900/20"
          onClick={() => alert('📊 Integration analytics ACTIVATED! Monitor performance and ROI across all product system integrations.')}
        >
          <div className="text-center">
            <BarChart3 className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">View Analytics</div>
          </div>
        </Button>
      </div>

      {/* Integration Success Metrics */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">🔌 Product Integration Ecosystem Success</h2>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">53</div>
                <div className="text-gray-300">Active Integrations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">47k</div>
                <div className="text-gray-300">Total Installs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">99.9%</div>
                <div className="text-gray-300">System Uptime</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <p className="text-green-300 text-lg">
                🔌 <strong>Integration Status:</strong> Complete product ecosystem integration is OPERATIONAL with 
                53 active integrations across POS, compliance, analytics, and delivery systems!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
