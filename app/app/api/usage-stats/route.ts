
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { UsageType } from '@/lib/types';

// Mark this route as dynamic to handle authentication properly
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Get current month usage
    const usageRecords = await prisma.usageRecord.findMany({
      where: {
        userId: user.id,
        month,
        year
      }
    });

    const usage = {
      nftUploads: usageRecords.find((r: any) => r.action === UsageType.NFT_UPLOAD)?.count || 0,
      customUsernameUsed: usageRecords.find((r: any) => r.action === UsageType.CUSTOM_USERNAME)?.count || 0,
      analyticsViews: usageRecords.find((r: any) => r.action === UsageType.ANALYTICS_VIEW)?.count || 0,
    };

    return NextResponse.json(usage);

  } catch (error: any) {
    console.error('Usage stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage stats' },
      { status: 500 }
    );
  }
}
