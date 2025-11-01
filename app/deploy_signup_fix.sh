#!/bin/bash

set -e

echo "🔧 AuthiChain Database & Signup Fix Deployment"
echo "=============================================="
echo ""

VERCEL_TOKEN="zROW9E8om1cxkkRIhCr8eZHv"
PROJECT_ID="prj_Ay86u6naeJjGkUZzWCwRvGfQR8N4"
TEAM_ID="team_BpNqnLfA9pXwyiIXeHmqAMxt"

cd /home/ubuntu/authichain_premium/app

# Step 1: Regenerate Prisma Client
echo "📦 Step 1: Regenerating Prisma Client..."
npx prisma generate
echo "✅ Prisma Client regenerated"
echo ""

# Step 2: Test local database connection
echo "🔍 Step 2: Testing database connection..."
node test_db_connection.js
if [ $? -eq 0 ]; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed"
    exit 1
fi
echo ""

# Step 3: Update critical environment variables on Vercel
echo "🌐 Step 3: Updating Vercel environment variables..."

# Function to update environment variable
update_vercel_env() {
    local key="$1"
    local value="$2"
    local env_id
    
    echo "  Updating $key..."
    
    # Get existing env var ID
    env_id=$(curl -s "https://api.vercel.com/v9/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}" \
        -H "Authorization: Bearer ${VERCEL_TOKEN}" | \
        jq -r ".envs[] | select(.key == \"${key}\") | .id" | head -1)
    
    # Delete if exists
    if [ -n "$env_id" ] && [ "$env_id" != "null" ]; then
        curl -s -X DELETE \
            "https://api.vercel.com/v9/projects/${PROJECT_ID}/env/${env_id}?teamId=${TEAM_ID}" \
            -H "Authorization: Bearer ${VERCEL_TOKEN}" > /dev/null
    fi
    
    # Create new
    curl -s -X POST \
        "https://api.vercel.com/v10/projects/${PROJECT_ID}/env?upsert=true&teamId=${TEAM_ID}" \
        -H "Authorization: Bearer ${VERCEL_TOKEN}" \
        -H "Content-Type: application/json" \
        -d "{
            \"key\": \"${key}\",
            \"value\": \"${value}\",
            \"type\": \"encrypted\",
            \"target\": [\"production\", \"preview\", \"development\"]
        }" > /dev/null
    
    echo "  ✓ $key updated"
}

# Update critical variables (without trailing newlines)
update_vercel_env "DATABASE_URL" "postgresql://role_aa342a793:0gKvXpZw0D3PCtfeAyQSlofdMaWhH4pD@db-aa342a793.db001.hosteddb.reai.io:5432/aa342a793?connect_timeout=15"
update_vercel_env "NEXTAUTH_URL" "https://www.authichain.com"
update_vercel_env "NEXT_PUBLIC_SITE_URL" "https://www.authichain.com"
update_vercel_env "NEXTAUTH_SECRET" "Xgr31Vx0NFPURcHRkBa+7IwCxh88nQMdjwHmHNAIwlQ="

echo "✅ Environment variables updated"
echo ""

# Step 4: Deploy to Vercel
echo "🚀 Step 4: Deploying to Vercel..."
npx vercel --prod --token="${VERCEL_TOKEN}" --yes
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful"
else
    echo "❌ Deployment failed"
    exit 1
fi
echo ""

echo "🎉 Deployment Complete!"
echo ""
echo "Next steps:"
echo "1. Wait 2-3 minutes for deployment to complete"
echo "2. Test signup at: https://www.authichain.com/signup"
echo "3. Check logs at: https://vercel.com/authichain/app"
