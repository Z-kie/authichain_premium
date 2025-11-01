

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  FlaskConical,
  Building2,
  Truck,
  QrCode,
  Shield,
  Leaf,
  Database,
  Smartphone,
  Zap,
  Network,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Integration {
  name: string;
  category: string;
  status: 'Active' | 'Testing' | 'Planned' | 'Development';
  connections: number;
  revenue: number;
  description: string;
  icon: React.ComponentType<any>;
}

interface DispensaryPartner {
  name: string;
  locations: number;
  monthlyScans: number;
  revenue: number;
  status: string;
  logo: string;
}

export function AdvancedProductIntegrations() {
  const [activeTab, setActiveTab] = useState('dispensaries');

  const integrations: Integration[] = [
    {
      name: 'LabResults Pro API',
      category: 'Lab Testing',
      status: 'Active',
      connections: 47,
      revenue: 23400,
      description: 'Real-time product lab testing results and COAs',
      icon: FlaskConical
    },
    {
      name: 'MetricTrack Compliance',
      category: 'Seed-to-Sale',
      status: 'Active',
      connections: 156,
      revenue: 78000,
      description: 'Complete seed-to-sale tracking integration',
      icon: Truck
    },
    {
      name: 'GreenPOS Systems',
      category: 'Point of Sale',
      status: 'Testing',
      connections: 89,
      revenue: 44500,
      description: 'POS system integration for automatic NFT creation',
      icon: Building2
    },
    {
      name: 'CannaScan Mobile',
      category: 'Mobile Scanning',
      status: 'Development',
      connections: 234,
      revenue: 117000,
      description: 'Mobile app for consumer product package scanning',
      icon: Smartphone
    },
    {
      name: 'BlockChain Product',
      category: 'Blockchain',
      status: 'Planned',
      connections: 0,
      revenue: 0,
      description: 'True blockchain NFT minting on Ethereum/Polygon',
      icon: Database
    }
  ];

  const dispensaryPartners: DispensaryPartner[] = [
    {
      name: 'Green Valley Collective',
      locations: 8,
      monthlyScans: 24750,
      revenue: 4950,
      status: 'Premium Partner',
      logo: '🌲'
    },
    {
      name: 'Purple Mountain Dispensary',
      locations: 12,
      monthlyScans: 38900,
      revenue: 7780,
      status: 'Enterprise Partner',
      logo: '⛰️'
    },
    {
      name: 'Golden State Product',
      locations: 24,
      monthlyScans: 67800,
      revenue: 13560,
      status: 'White-Label Client',
      logo: '✨'
    },
    {
      name: 'Ocean Breeze Collective',
      locations: 6,
      monthlyScans: 19200,
      revenue: 3840,
      status: 'Standard Partner',
      logo: '🌊'
    }
  ];

  const labPartners = [
    {
      name: 'CannLabs Testing',
      tests: 12847,
      revenue: 25694,
      integration: 'API Connected',
      status: 'Active'
    },
    {
      name: 'Green Scientific Labs',
      tests: 8394,
      revenue: 16788,
      integration: 'Real-time COAs',
      status: 'Active'
    },
    {
      name: 'Pacific Analytics',
      tests: 15632,
      revenue: 31264,
      integration: 'Automated Results',
      status: 'Active'
    }
  ];

  const complianceFeatures = [
    {
      name: 'Seed-to-Sale Tracking',
      description: 'Complete plant lifecycle monitoring',
      enabled: true,
      coverage: 95
    },
    {
      name: 'Batch Verification',
      description: 'Verify product batches and genealogy',
      enabled: true,
      coverage: 89
    },
    {
      name: 'Lab COA Integration',
      description: 'Automatic lab result verification',
      enabled: true,
      coverage: 78
    },
    {
      name: 'Regulatory Reporting',
      description: 'Automated compliance reporting',
      enabled: false,
      coverage: 45
    }
  ];

  return (
    <div className="space-y-8">
      {/* Integration Overview */}
      <Card className="bg-gradient-to-r from-green-900/20 via-purple-900/20 to-blue-900/20 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Network className="w-6 h-6 text-green-400" />
            Advanced Product Industry Integrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">156</div>
              <div className="text-green-400">Dispensary Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">47</div>
              <div className="text-blue-400">Lab Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">89k</div>
              <div className="text-purple-400">Monthly Scans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$184k</div>
              <div className="text-green-400">Integration Revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/5 border-gray-700">
          <TabsTrigger value="dispensaries">Dispensaries</TabsTrigger>
          <TabsTrigger value="labs">Lab Testing</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
        </TabsList>

        {/* Dispensary Partners */}
        <TabsContent value="dispensaries">
          <div className="grid lg:grid-cols-2 gap-6">
            {dispensaryPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/20 border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{partner.logo}</div>
                      <div>
                        <CardTitle className="text-white text-lg">{partner.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${partner.status === 'Premium Partner' ? 'text-yellow-400 border-yellow-500/30' : ''}
                            ${partner.status === 'Enterprise Partner' ? 'text-purple-400 border-purple-500/30' : ''}
                            ${partner.status === 'White-Label Client' ? 'text-blue-400 border-blue-500/30' : ''}
                            ${partner.status === 'Standard Partner' ? 'text-green-400 border-green-500/30' : ''}
                          `}
                        >
                          {partner.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Locations:</span>
                        <span className="text-white">{partner.locations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Scans:</span>
                        <span className="text-blue-400">{partner.monthlyScans.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Revenue:</span>
                        <span className="text-green-400">${partner.revenue.toLocaleString()}</span>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-700">
                        <div className="text-sm text-gray-400 mb-2">Integration Status:</div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">Fully Integrated</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-black/20 border-gray-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Dispensary Integration Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">🏪 POS Integration</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Automatic NFT creation at checkout</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Real-time inventory tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Customer loyalty integration</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">📱 Customer Experience</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>QR code scanning at dispensary</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Instant NFT collection access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Strain verification and history</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab Testing Integration */}
        <TabsContent value="labs">
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {labPartners.map((lab, index) => (
              <motion.div
                key={lab.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/20 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-blue-400" />
                      {lab.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Tests:</span>
                        <span className="text-white">{lab.tests.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="text-green-400">${lab.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Integration:</span>
                        <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                          {lab.integration}
                        </Badge>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">{lab.status}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Lab Testing Integration Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">🧪 Real-Time Lab Data</h3>
                  <div className="space-y-4">
                    {[
                      { test: 'Cannabinoid Profile', status: 'Active', accuracy: 99.7 },
                      { test: 'Terpene Analysis', status: 'Active', accuracy: 98.4 },
                      { test: 'Pesticide Screening', status: 'Active', accuracy: 99.9 },
                      { test: 'Heavy Metals', status: 'Testing', accuracy: 97.2 },
                      { test: 'Microbials', status: 'Active', accuracy: 99.1 }
                    ].map((test, index) => (
                      <div key={test.test} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            test.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'
                          }`}></div>
                          <span className="text-gray-300">{test.test}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{test.accuracy}%</div>
                          <div className="text-xs text-gray-400">accuracy</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">📊 COA Integration</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <h4 className="font-medium text-green-400 mb-2">Automated COA Verification</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        Certificates of Analysis are automatically verified and linked to NFTs
                      </p>
                      <div className="flex items-center gap-2">
                        <Progress value={94} className="flex-1 h-2" />
                        <span className="text-green-400 text-sm">94% automated</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <h4 className="font-medium text-blue-400 mb-2">Real-Time Results</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        Lab results updated in real-time as tests complete
                      </p>
                      <div className="flex items-center gap-2">
                        <Progress value={87} className="flex-1 h-2" />
                        <span className="text-blue-400 text-sm">87% real-time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Features */}
        <TabsContent value="compliance">
          <div className="space-y-6">
            {complianceFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/20 border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Switch 
                            checked={feature.enabled} 
                            className="data-[state=checked]:bg-green-500"
                          />
                          <h3 className="font-bold text-white">{feature.name}</h3>
                        </div>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                      
                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-white">{feature.coverage}%</div>
                        <div className="text-sm text-gray-400">Coverage</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Progress value={feature.coverage} className="flex-1 h-2" />
                      <Badge 
                        variant="outline" 
                        className={`
                          ${feature.enabled ? 'text-green-400 border-green-500/30' : 'text-gray-400 border-gray-500/30'}
                        `}
                      >
                        {feature.enabled ? 'Active' : 'Disabled'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Mobile Apps */}
        <TabsContent value="mobile">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-purple-400" />
                  Consumer Mobile App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Downloads:</span>
                    <span className="text-white">47,293</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Users:</span>
                    <span className="text-green-400">23,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Scans:</span>
                    <span className="text-blue-400">8,392</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-medium text-white mb-3">App Features:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <QrCode className="w-4 h-4 text-purple-400" />
                        <span>QR Code Scanning</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <Leaf className="w-4 h-4 text-green-400" />
                        <span>NFT Collection Management</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span>Strain Verification</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  Dispensary Staff App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Dispensaries:</span>
                    <span className="text-white">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Staff Users:</span>
                    <span className="text-green-400">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Transactions:</span>
                    <span className="text-blue-400">12,847</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-medium text-white mb-3">Staff Features:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <QrCode className="w-4 h-4 text-purple-400" />
                        <span>Product Verification</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <Database className="w-4 h-4 text-green-400" />
                        <span>Inventory Integration</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <Building2 className="w-4 h-4 text-blue-400" />
                        <span>POS Integration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Blockchain Integration */}
        <TabsContent value="blockchain">
          <Card className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-green-900/20 border border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-6 h-6 text-purple-400" />
                Blockchain NFT Integration (Coming Soon)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
                  <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Ethereum Integration</h3>
                  <p className="text-gray-300 text-sm">
                    True blockchain NFTs on Ethereum mainnet with IPFS metadata storage
                  </p>
                  <Badge variant="outline" className="mt-3 text-yellow-400 border-yellow-500/30">
                    Q1 2024
                  </Badge>
                </div>
                
                <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
                  <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Polygon Scaling</h3>
                  <p className="text-gray-300 text-sm">
                    Low-cost, fast NFT minting on Polygon for high-volume dispensaries
                  </p>
                  <Badge variant="outline" className="mt-3 text-blue-400 border-blue-500/30">
                    Q2 2024
                  </Badge>
                </div>
                
                <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
                  <Network className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Cross-Chain Support</h3>
                  <p className="text-gray-300 text-sm">
                    Multi-chain NFT support across Ethereum, Polygon, and Solana
                  </p>
                  <Badge variant="outline" className="mt-3 text-purple-400 border-purple-500/30">
                    Q3 2024
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Integration Actions */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-16"
          onClick={() => alert('Dispensary partnership program launched! Onboarding new locations')}
        >
          <div className="text-center">
            <Building2 className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Add Dispensaries</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('Lab integration accelerator launched! Connecting more testing facilities')}
        >
          <div className="text-center">
            <FlaskConical className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Connect Labs</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-purple-500/30 hover:bg-purple-900/20"
          onClick={() => alert('Mobile app development accelerated! Consumer and business apps ready')}
        >
          <div className="text-center">
            <Smartphone className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Deploy Mobile</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-yellow-500/30 hover:bg-yellow-900/20"
          onClick={() => alert('Blockchain integration fast-tracked! True NFTs coming soon')}
        >
          <div className="text-center">
            <Database className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Launch Blockchain</div>
          </div>
        </Button>
      </div>
    </div>
  );
}
