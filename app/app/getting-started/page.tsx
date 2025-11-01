'use client';

import React, { useState } from 'react';
import { 
  Wallet, 
  CreditCard, 
  ImagePlus, 
  ShoppingBag, 
  Gavel,
  FolderOpen,
  Shield,
  TrendingUp,
  Play,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Check
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function GettingStartedPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const quickLinks = [
    { icon: Wallet, title: 'Connect Wallet', href: '/dashboard', color: 'bg-blue-500' },
    { icon: CreditCard, title: 'Choose Plan', href: '/pricing', color: 'bg-purple-500' },
    { icon: ImagePlus, title: 'Mint NFT', href: '/mint', color: 'bg-green-500' },
    { icon: ShoppingBag, title: 'Browse Market', href: '/marketplace', color: 'bg-pink-500' },
  ];

  const videoPlaceholders = [
    { title: 'Welcome to AuthiChain', duration: '2:30', thumbnail: '🎬' },
    { title: 'Connecting Your Wallet', duration: '3:15', thumbnail: '👛' },
    { title: 'Minting Your First NFT', duration: '5:45', thumbnail: '🎨' },
    { title: 'Using the Marketplace', duration: '4:20', thumbnail: '🛒' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Getting Started with AuthiChain</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Your complete guide to NFT authentication, minting, and trading. Let's get you
              started in minutes!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <link.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{link.title}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  Get started <ChevronRight className="h-4 w-4 ml-1" />
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="wallet" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="wallet" className="py-3">
              <Wallet className="h-4 w-4 mr-2" />
              Wallet Setup
            </TabsTrigger>
            <TabsTrigger value="subscription" className="py-3">
              <CreditCard className="h-4 w-4 mr-2" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="minting" className="py-3">
              <ImagePlus className="h-4 w-4 mr-2" />
              Minting NFTs
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="py-3">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="advanced" className="py-3">
              <TrendingUp className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Wallet Setup Tab */}
          <TabsContent value="wallet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-6 w-6" />
                  How to Connect Your Wallet
                </CardTitle>
                <CardDescription>
                  Connect your Web3 wallet to start using AuthiChain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Video Placeholder */}
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-12 text-center">
                  <div className="mb-4">
                    <Play className="h-16 w-16 mx-auto text-purple-600" />
                  </div>
                  <p className="text-lg font-semibold">Video Tutorial: Connecting Your Wallet</p>
                  <p className="text-sm text-gray-600 mt-2">Duration: 3:15</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Step-by-Step Guide</h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Install MetaMask</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Download and install the MetaMask browser extension from{' '}
                          <a
                            href="https://metamask.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline inline-flex items-center gap-1"
                          >
                            metamask.io
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </p>
                        <div className="bg-white p-3 rounded border">
                          <p className="text-xs text-gray-600">
                            💡 <strong>Tip:</strong> Keep your seed phrase safe and never share
                            it with anyone. AuthiChain will never ask for your seed phrase.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Create or Import Wallet</h4>
                        <p className="text-sm text-gray-600">
                          Follow MetaMask's setup wizard to create a new wallet or import an
                          existing one using your seed phrase.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Connect to AuthiChain</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Click the "Connect Wallet" button in the header or visit your dashboard
                          and select MetaMask when prompted.
                        </p>
                        <a
                          href="/dashboard"
                          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                        >
                          Connect Wallet Now
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Approve Connection</h4>
                        <p className="text-sm text-gray-600">
                          MetaMask will ask for permission to connect. Review the permissions and
                          click "Connect" to authorize AuthiChain.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supported Wallets */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4">Supported Wallets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl mb-2">🦊</div>
                      <h4 className="font-semibold">MetaMask</h4>
                      <p className="text-sm text-gray-600">Most popular Web3 wallet</p>
                    </div>
                    <div className="p-4 border rounded-lg opacity-60">
                      <div className="text-2xl mb-2">👛</div>
                      <h4 className="font-semibold">WalletConnect</h4>
                      <p className="text-sm text-gray-600">Coming soon</p>
                    </div>
                    <div className="p-4 border rounded-lg opacity-60">
                      <div className="text-2xl mb-2">🔐</div>
                      <h4 className="font-semibold">Coinbase Wallet</h4>
                      <p className="text-sm text-gray-600">Coming soon</p>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4">Common Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is a Web3 wallet?</AccordionTrigger>
                      <AccordionContent>
                        A Web3 wallet is a digital wallet that allows you to store, send, and
                        receive cryptocurrencies and interact with blockchain applications. It
                        gives you full control over your digital assets.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it safe to connect my wallet?</AccordionTrigger>
                      <AccordionContent>
                        Yes! AuthiChain only requests read permissions and the ability to propose
                        transactions. You always maintain full control and must approve every
                        transaction. Never share your seed phrase with anyone.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Do I need cryptocurrency to start?</AccordionTrigger>
                      <AccordionContent>
                        Not initially! You can browse and explore with just a connected wallet.
                        You'll need cryptocurrency (ETH) for blockchain transactions like minting
                        NFTs or making purchases.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Understanding Subscription Tiers
                </CardTitle>
                <CardDescription>
                  Choose the plan that fits your NFT creation and trading needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Basic Plan */}
                  <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">Basic</h3>
                      <div className="text-3xl font-bold text-purple-600 mt-2">
                        $29<span className="text-lg text-gray-600">/mo</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>10 NFT mints per month</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Basic analytics</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Standard support</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Marketplace access</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-600 mb-4">
                      Perfect for individuals starting their NFT journey
                    </p>
                  </div>

                  {/* Pro Plan */}
                  <div className="border-2 border-purple-600 rounded-xl p-6 relative hover:shadow-xl transition-shadow">
                    <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
                      POPULAR
                    </div>
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">Pro</h3>
                      <div className="text-3xl font-bold text-purple-600 mt-2">
                        $99<span className="text-lg text-gray-600">/mo</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Unlimited NFT mints</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Advanced analytics</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Custom collections</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Auction features</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>API access</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-600 mb-4">
                      Ideal for professional creators and collectors
                    </p>
                  </div>

                  {/* Enterprise Plan */}
                  <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">Enterprise</h3>
                      <div className="text-3xl font-bold text-purple-600 mt-2">
                        $299<span className="text-lg text-gray-600">/mo</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Everything in Pro</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>White-label solution</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Dedicated support</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Custom integrations</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>Advanced security</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>SLA guarantee</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-600 mb-4">
                      For businesses and large-scale operations
                    </p>
                  </div>
                </div>

                <div className="text-center pt-6 border-t">
                  <a
                    href="/pricing"
                    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg font-semibold"
                  >
                    View Full Pricing Details
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </a>
                </div>

                {/* Payment Methods */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4">Accepted Payment Methods</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-3xl mb-2">💳</div>
                      <p className="text-sm font-semibold">Credit Card</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-3xl mb-2">₿</div>
                      <p className="text-sm font-semibold">Bitcoin</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-3xl mb-2">Ξ</div>
                      <p className="text-sm font-semibold">Ethereum</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-3xl mb-2">💰</div>
                      <p className="text-sm font-semibold">USDC</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Minting Tab */}
          <TabsContent value="minting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImagePlus className="h-6 w-6" />
                  Minting Your First NFT
                </CardTitle>
                <CardDescription>
                  Create authenticated, IPFS-stored NFTs on AuthiChain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Video Placeholder */}
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-12 text-center">
                  <div className="mb-4">
                    <Play className="h-16 w-16 mx-auto text-green-600" />
                  </div>
                  <p className="text-lg font-semibold">Video Tutorial: Minting Your First NFT</p>
                  <p className="text-sm text-gray-600 mt-2">Duration: 5:45</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Minting Process</h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Prepare Your Digital Asset</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Choose your digital file (image, video, audio, or 3D model). Ensure it
                          meets quality standards and you own the rights to mint it.
                        </p>
                        <div className="bg-white p-3 rounded border">
                          <p className="text-xs text-gray-600 mb-2"><strong>Supported formats:</strong></p>
                          <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                            <li>Images: JPG, PNG, GIF, SVG (max 50MB)</li>
                            <li>Videos: MP4, WEBM (max 100MB)</li>
                            <li>Audio: MP3, WAV (max 50MB)</li>
                            <li>3D: GLB, GLTF (max 50MB)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Fill in NFT Details</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Provide comprehensive information about your NFT:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2 ml-4 list-disc">
                          <li><strong>Title:</strong> A clear, descriptive name</li>
                          <li><strong>Description:</strong> Tell the story behind your NFT</li>
                          <li><strong>Properties:</strong> Add attributes and metadata</li>
                          <li><strong>Collection:</strong> Assign to a collection (optional)</li>
                          <li><strong>Royalties:</strong> Set creator royalty percentage</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Upload to IPFS</h4>
                        <p className="text-sm text-gray-600">
                          Your file is automatically uploaded to IPFS (InterPlanetary File System)
                          for permanent, decentralized storage. This ensures your NFT will always
                          be accessible.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Confirm and Mint</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Review all details and click "Mint NFT". You'll need to confirm the
                          transaction in your wallet and pay the gas fee.
                        </p>
                        <a
                          href="/mint"
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          Start Minting
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4">Best Practices for Successful NFTs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">🎨 Quality Matters</h4>
                      <p className="text-sm text-gray-600">
                        Use high-resolution images and professional quality assets to attract
                        collectors.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold mb-2">📝 Tell Your Story</h4>
                      <p className="text-sm text-gray-600">
                        Write compelling descriptions that connect with potential buyers
                        emotionally.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold mb-2">🏷️ Use Keywords</h4>
                      <p className="text-sm text-gray-600">
                        Add relevant tags and properties to make your NFT easier to discover.
                      </p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-semibold mb-2">💰 Price Strategically</h4>
                      <p className="text-sm text-gray-600">
                        Research similar NFTs and price competitively, especially for your first
                        pieces.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  Using the Marketplace
                </CardTitle>
                <CardDescription>
                  Buy, sell, and discover authenticated NFTs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Buying NFTs */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Buying NFTs</h3>
                    <ol className="space-y-3 text-sm">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">1.</span>
                        <span>Browse the marketplace and find NFTs you like</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">2.</span>
                        <span>Click on an NFT to view details and verify authenticity</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">3.</span>
                        <span>Click "Buy Now" or "Place Bid" for auctions</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">4.</span>
                        <span>Confirm the transaction in your wallet</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">5.</span>
                        <span>The NFT is transferred to your wallet!</span>
                      </li>
                    </ol>
                  </div>

                  {/* Selling NFTs */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Selling NFTs</h3>
                    <ol className="space-y-3 text-sm">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">1.</span>
                        <span>Go to your dashboard and select the NFT to sell</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">2.</span>
                        <span>Click "List for Sale" and choose a price</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">3.</span>
                        <span>Set your listing type (fixed price or auction)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">4.</span>
                        <span>Confirm the listing transaction in your wallet</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-purple-600">5.</span>
                        <span>Your NFT is now live on the marketplace!</span>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Auction System */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Gavel className="h-5 w-5" />
                    Understanding Auctions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Creating an Auction</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Set a minimum bid (reserve price)</li>
                        <li>• Choose auction duration (1-30 days)</li>
                        <li>• Optionally set a "Buy Now" price</li>
                        <li>• Monitor bids in real-time</li>
                        <li>• Auction automatically closes at end time</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Placing Bids</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Bids must exceed current highest bid</li>
                        <li>• You'll be notified if outbid</li>
                        <li>• Winning bid auto-completes purchase</li>
                        <li>• Unsuccessful bids are refunded</li>
                        <li>• NFT transferred to winner automatically</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4">Finding the Right NFT</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Use our advanced search and filtering tools to discover NFTs:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 border rounded">
                      <p className="font-semibold text-sm">Category</p>
                      <p className="text-xs text-gray-600">Art, Music, Gaming, etc.</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold text-sm">Price Range</p>
                      <p className="text-xs text-gray-600">Set min/max price</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold text-sm">Status</p>
                      <p className="text-xs text-gray-600">Buy Now, On Auction</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold text-sm">Collections</p>
                      <p className="text-xs text-gray-600">Browse by collection</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Features Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Advanced Features
                </CardTitle>
                <CardDescription>
                  Take your NFT experience to the next level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Collections */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    Managing Collections
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Organize your NFTs into themed collections for better discoverability and
                    presentation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Create Collections</h4>
                      <p className="text-sm text-gray-600">
                        Group related NFTs together with custom branding and descriptions.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Collection Stats</h4>
                      <p className="text-sm text-gray-600">
                        Track floor price, volume, and holder statistics for your collections.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Featured Collections</h4>
                      <p className="text-sm text-gray-600">
                        Top collections get featured placement on the marketplace.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4">Analytics & Insights</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Pro and Enterprise subscribers get access to detailed analytics:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        View and engagement metrics
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Price history and trends
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Collector demographics
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Revenue tracking
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Market comparisons
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Performance reports
                      </li>
                    </ul>
                  </div>
                </div>

                {/* API Access */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4">API Integration</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Pro and Enterprise plans include API access for custom integrations:
                  </p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="mb-2"># Example API request</div>
                    <div>curl -X GET https://api.authichain.app/v1/nfts</div>
                    <div className="ml-4">-H "Authorization: Bearer YOUR_API_KEY"</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Visit the{' '}
                    <a href="/docs/api" className="text-purple-600 hover:underline">
                      API documentation
                    </a>{' '}
                    for full integration guides.
                  </p>
                </div>

                {/* White Label */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4">White-Label Solution</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Enterprise plan includes full white-label capabilities:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Custom domain and branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Remove AuthiChain branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Custom email templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Dedicated infrastructure</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Video Tutorials Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoPlaceholders.map((video, index) => (
              <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-40 flex items-center justify-center text-6xl">
                  {video.thumbnail}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{video.duration}</span>
                    <Play className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 border-t pt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
            <p className="text-lg text-gray-600">
              Our support team is here to help you succeed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:support@authichain.app"
              className="p-6 border rounded-lg hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-gray-600">support@authichain.app</p>
            </a>
            <a
              href="/docs"
              className="p-6 border rounded-lg hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">Full guides and references</p>
            </a>
            <a
              href="https://discord.gg/authichain"
              className="p-6 border rounded-lg hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-gray-600">Join our Discord server</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
