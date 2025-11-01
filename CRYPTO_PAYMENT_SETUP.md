# 🚀 Crypto Payment Integration - Complete Setup Guide

## Overview

AuthiChain now supports cryptocurrency payments via **NOWPayments** integration, allowing users to pay with:
- Bitcoin (BTC)
- Ethereum (ETH)
- USD Coin (USDC)
- Tether (USDT)
- And 300+ other cryptocurrencies

### Features
✅ Real-time payment monitoring
✅ Automatic escrow for NFT purchases
✅ QR code generation for easy payments
✅ Webhook notifications (IPN)
✅ Support for multiple cryptocurrencies
✅ Low fees (0.5%)
✅ Secure blockchain confirmation tracking

---

## Step 1: Get NOWPayments API Credentials

### 1.1 Sign up for NOWPayments
1. Go to https://nowpayments.io
2. Click "Sign Up" and create an account
3. Complete email verification
4. Complete KYC verification (required for production)

### 1.2 Generate API Key
1. Log in to your NOWPayments dashboard
2. Go to Settings → API Keys
3. Click "Generate New API Key"
4. Save the API key securely

### 1.3 Generate IPN Secret
1. In the NOWPayments dashboard, go to Settings → IPN
2. Click "Generate IPN Secret Key"
3. Save the IPN secret securely
4. Set your IPN callback URL to: `https://www.authichain.com/api/crypto/ipn`

### 1.4 Configure Payout Wallet
1. Go to Settings → Wallet
2. Add your cryptocurrency wallet addresses for receiving payments
3. Enable auto-conversion to stablecoins if desired (recommended)

---

## Step 2: Add Environment Variables

Add the following to your `.env` file:

```bash
# NOWPayments Configuration
NOWPAYMENTS_API_KEY=your_api_key_here
NOWPAYMENTS_IPN_SECRET=your_ipn_secret_here
NOWPAYMENTS_SANDBOX=false  # Set to true for testing

# Site URL for callbacks
NEXT_PUBLIC_SITE_URL=https://www.authichain.com
```

### For Vercel Deployment:
```bash
vercel env add NOWPAYMENTS_API_KEY
vercel env add NOWPAYMENTS_IPN_SECRET
vercel env add NOWPAYMENTS_SANDBOX
```

---

## Step 3: Database Migration

Run the Prisma migration to add crypto payment tracking:

```bash
cd /home/ubuntu/authichain_premium/app

# Apply the migration
npx prisma migrate deploy

# Or if in development:
npx prisma migrate dev --name add_crypto_payments

# Generate Prisma client
npx prisma generate
```

---

## Step 4: Test in Sandbox Mode

### 4.1 Enable Sandbox
Set `NOWPAYMENTS_SANDBOX=true` in your environment variables.

### 4.2 Test Payment Flow
1. Go to your pricing page
2. Select a plan or NFT to purchase
3. Choose "Pay with Cryptocurrency"
4. Select a cryptocurrency (BTC, ETH, USDC, or USDT)
5. A payment address and QR code will be generated
6. Use NOWPayments sandbox tools to simulate a payment
7. Watch the payment status update in real-time

### 4.3 Verify Webhook
1. Check the IPN webhook logs in NOWPayments dashboard
2. Verify that callbacks are being received at `/api/crypto/ipn`
3. Check database to ensure CryptoPayment and Transaction records are created

---

## Step 5: Go Live

### 5.1 Switch to Production
1. Set `NOWPAYMENTS_SANDBOX=false`
2. Ensure your NOWPayments account is fully verified
3. Configure production payout wallets
4. Test with small real payments first

### 5.2 Deploy to Vercel
```bash
cd /home/ubuntu/authichain_premium

# Push to Git (Vercel will auto-deploy)
git add .
git commit -m "Add NOWPayments crypto payment integration"
git push origin main
```

---

## API Endpoints

### Create Crypto Payment
`POST /api/crypto/create-payment`

Request:
```json
{
  "amount": 100,
  "currency": "USD",
  "payCurrency": "BTC",
  "orderDescription": "NFT Purchase",
  "itemType": "nft",
  "itemId": "nft_123",
  "escrow": true
}
```

Response:
```json
{
  "success": true,
  "payment": {
    "paymentId": "12345",
    "payAddress": "bc1q...",
    "payAmount": 0.00234,
    "payCurrency": "BTC",
    "status": "waiting"
  }
}
```

### Get Payment Status
`GET /api/crypto/create-payment?paymentId=12345`

### IPN Webhook
`POST /api/crypto/ipn`
- Automatically called by NOWPayments
- Verifies HMAC signature
- Updates payment status
- Triggers notifications

---

## Payment Flow

1. **User selects crypto payment** → Frontend displays crypto options
2. **Creates payment** → API calls NOWPayments to generate address
3. **QR code displayed** → User scans or copies address
4. **User sends crypto** → Transaction broadcasts to blockchain
5. **IPN notification** → NOWPayments notifies our webhook
6. **Status updates** → Database and UI update in real-time
7. **Payment confirmed** → Escrow funded, user notified
8. **Item delivered** → Escrow released to seller

---

## Database Schema

### CryptoPayment Model
```prisma
model CryptoPayment {
  id                      String    @id @default(cuid())
  transactionId           String    @unique
  userId                  String
  nowpaymentsId           String?   @unique
  paymentId               String?
  orderId                 String?
  priceAmount             Float
  priceCurrency           String    @default("USD")
  payAmount               Float?
  payCurrency             String
  payAddress              String?
  actuallyPaid            Float?
  payinHash               String?   // Blockchain TX hash
  paymentStatus           String    @default("waiting")
  createdAt               DateTime  @default(now())
  confirmedAt             DateTime?
  completedAt             DateTime?
  transaction             Transaction @relation(...)
}
```

---

## Monitoring & Troubleshooting

### Check Payment Status
```bash
# Query database
npx prisma studio

# Check logs
vercel logs --follow
```

### Common Issues

**Issue**: Payment not detected
- **Solution**: Check IPN callback URL is correct
- **Solution**: Verify IPN secret matches
- **Solution**: Check firewall allows NOWPayments IPs

**Issue**: QR code not generating
- **Solution**: Ensure `qrcode` package is installed
- **Solution**: Check payment address is valid

**Issue**: Escrow not created
- **Solution**: Verify `itemType === 'nft'` in request
- **Solution**: Check database permissions

---

## Security Considerations

✅ **HMAC Signature Verification**: All IPN callbacks are verified
✅ **Escrow Protection**: NFT payments held until delivery
✅ **HTTPS Only**: All API calls use secure connections
✅ **API Key Protection**: Stored in environment variables
✅ **Rate Limiting**: Implement on production endpoints

---

## Support

### NOWPayments Support
- Email: partners@nowpayments.io
- Docs: https://nowpayments.io/help
- API: https://documenter.getpostman.com/view/7907941/2s93JusNJt

### AuthiChain Support
- Check logs: `vercel logs`
- Database: `npx prisma studio`
- API test: Use Postman or curl

---

## Testing Checklist

- [ ] Environment variables configured
- [ ] Database migration applied
- [ ] Sandbox mode tested
- [ ] BTC payment tested
- [ ] ETH payment tested
- [ ] USDC payment tested
- [ ] USDT payment tested
- [ ] IPN webhook receiving callbacks
- [ ] Escrow created for NFT purchases
- [ ] User notifications working
- [ ] QR codes generating correctly
- [ ] Payment status updating in real-time
- [ ] Production mode tested with small amounts

---

## Next Steps

1. Complete NOWPayments account verification
2. Run database migration
3. Test in sandbox mode
4. Deploy to production
5. Monitor first real transactions
6. Set up alerts for failed payments
7. Configure auto-conversion settings
8. Document user guides

---

**Integration Complete! 🎉**

Your AuthiChain platform now accepts cryptocurrency payments alongside Stripe, giving users maximum flexibility and reducing payment friction.
