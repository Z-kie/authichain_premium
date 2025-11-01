
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  ShoppingCart,
  CreditCard,
  Wallet,
  Bitcoin,
  Zap,
  Shield,
  Check,
  X,
  Crown,
  Star,
  Gem,
  DollarSign,
  Clock,
  AlertTriangle,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface NFTPurchaseFlowProps {
  nft: {
    id: string;
    name: string;
    price: number;
    currency: string;
    imageUrl: string;
    collection: string;
    rarity: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onPurchaseComplete?: (nft: any) => void;
}

export function NFTPurchaseFlow({ nft, isOpen, onClose, onPurchaseComplete }: NFTPurchaseFlowProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'method' | 'details' | 'confirm' | 'success' | 'error'>('method');
  const [error, setError] = useState('');

  const usdPrice = nft.price * 2400; // Mock ETH to USD conversion
  
  const handlePayment = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (Math.random() > 0.1) { // 90% success rate for demo
        setStep('success');
        onPurchaseComplete?.(nft);
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setStep('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetFlow = () => {
    setStep('method');
    setPaymentMethod('card');
    setError('');
    setIsProcessing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-purple-400" />
            <span>Purchase NFT</span>
          </DialogTitle>
          <DialogDescription>
            Complete your purchase securely with multiple payment options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* NFT Summary */}
          <Card className="border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-purple-500/30">
                  <Image 
                    src={nft.imageUrl} 
                    alt={nft.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      {nft.collection}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                      <Star className="w-3 h-3 mr-1" />
                      {nft.rarity}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-white">{nft.name}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="font-bold text-green-400">
                      {nft.price} {nft.currency}
                    </div>
                    <div className="text-gray-400">
                      ≈ ${usdPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {/* Step 1: Payment Method Selection */}
            {step === 'method' && (
              <motion.div
                key="method"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Choose Payment Method</h3>
                
                <div className="grid gap-4">
                  {/* Credit Card */}
                  <Card 
                    className={`cursor-pointer transition-all border-2 ${
                      paymentMethod === 'card' 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-gray-700 hover:border-purple-500/50'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          paymentMethod === 'card' ? 'bg-purple-500' : 'bg-gray-700'
                        }`}>
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white">Credit/Debit Card</div>
                          <div className="text-sm text-gray-400">Visa, Mastercard, American Express</div>
                        </div>
                        <div className="flex space-x-1">
                          <Badge variant="outline" className="text-green-400 border-green-400">Fast</Badge>
                          <Badge variant="outline" className="text-blue-400 border-blue-400">Secure</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Crypto */}
                  <Card 
                    className={`cursor-pointer transition-all border-2 ${
                      paymentMethod === 'crypto' 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 hover:border-orange-500/50'
                    }`}
                    onClick={() => setPaymentMethod('crypto')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          paymentMethod === 'crypto' ? 'bg-orange-500' : 'bg-gray-700'
                        }`}>
                          <Bitcoin className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white">Cryptocurrency</div>
                          <div className="text-sm text-gray-400">Bitcoin, Ethereum, USDC</div>
                        </div>
                        <div className="flex space-x-1">
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400">No Fees</Badge>
                          <Badge variant="outline" className="text-purple-400 border-purple-400">Web3</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wallet */}
                  <Card 
                    className={`cursor-pointer transition-all border-2 ${
                      paymentMethod === 'wallet' 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-gray-700 hover:border-green-500/50'
                    }`}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          paymentMethod === 'wallet' ? 'bg-green-500' : 'bg-gray-700'
                        }`}>
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white">MetaMask Wallet</div>
                          <div className="text-sm text-gray-400">Connect your crypto wallet</div>
                        </div>
                        <div className="flex space-x-1">
                          <Badge variant="outline" className="text-blue-400 border-blue-400">Instant</Badge>
                          <Badge variant="outline" className="text-green-400 border-green-400">Popular</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => setStep('details')}
                >
                  Continue with {
                    paymentMethod === 'card' ? 'Card' : 
                    paymentMethod === 'crypto' ? 'Crypto' : 
                    'Wallet'
                  }
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Payment Details */}
            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Payment Details</h3>
                  <Button variant="ghost" size="sm" onClick={() => setStep('method')}>
                    Change Method
                  </Button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="bg-slate-800/50 border-purple-500/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input 
                          id="expiryDate"
                          placeholder="MM/YY"
                          className="bg-slate-800/50 border-purple-500/30"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv"
                          placeholder="123"
                          className="bg-slate-800/50 border-purple-500/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input 
                          id="zipCode"
                          placeholder="12345"
                          className="bg-slate-800/50 border-purple-500/30"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'crypto' && (
                  <div className="space-y-4">
                    <Card className="border-orange-500/30 bg-orange-500/10">
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <div className="text-orange-400 font-semibold">Send Payment To:</div>
                          <div className="font-mono text-sm bg-slate-800 p-3 rounded border break-all">
                            0x1234567890123456789012345678901234567890
                          </div>
                          <div className="text-sm text-gray-400">
                            Send exactly <strong>{nft.price} {nft.currency}</strong> to complete purchase
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="space-y-4">
                    <Card className="border-green-500/30 bg-green-500/10">
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <div className="text-green-400 font-semibold">Connect MetaMask</div>
                          <div className="text-sm text-gray-400">
                            Click the button below to connect your MetaMask wallet and complete the purchase
                          </div>
                          <Button className="bg-orange-500 hover:bg-orange-600">
                            <Wallet className="w-4 h-4 mr-2" />
                            Connect MetaMask
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => setStep('confirm')}
                >
                  Review Purchase
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Confirm Purchase</h3>
                
                <Card className="border-purple-500/30">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">NFT Price</span>
                      <span className="font-bold text-white">{nft.price} {nft.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform Fee (2.5%)</span>
                      <span className="text-white">{(nft.price * 0.025).toFixed(4)} {nft.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gas Fee</span>
                      <span className="text-white">0.001 ETH</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-white">Total</span>
                      <span className="font-bold text-green-400">{(nft.price * 1.025 + 0.001).toFixed(4)} {nft.currency}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secured by AuthiChain's escrow system</span>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setStep('details')}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Complete Purchase
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-400">Purchase Successful!</h3>
                <p className="text-gray-300">
                  Congratulations! You now own <strong>{nft.name}</strong>
                </p>
                <Card className="border-green-500/30 bg-green-500/10">
                  <CardContent className="p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Transaction ID</span>
                        <span className="font-mono text-green-400">0xabc123...def789</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Block Height</span>
                        <span className="text-green-400">#18,945,672</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={onClose}
                >
                  View in My Collection
                  <Crown className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Step 5: Error */}
            {step === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                  <X className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-red-400">Purchase Failed</h3>
                <p className="text-gray-300">{error}</p>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={resetFlow}
                  >
                    Try Again
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
