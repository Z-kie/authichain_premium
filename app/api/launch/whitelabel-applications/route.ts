

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

    // Mock white-label applications data
    const applications = [
      {
        id: '1',
        dispensaryName: 'Green Valley Collective',
        contactPerson: 'John Smith, CEO',
        email: 'john@greenvalley.com',
        phone: '+1 (555) 987-6543',
        locations: '8',
        tier: 'multi-location',
        status: 'approved',
        monthlyValue: 7992,
        appliedAt: '2024-01-10',
        approvedAt: '2024-01-12'
      },
      {
        id: '2',
        dispensaryName: 'Purple Mountain Dispensary',
        contactPerson: 'Lisa Wang, CTO',
        email: 'lisa@purplemountain.com',
        phone: '+1 (555) 876-5432',
        locations: '12',
        tier: 'enterprise',
        status: 'processing',
        monthlyValue: 29988,
        appliedAt: '2024-01-15',
        approvedAt: null
      },
      {
        id: '3',
        dispensaryName: 'Golden State Product',
        contactPerson: 'Robert Chen, COO',
        email: 'robert@goldenstateproduct.com',
        phone: '+1 (555) 765-4321',
        locations: '24',
        tier: 'enterprise',
        status: 'active',
        monthlyValue: 59976,
        appliedAt: '2023-12-20',
        approvedAt: '2023-12-22'
      }
    ];

    const stats = {
      totalApplications: applications.length,
      approved: applications.filter(app => app.status === 'approved').length,
      processing: applications.filter(app => app.status === 'processing').length,
      active: applications.filter(app => app.status === 'active').length,
      totalMonthlyValue: applications.reduce((sum, app) => sum + app.monthlyValue, 0)
    };

    return NextResponse.json({ applications, stats });
  } catch (error) {
    console.error('White-label applications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const applicationData = await req.json();
    
    // Calculate monthly value based on tier and locations
    const tierPricing = {
      'dispensary-starter': 499,
      'multi-location': 999,
      'enterprise': 2499
    };
    
    const monthlyValue = tierPricing[applicationData.tier as keyof typeof tierPricing] || 499;
    
    // In production, this would save to database and trigger automated approval workflow
    const newApplication = {
      id: `app-${Date.now()}`,
      ...applicationData,
      status: 'processing',
      monthlyValue,
      appliedAt: new Date().toISOString(),
      approvedAt: null,
      submittedBy: session.user.email
    };

    // Mock automated workflow trigger
    console.log(`White-label application processing started for ${applicationData.dispensaryName}`);
    
    return NextResponse.json({ 
      application: newApplication, 
      success: true,
      message: 'White-label application submitted successfully'
    });
  } catch (error) {
    console.error('White-label application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
