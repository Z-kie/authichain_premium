
'use client';

import { MobileMarketplace } from '@/components/mobile/mobile-marketplace';

export default function MobileMarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2">
            🛒 Mobile Marketplace
          </h1>
          <p className="text-gray-300">
            Browse and trade product NFTs with mobile-optimized interface
          </p>
        </div>

        <MobileMarketplace />
      </div>
    </div>
  );
}
