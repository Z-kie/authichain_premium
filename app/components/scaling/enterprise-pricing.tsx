

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check,
  Crown,
  Diamond,
  Star,
  Building2,
  Zap,
  Globe,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

export function EnterprisePricing() {
  const enterpriseTiers = [
    {
      name: 'Enterprise',
      price: 499,
      setup: 2500,
      description: 'Perfect for product businesses ready to scale with NFT authentication',
      icon: Building2,
      color: 'green',
      features: [
        'Custom branding & white-label',
        'API access (500k calls/month)',
        'Multi-location support (up to 25)',
        'Advanced analytics dashboard',
        'Priority support',
        'Custom integrations',
        'Mobile app customization',
        'POS system integration'
      ],
      benefits: [
        '$2k+ monthly revenue potential',
        '95% customer retention rate',
        '3x faster customer acquisition',
        'Complete product compliance'
      ]
    },
    {
      name: 'Corporate',
      price: 999,
      setup: 7500,
      description: 'For major dispensary chains and product corporations',
      icon: Crown,
      color: 'blue',
      popular: true,
      features: [
        'Everything in Enterprise',
        'Unlimited API calls',
        'Unlimited locations',
        'Dedicated account manager',
        'Custom development hours',
        'Advanced lab integrations',
        'Real-time compliance monitoring',
        'White-label mobile apps'
      ],
      benefits: [
        '$10k+ monthly revenue potential',
        'Industry-leading ROI',
        'Complete market control',
        'Enterprise SLA guarantee'
      ]
    },
    {
      name: 'Product Chain',
      price: 2499,
      setup: 25000,
      description: 'Full platform licensing for product industry leaders',
      icon: Diamond,
      color: 'purple',
      features: [
        'Everything in Corporate',
        'Full source code access',
        'Revenue sharing model',
        'Custom blockchain integration',
        'Global multi-region support',
        'Advanced AI/ML features',
        'Dedicated development team',
        'Industry partnership access'
      ],
      benefits: [
        '$50k+ monthly revenue potential',
        'Market leadership position',
        'Unlimited growth potential',
        'Strategic partnership access'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Pricing Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
          Enterprise Product NFT Solutions
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Transform your product business with our proven enterprise platform. 
          Join 156+ dispensaries already generating millions in NFT revenue.
        </p>
      </div>

      {/* Success Metrics */}
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
        <CardContent className="pt-6">
          <div className="grid lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white">$847k</div>
              <div className="text-green-400">Monthly Enterprise Revenue</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">156</div>
              <div className="text-blue-400">Active Dispensary Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">2.8M</div>
              <div className="text-purple-400">Monthly API Calls</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">127%</div>
              <div className="text-green-400">Monthly Growth Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Pricing Tiers */}
      <div className="grid lg:grid-cols-3 gap-8">
        {enterpriseTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <Card className={`h-full border-gray-700 ${tier.popular ? 'border-blue-500 bg-blue-900/10' : 'bg-black/20'}`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 bg-${tier.color}-900/30 border border-${tier.color}-500/30 rounded-xl`}>
                    <tier.icon className={`w-8 h-8 text-${tier.color}-400`} />
                  </div>
                </div>
                
                <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                <p className="text-gray-300 text-sm">{tier.description}</p>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-white">${tier.price.toLocaleString()}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    ${tier.setup.toLocaleString()} setup fee
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    Platform Features
                  </h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check className={`w-4 h-4 text-${tier.color}-400 mt-0.5 flex-shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Business Benefits
                  </h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  size="lg" 
                  className={`w-full bg-gradient-to-r from-${tier.color}-500 to-${tier.color}-600 hover:from-${tier.color}-600 hover:to-${tier.color}-700 mt-6`}
                  onClick={() => alert(`${tier.name} enterprise package selected! Starting enterprise onboarding process...`)}
                >
                  Start {tier.name} Plan
                </Button>
                
                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-400 hover:text-white"
                    onClick={() => alert(`Scheduling enterprise demo for ${tier.name} package...`)}
                  >
                    Schedule Demo Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Enterprise Contact */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border border-gray-700">
        <CardContent className="text-center py-12">
          <Globe className="w-12 h-12 text-green-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">
            Need a Custom Enterprise Solution?
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            For product enterprises with 100+ locations, unique requirements, or strategic partnerships, 
            we offer fully customized solutions with dedicated development teams and revenue-sharing models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={() => alert('Enterprise consultation scheduled! Our team will contact you within 24 hours.')}
            >
              Schedule Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-600 hover:border-green-500"
              onClick={() => alert('Enterprise case studies sent to your email! See how other product leaders scaled with AuthiChain.')}
            >
              View Case Studies
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
