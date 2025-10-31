#!/usr/bin/env bash
set -e

# Automated Bridge Functionality Tests
# Tests all bridge features and content injection

BRIDGE_URL="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
CONFIG_URL="https://elevateforhumanityfix2.netlify.app/api/efh-config.json"
TEST_HTML="bridge/test.html"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🧪 Durable Bridge Functionality Tests${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

TESTS_PASSED=0
TESTS_FAILED=0

# Test 1: Script Loading
echo -e "${BLUE}[1/10]${NC} Testing script loading..."
if curl -sf "$BRIDGE_URL" | grep -q "EFH Bridge"; then
  echo -e "${GREEN}✅ Script loads correctly${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}❌ Script failed to load${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 2: Configuration Loading
echo -e "${BLUE}[2/10]${NC} Testing configuration loading..."
CONFIG=$(curl -sf "$CONFIG_URL")
if echo "$CONFIG" | jq empty 2>/dev/null; then
  echo -e "${GREEN}✅ Configuration loads and parses${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}❌ Configuration failed to load${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 3: Hero Section Data
echo -e "${BLUE}[3/10]${NC} Testing hero section data..."
HERO_TITLE=$(echo "$CONFIG" | jq -r '.hero.title' 2>/dev/null)
HERO_CTA=$(echo "$CONFIG" | jq -r '.hero.ctaLabel' 2>/dev/null)

if [ -n "$HERO_TITLE" ] && [ "$HERO_TITLE" != "null" ]; then
  echo -e "${GREEN}✅ Hero section data present${NC}"
  echo "   Title: $HERO_TITLE"
  echo "   CTA: $HERO_CTA"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}❌ Hero section data missing${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 4: Programs Data
echo -e "${BLUE}[4/10]${NC} Testing programs data..."
PROGRAMS_COUNT=$(echo "$CONFIG" | jq '.programs | length' 2>/dev/null)

if [ "$PROGRAMS_COUNT" -ge 1 ]; then
  echo -e "${GREEN}✅ Programs data present ($PROGRAMS_COUNT programs)${NC}"
  
  # Test first program structure
  FIRST_PROGRAM=$(echo "$CONFIG" | jq -r '.programs[0].name' 2>/dev/null)
  echo "   First program: $FIRST_PROGRAM"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}❌ Programs data missing${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 5: Features Data
echo -e "${BLUE}[5/10]${NC} Testing features data..."
FEATURES_COUNT=$(echo "$CONFIG" | jq '.features | length' 2>/dev/null)

if [ "$FEATURES_COUNT" -ge 1 ]; then
  echo -e "${GREEN}✅ Features data present ($FEATURES_COUNT features)${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}❌ Features data missing${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 6: Testimonials Data
echo -e "${BLUE}[6/10]${NC} Testing testimonials data..."
TESTIMONIALS_COUNT=$(echo "$CONFIG" | jq '.testimonials | length' 2>/dev/null)

if [ "$TESTIMONIALS_COUNT" -ge 1 ]; then
  echo -e "${GREEN}✅ Testimonials data present ($TESTIMONIALS_COUNT testimonials)${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}❌ Testimonials data missing${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 7: CTA Data
echo -e "${BLUE}[7/10]${NC} Testing CTA data..."
CTA_TITLE=$(echo "$CONFIG" | jq -r '.cta.title' 2>/dev/null)

if [ -n "$CTA_TITLE" ] && [ "$CTA_TITLE" != "null" ]; then
  echo -e "${GREEN}✅ CTA data present${NC}"
  echo "   Title: $CTA_TITLE"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}❌ CTA data missing${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 8: Slot Injection Logic
echo -e "${BLUE}[8/10]${NC} Testing slot injection logic..."
BRIDGE_CONTENT=$(curl -sf "$BRIDGE_URL")

REQUIRED_SLOTS=("hero" "programs" "features" "testimonials" "cta")
SLOTS_OK=true

for slot in "${REQUIRED_SLOTS[@]}"; do
  if ! echo "$BRIDGE_CONTENT" | grep -q "data-efh-slot=\"$slot\""; then
    echo -e "${RED}❌ Missing slot handler: $slot${NC}"
    SLOTS_OK=false
  fi
done

if [ "$SLOTS_OK" = true ]; then
  echo -e "${GREEN}✅ All slot handlers present${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 9: XSS Protection
echo -e "${BLUE}[9/10]${NC} Testing XSS protection..."
if echo "$BRIDGE_CONTENT" | grep -q "sanitize"; then
  echo -e "${GREEN}✅ XSS protection implemented${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${YELLOW}⚠️  XSS protection not found${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 10: Error Handling
echo -e "${BLUE}[10/10]${NC} Testing error handling..."
if echo "$BRIDGE_CONTENT" | grep -q "catch"; then
  echo -e "${GREEN}✅ Error handling implemented${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${YELLOW}⚠️  Error handling not found${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Test Results${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
SUCCESS_RATE=$(echo "scale=1; $TESTS_PASSED * 100 / $TOTAL_TESTS" | bc)

echo "Total Tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo "Success Rate: ${SUCCESS_RATE}%"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed!${NC}"
  EXIT_CODE=0
else
  echo -e "${RED}❌ Some tests failed${NC}"
  EXIT_CODE=1
fi

echo ""

# Create test report
mkdir -p logs
cat > logs/durable-bridge-test-report.json << EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "total_tests": $TOTAL_TESTS,
  "passed": $TESTS_PASSED,
  "failed": $TESTS_FAILED,
  "success_rate": $SUCCESS_RATE,
  "status": "$([ $TESTS_FAILED -eq 0 ] && echo "passed" || echo "failed")"
}
EOF

echo "📝 Test report: logs/durable-bridge-test-report.json"
echo ""

# Send Zapier alert if tests failed
if [ $TESTS_FAILED -gt 0 ]; then
  if [ -x "scripts/zapier-alert.sh" ]; then
    echo -e "${YELLOW}📤 Sending alert to Zapier...${NC}"
    ./scripts/zapier-alert.sh "test_failure" \
      "Durable Bridge tests failed: $TESTS_FAILED/$TOTAL_TESTS tests failed" \
      "high"
    echo ""
  fi
fi

exit $EXIT_CODE
