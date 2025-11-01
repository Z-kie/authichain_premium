

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';


interface EscrowTransaction {
  id: string;
  transaction_id: string;
  buyer_email: string;
  seller_email?: string;
  amount: number;
  currency: string;
  item_type: 'nft' | 'subscription' | 'enterprise';
  item_id: string;
  status: 'held' | 'released' | 'refunded' | 'disputed';
  created_at: string;
  updated_at?: string;
  release_conditions: string;
  metadata?: any;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, transaction_id, item_id, release_reason } = await req.json();

    switch (action) {
      case 'create':
        return await createEscrow(req);
      case 'release':
        return await releaseEscrow(transaction_id, release_reason, session.user.email);
      case 'refund':
        return await refundEscrow(transaction_id, session.user.email);
      case 'dispute':
        return await disputeEscrow(transaction_id, session.user.email);
      default:
        return NextResponse.json({ error: 'Invalid escrow action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Escrow API error:', error);
    return NextResponse.json({ error: 'Escrow operation failed' }, { status: 500 });
  }
}

async function createEscrow(req: NextRequest) {
  const {
    transaction_id,
    buyer_email,
    seller_email,
    amount,
    currency,
    item_type,
    item_id,
    release_conditions
  } = await req.json();

  // Validate required fields
  if (!transaction_id || !buyer_email || !amount || !currency || !item_type || !item_id) {
    return NextResponse.json({ error: 'Missing required escrow data' }, { status: 400 });
  }

  const escrowTransaction: EscrowTransaction = {
    id: 'escrow_' + Date.now(),
    transaction_id,
    buyer_email,
    seller_email,
    amount,
    currency,
    item_type,
    item_id,
    status: 'held',
    created_at: new Date().toISOString(),
    release_conditions: release_conditions || 'NFT transfer confirmed'
  };

  // In real implementation, save to database
  console.log('Escrow created:', escrowTransaction);

  // Simulate escrow creation success
  return NextResponse.json({
    success: true,
    escrow_id: escrowTransaction.id,
    status: 'held',
    message: 'Escrow created successfully',
    details: {
      amount: amount,
      currency: currency,
      buyer: buyer_email,
      seller: seller_email,
      item_type: item_type,
      item_id: item_id,
      release_conditions: escrowTransaction.release_conditions
    }
  });
}

async function releaseEscrow(transactionId: string, reason: string, userEmail: string) {
  // Verify user authorization to release escrow
  const escrowRecord = await getEscrowRecord(transactionId);
  
  if (!escrowRecord) {
    return NextResponse.json({ error: 'Escrow transaction not found' }, { status: 404 });
  }

  if (escrowRecord.status !== 'held') {
    return NextResponse.json({ error: 'Escrow not in held status' }, { status: 400 });
  }

  // Check if user is authorized (buyer, seller, or admin)
  const authorized = escrowRecord.buyer_email === userEmail || 
                    escrowRecord.seller_email === userEmail ||
                    isAdmin(userEmail);

  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized to release escrow' }, { status: 403 });
  }

  // Release escrow funds
  const releaseResult = await processEscrowRelease(escrowRecord, reason);

  return NextResponse.json({
    success: true,
    escrow_id: escrowRecord.id,
    transaction_id: transactionId,
    status: 'released',
    amount_released: escrowRecord.amount,
    currency: escrowRecord.currency,
    release_reason: reason,
    timestamp: new Date().toISOString(),
    message: 'Escrow funds released successfully'
  });
}

async function refundEscrow(transactionId: string, userEmail: string) {
  const escrowRecord = await getEscrowRecord(transactionId);
  
  if (!escrowRecord) {
    return NextResponse.json({ error: 'Escrow transaction not found' }, { status: 404 });
  }

  if (escrowRecord.status !== 'held') {
    return NextResponse.json({ error: 'Escrow not eligible for refund' }, { status: 400 });
  }

  // Only buyer or admin can initiate refund
  if (escrowRecord.buyer_email !== userEmail && !isAdmin(userEmail)) {
    return NextResponse.json({ error: 'Unauthorized to refund escrow' }, { status: 403 });
  }

  // Process refund
  const refundResult = await processEscrowRefund(escrowRecord);

  return NextResponse.json({
    success: true,
    escrow_id: escrowRecord.id,
    transaction_id: transactionId,
    status: 'refunded',
    amount_refunded: escrowRecord.amount,
    currency: escrowRecord.currency,
    timestamp: new Date().toISOString(),
    message: 'Escrow refunded successfully'
  });
}

async function disputeEscrow(transactionId: string, userEmail: string) {
  const escrowRecord = await getEscrowRecord(transactionId);
  
  if (!escrowRecord) {
    return NextResponse.json({ error: 'Escrow transaction not found' }, { status: 404 });
  }

  if (escrowRecord.status !== 'held') {
    return NextResponse.json({ error: 'Escrow not eligible for dispute' }, { status: 400 });
  }

  // Create dispute record
  const disputeRecord = {
    dispute_id: 'dispute_' + Date.now(),
    escrow_id: escrowRecord.id,
    transaction_id: transactionId,
    disputed_by: userEmail,
    status: 'open',
    created_at: new Date().toISOString(),
    message: 'Escrow dispute initiated'
  };

  return NextResponse.json({
    success: true,
    dispute_id: disputeRecord.dispute_id,
    escrow_id: escrowRecord.id,
    status: 'disputed',
    message: 'Escrow dispute created successfully',
    next_steps: 'Our team will review the dispute within 24-48 hours'
  });
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('transaction_id');
    const userEmail = session.user.email;

    if (transactionId) {
      // Get specific escrow transaction
      const escrowRecord = await getEscrowRecord(transactionId);
      
      if (!escrowRecord) {
        return NextResponse.json({ error: 'Escrow transaction not found' }, { status: 404 });
      }

      // Check authorization
      if (escrowRecord.buyer_email !== userEmail && 
          escrowRecord.seller_email !== userEmail && 
          !isAdmin(userEmail)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }

      return NextResponse.json({
        success: true,
        escrow: escrowRecord
      });
    }

    // Get user's escrow transactions
    const userEscrowTransactions = await getUserEscrowTransactions(userEmail);

    return NextResponse.json({
      success: true,
      escrow_transactions: userEscrowTransactions,
      total_held: userEscrowTransactions
        .filter(t => t.status === 'held')
        .reduce((sum: any, t: any) => sum + t.amount, 0)
    });

  } catch (error) {
    console.error('Escrow GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch escrow data' }, { status: 500 });
  }
}

// Helper functions (would be replaced with actual database operations)
async function getEscrowRecord(transactionId: string): Promise<EscrowTransaction | null> {
  // Mock escrow record - in real implementation, fetch from database
  return {
    id: 'escrow_' + Date.now(),
    transaction_id: transactionId,
    buyer_email: 'buyer@example.com',
    seller_email: 'seller@example.com',
    amount: 5000,
    currency: 'USD',
    item_type: 'nft',
    item_id: 'nft_123',
    status: 'held',
    created_at: new Date().toISOString(),
    release_conditions: 'NFT transfer confirmed'
  };
}

async function getUserEscrowTransactions(userEmail: string): Promise<EscrowTransaction[]> {
  // Mock user escrow transactions
  return [
    {
      id: 'escrow_1',
      transaction_id: 'tx_123',
      buyer_email: userEmail,
      amount: 2500,
      currency: 'USD',
      item_type: 'nft',
      item_id: 'purple_haze_1',
      status: 'held',
      created_at: new Date().toISOString(),
      release_conditions: 'NFT transfer confirmed'
    },
    {
      id: 'escrow_2',
      transaction_id: 'tx_456',
      buyer_email: userEmail,
      amount: 1750,
      currency: 'USD',
      item_type: 'nft',
      item_id: 'og_kush_47',
      status: 'released',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      release_conditions: 'NFT transfer confirmed'
    }
  ];
}

async function processEscrowRelease(escrowRecord: EscrowTransaction, reason: string) {
  // Process the actual fund release
  console.log('Releasing escrow:', escrowRecord.id, 'Reason:', reason);
  return { success: true };
}

async function processEscrowRefund(escrowRecord: EscrowTransaction) {
  // Process the actual refund
  console.log('Refunding escrow:', escrowRecord.id);
  return { success: true };
}

function isAdmin(userEmail: string): boolean {
  // Check if user is admin - in real implementation, check database/role system
  const adminEmails = ['admin@authichain.org', 'support@authichain.org'];
  return adminEmails.includes(userEmail);
}
