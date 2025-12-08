#!/bin/bash
# Check critical environment variables

echo "🔍 Checking Critical Environment Variables"
echo "═══════════════════════════════════════════════════"
echo ""

REQUIRED_VARS=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "STRIPE_SECRET_KEY"
    "NEXT_PUBLIC_SITE_URL"
)

MISSING=0
PRESENT=0

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ $var - NOT SET"
        ((MISSING++))
    else
        # Mask the value for security
        value="${!var}"
        masked="${value:0:10}...${value: -4}"
        echo "✅ $var - SET ($masked)"
        ((PRESENT++))
    fi
done

echo ""
echo "═══════════════════════════════════════════════════"
echo "Summary:"
echo "  ✅ Present: $PRESENT"
echo "  ❌ Missing: $MISSING"
echo ""

if [ $MISSING -gt 0 ]; then
    echo "⚠️  WARNING: $MISSING critical environment variable(s) missing"
    echo ""
    echo "To fix this:"
    echo "1. Check if .env.local exists"
    echo "2. Copy from .env.example if needed"
    echo "3. Add the missing variables"
    echo ""
    exit 1
else
    echo "✅ All critical environment variables are set!"
    exit 0
fi
