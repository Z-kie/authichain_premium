
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Target,
  Zap,
  Globe,
  Users,
  DollarSign,
  Award,
  Calendar
} from 'lucide-react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProductAnalyticsProps {
  user?: any;
}

export function ProductAnalytics({ user }: ProductAnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [timeframe, setTimeframe] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeframe]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(`/api/product/analytics?timeframe=${timeframe}`);
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else {
        setAnalyticsData(mockAnalyticsData);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setAnalyticsData(mockAnalyticsData);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analyticsData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <BarChart3 className="w-12 h-12 mx-auto animate-pulse text-blue-500" />
          <p>Loading Product Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Product Market Intelligence</h1>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  AI-Powered
                </Badge>
              </div>
              <p className="text-xl opacity-90">
                Real-time insights and market trends
              </p>
            </div>
            <div className="flex gap-2">
              {['7d', '30d', '90d', '1y'].map((period) => (
                <Badge
                  key={period}
                  variant={timeframe === period ? "secondary" : "outline"}
                  className={`cursor-pointer ${
                    timeframe === period 
                      ? 'bg-white text-blue-600' 
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                  onClick={() => setTimeframe(period)}
                >
                  {period}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {analyticsData.keyMetrics.map((metric: any, idx: number) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  {metric.change && (
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className="w-4 h-4" />
                      {metric.change}
                    </div>
                  )}
                </div>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
          <TabsTrigger value="items">Strain Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictions">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scan Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Scan Activity
                </CardTitle>
                <CardDescription>Daily package scans over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Bar data={analyticsData.scanActivity} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Strain Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Strain Distribution
                </CardTitle>
                <CardDescription>Breakdown by item types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Doughnut data={analyticsData.itemDistribution} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' as const } }
                  }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Strains */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Top Performing Strains
              </CardTitle>
              <CardDescription>Most scanned and valued items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topStrains.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {item.avgThc}% THC
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.scanCount} scans</p>
                      <p className="text-sm text-muted-foreground">
                        Avg: {item.avgPrice} ETH
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Market Price Trends
                </CardTitle>
                <CardDescription>Average NFT prices over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Line data={analyticsData.priceTrends} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Global Activity
                </CardTitle>
                <CardDescription>Scans by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.geographicData.map((region: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{region.region}</span>
                        <span className="font-medium">{region.scans} scans</span>
                      </div>
                      <Progress value={region.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          {/* Strain Performance Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Strain Performance Matrix</CardTitle>
              <CardDescription>Comprehensive analysis of item characteristics vs market performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analyticsData.itemAnalysis.map((analysis: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg border">
                    <h3 className="font-semibold mb-2">{analysis.category}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Market Share</span>
                        <span className="font-medium">{analysis.marketShare}%</span>
                      </div>
                      <Progress value={analysis.marketShare} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Avg Price</span>
                        <span className="font-medium">{analysis.avgPrice} ETH</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Growth</span>
                        <span className={`font-medium ${
                          analysis.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {analysis.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Collection Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Value</span>
                    <span className="font-bold">{analyticsData.performance.totalValue} ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Best Performer</span>
                    <span className="font-medium">{analyticsData.performance.bestPerformer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ROI</span>
                    <span className="font-medium text-green-600">
                      +{analyticsData.performance.roi}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rarity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.rarityDistribution.map((rarity: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{rarity.category}</span>
                        <span className="font-medium">{rarity.count} NFTs</span>
                      </div>
                      <Progress value={rarity.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      #{analyticsData.marketPosition.rank}
                    </p>
                    <p className="text-sm text-muted-foreground">Overall Ranking</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Percentile</span>
                      <span className="font-medium">{analyticsData.marketPosition.percentile}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Category</span>
                      <Badge variant="outline">{analyticsData.marketPosition.category}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          {/* AI Insights and Predictions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                AI Market Predictions
              </CardTitle>
              <CardDescription>Machine learning insights for the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analyticsData.predictions.map((prediction: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{prediction.title}</h3>
                        <p className="text-sm text-muted-foreground">{prediction.description}</p>
                      </div>
                      <Badge 
                        variant={prediction.confidence > 80 ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {prediction.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Impact</span>
                        <span className={`font-medium ${
                          prediction.impact === 'Positive' ? 'text-green-600' : 
                          prediction.impact === 'Negative' ? 'text-red-600' : 
                          'text-yellow-600'
                        }`}>
                          {prediction.impact}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Timeline</span>
                        <span className="font-medium">{prediction.timeline}</span>
                      </div>
                      
                      {prediction.recommendation && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">Recommendation:</p>
                          <p className="text-sm text-blue-700">{prediction.recommendation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Chart configuration
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

// Mock analytics data
const mockAnalyticsData = {
  keyMetrics: [
    {
      label: 'Total Scans',
      value: '2,847',
      change: '+12.5%',
      icon: Activity,
      color: 'text-blue-500'
    },
    {
      label: 'NFT Value',
      value: '15.23 ETH',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      label: 'Market Rank',
      value: '#156',
      change: '+23',
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      label: 'Unique Strains',
      value: '47',
      change: '+6',
      icon: Award,
      color: 'text-yellow-500'
    }
  ],
  scanActivity: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Scans',
        data: [12, 19, 25, 32, 28, 35, 42],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2
      }
    ]
  },
  itemDistribution: {
    labels: ['Indica', 'Sativa', 'Hybrid'],
    datasets: [
      {
        data: [35, 30, 35],
        backgroundColor: ['#8b5cf6', '#10b981', '#f59e0b'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  },
  priceTrends: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Avg Price (ETH)',
        data: [0.08, 0.12, 0.15, 0.18],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  },
  topStrains: [
    { name: 'Myles High', type: 'HYBRID', scanCount: 284, avgThc: 23.4, avgPrice: 0.125 },
    { name: 'Blue Sapphire', type: 'INDICA', scanCount: 192, avgThc: 19.8, avgPrice: 0.089 },
    { name: 'Ruby Collection', type: 'HYBRID', scanCount: 156, avgThc: 21.2, avgPrice: 0.095 },
    { name: 'Vintage Watch', type: 'HYBRID', scanCount: 134, avgThc: 22.1, avgPrice: 0.110 }
  ],
  geographicData: [
    { region: 'North America', scans: 1456, percentage: 51 },
    { region: 'Europe', scans: 892, percentage: 31 },
    { region: 'Asia Pacific', scans: 356, percentage: 12 },
    { region: 'Other', scans: 143, percentage: 6 }
  ],
  itemAnalysis: [
    { category: 'High THC (25%+)', marketShare: 15, avgPrice: 0.145, growth: '+18%' },
    { category: 'High CBD (10%+)', marketShare: 8, avgPrice: 0.125, growth: '+25%' },
    { category: 'Landrace Genetics', marketShare: 5, avgPrice: 0.180, growth: '+32%' },
    { category: 'Rare Terpenes', marketShare: 12, avgPrice: 0.135, growth: '+15%' },
    { category: 'Seasonal Harvest', marketShare: 20, avgPrice: 0.095, growth: '+8%' },
    { category: 'Craft Growers', marketShare: 25, avgPrice: 0.115, growth: '+12%' }
  ],
  performance: {
    totalValue: '15.23',
    bestPerformer: 'Myles High #001',
    roi: 156
  },
  rarityDistribution: [
    { category: 'Legendary', count: 2, percentage: 15 },
    { category: 'Epic', count: 5, percentage: 25 },
    { category: 'Rare', count: 12, percentage: 40 },
    { category: 'Common', count: 28, percentage: 60 }
  ],
  marketPosition: {
    rank: 156,
    percentile: 85,
    category: 'Top Collector'
  },
  predictions: [
    {
      title: 'High-THC Strains Price Surge',
      description: 'Strains with 25%+ THC content expected to increase 20-30% in value',
      confidence: 87,
      impact: 'Positive',
      timeline: '2-3 weeks',
      recommendation: 'Consider acquiring high-potency items before the surge'
    },
    {
      title: 'Indica Market Consolidation',
      description: 'Indica-dominant items may see temporary price volatility',
      confidence: 72,
      impact: 'Neutral',
      timeline: '1 month',
      recommendation: 'Hold current Indica positions, avoid new acquisitions'
    },
    {
      title: 'Craft Grower Renaissance',
      description: 'Small-batch craft growers gaining premium market traction',
      confidence: 94,
      impact: 'Positive',
      timeline: '6-8 weeks',
      recommendation: 'Prioritize verified craft grower collections'
    }
  ]
};
