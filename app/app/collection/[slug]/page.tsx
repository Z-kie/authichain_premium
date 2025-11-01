
'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Heart,
  Star,
  Grid3X3,
  List,
  Crown,
  Gem,
  Award,
  ExternalLink,
  Share2,
  BarChart,
  Activity
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock collection data - in real app, this would come from API
const mockCollections = {
  'authichain-legends': {
    id: 'authichain-legends',
    name: 'AuthiChain Legends',
    description: 'Legendary product characters with unique stories, traits, and exclusive benefits. Each NFT represents a cornerstone figure in product culture.',
    coverImage: 'https://cdn.abacus.ai/images/56f7b5d8-589f-46f1-a464-9280108b75da.png',
    creator: 'AuthiChain Studios',
    createdDate: '2024-03-01',
    totalSupply: 10000,
    floorPrice: 2.5,
    volume: 1247.8,
    owners: 3421,
    royalty: 7.5,
    blockchain: 'Ethereum',
    contractAddress: '0x742d35cc6eabbf9b8a3c6f5e5b8f7aae96c8b9f2',
    website: 'https://authichain.com',
    twitter: 'https://twitter.com/authichain',
    discord: 'https://discord.gg/authichain',
    verified: true,
    featured: true
  }
};

const mockCollectionNFTs = [
  {
    id: '1',
    tokenId: '001',
    name: 'Myles High #001 - The Pressure Creator',
    imageUrl: 'https://cdn.abacus.ai/images/56f7b5d8-589f-46f1-a464-9280108b75da.png',
    price: 2.5,
    currency: 'ETH',
    likes: 89,
    views: 1247,
    rarity: 'Legendary'
  },
  {
    id: '2',
    tokenId: '002',
    name: 'Canvas Dreams #002 - The Creative Visionary',
    imageUrl: 'https://cdn.abacus.ai/images/f5bd99e9-f06b-42ad-a291-0e3a9c8d81e3.png',
    price: 1.8,
    currency: 'ETH',
    likes: 67,
    views: 892,
    rarity: 'Epic'
  },
  {
    id: '3',
    tokenId: '003',
    name: 'Dr. Green Lab #003 - The Product Scientist',
    imageUrl: 'https://cdn.abacus.ai/images/362fa2b7-60b9-4240-8a9c-f1e9125564a3.png',
    price: 3.2,
    currency: 'ETH',
    likes: 124,
    views: 1563,
    rarity: 'Legendary'
  },
  {
    id: '4',
    tokenId: '004',
    name: 'Green Activist #004 - The Revolutionary',
    imageUrl: 'https://cdn.abacus.ai/images/876d7598-5459-42ef-914c-1208edf71e40.png',
    price: 2.1,
    currency: 'ETH',
    likes: 78,
    views: 956,
    rarity: 'Rare'
  }
];

export default function CollectionPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const collection = mockCollections[slug as keyof typeof mockCollections];
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredNFTs = useMemo(() => {
    let filtered = mockCollectionNFTs.filter(nft =>
      nft.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'most-liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'token-id':
        filtered.sort((a, b) => parseInt(a.tokenId) - parseInt(b.tokenId));
        break;
    }

    return filtered;
  }, [searchTerm, sortBy]);

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'epic': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'rare': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-green-400 bg-green-500/20 border-green-500/30';
    }
  };

  const shareCollection = async () => {
    try {
      await navigator.share({
        title: collection?.name,
        text: collection?.description,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Collection Not Found</h2>
          <Button asChild variant="outline">
            <Link href="/marketplace">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto py-8 px-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6 text-purple-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        {/* Collection Header */}
        <div className="mb-8">
          <Card className="overflow-hidden border-2 border-purple-500/30">
            <div className="relative h-48 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900">
              <Image
                src={collection.coverImage}
                alt={collection.name}
                fill
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-transparent to-purple-900/80" />
            </div>
            
            <CardContent className="p-6 -mt-16 relative">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Collection Avatar */}
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-purple-500/50 bg-slate-800">
                  <Image
                    src={collection.coverImage}
                    alt={collection.name}
                    fill
                    className="object-cover"
                  />
                  {collection.verified && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-500/90 text-white">
                        <Award className="w-3 h-3 mr-1" />
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Collection Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{collection.name}</h1>
                      <p className="text-gray-300 max-w-2xl leading-relaxed">
                        {collection.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={shareCollection}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://etherscan.io/address/${collection.contractAddress}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Etherscan
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Collection Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Total Supply</div>
                      <div className="text-white font-bold">{collection.totalSupply.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Floor Price</div>
                      <div className="text-green-400 font-bold">{collection.floorPrice} ETH</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Volume</div>
                      <div className="text-purple-400 font-bold">{collection.volume} ETH</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Owners</div>
                      <div className="text-yellow-400 font-bold">{collection.owners.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Royalty</div>
                      <div className="text-pink-400 font-bold">{collection.royalty}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-purple-500/30 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search within collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600"
                />
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="most-liked">Most Liked</SelectItem>
                    <SelectItem value="most-viewed">Most Viewed</SelectItem>
                    <SelectItem value="token-id">Token ID</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border border-slate-600 rounded-md bg-slate-800/50">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <div className="text-gray-300">
            Showing {filteredNFTs.length} NFTs
          </div>
        </div>

        {/* NFT Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-500/50 cursor-pointer ${
                viewMode === 'list' ? 'flex flex-row overflow-hidden' : 'overflow-hidden'
              }`}>
                <Link href={`/nft/${nft.id}`} className={viewMode === 'list' ? 'flex w-full' : 'block'}>
                  <div className={`relative ${
                    viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
                  } overflow-hidden`}>
                    <Image
                      src={nft.imageUrl}
                      alt={nft.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white font-bold">
                        #{nft.tokenId}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={`font-bold border ${getRarityColor(nft.rarity)}`}>
                        {nft.rarity}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div className="space-y-2">
                      <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                        {nft.name}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3 text-gray-400">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {nft.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {nft.likes}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                        <div>
                          <div className="text-sm text-gray-400">Price</div>
                          <div className="font-bold text-green-400 text-lg flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {nft.price} {nft.currency}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredNFTs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No NFTs found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search criteria</p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
