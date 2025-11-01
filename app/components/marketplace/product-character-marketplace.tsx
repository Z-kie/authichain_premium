
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
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
  Target,
  Crown,
  Sparkles,
  Leaf,
  FlaskConical,
  Palette,
  Briefcase,
  Megaphone
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PremiumNFTDetail } from '@/components/nft/premium-nft-detail';

const productCharacters = [
  {
    id: '1',
    tokenId: '001',
    name: 'Myles High #001 - The Pressure Creator',
    collection: 'AuthiChain Legends',
    description: 'Meet Myles High, the high-flying hot air balloon aeronaut who soars through the clouds with his diamond in balance. This charismatic aviator seeks through the item world into realms of creativity and relaxation.',
    story: 'Myles represents the journey of transformation—just like the high-flying hot air balloon aeronaut who elevates perspectives wherever he goes. With his rare balloon carrier tie and diamond in balance, this charismatic aviator seeks passion and precision when it comes to finding the best items in life come from applying the right mix of ingredients and conditions... Myles combines expertise with endless curiosity, spreading good vibes wherever the wind takes him.',
    imageUrl: 'https://cdn.abacus.ai/images/56f7b5d8-589f-46f1-a464-9280108b75da.png',
    price: 2.5,
    currency: 'ETH',
    owner: '0xc3a8...9e11c',
    creator: 'AuthiChain Studios',
    traits: {
      background: 'Sky Blue Gradient',
      expression: 'Confident Smile',
      clothing: 'Vintage Overalls',
      accessories: 'Sun Hat & Garden Tools',
      specialty: 'Master Cultivation',
      rarity_score: 95,
      power_level: 88,
      experience_points: 15000,
      item_knowledge: 95,
      cultivation_skill: 92,
      business_acumen: 75,
      creativity: 85,
      leadership: 90,
      innovation: 88
    },
    priceHistory: [
      { price: 1.2, date: '2024-09-01', event: 'mint' },
      { price: 1.8, date: '2024-09-05', event: 'sale' },
      { price: 2.2, date: '2024-09-08', event: 'sale' },
      { price: 2.5, date: '2024-09-10', event: 'sale' }
    ],
    blockchain: 'Ethereum',
    contractAddress: '0x1234567890123456789012345678901234567890',
    royalty: 7.5,
    views: 12847,
    likes: 934,
    orders: 156,
    activity: [
      { type: 'sale', from: '0xabc...def', to: '0xc3a...11c', price: 2.5, date: '2024-09-10' },
      { type: 'list', to: '0xabc...def', price: 2.5, date: '2024-09-09' },
      { type: 'transfer', from: '0x123...456', to: '0xabc...def', date: '2024-09-08' }
    ],
    genetics: {
      item: 'Purple Pressure',
      type: 'HYBRID',
      thc: 28.5,
      cbd: 1.2,
      effects: ['Creative', 'Euphoric', 'Relaxed', 'Uplifted', 'Happy']
    },
    rarityFeatures: ['First Edition', 'Diamond Balance', 'Sky Explorer', 'Master Grower', 'Vintage Tools']
  },
  {
    id: '2',
    tokenId: '002',
    name: 'Canvas Dreams #002 - The Creative Visionary',
    collection: 'AuthiChain Legends',
    description: 'A vibrant artist whose creativity flows like the perfect item. With paint-stained fingers and a mind full of colorful visions, this character transforms inspiration into masterpieces.',
    story: 'Canvas Dreams represents the artistic soul of the product community. Born from the intersection of creativity and cultivation, this visionary artist sees beauty in every leaf, every trichome, every moment of inspiration. Their studio is filled with product-inspired art that captures the essence of different items through color, form, and emotion.',
    imageUrl: 'https://cdn.abacus.ai/images/f5bd99e9-f06b-42ad-a291-0e3a9c8d81e3.png',
    price: 1.8,
    currency: 'ETH',
    owner: '0xa1b2...c3d4',
    creator: 'AuthiChain Studios',
    traits: {
      background: 'Rainbow Art Studio',
      expression: 'Inspired Focus',
      clothing: 'Paint-Splattered Apron',
      accessories: 'Brushes & Palette',
      specialty: 'Creative Arts',
      rarity_score: 87,
      power_level: 92,
      experience_points: 12500,
      item_knowledge: 78,
      cultivation_skill: 65,
      business_acumen: 82,
      creativity: 98,
      leadership: 75,
      innovation: 95
    },
    priceHistory: [
      { price: 0.8, date: '2024-09-01', event: 'mint' },
      { price: 1.2, date: '2024-09-03', event: 'sale' },
      { price: 1.6, date: '2024-09-07', event: 'sale' },
      { price: 1.8, date: '2024-09-09', event: 'sale' }
    ],
    blockchain: 'Ethereum',
    contractAddress: '0x1234567890123456789012345678901234567890',
    royalty: 7.5,
    views: 8924,
    likes: 742,
    orders: 89,
    activity: [
      { type: 'sale', from: '0xef1...234', to: '0xa1b...3d4', price: 1.8, date: '2024-09-09' },
      { type: 'list', to: '0xef1...234', price: 1.8, date: '2024-09-08' }
    ],
    genetics: {
      item: 'Creative Haze',
      type: 'SATIVA',
      thc: 24.3,
      cbd: 0.8,
      effects: ['Creative', 'Energetic', 'Focused', 'Uplifted', 'Inspiring']
    },
    rarityFeatures: ['Art Master', 'Rainbow Vision', 'Creative Flow', 'Inspiration Boost', 'Color Genius']
  },
  {
    id: '3',
    tokenId: '003',
    name: 'Dr. Green Lab #003 - The Product Scientist',
    collection: 'AuthiChain Legends',
    description: 'A brilliant researcher pushing the boundaries of product science. With lab coat and precise methodology, this character unlocks the secrets of cannabinoids and terpenes.',
    story: 'Dr. Green Lab represents the scientific advancement of product research. Armed with cutting-edge equipment and an insatiable curiosity, this character dedicates their life to understanding the complex chemistry of product. Their laboratory breakthroughs have led to new extraction methods, innovative products, and a deeper understanding of how different compounds interact with the human body.',
    imageUrl: 'https://cdn.abacus.ai/images/362fa2b7-60b9-4240-8a9c-f1e9125564a3.png',
    price: 3.2,
    currency: 'ETH',
    owner: '0x5e6f...7g8h',
    creator: 'AuthiChain Studios',
    traits: {
      background: 'Modern Laboratory',
      expression: 'Focused Intelligence',
      clothing: 'Professional Lab Coat',
      accessories: 'Safety Glasses & Test Tubes',
      specialty: 'Product Science',
      rarity_score: 93,
      power_level: 95,
      experience_points: 18000,
      item_knowledge: 99,
      cultivation_skill: 88,
      business_acumen: 85,
      creativity: 90,
      leadership: 85,
      innovation: 97
    },
    priceHistory: [
      { price: 1.5, date: '2024-09-01', event: 'mint' },
      { price: 2.1, date: '2024-09-04', event: 'sale' },
      { price: 2.8, date: '2024-09-06', event: 'sale' },
      { price: 3.2, date: '2024-09-09', event: 'sale' }
    ],
    blockchain: 'Ethereum',
    contractAddress: '0x1234567890123456789012345678901234567890',
    royalty: 7.5,
    views: 15632,
    likes: 1247,
    orders: 203,
    activity: [
      { type: 'sale', from: '0x987...654', to: '0x5e6...8h', price: 3.2, date: '2024-09-09' },
      { type: 'offer', to: '0x987...654', price: 3.0, date: '2024-09-08' }
    ],
    genetics: {
      item: 'Lab-Grade Kush',
      type: 'HYBRID',
      thc: 31.8,
      cbd: 2.4,
      effects: ['Focused', 'Clear-Headed', 'Analytical', 'Productive', 'Precise']
    },
    rarityFeatures: ['PhD Level', 'Lab Equipment', 'Research Pioneer', 'Science Master', 'Innovation Leader']
  },
  {
    id: '4',
    tokenId: '004',
    name: 'Green Activist #004 - The Change Maker',
    collection: 'AuthiChain Legends',
    description: 'A passionate advocate fighting for product reform and social justice. With unwavering determination, this character leads the movement toward a more equitable future.',
    story: 'Green Activist embodies the spirit of product activism and social reform. Having witnessed the injustices of prohibition, this character dedicates their life to educating others, changing laws, and creating opportunities for those affected by the war on drugs. Their grassroots efforts have led to policy changes, community programs, and a more inclusive product industry.',
    imageUrl: 'https://cdn.abacus.ai/images/876d7598-5459-42ef-914c-1208edf71e40.png',
    price: 2.1,
    currency: 'ETH',
    owner: '0x9i0j...k1l2',
    creator: 'AuthiChain Studios',
    traits: {
      background: 'Rally Grounds',
      expression: 'Determined Passion',
      clothing: 'Activist Attire',
      accessories: 'Megaphone & Signs',
      specialty: 'Social Justice',
      rarity_score: 89,
      power_level: 90,
      experience_points: 14000,
      item_knowledge: 85,
      cultivation_skill: 70,
      business_acumen: 78,
      creativity: 88,
      leadership: 96,
      innovation: 82
    },
    priceHistory: [
      { price: 1.0, date: '2024-09-01', event: 'mint' },
      { price: 1.4, date: '2024-09-05', event: 'sale' },
      { price: 1.9, date: '2024-09-07', event: 'sale' },
      { price: 2.1, date: '2024-09-09', event: 'sale' }
    ],
    blockchain: 'Ethereum',
    contractAddress: '0x1234567890123456789012345678901234567890',
    royalty: 7.5,
    views: 11258,
    likes: 892,
    orders: 134,
    activity: [
      { type: 'sale', from: '0xmn3...op4', to: '0x9i0...l2', price: 2.1, date: '2024-09-09' }
    ],
    genetics: {
      item: 'Freedom Fighter',
      type: 'SATIVA',
      thc: 26.7,
      cbd: 1.5,
      effects: ['Energetic', 'Motivated', 'Confident', 'Empowered', 'Social']
    },
    rarityFeatures: ['Movement Leader', 'Social Reformer', 'Community Builder', 'Voice of Change', 'Justice Warrior']
  },
  {
    id: '5',
    tokenId: '005',
    name: 'Canna CEO #005 - The Enterprise Builder',
    collection: 'AuthiChain Legends',
    description: 'A sharp business mind building the future of product commerce. With strategic vision and modern approach, this character creates opportunities and drives industry growth.',
    story: 'Canna CEO represents the entrepreneurial spirit transforming the product industry. From humble beginnings to boardroom success, this character has built multiple successful ventures, created jobs, and pioneered new business models. Their focus on innovation, sustainability, and social responsibility has set new standards for product entrepreneurship.',
    imageUrl: 'https://cdn.abacus.ai/images/a365502a-0648-4c8d-aa8c-d15e96b54318.png',
    price: 4.5,
    currency: 'ETH',
    owner: '0xq5r6...s7t8',
    creator: 'AuthiChain Studios',
    traits: {
      background: 'Executive Office',
      expression: 'Confident Success',
      clothing: 'Premium Business Suit',
      accessories: 'Briefcase & Tech',
      specialty: 'Business Leadership',
      rarity_score: 97,
      power_level: 93,
      experience_points: 20000,
      item_knowledge: 88,
      cultivation_skill: 75,
      business_acumen: 98,
      creativity: 85,
      leadership: 97,
      innovation: 92
    },
    priceHistory: [
      { price: 2.0, date: '2024-09-01', event: 'mint' },
      { price: 3.2, date: '2024-09-03', event: 'sale' },
      { price: 4.0, date: '2024-09-06', event: 'sale' },
      { price: 4.5, date: '2024-09-08', event: 'sale' }
    ],
    blockchain: 'Ethereum',
    contractAddress: '0x1234567890123456789012345678901234567890',
    royalty: 7.5,
    views: 18945,
    likes: 1456,
    orders: 287,
    activity: [
      { type: 'sale', from: '0xuv9...wx0', to: '0xq5r...t8', price: 4.5, date: '2024-09-08' }
    ],
    genetics: {
      item: 'Executive OG',
      type: 'HYBRID',
      thc: 29.2,
      cbd: 1.8,
      effects: ['Focused', 'Confident', 'Strategic', 'Productive', 'Leadership']
    },
    rarityFeatures: ['Fortune 500', 'IPO Ready', 'Market Leader', 'Innovation Driver', 'Success Mindset']
  }
];

export function ProductCharacterMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price_high');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [viewMode, setViewMode] = useState('grid');

  const filteredNFTs = productCharacters.filter(nft => {
    if (searchTerm && !nft.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !nft.collection.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filterBy !== 'all' && nft.genetics.type.toLowerCase() !== filterBy) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_high': return b.price - a.price;
      case 'price_low': return a.price - b.price;
      case 'rarity': return b.traits.rarity_score - a.traits.rarity_score;
      case 'newest': return parseInt(b.tokenId) - parseInt(a.tokenId);
      default: return 0;
    }
  });

  if (selectedNFT) {
    return <PremiumNFTDetail nft={selectedNFT} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
            🌿 AuthiChain Legends Collection
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Discover legendary product characters - each with unique traits, stories, and powers. 
            Own a piece of product culture history with these premium NFTs.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-purple-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{productCharacters.length}</div>
              <div className="text-sm text-gray-400">Total Items</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">2.8 ETH</div>
              <div className="text-sm text-gray-400">Floor Price</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">24.3k</div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </CardContent>
          </Card>
          <Card className="border-pink-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-400">1.2k</div>
              <div className="text-sm text-gray-400">Owners</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800/50 border-purple-500/30 pl-10"
              />
            </div>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-purple-500/30">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="rarity">Rarity Score</SelectItem>
              <SelectItem value="newest">Recently Listed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-purple-500/30">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="limited">Limited Edition</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-500/50 bg-gradient-to-br from-slate-800/50 to-purple-900/20 cursor-pointer"
                    onClick={() => setSelectedNFT(nft)}>
                <CardHeader className="p-0">
                  {/* NFT Image */}
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={nft.imageUrl}
                      alt={nft.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white font-bold">
                        <Crown className="w-3 h-3 mr-1" />
                        #{nft.tokenId}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black/70 text-white border-white/20">
                        <Star className="w-3 h-3 mr-1" />
                        {nft.traits.rarity_score}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className={`${
                          nft.genetics.type === 'HYBRID' ? 'border-purple-400 text-purple-300' :
                          nft.genetics.type === 'SATIVA' ? 'border-green-400 text-green-300' :
                          'border-blue-400 text-blue-300'
                        } bg-black/70`}>
                          <Leaf className="w-3 h-3 mr-1" />
                          {nft.genetics.type}
                        </Badge>
                        <div className="flex space-x-2">
                          <div className="text-xs text-white bg-black/70 px-2 py-1 rounded flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {nft.views.toLocaleString()}
                          </div>
                          <div className="text-xs text-white bg-black/70 px-2 py-1 rounded flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {nft.likes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Collection */}
                    <Badge variant="outline" className="text-xs text-purple-400 border-purple-400/50">
                      {nft.collection}
                    </Badge>
                    
                    {/* Name */}
                    <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors line-clamp-2">
                      {nft.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {nft.description}
                    </p>
                    
                    {/* Genetics */}
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center">
                        <FlaskConical className="w-3 h-3 mr-1 text-green-400" />
                        <span className="text-gray-300">THC: {nft.genetics.thc}%</span>
                      </div>
                      <div className="flex items-center">
                        <Leaf className="w-3 h-3 mr-1 text-blue-400" />
                        <span className="text-gray-300">CBD: {nft.genetics.cbd}%</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                      <div>
                        <div className="text-xs text-gray-400">Price</div>
                        <div className="font-bold text-white flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {nft.price} {nft.currency}
                        </div>
                      </div>
                      <Button asChild size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Link href={`/nft/${nft.id}`}>
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">No NFTs found matching your criteria</div>
            <Button onClick={() => {setSearchTerm(''); setFilterBy('all');}}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
