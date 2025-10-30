#!/bin/bash

###############################################################################
# Puppet Autopilot: Add Secrets to Netlify
# Automatically adds environment variables to Netlify via API
###############################################################################

set -e

echo "🤖 Puppet Autopilot: Adding Secrets to Netlify"
echo "================================================"
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
    export $(grep -v '^#' .env | xargs)
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

# Netlify configuration
NETLIFY_SITE_NAME="elevateforhumanityfix2"
NETLIFY_API_URL="https://api.netlify.com/api/v1"

# Check for Netlify auth token
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  NETLIFY_AUTH_TOKEN not found in environment${NC}"
    echo ""
    echo "To add secrets to Netlify, you need a Netlify Personal Access Token."
    echo ""
    echo "📝 How to get your Netlify token:"
    echo "   1. Go to: https://app.netlify.com/user/applications#personal-access-tokens"
    echo "   2. Click 'New access token'"
    echo "   3. Give it a name (e.g., 'Puppet Autopilot')"
    echo "   4. Copy the token"
    echo "   5. Set it as an environment variable:"
    echo "      export NETLIFY_AUTH_TOKEN='your-token-here'"
    echo ""
    echo "Or add it to your .env file:"
    echo "   NETLIFY_AUTH_TOKEN=your-token-here"
    echo ""
    echo -e "${BLUE}Alternative: Use Netlify CLI${NC}"
    echo "   netlify login"
    echo "   netlify env:set OPENAI_API_KEY \"$OPENAI_API_KEY\""
    echo "   netlify env:set STRIPE_SECRET_KEY \"$STRIPE_SECRET_KEY\""
    echo "   netlify env:set CLOUDFLARE_API_TOKEN \"$CLOUDFLARE_API_TOKEN\""
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Netlify auth token found${NC}"
echo ""

# Get site ID
echo "🔍 Looking up Netlify site ID for: $NETLIFY_SITE_NAME"
SITE_RESPONSE=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "$NETLIFY_API_URL/sites?name=$NETLIFY_SITE_NAME")

SITE_ID=$(echo "$SITE_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$SITE_ID" ]; then
    echo -e "${RED}❌ Could not find site: $NETLIFY_SITE_NAME${NC}"
    echo "Response: $SITE_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✅ Found site ID: $SITE_ID${NC}"
echo ""

# Function to add environment variable
add_env_var() {
    local key=$1
    local value=$2
    local context=${3:-"all"} # all, production, deploy-preview, branch-deploy
    
    echo "📤 Adding $key to Netlify..."
    
    # Create JSON payload
    local payload=$(cat <<EOF
{
  "key": "$key",
  "values": [
    {
      "value": "$value",
      "context": "$context"
    }
  ]
}
EOF
)
    
    # Add environment variable via API
    local response=$(curl -s -w "\n%{http_code}" -X POST \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$payload" \
        "$NETLIFY_API_URL/accounts/$(echo $SITE_RESPONSE | grep -o '"account_slug":"[^"]*"' | head -1 | cut -d'"' -f4)/env/$key?site_id=$SITE_ID")
    
    local http_code=$(echo "$response" | tail -n1)
    local body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        echo -e "${GREEN}✅ Successfully added $key${NC}"
        return 0
    elif [ "$http_code" = "409" ]; then
        echo -e "${YELLOW}⚠️  $key already exists, updating...${NC}"
        
        # Update existing variable
        local update_response=$(curl -s -w "\n%{http_code}" -X PATCH \
            -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
            -H "Content-Type: application/json" \
            -d "$payload" \
            "$NETLIFY_API_URL/accounts/$(echo $SITE_RESPONSE | grep -o '"account_slug":"[^"]*"' | head -1 | cut -d'"' -f4)/env/$key?site_id=$SITE_ID")
        
        local update_code=$(echo "$update_response" | tail -n1)
        
        if [ "$update_code" = "200" ] || [ "$update_code" = "204" ]; then
            echo -e "${GREEN}✅ Successfully updated $key${NC}"
            return 0
        else
            echo -e "${RED}❌ Failed to update $key (HTTP $update_code)${NC}"
            echo "Response: $(echo "$update_response" | sed '$d')"
            return 1
        fi
    else
        echo -e "${RED}❌ Failed to add $key (HTTP $http_code)${NC}"
        echo "Response: $body"
        return 1
    fi
}

# Add secrets to Netlify
echo "🔐 Adding secrets to Netlify..."
echo ""

# Add OPENAI_API_KEY
add_env_var "OPENAI_API_KEY" "$OPENAI_API_KEY" "all"
echo ""

# Add STRIPE_SECRET_KEY
add_env_var "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY" "all"
echo ""

# Add CLOUDFLARE_API_TOKEN
add_env_var "CLOUDFLARE_API_TOKEN" "$CLOUDFLARE_API_TOKEN" "all"
echo ""

# Verify environment variables
echo "🔍 Verifying environment variables..."
echo ""

ACCOUNT_SLUG=$(echo $SITE_RESPONSE | grep -o '"account_slug":"[^"]*"' | head -1 | cut -d'"' -f4)
ENV_VARS=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "$NETLIFY_API_URL/accounts/$ACCOUNT_SLUG/env?site_id=$SITE_ID")

echo "Environment variables in Netlify:"
echo "$ENV_VARS" | grep -o '"key":"[^"]*"' | cut -d'"' -f4 | while read key; do
    if [ "$key" = "OPENAI_API_KEY" ] || [ "$key" = "STRIPE_SECRET_KEY" ] || [ "$key" = "CLOUDFLARE_API_TOKEN" ]; then
        echo -e "${GREEN}✅ $key${NC}"
    fi
done

echo ""
echo -e "${GREEN}🎉 Puppet Autopilot: Secrets added successfully!${NC}"
echo ""
echo "📋 Next steps:"
echo "   1. Trigger a new deployment to use the new environment variables"
echo "   2. Verify the deployment at: https://$NETLIFY_SITE_NAME.netlify.app"
echo ""
echo "To trigger deployment:"
echo "   git commit --allow-empty -m 'chore: trigger deployment with new env vars'"
echo "   git push origin main"
echo ""
