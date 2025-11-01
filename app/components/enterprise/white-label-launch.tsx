

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Globe,
  Palette,
  Settings,
  Rocket,
  Building2,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

interface WhiteLabelProgram {
  id: string;
  name: string;
  tier: string;
  price: number;
  setup: number;
  features: string[];
  targetMarket: string;
  signups: number;
  revenue: number;
}

export function WhiteLabelLaunch() {
  const [activePhase, setActivePhase] = useState(1);
  const [programData, setProgramData] = useState({
    dispensaryName: '',
    locations: '',
    contactPerson: '',
    email: '',
    phone: '',
    tier: '',
    customBranding: false,
    apiAccess: false,
    mobileApp: false
  });

  const whiteLabelPrograms: WhiteLabelProgram[] = [
    {
      id: 'dispensary-starter',
      name: 'Dispensary Starter',
      tier: 'Bronze',
      price: 499,
      setup: 2500,
      features: ['Custom branding', 'QR scanning', 'Basic analytics', 'Customer portal'],
      targetMarket: 'Single dispensaries',
      signups: 47,
      revenue: 23453
    },
    {
      id: 'multi-location',
      name: 'Multi-Location Pro',
      tier: 'Silver',
      price: 999,
      setup: 7500,
      features: ['Multi-location', 'Advanced branding', 'API access', 'Priority support'],
      targetMarket: 'Dispensary chains (2-25 locations)',
      signups: 23,
      revenue: 22977
    },
    {
      id: 'enterprise-platform',
      name: 'Enterprise Platform',
      tier: 'Gold',
      price: 2499,
      setup: 25000,
      features: ['Unlimited locations', 'Full customization', 'Dedicated support', 'Revenue sharing'],
      targetMarket: 'Major product operations',
      signups: 8,
      revenue: 19992
    }
  ];

  const launchPhases = [
    {
      phase: 1,
      name: 'Program Setup',
      description: 'Configure white-label packages and pricing',
      status: 'complete',
      tasks: [
        'Define pricing tiers ✓',
        'Create feature packages ✓',
        'Setup billing automation ✓',
        'Configure onboarding flow ✓'
      ]
    },
    {
      phase: 2,
      name: 'Marketing Launch',
      description: 'Launch marketing campaigns to target dispensaries',
      status: 'active',
      tasks: [
        'Create landing pages ✓',
        'Launch email campaigns 🔄',
        'Social media promotion 🔄',
        'Industry partnerships 📝'
      ]
    },
    {
      phase: 3,
      name: 'Sales Activation',
      description: 'Activate sales team and demo processes',
      status: 'pending',
      tasks: [
        'Train sales team 📝',
        'Setup demo automation 📝',
        'Create proposal templates 📝',
        'Launch referral program 📝'
      ]
    },
    {
      phase: 4,
      name: 'Scale & Optimize',
      description: 'Scale successful programs and optimize conversion',
      status: 'pending',
      tasks: [
        'Analyze conversion metrics 📝',
        'Optimize pricing strategy 📝',
        'Expand target markets 📝',
        'Launch partner network 📝'
      ]
    }
  ];

  const dispensaryPartners = [
    {
      name: 'Green Valley Collective',
      tier: 'Multi-Location Pro',
      locations: 8,
      status: 'Active',
      monthlyRevenue: 7992,
      launchDate: '2024-01-15'
    },
    {
      name: 'Purple Mountain Dispensary',
      tier: 'Enterprise Platform',
      locations: 12,
      status: 'Implementation',
      monthlyRevenue: 29988,
      launchDate: '2024-02-01'
    },
    {
      name: 'Golden State Product',
      tier: 'Enterprise Platform',
      locations: 24,
      status: 'Active',
      monthlyRevenue: 59976,
      launchDate: '2024-01-01'
    }
  ];

  const handleProgramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`White-label application submitted for ${programData.dispensaryName}! Our team will contact you within 24 hours with a custom proposal.`);
  };

  return (
    <div className="space-y-8">
      {/* White-Label Program Overview */}
      <Card className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-green-900/20 border border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-400" />
            White-Label Product NFT Program Launch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">78</div>
              <div className="text-purple-400">Program Signups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$574k</div>
              <div className="text-green-400">Annual Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">44</div>
              <div className="text-blue-400">Active Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">156</div>
              <div className="text-orange-400">Prospect Pipeline</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Launch Phases */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-orange-400" />
            White-Label Program Launch Phases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            {launchPhases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  phase.status === 'complete' ? 'bg-green-900/20 border-green-500/30' :
                  phase.status === 'active' ? 'bg-blue-900/20 border-blue-500/30' :
                  'bg-slate-800/30 border-gray-700'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActivePhase(phase.phase)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    phase.status === 'complete' ? 'bg-green-500 text-white' :
                    phase.status === 'active' ? 'bg-blue-500 text-white' :
                    'bg-gray-600 text-gray-300'
                  }`}>
                    {phase.phase}
                  </div>
                  <h3 className="font-bold text-white">{phase.name}</h3>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{phase.description}</p>
                
                <div className="space-y-2">
                  {phase.tasks.map((task, i) => (
                    <div key={i} className="text-xs text-gray-400">
                      {task}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Badge 
                    variant="outline" 
                    className={`
                      ${phase.status === 'complete' ? 'text-green-400 border-green-500/30' : ''}
                      ${phase.status === 'active' ? 'text-blue-400 border-blue-500/30' : ''}
                      ${phase.status === 'pending' ? 'text-gray-400 border-gray-500/30' : ''}
                    `}
                  >
                    {phase.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* White-Label Programs */}
      <div className="grid lg:grid-cols-3 gap-6">
        {whiteLabelPrograms.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-black/20 border-gray-700 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{program.name}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${program.tier === 'Bronze' ? 'text-orange-400 border-orange-500/30' : ''}
                      ${program.tier === 'Silver' ? 'text-gray-400 border-gray-500/30' : ''}
                      ${program.tier === 'Gold' ? 'text-yellow-400 border-yellow-500/30' : ''}
                    `}
                  >
                    {program.tier}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    ${program.price}<span className="text-lg text-gray-400">/mo</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    ${program.setup.toLocaleString()} setup fee
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Features:</div>
                  {program.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Target:</span>
                    <span className="text-white">{program.targetMarket}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">Signups:</span>
                    <span className="text-green-400">{program.signups}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="text-green-400">${program.revenue.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => alert(`${program.name} program activated! Marketing campaigns launched to target ${program.targetMarket}.`)}
                >
                  Launch Program
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Active White-Label Partners */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-green-400" />
            Active White-Label Partners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {dispensaryPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="p-6 bg-slate-800/30 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-bold text-white mb-2">{partner.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tier:</span>
                    <span className="text-blue-400">{partner.tier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Locations:</span>
                    <span className="text-white">{partner.locations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Revenue:</span>
                    <span className="text-green-400">${partner.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${partner.status === 'Active' ? 'text-green-400 border-green-500/30' : 'text-yellow-400 border-yellow-500/30'}
                      `}
                    >
                      {partner.status}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* White-Label Application Form */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            White-Label Program Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProgramSubmit} className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="dispensaryName" className="text-white">Dispensary/Company Name</Label>
                <Input
                  id="dispensaryName"
                  value={programData.dispensaryName}
                  onChange={(e) => setProgramData({...programData, dispensaryName: e.target.value})}
                  placeholder="e.g. Green Valley Collective"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="contactPerson" className="text-white">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={programData.contactPerson}
                  onChange={(e) => setProgramData({...programData, contactPerson: e.target.value})}
                  placeholder="e.g. John Smith, CEO"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={programData.email}
                  onChange={(e) => setProgramData({...programData, email: e.target.value})}
                  placeholder="john@greenvalley.com"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input
                  id="phone"
                  value={programData.phone}
                  onChange={(e) => setProgramData({...programData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="locations" className="text-white">Number of Locations</Label>
                <Input
                  id="locations"
                  value={programData.locations}
                  onChange={(e) => setProgramData({...programData, locations: e.target.value})}
                  placeholder="e.g. 5"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="tier" className="text-white">Preferred Tier</Label>
                <Select value={programData.tier} onValueChange={(value) => setProgramData({...programData, tier: value})}>
                  <SelectTrigger className="bg-slate-800 border-gray-700">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dispensary-starter">Dispensary Starter ($499/mo)</SelectItem>
                    <SelectItem value="multi-location">Multi-Location Pro ($999/mo)</SelectItem>
                    <SelectItem value="enterprise">Enterprise Platform ($2,499/mo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="customBranding"
                    checked={programData.customBranding}
                    onCheckedChange={(checked) => setProgramData({...programData, customBranding: checked})}
                  />
                  <Label htmlFor="customBranding" className="text-white">Custom Branding</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="apiAccess"
                    checked={programData.apiAccess}
                    onCheckedChange={(checked) => setProgramData({...programData, apiAccess: checked})}
                  />
                  <Label htmlFor="apiAccess" className="text-white">API Access</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="mobileApp"
                    checked={programData.mobileApp}
                    onCheckedChange={(checked) => setProgramData({...programData, mobileApp: checked})}
                  />
                  <Label htmlFor="mobileApp" className="text-white">Mobile App</Label>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Submit White-Label Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-16"
          onClick={() => alert('White-label marketing automation launched! Targeted campaigns reaching 500+ dispensaries nationwide.')}
        >
          <div className="text-center">
            <Rocket className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Launch Marketing</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-green-500/30 hover:bg-green-900/20"
          onClick={() => alert('Partner portal activated! Existing partners can manage their white-label deployments.')}
        >
          <div className="text-center">
            <Users className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Partner Portal</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('Onboarding automation activated! New partners get automated setup and deployment.')}
        >
          <div className="text-center">
            <Settings className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Automate Onboarding</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-yellow-500/30 hover:bg-yellow-900/20"
          onClick={() => alert('Revenue optimization activated! White-label pricing and packages optimized for maximum revenue.')}
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
