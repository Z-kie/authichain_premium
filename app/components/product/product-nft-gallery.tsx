
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Leaf,
  Star,
  Eye,
  Heart,
  Share2,
  TrendingUp,
  Award,
  Filter,
  Search,
  Grid3X3,
  List,
  Sparkles,
  ShoppingCart,
  ExternalLink,
  Calendar,
  MapPin,
  Beaker,
  Crown,
  Zap
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'sonner';
import { formatCannabinoidProfile, getStrainTypeColor, getRarityColor } from '@/lib/product-utils';

interface ProductNFTGalleryProps {
  user?: any;
}

export function ProductNFTGallery({ user }: ProductNFTGalleryProps) {
  const { data: session } = useSession() || {};
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [nfts, setNfts] = useState<any[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNFTCollection();
  }, []);

  const fetchNFTCollection = async () => {
    try {
      const response = await fetch('/api/product/nft-collection');
      if (response.ok) {
        const data = await response.json();
        setNfts(data.nfts || mockNFTs);
      } else {
        setNfts(mockNFTs);
      }
    } catch (error) {
      console.error('Failed to fetch NFT collection:', error);
      setNfts(mockNFTs);
    } finally {
      setLoading(false);
    }
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesFilter = filterBy === 'all' || nft.item.type.toLowerCase() === filterBy;
    const matchesSearch = searchQuery === '' || 
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleLikeNFT = async (nftId: string) => {
    try {
      await fetch(`/api/product/nft/${nftId}/like`, { method: 'POST' });
      // Update local state
      setNfts(prev => prev.map(nft => 
        nft.id === nftId 
          ? { ...nft, likeCount: nft.likeCount + 1, isLiked: true }
          : nft
      ));
      toast.success('NFT liked!');
    } catch (error) {
      toast.error('Failed to like NFT');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Leaf className="w-12 h-12 mx-auto animate-pulse text-green-500" />
          <p>Loading Product NFT Collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Collection Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Product NFT Collection</h1>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {nfts.length} NFTs
                </Badge>
              </div>
              <p className="text-xl opacity-90">
                Your Authenticated Product Collectibles
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {nfts.reduce((sum, nft) => sum + (nft.price || 0), 0).toFixed(3)} ETH
              </p>
              <p className="opacity-75">Portfolio Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Indica Strains</p>
                <p className="text-2xl font-bold text-purple-600">
                  {nfts.filter(n => n.item.type === 'INDICA').length}
                </p>
              </div>
              <Leaf className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sativa Strains</p>
                <p className="text-2xl font-bold text-green-600">
                  {nfts.filter(n => n.item.type === 'SATIVA').length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hybrid Strains</p>
                <p className="text-2xl font-bold text-orange-600">
                  {nfts.filter(n => n.item.type === 'HYBRID').length}
                </p>
              </div>
              <Sparkles className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rare NFTs</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {nfts.filter(n => n.rarityScore >= 80).length}
                </p>
              </div>
              <Crown className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search product NFTs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {['all', 'indica', 'sativa', 'hybrid'].map(filter => (
            <Button
              key={filter}
              variant={filterBy === filter ? 'default' : 'outline'}
              onClick={() => setFilterBy(filter)}
              size="sm"
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* NFT Gallery */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredNFTs.map((nft) => (
          <Card key={nft.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="relative aspect-square">
              <Image
                src={nft.imageUrl}
                alt={nft.name}
                fill
                className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => handleLikeNFT(nft.id)}
                    >
                      <Heart className={`w-4 h-4 ${nft.isLiked ? 'fill-current text-red-500' : ''}`} />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Rarity Badge */}
              <div className="absolute top-2 right-2">
                <Badge className={getRarityColor(nft.rarityScore)}>
                  #{nft.rarityRank || '---'}
                </Badge>
              </div>
              
              {/* Strain Type Badge */}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className={getStrainTypeColor(nft.item.type)}>
                  {nft.item.type}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{nft.name}</h3>
                  <p className="text-sm text-muted-foreground">{nft.item.name}</p>
                </div>

                {/* Cannabinoid Profile */}
                <div className="flex gap-2 text-xs">
                  <Badge variant="outline" className="text-red-500 border-red-200">
                    THC: {nft.labTests?.[0]?.cannabinoids?.thc || 0}%
                  </Badge>
                  <Badge variant="outline" className="text-green-500 border-green-200">
                    CBD: {nft.labTests?.[0]?.cannabinoids?.cbd || 0}%
                  </Badge>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {nft.likeCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {nft.viewCount}
                    </div>
                  </div>
                  
                  {nft.price && (
                    <div className="font-semibold text-foreground">
                      {nft.price} ETH
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <ProductNFTDetails nft={nft} />
                    </DialogContent>
                  </Dialog>
                  
                  {nft.price && (
                    <Button size="sm" className="flex-1">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Buy
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNFTs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Leaf className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Product NFTs Found</h3>
            <p className="text-muted-foreground mb-4">
              Start scanning product packages to build your collection
            </p>
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Scan Package
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ProductNFTDetails({ nft }: { nft: any }) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-500" />
          {nft.name}
        </DialogTitle>
        <DialogDescription>
          {nft.description}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NFT Image */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={nft.imageUrl}
              alt={nft.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy {nft.price} ETH
            </Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* NFT Details */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Strain Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{nft.item.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <Badge className={getStrainTypeColor(nft.item.type)}>
                    {nft.item.type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genetics</span>
                  <span className="font-medium text-sm">
                    {nft.item.genetics?.parentStrains?.join(' × ') || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>

            {/* Lab Results */}
            {nft.labTests?.[0] && (
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Beaker className="w-5 h-5" />
                  Lab Results
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(nft.labTests[0].cannabinoids).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{key.toUpperCase()}</span>
                      <span className="font-medium">{String(value)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rarity Traits */}
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Rarity Traits
              </h3>
              <div className="space-y-2">
                {nft.rarity?.traits?.slice(0, 5).map((trait: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{trait.trait}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{trait.value}</span>
                      <Badge variant="outline" className="text-xs">
                        {trait.rarity}% rare
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Package Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Harvest Date</span>
                  <span className="font-medium">
                    {new Date(nft.packaging?.harvestDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Weight</span>
                  <span className="font-medium">{nft.packaging?.netWeight}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Grower</span>
                  <span className="font-medium">{nft.creator?.growerName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock NFT data for demonstration
const mockNFTs = [
  {
    id: '1',
    name: 'Myles High #001',
    description: 'Premium hybrid item with exceptional terpene profile',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5a8258659f07f55e32627cad/d165031b-7785-4349-9d93-27b7f52734f5/close-up-of-trichomes-on-product.jpg',
    item: {
      name: 'Myles High',
      type: 'HYBRID',
      genetics: { parentStrains: ['Amber Slice', 'Smokers Club'] }
    },
    rarityScore: 92,
    rarityRank: 15,
    price: 0.125,
    likeCount: 42,
    viewCount: 387,
    isLiked: false,
    labTests: [{
      cannabinoids: { thc: 23.4, cbd: 0.8, cbg: 1.2 }
    }],
    packaging: {
      harvestDate: '2024-08-15',
      netWeight: 3.5
    },
    creator: {
      growerName: 'The Pressure Creator'
    },
    rarity: {
      traits: [
        { trait: 'THC Level', value: '23.4%', rarity: 15 },
        { trait: 'Strain Type', value: 'HYBRID', rarity: 35 },
        { trait: 'Genetics', value: 'Complex', rarity: 20 }
      ]
    }
  },
  {
    id: '2',
    name: 'Blue Sapphire #420',
    description: 'Classic indica-dominant item with earthy flavors',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Kush_close.jpg',
    item: {
      name: 'Blue Sapphire',
      type: 'INDICA',
      genetics: { parentStrains: ['Chemdawg', 'Lemon Thai'] }
    },
    rarityScore: 78,
    rarityRank: 156,
    price: 0.089,
    likeCount: 28,
    viewCount: 234,
    isLiked: true,
    labTests: [{
      cannabinoids: { thc: 19.8, cbd: 0.4, cbg: 0.8 }
    }],
    packaging: {
      harvestDate: '2024-09-01',
      netWeight: 7.0
    },
    creator: {
      growerName: 'California Dreams'
    },
    rarity: {
      traits: [
        { trait: 'THC Level', value: '19.8%', rarity: 45 },
        { trait: 'Strain Type', value: 'INDICA', rarity: 35 },
        { trait: 'Heritage', value: 'Classic', rarity: 25 }
      ]
    }
  }
];
