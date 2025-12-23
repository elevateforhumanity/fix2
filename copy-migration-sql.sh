#!/bin/bash

# Copy Migration SQL to Clipboard (for manual application)

echo "📋 Program Holder Verification Migration SQL"
echo "=============================================="
echo ""
echo "Copy the SQL below and paste it into your Supabase SQL Editor:"
echo ""
echo "1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql"
echo "2. Click 'New Query'"
echo "3. Paste the SQL below"
echo "4. Click 'Run'"
echo ""
echo "=============================================="
echo ""

cat supabase/migrations/20241223_program_holder_verification.sql

echo ""
echo "=============================================="
echo "✅ SQL displayed above"
echo ""
echo "After applying, verify with:"
echo ""
echo "SELECT table_name FROM information_schema.tables"
echo "WHERE table_schema = 'public'"
echo "AND table_name LIKE 'program_holder%';"
