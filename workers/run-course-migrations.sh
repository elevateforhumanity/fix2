#!/bin/bash

# Course Migration Runner
# Runs database migrations to activate 17 courses + 16 programs

set -e

echo "🚀 Elevate for Humanity - Course Migration Runner"
echo "=================================================="
echo ""

# Check for Supabase credentials
if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ Error: SUPABASE_SERVICE_ROLE_KEY not set"
    echo ""
    echo "Please set environment variable:"
    echo "  export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'"
    echo ""
    exit 1
fi

SUPABASE_URL="https://cuxzzpsyufcewtmicszk.supabase.co"
MIGRATION_FILE="supabase/COMPLETE_MIGRATION.sql"

echo "📍 Supabase URL: $SUPABASE_URL"
echo "📄 Migration File: $MIGRATION_FILE"
echo ""

# Check if migration file exists
if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Error: Migration file not found: $MIGRATION_FILE"
    exit 1
fi

echo "📊 Migration will create:"
echo "   - 16 Programs"
echo "   - 17 Courses"
echo "   - 50+ Modules"
echo ""

# Read the SQL file
SQL_CONTENT=$(cat "$MIGRATION_FILE")

# Run migration using Supabase REST API
echo "🔄 Running migration..."
echo ""

RESPONSE=$(curl -s -X POST \
  "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"sql\": $(echo "$SQL_CONTENT" | jq -Rs .)}")

# Check response
if echo "$RESPONSE" | grep -q "error"; then
    echo "❌ Migration failed:"
    echo "$RESPONSE" | jq .
    exit 1
else
    echo "✅ Migration completed successfully!"
    echo ""
    
    # Verify data
    echo "🔍 Verifying data..."
    
    # Check programs count
    PROGRAMS_COUNT=$(curl -s -X GET \
      "${SUPABASE_URL}/rest/v1/programs?select=count" \
      -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
      -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
      -H "Prefer: count=exact")
    
    # Check courses count
    COURSES_COUNT=$(curl -s -X GET \
      "${SUPABASE_URL}/rest/v1/courses?select=count" \
      -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
      -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
      -H "Prefer: count=exact")
    
    echo "✅ Programs: $PROGRAMS_COUNT"
    echo "✅ Courses: $COURSES_COUNT"
    echo ""
    echo "🎉 Migration complete!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Visit: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses"
    echo "   2. Blue banner should be gone"
    echo "   3. See 17 courses from database"
    echo "   4. Test enrollment functionality"
fi
