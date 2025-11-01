
'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Star, TrendingUp, Calendar, CreditCard } from 'lucide-react';
import { SubscriptionTier } from '@/lib/types';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';
import { SubscriptionButton } from '@/components/premium/subscription-button';
import Link from 'next/link';

export function SubscriptionStatus() {
  const { data: session } = useSession() || {};
  const user = session?.user as any;
  const currentTier = user?.subscriptionTier || SubscriptionTier.BASIC;
  const plan = SUBSCRIPTION_PLANS[currentTier as SubscriptionTier];

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

  const getTierColor = () => {
    switch (currentTier) {
      case SubscriptionTier.PRO:
        return 'from-amber-500 to-orange-500';
      case SubscriptionTier.BRAND:
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
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
          <Badge className={`bg-gradient-to-r ${getTierColor()} text-white`}>
            {currentTier}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-white/5">
            <div className="text-2xl font-bold text-white">
              {plan.nfts_per_month === -1 ? '∞' : plan.nfts_per_month}
            </div>
            <div className="text-xs text-gray-400">NFTs per month</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-white/5">
            <div className="text-2xl font-bold text-white">
              {plan.features.length}
            </div>
            <div className="text-xs text-gray-400">Premium features</div>
          </div>
        </div>

        {currentTier === SubscriptionTier.BASIC && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Upgrade for More Features</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SubscriptionButton
                tier={SubscriptionTier.PRO}
                price={SUBSCRIPTION_PLANS.PRO.price}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Crown className="mr-2 h-4 w-4" />
                Pro - $29/mo
              </SubscriptionButton>
              
              <SubscriptionButton
                tier={SubscriptionTier.BRAND}
                price={SUBSCRIPTION_PLANS.BRAND.price}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Brand - $99/mo
              </SubscriptionButton>
            </div>
          </div>
        )}

        {currentTier !== SubscriptionTier.BASIC && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">Active Subscription</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/billing">
                Manage Billing
              </Link>
            </Button>
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" size="sm" asChild className="border-gray-600 hover:border-purple-500">
            <Link href="/pricing">
              <Calendar className="mr-2 h-4 w-4" />
              View All Plans
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
