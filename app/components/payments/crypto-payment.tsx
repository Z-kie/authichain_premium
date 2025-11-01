'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bitcoin,
  Zap,
  DollarSign,
  QrCode,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
  Wallet,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCodeLib from 'qrcode';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface CryptoPaymentOption {
  symbol: string;
  name: string;
  icon: any;
  network: string;
  confirmations_required: number;
  avg_fee: string;
  processing_time: string;
  product_friendly: boolean;
}

interface PaymentData {
  paymentId: string;
  payAddress: string;
  payAmount: number;
  payCurrency: string;
  priceAmount: number;
  priceCurrency: string;
  orderId: string;
  status: string;
  timeLimit?: string;
  expirationEstimateDate?: string;
  network?: string;
}

interface PaymentStatus {
  status: 'waiting' | 'confirming' | 'confirmed' | 'sending' | 'finished' | 'failed' | 'expired';
  actuallyPaid?: number;
  payinHash?: string;
}

export function CryptoPayment({ 
  amount_usd, 
  itemType = 'nft',
  itemId,
  onPaymentComplete 
}: { 
  amount_usd: number;
  itemType?: 'nft' | 'subscription' | 'enterprise';
  itemId?: string;
  onPaymentComplete?: (result: any) => void; 
}) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoPaymentOption | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes default
  const [addressCopied, setAddressCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cryptoOptions: CryptoPaymentOption[] = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: Bitcoin,
      network: 'Bitcoin',
      confirmations_required: 1,
      avg_fee: '$2-15',
      processing_time: '10-30 minutes',
      product_friendly: true
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: Zap,
      network: 'Ethereum',
      confirmations_required: 12,
      avg_fee: '$5-25',
      processing_time: '2-5 minutes',
      product_friendly: true
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: DollarSign,
      network: 'Ethereum',
      confirmations_required: 12,
      avg_fee: '$5-20',
      processing_time: '1-3 minutes',
      product_friendly: true
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      icon: DollarSign,
      network: 'Ethereum',
      confirmations_required: 12,
      avg_fee: '$5-20',
      processing_time: '1-3 minutes',
      product_friendly: true
    }
  ];

  const handleCryptoSelect = async (crypto: CryptoPaymentOption) => {
    setSelectedCrypto(crypto);
    setError(null);
    setIsCreating(true);
    
    try {
      // Create payment via API
      const response = await fetch('/api/crypto/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount_usd,
          currency: 'USD',
          payCurrency: crypto.symbol,
          orderDescription: `${itemType} payment`,
          itemType,
          itemId,
          escrow: itemType === 'nft',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment');
      }

      const data = await response.json();
      setPaymentData(data.payment);
      
      // Generate QR code
      if (data.payment.payAddress) {
        const qrUrl = await QRCodeLib.toDataURL(
          `${crypto.symbol.toLowerCase()}:${data.payment.payAddress}?amount=${data.payment.payAmount}`,
          { width: 300, margin: 2 }
        );
        setQrCodeDataUrl(qrUrl);
      }

      // Start monitoring payment
      startPaymentMonitoring(data.payment.paymentId);
      
    } catch (err) {
      console.error('Payment creation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create payment');
      setSelectedCrypto(null);
    } finally {
      setIsCreating(false);
    }
  };

  const startPaymentMonitoring = (paymentId: string) => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/crypto/create-payment?paymentId=${paymentId}`);
        if (response.ok) {
          const data = await response.json();
          const status = data.payment.payment_status;
          
          setPaymentStatus({
            status,
            actuallyPaid: data.payment.actually_paid,
            payinHash: data.payment.payin_hash,
          });

          if (status === 'finished') {
            onPaymentComplete?.({ 
              success: true, 
              crypto: selectedCrypto?.symbol,
              amount: data.payment.actually_paid,
              txHash: data.payment.payin_hash,
            });
            clearInterval(statusInterval);
          } else if (status === 'failed' || status === 'expired') {
            setError(`Payment ${status}. Please try again.`);
            clearInterval(statusInterval);
          }
        }
      } catch (err) {
        console.error('Status check error:', err);
      }
    };

    // Check status every 15 seconds
    const statusInterval = setInterval(checkStatus, 15000);
    checkStatus(); // Check immediately

    // Clean up on unmount
    return () => clearInterval(statusInterval);
  };

  const copyAddress = async () => {
    if (paymentData?.payAddress) {
      await navigator.clipboard.writeText(paymentData.payAddress);
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (paymentData && paymentData.expirationEstimateDate) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const expiration = new Date(paymentData.expirationEstimateDate!).getTime();
        const remaining = Math.max(0, Math.floor((expiration - now) / 1000));
        
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          clearInterval(interval);
          setError('Payment expired. Please create a new payment.');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [paymentData]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (isCreating) {
    return (
      <Card className="bg-black/20 border-gray-700">
        <CardContent className="py-12 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <div className="w-full h-full border-4 border-orange-500/30 border-t-orange-400 rounded-full"></div>
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Creating Payment...</h3>
          <p className="text-gray-300">Please wait while we generate your crypto payment address</p>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-500/30">
        <CardContent className="py-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Payment Error</h3>
          <p className="text-red-300 mb-4">{error}</p>
          <Button
            onClick={() => {
              setError(null);
              setSelectedCrypto(null);
              setPaymentData(null);
            }}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Selection screen
  if (!selectedCrypto || !paymentData) {
    return (
      <div className="space-y-6">
        <Card className="bg-black/20 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bitcoin className="w-5 h-5 text-orange-400" />
              🚀 Pay with Cryptocurrency
            </CardTitle>
            <div className="text-gray-300">
              Choose your preferred cryptocurrency for this {itemType} purchase
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cryptoOptions.map((crypto) => {
                const IconComponent = crypto.icon;
                
                return (
                  <motion.div
                    key={crypto.symbol}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full p-6 h-auto justify-between border-gray-600 hover:border-orange-500/30 hover:bg-orange-900/10"
                      onClick={() => handleCryptoSelect(crypto)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <IconComponent className="w-8 h-8 text-orange-400" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white text-lg">
                            {crypto.name} ({crypto.symbol})
                          </div>
                          <div className="text-sm text-gray-400">
                            Network: {crypto.network} • Fee: {crypto.avg_fee}
                          </div>
                          <div className="text-sm text-gray-400">
                            Processing: {crypto.processing_time}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-white text-xl">
                          ${amount_usd.toLocaleString()}
                        </div>
                        {crypto.product_friendly && (
                          <Badge variant="outline" className="mt-2 text-green-400 border-green-500/30">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="bg-gradient-to-r from-orange-900/20 via-yellow-900/20 to-red-900/20 border border-orange-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-white">🚀 Why Pay with Crypto?</h3>
              
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">Private</div>
                  <div className="text-gray-300 text-sm">Anonymous Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">Low Fees</div>
                  <div className="text-gray-300 text-sm">0.5% Transaction Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">Global</div>
                  <div className="text-gray-300 text-sm">No Geographic Limits</div>
                </div>
              </div>
              
              <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                <p className="text-orange-300">
                  🔒 <strong>Secure Escrow:</strong> All {itemType} payments are protected by secure 
                  escrow until delivery is confirmed!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Payment screen
  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {React.createElement(selectedCrypto.icon, { className: "w-5 h-5 text-orange-400" })}
            Pay with {selectedCrypto.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-orange-400 border-orange-500/30">
              {selectedCrypto.network} Network
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-500/30">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(timeRemaining)}
            </Badge>
            {paymentStatus && (
              <Badge 
                variant="outline" 
                className={`${
                  paymentStatus.status === 'finished' ? 'text-green-400 border-green-500/30' :
                  paymentStatus.status === 'failed' ? 'text-red-400 border-red-500/30' :
                  'text-yellow-400 border-yellow-500/30'
                }`}
              >
                {paymentStatus.status.toUpperCase()}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Amount */}
          <div className="p-6 bg-slate-800/30 rounded-lg border border-gray-700 text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {paymentData.payAmount} {paymentData.payCurrency}
            </div>
            <div className="text-gray-400">
              ≈ ${paymentData.priceAmount.toLocaleString()} USD
            </div>
          </div>

          {/* QR Code and Address */}
          <div className="p-6 bg-slate-800/30 rounded-lg border border-gray-700">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {qrCodeDataUrl ? (
                <img 
                  src={qrCodeDataUrl} 
                  alt="Payment QR Code" 
                  className="w-48 h-48 rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 bg-white p-4 rounded-lg flex items-center justify-center">
                  <QrCode className="w-full h-full text-black" />
                </div>
              )}
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2">
                    Send exactly this amount to:
                  </div>
                  <div className="p-3 bg-gray-900 rounded border border-gray-600 font-mono text-sm text-green-400 break-all">
                    {paymentData.payAddress}
                  </div>
                  <Button
                    onClick={copyAddress}
                    variant="outline"
                    className="mt-2 border-gray-600 hover:bg-gray-800"
                    disabled={addressCopied}
                  >
                    {addressCopied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Address
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <AnimatePresence>
            {paymentStatus && paymentStatus.status !== 'waiting' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className={`${
                  paymentStatus.status === 'finished' 
                    ? 'bg-green-900/20 border-green-500/30' 
                    : paymentStatus.status === 'failed'
                    ? 'bg-red-900/20 border-red-500/30'
                    : 'bg-yellow-900/20 border-yellow-500/30'
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      {paymentStatus.status === 'finished' ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : paymentStatus.status === 'failed' ? (
                        <AlertCircle className="w-6 h-6 text-red-400" />
                      ) : (
                        <Clock className="w-6 h-6 text-yellow-400" />
                      )}
                      <div>
                        <div className="font-medium text-white">
                          {paymentStatus.status === 'finished' ? 'Payment Confirmed!' : 
                           paymentStatus.status === 'failed' ? 'Payment Failed' :
                           'Payment Detected'}
                        </div>
                        {paymentStatus.payinHash && (
                          <div className="text-sm text-gray-400">
                            TX: {paymentStatus.payinHash.substring(0, 20)}...
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {paymentStatus.status === 'finished' && (
                      <div className="p-4 bg-green-900/30 rounded-lg">
                        <div className="text-green-200 text-sm">
                          <div className="font-medium mb-2">Transaction Complete</div>
                          <div>Amount: {paymentStatus.actuallyPaid} {selectedCrypto.symbol}</div>
                          <div>Status: Confirmed and secured in escrow</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions */}
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-200">
                <div className="font-medium mb-1">Payment Instructions:</div>
                <ul className="space-y-1 text-xs">
                  <li>• Send the exact amount to avoid delays</li>
                  <li>• Use a personal wallet (not an exchange)</li>
                  <li>• Payment expires in {formatTime(timeRemaining)}</li>
                  <li>• Network fees are paid separately by you</li>
                  <li>• Status updates automatically every 15 seconds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCrypto(null);
              setPaymentData(null);
              setPaymentStatus(null);
            }}
            className="w-full border-gray-600 hover:bg-gray-800"
          >
            Choose Different Crypto
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
