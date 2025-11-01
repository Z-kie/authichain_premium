
import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // For now, allow unauthenticated access for testing
    // In production, you would add authentication here

    // Get parameters from query
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('address');
    const blockchain = searchParams.get('blockchain') || 'ethereum';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Mock transaction data - in real app, this would fetch from blockchain APIs
    const mockTransactions = [
      {
        hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        type: 'NFT Purchase',
        from: '0x742d35cc6eabbf9b8a3c6f5e5b8f7aae96c8b9f2',
        to: walletAddress,
        value: '2.5',
        currency: 'ETH',
        usdValue: 6625.00,
        timestamp: '2024-09-15T14:30:00Z',
        status: 'confirmed',
        blockNumber: 18567432,
        gasUsed: '21000',
        gasPrice: '20',
        nftDetails: {
          tokenId: '001',
          collection: 'AuthiChain Legends',
          name: 'Myles High #001'
        }
      },
      {
        hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
        type: 'Token Transfer',
        from: walletAddress,
        to: '0x8ba1f109551bd432803012645hac136c3bb8f134',
        value: '1000.00',
        currency: 'USDC',
        usdValue: 1000.00,
        timestamp: '2024-09-14T10:15:00Z',
        status: 'confirmed',
        blockNumber: 18565123,
        gasUsed: '65000',
        gasPrice: '18'
      },
      {
        hash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        type: 'ETH Transfer',
        from: '0x9cb2f110852bd533904023756iad247d4cc9f245',
        to: walletAddress,
        value: '1.0',
        currency: 'ETH',
        usdValue: 2650.00,
        timestamp: '2024-09-13T16:45:00Z',
        status: 'confirmed',
        blockNumber: 18563456,
        gasUsed: '21000',
        gasPrice: '22'
      },
      {
        hash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        type: 'NFT Sale',
        from: walletAddress,
        to: '0xabc3f221963ce644915124867jbe358e5dd0f356',
        value: '3.2',
        currency: 'ETH',
        usdValue: 8480.00,
        timestamp: '2024-09-12T09:20:00Z',
        status: 'confirmed',
        blockNumber: 18561789,
        gasUsed: '85000',
        gasPrice: '25',
        nftDetails: {
          tokenId: '003',
          collection: 'AuthiChain Legends',
          name: 'Dr. Green Lab #003'
        }
      },
      {
        hash: '0x5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
        type: 'Contract Interaction',
        from: walletAddress,
        to: '0xdef4f332074df755026235978kbf469f6ee1f467',
        value: '0.0',
        currency: 'ETH',
        usdValue: 0.00,
        timestamp: '2024-09-11T13:10:00Z',
        status: 'confirmed',
        blockNumber: 18559876,
        gasUsed: '150000',
        gasPrice: '30',
        contractDetails: {
          function: 'approve',
          contract: 'USDC Token',
          description: 'Approved spending allowance'
        }
      }
    ];

    // Apply pagination
    const paginatedTransactions = mockTransactions.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: {
        walletAddress,
        blockchain: blockchain.charAt(0).toUpperCase() + blockchain.slice(1),
        transactions: paginatedTransactions,
        pagination: {
          total: mockTransactions.length,
          limit,
          offset,
          hasMore: offset + limit < mockTransactions.length
        },
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Blockchain transactions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
