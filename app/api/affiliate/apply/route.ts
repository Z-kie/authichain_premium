
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

    const { name, website, socialLinks, notes } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already applied
    const existing = await prisma.affiliatePartner.findUnique({
      where: { email: user.email },
    });

    if (existing) {
      return NextResponse.json({
        status: existing.status,
        message: 'You have already applied for the affiliate program',
      });
    }

    // Create affiliate application
    const affiliate = await prisma.affiliatePartner.create({
      data: {
        userId: user.id,
        name: name || `${user.firstName} ${user.lastName}`,
        email: user.email,
        status: 'PENDING',
        affiliateCode: `AFF-${nanoid(8)}`,
        website,
        socialLinks,
        notes,
      },
    });

    return NextResponse.json({
      success: true,
      status: affiliate.status,
      message: 'Your affiliate application has been submitted. We will review it within 2-3 business days.',
    });
  } catch (error) {
    console.error('Affiliate application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit affiliate application' },
      { status: 500 }
    );
  }
}
