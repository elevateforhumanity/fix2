#!/bin/bash

# Pull Environment Variables from Vercel
# This script helps you download production environment variables from Vercel

set -e

echo "🔐 Vercel Environment Variable Sync"
echo "===================================="
echo ""

# Check if VERCEL_TOKEN is set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ VERCEL_TOKEN not found"
    echo ""
    echo "To get your Vercel token:"
    echo "1. Go to https://vercel.com/account/tokens"
    echo "2. Click 'Create Token'"
    echo "3. Give it a name (e.g., 'Gitpod Development')"
    echo "4. Copy the token"
    echo ""
    echo "Then set it:"
    echo "  export VERCEL_TOKEN='your-token-here'"
    echo ""
    echo "Or add it to your Gitpod environment variables:"
    echo "  gp env VERCEL_TOKEN='your-token-here'"
    echo ""
    exit 1
fi

echo "✅ VERCEL_TOKEN found"
echo ""

# Project details from .vercel/project.json
PROJECT_ID="prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO"
TEAM_ID="team_Ae8f33vVYR36quLOS8HCeROs"

echo "📋 Project: fix2-gpql"
echo "🆔 Project ID: $PROJECT_ID"
echo ""

# Pull environment variables using Vercel CLI
echo "⬇️  Pulling environment variables from Vercel..."
echo ""

npx vercel env pull .env.local --token="$VERCEL_TOKEN" --yes

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pulled environment variables!"
    echo ""
    echo "📄 Updated: .env.local"
    echo ""
    echo "🔍 Verifying Supabase credentials..."
    echo ""
    
    if grep -q "placeholder" .env.local; then
        echo "⚠️  Warning: Still found placeholder values"
        echo "   Check if Vercel has the correct environment variables set"
    else
        echo "✅ Real credentials found!"
        echo ""
        grep "SUPABASE" .env.local | head -3
    fi
    
    echo ""
    echo "Next steps:"
    echo "1. Run migration: node run-migration.js"
    echo "2. Test locally: npm run dev"
else
    echo ""
    echo "❌ Failed to pull environment variables"
    echo ""
    echo "Alternative: Manual setup"
    echo "1. Go to: https://vercel.com/$TEAM_ID/fix2-gpql/settings/environment-variables"
    echo "2. Copy the values for:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
    echo "3. Update .env.local manually"
fi
