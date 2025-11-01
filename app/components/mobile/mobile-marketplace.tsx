

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Filter,
  Heart,
  Eye,
  TrendingUp,
  ShoppingCart,
  Star,
  Zap,
  Award,
  Target,
  Gem,
  DollarSign,
  Clock,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileProductNFT {
  id: string;
  name: string;
  item: string;
  price: number;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  lab_verified: boolean;
  views: number;
  likes: number;
  auction_end?: string;
  featured: boolean;
}

export function MobileMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const featuredNFTs: MobileProductNFT[] = [
    {
      id: '1',
      name: 'Rare Diamond Genesis #1',
      item: 'Rare Diamond',
      price: 15000,
      image: '/images/purple-haze-nft.jpg',
      rarity: 'legendary',
      lab_verified: true,
      views: 12450,
      likes: 234,
      auction_end: '2024-09-10T18:00:00Z',
      featured: true
    },
    {
      id: '2',
      name: 'Blue Sapphire Classic #47',
      item: 'Blue Sapphire',
      price: 8750,
      image: '/images/og-kush-nft.jpg',
      rarity: 'epic',
      lab_verified: true,
      views: 8934,
      likes: 189,
      featured: true
    },
    {
      id: '3',
      name: 'Vintage Watch #156',
      item: 'Vintage Watch',
      price: 5240,
      image: '/images/gsc-nft.jpg',
      rarity: 'rare',
      lab_verified: true,
      views: 6745,
      likes: 145,
      featured: false
    },
    {
      id: '4',
      name: 'Ruby Collection Premium #89',
      item: 'Ruby Collection',
      price: 3890,
      image: '/images/blue-dream-nft.jpg',
      rarity: 'rare',
      lab_verified: true,
      views: 4532,
      likes: 98,
      featured: false
    },
    {
      id: '5',
      name: 'Crystal Art Authentic #234',
      item: 'Crystal Art',
      price: 7650,
      image: '/images/white-widow-nft.jpg',
      rarity: 'epic',
      lab_verified: true,
      views: 7845,
      likes: 167,
      featured: false
    }
  ];

  const quickStats = {
    totalVolume: 12400000,
    activeListings: 8934,
    avgPrice: 2350,
    topStrain: 'Rare Diamond'
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 border-yellow-500/30';
      case 'epic': return 'text-purple-400 border-purple-500/30';
      case 'rare': return 'text-blue-400 border-blue-500/30';
      default: return 'text-green-400 border-green-500/30';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Award className="w-3 h-3" />;
      case 'epic': return <Gem className="w-3 h-3" />;
      case 'rare': return <Star className="w-3 h-3" />;
      default: return <Target className="w-3 h-3" />;
    }
  };

  const handlePurchase = (nft: MobileProductNFT) => {
    alert(`🛒 Purchasing ${nft.name} for $${nft.price.toLocaleString()}! Mobile-optimized checkout with crypto & Stripe payments available.`);
  };

  const handleLike = (nft: MobileProductNFT) => {
    alert(`❤️ ${nft.name} added to your mobile watchlist! Get push notifications for price changes.`);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Mobile Search Header */}
      <Card className="bg-black/20 border-gray-700">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search product items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-green-500/30 hover:bg-green-900/20"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500/30 hover:bg-purple-900/20"
                onClick={() => alert('🎯 Quick filters activated: High THC, Lab Verified, Auction Only, Price Range!')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-r from-green-900/20 via-purple-900/20 to-blue-900/20 border border-green-500/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">
                ${(quickStats.totalVolume / 1000000).toFixed(1)}M
              </div>
              <div className="text-green-400 text-xs">Trading Volume</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {quickStats.activeListings.toLocaleString()}
              </div>
              <div className="text-blue-400 text-xs">Active Listings</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                ${quickStats.avgPrice.toLocaleString()}
              </div>
              <div className="text-purple-400 text-xs">Avg Price</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">🔥</div>
              <div className="text-yellow-400 text-xs">Hot: {quickStats.topStrain}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured NFT Carousel */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            🌟 Featured Product NFTs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuredNFTs.slice(0, 3).map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 rounded-lg p-4 border border-gray-700 hover:border-green-500/30 transition-colors"
              >
                <div className="flex gap-4">
                  {/* NFT Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-green-900/20 to-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                    <div className="text-2xl">🌿</div>
                    {nft.featured && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
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
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className={`${getRarityColor(nft.rarity)} text-xs`}>
                          {getRarityIcon(nft.rarity)}
                          <span className="ml-1 capitalize">{nft.rarity}</span>
                        </Badge>
                        {nft.lab_verified && (
                          <Zap className="w-3 h-3 text-green-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xl font-bold text-white">
                        ${nft.price.toLocaleString()}
                      </div>
                      {nft.auction_end && (
                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                          <Clock className="w-3 h-3" />
                          Auction
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{nft.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-red-400" />
                          <span>{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => handlePurchase(nft)}
                  >
                    {nft.auction_end ? (
                      <>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Bid
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Buy
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 hover:bg-red-900/20"
                    onClick={() => handleLike(nft)}
                  >
                    <Heart className="w-3 h-3" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/30 hover:bg-blue-900/20"
                    onClick={() => alert(`👀 ${nft.name} details opened! Full item info, lab results, and trading history.`)}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* More NFTs Grid */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-green-400" />
            All Product NFTs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {featuredNFTs.slice(3).map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 rounded-lg p-4 border border-gray-700 hover:border-green-500/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-white font-medium">{nft.name}</h4>
                    <div className="text-gray-400 text-sm">{nft.item}</div>
                  </div>
                  <div className="text-xl font-bold text-white">
                    ${nft.price.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`${getRarityColor(nft.rarity)} text-xs`}>
                      {getRarityIcon(nft.rarity)}
                      <span className="ml-1 capitalize">{nft.rarity}</span>
                    </Badge>
                    {nft.lab_verified && (
                      <Badge variant="outline" className="text-green-400 border-green-500/30 text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => handlePurchase(nft)}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Buy Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mobile Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-16 flex flex-col items-center justify-center"
          onClick={() => alert('🔥 Hot deals activated! Best product NFT opportunities with limited-time offers.')}
        >
          <TrendingUp className="w-6 h-6 mb-1" />
          <span className="text-sm">Hot Deals</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('💎 Rare finds opened! Exclusive legendary and epic product NFTs for serious collectors.')}
        >
          <Gem className="w-6 h-6 mb-1" />
          <span className="text-sm">Rare Finds</span>
        </Button>
      </div>

      {/* Mobile Marketplace Summary */}
      <Card className="bg-gradient-to-r from-green-900/20 via-purple-900/20 to-blue-900/20 border border-green-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-white">📱 Mobile Product NFT Marketplace</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">8.9k</div>
                <div className="text-gray-300 text-sm">Live Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">$12.4M</div>
                <div className="text-gray-300 text-sm">Total Volume</div>
              </div>
            </div>
            
            <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
              <p className="text-green-300 text-sm">
                🌿 <strong>Mobile Marketplace Active:</strong> Full product NFT trading experience 
                optimized for mobile with touch-friendly interface and instant notifications!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
