export const dynamic = 'force-dynamic';


import { GoolixSubscriptionDashboard } from '@/components/dashboard/googlix-subscription-dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription Dashboard | AuthiChain',
  description: 'Manage your AuthiChain subscription, usage, and features',
};

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Subscription Dashboard</h1>
        <p className="text-gray-400">
          Manage your plan, track usage, and access your benefits
        </p>
      </div>

      <GoolixSubscriptionDashboard />
    </div>
  );
}
