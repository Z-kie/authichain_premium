

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Lightbulb,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketPrediction {
  id: string;
  item: string;
  current_price: number;
  predicted_price: number;
  change_percentage: number;
  confidence: number;
  timeframe: string;
  factors: string[];
  market_sentiment: 'bullish' | 'bearish' | 'neutral';
}

interface TrendAnalysis {
  id: string;
  category: string;
  trend: string;
  growth_rate: number;
  market_size: number;
  opportunity_score: number;
  risk_level: 'low' | 'medium' | 'high';
  recommendation: string;
}

interface CompetitorAnalysis {
  competitor: string;
  market_share: number;
  strengths: string[];
  weaknesses: string[];
  pricing_strategy: string;
  threat_level: 'low' | 'medium' | 'high';
}

export function AIMarketIntelligence() {
  const [selectedModel, setSelectedModel] = useState('price_prediction');
  const [timeHorizon, setTimeHorizon] = useState('30d');

  const marketPredictions: MarketPrediction[] = [
    {
      id: '1',
      item: 'Rare Diamond',
      current_price: 3450,
      predicted_price: 4890,
      change_percentage: 41.7,
      confidence: 89.4,
      timeframe: '30 days',
      factors: ['Medical legalization trends', 'Celebrity endorsements', 'Supply shortage'],
      market_sentiment: 'bullish'
    },
    {
      id: '2',
      item: 'Blue Sapphire',
      current_price: 2890,
      predicted_price: 3340,
      change_percentage: 15.6,
      confidence: 94.2,
      timeframe: '30 days',
      factors: ['Stable demand', 'Consistent quality', 'Brand recognition'],
      market_sentiment: 'bullish'
    },
    {
      id: '3',
      item: 'Vintage Watch',
      current_price: 3120,
      predicted_price: 2780,
      change_percentage: -10.9,
      confidence: 76.8,
      timeframe: '30 days',
      factors: ['Market saturation', 'New item alternatives', 'Price competition'],
      market_sentiment: 'bearish'
    },
    {
      id: '4',
      item: 'Ruby Collection',
      current_price: 2650,
      predicted_price: 3180,
      change_percentage: 20.0,
      confidence: 82.3,
      timeframe: '30 days',
      factors: ['West Coast demand', 'Tourism recovery', 'Limited supply'],
      market_sentiment: 'bullish'
    }
  ];

  const trendAnalyses: TrendAnalysis[] = [
    {
      id: '1',
      category: 'High CBD Strains',
      trend: 'Medical Product Boom',
      growth_rate: 156.7,
      market_size: 2400000,
      opportunity_score: 95,
      risk_level: 'low',
      recommendation: 'Immediately increase CBD item portfolio by 300%'
    },
    {
      id: '2',
      category: 'Indoor Cultivation',
      trend: 'Premium Quality Demand',
      growth_rate: 89.3,
      market_size: 1800000,
      opportunity_score: 87,
      risk_level: 'medium',
      recommendation: 'Focus on lab-verified indoor NFTs with quality certificates'
    },
    {
      id: '3',
      category: 'Rare Genetics',
      trend: 'Collector Market Surge',
      growth_rate: 234.5,
      market_size: 890000,
      opportunity_score: 92,
      risk_level: 'low',
      recommendation: 'Launch exclusive rare item auction platform'
    },
    {
      id: '4',
      category: 'Sustainable Product',
      trend: 'Eco-Conscious Consumers',
      growth_rate: 67.8,
      market_size: 1200000,
      opportunity_score: 78,
      risk_level: 'medium',
      recommendation: 'Develop carbon-neutral product NFT certification'
    }
  ];

  const competitorAnalysis: CompetitorAnalysis[] = [
    {
      competitor: 'CannaNFT',
      market_share: 23.4,
      strengths: ['First mover advantage', 'Large user base'],
      weaknesses: ['Limited item variety', 'Poor mobile experience'],
      pricing_strategy: 'Volume-based discounts',
      threat_level: 'high'
    },
    {
      competitor: 'WeedTokens',
      market_share: 15.7,
      strengths: ['Strong branding', 'Celebrity partnerships'],
      weaknesses: ['High fees', 'Technical issues'],
      pricing_strategy: 'Premium positioning',
      threat_level: 'medium'
    },
    {
      competitor: 'GreenChain',
      market_share: 12.3,
      strengths: ['Fast transactions', 'Low fees'],
      weaknesses: ['Limited features', 'Small community'],
      pricing_strategy: 'Cost leadership',
      threat_level: 'low'
    }
  ];

  const aiModels = [
    {
      id: 'price_prediction',
      name: 'Price Prediction Engine',
      accuracy: '94.2%',
      description: 'Predicts product NFT prices using 847 market variables'
    },
    {
      id: 'trend_analysis',
      name: 'Trend Analysis AI',
      accuracy: '87.9%',
      description: 'Identifies emerging product market trends and opportunities'
    },
    {
      id: 'sentiment_analysis',
      name: 'Market Sentiment AI',
      accuracy: '91.4%',
      description: 'Analyzes social media and news for product market sentiment'
    },
    {
      id: 'competitor_intel',
      name: 'Competitor Intelligence',
      accuracy: '89.7%',
      description: 'Monitors competitor activities and market positioning'
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-400 border-green-500/30';
      case 'bearish': return 'text-red-400 border-red-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'low': return 'border-green-500/30 bg-green-900/10';
      case 'medium': return 'border-yellow-500/30 bg-yellow-900/10';
      case 'high': return 'border-red-500/30 bg-red-900/10';
      default: return 'border-gray-500/30 bg-gray-900/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Intelligence Overview */}
      <Card className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 border border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            🧠 AI-Powered Product Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">94.2%</div>
              <div className="text-purple-400">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">847</div>
              <div className="text-blue-400">Data Variables</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-pink-400">Market Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$2.8M</div>
              <div className="text-green-400">Revenue Optimized</div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-64 bg-slate-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {aiModels.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name} ({model.accuracy})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={timeHorizon} onValueChange={setTimeHorizon}>
              <SelectTrigger className="w-48 bg-slate-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Market Predictions */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            AI Price Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {marketPredictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                className="p-6 bg-slate-800/30 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{prediction.item}</h3>
                  <Badge 
                    variant="outline" 
                    className={getSentimentColor(prediction.market_sentiment)}
                  >
                    {prediction.market_sentiment}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400">Current Price</div>
                    <div className="text-2xl font-bold text-white">
                      ${prediction.current_price.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Predicted Price</div>
                    <div className="text-2xl font-bold text-green-400">
                      ${prediction.predicted_price.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Change</span>
                    <span className={`font-bold ${
                      prediction.change_percentage > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {prediction.change_percentage > 0 ? '+' : ''}
                      {prediction.change_percentage}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.abs(prediction.change_percentage)} 
                    className={`h-2 ${
                      prediction.change_percentage > 0 ? '[&>div]:bg-green-400' : '[&>div]:bg-red-400'
                    }`}
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Confidence</span>
                    <span className="text-blue-400 font-bold">{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2 [&>div]:bg-blue-400" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Key Factors:</div>
                  {prediction.factors.map((factor, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{factor}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => alert(`${prediction.item} AI analysis activated! Detailed prediction model and trading recommendations provided.`)}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  View AI Analysis
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Market Trend Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {trendAnalyses.map((trend, index) => (
              <motion.div
                key={trend.id}
                className="p-6 bg-slate-800/30 rounded-lg border border-gray-700"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{trend.category}</h3>
                  <Badge 
                    variant="outline" 
                    className={`${getRiskColor(trend.risk_level)} border-opacity-30`}
                  >
                    {trend.risk_level} risk
                  </Badge>
                </div>
                
                <div className="text-lg text-blue-400 mb-3">{trend.trend}</div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      +{trend.growth_rate}%
                    </div>
                    <div className="text-xs text-gray-400">Growth Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      ${(trend.market_size / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-gray-400">Market Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {trend.opportunity_score}
                    </div>
                    <div className="text-xs text-gray-400">Opportunity</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Opportunity Score</div>
                  <Progress value={trend.opportunity_score} className="h-2 [&>div]:bg-yellow-400" />
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 mb-4">
                  <div className="text-sm text-blue-300">
                    <strong>AI Recommendation:</strong> {trend.recommendation}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  onClick={() => alert(`${trend.category} opportunity activated! Implementation roadmap and investment strategy provided.`)}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Execute Strategy
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            Competitor Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {competitorAnalysis.map((competitor, index) => (
              <motion.div
                key={competitor.competitor}
                className={`p-6 rounded-lg border ${getThreatColor(competitor.threat_level)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{competitor.competitor}</h3>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={`${getRiskColor(competitor.threat_level)} border-opacity-30`}
                    >
                      {competitor.threat_level} threat
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Market Share</div>
                      <div className="text-lg font-bold text-white">{competitor.market_share}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-green-400 font-medium mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {competitor.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-red-400 font-medium mb-2">Weaknesses</h4>
                    <ul className="space-y-1">
                      {competitor.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Strategy</h4>
                    <div className="text-sm text-gray-300">{competitor.pricing_strategy}</div>
                    <Button 
                      size="sm" 
                      className="mt-3 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      onClick={() => alert(`${competitor.competitor} competitive analysis activated! Counter-strategy and market positioning plan provided.`)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Counter-Strategy
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Intelligence Actions */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-16"
          onClick={() => alert('🧠 AI market intelligence SUPERCHARGED! Advanced neural networks analyzing 2,000+ product market variables.')}
        >
          <div className="text-center">
            <Brain className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Enhance AI</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-green-500/30 hover:bg-green-900/20"
          onClick={() => alert('🎯 Predictions ACTIVATED! AI models updated with latest market data for maximum accuracy.')}
        >
          <div className="text-center">
            <Target className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Update Predictions</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-blue-500/30 hover:bg-blue-900/20"
          onClick={() => alert('📊 Trend analysis BOOSTED! Real-time product market trend detection and opportunity identification.')}
        >
          <div className="text-center">
            <BarChart3 className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Analyze Trends</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-orange-500/30 hover:bg-orange-900/20"
          onClick={() => alert('⚡ Intelligence alerts ACTIVATED! Real-time notifications for product market opportunities and threats.')}
        >
          <div className="text-center">
            <Activity className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Smart Alerts</div>
          </div>
        </Button>
      </div>

      {/* AI Success Metrics */}
      <Card className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 border border-purple-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">🧠 AI Market Intelligence Success</h2>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">94.2%</div>
                <div className="text-gray-300">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">$2.8M</div>
                <div className="text-gray-300">Revenue Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">847</div>
                <div className="text-gray-300">Data Variables</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
              <p className="text-purple-300 text-lg">
                🧠 <strong>AI Intelligence Status:</strong> Advanced machine learning models are OPERATIONAL with 
                94.2% accuracy, monitoring 847 product market variables and optimizing $2.8M in revenue!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
