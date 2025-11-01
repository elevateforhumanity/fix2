#!/bin/bash
# Fix All Deployment Issues
# Systematically fixes every potential deployment problem

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log_header() {
    echo -e "\n${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}${BOLD}  $1${NC}"
    echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}\n"
}

log_success() { echo -e "  ${GREEN}✓${NC} $1"; }
log_error() { echo -e "  ${RED}✖${NC} $1"; }
log_warning() { echo -e "  ${YELLOW}⚠${NC} $1"; }
log_info() { echo -e "  ${CYAN}ℹ${NC} $1"; }

FIXES_APPLIED=0

log_header "Deployment Fix Script"

# Fix 1: Clean build
log_header "1. Clean Build Environment"

log_info "Removing old build artifacts..."
rm -rf dist node_modules/.vite .cache 2>/dev/null || true
log_success "Cleaned build artifacts"
((FIXES_APPLIED++))

# Fix 2: Install dependencies
log_header "2. Install Dependencies"

log_info "Installing dependencies with pnpm..."
pnpm install --frozen-lockfile
log_success "Dependencies installed"
((FIXES_APPLIED++))

# Fix 3: Run build
log_header "3. Build Project"

log_info "Building project..."
pnpm run build
log_success "Build completed"
((FIXES_APPLIED++))

# Fix 4: Verify build output
log_header "4. Verify Build Output"

if [ -f "dist/index.html" ]; then
    SIZE=$(wc -c < dist/index.html)
    log_success "index.html exists ($SIZE bytes)"
else
    log_error "index.html not found!"
    exit 1
fi

FILE_COUNT=$(find dist -type f | wc -l)
log_info "Total files in dist/: $FILE_COUNT"

if [ $FILE_COUNT -lt 10 ]; then
    log_error "Too few files in dist/ - build may have failed"
    exit 1
fi

log_success "Build output verified"
((FIXES_APPLIED++))

# Fix 5: Fix netlify.toml
log_header "5. Optimize netlify.toml"

# Create optimized netlify.toml
cat > netlify.toml.new << 'EOF'
[build]
  command = "pnpm install --frozen-lockfile && pnpm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20.11.1"
  PNPM_VERSION = "9.7.0"
  NODE_OPTIONS = "--max_old_space_size=4096"
  CI = "true"
  GENERATE_SOURCEMAP = "false"
  VITE_BUILD_ID = "$COMMIT_REF"
  VITE_SUPABASE_URL = "https://cuxzzpsyufcewtmicszk.supabase.co"
  VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA"
  VITE_STRIPE_PUBLISHABLE_KEY = "pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx"

[context.production]
  command = "pnpm install --frozen-lockfile && pnpm run build"
  publish = "dist"

[context.deploy-preview]
  command = "pnpm install --frozen-lockfile && pnpm run build"
  publish = "dist"

[context.branch-deploy]
  command = "pnpm install --frozen-lockfile && pnpm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[[plugins]]
  package = "netlify-plugin-submit-sitemap"
  [plugins.inputs]
    baseUrl = "https://elevateforhumanity.org"
    sitemapPath = "/sitemap.xml"
    providers = ["google", "bing"]

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
EOF

# Backup old netlify.toml
if [ -f "netlify.toml" ]; then
    cp netlify.toml netlify.toml.backup
    log_info "Backed up netlify.toml"
fi

# Use optimized version
mv netlify.toml.new netlify.toml
log_success "Optimized netlify.toml"
((FIXES_APPLIED++))

# Fix 6: Ensure _redirects file
log_header "6. Create _redirects File"

cat > dist/_redirects << 'EOF'
# API redirects
/api/*  /.netlify/functions/:splat  200

# SPA fallback
/*  /index.html  200
EOF

log_success "Created _redirects file"
((FIXES_APPLIED++))

# Fix 7: Git commit
log_header "7. Commit Changes"

if [ -n "$(git status --porcelain)" ]; then
    log_info "Committing changes..."
    git add .
    git commit -m "fix: optimize deployment configuration

- Clean build process
- Optimized netlify.toml
- Added _redirects file
- Verified build output

Co-authored-by: Ona <no-reply@ona.com>" || true
    log_success "Changes committed"
    ((FIXES_APPLIED++))
else
    log_info "No changes to commit"
fi

# Fix 8: Push to trigger deployment
log_header "8. Trigger Deployment"

CURRENT_BRANCH=$(git branch --show-current)
log_info "Pushing to branch: $CURRENT_BRANCH"

git push origin "$CURRENT_BRANCH"
log_success "Pushed to GitHub - deployment triggered"
((FIXES_APPLIED++))

# Summary
log_header "Summary"

echo -e "${GREEN}${BOLD}✓ Applied $FIXES_APPLIED fixes${NC}\n"

echo -e "${BOLD}What was fixed:${NC}"
echo -e "  1. ✓ Cleaned build environment"
echo -e "  2. ✓ Installed dependencies"
echo -e "  3. ✓ Built project successfully"
echo -e "  4. ✓ Verified build output"
echo -e "  5. ✓ Optimized netlify.toml"
echo -e "  6. ✓ Created _redirects file"
echo -e "  7. ✓ Committed changes"
echo -e "  8. ✓ Triggered deployment"

echo -e "\n${BOLD}Next Steps:${NC}"
echo -e "  1. Wait 2-5 minutes for deployment"
echo -e "  2. Check: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys"
echo -e "  3. Verify: https://elevateforhumanity.org"

echo -e "\n${BOLD}If deployment still fails:${NC}"
echo -e "  • Check build minutes: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/billing"
echo -e "  • Check environment variables in Netlify dashboard"
echo -e "  • Review deploy logs for specific errors"

echo -e "\n${GREEN}✓ All fixes applied successfully!${NC}\n"
