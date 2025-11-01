

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera,
  Scan,
  Lightbulb,
  LightbulbOff,
  RotateCw,
  CheckCircle,
  AlertCircle,
  Leaf,
  Beaker,
  Shield,
  Zap,
  X,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScannedData {
  qr_code: string;
  item_name: string;
  genetics: string;
  thc_percentage?: number; // Legacy field
  cbd_percentage?: number; // Legacy field
  quality_score?: number;  // Quality rating 0-100
  harvest_date: string;
  cultivation_method: string;
  lab_verified: boolean;
  dispensary: string;
  batch_number: string;
  test_results: {
    pesticides: 'pass' | 'fail';
    heavy_metals: 'pass' | 'fail';
    microbials: 'pass' | 'fail';
    potency: 'verified';
  };
  verification_status: 'authentic' | 'suspicious' | 'fake';
}

export function MobileScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Check for flash capability
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      setHasFlash('torch' in capabilities);
      
      setIsScanning(true);
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for QR scanning. Please enable camera permissions.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setFlashOn(false);
  };

  // Toggle flash
  const toggleFlash = async () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const track = stream.getVideoTracks()[0];
      
      try {
        await track.applyConstraints({
          advanced: [{ torch: !flashOn } as any]
        });
        setFlashOn(!flashOn);
      } catch (error) {
        console.error('Flash toggle failed:', error);
      }
    }
  };

  // Switch camera
  const switchCamera = async () => {
    stopCamera();
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    setTimeout(startCamera, 100);
  };

  // Simulate QR code scanning (in real implementation, would use a QR library)
  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsLoading(true);
    
    // Capture frame
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      // Simulate processing delay
      setTimeout(() => {
        // Mock product QR data
        const mockData: ScannedData = {
          qr_code: 'SC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          item_name: ['Rare Diamond', 'Blue Sapphire', 'Vintage Watch', 'Ruby Collection'][Math.floor(Math.random() * 4)],
          genetics: 'Indica-Dominant Hybrid',
          thc_percentage: 22.5 + Math.random() * 5,
          cbd_percentage: 0.5 + Math.random() * 2,
          harvest_date: '2024-08-15',
          cultivation_method: ['Indoor Hydroponic', 'Organic Soil', 'LED Grown'][Math.floor(Math.random() * 3)],
          lab_verified: Math.random() > 0.2,
          dispensary: 'Premium Product Co.',
          batch_number: 'PCT-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
          test_results: {
            pesticides: Math.random() > 0.1 ? 'pass' : 'fail',
            heavy_metals: Math.random() > 0.05 ? 'pass' : 'fail',
            microbials: Math.random() > 0.1 ? 'pass' : 'fail',
            potency: 'verified'
          },
          verification_status: Math.random() > 0.8 ? 'suspicious' : 'authentic'
        };
        
        setScannedData(mockData);
        setIsLoading(false);
        stopCamera();
      }, 2000);
    }
  };

  // Create NFT from scanned data
  const createNFTFromScan = () => {
    if (!scannedData) return;
    
    alert(`✨ Product NFT creation initiated!\n\nProduct: ${scannedData.item_name}\nQuality Score: ${scannedData.quality_score || 95}/100\nBatch: ${scannedData.batch_number}\n\nNFT will be minted with quality verification and blockchain authentication!`);
  };

  // Reset scanner
  const resetScanner = () => {
    setScannedData(null);
    startCamera();
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'authentic': return 'text-green-400 border-green-500/30';
      case 'suspicious': return 'text-yellow-400 border-yellow-500/30';
      case 'fake': return 'text-red-400 border-red-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const getTestResultColor = (result: string) => {
    return result === 'pass' || result === 'verified' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Scanner Interface */}
      <Card className="bg-black/20 border-gray-700 overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-green-400" />
            🌿 Product Package Scanner
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {!isScanning && !scannedData ? (
            // Initial state
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-900/20 to-purple-900/20 rounded-full flex items-center justify-center border-2 border-green-500/30">
                <Scan className="w-16 h-16 text-green-400" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Scan Product QR Code</h3>
                <p className="text-gray-300 mb-6">
                  Point your camera at any product package QR code to verify authenticity 
                  and automatically create a unique NFT certificate.
                </p>
              </div>
              
              <Button
                onClick={startCamera}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                size="lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Scanning
              </Button>
            </div>
          ) : isScanning ? (
            // Scanning state
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-64 bg-black rounded-lg object-cover"
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Scanner overlay */}
              <div className="absolute inset-4 border-2 border-green-400 rounded-lg opacity-50">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400"></div>
              </div>
              
              {/* Scanning line animation */}
              <motion.div
                className="absolute left-4 right-4 h-0.5 bg-green-400 opacity-75"
                initial={{ top: '16px' }}
                animate={{ top: '240px' }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              />
              
              {/* Controls */}
              <div className="flex justify-center gap-3 mt-4">
                {hasFlash && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFlash}
                    className={`${flashOn ? 'bg-yellow-900/20 border-yellow-500/30' : 'border-gray-600'}`}
                  >
                    {flashOn ? <Lightbulb className="w-4 h-4" /> : <LightbulbOff className="w-4 h-4" />}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={switchCamera}
                  className="border-gray-600"
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={captureAndScan}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-4 h-4 mr-2"
                      >
                        ⚡
                      </motion.div>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4 mr-2" />
                      Scan QR Code
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopCamera}
                  className="border-red-500/30 hover:bg-red-900/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : scannedData ? (
            // Results state
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Product Package Scanned!</h3>
                
                <Badge 
                  variant="outline" 
                  className={`${getVerificationColor(scannedData.verification_status)} mb-4`}
                >
                  {scannedData.verification_status === 'authentic' && <Shield className="w-4 h-4 mr-1" />}
                  {scannedData.verification_status === 'suspicious' && <AlertCircle className="w-4 h-4 mr-1" />}
                  {scannedData.verification_status.toUpperCase()}
                </Badge>
              </div>

              {/* Product Details */}
              <div className="bg-slate-800/30 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm">Product</div>
                    <div className="text-white font-medium">{scannedData.item_name}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Genetics</div>
                    <div className="text-white font-medium">{scannedData.genetics}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Quality</div>
                    <div className="text-green-400 font-medium">{scannedData.quality_score || 95}/100</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Verified</div>
                    <div className="text-blue-400 font-medium">{scannedData.lab_verified ? 'Yes' : 'No'}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Cultivation</div>
                    <div className="text-purple-400 font-medium">{scannedData.cultivation_method}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Harvest Date</div>
                    <div className="text-white font-medium">{scannedData.harvest_date}</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Beaker className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">Lab Test Results</span>
                    {scannedData.lab_verified && (
                      <Badge variant="outline" className="text-green-400 border-green-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pesticides:</span>
                      <span className={getTestResultColor(scannedData.test_results.pesticides)}>
                        {scannedData.test_results.pesticides.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Heavy Metals:</span>
                      <span className={getTestResultColor(scannedData.test_results.heavy_metals)}>
                        {scannedData.test_results.heavy_metals.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Microbials:</span>
                      <span className={getTestResultColor(scannedData.test_results.microbials)}>
                        {scannedData.test_results.microbials.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Potency:</span>
                      <span className={getTestResultColor(scannedData.test_results.potency)}>
                        {scannedData.test_results.potency.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Dispensary</div>
                      <div className="text-white">{scannedData.dispensary}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Batch #</div>
                      <div className="text-white">{scannedData.batch_number}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={createNFTFromScan}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={scannedData.verification_status === 'fake'}
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  Create NFT
                </Button>
                
                <Button
                  onClick={resetScanner}
                  variant="outline"
                  className="border-blue-500/30 hover:bg-blue-900/20"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Scan Again
                </Button>
              </div>
            </motion.div>
          ) : null}
        </CardContent>
      </Card>

      {/* Mobile Scanner Features */}
      <Card className="bg-gradient-to-r from-green-900/20 via-purple-900/20 to-blue-900/20 border border-green-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">📱 Mobile Product Scanner</h2>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-400">Real-time</div>
                <div className="text-gray-300 text-sm">QR Verification</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-400">Instant</div>
                <div className="text-gray-300 text-sm">NFT Creation</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-400">Lab</div>
                <div className="text-gray-300 text-sm">Verification</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-400">Blockchain</div>
                <div className="text-gray-300 text-sm">Authentication</div>
              </div>
            </div>
            
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <p className="text-green-300">
                🌿 <strong>Mobile Scanner Active:</strong> Instantly verify product authenticity 
                and create authenticated NFTs from any product package QR code!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
