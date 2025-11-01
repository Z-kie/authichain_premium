# AuthiChain - Vercel Quick Start

## 🚀 Deploy in 5 Minutes

### Option 1: Using Deployment Script (Easiest)

```bash
cd /home/ubuntu/authichain_premium/app
./deploy-vercel.sh
```

### Option 2: Manual CLI Deployment

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd /home/ubuntu/authichain_premium/app
vercel --prod
```

### Option 3: Vercel Dashboard

1. Go to https://vercel.com/new
2. Upload `/home/ubuntu/authichain_premium/app` folder
3. Add environment variables
4. Click "Deploy"

---

## 📋 Critical Environment Variables (Must Add Before Deploy)

### Essential (10 variables)
```bash
DATABASE_URL                          # PostgreSQL connection string
NEXTAUTH_SECRET                       # Auth secret (generate new)
NEXTAUTH_URL                          # https://your-app.vercel.app
STRIPE_SECRET_KEY                     # Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY    # Stripe public key
STRIPE_WEBHOOK_SECRET                 # Stripe webhook secret
NFT_STORAGE_API_KEY                   # NFT.Storage API key
PRIVATE_KEY                           # Blockchain wallet private key
POLYGON_AMOY_RPC_URL                  # Polygon RPC URL
CONTRACT_ADDRESS                      # Smart contract address
```

### Complete List
See **VERCEL_ENV_MIGRATION_GUIDE.md** for all 34 variables with values and instructions.

---

## ✅ Pre-Deployment Checklist

- [ ] Vercel account created
- [ ] All 34 environment variables ready
- [ ] Stripe Live keys obtained (or use Test keys initially)
- [ ] Database accessible from internet
- [ ] Production build tested locally

---

## 🎯 Post-Deployment Steps

After your first deployment:

1. **Note Your URL**
   ```
   Example: https://authichain-abc123.vercel.app
   ```

2. **Update URL Variables**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Update `NEXTAUTH_URL` with deployment URL
   - Update `NEXT_PUBLIC_SITE_URL` with deployment URL
   - Redeploy: `vercel --prod --force`

3. **Configure Stripe Webhooks**
   - Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
   - Copy webhook secret
   - Update `STRIPE_WEBHOOK_SECRET` in Vercel
   - Redeploy

4. **Test Everything**
   - [ ] Homepage loads
   - [ ] Authentication works
   - [ ] Payments work (test mode)
   - [ ] NFT minting works
   - [ ] Wallet connection works

---

## 📚 Full Documentation

| Document | Purpose |
|----------|---------|
| **DEPLOYMENT_READY.md** | Current status and overview |
| **VERCEL_ENV_MIGRATION_GUIDE.md** | Complete environment variables reference |
| **VERCEL_DEPLOYMENT_GUIDE.md** | Detailed step-by-step deployment |
| **deploy-vercel.sh** | Automated deployment script |

---

## 🐛 Common Issues

### "Missing environment variable"
**Fix:** Add all 34 variables to Vercel before deploying

### "Database connection failed"
**Fix:** Ensure DATABASE_URL is correct and database allows external connections

### "Build failed"
**Fix:** Run `npm run build` locally to identify issues

### Stripe webhooks not working
**Fix:** Ensure webhook URL matches deployment URL and secret is correct

---

## 📞 Need Help?

- **Full Guide:** See VERCEL_DEPLOYMENT_GUIDE.md
- **Environment Setup:** See VERCEL_ENV_MIGRATION_GUIDE.md
- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support

---

## ⏱️ Estimated Time

- **First deployment:** 15-30 minutes
- **Post-deployment config:** 10-15 minutes
- **Total:** ~30-45 minutes

---

**Ready? Run:** `./deploy-vercel.sh`

**Good luck! 🚀**
