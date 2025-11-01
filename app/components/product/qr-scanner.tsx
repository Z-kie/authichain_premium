
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, X, Scan, AlertTriangle } from 'lucide-react';
import { PackageQRData } from '@/types/product';
import { createProductNFTFromQR } from '@/lib/product-utils';

// Simple QR reader fallback component
const QrReader = ({ onResult, conitemts }: any) => (
  <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg">
    <div className="text-center">
      <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
      <p className="text-gray-500">QR Scanner not available</p>
      <p className="text-sm text-gray-400">Please install camera dependencies</p>
    </div>
  </div>
);

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (nftData: any) => void;
}

export function QRScanner({ isOpen, onClose, onScanComplete }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<PackageQRData | null>(null);
  const [creating, setCreating] = useState(false);

  const handleScan = async (result: any) => {
    if (result?.text && !scannedData) {
      try {
        setScanning(false);
        // Parse QR code data (assuming JSON format)
        const qrData: PackageQRData = JSON.parse(result.text);
        
        // Validate required fields
        if (!qrData.packageId || !qrData.item || !qrData.grower) {
          throw new Error('Invalid QR code: Missing required package information');
        }

        setScannedData(qrData);
      } catch (err) {
        setError('Invalid QR code format. Please scan a valid product package QR code.');
      }
    }
  };

  const handleError = (error: any) => {
    console.error('QR Scanner Error:', error);
    setError('Camera access denied. Please enable camera permissions.');
  };

  const startScanning = () => {
    setError(null);
    setScannedData(null);
    setScanning(true);
  };

  const createNFT = async () => {
    if (!scannedData) return;

    setCreating(true);
    try {
      const nftData = await createProductNFTFromQR(scannedData);
      onScanComplete(nftData);
      onClose();
    } catch (err) {
      setError('Failed to create NFT from scanned data. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Scan Product Package QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!scanning && !scannedData && (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                <Camera className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Position the QR code from your product package in the camera view
              </p>
              <Button onClick={startScanning} className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Start Camera
              </Button>
            </div>
          )}

          {scanning && (
            <div className="space-y-4">
              <div className="relative">
                <QrReader
                  onResult={(result: any, error: any) => {
                    if (result) {
                      handleScan(result);
                    }
                    if (error) {
                      handleError(error);
                    }
                  }}
                  conitemts={{
                    facingMode: 'environment'
                  }}
                  className="w-full"
                />
                <div className="absolute inset-0 border-2 border-green-500 rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-500"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-500"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-500"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-500"></div>
                </div>
              </div>
              <Button variant="outline" onClick={() => setScanning(false)} className="w-full">
                Cancel Scan
              </Button>
            </div>
          )}

          {scannedData && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-green-600">Package Found!</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Strain:</span>
                    <p className="font-medium">{scannedData.item}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Grower:</span>
                    <p className="font-medium">{scannedData.grower}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">THC:</span>
                    <p className="font-medium">{scannedData.thc}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CBD:</span>
                    <p className="font-medium">{scannedData.cbd}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <p className="font-medium">{scannedData.weight}g</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Harvest:</span>
                    <p className="font-medium">{new Date(scannedData.harvestDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={createNFT} 
                  disabled={creating}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {creating ? 'Creating NFT...' : 'Create NFT'}
                </Button>
                <Button variant="outline" onClick={() => setScannedData(null)}>
                  Scan Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
