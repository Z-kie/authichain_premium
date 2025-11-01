
# 🔗 Automated Webhook Setup

## Quick Webhook Configuration (2 minutes)

### 1. Add Webhook Endpoint
In [Stripe Dashboard](https://dashboard.stripe.com) → **Developers → Webhooks**:

1. Click **"Add endpoint"**
2. **Endpoint URL**: `https://your-domain.com/api/stripe-webhook`
3. **Description**: "AuthiChain Subscription Events"

### 2. Select Events
Choose these events for automatic subscription management:
- ✅ `checkout.session.completed`
- ✅ `customer.subscription.updated`  
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`

### 3. Get Webhook Secret
1. After creating the webhook, click on it
2. In the **"Signing secret"** section, click **"Reveal"**
3. Copy the secret (starts with `whsec_`)
4. Add to your `.env` file:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_your_actual_webhook_secret_here"
   ```

### 4. Test Webhook
1. Click **"Send test webhook"** in Stripe Dashboard
2. Select `checkout.session.completed` event
3. Check your application logs for successful processing

## ✅ Webhook Events Handled:
- **checkout.session.completed**: Activates subscription after payment
- **customer.subscription.updated**: Updates subscription status
- **customer.subscription.deleted**: Downgrades user to Basic tier
- **invoice.payment_succeeded**: Confirms recurring payments
- **invoice.payment_failed**: Handles failed payments

Once webhooks are active, your subscription management is 100% automated! 🎯
