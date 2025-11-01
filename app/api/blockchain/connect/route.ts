
import { NextRequest, NextResponse } from 'next/server';
import { verifyWalletSignature, createOrUpdateWalletUser, validateAuthMessage } from '@/lib/wallet-auth';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, walletType, blockchain = 'ethereum', signature, message } = body;

    console.log('🔐 Wallet authentication request:', {
      walletAddress,
      walletType,
      blockchain,
      hasSignature: !!signature,
      hasMessage: !!message
    });

    // Validate required fields
    if (!walletAddress || !walletType) {
      return NextResponse.json(
        { error: 'Wallet address and type are required' },
        { status: 400 }
      );
    }

    if (!signature || !message) {
      return NextResponse.json(
        { error: 'Signature and message are required for authentication' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (blockchain === 'ethereum' && !ethAddressRegex.test(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid Ethereum wallet address format' },
        { status: 400 }
      );
    }

    // Validate message format and timestamp
    if (!validateAuthMessage(message, walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid or expired authentication message' },
        { status: 400 }
      );
    }

    // Verify the signature
    const isValidSignature = await verifyWalletSignature(message, signature, walletAddress);
    
    if (!isValidSignature) {
      console.error('❌ Invalid signature for wallet:', walletAddress);
      return NextResponse.json(
        { error: 'Invalid signature. Please try again.' },
        { status: 401 }
      );
    }

    console.log('✅ Signature verified successfully');

    // Create or update user in database
    const user = await createOrUpdateWalletUser(walletAddress);

    // Return connection data
    const connectionData = {
      walletAddress: walletAddress.toLowerCase(),
      walletType,
      blockchain,
      connected: true,
      connectedAt: new Date().toISOString(),
      userId: user.id,
      email: user.email,
      supportedFeatures: [
        'balance_check',
        'transaction_history',
        'nft_portfolio',
        'token_transfers',
        'contract_interaction'
      ]
    };

    console.log('✅ Wallet authenticated successfully:', connectionData);

    return NextResponse.json({
      success: true,
      message: 'Wallet connected and authenticated successfully',
      data: connectionData
    });

  } catch (error) {
    console.error('❌ Wallet connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect wallet. Please try again.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // For now, allow unauthenticated access for testing
    // In production, you would add authentication here

    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('address');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // In real app, remove wallet connection from database
    console.log(`Disconnecting wallet ${walletAddress} for test user`);

    return NextResponse.json({
      success: true,
      message: 'Wallet disconnected successfully',
      walletAddress,
      disconnectedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Wallet disconnection error:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect wallet' },
      { status: 500 }
    );
  }
}
