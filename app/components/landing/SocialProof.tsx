
'use client';

import { Users, Shield, Globe, TrendingUp } from 'lucide-react';

export default function SocialProof() {
  const stats = [
    { label: 'Brands Protected', value: '600+', icon: Users },
    { label: 'Products Authenticated', value: '10M+', icon: Shield },
    { label: 'Countries', value: '45+', icon: Globe },
    { label: 'Counterfeit Reduction', value: '95%', icon: TrendingUp },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <stat.icon className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Trusted by industry leaders:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {/* Placeholder for company logos */}
            {['Luxury Brand', 'Tech Corp', 'Pharma Inc', 'Auto Parts', 'Fashion House'].map((company, index) => (
              <div key={index} className="px-6 py-3 bg-gray-100 rounded-lg font-bold text-gray-700">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
