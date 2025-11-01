# Vercel Environment Variables Migration Guide

## 📋 Overview

This guide provides step-by-step instructions for migrating all 34 environment variables from your local `.env` file to Vercel's deployment platform.

**Last Updated:** 2025-10-19  
**Total Variables:** 34 (across 7 categories)  
**Deployment Platform:** Vercel

---

## 🎯 Quick Reference

### Variable Categories
1. **Database Configuration** (1 variable)
2. **NextAuth Configuration** (2 variables)
3. **Stripe API Keys** (3 variables)
4. **Stripe Product & Price IDs** (12 variables)
5. **Blockchain & Smart Contract** (4 variables)
6. **NFT.Storage/IPFS** (1 variable)
7. **Cloudflare** (6 variables)
8. **Application Configuration** (2 variables)
9. **Feature Flags** (4 variables)

---

## 🚀 Migration Methods

### Method 1: Vercel Dashboard (Recommended for First-Time Setup)

#### Step 1: Access Environment Variables
1. Log in to your Vercel dashboard at https://vercel.com
2. Select your project (or create a new one)
3. Navigate to **Settings** → **Environment Variables**

#### Step 2: Add Variables by Category

Copy and paste each variable name and value from the sections below.

---

## 📦 Environment Variables by Category

### 1. Database Configuration

**Purpose:** PostgreSQL database connection for production

| Variable Name | Example Value | Production Value | Required |
|--------------|---------------|------------------|----------|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db` | **Use your production DB URL** | ✅ Yes |

**Production Note:**  
✅ **Already configured with managed PostgreSQL** at `db-aa342a793.db001.hosteddb.reai.io`  
⚠️ Ensure this database is accessible from Vercel's deployment regions

```bash
# Format
DATABASE_URL="postgresql://[username]:[password]@[host]:[port]/[database]?connect_timeout=15"
```

**Vercel CLI Command:**
```bash
vercel env add DATABASE_URL production
```

---

### 2. NextAuth Configuration

**Purpose:** Authentication and session management

| Variable Name | Production Value | Required | Notes |
|--------------|------------------|----------|-------|
| `NEXTAUTH_SECRET` | Generate new for production | ✅ Yes | Must be unique and secure |
| `NEXTAUTH_URL` | Your Vercel deployment URL | ✅ Yes | Update after first deployment |

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Initial Setup:**
```bash
# For first deployment, use temporary URL
NEXTAUTH_URL="https://your-project.vercel.app"

# After deployment, update with actual URL
NEXTAUTH_URL="https://authichain.vercel.app"
```

**Vercel CLI Commands:**
```bash
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
```

---

### 3. Stripe API Keys

**Purpose:** Payment processing (currently TEST MODE)

⚠️ **IMPORTANT:** Current keys are TEST MODE. Update with LIVE keys for production.

| Variable Name | Current Mode | Production Required |
|--------------|--------------|-------------------|
| `STRIPE_SECRET_KEY` | Test Mode | ✅ Live Key Required |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Test Mode | ✅ Live Key Required |
| `STRIPE_WEBHOOK_SECRET` | Test Mode | ✅ Live Key Required |

**Get Production Keys:**
1. Log in to Stripe Dashboard: https://dashboard.stripe.com
2. Toggle from **Test Mode** to **Live Mode** (top right)
3. Navigate to **Developers** → **API Keys**
4. Copy **Secret key** and **Publishable key**

**Webhook Setup:**
1. Go to **Developers** → **Webhooks**
2. Add endpoint: `https://your-project.vercel.app/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
4. Copy the **Signing secret** (starts with `whsec_`)

**Vercel CLI Commands:**
```bash
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
```

---

### 4. Stripe Product & Price IDs

**Purpose:** Subscription tiers and pricing

⚠️ **IMPORTANT:** Some price IDs show placeholders (`price_xxxxxxxxxxxxx`). Update with actual production IDs.

| Variable Name | Tier | Billing Cycle | Status |
|--------------|------|---------------|--------|
| `STRIPE_CREATOR_PRICE_ID` | Creator | Default | ✅ Configured |
| `STRIPE_CREATOR_MONTHLY_PRICE_ID` | Creator | Monthly | ✅ Configured |
| `STRIPE_CREATOR_ANNUAL_PRICE_ID` | Creator | Annual | ⚠️ Needs Update |
| `STRIPE_PRO_PRICE_ID` | Pro | Default | ✅ Configured |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Pro | Monthly | ✅ Configured |
| `STRIPE_PRO_ANNUAL_PRICE_ID` | Pro | Annual | ⚠️ Needs Update |
| `STRIPE_ENTERPRISE_PRICE_ID` | Enterprise | Default | ⚠️ Needs Update |
| `STRIPE_ENTERPRISE_MONTHLY_PRICE_ID` | Enterprise | Monthly | ⚠️ Needs Update |
| `STRIPE_ENTERPRISE_ANNUAL_PRICE_ID` | Enterprise | Annual | ⚠️ Needs Update |
| `STRIPE_AGENCY_PRICE_ID` | Agency | Default | ⚠️ Needs Update |
| `STRIPE_AGENCY_MONTHLY_PRICE_ID` | Agency | Monthly | ⚠️ Needs Update |
| `STRIPE_AGENCY_ANNUAL_PRICE_ID` | Agency | Annual | ⚠️ Needs Update |
| `STRIPE_BRAND_PRICE_ID` | Brand | Default | ✅ Configured |

**Get Production Price IDs:**
1. In Stripe Dashboard, go to **Products**
2. Select each product (Creator, Pro, Enterprise, Agency, Brand)
3. Under **Pricing**, find the price ID for each billing cycle
4. Format: `price_1234567890abcdef`

**Batch Add via Vercel CLI:**
```bash
# Creator Tier
vercel env add STRIPE_CREATOR_PRICE_ID production
vercel env add STRIPE_CREATOR_MONTHLY_PRICE_ID production
vercel env add STRIPE_CREATOR_ANNUAL_PRICE_ID production

# Pro Tier
vercel env add STRIPE_PRO_PRICE_ID production
vercel env add STRIPE_PRO_MONTHLY_PRICE_ID production
vercel env add STRIPE_PRO_ANNUAL_PRICE_ID production

# Enterprise Tier
vercel env add STRIPE_ENTERPRISE_PRICE_ID production
vercel env add STRIPE_ENTERPRISE_MONTHLY_PRICE_ID production
vercel env add STRIPE_ENTERPRISE_ANNUAL_PRICE_ID production

# Agency Tier
vercel env add STRIPE_AGENCY_PRICE_ID production
vercel env add STRIPE_AGENCY_MONTHLY_PRICE_ID production
vercel env add STRIPE_AGENCY_ANNUAL_PRICE_ID production

# Brand Tier
vercel env add STRIPE_BRAND_PRICE_ID production
```

---

### 5. Blockchain & Smart Contract Configuration

**Purpose:** Web3 wallet authentication and NFT minting

⚠️ **SECURITY WARNING:** `PRIVATE_KEY` contains sensitive data

| Variable Name | Purpose | Security Level | Required |
|--------------|---------|----------------|----------|
| `PRIVATE_KEY` | Contract deployment/transactions | 🔴 Critical | ✅ Yes |
| `POLYGON_AMOY_RPC_URL` | Polygon testnet RPC | 🟡 Medium | ✅ Yes |
| `CONTRACT_ADDRESS` | Deployed NFT contract | 🟢 Low | ✅ Yes |
| `POLYGONSCAN_API_KEY` | Blockchain explorer API | 🟡 Medium | ✅ Yes |

**Production Recommendations:**

1. **PRIVATE_KEY:**
   - ⚠️ **NEVER commit to git**
   - Use a dedicated wallet for production (not your personal wallet)
   - Fund with minimal MATIC for gas fees
   - Store in Vercel as **sensitive** variable

2. **POLYGON_AMOY_RPC_URL:**
   - Current: Testnet (Polygon Amoy)
   - Production: Consider upgrading to Polygon Mainnet
   - Alternative: Use Infura or Alchemy for better reliability
   - Format: `https://polygon-mainnet.infura.io/v3/YOUR-PROJECT-ID`

3. **CONTRACT_ADDRESS:**
   - Current testnet address: `0x4da4D2675e52374639C9c954f4f653887A9972BE`
   - Deploy to mainnet for production
   - Update after mainnet deployment

**Vercel CLI Commands:**
```bash
vercel env add PRIVATE_KEY production
vercel env add POLYGON_AMOY_RPC_URL production
vercel env add CONTRACT_ADDRESS production
vercel env add POLYGONSCAN_API_KEY production
```

---

### 6. NFT.Storage/IPFS Configuration

**Purpose:** Decentralized storage for NFT metadata and images

| Variable Name | Status | Required | Notes |
|--------------|--------|----------|-------|
| `NFT_STORAGE_API_KEY` | ✅ Configured | ✅ Yes | Production-ready |

**Production Note:**  
✅ API key is already configured and production-ready  
📦 Free tier: 31 GB storage, unlimited uploads  
🔄 Consider upgrading if expecting high volume

**Vercel CLI Command:**
```bash
vercel env add NFT_STORAGE_API_KEY production
```

---

### 7. Cloudflare Configuration

**Purpose:** CDN, caching, and R2 object storage

| Variable Name | Purpose | Required | Notes |
|--------------|---------|----------|-------|
| `CLOUDFLARE_API_TOKEN` | API authentication | ✅ Yes | Zone-level access |
| `CLOUDFLARE_ACCOUNT_ID` | Account identifier | ✅ Yes | Production-ready |
| `R2_API_TOKEN` | R2 storage auth | ✅ Yes | Object storage |
| `R2_ACCESS_KEY_ID` | R2 access key | ✅ Yes | Production-ready |
| `R2_SECRET_ACCESS_KEY` | R2 secret key | 🔴 Critical | Sensitive |
| `R2_ENDPOINT` | R2 bucket endpoint | ✅ Yes | Production-ready |

**Production Note:**  
✅ All Cloudflare credentials are configured  
🗄️ R2 Storage is production-ready alternative to S3  
💰 More cost-effective than AWS S3 for high-traffic sites

**Vercel CLI Commands:**
```bash
vercel env add CLOUDFLARE_API_TOKEN production
vercel env add CLOUDFLARE_ACCOUNT_ID production
vercel env add R2_API_TOKEN production
vercel env add R2_ACCESS_KEY_ID production
vercel env add R2_SECRET_ACCESS_KEY production
vercel env add R2_ENDPOINT production
```

---

### 8. Application Configuration

**Purpose:** Core app settings

| Variable Name | Development Value | Production Value | Required |
|--------------|-------------------|------------------|----------|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Your Vercel URL | ✅ Yes |
| `NODE_ENV` | `development` | `production` | ✅ Auto-set |

**Setup Instructions:**

1. **NEXT_PUBLIC_SITE_URL:**
   - First deployment: Use temporary Vercel URL
   - After deployment: Update with actual URL
   - Custom domain: Update when domain is connected
   - Format: `https://authichain.vercel.app` (no trailing slash)

2. **NODE_ENV:**
   - Vercel automatically sets this to `production`
   - No manual configuration needed

**Vercel CLI Command:**
```bash
vercel env add NEXT_PUBLIC_SITE_URL production
# NODE_ENV is auto-set by Vercel
```

---

### 9. Feature Flags

**Purpose:** Enable/disable features in production

| Variable Name | Feature | Current Status | Recommended |
|--------------|---------|----------------|-------------|
| `FEATURE_WALLET_AUTH` | Web3 Wallet Authentication | ✅ Enabled | ✅ Enable |
| `FEATURE_CRYPTO_PAYMENTS` | Cryptocurrency Payments | ✅ Enabled | ✅ Enable |
| `FEATURE_AUCTIONS` | NFT Auctions | ✅ Enabled | ✅ Enable |
| `FEATURE_COLLECTIONS` | NFT Collections | ✅ Enabled | ✅ Enable |

**Production Recommendations:**
- All features are production-ready
- Keep all enabled for full functionality
- Can disable individually if needed

**Vercel CLI Commands:**
```bash
vercel env add FEATURE_WALLET_AUTH production
vercel env add FEATURE_CRYPTO_PAYMENTS production
vercel env add FEATURE_AUCTIONS production
vercel env add FEATURE_COLLECTIONS production
```

---

## 🔧 Method 2: Vercel CLI (Batch Import)

### Prerequisites
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login
```

### Option A: Interactive Import (Recommended)
```bash
# Navigate to project
cd /home/ubuntu/authichain_premium/app

# Pull existing environment variables (if any)
vercel env pull

# Add all variables interactively
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
# ... (continue for all 34 variables)
```

### Option B: Bulk Import from File

**Step 1: Create Production .env File**
```bash
# Create a temporary production env file
cp .env .env.production.vercel
```

**Step 2: Update Production Values**
Edit `.env.production.vercel` and update:
- `NEXTAUTH_URL` → Your Vercel URL
- `NEXT_PUBLIC_SITE_URL` → Your Vercel URL
- Stripe keys → Live mode keys
- Price IDs → Production price IDs
- NODE_ENV → `production`

**Step 3: Import via Vercel CLI**
```bash
# Note: Vercel CLI doesn't have direct bulk import
# You'll need to add each variable manually
while IFS= read -r line; do
  if [[ $line =~ ^[A-Z_]+= ]]; then
    key="${line%%=*}"
    value="${line#*=}"
    echo "Adding $key..."
    echo "$value" | vercel env add "$key" production
  fi
done < .env.production.vercel

# Delete temporary file after import
rm .env.production.vercel
```

---

## 📝 Method 3: Vercel Dashboard (Bulk Paste)

### Step 1: Prepare Variables
Create a text file with all variables in this format:
```
VARIABLE_NAME=value
ANOTHER_VARIABLE=another_value
```

### Step 2: Paste in Dashboard
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Click **"Add New"**
3. Paste all variables at once
4. Vercel will parse and add them automatically

---

## ✅ Verification Checklist

### Before Deployment
- [ ] All 34 environment variables added to Vercel
- [ ] Database URL is accessible from Vercel
- [ ] NEXTAUTH_SECRET is unique and secure (not development key)
- [ ] Stripe keys are in LIVE mode (not test mode)
- [ ] All Stripe price IDs are valid and production-ready
- [ ] PRIVATE_KEY is for a dedicated production wallet
- [ ] Webhook URLs match Vercel deployment URL
- [ ] Feature flags are set as desired

### After First Deployment
- [ ] Update `NEXTAUTH_URL` with actual Vercel URL
- [ ] Update `NEXT_PUBLIC_SITE_URL` with actual Vercel URL
- [ ] Configure Stripe webhook with deployed URL
- [ ] Test all payment flows
- [ ] Test wallet authentication
- [ ] Test NFT minting and IPFS upload
- [ ] Verify database connections

### Custom Domain (Optional)
- [ ] Connect custom domain in Vercel
- [ ] Update `NEXTAUTH_URL` with custom domain
- [ ] Update `NEXT_PUBLIC_SITE_URL` with custom domain
- [ ] Update Stripe webhook URL
- [ ] Update OAuth callback URLs (if applicable)

---

## 🚨 Security Best Practices

### Critical Security Rules

1. **Never Commit Sensitive Data**
   ```bash
   # Always verify .gitignore includes:
   .env
   .env.*
   !.env.example
   ```

2. **Use Different Keys for Staging/Production**
   - Development: Test keys
   - Staging: Test keys with production-like data
   - Production: Live keys only

3. **Rotate Keys Regularly**
   - Database passwords: Every 90 days
   - API keys: Every 180 days
   - NEXTAUTH_SECRET: Every 180 days
   - Stripe webhooks: After any compromise

4. **Limit Key Permissions**
   - Use read-only keys where possible
   - Cloudflare: Zone-scoped tokens only
   - Stripe: Restrict to required permissions

5. **Monitor Key Usage**
   - Enable alerts for unusual activity
   - Review access logs monthly
   - Set up Vercel deployment protection

---

## 🐛 Troubleshooting

### Issue: "Missing Environment Variable" Error

**Solution:**
```bash
# Verify all variables are set
vercel env ls

# Pull latest environment variables
vercel env pull

# Re-deploy
vercel --prod
```

### Issue: Database Connection Fails

**Cause:** Vercel can't reach database host

**Solution:**
1. Check database firewall rules
2. Allow Vercel's IP ranges
3. Use connection pooling (Prisma recommended)
4. Add `?connect_timeout=15` to DATABASE_URL

### Issue: Stripe Webhook Failures

**Cause:** Incorrect webhook URL or secret

**Solution:**
1. Update webhook URL in Stripe Dashboard
2. Regenerate webhook secret
3. Update `STRIPE_WEBHOOK_SECRET` in Vercel
4. Redeploy application

### Issue: IPFS Upload Fails

**Cause:** Invalid NFT.Storage API key

**Solution:**
1. Verify key at https://nft.storage
2. Check API quota/limits
3. Regenerate key if expired
4. Update `NFT_STORAGE_API_KEY` in Vercel

---

## 📊 Environment Variable Summary

### By Security Level

| Level | Count | Variables |
|-------|-------|-----------|
| 🔴 Critical | 3 | `PRIVATE_KEY`, `R2_SECRET_ACCESS_KEY`, `STRIPE_SECRET_KEY` |
| 🟡 Medium | 11 | Database, Auth, API keys |
| 🟢 Low | 20 | Public keys, URLs, flags |

### By Update Priority

| Priority | Count | Action Required |
|----------|-------|----------------|
| ⚠️ High | 15 | Update before production |
| ⚡ Medium | 2 | Update after first deploy |
| ✅ Ready | 17 | No changes needed |

---

## 🎯 Next Steps

1. **Complete Environment Setup** (Current Step)
   - Add all 34 variables to Vercel
   - Verify with checklist above

2. **Initial Deployment**
   - Run `vercel --prod`
   - Note the deployment URL

3. **Post-Deployment Configuration**
   - Update URL-dependent variables
   - Configure webhooks
   - Test all features

4. **Production Hardening**
   - Enable Vercel deployment protection
   - Set up monitoring and alerts
   - Configure custom domain (optional)

---

## 📞 Support Resources

- **Vercel Documentation:** https://vercel.com/docs/environment-variables
- **Stripe Webhooks:** https://stripe.com/docs/webhooks
- **NFT.Storage:** https://nft.storage/docs
- **Cloudflare R2:** https://developers.cloudflare.com/r2

---

## 📅 Maintenance Schedule

### Weekly
- [ ] Monitor error logs in Vercel
- [ ] Check Stripe webhook deliveries
- [ ] Verify IPFS uploads

### Monthly
- [ ] Review Vercel usage and costs
- [ ] Check R2 storage usage
- [ ] Audit environment variable access

### Quarterly
- [ ] Rotate sensitive keys
- [ ] Update dependencies
- [ ] Review security best practices

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-19  
**Author:** DeepAgent  
**Project:** AuthiChain Premium
