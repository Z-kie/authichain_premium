
#!/bin/bash

##############################################################################
# AuthiChain Smart Contract Deployment Script
# Deploys SubscriptionManager.sol and BillingContract.sol to Polygon
##############################################################################

set -e

echo "🚀 AuthiChain Smart Contract Deployment"
echo "========================================"
echo ""

# Check if Hardhat is installed
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npm/npx not found. Please install Node.js and npm."
    exit 1
fi

# Check if .env file exists
if [ ! -f "../.env" ]; then
    echo "❌ Error: .env file not found"
    exit 1
fi

# Load environment variables
source ../.env

# Check required environment variables
if [ -z "$POLYGON_RPC_URL" ]; then
    echo "❌ Error: POLYGON_RPC_URL not set in .env"
    exit 1
fi

if [ -z "$DEPLOYER_PRIVATE_KEY" ]; then
    echo "❌ Error: DEPLOYER_PRIVATE_KEY not set in .env"
    exit 1
fi

echo "📋 Pre-deployment Checklist:"
echo "  ✓ Hardhat installed"
echo "  ✓ .env file present"
echo "  ✓ RPC URL configured"
echo "  ✓ Private key configured"
echo ""

# Ask for confirmation
read -p "Deploy to Polygon Mainnet? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo "🔨 Compiling contracts..."
cd ..
npx hardhat compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed"
    exit 1
fi

echo "✅ Contracts compiled successfully"
echo ""

echo "📤 Deploying SubscriptionManager contract..."
npx hardhat run scripts/deploy-subscription-manager.js --network polygon

if [ $? -ne 0 ]; then
    echo "❌ SubscriptionManager deployment failed"
    exit 1
fi

echo "✅ SubscriptionManager deployed"
echo ""

echo "📤 Deploying BillingContract..."
npx hardhat run scripts/deploy-billing-contract.js --network polygon

if [ $? -ne 0 ]; then
    echo "❌ BillingContract deployment failed"
    exit 1
fi

echo "✅ BillingContract deployed"
echo ""

echo "🎉 Deployment Complete!"
echo ""
echo "Next steps:"
echo "1. Copy the contract addresses from above"
echo "2. Update .env with:"
echo "   - SUBSCRIPTION_MANAGER_ADDRESS"
echo "   - BILLING_CONTRACT_ADDRESS"
echo "3. Verify contracts on PolygonScan"
echo "4. Test contract interactions"
echo ""
echo "📚 Documentation: https://docs.authichain.com/smart-contracts"
