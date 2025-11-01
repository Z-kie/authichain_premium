#!/bin/bash

echo "==================================="
echo "Environment Variables Validation"
echo "==================================="
echo ""

# Required variables
REQUIRED_VARS=(
  "DATABASE_URL"
  "NEXTAUTH_SECRET"
  "NEXTAUTH_URL"
  "STRIPE_SECRET_KEY"
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  "STRIPE_WEBHOOK_SECRET"
  "NFT_STORAGE_API_KEY"
  "PRIVATE_KEY"
  "POLYGON_AMOY_RPC_URL"
  "CONTRACT_ADDRESS"
)

# Optional but recommended variables
OPTIONAL_VARS=(
  "POLYGONSCAN_API_KEY"
  "CLOUDFLARE_API_TOKEN"
  "CLOUDFLARE_ACCOUNT_ID"
  "R2_API_TOKEN"
  "R2_ACCESS_KEY_ID"
  "R2_SECRET_ACCESS_KEY"
  "R2_ENDPOINT"
)

# Stripe price IDs
STRIPE_PRICE_VARS=(
  "STRIPE_CREATOR_MONTHLY_PRICE_ID"
  "STRIPE_PRO_MONTHLY_PRICE_ID"
)

source .env 2>/dev/null

echo "✅ REQUIRED VARIABLES:"
for var in "${REQUIRED_VARS[@]}"; do
  if [ -n "${!var}" ]; then
    echo "  ✓ $var: SET"
  else
    echo "  ✗ $var: MISSING"
  fi
done

echo ""
echo "📦 OPTIONAL VARIABLES:"
for var in "${OPTIONAL_VARS[@]}"; do
  if [ -n "${!var}" ]; then
    echo "  ✓ $var: SET"
  else
    echo "  ○ $var: NOT SET"
  fi
done

echo ""
echo "💳 STRIPE PRICE IDs:"
for var in "${STRIPE_PRICE_VARS[@]}"; do
  if [ -n "${!var}" ] && [ "${!var}" != "price_xxxxxxxxxxxxx" ]; then
    echo "  ✓ $var: SET"
  else
    echo "  ⚠ $var: PLACEHOLDER (needs actual Stripe price ID)"
  fi
done

echo ""
echo "==================================="
