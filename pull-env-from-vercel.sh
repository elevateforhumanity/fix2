#!/bin/bash

# Pull Environment Variables from Vercel
# This script pulls real credentials from your Vercel project

set -e

echo "🔐 Pull Environment Variables from Vercel"
echo "=========================================="
echo ""

# Check if VERCEL_TOKEN is set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ VERCEL_TOKEN not set"
    echo ""
    echo "To get your Vercel token:"
    echo "1. Go to: https://vercel.com/account/tokens"
    echo "2. Click 'Create Token'"
    echo "3. Name it: 'Development Environment'"
    echo "4. Copy the token"
    echo ""
    echo "Then run ONE of these commands:"
    echo ""
    echo "Option A - Set permanently in Gitpod:"
    echo "  gp env VERCEL_TOKEN='your-token-here'"
    echo ""
    echo "Option B - Set for this session only:"
    echo "  export VERCEL_TOKEN='your-token-here'"
    echo ""
    echo "Then run this script again:"
    echo "  bash pull-env-from-vercel.sh"
    echo ""
    exit 1
fi

echo "✅ VERCEL_TOKEN found"
echo ""

# Backup existing .env.local if it exists
if [ -f .env.local ]; then
    BACKUP_FILE=".env.local.backup.$(date +%Y%m%d_%H%M%S)"
    echo "💾 Backing up existing .env.local to $BACKUP_FILE"
    cp .env.local "$BACKUP_FILE"
    echo ""
fi

# Pull environment variables from Vercel
echo "⬇️  Pulling environment variables from Vercel..."
echo ""
echo "Project: fix2"
echo "Org: team_Ae8f33vVYR36quLOS8HCeROs"
echo ""

vercel env pull .env.local --token="$VERCEL_TOKEN" --yes

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pulled environment variables from Vercel!"
    echo ""
    
    # Verify critical variables
    echo "🔍 Verifying environment variables..."
    echo ""
    
    MISSING=0
    
    if grep -q "^NEXT_PUBLIC_SUPABASE_URL=" .env.local; then
        URL=$(grep "^NEXT_PUBLIC_SUPABASE_URL=" .env.local | cut -d= -f2)
        if [[ "$URL" == *"your-project"* ]] || [[ "$URL" == *"placeholder"* ]]; then
            echo "⚠️  NEXT_PUBLIC_SUPABASE_URL: PLACEHOLDER VALUE"
            MISSING=1
        else
            echo "✅ NEXT_PUBLIC_SUPABASE_URL: $URL"
        fi
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_URL: MISSING"
        MISSING=1
    fi
    
    if grep -q "^NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local; then
        KEY=$(grep "^NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local | cut -d= -f2)
        if [[ "$KEY" == *"your-anon-key"* ]] || [[ "$KEY" == *"placeholder"* ]]; then
            echo "⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY: PLACEHOLDER VALUE"
            MISSING=1
        else
            echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: ${KEY:0:50}..."
        fi
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY: MISSING"
        MISSING=1
    fi
    
    if grep -q "^SUPABASE_SERVICE_ROLE_KEY=" .env.local; then
        KEY=$(grep "^SUPABASE_SERVICE_ROLE_KEY=" .env.local | cut -d= -f2)
        if [[ "$KEY" == *"your-service-role"* ]] || [[ "$KEY" == *"placeholder"* ]]; then
            echo "⚠️  SUPABASE_SERVICE_ROLE_KEY: PLACEHOLDER VALUE"
            MISSING=1
        else
            echo "✅ SUPABASE_SERVICE_ROLE_KEY: ${KEY:0:50}..."
        fi
    else
        echo "❌ SUPABASE_SERVICE_ROLE_KEY: MISSING"
        MISSING=1
    fi
    
    echo ""
    echo "📊 Total variables in .env.local: $(grep -c "^[A-Z]" .env.local || echo 0)"
    echo ""
    
    if [ $MISSING -eq 1 ]; then
        echo "⚠️  WARNING: Some variables are missing or have placeholder values"
        echo ""
        echo "This means Vercel doesn't have the real credentials set."
        echo ""
        echo "To fix this:"
        echo "1. Go to: https://vercel.com/team_Ae8f33vVYR36quLOS8HCeROs/fix2/settings/environment-variables"
        echo "2. Add the missing environment variables"
        echo "3. Run this script again to pull the updated values"
        echo ""
    else
        echo "🎉 All critical environment variables are set!"
        echo ""
        echo "Next steps:"
        echo "1. Install dependencies: pnpm install"
        echo "2. Start development: pnpm run dev"
        echo ""
    fi
else
    echo ""
    echo "❌ Failed to pull environment variables from Vercel"
    echo ""
    echo "Possible issues:"
    echo "1. Invalid VERCEL_TOKEN"
    echo "2. No access to the Vercel project"
    echo "3. Network connection issue"
    echo ""
    echo "Try:"
    echo "1. Verify your token is correct"
    echo "2. Check you have access to the project in Vercel dashboard"
    echo "3. Run: vercel whoami --token=\"\$VERCEL_TOKEN\""
    echo ""
    exit 1
fi
