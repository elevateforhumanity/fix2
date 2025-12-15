#!/bin/bash

# Quick Environment Setup
# Creates .env.local from template or pulls from Vercel

set -e

echo "🔧 Quick Environment Setup"
echo "=========================="
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "✅ .env.local already exists"
    echo ""
    echo "Current variables:"
    grep -c "=" .env.local || echo "0"
    echo ""
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing .env.local"
        exit 0
    fi
fi

# Option 1: Pull from Vercel
if [ -n "$VERCEL_TOKEN" ]; then
    echo "🔐 VERCEL_TOKEN found, pulling from Vercel..."
    echo ""
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo "📦 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Pull environment variables
    vercel env pull .env.local --token="$VERCEL_TOKEN" --yes
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully pulled environment variables from Vercel!"
        echo ""
        echo "📊 Variables loaded: $(grep -c "=" .env.local || echo 0)"
        exit 0
    else
        echo ""
        echo "⚠️  Failed to pull from Vercel, falling back to template..."
        echo ""
    fi
fi

# Option 2: Copy from template
echo "📋 Creating .env.local from template..."
echo ""

if [ -f .env.local.template ]; then
    cp .env.local.template .env.local
    echo "✅ Created .env.local from .env.local.template"
elif [ -f .env.example ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
else
    echo "❌ No template file found (.env.local.template or .env.example)"
    echo ""
    echo "Creating minimal .env.local..."
    cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Configuration (Optional)
RESEND_API_KEY=
EMAIL_FROM=noreply@elevateforhumanity.org

# Stripe Configuration (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
EOF
    echo "✅ Created minimal .env.local"
fi

echo ""
echo "⚠️  IMPORTANT: Update .env.local with your actual credentials"
echo ""
echo "📝 Required variables:"
echo "  - NEXT_PUBLIC_SUPABASE_URL"
echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "  - SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "🔗 Get your Supabase credentials:"
echo "  1. Go to https://supabase.com/dashboard"
echo "  2. Select your project"
echo "  3. Go to Settings → API"
echo "  4. Copy the values to .env.local"
echo ""
echo "🔗 To use Vercel sync in the future:"
echo "  1. Get token: https://vercel.com/account/tokens"
echo "  2. Set it: gp env VERCEL_TOKEN='your-token'"
echo "  3. Run: npm run env:pull"
echo ""
