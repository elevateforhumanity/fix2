#!/bin/bash
set -e

echo "🔐 Sync Environment Variables to Netlify"
echo "========================================="
echo ""

# Load environment variables from .env.local
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local not found"
    exit 1
fi

# Source the env file
set -a
source .env.local
set +a

echo "✅ Loaded variables from .env.local"
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Check authentication
if ! netlify status &> /dev/null; then
    echo "❌ Not authenticated with Netlify"
    echo ""
    echo "Please run:"
    echo "  netlify login"
    echo ""
    echo "Or set NETLIFY_AUTH_TOKEN environment variable"
    exit 1
fi

echo "✅ Authenticated with Netlify"
echo ""

# Set environment variables
echo "📤 Setting environment variables..."
echo ""

# Required variables
netlify env:set VITE_SUPABASE_URL "$VITE_SUPABASE_URL" --context production
netlify env:set VITE_SUPABASE_ANON_KEY "$VITE_SUPABASE_ANON_KEY" --context production
netlify env:set VITE_API_URL "${VITE_API_URL:-https://api.elevateforhumanity.org}" --context production
netlify env:set VITE_SITE_URL "${VITE_SITE_URL:-https://elevateforhumanityfix.netlify.app}" --context production
netlify env:set NODE_ENV "production" --context production

# Optional variables (if they exist)
if [ ! -z "$VITE_STRIPE_PUBLISHABLE_KEY" ]; then
    netlify env:set VITE_STRIPE_PUBLISHABLE_KEY "$VITE_STRIPE_PUBLISHABLE_KEY" --context production
fi

if [ ! -z "$VITE_GA_MEASUREMENT_ID" ]; then
    netlify env:set VITE_GA_MEASUREMENT_ID "$VITE_GA_MEASUREMENT_ID" --context production
fi

echo ""
echo "✅ Environment variables synced to Netlify"
echo ""
echo "🚀 Next steps:"
echo "   1. Trigger a deploy:"
echo "      netlify deploy --prod --dir=dist"
echo ""
echo "   2. Or use Netlify dashboard:"
echo "      Deploys → Trigger deploy → Clear cache and deploy site"
echo ""
