
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getNOWPaymentsInstance } from '@/lib/nowpayments';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

interface CreateCryptoPaymentRequest {
  amount: number;
  currency: string;
  payCurrency: string; // BTC, ETH, USDC, etc.
  orderId?: string;
  orderDescription?: string;
  itemType: 'nft' | 'subscription' | 'enterprise';
  itemId?: string;
  escrow?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data: CreateCryptoPaymentRequest = await req.json();
    const { amount, currency, payCurrency, orderId, orderDescription, itemType, itemId, escrow } = data;

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (!payCurrency) {
      return NextResponse.json({ error: 'Payment currency is required' }, { status: 400 });
    }

    // Get NOWPayments instance
    const nowPayments = getNOWPaymentsInstance();

    // Generate unique order ID
    const finalOrderId = orderId || `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create IPN callback URL
    const ipnCallbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/crypto/ipn`;

    // Create payment with NOWPayments
    const paymentResponse = await nowPayments.createPayment({
      price_amount: amount,
      price_currency: currency || 'USD',
      pay_currency: payCurrency.toLowerCase(),
      order_id: finalOrderId,
      order_description: orderDescription || `Payment for ${itemType}`,
      ipn_callback_url: ipnCallbackUrl,
      customer_email: session.user.email,
    });

    // Create Transaction record
    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        transactionType: itemType === 'nft' ? 'NFT_PURCHASE' : 'SUBSCRIPTION_PAYMENT',
        amount,
        currency: currency || 'USD',
        status: 'PENDING',
        paymentMethod: `CRYPTO_${payCurrency.toUpperCase()}` as any,
        cryptoAddress: paymentResponse.pay_address,
        description: orderDescription || `Crypto payment for ${itemType}`,
        referenceId: itemId,
        referenceType: itemType,
        metadata: {
          payCurrency,
          payAmount: paymentResponse.pay_amount,
          paymentId: paymentResponse.payment_id,
        },
      },
    });

    // Create CryptoPayment record
    const cryptoPayment = await prisma.cryptoPayment.create({
      data: {
        transactionId: transaction.id,
        userId: session.user.id,
        nowpaymentsId: paymentResponse.payment_id,
        paymentId: paymentResponse.payment_id,
        orderId: finalOrderId,
        orderDescription: orderDescription || `Payment for ${itemType}`,
        priceAmount: amount,
        priceCurrency: currency || 'USD',
        payAmount: paymentResponse.pay_amount,
        payCurrency: payCurrency.toUpperCase(),
        payAddress: paymentResponse.pay_address,
        purchaseId: paymentResponse.purchase_id,
        smartContract: paymentResponse.smart_contract,
        network: paymentResponse.network,
        networkPrecision: paymentResponse.network_precision,
        timeLimit: paymentResponse.time_limit,
        burningPercent: paymentResponse.burning_percent,
        expirationEstimateDate: paymentResponse.expiration_estimate_date 
          ? new Date(paymentResponse.expiration_estimate_date)
          : undefined,
        paymentStatus: paymentResponse.payment_status,
        ipnCallbackUrl,
        metadata: {
          itemType,
          itemId,
          escrow,
        },
      },
    });

    // Create escrow if needed
    if (escrow && itemType === 'nft') {
      await prisma.escrow.create({
        data: {
          buyerId: session.user.id,
          sellerId: 'PENDING', // Will be updated when NFT is identified
          amount,
          currency: currency || 'USD',
          status: 'CREATED',
          releaseCondition: 'NFT transfer confirmed',
          metadata: {
            transactionId: transaction.id,
            cryptoPaymentId: cryptoPayment.id,
            payCurrency,
            payAddress: paymentResponse.pay_address,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      payment: {
        paymentId: paymentResponse.payment_id,
        payAddress: paymentResponse.pay_address,
        payAmount: paymentResponse.pay_amount,
        payCurrency: payCurrency.toUpperCase(),
        priceAmount: amount,
        priceCurrency: currency || 'USD',
        orderId: finalOrderId,
        status: paymentResponse.payment_status,
        timeLimit: paymentResponse.time_limit,
        expirationEstimateDate: paymentResponse.expiration_estimate_date,
        network: paymentResponse.network,
        smartContract: paymentResponse.smart_contract,
      },
      transaction: {
        id: transaction.id,
        status: transaction.status,
      },
      escrowEnabled: escrow && itemType === 'nft',
    });

  } catch (error) {
    console.error('Crypto payment creation error:', error);
    return NextResponse.json({ 
      error: 'Failed to create crypto payment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Get payment status
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 });
    }

    const nowPayments = getNOWPaymentsInstance();
    const paymentStatus = await nowPayments.getPaymentStatus(paymentId);

    // Update database
    const cryptoPayment = await prisma.cryptoPayment.findFirst({
      where: { nowpaymentsId: paymentId },
      include: { transaction: true },
    });

    if (cryptoPayment) {
      await prisma.cryptoPayment.update({
        where: { id: cryptoPayment.id },
        data: {
          paymentStatus: paymentStatus.payment_status,
          actuallyPaid: paymentStatus.actually_paid,
          actuallyPaidCurrency: paymentStatus.pay_currency,
          payinHash: paymentStatus.payin_hash,
          amountReceived: paymentStatus.actually_paid,
          updatedAt: new Date(),
          ...(paymentStatus.payment_status === 'finished' && {
            completedAt: new Date(),
          }),
          ...(paymentStatus.payment_status === 'failed' && {
            failedAt: new Date(),
          }),
        },
      });

      // Update transaction status
      if (paymentStatus.payment_status === 'finished') {
        await prisma.transaction.update({
          where: { id: cryptoPayment.transactionId },
          data: {
            status: 'COMPLETED',
            completedAt: new Date(),
            cryptoTxHash: paymentStatus.payin_hash,
          }
        });
      } else if (paymentStatus.payment_status === 'failed') {
        await prisma.transaction.update({
          where: { id: cryptoPayment.transactionId },
          data: {
            status: 'FAILED',
            failedAt: new Date(),
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      payment: paymentStatus,
    });

  } catch (error) {
    console.error('Failed to get payment status:', error);
    return NextResponse.json({ 
      error: 'Failed to get payment status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

