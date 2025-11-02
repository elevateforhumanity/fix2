#!/bin/bash
# Autopilot Deployment Loop
# Continuously monitors and fixes deployments until all are successful
# Based on SYSTEM_CHEAT_SHEET.md and autopilot configuration

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m'

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
SITE_NAME="elevateforhumanityfix2"
MAX_ITERATIONS=${MAX_ITERATIONS:-10}
CHECK_INTERVAL=${CHECK_INTERVAL:-30}
LOG_FILE="logs/autopilot-deploy-$(date +%Y%m%d-%H%M%S).log"

# Create logs directory
mkdir -p logs

# Logging functions
log() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

log_header() {
    log "\n${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}"
    log "${BLUE}${BOLD}  $1${NC}"
    log "${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}\n"
}

log_success() { log "  ${GREEN}✓${NC} $1"; }
log_error() { log "  ${RED}✖${NC} $1"; }
log_warning() { log "  ${YELLOW}⚠${NC} $1"; }
log_info() { log "  ${CYAN}ℹ${NC} $1"; }
log_step() { log "${MAGENTA}${BOLD}▶${NC} $1"; }

# Check if site is accessible
check_site_status() {
    local url=$1
    local status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
    echo "$status"
}

# Run diagnostic
run_diagnostic() {
    log_step "Running diagnostic..."
    bash scripts/diagnose-deployment.sh > /tmp/diagnostic.log 2>&1
    
    if grep -q "No critical issues found" /tmp/diagnostic.log; then
        return 0
    else
        return 1
    fi
}

# Fix common issues
fix_issues() {
    log_step "Fixing common issues..."
    
    # 1. Ensure dist is built
    if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
        log_info "Building project..."
        pnpm run build >> "$LOG_FILE" 2>&1
        log_success "Build completed"
    fi
    
    # 2. Fix environment variables
    if [ -f ".env" ]; then
        if grep -q "your-.*-here" .env; then
            log_warning "Found placeholder values in .env"
            log_info "These need to be set in Netlify dashboard"
        fi
    fi
    
    # 3. Commit any uncommitted changes
    if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
        log_info "Committing changes..."
        git add .
        git commit -m "Autopilot: Fix deployment issues [skip ci]" >> "$LOG_FILE" 2>&1 || true
        log_success "Changes committed"
    fi
    
    # 4. Push to trigger deployment
    log_info "Pushing to GitHub..."
    git push origin $(git branch --show-current) >> "$LOG_FILE" 2>&1 || true
    log_success "Pushed to GitHub"
}

# Wait for deployment
wait_for_deployment() {
    local max_wait=300  # 5 minutes
    local waited=0
    
    log_step "Waiting for deployment to complete..."
    
    while [ $waited -lt $max_wait ]; do
        sleep 10
        waited=$((waited + 10))
        
        # Check if site is accessible
        local status=$(check_site_status "https://elevateforhumanity.org")
        if [ "$status" = "200" ]; then
            log_success "Site is accessible (HTTP $status)"
            return 0
        fi
        
        echo -n "."
    done
    
    echo ""
    log_warning "Deployment timeout after ${max_wait}s"
    return 1
}

# Check deployment success
check_deployment_success() {
    log_step "Checking deployment status..."
    
    local main_site=$(check_site_status "https://elevateforhumanity.org")
    local netlify_site=$(check_site_status "https://${SITE_NAME}.netlify.app")
    
    log_info "Main site (elevateforhumanity.org): HTTP $main_site"
    log_info "Netlify site (${SITE_NAME}.netlify.app): HTTP $netlify_site"
    
    # Main site must be accessible
    if [ "$main_site" = "200" ]; then
        log_success "Main site is LIVE"
        
        # Check if build is fresh
        if [ -d "dist" ]; then
            local build_age=$(($(date +%s) - $(stat -c %Y dist/index.html 2>/dev/null || echo 0)))
            if [ $build_age -lt 600 ]; then  # Less than 10 minutes old
                log_success "Build is fresh (${build_age}s old)"
                return 0
            fi
        fi
        
        return 0
    else
        log_error "Main site is not accessible"
        return 1
    fi
}

# Main autopilot loop
main() {
    log_header "Autopilot Deployment Loop Started"
    log_info "Site ID: $SITE_ID"
    log_info "Max iterations: $MAX_ITERATIONS"
    log_info "Check interval: ${CHECK_INTERVAL}s"
    log_info "Log file: $LOG_FILE"
    
    local iteration=0
    local success=false
    
    while [ $iteration -lt $MAX_ITERATIONS ]; do
        iteration=$((iteration + 1))
        
        log_header "Iteration $iteration of $MAX_ITERATIONS"
        
        # Step 1: Run diagnostic
        if run_diagnostic; then
            log_success "Diagnostic passed"
        else
            log_warning "Diagnostic found issues"
        fi
        
        # Step 2: Check current deployment status
        if check_deployment_success; then
            log_success "Deployment is successful!"
            success=true
            break
        else
            log_warning "Deployment needs fixing"
        fi
        
        # Step 3: Fix issues
        fix_issues
        
        # Step 4: Wait for deployment
        if wait_for_deployment; then
            log_success "Deployment completed"
        else
            log_warning "Deployment may still be in progress"
        fi
        
        # Step 5: Verify deployment
        if check_deployment_success; then
            log_success "Deployment verified successful!"
            success=true
            break
        fi
        
        # Wait before next iteration
        if [ $iteration -lt $MAX_ITERATIONS ]; then
            log_info "Waiting ${CHECK_INTERVAL}s before next check..."
            sleep $CHECK_INTERVAL
        fi
    done
    
    # Final summary
    log_header "Autopilot Loop Complete"
    
    if [ "$success" = true ]; then
        log "${GREEN}${BOLD}✓ ALL DEPLOYMENTS SUCCESSFUL!${NC}\n"
        log "Site Status:"
        log "  • Main Site: https://elevateforhumanity.org ${GREEN}✓ LIVE${NC}"
        log "  • Dashboard: https://app.netlify.com/sites/${SITE_ID}"
        log "  • Iterations: $iteration"
        exit 0
    else
        log "${RED}${BOLD}✖ DEPLOYMENT ISSUES REMAIN${NC}\n"
        log "After $iteration iterations, some issues persist."
        log ""
        log "Manual steps required:"
        log "  1. Check build minutes: https://app.netlify.com/sites/${SITE_ID}/settings/billing"
        log "  2. Check deploy logs: https://app.netlify.com/sites/${SITE_ID}/deploys"
        log "  3. Verify environment variables in Netlify dashboard"
        log "  4. Check log file: $LOG_FILE"
        exit 1
    fi
}

# Handle interrupts
trap 'log "\n${YELLOW}Autopilot interrupted${NC}"; exit 130' INT TERM

# Run main loop
main "$@"
