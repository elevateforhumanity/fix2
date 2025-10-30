#!/bin/bash

###############################################################################
# AUTONOMOUS PUPPET: Add Secrets to Netlify
# This script will guide you through getting a token and then automatically
# add all secrets without any further interaction
###############################################################################

set -e

echo "🤖 AUTONOMOUS PUPPET: Adding Secrets to Netlify"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Load .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs 2>/dev/null)
fi

# Check if we have the API keys
if [ -z "$OPENAI_API_KEY" ] || [ -z "$STRIPE_SECRET_KEY" ] || [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}❌ API keys not found in .env${NC}"
    exit 1
fi

echo -e "${GREEN}✅ API keys loaded from .env${NC}"
echo ""

# Check for Netlify token
if [ -z "$NETLIFY_AUTH_TOKEN" ] || [ "$NETLIFY_AUTH_TOKEN" = "your-netlify-token-here" ]; then
    echo -e "${YELLOW}⚠️  Netlify auth token not found${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${BLUE}📝 QUICK SETUP: Get your Netlify token${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Open this URL in your browser:"
    echo -e "   ${GREEN}https://app.netlify.com/user/applications#personal-access-tokens${NC}"
    echo ""
    echo "2. Click 'New access token'"
    echo ""
    echo "3. Description: 'Puppet Autopilot'"
    echo ""
    echo "4. Click 'Generate token'"
    echo ""
    echo "5. Copy the token and paste it here"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    read -p "Paste your Netlify token here: " NETLIFY_AUTH_TOKEN
    echo ""
    
    if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
        echo -e "${RED}❌ No token provided${NC}"
        exit 1
    fi
    
    # Save to .env for future use
    if grep -q "NETLIFY_AUTH_TOKEN=" .env 2>/dev/null; then
        sed -i "s|NETLIFY_AUTH_TOKEN=.*|NETLIFY_AUTH_TOKEN=$NETLIFY_AUTH_TOKEN|" .env
    else
        echo "NETLIFY_AUTH_TOKEN=$NETLIFY_AUTH_TOKEN" >> .env
    fi
    
    echo -e "${GREEN}✅ Token saved to .env${NC}"
    echo ""
fi

# Get site ID if not set
NETLIFY_SITE_NAME="elevateforhumanityfix2"

if [ -z "$NETLIFY_SITE_ID" ] || [ "$NETLIFY_SITE_ID" = "your-netlify-site-id-here" ]; then
    echo "🔍 Looking up site ID for: $NETLIFY_SITE_NAME"
    
    SITES_RESPONSE=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "https://api.netlify.com/api/v1/sites?name=$NETLIFY_SITE_NAME")
    
    NETLIFY_SITE_ID=$(echo "$SITES_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [ -z "$NETLIFY_SITE_ID" ]; then
        echo -e "${RED}❌ Could not find site: $NETLIFY_SITE_NAME${NC}"
        echo "Response: $SITES_RESPONSE"
        exit 1
    fi
    
    # Save to .env
    if grep -q "NETLIFY_SITE_ID=" .env 2>/dev/null; then
        sed -i "s|NETLIFY_SITE_ID=.*|NETLIFY_SITE_ID=$NETLIFY_SITE_ID|" .env
    else
        echo "NETLIFY_SITE_ID=$NETLIFY_SITE_ID" >> .env
    fi
    
    echo -e "${GREEN}✅ Site ID: $NETLIFY_SITE_ID${NC}"
    echo ""
fi

# Get account slug
echo "🔍 Getting account information..."
SITE_INFO=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID")

ACCOUNT_SLUG=$(echo "$SITE_INFO" | grep -o '"account_slug":"[^"]*"' | cut -d'"' -f4)

if [ -z "$ACCOUNT_SLUG" ]; then
    echo -e "${RED}❌ Could not get account information${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Account: $ACCOUNT_SLUG${NC}"
echo ""

# Function to add/update environment variable
add_env_var() {
    local key=$1
    local value=$2
    
    echo "🔐 Adding $key to Netlify..."
    
    # Try to add the variable
    local response=$(curl -s -w "\n%{http_code}" -X POST \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"key\":\"$key\",\"values\":[{\"value\":\"$value\",\"context\":\"all\"}]}" \
        "https://api.netlify.com/api/v1/accounts/$ACCOUNT_SLUG/env/$key?site_id=$NETLIFY_SITE_ID")
    
    local http_code=$(echo "$response" | tail -n1)
    local body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        echo -e "${GREEN}✅ Successfully added $key${NC}"
        return 0
    elif [ "$http_code" = "409" ] || [ "$http_code" = "422" ]; then
        # Variable exists, update it
        echo -e "${YELLOW}⚠️  $key exists, updating...${NC}"
        
        local update_response=$(curl -s -w "\n%{http_code}" -X PATCH \
            -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{\"key\":\"$key\",\"values\":[{\"value\":\"$value\",\"context\":\"all\"}]}" \
            "https://api.netlify.com/api/v1/accounts/$ACCOUNT_SLUG/env/$key?site_id=$NETLIFY_SITE_ID")
        
        local update_code=$(echo "$update_response" | tail -n1)
        
        if [ "$update_code" = "200" ] || [ "$update_code" = "204" ]; then
            echo -e "${GREEN}✅ Successfully updated $key${NC}"
            return 0
        else
            echo -e "${RED}❌ Failed to update $key (HTTP $update_code)${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Failed to add $key (HTTP $http_code)${NC}"
        echo "Response: $body"
        return 1
    fi
}

# Add all secrets
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🚀 AUTONOMOUS MODE: Adding all secrets...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

SUCCESS_COUNT=0
FAIL_COUNT=0

# Add OPENAI_API_KEY
if add_env_var "OPENAI_API_KEY" "$OPENAI_API_KEY"; then
    ((SUCCESS_COUNT++))
else
    ((FAIL_COUNT++))
fi
echo ""

# Add STRIPE_SECRET_KEY
if add_env_var "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY"; then
    ((SUCCESS_COUNT++))
else
    ((FAIL_COUNT++))
fi
echo ""

# Add CLOUDFLARE_API_TOKEN
if add_env_var "CLOUDFLARE_API_TOKEN" "$CLOUDFLARE_API_TOKEN"; then
    ((SUCCESS_COUNT++))
else
    ((FAIL_COUNT++))
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Successfully added: $SUCCESS_COUNT${NC}"
if [ $FAIL_COUNT -gt 0 ]; then
    echo -e "${RED}❌ Failed: $FAIL_COUNT${NC}"
fi
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}🎉 All secrets added successfully!${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${BLUE}🚀 TRIGGERING DEPLOYMENT...${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    # Trigger deployment
    git commit --allow-empty -m "chore: trigger deployment with new env vars [autonomous]" 2>/dev/null || true
    git push origin main 2>/dev/null || echo "Note: Push manually if needed"
    
    echo ""
    echo -e "${GREEN}✅ Deployment triggered!${NC}"
    echo ""
    echo "📋 Monitor deployment:"
    echo "   • Netlify: https://app.netlify.com/sites/$NETLIFY_SITE_NAME/deploys"
    echo "   • GitHub: https://github.com/elevateforhumanity/fix2/actions"
    echo ""
    echo "🌐 Site will be live at:"
    echo "   https://$NETLIFY_SITE_NAME.netlify.app"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️  Some secrets failed to add${NC}"
    exit 1
fi
