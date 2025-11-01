# 🚀 AuthiChain Quick Reference

## Start the Application

### Method 1: Use the Startup Script (Easiest)
```bash
cd /home/ubuntu/authichain_premium
./start-server.sh
```

### Method 2: Manual Start
```bash
cd /home/ubuntu/authichain_premium/app
npm run dev
```

## Access Points

| Feature | URL |
|---------|-----|
| **Homepage** | http://localhost:3000 |
| **Marketplace** | http://localhost:3000/marketplace |
| **Admin Dashboard** | http://localhost:3000/admin |
| **User Dashboard** | http://localhost:3000/dashboard |
| **API Health** | http://localhost:3000/api/health |

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@authichain.com | Admin123! |
| **User** | user@authichain.com | User123! |

## Test Payment Cards

| Card | Number | Result |
|------|--------|--------|
| **Visa** | 4242 4242 4242 4242 | ✅ Success |
| **Decline** | 4000 0000 0000 0002 | ❌ Declined |

*Use any future expiry date and any 3-digit CVC*

## Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| **Pro** | $29/mo | Basic NFT features |
| **Brand** | $99/mo | Advanced features + analytics |
| **Enterprise** | $499/mo | Custom solutions |

## Common Commands

```bash
# Start server
cd /home/ubuntu/authichain_premium/app
npm run dev

# Stop server
# Press Ctrl+C or:
lsof -ti:3000 | xargs kill -9

# Rebuild
npm run build

# Check database
npx prisma studio

# View logs
tail -f ~/authichain_dev.log
```

## File Locations

- **Project Root**: `/home/ubuntu/authichain_premium/`
- **Application**: `/home/ubuntu/authichain_premium/app/`
- **Environment**: `/home/ubuntu/authichain_premium/app/.env`
- **Documentation**: `/home/ubuntu/authichain_premium/SETUP_GUIDE.md`

## Need Help?

1. Check **SETUP_COMPLETE.md** for detailed setup info
2. Check **SETUP_GUIDE.md** for comprehensive documentation
3. View server logs if issues occur

## Platform Status

✅ **Ready for Development**
- Database configured
- Stripe test mode active
- Admin & user accounts created
- All components rebranded to AuthiChain

---

**Quick Start**: Run `./start-server.sh` and visit http://localhost:3000
