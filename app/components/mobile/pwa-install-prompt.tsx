

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 10000); // Show after 10 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('🌿 AuthiChain Mobile App installed!');
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Install prompt failed:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
    
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed
  if (isInstalled || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-24 left-4 right-4 z-50"
        >
          <Card className="bg-gradient-to-r from-green-900/95 to-emerald-900/95 border border-green-500/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Smartphone className="w-6 h-6 text-green-400" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-bold mb-1">🌿 Install AuthiChain Mobile</h3>
                  <p className="text-green-100 text-sm mb-3">
                    Get the full product NFT experience! Install our mobile app for:
                  </p>
                  <ul className="text-green-200 text-xs space-y-1 mb-3">
                    <li>• Instant QR product package scanning</li>
                    <li>• Push notifications for market alerts</li>
                    <li>• Offline access to your NFT collection</li>
                    <li>• Native mobile trading experience</li>
                  </ul>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleInstall}
                      className="bg-green-500 hover:bg-green-600 text-white"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Install App
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDismiss}
                      className="border-green-500/30 hover:bg-green-900/20"
                    >
                      Maybe Later
                    </Button>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="text-green-400 hover:bg-green-900/20 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
