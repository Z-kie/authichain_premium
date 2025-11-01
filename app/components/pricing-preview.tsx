
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Crown, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { SubscriptionButton } from '@/components/premium/subscription-button';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';
import { SubscriptionTier } from '@/lib/types';

export function PricingPreview() {
  const plans = Object.values(SUBSCRIPTION_PLANS);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-6 w-6 text-amber-400 mr-2" />
              <span className="text-amber-400 font-semibold">Pricing</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include essential features with premium options for power users.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className={`relative h-full ${
                plan.tier === SubscriptionTier.PRO 
                  ? 'border-amber-500/50 shadow-lg shadow-amber-500/20' 
                  : plan.tier === SubscriptionTier.BRAND
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
                  : 'border-gray-700'
              } bg-white/5 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                {plan.tier === SubscriptionTier.PRO && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-amber-500 text-black font-semibold px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    {plan.tier === SubscriptionTier.BASIC && <Star className="h-6 w-6 text-white" />}
                    {plan.tier === SubscriptionTier.PRO && <Crown className="h-6 w-6 text-white" />}
                    {plan.tier === SubscriptionTier.BRAND && <Sparkles className="h-6 w-6 text-white" />}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {plan.tier === SubscriptionTier.BASIC && 'Perfect for getting started'}
                    {plan.tier === SubscriptionTier.PRO && 'Best for serious collectors'}
                    {plan.tier === SubscriptionTier.BRAND && 'For professional creators'}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-6">
                  <SubscriptionButton
                    tier={plan.tier}
                    price={plan.price}
                    className={`w-full ${
                      plan.tier === SubscriptionTier.BASIC
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : plan.tier === SubscriptionTier.PRO
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    }`}
                  >
                    {plan.tier === SubscriptionTier.BASIC ? 'Get Started Free' : `Subscribe - $${plan.price}/mo`}
                  </SubscriptionButton>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" asChild className="border-gray-600 hover:border-purple-500">
            <Link href="/pricing">
              View Full Pricing Details
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
