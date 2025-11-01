
'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ConversionCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Ready to Stop Counterfeits?
        </h2>
        
        <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
          Join 600+ brands protecting their products with blockchain authentication. 
          Start with 100 free products—no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/auth/signup">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all shadow-2xl hover:shadow-3xl flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
          
          <Link href="/pricing">
            <button className="px-8 py-4 bg-white text-purple-700 font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-xl">
              View Pricing
            </button>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-purple-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>100 products free</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Setup in 5 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
