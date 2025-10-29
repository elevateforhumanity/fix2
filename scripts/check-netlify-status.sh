#!/bin/bash
# Check Netlify Configuration Status

set -euo pipefail

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
API_BASE="https://api.netlify.com/api/v1"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "\n${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}${BOLD}  Netlify Configuration Status Check${NC}"
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}\n"

# Check auth
if [ -z "${NETLIFY_AUTH_TOKEN:-}" ]; then
    echo -e "${RED}✖ NETLIFY_AUTH_TOKEN not set${NC}"
    echo ""
    echo "To check configuration, you need a Netlify auth token:"
    echo "1. Get token: https://app.netlify.com/user/applications#personal-access-tokens"
    echo "2. Set token: export NETLIFY_AUTH_TOKEN='your_token'"
    echo "3. Re-run this script"
    echo ""
    echo "Or check manually:"
    echo "  Dashboard: https://app.netlify.com/sites/$SITE_ID"
    echo "  Settings: https://app.netlify.com/sites/$SITE_ID/settings"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ Auth token found${NC}\n"

# Get site info
echo -e "${BOLD}Fetching site information...${NC}"
site_info=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "$API_BASE/sites/$SITE_ID")

if echo "$site_info" | grep -q '"name"'; then
    site_name=$(echo "$site_info" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
    site_url=$(echo "$site_info" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    echo -e "${GREEN}✓ Site: $site_name${NC}"
    echo -e "${GREEN}✓ URL: $site_url${NC}"
else
    echo -e "${RED}✖ Failed to fetch site info${NC}"
    exit 1
fi

# Check environment variables
echo -e "\n${BOLD}Checking environment variables...${NC}"
env_vars=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "$API_BASE/accounts/sites/$SITE_ID/env" 2>/dev/null || echo "[]")

env_count=$(echo "$env_vars" | grep -o '"key"' | wc -l)

if [ "$env_count" -gt 0 ]; then
    echo -e "${GREEN}✓ Environment variables: $env_count configured${NC}"
    
    # Check for key variables
    required_vars=("AUTOPILOT_MODE" "VITE_SUPABASE_URL" "NODE_VERSION")
    for var in "${required_vars[@]}"; do
        if echo "$env_vars" | grep -q "\"$var\""; then
            echo -e "  ${GREEN}✓${NC} $var"
        else
            echo -e "  ${YELLOW}⚠${NC} $var (not found)"
        fi
    done
else
    echo -e "${YELLOW}⚠ No environment variables configured${NC}"
fi

# Check build hooks
echo -e "\n${BOLD}Checking build hooks...${NC}"
hooks=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "$API_BASE/sites/$SITE_ID/build_hooks")

hooks_count=$(echo "$hooks" | grep -o '"title"' | wc -l)

if [ "$hooks_count" -gt 0 ]; then
    echo -e "${GREEN}✓ Build hooks: $hooks_count configured${NC}"
    
    # List hooks
    echo "$hooks" | grep -o '"title":"[^"]*"' | cut -d'"' -f4 | while read -r hook; do
        echo -e "  ${GREEN}✓${NC} $hook"
    done
else
    echo -e "${YELLOW}⚠ No build hooks configured${NC}"
fi

# Check notifications
echo -e "\n${BOLD}Checking deploy notifications...${NC}"
notifications=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "$API_BASE/sites/$SITE_ID/notifications")

notif_count=$(echo "$notifications" | grep -o '"event"' | wc -l)

if [ "$notif_count" -gt 0 ]; then
    echo -e "${GREEN}✓ Notifications: $notif_count configured${NC}"
else
    echo -e "${YELLOW}⚠ No notifications configured${NC}"
fi

# Check build settings
echo -e "\n${BOLD}Checking build settings...${NC}"
if echo "$site_info" | grep -q '"build_settings"'; then
    echo -e "${GREEN}✓ Build settings configured${NC}"
    
    # Extract build command
    build_cmd=$(echo "$site_info" | grep -o '"cmd":"[^"]*"' | head -1 | cut -d'"' -f4)
    if [ -n "$build_cmd" ]; then
        echo -e "  ${GREEN}✓${NC} Build command: $build_cmd"
    fi
    
    # Extract publish dir
    publish_dir=$(echo "$site_info" | grep -o '"dir":"[^"]*"' | head -1 | cut -d'"' -f4)
    if [ -n "$publish_dir" ]; then
        echo -e "  ${GREEN}✓${NC} Publish directory: $publish_dir"
    fi
else
    echo -e "${YELLOW}⚠ Build settings not found${NC}"
fi

# Check recent deploys
echo -e "\n${BOLD}Checking recent deploys...${NC}"
deploys=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "$API_BASE/sites/$SITE_ID/deploys?per_page=5")

if echo "$deploys" | grep -q '"state"'; then
    latest_state=$(echo "$deploys" | grep -o '"state":"[^"]*"' | head -1 | cut -d'"' -f4)
    latest_time=$(echo "$deploys" | grep -o '"created_at":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [ "$latest_state" = "ready" ]; then
        echo -e "${GREEN}✓ Latest deploy: $latest_state${NC}"
    else
        echo -e "${YELLOW}⚠ Latest deploy: $latest_state${NC}"
    fi
    echo -e "  Time: $latest_time"
else
    echo -e "${YELLOW}⚠ No deploys found${NC}"
fi

# Summary
echo -e "\n${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}${BOLD}  Configuration Summary${NC}"
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}\n"

total_checks=5
passed_checks=0

[ "$env_count" -gt 0 ] && ((passed_checks++))
[ "$hooks_count" -gt 0 ] && ((passed_checks++))
[ "$notif_count" -gt 0 ] && ((passed_checks++))
echo "$site_info" | grep -q '"build_settings"' && ((passed_checks++))
[ "$latest_state" = "ready" ] && ((passed_checks++))

echo "Checks passed: $passed_checks/$total_checks"
echo ""

if [ "$passed_checks" -eq "$total_checks" ]; then
    echo -e "${GREEN}${BOLD}✅ All checks passed - Netlify is fully configured!${NC}"
elif [ "$passed_checks" -ge 3 ]; then
    echo -e "${YELLOW}${BOLD}⚠️  Partially configured - some items need attention${NC}"
    echo ""
    echo "Run configuration script:"
    echo "  bash scripts/autopilot-netlify-zero-touch.sh"
else
    echo -e "${RED}${BOLD}❌ Configuration incomplete${NC}"
    echo ""
    echo "Run configuration script:"
    echo "  export NETLIFY_AUTH_TOKEN='your_token'"
    echo "  bash scripts/autopilot-netlify-zero-touch.sh"
fi

echo ""
echo "Dashboard: https://app.netlify.com/sites/$SITE_ID"
echo "Settings: https://app.netlify.com/sites/$SITE_ID/settings"
echo ""
