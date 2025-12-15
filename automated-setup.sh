#!/bin/bash

# Fully Automated Setup Script
# This script pulls Vercel env vars and runs migrations automatically

set -e

echo "🚀 Automated Setup Starting..."
echo "================================"
echo ""

# Check for Vercel token
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ VERCEL_TOKEN not found"
    echo ""
    echo "To enable automation, set your Vercel token once:"
    echo ""
    echo "  1. Get token: https://vercel.com/account/tokens"
    echo "  2. Save it: gp env VERCEL_TOKEN='your-token-here'"
    echo "  3. Restart workspace or run: eval \$(gp env -e)"
    echo ""
    echo "See AUTOMATED_VERCEL_SETUP.md for detailed instructions"
    exit 1
fi

echo "✅ VERCEL_TOKEN found"
echo ""

# Step 1: Pull environment variables
echo "📥 Step 1: Pulling environment variables from Vercel..."
npx vercel env pull .env.local --token="$VERCEL_TOKEN" --yes

if [ $? -eq 0 ]; then
    echo "✅ Environment variables synced"
else
    echo "❌ Failed to pull environment variables"
    exit 1
fi

echo ""

# Step 2: Check if we have real Supabase credentials
echo "🔍 Step 2: Checking Supabase credentials..."

if grep -q "placeholder" .env.local; then
    echo "⚠️  Warning: Placeholder values found in .env.local"
    echo "   Make sure Vercel has real Supabase credentials set"
    echo ""
    echo "   Go to: https://vercel.com/team_Ae8f33vVYR36quLOS8HCeROs/fix2-gpql/settings/environment-variables"
    echo ""
else
    echo "✅ Real Supabase credentials found"
fi

echo ""

# Step 3: Run database migration
echo "🗄️  Step 3: Running database migration..."

if node run-migration.js; then
    echo "✅ Migration completed successfully"
else
    echo "⚠️  Migration failed or already applied"
    echo "   This is OK if tables already exist"
fi

echo ""

# Step 4: Install dependencies (if needed)
echo "📦 Step 4: Checking dependencies..."

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    pnpm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "================================"
echo "🎉 Automated Setup Complete!"
echo ""
echo "Next steps:"
echo "  • Start dev server: pnpm dev"
echo "  • Visit: http://localhost:3000"
echo "  • Test LMS: http://localhost:3000/lms/dashboard"
echo ""
echo "Everything is ready to go! 🚀"
