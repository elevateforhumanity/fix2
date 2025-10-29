#!/bin/bash
# Autopilot: Configure Netlify NOW - Interactive Setup
# Gets token and configures everything automatically

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

clear

echo -e "${BLUE}${BOLD}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   AUTOPILOT NETLIFY CONFIGURATION                        ║
║   Fully Automated Setup                                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_error() { echo -e "${RED}✖${NC} $1"; }
log_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_step() { echo -e "\n${CYAN}${BOLD}▶ $1${NC}"; }

# Check if token already exists
check_existing_token() {
    if [ -n "${NETLIFY_AUTH_TOKEN:-}" ]; then
        log_success "Found NETLIFY_AUTH_TOKEN in environment"
        return 0
    fi
    
    if [ -f .env ] && grep -q "^NETLIFY_AUTH_TOKEN=" .env; then
        log_success "Found NETLIFY_AUTH_TOKEN in .env"
        export NETLIFY_AUTH_TOKEN=$(grep "^NETLIFY_AUTH_TOKEN=" .env | cut -d'=' -f2-)
        return 0
    fi
    
    return 1
}

# Get token interactively
get_token() {
    log_step "Getting Netlify Auth Token"
    
    if check_existing_token; then
        echo ""
        read -p "Use existing token? (y/n): " use_existing
        if [[ "$use_existing" =~ ^[Yy]$ ]]; then
            return 0
        fi
    fi
    
    echo ""
    log_info "You need a Netlify Personal Access Token"
    echo ""
    echo "  1. Open: ${CYAN}https://app.netlify.com/user/applications#personal-access-tokens${NC}"
    echo "  2. Click: ${BOLD}New access token${NC}"
    echo "  3. Name it: ${BOLD}Autopilot Configuration${NC}"
    echo "  4. Copy the token"
    echo ""
    
    read -p "Press ENTER when you have your token ready..."
    echo ""
    
    read -sp "Paste your Netlify token: " token
    echo ""
    
    if [ -z "$token" ]; then
        log_error "No token provided"
        exit 1
    fi
    
    export NETLIFY_AUTH_TOKEN="$token"
    
    # Save to .env
    if [ -f .env ]; then
        if grep -q "^NETLIFY_AUTH_TOKEN=" .env; then
            sed -i "s|^NETLIFY_AUTH_TOKEN=.*|NETLIFY_AUTH_TOKEN=$token|" .env
        else
            echo "NETLIFY_AUTH_TOKEN=$token" >> .env
        fi
    else
        echo "NETLIFY_AUTH_TOKEN=$token" > .env
    fi
    
    log_success "Token saved to .env"
}

# Test connection
test_connection() {
    log_step "Testing Connection"
    
    response=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "https://api.netlify.com/api/v1/sites/$SITE_ID" 2>/dev/null)
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" = "200" ]; then
        site_name=$(echo "$response" | sed '$d' | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
        log_success "Connected to site: $site_name"
        return 0
    else
        log_error "Connection failed (HTTP $http_code)"
        log_error "Token may be invalid or expired"
        exit 1
    fi
}

# Install Netlify CLI
install_cli() {
    log_step "Checking Netlify CLI"
    
    if command -v netlify &> /dev/null; then
        log_success "Netlify CLI already installed"
    else
        log_info "Installing Netlify CLI..."
        npm install -g netlify-cli
        log_success "Netlify CLI installed"
    fi
}

# Run configuration
run_configuration() {
    log_step "Running Automated Configuration"
    echo ""
    
    # Run the zero-touch script
    bash scripts/autopilot-netlify-zero-touch.sh
}

# Final report
show_report() {
    echo ""
    echo -e "${GREEN}${BOLD}"
    cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ✅ CONFIGURATION COMPLETE                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}\n"
    
    echo -e "${BOLD}What was configured:${NC}"
    echo "  ✓ Environment variables (13+ variables)"
    echo "  ✓ Build hooks (3 hooks)"
    echo "  ✓ Deploy notifications (email)"
    echo "  ✓ Build settings verified"
    echo ""
    
    echo -e "${BOLD}Your site:${NC}"
    echo "  Production: ${CYAN}https://elevateforhumanity.org${NC}"
    echo "  Dashboard: ${CYAN}https://app.netlify.com/sites/$SITE_ID${NC}"
    echo ""
    
    echo -e "${BOLD}Next steps:${NC}"
    echo "  1. Visit your site: ${CYAN}https://elevateforhumanity.org${NC}"
    echo "  2. Check dashboard: ${CYAN}https://app.netlify.com/sites/$SITE_ID${NC}"
    echo "  3. Monitor builds: ${CYAN}https://app.netlify.com/sites/$SITE_ID/deploys${NC}"
    echo ""
    
    echo -e "${GREEN}Everything is configured and ready! 🚀${NC}"
    echo ""
}

# Main execution
main() {
    get_token
    test_connection
    install_cli
    run_configuration
    show_report
}

# Run
main "$@"
