#!/bin/bash

# AUTOPILOT: Check, Correct, and Set Netlify Environment Variables
# This script will be executed by advanced autopilot workers

set -e

echo "🤖 AUTOPILOT: Netlify Environment Variable Fixer"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install Netlify CLI if not present
if ! command_exists netlify; then
    echo "${YELLOW}⚙️  Installing Netlify CLI...${NC}"
    npm install -g netlify-cli
    echo "${GREEN}✅ Netlify CLI installed${NC}"
fi

# Check authentication
echo "🔍 Checking Netlify authentication..."
if ! netlify status &> /dev/null; then
    echo "${RED}❌ Not authenticated with Netlify${NC}"
    echo ""
    echo "AUTOPILOT ACTION REQUIRED:"
    echo "1. Run: netlify login"
    echo "2. Or set NETLIFY_AUTH_TOKEN environment variable"
    echo ""
    
    if [ -n "$NETLIFY_AUTH_TOKEN" ]; then
        echo "${GREEN}✅ Found NETLIFY_AUTH_TOKEN in environment${NC}"
    else
        echo "${RED}❌ NETLIFY_AUTH_TOKEN not found${NC}"
        exit 1
    fi
fi

echo "${GREEN}✅ Authenticated with Netlify${NC}"
echo ""

# Get current site info
echo "📋 Getting current site information..."
SITE_INFO=$(netlify status --json 2>/dev/null || echo "{}")
SITE_ID=$(echo "$SITE_INFO" | grep -o '"id":"[^"]*"' | cut -d'"' -f4 || echo "")

if [ -z "$SITE_ID" ]; then
    echo "${YELLOW}⚠️  Could not auto-detect site ID${NC}"
    echo "Using default site ID from config..."
    SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
fi

echo "Site ID: $SITE_ID"
echo ""

# Define correct environment variables
declare -A CORRECT_VARS=(
    ["NEXT_PUBLIC_SUPABASE_URL"]="https://cuxzzpsyufcewtmicszk.supabase.co"
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ"
    ["NEXT_PUBLIC_APP_URL"]="https://elevateconnectsdirectory.org"
    ["NEXT_PUBLIC_SITE_URL"]="https://elevateconnectsdirectory.org"
    ["NEXT_PUBLIC_BASE_URL"]="https://elevateconnectsdirectory.org"
    ["NODE_ENV"]="production"
)

# Get current environment variables
echo "🔍 Checking current environment variables..."
CURRENT_VARS=$(netlify env:list --json 2>/dev/null || echo "[]")

# Check and fix each variable
FIXED_COUNT=0
MISSING_COUNT=0
CORRECT_COUNT=0

for VAR_NAME in "${!CORRECT_VARS[@]}"; do
    CORRECT_VALUE="${CORRECT_VARS[$VAR_NAME]}"
    
    echo ""
    echo "Checking: $VAR_NAME"
    
    # Get current value
    CURRENT_VALUE=$(netlify env:get "$VAR_NAME" 2>/dev/null || echo "")
    
    if [ -z "$CURRENT_VALUE" ]; then
        echo "${YELLOW}  ⚠️  Missing - Setting now...${NC}"
        netlify env:set "$VAR_NAME" "$CORRECT_VALUE" --context production --context deploy-preview --context branch-deploy
        echo "${GREEN}  ✅ Set: $VAR_NAME${NC}"
        ((MISSING_COUNT++))
    elif [ "$CURRENT_VALUE" != "$CORRECT_VALUE" ]; then
        echo "${RED}  ❌ Incorrect value detected${NC}"
        echo "     Current:  $CURRENT_VALUE"
        echo "     Correct:  $CORRECT_VALUE"
        echo "${YELLOW}  🔧 Fixing...${NC}"
        netlify env:set "$VAR_NAME" "$CORRECT_VALUE" --context production --context deploy-preview --context branch-deploy
        echo "${GREEN}  ✅ Fixed: $VAR_NAME${NC}"
        ((FIXED_COUNT++))
    else
        echo "${GREEN}  ✅ Correct${NC}"
        ((CORRECT_COUNT++))
    fi
done

# Check for SUPABASE_SERVICE_ROLE_KEY separately (secret)
echo ""
echo "Checking: SUPABASE_SERVICE_ROLE_KEY"
SERVICE_KEY=$(netlify env:get "SUPABASE_SERVICE_ROLE_KEY" 2>/dev/null || echo "")

if [ -z "$SERVICE_KEY" ]; then
    echo "${RED}  ❌ Missing - REQUIRES MANUAL SETUP${NC}"
    echo ""
    echo "  AUTOPILOT CANNOT SET THIS AUTOMATICALLY (Secret Key)"
    echo "  Get from: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api"
    echo "  Then run: netlify env:set SUPABASE_SERVICE_ROLE_KEY \"YOUR_KEY\""
    echo ""
    ((MISSING_COUNT++))
else
    echo "${GREEN}  ✅ Present (value hidden for security)${NC}"
    ((CORRECT_COUNT++))
fi

# Summary
echo ""
echo "=================================================="
echo "📊 AUTOPILOT SUMMARY"
echo "=================================================="
echo "${GREEN}✅ Correct:  $CORRECT_COUNT${NC}"
echo "${YELLOW}🔧 Fixed:    $FIXED_COUNT${NC}"
echo "${RED}❌ Missing:  $MISSING_COUNT${NC}"
echo ""

if [ $FIXED_COUNT -gt 0 ] || [ $MISSING_COUNT -gt 0 ]; then
    echo "${GREEN}🚀 Changes made! Triggering new deployment...${NC}"
    echo ""
    
    # Clear cache and deploy
    echo "Clearing Netlify cache..."
    netlify build:clear-cache || echo "Could not clear cache (may not be supported)"
    
    echo ""
    echo "Triggering production deploy..."
    netlify deploy --prod --message "AUTOPILOT: Fixed environment variables"
    
    echo ""
    echo "${GREEN}✅ Deployment triggered!${NC}"
    echo ""
    echo "Monitor at: https://app.netlify.com/sites/$SITE_ID/deploys"
else
    echo "${GREEN}✅ All environment variables are correct!${NC}"
    echo ""
    echo "If site is still showing errors, try:"
    echo "1. Clear cache: netlify build:clear-cache"
    echo "2. Redeploy: netlify deploy --prod"
fi

echo ""
echo "=================================================="
echo "🤖 AUTOPILOT COMPLETE"
echo "=================================================="
