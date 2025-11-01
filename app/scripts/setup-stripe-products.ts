#!/usr/bin/env tsx
/**
 * Stripe Product Setup Script
 * 
 * This script automates the creation of AuthiChain subscription products and prices in Stripe.
 * It creates 5 tiers with both monthly and annual pricing options.
 * 
 * Usage:
 *   1. Make sure STRIPE_SECRET_KEY is set in your .env file
 *   2. Run: npx tsx scripts/setup-stripe-products.ts
 */

import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  console.error('❌ Error: STRIPE_SECRET_KEY not found in environment variables');
  console.error('Please add STRIPE_SECRET_KEY to your .env file');
  process.exit(1);
}

// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
});

// Subscription tiers configuration
const TIERS = [
  {
    id: 'EXPLORER',
    name: 'Explorer',
    description: 'Perfect for NFT curious browsers - Free forever',
    monthlyPrice: 0, // Free tier
    annualPrice: 0,
    features: [
      'Browse unlimited NFTs',
      'Basic authentication verification',
      'View seller profiles',
      '5 free authenticity checks/month',
      'Community forum access (read-only)',
      'Basic educational resources'
    ],
    metadata: {
      tier: 'EXPLORER',
      nftsPerMonth: '0',
      verificationsPerMonth: '5',
      storageGB: '0',
      platformFee: '0',
      apiCalls: '0',
      clientAccounts: '0',
      launchBonusUsers: '0'
    }
  },
  {
    id: 'CREATOR',
    name: 'Creator',
    description: 'Launch your NFT career with essential tools',
    monthlyPrice: 2900, // $29.00 in cents
    annualPrice: 29000, // $290.00 in cents (save $58 - 2 months free)
    features: [
      'Mint up to 50 NFTs/month',
      'Advanced authentication tools',
      '50 authenticity verifications/month',
      'Custom storefront page',
      'Basic analytics dashboard',
      '5% platform fee on sales',
      'Email support',
      'Creator community access'
    ],
    metadata: {
      tier: 'CREATOR',
      nftsPerMonth: '50',
      verificationsPerMonth: '50',
      storageGB: '5',
      platformFee: '5',
      apiCalls: '0',
      clientAccounts: '0',
      launchBonusUsers: '500'
    }
  },
  {
    id: 'PRO',
    name: 'Pro',
    description: 'Scale your NFT business with advanced features',
    monthlyPrice: 7900, // $79.00 in cents
    annualPrice: 79000, // $790.00 in cents (save $158 - 2 months free)
    features: [
      'Mint up to 250 NFTs/month',
      'Unlimited authenticity verifications',
      'Advanced analytics & insights',
      'Priority listing placement',
      'Custom branding & white-label options',
      '3% platform fee on sales',
      'API access (basic)',
      'Priority email support',
      'Escrow service included',
      'Multi-currency support'
    ],
    metadata: {
      tier: 'PRO',
      nftsPerMonth: '250',
      verificationsPerMonth: '-1',
      storageGB: '50',
      apiCalls: '10000',
      platformFee: '3',
      clientAccounts: '0',
      launchBonusUsers: '300'
    }
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    description: 'For major brands & large collections',
    monthlyPrice: 29900, // $299.00 in cents
    annualPrice: 299000, // $2,990.00 in cents (save $598 - 2 months free)
    features: [
      'Unlimited NFT minting',
      'Dedicated account manager',
      'Custom smart contract deployment',
      'White-label platform instance',
      '1.5% platform fee on sales',
      'Full API access with webhooks',
      'Priority phone & chat support',
      'Custom integration services',
      'Marketing automation suite',
      'Advanced fraud protection'
    ],
    metadata: {
      tier: 'ENTERPRISE',
      nftsPerMonth: '-1',
      verificationsPerMonth: '-1',
      storageGB: '-1',
      apiCalls: '-1',
      platformFee: '1.5',
      clientAccounts: '0',
      launchBonusUsers: '0'
    }
  },
  {
    id: 'AGENCY',
    name: 'Agency',
    description: 'For marketing agencies & resellers',
    monthlyPrice: 99900, // $999.00 in cents
    annualPrice: 999000, // $9,990.00 in cents (save $1,998 - 2 months free)
    features: [
      'Manage up to 25 client accounts',
      'Full white-label rights',
      'Agency dashboard & reporting',
      '0% platform fee on client sales',
      'Reseller profit margins (50%+)',
      'Agency training & certification',
      'Co-marketing opportunities',
      'Custom pricing for clients',
      'Revenue sharing program'
    ],
    metadata: {
      tier: 'AGENCY',
      nftsPerMonth: '-1',
      verificationsPerMonth: '-1',
      storageGB: '-1',
      apiCalls: '-1',
      clientAccounts: '25',
      platformFee: '0',
      launchBonusUsers: '0'
    }
  }
];

interface ProductResult {
  tier: string;
  productId: string;
  monthlyPriceId: string | null;
  annualPriceId: string | null;
}

async function createStripeProducts(): Promise<ProductResult[]> {
  console.log('🚀 Starting Stripe product setup...\n');
  
  const results: ProductResult[] = [];

  for (const tier of TIERS) {
    console.log(`\n📦 Creating product: ${tier.name} (${tier.id})`);
    console.log(`   Description: ${tier.description}`);

    try {
      // Create product
      const product = await stripe.products.create({
        name: `AuthiChain ${tier.name}`,
        description: tier.description,
        metadata: {
          ...tier.metadata,
          features: tier.features.join(' | ')
        }
      });

      console.log(`   ✅ Product created: ${product.id}`);

      let monthlyPriceId: string | null = null;
      let annualPriceId: string | null = null;

      // Create monthly price (skip if free tier)
      if (tier.monthlyPrice > 0) {
        const monthlyPrice = await stripe.prices.create({
          product: product.id,
          unit_amount: tier.monthlyPrice,
          currency: 'usd',
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
          metadata: {
            ...tier.metadata,
            billingPeriod: 'monthly'
          }
        });

        monthlyPriceId = monthlyPrice.id;
        console.log(`   ✅ Monthly price created: ${monthlyPriceId} ($${tier.monthlyPrice / 100}/month)`);

        // Create annual price (save 2 months)
        const annualPrice = await stripe.prices.create({
          product: product.id,
          unit_amount: tier.annualPrice,
          currency: 'usd',
          recurring: {
            interval: 'year',
            interval_count: 1,
          },
          metadata: {
            ...tier.metadata,
            billingPeriod: 'annual',
            savings: ((tier.monthlyPrice * 12) - tier.annualPrice).toString()
          }
        });

        annualPriceId = annualPrice.id;
        const savings = (tier.monthlyPrice * 12) - tier.annualPrice;
        console.log(`   ✅ Annual price created: ${annualPriceId} ($${tier.annualPrice / 100}/year, save $${savings / 100})`);
      } else {
        console.log(`   ℹ️  Free tier - no prices created`);
      }

      results.push({
        tier: tier.id,
        productId: product.id,
        monthlyPriceId,
        annualPriceId
      });

    } catch (error: any) {
      console.error(`   ❌ Error creating product ${tier.name}:`, error.message);
      throw error;
    }
  }

  return results;
}

function generateEnvConfig(results: ProductResult[]): string {
  let envConfig = '\n# Stripe Product Configuration\n';
  envConfig += '# Generated by setup-stripe-products.ts\n';
  envConfig += `# Created at: ${new Date().toISOString()}\n\n`;

  for (const result of results) {
    envConfig += `# ${result.tier} Tier\n`;
    envConfig += `STRIPE_${result.tier}_PRODUCT_ID="${result.productId}"\n`;
    if (result.monthlyPriceId) {
      envConfig += `STRIPE_${result.tier}_MONTHLY_PRICE_ID="${result.monthlyPriceId}"\n`;
    }
    if (result.annualPriceId) {
      envConfig += `STRIPE_${result.tier}_ANNUAL_PRICE_ID="${result.annualPriceId}"\n`;
    }
    envConfig += '\n';
  }

  return envConfig;
}

function saveResults(results: ProductResult[]) {
  // Save as JSON for programmatic access
  const jsonPath = path.join(__dirname, '..', 'stripe-products.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Saved product IDs to: ${jsonPath}`);

  // Generate .env configuration
  const envConfig = generateEnvConfig(results);
  const envPath = path.join(__dirname, '..', 'stripe-config.env');
  fs.writeFileSync(envPath, envConfig);
  console.log(`💾 Saved environment config to: ${envPath}`);

  // Display summary
  console.log('\n' + '='.repeat(80));
  console.log('✅ STRIPE SETUP COMPLETE!');
  console.log('='.repeat(80));
  console.log('\n📋 Next Steps:');
  console.log('1. Copy the environment variables from stripe-config.env');
  console.log('2. Add them to your .env or .env.local file');
  console.log('3. Update your application code to use these price IDs');
  console.log('4. Test subscription creation with the Stripe test cards');
  console.log('\n💳 Stripe Test Cards:');
  console.log('   Success: 4242 4242 4242 4242');
  console.log('   Decline: 4000 0000 0000 0002');
  console.log('   3D Secure: 4000 0025 0000 3155');
  console.log('\n📚 View products in Stripe Dashboard:');
  console.log('   https://dashboard.stripe.com/test/products');
  console.log('\n' + '='.repeat(80) + '\n');

  // Display the env config
  console.log('📝 Environment Variables (copy to .env file):\n');
  console.log(envConfig);
}

async function main() {
  try {
    const results = await createStripeProducts();
    saveResults(results);
  } catch (error: any) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
