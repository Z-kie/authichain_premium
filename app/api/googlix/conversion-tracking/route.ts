
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


// Conversion tracking API for Googlix system
export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      event, 
      value, 
      campaign, 
      source,
      subscriptionTier,
      metadata 
    } = await request.json();

    // Track conversion event
    const conversionEvent = await db.marketingEvent.create({
      data: {
        email: email || 'anonymous',
        event,
        campaign: campaign || 'direct',
        source: source || 'organic',
        value: parseFloat(value) || 0,
        subscriptionTier,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString(),
          userAgent: request.headers.get('user-agent'),
          referer: request.headers.get('referer')
        }
      }
    });

    // Update lead status if email provided
    if (email) {
      await db.marketingLead.upsert({
        where: { email },
        update: {
          lastConversion: event,
          lastConversionValue: parseFloat(value) || 0,
          lastConversionDate: new Date(),
          touchCount: { increment: 1 }
        },
        create: {
          email,
          source: source || 'organic',
          campaign: campaign || 'direct',
          lastCampaign: campaign || 'direct',
          lastSource: source || 'organic',
          lastConversion: event,
          lastConversionValue: parseFloat(value) || 0,
          lastConversionDate: new Date(),
          touchCount: 1,
          status: 'CONVERTED',
          tags: ['converted', 'product-nft']
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      eventId: conversionEvent.id,
      message: 'Conversion tracked successfully'
    });

  } catch (error) {
    console.error('Conversion tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track conversion' },
      { status: 500 }
    );
  }
}

// Get conversion analytics (Googlix-style reporting)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const campaign = searchParams.get('campaign');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const whereClause: any = {
      createdAt: {
        gte: startDate
      }
    };

    if (campaign) {
      whereClause.campaign = campaign;
    }

    // Revenue by event type
    const revenueByEvent = await db.marketingEvent.groupBy({
      by: ['event'],
      where: whereClause,
      _count: {
        _all: true
      },
      _sum: {
        value: true
      }
    });

    // Revenue by campaign
    const revenueByCampaign = await db.marketingEvent.groupBy({
      by: ['campaign'],
      where: whereClause,
      _count: {
        _all: true
      },
      _sum: {
        value: true
      }
    });

    // Total metrics
    const totalRevenue = await db.marketingEvent.aggregate({
      where: whereClause,
      _sum: {
        value: true
      },
      _count: {
        _all: true
      }
    });

    const totalEventCount = totalRevenue._count._all || 0;

    // Conversion funnel
    const emailCaptureCount = await db.marketingEvent.count({
      where: {
        ...whereClause,
        event: 'EMAIL_CAPTURED'
      }
    });

    const subscriptionCount = await db.marketingEvent.count({
      where: {
        ...whereClause,
        event: 'SUBSCRIPTION_CREATED'
      }
    });

    const conversionRate = emailCaptureCount > 0 ? (subscriptionCount / emailCaptureCount) * 100 : 0;

    return NextResponse.json({
      totalRevenue: totalRevenue._sum.value || 0,
      totalEvents: totalEventCount,
      emailCaptures: emailCaptureCount,
      subscriptions: subscriptionCount,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      revenueByEvent,
      revenueByCampaign,
      period: `${days} days`,
      // Googlix-style metrics
      googleixMetrics: {
        estimatedMonthlyRevenue: ((totalRevenue._sum.value || 0) / days) * 30,
        leadValue: emailCaptureCount > 0 ? (totalRevenue._sum.value || 0) / emailCaptureCount : 0,
        revenuePerEvent: totalEventCount > 0 ? (totalRevenue._sum.value || 0) / totalEventCount : 0
      }
    });

  } catch (error) {
    console.error('Conversion analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to get analytics' },
      { status: 500 }
    );
  }
}
