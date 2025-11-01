#!/bin/bash
set -e

VERCEL_TOKEN="KjNh6SOwo9YkLtdOHbpdxkNT"
PROJECT_ID="prj_NTQNtBhbdPObvTOdU4wUuw39CvTn"

echo "=================================================="
echo "  DEPLOYING SIGNUP FIX TO VERCEL PRODUCTION"
echo "=================================================="
echo ""
echo "Fix: Prisma binary target changed to rhel-openssl-3.0.x"
echo ""

# Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo "ERROR: Not in app directory"
    exit 1
fi

# Verify Prisma schema has the fix
echo "Step 1: Verifying Prisma schema fix..."
if grep -q "rhel-openssl-3.0.x" prisma/schema.prisma; then
    echo "✓ Prisma schema has correct binary target"
else
    echo "✗ ERROR: Prisma schema does not have rhel-openssl-3.0.x target"
    exit 1
fi

# Regenerate Prisma client
echo ""
echo "Step 2: Regenerating Prisma client with correct binary target..."
npx prisma generate
echo "✓ Prisma client regenerated"

# Deploy to Vercel
echo ""
echo "Step 3: Deploying to Vercel production..."
export VERCEL_TOKEN="$VERCEL_TOKEN"
export VERCEL_PROJECT_ID="$PROJECT_ID"
export VERCEL_ORG_ID="team_pRaF8RJF8gV4iLu7QfhqjD1h"

# Deploy with production flag
npx vercel --token "$VERCEL_TOKEN" --prod --yes 2>&1 | tee /home/ubuntu/vercel_signup_fix_deployment.log

echo ""
echo "=================================================="
echo "  DEPLOYMENT COMPLETE!"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Wait 30 seconds for deployment to propagate"
echo "2. Test signup at: https://www.authichain.com/auth/signup"
echo "3. Verify API endpoint: https://www.authichain.com/api/auth/signup"
echo ""

