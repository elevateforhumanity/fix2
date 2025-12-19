#!/bin/bash

# =====================================================
# ELEVATE FOR HUMANITY - SAME-DAY DEPLOYMENT SCRIPT
# =====================================================
# This script runs all migrations in the correct order
# and verifies the system is ready to launch
# =====================================================

set -e  # Exit on any error

echo "🚀 ELEVATE FOR HUMANITY - SAME-DAY DEPLOYMENT"
echo "=============================================="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set"
    echo "Please set it with: export DATABASE_URL='your_supabase_connection_string'"
    exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Function to run migration
run_migration() {
    local migration_file=$1
    local migration_name=$2
    
    echo "📦 Running: $migration_name"
    echo "   File: $migration_file"
    
    if psql "$DATABASE_URL" -f "$migration_file" > /dev/null 2>&1; then
        echo "   ✅ Success"
    else
        echo "   ❌ Failed"
        echo "   Check the error above and fix before continuing"
        exit 1
    fi
    echo ""
}

# Change to supabase directory
cd supabase/migrations || {
    echo "❌ ERROR: supabase/migrations directory not found"
    exit 1
}

echo "📂 Found migrations directory"
echo ""

# Run migrations in order
echo "🔄 STEP 1: SECURITY LOCKDOWN"
echo "----------------------------"
run_migration "20241219_global_rls_lockdown.sql" "Global RLS Lockdown"

echo "🔄 STEP 2: ONBOARDING SYSTEM"
echo "----------------------------"
run_migration "20241219_onboarding_payroll_system.sql" "Onboarding + Payroll System"
run_migration "20241219_seed_onboarding_packets.sql" "Seed Onboarding Packets"

echo "🔄 STEP 3: PARTNER MONITORING"
echo "----------------------------"
run_migration "20241219_partner_monitoring_system.sql" "Partner Monitoring System"

echo "🔄 STEP 4: COMPLIANCE TRACKING"
echo "----------------------------"
run_migration "20241219_weekly_hours_compliance.sql" "Weekly Hours Compliance"
run_migration "20241219_schedule_policies_system.sql" "Schedule Policies System"

echo ""
echo "=============================================="
echo "✅ ALL MIGRATIONS COMPLETED SUCCESSFULLY"
echo "=============================================="
echo ""

# Verify RLS is enabled
echo "🔍 VERIFYING SECURITY..."
echo ""

UNPROTECTED_TABLES=$(psql "$DATABASE_URL" -t -c "
SELECT COUNT(*)
FROM pg_tables t
WHERE schemaname = 'public'
  AND tablename NOT LIKE 'pg_%'
  AND tablename NOT LIKE 'sql_%'
  AND NOT EXISTS (
    SELECT 1 FROM pg_class c
    WHERE c.relname = t.tablename
      AND c.relrowsecurity = true
  );
")

if [ "$UNPROTECTED_TABLES" -eq 0 ]; then
    echo "✅ All tables have RLS enabled"
else
    echo "⚠️  WARNING: $UNPROTECTED_TABLES tables do not have RLS enabled"
fi

# Count policies
POLICY_COUNT=$(psql "$DATABASE_URL" -t -c "
SELECT COUNT(*)
FROM pg_policies
WHERE schemaname = 'public';
")

echo "✅ $POLICY_COUNT RLS policies created"
echo ""

# Verify schedule policies
SCHEDULE_POLICIES=$(psql "$DATABASE_URL" -t -c "
SELECT COUNT(*)
FROM schedule_policies
WHERE is_active = true;
")

echo "✅ $SCHEDULE_POLICIES schedule policies available"
echo ""

# Verify onboarding packets
ONBOARDING_PACKETS=$(psql "$DATABASE_URL" -t -c "
SELECT COUNT(*)
FROM onboarding_packets
WHERE is_active = true;
")

echo "✅ $ONBOARDING_PACKETS onboarding packets created"
echo ""

echo "=============================================="
echo "🎉 DEPLOYMENT COMPLETE - READY TO LAUNCH"
echo "=============================================="
echo ""
echo "Next steps:"
echo "1. Deploy to Vercel: git push origin main"
echo "2. Test partner onboarding: /partners/join"
echo "3. Test student application: /apply"
echo "4. Verify cron jobs in Vercel dashboard"
echo ""
echo "🚀 YOU CAN LAUNCH TODAY"
echo ""
