
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        walletConnected: true,
        firstNFTMinted: true,
        tutorialCompleted: true,
        onboardingCompleted: true,
        onboardingStep: true,
        image: true,
        firstName: true,
        lastName: true,
        subscriptions: {
          where: {
            status: 'ACTIVE',
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if profile is completed
    const profileCompleted = !!(user.image && user.firstName && user.lastName);

    return NextResponse.json({
      walletConnected: user.walletConnected,
      subscriptionActive: user.subscriptions.length > 0,
      firstNFTMinted: user.firstNFTMinted,
      tutorialCompleted: user.tutorialCompleted,
      profileCompleted,
      onboardingCompleted: user.onboardingCompleted,
      onboardingStep: user.onboardingStep,
    });
  } catch (error) {
    console.error('Failed to fetch onboarding status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch onboarding status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, field, value } = body;

    if (!userId || !field) {
      return NextResponse.json(
        { error: 'User ID and field required' },
        { status: 400 }
      );
    }

    // Validate field name
    const validFields = [
      'walletConnected',
      'firstNFTMinted',
      'tutorialCompleted',
      'onboardingCompleted',
      'onboardingStep',
    ];

    if (!validFields.includes(field)) {
      return NextResponse.json({ error: 'Invalid field' }, { status: 400 });
    }

    const updateData: any = { [field]: value };

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        walletConnected: true,
        firstNFTMinted: true,
        tutorialCompleted: true,
        onboardingCompleted: true,
        onboardingStep: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to update onboarding status:', error);
    return NextResponse.json(
      { error: 'Failed to update onboarding status' },
      { status: 500 }
    );
  }
}
