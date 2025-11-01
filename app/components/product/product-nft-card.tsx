
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Share2, 
  Eye, 
  Leaf, 
  FlaskConical, 
  QrCode,
  Award,
  Calendar,
  MapPin,
  Zap
} from 'lucide-react';
import { ProductNFT } from '@/types/product';
import { getStrainTypeColor, getRarityColor, formatCannabinoidProfile } from '@/lib/product-utils';

interface ProductNFTCardProps {
  nft: ProductNFT;
  onViewDetails: (nft: ProductNFT) => void;
}

export function ProductNFTCard({ nft, onViewDetails }: ProductNFTCardProps) {
  const latestLabTest = nft.labTests[0];
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500/30 bg-gradient-to-br from-background to-muted/20">
      <CardHeader className="p-0">
        {/* NFT Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={nft.imageUrl}
            alt={nft.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="secondary" className={`${getStrainTypeColor(nft.item.type)} bg-black/60`}>
              <Leaf className="w-3 h-3 mr-1" />
              {nft.item.type}
            </Badge>
            <Badge variant="secondary" className={`${getRarityColor(nft.rarity.score)} bg-black/60`}>
              <Award className="w-3 h-3 mr-1" />
              #{nft.rarity.rank}
            </Badge>
          </div>
          
          {/* Actions */}
          <div className="absolute top-3 right-3 flex gap-1">
            <Button size="sm" variant="secondary" className="bg-black/60 hover:bg-black/80 p-2">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-black/60 hover:bg-black/80 p-2">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Price tag */}
          {nft.price && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-green-600 text-white">
                {nft.price} {nft.currency}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Title and Collection */}
        <div>
          <h3 className="text-lg font-bold mb-1">{nft.name}</h3>
          <p className="text-sm text-muted-foreground">
            by {nft.creator.growerName}
          </p>
        </div>

        {/* Strain Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Genetics:</span>
            <span className="font-medium">{nft.item.genetics.parentStrains.join(' × ')}</span>
          </div>
          
          {/* Cannabinoid bars */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>THC {latestLabTest.cannabinoids.thc}%</span>
              <span>CBD {latestLabTest.cannabinoids.cbd}%</span>
            </div>
            <div className="flex gap-1">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000"
                  style={{ width: `${(latestLabTest.cannabinoids.thc / 35) * 100}%` }}
                />
              </div>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000"
                  style={{ width: `${(latestLabTest.cannabinoids.cbd / 25) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Key traits */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span>Harvest: {nft.packaging.harvestDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <FlaskConical className="w-3 h-3 text-muted-foreground" />
            <span>Lab Tested</span>
          </div>
          <div className="flex items-center gap-1">
            <QrCode className="w-3 h-3 text-muted-foreground" />
            <span>Verified</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-muted-foreground" />
            <span>{nft.packaging.netWeight}g</span>
          </div>
        </div>

        {/* Effects preview */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Effects:</p>
          <div className="flex flex-wrap gap-1">
            {nft.item.characteristics.effects.slice(0, 3).map((effect) => (
              <Badge key={effect} variant="outline" className="text-xs">
                {effect}
              </Badge>
            ))}
            {nft.item.characteristics.effects.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{nft.item.characteristics.effects.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Action button */}
        <Button 
          onClick={() => onViewDetails(nft)} 
          className="w-full mt-4 bg-green-600 hover:bg-green-700"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
