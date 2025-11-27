#!/bin/bash

echo "🔥 SMOKE TEST - Testing Live Site"
echo "=================================="
echo ""

SITE="https://www.elevateforhumanity.org"
PASS=0
FAIL=0

test_page() {
  local path=$1
  local name=$2
  echo -n "Testing $name ($path)... "
  
  response=$(curl -s -o /dev/null -w "%{http_code}" -L "$SITE$path" --max-time 10)
  
  if [ "$response" = "200" ]; then
    echo "✅ PASS (200 OK)"
    ((PASS++))
  else
    echo "❌ FAIL (HTTP $response)"
    ((FAIL++))
  fi
}

echo "📄 CRITICAL PAGES:"
test_page "/" "Homepage"
test_page "/apply" "Apply Page"
test_page "/programs" "Programs Page"
test_page "/about" "About Page"
test_page "/contact" "Contact Page"

echo ""
echo "🔗 NAVIGATION PAGES:"
test_page "/employers" "Employers Page"
test_page "/funding" "Funding Page"
test_page "/lms" "LMS Page"

echo ""
echo "📋 LEGAL PAGES:"
test_page "/privacy" "Privacy Policy"
test_page "/terms" "Terms of Service"
test_page "/refunds" "Refund Policy"

echo ""
echo "🔀 REDIRECTS:"
test_page "/student-portal" "Student Portal Redirect"
test_page "/staff-portal" "Staff Portal Redirect"

echo ""
echo "🎓 SAMPLE PROGRAM PAGES:"
test_page "/programs/cna" "CNA Program"
test_page "/programs/barber-apprenticeship" "Barber Program"
test_page "/programs/hvac-tech" "HVAC Program"

echo ""
echo "=================================="
echo "📊 RESULTS:"
echo "✅ Passed: $PASS"
echo "❌ Failed: $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
  echo "🎉 ALL TESTS PASSED! Site is healthy."
  exit 0
else
  echo "⚠️  Some tests failed. Check errors above."
  exit 1
fi
