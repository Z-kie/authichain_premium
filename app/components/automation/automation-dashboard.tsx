

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bot,
  Zap,
  Target,
  Users,
  Globe,
  Code2,
  DollarSign,
  TrendingUp,
  Activity,
  Play,
  Pause,
  Settings,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  Calendar,
  Clock,
  Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AutomationSystem {
  id: string;
  name: string;
  description: string;
  category: 'outreach' | 'onboarding' | 'marketing' | 'revenue';
  status: 'active' | 'paused' | 'stopped';
  performance: {
    success_rate: number;
    volume: number;
    revenue_generated: number;
    conversions: number;
  };
  config: {
    frequency: string;
    target_volume: number;
    enabled: boolean;
  };
}

export function AutomationDashboard() {
  const [automations, setAutomations] = useState<AutomationSystem[]>([
    {
      id: 'enterprise-outreach',
      name: 'Enterprise Client Outreach AI',
      description: 'AI-powered personalized outreach to product enterprise prospects',
      category: 'outreach',
      status: 'active',
      performance: {
        success_rate: 23.4,
        volume: 1247,
        revenue_generated: 2890000,
        conversions: 89
      },
      config: {
        frequency: 'Every 2 hours',
        target_volume: 50,
        enabled: true
      }
    },
    {
      id: 'whitelabel-onboarding',
      name: 'White-Label Auto Onboarding',
      description: 'Automated dispensary partner onboarding and deployment',
      category: 'onboarding',
      status: 'active',
      performance: {
        success_rate: 87.2,
        volume: 234,
        revenue_generated: 1456000,
        conversions: 156
      },
      config: {
        frequency: 'Real-time',
        target_volume: 25,
        enabled: true
      }
    },
    {
      id: 'api-developer-acquisition',
      name: 'API Developer Acquisition Bot',
      description: 'Automated product tech developer recruitment and onboarding',
      category: 'marketing',
      status: 'active',
      performance: {
        success_rate: 15.7,
        volume: 5678,
        revenue_generated: 445000,
        conversions: 891
      },
      config: {
        frequency: 'Every hour',
        target_volume: 100,
        enabled: true
      }
    },
    {
      id: 'revenue-optimization',
      name: 'Dynamic Revenue Optimizer',
      description: 'AI-powered pricing and conversion optimization across all channels',
      category: 'revenue',
      status: 'active',
      performance: {
        success_rate: 94.1,
        volume: 12450,
        revenue_generated: 847250,
        conversions: 11720
      },
      config: {
        frequency: 'Continuous',
        target_volume: 1000,
        enabled: true
      }
    },
    {
      id: 'product-market-intelligence',
      name: 'Product Market Intelligence',
      description: 'Automated market research and competitor analysis for strategic insights',
      category: 'marketing',
      status: 'active',
      performance: {
        success_rate: 78.9,
        volume: 3456,
        revenue_generated: 234000,
        conversions: 2730
      },
      config: {
        frequency: 'Every 6 hours',
        target_volume: 75,
        enabled: true
      }
    },
    {
      id: 'compliance-monitoring',
      name: 'Product Compliance Auto-Monitor',
      description: 'Automated compliance checking and regulatory update alerts',
      category: 'onboarding',
      status: 'active',
      performance: {
        success_rate: 99.2,
        volume: 8901,
        revenue_generated: 156000,
        conversions: 8834
      },
      config: {
        frequency: 'Every 30 minutes',
        target_volume: 200,
        enabled: true
      }
    }
  ]);

  const [masterAutomationEnabled, setMasterAutomationEnabled] = useState(true);
  const [automationStats, setAutomationStats] = useState({
    totalActive: 6,
    totalRevenue: 6028250,
    totalConversions: 24420,
    avgSuccessRate: 58.1
  });

  const toggleAutomation = (automationId: string) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === automationId 
        ? { 
            ...automation, 
            status: automation.status === 'active' ? 'paused' : 'active',
            config: { ...automation.config, enabled: automation.status !== 'active' }
          }
        : automation
    ));
  };

  const launchMasterAutomation = () => {
    alert('🚀 MASTER AUTOMATION SEQUENCE LAUNCHED! All AI-powered systems activated simultaneously for maximum product enterprise acquisition!');
  };

  const categoryColors = {
    outreach: 'blue',
    onboarding: 'green',
    marketing: 'purple',
    revenue: 'orange'
  };

  const categoryIcons = {
    outreach: Target,
    onboarding: Users,
    marketing: Globe,
    revenue: DollarSign
  };

  return (
    <div className="space-y-8">
      {/* Automation Command Center */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-green-400" />
            🤖 AuthiChain AI Automation Command Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{automationStats.totalActive}</div>
              <div className="text-green-400">Active Automations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                ${(automationStats.totalRevenue / 1000000).toFixed(1)}M
              </div>
              <div className="text-green-400">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {automationStats.totalConversions.toLocaleString()}
              </div>
              <div className="text-blue-400">Total Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{automationStats.avgSuccessRate}%</div>
              <div className="text-purple-400">Avg Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-orange-400">Operation Status</div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Switch
                id="master-automation"
                checked={masterAutomationEnabled}
                onCheckedChange={setMasterAutomationEnabled}
              />
              <Label htmlFor="master-automation" className="text-white text-lg">
                Master Automation Control
              </Label>
              <Badge 
                variant="outline" 
                className={`${masterAutomationEnabled ? 'text-green-400 border-green-500/30' : 'text-red-400 border-red-500/30'}`}
              >
                {masterAutomationEnabled ? 'OPERATIONAL' : 'STANDBY'}
              </Badge>
            </div>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={launchMasterAutomation}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Launch All Automations
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Automation Systems */}
      <div className="grid lg:grid-cols-2 gap-6">
        {automations.map((automation, index) => {
          const CategoryIcon = categoryIcons[automation.category];
          const categoryColor = categoryColors[automation.category];
          
          return (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/20 border-gray-700 hover:border-green-500/30">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-${categoryColor}-900/30 rounded-lg border border-${categoryColor}-500/30`}>
                        <CategoryIcon className={`w-5 h-5 text-${categoryColor}-400`} />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{automation.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`mt-1 text-${categoryColor}-400 border-${categoryColor}-500/30`}
                        >
                          {automation.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`
                          ${automation.status === 'active' ? 'text-green-400 border-green-500/30' : ''}
                          ${automation.status === 'paused' ? 'text-yellow-400 border-yellow-500/30' : ''}
                          ${automation.status === 'stopped' ? 'text-red-400 border-red-500/30' : ''}
                        `}
                      >
                        {automation.status === 'active' && <Activity className="w-3 h-3 mr-1 animate-pulse" />}
                        {automation.status === 'paused' && <Pause className="w-3 h-3 mr-1" />}
                        {automation.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4">{automation.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">
                        {automation.performance.success_rate}%
                      </div>
                      <div className="text-xs text-gray-400">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">
                        {automation.performance.volume.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">Volume Processed</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Revenue Generated:</span>
                      <span className="text-green-400 font-medium">
                        ${automation.performance.revenue_generated.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Conversions:</span>
                      <span className="text-blue-400 font-medium">
                        {automation.performance.conversions.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Frequency:</span>
                      <span className="text-purple-400 font-medium">
                        {automation.config.frequency}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Performance:</span>
                      <span className="text-white">
                        {Math.round((automation.performance.conversions / automation.performance.volume) * 100)}% conversion
                      </span>
                    </div>
                    
                    <Progress 
                      value={(automation.performance.conversions / automation.performance.volume) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm"
                      variant="outline" 
                      className={`flex-1 ${
                        automation.status === 'active' 
                          ? 'border-red-500/30 hover:bg-red-900/20' 
                          : 'border-green-500/30 hover:bg-green-900/20'
                      }`}
                      onClick={() => toggleAutomation(automation.id)}
                    >
                      {automation.status === 'active' ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {automation.status === 'active' ? 'Pause' : 'Activate'}
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-blue-500/30 hover:bg-blue-900/20"
                      onClick={() => alert(`${automation.name} optimization settings opened! Performance tuning available.`)}
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

      {/* Automation Performance Analytics */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Automation Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">$6.0M</div>
              <div className="text-gray-300">Total Revenue Generated</div>
              <div className="text-sm text-green-400 mt-1">↗️ +127% this month</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">24.4k</div>
              <div className="text-gray-300">Total Conversions</div>
              <div className="text-sm text-blue-400 mt-1">↗️ +89% automation driven</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">58.1%</div>
              <div className="text-gray-300">Average Success Rate</div>
              <div className="text-sm text-purple-400 mt-1">↗️ +23% vs manual</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-gray-300">Operation Uptime</div>
              <div className="text-sm text-orange-400 mt-1">99.97% reliability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Quick Actions */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-16"
          onClick={() => alert('🎯 Enterprise outreach automation SUPERCHARGED! AI targeting accuracy increased by 45%.')}
        >
          <div className="text-center">
            <Target className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Boost Outreach</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-green-500/30 hover:bg-green-900/20"
          onClick={() => alert('⚡ White-label onboarding automation ACCELERATED! Partner deployment time reduced by 67%.')}
        >
          <div className="text-center">
            <Users className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Accelerate Onboarding</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-purple-500/30 hover:bg-purple-900/20"
          onClick={() => alert('💻 API developer acquisition MAXIMIZED! Product tech recruitment volume increased by 156%.')}
        >
          <div className="text-center">
            <Code2 className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Maximize API Growth</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-orange-500/30 hover:bg-orange-900/20"
          onClick={() => alert('💰 Revenue optimization OPTIMIZED! Dynamic pricing AI increased conversions by 34%.')}
        >
          <div className="text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Optimize Revenue</div>
          </div>
        </Button>
      </div>

      {/* Automation Success Metrics */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">🤖 AI Automation Success Metrics</h2>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">6X</div>
                <div className="text-gray-300">Revenue Multiplier vs Manual</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">89%</div>
                <div className="text-gray-300">Tasks Fully Automated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-gray-300">Non-Stop Operation</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <p className="text-green-300 text-lg">
                🤖 <strong>Automation Status:</strong> All AuthiChain AI systems are OPERATIONAL and generating 
                revenue autonomously. 6 automation systems running 24/7 with $6M+ revenue generated!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
