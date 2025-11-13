#!/bin/bash
# SMOKE TEST - Verify all critical pages work

DOMAIN="${1:-http://localhost:3000}"

echo "🔥 SMOKE TEST STARTING"
echo "======================"
echo "Domain: $DOMAIN"
echo ""

PASSED=0
FAILED=0

test_page() {
  local name=$1
  local url=$2
  local expected=${3:-200}
  
  echo -n "Testing $name... "
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN$url" 2>/dev/null || echo "000")
  
  if [ "$STATUS" = "$expected" ]; then
    echo "✅ OK ($STATUS)"
    ((PASSED++))
  else
    echo "❌ FAILED (got $STATUS, expected $expected)"
    ((FAILED++))
  fi
}

# Public Pages
echo "📄 PUBLIC PAGES"
test_page "Homepage" "/"
test_page "Login" "/login"
test_page "Signup" "/signup"
test_page "Programs" "/programs"
test_page "About" "/about"
test_page "Contact" "/contact"
test_page "Pricing" "/pricing"
echo ""

# Student Portal (will redirect if not logged in)
echo "🎓 STUDENT PORTAL"
test_page "LMS Dashboard" "/lms/dashboard" "307"
test_page "Courses" "/lms/courses" "307"
test_page "Messages" "/lms/messages" "307"
test_page "Assignments" "/lms/assignments" "307"
test_page "Certificates" "/lms/certificates" "307"
echo ""

# Partner Portal
echo "🏢 PARTNER PORTAL"
test_page "Partner Apply" "/program-holder/apply"
test_page "Partner Dashboard" "/program-holder/dashboard" "307"
echo ""

# Admin Portal
echo "👨‍💼 ADMIN PORTAL"
test_page "Admin Dashboard" "/admin/dashboard" "307"
test_page "Admin Certificates" "/admin/certificates" "307"
echo ""

# API Endpoints
echo "🔌 API ENDPOINTS"
test_page "Health Check" "/api/health"
echo ""

# Summary
echo "📊 RESULTS"
echo "=========="
echo "Passed: $PASSED"
echo "Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
  echo "🎉 ALL TESTS PASSED!"
  exit 0
else
  echo "⚠️  SOME TESTS FAILED"
  exit 1
fi
