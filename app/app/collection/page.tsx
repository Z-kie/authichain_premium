
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma';
import { CollectionView } from '@/components/collection/collection-view';

export const dynamic = 'force-dynamic';

export default async function CollectionPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      nftUploads: {
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen p-4">
      <CollectionView user={user} nfts={user.nftUploads} />
    </div>
  );
}
