export const dynamic = 'force-dynamic';


import { ReferralDashboard } from '@/components/dashboard/referral-dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Referral Dashboard | AuthiChain',
  description: 'Track your referrals and earn recurring commissions',
};

export default function ReferralsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Referral Dashboard</h1>
        <p className="text-gray-400">
          Share your link and earn 20-40% recurring commission on all referrals
        </p>
      </div>

      <ReferralDashboard />
    </div>
  );
}
