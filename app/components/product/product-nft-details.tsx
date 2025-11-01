
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  X
} from 'lucide-react';
import { ProductNFT } from '@/types/product';
import { getStrainTypeColor, getRarityColor, formatCannabinoidProfile } from '@/lib/product-utils';

interface ProductNFTDetailsProps {
  nft: ProductNFT;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductNFTDetails({ nft, isOpen, onClose }: ProductNFTDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');
  const latestLabTest = nft.labTests[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left side - Image and basic info */}
          <div className="flex-1 bg-gradient-to-br from-background to-muted/20 p-6">
            <div className="space-y-4">
              {/* Close button */}
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* NFT Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-muted">
                <Image
                  src={nft.imageUrl}
                  alt={nft.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating badges */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  <Badge variant="secondary" className={`${getStrainTypeColor(nft.item.type)} bg-black/60`}>
                    <Leaf className="w-3 h-3 mr-1" />
                    {nft.item.type}
                  </Badge>
                  <Badge variant="secondary" className={`${getRarityColor(nft.rarity.score)} bg-black/60`}>
                    <Award className="w-3 h-3 mr-1" />
                    Rank #{nft.rarity.rank}
                  </Badge>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl font-bold text-white mb-2">{nft.name}</h1>
                  <p className="text-white/80">by {nft.creator.growerName}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Favorite
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              {/* Price & Stats */}
              {nft.price && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Price</p>
                        <p className="text-2xl font-bold text-green-600">
                          {nft.price} {nft.currency}
                        </p>
                      </div>
                      <Button size="lg" className="bg-green-600 hover:bg-green-700">
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right side - Detailed information */}
          <div className="flex-1 overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <div className="sticky top-0 bg-background border-b p-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="traits">Traits</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-4 space-y-6">
                <TabsContent value="details" className="space-y-6 mt-0">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About {nft.item.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {nft.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Strain Heritage */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-green-500" />
                      Strain Heritage
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Genetics</p>
                        <p className="text-sm">{nft.item.genetics.parentStrains.join(' × ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Dominance</p>
                        <p className="text-sm">
                          {nft.item.genetics.dominance}% 
                          {nft.item.genetics.dominance > 60 ? ' Indica' : 
                           nft.item.genetics.dominance < 40 ? ' Sativa' : ' Hybrid'}
                        </p>
                      </div>
                      {nft.item.heritage.breeder && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Breeder</p>
                          <p className="text-sm">{nft.item.heritage.breeder}</p>
                        </div>
                      )}
                      {nft.item.heritage.firstCrossed && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">First Crossed</p>
                          <p className="text-sm">{nft.item.heritage.firstCrossed}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Lab Results */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-blue-500" />
                      Lab Results
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-3">Cannabinoid Profile</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(latestLabTest.cannabinoids).map(([cannabinoid, value]) => {
                            if (cannabinoid === 'total' || value === 0) return null;
                            return (
                              <div key={cannabinoid}>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-medium">{cannabinoid.toUpperCase()}</span>
                                  <span className="text-sm">{value}%</span>
                                </div>
                                <Progress 
                                  value={(value / (cannabinoid === 'thc' ? 35 : 25)) * 100} 
                                  className="h-2"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {latestLabTest.terpenes && (
                        <div>
                          <h4 className="font-medium mb-3">Terpene Profile</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {latestLabTest.terpenes.map((terpene) => (
                              <div key={terpene.name} className="flex justify-between text-sm">
                                <span>{terpene.name}</span>
                                <span>{terpene.percentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium mb-3">Safety Tests</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(latestLabTest.contaminants || {}).map(([test, result]) => (
                            <div key={test} className="flex justify-between items-center text-sm">
                              <span className="capitalize">{test.replace(/([A-Z])/g, ' $1')}</span>
                              <Badge variant={result === 'PASS' ? 'default' : 'destructive'}>
                                {result}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Growing Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      Growing Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Flowering Time</p>
                        <p className="text-sm">{nft.item.characteristics.floweringTime}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Yield</p>
                        <p className="text-sm">{nft.item.characteristics.yield}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Difficulty</p>
                        <p className="text-sm">{nft.item.characteristics.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Climate</p>
                        <p className="text-sm">{nft.item.characteristics.climate.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Effects & Flavors */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Effects & Flavors</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Effects</p>
                        <div className="flex flex-wrap gap-1">
                          {nft.item.characteristics.effects.map((effect) => (
                            <Badge key={effect} variant="outline" className="text-xs">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Flavors</p>
                        <div className="flex flex-wrap gap-1">
                          {nft.item.characteristics.flavors.map((flavor) => (
                            <Badge key={flavor} variant="outline" className="text-xs">
                              {flavor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Aromas</p>
                        <div className="flex flex-wrap gap-1">
                          {nft.item.characteristics.aromas.map((aroma) => (
                            <Badge key={aroma} variant="outline" className="text-xs">
                              {aroma}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="traits" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Rarity Traits</h3>
                      <Badge className={getRarityColor(nft.rarity.score)}>
                        Rarity Score: {nft.rarity.score}/100
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {nft.rarity.traits.map((trait, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div>
                            <p className="font-medium">{trait.trait}</p>
                            <p className="text-sm text-muted-foreground">{trait.value}</p>
                          </div>
                          <Badge variant="outline">
                            {trait.rarity}% have this trait
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Seed-to-Sale Tracking</h3>
                    
                    <div className="space-y-3">
                      {nft.seedToSale.chain.map((stage, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium capitalize">{stage.stage.toLowerCase()}</p>
                              <p className="text-sm text-muted-foreground">
                                {stage.timestamp.toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">{stage.location}</p>
                            {stage.notes && (
                              <p className="text-sm mt-1">{stage.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="mt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent Activity
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg border">
                        <Users className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">NFT Created</p>
                          <p className="text-sm text-muted-foreground">
                            Minted from QR scan • 2 hours ago
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg border">
                        <FlaskConical className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Lab Results Added</p>
                          <p className="text-sm text-muted-foreground">
                            Test results verified • 1 day ago
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg border">
                        <QrCode className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Package Scanned</p>
                          <p className="text-sm text-muted-foreground">
                            QR code authenticated • 2 days ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
