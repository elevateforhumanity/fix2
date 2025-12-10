#!/bin/bash
# Auto-setup environment variables from Vercel
# This runs automatically in new Gitpod workspaces

set -e

echo "🔧 Setting up environment variables..."

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists"
    exit 0
fi

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Try to pull from Vercel
echo "📥 Pulling environment variables from Vercel..."
echo "ℹ️  If this fails, you'll need to run 'vercel login' first"

if vercel env pull .env.local 2>/dev/null; then
    echo "✅ Environment variables pulled from Vercel successfully!"
    echo "📊 Variables configured: $(grep -c "^[A-Z]" .env.local 2>/dev/null || echo "0")"
else
    echo "⚠️  Could not pull from Vercel automatically"
    echo ""
    echo "To set up environment variables, run:"
    echo "  1. vercel login"
    echo "  2. vercel env pull .env.local"
    echo ""
    echo "Or copy .env.local.template to .env.local and fill in values manually"
    
    # Create a minimal .env.local with public variables only
    if [ ! -f ".env.local" ]; then
        echo "📝 Creating minimal .env.local with public variables..."
        cat > .env.local << 'EOF'
# Environment Variables - Run 'vercel env pull .env.local' to get all values
# Or fill in manually from Vercel dashboard

# Public variables (safe to set)
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_ORGANIZATION_NAME=Elevate for Humanity Career and Technical Institute
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-SWPG2HVYVH
NEXT_PUBLIC_VIMEO_BASE_URL=https://player.vimeo.com/video
NODE_ENV=development

# Private variables - Get from Vercel or Supabase dashboard
# Run: vercel login && vercel env pull .env.local
EOF
        echo "⚠️  Created minimal .env.local - run 'vercel env pull .env.local' to get all variables"
    fi
fi
