

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard,
  Smartphone,
  Bitcoin,
  DollarSign,
  Shield,
  Zap,
  Globe,
  Lock,
  CheckCircle,
  AlertCircle,
  Clock,
  Wallet,
  QrCode,
  Apple,
  Chrome
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'crypto' | 'mobile' | 'digital_wallet';
  icon: any;
  fees: number;
  processing_time: string;
  currencies: string[];
  mobile_optimized: boolean;
  product_friendly: boolean;
}

interface PaymentData {
  amount: number;
  currency: string;
  method: string;
  item_type: 'nft' | 'subscription' | 'enterprise';
  item_id: string;
  escrow: boolean;
}

export function PaymentGateway({ 
  amount, 
  currency = 'USD',
  itemType = 'nft',
  itemId = '',
  onPaymentSuccess,
  onPaymentError 
}: {
  amount: number;
  currency?: string;
  itemType?: 'nft' | 'subscription' | 'enterprise';
  itemId?: string;
  onPaymentSuccess?: (result: any) => void;
  onPaymentError?: (error: any) => void;
}) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'method' | 'details' | 'confirm' | 'processing' | 'complete'>('method');
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount,
    currency,
    method: '',
    item_type: itemType,
    item_id: itemId,
    escrow: itemType === 'nft'
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'stripe_card',
      name: 'Credit/Debit Card',
      type: 'card',
      icon: CreditCard,
      fees: 2.9,
      processing_time: 'Instant',
      currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      mobile_optimized: true,
      product_friendly: true
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      type: 'mobile',
      icon: Apple,
      fees: 2.9,
      processing_time: 'Instant',
      currencies: ['USD', 'EUR', 'GBP', 'CAD'],
      mobile_optimized: true,
      product_friendly: true
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      type: 'mobile',
      icon: Chrome,
      fees: 2.9,
      processing_time: 'Instant',
      currencies: ['USD', 'EUR', 'GBP', 'CAD'],
      mobile_optimized: true,
      product_friendly: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'digital_wallet',
      icon: Globe,
      fees: 3.5,
      processing_time: 'Instant',
      currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
      mobile_optimized: true,
      product_friendly: false
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin (BTC)',
      type: 'crypto',
      icon: Bitcoin,
      fees: 1.5,
      processing_time: '10-30 minutes',
      currencies: ['BTC'],
      mobile_optimized: true,
      product_friendly: true
    },
    {
      id: 'ethereum',
      name: 'Ethereum (ETH)',
      type: 'crypto',
      icon: Zap,
      fees: 2.0,
      processing_time: '2-5 minutes',
      currencies: ['ETH'],
      mobile_optimized: true,
      product_friendly: true
    },
    {
      id: 'usdc',
      name: 'USD Coin (USDC)',
      type: 'crypto',
      icon: DollarSign,
      fees: 1.0,
      processing_time: '1-2 minutes',
      currencies: ['USDC'],
      mobile_optimized: true,
      product_friendly: true
    }
  ];

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentData(prev => ({ ...prev, method: method.id }));
    setCurrentStep('details');
  };

  const handlePaymentSubmit = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    setCurrentStep('processing');

    try {
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();

      if (result.success) {
        setCurrentStep('complete');
        onPaymentSuccess?.(result);
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError?.(error);
      setCurrentStep('details');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'BTC') return `${(amount / 50000).toFixed(6)} BTC`;
    if (currency === 'ETH') return `${(amount / 3000).toFixed(4)} ETH`;
    if (currency === 'USDC') return `${amount.toFixed(2)} USDC`;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getStepColor = (step: string) => {
    if (currentStep === step) return 'text-green-400 border-green-500';
    if (['details', 'confirm', 'processing', 'complete'].includes(currentStep) && step === 'method') return 'text-green-400 border-green-500';
    if (['confirm', 'processing', 'complete'].includes(currentStep) && step === 'details') return 'text-green-400 border-green-500';
    if (['processing', 'complete'].includes(currentStep) && step === 'confirm') return 'text-green-400 border-green-500';
    return 'text-gray-400 border-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Payment Progress */}
      <Card className="bg-black/20 border-gray-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${getStepColor('method')}`}>
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                {currentStep !== 'method' ? <CheckCircle className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-sm font-medium">Payment Method</span>
            </div>
            
            <div className={`flex items-center gap-2 ${getStepColor('details')}`}>
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                {['confirm', 'processing', 'complete'].includes(currentStep) ? <CheckCircle className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-sm font-medium">Payment Details</span>
            </div>
            
            <div className={`flex items-center gap-2 ${getStepColor('confirm')}`}>
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                {['processing', 'complete'].includes(currentStep) ? <CheckCircle className="w-4 h-4" /> : '3'}
              </div>
              <span className="text-sm font-medium">Confirm & Pay</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {/* Step 1: Payment Method Selection */}
        {currentStep === 'method' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Choose Payment Method
                </CardTitle>
                <div className="text-gray-300">
                  Select how you'd like to pay for your product NFT
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full p-6 h-auto justify-between border-gray-600 hover:border-green-500/30 hover:bg-green-900/10"
                          onClick={() => handleMethodSelect(method)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-800 rounded-lg">
                              <IconComponent className="w-6 h-6 text-green-400" />
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-white">{method.name}</div>
                              <div className="text-sm text-gray-400">
                                {method.fees}% fee • {method.processing_time}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {method.mobile_optimized && (
                              <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                                <Smartphone className="w-3 h-3 mr-1" />
                                Mobile
                              </Badge>
                            )}
                            {method.product_friendly && (
                              <Badge variant="outline" className="text-green-400 border-green-500/30">
                                <Shield className="w-3 h-3 mr-1" />
                                Product OK
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
          </motion.div>
        )}

        {/* Step 2: Payment Details */}
        {currentStep === 'details' && selectedMethod && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  {React.createElement(selectedMethod.icon, { className: "w-5 h-5 text-green-400" })}
                  {selectedMethod.name} Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedMethod.type === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number" className="text-white">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="bg-slate-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-white">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="bg-slate-800 border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-white">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="bg-slate-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="name" className="text-white">Cardholder Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="bg-slate-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                )}

                {selectedMethod.type === 'crypto' && (
                  <div className="space-y-4">
                    <div className="p-6 bg-slate-800/30 rounded-lg border border-gray-700 text-center">
                      <div className="w-32 h-32 mx-auto bg-white p-4 rounded-lg mb-4">
                        <QrCode className="w-full h-full text-black" />
                      </div>
                      <div className="text-white font-medium mb-2">
                        Send {formatAmount(amount, selectedMethod.currencies[0])}
                      </div>
                      <div className="text-sm text-gray-400 mb-4">
                        To the address below or scan QR code
                      </div>
                      <div className="p-3 bg-gray-900 rounded border border-gray-600 font-mono text-xs text-green-400 break-all">
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-yellow-200">
                          <div className="font-medium mb-1">Important:</div>
                          <ul className="space-y-1 text-xs">
                            <li>• Send exact amount to avoid payment delays</li>
                            <li>• Transactions are irreversible</li>
                            <li>• Network fees apply (not included in amount)</li>
                            <li>• Processing time: {selectedMethod.processing_time}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(selectedMethod.type === 'mobile' || selectedMethod.type === 'digital_wallet') && (
                  <div className="space-y-4">
                    <div className="p-6 bg-slate-800/30 rounded-lg border border-gray-700 text-center">
                      <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                        {React.createElement(selectedMethod.icon, { className: "w-8 h-8 text-green-400" })}
                      </div>
                      <div className="text-white font-medium mb-2">
                        {selectedMethod.name} Payment
                      </div>
                      <div className="text-sm text-gray-400 mb-4">
                        You'll be redirected to complete your payment securely
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {formatAmount(amount, currency)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('method')}
                    className="border-gray-600 hover:bg-gray-800"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep('confirm')}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 'confirm' && selectedMethod && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Confirm Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-slate-800/30 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Payment Method:</span>
                    <div className="flex items-center gap-2">
                      {React.createElement(selectedMethod.icon, { className: "w-4 h-4 text-green-400" })}
                      <span className="text-white font-medium">{selectedMethod.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white font-bold text-xl">
                      {formatAmount(amount, currency)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Processing Fee:</span>
                    <span className="text-white">
                      {formatAmount(amount * (selectedMethod.fees / 100), currency)}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Total:</span>
                      <span className="text-white font-bold text-2xl">
                        {formatAmount(amount * (1 + selectedMethod.fees / 100), currency)}
                      </span>
                    </div>
                  </div>
                </div>

                {itemType === 'nft' && (
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-200">
                        <div className="font-medium mb-1">Secure Escrow Protection</div>
                        <p>Your payment is held in secure escrow until the product NFT is transferred to your wallet. This ensures safe and verified transactions.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('details')}
                    className="border-gray-600 hover:bg-gray-800"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-4 h-4 mr-2"
                        >
                          <Zap className="w-4 h-4" />
                        </motion.div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Payment
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Processing */}
        {currentStep === 'processing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-black/20 border-gray-700">
              <CardContent className="py-12 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 mx-auto mb-6"
                >
                  <div className="w-full h-full border-4 border-green-500/30 border-t-green-400 rounded-full"></div>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">Processing Payment</h3>
                <p className="text-gray-300 mb-6">
                  Please wait while we securely process your product NFT payment...
                </p>
                <div className="text-sm text-gray-400">
                  This may take up to {selectedMethod?.processing_time.toLowerCase()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 5: Complete */}
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-green-300 mb-6">
                  Your product NFT payment has been processed successfully.
                </p>
                <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/30 mb-6">
                  <div className="text-sm text-green-200">
                    <div className="font-medium mb-2">Transaction Complete</div>
                    <div>Amount: {formatAmount(amount, currency)}</div>
                    <div>Method: {selectedMethod?.name}</div>
                    <div>Status: Confirmed</div>
                  </div>
                </div>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Continue to Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
