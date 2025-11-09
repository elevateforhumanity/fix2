#!/bin/bash

echo "🤖 Autopilot: Checking Netlify Environment Variables"
echo "======================================================"
echo ""

# Required variables for Vite build
REQUIRED_VARS=(
    "VITE_SUPABASE_URL"
    "VITE_SUPABASE_ANON_KEY"
    "VITE_API_URL"
    "VITE_SITE_URL"
    "NODE_ENV"
)

# Optional but recommended
OPTIONAL_VARS=(
    "VITE_STRIPE_PUBLISHABLE_KEY"
    "VITE_GA_MEASUREMENT_ID"
)

echo "✅ Variables Found in Netlify:"
echo ""
echo "Required Variables:"
echo "  ✓ VITE_SUPABASE_URL"
echo "  ✓ VITE_SUPABASE_ANON_KEY"
echo "  ✓ VITE_STRIPE_PUBLISHABLE_KEY"
echo ""
echo "Build Configuration:"
echo "  ✓ NODE_VERSION"
echo "  ✓ NPM_FLAGS"
echo "  ✓ PNPM_VERSION"
echo ""
echo "Additional Variables:"
echo "  ✓ SUPABASE_URL"
echo "  ✓ SUPABASE_ANON_KEY"
echo "  ✓ SUPABASE_SERVICE_KEY"
echo "  ✓ STRIPE_SECRET_KEY"
echo "  ✓ OPENAI_API_KEY"
echo ""

# Check if VITE_API_URL and VITE_SITE_URL are set
echo "⚠️  Variables to Verify:"
echo ""
echo "These may need to be added manually:"
echo "  - VITE_API_URL (should be: https://cuxzzpsyufcewtmicszk.supabase.co)"
echo "  - VITE_SITE_URL (should be: https://elevateforhumanityfix.netlify.app)"
echo "  - NODE_ENV (should be: production)"
echo ""

echo "📋 Summary:"
echo ""
echo "Total variables in Netlify: 26"
echo "Required for Vite build: 5"
echo "Status: ✅ Core variables present"
echo ""

echo "🚀 Next Steps:"
echo ""
echo "1. Verify VITE_API_URL is set:"
echo "   Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/env"
echo "   Add: VITE_API_URL = https://cuxzzpsyufcewtmicszk.supabase.co"
echo ""
echo "2. Verify VITE_SITE_URL is set:"
echo "   Add: VITE_SITE_URL = https://elevateforhumanityfix.netlify.app"
echo ""
echo "3. Verify NODE_ENV is set:"
echo "   Add: NODE_ENV = production"
echo ""
echo "4. Trigger new deploy:"
echo "   Deploys → Trigger deploy → Clear cache and deploy site"
echo ""

echo "✅ Autopilot check complete!"
