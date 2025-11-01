
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Gift, 
  Download, 
  CheckCircle, 
  Mail,
  Star,
  Users,
  Target,
  BookOpen,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  value: string;
  downloadUrl: string;
  preview: string;
  icon: React.ReactNode;
  features: string[];
  campaign: string;
}

const leadMagnets: LeadMagnet[] = [
  {
    id: 'nft-success-guide',
    title: 'The NFT Creator\'s Success Guide 2025',
    description: 'Complete 30-page blueprint for launching profitable NFT collections',
    value: '$497',
    downloadUrl: '/lead-magnets/nft-success-guide-2025.pdf',
    preview: 'Get the exact framework used by creators earning $10,000+ monthly from NFTs',
    icon: <BookOpen className="h-6 w-6" />,
    features: [
      'NFT Market Research Templates',
      'Pricing Psychology Strategies',
      'Launch Campaign Checklists',
      'Community Building Tactics',
      'Revenue Optimization Tips'
    ],
    campaign: 'nft-success-guide'
  },
  {
    id: 'authentication-checklist',
    title: 'NFT Authentication Checklist',
    description: 'Essential checklist to verify authentic vs. fake NFTs and avoid scams',
    value: '$197',
    downloadUrl: '/lead-magnets/nft-authentication-checklist.pdf',
    preview: 'Protect yourself from NFT fraud with this comprehensive verification guide',
    icon: <Award className="h-6 w-6" />,
    features: [
      'Red Flag Identification',
      'Verification Tools List',
      'Smart Contract Analysis',
      'Creator Verification Steps',
      'Marketplace Safety Tips'
    ],
    campaign: 'authentication-guide'
  },
  {
    id: 'email-templates',
    title: 'NFT Marketing Email Templates',
    description: '25 high-converting email templates for NFT launches and promotions',
    value: '$297',
    downloadUrl: '/lead-magnets/nft-email-templates.zip',
    preview: 'Copy-paste email templates with 40%+ open rates and 12%+ conversions',
    icon: <Mail className="h-6 w-6" />,
    features: [
      'Launch Announcement Sequences',
      'Nurture Campaign Templates',
      'Promotional Email Scripts',
      'Re-engagement Campaigns',
      'VIP Member Communications'
    ],
    campaign: 'email-templates'
  },
  {
    id: 'pricing-calculator',
    title: 'NFT Pricing Calculator & Guide',
    description: 'Excel calculator plus guide to price your NFTs for maximum profit',
    value: '$197',
    downloadUrl: '/lead-magnets/nft-pricing-calculator.xlsx',
    preview: 'Scientific approach to NFT pricing based on market data and psychology',
    icon: <Target className="h-6 w-6" />,
    features: [
      'Dynamic Pricing Calculator',
      'Market Analysis Templates',
      'Rarity Scoring System',
      'Auction vs Fixed Price Guide',
      'Revenue Projection Tools'
    ],
    campaign: 'pricing-calculator'
  }
];

interface LeadMagnetFormProps {
  magnet: LeadMagnet;
  compact?: boolean;
}

export function LeadMagnetForm({ magnet, compact = false }: LeadMagnetFormProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const interestOptions = [
    'NFT Creation', 'Digital Art', 'Collecting', 'Investing', 'Trading', 
    'Authentication', 'Marketing', 'Community Building'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/marketing/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          interests,
          source: 'lead-magnet',
          campaign: magnet.campaign
        })
      });

      if (response.ok) {
        setSuccess(true);
        // In a real app, trigger download here
        window.open(magnet.downloadUrl, '_blank');
      } else {
        setError('Failed to process request. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4 p-6"
      >
        <div className="text-green-400 mb-4">
          <CheckCircle className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-2xl font-bold text-white">Success! Check Your Email</h3>
        <p className="text-gray-300">
          Your {magnet.title} should be downloading now. We've also sent you a copy via email 
          along with bonus resources.
        </p>
        <Alert className="bg-blue-900/20 border-blue-500/50">
          <Gift className="h-4 w-4" />
          <AlertDescription className="text-blue-200">
            <strong>Bonus:</strong> You've been added to our VIP list for early access to 
            launch specials and exclusive NFT creator resources.
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="text-blue-400 mr-3">
            {magnet.icon}
          </div>
          <div>
            <h3 className="font-bold text-white">{magnet.title}</h3>
            <p className="text-sm text-gray-400">{magnet.preview}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-700 border-slate-600 text-white"
          />
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`agree-${magnet.id}`}
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label htmlFor={`agree-${magnet.id}`} className="text-xs text-gray-400">
              I agree to receive marketing emails and understand I can unsubscribe anytime.
            </label>
          </div>

          <Button 
            type="submit" 
            disabled={!email || !agreed || loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Get Free {magnet.title.split(' ')[0]}
              </>
            )}
          </Button>

          {error && (
            <Alert className="bg-red-900/20 border-red-500/50">
              <AlertDescription className="text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="text-blue-400 mb-2 flex justify-center">
          {magnet.icon}
        </div>
        <CardTitle className="text-white">{magnet.title}</CardTitle>
        <p className="text-gray-400">{magnet.description}</p>
        <Badge className="bg-green-900/30 text-green-300 border-green-500/50 mx-auto">
          FREE - Usually {magnet.value}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">What You'll Get:</h4>
          <ul className="space-y-1">
            {magnet.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-300">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
            />
            
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Your NFT Interests (optional):
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest}`}
                    checked={interests.includes(interest)}
                    onCheckedChange={() => handleInterestToggle(interest)}
                  />
                  <label htmlFor={`interest-${interest}`} className="text-xs text-gray-400">
                    {interest}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`agree-full-${magnet.id}`}
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label htmlFor={`agree-full-${magnet.id}`} className="text-xs text-gray-400">
              I agree to receive marketing emails and understand I can unsubscribe anytime. 
              I also agree to the <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <Button 
            type="submit" 
            disabled={!email || !agreed || loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Get Your Free {magnet.title.split(' ')[0]} Guide
              </>
            )}
          </Button>

          {error && (
            <Alert className="bg-red-900/20 border-red-500/50">
              <AlertDescription className="text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </form>

        <p className="text-xs text-center text-gray-400">
          🔒 Your information is secure and will never be shared. Unsubscribe anytime.
        </p>
      </CardContent>
    </Card>
  );
}

export function LeadMagnetShowcase() {
  const [selectedMagnet, setSelectedMagnet] = useState<LeadMagnet>(leadMagnets[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
          🎁 Free NFT Success Resources
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Get instant access to our proven NFT success templates, guides, and tools. 
          Everything you need to launch and scale your NFT business.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lead Magnet Selection */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Choose Your Free Resource:</h2>
          <div className="grid gap-4">
            {leadMagnets.map((magnet, index) => (
              <motion.div
                key={magnet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedMagnet.id === magnet.id 
                    ? 'bg-blue-900/30 border-blue-500/50' 
                    : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
                }`}
                onClick={() => setSelectedMagnet(magnet)}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-blue-400 mt-1 flex-shrink-0">
                    {magnet.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">{magnet.title}</h3>
                      <Badge className="bg-green-900/30 text-green-300 border-green-500/50">
                        {magnet.value}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-2">{magnet.description}</p>
                    <p className="text-sm text-blue-300">{magnet.preview}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lead Capture Form */}
        <div className="lg:col-span-1">
          <LeadMagnetForm magnet={selectedMagnet} />
        </div>
      </div>

      {/* Social Proof */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Join 12,000+ NFT Creators Getting Results
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold text-green-400 mb-2">12,000+</div>
            <div className="text-white font-semibold mb-1">Downloads</div>
            <div className="text-sm text-gray-400">Creators using our resources</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400 mb-2">$2.8M+</div>
            <div className="text-white font-semibold mb-1">Revenue Generated</div>
            <div className="text-sm text-gray-400">By creators using our strategies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-2">94%</div>
            <div className="text-white font-semibold mb-1">Success Rate</div>
            <div className="text-sm text-gray-400">Creators who implement our guides</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
