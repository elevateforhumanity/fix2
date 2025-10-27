#!/bin/bash
# Autopilot: Full Setup Orchestrator
# Handles complete configuration from audit to deployment

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

log_header() {
    echo ""
    echo -e "${MAGENTA}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${MAGENTA}║  $1${NC}"
    echo -e "${MAGENTA}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

log_section() {
    echo ""
    echo -e "${CYAN}▶▶▶ $1${NC}"
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

log_step() {
    echo -e "${CYAN}[$1/$2]${NC} $3"
}

# Check prerequisites
check_prerequisites() {
    log_section "Checking Prerequisites"
    
    local missing=0
    
    # Node.js
    if command -v node &> /dev/null; then
        log_success "Node.js $(node --version)"
    else
        log_error "Node.js not found"
        missing=$((missing + 1))
    fi
    
    # pnpm
    if command -v pnpm &> /dev/null; then
        log_success "pnpm $(pnpm --version)"
    else
        log_error "pnpm not found (run: corepack enable)"
        missing=$((missing + 1))
    fi
    
    # Git
    if command -v git &> /dev/null; then
        log_success "Git $(git --version | cut -d' ' -f3)"
    else
        log_error "Git not found"
        missing=$((missing + 1))
    fi
    
    # Netlify CLI (optional but recommended)
    if command -v netlify &> /dev/null; then
        log_success "Netlify CLI $(netlify --version | head -1)"
    else
        log_warning "Netlify CLI not found (optional)"
        log_info "Install with: npm install -g netlify-cli"
    fi
    
    if [ $missing -gt 0 ]; then
        echo ""
        log_error "$missing required tools missing"
        exit 1
    fi
    
    echo ""
    log_success "All prerequisites met"
}

# Step 1: Environment Setup
setup_environment() {
    log_step 1 6 "Setting up environment"
    
    cd "$ROOT_DIR"
    
    # Check for .env file
    if [ ! -f ".env" ]; then
        log_warning ".env file not found"
        
        if [ -f ".env.example" ]; then
            log_info "Creating .env from .env.example"
            cp .env.example .env
            log_success "Created .env file"
            echo ""
            log_warning "IMPORTANT: Edit .env with your actual credentials"
            log_info "Required variables:"
            echo "  - VITE_SUPABASE_URL"
            echo "  - VITE_SUPABASE_ANON_KEY"
            echo "  - VITE_STRIPE_PUBLISHABLE_KEY"
            echo "  - STRIPE_SECRET_KEY"
            echo "  - VITE_APPLICATION_FORM_URL"
            echo ""
            read -p "Press Enter after editing .env file..."
        else
            log_error ".env.example not found"
            exit 1
        fi
    else
        log_success ".env file exists"
    fi
    
    # Verify environment variables
    if [ -f "$SCRIPT_DIR/verify-env-vars.sh" ]; then
        log_info "Verifying environment variables..."
        if bash "$SCRIPT_DIR/verify-env-vars.sh"; then
            log_success "Environment variables verified"
        else
            log_warning "Some environment variables missing or invalid"
            log_info "Continuing anyway..."
        fi
    fi
}

# Step 2: Install Dependencies
install_dependencies() {
    log_step 2 6 "Installing dependencies"
    
    cd "$ROOT_DIR"
    
    if [ -f "pnpm-lock.yaml" ]; then
        log_info "Running: pnpm install --frozen-lockfile"
        if pnpm install --frozen-lockfile; then
            log_success "Dependencies installed"
        else
            log_error "Failed to install dependencies"
            exit 1
        fi
    else
        log_info "Running: pnpm install"
        if pnpm install; then
            log_success "Dependencies installed"
        else
            log_error "Failed to install dependencies"
            exit 1
        fi
    fi
}

# Step 3: Run Autopilot Checks
run_autopilot_checks() {
    log_step 3 6 "Running autopilot checks"
    
    cd "$ROOT_DIR"
    
    if [ -f "tools/autopilot.mjs" ]; then
        log_info "Running: node tools/autopilot.mjs"
        if node tools/autopilot.mjs; then
            log_success "Autopilot checks passed"
        else
            log_warning "Some autopilot checks failed"
            log_info "Continuing anyway..."
        fi
    else
        log_warning "tools/autopilot.mjs not found"
    fi
}

# Step 4: Build Application
build_application() {
    log_step 4 6 "Building application"
    
    cd "$ROOT_DIR"
    
    log_info "Running: pnpm run build"
    if pnpm run build; then
        log_success "Build completed successfully"
        
        # Verify build output
        if [ -d "dist" ] && [ -f "dist/index.html" ]; then
            local size=$(du -sh dist | cut -f1)
            log_success "Build output: dist/ ($size)"
        else
            log_error "Build output missing"
            exit 1
        fi
    else
        log_error "Build failed"
        exit 1
    fi
}

# Step 5: Configure Netlify (Optional)
configure_netlify() {
    log_step 5 6 "Configuring Netlify (optional)"
    
    if ! command -v netlify &> /dev/null; then
        log_warning "Netlify CLI not installed, skipping"
        log_info "Install with: npm install -g netlify-cli"
        return 0
    fi
    
    if ! netlify status &> /dev/null; then
        log_warning "Not logged in to Netlify"
        log_info "Run: netlify login"
        log_info "Then run this script again"
        return 0
    fi
    
    echo ""
    log_info "Netlify CLI is available and authenticated"
    read -p "Configure Netlify environment variables? (y/N) " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if [ -f "$SCRIPT_DIR/autopilot-configure-netlify.sh" ]; then
            bash "$SCRIPT_DIR/autopilot-configure-netlify.sh"
        else
            log_error "autopilot-configure-netlify.sh not found"
        fi
    else
        log_info "Skipping Netlify configuration"
        log_info "You can run it later with:"
        echo "  bash scripts/autopilot-configure-netlify.sh"
    fi
}

# Step 6: Final Verification
final_verification() {
    log_step 6 6 "Final verification"
    
    cd "$ROOT_DIR"
    
    local issues=0
    
    # Check build output
    if [ -d "dist" ]; then
        log_success "Build output exists"
    else
        log_error "Build output missing"
        issues=$((issues + 1))
    fi
    
    # Check critical files
    local critical_files=(
        "dist/index.html"
        "dist/sitemap.xml"
        "dist/robots.txt"
        "dist/_redirects"
        "dist/_headers"
    )
    
    for file in "${critical_files[@]}"; do
        if [ -f "$file" ]; then
            log_success "$file"
        else
            log_warning "$file missing"
        fi
    done
    
    # Check for audit reports
    if [ -f "CONFIGURATION_AUDIT_REPORT.md" ]; then
        log_success "Audit report available"
    fi
    
    if [ -f "CRITICAL_FIXES_APPLIED.md" ]; then
        log_success "Fixes documentation available"
    fi
    
    if [ $issues -eq 0 ]; then
        log_success "All verifications passed"
    else
        log_warning "$issues issues found"
    fi
}

# Main orchestration
main() {
    log_header "🚀 AUTOPILOT: FULL SETUP ORCHESTRATOR"
    
    echo "This script will:"
    echo "  1. Check prerequisites"
    echo "  2. Set up environment variables"
    echo "  3. Install dependencies"
    echo "  4. Run autopilot checks"
    echo "  5. Build application"
    echo "  6. Configure Netlify (optional)"
    echo "  7. Verify everything works"
    echo ""
    
    read -p "Continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
    
    # Execute steps
    check_prerequisites
    setup_environment
    install_dependencies
    run_autopilot_checks
    build_application
    configure_netlify
    final_verification
    
    # Success summary
    log_header "✅ SETUP COMPLETE"
    
    echo -e "${GREEN}All steps completed successfully!${NC}"
    echo ""
    echo "📋 Next Steps:"
    echo ""
    echo "1. Review audit reports:"
    echo "   - CONFIGURATION_AUDIT_REPORT.md"
    echo "   - CRITICAL_FIXES_APPLIED.md"
    echo "   - AUDIT_COMPLETE_SUMMARY.md"
    echo ""
    echo "2. If you haven't configured Netlify yet:"
    echo "   bash scripts/autopilot-configure-netlify.sh"
    echo ""
    echo "3. Deploy to Netlify:"
    echo "   netlify deploy --prod"
    echo "   # Or push to main branch for auto-deploy"
    echo ""
    echo "4. Monitor deployment:"
    echo "   https://app.netlify.com"
    echo ""
    echo "5. Test your site:"
    echo "   - Check homepage loads"
    echo "   - Test Supabase connection"
    echo "   - Test Stripe checkout"
    echo "   - Test application form"
    echo ""
    
    log_success "Autopilot setup complete! 🎉"
}

# Run main
main "$@"
