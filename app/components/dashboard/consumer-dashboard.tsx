
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Heart, 
  ShoppingCart, 
  Upload,
  Eye,
  Star,
  Settings,
  Wallet,
  Camera
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ConsumerDashboardProps {
  user: any;
  userNfts: any[];
  favoriteNfts?: any[];
  recentActivity?: any[];
}

export function ConsumerDashboard({ user, userNfts, favoriteNfts = [], recentActivity = [] }: ConsumerDashboardProps) {
  const { data: session } = useSession() || {};
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      label: 'My NFTs',
      value: userNfts.length,
      icon: ShoppingCart,
      color: 'text-purple-400'
    },
    {
      label: 'Favorites',
      value: favoriteNfts.length,
      icon: Heart,
      color: 'text-red-400'
    },
    {
      label: 'Views',
      value: userNfts.reduce((acc, nft) => acc + (nft.views || 0), 0),
      icon: Eye,
      color: 'text-blue-400'
    },
    {
      label: 'Uploads',
      value: userNfts.filter(nft => nft.status === 'ACTIVE').length,
      icon: Upload,
      color: 'text-emerald-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* User Welcome */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {user.firstName?.[0] || 'U'}
              </div>
              {user.isVerified && (
                <Badge className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-xs px-1.5 py-0.5">
                  ✓
                </Badge>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {user.firstName}! 👋
              </h1>
              <p className="text-slate-400">
                Manage your product NFT collection
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                  {user.subscriptionTier || 'BASIC'}
                </Badge>
                {user.isVerified && (
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    Verified Creator
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/upload">
            <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border-emerald-500/30 hover:border-emerald-400/50 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Upload className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Upload NFT</h3>
                <p className="text-slate-300 text-sm">Share your product creations</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/marketplace">
            <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30 hover:border-purple-400/50 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Browse Market</h3>
                <p className="text-slate-300 text-sm">Discover new product NFTs</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/product">
            <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30 hover:border-green-400/50 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Camera className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Verify Products</h3>
                <p className="text-slate-300 text-sm">Authenticate item details</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-emerald-600"
              onClick={() => setActiveTab("overview")}
            >
              My Collection
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className="data-[state=active]:bg-emerald-600"
              onClick={() => setActiveTab("favorites")}
            >
              Favorites
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="data-[state=active]:bg-emerald-600"
              onClick={() => setActiveTab("activity")}
            >
              Recent Activity
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-emerald-600"
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  My NFT Collection ({userNfts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userNfts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userNfts.slice(0, 6).map((nft) => (
                      <Card key={nft.id} className="bg-slate-700/50 border-slate-600">
                        <div className="aspect-square relative bg-slate-600 rounded-t-lg overflow-hidden">
                          <Image
                            src={nft.imageUrl || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23374151"/><text x="150" y="140" text-anchor="middle" fill="white" font-size="40">🌿</text><text x="150" y="180" text-anchor="middle" fill="white" font-size="12">NFT Image</text></svg>'}
                            alt={nft.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="text-white font-semibold text-sm mb-1 truncate">
                            {nft.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {nft.status}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <Eye className="h-3 w-3" />
                              <span>{nft.views || 0}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg text-white mb-2">No NFTs yet</h3>
                    <p className="text-slate-400 mb-4">Start building your product NFT collection</p>
                    <Link href="/upload">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        Upload Your First NFT
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Favorite NFTs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg text-white mb-2">No favorites yet</h3>
                  <p className="text-slate-400 mb-4">Browse the marketplace to find NFTs you love</p>
                  <Link href="/marketplace">
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      Explore Marketplace
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Eye className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg text-white mb-2">No recent activity</h3>
                  <p className="text-slate-400">Your recent actions will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <div className="bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
                      {user.firstName}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name
                    </label>
                    <div className="bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
                      {user.lastName}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <div className="bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Subscription Tier
                    </label>
                    <div className="bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2">
                      <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                        {user.subscriptionTier || 'BASIC'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
