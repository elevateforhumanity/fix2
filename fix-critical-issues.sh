#!/bin/bash
# Critical Issues Fix Script
# Run this before deploying to production

set -e

echo "🔧 Fixing Critical Issues for Production Launch"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check for .env.local
echo "1️⃣  Checking environment configuration..."
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ .env.local not found${NC}"
    echo "   Creating from template..."
    
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo -e "${YELLOW}⚠️  .env.local created from template${NC}"
        echo -e "${YELLOW}⚠️  YOU MUST FILL IN THE VALUES BEFORE DEPLOYING${NC}"
        echo ""
        echo "   Required variables:"
        echo "   - NEXT_PUBLIC_SUPABASE_URL"
        echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "   - SUPABASE_SERVICE_ROLE_KEY"
        echo "   - NEXTAUTH_SECRET"
        echo "   - STRIPE_SECRET_KEY"
        echo "   - STRIPE_PUBLISHABLE_KEY"
        echo ""
        echo "   Run: ./setup-env.sh for automatic setup"
        echo ""
    else
        echo -e "${RED}❌ .env.example not found. Cannot create .env.local${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env.local exists${NC}"
fi

# 2. Clear TypeScript cache
echo ""
echo "2️⃣  Clearing TypeScript cache..."
rm -rf .next tsconfig.tsbuildinfo
echo -e "${GREEN}✅ Cache cleared${NC}"

# 3. Check TypeScript errors
echo ""
echo "3️⃣  Running TypeScript check..."
if npm run typecheck 2>&1 | grep -q "error TS"; then
    echo -e "${YELLOW}⚠️  TypeScript errors found${NC}"
    echo "   Review errors above and fix before deploying"
else
    echo -e "${GREEN}✅ No TypeScript errors${NC}"
fi

# 4. Update sitemap
echo ""
echo "4️⃣  Updating sitemap..."
if [ -f tools/sitemap-gen.cjs ]; then
    npm run sitemap:gen
    echo -e "${GREEN}✅ Sitemap updated${NC}"
else
    echo -e "${YELLOW}⚠️  Sitemap generator not found, skipping${NC}"
fi

# 5. Check for large images
echo ""
echo "5️⃣  Checking for large images..."
LARGE_IMAGES=$(find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +500k 2>/dev/null | wc -l)
if [ "$LARGE_IMAGES" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found $LARGE_IMAGES images larger than 500KB${NC}"
    echo "   Consider optimizing these images:"
    find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +500k 2>/dev/null | head -10
    echo ""
    echo "   To optimize, run:"
    echo "   npm install -g sharp-cli"
    echo "   find public/images -name '*.jpg' -size +500k -exec sharp -i {} -o {}.webp --webp \\;"
else
    echo -e "${GREEN}✅ No large images found${NC}"
fi

# 6. Check analytics configuration
echo ""
echo "6️⃣  Checking analytics configuration..."
if grep -q "NEXT_PUBLIC_GA_MEASUREMENT_ID=" .env.local 2>/dev/null; then
    if grep "NEXT_PUBLIC_GA_MEASUREMENT_ID=" .env.local | grep -q "=.\+"; then
        echo -e "${GREEN}✅ Google Analytics ID configured${NC}"
    else
        echo -e "${YELLOW}⚠️  Google Analytics ID is empty${NC}"
        echo "   Add your GA4 Measurement ID to .env.local"
    fi
else
    echo -e "${YELLOW}⚠️  Google Analytics not configured${NC}"
    echo "   Add to .env.local:"
    echo "   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX"
fi

# 7. Run build test
echo ""
echo "7️⃣  Testing production build..."
echo "   This may take a few minutes..."
if npm run build; then
    echo -e "${GREEN}✅ Build successful${NC}"
    
    # Check build size
    if [ -d .next ]; then
        BUILD_SIZE=$(du -sh .next | cut -f1)
        echo "   Build size: $BUILD_SIZE"
    fi
else
    echo -e "${RED}❌ Build failed${NC}"
    echo "   Fix build errors before deploying"
    exit 1
fi

# 8. Run linter
echo ""
echo "8️⃣  Running linter..."
if npm run lint 2>&1 | grep -q "error"; then
    echo -e "${YELLOW}⚠️  Linting errors found${NC}"
    echo "   Run: npm run lint:fix"
else
    echo -e "${GREEN}✅ No linting errors${NC}"
fi

# Summary
echo ""
echo "================================================"
echo "🎉 Critical Issues Check Complete"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Review any warnings above"
echo "2. Fill in .env.local values if needed"
echo "3. Optimize large images if found"
echo "4. Add analytics IDs to .env.local"
echo "5. Test locally: npm run start"
echo "6. Deploy: vercel --prod"
echo ""
echo "For detailed audit report, see: PRE_LAUNCH_AUDIT_COMPLETE.md"
echo ""
