#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get worker URL
if [ -f "../deployed_url.txt" ]; then
    WORKER_URL=$(cat ../deployed_url.txt)
else
    echo -e "${YELLOW}Worker URL not found. Please provide it:${NC}"
    read -p "Worker URL: " WORKER_URL
fi

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}AuthiChain Workers Endpoint Tests${NC}"
echo -e "${BLUE}Testing: $WORKER_URL${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    
    echo -n "Testing $description... "
    
    if [ -n "$data" ]; then
        RESPONSE=$(curl -s -w "\n%{http_code}" -X $method \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$WORKER_URL$endpoint")
    else
        RESPONSE=$(curl -s -w "\n%{http_code}" -X $method "$WORKER_URL$endpoint")
    fi
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | head -n-1)
    
    if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $HTTP_CODE)"
        PASSED=$((PASSED + 1))
        
        # Show response for important endpoints
        if [[ "$endpoint" == "/health" ]] || [[ "$endpoint" == "/analytics" ]]; then
            echo "  Response: $BODY" | head -c 200
            echo ""
        fi
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $HTTP_CODE)"
        echo "  Response: $BODY"
        FAILED=$((FAILED + 1))
    fi
}

# Health Check
echo -e "${YELLOW}Basic Health Checks:${NC}"
test_endpoint "GET" "/health" "Health check"
test_endpoint "GET" "/" "Root endpoint"
echo ""

# Analytics
echo -e "${YELLOW}Analytics Endpoints:${NC}"
test_endpoint "GET" "/analytics" "Get analytics"
echo ""

# Manufacturers
echo -e "${YELLOW}Manufacturer Endpoints:${NC}"
test_endpoint "GET" "/manufacturers" "List manufacturers"
test_endpoint "POST" "/manufacturers" "Create manufacturer" \
    '{"company_name":"Test Company","contact_email":"test@example.com","tier":"free"}'

# Get the created manufacturer ID (if successful)
MFR_ID=$(curl -s -X GET "$WORKER_URL/manufacturers" | grep -oP '"id":"[^"]+' | head -1 | cut -d'"' -f4)

if [ -n "$MFR_ID" ]; then
    test_endpoint "GET" "/manufacturers/$MFR_ID" "Get specific manufacturer"
    test_endpoint "PUT" "/manufacturers/$MFR_ID" "Update manufacturer tier" \
        '{"tier":"premium"}'
fi
echo ""

# Deals
echo -e "${YELLOW}Deal Endpoints:${NC}"
test_endpoint "GET" "/deals" "List deals"

if [ -n "$MFR_ID" ]; then
    test_endpoint "POST" "/deals" "Create deal" \
        "{\"manufacturer_id\":\"$MFR_ID\",\"deal_name\":\"Test Deal\",\"deal_value\":10000,\"stage\":\"negotiation\",\"owner_email\":\"sales@authichain.com\"}"
    
    test_endpoint "GET" "/deals?manufacturer_id=$MFR_ID" "Get manufacturer deals"
    
    # Get the created deal ID
    DEAL_ID=$(curl -s -X GET "$WORKER_URL/deals?manufacturer_id=$MFR_ID" | grep -oP '"id":"[^"]+' | head -1 | cut -d'"' -f4)
    
    if [ -n "$DEAL_ID" ]; then
        test_endpoint "PUT" "/deals/$DEAL_ID" "Update deal stage" \
            '{"stage":"closed_won"}'
    fi
fi
echo ""

# Subscriptions
echo -e "${YELLOW}Subscription Endpoints:${NC}"
test_endpoint "GET" "/subscriptions" "List subscriptions"

if [ -n "$MFR_ID" ]; then
    test_endpoint "POST" "/subscriptions" "Create subscription" \
        "{\"manufacturer_id\":\"$MFR_ID\",\"plan_name\":\"Premium\",\"amount\":99.99,\"status\":\"active\"}"
    
    test_endpoint "GET" "/subscriptions?manufacturer_id=$MFR_ID" "Get manufacturer subscriptions"
    
    # Get the created subscription ID
    SUB_ID=$(curl -s -X GET "$WORKER_URL/subscriptions?manufacturer_id=$MFR_ID" | grep -oP '"id":"[^"]+' | head -1 | cut -d'"' -f4)
    
    if [ -n "$SUB_ID" ]; then
        test_endpoint "PUT" "/subscriptions/$SUB_ID" "Update subscription status" \
            '{"status":"cancelled"}'
    fi
fi
echo ""

# NFTs
echo -e "${YELLOW}NFT Endpoints:${NC}"
test_endpoint "GET" "/nfts" "List NFT mints"
test_endpoint "GET" "/nfts?limit=10" "List NFT mints with limit"
test_endpoint "POST" "/nfts" "Record NFT mint" \
    '{"token_id":"1001","to_address":"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb","tx_hash":"0x1234567890abcdef","block_number":12345678,"timestamp":1698765432}'
echo ""

# Rate Limiting Test
echo -e "${YELLOW}Rate Limiting:${NC}"
echo -n "Testing rate limit (making multiple rapid requests)... "
RATE_LIMIT_TRIGGERED=false
for i in {1..5}; do
    HTTP_CODE=$(curl -s -w "%{http_code}" -X POST \
        -H "Content-Type: application/json" \
        -d '{"company_name":"Rate Test '$i'","contact_email":"ratetest'$i'@example.com"}' \
        "$WORKER_URL/manufacturers" | tail -c 3)
    
    if [ "$HTTP_CODE" = "429" ]; then
        RATE_LIMIT_TRIGGERED=true
        break
    fi
    sleep 0.1
done

if [ "$RATE_LIMIT_TRIGGERED" = true ]; then
    echo -e "${GREEN}✓ PASS${NC} (Rate limiting works)"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}~ SKIP${NC} (Rate limit not triggered in test)"
fi
echo ""

# CORS Test
echo -e "${YELLOW}CORS:${NC}"
echo -n "Testing CORS preflight... "
HTTP_CODE=$(curl -s -w "%{http_code}" -X OPTIONS \
    -H "Origin: https://example.com" \
    -H "Access-Control-Request-Method: POST" \
    "$WORKER_URL/manufacturers" | tail -c 3)

if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
    echo -e "${GREEN}✓ PASS${NC} (HTTP $HTTP_CODE)"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $HTTP_CODE)"
    FAILED=$((FAILED + 1))
fi
echo ""

# Summary
echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Test Results Summary${NC}"
echo -e "${BLUE}================================${NC}"
echo -e "${GREEN}Passed: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Failed: $FAILED${NC}"
else
    echo -e "${GREEN}Failed: 0${NC}"
fi
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Please review the results above.${NC}"
    exit 1
fi
