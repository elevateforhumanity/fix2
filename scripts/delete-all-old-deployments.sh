#!/usr/bin/env bash
set -euo pipefail

echo "🗑️  DELETE ALL Old Deployments (Keep Latest Only)"
echo "=================================================="
echo ""
echo "⚠️  WARNING: This will delete ALL deployments except the latest one!"
echo ""

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Set it with: export VERCEL_TOKEN='your-token'"
  exit 1
fi

PROJECT_NAME="fix2-gpql"

echo "Project: $PROJECT_NAME"
echo ""
read -p "Type 'DELETE ALL' to confirm: " confirm

if [ "$confirm" != "DELETE ALL" ]; then
  echo "❌ Cancelled"
  exit 1
fi

echo ""
echo "🔍 Fetching all deployments..."

# Use Vercel API to get deployments
TEAM_ID="team_Ae8f33vVYR36quLOS8HCeROs"
PROJECT_ID="prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA"

# Get deployments via API
RESPONSE=$(curl -s "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID&teamId=$TEAM_ID&limit=100" \
  -H "Authorization: Bearer $VERCEL_TOKEN")

# Extract deployment IDs (skip the first one - that's the latest)
DEPLOYMENT_IDS=$(echo "$RESPONSE" | grep -o '"uid":"[^"]*"' | cut -d'"' -f4 | tail -n +2)

if [ -z "$DEPLOYMENT_IDS" ]; then
  echo "✅ No old deployments to delete"
  exit 0
fi

TOTAL=$(echo "$DEPLOYMENT_IDS" | wc -l | xargs)
echo "Found $TOTAL old deployments to delete"
echo ""

COUNTER=0
echo "$DEPLOYMENT_IDS" | while read -r deployment_id; do
  COUNTER=$((COUNTER + 1))
  echo "[$COUNTER/$TOTAL] Deleting deployment: $deployment_id"
  
  curl -s -X DELETE \
    "https://api.vercel.com/v13/deployments/$deployment_id?teamId=$TEAM_ID" \
    -H "Authorization: Bearer $VERCEL_TOKEN" > /dev/null
  
  echo "  ✅ Deleted"
done

echo ""
echo "✅ All old deployments deleted!"
echo "✅ Kept: Latest deployment only"
echo ""
echo "Verify at: https://vercel.com/elevate-48e460c9/$PROJECT_NAME/deployments"
