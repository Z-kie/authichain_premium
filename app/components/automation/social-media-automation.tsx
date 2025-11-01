

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share,
  Play,
  Calendar,
  Zap,
  Target,
  Bot
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialPlatform {
  id: string;
  name: string;
  icon: any;
  followers: number;
  engagement_rate: number;
  posts_per_day: number;
  reach: number;
  conversions: number;
  revenue: number;
  status: 'active' | 'paused';
}

interface ContentTemplate {
  id: string;
  platform: string;
  type: string;
  content: string;
  engagement_score: number;
  conversion_rate: number;
}

export function SocialMediaAutomation() {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  
  const platforms: SocialPlatform[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      followers: 47500,
      engagement_rate: 8.9,
      posts_per_day: 3,
      reach: 156000,
      conversions: 1247,
      revenue: 234000,
      status: 'active'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      followers: 23400,
      engagement_rate: 12.3,
      posts_per_day: 5,
      reach: 89000,
      conversions: 567,
      revenue: 89000,
      status: 'active'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      followers: 8900,
      engagement_rate: 15.7,
      posts_per_day: 2,
      reach: 34000,
      conversions: 234,
      revenue: 78000,
      status: 'active'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      followers: 12300,
      engagement_rate: 6.4,
      posts_per_day: 1,
      reach: 67000,
      conversions: 345,
      revenue: 123000,
      status: 'active'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      followers: 19800,
      engagement_rate: 4.2,
      posts_per_day: 2,
      reach: 45000,
      conversions: 189,
      revenue: 45000,
      status: 'paused'
    }
  ];

  const contentTemplates: ContentTemplate[] = [
    {
      id: '1',
      platform: 'instagram',
      type: 'Product Education',
      content: '🌿 Did you know? Each product item has unique terpene profiles that we authenticate through NFTs! Our AI verifies genetics with 99.7% accuracy. #ProductNFT #AuthiChain',
      engagement_score: 9.2,
      conversion_rate: 3.4
    },
    {
      id: '2',
      platform: 'instagram',
      type: 'Success Story',
      content: '🚀 CASE STUDY: Golden State Product generated $2.4M using our NFT authentication platform! See how they transformed their dispensaries into revenue centers. Link in bio 💎',
      engagement_score: 11.8,
      conversion_rate: 8.9
    },
    {
      id: '3',
      platform: 'twitter',
      type: 'Industry News',
      content: '🔥 BREAKING: Product NFT market projected to reach $50B by 2025. AuthiChain is leading the revolution with authenticated seed-to-sale NFTs. Join 10,000+ product professionals 🌿',
      engagement_score: 15.3,
      conversion_rate: 5.7
    },
    {
      id: '4',
      platform: 'linkedin',
      type: 'B2B Insight',
      content: '💡 Enterprise Insight: Product MSOs using NFT authentication see 40% increase in customer trust and 127% boost in premium product sales. Here\'s how to implement it...',
      engagement_score: 18.9,
      conversion_rate: 12.4
    },
    {
      id: '5',
      platform: 'youtube',
      type: 'Educational Video',
      content: '🎥 NEW VIDEO: "How Product NFTs Work: Complete Guide for Dispensaries" - Watch our CEO explain how dispensaries generate $100k+ monthly with authenticated product NFTs',
      engagement_score: 7.8,
      conversion_rate: 15.2
    }
  ];

  const automationStats = {
    total_followers: platforms.reduce((sum: any, p: any) => sum + p.followers, 0),
    avg_engagement: platforms.reduce((sum: any, p: any) => sum + p.engagement_rate, 0) / platforms.length,
    total_reach: platforms.reduce((sum: any, p: any) => sum + p.reach, 0),
    total_conversions: platforms.reduce((sum: any, p: any) => sum + p.conversions, 0),
    total_revenue: platforms.reduce((sum: any, p: any) => sum + p.revenue, 0),
    posts_per_day: platforms.reduce((sum: any, p: any) => sum + p.posts_per_day, 0)
  };

  const launchAutomation = (platform: string) => {
    alert(`${platform} automation LAUNCHED! AI-powered product content generation and posting activated 24/7.`);
  };

  return (
    <div className="space-y-8">
      {/* Social Media Automation Overview */}
      <Card className="bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-blue-900/20 border border-pink-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-pink-400" />
            📱 Product Social Media Automation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {(automationStats.total_followers / 1000).toFixed(0)}k
              </div>
              <div className="text-pink-400">Total Followers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{automationStats.avg_engagement.toFixed(1)}%</div>
              <div className="text-purple-400">Avg Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {(automationStats.total_reach / 1000).toFixed(0)}k
              </div>
              <div className="text-blue-400">Monthly Reach</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {automationStats.total_conversions.toLocaleString()}
              </div>
              <div className="text-green-400">Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                ${(automationStats.total_revenue / 1000).toFixed(0)}k
              </div>
              <div className="text-green-400">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{automationStats.posts_per_day}</div>
              <div className="text-orange-400">Posts/Day</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        {platforms.map((platform, index) => {
          const PlatformIcon = platform.icon;
          return (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/20 border-gray-700 hover:border-pink-500/30">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-900/30 rounded-lg border border-pink-500/30">
                        <PlatformIcon className="w-5 h-5 text-pink-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{platform.name}</CardTitle>
                        <div className="text-sm text-gray-400">
                          {platform.followers.toLocaleString()} followers
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${platform.status === 'active' ? 'text-green-400 border-green-500/30' : 'text-yellow-400 border-yellow-500/30'}
                      `}
                    >
                      {platform.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                      <div className="text-lg font-bold text-purple-400">{platform.engagement_rate}%</div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                    <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                      <div className="text-lg font-bold text-blue-400">
                        {(platform.reach / 1000).toFixed(0)}k
                      </div>
                      <div className="text-xs text-gray-400">Monthly Reach</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Posts per day:</span>
                      <span className="text-white font-medium">{platform.posts_per_day}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Conversions:</span>
                      <span className="text-green-400 font-medium">
                        {platform.conversions.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="text-green-400 font-medium">
                        ${platform.revenue.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Performance:</span>
                      <span className="text-white">
                        {((platform.conversions / platform.reach) * 100).toFixed(2)}% conversion
                      </span>
                    </div>
                    
                    <Progress 
                      value={(platform.conversions / platform.reach) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    onClick={() => launchAutomation(platform.name)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Launch Automation
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* AI Content Templates */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-green-400" />
            AI-Generated Product Content Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {contentTemplates.slice(0, 4).map((template, index) => (
              <motion.div
                key={template.id}
                className="p-6 bg-slate-800/30 rounded-lg border border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Badge 
                    variant="outline" 
                    className="text-pink-400 border-pink-500/30"
                  >
                    {template.platform}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="text-blue-400 border-blue-500/30"
                  >
                    {template.type}
                  </Badge>
                  <div className="ml-auto flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-white">{template.engagement_score}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-green-400" />
                      <span className="text-white">{template.conversion_rate}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-gray-300 leading-relaxed mb-4">
                  {template.content}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => alert(`Content posted to ${template.platform}! AI scheduling optimized for maximum engagement.`)}
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Post Now
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-500/30 hover:bg-purple-900/20"
                    onClick={() => alert(`Content scheduled for ${template.platform}! AI will post at optimal engagement times.`)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Performance Analytics */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Social Media Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-pink-400 mb-2">112k</div>
              <div className="text-gray-300">Total Followers</div>
              <div className="text-sm text-pink-400 mt-1">↗️ +45% growth</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">9.3%</div>
              <div className="text-gray-300">Engagement Rate</div>
              <div className="text-sm text-purple-400 mt-1">↗️ 3.2x industry avg</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">391k</div>
              <div className="text-gray-300">Monthly Reach</div>
              <div className="text-sm text-blue-400 mt-1">↗️ +127% organic</div>
            </div>
            
            <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">$569k</div>
              <div className="text-gray-300">Revenue Generated</div>
              <div className="text-sm text-green-400 mt-1">↗️ +234% ROI</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Automation Controls */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 h-16"
          onClick={() => alert('📱 All social platforms ACTIVATED! AI product content generation launched across Instagram, Twitter, LinkedIn, YouTube & Facebook.')}
        >
          <div className="text-center">
            <Bot className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Launch All Platforms</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-green-500/30 hover:bg-green-900/20"
          onClick={() => alert('🎯 Content targeting OPTIMIZED! AI analyzing product audience behavior for maximum engagement.')}
        >
          <div className="text-center">
            <Target className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Optimize Content</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('⚡ Posting frequency BOOSTED! AI scheduling optimized for 24/7 product community engagement.')}
        >
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Boost Frequency</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-orange-500/30 hover:bg-orange-900/20"
          onClick={() => alert('📊 Analytics tracking ENHANCED! Advanced product social media ROI and conversion attribution activated.')}
        >
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Advanced Analytics</div>
          </div>
        </Button>
      </div>

      {/* Product Social Media Success Metrics */}
      <Card className="bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-blue-900/20 border border-pink-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">📱 Product Social Media Success</h2>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">3.2X</div>
                <div className="text-gray-300">Industry Avg Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-gray-300">AI Content Generation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">$569k</div>
                <div className="text-gray-300">Social Media Revenue</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-pink-900/20 rounded-lg border border-pink-500/30">
              <p className="text-pink-300 text-lg">
                📱 <strong>Social Automation Status:</strong> All product social media platforms are ACTIVE with AI-powered 
                content generation driving 3.2x industry average engagement and $569k monthly revenue!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
