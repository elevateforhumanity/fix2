#!/usr/bin/env bash
set -e

# Durable Bridge Health Check & Auto-Heal
# Monitors bridge health and automatically fixes issues

BRIDGE_URL="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
CONFIG_URL="https://elevateforhumanityfix2.netlify.app/api/efh-config.json"
HEALTH_LOG="logs/durable-bridge-health.log"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Create logs directory
mkdir -p logs

# Log function
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$HEALTH_LOG"
}

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🏥 Durable Bridge Health Check${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

ISSUES_FOUND=0
FIXES_APPLIED=0

# Test 1: Bridge Script Availability
echo -e "${BLUE}[1/8]${NC} Checking bridge script availability..."
log "INFO: Checking bridge script at $BRIDGE_URL"

if curl -sf -o /dev/null -w "%{http_code}" "$BRIDGE_URL" | grep -q "200"; then
  echo -e "${GREEN}✅ Bridge script is accessible${NC}"
  log "SUCCESS: Bridge script returned 200 OK"
else
  echo -e "${RED}❌ Bridge script is not accessible${NC}"
  log "ERROR: Bridge script failed health check"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  
  # Auto-heal: Redeploy
  echo -e "${YELLOW}🔧 Auto-healing: Redeploying bridge...${NC}"
  log "HEAL: Attempting to redeploy bridge"
  
  if ./scripts/deploy-durable-bridge.sh > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Bridge redeployed successfully${NC}"
    log "SUCCESS: Bridge redeployed"
    FIXES_APPLIED=$((FIXES_APPLIED + 1))
  else
    echo -e "${RED}❌ Failed to redeploy bridge${NC}"
    log "ERROR: Bridge redeploy failed"
  fi
fi
echo ""

# Test 2: Configuration File Availability
echo -e "${BLUE}[2/8]${NC} Checking configuration file..."
log "INFO: Checking config at $CONFIG_URL"

if curl -sf -o /dev/null -w "%{http_code}" "$CONFIG_URL" | grep -q "200"; then
  echo -e "${GREEN}✅ Configuration file is accessible${NC}"
  log "SUCCESS: Config file returned 200 OK"
else
  echo -e "${RED}❌ Configuration file is not accessible${NC}"
  log "ERROR: Config file failed health check"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi
echo ""

# Test 3: JSON Validity
echo -e "${BLUE}[3/8]${NC} Validating JSON configuration..."
log "INFO: Validating JSON structure"

CONFIG_JSON=$(curl -sf "$CONFIG_URL")
if echo "$CONFIG_JSON" | jq empty 2>/dev/null; then
  echo -e "${GREEN}✅ Configuration JSON is valid${NC}"
  log "SUCCESS: JSON validation passed"
  
  # Check required fields
  REQUIRED_FIELDS=("hero" "programs" "features" "testimonials" "cta")
  MISSING_FIELDS=()
  
  for field in "${REQUIRED_FIELDS[@]}"; do
    if ! echo "$CONFIG_JSON" | jq -e ".$field" > /dev/null 2>&1; then
      MISSING_FIELDS+=("$field")
    fi
  done
  
  if [ ${#MISSING_FIELDS[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ All required fields present${NC}"
    log "SUCCESS: All required fields found"
  else
    echo -e "${YELLOW}⚠️  Missing fields: ${MISSING_FIELDS[*]}${NC}"
    log "WARNING: Missing fields: ${MISSING_FIELDS[*]}"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
else
  echo -e "${RED}❌ Configuration JSON is invalid${NC}"
  log "ERROR: JSON validation failed"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  
  # Auto-heal: Restore from backup
  if [ -f "bridge/api/efh-config.json" ]; then
    echo -e "${YELLOW}🔧 Auto-healing: Restoring from local backup...${NC}"
    log "HEAL: Restoring config from local file"
    
    if jq empty bridge/api/efh-config.json 2>/dev/null; then
      ./scripts/deploy-durable-bridge.sh > /dev/null 2>&1
      echo -e "${GREEN}✅ Configuration restored${NC}"
      log "SUCCESS: Config restored from backup"
      FIXES_APPLIED=$((FIXES_APPLIED + 1))
    else
      echo -e "${RED}❌ Local backup is also invalid${NC}"
      log "ERROR: Local backup validation failed"
    fi
  fi
fi
echo ""

# Test 4: Content Completeness
echo -e "${BLUE}[4/8]${NC} Checking content completeness..."
log "INFO: Checking content completeness"

PROGRAMS_COUNT=$(echo "$CONFIG_JSON" | jq '.programs | length' 2>/dev/null || echo "0")
FEATURES_COUNT=$(echo "$CONFIG_JSON" | jq '.features | length' 2>/dev/null || echo "0")
TESTIMONIALS_COUNT=$(echo "$CONFIG_JSON" | jq '.testimonials | length' 2>/dev/null || echo "0")

echo "   Programs: $PROGRAMS_COUNT"
echo "   Features: $FEATURES_COUNT"
echo "   Testimonials: $TESTIMONIALS_COUNT"

if [ "$PROGRAMS_COUNT" -ge 1 ] && [ "$FEATURES_COUNT" -ge 1 ] && [ "$TESTIMONIALS_COUNT" -ge 1 ]; then
  echo -e "${GREEN}✅ Content is complete${NC}"
  log "SUCCESS: Content completeness check passed"
else
  echo -e "${YELLOW}⚠️  Content may be incomplete${NC}"
  log "WARNING: Content completeness check failed"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi
echo ""

# Test 5: Bridge Script Integrity
echo -e "${BLUE}[5/8]${NC} Checking bridge script integrity..."
log "INFO: Checking script integrity"

BRIDGE_CONTENT=$(curl -sf "$BRIDGE_URL")
EXPECTED_PATTERNS=("data-efh-slot" "efh-config.json" "EFH Bridge")

INTEGRITY_OK=true
for pattern in "${EXPECTED_PATTERNS[@]}"; do
  if ! echo "$BRIDGE_CONTENT" | grep -q "$pattern"; then
    echo -e "${RED}❌ Missing expected pattern: $pattern${NC}"
    log "ERROR: Missing pattern in bridge script: $pattern"
    INTEGRITY_OK=false
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
done

if [ "$INTEGRITY_OK" = true ]; then
  echo -e "${GREEN}✅ Bridge script integrity verified${NC}"
  log "SUCCESS: Script integrity check passed"
fi
echo ""

# Test 6: CORS Headers
echo -e "${BLUE}[6/8]${NC} Checking CORS headers..."
log "INFO: Checking CORS configuration"

CORS_HEADER=$(curl -sf -I "$BRIDGE_URL" | grep -i "access-control-allow-origin" || echo "")

if [ -n "$CORS_HEADER" ]; then
  echo -e "${GREEN}✅ CORS headers configured${NC}"
  log "SUCCESS: CORS headers present"
else
  echo -e "${YELLOW}⚠️  CORS headers not found${NC}"
  log "WARNING: CORS headers missing"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi
echo ""

# Test 7: Response Time
echo -e "${BLUE}[7/8]${NC} Checking response time..."
log "INFO: Measuring response time"

RESPONSE_TIME=$(curl -sf -o /dev/null -w "%{time_total}" "$BRIDGE_URL")
RESPONSE_MS=$(echo "$RESPONSE_TIME * 1000" | bc)

echo "   Response time: ${RESPONSE_MS}ms"

if (( $(echo "$RESPONSE_TIME < 2.0" | bc -l) )); then
  echo -e "${GREEN}✅ Response time is good${NC}"
  log "SUCCESS: Response time ${RESPONSE_MS}ms"
else
  echo -e "${YELLOW}⚠️  Response time is slow${NC}"
  log "WARNING: Slow response time ${RESPONSE_MS}ms"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi
echo ""

# Test 8: Local Files Sync
echo -e "${BLUE}[8/8]${NC} Checking local files sync..."
log "INFO: Checking local file sync"

if [ -f "bridge/public/efh-bridge.js" ] && [ -f "bridge/api/efh-config.json" ]; then
  if [ -f "public/efh-bridge.js" ] && [ -f "public/api/efh-config.json" ]; then
    echo -e "${GREEN}✅ Local files are synced${NC}"
    log "SUCCESS: Local files in sync"
  else
    echo -e "${YELLOW}⚠️  Local files not synced to public/${NC}"
    log "WARNING: Files not synced to public/"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
    
    # Auto-heal: Copy files
    echo -e "${YELLOW}🔧 Auto-healing: Syncing files...${NC}"
    log "HEAL: Copying files to public/"
    
    mkdir -p public/api
    cp -f bridge/public/efh-bridge.js public/
    cp -f bridge/api/efh-config.json public/api/
    
    echo -e "${GREEN}✅ Files synced${NC}"
    log "SUCCESS: Files synced to public/"
    FIXES_APPLIED=$((FIXES_APPLIED + 1))
  fi
else
  echo -e "${RED}❌ Bridge source files missing${NC}"
  log "ERROR: Bridge source files not found"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi
echo ""

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Health Check Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ $ISSUES_FOUND -eq 0 ]; then
  echo -e "${GREEN}✅ All checks passed! Bridge is healthy.${NC}"
  log "SUCCESS: All health checks passed"
  EXIT_CODE=0
else
  echo -e "${YELLOW}⚠️  Found $ISSUES_FOUND issue(s)${NC}"
  log "WARNING: Found $ISSUES_FOUND issues"
  
  if [ $FIXES_APPLIED -gt 0 ]; then
    echo -e "${GREEN}🔧 Applied $FIXES_APPLIED fix(es) automatically${NC}"
    log "SUCCESS: Applied $FIXES_APPLIED fixes"
  fi
  
  EXIT_CODE=1
fi

echo ""
echo "📝 Full log: $HEALTH_LOG"
echo ""

# Create status file for monitoring
cat > logs/durable-bridge-status.json << EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "status": "$([ $ISSUES_FOUND -eq 0 ] && echo "healthy" || echo "degraded")",
  "issues_found": $ISSUES_FOUND,
  "fixes_applied": $FIXES_APPLIED,
  "bridge_url": "$BRIDGE_URL",
  "config_url": "$CONFIG_URL",
  "programs_count": $PROGRAMS_COUNT,
  "features_count": $FEATURES_COUNT,
  "testimonials_count": $TESTIMONIALS_COUNT,
  "response_time_ms": $RESPONSE_MS
}
EOF

log "INFO: Status file created at logs/durable-bridge-status.json"

# Send Zapier alert if issues found and not all fixed
if [ $ISSUES_FOUND -gt 0 ] && [ $FIXES_APPLIED -lt $ISSUES_FOUND ]; then
  if [ -x "scripts/zapier-alert.sh" ]; then
    echo ""
    echo -e "${YELLOW}📤 Sending alert to Zapier...${NC}"
    ./scripts/zapier-alert.sh "health_check_failed" \
      "Durable Bridge health check found $ISSUES_FOUND issue(s), only $FIXES_APPLIED fixed" \
      "high"
  fi
fi

exit $EXIT_CODE
