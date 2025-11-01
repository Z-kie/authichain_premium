
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// High-converting landing page based on Googlix $32k/month system
export function GooglixLanding() {
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(86400); // 24 hours in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Countdown timer for urgency (Googlix technique)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Track conversion (like Googlix system)
    // gtag('event', 'lead_capture', { value: email });
    
    setIsSubmitted(true);
    
    // TODO: Integrate with email service (GetResponse/ConvertKit)
    console.log('Email captured:', email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Hero Section - Googlix Style Hook */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Countdown Timer for Urgency */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Badge className="bg-red-600 text-white text-lg px-6 py-2 animate-pulse">
              <Clock className="w-4 h-4 mr-2" />
              LIMITED TIME: {formatTime(countdown)}
            </Badge>
          </motion.div>

          {/* Main Headline - Direct Hook */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-white to-emerald-400 bg-clip-text text-transparent"
          >
            Turn Product Packaging Into
            <span className="block text-green-400">$1,000+ NFTs</span>
          </motion.h1>

          {/* Subheadline - Proof/Credibility */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
          >
            Discover the <strong className="text-green-400">secret system</strong> product growers use to generate 
            <strong className="text-yellow-400"> $50,000+ monthly</strong> from verified NFTs
          </motion.p>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center items-center gap-8 mb-12 flex-wrap"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">2,847 Active Growers</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">$2.1M+ NFTs Created</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">4.9/5 Rating</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Product Growers Are Sitting On A 
            <span className="text-red-400"> $2.1 BILLION</span> Goldmine...
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-red-900/20 border-red-500/30">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4">❌ What You're Losing:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Premium items selling for $50-100/8th</li>
                  <li>• No recurring revenue from your genetics</li>
                  <li>• Limited to local market reach</li>
                  <li>• No digital asset creation</li>
                  <li>• Missing NFT market opportunities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border-green-500/30">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">✅ What You Could Gain:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• NFTs selling for 0.5-2 ETH ($800-$3,200)</li>
                  <li>• Passive royalties on every resale</li>
                  <li>• Global collector market access</li>
                  <li>• Digital twin of physical product</li>
                  <li>• Artist collaboration profits</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Case Study */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
            Real Results From Real Growers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mike's Myles High #001",
                image: "https://cdn.abacus.ai/images/098a643c-8d16-44a9-9d7b-193a90bba2e6.png",
                result: "$2,150",
                details: "Sold in 3 hours • 23.4% THC"
              },
              {
                name: "Purple Kush Collection", 
                image: "https://cdn.abacus.ai/images/b7cde68c-387f-40fe-a54b-3074e064ab29.png",
                result: "$8,750",
                details: "5 NFTs • Vintage genetics"
              },
              {
                name: "Green Crack Series",
                image: "https://cdn.abacus.ai/images/05565a0c-cc8d-4dde-9a72-9ab242f1a2b9.png", 
                result: "$15,200",
                details: "12 NFTs • Artist collab"
              }
            ].map((case_study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <Card className="bg-white/5 border-green-500/30 hover:border-green-400 transition-all">
                  <CardContent className="p-6">
                    <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={case_study.image}
                        alt={case_study.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-white mb-2">{case_study.name}</h3>
                    <div className="text-3xl font-bold text-green-400 mb-2">{case_study.result}</div>
                    <p className="text-gray-400 text-sm">{case_study.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet Opt-in */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Get The FREE
              <span className="block text-green-400">"Product NFT Profit Calculator"</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover exactly how much your items could earn as NFTs. 
              This calculator has helped growers unlock <strong>$500,000+ in NFT sales</strong>.
            </p>

            {/* Opt-in Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex gap-4 mb-6">
                  <Input
                    type="email"
                    placeholder="Enter your best email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-14 text-lg"
                  />
                  <Button 
                    type="submit"
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 px-8 h-14"
                  >
                    Get FREE Access
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-400">
                  🔒 Your email is safe. No spam, unsubscribe anytime.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-600/20 border border-green-500 rounded-lg p-8"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Check Your Email!</h3>
                <p className="text-gray-300">
                  Your Product NFT Profit Calculator is on its way to <strong>{email}</strong>
                </p>
              </motion.div>
            )}

            {/* Value Stack */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              {[
                {
                  icon: <DollarSign className="w-8 h-8 text-green-400" />,
                  title: "Profit Calculator",
                  value: "$297 Value"
                },
                {
                  icon: <Leaf className="w-8 h-8 text-green-400" />,
                  title: "50 Top Strains List", 
                  value: "$197 Value"
                },
                {
                  icon: <Zap className="w-8 h-8 text-green-400" />,
                  title: "QR Scan Tutorial",
                  value: "$97 Value"
                }
              ].map((bonus, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2">{bonus.icon}</div>
                  <h4 className="font-bold text-white">{bonus.title}</h4>
                  <p className="text-green-400">{bonus.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            Don't Let Another Day Pass...
            <span className="block text-red-400">Missing Out On NFT Profits</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            The product NFT market is exploding. Early adopters are already making 
            <strong className="text-green-400"> $10,000+ monthly</strong>.
          </p>

          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-xl px-12 py-6"
          >
            <Leaf className="w-6 h-6 mr-3" />
            Start Creating Product NFTs Now
          </Button>
        </div>
      </section>
    </div>
  );
}
