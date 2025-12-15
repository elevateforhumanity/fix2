#!/bin/bash

# Update .env.local with real Supabase credentials from environment variables

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ] || [ -z "$SUPABASE_SERVICE_KEY" ]; then
    echo "❌ Error: Required environment variables not set"
    echo ""
    echo "Please set:"
    echo "  export SUPABASE_URL='https://your-project.supabase.co'"
    echo "  export SUPABASE_ANON_KEY='your-anon-key'"
    echo "  export SUPABASE_SERVICE_KEY='your-service-role-key'"
    exit 1
fi

echo "🔄 Updating .env.local with real credentials..."

# Backup original
cp .env.local .env.local.backup

# Replace placeholders
sed -i "s|NEXT_PUBLIC_SUPABASE_URL=.*|NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL|g" .env.local
sed -i "s|NEXT_PUBLIC_SUPABASE_ANON_KEY=.*|NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY|g" .env.local
sed -i "s|SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_KEY|g" .env.local

echo "✅ Updated .env.local"
echo ""
echo "📋 New values:"
grep "SUPABASE" .env.local
echo ""
echo "💾 Backup saved to: .env.local.backup"
echo ""
echo "Next steps:"
echo "1. Run migration: node run-migration.js"
echo "2. Test locally: npm run dev"
echo "3. Update Vercel env vars: vercel env pull"
