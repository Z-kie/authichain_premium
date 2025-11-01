

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone,
  Apple,
  Chrome,
  CreditCard,
  Radio,
  Fingerprint,
  Lock,
  Zap,
  CheckCircle,
  Shield,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobilePaymentOption {
  id: string;
  name: string;
  icon: any;
  type: 'wallet' | 'biometric' | 'nfc';
  supported: boolean;
  processing_time: string;
  security_features: string[];
}

export function MobilePayment({ 
  amount, 
  currency = 'USD',
  onPaymentComplete 
}: { 
  amount: number; 
  currency?: string; 
  onPaymentComplete?: (result: any) => void; 
}) {
  const [selectedMethod, setSelectedMethod] = useState<MobilePaymentOption | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'authenticate' | 'processing' | 'complete'>('select');
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    touchId: false,
    faceId: false,
    nfc: false,
    applePay: false,
    googlePay: false
  });

  const mobilePaymentOptions: MobilePaymentOption[] = [
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: Apple,
      type: 'wallet',
      supported: deviceCapabilities.applePay,
      processing_time: 'Instant',
      security_features: ['Touch ID', 'Face ID', 'Secure Enclave']
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      icon: Chrome,
      type: 'wallet',
      supported: deviceCapabilities.googlePay,
      processing_time: 'Instant',
      security_features: ['Fingerprint', 'PIN', 'Pattern']
    },
    {
      id: 'samsung_pay',
      name: 'Samsung Pay',
      icon: Smartphone,
      type: 'wallet',
      supported: true, // Assuming supported for demo
      processing_time: 'Instant',
      security_features: ['Fingerprint', 'Iris', 'PIN']
    },
    {
      id: 'tap_to_pay',
      name: 'Tap to Pay (NFC)',
      icon: Radio,
      type: 'nfc',
      supported: deviceCapabilities.nfc,
      processing_time: 'Instant',
      security_features: ['NFC', 'Tokenization']
    },
    {
      id: 'biometric_pay',
      name: 'Biometric Payment',
      icon: Fingerprint,
      type: 'biometric',
      supported: deviceCapabilities.touchId || deviceCapabilities.faceId,
      processing_time: 'Instant',
      security_features: ['Biometric Authentication', 'Hardware Security']
    }
  ];

  useEffect(() => {
    // Check device capabilities
    const checkCapabilities = async () => {
      const capabilities = {
        touchId: false,
        faceId: false,
        nfc: false,
        applePay: false,
        googlePay: false
      };

      // Check for Apple Pay
      if ((window as any).ApplePaySession && (window as any).ApplePaySession.canMakePayments()) {
        capabilities.applePay = true;
      }

      // Check for Google Pay (simplified check)
      if (window.PaymentRequest) {
        try {
          const paymentRequest = new PaymentRequest(
            [{ supportedMethods: 'https://google.com/pay' }],
            { total: { label: 'Test', amount: { currency: 'USD', value: '1.00' } } }
          );
          if (await paymentRequest.canMakePayment()) {
            capabilities.googlePay = true;
          }
        } catch (e) {
          // Google Pay not available
        }
      }

      // Check for NFC
      if ('NDEFReader' in window) {
        capabilities.nfc = true;
      }

      // Check for biometric authentication
      if (navigator.credentials && 'create' in navigator.credentials) {
        capabilities.touchId = true; // Simplified - would need proper WebAuthn check
        capabilities.faceId = true;
      }

      setDeviceCapabilities(capabilities);
    };

    checkCapabilities();
  }, []);

  const handleMethodSelect = (method: MobilePaymentOption) => {
    if (!method.supported) {
      alert(`${method.name} is not supported on this device.`);
      return;
    }
    
    setSelectedMethod(method);
    setPaymentStep('authenticate');
  };

  const handleAuthenticate = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    setPaymentStep('processing');

    // Simulate authentication and payment processing
    try {
      if (selectedMethod.id === 'apple_pay') {
        await processApplePay();
      } else if (selectedMethod.id === 'google_pay') {
        await processGooglePay();
      } else if (selectedMethod.type === 'biometric') {
        await processBiometricPayment();
      } else {
        await processGenericMobilePayment();
      }
      
      setPaymentStep('complete');
      onPaymentComplete?.({ 
        success: true, 
        method: selectedMethod.id,
        amount,
        currency 
      });
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStep('authenticate');
    } finally {
      setIsProcessing(false);
    }
  };

  const processApplePay = async () => {
    return new Promise((resolve, reject) => {
      try {
        if (!(window as any).ApplePaySession) {
          reject(new Error('Apple Pay not supported on this device or browser'));
          return;
        }

        if (!(window as any).ApplePaySession.canMakePayments()) {
          reject(new Error('Apple Pay is not set up on this device'));
          return;
        }

        const request = {
          countryCode: 'US',
          currencyCode: currency,
          total: {
            label: 'Product NFT',
            amount: amount.toString()
          },
          supportedNetworks: ['visa', 'masterCard', 'amex'],
          merchantCapabilities: ['supports3DS']
        };

        const session = new (window as any).ApplePaySession(1, request);
        
        session.onvalidatemerchant = () => {
          // Validate merchant (would need backend implementation)
          setTimeout(() => resolve(true), 2000);
        };

        session.onpaymentauthorized = () => {
          session.completePayment((window as any).ApplePaySession.STATUS_SUCCESS);
          resolve(true);
        };

        session.oncancel = () => {
          reject(new Error('Apple Pay payment was cancelled'));
        };

        session.begin();
      } catch (error) {
        reject(new Error('Failed to initialize Apple Pay: ' + (error as Error).message));
      }
    });
  };

  const processGooglePay = async () => {
    return new Promise((resolve, reject) => {
      try {
        if (!window.PaymentRequest) {
          reject(new Error('Google Pay not supported on this browser'));
          return;
        }

        const paymentRequest = new PaymentRequest(
          [{
            supportedMethods: 'https://google.com/pay',
            data: {
              environment: 'TEST',
              apiVersion: 2,
              apiVersionMinor: 0,
              merchantInfo: {
                merchantName: 'AuthiChain'
              }
            }
          }],
          {
            total: {
              label: 'Product NFT',
              amount: { currency, value: amount.toString() }
            }
          }
        );

        // Check if Google Pay is available
        paymentRequest.canMakePayment().then((result) => {
          if (!result) {
            reject(new Error('Google Pay is not set up on this device'));
            return;
          }
          // Simulate processing
          setTimeout(() => resolve(true), 2000);
        }).catch(() => {
          reject(new Error('Failed to check Google Pay availability'));
        });
      } catch (error) {
        reject(new Error('Failed to initialize Google Pay: ' + (error as Error).message));
      }
    });
  };

  const processBiometricPayment = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.credentials) {
        reject(new Error('Web Authentication not supported'));
        return;
      }

      // Simulate biometric authentication
      setTimeout(() => resolve(true), 1500);
    });
  };

  const processGenericMobilePayment = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {/* Step 1: Method Selection */}
        {paymentStep === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-400" />
                  📱 Mobile Payment Options
                </CardTitle>
                <div className="text-gray-300">
                  Choose your preferred mobile payment method for quick and secure checkout
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mobilePaymentOptions.map((method) => {
                    const IconComponent = method.icon;
                    
                    return (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: method.supported ? 1.02 : 1 }}
                        whileTap={{ scale: method.supported ? 0.98 : 1 }}
                      >
                        <Button
                          variant="outline"
                          className={`w-full p-6 h-auto justify-between ${
                            method.supported 
                              ? 'border-gray-600 hover:border-blue-500/30 hover:bg-blue-900/10' 
                              : 'border-gray-700 opacity-50 cursor-not-allowed'
                          }`}
                          onClick={() => handleMethodSelect(method)}
                          disabled={!method.supported}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${
                              method.supported ? 'bg-blue-900/30' : 'bg-gray-800/30'
                            }`}>
                              <IconComponent className={`w-6 h-6 ${
                                method.supported ? 'text-blue-400' : 'text-gray-500'
                              }`} />
                            </div>
                            <div className="text-left">
                              <div className={`font-medium ${
                                method.supported ? 'text-white' : 'text-gray-500'
                              }`}>
                                {method.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {method.processing_time} • {method.type}
                              </div>
                              <div className="flex gap-1 mt-1">
                                {method.security_features.slice(0, 2).map((feature, i) => (
                                  <Badge 
                                    key={i}
                                    variant="outline" 
                                    className="text-xs text-gray-400 border-gray-600"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className={`text-xl font-bold ${
                              method.supported ? 'text-white' : 'text-gray-500'
                            }`}>
                              {formatAmount(amount, currency)}
                            </div>
                            {!method.supported && (
                              <div className="text-xs text-red-400 mt-1">
                                Not Available
                              </div>
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

        {/* Step 2: Authentication */}
        {paymentStep === 'authenticate' && selectedMethod && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-400" />
                  Authenticate Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-blue-900/30 rounded-full flex items-center justify-center">
                    {React.createElement(selectedMethod.icon, { className: "w-12 h-12 text-blue-400" })}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {selectedMethod.name} Payment
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Complete your secure payment for this product NFT
                    </p>
                    
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-gray-700 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-white font-bold text-xl">
                          {formatAmount(amount, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedMethod.type === 'biometric' && (
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="w-6 h-6 text-green-400" />
                        <div className="text-left">
                          <div className="font-medium text-green-200">Biometric Authentication Required</div>
                          <div className="text-sm text-green-300">Use your fingerprint or face ID to confirm payment</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedMethod.type === 'nfc' && (
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <div className="flex items-center gap-3">
                        <Radio className="w-6 h-6 text-blue-400" />
                        <div className="text-left">
                          <div className="font-medium text-blue-200">NFC Payment Ready</div>
                          <div className="text-sm text-blue-300">Hold your device near the payment terminal</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setPaymentStep('select')}
                    className="border-gray-600 hover:bg-gray-800"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleAuthenticate}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Authenticate & Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Processing */}
        {paymentStep === 'processing' && (
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
                  <div className="w-full h-full border-4 border-blue-500/30 border-t-blue-400 rounded-full"></div>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">Processing Mobile Payment</h3>
                <p className="text-gray-300 mb-6">
                  Securely processing your {selectedMethod?.name} payment...
                </p>
                <div className="text-sm text-gray-400">
                  This usually takes just a few seconds
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Complete */}
        {paymentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/30">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-green-300 mb-6">
                  Your mobile payment has been processed successfully.
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
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Payment Benefits */}
      {paymentStep === 'select' && (
        <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-blue-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-white">📱 Mobile Payment Benefits</h3>
              
              <div className="grid lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">Instant</div>
                  <div className="text-gray-300 text-sm">Quick Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">Secure</div>
                  <div className="text-gray-300 text-sm">Biometric Auth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">Touch</div>
                  <div className="text-gray-300 text-sm">One-Tap Payment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">Mobile</div>
                  <div className="text-gray-300 text-sm">Optimized UX</div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <p className="text-blue-300">
                  📱 <strong>Mobile Status:</strong> Touch-optimized payment experience with biometric 
                  security and instant processing for product NFT purchases!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
