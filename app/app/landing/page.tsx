'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Shield, Zap, Users, TrendingUp, ArrowRight, Star, Lock, Globe } from 'lucide-react';
import Link from 'next/link';
import ConversionCTA from '@/components/landing/ConversionCTA';
import SocialProof from '@/components/landing/SocialProof';
import PricingComparison from '@/components/landing/PricingComparison';
import FeatureShowcase from '@/components/landing/FeatureShowcase';
import TrustBadges from '@/components/landing/TrustBadges';

export default function LandingPage() {
  const [email, setEmail] = useState('');

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to signup with email prefilled
    window.location.href = `/auth/signup?email=${encodeURIComponent(email)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Stop Counterfeit Products
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                With Blockchain
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              AuthiChain helps manufacturers authenticate products, protect their brand, 
              and build trust with blockchain-verified NFTs. Join 600+ brands saving millions.
            </p>

            {/* Email Capture Form */}
            <form onSubmit={handleGetStarted} className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-purple-200 text-sm mt-4">
                ✨ First 100 products FREE • No credit card required • Setup in 5 minutes
              </p>
            </form>

            {/* Trust Indicators */}
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The $1.82 Trillion Counterfeit Problem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every year, brands lose billions to counterfeit products. Consumers lose trust. 
              Your reputation suffers. AuthiChain provides the solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Problem Side */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-red-600 mb-6">Without AuthiChain:</h3>
              <div className="space-y-4">
                {[
                  'Counterfeit products damage your brand',
                  'Lost revenue from fake products',
                  'Customer trust eroded by fakes',
                  'No way to verify product authenticity',
                  'Supply chain visibility gaps',
                  'Legal liabilities from counterfeits',
                ].map((problem, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xl">✗</span>
                    </div>
                    <p className="text-gray-700 font-medium">{problem}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Side */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-green-600 mb-6">With AuthiChain:</h3>
              <div className="space-y-4">
                {[
                  'Every product gets a unique blockchain ID',
                  'Instant verification with QR codes',
                  'Full supply chain transparency',
                  'Build consumer trust and loyalty',
                  'Reduce counterfeit losses by 90%+',
                  'Protect your brand reputation',
                ].map((solution, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 font-medium">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <FeatureShowcase />

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How AuthiChain Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to protect your products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Mint Product NFTs',
                description: 'Create unique blockchain certificates for each product. Add photos, specs, and provenance data.',
                icon: Shield,
              },
              {
                step: '2',
                title: 'Generate QR Codes',
                description: 'Get printable QR codes for every product. Customers scan to verify authenticity instantly.',
                icon: Zap,
              },
              {
                step: '3',
                title: 'Track & Monitor',
                description: 'Monitor authentication patterns, detect counterfeits, and gain supply chain insights.',
                icon: TrendingUp,
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-6">
                    {step.step}
                  </div>
                  <step.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              See Your ROI in Minutes
            </h2>
            <p className="text-xl text-purple-100">
              Most manufacturers save 10x what they invest
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 text-gray-900">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Products manufactured per month:
                </label>
                <input
                  type="number"
                  placeholder="e.g., 10,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average product value:
                </label>
                <input
                  type="number"
                  placeholder="e.g., $100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Your Estimated Savings:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Counterfeit Prevention</p>
                    <p className="text-2xl font-bold text-green-600">$450,000/yr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Brand Protection</p>
                    <p className="text-2xl font-bold text-green-600">$200,000/yr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">AuthiChain Cost</p>
                    <p className="text-2xl font-bold text-purple-600">$11,988/yr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Net Savings</p>
                    <p className="text-3xl font-bold text-green-600">$638,012/yr</p>
                  </div>
                </div>
                <p className="text-center text-lg font-bold text-gray-900 mt-6">
                  ROI: <span className="text-green-600">5,323%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingComparison />

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about AuthiChain
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                title: 'CEO, Luxury Watches Co.',
                content: 'AuthiChain reduced our counterfeit losses by 95%. The ROI was immediate and our customers love the verification feature.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                title: 'Head of Operations, ElectroTech',
                content: 'Setup was incredibly easy. Within a week, we had 10,000 products authenticated. The supply chain visibility is a game-changer.',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                title: 'Brand Manager, Pharma Plus',
                content: 'Our customers trust us more than ever. The blockchain verification gives them confidence they\'re getting genuine products.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How quickly can I get started?',
                a: 'Most manufacturers are up and running in under 30 minutes. Our onboarding wizard guides you through every step, and our support team is available 24/7.',
              },
              {
                q: 'What if I have thousands of products?',
                a: 'AuthiChain scales effortlessly. Our Enterprise tier handles unlimited products with bulk minting, API access, and dedicated support.',
              },
              {
                q: 'Is blockchain secure?',
                a: 'Absolutely. We use Polygon blockchain with military-grade encryption. Once minted, your product certificates are immutable and tamper-proof.',
              },
              {
                q: 'Can customers verify without an app?',
                a: 'Yes! Customers simply scan the QR code with any smartphone camera. No app download required. They instantly see blockchain-verified authenticity.',
              },
              {
                q: 'What if I need white-label solutions?',
                a: 'Our Enterprise tier includes white-label options. Use your own branding, custom domain, and integrate seamlessly with your existing systems.',
              },
            ].map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  {faq.q}
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <ConversionCTA />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                AuthiChain
              </h3>
              <p className="text-gray-400">
                Blockchain-powered product authentication for the modern brand.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/api">API</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AuthiChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
