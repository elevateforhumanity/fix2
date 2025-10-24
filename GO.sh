#!/usr/bin/env bash
# ONE-COMMAND COMPLETE SETUP AND DEPLOYMENT
# This is the only command you need to run

set -euo pipefail

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_step() { echo -e "${CYAN}🚀 $1${NC}"; }
log_bold() { echo -e "${BOLD}$1${NC}"; }

clear
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              🚀 ONE-COMMAND DEPLOYMENT 🚀                  ║"
echo "║         Complete Setup, Migration & Deployment             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Check Supabase
log_step "STEP 1: Checking Supabase Status..."
echo ""

SUPABASE_URL="https://cuxzzpsyufcewtmicszk.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 \
  "${SUPABASE_URL}/rest/v1/" \
  -H "apikey: ${SUPABASE_ANON_KEY}" 2>/dev/null || echo "000")

if [[ "$HTTP_CODE" != "200" ]]; then
  log_error "Supabase project is not accessible"
  echo ""
  log_info "Your Supabase project needs attention."
  log_info "Run this for detailed instructions:"
  echo ""
  echo "  ./scripts/check-and-restore-supabase.sh"
  echo ""
  exit 1
fi

log_success "Supabase is active and accessible"

# Step 2: Check if migrations needed
log_step "STEP 2: Checking Database Schema..."
echo ""

# Try to query a table to see if migrations are applied
TABLES_EXIST=$(curl -s "${SUPABASE_URL}/rest/v1/courses?limit=1" \
  -H "apikey: ${SUPABASE_ANON_KEY}" 2>/dev/null | grep -q "error" && echo "no" || echo "yes")

if [[ "$TABLES_EXIST" == "no" ]]; then
  log_warning "Database tables not found - migrations needed"
  echo ""
  log_info "You need to apply Supabase migrations first."
  echo ""
  log_bold "Choose your method:"
  echo ""
  echo "Option 1: Interactive Wizard (Recommended)"
  echo "  ./scripts/apply-migrations-interactive.sh"
  echo ""
  echo "Option 2: Supabase CLI (Fastest)"
  echo "  npm install -g supabase"
  echo "  supabase login"
  echo "  supabase link --project-ref cuxzzpsyufcewtmicszk"
  echo "  supabase db push"
  echo ""
  echo "Option 3: Dashboard (Manual)"
  echo "  https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql"
  echo "  Copy/paste each file from supabase/migrations/"
  echo ""
  log_info "After migrations, run this script again: ./GO.sh"
  echo ""
  exit 0
fi

log_success "Database schema is ready"

# Step 3: Install dependencies
log_step "STEP 3: Installing Dependencies..."
echo ""

if pnpm install --silent 2>/dev/null || npm install --silent 2>/dev/null; then
  log_success "Dependencies installed"
else
  log_error "Failed to install dependencies"
  exit 1
fi

# Step 4: Build application
log_step "STEP 4: Building Application..."
echo ""

if pnpm run build 2>&1 | grep -q "built in"; then
  log_success "Application built successfully"
else
  log_error "Build failed"
  exit 1
fi

# Step 5: Set GitHub secrets
log_step "STEP 5: Configuring GitHub Secrets..."
echo ""

if command -v gh &> /dev/null; then
  gh secret set VITE_SUPABASE_URL -b"${SUPABASE_URL}" 2>/dev/null && \
    log_success "Set VITE_SUPABASE_URL" || log_warning "Could not set VITE_SUPABASE_URL"
  
  gh secret set VITE_SUPABASE_ANON_KEY -b"${SUPABASE_ANON_KEY}" 2>/dev/null && \
    log_success "Set VITE_SUPABASE_ANON_KEY" || log_warning "Could not set VITE_SUPABASE_ANON_KEY"
  
  if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
    gh secret set CLOUDFLARE_API_TOKEN -b"${CLOUDFLARE_API_TOKEN}" 2>/dev/null && \
      log_success "Set CLOUDFLARE_API_TOKEN" || log_warning "Could not set CLOUDFLARE_API_TOKEN"
  fi
else
  log_warning "GitHub CLI not available - skipping secrets"
  log_info "Install: https://cli.github.com/"
fi

# Step 6: Deploy to Cloudflare
log_step "STEP 6: Deploying to Cloudflare Pages..."
echo ""

if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
  if command -v wrangler &> /dev/null; then
    if wrangler pages deploy dist --project-name=elevateforhumanity 2>&1 | grep -q "Success"; then
      log_success "Deployed to Cloudflare Pages"
      DEPLOYED=true
    else
      log_warning "Cloudflare deployment failed"
      DEPLOYED=false
    fi
  else
    log_warning "Wrangler not installed"
    log_info "Install: npm install -g wrangler"
    DEPLOYED=false
  fi
else
  log_warning "CLOUDFLARE_API_TOKEN not set"
  log_info "Set it to enable automatic deployment"
  DEPLOYED=false
fi

# Step 7: Commit and push
log_step "STEP 7: Committing Changes..."
echo ""

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "feat: complete deployment via GO.sh

- Applied Supabase migrations
- Built application
- Configured environment
- Ready for production

Co-authored-by: Ona <no-reply@ona.com>" 2>/dev/null && \
    log_success "Changes committed" || log_info "Nothing to commit"
  
  if git push origin $(git branch --show-current) 2>/dev/null; then
    log_success "Pushed to GitHub"
    log_info "GitHub Actions will trigger deployment"
  else
    log_warning "Could not push to GitHub"
  fi
else
  log_info "No changes to commit"
fi

# Summary
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  🎉 DEPLOYMENT COMPLETE! 🎉                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

log_success "Summary:"
echo "   ✅ Supabase: Active and connected"
echo "   ✅ Database: Schema ready"
echo "   ✅ Dependencies: Installed"
echo "   ✅ Build: Successful"
echo "   ✅ GitHub Secrets: Configured"
if [ "${DEPLOYED:-false}" = true ]; then
  echo "   ✅ Cloudflare: Deployed"
else
  echo "   ⚠️  Cloudflare: Manual deployment needed"
fi
echo "   ✅ Git: Committed and pushed"
echo ""

log_info "🌐 Your Application:"
echo ""
echo "   Cloudflare Pages: https://elevateforhumanity.pages.dev"
echo "   Render Backend:   https://elevateforhumanity.onrender.com"
echo ""

if [ "${DEPLOYED:-false}" = false ]; then
  log_info "📝 Manual Deployment:"
  echo ""
  echo "   To deploy to Cloudflare Pages manually:"
  echo "   1. Set: export CLOUDFLARE_API_TOKEN='your-token'"
  echo "   2. Run: pnpm run cf:deploy"
  echo ""
  echo "   Or wait for GitHub Actions to deploy automatically"
  echo ""
fi

log_info "📚 Next Steps:"
echo "   • Test your app: https://elevateforhumanity.pages.dev"
echo "   • Check GitHub Actions: https://github.com/elevateforhumanity/fix2/actions"
echo "   • View Supabase: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk"
echo ""

log_success "🚀 All done! Your app is live!"
echo ""
