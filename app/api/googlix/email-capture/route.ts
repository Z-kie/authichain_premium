
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


// Email capture API for Googlix system
export async function POST(request: NextRequest) {
  try {
    const { email, source, campaign } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingLead = await db.marketingLead.findUnique({
      where: { email }
    });

    if (existingLead) {
      // Update existing lead with new campaign data
      await db.marketingLead.update({
        where: { email },
        data: {
          lastCampaign: campaign || 'googlix-landing',
          lastSource: source || 'direct',
          touchCount: { increment: 1 },
          updatedAt: new Date()
        }
      });
    } else {
      // Create new lead
      await db.marketingLead.create({
        data: {
          email,
          source: source || 'direct',
          campaign: campaign || 'googlix-landing',
          lastCampaign: campaign || 'googlix-landing',
          lastSource: source || 'direct',
          touchCount: 1,
          status: 'ACTIVE',
          tags: ['product-nft-interested', 'googlix-system']
        }
      });
    }

    // Track conversion for analytics (like Googlix $32k system)
    await db.marketingEvent.create({
      data: {
        email,
        event: 'EMAIL_CAPTURED',
        campaign: campaign || 'googlix-landing',
        source: source || 'direct',
        value: 5.00, // $5 industry standard lead value
        metadata: {
          userAgent: request.headers.get('user-agent'),
          referer: request.headers.get('referer'),
          timestamp: new Date().toISOString()
        }
      }
    });

    // TODO: Integrate with GetResponse API (like original Googlix system)
    // await addToGetResponseList(email, campaign);

    return NextResponse.json({ 
      success: true, 
      message: 'Email captured successfully',
      leadValue: '$5.00'
    });

  } catch (error) {
    console.error('Email capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    );
  }
}

// Get email capture stats (for Googlix dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const stats = await db.marketingLead.groupBy({
      by: ['campaign'],
      where: {
        createdAt: {
          gte: startDate
        }
      },
      _count: {
        _all: true
      },
      _sum: {
        touchCount: true
      }
    });

    const totalLeads = await db.marketingLead.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    });

    const totalValue = await db.marketingEvent.aggregate({
      where: {
        event: 'EMAIL_CAPTURED',
        createdAt: {
          gte: startDate
        }
      },
      _sum: {
        value: true
      }
    });

    return NextResponse.json({
      totalLeads,
      totalValue: totalValue._sum.value || 0,
      campaigns: stats,
      period: `${days} days`,
      avgValuePerLead: totalLeads > 0 ? (totalValue._sum.value || 0) / totalLeads : 0
    });

  } catch (error) {
    console.error('Email stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    );
  }
}
