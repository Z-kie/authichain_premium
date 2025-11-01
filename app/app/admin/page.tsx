
import { requireAdmin } from '@/lib/admin';
import { db } from '@/lib/prisma';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await requireAdmin();

  // Get comprehensive business data for admin
  const [
    totalUsers,
    activeSubscriptions,
    totalNfts,
    recentUsers,
    recentSales,
    subscriptionStats
  ] = await Promise.all([
    db.user.count(),
    db.subscription.count({ where: { status: 'ACTIVE' } }),
    db.nftUpload.count({ where: { status: 'ACTIVE' } }),
    db.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        subscriptionTier: true,
        createdAt: true
      }
    }),
    db.nftUpload.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { firstName: true, lastName: true, email: true } } }
    }),
    db.subscription.groupBy({
      by: ['tier'],
      _count: true
    })
  ]);

  const businessData = {
    totalUsers,
    totalRevenue: activeSubscriptions * 29, // Estimate based on subscription count
    activeSubscriptions,
    totalNfts,
    recentUsers,
    recentSales,
    subscriptionStats,
    usageStats: [] // Simplified for now
  };

  return <AdminDashboard data={businessData} user={session.user} />;
}
