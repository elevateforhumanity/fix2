#!/bin/bash

# Interactive Environment Variable Setup
# Creates .env.local with real credentials

set -e

echo "🔧 Environment Variable Setup"
echo "=============================="
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists"
    echo ""
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing .env.local"
        exit 0
    fi
    # Backup existing file
    cp .env.local .env.local.backup.$(date +%Y%m%d_%H%M%S)
    echo "✅ Backed up existing .env.local"
    echo ""
fi

echo "Choose an option:"
echo ""
echo "1. Pull from Vercel (requires VERCEL_TOKEN)"
echo "2. Enter credentials manually"
echo "3. Use placeholder values (for testing only)"
echo ""
read -p "Enter choice (1-3): " -n 1 -r CHOICE
echo
echo ""

case $CHOICE in
    1)
        echo "📥 Pulling from Vercel..."
        echo ""
        
        if [ -z "$VERCEL_TOKEN" ]; then
            echo "⚠️  VERCEL_TOKEN not set"
            echo ""
            echo "Get your token from: https://vercel.com/account/tokens"
            echo ""
            read -p "Enter your Vercel token: " VERCEL_TOKEN
            echo ""
        fi
        
        if [ -n "$VERCEL_TOKEN" ]; then
            vercel env pull .env.local --token="$VERCEL_TOKEN" --yes
            
            if [ $? -eq 0 ]; then
                echo ""
                echo "✅ Successfully pulled environment variables from Vercel!"
                echo ""
                echo "📊 Variables loaded: $(grep -c "=" .env.local || echo 0)"
                echo ""
                echo "🔍 Verifying Supabase credentials..."
                if grep -q "your-project-ref\|your-anon-key-here" .env.local; then
                    echo "⚠️  Warning: Still found placeholder values"
                    echo "   Check Vercel dashboard for correct values"
                else
                    echo "✅ Real credentials found!"
                fi
                exit 0
            else
                echo ""
                echo "❌ Failed to pull from Vercel"
                echo "Falling back to manual entry..."
                echo ""
                CHOICE=2
            fi
        else
            echo "❌ No token provided"
            exit 1
        fi
        ;;
    2)
        echo "📝 Manual credential entry"
        echo ""
        echo "You'll need:"
        echo "1. Supabase credentials (from https://supabase.com/dashboard)"
        echo "2. Stripe keys (optional, from https://dashboard.stripe.com)"
        echo ""
        read -p "Press Enter to continue..."
        echo ""
        
        # Supabase URL
        echo "Enter your Supabase URL:"
        echo "Example: https://abcdefghijklmnop.supabase.co"
        read -p "URL: " SUPABASE_URL
        echo ""
        
        # Supabase Anon Key
        echo "Enter your Supabase Anon Key:"
        echo "Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        read -p "Anon Key: " SUPABASE_ANON_KEY
        echo ""
        
        # Supabase Service Role Key
        echo "Enter your Supabase Service Role Key:"
        echo "Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        read -p "Service Role Key: " SUPABASE_SERVICE_ROLE_KEY
        echo ""
        
        # Create .env.local
        cat > .env.local << EOF
# =============================================================================
# ENVIRONMENT VARIABLES - Generated $(date)
# =============================================================================

# -----------------------------------------------------------------------------
# SUPABASE - Database & Authentication
# -----------------------------------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}

# -----------------------------------------------------------------------------
# SITE CONFIGURATION
# -----------------------------------------------------------------------------
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Elevate For Humanity

# -----------------------------------------------------------------------------
# EMAIL (Optional)
# -----------------------------------------------------------------------------
RESEND_API_KEY=
EMAIL_FROM=noreply@elevateforhumanity.org

# -----------------------------------------------------------------------------
# STRIPE (Optional)
# -----------------------------------------------------------------------------
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# -----------------------------------------------------------------------------
# SECURITY
# -----------------------------------------------------------------------------
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
EOF
        
        echo "✅ Created .env.local with your credentials"
        echo ""
        ;;
    3)
        echo "📋 Using placeholder values..."
        echo ""
        cp .env.local.template .env.local 2>/dev/null || cp .env.example .env.local
        echo "⚠️  WARNING: Using placeholder values"
        echo "   Your app will NOT work until you add real credentials"
        echo ""
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

# Verify the file
echo "🔍 Verifying .env.local..."
echo ""

if [ -f .env.local ]; then
    echo "✅ .env.local exists"
    echo ""
    
    # Check for critical variables
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        SUPABASE_URL=$(grep "^NEXT_PUBLIC_SUPABASE_URL=" .env.local | cut -d= -f2)
        if [[ "$SUPABASE_URL" == *"your-project-ref"* ]]; then
            echo "⚠️  NEXT_PUBLIC_SUPABASE_URL: PLACEHOLDER"
        else
            echo "✅ NEXT_PUBLIC_SUPABASE_URL: Set"
        fi
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        ANON_KEY=$(grep "^NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local | cut -d= -f2)
        if [[ "$ANON_KEY" == *"your-anon-key"* ]]; then
            echo "⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY: PLACEHOLDER"
        else
            echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set"
        fi
    fi
    
    if grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
        SERVICE_KEY=$(grep "^SUPABASE_SERVICE_ROLE_KEY=" .env.local | cut -d= -f2)
        if [[ "$SERVICE_KEY" == *"your-service-role"* ]]; then
            echo "⚠️  SUPABASE_SERVICE_ROLE_KEY: PLACEHOLDER"
        else
            echo "✅ SUPABASE_SERVICE_ROLE_KEY: Set"
        fi
    fi
    
    echo ""
    echo "📊 Total variables: $(grep -c "^[A-Z]" .env.local || echo 0)"
else
    echo "❌ Failed to create .env.local"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Install dependencies: pnpm install"
echo "2. Start development: pnpm run dev"
echo ""
