

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User,
  Wallet,
  TrendingUp,
  Star,
  Eye,
  Heart,
  Share,
  Settings,
  Award,
  Gem,
  Zap,
  Target,
  Crown,
  Plus,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductNFT {
  id: string;
  name: string;
  item: string;
  image: string;
  purchase_price: number;
  current_value: number;
  change_percentage: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  lab_verified: boolean;
  owned_since: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: number;
}

export function MobilePortfolio() {
  const [activeTab, setActiveTab] = useState('collection');

  const portfolioStats = {
    total_value: 47350,
    total_invested: 35200,
    total_return: 34.5,
    nfts_owned: 23,
    average_holding_period: 45,
    best_performer: 'Rare Diamond #1',
    portfolio_rank: 'Diamond'
  };

  const ownedNFTs: ProductNFT[] = [
    {
      id: '1',
      name: 'Rare Diamond Genesis #1',
      item: 'Rare Diamond',
      image: '/images/purple-haze-nft.jpg',
      purchase_price: 8500,
      current_value: 15000,
      change_percentage: 76.5,
      rarity: 'legendary',
      lab_verified: true,
      owned_since: '2024-07-15'
    },
    {
      id: '2',
      name: 'Blue Sapphire Classic #47',
      item: 'Blue Sapphire',
      image: '/images/og-kush-nft.jpg',
      purchase_price: 6200,
      current_value: 8750,
      change_percentage: 41.1,
      rarity: 'epic',
      lab_verified: true,
      owned_since: '2024-07-20'
    },
    {
      id: '3',
      name: 'Vintage Watch #156',
      item: 'Vintage Watch',
      image: '/images/gsc-nft.jpg',
      purchase_price: 3800,
      current_value: 5240,
      change_percentage: 37.9,
      rarity: 'rare',
      lab_verified: true,
      owned_since: '2024-08-01'
    },
    {
      id: '4',
      name: 'Ruby Collection Premium #89',
      item: 'Ruby Collection',
      image: '/images/blue-dream-nft.jpg',
      purchase_price: 2900,
      current_value: 3890,
      change_percentage: 34.1,
      rarity: 'rare',
      lab_verified: true,
      owned_since: '2024-08-05'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Product Connoisseur',
      description: 'Own 20+ verified product NFTs',
      icon: Gem,
      unlocked: true
    },
    {
      id: '2',
      title: 'Diamond Hands',
      description: 'Hold NFTs for 30+ days',
      icon: Award,
      unlocked: true
    },
    {
      id: '3',
      title: 'Strain Hunter',
      description: 'Collect 10 different items',
      icon: Target,
      unlocked: false,
      progress: 80
    },
    {
      id: '4',
      title: 'OG Collector',
      description: 'Own a legendary product NFT',
      icon: Crown,
      unlocked: true
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 border-yellow-500/30';
      case 'epic': return 'text-purple-400 border-purple-500/30';
      case 'rare': return 'text-blue-400 border-blue-500/30';
      default: return 'text-green-400 border-green-500/30';
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Diamond': return 'text-cyan-400';
      case 'Gold': return 'text-yellow-400';
      case 'Silver': return 'text-gray-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 border border-purple-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-purple-400 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white">Product Collector</h2>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge variant="outline" className={`${getRankColor(portfolioStats.portfolio_rank)} border-opacity-30`}>
                  <Crown className="w-3 h-3 mr-1" />
                  {portfolioStats.portfolio_rank}
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-500/30">
                  <Zap className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-white">
                  ${portfolioStats.total_value.toLocaleString()}
                </div>
                <div className="text-gray-400 text-xs">Portfolio Value</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-400">
                  +{portfolioStats.total_return}%
                </div>
                <div className="text-gray-400 text-xs">Total Return</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-400">
                  {portfolioStats.nfts_owned}
                </div>
                <div className="text-gray-400 text-xs">NFTs Owned</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="collection" onClick={() => {/* Collection tab */}}>🌿 Collection</TabsTrigger>
          <TabsTrigger value="achievements" onClick={() => {/* Achievements tab */}}>🏆 Rewards</TabsTrigger>
          <TabsTrigger value="settings" onClick={() => {/* Settings tab */}}>⚙️ Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="collection" className="space-y-4">
          {/* Collection Controls */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">My Product NFTs</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600"
                onClick={() => alert('🔍 Filter options: By item, rarity, value, date acquired, and performance.')}
              >
                <Filter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                onClick={() => alert('🌿 Browse product NFT marketplace to add more premium items to your collection!')}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* NFT Collection Grid */}
          <div className="space-y-4">
            {ownedNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/20 border-gray-700 hover:border-green-500/30 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* NFT Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-green-900/20 to-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                        <div className="text-2xl">🌿</div>
                        {nft.lab_verified && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Zap className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* NFT Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-white font-medium text-sm truncate">{nft.name}</h4>
                            <div className="text-gray-400 text-xs">{nft.item}</div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${getRarityColor(nft.rarity)} text-xs`}
                          >
                            {nft.rarity}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Current Value:</span>
                            <span className="text-white font-medium">
                              ${nft.current_value.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Return:</span>
                            <span className={`font-medium ${
                              nft.change_percentage > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              +{nft.change_percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-600"
                        onClick={() => alert(`${nft.name} details opened! View complete item information, lab results, and trading history.`)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 hover:bg-red-900/20"
                        onClick={() => alert(`❤️ ${nft.name} added to favorites! Quick access from your watchlist.`)}
                      >
                        <Heart className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500/30 hover:bg-blue-900/20"
                        onClick={() => alert(`📤 Share ${nft.name} with the product community! Show off your premium collection.`)}
                      >
                        <Share className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <h3 className="text-lg font-bold text-white">🏆 Product Collector Achievements</h3>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${
                    achievement.unlocked ? 'bg-green-900/10 border-green-500/30' : 'bg-black/20 border-gray-700'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          achievement.unlocked ? 'bg-green-900/30' : 'bg-gray-800/30'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            achievement.unlocked ? 'text-green-400' : 'text-gray-500'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-medium">{achievement.title}</h4>
                            {achievement.unlocked && (
                              <Badge variant="outline" className="text-green-400 border-green-500/30 text-xs">
                                Unlocked
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                          
                          {achievement.progress !== undefined && !achievement.unlocked && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-white">{achievement.progress}%</span>
                              </div>
                              <Progress value={achievement.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <h3 className="text-lg font-bold text-white">⚙️ Mobile Settings</h3>
          
          <div className="space-y-4">
            <Card className="bg-black/20 border-gray-700">
              <CardContent className="p-4">
                <h4 className="text-white font-medium mb-3">🔔 Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Price Alerts</span>
                    <div className="w-10 h-6 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">New Drops</span>
                    <div className="w-10 h-6 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Auction Updates</span>
                    <div className="w-10 h-6 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-gray-700">
              <CardContent className="p-4">
                <h4 className="text-white font-medium mb-3">💰 Wallet & Security</h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600"
                    onClick={() => alert('🔐 Wallet settings opened! Manage your crypto wallets and payment methods.')}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Manage Wallets
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600"
                    onClick={() => alert('🛡️ Security settings opened! Two-factor authentication and account protection.')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Mobile Portfolio Summary */}
      <Card className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 border border-purple-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-white">📱 Mobile Portfolio Status</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">23</div>
                <div className="text-gray-300 text-sm">Product NFTs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">Diamond</div>
                <div className="text-gray-300 text-sm">Collector Rank</div>
              </div>
            </div>
            
            <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
              <p className="text-purple-300 text-sm">
                📱 <strong>Mobile Portfolio Active:</strong> Complete product NFT collection 
                management with real-time valuations and performance tracking on mobile!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
