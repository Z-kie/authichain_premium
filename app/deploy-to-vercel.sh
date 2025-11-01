#!/bin/bash

echo "╔═══════════════════════════════════════════════════╗"
echo "║   AuthiChain - Vercel Deployment Helper          ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo "❌ Error: .env file not found!"
  echo "Please create .env file with your environment variables."
  exit 1
fi

echo "✅ .env file found"
echo ""

# Create a deployment-ready env list
echo "📋 Creating environment variables list for Vercel..."
echo ""

# Read .env and create a formatted list (without exposing full values)
cat > .env.vercel-import << 'EOF'
# To import these to Vercel:
# 1. Visit: https://vercel.com/new
# 2. Import your git repository or drag & drop the project folder
# 3. Go to Project Settings → Environment Variables
# 4. Copy each variable from your local .env file

# Required for ALL environments (Production, Preview, Development):
EOF

# Extract variable names (not values for security)
echo "Creating import template..."
grep -E "^[A-Z_]+=" .env | cut -d '=' -f 1 | while read -r varname; do
  echo "# $varname" >> .env.vercel-import
done

echo ""
echo "✅ Created .env.vercel-import template"
echo ""

# Count variables
total_vars=$(grep -c "^[A-Z_]" .env)
echo "📊 Total environment variables: $total_vars"
echo ""

echo "🚀 Next Steps:"
echo ""
echo "1. Install Vercel CLI (if not already):"
echo "   npm install -g vercel"
echo ""
echo "2. Login to Vercel:"
echo "   npx vercel login"
echo ""
echo "3. Deploy to Vercel:"
echo "   npx vercel --prod"
echo ""
echo "4. During deployment, Vercel will ask:"
echo "   - Link to existing project? → No"
echo "   - Project name? → authichain"
echo "   - Directory? → ./"
echo ""
echo "5. After deployment, configure environment variables:"
echo "   A. Visit: https://vercel.com/dashboard"
echo "   B. Select your project → Settings → Environment Variables"
echo "   C. Copy all variables from your local .env file"
echo "   D. Mark them for: Production, Preview, Development"
echo ""
echo "6. Redeploy to apply environment variables:"
echo "   npx vercel --prod"
echo ""
echo "📖 For detailed instructions, see: VERCEL_DEPLOYMENT_GUIDE.md"
echo ""
echo "⚠️  IMPORTANT:"
echo "   - Use Stripe LIVE keys for production"
echo "   - Update NEXTAUTH_URL with your Vercel domain"
echo "   - Configure Stripe webhook: https://your-domain.vercel.app/api/webhooks/stripe"
echo ""
