
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard,
  Smartphone,
  Bitcoin,
  Building2,
  Shield,
  Globe,
  Zap,
  TrendingUp,
  Users,
  Lock,
  CheckCircle,
  Star,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';

import { PaymentGateway } from '@/components/payments/payment-gateway';
import { CryptoPayment } from '@/components/payments/crypto-payment';
import { MobilePayment } from '@/components/payments/mobile-payment';
import { EnterpriseBilling } from '@/components/payments/enterprise-billing';
import { PaymentErrorBoundary } from '@/components/payments/payment-error-boundary';

export default function PaymentsPage() {
  const [activeDemo, setActiveDemo] = useState('gateway');
  const [demoAmount, setDemoAmount] = useState(2500);

  const paymentFeatures = [
    {
      icon: CreditCard,
      title: 'Multiple Payment Methods',
      description: 'Credit cards, debit cards, digital wallets, and banking integration',
      color: 'text-blue-400'
    },
    {
      icon: Bitcoin,
      title: 'Cryptocurrency Support',
      description: 'Bitcoin, Ethereum, USDC, and other major cryptocurrencies',
      color: 'text-orange-400'
    },
    {
      icon: Smartphone,
      title: 'Mobile-Optimized',
      description: 'Apple Pay, Google Pay, Touch ID, and biometric authentication',
      color: 'text-green-400'
    },
    {
      icon: Building2,
      title: 'Enterprise Billing',
      description: 'Custom invoicing, NET terms, bulk payments, and white-label solutions',
      color: 'text-purple-400'
    },
    {
      icon: Shield,
      title: 'Secure Escrow',
      description: 'Protected NFT transactions with automated escrow and release',
      color: 'text-red-400'
    },
    {
      icon: Globe,
      title: 'International Support',
      description: 'Multi-currency, regional payment methods, and compliance',
      color: 'text-teal-400'
    }
  ];

  const paymentStats = {
    total_processed: 15600000,
    transactions: 47892,
    success_rate: 98.7,
    avg_processing_time: 2.3,
    supported_currencies: 25,
    payment_methods: 12
  };

  const handlePaymentSuccess = (result: any) => {
    alert(`🎉 Payment successful! Transaction ID: ${result.transaction_id || 'demo_success'}`);
  };

  const handlePaymentError = (error: any) => {
    alert(`❌ Payment failed: ${error.message || 'Demo error'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 space-y-8">
        {/* Payments Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            💳 Advanced Payment Integration
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive payment solutions for product NFT marketplace with multiple payment methods, 
            cryptocurrency support, and enterprise-grade billing features
          </p>
        </div>

        {/* Payment Statistics */}
        <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-blue-500/30">
          <CardContent className="pt-6">
            <div className="grid lg:grid-cols-6 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">
                  ${(paymentStats.total_processed / 1000000).toFixed(1)}M
                </div>
                <div className="text-gray-300 text-sm">Total Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">
                  {paymentStats.transactions.toLocaleString()}
                </div>
                <div className="text-gray-300 text-sm">Transactions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">
                  {paymentStats.success_rate}%
                </div>
                <div className="text-gray-300 text-sm">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">
                  {paymentStats.avg_processing_time}s
                </div>
                <div className="text-gray-300 text-sm">Avg Processing</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-400">
                  {paymentStats.supported_currencies}
                </div>
                <div className="text-gray-300 text-sm">Currencies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">
                  {paymentStats.payment_methods}
                </div>
                <div className="text-gray-300 text-sm">Payment Methods</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Features Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {paymentFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/20 border-gray-700 hover:border-gray-600 transition-colors h-full">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gray-800/50 flex items-center justify-center`}>
                        <IconComponent className={`w-8 h-8 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Payment Demo Tabs */}
        <Card className="bg-black/20 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              🚀 Live Payment Integration Demo
            </CardTitle>
            <div className="text-gray-300">
              Experience our complete payment system with live demos of all payment methods
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeDemo} onValueChange={setActiveDemo}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="gateway" onClick={() => {/* Gateway demo */}}>💳 Payment Gateway</TabsTrigger>
                <TabsTrigger value="crypto" onClick={() => {/* Crypto demo */}}>₿ Cryptocurrency</TabsTrigger>
                <TabsTrigger value="mobile" onClick={() => {/* Mobile demo */}}>📱 Mobile Payments</TabsTrigger>
                <TabsTrigger value="enterprise" onClick={() => {/* Enterprise demo */}}>🏢 Enterprise Billing</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <div className="mb-6 p-4 bg-slate-800/30 rounded-lg border border-gray-700">
                  <h3 className="text-white font-medium mb-2">Demo Settings:</h3>
                  <div className="flex items-center gap-4">
                    <label className="text-gray-400 text-sm">Demo Amount:</label>
                    <div className="flex gap-2">
                      {[1000, 2500, 5000, 10000].map(amount => (
                        <Button
                          key={amount}
                          variant={demoAmount === amount ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDemoAmount(amount)}
                          className={demoAmount === amount 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "border-gray-600 hover:bg-gray-800"
                          }
                        >
                          ${amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <TabsContent value="gateway" className="space-y-6">
                  <PaymentErrorBoundary>
                    <PaymentGateway
                      amount={demoAmount}
                      currency="USD"
                      itemType="nft"
                      itemId="demo_nft_123"
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                    />
                  </PaymentErrorBoundary>
                </TabsContent>

                <TabsContent value="crypto" className="space-y-6">
                  <PaymentErrorBoundary>
                    <CryptoPayment
                      amount_usd={demoAmount}
                      onPaymentComplete={handlePaymentSuccess}
                    />
                  </PaymentErrorBoundary>
                </TabsContent>

                <TabsContent value="mobile" className="space-y-6">
                  <PaymentErrorBoundary>
                    <MobilePayment
                      amount={demoAmount}
                      currency="USD"
                      onPaymentComplete={handlePaymentSuccess}
                    />
                  </PaymentErrorBoundary>
                </TabsContent>

                <TabsContent value="enterprise" className="space-y-6">
                  <PaymentErrorBoundary>
                    <EnterpriseBilling />
                  </PaymentErrorBoundary>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Security & Compliance */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">PCI DSS Compliant</div>
                    <div className="text-green-300 text-sm">Level 1 PCI compliance for card processing</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Product Industry Friendly</div>
                    <div className="text-blue-300 text-sm">Specialized payment processing for product businesses</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">End-to-End Encryption</div>
                    <div className="text-purple-300 text-sm">256-bit SSL encryption for all transactions</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <div>
                    <div className="text-white font-medium">Fraud Protection</div>
                    <div className="text-orange-300 text-sm">Advanced AI-powered fraud detection</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Payment Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-gray-400">Card Payments</span>
                  <span className="text-white font-bold">67%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-gray-400">Cryptocurrency</span>
                  <span className="text-white font-bold">23%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-gray-400">Mobile Payments</span>
                  <span className="text-white font-bold">8%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-gray-400">Enterprise</span>
                  <span className="text-white font-bold">2%</span>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      ${(paymentStats.total_processed / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-gray-400 text-sm">Total Volume This Month</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Integration Benefits */}
        <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-white">💳 Complete Payment Ecosystem</h2>
              
              <div className="grid lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">12</div>
                  <div className="text-gray-300 text-sm">Payment Methods</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">25</div>
                  <div className="text-gray-300 text-sm">Currencies Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">98.7%</div>
                  <div className="text-gray-300 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">2.3s</div>
                  <div className="text-gray-300 text-sm">Avg Processing</div>
                </div>
              </div>
              
              <div className="p-6 bg-green-900/20 rounded-lg border border-green-500/30">
                <p className="text-green-300 text-lg">
                  💳 <strong>Advanced Payment Integration Active:</strong> Complete payment ecosystem supporting 
                  traditional payments, cryptocurrency, mobile wallets, and enterprise billing - all optimized 
                  for the product NFT industry with escrow protection and compliance features!
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <Badge variant="outline" className="text-green-400 border-green-500/30 px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Product Industry Approved
                </Badge>
                <Badge variant="outline" className="text-blue-400 border-blue-500/30 px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  PCI DSS Compliant
                </Badge>
                <Badge variant="outline" className="text-purple-400 border-purple-500/30 px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  Enterprise Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
