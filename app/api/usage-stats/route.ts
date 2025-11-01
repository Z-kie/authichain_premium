
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Mock usage statistics - in real app, this would query the database
    const usageStats = {
      user: session.user.email,
      nftViews: 245,
      marketplaceVisits: 89,
      searchQueries: 156,
      favoritesCount: 23,
      transactionCount: 12,
      totalSpent: 4.7, // ETH
      collections: {
        owned: 8,
        favorited: 15,
        watching: 32
      },
      activity: {
        lastLogin: new Date().toISOString(),
        sessionsThisMonth: 45,
        avgSessionDuration: '12m 34s',
        mostViewedCategory: 'AuthiChain Legends'
      },
      preferences: {
        favoriteProductType: 'Hybrid',
        priceRange: 'Medium ($1-3 ETH)',
        notificationsEnabled: true
      },
      period: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        end: new Date().toISOString()
      }
    };

    return NextResponse.json(usageStats);
    
  } catch (error) {
    console.error('Usage stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, data } = body;

    // Log user activity - in real app, this would save to database
    const activityLog = {
      user: session.user.email,
      action,
      data,
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    console.log('User activity logged:', activityLog);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Activity logged successfully',
      timestamp: activityLog.timestamp
    });

  } catch (error) {
    console.error('Activity logging error:', error);
    return NextResponse.json(
      { error: 'Failed to log activity' },
      { status: 500 }
    );
  }
}
