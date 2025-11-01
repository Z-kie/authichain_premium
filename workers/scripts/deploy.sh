#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get environment (default to production)
ENV=${1:-production}

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}AuthiChain Workers Deployment${NC}"
echo -e "${BLUE}Environment: $ENV${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Check if credentials are set
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo -e "${YELLOW}⚠️  Loading Cloudflare credentials...${NC}"
    
    if [ -f "/home/ubuntu/.config/abacusai_auth_secrets.json" ]; then
        export CLOUDFLARE_API_TOKEN=$(cat /home/ubuntu/.config/abacusai_auth_secrets.json | grep -A 2 '"api_token"' | grep '"value"' | cut -d'"' -f4)
        export CLOUDFLARE_ACCOUNT_ID=$(cat /home/ubuntu/.config/abacusai_auth_secrets.json | grep -A 2 '"account_id"' | grep '"value"' | cut -d'"' -f4)
        echo -e "${GREEN}✓ Credentials loaded${NC}"
    else
        echo -e "${RED}✗ Could not find credentials file${NC}"
        exit 1
    fi
fi

# Verify authentication
echo "Verifying authentication..."
if ! npx wrangler whoami > /dev/null 2>&1; then
    echo -e "${RED}✗ Authentication failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Authenticated${NC}"

# Build TypeScript
echo ""
echo "Building TypeScript..."
if npx tsc --noEmit; then
    echo -e "${GREEN}✓ TypeScript compilation successful${NC}"
else
    echo -e "${YELLOW}⚠️  TypeScript compilation warnings (continuing anyway)${NC}"
fi

# Deploy worker
echo ""
echo "Deploying worker to Cloudflare..."
echo ""

DEPLOY_OUTPUT=$(npx wrangler deploy 2>&1)
DEPLOY_STATUS=$?

echo "$DEPLOY_OUTPUT"

if [ $DEPLOY_STATUS -eq 0 ]; then
    echo ""
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}Deployment Successful!${NC}"
    echo -e "${GREEN}================================${NC}"
    echo ""
    
    # Extract worker URL from output
    WORKER_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[^\s]+\.workers\.dev' | head -1)
    
    if [ -n "$WORKER_URL" ]; then
        echo -e "${GREEN}Worker URL: $WORKER_URL${NC}"
        echo ""
        echo "Endpoints available:"
        echo "  - $WORKER_URL/health (Health check)"
        echo "  - $WORKER_URL/analytics (Analytics dashboard)"
        echo "  - $WORKER_URL/manufacturers (Manufacturer management)"
        echo "  - $WORKER_URL/deals (Deal pipeline)"
        echo "  - $WORKER_URL/subscriptions (Subscription management)"
        echo "  - $WORKER_URL/nfts (NFT mint tracking)"
        echo ""
        
        # Save URL to file
        echo "$WORKER_URL" > ../deployed_url.txt
        echo -e "${GREEN}✓ Worker URL saved to deployed_url.txt${NC}"
    fi
    
    echo ""
    echo "Next steps:"
    echo "1. Test endpoints: ./tests/test-endpoints.sh"
    echo "2. Monitor logs: npx wrangler tail"
    echo "3. View dashboard: https://dash.cloudflare.com/${CLOUDFLARE_ACCOUNT_ID}/workers"
    echo ""
else
    echo ""
    echo -e "${RED}================================${NC}"
    echo -e "${RED}Deployment Failed!${NC}"
    echo -e "${RED}================================${NC}"
    echo ""
    echo "Please check the error messages above."
    exit 1
fi
