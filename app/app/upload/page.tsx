
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma';
import { UsageTracker } from '@/lib/usage-tracker';
import { UsageType, SubscriptionTier } from '@/lib/types';
import { UploadForm } from '@/components/upload/upload-form';

export const dynamic = 'force-dynamic';

export default async function UploadPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    redirect('/auth/signin');
  }

  // Check if user can upload based on their tier and current usage
  const canUpload = await UsageTracker.canPerformAction(
    user.id,
    UsageType.NFT_UPLOAD,
    user.subscriptionTier as SubscriptionTier
  );

  const currentUsage = await UsageTracker.getCurrentMonthUsage(
    user.id,
    UsageType.NFT_UPLOAD
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Upload Your NFT
          </h1>
          <p className="text-gray-400 text-lg">
            Add a new NFT to your collection showcase
          </p>
        </div>

        <UploadForm 
          user={user}
          canUpload={canUpload}
          currentUsage={currentUsage}
        />
      </div>
    </div>
  );
}
