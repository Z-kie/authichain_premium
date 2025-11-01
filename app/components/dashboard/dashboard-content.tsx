
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  BarChart3, 
  Crown, 
  Sparkles, 
  TrendingUp,
  Image as ImageIcon,
  Calendar,
  Star,
  Leaf,
  Scan,
  Palette
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SubscriptionTier } from '@/lib/types';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';
import { motion } from 'framer-motion';
import { IncomeDashboard } from '@/components/quick-start/income-dashboard';
import { SubscriptionStatus } from '@/components/dashboard/subscription-status';
import { LiveIncomeStatus } from '@/components/income/live-status';
import { ProductDashboard } from '@/components/product/product-dashboard';
import { ArtistMarketplace } from '@/components/product/artist-marketplace';

interface DashboardContentProps {
  user: any;
  currentMonthUploads: number;
}

export function DashboardContent({ user, currentMonthUploads }: DashboardContentProps) {
  const currentPlan = SUBSCRIPTION_PLANS[user.subscriptionTier as SubscriptionTier];
  const uploadProgress = currentPlan.nfts_per_month === -1 
    ? 100 
    : (currentMonthUploads / currentPlan.nfts_per_month) * 100;

  const getTierIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case SubscriptionTier.PRO:
        return <Crown className="h-5 w-5 text-amber-400" />;
      case SubscriptionTier.BRAND:
        return <Sparkles className="h-5 w-5 text-purple-400" />;
      default:
        return <Star className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <motion.div 
        className="text-center py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-white to-emerald-400 bg-clip-text text-transparent">
          Welcome to AuthiChain, {user.firstName}!
        </h1>
        <p className="text-gray-400 text-lg">
          Premium product NFT platform with seed-to-sale authentication
        </p>
      </motion.div>

      {/* Live Income Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <LiveIncomeStatus />
      </motion.div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="product" className="space-y-6" onValueChange={(value) => {
        // Handle tab navigation
        console.log('Dashboard tab changed to:', value);
      }}>
        <TabsList className="grid w-full grid-cols-5 bg-white/5 border-gray-700">
          <TabsTrigger 
            value="product" 
            className="flex items-center gap-2"
            onClick={() => {
              // Handle product tab click
              console.log('Product tab clicked');
            }}
          >
            <Leaf className="w-4 h-4" />
            Product
          </TabsTrigger>
          <TabsTrigger 
            value="marketplace" 
            className="flex items-center gap-2"
            onClick={() => {
              // Handle marketplace tab click  
              console.log('Marketplace tab clicked');
            }}
          >
            <Palette className="w-4 h-4" />
            Art Market
          </TabsTrigger>
          <TabsTrigger 
            value="overview"
            onClick={() => {
              // Handle overview tab click
              console.log('Overview tab clicked');
            }}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="income"
            onClick={() => {
              // Handle income tab click
              console.log('Income tab clicked');
            }}
          >
            Income
          </TabsTrigger>
          <TabsTrigger 
            value="subscription"
            onClick={() => {
              // Handle subscription tab click
              console.log('Subscription tab clicked');
            }}
          >
            Subscription
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product">
          <ProductDashboard user={user} />
        </TabsContent>

        <TabsContent value="marketplace">
          <ArtistMarketplace />
        </TabsContent>

        <TabsContent value="overview" className="space-y-8">
          {/* Subscription Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <SubscriptionStatus />
          </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total NFTs</CardTitle>
              <ImageIcon className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{user._count?.nftUploads || 0}</div>
              <p className="text-xs text-gray-400">
                Active collections
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{currentMonthUploads}</div>
              <p className="text-xs text-gray-400">
                NFTs uploaded
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Current Plan</CardTitle>
              {getTierIcon(user.subscriptionTier)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{currentPlan.name}</div>
              <p className="text-xs text-gray-400">
                ${currentPlan.price}/month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="outline" 
                  className={
                    user.subscriptionTier === SubscriptionTier.BASIC 
                      ? 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                      : user.subscriptionTier === SubscriptionTier.PRO
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  }
                >
                  Active
                </Badge>
                {user.isVerified && (
                  <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                    Verified
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Usage & Upload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Monthly Usage</span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your NFT upload progress this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">
                    {currentMonthUploads} of {currentPlan.nfts_per_month === -1 ? '∞' : currentPlan.nfts_per_month} uploads
                  </span>
                  <span className="text-gray-400">
                    {currentPlan.nfts_per_month === -1 ? '100%' : `${Math.round(uploadProgress)}%`}
                  </span>
                </div>
                <Progress 
                  value={uploadProgress} 
                  className="h-3"
                />
              </div>
              
              {currentPlan.nfts_per_month !== -1 && currentMonthUploads >= currentPlan.nfts_per_month && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <p className="text-amber-300 text-sm">
                    You've reached your monthly upload limit. Consider upgrading your plan.
                  </p>
                </div>
              )}
              
              {user.subscriptionTier === SubscriptionTier.BASIC && (
                <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Link href="/pricing">
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade Plan
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Get started with your NFT showcase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                disabled={currentPlan.nfts_per_month !== -1 && currentMonthUploads >= currentPlan.nfts_per_month}
              >
                <Link href="/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New NFT
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full border-gray-600 hover:border-purple-500">
                <Link href="/collection">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  View Collection
                </Link>
              </Button>

              {user.subscriptionTier !== SubscriptionTier.BASIC && (
                <Button asChild variant="outline" className="w-full border-gray-600 hover:border-purple-500">
                  <Link href="/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent NFTs */}
      {user.nftUploads?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent NFTs</CardTitle>
              <CardDescription className="text-gray-400">
                Your latest uploaded NFTs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {user.nftUploads.slice(0, 8).map((nft: any, index: number) => (
                  <motion.div
                    key={nft.id}
                    className="group relative bg-white/5 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="aspect-square relative bg-gray-800">
                      <Image
                        src={nft.imageUrl}
                        alt={nft.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-white text-sm truncate">{nft.title}</h3>
                      <p className="text-xs text-gray-400 capitalize">{nft.blockchain}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {user.nftUploads.length > 8 && (
                <div className="mt-6 text-center">
                  <Button asChild variant="outline" className="border-gray-600 hover:border-purple-500">
                    <Link href="/collection">
                      View All NFTs
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
        </TabsContent>

        <TabsContent value="income">
          <IncomeDashboard />
        </TabsContent>

        <TabsContent value="subscription">
          <SubscriptionStatus />
        </TabsContent>
      </Tabs>
    </div>
  );
}
