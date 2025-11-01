'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SubscriptionTier } from '@/lib/types';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

function SuccessPageContent() {
  const { data: session, update } = useSession() || {};
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams?.get('success');
  const [isUpdating, setIsUpdating] = useState(false);

  const user = session?.user as any;
  const currentTier = user?.subscriptionTier || SubscriptionTier.BASIC;
  const plan = SUBSCRIPTION_PLANS[currentTier as SubscriptionTier];

  useEffect(() => {
    if (success && session) {
      // Update session to reflect new subscription
      setIsUpdating(true);
      update().finally(() => setIsUpdating(false));
    }
  }, [success, session, update]);

  if (!success) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <Card className="bg-white/10 backdrop-blur-sm border-green-500/50 shadow-lg shadow-green-500/20">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              🎉 Welcome to {plan.name}!
            </CardTitle>
            <p className="text-gray-300">
              Your subscription is now active and ready to use.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                {currentTier === SubscriptionTier.PRO && <Crown className="h-5 w-5 text-amber-400" />}
                {currentTier === SubscriptionTier.BRAND && <Sparkles className="h-5 w-5 text-purple-400" />}
                <span className="font-semibold text-white">{plan.name} Plan Active</span>
              </div>
              <p className="text-sm text-gray-400">
                You now have access to all {plan.name} features
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Your New Features:</h4>
              <ul className="space-y-2">
                {plan.features.slice(0, 4).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={() => router.push('/dashboard')}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isUpdating}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Need help? Contact our priority support team anytime.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
