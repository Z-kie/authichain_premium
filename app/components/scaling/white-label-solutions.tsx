

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Building2,
  Palette,
  Settings,
  Globe,
  Shield,
  Zap,
  Crown,
  Smartphone,
  Database,
  Cloud,
  Code,
  Users,
  DollarSign,
  CheckCircle,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

interface WhiteLabelClient {
  id: string;
  name: string;
  logo: string;
  domain: string;
  locations: number;
  monthlyRevenue: number;
  status: 'Active' | 'Setup' | 'Trial';
  features: string[];
}

export function WhiteLabelSolutions() {
  const [selectedClient, setSelectedClient] = useState<string>('green-leaf');
  
  const whiteLabelClients: WhiteLabelClient[] = [
    {
      id: 'green-leaf',
      name: 'Green Leaf Dispensaries',
      logo: '🌿',
      domain: 'greenleafnfts.com',
      locations: 12,
      monthlyRevenue: 4980,
      status: 'Active',
      features: ['Custom Branding', 'Multi-Location', 'QR Scanning', 'Analytics Dashboard']
    },
    {
      id: 'purple-haze',
      name: 'Rare Diamond Chain',
      logo: '💜',
      domain: 'purplehazenfts.io',
      locations: 8,
      monthlyRevenue: 3192,
      status: 'Active',
      features: ['White-Label', 'API Access', 'Custom Integrations', 'Mobile App']
    },
    {
      id: 'california-gold',
      name: 'California Gold',
      logo: '✨',
      domain: 'cagoldnfts.com',
      locations: 24,
      monthlyRevenue: 9576,
      status: 'Active',
      features: ['Full Platform', 'Unlimited Locations', 'Revenue Share', 'Dedicated Support']
    }
  ];

  const whiteLabelPackages = [
    {
      name: 'Dispensary Starter',
      price: 499,
      setup: 2500,
      description: 'Perfect for single dispensaries wanting branded NFT authentication',
      features: [
        'Custom branding and colors',
        'QR code scanning system',
        'Basic analytics dashboard',
        'Customer support portal',
        'Mobile-responsive design'
      ],
      limitations: ['Single location', 'Basic customization', 'Standard support']
    },
    {
      name: 'Multi-Location Pro',
      price: 999,
      setup: 7500,
      description: 'Ideal for dispensary chains with multiple locations',
      features: [
        'Multi-location management',
        'Advanced branding options',
        'Custom integrations',
        'Advanced analytics',
        'API access',
        'Priority support'
      ],
      limitations: ['Up to 25 locations', 'Monthly customization limits']
    },
    {
      name: 'Enterprise Platform',
      price: 2499,
      setup: 25000,
      description: 'Complete platform licensing for major product operations',
      features: [
        'Unlimited locations',
        'Full source code access',
        'Custom development',
        'Revenue sharing model',
        'Dedicated account manager',
        'White-label mobile apps'
      ],
      limitations: ['Custom pricing for 100+ locations']
    }
  ];

  const customizationOptions = [
    {
      category: 'Branding',
      icon: Palette,
      options: [
        'Custom logo and colors',
        'Brand-specific messaging',
        'Custom domain setup',
        'Themed UI components'
      ]
    },
    {
      category: 'Features',
      icon: Settings,
      options: [
        'QR code customization',
        'Custom NFT templates',
        'Strain verification system',
        'Lab integration setup'
      ]
    },
    {
      category: 'Integrations',
      icon: Database,
      options: [
        'POS system integration',
        'Inventory management',
        'Customer loyalty programs',
        'Payment processing'
      ]
    },
    {
      category: 'Mobile',
      icon: Smartphone,
      options: [
        'Branded mobile app',
        'Push notifications',
        'Offline scanning',
        'Customer rewards'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* White-Label Overview */}
      <Card className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-green-900/20 border border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-400" />
            White-Label Product NFT Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">12</div>
              <div className="text-purple-400">Active Deployments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">44</div>
              <div className="text-blue-400">Total Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$47,880</div>
              <div className="text-green-400">Monthly Recurring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$574k</div>
              <div className="text-green-400">Annual Revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="clients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/5 border-gray-700">
          <TabsTrigger value="clients">Active Clients</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
        </TabsList>

        {/* Active Clients */}
        <TabsContent value="clients">
          <div className="grid lg:grid-cols-3 gap-6">
            {whiteLabelClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all border-gray-700 hover:border-purple-500/50 ${
                    selectedClient === client.id ? 'bg-purple-900/20 border-purple-500' : 'bg-black/20'
                  }`}
                  onClick={() => setSelectedClient(client.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{client.logo}</div>
                      <div>
                        <CardTitle className="text-white text-lg">{client.name}</CardTitle>
                        <div className="text-sm text-gray-400">{client.domain}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Locations:</span>
                        <span className="text-white">{client.locations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Revenue:</span>
                        <span className="text-green-400">${client.monthlyRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${client.status === 'Active' ? 'text-green-400 border-green-500/30' : ''}
                            ${client.status === 'Setup' ? 'text-yellow-400 border-yellow-500/30' : ''}
                            ${client.status === 'Trial' ? 'text-blue-400 border-blue-500/30' : ''}
                          `}
                        >
                          {client.status}
                        </Badge>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-700">
                        <div className="text-sm text-gray-400 mb-2">Features:</div>
                        <div className="flex flex-wrap gap-1">
                          {client.features.map((feature, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Package Options */}
        <TabsContent value="packages">
          <div className="grid lg:grid-cols-3 gap-6">
            {whiteLabelPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/20 border-gray-700 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      {index === 0 && <Building2 className="w-5 h-5 text-green-400" />}
                      {index === 1 && <Crown className="w-5 h-5 text-blue-400" />}
                      {index === 2 && <Star className="w-5 h-5 text-purple-400" />}
                      {pkg.name}
                    </CardTitle>
                    <p className="text-gray-300 text-sm">{pkg.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">${pkg.price}</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        ${pkg.setup.toLocaleString()} setup fee
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {pkg.limitations.length > 0 && (
                      <div className="border-t border-gray-700 pt-3 mb-6">
                        <div className="text-sm text-gray-400 mb-2">Limitations:</div>
                        {pkg.limitations.map((limit, i) => (
                          <div key={i} className="text-xs text-gray-500 mb-1">
                            • {limit}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => alert(`${pkg.name} package selected! Starting onboarding process...`)}
                    >
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Customization Options */}
        <TabsContent value="customization">
          <div className="grid lg:grid-cols-2 gap-6">
            {customizationOptions.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/20 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <category.icon className="w-5 h-5 text-purple-400" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.options.map((option, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
                          <span className="text-gray-300">{option}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Onboarding Process */}
        <TabsContent value="onboarding">
          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">White-Label Onboarding Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Requirements Gathering',
                    description: 'Complete brand audit and technical requirements analysis',
                    duration: '1-2 weeks',
                    status: 'Initial Discovery'
                  },
                  {
                    step: 2,
                    title: 'Custom Development',
                    description: 'Brand customization, feature development, and integrations',
                    duration: '3-6 weeks',
                    status: 'Development Phase'
                  },
                  {
                    step: 3,
                    title: 'Testing & Training',
                    description: 'Quality assurance, staff training, and system optimization',
                    duration: '1-2 weeks',
                    status: 'Pre-Launch'
                  },
                  {
                    step: 4,
                    title: 'Deployment & Support',
                    description: 'Live deployment, monitoring, and ongoing support',
                    duration: 'Ongoing',
                    status: 'Launch & Scale'
                  }
                ].map((phase, index) => (
                  <div key={phase.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-900/30 border border-purple-500/30 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-sm">{phase.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white">{phase.title}</h3>
                        <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                          {phase.duration}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{phase.description}</p>
                      <div className="text-xs text-purple-400">{phase.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-16"
          onClick={() => alert('White-label inquiry form activated! New dispensary partnerships incoming')}
        >
          <div className="text-center">
            <Globe className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Start New Deployment</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('Client portal launched! Existing clients can manage their deployments')}
        >
          <div className="text-center">
            <Users className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Client Portal</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-green-500/30 hover:bg-green-900/20"
          onClick={() => alert('Revenue optimization tools activated! Maximizing white-label profits')}
        >
          <div className="text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Optimize Revenue</div>
          </div>
        </Button>
      </div>
    </div>
  );
}
