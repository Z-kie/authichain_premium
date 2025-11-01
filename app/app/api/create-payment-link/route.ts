

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      productName, 
      amount, 
      currency, 
      description, 
      quantity = 1,
      type = 'nft'
    } = await request.json();

    // Create Stripe Payment Link with automatic tax
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase() || 'usd',
            product_data: {
              name: productName,
              description: description || 'Product NFT Product',
              metadata: {
                createdBy: session.user.id,
                type: type
              }
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: quantity,
        },
      ],
      automatic_tax: {
        enabled: true,
      },
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${process.env.NEXTAUTH_URL}/marketplace?payment=success`,
        },
      },
      metadata: {
        createdBy: session.user.id,
        productType: type,
        createdAt: new Date().toISOString()
      },
      allow_promotion_codes: true, // Allow discount codes
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL'],
      }
    });

    return NextResponse.json({
      success: true,
      paymentLinkId: paymentLink.id,
      paymentLinkUrl: paymentLink.url,
      active: paymentLink.active,
      metadata: paymentLink.metadata
    });

  } catch (error: any) {
    console.error('Payment Link creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve existing payment links
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // List payment links created by this user
    const paymentLinks = await stripe.paymentLinks.list({
      limit: 50,
    });

    // Filter by user (since Stripe doesn't support filtering by metadata in list)
    const userPaymentLinks = paymentLinks.data.filter(
      (link: any) => link.metadata?.createdBy === session.user.id
    );

    return NextResponse.json({
      success: true,
      paymentLinks: userPaymentLinks.map((link: any) => ({
        id: link.id,
        url: link.url,
        active: link.active,
        metadata: link.metadata,
        line_items: link.line_items
      }))
    });

  } catch (error: any) {
    console.error('Payment Links retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve payment links' },
      { status: 500 }
    );
  }
}
