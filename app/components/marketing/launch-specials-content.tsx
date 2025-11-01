
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Gift, 
  Clock, 
  Star, 
  CheckCircle, 
  Users, 
  Award,
  BookOpen,
  Mail,
  Target,
  TrendingUp,
  Zap,
  Crown,
  Timer
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface BonusPackage {
  tier: string;
  originalPrice: string;
  totalValue: string;
  components: {
    name: string;
    value: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const bonusPackages: Record<string, BonusPackage> = {
  CREATOR: {
    tier: 'Creator Launch Kit',
    originalPrice: '$29',
    totalValue: '$2,997',
    components: [
      {
        name: 'NFT Marketing Masterclass',
        value: '$997',
        description: '5-module video course covering NFT market research, pricing strategy, promotion tactics, and scaling growth',
        icon: <BookOpen className="h-5 w-5" />
      },
      {
        name: '10 Pre-designed NFT Templates',
        value: '$497',
        description: 'Professional NFT templates in PSD, AI, and PNG formats with commercial license',
        icon: <Star className="h-5 w-5" />
      },
      {
        name: 'Email Campaign Swipes (25 templates)',
        value: '$697',
        description: '5 complete email sequences for launch, nurture, promotion, re-engagement, and VIP campaigns',
        icon: <Mail className="h-5 w-5" />
      },
      {
        name: 'Community Growth Playbook',
        value: '$497',
        description: '50-page guide with Discord setup, engagement tactics, content calendar, and social media templates',
        icon: <Users className="h-5 w-5" />
      },
      {
        name: 'Monthly Creator Mastermind (3 months)',
        value: '$309',
        description: 'Live monthly calls with expert guests, hot seat coaching, and private community access',
        icon: <Target className="h-5 w-5" />
      }
    ]
  },
  PRO: {
    tier: 'Pro Launch Bundle',
    originalPrice: '$79',
    totalValue: '$5,497',
    components: [
      {
        name: 'All Creator Launch Kit Items',
        value: '$2,997',
        description: 'Complete Creator package plus advanced Pro features',
        icon: <CheckCircle className="h-5 w-5" />
      },
      {
        name: '6-Figure NFT Collection Blueprint',
        value: '$997',
        description: '8-module advanced course on scaling to 6-figure collections with real case studies',
        icon: <TrendingUp className="h-5 w-5" />
      },
      {
        name: 'Viral Marketing Strategies Training',
        value: '$697',
        description: 'Advanced tactics for viral growth, influencer partnerships, and social media mastery',
        icon: <Zap className="h-5 w-5" />
      },
      {
        name: 'Done-For-You Launch Campaign',
        value: '$497',
        description: 'Complete launch campaign with landing pages, email sequences, and social media content',
        icon: <Target className="h-5 w-5" />
      },
      {
        name: '1:1 Strategy Call (60 minutes)',
        value: '$397',
        description: 'Personal strategy session with AuthiChain marketing experts',
        icon: <Award className="h-5 w-5" />
      }
    ]
  },
  ENTERPRISE: {
    tier: 'Enterprise Domination Suite',
    originalPrice: '$299',
    totalValue: '$15,947',
    components: [
      {
        name: 'All Pro Launch Bundle Items',
        value: '$5,497',
        description: 'Complete Pro package plus enterprise-level bonuses',
        icon: <CheckCircle className="h-5 w-5" />
      },
      {
        name: 'Million-Dollar NFT Launch Secrets',
        value: '$2,997',
        description: 'Advanced masterclass on institutional-level NFT launches and high-value partnerships',
        icon: <Crown className="h-5 w-5" />
      },
      {
        name: 'Institutional Investor Playbook',
        value: '$1,997',
        description: 'Complete guide to attracting and working with institutional NFT investors',
        icon: <TrendingUp className="h-5 w-5" />
      },
      {
        name: 'Done-For-You Marketing Funnels (5 systems)',
        value: '$2,497',
        description: 'Complete marketing funnel systems ready to deploy for your enterprise',
        icon: <Target className="h-5 w-5" />
      },
      {
        name: 'Quarterly Strategy Sessions (4 per year)',
        value: '$1,988',
        description: 'Quarterly executive briefings and strategy optimization sessions',
        icon: <Award className="h-5 w-5" />
      },
      {
        name: 'VIP Mastermind + Direct Team Access',
        value: '$997',
        description: 'Exclusive mastermind group with direct access to AuthiChain founding team',
        icon: <Users className="h-5 w-5" />
      }
    ]
  }
};

export function LaunchSpecialsContent() {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // Launch countdown (set to 7 days from now for demo)
  const launchEndDate = new Date();
  launchEndDate.setDate(launchEndDate.getDate() + 7);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchEndDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaimOffer = (tier: string) => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/launch-specials');
      return;
    }
    
    // Redirect to pricing with launch bonus applied
    router.push(`/pricing?launch_bonus=true&tier=${tier.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2">
            <Gift className="mr-2 h-4 w-4" />
            LIMITED TIME LAUNCH BONUSES
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-6">
            Claim Your $15,000+ 
            <br />Launch Bonus Package
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Join AuthiChain during our launch period and receive the complete NFT success system 
            that helped creators generate $150,000+ in commissions. These bonuses disappear when the timer hits zero.
          </p>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-xl p-6 max-w-lg mx-auto mb-8">
            <div className="flex items-center justify-center mb-4">
              <Timer className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-red-400 font-semibold">Launch Bonuses End In:</span>
            </div>
            <div className="flex justify-center space-x-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm text-gray-400">Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-400">Seconds</div>
              </div>
            </div>
          </div>

          {/* Urgency Alert */}
          <Alert className="bg-orange-900/20 border-orange-500/50 max-w-2xl mx-auto">
            <Clock className="h-4 w-4" />
            <AlertDescription className="text-orange-200">
              <strong>Limited to first 500 users only.</strong> Once the timer expires or we reach 500 signups, 
              these bonuses will never be offered again at this value.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Bonus Packages */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(bonusPackages).map(([key, pkg], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative ${key === 'PRO' ? 'lg:scale-105 lg:-mt-4' : ''}`}
            >
              <Card className={`h-full border-2 transition-all duration-300 hover:shadow-2xl ${
                key === 'PRO' 
                  ? 'border-blue-500/50 bg-gradient-to-br from-blue-900/20 to-purple-900/20' 
                  : key === 'ENTERPRISE'
                  ? 'border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-pink-900/20'
                  : 'border-green-500/50 bg-gradient-to-br from-green-900/20 to-blue-900/20'
              }`}>
                {key === 'PRO' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
                      <Crown className="mr-2 h-4 w-4" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {pkg.tier}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-green-400">
                      {pkg.originalPrice}<span className="text-lg text-gray-400">/month</span>
                    </div>
                    <div className="text-sm text-gray-400 line-through">
                      Regular Value: {pkg.totalValue}
                    </div>
                    <Badge variant="secondary" className="bg-green-900/30 text-green-300 border-green-500/50">
                      FREE BONUSES: {pkg.totalValue}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {pkg.components.map((component, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <div className="text-green-400 mt-1 flex-shrink-0">
                          {component.icon}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-semibold text-white text-sm">
                              {component.name}
                            </h4>
                            <Badge variant="outline" className="text-xs text-green-400 border-green-400/50">
                              {component.value}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-xs">
                            {component.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        Total Bonus Value: <span className="text-green-400">{pkg.totalValue}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Your cost: {pkg.originalPrice}/month
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleClaimOffer(key)}
                      className={`w-full py-3 font-semibold text-lg transition-all duration-300 ${
                        key === 'PRO'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                          : key === 'ENTERPRISE'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                      }`}
                    >
                      <Gift className="mr-2 h-5 w-5" />
                      Claim {pkg.tier}
                    </Button>

                    <p className="text-xs text-center text-gray-400">
                      3 months free included • Launch bonus applied automatically • Cancel anytime
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/50 rounded-xl p-8 text-center mb-12"
        >
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            100% Risk-Free Launch Guarantee
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Try any plan risk-free for 30 days. If you don't see results or aren't completely satisfied, 
            we'll refund every penny. Plus, you keep all the bonus materials regardless.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Award className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">30-Day Money Back</h3>
              <p className="text-sm text-gray-400">Full refund, no questions asked</p>
            </div>
            <div className="text-center">
              <Gift className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Keep All Bonuses</h3>
              <p className="text-sm text-gray-400">Yours to keep even if you cancel</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Community Access</h3>
              <p className="text-sm text-gray-400">Lifetime access to creator community</p>
            </div>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Join 2,500+ Creators Already Using AuthiChain
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">$150,000+</div>
              <div className="text-white font-semibold mb-1">Total Creator Earnings</div>
              <div className="text-sm text-gray-400">Generated by our marketing system</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">2,500+</div>
              <div className="text-white font-semibold mb-1">Active Creators</div>
              <div className="text-sm text-gray-400">Building successful NFT businesses</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">47%</div>
              <div className="text-white font-semibold mb-1">Average Conversion</div>
              <div className="text-sm text-gray-400">From our proven marketing templates</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
