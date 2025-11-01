
# 📊 AuthiChain Monitoring & Analytics Setup Guide

**Platform:** Vercel + Stripe + Google Analytics  
**Last Updated:** October 20, 2025

---

## Overview

This guide covers setting up comprehensive monitoring and analytics for AuthiChain, including traffic monitoring, error tracking, payment analytics, and user behavior analysis.

---

## 1. Vercel Analytics

### Built-in Analytics

Vercel provides automatic analytics for all deployments.

#### Access Vercel Analytics

1. Go to https://vercel.com/authichain/app
2. Click **Analytics** tab
3. View real-time metrics

#### Key Metrics Available

- **Page Views:** Total visits to each page
- **Unique Visitors:** Individual user count
- **Top Pages:** Most visited pages
- **Top Referrers:** Traffic sources
- **Devices:** Desktop vs mobile breakdown
- **Countries:** Geographic distribution
- **Performance:** Core Web Vitals

#### Enable Advanced Analytics

```bash
# In your project
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 2. Google Analytics 4

### Setup GA4

#### Create GA4 Property

1. Go to https://analytics.google.com
2. Click **Admin** (gear icon)
3. Create new **Property**
4. Name: "AuthiChain"
5. Select timezone and currency
6. Click **Create**

#### Get Measurement ID

1. In Property settings, go to **Data Streams**
2. Click **Add stream** → **Web**
3. Enter URL: `https://authichain.com`
4. Click **Create stream**
5. Copy **Measurement ID** (format: G-XXXXXXXXXX)

#### Install GA4 in Next.js

**Method 1: Using next/script**

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Method 2: Using environment variable**

```bash
# Add to Vercel environment variables
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

```typescript
// lib/gtag.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

#### Track Custom Events

```typescript
// Track NFT minting
import { event } from '@/lib/gtag';

event({
  action: 'nft_minted',
  category: 'NFT',
  label: 'Collection Name',
  value: 1
});

// Track subscription
event({
  action: 'subscription_started',
  category: 'Payment',
  label: 'Professional Plan',
  value: 149
});
```

---

## 3. Stripe Dashboard Monitoring

### Access Stripe Analytics

1. Go to https://dashboard.stripe.com
2. Navigate to **Home** for overview
3. Check **Payments** for transaction details
4. View **Customers** for subscriber list

### Key Metrics to Monitor

#### Revenue Metrics
- **MRR (Monthly Recurring Revenue)**
- **ARR (Annual Recurring Revenue)**
- **Total Revenue**
- **Average Transaction Value**

#### Customer Metrics
- **New Customers**
- **Active Subscriptions**
- **Churn Rate**
- **Customer Lifetime Value**

#### Payment Metrics
- **Successful Payments**
- **Failed Payments**
- **Refunds**
- **Disputes**

### Set Up Stripe Webhooks Monitoring

```typescript
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Log event for monitoring
    console.log('Stripe webhook received:', event.type);

    // Track in analytics
    if (event.type === 'checkout.session.completed') {
      // Track successful payment
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Webhook error', { status: 400 });
  }
}
```

---

## 4. Error Tracking with Sentry

### Setup Sentry

#### Create Sentry Account

1. Go to https://sentry.io
2. Sign up or log in
3. Create new project
4. Select **Next.js**
5. Copy DSN

#### Install Sentry

```bash
npm install @sentry/nextjs
```

#### Configure Sentry

```bash
# Add to .env
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

```javascript
// sentry.server.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

#### Track Errors

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // Your code
} catch (error) {
  Sentry.captureException(error);
  console.error('Error:', error);
}
```

---

## 5. Custom Analytics Dashboard

### Create Internal Dashboard

```typescript
// app/api/analytics/dashboard/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get key metrics
    const [
      totalUsers,
      totalNFTs,
      totalRevenue,
      activeSubscriptions
    ] = await Promise.all([
      prisma.user.count(),
      prisma.nFT.count(),
      prisma.payment.aggregate({ _sum: { amount: true } }),
      prisma.subscription.count({ where: { status: 'active' } })
    ]);

    return NextResponse.json({
      totalUsers,
      totalNFTs,
      totalRevenue: totalRevenue._sum.amount || 0,
      activeSubscriptions,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
```

### Dashboard Component

```typescript
// components/analytics/dashboard.tsx
'use client';

import { useEffect, useState } from 'react';

export function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch('/api/analytics/dashboard')
      .then(res => res.json())
      .then(data => setMetrics(data));
  }, []);

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard title="Total Users" value={metrics.totalUsers} />
      <MetricCard title="Total NFTs" value={metrics.totalNFTs} />
      <MetricCard title="Revenue" value={`$${metrics.totalRevenue}`} />
      <MetricCard title="Active Subs" value={metrics.activeSubscriptions} />
    </div>
  );
}
```

---

## 6. Performance Monitoring

### Core Web Vitals

Monitor these key metrics:

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

#### Track Web Vitals

```typescript
// app/layout.tsx
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    console.log(metric);
    
    // Send to GA4
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  });
}
```

### Lighthouse CI

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run Lighthouse
lhci autorun --collect.url=https://authichain.com
```

---

## 7. Uptime Monitoring

### UptimeRobot Setup

1. Go to https://uptimerobot.com
2. Create account
3. Add new monitor:
   - **Type:** HTTP(s)
   - **URL:** https://authichain.com
   - **Interval:** 5 minutes
4. Set up alerts (email, SMS, Slack)

### Vercel Status Page

Vercel provides automatic status monitoring:
- https://vercel-status.com

---

## 8. Database Monitoring

### Supabase Dashboard

1. Go to https://app.supabase.com
2. Select your project
3. Navigate to **Database** → **Monitoring**

#### Key Metrics
- **Connection count**
- **Query performance**
- **Database size**
- **Slow queries**

### Query Performance

```sql
-- Find slow queries
SELECT
  query,
  calls,
  total_time,
  mean_time,
  max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

---

## 9. API Monitoring

### Track API Usage

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const start = Date.now();
  
  const response = NextResponse.next();
  
  // Log API call
  const duration = Date.now() - start;
  console.log({
    method: request.method,
    url: request.url,
    duration,
    status: response.status
  });
  
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

---

## 10. User Behavior Tracking

### Hotjar Setup

1. Go to https://www.hotjar.com
2. Create account
3. Add new site
4. Copy tracking code
5. Add to Next.js:

```typescript
// app/layout.tsx
<Script id="hotjar">
  {`
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:YOUR_HJID,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `}
</Script>
```

### Features
- **Heatmaps:** See where users click
- **Session Recordings:** Watch user sessions
- **Surveys:** Collect feedback
- **Funnels:** Track conversion paths

---

## 11. Monitoring Dashboard

### Create Unified Dashboard

```typescript
// app/admin/dashboard/page.tsx
export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">AuthiChain Monitoring</h1>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Real-time Metrics */}
        <section>
          <h2>Real-time Metrics</h2>
          <RealtimeMetrics />
        </section>
        
        {/* Revenue */}
        <section>
          <h2>Revenue</h2>
          <RevenueChart />
        </section>
        
        {/* Users */}
        <section>
          <h2>Users</h2>
          <UserGrowthChart />
        </section>
        
        {/* Errors */}
        <section>
          <h2>Errors</h2>
          <ErrorLog />
        </section>
        
        {/* Performance */}
        <section>
          <h2>Performance</h2>
          <PerformanceMetrics />
        </section>
        
        {/* API Usage */}
        <section>
          <h2>API Usage</h2>
          <APIUsageChart />
        </section>
      </div>
    </div>
  );
}
```

---

## 12. Alerts & Notifications

### Set Up Alerts

#### Vercel Alerts
- Deployment failures
- Build errors
- Performance degradation

#### Stripe Alerts
- Failed payments
- Disputes
- High refund rate

#### Custom Alerts

```typescript
// lib/alerts.ts
export async function sendAlert(message: string, severity: 'info' | 'warning' | 'critical') {
  // Send to Slack
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    body: JSON.stringify({
      text: `[${severity.toUpperCase()}] ${message}`
    })
  });
  
  // Send email for critical alerts
  if (severity === 'critical') {
    // Send email
  }
}
```

---

## 13. Monitoring Checklist

### Daily Checks
- [ ] Vercel deployment status
- [ ] Error rate in Sentry
- [ ] Stripe payment success rate
- [ ] Database performance
- [ ] API response times

### Weekly Reviews
- [ ] User growth trends
- [ ] Revenue metrics
- [ ] Feature usage
- [ ] Performance metrics
- [ ] Customer feedback

### Monthly Analysis
- [ ] Conversion funnel
- [ ] Churn analysis
- [ ] Feature adoption
- [ ] ROI on marketing
- [ ] Technical debt

---

## 14. Key Metrics Summary

### Business Metrics
- **MRR:** Monthly Recurring Revenue
- **Churn Rate:** % of customers lost
- **LTV:** Customer Lifetime Value
- **CAC:** Customer Acquisition Cost
- **Conversion Rate:** Visitors to customers

### Technical Metrics
- **Uptime:** % of time site is available
- **Response Time:** Average API response
- **Error Rate:** % of requests with errors
- **Page Load Time:** Average page load
- **Core Web Vitals:** LCP, FID, CLS

### User Metrics
- **DAU/MAU:** Daily/Monthly Active Users
- **Session Duration:** Average time on site
- **Pages per Session:** Engagement level
- **Bounce Rate:** % leaving immediately
- **Return Rate:** % of returning users

---

## Conclusion

Comprehensive monitoring is essential for AuthiChain's success. This setup provides visibility into all critical aspects of the platform, from technical performance to business metrics.

**Next Steps:**
1. Implement each monitoring tool
2. Set up alerts for critical metrics
3. Create daily monitoring routine
4. Review metrics weekly
5. Optimize based on data

---

**Guide Version:** 1.0  
**Last Updated:** October 20, 2025  
**Status:** Ready for implementation
