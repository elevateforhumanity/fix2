#!/bin/bash
# Netlify Configuration Verification Script
# Scans all Netlify-related configuration line by line

set -e

echo "🔍 NETLIFY CONFIGURATION VERIFICATION"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_pass() {
    echo -e "${GREEN}✅ $1${NC}"
}

check_fail() {
    echo -e "${RED}❌ $1${NC}"
}

check_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Check netlify.toml exists
echo "1️⃣  Checking netlify.toml..."
if [ -f "netlify.toml" ]; then
    check_pass "netlify.toml exists"
else
    check_fail "netlify.toml NOT FOUND"
    exit 1
fi
echo ""

# 2. Verify build command
echo "2️⃣  Checking build command..."
BUILD_CMD=$(grep -A1 '^\[build\]' netlify.toml | grep 'command' | cut -d'"' -f2)
if [ "$BUILD_CMD" = "npm run build" ]; then
    check_pass "Build command: $BUILD_CMD"
else
    check_warn "Build command: $BUILD_CMD (expected: npm run build)"
fi
echo ""

# 3. Verify publish directory
echo "3️⃣  Checking publish directory..."
PUBLISH_DIR=$(grep -A2 '^\[build\]' netlify.toml | grep 'publish' | cut -d'"' -f2)
if [ "$PUBLISH_DIR" = "dist" ]; then
    check_pass "Publish directory: $PUBLISH_DIR"
else
    check_fail "Publish directory: $PUBLISH_DIR (expected: dist)"
fi
echo ""

# 4. Check Node version
echo "4️⃣  Checking Node version..."
NODE_VER=$(grep 'NODE_VERSION' netlify.toml | cut -d'"' -f2)
if [ ! -z "$NODE_VER" ]; then
    check_pass "Node version: $NODE_VER"
else
    check_warn "Node version not specified"
fi
echo ""

# 5. Verify package.json build script
echo "5️⃣  Checking package.json build script..."
if [ -f "package.json" ]; then
    check_pass "package.json exists"
    
    # Check if build script exists
    if grep -q '"build":' package.json; then
        BUILD_SCRIPT=$(grep '"build":' package.json | cut -d'"' -f4)
        check_pass "Build script: $BUILD_SCRIPT"
    else
        check_fail "No build script in package.json"
    fi
else
    check_fail "package.json NOT FOUND"
fi
echo ""

# 6. Check if dist directory would be created
echo "6️⃣  Testing build output..."
if [ -d "dist" ]; then
    check_pass "dist/ directory exists"
    
    # Check dist contents
    FILE_COUNT=$(find dist -type f | wc -l)
    check_pass "dist/ contains $FILE_COUNT files"
    
    # Check for index.html
    if [ -f "dist/index.html" ]; then
        check_pass "dist/index.html exists"
    else
        check_fail "dist/index.html NOT FOUND"
    fi
    
    # Check for images
    if [ -d "dist/images" ]; then
        IMG_COUNT=$(find dist/images -type f | wc -l)
        check_pass "dist/images/ contains $IMG_COUNT files"
    else
        check_warn "dist/images/ directory not found"
    fi
    
    # Check for assets
    if [ -d "dist/assets" ]; then
        ASSET_COUNT=$(find dist/assets -type f | wc -l)
        check_pass "dist/assets/ contains $ASSET_COUNT files"
    else
        check_warn "dist/assets/ directory not found"
    fi
else
    check_warn "dist/ directory not found (run 'npm run build' first)"
fi
echo ""

# 7. Check redirects configuration
echo "7️⃣  Checking redirects..."
REDIRECT_COUNT=$(grep -c '^\[\[redirects\]\]' netlify.toml || echo "0")
if [ "$REDIRECT_COUNT" -gt 0 ]; then
    check_pass "Found $REDIRECT_COUNT redirect rules"
    
    # Check for SPA fallback
    if grep -q 'to = "/index.html"' netlify.toml; then
        check_pass "SPA fallback configured (/* -> /index.html)"
    else
        check_warn "No SPA fallback found"
    fi
else
    check_warn "No redirects configured"
fi
echo ""

# 8. Check headers configuration
echo "8️⃣  Checking headers..."
HEADER_COUNT=$(grep -c '^\[\[headers\]\]' netlify.toml || echo "0")
if [ "$HEADER_COUNT" -gt 0 ]; then
    check_pass "Found $HEADER_COUNT header rules"
    
    # Check for security headers
    if grep -q 'Strict-Transport-Security' netlify.toml; then
        check_pass "HSTS header configured"
    fi
    
    if grep -q 'Content-Security-Policy' netlify.toml; then
        check_pass "CSP header configured"
    fi
    
    # Check for image caching
    if grep -q '/images/\*' netlify.toml; then
        check_pass "Image caching configured"
    fi
else
    check_warn "No custom headers configured"
fi
echo ""

# 9. Check for _redirects file
echo "9️⃣  Checking _redirects file..."
if [ -f "public/_redirects" ]; then
    check_pass "public/_redirects exists"
    cat public/_redirects | while read line; do
        if [ ! -z "$line" ]; then
            echo "   → $line"
        fi
    done
elif [ -f "dist/_redirects" ]; then
    check_pass "dist/_redirects exists"
else
    check_warn "_redirects file not found"
fi
echo ""

# 10. Check for _headers file
echo "🔟 Checking _headers file..."
if [ -f "public/_headers" ]; then
    check_pass "public/_headers exists"
elif [ -f "dist/_headers" ]; then
    check_pass "dist/_headers exists"
else
    check_warn "_headers file not found"
fi
echo ""

# 11. Environment variables check
echo "1️⃣1️⃣  Checking required environment variables..."
echo "   Note: These should be set in Netlify dashboard"
echo ""
echo "   Required variables:"
echo "   - NODE_VERSION (set in netlify.toml: $NODE_VER)"
echo ""
echo "   Optional variables (if using Supabase):"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo ""

# 12. Summary
echo "======================================"
echo "📊 CONFIGURATION SUMMARY"
echo "======================================"
echo ""
echo "Build Configuration:"
echo "  Command: $BUILD_CMD"
echo "  Publish: $PUBLISH_DIR"
echo "  Node: $NODE_VER"
echo ""
echo "Redirects: $REDIRECT_COUNT rules"
echo "Headers: $HEADER_COUNT rules"
echo ""

if [ -d "dist" ]; then
    echo "Build Output:"
    echo "  Total files: $FILE_COUNT"
    echo "  Images: $IMG_COUNT"
    echo "  Assets: $ASSET_COUNT"
    echo ""
fi

echo "======================================"
echo "✅ Configuration verification complete!"
echo ""
echo "Next steps:"
echo "1. Verify these settings in Netlify dashboard:"
echo "   https://app.netlify.com/sites/elevateproduction/settings/deploys"
echo ""
echo "2. Check that these match:"
echo "   - Build command: $BUILD_CMD"
echo "   - Publish directory: $PUBLISH_DIR"
echo "   - Node version: $NODE_VER"
echo ""
echo "3. If settings don't match, update them in Netlify dashboard"
echo ""
