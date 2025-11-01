#!/bin/bash

# AuthiChain Vercel Deployment Script
# Last Updated: 2025-10-19

set -e

echo "🚀 AuthiChain - Vercel Deployment Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI is not installed${NC}"
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
else
    echo -e "${GREEN}✅ Vercel CLI is installed${NC}"
fi

# Check if user is logged in
echo ""
echo -e "${BLUE}Checking Vercel authentication...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel${NC}"
    echo -e "${BLUE}Please log in to Vercel:${NC}"
    vercel login
else
    echo -e "${GREEN}✅ Authenticated with Vercel${NC}"
    vercel whoami
fi

# Check if .env file exists
echo ""
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    echo -e "${YELLOW}Please create .env file with all required variables${NC}"
    echo -e "${BLUE}See VERCEL_ENV_MIGRATION_GUIDE.md for details${NC}"
    exit 1
else
    echo -e "${GREEN}✅ .env file found${NC}"
fi

# Check if node_modules exists
echo ""
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found, installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi

# Test production build
echo ""
echo -e "${BLUE}Testing production build...${NC}"
if npm run build &> /tmp/build.log; then
    echo -e "${GREEN}✅ Production build successful${NC}"
else
    echo -e "${RED}❌ Production build failed${NC}"
    echo -e "${YELLOW}Check /tmp/build.log for details${NC}"
    tail -n 20 /tmp/build.log
    exit 1
fi

# Display deployment options
echo ""
echo -e "${BLUE}=========================================="
echo -e "  Deployment Options"
echo -e "==========================================${NC}"
echo ""
echo "1. Deploy to Production (recommended)"
echo "2. Deploy to Preview (testing)"
echo "3. Add Environment Variables"
echo "4. Check Deployment Status"
echo "5. Exit"
echo ""

read -p "Select option (1-5): " option

case $option in
    1)
        echo ""
        echo -e "${BLUE}🚀 Deploying to Production...${NC}"
        echo ""
        echo -e "${YELLOW}⚠️  IMPORTANT: Make sure all environment variables are added to Vercel!${NC}"
        echo -e "${YELLOW}   See VERCEL_ENV_MIGRATION_GUIDE.md for the complete list.${NC}"
        echo ""
        read -p "Have you added all 34 environment variables to Vercel? (y/n): " confirm
        
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            echo ""
            echo -e "${BLUE}Deploying to production...${NC}"
            vercel --prod
            
            echo ""
            echo -e "${GREEN}=========================================="
            echo -e "  Deployment Complete! 🎉"
            echo -e "==========================================${NC}"
            echo ""
            echo -e "${YELLOW}Next Steps:${NC}"
            echo "1. Note your deployment URL"
            echo "2. Update NEXTAUTH_URL with deployment URL"
            echo "3. Update NEXT_PUBLIC_SITE_URL with deployment URL"
            echo "4. Configure Stripe webhooks"
            echo "5. Test all features"
            echo ""
            echo -e "${BLUE}See VERCEL_DEPLOYMENT_GUIDE.md for post-deployment steps${NC}"
        else
            echo ""
            echo -e "${RED}Deployment cancelled${NC}"
            echo -e "${BLUE}Add environment variables first using option 3${NC}"
        fi
        ;;
    
    2)
        echo ""
        echo -e "${BLUE}🚀 Deploying to Preview...${NC}"
        vercel
        
        echo ""
        echo -e "${GREEN}Preview deployment complete!${NC}"
        echo -e "${YELLOW}This is a preview deployment for testing${NC}"
        ;;
    
    3)
        echo ""
        echo -e "${BLUE}Adding Environment Variables${NC}"
        echo -e "${YELLOW}See VERCEL_ENV_MIGRATION_GUIDE.md for the complete list${NC}"
        echo ""
        echo "Choose method:"
        echo "1. Interactive (add one by one)"
        echo "2. Back to main menu"
        echo ""
        read -p "Select option (1-2): " env_option
        
        if [ "$env_option" = "1" ]; then
            echo ""
            echo -e "${BLUE}Adding environment variables interactively...${NC}"
            echo -e "${YELLOW}Press Ctrl+C to stop at any time${NC}"
            echo ""
            
            # List of critical variables
            CRITICAL_VARS=(
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
            
            echo -e "${YELLOW}Adding critical variables first...${NC}"
            for var in "${CRITICAL_VARS[@]}"; do
                echo ""
                echo -e "${BLUE}Adding $var...${NC}"
                vercel env add "$var" production
            done
            
            echo ""
            echo -e "${GREEN}Critical variables added!${NC}"
            echo -e "${YELLOW}Add remaining 24 variables via Vercel Dashboard or continue with CLI${NC}"
        fi
        ;;
    
    4)
        echo ""
        echo -e "${BLUE}Checking deployment status...${NC}"
        vercel ls
        ;;
    
    5)
        echo ""
        echo -e "${BLUE}Exiting...${NC}"
        exit 0
        ;;
    
    *)
        echo ""
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Script complete!${NC}"
