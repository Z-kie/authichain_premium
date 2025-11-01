
'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Mail, 
  Target,
  Gift,
  Zap,
  Award,
  BarChart,
  Megaphone,
  Link as LinkIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Import existing components
import { GooglixReferralSystem } from './googlix-referral-system';
import { AffiliateDashboard } from './affiliate-dashboard';
import { LeadMagnetShowcase } from './lead-magnet-forms';
import { LaunchSpecialsContent } from './launch-specials-content';
import { 
  LaunchSpecialCallout, 
  SocialProofBanner,
  CountdownTimer
} from './promotional-elements';

interface MarketingStats {
  totalLeads: number;
  conversionRate: number;
  monthlyRevenue: number;
  activeAffiliates: number;
  campaignPerformance: {
    name: string;
    clicks: number;
    conversions: number;
    revenue: number;
  }[];
}

export function EnhancedMarketingDashboard() {
  const [stats] = useState<MarketingStats>({
    totalLeads: 12847,
    conversionRate: 23.4,
    monthlyRevenue: 147293,
    activeAffiliates: 342,
    campaignPerformance: [
      { name: 'Launch Specials', clicks: 8472, conversions: 1834, revenue: 89420 },
      { name: 'Free Resources', clicks: 5629, conversions: 892, revenue: 31280 },
      { name: 'Affiliate Program', clicks: 3847, conversions: 567, revenue: 26593 }
    ]
  });

  // Calculate countdown for launch specials (7 days from now)
  const launchEndDate = new Date();
  launchEndDate.setDate(launchEndDate.getDate() + 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
            🚀 AuthiChain Marketing Command Center
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Complete marketing system powered by proven Googlix methodology. 
            Generate leads, convert customers, and scale revenue with our battle-tested campaigns.
          </p>

          {/* Quick Stats */}
          <div className="grid lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-400">{stats.totalLeads.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Total Leads</div>
                    </div>
                    <Users className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{stats.conversionRate}%</div>
                      <div className="text-sm text-gray-400">Conversion Rate</div>
                    </div>
                    <Target className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-purple-400">${stats.monthlyRevenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Monthly Revenue</div>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-orange-400">{stats.activeAffiliates}</div>
                      <div className="text-sm text-gray-400">Active Affiliates</div>
                    </div>
                    <Award className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Launch Special Alert */}
          <LaunchSpecialCallout />
        </motion.div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-8 max-w-7xl mx-auto">
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="launch-specials">🎁 Launch Specials</TabsTrigger>
            <TabsTrigger value="lead-magnets">📧 Lead Magnets</TabsTrigger>
            <TabsTrigger value="referrals">💰 Referrals</TabsTrigger>
            <TabsTrigger value="affiliates">🤝 Affiliates</TabsTrigger>
            <TabsTrigger value="campaigns">📢 Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
            <TabsTrigger value="automation">⚡ Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Campaign Performance */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart className="mr-2 h-5 w-5" />
                    Campaign Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.campaignPerformance.map((campaign, index) => (
                    <div key={campaign.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{campaign.name}</span>
                        <Badge className="bg-green-900/30 text-green-300 border-green-500/50">
                          ${campaign.revenue.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(campaign.conversions / campaign.clicks) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{campaign.clicks.toLocaleString()} clicks</span>
                        <span>{campaign.conversions.toLocaleString()} conversions</span>
                        <span>{((campaign.conversions / campaign.clicks) * 100).toFixed(1)}% CVR</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Quick Marketing Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button asChild variant="outline" className="h-20 flex-col">
                      <Link href="/launch-specials">
                        <Gift className="h-6 w-6 mb-2" />
                        <span className="text-xs">Launch Specials</span>
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="h-20 flex-col">
                      <Link href="/free-resources">
                        <Mail className="h-6 w-6 mb-2" />
                        <span className="text-xs">Lead Magnets</span>
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="h-20 flex-col">
                      <Link href="/affiliate">
                        <Award className="h-6 w-6 mb-2" />
                        <span className="text-xs">Affiliate Center</span>
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="h-20 flex-col">
                      <Link href="/pricing">
                        <TrendingUp className="h-6 w-6 mb-2" />
                        <span className="text-xs">Pricing Page</span>
                      </Link>
                    </Button>
                  </div>

                  <div className="space-y-3 mt-6">
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-white font-medium">Launch countdown</span>
                      <Badge className="bg-red-900/30 text-red-300 border-red-500/50">
                        6 days left
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-white font-medium">Affiliate payouts</span>
                      <Badge className="bg-green-900/30 text-green-300 border-green-500/50">
                        Due Oct 15
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-white font-medium">Campaign optimization</span>
                      <Badge className="bg-blue-900/30 text-blue-300 border-blue-500/50">
                        Weekly review
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Proof */}
            <SocialProofBanner />
          </TabsContent>

          <TabsContent value="launch-specials">
            <LaunchSpecialsContent />
          </TabsContent>

          <TabsContent value="lead-magnets">
            <LeadMagnetShowcase />
          </TabsContent>

          <TabsContent value="referrals">
            <GooglixReferralSystem />
          </TabsContent>

          <TabsContent value="affiliates">
            <AffiliateDashboard />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                🎯 Marketing Campaigns
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Manage and optimize your marketing campaigns with proven templates and automation.
              </p>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">🚀 Launch Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Complete launch sequences with emails, social posts, and landing pages.
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/launch-specials">
                        View Launch Specials
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">📧 Email Sequences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Automated email campaigns for nurturing, conversion, and retention.
                    </p>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/free-resources">
                        Get Email Templates
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">📱 Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Social media campaigns with proven copy and creative assets.
                    </p>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/affiliate">
                        Access Social Assets
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                📈 Marketing Analytics
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Track performance, measure ROI, and optimize campaigns with detailed analytics.
              </p>

              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 max-w-4xl mx-auto">
                <CardContent className="pt-8">
                  <div className="text-center space-y-6">
                    <BarChart className="h-16 w-16 text-blue-400 mx-auto" />
                    <h3 className="text-2xl font-bold text-white">
                      Advanced Analytics Coming Soon
                    </h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      We're building comprehensive marketing analytics with conversion tracking, 
                      attribution modeling, ROI calculations, and predictive insights.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-white">Revenue Attribution</h4>
                        <p className="text-sm text-gray-400">Track revenue by campaign source</p>
                      </div>
                      <div className="text-center">
                        <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-white">Conversion Funnels</h4>
                        <p className="text-sm text-gray-400">Analyze user journey and optimize</p>
                      </div>
                      <div className="text-center">
                        <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-white">Cohort Analysis</h4>
                        <p className="text-sm text-gray-400">Track user behavior over time</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                ⚡ Marketing Automation
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Automate your marketing with webhooks, triggers, and intelligent sequences.
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <LinkIcon className="mr-2 h-5 w-5" />
                      Webhook Endpoints
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 mb-4">
                      Connect external services and trigger automated marketing sequences.
                    </p>
                    
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Available Webhooks:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Lead capture and qualification</li>
                        <li>• Signup and onboarding sequences</li>
                        <li>• Subscription lifecycle events</li>
                        <li>• NFT sales and milestone celebrations</li>
                        <li>• Referral conversion tracking</li>
                      </ul>
                    </div>

                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Webhook URL:</h4>
                      <code className="text-xs text-green-400 break-all">
                        {process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app'}/api/marketing/automation/webhook
                      </code>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                      <Link href="/api/marketing/automation/webhook" target="_blank">
                        View Documentation
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Mail className="mr-2 h-5 w-5" />
                      Email Automation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 mb-4">
                      Triggered email sequences based on user behavior and events.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-white">Welcome Series</span>
                        <Badge className="bg-green-900/30 text-green-300 border-green-500/50">
                          Active
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-white">Launch Bonus Sequence</span>
                        <Badge className="bg-green-900/30 text-green-300 border-green-500/50">
                          Active
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-white">Upgrade Campaigns</span>
                        <Badge className="bg-blue-900/30 text-blue-300 border-blue-500/50">
                          Testing
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-white">Win-back Series</span>
                        <Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-500/50">
                          Draft
                        </Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Configure Sequences
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
