
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        referralCodes: {
          where: { isActive: true },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user already has an active referral code
    if (user.referralCodes.length > 0) {
      return NextResponse.json({
        code: user.referralCodes[0].code,
        referralLink: `${process.env.NEXTAUTH_URL}/auth/signup?ref=${user.referralCodes[0].code}`,
      });
    }

    // Generate new referral code
    const code = nanoid(10);

    const referralCode = await prisma.referralCode.create({
      data: {
        code,
        userId: user.id,
        type: 'USER',
        commission: 0.2, // 20% recurring commission
        isActive: true,
      },
    });

    return NextResponse.json({
      code: referralCode.code,
      referralLink: `${process.env.NEXTAUTH_URL}/auth/signup?ref=${referralCode.code}`,
    });
  } catch (error) {
    console.error('Referral code generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate referral code' },
      { status: 500 }
    );
  }
}
