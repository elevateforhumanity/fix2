#!/bin/bash
# Autopilot: Complete Vercel Setup
# Reads .env.production and sets up Vercel automatically

set -e

echo "🤖 AUTOPILOT: Vercel Setup"
echo "=========================="
echo ""

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production not found"
    exit 1
fi

# Load environment variables
set -a
source .env.production
set +a

echo "✅ Loaded environment variables from .env.production"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI already installed"
fi
echo ""

# Check if already logged in
if vercel whoami &> /dev/null; then
    echo "✅ Already logged in to Vercel"
else
    echo "🔐 Please login to Vercel..."
    vercel login
fi
echo ""

# Link or create project
echo "🔗 Linking project to Vercel..."
if [ -d .vercel ]; then
    echo "✅ Project already linked"
else
    echo "Creating new Vercel project..."
    vercel link --yes
fi
echo ""

# Get project details
if [ -f .vercel/project.json ]; then
    ORG_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)
    PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
    
    echo "📋 Project Details:"
    echo "   Org ID: $ORG_ID"
    echo "   Project ID: $PROJECT_ID"
    echo ""
fi

# Set environment variables in Vercel
echo "🔧 Setting environment variables in Vercel..."

set_vercel_env() {
    local key=$1
    local value=$2
    
    if [ -z "$value" ] || [ "$value" = "placeholder" ] || [[ "$value" == *"placeholder"* ]]; then
        echo "⏭️  Skipping $key (placeholder value)"
        return
    fi
    
    echo "   Setting $key..."
    
    # Remove existing variable (ignore errors)
    vercel env rm "$key" production --yes 2>/dev/null || true
    
    # Add new value
    echo "$value" | vercel env add "$key" production --yes
}

# Set each environment variable
set_vercel_env "VITE_SUPABASE_URL" "$VITE_SUPABASE_URL"
set_vercel_env "VITE_SUPABASE_ANON_KEY" "$VITE_SUPABASE_ANON_KEY"
set_vercel_env "VITE_STRIPE_PUBLISHABLE_KEY" "$VITE_STRIPE_PUBLISHABLE_KEY"
set_vercel_env "VITE_API_URL" "${VITE_API_URL:-https://api.elevateforhumanity.org}"
set_vercel_env "VITE_SITE_URL" "${VITE_SITE_URL:-https://fix2.vercel.app}"
set_vercel_env "VITE_GA_MEASUREMENT_ID" "G-EFHWORKFORCE01"

echo ""
echo "✅ Environment variables configured in Vercel"
echo ""

# Deploy to production
echo "🚀 Deploying to Vercel production..."
DEPLOY_URL=$(vercel --prod --yes)

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "=========================="
echo ""
echo "🌐 Your site is live at:"
echo "   $DEPLOY_URL"
echo ""
echo "📊 Next steps:"
echo "   1. Visit the URL above to verify deployment"
echo "   2. Check Vercel dashboard: https://vercel.com/dashboard"
echo "   3. Monitor usage: https://vercel.com/dashboard (Usage tab)"
echo ""
echo "💡 To enable automatic deployments:"
echo "   Run: bash scripts/autopilot-github-secrets.sh"
echo ""
