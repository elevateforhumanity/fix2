#!/bin/bash
# Autopilot: Configure Netlify Environment Variables
# Automatically sets up all required environment variables in Netlify

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

log_header() {
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
}

log_section() {
    echo ""
    echo -e "${CYAN}▶ $1${NC}"
    echo "───────────────────────────────────────────────────────────"
}

log_success() {
    echo -e "  ${GREEN}✓${NC} $1"
}

log_error() {
    echo -e "  ${RED}✖${NC} $1"
}

log_warning() {
    echo -e "  ${YELLOW}⚠${NC} $1"
}

log_info() {
    echo -e "  ${BLUE}ℹ${NC} $1"
}

# Check if Netlify CLI is installed
check_netlify_cli() {
    if ! command -v netlify &> /dev/null; then
        log_error "Netlify CLI not found"
        echo ""
        echo "Install with: npm install -g netlify-cli"
        echo "Then run: netlify login"
        exit 1
    fi
    log_success "Netlify CLI installed"
}

# Check if logged in to Netlify
check_netlify_auth() {
    if ! netlify status &> /dev/null; then
        log_error "Not logged in to Netlify"
        echo ""
        echo "Run: netlify login"
        exit 1
    fi
    log_success "Authenticated with Netlify"
}

# Load environment variables from .env
load_env_file() {
    local env_file="${1:-.env}"
    
    if [ ! -f "$env_file" ]; then
        log_warning ".env file not found"
        log_info "Using .env.example as template"
        
        if [ ! -f ".env.example" ]; then
            log_error ".env.example not found"
            exit 1
        fi
        
        echo ""
        echo "Create .env file with your actual values:"
        echo "  cp .env.example .env"
        echo "  # Edit .env with your credentials"
        echo ""
        exit 1
    fi
    
    log_success "Found $env_file"
}

# Set environment variable in Netlify
set_netlify_env() {
    local key="$1"
    local value="$2"
    local context="${3:-all}"
    
    if [ -z "$value" ]; then
        log_warning "$key is empty, skipping"
        return 0
    fi
    
    # Mask sensitive values in logs
    local display_value="$value"
    if [[ "$key" =~ (KEY|SECRET|TOKEN|PASSWORD) ]]; then
        display_value="${value:0:10}...${value: -4}"
    fi
    
    if netlify env:set "$key" "$value" --context "$context" &> /dev/null; then
        log_success "$key = $display_value"
        return 0
    else
        log_error "Failed to set $key"
        return 1
    fi
}

# Main configuration
main() {
    log_header "Autopilot: Netlify Environment Configuration"
    
    # Pre-flight checks
    log_section "Pre-flight Checks"
    check_netlify_cli
    check_netlify_auth
    load_env_file
    
    echo ""
    log_info "This will configure environment variables in Netlify"
    log_info "Context: production, deploy-preview, branch-deploy"
    echo ""
    
    read -p "Continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
    
    # Load .env file
    set -a
    source .env
    set +a
    
    # Critical Variables
    log_section "Critical Variables (Required)"
    
    # Supabase
    set_netlify_env "VITE_SUPABASE_URL" "${VITE_SUPABASE_URL:-}" "all"
    set_netlify_env "VITE_SUPABASE_ANON_KEY" "${VITE_SUPABASE_ANON_KEY:-}" "all"
    set_netlify_env "SUPABASE_SERVICE_KEY" "${SUPABASE_SERVICE_KEY:-}" "all"
    
    # Stripe
    set_netlify_env "VITE_STRIPE_PUBLISHABLE_KEY" "${VITE_STRIPE_PUBLISHABLE_KEY:-}" "all"
    set_netlify_env "STRIPE_SECRET_KEY" "${STRIPE_SECRET_KEY:-}" "all"
    set_netlify_env "STRIPE_WEBHOOK_SECRET" "${STRIPE_WEBHOOK_SECRET:-}" "all"
    
    # Application Form
    set_netlify_env "VITE_APPLICATION_FORM_URL" "${VITE_APPLICATION_FORM_URL:-}" "all"
    
    # JWT
    set_netlify_env "JWT_SECRET" "${JWT_SECRET:-}" "all"
    
    # High Priority Variables
    log_section "High Priority Variables"
    
    # Cloudflare
    set_netlify_env "CLOUDFLARE_API_TOKEN" "${CLOUDFLARE_API_TOKEN:-}" "all"
    set_netlify_env "CLOUDFLARE_ACCOUNT_ID" "${CLOUDFLARE_ACCOUNT_ID:-}" "all"
    set_netlify_env "CF_API_TOKEN" "${CF_API_TOKEN:-}" "all"
    set_netlify_env "CF_ACCOUNT_ID" "${CF_ACCOUNT_ID:-}" "all"
    
    # Cloudflare Workers
    set_netlify_env "VITE_AGENT_WORKER_URL" "${VITE_AGENT_WORKER_URL:-}" "all"
    set_netlify_env "VITE_ANALYZER_URL" "${VITE_ANALYZER_URL:-}" "all"
    set_netlify_env "VITE_ORCHESTRATOR_URL" "${VITE_ORCHESTRATOR_URL:-}" "all"
    set_netlify_env "VITE_AI_STYLIST_URL" "${VITE_AI_STYLIST_URL:-}" "all"
    
    # Render
    set_netlify_env "RENDER_API_KEY" "${RENDER_API_KEY:-}" "all"
    set_netlify_env "RENDER_SERVICE_ID" "${RENDER_SERVICE_ID:-}" "all"
    set_netlify_env "FRONTEND_URL" "${FRONTEND_URL:-}" "all"
    set_netlify_env "VITE_API_URL" "${VITE_API_URL:-}" "all"
    
    # Optional Variables
    log_section "Optional Variables"
    
    # Google
    set_netlify_env "GOOGLE_OAUTH_CLIENT_ID" "${GOOGLE_OAUTH_CLIENT_ID:-}" "all"
    set_netlify_env "GOOGLE_OAUTH_CLIENT_SECRET" "${GOOGLE_OAUTH_CLIENT_SECRET:-}" "all"
    
    # Email
    set_netlify_env "MAIL_FROM" "${MAIL_FROM:-}" "all"
    set_netlify_env "MAIL_FROM_NAME" "${MAIL_FROM_NAME:-}" "all"
    
    # Analytics
    set_netlify_env "VITE_GA_MEASUREMENT_ID" "${VITE_GA_MEASUREMENT_ID:-}" "all"
    set_netlify_env "VITE_GTM_ID" "${VITE_GTM_ID:-}" "all"
    set_netlify_env "SENTRY_DSN" "${SENTRY_DSN:-}" "all"
    set_netlify_env "VITE_SENTRY_DSN" "${VITE_SENTRY_DSN:-}" "all"
    
    # Social Media
    set_netlify_env "SLACK_WEBHOOK_URL" "${SLACK_WEBHOOK_URL:-}" "all"
    set_netlify_env "OPENAI_API_KEY" "${OPENAI_API_KEY:-}" "all"
    
    # Application Config
    set_netlify_env "NODE_ENV" "production" "production"
    set_netlify_env "SITE_TITLE" "${SITE_TITLE:-Elevate For Humanity}" "all"
    set_netlify_env "VITE_ENVIRONMENT" "production" "production"
    set_netlify_env "VITE_APP_VERSION" "2.0.0" "all"
    
    # Summary
    echo ""
    log_header "Configuration Complete"
    echo ""
    log_success "Environment variables configured in Netlify"
    echo ""
    log_info "Next steps:"
    echo "  1. Verify variables: netlify env:list"
    echo "  2. Trigger new deploy: netlify deploy --prod"
    echo "  3. Monitor build logs for any errors"
    echo ""
    log_info "Variables are set for all contexts:"
    echo "  - production (main branch)"
    echo "  - deploy-preview (pull requests)"
    echo "  - branch-deploy (other branches)"
    echo ""
}

# Run main
main "$@"
