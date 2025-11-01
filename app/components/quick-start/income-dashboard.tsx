
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Crown, 
  Sparkles,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export function IncomeDashboard() {
  const [copied, setCopied] = useState(false);
  const [revenueData, setRevenueData] = useState({
    monthlyRevenue: 0,
    totalSubscribers: 0,
    proSubscribers: 0,
    brandSubscribers: 0
  });

  // Wallet address for direct crypto payments
  const walletAddress = "0xc3a8e14643461a54074a09821edc418d2aa9e11c";

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulated revenue calculation (replace with real data)
  useEffect(() => {
    const calculateRevenue = () => {
      const proSubs = revenueData.proSubscribers;
      const brandSubs = revenueData.brandSubscribers;
      const monthly = (proSubs * 29) + (brandSubs * 99);
      
      setRevenueData(prev => ({
        ...prev,
        monthlyRevenue: monthly,
        totalSubscribers: proSubs + brandSubs
      }));
    };

    calculateRevenue();
  }, [revenueData.proSubscribers, revenueData.brandSubscribers]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">💰 Income Dashboard</h2>
          <p className="text-gray-400">Track your revenue streams and growth</p>
        </motion.div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-sm border-green-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${revenueData.monthlyRevenue}</div>
            <p className="text-xs text-green-400">+0% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-blue-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-300">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{revenueData.totalSubscribers}</div>
            <p className="text-xs text-blue-400">Active paid users</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-amber-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-300">Pro Subscribers</CardTitle>
              <Crown className="h-4 w-4 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{revenueData.proSubscribers}</div>
            <p className="text-xs text-amber-400">$29/month each</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-300">Brand Subscribers</CardTitle>
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{revenueData.brandSubscribers}</div>
            <p className="text-xs text-purple-400">$99/month each</p>
          </CardContent>
        </Card>
      </div>

      {/* Direct Crypto Payments */}
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-green-400" />
            Direct Crypto Payments
          </CardTitle>
          <CardDescription className="text-gray-300">
            Accept direct cryptocurrency payments for NFT sales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Your Payment Wallet Address:</label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 p-3 bg-black/30 rounded-lg text-green-400 text-sm font-mono break-all">
                {walletAddress}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={copyWalletAddress}
                className="border-green-500/50 hover:border-green-400"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-lg font-bold text-white">ETH</div>
              <div className="text-xs text-gray-400">Ethereum</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-lg font-bold text-white">USDC</div>
              <div className="text-xs text-gray-400">Stablecoin</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-lg font-bold text-white">USDT</div>
              <div className="text-xs text-gray-400">Tether</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Status */}
      <Card className="bg-white/5 backdrop-blur-sm border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-amber-400" />
            Setup Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Stripe Account</span>
              <Badge className="bg-amber-500 text-black">Ready</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">API Keys</span>
              <Badge variant="outline" className="border-gray-500 text-gray-400">
                Placeholder
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Products Created</span>
              <Badge variant="outline" className="border-gray-500 text-gray-400">
                Pending
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Webhooks</span>
              <Badge variant="outline" className="border-gray-500 text-gray-400">
                Pending
              </Badge>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              onClick={() => window.open('https://dashboard.stripe.com', '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Complete Setup in Stripe Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">🚀 Quick Actions</CardTitle>
          <CardDescription className="text-gray-300">
            Start generating income immediately
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="border-green-500/50 hover:border-green-400"
              onClick={() => window.open('/pricing', '_blank')}
            >
              View Pricing Page
            </Button>
            <Button 
              variant="outline"
              className="border-purple-500/50 hover:border-purple-400"
              onClick={() => window.open('/auth/signup', '_blank')}
            >
              Test Signup Flow
            </Button>
          </div>
          
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              💡 Once Stripe is configured, payments will be processed automatically
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
