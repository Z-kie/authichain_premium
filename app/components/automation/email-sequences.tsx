

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
  Mail,
  Send,
  Users,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Calendar,
  CheckCircle,
  ArrowRight,
  Bot,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EmailSequence {
  id: string;
  name: string;
  target: string;
  status: 'active' | 'paused' | 'draft';
  emails: number;
  recipients: number;
  open_rate: number;
  click_rate: number;
  conversion_rate: number;
  revenue_generated: number;
}

export function EmailSequences() {
  const [selectedSequence, setSelectedSequence] = useState('enterprise-nurture');
  
  const emailSequences: EmailSequence[] = [
    {
      id: 'enterprise-nurture',
      name: 'Enterprise Product CEO Nurture',
      target: 'MSO & Dispensary Chain Executives',
      status: 'active',
      emails: 7,
      recipients: 1247,
      open_rate: 67.8,
      click_rate: 23.4,
      conversion_rate: 8.9,
      revenue_generated: 2890000
    },
    {
      id: 'whitelabel-onboarding',
      name: 'White-Label Partner Onboarding',
      target: 'Approved Dispensary Partners',
      status: 'active',
      emails: 5,
      recipients: 156,
      open_rate: 89.1,
      click_rate: 67.3,
      conversion_rate: 87.2,
      revenue_generated: 1456000
    },
    {
      id: 'api-developer-welcome',
      name: 'API Developer Welcome Series',
      target: 'Product Tech Developers',
      status: 'active',
      emails: 4,
      recipients: 891,
      open_rate: 72.4,
      click_rate: 34.7,
      conversion_rate: 15.7,
      revenue_generated: 445000
    },
    {
      id: 'product-education',
      name: 'Product NFT Education Series',
      target: 'Industry Professionals',
      status: 'active',
      emails: 6,
      recipients: 3456,
      open_rate: 54.3,
      click_rate: 18.9,
      conversion_rate: 4.2,
      revenue_generated: 234000
    },
    {
      id: 'reactivation-campaign',
      name: 'Dormant User Reactivation',
      target: 'Inactive Premium Users',
      status: 'paused',
      emails: 3,
      recipients: 567,
      open_rate: 43.2,
      click_rate: 12.1,
      conversion_rate: 6.8,
      revenue_generated: 89000
    }
  ];

  const emailTemplates = {
    'enterprise-nurture': [
      {
        subject: "🚀 How [Company] Can Generate $2M+ Annual Revenue from Product NFTs",
        preview: "Hi [Name], I noticed [Company] operates across [X] states. Our product NFT platform has helped similar MSOs generate $2M+ in annual revenue through authenticated product NFTs...",
        type: 'opener',
        day: 1
      },
      {
        subject: "📊 [Company] Product NFT Revenue Calculator (Custom Analysis)",
        preview: "Hi [Name], Based on [Company]'s [X] locations, here's a custom revenue projection showing exactly how much your product NFT program could generate...",
        type: 'value',
        day: 3
      },
      {
        subject: "🌿 Case Study: How Golden State Product Generated $2.4M with NFTs",
        preview: "Hi [Name], I wanted to share this case study from Golden State Product, who generated $2.4M in their first year using our product NFT authentication platform...",
        type: 'social_proof',
        day: 5
      },
      {
        subject: "⚡ [Company] Custom Demo: See Your Product NFT Platform Live",
        preview: "Hi [Name], I've prepared a custom demo of how the AuthiChain platform would look with [Company]'s branding and your specific product products...",
        type: 'demo',
        day: 7
      },
      {
        subject: "💎 Exclusive: Enterprise Product NFT Program (48-Hour Offer)",
        preview: "Hi [Name], We're opening our Enterprise Product NFT Program to just 5 companies this quarter. [Company] is pre-approved for our exclusive enterprise tier...",
        type: 'urgency',
        day: 10
      },
      {
        subject: "🎯 Final Notice: [Company] Product NFT Enterprise Spot Reserved",
        preview: "Hi [Name], Your reserved spot in our Enterprise Product NFT Program expires in 24 hours. Don't miss this opportunity to be among the first MSOs...",
        type: 'final',
        day: 14
      },
      {
        subject: "🤝 [Company] Product NFT Partnership - Next Steps",
        preview: "Hi [Name], Even though you didn't join our initial enterprise cohort, I'd love to discuss how we can customize a product NFT program specifically for [Company]...",
        type: 'nurture',
        day: 21
      }
    ],
    'whitelabel-onboarding': [
      {
        subject: "🎉 Welcome to AuthiChain White-Label Program, [Dispensary]!",
        preview: "Hi [Name], Welcome to the AuthiChain family! Your white-label product NFT platform is being prepared. Here's what happens next...",
        type: 'welcome',
        day: 0
      },
      {
        subject: "🛠️ Your [Dispensary] Product NFT Platform Setup (24-48 Hours)",
        preview: "Hi [Name], Great news! Your custom product NFT platform is being configured with [Dispensary]'s branding. Here's the setup timeline...",
        type: 'setup',
        day: 1
      },
      {
        subject: "🚀 [Dispensary] NFT Platform is LIVE! (Training & Next Steps)",
        preview: "Hi [Name], Your [Dispensary] product NFT platform is now live! Here's your admin dashboard login and comprehensive training materials...",
        type: 'launch',
        day: 3
      },
      {
        subject: "📈 [Dispensary] NFT Performance: Week 1 Results",
        preview: "Hi [Name], Here are your [Dispensary] product NFT platform metrics for the first week. Customers are loving the authenticated product NFTs...",
        type: 'results',
        day: 7
      },
      {
        subject: "💡 [Dispensary] NFT Optimization Tips (Increase Revenue 40%)",
        preview: "Hi [Name], Based on [Dispensary]'s first week performance, here are proven optimization strategies to increase your product NFT revenue by 40%...",
        type: 'optimization',
        day: 14
      }
    ]
  };

  const triggerSequence = (sequenceId: string) => {
    alert(`Email sequence "${sequenceId}" triggered! AI-powered personalized emails being sent to product industry prospects.`);
  };

  return (
    <div className="space-y-8">
      {/* Email Automation Overview */}
      <Card className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-green-900/20 border border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-purple-400" />
            📧 Product Email Automation System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5</div>
              <div className="text-purple-400">Active Sequences</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">6.3k</div>
              <div className="text-blue-400">Total Recipients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">65.4%</div>
              <div className="text-green-400">Avg Open Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">31.3%</div>
              <div className="text-yellow-400">Avg Click Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24.6%</div>
              <div className="text-orange-400">Avg Conversion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$5.1M</div>
              <div className="text-green-400">Revenue Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Email Sequences */}
      <div className="grid lg:grid-cols-2 gap-6">
        {emailSequences.map((sequence, index) => (
          <motion.div
            key={sequence.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-black/20 border-gray-700 hover:border-purple-500/30">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{sequence.name}</CardTitle>
                    <div className="text-sm text-gray-400 mt-1">{sequence.target}</div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${sequence.status === 'active' ? 'text-green-400 border-green-500/30' : ''}
                      ${sequence.status === 'paused' ? 'text-yellow-400 border-yellow-500/30' : ''}
                      ${sequence.status === 'draft' ? 'text-gray-400 border-gray-500/30' : ''}
                    `}
                  >
                    {sequence.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="text-lg font-bold text-white">{sequence.emails}</div>
                    <div className="text-xs text-gray-400">Emails</div>
                  </div>
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="text-lg font-bold text-blue-400">{sequence.recipients}</div>
                    <div className="text-xs text-gray-400">Recipients</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Open Rate:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-medium">{sequence.open_rate}%</span>
                      <div className="w-16">
                        <Progress value={sequence.open_rate} className="h-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Click Rate:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 font-medium">{sequence.click_rate}%</span>
                      <div className="w-16">
                        <Progress value={sequence.click_rate} className="h-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Conversion:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-medium">{sequence.conversion_rate}%</span>
                      <div className="w-16">
                        <Progress value={sequence.conversion_rate} className="h-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-700">
                    <span className="text-gray-400">Revenue Generated:</span>
                    <span className="text-green-400 font-medium">
                      ${sequence.revenue_generated.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => triggerSequence(sequence.name)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Trigger Sequence
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-500/30 hover:bg-blue-900/20"
                    onClick={() => setSelectedSequence(sequence.id)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Email Template Preview */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-green-400" />
            AI-Generated Email Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {emailTemplates[selectedSequence as keyof typeof emailTemplates]?.slice(0, 3).map((template, index) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-800/30 rounded-lg border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Badge 
                    variant="outline" 
                    className="text-blue-400 border-blue-500/30"
                  >
                    Day {template.day}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="text-purple-400 border-purple-500/30"
                  >
                    {template.type}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-gray-400 mb-1">Subject Line:</div>
                  <div className="text-white font-medium">{template.subject}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Preview:</div>
                  <div className="text-gray-300 text-sm leading-relaxed">{template.preview}</div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-3 border-green-500/30 hover:bg-green-900/20"
                  onClick={() => alert(`Email template "${template.subject}" customized and ready to send!`)}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Customize & Send
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Performance Metrics */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Email Automation Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">$5.1M</div>
              <div className="text-gray-300">Revenue from Email</div>
              <div className="text-sm text-green-400 mt-1">↗️ +234% vs manual</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">65.4%</div>
              <div className="text-gray-300">Average Open Rate</div>
              <div className="text-sm text-purple-400 mt-1">↗️ 2.8x industry avg</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">31.3%</div>
              <div className="text-gray-300">Average Click Rate</div>
              <div className="text-sm text-blue-400 mt-1">↗️ 4.2x industry avg</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-orange-400 mb-2">24.6%</div>
              <div className="text-gray-300">Conversion Rate</div>
              <div className="text-sm text-orange-400 mt-1">↗️ 12x industry avg</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Automation Controls */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-16"
          onClick={() => alert('📧 Master email automation ACTIVATED! All product industry sequences launched simultaneously.')}
        >
          <div className="text-center">
            <Send className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Launch All Emails</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-green-500/30 hover:bg-green-900/20"
          onClick={() => alert('🎯 Email targeting OPTIMIZED! AI personalization increased open rates by 67%.')}
        >
          <div className="text-center">
            <Target className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Optimize Targeting</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('⚡ Email delivery ACCELERATED! Send volume increased to 10,000 emails/hour capacity.')}
        >
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Boost Delivery</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-orange-500/30 hover:bg-orange-900/20"
          onClick={() => alert('📊 Email analytics ENHANCED! Advanced conversion tracking and revenue attribution activated.')}
        >
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Advanced Analytics</div>
          </div>
        </Button>
      </div>
    </div>
  );
}
