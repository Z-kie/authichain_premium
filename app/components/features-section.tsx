
'use client';

import { motion } from 'framer-motion';
import { 
  Upload, 
  BarChart3, 
  Crown, 
  Shield, 
  Zap, 
  Users,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Easy NFT Upload',
    description: 'Upload and showcase your NFTs with our intuitive interface. Support for all major blockchain networks.'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track views, engagement, and performance metrics for your NFT collection with detailed insights.'
  },
  {
    icon: Crown,
    title: 'Premium Tiers',
    description: 'Choose from Basic, Pro, or Brand tiers with increasing features and upload limits.'
  },
  {
    icon: Shield,
    title: 'Verified Badges',
    description: 'Get verified status and build trust with our premium verification system for Brand tier users.'
  },
  {
    icon: Zap,
    title: 'Priority Support',
    description: 'Get fast, dedicated support from our team with Pro and Brand tier subscriptions.'
  },
  {
    icon: Users,
    title: 'Custom Branding',
    description: 'Customize your profile with unique usernames and branding options for premium users.'
  }
];

export function FeaturesSection() {
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
              <Sparkles className="h-6 w-6 text-purple-400 mr-2" />
              <span className="text-purple-400 font-semibold">Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything You Need to Showcase
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you display, track, and monetize your NFT collection
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
