# ⚡ AuthiChain - Quick Deploy Guide

**5-Minute Deployment to Vercel**

---

## 🚀 Deploy Now (3 Commands)

```bash
# 1. Navigate to app directory
cd /home/ubuntu/authichain_premium/app

# 2. Login to Vercel (opens browser)
npx vercel login

# 3. Deploy to production
npx vercel --prod
```

**That's it!** Your app will be live at `https://authichain.vercel.app`

---

## 📋 During Deployment

When prompted, answer:

```
? Set up and deploy "~/authichain_premium/app"? [Y/n] Y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] N
? What's your project's name? authichain
? In which directory is your code located? ./
```

Vercel will:
1. ✅ Upload your code
2. ✅ Install dependencies
3. ✅ Build your app
4. ✅ Deploy to production
5. ✅ Give you a live URL

---

## 🔧 After Deployment

### Step 1: Add Environment Variables (5 minutes)

1. Go to: https://vercel.com/dashboard
2. Select your `authichain` project
3. Click **Settings** → **Environment Variables**
4. Copy all 34 variables from `/home/ubuntu/authichain_premium/app/.env`
5. For each variable:
   - Name: `DATABASE_URL`
   - Value: `[paste value from .env]`
   - Environments: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

**Critical Variables to Add:**
```
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL (update to your Vercel URL)
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
NFT_STORAGE_API_KEY
PRIVATE_KEY
CONTRACT_ADDRESS
POLYGON_AMOY_RPC_URL
```

### Step 2: Update URLs (2 minutes)

After adding all variables, update these two:

```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
```

### Step 3: Redeploy (1 minute)

```bash
npx vercel --prod
```

This applies your environment variables.

### Step 4: Configure Stripe Webhooks (3 minutes)

1. Go to: https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://your-app-name.vercel.app/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret**
7. Update `STRIPE_WEBHOOK_SECRET` in Vercel
8. Redeploy: `npx vercel --prod`

---

## ✅ Test Your Deployment

Visit your live URL and test:

1. **Homepage** - Should load instantly
2. **Sign Up** - Create a test account
3. **Wallet Connect** - Connect MetaMask
4. **Mint NFT** - Try minting a test NFT
5. **Marketplace** - Browse NFTs
6. **Pricing** - View subscription plans
7. **Dashboard** - Access user dashboard

---

## 🎯 Total Time: ~15 Minutes

- Deploy: 3 min
- Add env vars: 5 min
- Update URLs: 2 min
- Stripe webhooks: 3 min
- Testing: 2 min

---

## 🆘 Troubleshooting

### "No credentials found"
```bash
npx vercel login
```

### "Build failed"
Check build logs in Vercel dashboard

### "Environment variable not found"
Make sure all 34 variables are added in Vercel

### "Stripe webhook not working"
1. Check webhook URL is correct
2. Verify signing secret matches
3. Check webhook events are selected

---

## 📚 Full Documentation

For detailed guides, see:
- `/home/ubuntu/authichain_premium/DEPLOYMENT_EXECUTION_REPORT.md`
- `/home/ubuntu/authichain_premium/DEPLOYMENT_VERCEL.md`
- `/home/ubuntu/authichain_premium/PRODUCTION_DEPLOYMENT_GUIDE.md`

---

## 🎉 You're Done!

Your AuthiChain app is now live and ready for users!

**Next Steps:**
- Share your URL with users
- Monitor analytics in Vercel dashboard
- Set up custom domain (optional)
- Enable Vercel Analytics (optional)

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- AuthiChain Docs: See `/home/ubuntu/authichain_premium/`
