
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Crown, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart,
  Calendar,
  Upload,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SubscriptionTier } from '@/lib/types';

interface AnalyticsViewProps {
  user: any;
  hasAccess: boolean;
  nfts: any[];
  usageRecords: any[];
}

export function AnalyticsView({ user, hasAccess, nfts, usageRecords }: AnalyticsViewProps) {
  if (!hasAccess) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="h-24 w-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-12 w-12 text-gray-400" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-white">
              Analytics Locked
            </h1>
            
            <p className="text-gray-400 mb-6">
              Unlock detailed analytics and insights about your NFT collection with Pro or Brand tier.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-gray-700">
                <h3 className="font-semibold text-white mb-2">What you'll get:</h3>
                <ul className="text-sm text-gray-300 space-y-1 text-left">
                  <li>• Collection performance metrics</li>
                  <li>• Monthly upload statistics</li>
                  <li>• Blockchain distribution analysis</li>
                  <li>• Historical data trends</li>
                  <li>• Export capabilities</li>
                </ul>
              </div>
              
              <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Link href="/pricing">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Mock analytics data for demonstration
  const mockAnalytics = {
    totalViews: 1247,
    monthlyGrowth: 23,
    topPerformingNft: nfts?.[0]?.title || 'N/A',
    avgViewsPerNft: Math.floor(1247 / (nfts?.length || 1))
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-6 w-6 text-purple-400 mr-2" />
            <span className="text-purple-400 font-semibold">Analytics</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Collection Insights
          </h1>
          <p className="text-gray-400 text-lg">
            Understand your NFT collection performance and engagement
          </p>
        </motion.div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockAnalytics.totalViews.toLocaleString()}</div>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{mockAnalytics.monthlyGrowth}% this month
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
              <CardTitle className="text-sm font-medium text-gray-300">Total NFTs</CardTitle>
              <Upload className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{nfts?.length || 0}</div>
              <p className="text-xs text-gray-400">
                In your collection
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
              <CardTitle className="text-sm font-medium text-gray-300">Avg Views/NFT</CardTitle>
              <BarChart3 className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockAnalytics.avgViewsPerNft}</div>
              <p className="text-xs text-gray-400">
                Performance metric
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
              <CardTitle className="text-sm font-medium text-gray-300">Plan Status</CardTitle>
              {user.subscriptionTier === SubscriptionTier.BRAND ? (
                <Crown className="h-4 w-4 text-purple-400" />
              ) : (
                <Crown className="h-4 w-4 text-amber-400" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white capitalize">
                {(user.subscriptionTier || 'basic').toLowerCase()}
              </div>
              <Badge variant="outline" className={
                user.subscriptionTier === SubscriptionTier.BRAND
                  ? 'text-purple-300 border-purple-500/30'
                  : 'text-amber-300 border-amber-500/30'
              }>
                Premium Access
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Usage Statistics</CardTitle>
              <CardDescription className="text-gray-400">
                Your platform activity over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center space-x-3">
                    <Upload className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">NFT Uploads</span>
                  </div>
                  <span className="text-white font-semibold">{nfts?.length || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300">This Month</span>
                  </div>
                  <span className="text-white font-semibold">
                    {usageRecords?.filter(record => {
                      const recordDate = new Date(record.createdAt);
                      const now = new Date();
                      return recordDate.getMonth() === now.getMonth() && 
                             recordDate.getFullYear() === now.getFullYear();
                    })?.reduce((sum, record) => sum + record.count, 0) || 0}
                  </span>
                </div>
              </div>
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
              <CardTitle className="text-white">Blockchain Distribution</CardTitle>
              <CardDescription className="text-gray-400">
                NFTs by blockchain network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nfts && Array.from(new Set(nfts.map(nft => nft.blockchain)))
                  .map(blockchain => {
                    const count = nfts.filter(nft => nft.blockchain === blockchain).length;
                    const percentage = ((count / nfts.length) * 100).toFixed(1);
                    
                    return (
                      <div key={blockchain} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-3 w-3 rounded-full bg-purple-400"></div>
                          <span className="text-gray-300 capitalize">{blockchain}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-semibold">{count}</span>
                          <span className="text-gray-400 text-sm">({percentage}%)</span>
                        </div>
                      </div>
                    );
                  })
                }
                
                {(!nfts || nfts.length === 0) && (
                  <div className="text-center py-4 text-gray-400">
                    No NFTs uploaded yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Premium Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-center p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          More analytics features coming soon!
        </h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          We're working on advanced features like detailed view tracking, engagement metrics, 
          and market insights to help you understand your collection's performance better.
        </p>
        
        {user.subscriptionTier !== SubscriptionTier.BRAND && (
          <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Link href="/pricing">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade to Brand
            </Link>
          </Button>
        )}
      </motion.div>
    </div>
  );
}
