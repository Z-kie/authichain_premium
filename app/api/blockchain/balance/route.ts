
import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // For now, allow unauthenticated access for testing
    // In production, you would add authentication here

    // Get wallet address from query parameters
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('address');
    const blockchain = searchParams.get('blockchain') || 'ethereum';

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Mock blockchain balance data - in real app, this would integrate with blockchain APIs
    const mockBalances = {
      ethereum: {
        native: {
          symbol: 'ETH',
          balance: '2.45891234',
          usdValue: 6523.45,
          decimals: 18
        },
        tokens: [
          {
            symbol: 'USDC',
            name: 'USD Coin',
            balance: '1,250.00',
            usdValue: 1250.00,
            contractAddress: '0xA0b86a33E6441D4aE1E8E2FE3a5ECa89b80E9D83',
            decimals: 6
          },
          {
            symbol: 'USDT',
            name: 'Tether USD',
            balance: '750.50',
            usdValue: 750.50,
            contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            decimals: 6
          },
          {
            symbol: 'WETH',
            name: 'Wrapped Ethereum',
            balance: '0.89234567',
            usdValue: 2374.12,
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18
          }
        ],
        nfts: {
          count: 23,
          collections: [
            {
              name: 'AuthiChain Legends',
              count: 5,
              floorPrice: '2.5 ETH',
              totalValue: '12.5 ETH'
            },
            {
              name: 'Product Collection',
              count: 8,
              floorPrice: '1.2 ETH',
              totalValue: '9.6 ETH'
            },
            {
              name: 'Other NFTs',
              count: 10,
              floorPrice: '0.5 ETH',
              totalValue: '5.0 ETH'
            }
          ],
          totalValue: '27.1 ETH'
        },
        totalValue: 10897.07
      },
      bitcoin: {
        native: {
          symbol: 'BTC',
          balance: '0.08945671',
          usdValue: 5234.78,
          decimals: 8
        },
        totalValue: 5234.78
      },
      polygon: {
        native: {
          symbol: 'MATIC',
          balance: '145.234567',
          usdValue: 87.45,
          decimals: 18
        },
        tokens: [
          {
            symbol: 'USDC',
            name: 'USD Coin (Polygon)',
            balance: '500.00',
            usdValue: 500.00,
            contractAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
            decimals: 6
          }
        ],
        totalValue: 587.45
      }
    };

    const balanceData = mockBalances[blockchain as keyof typeof mockBalances];

    if (!balanceData) {
      return NextResponse.json(
        { error: `Unsupported blockchain: ${blockchain}` },
        { status: 400 }
      );
    }

    // Return balance information
    return NextResponse.json({
      success: true,
      data: {
        walletAddress,
        blockchain: blockchain.charAt(0).toUpperCase() + blockchain.slice(1),
        lastUpdated: new Date().toISOString(),
        ...balanceData
      }
    });

  } catch (error) {
    console.error('Blockchain balance error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // For now, allow unauthenticated access for testing
    // In production, you would add authentication here

    const body = await request.json();
    const { walletAddress, blockchain = 'ethereum' } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // In real app, this would trigger a blockchain balance refresh
    console.log(`Refreshing balance for ${walletAddress} on ${blockchain}`);

    return NextResponse.json({
      success: true,
      message: 'Balance refresh initiated',
      walletAddress,
      blockchain,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Balance refresh error:', error);
    return NextResponse.json(
      { error: 'Failed to refresh balance' },
      { status: 500 }
    );
  }
}
