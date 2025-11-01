#!/bin/bash

echo "🚀 Deploying Prisma singleton fix to Vercel..."

# Set the Vercel token
export VERCEL_TOKEN="zROW9E8om1cxkkRIhCr8eZHv"

# Deploy to production
echo "📦 Building and deploying to production..."
npx vercel --prod --token $VERCEL_TOKEN --yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔍 This deployment fixes the database connection pool exhaustion issue:"
echo "   - Consolidated multiple Prisma client instances into one singleton"
echo "   - All imports now use the same connection pool"
echo "   - Should resolve signup/wallet auth timeout errors"
echo ""
echo "🧪 Next: Test the signup flow at www.authichain.com"
