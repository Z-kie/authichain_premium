
'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles, TrendingUp } from 'lucide-react';
import { SubscriptionButton } from './subscription-button';
import { SubscriptionTier } from '@/lib/types';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

interface UpgradePromptProps {
  feature: string;
  currentUsage?: number;
  limit?: number;
}

export function UpgradePrompt({ feature, currentUsage, limit }: UpgradePromptProps) {
  const { data: session } = useSession() || {};
  const user = session?.user as any;
  const currentTier = user?.subscriptionTier || SubscriptionTier.BASIC;

  if (currentTier === SubscriptionTier.BRAND) {
    return null; // Already on highest tier
  }

  const suggestedTier = currentTier === SubscriptionTier.BASIC ? SubscriptionTier.PRO : SubscriptionTier.BRAND;
  const plan = SUBSCRIPTION_PLANS[suggestedTier];

  return (
    <Card className="border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-amber-400" />
            <CardTitle className="text-white">Upgrade Required</CardTitle>
          </div>
          <Badge className="bg-amber-500 text-black">
            {suggestedTier === SubscriptionTier.PRO ? 'Pro' : 'Brand'}
          </Badge>
        </div>
        <CardDescription className="text-gray-300">
          You've reached the limit for {feature}. 
          {currentUsage && limit && ` (${currentUsage}/${limit})`}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <strong>Upgrade to {plan.name} for:</strong>
        </div>
        <ul className="text-sm text-gray-400 space-y-1">
          {plan.features.slice(0, 3).map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        
        <SubscriptionButton
          tier={suggestedTier}
          price={plan.price}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
        >
          Upgrade to {plan.name} - ${plan.price}/month
        </SubscriptionButton>
      </CardContent>
    </Card>
  );
}
