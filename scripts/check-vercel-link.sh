#!/bin/bash
set -e

echo "🔍 Vercel Project Link Check"
echo "============================="
echo

if [ ! -f ".vercel/project.json" ]; then
  echo "❌ No .vercel/project.json found"
  echo "   Run: ./scripts/hard-link-vercel.sh"
  exit 1
fi

echo "📁 Current .vercel/project.json:"
cat .vercel/project.json | jq '.' 2>/dev/null || cat .vercel/project.json
echo

PROJECT_NAME=$(cat .vercel/project.json | grep -o '"projectName":"[^"]*"' | cut -d'"' -f4)
PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)

echo "📊 Linked to:"
echo "  Project Name: $PROJECT_NAME"
echo "  Project ID: $PROJECT_ID"
echo

if [ "$PROJECT_NAME" = "fix2-gpql" ] && [ "$PROJECT_ID" = "prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA" ]; then
  echo "✅ CORRECT - Linked to fix2-gpql"
else
  echo "❌ WRONG - Should be fix2-gpql (prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA)"
  echo "   Run: ./scripts/hard-link-vercel.sh"
  exit 1
fi

if [ -n "$VERCEL_TOKEN" ]; then
  echo
  echo "🌐 Fetching domains from Vercel API..."
  
  DOMAINS=$(curl -s "https://api.vercel.com/v9/projects/$PROJECT_ID/domains?teamId=team_Ae8f33vVYR36quLOS8HCeROs" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
  
  if [ -n "$DOMAINS" ]; then
    echo "  Domains attached:"
    echo "$DOMAINS" | while read -r domain; do
      echo "    - $domain"
    done
  else
    echo "  ⚠️  No domains found or API error"
  fi
else
  echo
  echo "ℹ️  Set VERCEL_TOKEN to check domains via API"
fi

echo
echo "🎯 Dashboard: https://vercel.com/elevate-48e460c9/$PROJECT_NAME"
echo
