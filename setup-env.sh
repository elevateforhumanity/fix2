#!/bin/bash
# Automated Environment Setup for fix2
# This script sets up .env.local by pulling from Vercel
# NO SECRETS ARE HARDCODED - everything comes from Vercel

set -e

echo "🔧 Elevate for Humanity - Environment Setup"
echo "==========================================="
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled"
        exit 0
    fi
    # Backup existing file
    cp .env.local .env.local.backup.$(date +%s)
    echo "✅ Backed up existing .env.local"
    echo ""
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    echo ""
fi

# Check if VERCEL_TOKEN is set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "🔑 Vercel Token Required"
    echo ""
    echo "You need a Vercel token to pull environment variables."
    echo ""
    echo "Option 1: Set it as environment variable (recommended for Gitpod)"
    echo "  gp env VERCEL_TOKEN='your-token-here'"
    echo ""
    echo "Option 2: Login to Vercel CLI"
    echo "  vercel login"
    echo ""
    read -p "Do you want to login now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        vercel login
    else
        echo "❌ Setup cancelled - Vercel authentication required"
        exit 1
    fi
fi

# Pull environment variables from Vercel
echo "📥 Pulling environment variables from Vercel..."
echo ""

if [ -n "$VERCEL_TOKEN" ]; then
    vercel env pull .env.local --token="$VERCEL_TOKEN" --yes
else
    vercel env pull .env.local --yes
fi

if [ ! -f .env.local ]; then
    echo "❌ Failed to create .env.local"
    exit 1
fi

echo ""
echo "✅ Environment variables pulled from Vercel!"
echo ""

# Count variables
var_count=$(grep -c "^[A-Z_]*=" .env.local || echo "0")
echo "📊 Total variables: $var_count"
echo ""

# Verify critical variables
echo "🔍 Verifying critical variables..."
critical_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "SUPABASE_SERVICE_ROLE_KEY"
    "NEXTAUTH_SECRET"
    "STRIPE_SECRET_KEY"
)

missing_vars=()
for var in "${critical_vars[@]}"; do
    if grep -q "^${var}=" .env.local && [ -n "$(grep "^${var}=" .env.local | cut -d= -f2)" ]; then
        echo "  ✅ $var"
    else
        echo "  ❌ $var (missing or empty)"
        missing_vars+=("$var")
    fi
done

echo ""

if [ ${#missing_vars[@]} -gt 0 ]; then
    echo "⚠️  WARNING: ${#missing_vars[@]} critical variables are missing!"
    echo ""
    echo "Missing variables need to be added to Vercel:"
    for var in "${missing_vars[@]}"; do
        echo "  - $var"
    done
    echo ""
    echo "Add them at: https://vercel.com/elevate-48e460c9/fix2/settings/environment-variables"
    echo ""
    echo "Or use: vercel env add $var production"
    echo ""
fi

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Review .env.local to ensure all variables are set"
echo "  2. Start development server: npm run dev"
echo "  3. If variables are missing, add them to Vercel and re-run this script"
echo ""
echo "🔒 Security reminder:"
echo "  - .env.local is gitignored (never commit it)"
echo "  - Keep your VERCEL_TOKEN secret"
echo "  - Each developer needs to run this setup in their environment"
echo ""
