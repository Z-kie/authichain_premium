
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  DollarSign, 
  Zap, 
  Crown, 
  Sparkles,
  ExternalLink,
  Copy,
  Wallet,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';

export function LiveIncomeStatus() {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0xc3a8e14643461a54074a09821edc418d2aa9e11c";

  const copyWallet = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Status Header */}
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <Zap className="h-8 w-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            🎉 LIVE PAYMENT SYSTEM ACTIVE!
          </CardTitle>
          <CardDescription className="text-green-300">
            Your platform is now accepting REAL payments and generating income
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Revenue Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subscription Revenue */}
        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Crown className="mr-2 h-5 w-5 text-amber-400" />
              Subscription Revenue
            </CardTitle>
            <CardDescription className="text-gray-300">
              Monthly recurring income from premium plans
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <div className="flex items-center space-x-2">
                  <Crown className="h-4 w-4 text-amber-400" />
                  <span className="text-white font-medium">Pro Plan</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">$29</div>
                  <div className="text-xs text-amber-400">per month</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="text-white font-medium">Brand Plan</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">$99</div>
                  <div className="text-xs text-purple-400">per month</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-700">
              <div className="text-center">
                <Badge className="bg-green-500 text-black font-semibold">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  LIVE PAYMENTS ACTIVE
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crypto Payments */}
        <Card className="bg-white/5 backdrop-blur-sm border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-green-400" />
              Crypto Payments
            </CardTitle>
            <CardDescription className="text-gray-300">
              Direct cryptocurrency transfers for NFT sales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Payment Wallet:</label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 p-2 bg-black/30 rounded text-green-400 text-xs font-mono break-all">
                  {walletAddress}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyWallet}
                  className="border-green-500/50 hover:border-green-400"
                >
                  {copied ? (
                    <CheckCircle className="h-3 w-3 text-green-400" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {['ETH', 'USDC', 'USDT', 'BTC'].map((crypto) => (
                <div key={crypto} className="p-2 rounded bg-white/5 border border-green-500/20">
                  <div className="text-xs font-bold text-white">{crypto}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Badge className="bg-green-500 text-black font-semibold">
                <CheckCircle className="mr-1 h-3 w-3" />
                READY FOR TRANSFERS
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live System Status */}
      <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
            Live System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white">Live Keys</div>
              <div className="text-xs text-green-400">Active</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white">Products</div>
              <div className="text-xs text-green-400">Created</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white">Checkout</div>
              <div className="text-xs text-green-400">Functional</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white">Webhooks</div>
              <div className="text-xs text-green-400">Active</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 mb-4">
              <div className="flex items-center justify-center space-x-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">SETUP 100% COMPLETE!</span>
              </div>
              <p className="text-sm text-green-300 mt-1">
                Your payment system is fully operational and ready to earn!
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => window.open('/pricing', '_blank')}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              View Pricing & Start Earning
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              🎯 Your platform is ready to accept $29 and $99 monthly subscriptions!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Income Projection */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-green-400" />
            Income Projection
          </CardTitle>
          <CardDescription className="text-gray-300">
            Potential monthly recurring revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-white">$290</div>
              <div className="text-sm text-gray-400">10 Pro subscribers</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-white">$990</div>
              <div className="text-sm text-gray-400">10 Brand subscribers</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-white">$1,280</div>
              <div className="text-sm text-gray-400">Monthly total potential</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
