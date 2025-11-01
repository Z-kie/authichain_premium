# AuthiChain Production Monitoring Setup

## 📊 Overview

AuthiChain has a comprehensive monitoring infrastructure to ensure production reliability, performance tracking, and rapid incident response. This document covers all monitoring tools, configurations, and operational procedures.

---

## 🎯 Monitoring Stack

### 1. **Sentry** - Error Tracking & Performance Monitoring
- **Purpose**: Real-time error tracking, performance monitoring, session replay
- **Dashboard**: https://sentry.io/organizations/authichain/
- **DSN**: `https://d0e5e0e8e0c5e0e8e0c5e0e8e0c5e0e8@o4508527268175872.ingest.us.sentry.io/4508527273058304`
- **Project**: authichain-production
- **Features**:
  - Client-side error tracking
  - Server-side error tracking
  - Edge runtime error tracking
  - Performance monitoring (100% sample rate)
  - Session replay (10% normal sessions, 100% error sessions)
  - Release tracking via Git commit SHA

### 2. **Custom Health Checks** - System Status Monitoring
- **Purpose**: Proactive monitoring of critical services
- **Endpoints**: See [Health Check Endpoints](#health-check-endpoints) below
- **Integration**: Can be monitored by external services (UptimeRobot, Pingdom, etc.)

### 3. **Structured Logging** - Debug & Audit Trail
- **Purpose**: Structured logs for debugging, auditing, and analysis
- **Location**: Vercel logs, can be exported to external services
- **Format**: JSON with timestamp, level, context, and metadata

### 4. **Vercel Analytics** - Production Insights
- **Purpose**: Performance metrics, deployment status, function logs
- **Dashboard**: https://vercel.com/your-team/authichain

---

## 🔧 Configuration

### Environment Variables

All environment files have been updated with Sentry configuration:

#### Development (.env.local)
```bash
NEXT_PUBLIC_SENTRY_DSN="https://d0e5e0e8e0c5e0e8e0c5e0e8e0c5e0e8@o4508527268175872.ingest.us.sentry.io/4508527273058304"
SENTRY_DSN="https://d0e5e0e8e0c5e0e8e0c5e0e8e0c5e0e8@o4508527268175872.ingest.us.sentry.io/4508527273058304"
SENTRY_ORG="authichain"
SENTRY_PROJECT="authichain-production"
SENTRY_AUTH_TOKEN=""
NEXT_PUBLIC_SENTRY_ENVIRONMENT="production"
```

#### Production (.env.production & authichain_production.env)
Same as above with production environment set.

#### Vercel Environment Variables

To update Vercel environment variables, run:

```bash
# Login to Vercel (if not already)
npx vercel login

# Run the update script
./update_vercel_sentry.sh
```

Or manually add via Vercel dashboard:
1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add: `NEXT_PUBLIC_SENTRY_DSN` = `https://d0e5e0e8e0c5e0e8e0c5e0e8e0c5e0e8@o4508527268175872.ingest.us.sentry.io/4508527273058304`
3. Add: `NEXT_PUBLIC_SENTRY_ENVIRONMENT` = `production`
4. Set scope to: Production

---

## 🏥 Health Check Endpoints

### 1. Overall Health Check
**Endpoint**: `GET /api/health`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-21T12:00:00.000Z",
  "environment": "production",
  "services": {
    "api": "operational",
    "database": "checking...",
    "stripe": "checking...",
    "nftStorage": "checking..."
  },
  "version": "abc123def",
  "uptime": 3600
}
```

**Use Case**: Quick system status check

---

### 2. Database Health Check
**Endpoint**: `GET /api/health/db`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-21T12:00:00.000Z",
  "service": "database",
  "responseTime": 45,
  "details": {
    "provider": "postgresql",
    "connected": true
  }
}
```

**Use Case**: Monitor database connectivity and query performance

---

### 3. Stripe Health Check
**Endpoint**: `GET /api/health/stripe`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-21T12:00:00.000Z",
  "service": "stripe",
  "responseTime": 120,
  "details": {
    "apiVersion": "2025-08-27.basil",
    "mode": "live",
    "connected": true
  }
}
```

**Use Case**: Monitor Stripe API connectivity and payment system status

---

### 4. NFT.Storage Health Check
**Endpoint**: `GET /api/health/nft-storage`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-21T12:00:00.000Z",
  "service": "nft-storage",
  "responseTime": 200,
  "details": {
    "apiEndpoint": "https://api.nft.storage",
    "connected": true
  }
}
```

**Use Case**: Monitor IPFS/NFT.Storage connectivity

---

### 5. Comprehensive Health Check
**Endpoint**: `GET /api/health/comprehensive`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-21T12:00:00.000Z",
  "totalResponseTime": 350,
  "services": {
    "database": {
      "status": "healthy",
      "responseTime": 45
    },
    "stripe": {
      "status": "healthy",
      "responseTime": 120
    },
    "nftStorage": {
      "status": "healthy",
      "responseTime": 200
    }
  },
  "environment": "production",
  "version": "abc123def"
}
```

**Use Case**: Complete system health check for monitoring dashboards

**Status Codes**:
- `200`: All services healthy
- `207`: Degraded (some services unhealthy)
- `503`: Unhealthy (critical services down)

---

## 📝 Structured Logging

### Logger Usage

Import the logger:
```typescript
import { logger } from '@/lib/monitoring/logger';
```

### Log Levels

1. **DEBUG** - Development-only detailed information
2. **INFO** - General operational information
3. **WARN** - Warning messages for potential issues
4. **ERROR** - Error messages for failures
5. **CRITICAL** - Critical system failures

### Basic Logging

```typescript
// Info logging
logger.info('User registered successfully', {
  userId: user.id,
  walletAddress: user.walletAddress,
  action: 'user_registration'
});

// Warning logging
logger.warn('API rate limit approaching', {
  userId: user.id,
  metadata: { requestCount: 95, limit: 100 }
});

// Error logging
logger.error('Failed to mint NFT', {
  userId: user.id,
  action: 'nft_mint',
  metadata: { collectionId: 123 }
}, error);

// Critical logging
logger.critical('Database connection lost', {
  action: 'db_connection'
}, error);
```

### Specialized Logging Methods

```typescript
// API requests
logger.logRequest('POST', '/api/nft/mint', { userId: user.id });

// API responses
logger.logResponse('POST', '/api/nft/mint', 200, 450, { userId: user.id });

// NFT operations
logger.logNFTOperation('mint', true, {
  userId: user.id,
  metadata: { tokenId: 'abc123' }
});

// Payment operations
logger.logPayment('subscription', 29.99, 'USD', true, {
  userId: user.id,
  metadata: { planId: 'pro' }
});

// Authentication
logger.logAuth('wallet_connect', true, {
  walletAddress: '0x...'
});
```

### Log Context Interface

```typescript
interface LogContext {
  userId?: string;
  walletAddress?: string;
  requestId?: string;
  action?: string;
  metadata?: Record<string, any>;
}
```

---

## 🎭 Sentry Configuration

### Client-Side (sentry.client.config.js)

Features:
- Error tracking
- Performance monitoring (100% sample rate)
- Session replay (10% sessions, 100% errors)
- Browser tracing
- Automatic error boundary integration

Configuration highlights:
- Filters out wallet rejection errors
- Removes sensitive cookies/headers
- Tracks frontend performance
- Captures user interactions

### Server-Side (sentry.server.config.js)

Features:
- Server error tracking
- API performance monitoring
- Database query tracking
- HTTP request tracing

Configuration highlights:
- Filters sensitive data (passwords, tokens, API keys)
- Integrates with Prisma for DB monitoring
- Removes authentication headers

### Edge Runtime (sentry.edge.config.js)

Features:
- Edge function error tracking
- Minimal processing for performance

Configuration highlights:
- Lightweight for edge performance
- Removes cookies from requests

---

## 🚨 Setting Up External Monitoring

### Recommended: UptimeRobot (Free)

1. Create account at https://uptimerobot.com
2. Add monitors for:
   - **Main Health Check**: `https://yourapp.vercel.app/api/health`
   - **Comprehensive Check**: `https://yourapp.vercel.app/api/health/comprehensive`
   - **Homepage**: `https://yourapp.vercel.app`

3. Configure alerts:
   - Email notifications
   - Slack/Discord webhooks
   - Check interval: 5 minutes
   - Alert when: Down or response time > 30s

### Alternative: Pingdom, Datadog, New Relic

Similar setup with health check endpoints.

---

## 📈 Viewing Logs and Errors

### Sentry Dashboard

1. **Navigate to**: https://sentry.io/organizations/authichain/
2. **View Issues**: See all errors grouped by type
3. **Performance**: View API endpoint performance
4. **Replays**: Watch session replays for errors
5. **Releases**: Track errors by deployment version

### Vercel Logs

1. **Navigate to**: https://vercel.com/your-project
2. **Go to**: Deployments > [Latest] > Runtime Logs
3. **Filter by**: Function, search term, time range
4. **Export**: Download logs for analysis

### Real-Time Monitoring

```bash
# Stream Vercel logs in real-time
npx vercel logs --follow
```

---

## 🔍 Troubleshooting Guide

### Issue: High Error Rate in Sentry

**Steps**:
1. Check Sentry dashboard for error details
2. Identify affected endpoints/components
3. Review recent deployments
4. Check health endpoints for service status
5. Review Vercel logs for stack traces
6. Roll back deployment if critical

### Issue: Health Check Failing

**Database Health Check Fails**:
- Verify DATABASE_URL is correct
- Check Neon console for database status
- Test connection: `npx prisma db pull`

**Stripe Health Check Fails**:
- Verify STRIPE_SECRET_KEY is correct
- Check Stripe dashboard for API status
- Test with Stripe CLI: `stripe status`

**NFT.Storage Health Check Fails**:
- Verify NFT_STORAGE_API_KEY is valid
- Check NFT.Storage status page
- Test manual upload to verify API key

### Issue: Missing Logs

**Check**:
1. Environment variable `NODE_ENV` is set
2. Logger is properly imported
3. Logs are structured (JSON format)
4. Vercel deployment completed successfully

---

## 📊 Monitoring Checklist

### Daily
- [ ] Check Sentry for new critical errors
- [ ] Review Vercel deployment status
- [ ] Monitor uptime from external service

### Weekly
- [ ] Review Sentry performance trends
- [ ] Check health endpoint response times
- [ ] Review error resolution rate
- [ ] Analyze top error types

### Monthly
- [ ] Review monitoring costs
- [ ] Update Sentry sampling rates if needed
- [ ] Audit log retention policies
- [ ] Review and update alert thresholds

---

## 🚀 Post-Deployment Verification

### Immediate (First 30 minutes)
1. **Verify deployment**: Check Vercel deployment status
2. **Test health checks**: Run all health check endpoints
3. **Check Sentry**: Verify error reporting is working
4. **Monitor logs**: Watch Vercel logs for errors

### First 24 Hours
1. **Monitor error rate**: Should be < 1%
2. **Check performance**: P95 response time < 1s
3. **Review user reports**: Check support channels
4. **Verify analytics**: Ensure tracking is working

### First Week
1. **Analyze trends**: Review error patterns
2. **Optimize monitoring**: Adjust sampling rates
3. **Set up alerts**: Configure notification thresholds
4. **Document issues**: Create runbooks for common problems

---

## 🎯 Monitoring Metrics

### Key Performance Indicators (KPIs)

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Uptime | 99.9% | < 99.5% |
| API Response Time (P95) | < 1s | > 2s |
| Error Rate | < 0.5% | > 2% |
| Database Query Time (P95) | < 100ms | > 500ms |
| Stripe API Response Time | < 200ms | > 1s |
| NFT.Storage Response Time | < 500ms | > 2s |

### Health Check Response Times

| Service | Good | Warning | Critical |
|---------|------|---------|----------|
| Database | < 50ms | 50-200ms | > 200ms |
| Stripe | < 150ms | 150-500ms | > 500ms |
| NFT.Storage | < 300ms | 300-1000ms | > 1000ms |
| Overall | < 500ms | 500-1500ms | > 1500ms |

---

## 🛠 Advanced Configuration

### Sentry Source Maps (Optional)

For better error stack traces, configure source maps:

1. Add to `.env.production`:
```bash
SENTRY_AUTH_TOKEN="your_auth_token_here"
```

2. Source maps will be automatically uploaded during build

### Custom Monitoring Integration

The logger can be extended to send logs to external services:

```typescript
// In lib/monitoring/logger.ts
private async sendToMonitoring(logEntry: any) {
  // Send to Datadog
  await fetch('https://http-intake.logs.datadoghq.com/api/v2/logs', {
    method: 'POST',
    headers: {
      'DD-API-KEY': process.env.DATADOG_API_KEY,
    },
    body: JSON.stringify(logEntry),
  });
}
```

---

## 📞 Support & Resources

### Sentry
- Dashboard: https://sentry.io
- Documentation: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- Status: https://status.sentry.io

### Vercel
- Dashboard: https://vercel.com
- Documentation: https://vercel.com/docs/observability
- Status: https://www.vercel-status.com

### AuthiChain Internal
- Team: monitoring@authichain.com
- Slack: #monitoring-alerts
- On-call: Use PagerDuty rotation

---

## 🎉 Summary

Your AuthiChain production monitoring is now fully configured with:

✅ **Sentry** - Real-time error tracking and performance monitoring
✅ **Health Checks** - 5 comprehensive health check endpoints
✅ **Structured Logging** - Production-ready logging utility
✅ **Documentation** - Complete operational guide
✅ **Vercel Integration** - Native deployment monitoring

**Next Steps**:
1. Set up external uptime monitoring (UptimeRobot recommended)
2. Configure Slack/email alerts in Sentry
3. Review monitoring dashboard daily for first week
4. Document any new error patterns in runbooks

**Production Readiness**: ✅ **READY FOR LAUNCH**

---

*Last Updated: October 21, 2025*
*Version: 1.0.0*
