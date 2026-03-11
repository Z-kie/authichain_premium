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

    const { nftId, price, currency, nftName } = await request.json();
    
    if (!nftId || !price || !currency || !nftName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get or create Stripe customer
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let customerId = user.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: {
          userId: user.id,
        },
      });
      
      customerId = customer.id;
      
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId }
      });
    }

    // Convert ETH to USD for Stripe (approximate conversion)
    const ethToUsdRate = 2650; // This should come from a real API in production
    const amountInCents = Math.round(price * ethToUsdRate * 100);

    // Create Stripe Checkout Session for NFT purchase
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: nftName,
              description: `Product NFT from AuthiChain Marketplace`,
              images: ['https://cdn.abacus.ai/images/56f7b5d8-589f-46f1-a464-9280108b75da.png'],
              metadata: {
                type: 'product_nft',
                nft_id: nftId,
                blockchain: 'ethereum'
              }
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      automatic_tax: {
        enabled: true,
      },
      success_url: `${process.env.NEXTAUTH_URL}/nft/${nftId}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/nft/${nftId}?canceled=true`,
      metadata: {
        userId: user.id,
        nftId: nftId,
        originalPrice: price.toString(),
        originalCurrency: currency,
        type: 'nft_purchase'
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE'],
      },
      custom_fields: [
        {
          key: 'wallet_address',
          label: {
            type: 'custom',
            custom: 'Ethereum Wallet Address',
          },
          type: 'text',
          text: {
            minimum_length: 42,
            maximum_length: 42,
          },
          optional: true,
        },
      ],
    });

    return NextResponse.json({ 
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
      message: 'Checkout session created successfully'
    });

  } catch (error: any) {
    console.error('NFT purchase error:', error);
    return NextResponse.json(
      { error: 'Failed to create purchase session', details: error.message },
      { status: 500 }
    );
  }
}
