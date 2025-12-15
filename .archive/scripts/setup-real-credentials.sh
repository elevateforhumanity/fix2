#!/bin/bash

# Setup Real Supabase Credentials
# This script helps you replace placeholder values with real Supabase credentials

echo "🔧 Supabase Credentials Setup"
echo "=============================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found!"
    exit 1
fi

# Check current values
echo "📋 Current values in .env.local:"
echo ""
grep "SUPABASE" .env.local
echo ""

# Check if placeholders exist
if grep -q "placeholder" .env.local; then
    echo "⚠️  Found placeholder values that need to be replaced"
    echo ""
    echo "To get your real Supabase credentials:"
    echo ""
    echo "1. Go to https://app.supabase.com"
    echo "2. Select your project (or create one)"
    echo "3. Go to Settings → API"
    echo "4. Copy these values:"
    echo "   - Project URL (e.g., https://abcdefgh.supabase.co)"
    echo "   - anon/public key"
    echo "   - service_role key (⚠️  Keep this secret!)"
    echo ""
    echo "Then run:"
    echo ""
    echo "  export SUPABASE_URL='https://your-project.supabase.co'"
    echo "  export SUPABASE_ANON_KEY='your-anon-key'"
    echo "  export SUPABASE_SERVICE_KEY='your-service-role-key'"
    echo ""
    echo "  ./update-env.sh"
    echo ""
else
    echo "✅ No placeholders found - credentials look good!"
    echo ""
    echo "Next steps:"
    echo "1. Run the migration: node run-migration.js"
    echo "2. Test the LMS: npm run dev"
fi
