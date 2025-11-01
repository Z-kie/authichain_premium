
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const leadCaptureSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().min(1, 'Source is required'),
  campaign: z.string().optional().default('general'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  interests: z.array(z.string()).optional().default([]),
  referralCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = leadCaptureSchema.parse(body);

    // Check if lead already exists
    let existingLead = await prisma.marketingLead.findUnique({
      where: { email: validatedData.email }
    });

    let lead;
    if (existingLead) {
      // Update existing lead
      lead = await prisma.marketingLead.update({
        where: { email: validatedData.email },
        data: {
          source: validatedData.source,
          campaign: validatedData.campaign,
          lastCampaign: validatedData.campaign,
          lastSource: validatedData.source,
          touchCount: existingLead.touchCount + 1,
          tags: Array.from(new Set([...existingLead.tags, ...validatedData.interests])),
          updatedAt: new Date(),
        }
      });
    } else {
      // Create new lead
      lead = await prisma.marketingLead.create({
        data: {
          email: validatedData.email,
          source: validatedData.source,
          campaign: validatedData.campaign,
          lastCampaign: validatedData.campaign,
          lastSource: validatedData.source,
          touchCount: 1,
          tags: validatedData.interests,
          status: 'ACTIVE',
        }
      });
    }

    // Track the lead capture event
    await prisma.marketingEvent.create({
      data: {
        email: validatedData.email,
        event: 'LEAD_CAPTURED',
        campaign: validatedData.campaign,
        source: validatedData.source,
        value: 0,
        metadata: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          interests: validatedData.interests,
          referralCode: validatedData.referralCode,
          userAgent: request.headers.get('user-agent'),
          ip: request.ip || 'unknown',
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId: lead.id
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get lead capture statistics
    const stats = await prisma.marketingLead.groupBy({
      by: ['source', 'campaign'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });

    const totalLeads = await prisma.marketingLead.count();
    const activeLeads = await prisma.marketingLead.count({
      where: { status: 'ACTIVE' }
    });

    return NextResponse.json({
      totalLeads,
      activeLeads,
      sourceBreakdown: stats
    });

  } catch (error) {
    console.error('Lead stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead statistics' },
      { status: 500 }
    );
  }
}
