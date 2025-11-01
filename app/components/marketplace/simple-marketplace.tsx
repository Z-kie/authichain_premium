
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  Star,
  Filter,
  SortAsc,
  Eye,
  Grid3X3,
  List,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterSidebar } from '@/components/search/filter-sidebar';
import { SortDropdown } from '@/components/search/sort-dropdown';

interface NFT {
  id: string;
  title: string;
  price: number;
  image: string;
  creator: string;
  category: string;
  likes: number;
  isLiked: boolean;
  rating: number;
  views: number;
}

export function SimpleMarketplace() {
  const { data: session } = useSession() || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 200,
    status: [] as string[],
    collections: [] as string[],
    verifiedOnly: false,
    categories: [] as string[]
  });

  // Luxury categories for consumers
  const categories = [
    { id: 'all', name: 'All Categories', count: 127 },
    { id: 'watches', name: 'Luxury Watches', count: 32 },
    { id: 'art', name: 'Fine Art', count: 18 },
    { id: 'fashion', name: 'Designer Fashion', count: 25 },
    { id: 'jewelry', name: 'Fine Jewelry', count: 19 },
    { id: 'sneakers', name: 'Limited Sneakers', count: 16 },
    { id: 'sports', name: 'Sports Memorabilia', count: 12 },
    { id: 'vintage', name: 'Vintage & Antiques', count: 5 }
  ];

  // Mock luxury NFT data with loading simulation
  useEffect(() => {
    const loadNfts = async () => {
      setIsLoading(true);
      
      // Simulate loading delay for better UX demo
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockNfts: NFT[] = [
      {
        id: '1',
        title: 'Rolex Cosmograph Daytona 116500LN',
        price: 18.5,
        image: 'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_3000,h_3000,g_auto/f_auto/q_auto/v1744077876/product/0b76a8cfc2050c5e459aed2aec089cc8/a3e109e430ae6d57e16c4c98fb588818?_a=BAVAfVDW0',
        creator: 'TimepieceMaster',
        category: 'watches',
        likes: 234,
        isLiked: false,
        rating: 4.9,
        views: 1847
      },
      {
        id: '2',
        title: 'Hermès Birkin 30 Gold Togo',
        price: 22.8,
        image: 'http://www.redeluxe.com/cdn/shop/files/hermes-handbag-gold-vintage-birkin-30-gold-ardennes-gold-plated-c-square-stamp-redeluxe-45771055628598.jpg?v=1706261980',
        creator: 'LuxuryFashion',
        category: 'fashion',
        likes: 456,
        isLiked: true,
        rating: 4.8,
        views: 2847
      },
      {
        id: '3',
        title: '1.5ct VVS1 Diamond Solitaire Ring',
        price: 8.9,
        image: 'https://cdn.shopify.com/s/files/1/0252/5265/9286/files/1428.-ClubRingwithRadiantcutyellow.jpg?v=1724791218',
        creator: 'GemsExpert',
        category: 'jewelry',
        likes: 334,
        isLiked: false,
        rating: 5.0,
        views: 1987
      },
      {
        id: '4',
        title: 'Patek Philippe Nautilus 5711/1A',
        price: 85.2,
        image: 'https://cdn2.jomashop.com/media/catalog/product/cache/0ee3019724ce73007b606b54ba535a23/p/a/patek-philippe-nautilus-automatic-blue-dial-unisex-watch-57111a010.jpg?width=546&height=546',
        creator: 'TimepieceMaster',
        category: 'watches',
        likes: 567,
        isLiked: false,
        rating: 4.9,
        views: 3241
      },
      {
        id: '5',
        title: 'Contemporary Abstract Art #47',
        price: 125.0,
        image: 'https://artesty.com/cdn/shop/products/1_330a1b46-7617-415a-bdde-57dd9d4048a3.jpg?v=1644528112',
        creator: 'ArtCurator',
        category: 'art',
        likes: 378,
        isLiked: true,
        rating: 4.8,
        views: 2156
      },
      {
        id: '6',
        title: 'Air Jordan 1 "Chicago" 1985',
        price: 12.5,
        image: 'https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_ba2a414c-59bc-45aa-bdd3-03ba3aaa2dc2_1080x.jpg?=75&v=1708676901',
        creator: 'SneakerHead',
        category: 'sneakers',
        likes: 567,
        isLiked: false,
        rating: 4.7,
        views: 2345
      },
      {
        id: '7',
        title: 'Babe Ruth Signed Baseball 1927',
        price: 156.0,
        image: 'https://m.media-amazon.com/images/I/61fUJH8CoYS.jpg',
        creator: 'SportsLegend',
        category: 'sports',
        likes: 789,
        isLiked: false,
        rating: 4.9,
        views: 4567
      },
      {
        id: '8',
        title: 'Louis Vuitton Neverfull MM',
        price: 1.8,
        image: 'https://cdn.theluxurycloset.com/uploads/opt/products/750x750/luxury-women-louis-vuitton-used-handbags-p329387-001.jpg',
        creator: 'LuxuryFashion',
        category: 'fashion',
        likes: 298,
        isLiked: true,
        rating: 4.6,
        views: 1654
      },
      {
        id: '9',
        title: 'Vintage Pocket Watch 18k Gold',
        price: 5.2,
        image: 'http://vintage-pocket-watch.com/cdn/shop/products/Square-Pocket-Watch_1200x1200.jpg?v=1636127966',
        creator: 'VintageCollector',
        category: 'vintage',
        likes: 234,
        isLiked: false,
        rating: 4.8,
        views: 1456
      },
      {
        id: '10',
        title: 'PlayStation 5 30th Anniversary',
        price: 2.4,
        image: 'http://flitit.com/cdn/shop/files/ghost-of-yotei-le-product-imagery-02-en-03jul25.webp?v=1758528219',
        creator: 'TechCollector',
        category: 'collectibles',
        likes: 678,
        isLiked: false,
        rating: 4.8,
        views: 3456
      }
    ];
    
    setNfts(mockNfts);
    setFilteredNfts(mockNfts);
    setIsLoading(false);
  };
  
  loadNfts();
}, []);

  // Enhanced filter and search logic
  useEffect(() => {
    if (isLoading) return;
    
    let filtered = nfts;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(nft => nft.category === selectedCategory);
    }

    // Advanced category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(nft => filters.categories.includes(nft.category));
    }

    // Price range filter
    filtered = filtered.filter(nft => 
      nft.price >= filters.minPrice && nft.price <= filters.maxPrice
    );

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(nft =>
        nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.creator.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price_low_high':
        case 'price-low':
          return a.price - b.price;
        case 'price_high_low':
        case 'price-high':
          return b.price - a.price;
        case 'most_favorited':
        case 'popular':
          return b.likes - a.likes;
        case 'rating':
          return b.rating - a.rating;
        case 'most_viewed':
          return b.views - a.views;
        case 'newest':
        default:
          return 0;
      }
    });

    setFilteredNfts(filtered);
  }, [nfts, selectedCategory, searchQuery, sortBy, filters, isLoading]);

  const toggleLike = (nftId: string) => {
    setNfts(prev => prev.map(nft =>
      nft.id === nftId ? { ...nft, isLiked: !nft.isLiked, likes: nft.isLiked ? nft.likes - 1 : nft.likes + 1 } : nft
    ));
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleFiltersReset = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 200,
      status: [],
      collections: [],
      verifiedOnly: false,
      categories: []
    });
    setSelectedCategory('all');
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="bg-slate-800/50 border-slate-700">
          <div className="aspect-square bg-slate-700 animate-pulse rounded-t-lg" />
          <CardContent className="p-4 space-y-3">
            <div className="space-y-2">
              <div className="h-5 bg-slate-700 rounded animate-pulse" />
              <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-8 bg-slate-700 rounded w-20 animate-pulse" />
              <div className="h-8 bg-slate-700 rounded w-16 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            ✨ Luxury NFT Marketplace
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover authenticated luxury items from Rolex watches to fine art masterpieces
          </p>
        </div>

        {/* Enhanced Search, Filters & Controls */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
          {/* Top Controls Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search luxury items, creators, collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-700/30 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`h-8 w-8 p-0 ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`h-8 w-8 p-0 ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Advanced Filters Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`border-slate-600 ${showFilters ? 'bg-emerald-600 text-white border-emerald-600' : 'text-slate-300 hover:bg-slate-700'}`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(filters.categories.length > 0 || filters.minPrice > 0 || filters.maxPrice < 200 || filters.verifiedOnly) && (
                  <Badge className="ml-2 bg-emerald-500 text-white text-xs">
                    {filters.categories.length + (filters.minPrice > 0 ? 1 : 0) + (filters.maxPrice < 200 ? 1 : 0) + (filters.verifiedOnly ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              {/* Sort Dropdown */}
              <SortDropdown
                value={sortBy}
                onChange={setSortBy}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </div>

          {/* Quick Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700'
                } transition-all duration-200`}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              {isLoading ? 'Loading...' : `${filteredNfts.length} luxury items found`}
            </p>
            {(filters.categories.length > 0 || filters.minPrice > 0 || filters.maxPrice < 200 || filters.verifiedOnly || selectedCategory !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFiltersReset}
                className="text-slate-400 hover:text-white"
              >
                Clear all filters
                <X className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* Main Content Area with Optional Sidebar */}
        <div className="flex gap-8">
          {/* Advanced Filter Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 320 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="w-80 sticky top-8">
                  <FilterSidebar
                    filters={filters}
                    onChange={handleFiltersChange}
                    onReset={handleFiltersReset}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* NFT Grid/List */}
          <div className="flex-1">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
          {filteredNfts.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="aspect-square relative bg-slate-700">
                    <Image
                      src={nft.image}
                      alt={nft.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Like Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                    onClick={() => toggleLike(nft.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${nft.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                    />
                  </Button>

                  {/* Category Badge */}
                  <Badge 
                    className="absolute top-2 left-2 bg-emerald-600/80 text-white capitalize"
                  >
                    {nft.category}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {nft.title}
                      </h3>
                      <p className="text-slate-400 text-sm">by {nft.creator}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{nft.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{nft.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{nft.likes}</span>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-emerald-400">
                          {nft.price} ETH
                        </p>
                        <p className="text-xs text-slate-400">
                          ≈ ${(nft.price * 2500).toFixed(0)} USD
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/nft/${nft.id}`}>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          onClick={() => {
                            alert(`Purchasing ${nft.title} for ${nft.price} ETH! 🛒`);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Buy
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
            )}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline"
            className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white"
            onClick={() => {
              alert('Loading more amazing product NFTs! 🌿');
              // In a real app, this would load more NFTs from the backend
            }}
          >
            Load More NFTs
          </Button>
        </div>
      </div>
    </div>
  );
}
