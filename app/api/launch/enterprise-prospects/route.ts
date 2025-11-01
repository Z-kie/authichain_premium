

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

    // Mock enterprise prospect data (would be real database queries in production)
    const enterprises = [
      {
        id: '1',
        company: 'Green Gold Holdings',
        industry: 'Multi-State Product',
        size: '500-1000 employees',
        revenue: '$100M+',
        contact: 'Sarah Chen, CTO',
        email: 'sarah@greengold.com',
        phone: '+1 (555) 123-4567',
        status: 'hot',
        value: 299400,
        locations: 25,
        notes: 'Large MSO looking for NFT authentication across all locations'
      },
      {
        id: '2',
        company: 'California Product Corp',
        industry: 'Dispensary Chain',
        size: '200-500 employees',
        revenue: '$50M+',
        contact: 'Mike Rodriguez, VP Tech',
        email: 'mike@calproduct.com',
        phone: '+1 (555) 234-5678',
        status: 'qualified',
        value: 119760,
        locations: 10,
        notes: 'Interested in white-label solution for their dispensary chain'
      },
      {
        id: '3',
        company: 'Rocky Mountain Wellness',
        industry: 'Cultivation + Retail',
        size: '100-200 employees',
        revenue: '$25M+',
        contact: 'Jennifer Park, COO',
        email: 'jennifer@rmwellness.com',
        phone: '+1 (555) 345-6789',
        status: 'proposal',
        value: 59880,
        locations: 8,
        notes: 'Cultivation and retail operation wanting seed-to-sale NFT tracking'
      }
    ];

    return NextResponse.json({ enterprises, total: enterprises.length });
  } catch (error) {
    console.error('Enterprise prospects error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prospectData = await req.json();
    
    // In production, this would save to database and trigger automated outreach
    const newProspect = {
      id: `prospect-${Date.now()}`,
      ...prospectData,
      status: 'cold',
      createdAt: new Date().toISOString(),
      addedBy: session.user.email
    };

    // Mock automated outreach trigger
    console.log(`Automated outreach triggered for ${prospectData.company}`);
    
    return NextResponse.json({ 
      prospect: newProspect, 
      success: true,
      message: 'Enterprise prospect added to pipeline'
    });
  } catch (error) {
    console.error('Add enterprise prospect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
