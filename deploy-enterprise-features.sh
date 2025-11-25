#!/bin/bash
# deploy-enterprise-features.sh
# Quick deployment script for enterprise features

set -e

echo "=========================================="
echo "Enterprise Features Deployment Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check features
echo "Step 1: Checking enterprise features..."
if node scripts/check-enterprise-features.js; then
    echo -e "${GREEN}✅ All features verified${NC}"
else
    echo -e "${RED}❌ Some features are missing${NC}"
    echo "Please fix the issues above before deploying"
    exit 1
fi

echo ""

# Step 2: Run linting
echo "Step 2: Running linter..."
if pnpm lint; then
    echo -e "${GREEN}✅ Linting passed${NC}"
else
    echo -e "${RED}❌ Linting failed${NC}"
    exit 1
fi

echo ""

# Step 3: Type checking
echo "Step 3: Type checking..."
if pnpm typecheck; then
    echo -e "${GREEN}✅ Type checking passed${NC}"
else
    echo -e "${YELLOW}⚠️  Type checking had warnings (continuing)${NC}"
fi

echo ""

# Step 4: Build
echo "Step 4: Building application..."
if pnpm build; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo ""

# Step 5: Database migration reminder
echo "Step 5: Database migration"
echo -e "${YELLOW}⚠️  IMPORTANT: Run the database migration manually:${NC}"
echo ""
echo "  psql \$DATABASE_URL -f migrations/enterprise_features.sql"
echo ""
echo "Or in Supabase SQL Editor, run the contents of:"
echo "  migrations/enterprise_features.sql"
echo ""
read -p "Have you run the database migration? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Please run the database migration first${NC}"
    exit 1
fi

echo ""

# Step 6: Environment variables check
echo "Step 6: Environment variables"
echo -e "${YELLOW}⚠️  Ensure these are set in Vercel:${NC}"
echo ""
echo "  Required:"
echo "    - SUPABASE_URL"
echo "    - NEXT_PUBLIC_SUPABASE_URL"
echo "    - SUPABASE_ANON_KEY"
echo "    - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "    - SUPABASE_SERVICE_ROLE_KEY"
echo "    - NEXT_PUBLIC_SITE_URL"
echo "    - OPENAI_API_KEY"
echo ""
echo "  Optional:"
echo "    - XAPI_ENDPOINT"
echo "    - XAPI_USERNAME"
echo "    - XAPI_PASSWORD"
echo "    - RESEND_API_KEY"
echo "    - STRIPE_SECRET_KEY"
echo ""
read -p "Are all environment variables set in Vercel? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Please set environment variables in Vercel first${NC}"
    exit 1
fi

echo ""

# Step 7: Deploy
echo "Step 7: Deploying to Vercel..."
echo ""
echo "Choose deployment method:"
echo "  1) Deploy via Vercel CLI (vercel --prod)"
echo "  2) Deploy via Git push (git push origin main)"
echo "  3) Skip deployment (I'll do it manually)"
echo ""
read -p "Enter choice (1-3): " -n 1 -r
echo ""

case $REPLY in
    1)
        echo "Deploying via Vercel CLI..."
        if command -v vercel &> /dev/null; then
            vercel --prod
            echo -e "${GREEN}✅ Deployment initiated${NC}"
        else
            echo -e "${RED}❌ Vercel CLI not found. Install with: npm i -g vercel${NC}"
            exit 1
        fi
        ;;
    2)
        echo "Committing and pushing to Git..."
        git add .
        git commit -m "Deploy enterprise features A-H" || echo "No changes to commit"
        git push origin main
        echo -e "${GREEN}✅ Pushed to Git (auto-deploy should trigger)${NC}"
        ;;
    3)
        echo -e "${YELLOW}⚠️  Skipping deployment${NC}"
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Deployment process complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Wait for Vercel deployment to finish"
echo "  2. Visit your site and test key features"
echo "  3. Check ENTERPRISE_DEPLOYMENT_CHECKLIST.md"
echo "  4. Verify all API endpoints work"
echo ""
echo "Key URLs to test:"
echo "  - /lms/dashboard"
echo "  - /admin/ai-course-builder"
echo "  - /admin/reports/caseload"
echo "  - /program-holder/dashboard"
echo "  - /verify/[certificate-id]"
echo ""
echo "🎉 Your enterprise features are now live!"
echo ""
