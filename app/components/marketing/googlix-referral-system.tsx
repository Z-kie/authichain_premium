
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Share2, 
  DollarSign, 
  Users,
  TrendingUp,
  Copy,
  CheckCircle,
  Gift,
  Target,
  Award,
  Clock
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

interface ReferralData {
  code: string;
  totalEarnings: number;
  usageCount: number;
  commission: number;
  isActive: boolean;
  conversions: {
    id: string;
    email: string;
    revenue: number;
    commission: number;
    status: string;
    createdAt: string;
  }[];
}

// High-ticket referral system like Googlix's Legendary Marketer affiliate program
export function GooglixReferralSystem() {
  const { data: session } = useSession() || {};
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchReferralData();
    }
  }, [session]);

  const fetchReferralData = async () => {
    try {
      const response = await fetch('/api/googlix/referral-system');
      const data = await response.json();
      setReferralData(data);
    } catch (error) {
      console.error('Failed to fetch referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createReferralCode = async () => {
    try {
      const response = await fetch('/api/googlix/referral-system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session?.user?.id })
      });
      const data = await response.json();
      setReferralData(data);
    } catch (error) {
      console.error('Failed to create referral code:', error);
    }
  };

  const copyReferralLink = () => {
    const referralUrl = `https://authichain.com?ref=${referralData?.code}`;
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
          Product NFT Affiliate Program
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Earn <strong className="text-green-400">25% recurring commissions</strong> for every grower you refer to AuthiChain. 
          Based on the same system that generates <strong>$4k-$5k per sale</strong> in high-ticket programs.
        </p>
      </div>

      {!referralData ? (
        // Onboarding Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-green-900/20 to-purple-900/20 border-green-500/30">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Gift className="w-8 h-8 text-green-500" />
                Start Earning Today
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Share2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Share Your Link</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your unique referral link and share it with product growers
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">They Sign Up</h3>
                  <p className="text-sm text-muted-foreground">
                    Growers join AuthiChain and upgrade to Pro ($29) or Brand ($99)
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">You Get Paid</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn 25% recurring commissions for as long as they stay subscribed
                  </p>
                </div>
              </div>

              <div className="bg-green-600/10 border border-green-500/30 rounded-lg p-6">
                <h4 className="font-bold text-green-400 mb-3">💰 Earnings Potential</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pro Plan Referral:</span>
                    <p className="font-bold text-green-400">$7.25/month each</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Brand Plan Referral:</span>
                    <p className="font-bold text-green-400">$24.75/month each</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">10 Pro referrals:</span>
                    <p className="font-bold">$72.50/month recurring</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">10 Brand referrals:</span>
                    <p className="font-bold">$247.50/month recurring</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={createReferralCode}
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
              >
                <Award className="w-6 h-6 mr-3" />
                Generate My Referral Code
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        // Dashboard Section
        <div className="space-y-8">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Total Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(referralData.totalEarnings)}
                </div>
                <p className="text-xs text-muted-foreground">
                  25% commission rate
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Referrals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {referralData.usageCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active conversions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  Monthly Recurring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(referralData.conversions.reduce((sum, conv) => sum + conv.commission, 0))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Ongoing monthly income
                </p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-600" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {referralData.usageCount > 0 ? '12.5%' : '0%'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Industry leading
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="share" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="share">Share & Earn</TabsTrigger>
              <TabsTrigger value="conversions">Conversions</TabsTrigger>
              <TabsTrigger value="marketing">Marketing Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="share" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-green-500" />
                    Your Referral Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      value={`https://authichain.com?ref=${referralData.code}`}
                      readOnly
                      className="flex-1"
                    />
                    <Button 
                      onClick={copyReferralLink}
                      variant="outline"
                      className={copied ? 'bg-green-600 text-white' : ''}
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>

                  <Alert>
                    <Gift className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Pro Tip:</strong> Target product growers, dispensaries, and cultivators. 
                      They're most likely to need our NFT creation and verification services.
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-green-200 dark:border-green-800">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-green-600 mb-2">🌿 Product Communities</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• r/microgrowery</li>
                          <li>• r/productcultivation</li>
                          <li>• Instagram product accounts</li>
                          <li>• Local grower meetups</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-purple-200 dark:border-purple-800">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-purple-600 mb-2">🎨 NFT Communities</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• OpenSea Discord</li>
                          <li>• NFT Twitter spaces</li>
                          <li>• Crypto art galleries</li>
                          <li>• Web3 product groups</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion History</CardTitle>
                </CardHeader>
                <CardContent>
                  {referralData.conversions.length > 0 ? (
                    <div className="space-y-3">
                      {referralData.conversions.map((conversion) => (
                        <div key={conversion.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                              <DollarSign className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">{conversion.email}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(conversion.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">
                              {formatCurrency(conversion.commission)}
                            </p>
                            <Badge variant={conversion.status === 'PAID' ? 'default' : 'secondary'}>
                              {conversion.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No conversions yet</h3>
                      <p className="text-muted-foreground">
                        Start sharing your referral link to see your first conversions here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marketing" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Marketing Materials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      📊 Product NFT Market Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      🎨 Social Media Graphics Pack
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      📧 Email Templates (5 swipes)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      🎥 Demo Videos & Tutorials
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Payment Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Commission Rate:</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Payment Frequency:</span>
                        <span className="font-medium">Monthly</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Next Payment:</span>
                        <span className="font-medium">1st of next month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Minimum Payout:</span>
                        <span className="font-medium">$50</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
