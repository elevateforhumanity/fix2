#!/bin/bash

# Pull Environment Variables from Vercel
# Automatically syncs production environment variables to local development

set -e

echo "🔐 Vercel Environment Variable Sync"
echo "===================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if VERCEL_TOKEN is set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ VERCEL_TOKEN not found"
    echo ""
    echo "To get your Vercel token:"
    echo "1. Go to https://vercel.com/account/tokens"
    echo "2. Click 'Create Token'"
    echo "3. Give it a name (e.g., 'Development Environment')"
    echo "4. Copy the token"
    echo ""
    echo "Then set it in Gitpod:"
    echo "  gp env VERCEL_TOKEN='your-token-here'"
    echo ""
    echo "Or export temporarily:"
    echo "  export VERCEL_TOKEN='your-token-here'"
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

# Pull environment variables using Vercel CLI
echo "⬇️  Pulling environment variables from Vercel..."
echo ""

vercel env pull .env.local --token="$VERCEL_TOKEN" --yes

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pulled environment variables!"
    echo ""
    echo "📄 Updated: .env.local"
    echo ""
    
    # Verify critical environment variables
    echo "🔍 Verifying environment variables..."
    echo ""
    
    MISSING_VARS=()
    
    if ! grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        MISSING_VARS+=("NEXT_PUBLIC_SUPABASE_URL")
    fi
    
    if ! grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        MISSING_VARS+=("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    fi
    
    if ! grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
        MISSING_VARS+=("SUPABASE_SERVICE_ROLE_KEY")
    fi
    
    if [ ${#MISSING_VARS[@]} -eq 0 ]; then
        echo "✅ All critical environment variables present"
        echo ""
        
        # Check for placeholder values
        if grep -q "placeholder\|your-.*-here\|example" .env.local; then
            echo "⚠️  Warning: Found placeholder values in .env.local"
            echo "   Verify that Vercel has real credentials configured"
        else
            echo "✅ No placeholder values detected"
        fi
        
        echo ""
        echo "📊 Environment variable summary:"
        echo "   Supabase: $(grep -c "SUPABASE" .env.local || echo 0) variables"
        echo "   Stripe: $(grep -c "STRIPE" .env.local || echo 0) variables"
        echo "   Total: $(grep -c "=" .env.local || echo 0) variables"
    else
        echo "⚠️  Missing critical environment variables:"
        for var in "${MISSING_VARS[@]}"; do
            echo "   - $var"
        done
        echo ""
        echo "Add these to Vercel at:"
        echo "https://vercel.com/settings/environment-variables"
    fi
    
    echo ""
    echo "Next steps:"
    echo "1. Verify credentials: cat .env.local | grep SUPABASE"
    echo "2. Start development: npm run dev"
    echo "3. Run migrations if needed: npm run migrate"
else
    echo ""
    echo "❌ Failed to pull environment variables"
    echo ""
    echo "Troubleshooting:"
    echo "1. Verify VERCEL_TOKEN is valid"
    echo "2. Check project is linked: vercel link"
    echo "3. Manual setup: Copy from Vercel dashboard"
    echo ""
    exit 1
fi
