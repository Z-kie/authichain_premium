import { NextRequest, NextResponse } from 'next/server';
import { getNOWPaymentsInstance } from '@/lib/nowpayments';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

/**
 * NOWPayments IPN (Instant Payment Notification) Webhook Handler
 * This endpoint receives real-time payment status updates from NOWPayments
 */
export async function POST(req: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-nowpayments-sig') || '';

    // Verify signature
    const nowPayments = getNOWPaymentsInstance();
    const ipnData = nowPayments.parseIPNCallback(rawBody, signature);

    if (!ipnData) {
      console.error('IPN signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    console.log('IPN received:', {
      paymentId: ipnData.payment_id,
      status: ipnData.payment_status,
      orderId: ipnData.order_id,
    });

    // Find the crypto payment record
    const cryptoPayment = await prisma.cryptoPayment.findFirst({
      where: { nowpaymentsId: ipnData.payment_id },
      include: { transaction: true },
    });

    if (!cryptoPayment) {
      console.error('Crypto payment not found:', ipnData.payment_id);
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Update crypto payment record
    await prisma.cryptoPayment.update({
      where: { id: cryptoPayment.id },
      data: {
        paymentStatus: ipnData.payment_status,
        actuallyPaid: ipnData.actually_paid,
        actuallyPaidCurrency: ipnData.pay_currency,
        amountReceived: ipnData.actually_paid,
        payinHash: ipnData.payin_hash,
        payinExtraId: ipnData.payin_extra_id,
        updatedAt: new Date(),
        ...(ipnData.payment_status === 'confirmed' && !cryptoPayment.confirmedAt && {
          confirmedAt: new Date(),
        }),
        ...(ipnData.payment_status === 'finished' && {
          completedAt: new Date(),
        }),
        ...(ipnData.payment_status === 'failed' && {
          failedAt: new Date(),
        }),
      },
    });

    // Update transaction status based on payment status
    const statusMap: Record<string, any> = {
      'waiting': 'PENDING',
      'confirming': 'PROCESSING',
      'confirmed': 'PROCESSING',
      'sending': 'PROCESSING',
      'finished': 'COMPLETED',
      'failed': 'FAILED',
      'refunded': 'REFUNDED',
      'expired': 'FAILED',
    };

    const transactionStatus = statusMap[ipnData.payment_status] || 'PENDING';
    
    await prisma.transaction.update({
      where: { id: cryptoPayment.transactionId },
      data: {
        status: transactionStatus,
        cryptoTxHash: ipnData.payin_hash,
        ...(transactionStatus === 'COMPLETED' && {
          completedAt: new Date(),
        }),
        ...(transactionStatus === 'FAILED' && {
          failedAt: new Date(),
          errorMessage: `Payment ${ipnData.payment_status}`,
        }),
      },
    });

    // Handle escrow release for finished payments
    if (ipnData.payment_status === 'finished') {
      // Find associated escrow
      const escrow = await prisma.escrow.findFirst({
        where: {
          metadata: {
            path: ['transactionId'],
            equals: cryptoPayment.transactionId,
          },
        },
      });

      if (escrow && escrow.status === 'CREATED') {
        // Mark escrow as funded
        await prisma.escrow.update({
          where: { id: escrow.id },
          data: {
            status: 'FUNDED',
            updatedAt: new Date(),
          },
        });

        // Create notification for user
        await prisma.notification.create({
          data: {
            userId: cryptoPayment.userId,
            type: 'PAYMENT_CONFIRMED',
            title: 'Crypto Payment Confirmed',
            message: `Your ${ipnData.pay_currency} payment of ${ipnData.actually_paid} has been confirmed. Funds are now in secure escrow.`,
            link: `/transactions/${cryptoPayment.transactionId}`,
            metadata: {
              paymentId: ipnData.payment_id,
              txHash: ipnData.payin_hash,
            },
          },
        });
      }
    }

    // Handle failed payments
    if (ipnData.payment_status === 'failed' || ipnData.payment_status === 'expired') {
      await prisma.notification.create({
        data: {
          userId: cryptoPayment.userId,
          type: 'PAYMENT_FAILED',
          title: 'Crypto Payment Failed',
          message: `Your ${ipnData.pay_currency} payment has ${ipnData.payment_status}. Please try again or contact support.`,
          link: `/transactions/${cryptoPayment.transactionId}`,
          metadata: {
            paymentId: ipnData.payment_id,
            status: ipnData.payment_status,
          },
        },
      });
    }

    // Send confirmation notifications for confirming status
    if (ipnData.payment_status === 'confirming' || ipnData.payment_status === 'confirmed') {
      const existingNotification = await prisma.notification.findFirst({
        where: {
          userId: cryptoPayment.userId,
          metadata: {
            path: ['paymentId'],
            equals: ipnData.payment_id,
          },
          type: 'PAYMENT_CONFIRMING',
        },
      });

      if (!existingNotification) {
        await prisma.notification.create({
          data: {
            userId: cryptoPayment.userId,
            type: 'PAYMENT_CONFIRMING',
            title: 'Payment Being Confirmed',
            message: `Your ${ipnData.pay_currency} payment is being confirmed on the blockchain. This usually takes a few minutes.`,
            link: `/transactions/${cryptoPayment.transactionId}`,
            metadata: {
              paymentId: ipnData.payment_id,
              txHash: ipnData.payin_hash,
            },
          },
        });
      }
    }

    console.log('IPN processed successfully:', {
      paymentId: ipnData.payment_id,
      status: ipnData.payment_status,
      transactionStatus,
    });

    return NextResponse.json({ 
      success: true,
      message: 'IPN processed successfully',
    });

  } catch (error) {
    console.error('IPN processing error:', error);
    return NextResponse.json({ 
      error: 'IPN processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Health check endpoint
export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    status: 'ok',
    message: 'IPN webhook endpoint is ready',
    timestamp: new Date().toISOString(),
  });
}
