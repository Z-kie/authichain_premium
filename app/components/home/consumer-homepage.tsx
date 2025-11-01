
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Camera, 
  ShoppingCart, 
  Upload,
  Star,
  Shield,
  Zap,
  Users,
  Heart,
  Eye,
  Play,
  CheckCircle,
  Watch,
  Palette,
  Gem,
  Trophy,
  Smartphone,
  TrendingUp,
  Award,
  DollarSign
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  return isMobile;
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const startValue = 0;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuad(progress));
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, isInView]);

  return (
    <span ref={countRef} className="font-bold">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function ConsumerHomepage() {
  const { data: session } = useSession() || {};
  const isMobile = useIsMobile();
  const [imageLoading, setImageLoading] = useState<{[key: string]: boolean}>({});
  
  const handleImageLoad = (id: string) => {
    setImageLoading(prev => ({ ...prev, [id]: false }));
  };

  const handleImageStart = (id: string) => {
    setImageLoading(prev => ({ ...prev, [id]: true }));
  };
  
  // Trust metrics for animated counters
  const trustMetrics = [
    {
      icon: Shield,
      label: 'Items Authenticated',
      value: 25847,
      suffix: '+',
      color: 'text-emerald-400'
    },
    {
      icon: DollarSign,
      label: 'Value Secured',
      value: 284,
      prefix: '$',
      suffix: 'M+',
      color: 'text-purple-400'
    },
    {
      icon: Users,
      label: 'Trusted Collectors',
      value: 12459,
      suffix: '+',
      color: 'text-blue-400'
    },
    {
      icon: Award,
      label: 'Verification Score',
      value: 99,
      suffix: '%',
      color: 'text-amber-400'
    }
  ];
  
  const features = [
    {
      icon: Shield,
      title: 'Authentication Verified',
      description: 'Every luxury item authenticated by certified experts using blockchain technology',
      color: 'text-emerald-400'
    },
    {
      icon: ShoppingCart,
      title: 'Premium Marketplace',
      description: 'Trade authenticated luxury items with complete provenance and ownership history',
      color: 'text-purple-400'
    },
    {
      icon: Eye,
      title: 'Provenance Tracking',
      description: 'Complete ownership chain and authentication history for every luxury item',
      color: 'text-blue-400'
    }
  ];

  const categories = [
    {
      icon: Watch,
      title: 'Luxury Watches',
      description: 'Rolex, Patek Philippe, Omega',
      image: 'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_3000,h_3000,g_auto/f_auto/q_auto/v1744077876/product/0b76a8cfc2050c5e459aed2aec089cc8/a3e109e430ae6d57e16c4c98fb588818?_a=BAVAfVDW0',
      count: '12 items',
      color: 'from-amber-500/20 to-yellow-500/20'
    },
    {
      icon: Palette,
      title: 'Fine Art',
      description: 'Contemporary & Classic Masterpieces',
      image: 'https://artesty.com/cdn/shop/products/1_330a1b46-7617-415a-bdde-57dd9d4048a3.jpg?v=1644528112',
      count: '15 items',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Gem,
      title: 'Fine Jewelry',
      description: 'Diamonds, Precious Stones',
      image: 'https://cdn.shopify.com/s/files/1/0252/5265/9286/files/1428.-ClubRingwithRadiantcutyellow.jpg?v=1724791218',
      count: '10 items',
      color: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      icon: Heart,
      title: 'Designer Fashion',
      description: 'Hermès, Chanel, Louis Vuitton',
      image: 'http://www.redeluxe.com/cdn/shop/files/hermes-handbag-gold-vintage-birkin-30-gold-ardennes-gold-plated-c-square-stamp-redeluxe-45771055628598.jpg?v=1706261980',
      count: '18 items',
      color: 'from-rose-500/20 to-pink-500/20'
    }
  ];

  const featuredNfts = [
    {
      id: 1,
      title: 'Rolex Cosmograph Daytona 116500LN',
      creator: 'TimepieceMaster',
      price: '18.5 ETH',
      image: 'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_3000,h_3000,g_auto/f_auto/q_auto/v1744077876/product/0b76a8cfc2050c5e459aed2aec089cc8/a3e109e430ae6d57e16c4c98fb588818?_a=BAVAfVDW0',
      rating: 4.9,
      likes: 234,
      verified: true,
      category: 'Luxury Watches'
    },
    {
      id: 2,
      title: 'Hermès Birkin 30 Gold Togo',
      creator: 'LuxuryFashion',
      price: '22.8 ETH',
      image: 'http://www.redeluxe.com/cdn/shop/files/hermes-handbag-gold-vintage-birkin-30-gold-ardennes-gold-plated-c-square-stamp-redeluxe-45771055628598.jpg?v=1706261980',
      rating: 4.8,
      likes: 456,
      verified: true,
      category: 'Designer Fashion'
    },
    {
      id: 3,
      title: '1.5ct VVS1 Diamond Ring',
      creator: 'GemsExpert',
      price: '8.9 ETH',
      image: 'https://cdn.shopify.com/s/files/1/0252/5265/9286/files/1428.-ClubRingwithRadiantcutyellow.jpg?v=1724791218',
      rating: 5.0,
      likes: 334,
      verified: true,
      category: 'Fine Jewelry'
    }
  ];

  const benefits = [
    { icon: Shield, text: 'Expert Authentication Guaranteed' },
    { icon: CheckCircle, text: 'Blockchain Verified Provenance' },
    { icon: Users, text: 'Curated Luxury Community' },
    { icon: Zap, text: 'Instant Ownership Transfer' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`${
              isMobile 
                ? 'text-4xl sm:text-5xl' 
                : 'text-5xl md:text-7xl'
            } font-bold text-white mb-4 sm:mb-6 leading-tight`}>
              The Premier{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Luxury NFT
              </span>
              {' '}Marketplace
            </h1>
            <p className={`${
              isMobile 
                ? 'text-lg sm:text-xl px-4' 
                : 'text-xl md:text-2xl'
            } text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed`}>
              Authenticate, collect, and trade luxury items with blockchain-verified provenance. From Rolex watches to fine art masterpieces.
            </p>
            
            {/* Enhanced CTA Buttons with Mobile Optimization */}
            <div className={`flex ${isMobile ? 'flex-col gap-4 px-4' : 'flex-col sm:flex-row gap-6'} justify-center mb-12`}>
              {!session ? (
                <>
                  <Link href="/auth/signup">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        className="relative bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <div className="relative flex items-center">
                          Get Started Free
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/marketplace">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="relative border-2 border-slate-600 hover:border-emerald-500/50 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center">
                          Explore Luxury NFTs
                          <Eye className="ml-2 h-5 w-5 group-hover:text-emerald-400 transition-colors" />
                        </div>
                      </Button>
                    </motion.div>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/marketplace">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        className="relative bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <div className="relative flex items-center">
                          Browse Marketplace
                          <ShoppingCart className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/upload">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="relative border-2 border-slate-600 hover:border-purple-500/50 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-emerald-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center">
                          Mint Luxury NFT
                          <Upload className="ml-2 h-5 w-5 group-hover:text-purple-400 transition-colors" />
                        </div>
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </div>

            {/* Benefits with Enhanced Mobile Layout */}
            <div className={`grid gap-4 max-w-4xl mx-auto ${
              isMobile 
                ? 'grid-cols-1 sm:grid-cols-2 px-4' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center gap-2 text-slate-300 bg-slate-800/30 rounded-lg ${
                    isMobile ? 'p-4' : 'p-3'
                  } hover:bg-slate-800/50 transition-colors cursor-default touch-manipulation`}
                >
                  <benefit.icon className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className={`grid gap-8 max-w-6xl mx-auto ${
            isMobile 
              ? 'grid-cols-2 px-4' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {trustMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-purple-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800 rounded-full p-4 border border-slate-700 group-hover:border-slate-600 transition-colors">
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter 
                    end={metric.value} 
                    prefix={metric.prefix} 
                    suffix={metric.suffix} 
                  />
                </div>
                <p className="text-slate-400 text-sm font-medium">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Luxury Authentication Reimagined
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Blockchain-powered authentication for the world's most coveted luxury items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <feature.icon className={`h-16 w-16 ${feature.color} mx-auto mb-4`} />
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Categories */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore Luxury Categories
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Discover authenticated luxury items across premium categories
            </p>
          </div>

          <div className={`grid gap-6 ${
            isMobile 
              ? 'grid-cols-1 sm:grid-cols-2 px-4' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          }`}>
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={!isMobile ? { scale: 1.05 } : undefined}
                whileTap={isMobile ? { scale: 0.98 } : undefined}
                className="group"
              >
                <Link href="/marketplace">
                  <Card className={`bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 cursor-pointer overflow-hidden h-full ${
                    isMobile ? 'active:scale-95 active:bg-slate-800/70' : ''
                  } touch-manipulation`}>
                    {/* Image Header with Loading State */}
                    <div className={`${isMobile ? 'h-40' : 'h-48'} relative overflow-hidden`}>
                      {/* Loading Skeleton */}
                      {imageLoading[`category-${index}`] && (
                        <div className="absolute inset-0 bg-slate-700 animate-pulse" />
                      )}
                      
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                            imageLoading[`category-${index}`] ? 'opacity-0' : 'opacity-100'
                          }`}
                          onLoadingComplete={() => handleImageLoad(`category-${index}`)}
                          onLoad={() => handleImageLoad(`category-${index}`)}
                          onLoadStart={() => handleImageStart(`category-${index}`)}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                      
                      {/* Category Icon */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/10 backdrop-blur-md rounded-full p-3 group-hover:bg-white/20 transition-colors">
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      {/* Trending Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-xs font-semibold">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      </div>

                      {/* Count Badge */}
                      <div className="absolute bottom-4 right-4">
                        <Badge variant="secondary" className="bg-black/40 backdrop-blur-md text-white border-white/20">
                          {category.count}
                        </Badge>
                      </div>

                      {/* Category Title Overlay */}
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <CardContent className={isMobile ? 'p-4' : 'p-6'}>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      
                      {/* Call to Action */}
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 text-sm font-medium group-hover:text-emerald-300 transition-colors">
                          Explore Collection
                        </span>
                        <ArrowRight className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Luxury NFTs
              </h2>
              <p className="text-slate-400 text-lg">
                Premium authenticated items from verified creators
              </p>
            </div>
            <Link href="/marketplace">
              <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredNfts.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={nft.image}
                      alt={nft.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Verification Badge */}
                    {nft.verified && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-emerald-600/90 text-white border-0 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white border-0 text-xs">
                        {nft.category}
                      </Badge>
                    </div>
                    
                    {/* Like Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70"
                    >
                      <Heart className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {nft.title}
                        </h3>
                        <p className="text-slate-400 text-sm">by {nft.creator}</p>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-slate-300">{nft.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Heart className="h-3 w-3" />
                          <span>{nft.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Eye className="h-3 w-3" />
                          <span>1.2k</span>
                        </div>
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                        <div>
                          <p className="text-xl font-bold text-emerald-400">
                            {nft.price}
                          </p>
                          <p className="text-xs text-slate-400">
                            ≈ ${(parseFloat(nft.price) * 2500).toLocaleString()} USD
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4"
                          onClick={() => {
                            alert(`Viewing ${nft.title} details! 👁️`);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Luxury Authentication Works
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Experience the future of luxury item verification in three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-600/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30">
                <Shield className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Expert Authentication</h3>
              <p className="text-slate-400">Certified experts verify every luxury item using advanced authentication techniques and blockchain technology</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-purple-500/30">
                <CheckCircle className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">NFT Creation</h3>
              <p className="text-slate-400">Authenticated items receive unique NFTs with complete provenance, ownership history, and authentication certificates</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-blue-500/30">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Trade & Collect</h3>
              <p className="text-slate-400">Join a curated community of luxury collectors. Buy, sell, and trade with complete confidence and transparency</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600/20 to-purple-600/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Enter the World of Authenticated Luxury
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join exclusive collectors and luxury enthusiasts in the premier authenticated NFT marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!session ? (
              <>
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg">
                    Start Collecting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-3 text-lg">
                    Browse Luxury NFTs
                    <Eye className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/marketplace">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg">
                    Explore Marketplace
                    <ShoppingCart className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-3 text-lg">
                    Authenticate Item
                    <Upload className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-slate-700">
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="text-sm">Expert Certified</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span className="text-sm">Blockchain Secured</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Users className="h-5 w-5 text-emerald-400" />
              <span className="text-sm">Trusted Community</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Star className="h-5 w-5 text-emerald-400" />
              <span className="text-sm">Premium Quality</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
