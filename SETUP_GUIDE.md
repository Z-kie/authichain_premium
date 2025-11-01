# 🚀 AuthiChain Complete Setup Guide

## Overview
AuthiChain is a premium NFT authentication and verification marketplace platform with enterprise features, payment processing, and blockchain integration.

---

## 🎯 Quick Start (3 Minutes)

### Option 1: Automated Setup (Recommended)
```bash
cd /home/ubuntu/authichain_premium
./setup.sh
```

### Option 2: Manual Setup
```bash
cd /home/ubuntu/authichain_premium/app
npm install
npx prisma generate
npx prisma db push
npm run build
npm run dev
```

---

## 📋 Prerequisites

### Required Software
- ✅ Node.js 18+ (Already installed)
- ✅ npm 9+ (Already installed)
- ✅ PostgreSQL Database (Already configured)

### Optional Tools
- Git (for version control)
- Chrome/Firefox (for testing)
- Stripe Account (for payments)
- Alchemy Account (for blockchain)

---

## 🔧 Configuration

### 1. Environment Variables (.env)

The `.env` file is already configured with test credentials:

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="TMZDqgBKn0PbffMNZvdxdGGbllN7Pdvw"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (TEST mode - safe for development)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_BRAND_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 2. Stripe Configuration (For Live Payments)

#### Get Your Stripe Keys:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers → API Keys**
3. Copy your keys:
   - Publishable key (starts with `pk_live_`)
   - Secret key (starts with `sk_live_`)

#### Create Subscription Products:
1. Go to **Products** in Stripe Dashboard
2. Create "AuthiChain Pro" - $29/month
   - Copy the Price ID (starts with `price_`)
   - Update `STRIPE_PRO_PRICE_ID` in .env
3. Create "AuthiChain Brand" - $99/month
   - Copy the Price ID
   - Update `STRIPE_BRAND_PRICE_ID` in .env

#### Set Up Webhooks:
1. Go to **Developers → Webhooks**
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy webhook secret (starts with `whsec_`)
6. Update `STRIPE_WEBHOOK_SECRET` in .env

### 3. Database Setup

The database is automatically configured and seeded with:
- ✅ Admin account: `admin@authichain.com` / `Admin123!`
- ✅ Test user: `user@authichain.com` / `User123!`
- ✅ Sample NFTs and collections
- ✅ Sample transactions

---

## 🎮 Running the Application

### Development Mode (with hot reload)
```bash
cd /home/ubuntu/authichain_premium/app
npm run dev
```
Access at: http://localhost:3000

### Production Mode
```bash
cd /home/ubuntu/authichain_premium/app
npm run build
npm run start
```

### Background Mode (persistent)
```bash
cd /home/ubuntu/authichain_premium/app
npm run dev > /dev/null 2>&1 &
```

---

## 🧪 Testing

### Test Stripe Payments (Test Mode)

Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Any future expiry date and any 3-digit CVC will work.

### Test Accounts

| Role | Email | Password | Features |
|------|-------|----------|----------|
| Admin | admin@authichain.com | Admin123! | Full access, analytics, user management |
| User | user@authichain.com | User123! | Standard user, can buy/sell NFTs |

### Test Workflow
1. Sign in with test account
2. Browse NFT marketplace
3. Connect wallet (MetaMask recommended)
4. Purchase NFT with test card
5. Verify transaction in admin dashboard

---

## 📱 Features

### ✅ Core Features
- **NFT Marketplace**: Browse, buy, sell authentic NFTs
- **Authentication System**: Secure blockchain verification
- **Payment Processing**: Stripe, PayPal, Crypto payments
- **Subscription Plans**: Pro ($29/mo) and Brand ($99/mo)
- **Admin Dashboard**: Analytics, user management
- **Mobile PWA**: Progressive Web App support
- **API Integration**: RESTful API with documentation

### ✅ Enterprise Features
- **White-label Solutions**: Customizable branding
- **Multi-currency Support**: USD, EUR, GBP, JPY, etc.
- **Escrow System**: Secure NFT transactions
- **Compliance Tools**: KYC/AML integration ready
- **Analytics Dashboard**: Real-time metrics
- **Role-based Access**: Granular permissions

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel deploy
```

### Option 2: Docker
```bash
docker build -t authichain .
docker run -p 3000:3000 authichain
```

### Option 3: Traditional VPS
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "authichain" -- start

# Set up auto-restart
pm2 startup
pm2 save
```

---

## 🔒 Security Checklist

### Before Going Live:
- [ ] Replace all test Stripe keys with live keys
- [ ] Set strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable webhook signature verification
- [ ] Configure backup system for database
- [ ] Set up monitoring and alerts
- [ ] Review and test all payment flows
- [ ] Implement logging and error tracking

---

## 📚 Project Structure

```
authichain_premium/
├── app/
│   ├── api/              # API routes
│   ├── app/              # Next.js 13+ app directory
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── prisma/           # Database schema
│   ├── public/           # Static assets
│   ├── scripts/          # Setup and utility scripts
│   ├── types/            # TypeScript types
│   ├── .env              # Environment variables
│   ├── package.json      # Dependencies
│   └── tsconfig.json     # TypeScript config
├── setup.sh              # Automated setup script
└── SETUP_GUIDE.md        # This file
```

---

## 🆘 Troubleshooting

### Issue: Port 3000 already in use
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: Database connection failed
```bash
# Check database is running
npx prisma db push

# Reset database
npx prisma migrate reset
```

### Issue: Stripe webhook not receiving events
1. Check webhook URL is correct
2. Verify webhook secret in .env
3. Test with Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

### Issue: Build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

---

## 📞 Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

### Getting Help
- Check existing documentation
- Review error logs: `.logs/` directory
- Test in development mode first
- Verify environment variables

---

## 🎉 Success Metrics

After setup, you should be able to:
- ✅ Access application at http://localhost:3000
- ✅ Sign in with test accounts
- ✅ Browse NFT marketplace
- ✅ Process test payments
- ✅ View admin dashboard
- ✅ Test API endpoints

---

## 📝 Next Steps

1. **Customize Branding**: Update logos, colors, copy
2. **Configure Payments**: Set up live Stripe account
3. **Add Content**: Upload NFTs and collections
4. **Test Everything**: Run through all user flows
5. **Deploy to Production**: Choose hosting provider
6. **Monitor & Iterate**: Track analytics, gather feedback

---

## 🚀 Ready to Launch!

Your AuthiChain platform is now set up and ready to authenticate and verify NFTs at scale!

For the latest updates and features, check the main repository.

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Platform**: AuthiChain NFT Marketplace
