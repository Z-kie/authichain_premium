
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Leaf,
  Scan,
  TrendingUp,
  Award,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Zap,
  Shield,
  Camera,
  Palette,
  BarChart3,
  Globe,
  Sparkles,
  QrCode,
  Star,
  Eye,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { AdvancedQRScanner } from './advanced-qr-scanner';
import { ArtistMarketplace } from './artist-marketplace';
// import { SeedToSaleTracker } from './seed-to-sale-tracker'; // Component not yet implemented
import { ProductAnalytics } from './product-analytics';
import { ProductNFTGallery } from './product-nft-gallery';
import { ProfessionalGrowerHub } from './professional-grower-hub';
import Image from 'next/image';
import { toast } from 'sonner';

interface ProductIndustryDashboardProps {
  user?: any;
}

export function ProductIndustryDashboard({ user }: ProductIndustryDashboardProps) {
  const { data: session } = useSession() || {};
  const [activeTab, setActiveTab] = useState('overview');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData();
      fetchUserProfile();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/product/dashboard-stats');
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/product/user-profile');
      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleScanComplete = (nft: any) => {
    setScannerOpen(false);
    toast.success(`NFT "${nft.name}" created successfully!`);
    fetchDashboardData(); // Refresh data
    setActiveTab('collection');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Leaf className="w-12 h-12 mx-auto animate-pulse text-green-500" />
          <p>Loading Product Industry Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Product Industry Hub</h1>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Premium
                </Badge>
              </div>
              <p className="text-xl opacity-90">
                Scan, Authenticate & Trade Product NFTs
              </p>
              <p className="opacity-75">
                The world's most advanced seed-to-sale NFT platform
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setScannerOpen(true)}
                className="bg-white text-green-600 hover:bg-white/90"
              >
                <Camera className="w-5 h-5 mr-2" />
                Scan Package
              </Button>
              <Badge variant="outline" className="border-white/30 text-white text-center">
                AI-Powered
              </Badge>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10"></div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Scans</p>
                <p className="text-2xl font-bold">{dashboardData?.totalScans || 0}</p>
              </div>
              <QrCode className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Product NFTs</p>
                <p className="text-2xl font-bold">{dashboardData?.totalNFTs || 0}</p>
              </div>
              <Leaf className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
                <p className="text-2xl font-bold">{dashboardData?.portfolioValue || '0.0'} ETH</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rarity Rank</p>
                <p className="text-2xl font-bold">#{dashboardData?.rarityRank || '---'}</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="scanner" className="flex items-center gap-2">
            <Scan className="w-4 h-4" />
            Scanner
          </TabsTrigger>
          <TabsTrigger value="collection" className="flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            Collection
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Artists
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Professional
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Scans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Recent Product Scans
                </CardTitle>
                <CardDescription>
                  Latest package scans and NFT creations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData?.recentScans?.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.recentScans.map((scan: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{scan.item}</p>
                            <p className="text-sm text-muted-foreground">
                              {scan.grower} • {scan.thc}% THC
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={scan.nftCreated ? 'default' : 'secondary'}>
                            {scan.nftCreated ? 'NFT Created' : 'Scanned'}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(scan.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <QrCode className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No scans yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => setScannerOpen(true)}
                    >
                      Scan Your First Package
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Strains */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending Product Strains
                </CardTitle>
                <CardDescription>
                  Most popular items in your collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Myles High', 'Blue Sapphire', 'Ruby Collection', 'Vintage Watch'].map((item, idx) => (
                    <div key={item} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-medium">{item}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              HYBRID
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.floor(Math.random() * 10) + 15}% THC
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {(4.5 + Math.random() * 0.5).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Market Intelligence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Product Market Intelligence
                <Badge variant="secondary">AI-Powered</Badge>
              </CardTitle>
              <CardDescription>
                Real-time insights into product industry trends and pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Market Growth</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">+23.4%</p>
                  <p className="text-sm text-muted-foreground">Product NFT volume</p>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Avg NFT Price</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">0.125 ETH</p>
                  <p className="text-sm text-muted-foreground">30-day average</p>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Active Collectors</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">12.3K</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scanner">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Advanced Product Package Scanner
              </CardTitle>
              <CardDescription>
                Scan any product package to instantly create verified NFTs with AI-generated artwork
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  Our AI-powered scanner can read QR codes, extract item data, verify lab tests, 
                  and create unique NFTs automatically. Perfect for dispensaries, growers, and collectors.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Scanner Features</h3>
                  <div className="space-y-3">
                    {[
                      { icon: QrCode, title: 'Multi-Format QR Reading', desc: 'Reads any product package QR code format' },
                      { icon: Sparkles, title: 'AI Art Generation', desc: 'Creates unique item-specific artwork' },
                      { icon: Shield, title: 'Lab Verification', desc: 'Verifies authentic lab test results' },
                      { icon: Award, title: 'Rarity Calculation', desc: 'Advanced rarity scoring algorithm' }
                    ].map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                          <p className="font-medium">{title}</p>
                          <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Supported Packages</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Flower', 'Edibles', 'Concentrates', 'Topicals', 'Tinctures', 'Vapes'].map(type => (
                      <Badge key={type} variant="outline" className="justify-center">
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    size="lg" 
                    onClick={() => setScannerOpen(true)}
                    className="w-full"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Start Scanning
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collection">
          <ProductNFTGallery user={user} />
        </TabsContent>

        <TabsContent value="marketplace">
          <ArtistMarketplace user={user} />
        </TabsContent>

        <TabsContent value="analytics">
          <ProductAnalytics user={user} />
        </TabsContent>

        <TabsContent value="professional">
          <ProfessionalGrowerHub user={user} />
        </TabsContent>
      </Tabs>

      {/* Advanced QR Scanner Modal */}
      <AdvancedQRScanner
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanComplete={handleScanComplete}
      />
    </div>
  );
}
