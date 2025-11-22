#!/bin/bash
# Configure Vercel domain for www.elevateforhumanity.org

echo "🔧 Configuring Vercel domain for production deployment"
echo ""

# Check if VERCEL_TOKEN is set
if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Please set VERCEL_TOKEN environment variable"
  exit 1
fi

# Get project info from .vercel/project.json
PROJECT_ID=$(cat .vercel/project.json | grep projectId | cut -d'"' -f4)
ORG_ID=$(cat .vercel/project.json | grep orgId | cut -d'"' -f4)

echo "Project ID: $PROJECT_ID"
echo "Org ID: $ORG_ID"
echo ""

# Add www.elevateforhumanity.org domain
echo "📍 Adding www.elevateforhumanity.org to Vercel project..."
curl -X POST "https://api.vercel.com/v9/projects/$PROJECT_ID/domains" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "www.elevateforhumanity.org"
  }' | jq '.'

echo ""
echo "📍 Adding elevateforhumanity.org (root domain)..."
curl -X POST "https://api.vercel.com/v9/projects/$PROJECT_ID/domains" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "elevateforhumanity.org",
    "redirect": "www.elevateforhumanity.org"
  }' | jq '.'

echo ""
echo "✅ Domain configuration complete!"
echo ""
echo "📋 Listing all domains for this project:"
curl -X GET "https://api.vercel.com/v9/projects/$PROJECT_ID/domains" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | jq '.domains[] | {name: .name, verified: .verified}'

echo ""
echo "🚀 Triggering production deployment..."
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"fix2-gpql\",
    \"project\": \"$PROJECT_ID\",
    \"target\": \"production\",
    \"gitSource\": {
      \"type\": \"github\",
      \"ref\": \"main\",
      \"repoId\": \"elevateforhumanity/fix2\"
    }
  }" | jq '.'

echo ""
echo "✅ Done! Check https://www.elevateforhumanity.org in 2-3 minutes"
