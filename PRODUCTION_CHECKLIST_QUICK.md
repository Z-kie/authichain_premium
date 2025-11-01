# ✅ AuthiChain Production Deployment - Quick Checklist

## Pre-Deployment (Complete these BEFORE deploying)

### Code & Build
- [ ] Run `npm run build` - confirms no errors
- [ ] All critical fixes verified:
  - [ ] Subscription checkout opens Stripe (not redirecting to dashboard)
  - [ ] /product route works (redirects to /explore)
  - [ ] No cannabis terms visible (Sativa/Indica/Hybrid replaced)
  - [ ] "Scan Strains" changed to "Verify Products"

### Environment Variables Setup
- [ ] Copy `.env` file to production environment
- [ ] **Update these to PRODUCTION values:**
  - [ ] `DATABASE_URL` - Production PostgreSQL connection
  - [ ] `NEXTAUTH_URL` - Your production domain (e.g., https://authichain.app)
  - [ ] `NEXTAUTH_SECRET` - Generate new secret (min 32 chars)
  - [ ] `STRIPE_SECRET_KEY` - **Switch to sk_live_...**
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - **Switch to pk_live_...**
  - [ ] All 8 Stripe Price IDs - **Create in Live Mode first**
  - [ ] `STRIPE_WEBHOOK_SECRET` - **From Live Mode webhook**
  - [ ] `NFT_STORAGE_API_KEY` - Verify still valid
  - [ ] `NEXT_PUBLIC_SITE_URL` - Your production URL

### Database
- [ ] Production PostgreSQL database created
- [ ] Database accessible from deployment platform
- [ ] Run Prisma migrations: `npx prisma migrate deploy`
- [ ] Test connection: `npx prisma db pull`

### Stripe Configuration (CRITICAL)
- [ ] **Switch Stripe Dashboard to LIVE MODE**
- [ ] Create all products and prices:
  - [ ] Creator: $29/month + $278.4/year
  - [ ] Pro: $79/month + $758.4/year
  - [ ] Enterprise: $299/month + $2,870.4/year
  - [ ] Agency: $999/month + $9,590.4/year
- [ ] Copy all 8 price IDs to environment variables
- [ ] Create webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
- [ ] Add webhook events:
  - [ ] `checkout.session.completed`
  - [ ] `customer.subscription.created`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
  - [ ] `invoice.payment_succeeded`
  - [ ] `invoice.payment_failed`
- [ ] Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### Domain & SSL
- [ ] Custom domain registered
- [ ] DNS configured (A/CNAME records)
- [ ] SSL certificate ready (automatic with Vercel/Railway)

---

## Deployment

### Choose Your Platform:

**Option 1: Vercel (Easiest)**
```bash
cd /home/ubuntu/authichain_premium/app
vercel --prod
```
- Add environment variables in Vercel Dashboard
- Add custom domain in Settings
- Deploy with `vercel --prod`

**Option 2: Railway**
```bash
railway init
railway up
```
- Add environment variables via `railway variables set`
- Add custom domain in Railway Dashboard

**Option 3: Custom VPS**
```bash
npm install
npm run build
pm2 start npm --name authichain -- start
```
- Configure Nginx reverse proxy
- Set up SSL with Let's Encrypt

---

## Post-Deployment Testing

### Critical Flow Tests (Do these manually)

1. **Homepage**
   - [ ] Loads without errors
   - [ ] No cannabis terms visible
   - [ ] Images and styles load correctly

2. **Pricing Page**
   - [ ] All 5 tiers display (Explorer, Creator, Pro, Enterprise, Agency)
   - [ ] Categories show "Premium", "Standard", "Limited Edition"
   - [ ] **CRITICAL:** Click "Get Started" on Creator tier
     - [ ] Should open Stripe Checkout (NOT redirect to dashboard)
     - [ ] Test with Stripe test card: `4242 4242 4242 4242`
     - [ ] After payment, redirects to dashboard with success message

3. **Navigation**
   - [ ] Click "Products" in header
     - [ ] Should redirect to /explore (not 404)
   - [ ] Browse marketplace
     - [ ] Categories show "Premium", "Standard", "Limited Edition"
     - [ ] NO "Sativa", "Indica", or "Hybrid" visible

4. **Dashboard**
   - [ ] "Verify Products" card visible (not "Scan Strains")
   - [ ] NFT gallery loads
   - [ ] User profile loads

5. **Wallet Authentication** (if using MetaMask)
   - [ ] Connect wallet works
   - [ ] Sign message works
   - [ ] Authentication succeeds

### API Health Checks
```bash
# Test API endpoints
curl https://yourdomain.com/api/nft/list
curl https://yourdomain.com/api/collections/list
curl https://yourdomain.com/api/health
```

### Stripe Webhook Test
- [ ] Go to Stripe Dashboard → Webhooks
- [ ] Find your production webhook
- [ ] Send test event
- [ ] Verify "200 OK" response
- [ ] Check application logs for webhook receipt

---

## Monitoring Setup

### Immediate (Do within 24 hours)
- [ ] Set up Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry)
- [ ] Set up email alerts for downtime

### Within First Week
- [ ] Review application logs daily
- [ ] Monitor Stripe dashboard for transactions
- [ ] Check database performance
- [ ] Monitor response times

---

## Emergency Contacts & Rollback

### If Something Breaks

**Vercel:**
```bash
vercel rollback [previous-deployment-url]
```

**Railway:**
- Go to Dashboard → Deployments → Redeploy previous version

**Custom Server:**
```bash
git checkout [previous-commit]
npm install && npm run build
pm2 restart authichain
```

### Emergency Support
- Stripe Support: https://support.stripe.com
- Vercel Support: support@vercel.com
- Railway Support: https://railway.app/help

---

## Success Criteria

Your deployment is successful when:
- ✅ All pages load without errors
- ✅ Stripe checkout opens correctly (not dashboard redirect)
- ✅ No cannabis terminology visible to users
- ✅ Database connected and queries working
- ✅ Webhooks receiving events from Stripe
- ✅ Users can sign up and authenticate
- ✅ NFT features functional (minting, browsing, etc.)

---

## 🎉 Congratulations!

Once all checkboxes are complete, AuthiChain is live in production!

**Remember:**
- Monitor the application closely for the first 48 hours
- Keep the Stripe Dashboard open to watch for transactions
- Review logs regularly for any errors
- Have the rollback procedure ready just in case

**For detailed troubleshooting, see:** `PRODUCTION_DEPLOYMENT_COMPLETE.md`
