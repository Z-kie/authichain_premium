# 🔐 AuthiChain Vercel Environment Variables Setup Guide

**Last Updated:** October 20, 2025  
**Purpose:** Complete guide for configuring all environment variables in Vercel for production deployment

---

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Security Best Practices](#security-best-practices)
3. [Vercel Setup Instructions](#vercel-setup-instructions)
4. [Environment Variables by Category](#environment-variables-by-category)
5. [Testing & Validation](#testing--validation)
6. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before setting up Vercel environment variables:

- [ ] **Stripe Account:** Switch from TEST mode to LIVE mode in Stripe Dashboard
- [ ] **Database:** Ensure production PostgreSQL database is provisioned and accessible
- [ ] **Domain:** Have your production domain ready (e.g., authichain.com)
- [ ] **NFT.Storage:** Verify API key is active and has sufficient storage
- [ ] **Cloudflare:** Confirm R2 storage bucket is created and accessible
- [ ] **Blockchain:** Ensure you have a secure production wallet private key
- [ ] **Security Keys:** Generate strong, unique secrets for production

---

## 🔒 Security Best Practices

### Critical Security Guidelines

1. **NEVER commit `.env` files to Git**
   - Add `.env*` to `.gitignore` (already configured)
   - Never share environment variables in chat, email, or documentation

2. **Use Strong Secrets**
   - Generate cryptographically secure random strings for secrets
   - Minimum 32 characters for `NEXTAUTH_SECRET`
   - Use different secrets for each environment (dev, staging, production)

3. **Rotate Keys Regularly**
   - Stripe API keys: Review quarterly
   - JWT secrets: Rotate annually
   - Database credentials: Update as needed

4. **Limit Access**
   - Only grant Vercel project access to necessary team members
   - Use Vercel's role-based access control
   - Enable 2FA on all service accounts (Stripe, Vercel, etc.)

5. **Environment-Specific Values**
   - Use different Stripe keys for test vs. production
   - Separate databases for development and production
   - Different webhook secrets for each environment

---

## 🚀 Vercel Setup Instructions

### Step 1: Access Vercel Project Settings

1. Log into [Vercel Dashboard](https://vercel.com)
2. Navigate to your AuthiChain project
3. Click **Settings** → **Environment Variables**

### Step 2: Environment Selection

For each variable, select the appropriate environments:
- **Production**: Live environment (required for all variables)
- **Preview**: Staging/preview deployments (optional, can use test keys)
- **Development**: Local development (optional, usually uses `.env.local`)

**Recommendation:** Set all variables for Production. Use TEST Stripe keys for Preview.

### Step 3: Adding Variables

Two methods to add variables:

#### Method A: Individual Entry (Recommended for sensitive keys)
1. Click "Add New"
2. Enter variable name (e.g., `DATABASE_URL`)
3. Enter value
4. Select environments
5. Click "Save"

#### Method B: Bulk Import (Faster, but less secure)
1. Click "Add New" → "Paste .env"
2. Copy-paste your environment variables
3. Review each variable carefully
4. Select environments
5. Click "Save"

⚠️ **Warning:** Method B is faster but review each variable before saving!

---

## 🗂️ Environment Variables by Category

### 1️⃣ Database Configuration (REQUIRED)

| Variable | Description | Security Level | Example Format |
|----------|-------------|----------------|----------------|
| `DATABASE_URL` | PostgreSQL connection string | 🔴 CRITICAL | `postgresql://user:password@host:5432/dbname` |

**Production Setup:**
```bash
DATABASE_URL="postgresql://prod_user:SECURE_PASSWORD@prod-db-host.com:5432/authichain_prod?connect_timeout=15"
```

**Notes:**
- ✅ Use SSL connections: Add `?sslmode=require` for production
- ✅ Enable connection pooling for better performance
- ❌ Never use the same database for dev and production

---

### 2️⃣ NextAuth Configuration (REQUIRED)

| Variable | Description | Security Level | Value |
|----------|-------------|----------------|-------|
| `NEXTAUTH_SECRET` | JWT signing secret | 🔴 CRITICAL | Generate new for production |
| `NEXTAUTH_URL` | Your production URL | 🟡 IMPORTANT | `https://authichain.com` |

**Production Setup:**
```bash
# Generate a new secret (run in terminal):
openssl rand -base64 32

# Then set:
NEXTAUTH_SECRET="YOUR_GENERATED_SECRET_HERE"
NEXTAUTH_URL="https://authichain.com"
```

**Notes:**
- ✅ Must be HTTPS in production (no http://)
- ✅ Include subdomain if using one (e.g., `app.authichain.com`)
- ❌ Never reuse the development secret

---

### 3️⃣ Stripe Configuration (REQUIRED)

⚠️ **CRITICAL:** Switch to LIVE mode in Stripe before production!

#### A. API Keys

| Variable | Description | Security Level | Where to Find |
|----------|-------------|----------------|---------------|
| `STRIPE_SECRET_KEY` | Stripe API secret key | 🔴 CRITICAL | Stripe Dashboard → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | 🟢 PUBLIC | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | 🔴 CRITICAL | Stripe Dashboard → Developers → Webhooks |

**Getting LIVE Keys from Stripe:**

1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Toggle **View test data** to OFF (enable LIVE mode)
3. Go to **Developers** → **API Keys**
4. Copy **Secret key** (starts with `sk_live_`)
5. Copy **Publishable key** (starts with `pk_live_`)

**Production Setup:**
```bash
STRIPE_SECRET_KEY="sk_live_YOUR_LIVE_SECRET_KEY"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_YOUR_LIVE_PUBLISHABLE_KEY"
STRIPE_WEBHOOK_SECRET="whsec_YOUR_WEBHOOK_SECRET"
```

#### B. Product & Price IDs

You'll need to create products in LIVE mode and get new price IDs.

| Variable | Description | Tier | Monthly/Annual |
|----------|-------------|------|----------------|
| `STRIPE_CREATOR_PRICE_ID` | Creator tier | $19/mo | Default |
| `STRIPE_CREATOR_MONTHLY_PRICE_ID` | Creator monthly | $19/mo | Monthly |
| `STRIPE_CREATOR_ANNUAL_PRICE_ID` | Creator annual | $190/yr | Annual |
| `STRIPE_PRO_PRICE_ID` | Pro tier | $49/mo | Default |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Pro monthly | $49/mo | Monthly |
| `STRIPE_PRO_ANNUAL_PRICE_ID` | Pro annual | $490/yr | Annual |
| `STRIPE_ENTERPRISE_PRICE_ID` | Enterprise tier | $199/mo | Default |
| `STRIPE_ENTERPRISE_MONTHLY_PRICE_ID` | Enterprise monthly | $199/mo | Monthly |
| `STRIPE_ENTERPRISE_ANNUAL_PRICE_ID` | Enterprise annual | $1990/yr | Annual |
| `STRIPE_AGENCY_PRICE_ID` | Agency tier | $499/mo | Default |
| `STRIPE_AGENCY_MONTHLY_PRICE_ID` | Agency monthly | $499/mo | Monthly |
| `STRIPE_AGENCY_ANNUAL_PRICE_ID` | Agency annual | $4990/yr | Annual |
| `STRIPE_BRAND_PRICE_ID` | Brand tier | Custom | Custom |

**Creating Products in LIVE Mode:**

1. Switch to LIVE mode in Stripe Dashboard
2. Go to **Products** → **Add Product**
3. For each tier (Creator, Pro, Enterprise, Agency):
   - Add product name, description
   - Create two prices: Monthly and Annual
   - Copy each `price_id` (starts with `price_`)
4. Set in Vercel

**Production Example:**
```bash
STRIPE_CREATOR_MONTHLY_PRICE_ID="price_1XXXXXXXXXXXXXXXXXXXXXX"
STRIPE_CREATOR_ANNUAL_PRICE_ID="price_1YYYYYYYYYYYYYYYYYYYYYY"
# ... repeat for all tiers
```

#### C. Product IDs

| Variable | Description |
|----------|-------------|
| `STRIPE_EXPLORER_PRODUCT_ID` | Explorer tier product ID |
| `STRIPE_CREATOR_PRODUCT_ID` | Creator tier product ID |
| `STRIPE_PRO_PRODUCT_ID` | Pro tier product ID |
| `STRIPE_ENTERPRISE_PRODUCT_ID` | Enterprise tier product ID |
| `STRIPE_AGENCY_PRODUCT_ID` | Agency tier product ID |

**Note:** Product IDs start with `prod_`

---

### 4️⃣ Blockchain & Smart Contract (REQUIRED)

| Variable | Description | Security Level |
|----------|-------------|----------------|
| `PRIVATE_KEY` | Wallet private key | 🔴 CRITICAL |
| `POLYGON_AMOY_RPC_URL` | Polygon testnet RPC | 🟢 PUBLIC |
| `CONTRACT_ADDRESS` | Deployed contract address | 🟢 PUBLIC |
| `POLYGONSCAN_API_KEY` | Polygonscan API key | 🟡 IMPORTANT |

**Production Setup:**

⚠️ **CRITICAL SECURITY WARNING:**
- Create a NEW wallet for production
- Never use a wallet that holds significant personal funds
- Use a hardware wallet or secure key management system
- Fund the wallet with only what's needed for operations

```bash
PRIVATE_KEY="0xYOUR_PRODUCTION_WALLET_PRIVATE_KEY"
POLYGON_AMOY_RPC_URL="https://rpc-amoy.polygon.technology"
CONTRACT_ADDRESS="0xYOUR_DEPLOYED_CONTRACT_ADDRESS"
POLYGONSCAN_API_KEY="YOUR_POLYGONSCAN_API_KEY"
```

**For Mainnet (Polygon):**
```bash
POLYGON_MAINNET_RPC_URL="https://polygon-rpc.com"
# Or use Alchemy/Infura for better reliability:
# POLYGON_MAINNET_RPC_URL="https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY"
```

---

### 5️⃣ NFT.Storage Configuration (REQUIRED)

| Variable | Description | Security Level |
|----------|-------------|----------------|
| `NFT_STORAGE_API_KEY` | IPFS storage API key | 🔴 CRITICAL |

**Production Setup:**

1. Log into [NFT.Storage](https://nft.storage)
2. Go to **API Keys**
3. Create a new key for production
4. Copy the key

```bash
NFT_STORAGE_API_KEY="YOUR_PRODUCTION_API_KEY"
```

**Notes:**
- ✅ Create separate keys for dev, staging, and production
- ✅ Monitor storage usage and limits
- ✅ Enable notifications for storage limits

---

### 6️⃣ Cloudflare R2 Storage (REQUIRED)

| Variable | Description | Security Level |
|----------|-------------|----------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token | 🔴 CRITICAL |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID | 🟡 IMPORTANT |
| `R2_API_TOKEN` | R2 storage token | 🔴 CRITICAL |
| `R2_ACCESS_KEY_ID` | R2 access key | 🔴 CRITICAL |
| `R2_SECRET_ACCESS_KEY` | R2 secret key | 🔴 CRITICAL |
| `R2_ENDPOINT` | R2 storage endpoint | 🟡 IMPORTANT |

**Production Setup:**

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **R2** → Create bucket for production
3. Go to **Manage R2 API Tokens**
4. Create a new token with appropriate permissions
5. Copy credentials

```bash
CLOUDFLARE_API_TOKEN="YOUR_CLOUDFLARE_TOKEN"
CLOUDFLARE_ACCOUNT_ID="YOUR_ACCOUNT_ID"
R2_API_TOKEN="YOUR_R2_TOKEN"
R2_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
R2_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"
R2_ENDPOINT="https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com"
```

---

### 7️⃣ Application Configuration (REQUIRED)

| Variable | Description | Value |
|----------|-------------|-------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `https://authichain.com` |
| `NODE_ENV` | Environment mode | `production` |

**Production Setup:**
```bash
NEXT_PUBLIC_SITE_URL="https://authichain.com"
NODE_ENV="production"
```

**Notes:**
- ✅ Must match your actual production domain
- ✅ Use HTTPS in production
- ❌ Don't include trailing slash

---

### 8️⃣ Feature Flags (OPTIONAL)

| Variable | Description | Default |
|----------|-------------|---------|
| `FEATURE_WALLET_AUTH` | Enable wallet authentication | `true` |
| `FEATURE_CRYPTO_PAYMENTS` | Enable crypto payments | `true` |
| `FEATURE_AUCTIONS` | Enable auction features | `true` |
| `FEATURE_COLLECTIONS` | Enable NFT collections | `true` |

**Production Setup:**
```bash
FEATURE_WALLET_AUTH="true"
FEATURE_CRYPTO_PAYMENTS="true"
FEATURE_AUCTIONS="true"
FEATURE_COLLECTIONS="true"
```

**Notes:**
- Set to `"false"` to disable features
- Useful for gradual rollout or maintenance

---

## ✅ Testing & Validation

### After Setting All Variables

1. **Redeploy Application**
   ```bash
   # Trigger a new deployment in Vercel
   git push origin main
   ```

2. **Check Build Logs**
   - Go to Vercel Dashboard → Deployments
   - Check latest deployment logs
   - Look for environment variable errors

3. **Test Critical Features**
   - [ ] Database connection
   - [ ] User authentication
   - [ ] Stripe payment flows
   - [ ] NFT minting
   - [ ] File uploads
   - [ ] Blockchain transactions

4. **Monitor Application**
   - Check Vercel Analytics
   - Monitor error logs
   - Test all subscription tiers
   - Verify webhook deliveries in Stripe

---

## 🔧 Troubleshooting

### Common Issues

#### Issue 1: Database Connection Failed
**Symptoms:** App can't connect to database
**Solutions:**
- ✅ Verify `DATABASE_URL` is correct
- ✅ Check if production database allows connections from Vercel IPs
- ✅ Add `?sslmode=require` to connection string if needed
- ✅ Test connection from Vercel Functions

#### Issue 2: Stripe Webhook Failures
**Symptoms:** Webhooks not being received or verified
**Solutions:**
- ✅ Verify `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
- ✅ Check webhook URL is `https://authichain.com/api/webhooks/stripe`
- ✅ Ensure webhook is created in LIVE mode, not TEST mode
- ✅ Test webhook delivery in Stripe Dashboard

#### Issue 3: NFT Upload Failures
**Symptoms:** Can't upload NFT images or metadata
**Solutions:**
- ✅ Verify `NFT_STORAGE_API_KEY` is valid and not expired
- ✅ Check storage quota in NFT.Storage dashboard
- ✅ Verify `R2_*` credentials are correct
- ✅ Test upload endpoint independently

#### Issue 4: Authentication Not Working
**Symptoms:** Users can't log in
**Solutions:**
- ✅ Verify `NEXTAUTH_SECRET` is set and correct
- ✅ Check `NEXTAUTH_URL` matches your production domain (HTTPS)
- ✅ Clear browser cookies and try again
- ✅ Check Vercel logs for NextAuth errors

#### Issue 5: Blockchain Transaction Failures
**Symptoms:** Can't mint NFTs or interact with blockchain
**Solutions:**
- ✅ Verify `PRIVATE_KEY` is correct and wallet has funds
- ✅ Check `CONTRACT_ADDRESS` is the correct deployed contract
- ✅ Verify RPC URL is responsive
- ✅ Check Polygonscan for contract verification

---

## 📞 Support & Resources

### Stripe Resources
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe API Docs](https://stripe.com/docs/api)
- [Test vs Live Mode](https://stripe.com/docs/keys#test-live-modes)

### Vercel Resources
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Environment Variables Docs](https://vercel.com/docs/environment-variables)
- [Deployment Docs](https://vercel.com/docs/deployments/overview)

### AuthiChain Resources
- Main Documentation: `/authichain_premium/README.md`
- Deployment Guide: `/authichain_premium/DEPLOYMENT_VERCEL.md`
- Security Hardening: `/authichain_premium/SECURITY_HARDENING_REPORT.md` (coming soon)

---

## 🔐 Security Reminder

**Before going live:**
- [ ] All secrets are unique and strong
- [ ] All Stripe keys are in LIVE mode
- [ ] Production database is separate from dev/test
- [ ] Webhook secrets are configured correctly
- [ ] Private keys are securely stored
- [ ] 2FA is enabled on all service accounts
- [ ] Team members have appropriate access levels
- [ ] `.env` file is in `.gitignore`
- [ ] No secrets are committed to Git

---

## 📋 Quick Copy Template

Use this template to fill in your values, then paste into Vercel:

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://authichain.com"

# Stripe API Keys
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stripe Price IDs
STRIPE_CREATOR_MONTHLY_PRICE_ID="price_..."
STRIPE_CREATOR_ANNUAL_PRICE_ID="price_..."
STRIPE_PRO_MONTHLY_PRICE_ID="price_..."
STRIPE_PRO_ANNUAL_PRICE_ID="price_..."
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID="price_..."
STRIPE_ENTERPRISE_ANNUAL_PRICE_ID="price_..."
STRIPE_AGENCY_MONTHLY_PRICE_ID="price_..."
STRIPE_AGENCY_ANNUAL_PRICE_ID="price_..."

# Stripe Product IDs
STRIPE_EXPLORER_PRODUCT_ID="prod_..."
STRIPE_CREATOR_PRODUCT_ID="prod_..."
STRIPE_PRO_PRODUCT_ID="prod_..."
STRIPE_ENTERPRISE_PRODUCT_ID="prod_..."
STRIPE_AGENCY_PRODUCT_ID="prod_..."

# Blockchain
PRIVATE_KEY="0x..."
POLYGON_AMOY_RPC_URL="https://rpc-amoy.polygon.technology"
CONTRACT_ADDRESS="0x..."
POLYGONSCAN_API_KEY="..."

# NFT.Storage
NFT_STORAGE_API_KEY="..."

# Cloudflare
CLOUDFLARE_API_TOKEN="..."
CLOUDFLARE_ACCOUNT_ID="..."
R2_API_TOKEN="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_ENDPOINT="https://..."

# Application
NEXT_PUBLIC_SITE_URL="https://authichain.com"
NODE_ENV="production"

# Feature Flags
FEATURE_WALLET_AUTH="true"
FEATURE_CRYPTO_PAYMENTS="true"
FEATURE_AUCTIONS="true"
FEATURE_COLLECTIONS="true"
```

---

**Document Version:** 1.0  
**Last Updated:** October 20, 2025  
**Maintained By:** AuthiChain Development Team
