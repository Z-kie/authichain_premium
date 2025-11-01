
'use client';

import { EnterpriseDashboard } from '@/components/scaling/enterprise-dashboard';
import { WhiteLabelSolutions } from '@/components/scaling/white-label-solutions';
import { ApiMonetization } from '@/components/scaling/api-monetization';
import { AdvancedProductIntegrations } from '@/components/scaling/advanced-product-integrations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
            🚀 AuthiChain Enterprise Scaling Platform
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Scale your product NFT platform to $12M+ ARR with enterprise solutions, white-label licensing, 
            API monetization, and advanced industry integrations.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8" onValueChange={(value) => {
          // Handle enterprise tab change
          console.log('Enterprise tab changed to:', value);
        }}>
          <TabsList className="grid w-full grid-cols-5 max-w-4xl mx-auto">
            <TabsTrigger 
              value="overview"
              onClick={() => {
                // Handle overview tab click
                console.log('Enterprise Overview tab clicked');
              }}
            >
              🎯 Overview
            </TabsTrigger>
            <TabsTrigger 
              value="whitelabel"
              onClick={() => {
                // Handle whitelabel tab click
                console.log('White-label tab clicked');
              }}
            >
              🌐 White-Label
            </TabsTrigger>
            <TabsTrigger 
              value="api"
              onClick={() => {
                // Handle API tab click
                console.log('API tab clicked');
              }}
            >
              💻 API Platform
            </TabsTrigger>
            <TabsTrigger 
              value="integrations"
              onClick={() => {
                // Handle integrations tab click
                console.log('Integrations tab clicked');
              }}
            >
              🔗 Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="partnerships"
              onClick={() => {
                // Handle partnerships tab click
                console.log('Partnerships tab clicked');
              }}
            >
              🤝 Partners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="container max-w-6xl mx-auto">
            <EnterpriseDashboard />
          </TabsContent>

          <TabsContent value="whitelabel" className="container max-w-6xl mx-auto">
            <WhiteLabelSolutions />
          </TabsContent>

          <TabsContent value="api" className="container max-w-6xl mx-auto">
            <ApiMonetization />
          </TabsContent>

          <TabsContent value="integrations" className="container max-w-6xl mx-auto">
            <AdvancedProductIntegrations />
          </TabsContent>

          <TabsContent value="partnerships" className="container max-w-6xl mx-auto">
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-white mb-4">Partnership Program Coming Soon</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Strategic partnerships with major product brands, influencers, and technology companies 
                to expand the AuthiChain ecosystem and drive exponential growth.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
