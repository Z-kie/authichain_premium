#!/bin/bash

# AuthiChain Development Server Startup Script

echo "🚀 Starting AuthiChain Development Server..."
echo ""

cd /home/ubuntu/authichain_premium/app

# Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use!"
    echo "   Stopping existing process..."
    lsof -ti:3000 | xargs kill -9
    sleep 2
fi

echo "✓ Port 3000 is available"
echo ""
echo "Starting Next.js development server..."
echo "Press Ctrl+C to stop the server"
echo ""
echo "═══════════════════════════════════════"
echo "  Access AuthiChain at:"
echo "  http://localhost:3000"
echo "═══════════════════════════════════════"
echo ""

# Start the development server
npm run dev
