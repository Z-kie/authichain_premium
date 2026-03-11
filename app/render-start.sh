#!/bin/bash
# Render start script - load env vars from secret file before starting Next.js

echo "=== RENDER START SCRIPT ==="

# Load env vars from Render Secret Files
if [ -f /etc/secrets/.env ]; then
  echo "Loading env vars from /etc/secrets/.env ..."
  set -a
  source /etc/secrets/.env
  set +a
  echo "Env vars loaded successfully"
elif [ -f .env ]; then
  echo "Loading env vars from .env ..."
  set -a
  source .env
  set +a
  echo "Env vars loaded from .env"
else
  echo "WARNING: No .env file found!"
fi

# Verify critical env vars are set
echo "NEXTAUTH_SECRET is set: $([ -n \"$NEXTAUTH_SECRET\" ] && echo 'YES' || echo 'NO')"
echo "DATABASE_URL is set: $([ -n \"$DATABASE_URL\" ] && echo 'YES' || echo 'NO')"
echo "STRIPE_SECRET_KEY is set: $([ -n \"$STRIPE_SECRET_KEY\" ] && echo 'YES' || echo 'NO')"

# Start Next.js
echo "Starting Next.js..."
exec npx next start
