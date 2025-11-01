'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Crown, 
  Sparkles, 
  Star,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { SubscriptionTier } from '@/lib/types';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';
import { SubscriptionButton } from '@/components/premium/subscription-button';
import Link from 'next/link';

export default function BillingPage() {
  const { data: session } = useSession() || {};
  const [usage, setUsage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const user = session?.user as any;
  const currentTier = user?.subscriptionTier || SubscriptionTier.BASIC;
  const plan = SUBSCRIPTION_PLANS[currentTier as SubscriptionTier];

  useEffect(() => {
    // Fetch current usage data
    const fetchUsage = async () => {
      try {
        const response = await fetch('/api/usage-stats');
        if (response.ok) {
          const data = await response.json();
          setUsage(data);
        }
      } catch (error) {
        console.error('Error fetching usage:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUsage();
    }
  }, [session]);

  const getTierIcon = () => {
    switch (currentTier) {
      case SubscriptionTier.PRO:
        return <Crown className="h-5 w-5 text-amber-400" />;
      case SubscriptionTier.BRAND:
        return <Sparkles className="h-5 w-5 text-purple-400" />;
      default:
        return <Star className="h-5 w-5 text-gray-400" />;
    }
  };

  const createCustomerPortalSession = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const { url } = await response.json();
      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error creating portal session:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4 text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
          <p className="text-gray-400">Manage your subscription and view usage statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Plan */}
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getTierIcon()}
                  <div>
                    <CardTitle className="text-white">{plan.name} Plan</CardTitle>
                    <CardDescription className="text-gray-400">
                      {currentTier === SubscriptionTier.BASIC ? 'Free forever' : `$${plan.price}/month`}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={`${
                  currentTier === SubscriptionTier.BASIC 
                    ? 'bg-gray-600' 
                    : currentTier === SubscriptionTier.PRO
                    ? 'bg-amber-500'
                    : 'bg-purple-500'
                } text-white`}>
                  Current
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-white">Plan Features:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {plan.features.map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>

              {currentTier !== SubscriptionTier.BASIC && (
                <div className="pt-4 border-t border-gray-700">
                  <Button 
                    onClick={createCustomerPortalSession}
                    variant="outline" 
                    className="w-full border-gray-600 hover:border-purple-500"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Subscription
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Update payment method, view invoices, cancel subscription
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Usage This Month
              </CardTitle>
              <CardDescription className="text-gray-400">
                Track your current usage and limits
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">NFT Uploads</span>
                  <div className="text-right">
                    <div className="text-white font-semibold">
                      {loading ? '...' : usage?.nftUploads || 0} / {plan.nfts_per_month === -1 ? '∞' : plan.nfts_per_month}
                    </div>
                    <div className="text-xs text-gray-400">
                      {plan.nfts_per_month === -1 ? 'Unlimited' : 'Monthly limit'}
                    </div>
                  </div>
                </div>

                {!loading && usage?.nftUploads >= plan.nfts_per_month && plan.nfts_per_month !== -1 && (
                  <Alert className="border-amber-500/50 bg-amber-500/10">
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription className="text-amber-400">
                      You've reached your monthly limit. Upgrade for more uploads!
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Billing Period</span>
                </div>
                <p className="text-sm text-gray-400">
                  {currentTier === SubscriptionTier.BASIC 
                    ? 'No billing cycle - free plan' 
                    : 'Monthly billing on the 1st of each month'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Options */}
          {currentTier !== SubscriptionTier.BRAND && (
            <Card className="lg:col-span-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="mr-2 h-5 w-5 text-amber-400" />
                  Upgrade Your Plan
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Get more features and higher limits with our premium plans
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTier === SubscriptionTier.BASIC && (
                    <div className="p-4 rounded-lg bg-white/5 border border-amber-500/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <Crown className="h-4 w-4 text-amber-400" />
                        <span className="font-medium text-white">Pro Plan</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        50 NFTs/month, custom username, priority support
                      </p>
                      <SubscriptionButton
                        tier={SubscriptionTier.PRO}
                        price={29}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        Upgrade to Pro - $29/mo
                      </SubscriptionButton>
                    </div>
                  )}

                  <div className="p-4 rounded-lg bg-white/5 border border-purple-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span className="font-medium text-white">Brand Plan</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      Unlimited NFTs, verified badge, advanced analytics
                    </p>
                    <SubscriptionButton
                      tier={SubscriptionTier.BRAND}
                      price={99}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {currentTier === SubscriptionTier.PRO ? 'Upgrade to Brand' : 'Get Brand'} - $99/mo
                    </SubscriptionButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
