
'use client';

import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PricingComparison() {
  const tiers = [
    {
      name: 'Starter',
      price: '$299',
      period: '/month',
      description: 'Perfect for small manufacturers',
      features: [
        '1,000 products/month',
        'Basic authentication',
        'QR code generation',
        'Email support',
        'Analytics dashboard',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$999',
      period: '/month',
      description: 'For growing businesses',
      features: [
        '10,000 products/month',
        'Advanced analytics',
        'Supply chain tracking',
        'API access',
        'Priority support',
        'Custom branding',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Unlimited scale',
      features: [
        'Unlimited products',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'Advanced security',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Start free, scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl scale-105'
                  : 'bg-white border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg'
              } transition-all`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-8">
                <span className={`text-5xl font-bold ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                  {tier.price}
                </span>
                <span className={`text-lg ${tier.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                  {tier.period}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${tier.popular ? 'text-yellow-300' : 'text-green-500'}`} />
                    <span className={tier.popular ? 'text-purple-50' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={tier.name === 'Enterprise' ? '/contact' : '/auth/signup'}>
                <button
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    tier.popular
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                  }`}
                >
                  {tier.cta}
                </button>
              </Link>

              {tier.name === 'Starter' && (
                <p className="text-center text-sm mt-4 text-gray-500">
                  First 100 products FREE
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
            <span>✓ Blockchain verification</span>
            <span>✓ QR code generation</span>
            <span>✓ Mobile-optimized</span>
            <span>✓ 99.9% uptime SLA</span>
            <span>✓ GDPR compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
