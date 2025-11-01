
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Camera, 
  X, 
  Scan, 
  AlertTriangle, 
  CheckCircle, 
  Upload, 
  Zap,
  MapPin,
  Clock,
  Leaf,
  Award,
  Sparkles
} from 'lucide-react';
// import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode'; // Optional dependency

// Mock implementations for QR scanning
const Html5QrcodeScanner = class {
  constructor(elementId: any, config: any, verbose?: any) {}
  render(successCallback: any, errorCallback: any) { return Promise.resolve(); }
  clear() { return Promise.resolve(); }
};

const Html5Qrcode = class {
  constructor(elementId: any) {}
  start(cameraIdOrConfig: any, config: any, qrCodeSuccessCallback: any, qrCodeErrorCallback?: any) { return Promise.resolve(); }
  stop() { return Promise.resolve(); }
  clear() { return Promise.resolve(); }
  scanFile(file: any, showImage?: boolean) { return Promise.resolve('mock-result'); }
};

import { PackageQRData, ProductNFT } from '@/types/product';
import { createProductNFTFromQR } from '@/lib/product-utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface AdvancedQRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (nftData: ProductNFT) => void;
}

export function AdvancedQRScanner({ isOpen, onClose, onScanComplete }: AdvancedQRScannerProps) {
  const { data: session } = useSession() || {};
  const [scanning, setScanning] = useState(false);
  const [processingNFT, setProcessingNFT] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<PackageQRData | null>(null);
  const [createdNFT, setCreatedNFT] = useState<ProductNFT | null>(null);
  const [scannerMode, setScannerMode] = useState<'camera' | 'upload'>('camera');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  
  const qrScannerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user location for analytics
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => console.log('Location access denied')
      );
    }

    // Collect device info for analytics
    setDeviceInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      devicePixelRatio: window.devicePixelRatio
    });
  }, []);

  // Initialize QR Scanner
  const initializeScanner = useCallback(() => {
    if (!isOpen || scannerMode !== 'camera') return;

    try {
      qrScannerRef.current = new Html5QrcodeScanner(
        "qr-scanner-container",
        {
          fps: 10,
          qrbox: { width: 300, height: 300 },
          aspectRatio: 1.0,
          supportedScanTypes: [0], // Camera scan type
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          defaultZoomValueIfSupported: 2,
        },
        false
      );

      qrScannerRef.current.render(handleScanSuccess, handleScanError);
      setScanning(true);
    } catch (err) {
      setError('Failed to initialize camera. Please check permissions.');
      console.error('Scanner initialization error:', err);
    }
  }, [isOpen, scannerMode]);

  useEffect(() => {
    initializeScanner();

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear();
        qrScannerRef.current = null;
      }
    };
  }, [initializeScanner]);

  const handleScanSuccess = async (decodedText: string, decodedResult: any) => {
    if (scannedData) return; // Prevent multiple scans

    try {
      setScanning(false);
      
      // Try to parse as JSON first (product package format)
      let qrData: PackageQRData;
      try {
        qrData = JSON.parse(decodedText);
      } catch {
        // If not JSON, try to parse as structured data
        const lines = decodedText.split('\n').filter(line => line.trim());
        qrData = parseUnstructuredQRData(lines);
      }

      // Validate required fields
      if (!qrData.packageId || !qrData.item) {
        throw new Error('Invalid QR code: Missing required package information');
      }

      setScannedData(qrData);
      
      // Track the scan
      await trackQRScan(qrData);
      
      // Auto-create NFT if user is authenticated
      if (session?.user) {
        await handleCreateNFT(qrData);
      }

    } catch (err: any) {
      setError(`Invalid QR code: ${err.message}`);
      toast.error('Invalid QR code format');
    }
  };

  const handleScanError = (error: string) => {
    // Ignore frequent scanning errors
    if (error.includes('NotFoundException')) return;
    console.warn('QR Scan error:', error);
  };

  const parseUnstructuredQRData = (lines: string[]): PackageQRData => {
    const data: any = {};
    
    for (const line of lines) {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('package') || lowerKey.includes('id')) {
          data.packageId = value;
        } else if (lowerKey.includes('item') || lowerKey.includes('variety')) {
          data.item = value;
        } else if (lowerKey.includes('grower') || lowerKey.includes('cultivator')) {
          data.grower = value;
        } else if (lowerKey.includes('harvest')) {
          data.harvestDate = value;
        } else if (lowerKey.includes('thc')) {
          data.thc = parseFloat(value.replace('%', ''));
        } else if (lowerKey.includes('cbd')) {
          data.cbd = parseFloat(value.replace('%', ''));
        } else if (lowerKey.includes('weight')) {
          data.weight = parseFloat(value.replace('g', ''));
        } else if (lowerKey.includes('test')) {
          data.labTestId = value;
        } else if (lowerKey.includes('state') || lowerKey.includes('track')) {
          data.stateId = value;
        }
      }
    }

    // Set defaults for missing data
    return {
      packageId: data.packageId || 'unknown',
      item: data.item || 'Unknown Strain',
      grower: data.grower || 'Unknown Grower',
      harvestDate: data.harvestDate || new Date().toISOString().split('T')[0],
      thc: data.thc || 0,
      cbd: data.cbd || 0,
      weight: data.weight || 1,
      labTestId: data.labTestId || 'pending',
      stateId: data.stateId || 'untracked',
      cultivationDate: data.cultivationDate || new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  };

  const trackQRScan = async (qrData: PackageQRData) => {
    try {
      await fetch('/api/product/track-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: qrData.packageId,
          scannerId: session?.user?.id,
          deviceInfo,
          location,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to track scan:', error);
    }
  };

  const handleCreateNFT = async (qrData: PackageQRData) => {
    if (!session?.user) {
      toast.error('Please sign in to create NFTs');
      return;
    }

    setProcessingNFT(true);
    setProgress(0);

    try {
      // Progress updates
      const updateProgress = (step: number, message: string) => {
        setProgress(step);
        toast.info(message);
      };

      updateProgress(20, 'Analyzing product data...');
      
      // Create NFT data structure
      const nft = await createProductNFTFromQR(qrData);
      
      updateProgress(40, 'Generating unique item artwork...');
      
      // Generate AI artwork for the item
      const imageResponse = await fetch('/api/product/generate-item-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: nft.item,
          packageData: qrData,
          style: 'photorealistic'
        })
      });
      
      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        nft.imageUrl = imageData.imageUrl;
      }

      updateProgress(60, 'Calculating rarity traits...');
      
      // Enhanced rarity calculation with market data
      const rarityResponse = await fetch('/api/product/calculate-rarity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nft)
      });

      if (rarityResponse.ok) {
        const rarityData = await rarityResponse.json();
        nft.rarity = rarityData.rarity;
      }

      updateProgress(80, 'Saving to blockchain...');
      
      // Save to database
      const saveResponse = await fetch('/api/product/save-nft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...nft,
          creatorId: session.user.id,
          ownerId: session.user.id
        })
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save NFT');
      }

      const savedNFT = await saveResponse.json();
      
      updateProgress(100, 'NFT created successfully!');
      
      setCreatedNFT(savedNFT);
      setProcessingNFT(false);
      
      toast.success(`${savedNFT.name} NFT created!`);
      onScanComplete(savedNFT);

    } catch (error: any) {
      setProcessingNFT(false);
      setError(`Failed to create NFT: ${error.message}`);
      toast.error('NFT creation failed');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      
      try {
        const html5QrCode = new Html5Qrcode("qr-file-scanner");
        const decodedText = await html5QrCode.scanFile(file, true);
        await handleScanSuccess(decodedText, null);
      } catch (err) {
        setError('Could not read QR code from image');
        toast.error('Failed to scan QR code from image');
      }
    };
    
    reader.readAsDataURL(file);
  };

  const resetScanner = () => {
    setScannedData(null);
    setCreatedNFT(null);
    setError(null);
    setProgress(0);
    setProcessingNFT(false);
    
    if (scannerMode === 'camera') {
      initializeScanner();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-green-500" />
            Advanced Product Scanner
            <Badge variant="secondary" className="ml-2">AI-Powered</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Scanner Mode Toggle */}
          <Tabs value={scannerMode} onValueChange={(v) => setScannerMode(v as 'camera' | 'upload')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Live Camera
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="space-y-4">
              {!scannedData && !error && (
                <div className="space-y-4">
                  <div 
                    id="qr-scanner-container" 
                    className="w-full flex justify-center"
                    style={{ minHeight: '300px' }}
                  />
                  
                  {scanning && (
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Scan className="w-5 h-5 animate-pulse" />
                        <span>Scanning for product packages...</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Point your camera at any product package QR code
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="text-lg font-semibold">Upload QR Code Image</h3>
                      <p className="text-sm text-muted-foreground">
                        Select an image containing a product package QR code
                      </p>
                    </div>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      Choose Image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </CardContent>
              </Card>
              <div id="qr-file-scanner" className="hidden" />
            </TabsContent>
          </Tabs>

          {/* Processing Progress */}
          {processingNFT && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">Creating Your Product NFT</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    This may take a moment as we analyze the item and generate unique artwork...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Scanned Data Preview */}
          {scannedData && !createdNFT && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">Package Scanned Successfully</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-500" />
                        <span className="font-medium">Strain</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">{scannedData.item}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Grower</span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">{scannedData.grower}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="font-medium">THC Content</span>
                      <Badge variant="outline" className="text-red-500 border-red-500">
                        {scannedData.thc}%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <span className="font-medium">CBD Content</span>
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        {scannedData.cbd}%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Harvest Date</span>
                      </div>
                      <p>{new Date(scannedData.harvestDate).toLocaleDateString()}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="font-medium">Net Weight</span>
                      <p>{scannedData.weight}g</p>
                    </div>
                  </div>

                  {!session?.user ? (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Please sign in to create your product NFT from this scan.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleCreateNFT(scannedData)}
                        className="flex-1"
                        disabled={processingNFT}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Create Product NFT
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={resetScanner}
                      >
                        Scan Another
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Created NFT Display */}
          {createdNFT && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">NFT Created Successfully!</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative aspect-square">
                      <Image
                        src={createdNFT.imageUrl}
                        alt={createdNFT.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold">{createdNFT.name}</h3>
                        <p className="text-muted-foreground">{createdNFT.description}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">Rarity Score</span>
                          <Badge variant="secondary">{createdNFT.rarity?.score || 0}/100</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {createdNFT.rarity.traits.slice(0, 3).map((trait, idx) => (
                            <Badge key={idx} variant="outline">
                              {trait.trait}: {trait.value}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => onScanComplete(createdNFT)}
                          className="flex-1"
                        >
                          View NFT
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={resetScanner}
                        >
                          Scan Another
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
