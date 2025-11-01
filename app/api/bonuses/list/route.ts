
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { GOOGLIX_BONUSES } from '@/lib/googlix-pricing';

export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's claimed bonuses
    const claimedBonuses = await prisma.launchBonus.findMany({
      where: { userId: user.id },
      orderBy: { claimedAt: 'desc' },
    });

    // Get available bonuses based on tier
    let availableBonuses: any[] = [];
    
    switch (user.subscriptionTier) {
      case 'CREATOR':
        availableBonuses = GOOGLIX_BONUSES.CREATOR_LAUNCH_KIT;
        break;
      case 'PRO':
        availableBonuses = [
          ...GOOGLIX_BONUSES.CREATOR_LAUNCH_KIT,
          ...GOOGLIX_BONUSES.PRO_LAUNCH_BUNDLE,
        ];
        break;
      case 'ENTERPRISE':
        availableBonuses = [
          ...GOOGLIX_BONUSES.CREATOR_LAUNCH_KIT,
          ...GOOGLIX_BONUSES.PRO_LAUNCH_BUNDLE,
          ...GOOGLIX_BONUSES.ENTERPRISE_DOMINATION_SUITE,
        ];
        break;
      case 'AGENCY':
        availableBonuses = [
          ...GOOGLIX_BONUSES.CREATOR_LAUNCH_KIT,
          ...GOOGLIX_BONUSES.PRO_LAUNCH_BUNDLE,
          ...GOOGLIX_BONUSES.ENTERPRISE_DOMINATION_SUITE,
          ...GOOGLIX_BONUSES.AGENCY_EMPIRE_BUILDER,
        ];
        break;
      default:
        availableBonuses = [];
    }

    return NextResponse.json({
      claimedBonuses: claimedBonuses.map((b: any) => ({
        id: b.id,
        type: b.bonusType,
        tier: b.tier,
        value: b.bonusValue,
        claimedAt: b.claimedAt,
        expiresAt: b.expiresAt,
        resources: b.resources,
      })),
      availableBonuses: availableBonuses.map((b: any) => ({
        name: b.name,
        description: b.description,
        value: b.value,
        icon: b.icon,
      })),
      totalValue: claimedBonuses.reduce((sum: number, b: any) => sum + b.bonusValue, 0),
    });
  } catch (error) {
    console.error('Bonus list error:', error);
    return NextResponse.json(
      { error: 'Failed to get bonuses' },
      { status: 500 }
    );
  }
}
