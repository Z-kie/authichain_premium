#!/bin/bash

# Critical environment variables for production
REQUIRED_VARS=(
  "DATABASE_URL"
  "NEXTAUTH_URL"
  "NEXTAUTH_SECRET"
  "STRIPE_SECRET_KEY"
  "STRIPE_PUBLISHABLE_KEY"
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  "NFT_STORAGE_API_KEY"
  "NEXT_PUBLIC_ALCHEMY_API_KEY"
  "NEXT_PUBLIC_NETWORK"
)

missing=0
echo "🔍 Checking critical environment variables..."
for var in "${REQUIRED_VARS[@]}"; do
  if grep -q "^${var}=" .env 2>/dev/null && ! grep -q "^${var}=$" .env 2>/dev/null; then
    echo "✅ $var"
  else
    echo "❌ $var - MISSING OR EMPTY"
    ((missing++))
  fi
done

if [ $missing -eq 0 ]; then
  echo ""
  echo "✅ All critical variables configured!"
  exit 0
else
  echo ""
  echo "⚠️  $missing critical variables missing or empty"
  exit 1
fi
