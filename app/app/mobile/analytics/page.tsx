
'use client';

import { MobileAnalytics } from '@/components/mobile/mobile-analytics';

export default function MobileAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
            📊 Mobile Analytics
          </h1>
          <p className="text-gray-300">
            Product NFT performance insights and market analytics on-the-go
          </p>
        </div>

        <MobileAnalytics />
      </div>
    </div>
  );
}
