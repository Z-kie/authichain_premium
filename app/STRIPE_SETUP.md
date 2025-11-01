
# Stripe Payment Setup Instructions

## 🚀 Quick Setup for Immediate Income Generation

### 1. Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create account or sign in
3. Complete business verification for live payments

### 2. Get API Keys
In Stripe Dashboard → Developers → API Keys:

**Test Mode (for development):**
- Copy **Publishable key** (starts with `pk_test_`)
- Copy **Secret key** (starts with `sk_test_`)

**Live Mode (for production):**
- Toggle to Live mode
- Copy **Publishable key** (starts with `pk_live_`)
- Copy **Secret key** (starts with `sk_live_`)

### 3. Update Environment Variables
Replace the placeholder keys in `.env`:

```env
# Stripe Configuration (REPLACE WITH REAL KEYS)
STRIPE_SECRET_KEY="sk_live_your_actual_secret_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_actual_publishable_key_here"
```

### 4. Create Subscription Products
In Stripe Dashboard → Products:

**Create Pro Plan ($29/month):**
1. Click "Add Product"
2. Name: "AuthiChain Pro"
3. Price: $29/month recurring
4. Copy the Price ID (starts with `price_`) and update:
   ```env
   STRIPE_PRO_PRICE_ID="price_your_actual_pro_price_id"
   ```

**Create Brand Plan ($99/month):**
1. Click "Add Product"  
2. Name: "AuthiChain Brand"
3. Price: $99/month recurring
4. Copy the Price ID and update:
   ```env
   STRIPE_BRAND_PRICE_ID="price_your_actual_brand_price_id"
   ```

### 5. Set Up Webhooks
In Stripe Dashboard → Developers → Webhooks:

1. Click "Add endpoint"
2. URL: `https://your-domain.com/api/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook secret (starts with `whsec_`) and update:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_your_actual_webhook_secret"
   ```

### 6. Test Payments
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`

### 7. Go Live
1. Complete Stripe account verification
2. Switch all keys from test to live mode
3. Update webhook URL to production domain
4. Start collecting real payments! 💰

## 🔒 Security Notes
- Never share secret keys
- Use environment variables only
- Enable webhook signature verification
- Monitor failed payments in Stripe dashboard

## 💰 Immediate Income Streams Active:
✅ Pro Subscriptions: $29/month
✅ Brand Subscriptions: $99/month  
✅ Automatic recurring billing
✅ Secure payment processing
✅ Real-time subscription management
