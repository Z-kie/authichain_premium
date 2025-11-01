

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  Eye,
  Heart,
  Star,
  Clock,
  ChevronRight,
  Gem,
  Award,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductNFT {
  id: string;
  name: string;
  item: string;
  genetics: string;
  thc_percentage: number;
  cbd_percentage: number;
  price: number;
  seller: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  lab_verified: boolean;
  cultivation_method: string;
  harvest_date: string;
  views: number;
  likes: number;
  bids: number;
  auction_end?: string;
}

interface MarketStats {
  total_volume: number;
  active_listings: number;
  total_sales: number;
  avg_price: number;
  top_item: string;
  growth_rate: number;
}

export function NFTMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price_low');
  const [viewMode, setViewMode] = useState('grid');

  const marketStats: MarketStats = {
    total_volume: 12400000,
    active_listings: 8934,
    total_sales: 45678,
    avg_price: 2350,
    top_item: 'Rare Diamond #1',
    growth_rate: 156.7
  };

  const featuredNFTs: ProductNFT[] = [
    {
      id: '1',
      name: 'Rare Diamond Genesis #1',
      item: 'Rare Diamond',
      genetics: 'Purple Thai × Haze',
      thc_percentage: 23.4,
      cbd_percentage: 0.8,
      price: 15000,
      seller: 'ProductConnoisseur',
      image: '/images/purple-haze-nft.jpg',
      rarity: 'legendary',
      lab_verified: true,
      cultivation_method: 'Indoor Hydroponic',
      harvest_date: '2024-08-15',
      views: 12450,
      likes: 234,
      bids: 23,
      auction_end: '2024-09-10T18:00:00Z'
    },
    {
      id: '2',
      name: 'Blue Sapphire Classic #47',
      item: 'Blue Sapphire',
      genetics: 'Chemdawg × Lemon Thai × Pakistani Kush',
      thc_percentage: 27.8,
      cbd_percentage: 1.2,
      price: 8750,
      seller: 'StrainMaster',
      image: '/images/og-kush-nft.jpg',
      rarity: 'epic',
      lab_verified: true,
      cultivation_method: 'Organic Soil',
      harvest_date: '2024-08-20',
      views: 8934,
      likes: 189,
      bids: 15
    },
    {
      id: '3',
      name: 'Vintage Watch #156',
      item: 'Vintage Watch',
      genetics: 'Blue Sapphire × Durban Poison',
      thc_percentage: 25.6,
      cbd_percentage: 0.9,
      price: 5240,
      seller: 'CookieCollector',
      image: '/images/gsc-nft.jpg',
      rarity: 'rare',
      lab_verified: true,
      cultivation_method: 'LED Grow',
      harvest_date: '2024-08-25',
      views: 6745,
      likes: 145,
      bids: 8
    },
    {
      id: '4',
      name: 'Ruby Collection Premium #89',
      item: 'Ruby Collection',
      genetics: 'Blueberry × Super Silver Haze',
      thc_percentage: 21.3,
      cbd_percentage: 2.1,
      price: 3890,
      seller: 'DreamWeaver',
      image: '/images/blue-dream-nft.jpg',
      rarity: 'rare',
      lab_verified: true,
      cultivation_method: 'Outdoor Organic',
      harvest_date: '2024-08-30',
      views: 4532,
      likes: 98,
      bids: 5
    },
    {
      id: '5',
      name: 'Crystal Art Authentic #234',
      item: 'Crystal Art',
      genetics: 'Brazilian × South Indian',
      thc_percentage: 24.7,
      cbd_percentage: 1.5,
      price: 7650,
      seller: 'WidowMaker',
      image: '/images/white-widow-nft.jpg',
      rarity: 'epic',
      lab_verified: true,
      cultivation_method: 'Indoor Soil',
      harvest_date: '2024-09-01',
      views: 7845,
      likes: 167,
      bids: 12
    },
    {
      id: '6',
      name: 'Gold Artifact Limited #12',
      item: 'Gold Artifact',
      genetics: 'Chemdawg 91 × Super Skunk',
      thc_percentage: 26.2,
      cbd_percentage: 0.7,
      price: 4560,
      seller: 'SourCultivator',
      image: '/images/sour-diesel-nft.jpg',
      rarity: 'rare',
      lab_verified: true,
      cultivation_method: 'Hydroponic DWC',
      harvest_date: '2024-09-03',
      views: 5234,
      likes: 112,
      bids: 7
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 border-yellow-500/30 bg-yellow-900/20';
      case 'epic': return 'text-purple-400 border-purple-500/30 bg-purple-900/20';
      case 'rare': return 'text-blue-400 border-blue-500/30 bg-blue-900/20';
      default: return 'text-green-400 border-green-500/30 bg-green-900/20';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Award className="w-4 h-4" />;
      case 'epic': return <Gem className="w-4 h-4" />;
      case 'rare': return <Star className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const handlePurchase = (nft: ProductNFT) => {
    alert(`Purchasing ${nft.name} for $${nft.price.toLocaleString()}! Payment processing with Stripe and crypto options available.`);
  };

  const handleBid = (nft: ProductNFT) => {
    alert(`Placing bid on ${nft.name}! Current high bid will be increased by 10%.`);
  };

  return (
    <div className="space-y-8">
      {/* Marketplace Overview */}
      <Card className="bg-gradient-to-r from-green-900/20 via-purple-900/20 to-blue-900/20 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-green-400" />
            🌿 Product NFT Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                ${(marketStats.total_volume / 1000000).toFixed(1)}M
              </div>
              <div className="text-green-400">Total Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {marketStats.active_listings.toLocaleString()}
              </div>
              <div className="text-blue-400">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {marketStats.total_sales.toLocaleString()}
              </div>
              <div className="text-purple-400">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                ${marketStats.avg_price.toLocaleString()}
              </div>
              <div className="text-orange-400">Avg Price</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                +{marketStats.growth_rate}%
              </div>
              <div className="text-green-400">Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">🔥</div>
              <div className="text-yellow-400">Hot Strain</div>
              <div className="text-sm text-gray-300">{marketStats.top_item}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <Card className="bg-black/20 border-gray-700">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search product items, genetics, or sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-gray-700"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-slate-800 border-gray-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="limited">Limited Edition</SelectItem>
                <SelectItem value="special">Special Edition</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-slate-800 border-gray-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="ending_soon">Auction Ending Soon</SelectItem>
                <SelectItem value="rarity">Rarity</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-purple-500/30 hover:bg-purple-900/20">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured NFTs Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {featuredNFTs.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-black/20 border-gray-700 hover:border-green-500/30 overflow-hidden">
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-purple-900/20 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🌿</div>
                </div>
                
                <div className="absolute top-4 left-4 z-20">
                  <Badge 
                    variant="outline" 
                    className={`${getRarityColor(nft.rarity)}`}
                  >
                    {getRarityIcon(nft.rarity)}
                    <span className="ml-1 capitalize">{nft.rarity}</span>
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-4 z-20">
                  {nft.lab_verified && (
                    <Badge variant="outline" className="text-green-400 border-green-500/30">
                      <Zap className="w-3 h-3 mr-1" />
                      Lab Verified
                    </Badge>
                  )}
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>{nft.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>{nft.likes}</span>
                      </div>
                      {nft.bids > 0 && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-blue-400" />
                          <span>{nft.bids} bids</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">{nft.name}</h3>
                    <div className="text-sm text-gray-400 space-y-1">
                      <div><strong className="text-green-400">Strain:</strong> {nft.item}</div>
                      <div><strong className="text-purple-400">Genetics:</strong> {nft.genetics}</div>
                      <div className="flex gap-4">
                        <span><strong className="text-blue-400">THC:</strong> {nft.thc_percentage}%</span>
                        <span><strong className="text-orange-400">CBD:</strong> {nft.cbd_percentage}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        ${nft.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">by {nft.seller}</div>
                    </div>
                    
                    {nft.auction_end ? (
                      <div className="text-right">
                        <div className="text-sm text-yellow-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Auction
                        </div>
                        <div className="text-xs text-gray-400">Ends in 2d 4h</div>
                      </div>
                    ) : (
                      <div className="text-sm text-green-400">Buy Now</div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {nft.auction_end ? (
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        onClick={() => handleBid(nft)}
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Place Bid
                      </Button>
                    ) : (
                      <Button 
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        onClick={() => handlePurchase(nft)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="border-gray-600 hover:bg-gray-800"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-red-500/30 hover:bg-red-900/20"
                    >
                      <Heart className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Marketplace Actions */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-16"
          onClick={() => alert('🌿 Product NFT creation wizard launched! Mint your authentic item NFTs with lab verification.')}
        >
          <div className="text-center">
            <Gem className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Create NFT</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('🚀 Auction house opened! List your rare product NFTs for bidding with reserve prices.')}
        >
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Start Auction</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-purple-500/30 hover:bg-purple-900/20"
          onClick={() => alert('💼 Portfolio manager activated! Track your product NFT investments and performance.')}
        >
          <div className="text-center">
            <Users className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">My Portfolio</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-orange-500/30 hover:bg-orange-900/20"
          onClick={() => alert('📊 Market analytics opened! Deep insights into product NFT trends and pricing data.')}
        >
          <div className="text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Market Insights</div>
          </div>
        </Button>
      </div>

      {/* Success Metrics */}
      <Card className="bg-gradient-to-r from-green-900/20 via-purple-900/20 to-blue-900/20 border border-green-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">🌿 Product NFT Marketplace Success</h2>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$12.4M</div>
                <div className="text-gray-300">Trading Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">45,678</div>
                <div className="text-gray-300">NFTs Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">8,934</div>
                <div className="text-gray-300">Active Listings</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <p className="text-green-300 text-lg">
                🌿 <strong>Marketplace Status:</strong> The world's largest product NFT marketplace is LIVE with 
                $12.4M in trading volume and 2.5% transaction fees generating substantial platform revenue!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
