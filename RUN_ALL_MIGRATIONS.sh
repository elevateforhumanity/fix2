#!/bin/bash

echo "=== DATABASE MIGRATION SCRIPT ==="
echo ""
echo "This script will generate SQL to run all pending migrations."
echo ""

OUTPUT_FILE="ALL_MIGRATIONS_COMBINED.sql"

echo "-- COMBINED MIGRATIONS FOR SUPABASE" > $OUTPUT_FILE
echo "-- Generated: $(date)" >> $OUTPUT_FILE
echo "-- Total migrations: $(ls -1 supabase/migrations/2024*.sql | wc -l)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

for migration in supabase/migrations/2024*.sql; do
  if [ -f "$migration" ]; then
    echo "-- ============================================" >> $OUTPUT_FILE
    echo "-- Migration: $(basename $migration)" >> $OUTPUT_FILE
    echo "-- ============================================" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    cat "$migration" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
  fi
done

echo "✅ Combined all migrations into: $OUTPUT_FILE"
echo ""
echo "📋 To run in Supabase:"
echo "1. Open Supabase Dashboard"
echo "2. Go to SQL Editor"
echo "3. Copy contents of $OUTPUT_FILE"
echo "4. Paste and run"
echo ""
echo "Or run migrations individually from supabase/migrations/"

