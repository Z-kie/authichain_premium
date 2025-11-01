
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Scan, 
  Leaf, 
  FlaskConical, 
  QrCode, 
  Plus,
  Search,
  Filter,
  TrendingUp,
  Award,
  Calendar,
  Users
} from 'lucide-react';
import { QRScanner } from './qr-scanner';
import { ProductNFTCard } from './product-nft-card';
import { ProductNFTDetails } from './product-nft-details';
import { ProductNFT } from '@/types/product';

// Mock data - in production this would come from your database
const mockNFTs: ProductNFT[] = [
  {
    id: 'nft-myles-001',
    tokenId: 'MH001',
    name: 'Myles High #001',
    description: 'The Pressure Creator - A premium HYBRID item featuring Amber Slice × Smokers Club genetics. Lab tested with 23.4% THC.',
    imageUrl: 'https://cdn.abacus.ai/images/098a643c-8d16-44a9-9d7b-193a90bba2e6.png',
    item: {
      id: 'myles-high-001',
      name: 'Myles High',
      type: 'HYBRID',
      genetics: {
        parentStrains: ['Amber Slice', 'Smokers Club'],
        dominance: 60,
        thcContent: 23.4,
        cbdContent: 0.8
      },
      heritage: {
        breeder: 'The Pressure Creator',
        seedBank: 'Exclusive Collection',
        originCountry: 'USA',
        firstCrossed: '2023'
      },
      characteristics: {
        floweringTime: '8-9 weeks',
        yield: 'High',
        difficulty: 'INTERMEDIATE',
        climate: ['Indoor', 'Greenhouse'],
        effects: ['Relaxing', 'Euphoric', 'Creative', 'Focused'],
        flavors: ['Sweet', 'Fruity', 'Citrus', 'Pine'],
        aromas: ['Diesel', 'Earthy', 'Spicy']
      }
    },
    labTests: [{
      id: 'LAB-MH001',
      testDate: new Date('2024-08-15'),
      labName: 'Product Testing Lab',
      labLicense: 'LAB-12345',
      batch: 'MH-001-2024',
      cannabinoids: {
        thc: 23.4,
        thca: 26.8,
        cbd: 0.8,
        cbda: 0.2,
        cbg: 1.2,
        cbn: 0.3,
        total: 28.5
      },
      terpenes: [
        { name: 'Myrcene', percentage: 0.8 },
        { name: 'Limonene', percentage: 0.6 },
        { name: 'Pinene', percentage: 0.4 },
        { name: 'Caryophyllene', percentage: 0.3 }
      ],
      contaminants: {
        pesticides: 'PASS',
        heavyMetals: 'PASS',
        microbials: 'PASS',
        residualSolvents: 'PASS'
      },
      moisture: 12.5
    }],
    seedToSale: {
      seedId: 'SEED-MH001',
      plantId: 'PLANT-MH001',
      harvestDate: new Date('2024-08-01'),
      packageId: 'PKG-MH001',
      stateTrackingNumber: 'CA-MH001-2024',
      growerLicense: 'GRW-12345',
      chain: [
        {
          stage: 'SEED',
          timestamp: new Date('2024-03-01'),
          location: 'Cultivation Facility',
          operatorLicense: 'GRW-12345',
          notes: 'Seed germination'
        },
        {
          stage: 'FLOWERING',
          timestamp: new Date('2024-08-01'),
          location: 'Growing Room A',
          operatorLicense: 'GRW-12345',
          notes: 'Harvest ready'
        }
      ]
    },
    packaging: {
      qrCode: '{"packageId":"PKG-MH001","item":"Myles High","grower":"The Pressure Creator"}',
      packageArtist: 'CannArt Studios',
      artistWallet: '0x123...',
      royaltyPercentage: 5,
      harvestDate: new Date('2024-08-01'),
      packageDate: new Date('2024-08-15'),
      expirationDate: new Date('2025-08-15'),
      netWeight: 3.5,
      thcWarning: true
    },
    rarity: {
      score: 85,
      rank: 142,
      traits: [
        { trait: 'THC Level', value: '23.4%', rarity: 15 },
        { trait: 'Strain Type', value: 'HYBRID', rarity: 35 },
        { trait: 'Genetics', value: 'Amber Slice × Smokers Club', rarity: 8 }
      ]
    },
    creator: {
      address: '0x456...',
      growerName: 'The Pressure Creator',
      license: 'GRW-12345'
    },
    owner: '0x789...',
    price: 0.25,
    currency: 'ETH',
    blockchain: 'Ethereum',
    contractAddress: '0xabc...'
  },
  {
    id: 'nft-purple-024',
    tokenId: 'PK024',
    name: 'Purple Kush #024',
    description: 'Classic INDICA item with deep relaxation effects. Premium genetics with 19.2% THC and beautiful purple hues.',
    imageUrl: 'https://cdn.abacus.ai/images/b7cde68c-387f-40fe-a54b-3074e064ab29.png',
    item: {
      id: 'purple-kush-024',
      name: 'Purple Kush',
      type: 'INDICA',
      genetics: {
        parentStrains: ['Hindu Kush', 'Purple Afghani'],
        dominance: 80,
        thcContent: 19.2,
        cbdContent: 1.2
      },
      heritage: {
        breeder: 'Afghani Genetics',
        seedBank: 'Classic Collection',
        originCountry: 'Afghanistan',
        firstCrossed: '1980s'
      },
      characteristics: {
        floweringTime: '7-8 weeks',
        yield: 'Medium',
        difficulty: 'BEGINNER',
        climate: ['Indoor', 'Outdoor'],
        effects: ['Relaxing', 'Sedating', 'Pain Relief', 'Sleep Aid'],
        flavors: ['Grape', 'Berry', 'Earthy', 'Sweet'],
        aromas: ['Grape', 'Musky', 'Pungent']
      }
    },
    labTests: [{
      id: 'LAB-PK024',
      testDate: new Date('2024-08-10'),
      labName: 'Product Testing Lab',
      labLicense: 'LAB-12345',
      batch: 'PK-024-2024',
      cannabinoids: {
        thc: 19.2,
        thca: 22.1,
        cbd: 1.2,
        cbda: 0.3,
        cbg: 0.8,
        cbn: 0.5,
        total: 24.2
      },
      terpenes: [
        { name: 'Myrcene', percentage: 1.2 },
        { name: 'Linalool', percentage: 0.4 },
        { name: 'Caryophyllene', percentage: 0.3 }
      ],
      contaminants: {
        pesticides: 'PASS',
        heavyMetals: 'PASS',
        microbials: 'PASS',
        residualSolvents: 'PASS'
      },
      moisture: 11.8
    }],
    seedToSale: {
      seedId: 'SEED-PK024',
      plantId: 'PLANT-PK024',
      harvestDate: new Date('2024-07-20'),
      packageId: 'PKG-PK024',
      stateTrackingNumber: 'CA-PK024-2024',
      growerLicense: 'GRW-54321',
      chain: [
        {
          stage: 'SEED',
          timestamp: new Date('2024-02-15'),
          location: 'Indoor Facility',
          operatorLicense: 'GRW-54321',
          notes: 'Classic genetics started'
        }
      ]
    },
    packaging: {
      qrCode: '{"packageId":"PKG-PK024","item":"Purple Kush","grower":"Afghani Genetics"}',
      harvestDate: new Date('2024-07-20'),
      packageDate: new Date('2024-08-10'),
      expirationDate: new Date('2025-08-10'),
      netWeight: 3.5,
      thcWarning: true
    },
    rarity: {
      score: 72,
      rank: 298,
      traits: [
        { trait: 'THC Level', value: '19.2%', rarity: 25 },
        { trait: 'Strain Type', value: 'INDICA', rarity: 30 },
        { trait: 'Heritage', value: 'Classic Afghani', rarity: 12 }
      ]
    },
    creator: {
      address: '0x789...',
      growerName: 'Afghani Genetics',
      license: 'GRW-54321'
    },
    owner: '0xdef...',
    price: 0.18,
    currency: 'ETH',
    blockchain: 'Ethereum',
    contractAddress: '0xdef...'
  },
  {
    id: 'nft-green-155',
    tokenId: 'GC155',
    name: 'Green Crack #155',
    description: 'Energizing SATIVA item perfect for daytime use. High-energy genetics with 21.8% THC and tropical flavors.',
    imageUrl: 'https://cdn.abacus.ai/images/05565a0c-cc8d-4dde-9a72-9ab242f1a2b9.png',
    item: {
      id: 'green-crack-155',
      name: 'Green Crack',
      type: 'SATIVA',
      genetics: {
        parentStrains: ['Skunk #1', 'Unknown Indica'],
        dominance: 25,
        thcContent: 21.8,
        cbdContent: 0.4
      },
      heritage: {
        breeder: 'California Genetics',
        seedBank: 'West Coast Collection',
        originCountry: 'USA',
        firstCrossed: '1990s'
      },
      characteristics: {
        floweringTime: '8-10 weeks',
        yield: 'High',
        difficulty: 'INTERMEDIATE',
        climate: ['Indoor', 'Outdoor', 'Greenhouse'],
        effects: ['Energizing', 'Focused', 'Creative', 'Uplifting'],
        flavors: ['Citrus', 'Tropical', 'Sweet', 'Fruity'],
        aromas: ['Citrus', 'Mango', 'Sharp', 'Sweet']
      }
    },
    labTests: [{
      id: 'LAB-GC155',
      testDate: new Date('2024-08-05'),
      labName: 'Product Testing Lab',
      labLicense: 'LAB-12345',
      batch: 'GC-155-2024',
      cannabinoids: {
        thc: 21.8,
        thca: 25.2,
        cbd: 0.4,
        cbda: 0.1,
        cbg: 1.0,
        cbn: 0.2,
        total: 26.7
      },
      terpenes: [
        { name: 'Limonene', percentage: 0.9 },
        { name: 'Myrcene', percentage: 0.7 },
        { name: 'Pinene', percentage: 0.5 }
      ],
      contaminants: {
        pesticides: 'PASS',
        heavyMetals: 'PASS',
        microbials: 'PASS',
        residualSolvents: 'PASS'
      },
      moisture: 10.2
    }],
    seedToSale: {
      seedId: 'SEED-GC155',
      plantId: 'PLANT-GC155',
      harvestDate: new Date('2024-07-10'),
      packageId: 'PKG-GC155',
      stateTrackingNumber: 'CA-GC155-2024',
      growerLicense: 'GRW-98765',
      chain: [
        {
          stage: 'SEED',
          timestamp: new Date('2024-01-20'),
          location: 'Sativa Facility',
          operatorLicense: 'GRW-98765',
          notes: 'High-energy genetics'
        }
      ]
    },
    packaging: {
      qrCode: '{"packageId":"PKG-GC155","item":"Green Crack","grower":"California Genetics"}',
      harvestDate: new Date('2024-07-10'),
      packageDate: new Date('2024-08-05'),
      expirationDate: new Date('2025-08-05'),
      netWeight: 3.5,
      thcWarning: true
    },
    rarity: {
      score: 88,
      rank: 87,
      traits: [
        { trait: 'THC Level', value: '21.8%', rarity: 18 },
        { trait: 'Strain Type', value: 'SATIVA', rarity: 28 },
        { trait: 'Energy Level', value: 'High', rarity: 15 }
      ]
    },
    creator: {
      address: '0xabc...',
      growerName: 'California Genetics',
      license: 'GRW-98765'
    },
    owner: '0x123...',
    price: 0.32,
    currency: 'ETH',
    blockchain: 'Ethereum',
    contractAddress: '0x123...'
  }
];

interface ProductDashboardProps {
  user: any;
}

export function ProductDashboard({ user }: ProductDashboardProps) {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<ProductNFT | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [nfts, setNfts] = useState<ProductNFT[]>(mockNFTs);

  const handleQRScanComplete = (nftData: ProductNFT) => {
    setNfts(prev => [nftData, ...prev]);
  };

  const handleViewDetails = (nft: ProductNFT) => {
    setSelectedNFT(nft);
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || nft.item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Product Collection
          </h1>
          <p className="text-muted-foreground">
            Scan QR codes to create authenticated product NFTs
          </p>
        </div>
        
        <Button 
          onClick={() => setShowQRScanner(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Scan className="w-4 h-4 mr-2" />
          Scan Package QR
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-500" />
              Total NFTs
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold">{nfts.length}</p>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-blue-500" />
              Lab Verified
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold">{nfts.filter(n => n.labTests.length > 0).length}</p>
            <p className="text-xs text-muted-foreground">100% tested</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              Avg. Rarity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold">
              {Math.round(nfts.reduce((acc: any, n: any) => acc + n.rarity.score, 0) / nfts.length)}
            </p>
            <p className="text-xs text-muted-foreground">out of 100</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              Collection Value
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold">
              {nfts.reduce((acc: any, n: any) => acc + (n.price || 0), 0).toFixed(2)} ETH
            </p>
            <p className="text-xs text-muted-foreground">+15% this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by item name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="INDICA">Indica</SelectItem>
            <SelectItem value="SATIVA">Sativa</SelectItem>
            <SelectItem value="HYBRID">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNFTs.map((nft) => (
          <ProductNFTCard
            key={nft.id}
            nft={nft}
            onViewDetails={handleViewDetails}
          />
        ))}
        
        {filteredNFTs.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No NFTs found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filterType !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Start by scanning a product package QR code to create your first NFT'
              }
            </p>
            {!searchQuery && filterType === 'all' && (
              <Button 
                onClick={() => setShowQRScanner(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Scan className="w-4 h-4 mr-2" />
                Scan Your First Package
              </Button>
            )}
          </div>
        )}
      </div>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScanComplete={handleQRScanComplete}
      />

      {/* NFT Details Modal */}
      {selectedNFT && (
        <ProductNFTDetails
          nft={selectedNFT}
          isOpen={!!selectedNFT}
          onClose={() => setSelectedNFT(null)}
        />
      )}
    </div>
  );
}
