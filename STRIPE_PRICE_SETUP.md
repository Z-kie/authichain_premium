
# 💳 Stripe Price ID Configuration Guide

This guide will walk you through creating all **15 Stripe Price IDs** required for the AuthiChain subscription system.

## 📊 Pricing Structure Overview

AuthiChain uses a **5-tier subscription system** with **3 billing options** each:

| Tier | Monthly | Annual (Save 17%) | Lifetime (One-time) |
|------|---------|-------------------|---------------------|
| **Starter** | $29/mo | $290/yr | $497 one-time |
| **Professional** | $79/mo | $790/yr | $1,297 one-time |
| **Business** | $199/mo | $1,990/yr | $2,997 one-time |
| **Enterprise** | $499/mo | $4,990/yr | $7,997 one-time |
| **White Label** | $1,499/mo | $14,990/yr | $24,997 one-time |

**Total: 15 Price IDs needed**

---

## 🎯 Prerequisites

Before starting:
- ✅ Stripe account activated (identity verified, banking added)
- ✅ Switch to **Live Mode** in Stripe Dashboard
- ✅ Have spreadsheet ready to track Price IDs

---

## 📝 Step-by-Step Instructions

### Step 1: Access Products Section

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Toggle to **Live Mode** (top right corner)
3. Navigate to **Products** (left sidebar)
4. Click **"+ Add Product"** button

---

### Step 2: Create Starter Tier

#### Product Setup

1. **Name:** `Starter Plan`
2. **Description:**
   ```
   Launch your NFT career with 50 NFTs/month, advanced authentication tools, and 5% platform fee. Perfect for individual creators.
   ```
3. **Image:** Upload Starter tier logo (optional but recommended)
4. Click **"Save product"**

#### Create 3 Price IDs for Starter Tier

##### Starter - Monthly

1. Under the product, click **"Add another price"**
2. Configure:
   - **Price:** `$29.00`
   - **Billing period:** Recurring → **Monthly**
   - **Price description:** `Starter Plan - Monthly`
   - **Lookup key:** `starter_monthly` (optional but helpful)
3. Click **"Save"**
4. **Copy the Price ID** (starts with `price_`) and save it

```
STRIPE_STARTER_MONTHLY_PRICE_ID=price_1ABC123xyz...
```

##### Starter - Annual

1. Click **"Add another price"** again
2. Configure:
   - **Price:** `$290.00` (10 months price - save $58)
   - **Billing period:** Recurring → **Yearly**
   - **Price description:** `Starter Plan - Annual (Save 17%)`
   - **Lookup key:** `starter_annual`
3. Click **"Save"**
4. **Copy the Price ID**

```
STRIPE_STARTER_ANNUAL_PRICE_ID=price_1DEF456xyz...
```

##### Starter - Lifetime

1. Click **"Add another price"** again
2. Configure:
   - **Price:** `$497.00`
   - **Billing period:** **One time**
   - **Price description:** `Starter Plan - Lifetime Access`
   - **Lookup key:** `starter_lifetime`
3. Click **"Save"**
4. **Copy the Price ID**

```
STRIPE_STARTER_LIFETIME_PRICE_ID=price_1GHI789xyz...
```

---

### Step 3: Create Professional Tier

#### Product Setup

1. Click **"+ Add Product"**
2. **Name:** `Professional Plan`
3. **Description:**
   ```
   Scale your NFT business with 250 NFTs/month, unlimited verifications, API access, and 3% platform fee. Includes $3,485 in bonuses!
   ```
4. Add **Product Image**
5. Click **"Save product"**

#### Create 3 Price IDs

##### Professional - Monthly

- **Price:** `$79.00`
- **Billing period:** Monthly
- **Description:** `Professional Plan - Monthly`
- **Lookup key:** `professional_monthly`

```
STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID=price_...
```

##### Professional - Annual

- **Price:** `$790.00` (Save $158/year)
- **Billing period:** Yearly
- **Description:** `Professional Plan - Annual (Save 17%)`
- **Lookup key:** `professional_annual`

```
STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID=price_...
```

##### Professional - Lifetime

- **Price:** `$1,297.00`
- **Billing period:** One time
- **Description:** `Professional Plan - Lifetime Access`
- **Lookup key:** `professional_lifetime`

```
STRIPE_PROFESSIONAL_LIFETIME_PRICE_ID=price_...
```

---

### Step 4: Create Business Tier

#### Product Setup

1. **Name:** `Business Plan`
2. **Description:**
   ```
   Unlimited NFT minting, white-label options, custom smart contracts, and 1.5% platform fee. Perfect for brands and large collections. Includes $9,987 in bonuses!
   ```

#### Create 3 Price IDs

##### Business - Monthly

- **Price:** `$199.00`
- **Billing period:** Monthly
- **Description:** `Business Plan - Monthly`
- **Lookup key:** `business_monthly`

```
STRIPE_BUSINESS_MONTHLY_PRICE_ID=price_...
```

##### Business - Annual

- **Price:** `$1,990.00` (Save $398/year)
- **Billing period:** Yearly
- **Description:** `Business Plan - Annual (Save 17%)`
- **Lookup key:** `business_annual`

```
STRIPE_BUSINESS_ANNUAL_PRICE_ID=price_...
```

##### Business - Lifetime

- **Price:** `$2,997.00`
- **Billing period:** One time
- **Description:** `Business Plan - Lifetime Access`
- **Lookup key:** `business_lifetime`

```
STRIPE_BUSINESS_LIFETIME_PRICE_ID=price_...
```

---

### Step 5: Create Enterprise Tier

#### Product Setup

1. **Name:** `Enterprise Plan`
2. **Description:**
   ```
   Complete enterprise solution with dedicated account manager, custom integrations, 0.5% platform fee, and priority support. Includes $12,985 in premium bonuses!
   ```

#### Create 3 Price IDs

##### Enterprise - Monthly

- **Price:** `$499.00`
- **Billing period:** Monthly
- **Description:** `Enterprise Plan - Monthly`
- **Lookup key:** `enterprise_monthly`

```
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=price_...
```

##### Enterprise - Annual

- **Price:** `$4,990.00` (Save $998/year)
- **Billing period:** Yearly
- **Description:** `Enterprise Plan - Annual (Save 17%)`
- **Lookup key:** `enterprise_annual`

```
STRIPE_ENTERPRISE_ANNUAL_PRICE_ID=price_...
```

##### Enterprise - Lifetime

- **Price:** `$7,997.00`
- **Billing period:** One time
- **Description:** `Enterprise Plan - Lifetime Access`
- **Lookup key:** `enterprise_lifetime`

```
STRIPE_ENTERPRISE_LIFETIME_PRICE_ID=price_...
```

---

### Step 6: Create White Label Tier

#### Product Setup

1. **Name:** `White Label Plan`
2. **Description:**
   ```
   Full white-label rights, agency dashboard, manage 25+ client accounts, 0% platform fee, and reseller profit margins. Perfect for agencies and resellers. Includes $11,985 in agency-building resources!
   ```

#### Create 3 Price IDs

##### White Label - Monthly

- **Price:** `$1,499.00`
- **Billing period:** Monthly
- **Description:** `White Label Plan - Monthly`
- **Lookup key:** `white_label_monthly`

```
STRIPE_WHITE_LABEL_MONTHLY_PRICE_ID=price_...
```

##### White Label - Annual

- **Price:** `$14,990.00` (Save $2,998/year)
- **Billing period:** Yearly
- **Description:** `White Label Plan - Annual (Save 17%)`
- **Lookup key:** `white_label_annual`

```
STRIPE_WHITE_LABEL_ANNUAL_PRICE_ID=price_...
```

##### White Label - Lifetime

- **Price:** `$24,997.00`
- **Billing period:** One time
- **Description:** `White Label Plan - Lifetime Access`
- **Lookup key:** `white_label_lifetime`

```
STRIPE_WHITE_LABEL_LIFETIME_PRICE_ID=price_...
```

---

## 📋 Price ID Tracking Spreadsheet

Use this template to track all your Price IDs:

| Tier | Billing Cycle | Price | Price ID | Environment Variable | Status |
|------|---------------|-------|----------|---------------------|--------|
| Starter | Monthly | $29 | price_... | STRIPE_STARTER_MONTHLY_PRICE_ID | ☐ |
| Starter | Annual | $290 | price_... | STRIPE_STARTER_ANNUAL_PRICE_ID | ☐ |
| Starter | Lifetime | $497 | price_... | STRIPE_STARTER_LIFETIME_PRICE_ID | ☐ |
| Professional | Monthly | $79 | price_... | STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID | ☐ |
| Professional | Annual | $790 | price_... | STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID | ☐ |
| Professional | Lifetime | $1,297 | price_... | STRIPE_PROFESSIONAL_LIFETIME_PRICE_ID | ☐ |
| Business | Monthly | $199 | price_... | STRIPE_BUSINESS_MONTHLY_PRICE_ID | ☐ |
| Business | Annual | $1,990 | price_... | STRIPE_BUSINESS_ANNUAL_PRICE_ID | ☐ |
| Business | Lifetime | $2,997 | price_... | STRIPE_BUSINESS_LIFETIME_PRICE_ID | ☐ |
| Enterprise | Monthly | $499 | price_... | STRIPE_ENTERPRISE_MONTHLY_PRICE_ID | ☐ |
| Enterprise | Annual | $4,990 | price_... | STRIPE_ENTERPRISE_ANNUAL_PRICE_ID | ☐ |
| Enterprise | Lifetime | $7,997 | price_... | STRIPE_ENTERPRISE_LIFETIME_PRICE_ID | ☐ |
| White Label | Monthly | $1,499 | price_... | STRIPE_WHITE_LABEL_MONTHLY_PRICE_ID | ☐ |
| White Label | Annual | $14,990 | price_... | STRIPE_WHITE_LABEL_ANNUAL_PRICE_ID | ☐ |
| White Label | Lifetime | $24,997 | price_... | STRIPE_WHITE_LABEL_LIFETIME_PRICE_ID | ☐ |

---

## ⚙️ Configure Environment Variables

Once all Price IDs are created, add them to your `.env.production`:

```bash
# ==============================================
# Stripe Price IDs - Production
# ==============================================

# Starter Tier
STRIPE_STARTER_MONTHLY_PRICE_ID="price_1ABC..."
STRIPE_STARTER_ANNUAL_PRICE_ID="price_1DEF..."
STRIPE_STARTER_LIFETIME_PRICE_ID="price_1GHI..."

# Professional Tier
STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID="price_1JKL..."
STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID="price_1MNO..."
STRIPE_PROFESSIONAL_LIFETIME_PRICE_ID="price_1PQR..."

# Business Tier
STRIPE_BUSINESS_MONTHLY_PRICE_ID="price_1STU..."
STRIPE_BUSINESS_ANNUAL_PRICE_ID="price_1VWX..."
STRIPE_BUSINESS_LIFETIME_PRICE_ID="price_1YZA..."

# Enterprise Tier
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID="price_1BCD..."
STRIPE_ENTERPRISE_ANNUAL_PRICE_ID="price_1EFG..."
STRIPE_ENTERPRISE_LIFETIME_PRICE_ID="price_1HIJ..."

# White Label Tier
STRIPE_WHITE_LABEL_MONTHLY_PRICE_ID="price_1KLM..."
STRIPE_WHITE_LABEL_ANNUAL_PRICE_ID="price_1NOP..."
STRIPE_WHITE_LABEL_LIFETIME_PRICE_ID="price_1QRS..."
```

---

## ✅ Testing Stripe Prices

### Test in Stripe Dashboard

1. Go to **Products**
2. Click on each product
3. Verify all 3 prices are listed
4. Check pricing amounts are correct
5. Confirm billing periods (monthly/yearly/one-time)

### Test Checkout

1. Create a test checkout session with each Price ID
2. Use Stripe test card: `4242 4242 4242 4242`
3. Verify successful payment
4. Check webhook events fire correctly

---

## 🔧 Updating Prices

### To Change a Price:

⚠️ **Important:** You cannot modify existing prices in Stripe. Instead:

1. Create a **new price** with updated amount
2. Update environment variable with new Price ID
3. **Archive** (don't delete) the old price
4. Existing subscriptions will continue at old price until manually migrated

### To Add a New Billing Period:

1. Go to the product
2. Click **"Add another price"**
3. Configure the new billing period
4. Add corresponding environment variable

---

## 🚨 Common Issues

### Issue: Price ID not working in checkout

**Solution:**
- Verify Price ID starts with `price_` (not `prod_`)
- Check you're using **live** Price IDs (not test)
- Ensure environment variable is set correctly
- Restart application after updating env vars

### Issue: Webhook not triggering after purchase

**Solution:**
- Verify webhook endpoint is configured
- Check webhook signing secret matches
- Review webhook logs in Stripe Dashboard
- Ensure webhook URL is publicly accessible

---

## 📚 Resources

- [Stripe Products Documentation](https://stripe.com/docs/api/products)
- [Stripe Prices Documentation](https://stripe.com/docs/api/prices)
- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)

---

**Next Steps:**
1. ✅ Configure all 15 Price IDs
2. ✅ Update `.env.production` with Price IDs
3. ✅ Test checkout flow with each tier
4. ✅ Complete [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)

