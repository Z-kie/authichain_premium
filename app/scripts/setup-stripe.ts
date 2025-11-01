
// Quick Stripe Setup Script for Immediate Income Generation
// Run this script after getting your real Stripe keys

import { stripe } from '../lib/stripe';

const PRODUCTS_TO_CREATE = [
  {
    name: 'AuthiChain Pro',
    description: 'Professional NFT showcase with 50 uploads per month, custom username, and priority support',
    price: 2900, // $29.00 in cents
    interval: 'month' as const,
    envVar: 'STRIPE_PRO_PRICE_ID'
  },
  {
    name: 'AuthiChain Brand',
    description: 'Premium NFT platform with unlimited uploads, verified badge, analytics, and white-label options',
    price: 9900, // $99.00 in cents
    interval: 'month' as const,
    envVar: 'STRIPE_BRAND_PRICE_ID'
  }
];

async function setupStripeProducts() {
  console.log('🚀 Setting up Stripe products for immediate income generation...\n');

  for (const productData of PRODUCTS_TO_CREATE) {
    try {
      // Create product
      const product = await stripe.products.create({
        name: productData.name,
        description: productData.description,
        type: 'service',
        metadata: {
          platform: 'authichain',
          tier: productData.name.toLowerCase().includes('pro') ? 'PRO' : 'BRAND'
        }
      });

      // Create price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: productData.price,
        currency: 'usd',
        recurring: {
          interval: productData.interval
        },
        metadata: {
          tier: productData.name.toLowerCase().includes('pro') ? 'PRO' : 'BRAND'
        }
      });

      console.log(`✅ Created ${productData.name}:`);
      console.log(`   Product ID: ${product.id}`);
      console.log(`   Price ID: ${price.id}`);
      console.log(`   Add to .env: ${productData.envVar}="${price.id}"\n`);

    } catch (error) {
      console.error(`❌ Error creating ${productData.name}:`, error);
    }
  }

  console.log('🎯 NEXT STEPS FOR IMMEDIATE INCOME:');
  console.log('1. Copy the Price IDs above to your .env file');
  console.log('2. Set up webhook endpoint: https://yourdomain.com/api/stripe-webhook');
  console.log('3. Deploy your app and start collecting $29 and $99 monthly subscriptions!');
  console.log('\n💰 Your payment system is now ready to generate income!');
}

// Run setup
setupStripeProducts().catch(console.error);
