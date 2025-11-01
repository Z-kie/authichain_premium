
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Crown,
  Sparkles,
  Zap,
  Building2,
  Rocket,
  TrendingUp,
  Calendar,
  CreditCard,
  Gift,
  Users,
  DollarSign,
  ArrowUpCircle,
  AlertCircle,
} from 'lucide-react';
import { getGoolixPlan, GoolixTier } from '@/lib/googlix-pricing';
import Link from 'next/link';

interface SubscriptionData {
  tier: string;
  plan: any;
  subscription: any;
  usage: {
    nftsMinted: number;
    nftsLimit: number;
    verificationsUsed: number;
    verificationsLimit: number;
    storageUsed: number;
    storageLimit: number;
  };
  referrals: {
    total: number;
    earnings: number;
  };
}

export function GoolixSubscriptionDashboard() {
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch('/api/subscriptions/status');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'EXPLORER':
        return <Zap className="h-5 w-5" />;
      case 'CREATOR':
        return <Sparkles className="h-5 w-5" />;
      case 'PRO':
        return <Crown className="h-5 w-5" />;
      case 'ENTERPRISE':
        return <Building2 className="h-5 w-5" />;
      case 'AGENCY':
        return <Rocket className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'EXPLORER':
        return 'from-slate-500 to-slate-600';
      case 'CREATOR':
        return 'from-blue-500 to-cyan-500';
      case 'PRO':
        return 'from-purple-500 to-pink-500';
      case 'ENTERPRISE':
        return 'from-amber-500 to-orange-500';
      case 'AGENCY':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0;
    if (limit === 0) return 0;
    return Math.min((used / limit) * 100, 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-gray-400">Loading subscription data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-red-400">Failed to load subscription data</div>
      </div>
    );
  }

  const nftUsagePercent = getUsagePercentage(data.usage.nftsMinted, data.usage.nftsLimit);

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${getTierColor(data.tier)}`}>
                {getTierIcon(data.tier)}
              </div>
              <div>
                <CardTitle className="text-white text-2xl">{data.plan?.name} Plan</CardTitle>
                <CardDescription className="text-gray-400">
                  {data.tier === 'EXPLORER'
                    ? 'Free forever'
                    : `$${data.plan?.price}/month`}
                </CardDescription>
              </div>
            </div>
            <Badge className={`bg-gradient-to-r ${getTierColor(data.tier)} text-white px-4 py-2 text-sm`}>
              {data.tier}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Usage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">NFTs This Month</span>
                <span className="text-lg font-bold text-white">
                  {data.usage.nftsMinted} / {data.usage.nftsLimit === -1 ? '∞' : data.usage.nftsLimit}
                </span>
              </div>
              {data.usage.nftsLimit > 0 && (
                <Progress value={nftUsagePercent} className="h-2" />
              )}
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Verifications</span>
                <span className="text-lg font-bold text-white">
                  {data.usage.verificationsLimit === -1 ? '∞' : data.usage.verificationsLimit}
                </span>
              </div>
              <div className="text-xs text-gray-500">Unlimited available</div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Storage</span>
                <span className="text-lg font-bold text-white">
                  {data.usage.storageLimit === -1 ? '∞' : `${data.usage.storageLimit} GB`}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {data.usage.storageUsed} GB used
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {data.tier === 'EXPLORER' && (
              <Button
                className={`flex-1 bg-gradient-to-r ${getTierColor('CREATOR')} hover:opacity-90`}
                asChild
              >
                <Link href="/pricing">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Upgrade to Creator
                </Link>
              </Button>
            )}

            {data.tier !== 'EXPLORER' && data.tier !== 'AGENCY' && (
              <Button
                className={`flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90`}
                asChild
              >
                <Link href="/pricing">
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Upgrade Plan
                </Link>
              </Button>
            )}

            {data.subscription && (
              <Button
                variant="outline"
                className="flex-1 border-slate-600 hover:bg-slate-800"
                asChild
              >
                <Link href="/dashboard/billing">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Billing
                </Link>
              </Button>
            )}
          </div>

          {/* Subscription Status */}
          {data.subscription && (
            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">
                    {data.subscription.cancelAtPeriodEnd ? 'Expires' : 'Renews'} on:{' '}
                  </span>
                  <span className="text-white">
                    {new Date(data.subscription.currentPeriodEnd).toLocaleDateString()}
                  </span>
                </div>
                {data.subscription.cancelAtPeriodEnd && (
                  <Badge variant="outline" className="border-orange-500 text-orange-500">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Ending Soon
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Referrals Card */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-white">Referrals</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">{data.referrals.total}</div>
                  <div className="text-sm text-gray-400">Total Referrals</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">
                    ${data.referrals.earnings.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400">Earned</div>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                <Link href="/dashboard/referrals">
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Referral Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bonuses Card */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-amber-400" />
              <CardTitle className="text-white">Launch Bonuses</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-amber-400">
                  {data.tier !== 'EXPLORER' ? 'Available!' : 'Upgrade to Unlock'}
                </div>
                <div className="text-sm text-gray-400">
                  {data.tier !== 'EXPLORER'
                    ? 'Access your tier bonuses'
                    : 'Upgrade to access exclusive bonuses'}
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90"
                asChild
              >
                <Link href="/dashboard/bonuses">
                  <Gift className="mr-2 h-4 w-4" />
                  View Bonuses
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Highlights */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Your Plan Includes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.plan?.features.slice(0, 6).map((feature: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <div className={`p-1 rounded bg-gradient-to-r ${getTierColor(data.tier)} mt-0.5`}>
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
          {data.plan?.features.length > 6 && (
            <Button variant="link" className="mt-4 text-purple-400" asChild>
              <Link href="/pricing">
                View all {data.plan.features.length} features →
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
