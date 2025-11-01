

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock email sequence data
    const emailSequences = [
      {
        id: 'enterprise-nurture',
        name: 'Enterprise Product CEO Nurture',
        target: 'MSO & Dispensary Chain Executives',
        status: 'active',
        emails: 7,
        recipients: 1247,
        open_rate: 67.8,
        click_rate: 23.4,
        conversion_rate: 8.9,
        revenue_generated: 2890000
      },
      {
        id: 'whitelabel-onboarding',
        name: 'White-Label Partner Onboarding',
        target: 'Approved Dispensary Partners',
        status: 'active',
        emails: 5,
        recipients: 156,
        open_rate: 89.1,
        click_rate: 67.3,
        conversion_rate: 87.2,
        revenue_generated: 1456000
      },
      {
        id: 'api-developer-welcome',
        name: 'API Developer Welcome Series',
        target: 'Product Tech Developers',
        status: 'active',
        emails: 4,
        recipients: 891,
        open_rate: 72.4,
        click_rate: 34.7,
        conversion_rate: 15.7,
        revenue_generated: 445000
      }
    ];

    const emailStats = {
      totalSequences: emailSequences.length,
      totalRecipients: emailSequences.reduce((sum, seq) => sum + seq.recipients, 0),
      avgOpenRate: emailSequences.reduce((sum, seq) => sum + seq.open_rate, 0) / emailSequences.length,
      avgClickRate: emailSequences.reduce((sum, seq) => sum + seq.click_rate, 0) / emailSequences.length,
      avgConversionRate: emailSequences.reduce((sum, seq) => sum + seq.conversion_rate, 0) / emailSequences.length,
      totalRevenue: emailSequences.reduce((sum, seq) => sum + seq.revenue_generated, 0)
    };

    return NextResponse.json({ emailSequences, stats: emailStats, success: true });
  } catch (error) {
    console.error('Email sequences error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, sequenceId, sequenceName } = await req.json();
    
    // Mock email sequence actions
    if (action === 'trigger') {
      return NextResponse.json({ 
        success: true,
        message: `Email sequence "${sequenceName}" triggered successfully! AI-powered personalized emails are being sent to product industry prospects.`,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Email sequence action completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Email sequence action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
