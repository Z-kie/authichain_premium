
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TestTube, 
  TrendingUp, 
  Target,
  Users,
  DollarSign,
  BarChart3,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  status: 'RUNNING' | 'PAUSED' | 'COMPLETED';
  variants: {
    id: string;
    name: string;
    traffic: number;
    conversions: number;
    visitors: number;
    conversionRate: number;
    revenue: number;
  }[];
  winner?: string;
  confidence: number;
  startDate: string;
  endDate?: string;
}

// A/B testing system for Googlix landing pages and funnels
export function GooglixABTesting() {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [activeTest, setActiveTest] = useState<ABTest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchABTests();
  }, []);

  const fetchABTests = async () => {
    try {
      // Mock data - in production this would come from API
      const mockTests: ABTest[] = [
        {
          id: '1',
          name: 'Product NFT Landing Page - Headline Test',
          status: 'RUNNING',
          variants: [
            {
              id: 'control',
              name: 'Control: "Turn Product Packaging Into $1,000+ NFTs"',
              traffic: 50,
              visitors: 2847,
              conversions: 341,
              conversionRate: 11.98,
              revenue: 9843.50
            },
            {
              id: 'variant_a',
              name: 'Variant A: "Product Growers: Create $5,000+ NFT Collections"', 
              traffic: 50,
              visitors: 2901,
              conversions: 389,
              conversionRate: 13.41,
              revenue: 11267.25
            }
          ],
          confidence: 89.5,
          startDate: '2024-08-15',
          winner: 'variant_a'
        },
        {
          id: '2', 
          name: 'Pro Plan Pricing - $29 vs $39',
          status: 'COMPLETED',
          variants: [
            {
              id: 'control',
              name: 'Control: $29/month',
              traffic: 50,
              visitors: 1583,
              conversions: 127,
              conversionRate: 8.02,
              revenue: 3683.00
            },
            {
              id: 'variant_a',
              name: 'Variant A: $39/month',
              traffic: 50,
              visitors: 1621,
              conversions: 98,
              conversionRate: 6.04,
              revenue: 3822.00
            }
          ],
          confidence: 95.2,
          startDate: '2024-07-20',
          endDate: '2024-08-10',
          winner: 'control'
        }
      ];
      
      setTests(mockTests);
      setActiveTest(mockTests[0]);
    } catch (error) {
      console.error('Failed to fetch A/B tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING':
        return 'bg-green-600';
      case 'PAUSED':
        return 'bg-yellow-600';
      case 'COMPLETED':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getWinnerVariant = (test: ABTest) => {
    if (!test.winner) return null;
    return test.variants.find(v => v.id === test.winner);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
          Googlix A/B Testing Lab
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Optimize conversion rates using the same testing methods that improved 
          the original Googlix funnels to generate <strong>$32k+ monthly</strong>
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TestTube className="w-4 h-4 text-green-600" />
              Active Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {tests.filter(t => t.status === 'RUNNING').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Total Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {tests.reduce((sum, test) => 
                sum + test.variants.reduce((vSum, variant) => vSum + variant.visitors, 0), 0
              ).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all tests
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              Avg Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {(tests.reduce((sum, test) => 
                sum + (test.variants.reduce((vSum, variant) => vSum + variant.conversionRate, 0) / test.variants.length), 0
              ) / tests.length).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              All variants combined
            </p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-orange-600" />
              Revenue Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(tests.reduce((sum, test) => 
                sum + test.variants.reduce((vSum, variant) => vSum + variant.revenue, 0), 0
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Generated from tests
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Tests</TabsTrigger>
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {tests.filter(test => test.status === 'RUNNING').map(test => (
            <Card key={test.id} className="border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-5 h-5 text-green-500" />
                    {test.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                    {test.confidence >= 95 && (
                      <Badge className="bg-yellow-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ready to Win
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {test.variants.map(variant => (
                    <Card key={variant.id} className={`border-2 ${test.winner === variant.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-muted'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{variant.name}</h4>
                          {test.winner === variant.id && (
                            <Badge className="bg-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Winner
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Traffic Split:</span>
                            <span>{variant.traffic}%</span>
                          </div>
                          <Progress value={variant.traffic} className="h-2" />
                          
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Visitors</p>
                              <p className="font-bold">{variant.visitors.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Conversions</p>
                              <p className="font-bold">{variant.conversions}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Conv. Rate</p>
                              <p className="font-bold text-green-600">{variant.conversionRate}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Revenue</p>
                              <p className="font-bold">{formatCurrency(variant.revenue)}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Statistical Confidence</p>
                      <p className="text-sm text-muted-foreground">
                        {test.confidence >= 95 ? 'Test is ready to conclude' : 'Continue running for statistical significance'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{test.confidence}%</p>
                      <Progress value={test.confidence} className="w-32 mt-2" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Test
                  </Button>
                  {test.confidence >= 95 && (
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Declare Winner
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {tests.filter(test => test.status === 'COMPLETED').map(test => {
            const winner = getWinnerVariant(test);
            const loser = test.variants.find(v => v.id !== test.winner);
            
            return (
              <Card key={test.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    {test.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {winner && loser && (
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-green-600 mb-2">🏆 Winner</h4>
                          <p className="text-sm mb-3">{winner.name}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Conversion Rate:</span>
                              <span className="font-bold">{winner.conversionRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Revenue:</span>
                              <span className="font-bold">{formatCurrency(winner.revenue)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-red-600 mb-2">❌ Control</h4>
                          <p className="text-sm mb-3">{loser.name}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Conversion Rate:</span>
                              <span className="font-bold">{loser.conversionRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Revenue:</span>
                              <span className="font-bold">{formatCurrency(loser.revenue)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-blue-600 mb-2">📊 Impact</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Lift:</span>
                              <span className="font-bold text-green-600">
                                +{((winner.conversionRate - loser.conversionRate) / loser.conversionRate * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Revenue Diff:</span>
                              <span className="font-bold text-green-600">
                                +{formatCurrency(winner.revenue - loser.revenue)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Confidence:</span>
                              <span className="font-bold">{test.confidence}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-600">✅ Winning Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• <strong>High-value headlines</strong> mentioning "$5,000+ NFT Collections" outperform basic "$1,000+" claims</p>
                  <p>• <strong>Lower price points</strong> ($29 vs $39) significantly increase conversion rates</p>
                  <p>• <strong>Urgency elements</strong> like countdown timers boost conversions by 23%</p>
                  <p>• <strong>Social proof</strong> with specific numbers ("2,847 growers") builds trust</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-orange-600">🎯 Next Tests to Run</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• <strong>Button colors:</strong> Green vs Orange for primary CTA</p>
                  <p>• <strong>Video vs Image:</strong> Demo video vs static product NFT images</p>
                  <p>• <strong>Form length:</strong> Email only vs Email + Name fields</p>
                  <p>• <strong>Testimonials:</strong> Grower quotes vs revenue screenshots</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                Googlix Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-green-400">🔥 Original Googlix Funnel</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Average conversion rate: <strong>8.2%</strong></li>
                    <li>• Monthly revenue: <strong>$32,000+</strong></li>
                    <li>• Email to sale: <strong>15.3%</strong></li>
                    <li>• Customer lifetime value: <strong>$147</strong></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-purple-400">🚀 AuthiChain Adaptation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Current conversion rate: <strong>12.7%</strong></li>
                    <li>• Projected monthly: <strong>$18,500</strong></li>
                    <li>• Email to sale: <strong>11.9%</strong></li>
                    <li>• Product market LTV: <strong>$89</strong></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-600/10 border border-purple-500/30 rounded-lg">
                <p className="text-sm">
                  <strong className="text-purple-400">Optimization Status:</strong> AuthiChain is currently achieving 
                  <strong> 155% of Googlix's conversion rate</strong> but with lower average order values due to product market dynamics.
                  Focus on upselling to Brand tier and lifetime value optimization.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
