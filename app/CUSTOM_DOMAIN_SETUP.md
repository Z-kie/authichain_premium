
# 🌐 AuthiChain Custom Domain Setup Guide

**Platform:** Vercel  
**Current URL:** https://authichain-b7pqitre1-authichain.vercel.app  
**Target:** Custom domain (e.g., authichain.com)

---

## Overview

This guide walks you through setting up a custom domain for your AuthiChain deployment on Vercel. The process typically takes 10-30 minutes depending on DNS propagation.

---

## Prerequisites

- ✅ Domain name purchased (from GoDaddy, Namecheap, Google Domains, etc.)
- ✅ Access to domain registrar's DNS settings
- ✅ Vercel account with AuthiChain project deployed
- ✅ Vercel CLI installed (optional, for command-line setup)

---

## Step 1: Access Vercel Project Settings

### Via Vercel Dashboard

1. Go to https://vercel.com/authichain/app
2. Click on your **AuthiChain** project
3. Navigate to **Settings** tab
4. Click on **Domains** in the left sidebar

### Via Vercel CLI

```bash
vercel domains --token=GHvJLpxhTT9rkW6sEiSn1G3U
```

---

## Step 2: Add Your Custom Domain

### Option A: Root Domain (authichain.com)

1. In Vercel Dashboard → Domains section
2. Click **Add Domain**
3. Enter your domain: `authichain.com`
4. Click **Add**

Vercel will provide DNS records to configure.

### Option B: Subdomain (www.authichain.com)

1. In Vercel Dashboard → Domains section
2. Click **Add Domain**
3. Enter: `www.authichain.com`
4. Click **Add**

### Option C: Both (Recommended)

Add both `authichain.com` and `www.authichain.com`, then set one as primary.

---

## Step 3: Configure DNS Records

Vercel will provide specific DNS records. Here's what you'll typically need:

### For Root Domain (authichain.com)

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

**Alternative - CNAME (if supported):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

### For www Subdomain

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### For Both (Recommended Setup)

1. **A Record** for root domain
2. **CNAME Record** for www subdomain
3. Set up redirect from one to the other in Vercel

---

## Step 4: Update DNS at Your Registrar

### GoDaddy

1. Log in to GoDaddy account
2. Go to **My Products** → **Domains**
3. Click **DNS** next to your domain
4. Click **Add** to create new records
5. Add the A and CNAME records from Step 3
6. Save changes

### Namecheap

1. Log in to Namecheap
2. Go to **Domain List**
3. Click **Manage** next to your domain
4. Go to **Advanced DNS** tab
5. Add the records from Step 3
6. Save changes

### Google Domains

1. Log in to Google Domains
2. Select your domain
3. Click **DNS** in the left menu
4. Scroll to **Custom resource records**
5. Add the records from Step 3
6. Save

### Cloudflare

1. Log in to Cloudflare
2. Select your domain
3. Go to **DNS** tab
4. Add the records from Step 3
5. **Important:** Set proxy status to "DNS only" (gray cloud)
6. Save

---

## Step 5: Verify Domain in Vercel

### Automatic Verification

1. After adding DNS records, return to Vercel Dashboard
2. Vercel will automatically check DNS records
3. Status will show "Pending" → "Valid" when ready
4. This can take 5 minutes to 48 hours (usually < 1 hour)

### Manual Verification

```bash
# Check DNS propagation
dig authichain.com
dig www.authichain.com

# Or use online tools
# https://dnschecker.org
```

---

## Step 6: Configure SSL Certificate

### Automatic SSL (Recommended)

Vercel automatically provisions SSL certificates via Let's Encrypt:

1. Once domain is verified, SSL is auto-configured
2. Certificate renews automatically every 90 days
3. No action required from you

### Check SSL Status

1. In Vercel Dashboard → Domains
2. Look for green lock icon next to domain
3. Status should show "Valid" with SSL enabled

---

## Step 7: Set Primary Domain

### Choose Primary Domain

1. In Vercel Dashboard → Domains
2. Click the three dots (...) next to your preferred domain
3. Select **Set as Primary**
4. This becomes the canonical URL for your site

### Recommended Setup

- **Primary:** `authichain.com` (root domain)
- **Redirect:** `www.authichain.com` → `authichain.com`

Or vice versa, depending on preference.

---

## Step 8: Configure Redirects

### Automatic Redirects

Vercel automatically handles:
- HTTP → HTTPS redirect
- www → non-www (or vice versa, based on primary)

### Custom Redirects (Optional)

Create `vercel.json` in project root:

```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

---

## Step 9: Update Environment Variables

### Update NEXTAUTH_URL

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Find `NEXTAUTH_URL`
3. Update value to your custom domain:
   ```
   https://authichain.com
   ```
4. Redeploy for changes to take effect

### Update NEXT_PUBLIC_SITE_URL

1. Find `NEXT_PUBLIC_SITE_URL`
2. Update to:
   ```
   https://authichain.com
   ```
3. Redeploy

---

## Step 10: Test Your Domain

### Basic Tests

1. **Visit your domain:** https://authichain.com
2. **Check SSL:** Look for padlock in browser
3. **Test www redirect:** https://www.authichain.com
4. **Verify HTTP redirect:** http://authichain.com

### Comprehensive Tests

```bash
# Test DNS resolution
nslookup authichain.com

# Test SSL certificate
openssl s_client -connect authichain.com:443 -servername authichain.com

# Test HTTP headers
curl -I https://authichain.com
```

### Functional Tests

- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Images and assets load
- [ ] API endpoints work
- [ ] Wallet connection functions
- [ ] Stripe checkout redirects properly

---

## Troubleshooting

### Domain Not Verifying

**Issue:** Domain stuck in "Pending" status

**Solutions:**
1. Wait 1-2 hours for DNS propagation
2. Verify DNS records are correct
3. Check for conflicting records (remove old A/CNAME records)
4. Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
5. Try different DNS checker: https://dnschecker.org

### SSL Certificate Issues

**Issue:** SSL not provisioning

**Solutions:**
1. Ensure domain is fully verified first
2. Check for CAA records blocking Let's Encrypt
3. Wait 10-15 minutes after verification
4. Contact Vercel support if persists

### Redirect Loops

**Issue:** Too many redirects error

**Solutions:**
1. Check Cloudflare proxy settings (should be "DNS only")
2. Verify only one redirect rule exists
3. Clear browser cache and cookies
4. Check `vercel.json` for conflicting redirects

### Mixed Content Warnings

**Issue:** Some assets loading over HTTP

**Solutions:**
1. Update all asset URLs to use HTTPS
2. Check `next.config.js` for asset prefix
3. Verify CDN URLs use HTTPS
4. Update environment variables

---

## Advanced Configuration

### Custom Nameservers (Optional)

For advanced users, you can use Vercel's nameservers:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Benefits:**
- Faster DNS propagation
- Integrated DNS management
- Automatic SSL renewal

**Steps:**
1. In domain registrar, change nameservers
2. Point to Vercel nameservers above
3. Manage all DNS in Vercel Dashboard

### Multiple Domains

To add multiple domains (e.g., authichain.io, authichain.net):

1. Add each domain in Vercel Dashboard
2. Configure DNS for each
3. Set one as primary
4. Others will redirect automatically

### Apex Domain with Cloudflare

If using Cloudflare:

1. Add domain to Cloudflare
2. Set nameservers to Cloudflare
3. In Cloudflare DNS, add:
   - CNAME for @ pointing to cname.vercel-dns.com
   - Set to "DNS only" (gray cloud)
4. In Vercel, add domain as usual

---

## Post-Setup Checklist

- [ ] Domain resolves correctly
- [ ] SSL certificate active
- [ ] www redirect working
- [ ] HTTP → HTTPS redirect working
- [ ] All pages load correctly
- [ ] Environment variables updated
- [ ] Stripe webhooks updated (if using custom domain)
- [ ] Google Analytics updated
- [ ] Social media links updated
- [ ] Email signatures updated

---

## Updating Stripe Webhook URL

After domain setup, update Stripe webhook:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click on your webhook
3. Update endpoint URL to:
   ```
   https://authichain.com/api/webhooks/stripe
   ```
4. Save changes
5. Test webhook with Stripe CLI

---

## DNS Propagation Timeline

| Timeframe | Status |
|-----------|--------|
| 0-5 minutes | Records updated at registrar |
| 5-30 minutes | Propagation begins |
| 30 minutes - 2 hours | Most DNS servers updated |
| 2-24 hours | Global propagation |
| 24-48 hours | Full propagation (rare) |

**Note:** Most domains are accessible within 1 hour.

---

## Support Resources

### Vercel Documentation
- https://vercel.com/docs/concepts/projects/domains

### DNS Checkers
- https://dnschecker.org
- https://www.whatsmydns.net

### SSL Checkers
- https://www.ssllabs.com/ssltest/

### Vercel Support
- Dashboard: https://vercel.com/support
- Email: support@vercel.com
- Community: https://github.com/vercel/vercel/discussions

---

## Quick Reference

### Common DNS Records

```
# Root domain
Type: A
Name: @
Value: 76.76.21.21

# www subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# Verification (if required)
Type: TXT
Name: @
Value: [provided by Vercel]
```

### Vercel CLI Commands

```bash
# Add domain
vercel domains add authichain.com

# List domains
vercel domains ls

# Remove domain
vercel domains rm authichain.com

# Inspect domain
vercel domains inspect authichain.com
```

---

## Conclusion

Setting up a custom domain enhances your brand and provides a professional appearance. Follow this guide step-by-step, and your AuthiChain platform will be accessible via your custom domain within an hour.

**Need Help?** Contact Vercel support or refer to their comprehensive documentation.

---

**Guide Version:** 1.0  
**Last Updated:** October 20, 2025  
**Platform:** Vercel  
**Project:** AuthiChain
