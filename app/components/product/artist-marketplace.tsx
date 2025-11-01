
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Palette,
  Star,
  TrendingUp,
  DollarSign,
  Eye,
  Heart,
  Download,
  MessageCircle,
  Award,
  Verified,
  Plus,
  Filter,
  Search,
  Grid3X3,
  List,
  Crown,
  Sparkles,
  Users,
  Clock
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'sonner';

interface ArtistMarketplaceProps {
  user?: any;
}

export function ArtistMarketplace({ user }: ArtistMarketplaceProps) {
  const { data: session } = useSession() || {};
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [artists, setArtists] = useState<any[]>([]);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [commissionDialogOpen, setCommissionDialogOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  const fetchMarketplaceData = async () => {
    try {
      // Fetch featured artists and artworks
      const [artistsRes, artworksRes] = await Promise.all([
        fetch('/api/product/artists'),
        fetch('/api/product/artworks')
      ]);

      if (artistsRes.ok && artworksRes.ok) {
        const artistsData = await artistsRes.json();
        const artworksData = await artworksRes.json();
        
        setArtists(artistsData.artists || mockArtists);
        setArtworks(artworksData.artworks || mockArtworks);
      } else {
        // Use mock data for demonstration
        setArtists(mockArtists);
        setArtworks(mockArtworks);
      }
    } catch (error) {
      console.error('Failed to fetch marketplace data:', error);
      setArtists(mockArtists);
      setArtworks(mockArtworks);
    } finally {
      setLoading(false);
    }
  };

  const handleCommissionRequest = async (artistId: string, details: any) => {
    try {
      const response = await fetch('/api/product/commission-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artistId,
          ...details,
          clientId: session?.user?.id
        })
      });

      if (response.ok) {
        toast.success('Commission request sent successfully!');
        setCommissionDialogOpen(false);
      } else {
        throw new Error('Failed to send commission request');
      }
    } catch (error) {
      toast.error('Failed to send commission request');
    }
  };

  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = selectedCategory === 'all' || artwork.category.toLowerCase() === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Palette className="w-12 h-12 mx-auto animate-pulse text-purple-500" />
          <p>Loading Artist Marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Marketplace Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Palette className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Product Artist Marketplace</h1>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Premium
                </Badge>
              </div>
              <p className="text-xl opacity-90">
                Discover & Commission Product Art
              </p>
              <p className="opacity-75">
                Connect with top product artists worldwide
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-white/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                Become Artist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Artists</p>
                <p className="text-2xl font-bold">{artists.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Artworks</p>
                <p className="text-2xl font-bold">{artworks.length}</p>
              </div>
              <Palette className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">$125K</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Commission</p>
                <p className="text-2xl font-bold">$850</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="artworks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="artworks">Browse Artworks</TabsTrigger>
          <TabsTrigger value="artists">Featured Artists</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>

        <TabsContent value="artworks" className="space-y-6">
          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search artworks and artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="package_design">Package Design</SelectItem>
                <SelectItem value="item_art">Strain Art</SelectItem>
                <SelectItem value="character_design">Character Design</SelectItem>
                <SelectItem value="logo_design">Logo Design</SelectItem>
                <SelectItem value="nft_art">NFT Art</SelectItem>
              </SelectContent>
            </Select>

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

          {/* Artwork Gallery */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredArtworks.map((artwork) => (
              <Card key={artwork.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    className="object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg">
                    <div className="absolute top-2 right-2 space-y-1">
                      {artwork.featured && (
                        <Badge className="bg-yellow-500 text-black">
                          <Crown className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="secondary">
                        {artwork.category.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{artwork.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                        <span className="text-sm text-muted-foreground">
                          by {artwork.artist.name}
                        </span>
                        {artwork.artist.verified && (
                          <Verified className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {artwork.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {artwork.views}
                        </div>
                      </div>
                      
                      {artwork.price && (
                        <div className="text-right">
                          <p className="font-semibold">${artwork.price}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Commission
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Commission Artwork</DialogTitle>
                            <DialogDescription>
                              Request a custom commission from {artwork.artist.name}
                            </DialogDescription>
                          </DialogHeader>
                          <CommissionForm
                            artist={artwork.artist}
                            onSubmit={(details) => handleCommissionRequest(artwork.artist.id, details)}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <Card key={artist.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold">
                        {artist.avatar ? (
                          <Image
                            src={artist.avatar}
                            alt={artist.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          artist.name.charAt(0)
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{artist.name}</h3>
                          {artist.verified && (
                            <Verified className="w-5 h-5 text-blue-500" />
                          )}
                          {artist.level === 'MASTER' && (
                            <Crown className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{artist.specializations.join(', ')}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{artist.rating}</span>
                          <span className="text-muted-foreground">({artist.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Artworks</span>
                        <span className="font-medium">{artist.totalArtworks}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Starting Price</span>
                        <span className="font-medium">${artist.startingPrice}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Profile
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Commission
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Commission from {artist.name}</DialogTitle>
                            <DialogDescription>
                              Request a custom artwork commission
                            </DialogDescription>
                          </DialogHeader>
                          <CommissionForm
                            artist={artist}
                            onSubmit={(details) => handleCommissionRequest(artist.id, details)}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle>Your Commission Requests</CardTitle>
              <CardDescription>
                Track your artwork commissions and collaborations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No commission requests yet</p>
                <Button className="mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Request Commission
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CommissionForm({ artist, onSubmit }: { artist: any, onSubmit: (details: any) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    category: 'package_design'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Project Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Custom item package design"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your vision, style preferences, and requirements..."
          rows={4}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Budget (USD)</label>
          <Input
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            placeholder={`Min: $${artist.startingPrice}`}
            min={artist.startingPrice}
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Deadline</label>
          <Input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Category</label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="package_design">Package Design</SelectItem>
            <SelectItem value="item_art">Strain Art</SelectItem>
            <SelectItem value="logo_design">Logo Design</SelectItem>
            <SelectItem value="nft_art">NFT Art</SelectItem>
            <SelectItem value="character_design">Character Design</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">
          Send Request
        </Button>
      </div>
    </form>
  );
}

// Mock data for demonstration
const mockArtists = [
  {
    id: '1',
    name: 'Alex Green',
    verified: true,
    level: 'MASTER',
    specializations: ['Package Design', 'Strain Art'],
    rating: 4.9,
    reviews: 127,
    totalArtworks: 89,
    startingPrice: 250,
    avatar: null
  },
  {
    id: '2',
    name: 'Maya Product',
    verified: true,
    level: 'EXPERT',
    specializations: ['NFT Art', 'Character Design'],
    rating: 4.8,
    reviews: 94,
    totalArtworks: 156,
    startingPrice: 400,
    avatar: null
  },
  {
    id: '3',
    name: 'Rio Leaf',
    verified: false,
    level: 'INTERMEDIATE',
    specializations: ['Logo Design', 'Social Media'],
    rating: 4.6,
    reviews: 52,
    totalArtworks: 34,
    startingPrice: 150,
    avatar: null
  }
];

const mockArtworks = [
  {
    id: '1',
    title: 'Mystical Haze Package Design',
    category: 'package_design',
    artist: { id: '1', name: 'Alex Green', verified: true },
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop',
    price: 350,
    likes: 142,
    views: 1203,
    featured: true
  },
  {
    id: '2',
    title: 'Cosmic Kush Character',
    category: 'character_design',
    artist: { id: '2', name: 'Maya Product', verified: true },
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    price: 500,
    likes: 89,
    views: 756,
    featured: false
  },
  {
    id: '3',
    title: 'Green Dream Logo',
    category: 'logo_design',
    artist: { id: '3', name: 'Rio Leaf', verified: false },
    imageUrl: 'https://i.pinimg.com/736x/9c/46/68/9c466848f569e0c64e6f98fe2c3a73b1.jpg',
    price: 200,
    likes: 67,
    views: 423,
    featured: false
  }
];
