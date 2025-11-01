#!/bin/bash

echo "=== VERCEL PRISMA FIX DEPLOYMENT ==="
echo "Timestamp: $(date)"
echo "Target: www.authichain.com"
echo ""

export VERCEL_TOKEN="zROW9E8om1cxkkRIhCr8eZHv"
export VERCEL_PROJECT_ID="prj_NTQNtBhbdPObvTOdU4wUuw39CvTn"
export VERCEL_ORG_ID="team_s44QTb8ot1LbCqmMmRZ5dPXE"

echo "Deploying to Vercel production..."
npx vercel --token "$VERCEL_TOKEN" \
  --scope realityengines \
  --prod \
  --yes

echo ""
echo "=== DEPLOYMENT COMPLETE ==="
echo "Timestamp: $(date)"
