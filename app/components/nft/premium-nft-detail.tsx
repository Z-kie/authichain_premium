
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Share2, 
  ExternalLink, 
  Leaf, 
  FlaskConical, 
  QrCode,
  Award,
  Calendar,
  MapPin,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Activity,
  DollarSign,
  Clock,
  Eye,
  ChevronDown,
  Star,
  Gem,
  Crown,
  Sparkles,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NFTPurchaseFlow } from '@/components/payments/nft-purchase-flow';

interface PremiumNFTTraits {
  background: string;
  expression: string;
  clothing: string;
  accessories: string;
  specialty: string;
  rarity_score: number;
  power_level: number;
  experience_points: number;
  item_knowledge: number;
  cultivation_skill: number;
  business_acumen: number;
  creativity: number;
  leadership: number;
  innovation: number;
}

interface PremiumNFT {
  id: string;
  tokenId: string;
  name: string;
  collection: string;
  description: string;
  story: string;
  imageUrl: string;
  price: number;
  currency: 'ETH' | 'BTC' | 'USDC';
  owner: string;
  creator: string;
  traits: PremiumNFTTraits;
  priceHistory: Array<{
    price: number;
    date: string;
    event: 'mint' | 'sale' | 'offer' | 'bid';
  }>;
  blockchain: string;
  contractAddress: string;
  royalty: number;
  views: number;
  likes: number;
  orders: number;
  activity: Array<{
    type: 'mint' | 'sale' | 'transfer' | 'list' | 'offer';
    from?: string;
    to: string;
    price?: number;
    date: string;
  }>;
  genetics: {
    item: string;
    type: 'INDICA' | 'SATIVA' | 'HYBRID';
    thc: number;
    cbd: number;
    effects: string[];
  };
  rarityFeatures: string[];
}

interface PremiumNFTDetailProps {
  nft: PremiumNFT;
}

export function PremiumNFTDetail({ nft }: PremiumNFTDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [traitsExpanded, setTraitsExpanded] = useState(false);
  const [showPurchaseFlow, setShowPurchaseFlow] = useState(false);

  const getRarityColor = (score: number) => {
    if (score >= 90) return 'text-yellow-400';
    if (score >= 75) return 'text-purple-400';
    if (score >= 50) return 'text-blue-400';
    return 'text-green-400';
  };

  const getTraitRarity = (trait: string, value: string | number) => {
    // Mock rarity calculation
    const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
    return rarities[Math.floor(Math.random() * rarities.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* NFT Image */}
            <Card className="overflow-hidden border-2 border-purple-500/30">
              <div className="relative aspect-square bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <Image
                  src={nft.imageUrl}
                  alt={nft.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-black/50 border-white/20"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-black/50 border-white/20">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-black/50 border-white/20">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Rarity Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-yellow-400/90 to-orange-500/90 text-black font-bold">
                    <Crown className="w-3 h-3 mr-1" />
                    Legendary #{nft.tokenId}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="border-purple-500/30">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{nft.views.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-400">{nft.likes}</div>
                    <div className="text-sm text-gray-400">Likes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{nft.orders}</div>
                    <div className="text-sm text-gray-400">Orders</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details and Actions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-purple-400 border-purple-400">
                  {nft.collection}
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  <Leaf className="w-3 h-3 mr-1" />
                  {nft.genetics.type}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                {nft.name}
              </h1>
              
              {/* Price and Actions */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-400">Current Price</div>
                  <div className="text-3xl font-bold text-white flex items-center">
                    <DollarSign className="w-6 h-6 mr-1" />
                    {nft.price} {nft.currency}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => setShowPurchaseFlow(true)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" className="border-purple-500 text-purple-400">
                    Make Offer
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="traits">Traits</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                {/* Description */}
                <Card className="border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                      About {nft.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed mb-4">{nft.description}</p>
                    
                    {/* Story */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-white mb-3">Story:</h4>
                      <p className="text-gray-400 leading-relaxed">{nft.story}</p>
                    </div>

                    {/* Genetics */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/30">
                      <h4 className="font-semibold text-green-400 mb-3 flex items-center">
                        <Leaf className="w-4 h-4 mr-2" />
                        Strain Heritage
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Strain:</span>
                          <span className="ml-2 text-white font-medium">{nft.genetics.item}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Type:</span>
                          <span className="ml-2 text-white font-medium">{nft.genetics.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">THC:</span>
                          <span className="ml-2 text-white font-medium">{nft.genetics.thc}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">CBD:</span>
                          <span className="ml-2 text-white font-medium">{nft.genetics.cbd}%</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-400">Effects:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {nft.genetics.effects.map((effect, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-green-500/50 text-green-300">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Blockchain Details */}
                <Card className="border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-blue-400" />
                      Blockchain Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contract Address</span>
                      <span className="text-white font-mono text-sm">{nft.contractAddress.slice(0, 10)}...{nft.contractAddress.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Token ID</span>
                      <span className="text-white">{nft.tokenId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Blockchain</span>
                      <span className="text-white">{nft.blockchain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Creator Royalty</span>
                      <span className="text-white">{nft.royalty}%</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="traits" className="space-y-6">
                <Card className="border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Gem className="w-5 h-5 mr-2 text-purple-400" />
                        Character Traits
                      </div>
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                        Rarity Score: {nft.traits.rarity_score}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Visual Traits */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-400">Visual Traits</h4>
                        {[
                          { name: 'Background', value: nft.traits.background },
                          { name: 'Expression', value: nft.traits.expression },
                          { name: 'Clothing', value: nft.traits.clothing },
                          { name: 'Accessories', value: nft.traits.accessories }
                        ].map((trait, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                            <div>
                              <div className="text-white font-medium">{trait.name}</div>
                              <div className="text-sm text-gray-400">{trait.value}</div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {getTraitRarity(trait.name, trait.value)}
                            </Badge>
                          </div>
                        ))}
                      </div>

                      {/* Skill Traits */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-400">Skills & Abilities</h4>
                        {[
                          { name: 'Power Level', value: nft.traits.power_level, max: 100 },
                          { name: 'Strain Knowledge', value: nft.traits.item_knowledge, max: 100 },
                          { name: 'Cultivation Skill', value: nft.traits.cultivation_skill, max: 100 },
                          { name: 'Creativity', value: nft.traits.creativity, max: 100 },
                          { name: 'Leadership', value: nft.traits.leadership, max: 100 },
                          { name: 'Innovation', value: nft.traits.innovation, max: 100 }
                        ].map((skill, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-white">{skill.name}</span>
                              <span className="text-sm text-gray-400">{skill.value}/{skill.max}</span>
                            </div>
                            <Progress 
                              value={skill.value} 
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rarity Features */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-yellow-400 mb-3">🌟 Legendary Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {nft.rarityFeatures.map((feature, i) => (
                          <Badge key={i} className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 border-yellow-500/50">
                            <Star className="w-3 h-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card className="border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                      Price History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {nft.priceHistory.map((entry, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${entry.event === 'sale' ? 'bg-green-500' : entry.event === 'offer' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                            <div>
                              <div className="text-white font-medium capitalize">{entry.event}</div>
                              <div className="text-sm text-gray-400">{entry.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold">{entry.price} {nft.currency}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-blue-400" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {nft.activity.map((activity, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              activity.type === 'sale' ? 'bg-green-500/20 text-green-400' :
                              activity.type === 'mint' ? 'bg-blue-500/20 text-blue-400' :
                              activity.type === 'transfer' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {activity.type === 'sale' ? <DollarSign className="w-4 h-4" /> :
                               activity.type === 'mint' ? <Sparkles className="w-4 h-4" /> :
                               activity.type === 'transfer' ? <Users className="w-4 h-4" /> :
                               <Eye className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="text-white font-medium capitalize">
                                {activity.type} {activity.from && `from ${activity.from.slice(0, 6)}...${activity.from.slice(-4)}`} to {activity.to.slice(0, 6)}...{activity.to.slice(-4)}
                              </div>
                              <div className="text-sm text-gray-400">{activity.date}</div>
                            </div>
                          </div>
                          {activity.price && (
                            <div className="text-right">
                              <div className="text-white font-bold">{activity.price} {nft.currency}</div>
                            </div>
                          )}
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

      {/* Purchase Flow */}
      <NFTPurchaseFlow
        nft={{
          id: nft.id,
          name: nft.name,
          price: nft.price,
          currency: nft.currency,
          imageUrl: nft.imageUrl,
          collection: nft.collection,
          rarity: 'Legendary'
        }}
        isOpen={showPurchaseFlow}
        onClose={() => setShowPurchaseFlow(false)}
        onPurchaseComplete={(purchasedNft) => {
          console.log('NFT purchased:', purchasedNft);
          // Handle post-purchase actions
        }}
      />
    </div>
  );
}
