#!/bin/bash

# Elevate for Humanity - Local Environment Setup
# This script helps set up local environment variables for development

set -e

echo "🚀 Elevate for Humanity - Local Environment Setup"
echo "=================================================="
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
    echo "📝 Backing up existing .env.local to .env.local.backup"
    cp .env.local .env.local.backup
fi

echo "📋 This script will help you set up your local environment variables."
echo "   You'll need to provide your Supabase credentials."
echo ""
echo "🔗 Get your Supabase credentials from:"
echo "   https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api"
echo ""

# Function to prompt for input
prompt_for_value() {
    local var_name=$1
    local description=$2
    local default_value=$3
    local is_secret=$4
    
    echo ""
    echo "📌 $var_name"
    echo "   $description"
    
    if [ -n "$default_value" ]; then
        echo "   Default: $default_value"
    fi
    
    if [ "$is_secret" = "true" ]; then
        read -s -p "   Enter value (hidden): " value
        echo ""
    else
        read -p "   Enter value: " value
    fi
    
    if [ -z "$value" ] && [ -n "$default_value" ]; then
        value=$default_value
    fi
    
    echo "$value"
}

# Create .env.local file
echo "# Elevate for Humanity - Local Environment Variables" > .env.local
echo "# Generated on $(date)" >> .env.local
echo "" >> .env.local

# Supabase Configuration
echo "🔐 SUPABASE CONFIGURATION"
echo "========================="

SUPABASE_URL=$(prompt_for_value \
    "NEXT_PUBLIC_SUPABASE_URL" \
    "Your Supabase project URL (e.g., https://xxxxx.supabase.co)" \
    "" \
    "false")

SUPABASE_ANON_KEY=$(prompt_for_value \
    "NEXT_PUBLIC_SUPABASE_ANON_KEY" \
    "Your Supabase anonymous/public key" \
    "" \
    "true")

SUPABASE_SERVICE_KEY=$(prompt_for_value \
    "SUPABASE_SERVICE_ROLE_KEY" \
    "Your Supabase service role key (admin key)" \
    "" \
    "true")

# Write Supabase config
echo "# ==============================================================================" >> .env.local
echo "# SUPABASE CONFIGURATION" >> .env.local
echo "# ==============================================================================" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY" >> .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_KEY" >> .env.local
echo "" >> .env.local

# Site URL
echo "" >> .env.local
echo "🌐 SITE CONFIGURATION"
echo "====================="

SITE_URL=$(prompt_for_value \
    "NEXT_PUBLIC_SITE_URL" \
    "Your site URL" \
    "http://localhost:3000" \
    "false")

echo "# ==============================================================================" >> .env.local
echo "# SITE CONFIGURATION" >> .env.local
echo "# ==============================================================================" >> .env.local
echo "NEXT_PUBLIC_SITE_URL=$SITE_URL" >> .env.local
echo "" >> .env.local

# Optional: Stripe
echo ""
echo "💳 STRIPE CONFIGURATION (Optional)"
echo "=================================="
read -p "Do you want to configure Stripe? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    STRIPE_PUBLISHABLE=$(prompt_for_value \
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" \
        "Your Stripe publishable key (pk_test_...)" \
        "" \
        "false")
    
    STRIPE_SECRET=$(prompt_for_value \
        "STRIPE_SECRET_KEY" \
        "Your Stripe secret key (sk_test_...)" \
        "" \
        "true")
    
    echo "# ==============================================================================" >> .env.local
    echo "# STRIPE CONFIGURATION" >> .env.local
    echo "# ==============================================================================" >> .env.local
    echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE" >> .env.local
    echo "STRIPE_SECRET_KEY=$STRIPE_SECRET" >> .env.local
    echo "" >> .env.local
fi

# Optional: Email
echo ""
echo "📧 EMAIL CONFIGURATION (Optional)"
echo "================================="
read -p "Do you want to configure email (Resend)? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    RESEND_KEY=$(prompt_for_value \
        "RESEND_API_KEY" \
        "Your Resend API key" \
        "" \
        "true")
    
    echo "# ==============================================================================" >> .env.local
    echo "# EMAIL CONFIGURATION" >> .env.local
    echo "# ==============================================================================" >> .env.local
    echo "RESEND_API_KEY=$RESEND_KEY" >> .env.local
    echo "" >> .env.local
fi

# Add other common variables
echo "# ==============================================================================" >> .env.local
echo "# DEVELOPMENT SETTINGS" >> .env.local
echo "# ==============================================================================" >> .env.local
echo "NODE_ENV=development" >> .env.local
echo "" >> .env.local

echo ""
echo "✅ Environment setup complete!"
echo ""
echo "📄 Created: .env.local"
echo ""
echo "🔒 Security Notes:"
echo "   - .env.local is in .gitignore (won't be committed)"
echo "   - Never share your service role key"
echo "   - Use test keys for local development"
echo ""
echo "🚀 Next Steps:"
echo "   1. Verify your .env.local file"
echo "   2. Run: npm run dev"
echo "   3. Test login at http://localhost:3000/login"
echo ""
echo "📚 Documentation:"
echo "   - Supabase: https://supabase.com/docs"
echo "   - Environment Variables: See .env.example"
echo ""
