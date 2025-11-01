
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AutomationDashboard } from '@/components/automation/automation-dashboard';
import { EmailSequences } from '@/components/automation/email-sequences';
import { SocialMediaAutomation } from '@/components/automation/social-media-automation';
import { ConversionOptimization } from '@/components/automation/conversion-optimization';

export default function AutomationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
            🤖 AuthiChain AI Automation Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            AI-powered automation systems for enterprise client acquisition, email marketing, 
            social media management, and conversion optimization running 24/7.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto">
            <TabsTrigger value="dashboard" onClick={() => {/* Dashboard tab */}}>🤖 Automation Hub</TabsTrigger>
            <TabsTrigger value="email" onClick={() => {/* Email tab */}}>📧 Email Sequences</TabsTrigger>
            <TabsTrigger value="social" onClick={() => {/* Social tab */}}>📱 Social Media</TabsTrigger>
            <TabsTrigger value="conversion" onClick={() => {/* Conversion tab */}}>📈 Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="container max-w-6xl mx-auto">
            <AutomationDashboard />
          </TabsContent>

          <TabsContent value="email" className="container max-w-6xl mx-auto">
            <EmailSequences />
          </TabsContent>

          <TabsContent value="social" className="container max-w-6xl mx-auto">
            <SocialMediaAutomation />
          </TabsContent>

          <TabsContent value="conversion" className="container max-w-6xl mx-auto">
            <ConversionOptimization />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
