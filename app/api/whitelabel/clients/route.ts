

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { db } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock white-label client data (would be real data in production)
    const whiteLabelClients = [
      {
        id: 'green-leaf',
        name: 'Green Leaf Dispensaries',
        logo: '🌿',
        domain: 'greenleafnfts.com',
        locations: 12,
        monthlyRevenue: 4980,
        status: 'Active',
        features: ['Custom Branding', 'Multi-Location', 'QR Scanning', 'Analytics Dashboard']
      },
      {
        id: 'purple-haze',
        name: 'Rare Diamond Chain',
        logo: '💜',
        domain: 'purplehazenfts.io',
        locations: 8,
        monthlyRevenue: 3192,
        status: 'Active',
        features: ['White-Label', 'API Access', 'Custom Integrations', 'Mobile App']
      },
      {
        id: 'california-gold',
        name: 'California Gold',
        logo: '✨',
        domain: 'cagoldnfts.com',
        locations: 24,
        monthlyRevenue: 9576,
        status: 'Active',
        features: ['Full Platform', 'Unlimited Locations', 'Revenue Share', 'Dedicated Support']
      }
    ];

    return NextResponse.json({ clients: whiteLabelClients });
  } catch (error) {
    console.error('White-label clients error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, domain, tier, locations } = await req.json();

    // In production, this would create a new white-label client in the database
    const newClient = {
      id: `client-${Date.now()}`,
      name,
      domain,
      tier,
      locations: parseInt(locations) || 1,
      status: 'Setup',
      monthlyRevenue: 0,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ client: newClient, success: true });
  } catch (error) {
    console.error('Create white-label client error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
