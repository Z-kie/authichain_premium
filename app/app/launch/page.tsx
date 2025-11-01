
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LaunchDashboard } from '@/components/enterprise/launch-dashboard';
import { EnterpriseClientTargeting } from '@/components/enterprise/client-targeting';
import { WhiteLabelLaunch } from '@/components/enterprise/white-label-launch';
import { ApiMarketplace } from '@/components/enterprise/api-marketplace';

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
            🚀 AuthiChain Enterprise Launch Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Launch your enterprise product NFT platform with targeted client acquisition, 
            white-label program activation, and API marketplace monetization.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto">
            <TabsTrigger value="dashboard" onClick={() => {/* Dashboard tab */}}>🚀 Launch Dashboard</TabsTrigger>
            <TabsTrigger value="clients" onClick={() => {/* Clients tab */}}>🎯 Enterprise Clients</TabsTrigger>
            <TabsTrigger value="whitelabel" onClick={() => {/* White-label tab */}}>🌐 White-Label</TabsTrigger>
            <TabsTrigger value="api" onClick={() => {/* API tab */}}>💻 API Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="container max-w-6xl mx-auto">
            <LaunchDashboard />
          </TabsContent>

          <TabsContent value="clients" className="container max-w-6xl mx-auto">
            <EnterpriseClientTargeting />
          </TabsContent>

          <TabsContent value="whitelabel" className="container max-w-6xl mx-auto">
            <WhiteLabelLaunch />
          </TabsContent>

          <TabsContent value="api" className="container max-w-6xl mx-auto">
            <ApiMarketplace />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
