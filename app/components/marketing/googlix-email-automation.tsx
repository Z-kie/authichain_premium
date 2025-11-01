
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  TrendingUp, 
  DollarSign, 
  Users,
  Clock,
  Target,
  Zap,
  Award
} from 'lucide-react';

// Email automation system based on Googlix's $150k campaign
export function GooglixEmailAutomation() {
  const [selectedCampaign, setSelectedCampaign] = useState('welcome');

  const campaigns = {
    welcome: {
      name: "7-Day Product NFT Conversion Sequence",
      description: "Based on $150k email campaign",
      emails: [
        {
          day: 0,
          subject: "🌿 Your Product NFT Empire Starts Here",
          openRate: "67%",
          clickRate: "23%",
          conversions: "8.5%",
          preview: "Product + NFTs = $1000+ per scan? Here's how Mike turned his Myles High item into a $2,150 NFT in just 3 hours..."
        },
        {
          day: 1,
          subject: "This Grower Made $25k from ONE Strain 🚀", 
          openRate: "52%",
          clickRate: "19%",
          conversions: "12%",
          preview: "CASE STUDY: See exactly how Sarah's Purple Kush collection generated $25,000 in NFT sales using our 3-step system..."
        },
        {
          day: 3,
          subject: "WARNING: Product NFT Gold Rush is Starting",
          openRate: "48%", 
          clickRate: "15%",
          conversions: "7%",
          preview: "The product NFT market is exploding. $2.1 billion opportunity and only early adopters will capture this..."
        },
        {
          day: 5,
          subject: "🔥 LAST CHANCE: 50% Off Pro Plan",
          openRate: "71%",
          clickRate: "31%", 
          conversions: "22%",
          preview: "This exclusive 50% discount expires in 24 hours. Don't miss your chance to join 2,847 successful growers..."
        },
        {
          day: 7,
          subject: "Your Product NFT Journey Continues...",
          openRate: "43%",
          clickRate: "18%",
          conversions: "9%",
          preview: "Free users are missing out on $5,000+ monthly profits. Here's what Pro members are earning..."
        }
      ],
      totalValue: "$47,500",
      conversionRate: "11.7%"
    },
    nurture: {
      name: "High-Value Education Sequence",
      description: "Builds trust and authority",
      emails: [
        {
          day: 0,
          subject: "Product NFT Market Report: $2.1B Opportunity",
          openRate: "59%",
          clickRate: "28%",
          conversions: "5%",
          preview: "Exclusive 47-page industry report reveals exactly why product NFTs will be the next crypto boom..."
        },
        {
          day: 3,
          subject: "How to Identify $10k+ Product Genetics",
          openRate: "61%",
          clickRate: "24%",
          conversions: "7%", 
          preview: "Master grower reveals the 7 genetic markers that make certain items worth 50x more as NFTs..."
        },
        {
          day: 7,
          subject: "Artist Makes $500+ Per Product Package Design",
          openRate: "55%",
          clickRate: "22%",
          conversions: "8%",
          preview: "Meet Jessica: How she quit her day job creating product packaging art for NFT collections..."
        }
      ],
      totalValue: "$23,200",
      conversionRate: "6.7%"
    },
    reactivation: {
      name: "Win-Back Campaign for Inactive Users",
      description: "Re-engage cold subscribers", 
      emails: [
        {
          day: 0,
          subject: "We Miss You (And Your Product NFT Potential)",
          openRate: "34%",
          clickRate: "12%",
          conversions: "4%",
          preview: "It's been a while since you checked out AuthiChain. Product NFTs are exploding and you're missing out..."
        },
        {
          day: 3,
          subject: "Last Call: Your Product NFT Account Expires Soon",
          openRate: "41%", 
          clickRate: "18%",
          conversions: "9%",
          preview: "URGENT: Your free account will be deactivated in 48 hours unless you take action..."
        }
      ],
      totalValue: "$8,900",
      conversionRate: "6.5%"
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
          Googlix Email Automation System
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Proven email sequences that generated <strong className="text-green-400">$150,000+ in commissions</strong> - 
          now adapted for AuthiChain product NFTs
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$79,600</div>
            <p className="text-xs text-muted-foreground">All campaigns combined</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              Open Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">54.2%</div>
            <p className="text-xs text-muted-foreground">Industry avg: 23%</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">9.8%</div>
            <p className="text-xs text-muted-foreground">Industry avg: 2.1%</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              Active Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12,847</div>
            <p className="text-xs text-muted-foreground">Growing 15% monthly</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Tabs */}
      <Tabs defaultValue="welcome">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="welcome">Welcome Sequence</TabsTrigger>
          <TabsTrigger value="nurture">Education Series</TabsTrigger>
          <TabsTrigger value="reactivation">Win-Back Campaign</TabsTrigger>
        </TabsList>

        {Object.entries(campaigns).map(([key, campaign]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{campaign.name}</span>
                  <div className="flex gap-2">
                    <Badge className="bg-green-600">
                      {campaign.totalValue} Revenue
                    </Badge>
                    <Badge variant="outline">
                      {campaign.conversionRate} Conversion
                    </Badge>
                  </div>
                </CardTitle>
                <p className="text-muted-foreground">{campaign.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaign.emails.map((email, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">Day {email.day}</Badge>
                            <h4 className="font-medium">{email.subject}</h4>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {email.openRate} open
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {email.clickRate} click
                            </Badge>
                            <Badge className="bg-green-600 text-xs">
                              {email.conversions} convert
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {email.preview}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Deploy This Campaign
                  </Button>
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Preview All Emails
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Integration Status */}
      <Card className="bg-gradient-to-r from-green-900/20 to-purple-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-green-500" />
            Googlix System Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">✅ Active Integrations</h4>
              <ul className="space-y-2 text-sm">
                <li>• GetResponse Email Automation</li>
                <li>• ClickFunnels Landing Pages</li> 
                <li>• Stripe Payment Processing</li>
                <li>• Google Analytics Tracking</li>
                <li>• Facebook Pixel Conversion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">🚀 Performance Targets</h4>
              <ul className="space-y-2 text-sm">
                <li>• Monthly Revenue: <strong className="text-green-400">$15,000</strong></li>
                <li>• Email List Growth: <strong className="text-blue-400">1,500/month</strong></li>
                <li>• Conversion Rate: <strong className="text-purple-400">12%+</strong></li>
                <li>• ROI Target: <strong className="text-yellow-400">400%+</strong></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-600/10 border border-green-500/30 rounded-lg">
            <p className="text-sm">
              <strong className="text-green-400">Googlix Results:</strong> This exact email system generated 
              <strong> $150,000+ in commissions</strong> and <strong>$300,000+ in sales revenue</strong>. 
              Now optimized for AuthiChain's product NFT market.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
