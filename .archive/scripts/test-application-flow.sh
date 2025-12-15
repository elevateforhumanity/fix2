#!/usr/bin/env bash
set -euo pipefail

echo "==================================================================="
echo "🧪 APPLICATION FLOW TEST"
echo "==================================================================="
echo ""

# Test 1: Check if apply page exists
echo "✅ Test 1: Checking if /apply page exists..."
if [ -f "app/apply/page.tsx" ]; then
  echo "   ✅ app/apply/page.tsx exists"
else
  echo "   ❌ app/apply/page.tsx NOT FOUND"
  exit 1
fi

# Test 2: Check if API route exists
echo ""
echo "✅ Test 2: Checking if application API route exists..."
if [ -f "app/api/application/route.ts" ]; then
  echo "   ✅ app/api/application/route.ts exists"
  echo "   📄 Checking API route structure..."
  grep -q "export async function POST" app/api/application/route.ts && echo "   ✅ POST handler found" || echo "   ❌ POST handler missing"
  grep -q "createClient" app/api/application/route.ts && echo "   ✅ Supabase client usage found" || echo "   ❌ Supabase client missing"
else
  echo "   ❌ app/api/application/route.ts NOT FOUND"
fi

# Test 3: Check EnrollmentProcess component
echo ""
echo "✅ Test 3: Checking EnrollmentProcess component..."
if [ -f "components/EnrollmentProcess.tsx" ]; then
  echo "   ✅ components/EnrollmentProcess.tsx exists"
  grep -q "handleSubmit\|onSubmit" components/EnrollmentProcess.tsx && echo "   ✅ Form submission handler found" || echo "   ⚠️  Form submission handler not obvious"
else
  echo "   ❌ components/EnrollmentProcess.tsx NOT FOUND"
fi

# Test 4: Check for Supabase configuration
echo ""
echo "✅ Test 4: Checking Supabase configuration..."
if [ -f "lib/supabase/server.ts" ]; then
  echo "   ✅ lib/supabase/server.ts exists"
else
  echo "   ❌ lib/supabase/server.ts NOT FOUND"
fi

if [ -f "lib/supabase/client.ts" ]; then
  echo "   ✅ lib/supabase/client.ts exists"
else
  echo "   ❌ lib/supabase/client.ts NOT FOUND"
fi

# Test 5: Check for required database tables (from schema if available)
echo ""
echo "✅ Test 5: Checking for database schema files..."
if [ -d "supabase/migrations" ]; then
  echo "   ✅ supabase/migrations directory exists"
  migration_count=$(find supabase/migrations -name "*.sql" | wc -l)
  echo "   📊 Found $migration_count migration files"
else
  echo "   ⚠️  No supabase/migrations directory found"
fi

# Test 6: Check email configuration
echo ""
echo "✅ Test 6: Checking email notification setup..."
grep -r "elevate4humanityedu@gmail.com" app/api/ 2>/dev/null | head -3 && echo "   ✅ Email recipient configured" || echo "   ⚠️  Email recipient not found in API routes"

echo ""
echo "==================================================================="
echo "📋 SUMMARY"
echo "==================================================================="
echo ""
echo "Application Flow Components:"
echo "  1. Apply Page (UI) → app/apply/page.tsx"
echo "  2. Enrollment Form → components/EnrollmentProcess.tsx"
echo "  3. API Handler → app/api/application/route.ts"
echo "  4. Database → Supabase (via lib/supabase/)"
echo "  5. Email → elevate4humanityedu@gmail.com"
echo ""
echo "⚠️  IMPORTANT: For the application to work, you need:"
echo "   1. Environment variables set (SUPABASE_URL, SUPABASE_ANON_KEY, etc.)"
echo "   2. Supabase database tables created (applications, students, etc.)"
echo "   3. Email service configured (Resend, SendGrid, or SMTP)"
echo ""
echo "🧪 To test manually:"
echo "   1. Go to https://www.elevateforhumanity.org/apply"
echo "   2. Fill out the form"
echo "   3. Submit"
echo "   4. Check Supabase database for new record"
echo "   5. Check email inbox for notification"
echo ""
