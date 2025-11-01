
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
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
  SlidersHorizontal,
  ArrowUpDown,
  Crown,
  Gem,
  Award,
  Zap,
  Leaf,
  FlaskConical,
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const mockNFTs = [
  {
    id: '1',
    tokenId: '001',
    name: 'Myles High #001 - The Pressure Creator',
    collection: 'AuthiChain Legends',
    imageUrl: 'https://cdn.abacus.ai/images/da0ab276-7776-420e-ab29-648d9dd909d2.png',
    price: 2.5,
    currency: 'ETH',
    likes: 89,
    views: 1247,
    rarity: 'Legendary',
    category: 'Character',
    itemType: 'Premium',
    featured: true
  },
  {
    id: '2',
    tokenId: '002',
    name: 'Canvas Dreams #002 - The Artistic Soul',
    collection: 'AuthiChain Legends',
    imageUrl: 'https://cdn.abacus.ai/images/130cc451-c4c8-4607-b3ce-76c501f6762f.png',
    price: 1.8,
    currency: 'ETH',
    likes: 67,
    views: 892,
    rarity: 'Epic',
    category: 'Artist',
    itemType: 'Limited Edition',
    featured: true
  },
  {
    id: '3',
    tokenId: '003',
    name: 'Dr. Green Lab #003 - The Scientist',
    collection: 'AuthiChain Legends',
    imageUrl: 'https://cdn.abacus.ai/images/ae19848a-0d9e-412e-8fed-1d62e44ee837.png',
    price: 3.2,
    currency: 'ETH',
    likes: 124,
    views: 1563,
    rarity: 'Legendary',
    category: 'Scientist',
    itemType: 'Standard',
    featured: false
  },
  {
    id: '4',
    tokenId: '004',
    name: 'Green Activist #004 - The Revolutionary',
    collection: 'AuthiChain Legends',
    imageUrl: 'https://cdn.abacus.ai/images/2dcfc51e-46b1-4fb7-8ec8-ca87f4cf3e35.png',
    price: 2.1,
    currency: 'ETH',
    likes: 78,
    views: 956,
    rarity: 'Rare',
    category: 'Activist',
    itemType: 'Premium',
    featured: false
  },
  // Additional NFTs for pagination
  {
    id: '5',
    tokenId: '005',
    name: 'Grow Master #005 - The Cultivator',
    collection: 'AuthiChain Legends',
    imageUrl: 'https://cdn.abacus.ai/images/315ddb4e-c897-448e-9bb6-7148db5d1124.png',
    price: 1.9,
    currency: 'ETH',
    likes: 56,
    views: 734,
    rarity: 'Epic',
    category: 'Grower',
    itemType: 'Limited Edition',
    featured: false
  },
  {
    id: '6',
    tokenId: '006',
    name: 'Hash Queen #006 - The Processor',
    collection: 'AuthiChain Legends',
    imageUrl: 'https://cdn.abacus.ai/images/9d6e69dd-ca72-4b50-849c-8bae29f9dffb.png',
    price: 2.7,
    currency: 'ETH',
    likes: 98,
    views: 1189,
    rarity: 'Legendary',
    category: 'Processor',
    itemType: 'Standard',
    featured: false
  }
];

export function EnhancedNFTMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [selectedStrainType, setSelectedStrainType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAndSortedNFTs = useMemo(() => {
    let filtered = mockNFTs.filter(nft => {
      const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nft.collection.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = nft.price >= priceRange[0] && nft.price <= priceRange[1];
      const matchesCategory = selectedCategory === 'all' || nft.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesRarity = selectedRarity === 'all' || nft.rarity.toLowerCase() === selectedRarity.toLowerCase();
      const matchesStrainType = selectedStrainType === 'all' || nft.itemType.toLowerCase() === selectedStrainType.toLowerCase();
      
      return matchesSearch && matchesPrice && matchesCategory && matchesRarity && matchesStrainType;
    });

    // Sort logic
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
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchTerm, sortBy, priceRange, selectedCategory, selectedRarity, selectedStrainType]);

  const paginatedNFTs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedNFTs.slice(startIndex, endIndex);
  }, [filteredAndSortedNFTs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedNFTs.length / itemsPerPage);

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'epic': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'rare': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-green-400 bg-green-500/20 border-green-500/30';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return <Crown className="w-3 h-3" />;
      case 'epic': return <Gem className="w-3 h-3" />;
      case 'rare': return <Award className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <Card className="border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search NFTs, collections, creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="most-liked">Most Liked</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
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

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-slate-600 bg-slate-800/50"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-slate-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      Price Range (ETH)
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{priceRange[0]} ETH</span>
                      <span>{priceRange[1]} ETH</span>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      Category
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-600">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="character">Character</SelectItem>
                        <SelectItem value="artist">Artist</SelectItem>
                        <SelectItem value="scientist">Scientist</SelectItem>
                        <SelectItem value="activist">Activist</SelectItem>
                        <SelectItem value="grower">Grower</SelectItem>
                        <SelectItem value="processor">Processor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rarity Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      Rarity
                    </label>
                    <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-600">
                        <SelectValue placeholder="All Rarities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Rarities</SelectItem>
                        <SelectItem value="legendary">Legendary</SelectItem>
                        <SelectItem value="epic">Epic</SelectItem>
                        <SelectItem value="rare">Rare</SelectItem>
                        <SelectItem value="common">Common</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Item Type Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      Item Type
                    </label>
                    <Select value={selectedStrainType} onValueChange={setSelectedStrainType}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-600">
                        <SelectValue placeholder="All Item Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="limited">Limited Edition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setPriceRange([0, 5]);
                      setSelectedCategory('all');
                      setSelectedRarity('all');
                      setSelectedStrainType('all');
                      setCurrentPage(1);
                    }}
                    className="border-slate-600"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-gray-300">
          Showing {paginatedNFTs.length} of {filteredAndSortedNFTs.length} NFTs
        </div>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* NFT Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        <AnimatePresence>
          {paginatedNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
                    {nft.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white font-bold">
                          <Crown className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className={`font-bold border ${getRarityColor(nft.rarity)}`}>
                        {getRarityIcon(nft.rarity)}
                        <span className="ml-1">{nft.rarity}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline" className="text-purple-300 border-purple-500">
                          {nft.collection}
                        </Badge>
                        <Badge variant="outline" className="text-green-300 border-green-500">
                          <Leaf className="w-3 h-3 mr-1" />
                          {nft.itemType}
                        </Badge>
                      </div>
                      
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
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-400">Price</div>
                          <div className="font-bold text-green-400 text-lg flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {nft.price} {nft.currency}
                          </div>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Handle quick buy
                          }}
                        >
                          Quick Buy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="border-slate-600"
          >
            Previous
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? '' : 'border-slate-600'}
              >
                {page}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="border-slate-600"
          >
            Next
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredAndSortedNFTs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No NFTs found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setPriceRange([0, 5]);
              setSelectedCategory('all');
              setSelectedRarity('all');
              setSelectedStrainType('all');
              setCurrentPage(1);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
