# 🚀 AuthiChain - Vercel Production Deployment Guide

**Complete guide to deploying AuthiChain to Vercel production**

---

## 📋 Prerequisites

✅ **Completed Steps:**
- [x] Application code is production-ready
- [x] Production build tested successfully (`npm run build`)
- [x] All environment variables configured in `.env`
- [x] Cannabis/strain references cleaned (99.2% reduction)
- [x] TypeScript compilation successful
- [x] Vercel configuration files created

⚠️ **You Need:**
- [ ] Vercel account (free tier works) - [Sign up](https://vercel.com/signup)
- [ ] Git repository (GitHub, GitLab, or Bitbucket) OR manual deployment
- [ ] Production database URL (current: Railway PostgreSQL)
- [ ] Stripe Live API keys (if using payments)
- [ ] 15 minutes for deployment

---

## 🎯 Deployment Options

### **Option A: Git-Based Deployment (Recommended)**

Best for: Continuous deployment, team collaboration, automatic updates

1. **Push to Git Repository**
   ```bash
   cd /home/ubuntu/authichain_premium/app
   git init
   git add .
   git commit -m "Initial commit - AuthiChain production ready"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Visit: https://vercel.com/new
   - Click "Import Project"
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Select the `authichain_premium/app` repository
   - Vercel will auto-detect Next.js framework

3. **Configure Project Settings**
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (or `app` if monorepo)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
   - **Node Version:** 18.x or higher

4. **Skip Initial Deployment**
   - Click "Deploy" but expect it to fail (environment variables not set yet)
   - This is normal - we'll add env vars next

### **Option B: CLI Deployment**

Best for: Quick testing, one-time deployment, no Git setup

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   npx vercel login
   ```
   Follow the email verification link

3. **Deploy**
   ```bash
   cd /home/ubuntu/authichain_premium/app
   npx vercel --prod
   ```

4. **Follow Prompts**
   - Set up and deploy? → Yes
   - Which scope? → Your account
   - Link to existing project? → No
   - Project name? → `authichain`
   - Directory? → `./`
   - Override settings? → No

---

## 🔐 Environment Variables Configuration

### **Method 1: Via Vercel Dashboard (Recommended)**

1. **Navigate to Project Settings**
   - Go to https://vercel.com/dashboard
   - Select your project: `authichain`
   - Click **Settings** → **Environment Variables**

2. **Add Variables One by One**
   
   Copy from your local `.env` file. For each variable:
   
   | Variable Name | Value Source | Environments |
   |--------------|-------------|--------------|
   | `DATABASE_URL` | From `.env` | Production, Preview |
   | `NEXTAUTH_URL` | `https://your-project.vercel.app` | Production |
   | `NEXTAUTH_SECRET` | From `.env` | All |
   | `STRIPE_SECRET_KEY` | **Use LIVE key** `sk_live_...` | Production |
   | `STRIPE_WEBHOOK_SECRET` | From Stripe Dashboard | Production |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | **Use LIVE key** `pk_live_...` | All |
   | All 15 `STRIPE_PRICE_ID_*` | From Stripe Dashboard | All |
   | `NFT_STORAGE_API_KEY` | From `.env` | All |
   | `PRIVATE_KEY` | From `.env` | Production |
   | `POLYGON_AMOY_RPC_URL` | From `.env` | All |
   | `CONTRACT_ADDRESS` | From `.env` | All |
   | `POLYGONSCAN_API_KEY` | From `.env` | All |
   | All Cloudflare variables | From `.env` | All |
   | All feature flags | From `.env` | All |

   **For each variable:**
   - Click "Add New"
   - Enter variable name
   - Enter value (paste from your `.env`)
   - Select environments: ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

3. **Critical Variables to Update**
   
   These MUST be changed from your local `.env`:
   
   ```bash
   # Update this with your actual Vercel deployment URL
   NEXTAUTH_URL="https://authichain-YOUR-USERNAME.vercel.app"
   
   # Use Stripe LIVE keys (not test keys)
   STRIPE_SECRET_KEY="sk_live_..."  # NOT sk_test_
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."  # NOT pk_test_
   ```

### **Method 2: Via Vercel CLI**

```bash
# Set individual variables
npx vercel env add DATABASE_URL production
# Paste value when prompted

# Or use a script (be careful with special characters)
while IFS= read -r line; do
  if [[ $line =~ ^[A-Z_]+=.+ ]]; then
    var_name=$(echo $line | cut -d '=' -f 1)
    var_value=$(echo $line | cut -d '=' -f 2-)
    echo "Setting $var_name..."
    echo "$var_value" | npx vercel env add "$var_name" production
  fi
done < .env
```

### **Method 3: Bulk Import (Vercel CLI)**

```bash
# Create a file with ONLY production-ready values
cp .env .env.production

# Edit .env.production to update:
# - NEXTAUTH_URL to Vercel domain
# - Stripe keys to LIVE versions
# - Any other production-specific values

# Import all at once
npx vercel env pull .env.production
```

---

## ⚙️ Post-Deployment Configuration

### **1. Update NEXTAUTH_URL**

After first deployment, update the environment variable:

1. Note your Vercel deployment URL: `https://authichain-xxxxx.vercel.app`
2. Go to Project Settings → Environment Variables
3. Find `NEXTAUTH_URL`
4. Update value to: `https://authichain-xxxxx.vercel.app`
5. Click "Save"
6. Redeploy: Click "Deployments" → ⋯ → "Redeploy"

### **2. Configure Stripe Webhook**

1. **Get Webhook Endpoint URL**
   ```
   https://your-project.vercel.app/api/webhooks/stripe
   ```

2. **Add to Stripe Dashboard**
   - Visit: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - URL: `https://your-project.vercel.app/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Click "Add endpoint"

3. **Get Signing Secret**
   - Click on your new webhook endpoint
   - Reveal "Signing secret": `whsec_...`
   - Copy this value

4. **Update Vercel Environment Variable**
   - Go to Vercel → Settings → Environment Variables
   - Find or add `STRIPE_WEBHOOK_SECRET`
   - Paste the signing secret: `whsec_...`
   - Save and redeploy

### **3. Configure Custom Domain (Optional)**

1. **Add Domain in Vercel**
   - Project Settings → Domains
   - Enter your domain: `authichain.com`
   - Click "Add"

2. **Update DNS Records**
   Follow Vercel's instructions to add:
   - A record or CNAME pointing to Vercel

3. **Update Environment Variables**
   ```bash
   NEXTAUTH_URL="https://authichain.com"
   ```

4. **Update Stripe Webhook**
   - Update webhook URL to: `https://authichain.com/api/webhooks/stripe`

---

## 🧪 Verification Testing

After deployment, test these critical features:

### **1. Basic Pages**
- ✅ Homepage: `https://your-project.vercel.app/`
- ✅ Explore: `/explore`
- ✅ Pricing: `/pricing`
- ✅ Mint: `/mint`
- ✅ Dashboard: `/dashboard`

### **2. API Endpoints**
```bash
# Test NFT list
curl https://your-project.vercel.app/api/nft/list

# Test health check
curl https://your-project.vercel.app/api/usage-check
```

### **3. Wallet Connection**
1. Visit your site
2. Click "Connect Wallet"
3. Connect MetaMask
4. Verify wallet address displays correctly

### **4. Subscription Flow**
1. Go to `/pricing`
2. Click "Get Started" on any plan
3. Verify redirects to Stripe Checkout
4. Complete test purchase (use Stripe test card: `4242 4242 4242 4242`)
5. Verify redirect back to `/dashboard/success`
6. Check subscription status in dashboard

### **5. NFT Minting**
1. Go to `/mint`
2. Upload test image
3. Fill in metadata
4. Mint NFT
5. Verify NFT appears in `/dashboard/nfts`

### **6. Database Connection**
- Check Vercel deployment logs for database connection success
- Verify no connection errors in Function Logs

---

## 🐛 Troubleshooting

### **Issue: Build Fails**

**Error:** "Module not found" or "Type error"

**Solution:**
```bash
# Verify local build works
cd /home/ubuntu/authichain_premium/app
npm run build

# If local build works, check Vercel build logs
# Usually caused by missing dependencies or environment variables
```

### **Issue: Environment Variables Not Working**

**Symptoms:** Database connection fails, Stripe not working

**Solution:**
1. Verify all variables are set in Vercel dashboard
2. Check variable names match exactly (case-sensitive)
3. Ensure selected for correct environment (Production)
4. Redeploy after adding variables
5. Check Function Logs for specific error messages

### **Issue: Stripe Webhook Failing**

**Error:** "Webhook signature verification failed"

**Solution:**
1. Verify `STRIPE_WEBHOOK_SECRET` is set correctly in Vercel
2. Ensure webhook URL matches deployment URL
3. Check Stripe Dashboard → Webhooks → Events for error details
4. Redeploy after updating webhook secret

### **Issue: Database Connection Timeout**

**Error:** "Connection timeout" or "ECONNREFUSED"

**Solution:**
1. Verify `DATABASE_URL` is correct and accessible
2. Check database provider (Railway) isn't blocking Vercel IPs
3. Increase connection timeout in `DATABASE_URL`:
   ```
   ?connection_limit=5&connect_timeout=15
   ```
4. Check database service is running

### **Issue: Next.js API Routes 404**

**Error:** API routes return 404 on Vercel but work locally

**Solution:**
1. Verify file structure: `app/api/route-name/route.ts`
2. Check `vercel.json` rewrites configuration
3. Ensure correct Next.js version (14.2.x)
4. Check deployment logs for route registration

### **Issue: Wallet Connection Fails**

**Error:** "Network mismatch" or "Provider not found"

**Solution:**
1. Verify MetaMask is installed and unlocked
2. Check network matches `POLYGON_AMOY_RPC_URL`
3. Ensure `NEXT_PUBLIC_*` variables are set (these must have prefix)
4. Check browser console for specific error

### **Check Logs**

**Vercel Dashboard:**
- Deployments → Select deployment → Function Logs
- Real-time logs → Click "Logs" tab

**Check Build Output:**
```bash
# View last deployment logs
npx vercel logs your-deployment-url
```

---

## 📊 Deployment Checklist

### **Pre-Deployment**
- [x] ✅ Production build successful
- [x] ✅ Environment variables prepared
- [x] ✅ Database accessible
- [x] ✅ Stripe account configured
- [x] ✅ Code committed to Git (if using Option A)

### **During Deployment**
- [ ] Project created on Vercel
- [ ] Initial deployment triggered
- [ ] All 34 environment variables added
- [ ] `NEXTAUTH_URL` updated with deployment URL
- [ ] Stripe webhook configured
- [ ] Stripe Live keys added

### **Post-Deployment**
- [ ] Homepage loads correctly
- [ ] API endpoints responding
- [ ] Database connection working
- [ ] Wallet connection functional
- [ ] Subscription flow tested
- [ ] NFT minting tested
- [ ] Stripe webhook verified
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring enabled

---

## 🔗 Important URLs

After deployment, bookmark these:

| Service | URL |
|---------|-----|
| **Live Site** | `https://authichain-xxxxx.vercel.app` |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Stripe Dashboard** | https://dashboard.stripe.com |
| **Database Dashboard** | https://railway.app (or your provider) |
| **NFT.Storage** | https://nft.storage |
| **Polygon Scan** | https://amoy.polygonscan.com |

---

## 📈 Monitoring & Analytics

### **Vercel Analytics**

Enable in dashboard:
- Analytics → Enable
- Monitor page views, performance, Core Web Vitals

### **Vercel Logs**

Real-time function logs:
```bash
npx vercel logs --follow
```

### **Error Tracking**

Consider integrating:
- Sentry: Error tracking
- LogRocket: Session replay
- Datadog: Application monitoring

---

## 🚀 Future Deployments

### **Automatic Deployments (Git)**

Once connected to Git:
1. Push changes to `main` branch → Auto-deploys to production
2. Push to other branches → Creates preview deployments
3. Pull requests → Automatic preview URLs

### **Manual Deployments (CLI)**

```bash
cd /home/ubuntu/authichain_premium/app

# Deploy to production
npx vercel --prod

# Create preview deployment
npx vercel
```

### **Rollback**

If something goes wrong:
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click ⋯ → "Promote to Production"

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Stripe Docs:** https://stripe.com/docs
- **Vercel Support:** https://vercel.com/support

---

## ✅ Success Criteria

Your deployment is successful when:

1. ✅ Live URL loads homepage without errors
2. ✅ All navigation links work
3. ✅ Wallet connection successful
4. ✅ Pricing page loads with Stripe checkout working
5. ✅ NFT minting creates NFTs successfully
6. ✅ Dashboard displays user data
7. ✅ No critical errors in Function Logs
8. ✅ Stripe webhooks receiving events
9. ✅ Database queries executing successfully
10. ✅ Mobile-responsive and PWA manifest loads

---

**Deployment Prepared:** October 19, 2025  
**Next.js Version:** 14.2.28  
**Node Version Required:** 18.x or higher  
**Estimated Deployment Time:** 15-30 minutes

---

**Ready to Deploy! 🚀**

Run the helper script to get started:
```bash
cd /home/ubuntu/authichain_premium/app
chmod +x deploy-to-vercel.sh
./deploy-to-vercel.sh
```

Or proceed directly with deployment using Option A or B above.
