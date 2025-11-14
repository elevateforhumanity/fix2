#!/bin/bash

# Set Netlify Environment Variables via API
# Usage: ./scripts/set-netlify-env.sh

set -e

echo "🔧 Setting Netlify Environment Variables..."
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if authenticated
if ! netlify status &> /dev/null; then
    echo "❌ Not authenticated with Netlify"
    echo "Run: netlify login"
    exit 1
fi

echo "✅ Netlify CLI authenticated"
echo ""

# Set environment variables
echo "Setting NEXT_PUBLIC_SUPABASE_URL..."
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://cuxzzpsyufcewtmicszk.supabase.co" --context production

echo "Setting NEXT_PUBLIC_SUPABASE_ANON_KEY..."
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ" --context production

echo ""
echo "⚠️  SUPABASE_SERVICE_ROLE_KEY must be set manually"
echo "Get it from: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api"
echo ""
read -p "Enter SUPABASE_SERVICE_ROLE_KEY: " SERVICE_KEY

if [ -n "$SERVICE_KEY" ]; then
    echo "Setting SUPABASE_SERVICE_ROLE_KEY..."
    netlify env:set SUPABASE_SERVICE_ROLE_KEY "$SERVICE_KEY" --context production
else
    echo "⚠️  Skipping SUPABASE_SERVICE_ROLE_KEY (you'll need to set it manually)"
fi

echo ""
echo "Setting site URLs..."
netlify env:set NEXT_PUBLIC_APP_URL "https://elevateconnectsdirectory.org" --context production
netlify env:set NEXT_PUBLIC_SITE_URL "https://elevateconnectsdirectory.org" --context production
netlify env:set NEXT_PUBLIC_BASE_URL "https://elevateconnectsdirectory.org" --context production
netlify env:set NODE_ENV "production" --context production

echo ""
echo "✅ Environment variables set!"
echo ""
echo "📋 Verify variables:"
netlify env:list

echo ""
echo "🚀 Trigger new deploy:"
echo "   netlify deploy --prod"
echo ""
echo "Or go to: https://app.netlify.com/sites/[YOUR-SITE]/deploys"
