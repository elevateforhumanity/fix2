#!/bin/bash
# ============================================================================
# RUN SEEDING SCRIPT
# This will populate all programs with modules and lessons
# ============================================================================

echo "🌱 Starting course seeding..."
echo ""

# Check if environment variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_URL is not set"
  echo ""
  echo "Please set your Supabase URL:"
  echo 'export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"'
  echo ""
  exit 1
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "❌ SUPABASE_SERVICE_ROLE_KEY is not set"
  echo ""
  echo "Please set your Supabase Service Role Key:"
  echo 'export SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."'
  echo ""
  exit 1
fi

echo "✅ Environment variables are set"
echo "📊 Supabase URL: $NEXT_PUBLIC_SUPABASE_URL"
echo ""

# Run the seeding script
cd /workspaces/fix2
npx ts-node scripts/seed-courses.ts

echo ""
echo "🎉 Seeding complete!"
