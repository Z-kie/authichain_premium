
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { db } from '@/lib/prisma';
import { DashboardContent } from '@/components/dashboard/dashboard-content';
import { ConsumerDashboard } from '@/components/dashboard/consumer-dashboard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  const user = await db.user.findUnique({
    where: { email: session.user?.email || '' },
    include: {
      subscriptions: {
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        take: 1
      },
      nftUploads: {
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      _count: {
        select: { nftUploads: { where: { status: 'ACTIVE' } } }
      }
    }
  });

  if (!user) {
    redirect('/auth/signin');
  }

  // Redirect admins to admin dashboard
  if (user.role === 'ADMIN') {
    redirect('/admin');
  }

  // Get current month usage for consumers
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const currentMonthUploads = await db.nftUpload.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: new Date(currentYear, currentMonth - 1, 1),
        lt: new Date(currentYear, currentMonth, 1)
      },
      status: 'ACTIVE'
    }
  });

  // Show simple consumer dashboard
  return (
    <ConsumerDashboard 
      user={user}
      userNfts={user.nftUploads}
    />
  );
}
