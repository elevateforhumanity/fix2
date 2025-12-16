#!/bin/bash
# Push environment variables to Vercel using API

VERCEL_TOKEN="eO5YwDK9bNt8IuXH6GbyUCra"
PROJECT_ID="prj_iUns4lz1mbDP6kRIcukXFVsDWUAV"
TEAM_ID="team_Ae8f33vVYR36quLOS8HCeROs"

echo "🚀 Pushing environment variables to Vercel via API..."
echo ""

count=0
skipped=0

# Read .env.local and push each variable
while IFS='=' read -r key value; do
  # Skip comments, empty lines, and empty values
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue
  [[ -z "$value" ]] && continue
  
  # Skip auto-generated Vercel variables (except TOKEN and PROJECT_ID)
  if [[ "$key" =~ ^VERCEL_ ]] && [[ "$key" != "VERCEL_TOKEN" ]] && [[ "$key" != "VERCEL_PROJECT_ID" ]]; then
    ((skipped++))
    continue
  fi
  
  echo "📤 Pushing: $key"
  
  # Use Vercel API to add environment variable
  response=$(curl -s -X POST \
    "https://api.vercel.com/v10/projects/$PROJECT_ID/env?teamId=$TEAM_ID" \
    -H "Authorization: Bearer $VERCEL_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"key\": \"$key\",
      \"value\": \"$value\",
      \"type\": \"encrypted\",
      \"target\": [\"production\", \"preview\", \"development\"]
    }" 2>&1)
  
  # Check if it already exists or was created
  if echo "$response" | grep -q "already exists\|created"; then
    ((count++))
  elif echo "$response" | grep -q "error"; then
    echo "   ⚠️  $(echo $response | jq -r '.error.message' 2>/dev/null || echo 'Failed')"
  else
    ((count++))
  fi
  
done < .env.local

echo ""
echo "✅ Processed $count variables"
echo "⏭️  Skipped $skipped auto-generated Vercel variables"
echo ""
echo "🔄 Variables are now in Vercel!"
echo ""
echo "Other environments can now pull with:"
echo "  ./setup-env.sh"
echo "  or"
echo "  vercel env pull .env.local --token=\"$VERCEL_TOKEN\""
