# Stripe Setup Guide for AuthiChain

## Overview

This guide walks you through setting up Stripe payment processing for the AuthiChain platform, including creating products for all 5 subscription tiers (Explorer, Creator, Pro, Enterprise, Agency).

## Prerequisites

1. **Stripe Account**: Create a free account at [stripe.com](https://stripe.com)
2. **API Keys**: Get your test and live API keys from the Stripe Dashboard

## Quick Start (Automated Setup)

### Option 1: Use the Automation Script

We've created an automated script that sets up all products and prices for you:

```bash
cd /home/ubuntu/authichain_premium/app

# Make sure your .env file has STRIPE_SECRET_KEY set
npx tsx scripts/setup-stripe-products.ts
```

This script will:
- Create 5 products in Stripe (one for each tier)
- Create monthly and annual pricing for paid tiers
- Generate environment variable configuration
- Save all product IDs to `stripe-products.json`
- Create `stripe-config.env` with all the variables

After running the script, copy the generated environment variables to your `.env` file.

---

## Manual Setup (Alternative)

If you prefer to set up products manually or need to customize the configuration:

### Step 1: Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_test_`)
4. Click **Reveal test key** and copy your **Secret key** (starts with `sk_test_`)

Add these to your `.env` file:

```env
STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
```

### Step 2: Create Products in Stripe

Go to **Products** → **Add product** and create the following 5 products:

#### 1. Explorer (Free Tier)
- **Name**: AuthiChain Explorer
- **Description**: Perfect for NFT curious browsers - Free forever
- **Pricing**: One-time or recurring → **Recurring**
- **Price**: $0.00 USD / month
- **Features** (add in metadata):
  - Browse unlimited NFTs
  - Basic authentication verification
  - 5 free authenticity checks/month
  - Community forum access

> **Note**: For free tier, you might want to just skip price creation and handle this tier specially in your code.

#### 2. Creator
- **Name**: AuthiChain Creator
- **Description**: Launch your NFT career with essential tools
- **Pricing**: Create 2 prices for this product:
  - **Monthly**: $29.00 USD / month
  - **Annual**: $290.00 USD / year (Save $58 - 2 months free)
- **Features**:
  - Mint up to 50 NFTs/month
  - Advanced authentication tools
  - 50 authenticity verifications/month
  - Custom storefront page
  - 5% platform fee on sales

Copy the price IDs:
```env
STRIPE_CREATOR_MONTHLY_PRICE_ID="price_xxxxx"
STRIPE_CREATOR_ANNUAL_PRICE_ID="price_xxxxx"
```

#### 3. Pro
- **Name**: AuthiChain Pro
- **Description**: Scale your NFT business with advanced features
- **Pricing**:
  - **Monthly**: $79.00 USD / month
  - **Annual**: $790.00 USD / year (Save $158 - 2 months free)
- **Features**:
  - Mint up to 250 NFTs/month
  - Unlimited authenticity verifications
  - Advanced analytics & insights
  - API access (basic)
  - 3% platform fee on sales

Copy the price IDs:
```env
STRIPE_PRO_MONTHLY_PRICE_ID="price_xxxxx"
STRIPE_PRO_ANNUAL_PRICE_ID="price_xxxxx"
```

#### 4. Enterprise
- **Name**: AuthiChain Enterprise
- **Description**: For major brands & large collections
- **Pricing**:
  - **Monthly**: $299.00 USD / month
  - **Annual**: $2,990.00 USD / year (Save $598 - 2 months free)
- **Features**:
  - Unlimited NFT minting
  - Dedicated account manager
  - White-label platform instance
  - Full API access with webhooks
  - 1.5% platform fee on sales

Copy the price IDs:
```env
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID="price_xxxxx"
STRIPE_ENTERPRISE_ANNUAL_PRICE_ID="price_xxxxx"
```

#### 5. Agency
- **Name**: AuthiChain Agency
- **Description**: For marketing agencies & resellers
- **Pricing**:
  - **Monthly**: $999.00 USD / month
  - **Annual**: $9,990.00 USD / year (Save $1,998 - 2 months free)
- **Features**:
  - Manage up to 25 client accounts
  - Full white-label rights
  - Agency dashboard & reporting
  - 0% platform fee on client sales
  - Revenue sharing program

Copy the price IDs:
```env
STRIPE_AGENCY_MONTHLY_PRICE_ID="price_xxxxx"
STRIPE_AGENCY_ANNUAL_PRICE_ID="price_xxxxx"
```

### Step 3: Set Up Webhooks

Webhooks allow Stripe to notify your application about payment events.

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Set the endpoint URL:
   - Development: `http://localhost:3000/api/webhooks/stripe`
   - Production: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

Add to your `.env` file:
```env
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
```

---

## Complete Environment Variables

After setup, your `.env` file should contain all of these variables:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# NextAuth
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Stripe API Keys
STRIPE_SECRET_KEY="sk_test_your_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Creator Tier
STRIPE_CREATOR_MONTHLY_PRICE_ID="price_xxxxx"
STRIPE_CREATOR_ANNUAL_PRICE_ID="price_xxxxx"

# Pro Tier
STRIPE_PRO_MONTHLY_PRICE_ID="price_xxxxx"
STRIPE_PRO_ANNUAL_PRICE_ID="price_xxxxx"

# Enterprise Tier
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID="price_xxxxx"
STRIPE_ENTERPRISE_ANNUAL_PRICE_ID="price_xxxxx"

# Agency Tier
STRIPE_AGENCY_MONTHLY_PRICE_ID="price_xxxxx"
STRIPE_AGENCY_ANNUAL_PRICE_ID="price_xxxxx"

# Optional: Product IDs for reference
STRIPE_CREATOR_PRODUCT_ID="prod_xxxxx"
STRIPE_PRO_PRODUCT_ID="prod_xxxxx"
STRIPE_ENTERPRISE_PRODUCT_ID="prod_xxxxx"
STRIPE_AGENCY_PRODUCT_ID="prod_xxxxx"
```

---

## Testing Subscriptions

Use these test card numbers in Stripe test mode:

| Scenario | Card Number | CVV | Expiry |
|----------|-------------|-----|--------|
| Success | 4242 4242 4242 4242 | Any 3 digits | Any future date |
| Decline | 4000 0000 0000 0002 | Any 3 digits | Any future date |
| 3D Secure | 4000 0025 0000 3155 | Any 3 digits | Any future date |
| Insufficient Funds | 4000 0000 0000 9995 | Any 3 digits | Any future date |

### Testing the Subscription Flow

1. Start your development server:
   ```bash
   cd /home/ubuntu/authichain_premium/app
   npm run dev
   ```

2. Navigate to the pricing page: `http://localhost:3000/pricing`

3. Click "Subscribe" on any tier

4. Use a test card number to complete checkout

5. Verify the subscription appears in:
   - Stripe Dashboard → Customers
   - Your database (check the `Subscription` table)
   - User dashboard at `/dashboard/subscription`

---

## Switching to Live Mode

When ready for production:

1. Get your **Live API keys** from Stripe Dashboard
2. Update your production `.env` file with live keys
3. Create the same products in **Live mode** (or run the script again with live keys)
4. Update webhook endpoint to use your production URL
5. **Important**: Keep test keys for development environment

---

## Troubleshooting

### "Invalid API Key"
- Make sure you're using the correct key format (starts with `sk_test_` or `sk_live_`)
- Check that the key is not expired
- Ensure no extra spaces or quotes in the `.env` file

### "Price not found"
- Verify the price ID starts with `price_`
- Check you're using the correct mode (test vs live)
- Ensure the price is active in Stripe Dashboard

### Webhook not receiving events
- Check your endpoint URL is correct and accessible
- Verify webhook secret is correct
- Check server logs for incoming requests
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Subscription not showing in database
- Check database connection
- Verify Prisma schema is up to date (`npx prisma generate`)
- Check API route logs for errors
- Ensure webhook is properly configured

---

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Next.js + Stripe Tutorial](https://stripe.com/docs/checkout/nextjs)

---

## Support

If you encounter issues:

1. Check the [Stripe Dashboard](https://dashboard.stripe.com) for error messages
2. Review server logs for detailed error information
3. Test with Stripe CLI for webhook debugging
4. Consult the Stripe API reference for specific endpoints

---

**Last Updated**: October 18, 2025
**Version**: 1.0.0
