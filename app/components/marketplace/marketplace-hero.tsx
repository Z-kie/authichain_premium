
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Crown,
  Sparkles,
  Leaf,
  Users,
  TrendingUp,
  Star,
  Gem,
  Award,
  ChevronRight,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function MarketplaceHero() {
  const featuredCollections = [
    {
      id: 'authichain-legends',
      name: 'AuthiChain Legends',
      description: 'Premium product character NFTs with unique stories and traits',
      image: 'https://cdn.abacus.ai/images/56f7b5d8-589f-46f1-a464-9280108b75da.png',
      floor: '2.8 ETH',
      volume: '124.5 ETH',
      count: 5,
      link: '/marketplace/characters',
      featured: true
    },
    {
      id: 'item-genetics',
      name: 'Strain Genetics Lab',
      description: 'Scientific product item documentation NFTs',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
      floor: '0.8 ETH',
      volume: '45.2 ETH',
      count: 25,
      link: '/marketplace',
      featured: false
    },
    {
      id: 'grow-masters',
      name: 'Grow Masters Collection',
      description: 'Cultivation technique and equipment NFTs',
      image: 'https://i.ytimg.com/vi/aZgNhGcm520/sddefault.jpg',
      floor: '1.2 ETH',
      volume: '78.9 ETH',
      count: 18,
      link: '/marketplace',
      featured: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-slate-800 to-emerald-900 p-8 border-2 border-purple-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-emerald-900/20 opacity-50" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              New Collection Launch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              AuthiChain Legends
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Meet the legendary characters of product culture. Each NFT tells a unique story 
              with detailed traits, backgrounds, and exclusive benefits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Link href="/marketplace/characters">
                  <Crown className="w-4 h-4 mr-2" />
                  Explore Collection
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
                asChild
              >
                <Link href="/nft/1">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {featuredCollections[0] && (
                <div className="space-y-4">
                  <Card className="border-purple-500/30 overflow-hidden">
                    <div className="relative aspect-square">
                      <Image 
                        src={featuredCollections[0].image} 
                        alt={featuredCollections[0].name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-yellow-500/90 text-black font-bold">
                          <Star className="w-3 h-3 mr-1" />
                          #001
                        </Badge>
                      </div>
                    </div>
                  </Card>
                  <Card className="border-green-500/30 overflow-hidden">
                    <div className="relative aspect-square bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                      <Image 
                        src="https://cdn.abacus.ai/images/f5bd99e9-f06b-42ad-a291-0e3a9c8d81e3.png" 
                        alt="Canvas Dreams"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-purple-500/90 text-white font-bold">
                          <Gem className="w-3 h-3 mr-1" />
                          #002
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
              <div className="space-y-4 pt-8">
                <Card className="border-blue-500/30 overflow-hidden">
                  <div className="relative aspect-square">
                    <Image 
                      src="https://cdn.abacus.ai/images/362fa2b7-60b9-4240-8a9c-f1e9125564a3.png" 
                      alt="Dr. Green Lab"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-blue-500/90 text-white font-bold">
                        <Award className="w-3 h-3 mr-1" />
                        #003
                      </Badge>
                    </div>
                  </div>
                </Card>
                <Card className="border-orange-500/30 overflow-hidden">
                  <div className="relative aspect-square">
                    <Image 
                      src="https://cdn.abacus.ai/images/876d7598-5459-42ef-914c-1208edf71e40.png" 
                      alt="Green Activist"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-orange-500/90 text-white font-bold">
                        <Users className="w-3 h-3 mr-1" />
                        #004
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">48</div>
            <div className="text-sm text-gray-400">Total Collections</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 mr-1" />
              2.8 ETH
            </div>
            <div className="text-sm text-gray-400">Floor Price</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">1.2k ETH</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </CardContent>
        </Card>
        <Card className="border-pink-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-400">3.4k</div>
            <div className="text-sm text-gray-400">Active Traders</div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Collections */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Collections</h2>
          <Button variant="outline" asChild>
            <Link href="/marketplace">
              View All
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-500/50 cursor-pointer">
                <Link href={collection.link}>
                  <CardHeader className="p-0">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {collection.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white font-bold">
                            <Crown className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-green-400">{collection.floor}</div>
                        <div className="text-gray-500">Floor</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-400">{collection.volume}</div>
                        <div className="text-gray-500">Volume</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-400">{collection.count}</div>
                        <div className="text-gray-500">Items</div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
