#!/bin/bash

# ============================================================================
# DEPLOY NOW - Launch Execution Script
# ============================================================================
# This script guides you through the final deployment steps
# ============================================================================

set -e

echo "🚀 LAUNCH EXECUTION - FINAL DEPLOYMENT"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Must run from project root${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Pre-Deployment Checks${NC}"
echo "------------------------------"

# Check for required files
if [ ! -f "supabase/migrations/20241219_security_lockdown.sql" ]; then
    echo -e "${RED}❌ Security lockdown migration not found${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Security lockdown migration found${NC}"

# Check environment variables
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo -e "${YELLOW}⚠️  Warning: NEXT_PUBLIC_SUPABASE_URL not set${NC}"
    echo "   You'll need to set this before testing"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo -e "${YELLOW}⚠️  Warning: NEXT_PUBLIC_SUPABASE_ANON_KEY not set${NC}"
    echo "   You'll need to set this before testing"
fi

echo ""
echo -e "${BLUE}Step 2: Database Migration${NC}"
echo "-------------------------"
echo ""
echo "You need to run the security lockdown migration in your Supabase database."
echo ""
echo "Choose your deployment method:"
echo ""
echo "  1. Supabase Dashboard (Recommended)"
echo "     - Go to: https://supabase.com/dashboard"
echo "     - Select your project"
echo "     - Go to: SQL Editor"
echo "     - Copy/paste: supabase/migrations/20241219_security_lockdown.sql"
echo "     - Click 'Run'"
echo ""
echo "  2. Supabase CLI"
echo "     - Run: supabase db push"
echo ""
echo "  3. Direct psql"
echo "     - Run: psql \$DATABASE_URL -f supabase/migrations/20241219_security_lockdown.sql"
echo ""
read -p "Have you run the migration? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠️  Please run the migration first, then run this script again${NC}"
    exit 0
fi

echo -e "${GREEN}✅ Migration confirmed${NC}"
echo ""

echo -e "${BLUE}Step 3: Verification Tests${NC}"
echo "-------------------------"
echo ""

# Check if we have credentials to run tests
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo -e "${YELLOW}⚠️  Cannot run tests without Supabase credentials${NC}"
    echo "   Set these environment variables:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
    read -p "Do you want to skip tests and proceed? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
else
    echo "Running security verification..."
    if node scripts/verify-security-lockdown.mjs; then
        echo -e "${GREEN}✅ Security verification passed${NC}"
    else
        echo -e "${RED}❌ Security verification failed${NC}"
        echo "   Review the errors above before launching"
        exit 1
    fi
    
    echo ""
    echo "Running application flow test..."
    if node scripts/test-application-flow.mjs; then
        echo -e "${GREEN}✅ Application flow test passed${NC}"
    else
        echo -e "${RED}❌ Application flow test failed${NC}"
        echo "   Review the errors above before launching"
        exit 1
    fi
fi

echo ""
echo -e "${BLUE}Step 4: Final Checklist${NC}"
echo "----------------------"
echo ""

checklist=(
    "Database migration completed"
    "Security tests passed"
    "Email notifications configured"
    "Admin access verified"
    "Application form tested"
    "Backup created"
)

for item in "${checklist[@]}"; do
    read -p "✓ $item? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}⚠️  Complete this item before launching${NC}"
        exit 0
    fi
done

echo ""
echo -e "${GREEN}✅ All checklist items confirmed${NC}"
echo ""

echo -e "${BLUE}Step 5: Deploy to Production${NC}"
echo "----------------------------"
echo ""
echo "Your platform is ready to launch!"
echo ""
echo "Next steps:"
echo "  1. Deploy to Vercel: vercel --prod"
echo "  2. Or push to main branch for auto-deploy"
echo "  3. Monitor application submissions"
echo "  4. Watch for any errors in logs"
echo ""
echo -e "${GREEN}🚀 YOU ARE LAUNCH READY${NC}"
echo ""
echo "Documentation:"
echo "  - Full details: LAUNCH_READY.md"
echo "  - Migration file: supabase/migrations/20241219_security_lockdown.sql"
echo "  - Test scripts: scripts/test-application-flow.mjs"
echo "  - Security check: scripts/verify-security-lockdown.mjs"
echo ""
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${GREEN}  SECURE → LAUNCH → OBSERVE → ITERATE  ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""
