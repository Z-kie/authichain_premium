
'use client';

import { Shield, QrCode, BarChart3, Lock, Zap, Globe, Users, TrendingUp } from 'lucide-react';

export default function FeatureShowcase() {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Authentication',
      description: 'Every product gets a unique, tamper-proof blockchain certificate. Immutable and verifiable forever.',
      color: 'purple',
    },
    {
      icon: QrCode,
      title: 'Instant QR Verification',
      description: 'Customers scan QR codes to instantly verify authenticity. No app required, works on any smartphone.',
      color: 'blue',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track authentication patterns, geographic distribution, and gain insights into your supply chain.',
      color: 'green',
    },
    {
      icon: Lock,
      title: 'Military-Grade Security',
      description: 'Bank-level encryption protects your data. SOC 2 compliant with GDPR, CCPA, and HIPAA support.',
      color: 'red',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Mint thousands of NFTs in seconds. API response times under 100ms. Global CDN for instant verification.',
      color: 'yellow',
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Deployed in 45+ countries. Multi-language support. Works offline with later sync.',
      color: 'indigo',
    },
    {
      icon: Users,
      title: 'White-Label Ready',
      description: 'Use your branding, custom domain, and seamless integration with your existing systems.',
      color: 'pink',
    },
    {
      icon: TrendingUp,
      title: 'ROI Tracking',
      description: 'Measure counterfeit reduction, brand protection value, and customer trust improvements.',
      color: 'orange',
    },
  ];

  const colorMap: Record<string, string> = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
    indigo: 'from-indigo-500 to-indigo-600',
    pink: 'from-pink-500 to-pink-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Protect Your Brand
          </h2>
          <p className="text-xl text-gray-600">
            Enterprise-grade features that actually work
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colorMap[feature.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
