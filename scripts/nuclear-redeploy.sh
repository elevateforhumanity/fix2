#!/usr/bin/env bash
set -euo pipefail

echo "☢️  NUCLEAR REDEPLOY - Delete Everything & Start Fresh"
echo "======================================================"
echo ""
echo "⚠️  WARNING: This will:"
echo "  1. Delete ALL deployments (including latest)"
echo "  2. Clear all build caches"
echo "  3. Trigger a completely fresh build"
echo ""

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Set it with: export VERCEL_TOKEN='your-token'"
  exit 1
fi

PROJECT_NAME="fix2-gpql"
PROJECT_ID="prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA"
TEAM_ID="team_Ae8f33vVYR36quLOS8HCeROs"

read -p "Type 'NUCLEAR' to confirm complete wipe: " confirm

if [ "$confirm" != "NUCLEAR" ]; then
  echo "❌ Cancelled"
  exit 1
fi

echo ""
echo "☢️  Step 1: Cleaning up old branches..."
echo ""

# Delete old git branches (keep main)
echo "  🌿 Local branches:"
git branch | grep -v "main" | grep -v "\*" | xargs -r git branch -D 2>/dev/null || echo "    ℹ️  No local branches to delete"

echo "  🌿 Remote branches (DeepSource, old feature branches):"
git fetch --prune
git branch -r | grep -v "main" | grep -v "HEAD" | sed 's/origin\///' | while read -r branch; do
  if [[ "$branch" == deepsource* ]] || [[ "$branch" == feature* ]] || [[ "$branch" == fix* ]]; then
    echo "    🗑️  Deleting remote branch: $branch"
    git push origin --delete "$branch" 2>/dev/null || echo "      ⚠️  Could not delete (may not exist)"
  fi
done

echo "  ✅ Branch cleanup complete"

echo ""
echo "☢️  Step 2: Deleting ALL deployments..."
echo ""

# Get ALL deployment IDs
DEPLOYMENT_IDS=$(curl -s "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID&teamId=$TEAM_ID&limit=100" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"uid":"[^"]*"' | cut -d'"' -f4)

if [ -z "$DEPLOYMENT_IDS" ]; then
  echo "  ℹ️  No deployments found"
else
  TOTAL=$(echo "$DEPLOYMENT_IDS" | wc -l | xargs)
  echo "  Found $TOTAL deployments to delete"
  
  COUNTER=0
  echo "$DEPLOYMENT_IDS" | while read -r deployment_id; do
    COUNTER=$((COUNTER + 1))
    echo "  [$COUNTER/$TOTAL] Deleting: $deployment_id"
    
    curl -s -X DELETE \
      "https://api.vercel.com/v13/deployments/$deployment_id?teamId=$TEAM_ID" \
      -H "Authorization: Bearer $VERCEL_TOKEN" > /dev/null || echo "    ⚠️  Could not delete"
  done
  
  echo "  ✅ All deployments deleted"
fi

echo ""
echo "☢️  Step 3: Clearing local caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .vercel/.output
echo "  ✅ Local caches cleared"

echo ""
echo "☢️  Step 4: Triggering fresh build..."
echo ""

# Deploy fresh
npx vercel --prod --yes --token=$VERCEL_TOKEN --force

echo ""
echo "✅ NUCLEAR REDEPLOY COMPLETE!"
echo ""
echo "🎯 What happened:"
echo "  ✅ Cleaned up old branches (DeepSource, feature, fix)"
echo "  ✅ Deleted all old deployments"
echo "  ✅ Cleared all caches"
echo "  ✅ Triggered fresh build with --force flag"
echo ""
echo "🔍 Check status:"
echo "  Dashboard: https://vercel.com/elevate-48e460c9/$PROJECT_NAME/deployments"
echo "  Live site: https://www.elevateforhumanity.org"
echo ""
echo "⏱️  Build will take 2-3 minutes. Look for the build marker:"
echo "  BUILD: 2025-11-20-10:25"
echo ""
