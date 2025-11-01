
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, Crown, Sparkles } from 'lucide-react';
import { SubscriptionTier } from '@/lib/types';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface SubscriptionButtonProps {
  tier: SubscriptionTier;
  price: number;
  className?: string;
  children: React.ReactNode;
}

export function SubscriptionButton({ tier, price, className, children }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    if (tier === SubscriptionTier.BASIC) {
      router.push('/auth/signup');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      const { sessionId, url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSubscribe}
      disabled={isLoading}
      className={className}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {tier === SubscriptionTier.PRO && <Crown className="mr-2 h-4 w-4" />}
      {tier === SubscriptionTier.BRAND && <Sparkles className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );
}
