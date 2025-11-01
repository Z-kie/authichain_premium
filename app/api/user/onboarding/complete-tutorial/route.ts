
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        tutorialCompleted: true,
        onboardingStep: 1,
      },
      select: {
        id: true,
        tutorialCompleted: true,
        onboardingStep: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to complete tutorial:', error);
    return NextResponse.json(
      { error: 'Failed to complete tutorial' },
      { status: 500 }
    );
  }
}
