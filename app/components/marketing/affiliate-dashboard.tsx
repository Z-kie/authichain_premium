
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Copy, 
  CheckCircle, 
  Download,
  Share2,
  Award,
  Target,
  BarChart,
  Calendar,
  Link,
  Mail,
  MessageSquare,
  Globe
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

interface AffiliateStats {
  totalEarnings: number;
  monthlyEarnings: number;
  totalReferrals: number;
  activeReferrals: number;
  conversionRate: number;
  tier: string;
  commissionRate: number;
  nextTierTarget: number;
  affiliateCode: string;
  affiliateLink: string;
  payoutSchedule: string;
  lastPayout: string;
  pendingPayout: number;
}

interface MarketingAsset {
  id: string;
  title: string;
  type: 'email' | 'social' | 'banner' | 'video' | 'landing';
  description: string;
  downloadUrl?: string;
  copyContent?: string;
  performance: {
    clicks: number;
    conversions: number;
    conversionRate: number;
  };
}

const marketingAssets: MarketingAsset[] = [
  {
    id: 'email-1',
    title: 'Launch Week Email Campaign',
    type: 'email',
    description: 'High-converting email sequence for AuthiChain launch promotion',
    copyContent: `Subject: 🚀 The NFT platform creators are talking about (limited bonuses inside)

Hi [NAME],

Have you heard about AuthiChain yet?

It's the NFT authentication platform that's helping creators like Sarah M. generate $12,000+ in her first month.

But here's the thing...

They're offering $15,000+ in launch bonuses, but ONLY to the first 500 creators who join.

✅ NFT Marketing Masterclass ($997 value)
✅ 10 Pre-designed NFT Templates ($497 value)  
✅ Email Campaign Swipes ($697 value)
✅ Community Growth Playbook ($497 value)
✅ Monthly Creator Mastermind ($309 value)

Total Value: $2,997 - Yours FREE when you join today.

[Claim Your Launch Bonuses →]

But you need to hurry...

Only [X] spots remaining, and once they're gone, these bonuses disappear forever.

Talk soon,
[YOUR NAME]

P.S. - Sarah started with zero NFT experience. 30 days later, she had her first collection selling out. Her secret? The exact templates and strategies in this launch bonus package.`,
    performance: { clicks: 2847, conversions: 347, conversionRate: 12.2 }
  },
  {
    id: 'social-1',
    title: 'Social Media Post Bundle',
    type: 'social',
    description: '10 high-performing social media posts for Twitter, Instagram, and LinkedIn',
    copyContent: `🧵 TWITTER THREAD:

1/ Just discovered the NFT platform that's changing everything...

AuthiChain isn't just another NFT marketplace.

It's a complete NFT success system that comes with $15,000+ in creator bonuses.

Here's what caught my attention: 🧵

2/ Most NFT platforms just let you mint and list.

AuthiChain gives you:
→ NFT Marketing Masterclass
→ Pre-designed templates  
→ Email campaign swipes
→ Community growth playbook
→ Monthly creator calls

All FREE during launch week.

3/ But here's the crazy part...

These aren't just random bonuses.

They're based on the exact system that helped creators generate $150,000+ in commissions.

Real strategies. Real results.

4/ The launch bonuses end in [X] days.

After that? Gone forever.

If you're serious about NFTs, this is your moment.

[Link in bio] or reply "LAUNCH" for details.

#NFT #AuthiChain #CreatorEconomy`,
    performance: { clicks: 1264, conversions: 189, conversionRate: 15.0 }
  },
  {
    id: 'banner-1',
    title: 'Website Banner Set',
    type: 'banner',
    description: 'Professional banners in multiple sizes for websites and blogs',
    downloadUrl: '/assets/banners/authichain-banner-set.zip',
    performance: { clicks: 892, conversions: 134, conversionRate: 15.0 }
  }
];

export function AffiliateDashboard() {
  const { data: session } = useSession() || {};
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MarketingAsset | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchAffiliateStats();
    }
  }, [session]);

  const fetchAffiliateStats = async () => {
    try {
      const response = await fetch('/api/affiliate/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch affiliate stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'bronze': return 'bg-amber-900/30 text-amber-300 border-amber-500/50';
      case 'silver': return 'bg-slate-900/30 text-slate-300 border-slate-500/50';
      case 'gold': return 'bg-yellow-900/30 text-yellow-300 border-yellow-500/50';
      case 'platinum': return 'bg-purple-900/30 text-purple-300 border-purple-500/50';
      default: return 'bg-gray-900/30 text-gray-300 border-gray-500/50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardContent className="pt-6">
          <Alert>
            <AlertDescription>
              Unable to load affiliate dashboard. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
          💰 Affiliate Control Center
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
          Promote AuthiChain and earn 25-40% recurring commissions. Use our proven marketing materials 
          that generated $150,000+ in affiliate earnings.
        </p>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Badge className={getTierBadgeColor(stats.tier)}>
            <Award className="mr-2 h-4 w-4" />
            {stats.tier?.toUpperCase() || 'BRONZE'} AFFILIATE
          </Badge>
          <Badge className="bg-green-900/30 text-green-300 border-green-500/50">
            {stats.commissionRate}% Commission Rate
          </Badge>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-400" />
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400 mb-1">
                ${stats.totalEarnings?.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-gray-400">
                +${stats.monthlyEarnings?.toLocaleString() || '0'} this month
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-400" />
                Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {stats.totalReferrals || 0}
              </div>
              <div className="text-sm text-gray-400">
                {stats.activeReferrals || 0} active subscribers
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {stats.conversionRate || 0}%
              </div>
              <div className="text-sm text-gray-400">
                Above 12% industry average
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-orange-400" />
                Pending Payout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-400 mb-1">
                ${stats.pendingPayout?.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-gray-400">
                Pays {stats.payoutSchedule || 'monthly'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="links" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="links">🔗 Links & Codes</TabsTrigger>
          <TabsTrigger value="assets">📎 Marketing Assets</TabsTrigger>
          <TabsTrigger value="performance">📊 Performance</TabsTrigger>
          <TabsTrigger value="training">🎓 Training</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Link className="mr-2 h-5 w-5" />
                Your Affiliate Links & Codes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Primary Affiliate Link
                </label>
                <div className="flex items-center space-x-2">
                  <Input 
                    value={stats.affiliateLink || `https://authichain.app/ref/${stats.affiliateCode}`}
                    readOnly 
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Button
                    onClick={() => copyToClipboard(stats.affiliateLink || `https://authichain.app/ref/${stats.affiliateCode}`, 'link')}
                    variant="outline"
                    size="sm"
                  >
                    {copied === 'link' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Affiliate Code
                </label>
                <div className="flex items-center space-x-2">
                  <Input 
                    value={stats.affiliateCode || 'AFFILIATE123'}
                    readOnly 
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Button
                    onClick={() => copyToClipboard(stats.affiliateCode || 'AFFILIATE123', 'code')}
                    variant="outline"
                    size="sm"
                  >
                    {copied === 'code' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Separator className="bg-slate-600" />

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Launch Specials Link
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={`https://authichain.app/launch-specials?ref=${stats.affiliateCode}`}
                      readOnly 
                      className="bg-slate-700 border-slate-600 text-white text-xs"
                    />
                    <Button
                      onClick={() => copyToClipboard(`https://authichain.app/launch-specials?ref=${stats.affiliateCode}`, 'launch')}
                      variant="outline"
                      size="sm"
                    >
                      {copied === 'launch' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Pricing Page Link
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={`https://authichain.app/pricing?ref=${stats.affiliateCode}`}
                      readOnly 
                      className="bg-slate-700 border-slate-600 text-white text-xs"
                    />
                    <Button
                      onClick={() => copyToClipboard(`https://authichain.app/pricing?ref=${stats.affiliateCode}`, 'pricing')}
                      variant="outline"
                      size="sm"
                    >
                      {copied === 'pricing' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Marketplace Link
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={`https://authichain.app/explore?ref=${stats.affiliateCode}`}
                      readOnly 
                      className="bg-slate-700 border-slate-600 text-white text-xs"
                    />
                    <Button
                      onClick={() => copyToClipboard(`https://authichain.app/explore?ref=${stats.affiliateCode}`, 'explore')}
                      variant="outline"
                      size="sm"
                    >
                      {copied === 'explore' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Asset List */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Proven Marketing Assets
                </CardTitle>
                <p className="text-sm text-gray-400">
                  High-converting materials used to generate $150,000+ in affiliate commissions
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketingAssets.map((asset) => (
                  <div 
                    key={asset.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedAsset?.id === asset.id 
                        ? 'bg-blue-900/30 border-blue-500/50' 
                        : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                    }`}
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{asset.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {asset.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{asset.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{asset.performance.clicks} clicks</span>
                      <span>{asset.performance.conversions} conversions</span>
                      <span className="text-green-400">{asset.performance.conversionRate}% CVR</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Asset Preview */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Asset Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedAsset ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{selectedAsset.title}</h3>
                      <Badge className="bg-green-900/30 text-green-300 border-green-500/50">
                        {selectedAsset.performance.conversionRate}% CVR
                      </Badge>
                    </div>
                    
                    {selectedAsset.copyContent && (
                      <div className="space-y-3">
                        <div className="bg-slate-700/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                            {selectedAsset.copyContent.replace(/\[YOUR NAME\]/g, session?.user?.firstName || session?.user?.email?.split('@')[0] || 'YOUR NAME')
                                                     .replace(/\[NAME\]/g, '[RECIPIENT_NAME]')
                                                     .replace(/\[X\]/g, '47')
                                                     .replace(/\[Link in bio\]/g, `https://authichain.app/ref/${stats.affiliateCode}`)}
                          </pre>
                        </div>
                        <Button 
                          onClick={() => copyToClipboard(selectedAsset.copyContent || '', `asset-${selectedAsset.id}`)}
                          className="w-full"
                          variant="outline"
                        >
                          {copied === `asset-${selectedAsset.id}` ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Content
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {selectedAsset.downloadUrl && (
                      <Button className="w-full" asChild>
                        <a href={selectedAsset.downloadUrl} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download Asset
                        </a>
                      </Button>
                    )}

                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Performance Stats</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold text-blue-400">{selectedAsset.performance.clicks}</div>
                          <div className="text-xs text-gray-400">Clicks</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-green-400">{selectedAsset.performance.conversions}</div>
                          <div className="text-xs text-gray-400">Conversions</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-purple-400">{selectedAsset.performance.conversionRate}%</div>
                          <div className="text-xs text-gray-400">Conv. Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Select an asset to preview its content</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Advanced Analytics Coming Soon
                </h3>
                <p className="text-gray-400 max-w-lg mx-auto">
                  We're building detailed performance analytics with conversion tracking, 
                  source attribution, and ROI calculations. Stay tuned!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Affiliate Training Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Module 1: Platform Overview</h4>
                      <p className="text-sm text-gray-400">Understanding AuthiChain's value proposition</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Module 2: Target Audience</h4>
                      <p className="text-sm text-gray-400">Identifying and reaching ideal customers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <Target className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Module 3: Promotion Strategies</h4>
                      <p className="text-sm text-gray-400">Content marketing and social media tactics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Module 4: Advanced Techniques</h4>
                      <p className="text-sm text-gray-400">Email marketing and funnel optimization</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <Globe className="mr-2 h-4 w-4" />
                  Access Training Portal
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Affiliate Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Join 500+ Top Affiliates</h3>
                    <p className="text-gray-400 mb-4">
                      Connect with high-earning affiliates, share strategies, and get support from our team.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">500+</div>
                        <div className="text-xs text-gray-400">Active Affiliates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">$2.8M</div>
                        <div className="text-xs text-gray-400">Total Paid Out</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">24/7</div>
                        <div className="text-xs text-gray-400">Support</div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Join Discord Community
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
