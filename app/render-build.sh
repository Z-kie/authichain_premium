#!/bin/bash
# Render build script - copies secret .env file to app root before building

echo "=== Render Build Script ==="

# Copy secret file from /etc/secrets/.env to app root if it exists
if [ -f /etc/secrets/.env ]; then
  echo "Found /etc/secrets/.env - copying to app root..."
  cp /etc/secrets/.env .env
  echo "Secret .env file copied successfully"
else
  echo "No /etc/secrets/.env found - using Render environment variables"
fi

# Run the standard build
echo "Running npm install..."
npm install

echo "Running prisma generate..."
npx prisma generate

echo "Running next build..."
npm run build

echo "=== Build Complete ==="
