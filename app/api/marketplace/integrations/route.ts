

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

    // Mock integration marketplace data
    const integrations = [
      {
        id: 'flowhub',
        name: 'Flowhub POS Integration',
        category: 'pos_systems',
        description: 'Seamlessly connect your Flowhub POS data with AuthiChain NFT creation',
        provider: 'Flowhub Inc.',
        rating: 4.8,
        installs: 12450,
        price: 'free',
        features: ['Real-time sales sync', 'Auto NFT creation', 'Inventory tracking', 'Customer data'],
        supported_platforms: ['Web', 'Mobile', 'Tablet'],
        setup_time: '15 minutes',
        difficulty: 'easy',
        status: 'available'
      },
      {
        id: 'metrc',
        name: 'METRC Seed-to-Sale',
        category: 'seed_to_sale',
        description: 'Official METRC integration for compliance tracking and NFT authentication',
        provider: 'METRC LLC',
        rating: 4.9,
        installs: 8934,
        price: 'paid',
        pricing: '$99/month',
        features: ['Compliance tracking', 'Plant genealogy', 'Batch tracking', 'Auto COA import'],
        supported_platforms: ['Web', 'API'],
        setup_time: '1 hour',
        difficulty: 'medium',
        status: 'available'
      }
    ];

    const categories = [
      {
        id: 'pos_systems',
        name: 'POS Systems',
        description: 'Point of sale and transaction processing integrations',
        integrations: 12,
        popular: true
      },
      {
        id: 'seed_to_sale',
        name: 'Seed-to-Sale Tracking',
        description: 'Product compliance and tracking system integrations',
        integrations: 8,
        popular: true
      }
    ];

    const integrationStats = {
      total_integrations: 53,
      active_installs: 47000,
      avg_rating: 4.8,
      partners: 234,
      uptime: 99.9
    };

    return NextResponse.json({ 
      integrations,
      categories,
      stats: integrationStats,
      success: true 
    });
  } catch (error) {
    console.error('Integrations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, integrationId, integrationName } = await req.json();
    
    // Mock integration actions
    const actions = {
      'install': `${integrationName} integration installed successfully! Configuration wizard will guide you through setup.`,
      'configure': `${integrationName} configuration opened! Setup wizard will guide you through the integration process.`,
      'uninstall': `${integrationName} integration removed successfully!`,
      'update': `${integrationName} integration updated to the latest version!`
    };

    const message = actions[action as keyof typeof actions] || 'Integration action completed';
    
    return NextResponse.json({ 
      success: true,
      message,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Integration action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
