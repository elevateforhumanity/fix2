#!/bin/bash

###############################################################################
# Puppet Autopilot: Add Secrets to Netlify via CLI
# Uses Netlify CLI to add environment variables
###############################################################################

set -e

echo "🤖 Puppet Autopilot: Adding Secrets to Netlify (CLI Method)"
echo "============================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load environment variables from .env
if [ -f .env ]; then
    echo "📋 Loading environment variables from .env..."
    source <(grep -v '^#' .env | sed 's/^/export /')
else
    echo -e "${RED}❌ .env file not found${NC}"
    exit 1
fi

# Check if required variables are set
if [ -z "$OPENAI_API_KEY" ] || [ -z "$STRIPE_SECRET_KEY" ] || [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}❌ Required API keys not found in .env${NC}"
    echo "Please ensure OPENAI_API_KEY, STRIPE_SECRET_KEY, and CLOUDFLARE_API_TOKEN are set"
    exit 1
fi

echo -e "${GREEN}✅ API keys loaded from .env${NC}"
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${RED}❌ Netlify CLI not found${NC}"
    echo "Install with: npm install -g netlify-cli"
    exit 1
fi

echo -e "${GREEN}✅ Netlify CLI found: $(netlify --version)${NC}"
echo ""

# Check if authenticated
if ! netlify status &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Netlify${NC}"
    echo ""
    echo "Please authenticate with Netlify:"
    echo ""
    echo "Option 1: Interactive login"
    echo "   netlify login"
    echo ""
    echo "Option 2: Use auth token"
    echo "   export NETLIFY_AUTH_TOKEN='your-token-here'"
    echo ""
    echo "Get your token at: https://app.netlify.com/user/applications#personal-access-tokens"
    echo ""
    
    # Check if NETLIFY_AUTH_TOKEN is set
    if [ -n "$NETLIFY_AUTH_TOKEN" ]; then
        echo -e "${GREEN}✅ NETLIFY_AUTH_TOKEN found in environment${NC}"
        echo "Proceeding with token authentication..."
        echo ""
    else
        exit 1
    fi
fi

# Link to site if not already linked
NETLIFY_SITE_ID="elevateforhumanityfix2"

echo "🔗 Linking to Netlify site: $NETLIFY_SITE_ID"
echo ""

# Check if netlify.toml has site_id
if grep -q "site_id" netlify.toml 2>/dev/null; then
    echo -e "${GREEN}✅ Site already linked in netlify.toml${NC}"
else
    echo -e "${YELLOW}⚠️  Site not linked, attempting to link...${NC}"
    # This would require interactive input, so we'll skip it
    echo "Please run: netlify link --name $NETLIFY_SITE_ID"
fi

echo ""
echo "🔐 Adding secrets to Netlify..."
echo ""

# Function to add environment variable
add_env_var() {
    local key=$1
    local value=$2
    
    echo "📤 Adding $key..."
    
    # Use netlify env:set command
    if netlify env:set "$key" "$value" --context production --context deploy-preview --context branch-deploy 2>&1; then
        echo -e "${GREEN}✅ Successfully added $key${NC}"
        return 0
    else
        echo -e "${RED}❌ Failed to add $key${NC}"
        return 1
    fi
}

# Add secrets
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
echo "================================================"
echo "📊 Summary:"
echo -e "${GREEN}✅ Successfully added: $SUCCESS_COUNT${NC}"
if [ $FAIL_COUNT -gt 0 ]; then
    echo -e "${RED}❌ Failed: $FAIL_COUNT${NC}"
fi
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}🎉 All secrets added successfully!${NC}"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Verify at: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys#environment"
    echo "   2. Trigger a new deployment:"
    echo "      git commit --allow-empty -m 'chore: trigger deployment with new env vars'"
    echo "      git push origin main"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️  Some secrets failed to add${NC}"
    echo "Please add them manually at:"
    echo "https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys#environment"
    echo ""
    exit 1
fi
