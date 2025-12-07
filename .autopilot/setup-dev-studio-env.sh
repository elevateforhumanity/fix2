#!/bin/bash

# Elevate Dev Studio - Environment Setup Autopilot
# This script sets up all required environment variables for Dev Studio

set -e

echo "🚀 Elevate Dev Studio - Environment Setup Autopilot"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ .env.local not found!${NC}"
    echo "Creating .env.local..."
    touch .env.local
fi

echo -e "${YELLOW}📋 Checking existing environment variables...${NC}"
echo ""

# Function to check if variable exists
check_var() {
    local var_name=$1
    if grep -q "^${var_name}=" .env.local; then
        echo -e "${GREEN}✅ ${var_name} exists${NC}"
        return 0
    else
        echo -e "${RED}❌ ${var_name} missing${NC}"
        return 1
    fi
}

# Check existing variables
echo "Existing variables:"
check_var "NEXT_PUBLIC_SITE_URL" || true
check_var "SUPABASE_URL" || true
check_var "SUPABASE_ANON_KEY" || true
check_var "SUPABASE_SERVICE_ROLE_KEY" || true
check_var "STRIPE_SECRET_KEY" || true
check_var "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" || true

echo ""
echo -e "${YELLOW}📋 Checking GitHub OAuth variables (needed for Dev Studio)...${NC}"
check_var "GITHUB_APP_ID" || true
check_var "GITHUB_APP_PRIVATE_KEY" || true
check_var "GITHUB_OAUTH_CLIENT_ID" || true
check_var "GITHUB_OAUTH_CLIENT_SECRET" || true

echo ""
echo "=================================================="
echo ""
echo -e "${YELLOW}🔧 Setup Options:${NC}"
echo ""
echo "1. Manual Setup - I'll guide you through getting GitHub OAuth credentials"
echo "2. Automated Setup - Use Puppeteer to fetch from Vercel (requires login)"
echo "3. Skip - I'll set up GitHub OAuth later"
echo ""
read -p "Choose option (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo -e "${GREEN}📝 Manual GitHub OAuth Setup${NC}"
        echo ""
        echo "Step 1: Create GitHub OAuth App"
        echo "-------------------------------"
        echo "1. Go to: https://github.com/settings/developers"
        echo "2. Click 'New OAuth App'"
        echo "3. Fill in:"
        echo "   - Application name: Elevate Dev Studio"
        echo "   - Homepage URL: https://elevateforhumanity.org"
        echo "   - Authorization callback URL: https://elevateforhumanity.org/api/auth/github/callback"
        echo "4. Click 'Register application'"
        echo ""
        read -p "Press Enter when you've created the OAuth App..."
        echo ""
        
        read -p "Enter Client ID: " client_id
        read -p "Enter Client Secret: " client_secret
        
        # Add to .env.local
        if ! grep -q "^GITHUB_OAUTH_CLIENT_ID=" .env.local; then
            echo "GITHUB_OAUTH_CLIENT_ID=$client_id" >> .env.local
        else
            sed -i "s|^GITHUB_OAUTH_CLIENT_ID=.*|GITHUB_OAUTH_CLIENT_ID=$client_id|" .env.local
        fi
        
        if ! grep -q "^GITHUB_OAUTH_CLIENT_SECRET=" .env.local; then
            echo "GITHUB_OAUTH_CLIENT_SECRET=$client_secret" >> .env.local
        else
            sed -i "s|^GITHUB_OAUTH_CLIENT_SECRET=.*|GITHUB_OAUTH_CLIENT_SECRET=$client_secret|" .env.local
        fi
        
        echo ""
        echo -e "${GREEN}✅ GitHub OAuth credentials saved!${NC}"
        ;;
        
    2)
        echo ""
        echo -e "${GREEN}🤖 Automated Setup with Puppeteer${NC}"
        echo ""
        echo "This will:"
        echo "1. Fetch existing environment variables from Vercel"
        echo "2. Create GitHub OAuth App automatically"
        echo "3. Update .env.local with all credentials"
        echo ""
        read -p "Continue? (y/n): " confirm
        
        if [ "$confirm" = "y" ]; then
            echo ""
            echo "Running Puppeteer autopilot..."
            node .autopilot/workers/fetch-vercel-env.js
        fi
        ;;
        
    3)
        echo ""
        echo -e "${YELLOW}⏭️  Skipping GitHub OAuth setup${NC}"
        echo "You can run this script again later to set up GitHub OAuth"
        ;;
        
    *)
        echo ""
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo "=================================================="
echo ""
echo -e "${GREEN}✅ Environment Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Verify .env.local has all required variables"
echo "2. Restart your dev server: npm run dev"
echo "3. Access Dev Studio at: /admin/dev-studio"
echo ""
echo "To sync with Vercel:"
echo "  vercel env pull .env.local"
echo ""
echo "To push to Vercel:"
echo "  vercel env add GITHUB_OAUTH_CLIENT_ID"
echo "  vercel env add GITHUB_OAUTH_CLIENT_SECRET"
echo ""
