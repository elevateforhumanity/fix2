#!/bin/bash
# Comprehensive deployment diagnostic - no auth required
# Checks everything that could cause deployment failures

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

SITE_NAME="elevateforhumanityfix2"
SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

log_header() {
    echo -e "\n${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}${BOLD}  $1${NC}"
    echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}\n"
}

log_success() { echo -e "  ${GREEN}✓${NC} $1"; }
log_error() { echo -e "  ${RED}✖${NC} $1"; }
log_warning() { echo -e "  ${YELLOW}⚠${NC} $1"; }
log_info() { echo -e "  ${CYAN}ℹ${NC} $1"; }

ISSUES_FOUND=0

log_header "Deployment Diagnostic Tool"

# 1. Check site accessibility
log_header "1. Site Accessibility"

echo -n "  Checking https://elevateforhumanity.org... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://elevateforhumanity.org || echo "000")
if [ "$STATUS" = "200" ]; then
    echo -e "${GREEN}✓ LIVE (HTTP $STATUS)${NC}"
else
    echo -e "${RED}✖ FAILED (HTTP $STATUS)${NC}"
    ((ISSUES_FOUND++))
fi

echo -n "  Checking https://${SITE_NAME}.netlify.app... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://${SITE_NAME}.netlify.app || echo "000")
if [ "$STATUS" = "200" ] || [ "$STATUS" = "301" ] || [ "$STATUS" = "302" ]; then
    echo -e "${GREEN}✓ OK (HTTP $STATUS)${NC}"
else
    echo -e "${YELLOW}⚠ Status: HTTP $STATUS${NC}"
fi

# 2. Check build configuration
log_header "2. Build Configuration"

if [ -f "netlify.toml" ]; then
    log_success "netlify.toml exists"
    
    BUILD_CMD=$(grep -m1 'command =' netlify.toml | sed 's/.*command = "\(.*\)"/\1/')
    PUBLISH_DIR=$(grep -m1 'publish =' netlify.toml | sed 's/.*publish = "\(.*\)"/\1/')
    
    log_info "Build command: $BUILD_CMD"
    log_info "Publish directory: $PUBLISH_DIR"
    
    # Check for problematic patterns
    if echo "$BUILD_CMD" | grep -q "rm -rf"; then
        log_warning "Build command includes 'rm -rf' - may cause issues"
    fi
else
    log_error "netlify.toml NOT found"
    ((ISSUES_FOUND++))
fi

# 3. Check package.json
log_header "3. Package Configuration"

if [ -f "package.json" ]; then
    log_success "package.json exists"
    
    if grep -q '"build":' package.json; then
        BUILD_SCRIPT=$(grep '"build":' package.json | head -1)
        log_info "Build script: $BUILD_SCRIPT"
    else
        log_error "No 'build' script in package.json"
        ((ISSUES_FOUND++))
    fi
    
    # Check Node version
    if grep -q '"engines":' package.json; then
        NODE_VERSION=$(grep -A2 '"engines":' package.json | grep '"node":' | sed 's/.*"node": "\(.*\)".*/\1/')
        log_info "Required Node version: $NODE_VERSION"
    fi
    
    # Check package manager
    if grep -q '"packageManager":' package.json; then
        PKG_MGR=$(grep '"packageManager":' package.json | sed 's/.*"packageManager": "\(.*\)".*/\1/')
        log_info "Package manager: $PKG_MGR"
    fi
else
    log_error "package.json NOT found"
    ((ISSUES_FOUND++))
fi

# 4. Check build output
log_header "4. Build Output"

if [ -d "dist" ]; then
    FILE_COUNT=$(find dist -type f 2>/dev/null | wc -l)
    DIR_SIZE=$(du -sh dist 2>/dev/null | cut -f1)
    
    log_success "dist/ directory exists"
    log_info "Files: $FILE_COUNT"
    log_info "Size: $DIR_SIZE"
    
    if [ -f "dist/index.html" ]; then
        log_success "dist/index.html exists"
        
        # Check if index.html has content
        SIZE=$(wc -c < dist/index.html)
        if [ "$SIZE" -lt 100 ]; then
            log_warning "index.html is very small ($SIZE bytes)"
        fi
    else
        log_error "dist/index.html NOT found"
        ((ISSUES_FOUND++))
    fi
    
    # Check for common assets
    if [ -d "dist/assets" ]; then
        ASSET_COUNT=$(find dist/assets -type f 2>/dev/null | wc -l)
        log_success "dist/assets/ exists ($ASSET_COUNT files)"
    else
        log_warning "dist/assets/ directory not found"
    fi
else
    log_error "dist/ directory NOT found - build has not run"
    log_info "Run: pnpm run build"
    ((ISSUES_FOUND++))
fi

# 5. Check dependencies
log_header "5. Dependencies"

if [ -f "pnpm-lock.yaml" ]; then
    log_success "pnpm-lock.yaml exists"
elif [ -f "package-lock.json" ]; then
    log_success "package-lock.json exists"
elif [ -f "yarn.lock" ]; then
    log_success "yarn.lock exists"
else
    log_warning "No lockfile found"
fi

if [ -d "node_modules" ]; then
    MODULE_COUNT=$(find node_modules -maxdepth 1 -type d 2>/dev/null | wc -l)
    log_success "node_modules/ exists ($MODULE_COUNT packages)"
else
    log_warning "node_modules/ not found - run: pnpm install"
fi

# 6. Check environment variables
log_header "6. Environment Variables"

if [ -f ".env" ]; then
    log_success ".env file exists"
    
    # Check for placeholder values
    if grep -q "your-.*-here" .env; then
        log_warning "Found placeholder values in .env"
        grep "your-.*-here" .env | sed 's/=.*/=***/' | sed 's/^/    /'
    fi
    
    # Check required variables
    REQUIRED_VARS=(
        "VITE_SUPABASE_URL"
        "VITE_SUPABASE_ANON_KEY"
    )
    
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" .env; then
            if ! grep -q "^${var}=your-\|^${var}=$" .env; then
                log_success "$var is set"
            else
                log_warning "$var has placeholder value"
            fi
        else
            log_warning "$var not found in .env"
        fi
    done
else
    log_warning ".env file not found (may be set in Netlify dashboard)"
fi

# 7. Check Netlify functions
log_header "7. Netlify Functions"

if [ -d "netlify/functions" ]; then
    FUNC_COUNT=$(find netlify/functions -name "*.js" -o -name "*.ts" 2>/dev/null | wc -l)
    log_success "netlify/functions/ exists ($FUNC_COUNT functions)"
    
    # Check for package.json in functions
    if [ -f "netlify/functions/package.json" ]; then
        log_success "Functions have their own package.json"
    fi
else
    log_info "No netlify/functions directory"
fi

# 8. Check Git status
log_header "8. Git Repository"

if [ -d ".git" ]; then
    log_success "Git repository initialized"
    
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    log_info "Current branch: $BRANCH"
    
    REMOTE=$(git remote get-url origin 2>/dev/null || echo "none")
    log_info "Remote: $REMOTE"
    
    # Check for uncommitted changes
    if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
        CHANGED=$(git status --porcelain 2>/dev/null | wc -l)
        log_warning "$CHANGED uncommitted changes"
    else
        log_success "Working directory clean"
    fi
    
    # Check last commit
    LAST_COMMIT=$(git log -1 --oneline 2>/dev/null || echo "none")
    log_info "Last commit: $LAST_COMMIT"
else
    log_error "Not a Git repository"
    ((ISSUES_FOUND++))
fi

# 9. Check for common issues
log_header "9. Common Issues Check"

# Check for large files
if [ -d "dist" ]; then
    LARGE_FILES=$(find dist -type f -size +10M 2>/dev/null | wc -l)
    if [ "$LARGE_FILES" -gt 0 ]; then
        log_warning "Found $LARGE_FILES files larger than 10MB"
        find dist -type f -size +10M -exec ls -lh {} \; 2>/dev/null | awk '{print "    " $9 " (" $5 ")"}'
    else
        log_success "No excessively large files"
    fi
fi

# Check for source maps
if [ -d "dist" ]; then
    MAP_FILES=$(find dist -name "*.map" 2>/dev/null | wc -l)
    if [ "$MAP_FILES" -gt 0 ]; then
        log_warning "Found $MAP_FILES source map files (increases deploy size)"
    else
        log_success "No source maps (good for production)"
    fi
fi

# Check for .gitignore
if [ -f ".gitignore" ]; then
    if grep -q "^dist$\|^dist/$" .gitignore; then
        log_success "dist/ is in .gitignore (correct)"
    else
        log_warning "dist/ should be in .gitignore"
    fi
fi

# 10. Test local build
log_header "10. Build Test"

log_info "Testing if build command works..."
if pnpm run build > /tmp/build-test.log 2>&1; then
    log_success "Build command completed successfully"
else
    log_error "Build command failed"
    log_info "Check /tmp/build-test.log for details"
    ((ISSUES_FOUND++))
fi

# Summary
log_header "Summary"

if [ $ISSUES_FOUND -eq 0 ]; then
    echo -e "${GREEN}${BOLD}✓ No critical issues found!${NC}\n"
    echo -e "Your deployment should work. If it's failing:"
    echo -e "  1. Check build minutes: https://app.netlify.com/sites/${SITE_ID}/settings/billing"
    echo -e "  2. Check deploy logs: https://app.netlify.com/sites/${SITE_ID}/deploys"
    echo -e "  3. Verify environment variables in Netlify dashboard"
else
    echo -e "${RED}${BOLD}✖ Found $ISSUES_FOUND critical issue(s)${NC}\n"
    echo -e "Fix the issues above before deploying."
fi

echo -e "\n${BOLD}Quick Links:${NC}"
echo -e "  • Dashboard: https://app.netlify.com/sites/${SITE_ID}"
echo -e "  • Deploys: https://app.netlify.com/sites/${SITE_ID}/deploys"
echo -e "  • Settings: https://app.netlify.com/sites/${SITE_ID}/settings"
echo -e "  • Billing: https://app.netlify.com/sites/${SITE_ID}/settings/billing"
echo -e "  • Live Site: https://elevateforhumanity.org"

echo -e "\n${BOLD}To manually deploy:${NC}"
echo -e "  ${CYAN}pnpm run build && netlify deploy --prod${NC}"

echo -e "\n${BOLD}To check build minutes:${NC}"
echo -e "  Visit: https://app.netlify.com/sites/${SITE_ID}/settings/billing"
echo -e "  Look for: 'Build minutes used this month'"

echo ""
