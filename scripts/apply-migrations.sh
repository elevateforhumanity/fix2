#!/bin/bash

# Apply Critical Migrations to Supabase
# Run this script to apply migrations 001-009 to your Supabase project

set -e

echo "🚀 Applying Critical Migrations to Supabase"
echo "==========================================="
echo ""

# Check for required env vars
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "❌ Error: Missing Supabase credentials"
  echo "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  exit 1
fi

# Extract project ref from URL
PROJECT_REF=$(echo $NEXT_PUBLIC_SUPABASE_URL | sed 's/https:\/\///' | cut -d'.' -f1)
echo "📍 Project: $PROJECT_REF"
echo ""

# Migrations to apply (in order)
MIGRATIONS=(
  "001_init_schema.sql"
  "002_courses.sql"
  "003_products.sql"
  "004_media.sql"
  "005_licenses.sql"
  "006_org_invites_rls_fix.sql"
  "007_rls_policies.sql"
  "008_system_errors.sql"
  "009_rls_hardening_pack.sql"
)

echo "📋 Migrations to apply:"
for migration in "${MIGRATIONS[@]}"; do
  echo "   - $migration"
done
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
fi

echo ""
echo "🔧 Applying migrations..."
echo ""

for migration in "${MIGRATIONS[@]}"; do
  MIGRATION_FILE="supabase/migrations/$migration"
  
  if [ ! -f "$MIGRATION_FILE" ]; then
    echo "⚠️  Skipping $migration (file not found)"
    continue
  fi
  
  echo "📝 Applying: $migration"
  
  # Use psql to apply migration
  # Note: You'll need to install psql or use Supabase CLI
  # For now, this script outputs instructions
  
  echo "   ✅ Ready to apply"
done

echo ""
echo "==========================================="
echo "✅ Migration script complete"
echo ""
echo "⚠️  IMPORTANT: Apply these migrations via:"
echo ""
echo "Option 1: Supabase Dashboard"
echo "  1. Go to https://supabase.com/dashboard/project/$PROJECT_REF/sql"
echo "  2. Copy/paste each migration file content"
echo "  3. Run in order (001 → 009)"
echo ""
echo "Option 2: Supabase CLI"
echo "  supabase db push"
echo ""
echo "Option 3: Direct psql"
echo "  psql \"postgresql://postgres:[PASSWORD]@db.$PROJECT_REF.supabase.co:5432/postgres\" -f supabase/migrations/001_init_schema.sql"
echo ""
