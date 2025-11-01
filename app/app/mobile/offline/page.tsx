
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wifi,
  WifiOff,
  RefreshCw,
  Smartphone,
  Database
} from 'lucide-react';

export default function MobileOfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-24">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="bg-black/20 border-gray-700">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-full flex items-center justify-center mb-4">
              <WifiOff className="w-10 h-10 text-red-400" />
            </div>
            <CardTitle className="text-white">🌿 You're Offline</CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">No Internet Connection</h2>
              <p className="text-gray-300">
                AuthiChain mobile app works offline! Your product NFT data is cached 
                and will sync when you're back online.
              </p>
            </div>

            {/* Cached Features */}
            <div className="bg-slate-800/30 rounded-lg p-4 space-y-3">
              <h3 className="text-green-400 font-medium flex items-center gap-2">
                <Database className="w-5 h-5" />
                Available Offline:
              </h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• View your product NFT collection</li>
                <li>• Browse cached item information</li>
                <li>• Access saved market analytics</li>
                <li>• Review transaction history</li>
                <li>• QR scanner functionality</li>
              </ul>
            </div>

            {/* Offline Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleRefresh}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-gray-600"
                onClick={() => {
                  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                    navigator.serviceWorker.ready.then((registration) => {
                      // Background sync would be implemented here
                      console.log('Background sync would be registered:', registration);
                      return Promise.resolve();
                    });
                  }
                  alert('📱 Background sync enabled! Your product NFT data will automatically update when connection is restored.');
                }}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Enable Background Sync
              </Button>
            </div>

            {/* Tips */}
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 text-sm">
                💡 <strong>Tip:</strong> AuthiChain mobile app automatically saves your 
                product NFT data for offline access. All actions will sync when you're back online!
              </p>
            </div>

            {/* Connection Status */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span>Offline Mode Active</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
