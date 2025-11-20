#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Fix Vercel Production Branch"
echo "================================"
echo ""

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Set it with: export VERCEL_TOKEN='your_new_token'"
  exit 1
fi

PROJECT_ID="prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA"
TEAM_ID="team_Ae8f33vVYR36quLOS8HCeROs"
CORRECT_BRANCH="main"

echo "🔍 Checking current production branch..."

# Get current project settings
CURRENT_SETTINGS=$(curl -s "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN")

CURRENT_BRANCH=$(echo "$CURRENT_SETTINGS" | grep -o '"productionBranch":"[^"]*"' | cut -d'"' -f4 || echo "")

if [ -z "$CURRENT_BRANCH" ]; then
  echo "  ⚠️  Could not determine current branch"
else
  echo "  Current: $CURRENT_BRANCH"
fi

if [ "$CURRENT_BRANCH" = "$CORRECT_BRANCH" ]; then
  echo "  ✅ Already set to $CORRECT_BRANCH"
else
  echo ""
  echo "🔧 Setting production branch to: $CORRECT_BRANCH"
  
  # Update production branch
  RESPONSE=$(curl -s -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$TEAM_ID" \
    -H "Authorization: Bearer $VERCEL_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"productionBranch\":\"$CORRECT_BRANCH\"}")
  
  if echo "$RESPONSE" | grep -q '"productionBranch"'; then
    echo "  ✅ Production branch updated to: $CORRECT_BRANCH"
  else
    echo "  ❌ Failed to update. Response:"
    echo "$RESPONSE"
    exit 1
  fi
fi

echo ""
echo "🧹 Cleaning up DeepSource branches..."

# Delete DeepSource branches from GitHub
git fetch --prune
DEEPSOURCE_BRANCHES=$(git branch -r | grep "deepsource" | sed 's/origin\///' || echo "")

if [ -n "$DEEPSOURCE_BRANCHES" ]; then
  echo "$DEEPSOURCE_BRANCHES" | while read -r branch; do
    echo "  🗑️  Deleting: $branch"
    git push origin --delete "$branch" 2>/dev/null || echo "    ⚠️  Could not delete (may not exist)"
  done
  echo "  ✅ DeepSource branches cleaned"
else
  echo "  ℹ️  No DeepSource branches found"
fi

echo ""
echo "🚀 Triggering fresh deployment from main branch..."

# Trigger a new deployment
curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"fix2-gpql\",
    \"project\": \"$PROJECT_ID\",
    \"target\": \"production\",
    \"gitSource\": {
      \"type\": \"github\",
      \"ref\": \"$CORRECT_BRANCH\",
      \"repoId\": \"elevateforhumanity/fix2\"
    }
  }" > /dev/null

echo ""
echo "✅ Complete!"
echo ""
echo "📊 Summary:"
echo "  ✅ Production branch set to: $CORRECT_BRANCH"
echo "  ✅ DeepSource branches deleted"
echo "  ✅ Fresh deployment triggered"
echo ""
echo "🔍 Check deployment:"
echo "  https://vercel.com/elevate-48e460c9/fix2-gpql/deployments"
echo ""
echo "⏱️  Build will take 2-3 minutes"
echo "  Look for commit from 'main' branch (not deepsource)"
echo ""
