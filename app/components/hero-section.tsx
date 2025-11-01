
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10" />
      
      <div className="relative max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="mb-6 bg-green-500/10 text-green-300 border-green-500/30">
            <Sparkles className="mr-2 h-3 w-3" />
            Premium Product NFT Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-white to-emerald-400 bg-clip-text text-transparent">
            Authentic Product NFTs from QR Scans
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            AuthiChain transforms product packaging into authentic NFTs. Scan QR codes to create verified
            product NFTs with lab results, seed-to-sale tracking, and artist royalties.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6"
              asChild
            >
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-600 hover:border-purple-500 text-lg px-8 py-6"
              asChild
            >
              <Link href="/pricing">
                View Pricing Plans
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div 
              className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Shield className="h-8 w-8 text-green-400" />
              <span className="text-gray-300">Lab Verified</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Zap className="h-8 w-8 text-yellow-400" />
              <span className="text-gray-300">QR Code Scanning</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Sparkles className="h-8 w-8 text-purple-400" />
              <span className="text-gray-300">Artist Royalties</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
