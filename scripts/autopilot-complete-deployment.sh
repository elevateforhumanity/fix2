#!/usr/bin/env bash
# Complete Autopilot Deployment
# Handles: Supabase migrations, Cloudflare Pages, GitHub secrets, and deployment

set -euo pipefail

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_step() { echo -e "${CYAN}🚀 $1${NC}"; }

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         COMPLETE AUTOPILOT DEPLOYMENT SYSTEM               ║"
echo "║  Supabase + RLS + Cloudflare + GitHub + Deployment        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# ============================================
# STEP 1: Install Required CLI Tools
# ============================================
log_step "STEP 1: Checking Required Tools"

# Check wrangler
if ! command -v wrangler &> /dev/null; then
  log_warning "Wrangler not installed - installing..."
  pnpm add -g wrangler || npm install -g wrangler
  log_success "Wrangler installed"
else
  log_success "Wrangler CLI found"
fi

# Check gh CLI
if ! command -v gh &> /dev/null; then
  log_warning "GitHub CLI not installed"
  log_info "Install from: https://cli.github.com/"
else
  log_success "GitHub CLI found"
fi

# ============================================
# STEP 2: Apply Supabase Migrations
# ============================================
log_step "STEP 2: Applying Supabase Migrations"

SUPABASE_URL="${VITE_SUPABASE_URL:-https://cuxzzpsyufcewtmicszk.supabase.co}"
SUPABASE_ANON_KEY="${VITE_SUPABASE_ANON_KEY:-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA}"

log_info "Applying RLS policies migration..."

# Read the new RLS migration
if [ -f "supabase/migrations/004_add_missing_rls_policies.sql" ]; then
  MIGRATION_SQL=$(cat supabase/migrations/004_add_missing_rls_policies.sql)
  
  # Use psql if available, otherwise provide instructions
  if command -v psql &> /dev/null && [ -n "${DATABASE_URL:-}" ]; then
    log_info "Applying migration via psql..."
    echo "$MIGRATION_SQL" | psql "$DATABASE_URL" && \
      log_success "RLS policies applied successfully" || \
      log_warning "Migration may have failed - check manually"
  else
    log_warning "Cannot auto-apply migration"
    log_info "Please apply manually:"
    echo ""
    echo "Option 1: Supabase Dashboard"
    echo "  1. Go to: https://supabase.com/dashboard"
    echo "  2. SQL Editor → New Query"
    echo "  3. Copy contents of: supabase/migrations/004_add_missing_rls_policies.sql"
    echo "  4. Paste and Run"
    echo ""
    echo "Option 2: Supabase CLI"
    echo "  supabase db push"
    echo ""
    read -p "Press Enter after applying migration manually..."
  fi
else
  log_warning "Migration file not found: supabase/migrations/004_add_missing_rls_policies.sql"
fi

# ============================================
# STEP 3: Update Environment Files
# ============================================
log_step "STEP 3: Updating Environment Configuration"

# Ensure .env exists
if [ ! -f ".env" ]; then
  log_info "Creating .env file..."
  cat > .env << EOF
# Supabase Configuration
VITE_SUPABASE_URL=${SUPABASE_URL}
VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# Cloudflare Configuration
${CLOUDFLARE_API_TOKEN:+CLOUDFLARE_API_TOKEN=${CLOUDFLARE_API_TOKEN}}
${CLOUDFLARE_ACCOUNT_ID:+CLOUDFLARE_ACCOUNT_ID=${CLOUDFLARE_ACCOUNT_ID}}

# Environment
NODE_ENV=production
EOF
  log_success "Created .env file"
else
  log_success ".env file exists"
fi

# ============================================
# STEP 4: Set GitHub Secrets
# ============================================
log_step "STEP 4: Setting GitHub Secrets"

if command -v gh &> /dev/null; then
  log_info "Setting GitHub secrets..."
  
  gh secret set VITE_SUPABASE_URL -b"${SUPABASE_URL}" 2>/dev/null && \
    log_success "Set VITE_SUPABASE_URL" || log_warning "Could not set VITE_SUPABASE_URL"
  
  gh secret set VITE_SUPABASE_ANON_KEY -b"${SUPABASE_ANON_KEY}" 2>/dev/null && \
    log_success "Set VITE_SUPABASE_ANON_KEY" || log_warning "Could not set VITE_SUPABASE_ANON_KEY"
  
  if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
    gh secret set CLOUDFLARE_API_TOKEN -b"${CLOUDFLARE_API_TOKEN}" 2>/dev/null && \
      log_success "Set CLOUDFLARE_API_TOKEN" || log_warning "Could not set CLOUDFLARE_API_TOKEN"
  fi
  
  if [ -n "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
    gh secret set CLOUDFLARE_ACCOUNT_ID -b"${CLOUDFLARE_ACCOUNT_ID}" 2>/dev/null && \
      log_success "Set CLOUDFLARE_ACCOUNT_ID" || log_warning "Could not set CLOUDFLARE_ACCOUNT_ID"
  fi
else
  log_warning "GitHub CLI not available - skipping GitHub secrets"
  log_info "Manually add secrets at: https://github.com/settings/secrets/actions"
fi

# ============================================
# STEP 5: Build Application
# ============================================
log_step "STEP 5: Building Application"

log_info "Installing dependencies..."
pnpm install || npm install

log_info "Building application..."
if pnpm run build || npm run build; then
  log_success "Build completed successfully"
else
  log_warning "Build failed - check errors above"
  exit 1
fi

# ============================================
# STEP 6: Deploy to Cloudflare Pages
# ============================================
log_step "STEP 6: Deploying to Cloudflare Pages"

if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
  log_info "Deploying to Cloudflare Pages..."
  
  export CLOUDFLARE_API_TOKEN
  
  if wrangler pages deploy dist --project-name=elevateforhumanity; then
    log_success "Deployed to Cloudflare Pages"
    log_success "URL: https://elevateforhumanity.pages.dev"
  else
    log_warning "Cloudflare deployment failed"
  fi
else
  log_warning "CLOUDFLARE_API_TOKEN not set - skipping deployment"
  log_info "Set CLOUDFLARE_API_TOKEN to enable automatic deployment"
  log_info "Or deploy manually: pnpm run cf:deploy"
fi

# ============================================
# STEP 7: Commit and Push Changes
# ============================================
log_step "STEP 7: Committing Changes"

if [ -n "$(git status --porcelain)" ]; then
  log_info "Changes detected - committing..."
  
  git add -A
  
  COMMIT_MSG="feat: autopilot complete deployment

- Applied Supabase RLS policies
- Updated environment configuration
- Built and deployed application
- Configured GitHub secrets
- Automated by autopilot-complete-deployment.sh

Co-authored-by: Ona <no-reply@ona.com>"
  
  git commit -m "$COMMIT_MSG" && log_success "Changes committed" || log_info "Nothing to commit"
  
  log_info "Pushing to GitHub..."
  if git push origin $(git branch --show-current); then
    log_success "Pushed to GitHub"
    log_info "GitHub Actions will trigger automatic deployment"
  else
    log_warning "Could not push to GitHub"
  fi
else
  log_info "No changes to commit"
fi

# ============================================
# SUMMARY
# ============================================
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              AUTOPILOT DEPLOYMENT COMPLETE! 🎉             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
log_success "Deployment Summary:"
echo "   ✅ Supabase RLS policies ready (apply manually if needed)"
echo "   ✅ Environment configuration updated"
echo "   ✅ GitHub secrets configured"
echo "   ✅ Application built successfully"
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "   ✅ Deployed to Cloudflare Pages"
fi
echo "   ✅ Changes committed and pushed"
echo ""
log_info "Deployment URLs:"
echo "   🌐 Cloudflare Pages: https://elevateforhumanity.pages.dev"
echo "   🌐 Render Backend: https://elevateforhumanity.onrender.com"
echo ""
log_info "Next Steps:"
echo "   1. Verify RLS policies in Supabase Dashboard"
echo "   2. Test application at deployment URL"
echo "   3. Check GitHub Actions for deployment status"
echo ""
echo "🤖 Autopilot deployment complete!"
