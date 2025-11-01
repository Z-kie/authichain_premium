#!/bin/bash

echo "╔════════════════════════════════════════════════════════╗"
echo "║  AuthiChain - Environment Variables for Vercel        ║"
echo "║  SECURE - Values will be displayed                    ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "⚠️  WARNING: This will display sensitive values!"
echo "Make sure no one is looking at your screen."
echo ""
read -p "Continue? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "📋 Copy these to Vercel Dashboard → Settings → Environment Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Read and display each variable
grep -E "^[A-Z_]+=" .env | while IFS= read -r line; do
    var_name=$(echo "$line" | cut -d '=' -f 1)
    var_value=$(echo "$line" | cut -d '=' -f 2- | sed 's/^"//' | sed 's/"$//')
    
    # Skip comments
    if [[ $var_name =~ ^# ]]; then
        continue
    fi
    
    echo "Variable: $var_name"
    echo "Value: $var_value"
    echo "Environments: ✅ Production ✅ Preview ✅ Development"
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Complete! Add these to Vercel one by one."
echo ""
echo "🔐 IMPORTANT REMINDERS:"
echo "1. Update NEXTAUTH_URL to: https://your-project.vercel.app"
echo "2. Use Stripe LIVE keys (sk_live_* and pk_live_*) for production"
echo "3. After adding all variables, redeploy your project"
echo ""

