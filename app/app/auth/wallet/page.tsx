
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletAuthPage() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== 'undefined' && window.ethereum) {
      setHasMetaMask(true);
      
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        })
        .catch((err: any) => {
          console.error('Error checking accounts:', err);
        });
    }
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (!window.ethereum) {
        setError('MetaMask is not installed. Please install MetaMask extension to continue.');
        setIsConnecting(false);
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        setError('No accounts found. Please unlock MetaMask and try again.');
        setIsConnecting(false);
        return;
      }

      const address = accounts[0];
      setWalletAddress(address);

      // Create a message to sign for authentication
      const message = `Sign this message to authenticate with AuthiChain.\n\nWallet: ${address}\nTimestamp: ${Date.now()}`;
      
      // Request signature
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address]
      });

      // Step 1: Verify signature and create/update user in database
      const response = await fetch('/api/blockchain/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          walletType: 'MetaMask',
          blockchain: 'ethereum',
          signature: signature,
          message: message
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to verify wallet signature. Please try again.');
        setIsConnecting(false);
        return;
      }

      console.log('✅ Wallet verified, signing in with NextAuth...');

      // Step 2: Sign in with NextAuth using wallet credentials
      const signInResult = await signIn('wallet', {
        walletAddress: address,
        signature: signature,
        message: message,
        redirect: false
      });

      if (signInResult?.error) {
        setError('Authentication failed. Please try again.');
        setIsConnecting(false);
        return;
      }

      if (signInResult?.ok) {
        setSuccess(true);
        
        // Store wallet info in localStorage for reference
        localStorage.setItem('connectedWallet', JSON.stringify({
          address: address,
          type: 'MetaMask',
          connectedAt: new Date().toISOString()
        }));

        console.log('✅ Authentication successful, redirecting to dashboard...');

        // Redirect to dashboard after successful authentication
        setTimeout(() => {
          router.push('/dashboard/consumer');
          router.refresh(); // Refresh to update session
        }, 1500);
      } else {
        setError('Failed to create session. Please try again.');
      }

    } catch (err: any) {
      console.error('Wallet connection error:', err);
      
      if (err.code === 4001) {
        setError('Connection request was rejected. Please approve the connection in MetaMask.');
      } else if (err.code === -32002) {
        setError('A connection request is already pending. Please check MetaMask.');
      } else {
        setError('Failed to connect wallet. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setSuccess(false);
    setError(null);
    localStorage.removeItem('connectedWallet');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-purple-500/20 bg-gray-900/50 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Connect Your Wallet
            </CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to AuthiChain using your MetaMask wallet
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!hasMetaMask && (
              <Alert className="border-yellow-500/50 bg-yellow-500/10">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-200">
                  MetaMask not detected. Please install the{' '}
                  <a 
                    href="https://metamask.io/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline font-semibold"
                  >
                    MetaMask extension
                  </a>
                  {' '}to continue.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500/50 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-200">
                  Wallet connected successfully! Redirecting to dashboard...
                </AlertDescription>
              </Alert>
            )}

            {walletAddress && !success && (
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Connected Wallet</p>
                <p className="text-white font-mono text-sm break-all">
                  {walletAddress}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {!walletAddress ? (
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting || !hasMetaMask}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  size="lg"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-5 w-5" />
                      Connect MetaMask
                    </>
                  )}
                </Button>
              ) : (
                !success && (
                  <Button
                    onClick={disconnectWallet}
                    variant="outline"
                    className="w-full border-purple-500/50 text-white hover:bg-purple-500/10"
                    size="lg"
                  >
                    Disconnect Wallet
                  </Button>
                )
              )}

              <Button
                onClick={() => router.push('/auth/signin')}
                variant="ghost"
                className="w-full text-gray-400 hover:text-white hover:bg-purple-500/10"
              >
                Sign in with Email instead
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 text-center">
                By connecting your wallet, you agree to our{' '}
                <a href="/terms" className="text-purple-400 hover:underline">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="/privacy" className="text-purple-400 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don't have a wallet?{' '}
            <a 
              href="https://metamask.io/download/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline font-semibold"
            >
              Get MetaMask
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
