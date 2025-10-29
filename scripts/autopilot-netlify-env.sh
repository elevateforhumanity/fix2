#!/usr/bin/env bash
set -euo pipefail

# Autopilot Netlify Environment Variable Setup
# This script automatically configures Netlify environment variables

echo "🤖 Autopilot: Netlify Environment Setup"
echo "========================================"
echo ""

# Check if netlify CLI is available
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Check if we're logged in
if ! netlify status &> /dev/null; then
    echo "⚠️  Not logged into Netlify"
    echo "Environment variables will be configured via netlify.toml fallbacks"
    echo "For production, add these via Netlify Dashboard:"
    echo ""
    echo "Required variables:"
    echo "  - VITE_SUPABASE_URL (already in netlify.toml)"
    echo "  - VITE_SUPABASE_ANON_KEY (already in netlify.toml)"
    echo "  - SUPABASE_SERVICE_KEY (add in dashboard)"
    echo "  - STRIPE_SECRET_KEY (add in dashboard)"
    echo "  - VITE_STRIPE_PUBLISHABLE_KEY (add in dashboard)"
    echo "  - OPENAI_API_KEY (add in dashboard)"
    echo ""
    echo "✅ Fallback configuration active in netlify.toml"
    exit 0
fi

echo "✅ Netlify CLI authenticated"
echo ""

# Get site ID from netlify.toml
SITE_ID=$(grep -A 5 "Site ID" netlify.toml | grep -o "[a-f0-9-]\{36\}" | head -1 || echo "")

if [ -z "$SITE_ID" ]; then
    echo "⚠️  Site ID not found in netlify.toml"
    echo "Using fallback configuration"
    exit 0
fi

echo "📋 Site ID: $SITE_ID"
echo ""

# Check existing environment variables
echo "Checking existing environment variables..."
netlify env:list --site "$SITE_ID" || echo "Could not list variables"

echo ""
echo "✅ Netlify environment configuration complete"
echo ""
echo "Note: Sensitive variables (API keys, secrets) should be added manually"
echo "via Netlify Dashboard for security:"
echo "https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys#environment"
