#!/bin/bash

# Direct Netlify Environment Variable Setter
# Sets env vars using Netlify API without needing CLI

set -e

echo "🤖 Setting Netlify Environment Variables Directly"
echo "=================================================="
echo ""

# Netlify credentials
SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

# Check for auth token
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "❌ NETLIFY_AUTH_TOKEN environment variable not set"
    echo ""
    echo "Get your token from: https://app.netlify.com/user/applications"
    echo "Then run: export NETLIFY_AUTH_TOKEN='your-token'"
    echo "Or: NETLIFY_AUTH_TOKEN='your-token' ./scripts/set-netlify-env-direct.sh"
    exit 1
fi

echo "✅ Using Site ID: $SITE_ID"
echo ""

# Supabase keys
SUPABASE_URL="https://cuxzzpsyufcewtmicszk.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ"

# Function to set env var
set_env_var() {
    local KEY=$1
    local VALUE=$2
    
    echo "Setting $KEY..."
    
    RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT \
        "https://api.netlify.com/api/v1/accounts/-/env/$KEY?site_id=$SITE_ID" \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{
            \"context\": \"all\",
            \"value\": \"$VALUE\"
        }")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | head -n-1)
    
    if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
        echo "  ✅ Success"
    else
        echo "  ❌ Failed (HTTP $HTTP_CODE)"
        echo "  Response: $BODY"
    fi
}

# Set all environment variables
echo "📝 Setting environment variables..."
echo ""

set_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
set_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"
set_env_var "NEXT_PUBLIC_APP_URL" "https://elevateconnectsdirectory.org"
set_env_var "NEXT_PUBLIC_SITE_URL" "https://elevateconnectsdirectory.org"
set_env_var "NEXT_PUBLIC_BASE_URL" "https://elevateconnectsdirectory.org"
set_env_var "NODE_ENV" "production"

echo ""
echo "⚠️  SUPABASE_SERVICE_ROLE_KEY"
echo "This must be set manually (secret key)"
echo ""

if [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "Found SUPABASE_SERVICE_ROLE_KEY in environment, setting..."
    set_env_var "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_ROLE_KEY"
else
    echo "Get from: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api"
    echo "Then run: SUPABASE_SERVICE_ROLE_KEY='your-key' ./scripts/set-netlify-env-direct.sh"
fi

echo ""
echo "=================================================="
echo "🚀 Triggering Netlify Build"
echo "=================================================="
echo ""

BUILD_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    "https://api.netlify.com/api/v1/sites/$SITE_ID/builds" \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"clear_cache": true}')

BUILD_HTTP_CODE=$(echo "$BUILD_RESPONSE" | tail -n1)

if [ "$BUILD_HTTP_CODE" -eq 200 ] || [ "$BUILD_HTTP_CODE" -eq 201 ]; then
    echo "✅ Build triggered successfully!"
    echo ""
    echo "Monitor at: https://app.netlify.com/sites/$SITE_ID/deploys"
    echo "Site will be live at: https://elevateconnectsdirectory.org"
else
    echo "❌ Failed to trigger build (HTTP $BUILD_HTTP_CODE)"
    echo "Response: $(echo "$BUILD_RESPONSE" | head -n-1)"
fi

echo ""
echo "=================================================="
echo "✅ COMPLETE"
echo "=================================================="
echo ""
echo "Correct Netlify URL for env vars:"
echo "https://app.netlify.com/sites/$SITE_ID/settings/env"
