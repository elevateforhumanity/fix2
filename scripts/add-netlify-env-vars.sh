#!/bin/bash

# Add Netlify Environment Variables
# Usage: ./scripts/add-netlify-env-vars.sh <service_role_key>

set -e

NETLIFY_TOKEN="${NETLIFY_AUTH_TOKEN:-nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae}"
SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
SUPABASE_URL="https://cuxzzpsyufcewtmicszk.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ"
SUPABASE_SERVICE_ROLE_KEY="$1"

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "❌ Error: Service role key required"
  echo "Usage: $0 <service_role_key>"
  echo ""
  echo "Get the service role key from:"
  echo "https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api"
  exit 1
fi

echo "🚀 Adding environment variables to Netlify..."
echo ""

# Function to add env var
add_env_var() {
  local key=$1
  local value=$2
  
  echo "📝 Adding $key..."
  
  response=$(curl -X PUT \
    "https://api.netlify.com/api/v1/sites/${SITE_ID}/env/${key}" \
    -H "Authorization: Bearer ${NETLIFY_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{
      \"context\": \"all\",
      \"value\": \"${value}\",
      \"scopes\": [\"builds\", \"functions\", \"runtime\", \"post_processing\"]
    }" \
    -s -w "\nHTTP_STATUS:%{http_code}")
  
  http_status=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
  
  if [ "$http_status" = "200" ] || [ "$http_status" = "201" ]; then
    echo "   ✅ Success"
  else
    echo "   ❌ Failed (HTTP $http_status)"
    echo "   Response: $response"
  fi
}

# Add all environment variables
add_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"
add_env_var "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_ROLE_KEY"
add_env_var "NEXT_PUBLIC_APP_URL" "https://elevateconnectsdirectory.org"
add_env_var "NEXT_PUBLIC_SITE_URL" "https://elevateconnectsdirectory.org"
add_env_var "NODE_ENV" "production"

echo ""
echo "🔄 Triggering deploy with cache clear..."

deploy_response=$(curl -X POST \
  "https://api.netlify.com/api/v1/sites/${SITE_ID}/builds" \
  -H "Authorization: Bearer ${NETLIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"clear_cache": true}' \
  -s)

deploy_id=$(echo "$deploy_response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$deploy_id" ]; then
  echo "   ✅ Deploy triggered: $deploy_id"
else
  echo "   ❌ Deploy failed"
  echo "   Response: $deploy_response"
fi

echo ""
echo "✅ Environment variables added and deploy triggered!"
echo ""
echo "📊 Monitor deployment at:"
echo "   https://app.netlify.com/sites/elevateconnectsdirectory/deploys"
echo ""
echo "🌐 Site will be live at:"
echo "   https://elevateconnectsdirectory.org"
