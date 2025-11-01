
'use client';

import { MobilePortfolio } from '@/components/mobile/mobile-portfolio';

export default function MobilePortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
            👤 My Product Portfolio
          </h1>
          <p className="text-gray-300">
            Manage your product NFT collection and track performance
          </p>
        </div>

        <MobilePortfolio />
      </div>
    </div>
  );
}
