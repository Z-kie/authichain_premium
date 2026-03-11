export const dynamic = 'force-dynamic';


import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { customerId, items, description } = await request.json();

    // Create Stripe invoice with automatic tax
    const invoice = await stripe.invoices.create({
      customer: customerId,
      description: description || 'Product NFT Services Invoice',
      auto_advance: true, // Automatically finalize and attempt to pay
      automatic_tax: {
        enabled: true,
      },
      metadata: {
        userId: session.user.id,
        type: 'product_invoice'
      },
    });

    // Add line items to invoice
    for (const item of items) {
      await stripe.invoiceItems.create({
        customer: customerId,
        invoice: invoice.id,
        amount: Math.round(item.amount * 100), // Convert to cents
        currency: item.currency || 'usd',
        description: item.description,
        metadata: {
          itemId: item.id,
          type: item.type || 'service'
        }
      });
    }

    // Finalize the invoice to calculate tax
    if (!invoice.id) {
      throw new Error('Invoice ID is required for finalization');
    }
    
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id, {
      auto_advance: false, // Don't auto-charge, let customer pay manually
    });

    return NextResponse.json({
      success: true,
      invoiceId: finalizedInvoice.id,
      invoiceUrl: (finalizedInvoice as any).hosted_invoice_url,
      invoicePdf: (finalizedInvoice as any).invoice_pdf,
      totalAmount: (finalizedInvoice as any).total,
      taxAmount: (finalizedInvoice as any).tax || 0,
      subtotal: (finalizedInvoice as any).subtotal
    });

  } catch (error: any) {
    console.error('Invoice creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
