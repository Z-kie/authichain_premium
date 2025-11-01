'use client';

import React, { useState } from 'react';
import { Check, X, Crown, Sparkles, Zap, Building2, Rocket, Gift, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GOOGLIX_PLANS, GoolixTier, calculateBonusValue, type GoolixPlan } from '@/lib/googlix-pricing';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function GoolixPricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');
  const [loadingTier, setLoadingTier] = useState<GoolixTier | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubscribe = async (tier: GoolixTier, price: number) => {
    // Free tier - redirect to signup
    if (price === 0) {
      router.push('/auth/signup');
      return;
    }

    // Check if user is logged in
    if (!session?.user) {
      // Redirect to signup with plan parameter
      router.push(`/auth/signup?plan=${tier.toLowerCase()}&billing=${billingPeriod}`);
      return;
    }

    // User is logged in - create checkout session
    setLoadingTier(tier);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier,
          billingPeriod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.redirect) {
          router.push(data.redirect);
          return;
        }
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to start checkout. Please try again.');
    } finally {
      setLoadingTier(null);
    }
  };

  const getTierIcon = (tier: GoolixTier) => {
    switch (tier) {
      case GoolixTier.EXPLORER:
        return <Zap className="h-5 w-5" />;
      case GoolixTier.CREATOR:
        return <Sparkles className="h-5 w-5" />;
      case GoolixTier.PRO:
        return <Crown className="h-5 w-5" />;
      case GoolixTier.ENTERPRISE:
        return <Building2 className="h-5 w-5" />;
      case GoolixTier.AGENCY:
        return <Rocket className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getTierColor = (tier: GoolixTier) => {
    switch (tier) {
      case GoolixTier.EXPLORER:
        return 'from-slate-500 to-slate-600';
      case GoolixTier.CREATOR:
        return 'from-blue-500 to-cyan-500';
      case GoolixTier.PRO:
        return 'from-purple-500 to-pink-500';
      case GoolixTier.ENTERPRISE:
        return 'from-amber-500 to-orange-500';
      case GoolixTier.AGENCY:
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `$${price}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-16 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
          🚀 Launch Special - Limited Time Bonuses!
        </Badge>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Start free, scale as you grow. All plans include NFT authentication, marketplace access, and comprehensive analytics.
        </p>
        
        {/* Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className={`text-sm ${billingPeriod === 'month' ? 'text-white' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'month' ? 'year' : 'month')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600 transition-colors"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingPeriod === 'year' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${billingPeriod === 'year' ? 'text-white' : 'text-gray-500'}`}>
            Yearly <Badge className="ml-2 bg-green-500/20 text-green-300">Save 20%</Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
        {GOOGLIX_PLANS.map((plan) => {
          const bonusValue = calculateBonusValue(plan.bonuses);
          const yearlyPrice = billingPeriod === 'year' ? Math.floor(plan.price * 12 * 0.8) : plan.price;
          
          return (
            <Card
              key={plan.tier}
              className={`relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                  : 'border-slate-800 hover:border-purple-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              {plan.launchBonusUsers && (
                <div className="absolute top-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                  🎁 BONUS: First {plan.launchBonusUsers}
                </div>
              )}

              <CardHeader className="pb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${getTierColor(plan.tier)} mb-4`}>
                  {getTierIcon(plan.tier)}
                </div>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  {plan.tagline}
                </CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {formatPrice(billingPeriod === 'year' ? yearlyPrice : plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-400 text-sm">
                        /{billingPeriod === 'year' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {plan.price > 0 && billingPeriod === 'month' && (
                    <p className="text-xs text-gray-500 mt-1">
                      ${yearlyPrice}/year (save 20%)
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features List */}
                <div className="space-y-2">
                  {plan.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 6 && (
                    <details className="text-sm text-gray-400 cursor-pointer">
                      <summary className="text-purple-400 hover:text-purple-300">
                        + {plan.features.length - 6} more features
                      </summary>
                      <div className="mt-2 space-y-2 ml-2">
                        {plan.features.slice(6).map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>

                {/* Bonuses Section */}
                {plan.bonuses && plan.bonuses.length > 0 && (
                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-semibold text-amber-400">
                        Launch Bonuses (${bonusValue} value)
                      </span>
                    </div>
                    <div className="space-y-2">
                      {plan.bonuses.slice(0, 3).map((bonus, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-lg">{bonus.icon}</span>
                          <div>
                            <p className="text-xs font-medium text-gray-300">{bonus.name}</p>
                            <p className="text-xs text-gray-500">${bonus.value} value</p>
                          </div>
                        </div>
                      ))}
                      {plan.bonuses.length > 3 && (
                        <p className="text-xs text-purple-400">
                          + {plan.bonuses.length - 3} more bonuses
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full bg-gradient-to-r ${getTierColor(plan.tier)} hover:opacity-90 transition-opacity`}
                  onClick={() => handleSubscribe(plan.tier, plan.price)}
                  disabled={loadingTier === plan.tier}
                >
                  {loadingTier === plan.tier ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.price === 0 ? 'Start Free' : 'Get Started'
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Detailed Feature Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-slate-900/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="p-4 text-left text-gray-400 font-medium">Feature</th>
                {GOOGLIX_PLANS.map(plan => (
                  <th key={plan.tier} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getTierColor(plan.tier)}`}>
                        {getTierIcon(plan.tier)}
                      </div>
                      <span className="text-white font-semibold">{plan.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="p-4 text-gray-300">NFTs per month</td>
                {GOOGLIX_PLANS.map(plan => (
                  <td key={plan.tier} className="p-4 text-center text-gray-400">
                    {plan.limits.nftsPerMonth === -1 ? '∞' : plan.limits.nftsPerMonth || 'Browse only'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-gray-300">Authenticity verifications</td>
                {GOOGLIX_PLANS.map(plan => (
                  <td key={plan.tier} className="p-4 text-center text-gray-400">
                    {plan.limits.verificationsPerMonth === -1 ? '∞' : plan.limits.verificationsPerMonth}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-gray-300">Storage</td>
                {GOOGLIX_PLANS.map(plan => (
                  <td key={plan.tier} className="p-4 text-center text-gray-400">
                    {plan.limits.storageGB === -1 ? '∞' : plan.limits.storageGB === 0 ? '-' : `${plan.limits.storageGB} GB`}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-gray-300">Platform fee</td>
                {GOOGLIX_PLANS.map(plan => (
                  <td key={plan.tier} className="p-4 text-center text-gray-400">
                    {plan.platformFee}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-gray-300">API access</td>
                {GOOGLIX_PLANS.map(plan => (
                  <td key={plan.tier} className="p-4 text-center">
                    {plan.limits.apiCalls ? (
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-600 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-gray-300">White-label options</td>
                {GOOGLIX_PLANS.map(plan => (
                  <td key={plan.tier} className="p-4 text-center">
                    {plan.tier === GoolixTier.PRO || plan.tier === GoolixTier.ENTERPRISE || plan.tier === GoolixTier.AGENCY ? (
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-600 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-gray-300">Client accounts</td>
                {GOOGLIX_PLANS.map(plan => (
                  <td key={plan.tier} className="p-4 text-center text-gray-400">
                    {plan.limits.clientAccounts || '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Launch Special Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <Card className="border-2 border-amber-500 bg-gradient-to-r from-amber-900/20 to-orange-900/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-amber-400 flex items-center justify-center gap-2">
              <Gift className="h-6 w-6" />
              Limited-Time Launch Specials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-3xl font-bold text-white mb-2">First 100</div>
                <div className="text-sm text-amber-400 mb-2">Founder's Circle</div>
                <div className="text-xs text-gray-400">
                  Lifetime 50% discount + Founder NFT badge + Direct team access
                </div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-3xl font-bold text-white mb-2">First 500</div>
                <div className="text-sm text-green-400 mb-2">Launch Week Bonanza</div>
                <div className="text-xs text-gray-400">
                  3 months free + $2,497 bonus bundle + Early adopter badge
                </div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-3xl font-bold text-white mb-2">First 2,000</div>
                <div className="text-sm text-blue-400 mb-2">Pioneer Program</div>
                <div className="text-xs text-gray-400">
                  1 month free + $997 bonus package + Pioneer badge
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-400 mb-8">
          Join thousands of creators, brands, and agencies authenticating NFTs with AuthiChain
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            asChild
          >
            <Link href="/auth/signup">Start Free Trial</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
            asChild
          >
            <Link href="/contact">Talk to Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
