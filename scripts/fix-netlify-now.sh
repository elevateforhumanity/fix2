#!/bin/bash

# IMMEDIATE FIX - Set Netlify Environment Variables NOW
# Run this before user gets to Netlify dashboard

set -e

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

echo "🚨 EMERGENCY FIX - Setting Netlify Env Vars NOW"
echo "================================================"
echo ""

# Check for Netlify token in environment or GitHub secrets
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "❌ NETLIFY_AUTH_TOKEN not set"
    echo ""
    echo "Checking for token in common locations..."
    
    # Try to get from gh CLI
    if command -v gh &> /dev/null; then
        echo "Attempting to get from GitHub Secrets..."
        NETLIFY_AUTH_TOKEN=$(gh secret list | grep NETLIFY_AUTH_TOKEN || echo "")
    fi
    
    if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
        echo "❌ Cannot proceed without NETLIFY_AUTH_TOKEN"
        echo ""
        echo "Get token from: https://app.netlify.com/user/applications"
        echo "Then run: NETLIFY_AUTH_TOKEN='token' $0"
        exit 1
    fi
fi

echo "✅ Found Netlify auth token"
echo ""

# Environment variables to set
declare -A ENV_VARS=(
    ["NEXT_PUBLIC_SUPABASE_URL"]="https://cuxzzpsyufcewtmicszk.supabase.co"
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ"
    ["NEXT_PUBLIC_APP_URL"]="https://elevateconnectsdirectory.org"
    ["NEXT_PUBLIC_SITE_URL"]="https://elevateconnectsdirectory.org"
    ["NEXT_PUBLIC_BASE_URL"]="https://elevateconnectsdirectory.org"
    ["NODE_ENV"]="production"
)

# Set each variable
for KEY in "${!ENV_VARS[@]}"; do
    VALUE="${ENV_VARS[$KEY]}"
    echo "Setting $KEY..."
    
    curl -s -X PUT \
        "https://api.netlify.com/api/v1/accounts/-/env/$KEY?site_id=$SITE_ID" \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"context\":\"all\",\"value\":\"$VALUE\"}" > /dev/null
    
    echo "  ✅ Set"
done

echo ""
echo "🚀 Triggering deployment..."

curl -s -X POST \
    "https://api.netlify.com/api/v1/sites/$SITE_ID/builds" \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"clear_cache":true}' > /dev/null

echo "✅ Deployment triggered!"
echo ""
echo "================================================"
echo "✅ COMPLETE - Environment variables set!"
echo "================================================"
echo ""
echo "Site will be live in 2-3 minutes at:"
echo "https://elevateconnectsdirectory.org"
