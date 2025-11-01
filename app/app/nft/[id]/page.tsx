
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Heart,
  Share2,
  ExternalLink,
  Eye,
  Clock,
  Award,
  Zap,
  TrendingUp,
  Copy,
  Check,
  Activity,
  Users,
  Gem,
  Star,
  Crown,
  Target,
  FlaskConical,
  Leaf,
  DollarSign
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Mock data for individual NFT - in real app, this would come from API
const mockNFTData = {
  '1': {
    id: '1',
    tokenId: '001',
    name: 'Myles High #001 - The Pressure Creator',
    collection: 'AuthiChain Legends',
    description: 'Meet Myles High, the high-flying hot air balloon aeronaut who soars through the clouds with his diamond in balance.',
    story: 'Myles represents the journey of transformation—just like the high-flying hot air balloon aeronaut who elevates perspectives wherever he goes. With his rare balloon carrier tie and diamond in balance, this charismatic aviator seeks passion and precision when it comes to finding the best items in life come from applying the right mix of ingredients and conditions. Myles combines expertise with endless curiosity, spreading good vibes wherever the wind takes him.',
    imageUrl: 'https://cdn.abacus.ai/images/56f7b5d8-589f-46f1-a464-9280108b75da.png',
    price: 2.5,
    currency: 'ETH',
    owner: '0xc3a8...9e11c',
    creator: 'AuthiChain Studios',
    created: '2024-03-15T10:30:00Z',
    views: 1247,
    likes: 89,
    blockchain: 'Ethereum',
    contractAddress: '0x742d35cc6eabbf9b8a3c6f5e5b8f7aae96c8b9f2',
    attributes: [
      { trait_type: 'Background', value: 'Aerial Clouds', rarity: 12 },
      { trait_type: 'Character', value: 'Aviator', rarity: 8 },
      { trait_type: 'Accessory', value: 'Hot Air Balloon', rarity: 3 },
      { trait_type: 'Special Item', value: 'Diamond Balance', rarity: 1 },
      { trait_type: 'Personality', value: 'Adventurous', rarity: 15 },
      { trait_type: 'Strain Expertise', value: 'Sativa Dominant', rarity: 22 },
      { trait_type: 'Mood', value: 'Elevated', rarity: 18 },
      { trait_type: 'Origin', value: 'Cloud Nine', rarity: 5 }
    ],
    priceHistory: [
      { date: '2024-03-20', price: 2.5, type: 'Listed' },
      { date: '2024-03-18', price: 2.2, type: 'Sale' },
      { date: '2024-03-15', price: 1.8, type: 'Minted' }
    ],
    activityHistory: [
      { date: '2024-03-20T14:30:00Z', type: 'Listed', from: '0xc3a8...9e11c', price: 2.5 },
      { date: '2024-03-18T09:15:00Z', type: 'Sale', from: '0x1234...abcd', to: '0xc3a8...9e11c', price: 2.2 },
      { date: '2024-03-15T10:30:00Z', type: 'Mint', to: '0x1234...abcd', price: 1.8 }
    ]
  }
};

export default function NFTDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const [nft, setNft] = useState(mockNFTData[id as keyof typeof mockNFTData]);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState('attributes');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Address copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy address');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: nft?.name,
        text: nft?.description,
        url: window.location.href,
      });
    } catch (err) {
      copyToClipboard(window.location.href);
    }
  };

  const handleBuyNow = async () => {
    if (!nft) return;
    
    try {
      toast.loading('Creating payment session...');
      
      const response = await fetch('/api/purchase-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nftId: nft.id,
          price: nft.price,
          currency: nft.currency,
          nftName: nft.name
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment session');
      }

      toast.dismiss();
      toast.success('Redirecting to Stripe Checkout...');
      
      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Failed to initiate purchase');
      console.error('Purchase error:', error);
    }
  };

  const handleMakeOffer = () => {
    // In real app, this would open offer modal
    toast.success('Opening offer modal...');
    console.log('Making offer for NFT:', nft?.id);
  };

  const handleViewOnOpenSea = () => {
    // In real app, this would use actual OpenSea URL
    const openSeaUrl = `https://opensea.io/assets/ethereum/${nft?.contractAddress}/${nft?.tokenId}`;
    window.open(openSeaUrl, '_blank');
    toast.success('Opening on OpenSea...');
  };

  const getRarityColor = (rarity: number) => {
    if (rarity <= 5) return 'text-red-400 bg-red-500/20';
    if (rarity <= 10) return 'text-orange-400 bg-orange-500/20';
    if (rarity <= 20) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  const getRarityLabel = (rarity: number) => {
    if (rarity <= 5) return 'Legendary';
    if (rarity <= 10) return 'Epic';
    if (rarity <= 20) return 'Rare';
    return 'Common';
  };

  if (!nft) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">NFT Not Found</h2>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NFT Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-2 border-purple-500/30">
              <div className="relative aspect-square">
                <Image
                  src={nft.imageUrl}
                  alt={nft.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white font-bold">
                    <Crown className="w-3 h-3 mr-1" />
                    #{nft.tokenId}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={`flex-1 ${isLiked ? 'text-red-400 border-red-400' : 'text-gray-400'}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {nft.likes + (isLiked ? 1 : 0)}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={handleViewOnOpenSea}>
                <ExternalLink className="w-4 h-4 mr-2" />
                View on OpenSea
              </Button>
            </div>
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link href={`/collection/${nft.collection.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Badge variant="outline" className="text-purple-300 border-purple-500 hover:bg-purple-500/20 cursor-pointer">
                    {nft.collection}
                  </Badge>
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">{nft.name}</h1>
              
              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {nft.views.toLocaleString()} views
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {nft.likes} favorites
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Created {new Date(nft.created).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Description */}
            <Card className="border-purple-500/30">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Description</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  {showFullDescription ? nft.story : nft.description}
                </p>
                {nft.story && nft.story !== nft.description && (
                  <Button
                    variant="link"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 p-0 h-auto text-purple-400 hover:text-purple-300"
                  >
                    {showFullDescription ? 'Show Less' : 'Read Full Story'}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Price & Purchase */}
            <Card className="border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Current Price</div>
                    <div className="text-3xl font-bold text-green-400 flex items-center gap-2">
                      <DollarSign className="w-6 h-6" />
                      {nft.price} {nft.currency}
                    </div>
                    <div className="text-sm text-gray-400">
                      ≈ ${(nft.price * 2650).toLocaleString()} USD
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Owner</div>
                    <div 
                      className="text-purple-400 hover:text-purple-300 cursor-pointer flex items-center gap-1"
                      onClick={() => copyToClipboard(nft.owner)}
                    >
                      {nft.owner}
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={handleBuyNow}
                  >
                    <Gem className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-purple-500 text-purple-300"
                    onClick={handleMakeOffer}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Make Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="attributes" onClick={() => setActiveTab('attributes')}>Attributes</TabsTrigger>
              <TabsTrigger value="details" onClick={() => setActiveTab('details')}>Details</TabsTrigger>
              <TabsTrigger value="history" onClick={() => setActiveTab('history')}>Price History</TabsTrigger>
              <TabsTrigger value="activity" onClick={() => setActiveTab('activity')}>Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="attributes">
              <Card className="border-purple-500/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">Attributes</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {nft.attributes.map((attr, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500/50 transition-colors"
                      >
                        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                          {attr.trait_type}
                        </div>
                        <div className="font-semibold text-white mb-2">{attr.value}</div>
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs px-2 py-1 ${getRarityColor(attr.rarity)}`}>
                            {getRarityLabel(attr.rarity)}
                          </Badge>
                          <div className="text-xs text-gray-400">
                            {attr.rarity}% have this
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card className="border-purple-500/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">Details</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Token ID</span>
                        <span className="text-white font-mono">#{nft.tokenId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Blockchain</span>
                        <span className="text-white">{nft.blockchain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Creator</span>
                        <span className="text-purple-400">{nft.creator}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Collection</span>
                        <span className="text-purple-400">{nft.collection}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Contract Address</span>
                        <div 
                          className="text-purple-400 hover:text-purple-300 cursor-pointer flex items-center gap-1"
                          onClick={() => copyToClipboard(nft.contractAddress)}
                        >
                          <span className="font-mono text-sm">
                            {nft.contractAddress.slice(0, 8)}...{nft.contractAddress.slice(-8)}
                          </span>
                          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Token Standard</span>
                        <span className="text-white">ERC-721</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Royalties</span>
                        <span className="text-white">7.5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="border-purple-500/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">Price History</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nft.priceHistory.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            entry.type === 'Listed' ? 'bg-blue-500' :
                            entry.type === 'Sale' ? 'bg-green-500' : 'bg-purple-500'
                          }`} />
                          <div>
                            <div className="text-white font-medium">{entry.type}</div>
                            <div className="text-sm text-gray-400">{new Date(entry.date).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{entry.price} ETH</div>
                          <div className="text-sm text-gray-400">≈ ${(entry.price * 2650).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="border-purple-500/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">Activity</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nft.activityHistory.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium">{activity.type}</span>
                            {activity.price && (
                              <span className="text-green-400 font-bold">{activity.price} ETH</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">
                            {activity.from && (
                              <>
                                From {activity.from}
                                {activity.to && ` to ${activity.to}`}
                              </>
                            )}
                            {!activity.from && activity.to && `To ${activity.to}`}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(activity.date).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
