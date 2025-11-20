#!/usr/bin/env bash
set -euo pipefail

echo "🗑️  Cleanup Old Vercel Deployments"
echo "===================================="
echo ""

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Set it with: export VERCEL_TOKEN='your-token'"
  exit 1
fi

PROJECT_NAME="fix2-gpql"

echo "📋 Fetching deployments for project: $PROJECT_NAME"
echo ""

# Get all deployments (returns JSON)
DEPLOYMENTS=$(npx vercel ls --token=$VERCEL_TOKEN 2>&1 | grep -E "https://" | awk '{print $2}' | grep "$PROJECT_NAME" || true)

if [ -z "$DEPLOYMENTS" ]; then
  echo "✅ No deployments found or already cleaned up"
  exit 0
fi

# Count deployments
TOTAL=$(echo "$DEPLOYMENTS" | wc -l | xargs)
echo "Found $TOTAL deployments"
echo ""

# Keep the latest 3, delete the rest
KEEP=3
DELETE=$((TOTAL - KEEP))

if [ $DELETE -le 0 ]; then
  echo "✅ Only $TOTAL deployments exist. Keeping all (minimum $KEEP)."
  exit 0
fi

echo "📊 Deployment cleanup plan:"
echo "  Total deployments: $TOTAL"
echo "  Keep latest: $KEEP"
echo "  Delete old: $DELETE"
echo ""

read -p "Continue? (y/N): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
  echo "❌ Cancelled"
  exit 1
fi

echo ""
echo "🗑️  Deleting old deployments..."
echo ""

# Skip the first 3 (latest), delete the rest
COUNTER=0
echo "$DEPLOYMENTS" | while read -r url; do
  COUNTER=$((COUNTER + 1))
  
  if [ $COUNTER -le $KEEP ]; then
    echo "  ✅ Keeping: $url"
  else
    # Extract deployment ID from URL
    DEPLOYMENT_ID=$(echo "$url" | sed 's/https:\/\///' | cut -d'-' -f3 | cut -d'.' -f1)
    
    if [ -n "$DEPLOYMENT_ID" ]; then
      echo "  🗑️  Deleting: $url"
      npx vercel rm "$url" --yes --token=$VERCEL_TOKEN 2>&1 || echo "    ⚠️  Could not delete (may require different permissions)"
    fi
  fi
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Verify at: https://vercel.com/elevate-48e460c9/$PROJECT_NAME/deployments"
