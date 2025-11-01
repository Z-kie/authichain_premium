#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}AuthiChain Workers Setup${NC}"
echo -e "${GREEN}================================${NC}"
echo ""

# Check if credentials are set
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo -e "${YELLOW}⚠️  Cloudflare credentials not found in environment${NC}"
    echo "Setting credentials from auth secrets file..."
    
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
echo ""
echo "Verifying Cloudflare authentication..."
if npx wrangler whoami > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Authentication successful${NC}"
else
    echo -e "${RED}✗ Authentication failed${NC}"
    exit 1
fi

# Check D1 permissions
echo ""
echo "Checking D1 database permissions..."
if npx wrangler d1 list > /dev/null 2>&1; then
    echo -e "${GREEN}✓ D1 permissions verified${NC}"
    
    # Try to create database if it doesn't exist
    echo ""
    echo "Setting up D1 database..."
    DB_EXISTS=$(npx wrangler d1 list 2>/dev/null | grep -c "authichain-db" || echo "0")
    
    if [ "$DB_EXISTS" -eq "0" ]; then
        echo "Creating new D1 database..."
        CREATE_OUTPUT=$(npx wrangler d1 create authichain-db 2>&1)
        DB_ID=$(echo "$CREATE_OUTPUT" | grep "database_id" | cut -d'"' -f4)
        
        if [ -n "$DB_ID" ]; then
            echo -e "${GREEN}✓ Database created: $DB_ID${NC}"
            
            # Update wrangler.toml with database ID
            sed -i "s/database_id = \"TO_BE_SET_AFTER_CREATION\"/database_id = \"$DB_ID\"/" ../wrangler.toml
            echo -e "${GREEN}✓ wrangler.toml updated with database ID${NC}"
            
            # Apply schema
            echo ""
            echo "Applying database schema..."
            if npx wrangler d1 execute authichain-db --file=../schema.sql; then
                echo -e "${GREEN}✓ Schema applied successfully${NC}"
            else
                echo -e "${YELLOW}⚠️  Could not apply schema automatically${NC}"
                echo "Please run manually: npx wrangler d1 execute authichain-db --file=schema.sql"
            fi
        else
            echo -e "${RED}✗ Failed to create database${NC}"
        fi
    else
        echo -e "${GREEN}✓ Database already exists${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  D1 permissions not available${NC}"
    echo ""
    echo "To enable D1 database functionality:"
    echo "1. Go to: https://dash.cloudflare.com/${CLOUDFLARE_ACCOUNT_ID}/api-tokens"
    echo "2. Edit your API token"
    echo "3. Add permissions: Account > D1 > Edit"
    echo "4. Re-run this setup script"
    echo ""
    echo "For now, the worker will deploy without database functionality."
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
if npm install; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Next steps:"
echo "1. Review wrangler.toml configuration"
echo "2. Run: ./scripts/deploy.sh production"
echo "3. Run: ./tests/test-endpoints.sh to verify deployment"
echo ""
