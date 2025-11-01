
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, Gift, Clock, Star, Zap, TrendingUp, Users, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Promotion {
  id: string;
  type: 'announcement' | 'countdown' | 'banner' | 'popup';
  title: string;
  message: string;
  ctaText: string;
  ctaUrl: string;
  expiresAt?: Date;
  priority: number;
  conditions: {
    showToUsers: 'all' | 'new' | 'existing' | 'free' | 'paid';
    maxViews?: number;
    pages?: string[];
  };
}

const activePromotions: Promotion[] = [
  {
    id: 'launch-week-banner',
    type: 'announcement',
    title: '🚀 Launch Week Special',
    message: '$15,000+ in bonuses ending soon! Only 127 spots remaining.',
    ctaText: 'Claim Bonuses',
    ctaUrl: '/launch-specials',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    priority: 100,
    conditions: {
      showToUsers: 'all',
      maxViews: 5,
      pages: ['/', '/pricing', '/explore', '/mint']
    }
  },
  {
    id: 'first-500-countdown',
    type: 'countdown',
    title: '⏰ Limited Time: First 500 Creators',
    message: 'Launch bonuses disappear when timer hits zero',
    ctaText: 'Join Now',
    ctaUrl: '/launch-specials',
    expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    priority: 90,
    conditions: {
      showToUsers: 'new',
      maxViews: 3,
      pages: ['/']
    }
  },
  {
    id: 'referral-boost',
    type: 'banner',
    title: '💰 Earn 25% Commissions',
    message: 'Become an affiliate and earn $500+ monthly promoting AuthiChain',
    ctaText: 'Start Earning',
    ctaUrl: '/marketing',
    priority: 70,
    conditions: {
      showToUsers: 'paid',
      pages: ['/dashboard']
    }
  }
];

export function AnnouncementBar({ onClose }: { onClose?: () => void }) {
  const [currentPromo, setCurrentPromo] = useState<Promotion | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    // Get dismissed promotions from localStorage
    const dismissedPromos = JSON.parse(localStorage.getItem('dismissedPromos') || '[]');
    setDismissed(dismissedPromos);

    // Find highest priority active promotion
    const activePromo = activePromotions
      .filter(promo => 
        !dismissedPromos.includes(promo.id) && 
        (!promo.expiresAt || promo.expiresAt > new Date())
      )
      .sort((a, b) => b.priority - a.priority)[0];

    if (activePromo) {
      setCurrentPromo(activePromo);
    }
  }, []);

  useEffect(() => {
    if (!currentPromo?.expiresAt) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = currentPromo.expiresAt!.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setCurrentPromo(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPromo]);

  const handleDismiss = (promoId: string) => {
    const newDismissed = [...dismissed, promoId];
    setDismissed(newDismissed);
    localStorage.setItem('dismissedPromos', JSON.stringify(newDismissed));
    setCurrentPromo(null);
    onClose?.();
  };

  if (!currentPromo) return null;

  const getBarStyle = (type: string) => {
    switch (type) {
      case 'countdown':
        return 'bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600';
      case 'announcement':
        return 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600';
      case 'banner':
        return 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600';
      default:
        return 'bg-gradient-to-r from-slate-600 to-slate-700';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className={`relative ${getBarStyle(currentPromo.type)} text-white`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="font-bold">{currentPromo.title}</span>
                {currentPromo.type === 'countdown' && currentPromo.expiresAt && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </span>
                  </div>
                )}
              </div>
              <span className="hidden md:inline">{currentPromo.message}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                asChild
                size="sm" 
                className="bg-white text-black hover:bg-gray-100 font-semibold"
              >
                <Link href={currentPromo.ctaUrl}>
                  {currentPromo.ctaText}
                </Link>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDismiss(currentPromo.id)}
                className="text-white hover:bg-white/10 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Mobile message */}
          <div className="md:hidden mt-2 text-sm">
            {currentPromo.message}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function CountdownTimer({ 
  endDate, 
  title = "Limited Time Offer Ends In:",
  onExpire 
}: { 
  endDate: Date; 
  title?: string;
  onExpire?: () => void; 
}) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setExpired(true);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onExpire]);

  if (expired) {
    return (
      <div className="bg-gradient-to-r from-red-900/30 to-gray-900/30 border border-red-500/50 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-red-400 mb-2">⏰ Offer Expired</h3>
        <p className="text-gray-400">This limited-time offer has ended. Check back for future promotions!</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-xl p-6"
    >
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Clock className="h-5 w-5 text-red-400 mr-2" />
          <span className="text-red-400 font-semibold">{title}</span>
        </div>
        
        <div className="grid grid-cols-4 gap-4 max-w-xs mx-auto">
          <div className="text-center">
            <div className="bg-red-900/50 rounded-lg p-3 border border-red-500/30">
              <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-xs text-red-200">Days</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-red-900/50 rounded-lg p-3 border border-red-500/30">
              <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-xs text-red-200">Hours</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-red-900/50 rounded-lg p-3 border border-red-500/30">
              <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-xs text-red-200">Minutes</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-red-900/50 rounded-lg p-3 border border-red-500/30">
              <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-xs text-red-200">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PromotionalBanner({ 
  promotion, 
  variant = 'default' 
}: { 
  promotion: {
    title: string;
    message: string;
    ctaText: string;
    ctaUrl: string;
    style?: 'success' | 'warning' | 'info' | 'urgent';
  };
  variant?: 'default' | 'floating' | 'inline';
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const getStyleClasses = (style: string) => {
    switch (style) {
      case 'success':
        return 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/50 text-green-200';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/50 text-yellow-200';
      case 'info':
        return 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/50 text-blue-200';
      case 'urgent':
        return 'bg-gradient-to-r from-red-900/30 to-pink-900/30 border-red-500/50 text-red-200';
      default:
        return 'bg-gradient-to-r from-slate-800 to-slate-900 border-slate-600 text-gray-200';
    }
  };

  const baseClasses = `border rounded-xl p-6 ${getStyleClasses(promotion.style || 'default')}`;
  const variantClasses = variant === 'floating' 
    ? 'fixed bottom-4 right-4 max-w-sm z-50 shadow-2xl' 
    : variant === 'inline'
    ? 'relative'
    : 'sticky top-0 z-40';

  return (
    <motion.div
      initial={{ opacity: 0, y: variant === 'floating' ? 20 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: variant === 'floating' ? 20 : -20 }}
      className={`${baseClasses} ${variantClasses}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            <Gift className="h-5 w-5" />
            <h3 className="font-bold">{promotion.title}</h3>
          </div>
          <p className="text-sm opacity-90 mb-4">{promotion.message}</p>
          <Button 
            asChild
            size="sm"
            className="bg-white text-black hover:bg-gray-100 font-semibold"
          >
            <Link href={promotion.ctaUrl}>
              {promotion.ctaText}
            </Link>
          </Button>
        </div>
        
        {variant !== 'inline' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="text-current hover:bg-white/10 p-1 ml-4"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export function LaunchSpecialCallout() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/50 rounded-xl p-8 text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Crown className="h-16 w-16 text-yellow-400" />
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2"
          >
            <Star className="h-6 w-6 text-yellow-300" />
          </motion.div>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">
        🎉 Launch Week Exclusive!
      </h2>
      
      <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
        Join the <strong>first 500 creators</strong> and get <strong>$15,000+ in launch bonuses</strong> 
        — including the NFT Marketing Masterclass, professional templates, and exclusive community access.
      </p>
      
      <div className="flex items-center justify-center space-x-8 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">127</div>
          <div className="text-sm text-gray-400">Spots Remaining</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">$15,947</div>
          <div className="text-sm text-gray-400">Bonus Value</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">6 Days</div>
          <div className="text-sm text-gray-400">Remaining</div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          asChild
          size="lg"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-3"
        >
          <Link href="/launch-specials">
            <Gift className="mr-2 h-5 w-5" />
            Claim Launch Bonuses
          </Link>
        </Button>
        
        <Button 
          asChild
          variant="outline" 
          size="lg"
          className="border-green-500/50 text-green-400 hover:bg-green-900/20"
        >
          <Link href="/pricing">
            View All Plans
          </Link>
        </Button>
      </div>
      
      <p className="text-xs text-gray-400 mt-4">
        ⏰ Limited to first 500 creators • Bonuses worth $15,947 • Available until timer expires
      </p>
    </motion.div>
  );
}

export function SocialProofBanner() {
  const stats = [
    { label: 'Active Creators', value: '2,847', trend: '+12%' },
    { label: 'NFTs Authenticated', value: '18,293', trend: '+24%' },
    { label: 'Creator Earnings', value: '$247,000+', trend: '+31%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-600 rounded-xl p-6"
    >
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <span className="font-semibold text-white">Live Platform Stats</span>
        </div>
        <p className="text-sm text-gray-400">Join thousands of successful NFT creators</p>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
            <Badge className="bg-green-900/30 text-green-300 border-green-500/50 text-xs">
              {stat.trend} this month
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function UrgencyAlert({ 
  message, 
  countdown, 
  ctaText, 
  ctaUrl 
}: {
  message: string;
  countdown?: { target: Date };
  ctaText: string;
  ctaUrl: string;
}) {
  return (
    <Alert className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/50">
      <Zap className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex-grow">
          <span className="text-red-200 font-medium">{message}</span>
          {countdown && (
            <div className="mt-2">
              <CountdownTimer 
                endDate={countdown.target} 
                title="Time remaining:"
              />
            </div>
          )}
        </div>
        <Button 
          asChild
          size="sm"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold ml-4"
        >
          <Link href={ctaUrl}>
            {ctaText}
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
