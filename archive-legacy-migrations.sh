#!/bin/bash

echo "📦 Archiving legacy migration files..."

# Create archive directory
mkdir -p supabase/migrations/archive-legacy

# Move all old migrations except our new ones
find supabase/migrations -maxdepth 1 -name "*.sql" \
  ! -name "20251227_fix_schema_mismatches.sql" \
  ! -name "20251227_create_migration_tracking.sql" \
  -exec mv {} supabase/migrations/archive-legacy/ \;

# Count archived files
ARCHIVED=$(ls supabase/migrations/archive-legacy/*.sql 2>/dev/null | wc -l)
REMAINING=$(ls supabase/migrations/*.sql 2>/dev/null | wc -l)

echo "✅ Archived $ARCHIVED legacy migration files"
echo "✅ $REMAINING active migration files remain"
echo ""
echo "Active migrations:"
ls -1 supabase/migrations/*.sql 2>/dev/null || echo "  (none)"

