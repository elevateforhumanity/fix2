#!/usr/bin/env bash
set -euo pipefail

echo "🏥 Vercel Health Check & Auto-Fix"
echo "=================================="
echo ""

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Set it with: export VERCEL_TOKEN='your-token'"
  exit 1
fi

CORRECT_PROJECT="fix2-gpql"
CORRECT_PROJECT_ID="prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA"
TEAM_ID="team_Ae8f33vVYR36quLOS8HCeROs"
CORRECT_DOMAIN="www.elevateforhumanity.org"

echo "✅ Expected Configuration:"
echo "  Project: $CORRECT_PROJECT"
echo "  Domain: $CORRECT_DOMAIN"
echo ""

# Check 1: Verify .vercel/project.json
echo "🔍 Check 1: Local Vercel Configuration"
if [ -f ".vercel/project.json" ]; then
  CURRENT_PROJECT=$(cat .vercel/project.json | grep -o '"projectName":"[^"]*"' | cut -d'"' -f4)
  
  if [ "$CURRENT_PROJECT" = "$CORRECT_PROJECT" ]; then
    echo "  ✅ .vercel/project.json points to: $CORRECT_PROJECT"
  else
    echo "  ❌ .vercel/project.json points to: $CURRENT_PROJECT"
    echo "  🔧 Fixing..."
    mkdir -p .vercel
    echo "{\"projectId\":\"$CORRECT_PROJECT_ID\",\"orgId\":\"$TEAM_ID\",\"projectName\":\"$CORRECT_PROJECT\"}" > .vercel/project.json
    echo "  ✅ Fixed! Now points to: $CORRECT_PROJECT"
  fi
else
  echo "  ❌ .vercel/project.json not found"
  echo "  🔧 Creating..."
  mkdir -p .vercel
  echo "{\"projectId\":\"$CORRECT_PROJECT_ID\",\"orgId\":\"$TEAM_ID\",\"projectName\":\"$CORRECT_PROJECT\"}" > .vercel/project.json
  echo "  ✅ Created!"
fi
echo ""

# Check 2: Verify domain is attached
echo "🔍 Check 2: Domain Configuration"
DOMAIN_CHECK=$(curl -s "https://api.vercel.com/v9/projects/$CORRECT_PROJECT_ID/domains?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o "\"name\":\"$CORRECT_DOMAIN\"" || echo "")

if [ -n "$DOMAIN_CHECK" ]; then
  echo "  ✅ Domain $CORRECT_DOMAIN is attached to $CORRECT_PROJECT"
else
  echo "  ❌ Domain $CORRECT_DOMAIN is NOT attached"
  echo "  ⚠️  Manual action required:"
  echo "     1. Go to: https://vercel.com/elevate-48e460c9/$CORRECT_PROJECT/settings/domains"
  echo "     2. Add domain: $CORRECT_DOMAIN"
  echo "     3. Set as Production Domain"
fi
echo ""

# Check 3: List all projects and identify duplicates
echo "🔍 Check 3: Duplicate Projects"
ALL_PROJECTS=$(curl -s "https://api.vercel.com/v9/projects?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"fix2[^"]*"' | cut -d'"' -f4 || echo "")

DUPLICATES=""
for project in $ALL_PROJECTS; do
  if [ "$project" != "$CORRECT_PROJECT" ]; then
    DUPLICATES="$DUPLICATES $project"
  fi
done

if [ -z "$DUPLICATES" ]; then
  echo "  ✅ No duplicate projects found"
else
  echo "  ⚠️  Found duplicate projects:"
  for dup in $DUPLICATES; do
    echo "     - $dup"
  done
  echo ""
  read -p "  Delete these duplicates? (y/N): " confirm
  if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
    for dup in $DUPLICATES; do
      echo "  🗑️  Deleting: $dup"
      npx vercel remove "$dup" --yes --token=$VERCEL_TOKEN 2>&1 || echo "     ⚠️  Could not delete"
    done
    echo "  ✅ Duplicates deleted"
  fi
fi
echo ""

# Check 4: Count deployments
echo "🔍 Check 4: Deployment Count"
DEPLOYMENT_COUNT=$(curl -s "https://api.vercel.com/v6/deployments?projectId=$CORRECT_PROJECT_ID&teamId=$TEAM_ID&limit=100" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"uid":"[^"]*"' | wc -l | xargs)

echo "  📊 Total deployments: $DEPLOYMENT_COUNT"

if [ "$DEPLOYMENT_COUNT" -gt 10 ]; then
  echo "  ⚠️  You have $DEPLOYMENT_COUNT deployments (recommended: keep < 10)"
  read -p "  Clean up old deployments? (y/N): " confirm
  if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
    echo "  🧹 Running cleanup..."
    bash scripts/cleanup-old-deployments.sh || true
  fi
fi
echo ""

# Check 5: Verify GitHub integration
echo "🔍 Check 5: GitHub Integration"
REPO_CHECK=$(curl -s "https://api.vercel.com/v9/projects/$CORRECT_PROJECT_ID?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"gitRepository"' || echo "")

if [ -n "$REPO_CHECK" ]; then
  echo "  ✅ GitHub repository connected"
else
  echo "  ⚠️  GitHub repository not connected"
  echo "     Manual action: Connect at https://vercel.com/elevate-48e460c9/$CORRECT_PROJECT/settings/git"
fi
echo ""

# Check 6: Verify environment variables
echo "🔍 Check 6: Critical Environment Variables"
ENV_VARS=$(curl -s "https://api.vercel.com/v9/projects/$CORRECT_PROJECT_ID/env?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN")

CRITICAL_VARS=(
  "NEXT_PUBLIC_SITE_URL"
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "STRIPE_SECRET_KEY"
)

MISSING_VARS=""
for var in "${CRITICAL_VARS[@]}"; do
  if echo "$ENV_VARS" | grep -q "\"key\":\"$var\""; then
    echo "  ✅ $var"
  else
    echo "  ❌ $var (missing)"
    MISSING_VARS="$MISSING_VARS $var"
  fi
done

if [ -n "$MISSING_VARS" ]; then
  echo ""
  echo "  ⚠️  Missing variables. Add them at:"
  echo "     https://vercel.com/elevate-48e460c9/$CORRECT_PROJECT/settings/environment-variables"
fi
echo ""

# Check 7: Remove DeepSource branch deployments
echo "🔍 Check 7: DeepSource Branch Cleanup"
DEEPSOURCE_DEPLOYMENTS=$(curl -s "https://api.vercel.com/v6/deployments?projectId=$CORRECT_PROJECT_ID&teamId=$TEAM_ID&limit=100" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"gitBranch":"deepsource[^"]*"' || echo "")

if [ -n "$DEEPSOURCE_DEPLOYMENTS" ]; then
  echo "  ⚠️  Found DeepSource branch deployments"
  read -p "  Delete DeepSource deployments? (y/N): " confirm
  if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
    # Get deployment IDs for deepsource branches
    DEEPSOURCE_IDS=$(curl -s "https://api.vercel.com/v6/deployments?projectId=$CORRECT_PROJECT_ID&teamId=$TEAM_ID&limit=100" \
      -H "Authorization: Bearer $VERCEL_TOKEN" | \
      grep -B5 '"gitBranch":"deepsource' | grep -o '"uid":"[^"]*"' | cut -d'"' -f4 || echo "")
    
    if [ -n "$DEEPSOURCE_IDS" ]; then
      echo "$DEEPSOURCE_IDS" | while read -r dep_id; do
        echo "  🗑️  Deleting: $dep_id"
        curl -s -X DELETE "https://api.vercel.com/v13/deployments/$dep_id?teamId=$TEAM_ID" \
          -H "Authorization: Bearer $VERCEL_TOKEN" > /dev/null
      done
      echo "  ✅ DeepSource deployments deleted"
    fi
  fi
else
  echo "  ✅ No DeepSource deployments found"
fi
echo ""

# Summary
echo "=================================="
echo "📊 Health Check Summary"
echo "=================================="
echo ""
echo "✅ Checks Complete!"
echo ""
echo "Next steps:"
echo "1. Verify domain at: https://vercel.com/elevate-48e460c9/$CORRECT_PROJECT/settings/domains"
echo "2. Check deployments at: https://vercel.com/elevate-48e460c9/$CORRECT_PROJECT/deployments"
echo "3. Test site at: https://$CORRECT_DOMAIN"
echo ""
