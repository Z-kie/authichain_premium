
# ▲ Vercel Deployment Guide

Complete step-by-step guide for deploying AuthiChain to Vercel.

---

## 🎯 Why Vercel?

**Pros:**
- ✅ **Easiest deployment** - Git push to deploy
- ✅ **Optimized for Next.js** - Built by Next.js creators
- ✅ **Auto-scaling** - Handles traffic spikes automatically
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Zero-downtime deployments** - Atomic deployments
- ✅ **Preview deployments** - Test before production
- ✅ **Free SSL certificates** - HTTPS out of the box

**Cons:**
- ❌ Serverless functions have cold starts
- ❌ 10-second function timeout on free tier

**Pricing:**
- **Hobby:** FREE (perfect for testing & small projects)
- **Pro:** $20/month (for production apps)
- **Enterprise:** Custom pricing

---

## 📋 Prerequisites

Before starting:
- ✅ GitHub account with AuthiChain repo
- ✅ All API keys configured (see [API_KEYS_SETUP.md](./API_KEYS_SETUP.md))
- ✅ All 15 Stripe Price IDs created (see [STRIPE_PRICE_SETUP.md](./STRIPE_PRICE_SETUP.md))
- ✅ Production database ready (Railway, Supabase, or AWS RDS)
- ✅ Domain name (optional but recommended)

---

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

1. **Initialize Git (if not already done):**
   ```bash
   cd /path/to/authichain_premium/app
   git init
   git add .
   git commit -m "Initial commit - AuthiChain production ready"
   ```

2. **Create GitHub Repository:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `authichain`
   - Visibility: Private (recommended)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/authichain.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Connect Vercel to GitHub

1. **Sign up for Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Find and select your `authichain` repository
   - Click "Import"

---

### Step 3: Configure Project Settings

1. **Framework Preset:**
   - Should auto-detect "Next.js"
   - If not, select "Next.js" from dropdown

2. **Root Directory:**
   - If your Next.js app is in `app` folder, set root directory to `app`
   - Click "Edit" next to Root Directory
   - Enter: `app`

3. **Build Settings:**
   - **Build Command:** `npm run build` (default, keep as is)
   - **Output Directory:** `.next` (default, keep as is)
   - **Install Command:** `npm install` (default, keep as is)

4. **Node.js Version:**
   - Recommended: `18.x` or `20.x`
   - Set in `package.json`:
     ```json
     {
       "engines": {
         "node": ">=18.0.0"
       }
     }
     ```

---

### Step 4: Configure Environment Variables

This is the most critical step!

1. **Open Environment Variables Section:**
   - In Vercel project settings, expand "Environment Variables"

2. **Add ALL Environment Variables:**

   Click "Add" for each variable:

   #### Database
   ```
   Name: DATABASE_URL
   Value: postgresql://user:password@host:5432/database
   Environments: Production, Preview, Development
   ```

   #### NextAuth
   ```
   Name: NEXTAUTH_SECRET
   Value: [your-generated-secret]
   Environments: Production, Preview, Development
   ```

   ```
   Name: NEXTAUTH_URL
   Value: https://your-domain.vercel.app
   Environments: Production
   ```

   > **Note:** Vercel auto-sets `NEXTAUTH_URL` for preview deployments

   #### Stripe Live Keys
   ```
   Name: STRIPE_SECRET_KEY
   Value: sk_live_51...
   Environments: Production
   ```

   ```
   Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   Value: pk_live_51...
   Environments: Production
   ```

   ```
   Name: STRIPE_WEBHOOK_SECRET
   Value: whsec_...
   Environments: Production
   ```

   #### Stripe Test Keys (for Preview/Development)
   ```
   Name: STRIPE_SECRET_KEY
   Value: sk_test_51...
   Environments: Preview, Development
   ```

   ```
   Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   Value: pk_test_51...
   Environments: Preview, Development
   ```

   #### NFT.Storage
   ```
   Name: NFT_STORAGE_API_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Environments: Production, Preview, Development
   ```

   #### App Configuration
   ```
   Name: NEXT_PUBLIC_SITE_URL
   Value: https://your-domain.com
   Environments: Production
   ```

   ```
   Name: NODE_ENV
   Value: production
   Environments: Production
   ```

   #### Stripe Price IDs (All 15)

   For production environment, add all 15 Price IDs:

   ```
   STRIPE_STARTER_MONTHLY_PRICE_ID=price_...
   STRIPE_STARTER_ANNUAL_PRICE_ID=price_...
   STRIPE_STARTER_LIFETIME_PRICE_ID=price_...
   
   STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID=price_...
   STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID=price_...
   STRIPE_PROFESSIONAL_LIFETIME_PRICE_ID=price_...
   
   STRIPE_BUSINESS_MONTHLY_PRICE_ID=price_...
   STRIPE_BUSINESS_ANNUAL_PRICE_ID=price_...
   STRIPE_BUSINESS_LIFETIME_PRICE_ID=price_...
   
   STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=price_...
   STRIPE_ENTERPRISE_ANNUAL_PRICE_ID=price_...
   STRIPE_ENTERPRISE_LIFETIME_PRICE_ID=price_...
   
   STRIPE_WHITE_LABEL_MONTHLY_PRICE_ID=price_...
   STRIPE_WHITE_LABEL_ANNUAL_PRICE_ID=price_...
   STRIPE_WHITE_LABEL_LIFETIME_PRICE_ID=price_...
   ```

3. **Pro Tip:** Use Vercel CLI to bulk add env vars:

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login
   vercel login

   # Link project
   vercel link

   # Add env vars from .env.production
   vercel env pull .env.local
   ```

---

### Step 5: Deploy!

1. **Click "Deploy"**
   - Vercel will:
     - Install dependencies
     - Build your Next.js app
     - Deploy to global CDN
     - Generate preview URL

2. **Wait for Build** (~2-5 minutes)
   - Watch build logs in real-time
   - Check for any errors

3. **Build Complete!**
   - You'll get a URL like: `https://authichain-xxx.vercel.app`
   - Click to visit your deployed app

---

### Step 6: Run Database Migrations

⚠️ **CRITICAL:** Run migrations after first deployment!

1. **Using Vercel CLI:**

   ```bash
   # In your local project
   cd app

   # Set production DATABASE_URL locally
   export DATABASE_URL="your-production-database-url"

   # Run migration
   npx prisma db push

   # (Optional) Seed database
   npx prisma db seed
   ```

2. **Verify Migration:**
   ```bash
   npx prisma studio
   ```

---

### Step 7: Configure Custom Domain

1. **Add Domain in Vercel:**
   - Go to Project Settings → Domains
   - Click "Add"
   - Enter your domain: `authichain.com`

2. **DNS Configuration:**

   #### If using Vercel DNS (Easiest):
   - Vercel will show you nameservers
   - Update at your domain registrar
   - Wait for propagation (~24 hours)

   #### If using your own DNS:
   - Add A record:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     ```
   - Add CNAME for www:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **SSL Certificate:**
   - Vercel automatically provisions Let's Encrypt SSL
   - Usually takes 1-5 minutes
   - Your site will be HTTPS automatically!

4. **Update Environment Variables:**
   - Update `NEXTAUTH_URL` to your custom domain
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain
   - Redeploy (automatic on env var change)

---

### Step 8: Configure Stripe Webhook

Now that you have a live URL, update your Stripe webhook:

1. **Go to Stripe Dashboard:**
   - Navigate to Developers → Webhooks
   - Find your webhook endpoint

2. **Update Endpoint URL:**
   - Change from temporary URL to:
     ```
     https://your-domain.com/api/stripe/webhook
     ```

3. **Test Webhook:**
   - In Stripe Dashboard, click "Send test webhook"
   - Select `checkout.session.completed`
   - Verify it succeeds (200 OK)

---

## ⚙️ Advanced Configuration

### Enable Edge Functions (Optional)

For faster response times globally:

1. Create `middleware.ts` in your app root:
   ```typescript
   import { NextResponse } from 'next/server';
   import type { NextRequest } from 'next/server';

   export const config = {
     matcher: [
       '/api/:path*',
       '/nfts/:path*'
     ],
   };

   export function middleware(request: NextRequest) {
     // Add custom headers
     const response = NextResponse.next();
     response.headers.set('x-custom-header', 'AuthiChain');
     return response;
   }
   ```

2. Deploy - functions will run on Edge Network

---

### Configure Vercel Analytics (Free!)

1. **In Vercel Dashboard:**
   - Go to Project → Analytics
   - Click "Enable"

2. **Add to `_app.tsx`:**
   ```tsx
   import { Analytics } from '@vercel/analytics/react';

   function MyApp({ Component, pageProps }) {
     return (
       <>
         <Component {...pageProps} />
         <Analytics />
       </>
     );
   }
   ```

---

### Set Up Logging (Recommended)

1. **Install Vercel Log Drain:**
   ```bash
   vercel integrations add datadog
   # or
   vercel integrations add logtail
   ```

2. **Configure in Dashboard:**
   - Vercel Dashboard → Integrations
   - Choose your logging provider
   - Follow setup instructions

---

### Configure Image Optimization

Vercel automatically optimizes images, but you can configure:

1. **In `next.config.js`:**
   ```javascript
   module.exports = {
     images: {
       domains: [
         'ipfs.io',
         'nft.storage',
         'cloudflare-ipfs.com'
       ],
       formats: ['image/avif', 'image/webp'],
     },
   };
   ```

---

## 🔧 Continuous Deployment

Vercel automatically deploys on every push:

### Production Branch

- **Branch:** `main` (or `master`)
- **Deployments:** Automatic production deployments
- **Domain:** Your custom domain

### Preview Branches

- **Branch:** Any other branch (e.g., `dev`, `staging`)
- **Deployments:** Automatic preview deployments
- **Domain:** Unique Vercel URL per branch

### Pull Requests

- **Every PR** gets a unique deployment
- **Comment** with preview link appears in PR
- **Test** changes before merging

---

## 🧪 Testing Production Deployment

### 1. Basic Health Check

```bash
curl https://your-domain.com/api/health
```

### 2. Test Authentication

1. Visit your site
2. Try registering a new user
3. Verify email confirmation (if enabled)
4. Log in with credentials

### 3. Test Stripe Integration

1. Navigate to pricing page
2. Click "Subscribe" on a tier
3. Use test card: `4242 4242 4242 4242`
4. Verify checkout completes
5. Check Stripe Dashboard for payment

### 4. Test NFT Minting

1. Log in as a subscribed user
2. Navigate to "Create NFT"
3. Upload an image
4. Fill in details
5. Mint NFT
6. Verify it appears in your collection
7. Check IPFS URL works

### 5. Performance Test

```bash
# Install Apache Bench
brew install httpd

# Load test
ab -n 1000 -c 10 https://your-domain.com/
```

---

## 📊 Monitoring & Logs

### View Real-Time Logs

1. **Vercel Dashboard:**
   - Go to your project
   - Click "Deployments"
   - Select a deployment
   - Click "View Function Logs"

2. **Vercel CLI:**
   ```bash
   vercel logs
   ```

### Monitor Performance

1. **Vercel Analytics:**
   - Dashboard → Analytics
   - View:
     - Page views
     - Unique visitors
     - Top pages
     - Real User Monitoring scores

2. **Web Vitals:**
   - Automatically tracked
   - Core Web Vitals (LCP, FID, CLS)

---

## 🚨 Troubleshooting

### Build Fails

**Error:** `Module not found` or `Cannot find module`

**Solution:**
1. Check `package.json` includes all dependencies
2. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   git commit -am "Update dependencies"
   git push
   ```

---

### Environment Variables Not Working

**Error:** `process.env.VARIABLE_NAME is undefined`

**Solution:**
1. Verify env var is set in Vercel Dashboard
2. Ensure correct environment (Production/Preview/Development)
3. Redeploy:
   ```bash
   vercel --prod
   ```
4. For client-side vars, prefix with `NEXT_PUBLIC_`

---

### Database Connection Timeout

**Error:** `Connection timeout` or `ETIMEDOUT`

**Solution:**
1. Verify `DATABASE_URL` is correct
2. Check database is running
3. Add Vercel IPs to database whitelist (if using IP filtering)
4. Use connection pooling:
   ```typescript
   // prisma/client.ts
   import { PrismaClient } from '@prisma/client';

   const globalForPrisma = global as unknown as { prisma: PrismaClient };

   export const prisma =
     globalForPrisma.prisma ||
     new PrismaClient({
       log: ['query'],
     });

   if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
   ```

---

### Stripe Webhook Not Receiving Events

**Error:** Webhook shows failed in Stripe Dashboard

**Solution:**
1. Verify webhook URL is correct (no trailing slash)
2. Check endpoint is publicly accessible
3. Verify webhook signing secret matches
4. Test locally with Stripe CLI:
   ```bash
   stripe listen --forward-to https://your-domain.com/api/stripe/webhook
   ```
5. Check Vercel function logs for errors

---

### 504 Gateway Timeout

**Error:** Function execution timeout

**Solution:**
1. Optimize long-running functions
2. Upgrade to Pro plan (60-second timeout)
3. Move heavy processing to background jobs
4. Use streaming responses for large data

---

## 🔄 Rollback Deployment

If something goes wrong:

1. **In Vercel Dashboard:**
   - Go to Deployments
   - Find last working deployment
   - Click "..." menu
   - Click "Promote to Production"

2. **Using CLI:**
   ```bash
   vercel rollback
   ```

---

## 🎯 Performance Optimization

### 1. Enable Caching

```typescript
// app/api/nfts/route.ts
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  // Your API logic
}
```

### 2. Use Static Generation

```typescript
// app/nfts/page.tsx
export const revalidate = 3600; // Regenerate every hour

export default async function NFTsPage() {
  const nfts = await prisma.nft.findMany();
  return <NFTGrid nfts={nfts} />;
}
```

### 3. Optimize Images

```tsx
import Image from 'next/image';

<Image
  src={nft.imageUrl}
  alt={nft.name}
  width={500}
  height={500}
  priority={isFeatured}
/>
```

### 4. Enable Compression

```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
};
```

---

## 🔐 Security Hardening

### 1. Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 2. Rate Limiting

```typescript
// app/api/auth/register/route.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }

  // Handle registration
}
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables Guide](https://vercel.com/docs/environment-variables)

---

## ✅ Deployment Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] Custom domain configured and SSL active
- [ ] Stripe webhook configured and tested
- [ ] Test user registration and login
- [ ] Test subscription checkout
- [ ] Test NFT minting and uploading
- [ ] Performance monitoring enabled
- [ ] Error tracking configured
- [ ] Backup strategy in place
- [ ] Complete [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)

---

**Congratulations! Your AuthiChain platform is now live on Vercel! 🎉**

