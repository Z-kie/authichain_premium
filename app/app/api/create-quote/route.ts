

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

    const { 
      customerId, 
      items, 
      description,
      expiresAt,
      footer
    } = await request.json();

    // Create line items for the quote
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: item.currency || 'usd',
        product_data: {
          name: item.name,
          description: item.description,
          metadata: {
            itemType: item.type || 'product_service',
            itemId: item.id || 'custom'
          }
        },
        unit_amount: Math.round(item.amount * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe Quote with automatic tax
    const quote = await stripe.quotes.create({
      customer: customerId,
      line_items: lineItems,
      automatic_tax: {
        enabled: true,
      },
      expires_at: expiresAt ? Math.floor(new Date(expiresAt).getTime() / 1000) : 
                   Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days from now
      description: description || 'Product NFT Services Quote',
      footer: footer || 'Thank you for choosing AuthiChain for your product NFT needs.',
      metadata: {
        createdBy: session.user.id,
        type: 'product_quote',
        createdAt: new Date().toISOString()
      },
      on_behalf_of: null, // Can be set to connected account ID if using Stripe Connect
      collection_method: 'charge_automatically', // Or 'send_invoice' for manual payment
    });

    return NextResponse.json({
      success: true,
      quoteId: quote.id,
      quoteUrl: (quote as any).hosted_quote_url,
      quotePdf: (quote as any).quote_pdf,
      status: quote.status,
      totalAmount: (quote as any).amount_total,
      subtotalAmount: (quote as any).amount_subtotal,
      taxAmount: (quote as any).total_tax_amounts?.reduce((sum: number, tax: any) => sum + tax.amount, 0) || 0,
      expiresAt: (quote as any).expires_at,
      currency: quote.currency,
      lineItems: (quote as any).line_items?.data || []
    });

  } catch (error: any) {
    console.error('Quote creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve quotes
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const limit = parseInt(searchParams.get('limit') || '10');

    const params: any = { limit };
    if (status !== 'all') {
      params.status = status;
    }

    const quotes = await stripe.quotes.list(params);

    // Filter by user (since Stripe doesn't support filtering by metadata in list)
    const userQuotes = quotes.data.filter(
      (quote: any) => quote.metadata?.createdBy === session.user.id
    );

    return NextResponse.json({
      success: true,
      quotes: userQuotes.map((quote: any) => ({
        id: quote.id,
        status: quote.status,
        hostedQuoteUrl: quote.hosted_quote_url,
        quotePdf: quote.quote_pdf,
        totalAmount: quote.amount_total,
        subtotalAmount: quote.amount_subtotal,
        taxAmount: quote.total_tax_amounts?.reduce((sum: number, tax: any) => sum + tax.amount, 0) || 0,
        currency: quote.currency,
        expiresAt: quote.expires_at,
        createdAt: quote.created,
        metadata: quote.metadata
      }))
    });

  } catch (error: any) {
    console.error('Quotes retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve quotes' },
      { status: 500 }
    );
  }
}

// PATCH endpoint to accept/finalize a quote
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quoteId, action } = await request.json();

    if (!quoteId || !action) {
      return NextResponse.json({ error: 'Quote ID and action required' }, { status: 400 });
    }

    let result;

    switch (action) {
      case 'finalize':
        result = await stripe.quotes.finalizeQuote(quoteId);
        break;
      case 'accept':
        result = await stripe.quotes.accept(quoteId);
        break;
      case 'cancel':
        result = await stripe.quotes.cancel(quoteId);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      quote: {
        id: result.id,
        status: result.status,
        hostedQuoteUrl: (result as any).hosted_quote_url,
        quotePdf: (result as any).quote_pdf
      }
    });

  } catch (error: any) {
    console.error('Quote action error:', error);
    return NextResponse.json(
      { error: 'Failed to perform quote action' },
      { status: 500 }
    );
  }
}
