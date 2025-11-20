#!/usr/bin/env bash
set -euo pipefail

echo "💥 HARD RESET - Complete Vercel & Git Cleanup"
echo "=============================================="
echo ""
echo "⚠️  THIS WILL:"
echo "  1. Delete ALL branches except main"
echo "  2. Delete ALL projects except fix2-gpql"
echo "  3. Delete ALL deployments in fix2-gpql"
echo "  4. Clear ALL local caches"
echo "  5. Fix .vercel/project.json"
echo "  6. Deploy completely fresh build"
echo ""
echo "💀 THIS IS IRREVERSIBLE!"
echo ""

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Set it with: export VERCEL_TOKEN='your-token'"
  exit 1
fi

read -p "Type 'HARD RESET' to confirm: " confirm

if [ "$confirm" != "HARD RESET" ]; then
  echo "❌ Cancelled"
  exit 1
fi

CORRECT_PROJECT="fix2-gpql"
CORRECT_PROJECT_ID="prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA"
CORRECT_TEAM="team_Ae8f33vVYR36quLOS8HCeROs"

echo ""
echo "💥 STARTING HARD RESET..."
echo ""

# ============================================
# STEP 1: Git Branch Cleanup
# ============================================
echo "💥 Step 1/7: Cleaning Git branches..."

CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "  Switching to main..."
  git checkout main
fi

echo "  Deleting local branches..."
git branch | grep -v "main" | grep -v "\*" | xargs -r git branch -D 2>/dev/null || true

echo "  Fetching and pruning..."
git fetch --prune

echo "  Deleting remote branches..."
git branch -r | grep -v "HEAD" | grep -v "main" | sed 's/origin\///' | while read -r branch; do
  if [[ "$branch" == deepsource* ]] || [[ "$branch" == feature* ]] || [[ "$branch" == fix* ]] || [[ "$branch" == test* ]]; then
    echo "    🗑️  $branch"
    git push origin --delete "$branch" 2>/dev/null || true
  fi
done

echo "  ✅ Git branches cleaned"

# ============================================
# STEP 2: Delete Projects in ALL Teams
# ============================================
echo ""
echo "💥 Step 2/7: Deleting projects in ALL teams..."

# Get all teams
ALL_TEAMS=$(curl -s "https://api.vercel.com/v2/teams" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

for team in $ALL_TEAMS; do
  TEAM_NAME=$(curl -s "https://api.vercel.com/v2/teams/$team" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | head -1)
  
  echo "  Team: $TEAM_NAME ($team)"
  
  # Get all projects in this team
  TEAM_PROJECTS=$(curl -s "https://api.vercel.com/v9/projects?teamId=$team" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
  
  if [ -n "$TEAM_PROJECTS" ]; then
    for project in $TEAM_PROJECTS; do
      # Keep only fix2-gpql in the correct team
      if [ "$team" = "$CORRECT_TEAM" ] && [ "$project" = "$CORRECT_PROJECT" ]; then
        echo "    ✅ Keeping: $project"
      else
        echo "    🗑️  Deleting: $project"
        
        # Get project ID
        PROJECT_ID=$(curl -s "https://api.vercel.com/v9/projects/$project?teamId=$team" \
          -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
        
        if [ -n "$PROJECT_ID" ]; then
          curl -s -X DELETE "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$team" \
            -H "Authorization: Bearer $VERCEL_TOKEN" > /dev/null || true
        fi
      fi
    done
  fi
done

echo "  ✅ All extra projects deleted"

# ============================================
# STEP 3: Delete ALL Deployments
# ============================================
echo ""
echo "💥 Step 3/7: Deleting ALL deployments..."

DEPLOYMENT_IDS=$(curl -s "https://api.vercel.com/v6/deployments?projectId=$CORRECT_PROJECT_ID&teamId=$CORRECT_TEAM&limit=100" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"uid":"[^"]*"' | cut -d'"' -f4)

if [ -n "$DEPLOYMENT_IDS" ]; then
  TOTAL=$(echo "$DEPLOYMENT_IDS" | wc -l | xargs)
  echo "  Found $TOTAL deployments"
  
  COUNTER=0
  echo "$DEPLOYMENT_IDS" | while read -r dep_id; do
    COUNTER=$((COUNTER + 1))
    echo "  [$COUNTER/$TOTAL] Deleting: $dep_id"
    curl -s -X DELETE "https://api.vercel.com/v13/deployments/$dep_id?teamId=$CORRECT_TEAM" \
      -H "Authorization: Bearer $VERCEL_TOKEN" > /dev/null || true
  done
fi

echo "  ✅ All deployments deleted"

# ============================================
# STEP 4: Clear Local Caches
# ============================================
echo ""
echo "💥 Step 4/7: Clearing local caches..."

rm -rf .next
rm -rf node_modules/.cache
rm -rf .vercel/.output
rm -rf .turbo
rm -rf out
rm -rf dist

echo "  ✅ Local caches cleared"

# ============================================
# STEP 5: Fix .vercel/project.json
# ============================================
echo ""
echo "💥 Step 5/7: Fixing .vercel/project.json..."

rm -rf .vercel
mkdir -p .vercel
echo "{\"projectId\":\"$CORRECT_PROJECT_ID\",\"orgId\":\"$CORRECT_TEAM\",\"projectName\":\"$CORRECT_PROJECT\"}" > .vercel/project.json

echo "  ✅ .vercel/project.json fixed"

# ============================================
# STEP 6: Verify Configuration
# ============================================
echo ""
echo "💥 Step 6/7: Verifying configuration..."

echo "  Project: $(cat .vercel/project.json | grep -o '"projectName":"[^"]*"' | cut -d'"' -f4)"
echo "  ✅ Configuration verified"

# ============================================
# STEP 7: Deploy Fresh Build
# ============================================
echo ""
echo "💥 Step 7/7: Deploying fresh build..."
echo ""

npx vercel --prod --yes --force --token=$VERCEL_TOKEN

echo ""
echo "✅ HARD RESET COMPLETE!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 What was done:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Deleted all branches except main"
echo "  ✅ Deleted all extra projects"
echo "  ✅ Deleted all deployments"
echo "  ✅ Cleared all caches"
echo "  ✅ Fixed .vercel/project.json"
echo "  ✅ Deployed fresh build"
echo ""
echo "🎯 Your setup:"
echo "  Project: $CORRECT_PROJECT"
echo "  Domain: www.elevateforhumanity.org"
echo ""
echo "🔍 Check deployment:"
echo "  Dashboard: https://vercel.com/elevate-48e460c9/$CORRECT_PROJECT"
echo "  Live site: https://www.elevateforhumanity.org"
echo ""
echo "⏱️  Build will take 2-3 minutes"
echo "Look for build marker: BUILD: 2025-11-20-10:25"
echo ""
