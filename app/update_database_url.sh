#!/bin/bash

VERCEL_TOKEN="zROW9E8om1cxkkRIhCr8eZHv"
PROJECT_ID="prj_Ay86u6naeJjGkUZzWCwRvGfQR8N4"
TEAM_ID="team_BpNqnLfA9pXwyiIXeHmqAMxt"

# Enhanced DATABASE_URL with better connection pooling for serverless
NEW_DB_URL="postgresql://role_aa342a793:0gKvXpZw0D3PCtfeAyQSlofdMaWhH4pD@db-aa342a793.db001.hosteddb.reai.io:5432/aa342a793?connect_timeout=30&pool_timeout=30&connection_limit=10&sslmode=require"

echo "Updating DATABASE_URL with better connection pooling..."

# Get existing env var ID
ENV_ID=$(curl -s "https://api.vercel.com/v9/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}" \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" | \
    jq -r '.envs[] | select(.key == "DATABASE_URL") | .id' | head -1)

# Delete existing
if [ -n "$ENV_ID" ] && [ "$ENV_ID" != "null" ]; then
    curl -s -X DELETE \
        "https://api.vercel.com/v9/projects/${PROJECT_ID}/env/${ENV_ID}?teamId=${TEAM_ID}" \
        -H "Authorization: Bearer ${VERCEL_TOKEN}" > /dev/null
    echo "Deleted old DATABASE_URL"
fi

# Create new
curl -s -X POST \
    "https://api.vercel.com/v10/projects/${PROJECT_ID}/env?upsert=true&teamId=${TEAM_ID}" \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{
        \"key\": \"DATABASE_URL\",
        \"value\": \"${NEW_DB_URL}\",
        \"type\": \"encrypted\",
        \"target\": [\"production\", \"preview\", \"development\"]
    }" | jq '.'

echo "DATABASE_URL updated successfully"
