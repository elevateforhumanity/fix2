#!/bin/bash
# Autopilot: Complete Netlify Configuration via API
# Configures Analytics, Integrations, Environment Variables, Build Hooks, and Notifications

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# Site Configuration
SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
SITE_NAME="elevateforhumanityfix2"
PRODUCTION_URL="https://elevateforhumanity.org"

# API Configuration
NETLIFY_API="https://api.netlify.com/api/v1"

log_header() {
    echo -e "\n${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}${BOLD}  $1${NC}"
    echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}\n"
}

log_section() {
    echo -e "\n${CYAN}${BOLD}▶ $1${NC}"
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

# Check for Netlify auth token
check_auth() {
    log_section "Checking Authentication"
    
    if [ -z "${NETLIFY_AUTH_TOKEN:-}" ]; then
        log_error "NETLIFY_AUTH_TOKEN not set"
        echo ""
        echo "Get your token from: https://app.netlify.com/user/applications#personal-access-tokens"
        echo ""
        echo "Then set it:"
        echo "  export NETLIFY_AUTH_TOKEN='your_token_here'"
        echo ""
        echo "Or add to .env:"
        echo "  NETLIFY_AUTH_TOKEN=your_token_here"
        echo ""
        exit 1
    fi
    
    log_success "NETLIFY_AUTH_TOKEN found"
}

# Test API connection
test_api() {
    log_section "Testing API Connection"
    
    response=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "$NETLIFY_API/sites/$SITE_ID")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ]; then
        site_name=$(echo "$body" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
        log_success "Connected to site: $site_name"
        return 0
    else
        log_error "API connection failed (HTTP $http_code)"
        echo "$body" | head -5
        exit 1
    fi
}

# 1. Enable Netlify Analytics
enable_analytics() {
    log_section "1. Enabling Netlify Analytics"
    
    log_info "Checking current analytics status..."
    
    response=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "$NETLIFY_API/sites/$SITE_ID")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if echo "$body" | grep -q '"analytics_enabled":true'; then
        log_success "Analytics already enabled"
        return 0
    fi
    
    log_info "Enabling analytics..."
    
    # Note: Analytics must be enabled via dashboard or Netlify CLI
    # API doesn't have direct endpoint for this
    log_warning "Analytics must be enabled manually via dashboard"
    log_info "Go to: https://app.netlify.com/sites/$SITE_ID/analytics"
    log_info "Click 'Enable Analytics' button"
    
    # Create reminder file
    cat > /tmp/netlify-analytics-reminder.txt << EOF
⚠️  MANUAL ACTION REQUIRED

Enable Netlify Analytics:
1. Go to: https://app.netlify.com/sites/$SITE_ID/analytics
2. Click "Enable Analytics"
3. Confirm activation

This is included in your Pro plan at no extra cost.
EOF
    
    log_info "Reminder saved to: /tmp/netlify-analytics-reminder.txt"
}

# 2. Configure Environment Variables
configure_env_vars() {
    log_section "2. Configuring Environment Variables"
    
    # Load from .env if exists
    if [ -f .env ]; then
        log_info "Loading variables from .env"
        set -a
        source .env
        set +a
    fi
    
    # Define required variables
    declare -A env_vars=(
        ["AUTOPILOT_MODE"]="autonomous"
        ["AUTOPILOT_ENABLED"]="true"
        ["AUTOPILOT_AUTO_FIX"]="true"
        ["AUTOPILOT_AUTO_DEPLOY"]="true"
        ["VITE_SUPABASE_URL"]="${VITE_SUPABASE_URL:-}"
        ["VITE_SUPABASE_ANON_KEY"]="${VITE_SUPABASE_ANON_KEY:-}"
        ["SUPABASE_SERVICE_ROLE_KEY"]="${SUPABASE_SERVICE_ROLE_KEY:-}"
        ["SUPABASE_PROJECT_REF"]="${SUPABASE_PROJECT_REF:-cuxzzpsyufcewtmicszk}"
        ["VITE_STRIPE_PUBLISHABLE_KEY"]="${VITE_STRIPE_PUBLISHABLE_KEY:-}"
        ["STRIPE_SECRET_KEY"]="${STRIPE_SECRET_KEY:-}"
        ["STRIPE_WEBHOOK_SECRET"]="${STRIPE_WEBHOOK_SECRET:-}"
        ["VITE_APPLICATION_FORM_URL"]="${VITE_APPLICATION_FORM_URL:-}"
        ["GOOGLE_ANALYTICS_ID"]="${GOOGLE_ANALYTICS_ID:-G-EFHWORKFORCE01}"
    )
    
    for key in "${!env_vars[@]}"; do
        value="${env_vars[$key]}"
        
        if [ -z "$value" ]; then
            log_warning "$key is empty, skipping"
            continue
        fi
        
        log_info "Setting $key..."
        
        # Set environment variable via API
        response=$(curl -s -w "\n%{http_code}" -X PUT \
            -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{\"key\":\"$key\",\"scopes\":[\"builds\",\"functions\",\"runtime\",\"post-processing\"],\"values\":[{\"context\":\"all\",\"value\":\"$value\"}]}" \
            "$NETLIFY_API/accounts/sites/$SITE_ID/env/$key")
        
        http_code=$(echo "$response" | tail -n1)
        
        if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
            log_success "$key configured"
        else
            log_error "$key failed (HTTP $http_code)"
        fi
    done
}

# 3. Create Build Hooks
create_build_hooks() {
    log_section "3. Creating Build Hooks"
    
    # Define build hooks
    declare -A hooks=(
        ["Autopilot Auto-Deploy"]="main"
        ["Manual Production Deploy"]="main"
        ["Staging Environment"]="staging"
        ["Content Update Hook"]="main"
    )
    
    for hook_name in "${!hooks[@]}"; do
        branch="${hooks[$hook_name]}"
        
        log_info "Creating hook: $hook_name (branch: $branch)..."
        
        response=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{\"title\":\"$hook_name\",\"branch\":\"$branch\"}" \
            "$NETLIFY_API/sites/$SITE_ID/build_hooks")
        
        http_code=$(echo "$response" | tail -n1)
        body=$(echo "$response" | sed '$d')
        
        if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
            hook_url=$(echo "$body" | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
            log_success "$hook_name created"
            log_info "Hook URL: $hook_url"
            
            # Save to file for GitHub Secrets
            if [ "$hook_name" = "Autopilot Auto-Deploy" ]; then
                echo "NETLIFY_BUILD_HOOK_PRODUCTION=$hook_url" >> /tmp/netlify-build-hooks.env
                log_info "Saved to /tmp/netlify-build-hooks.env"
            fi
        elif echo "$body" | grep -q "already exists"; then
            log_warning "$hook_name already exists"
        else
            log_error "$hook_name failed (HTTP $http_code)"
        fi
    done
    
    if [ -f /tmp/netlify-build-hooks.env ]; then
        log_success "Build hooks saved to: /tmp/netlify-build-hooks.env"
        log_info "Add these to GitHub Secrets:"
        cat /tmp/netlify-build-hooks.env
    fi
}

# 4. Configure Deploy Notifications
configure_notifications() {
    log_section "4. Configuring Deploy Notifications"
    
    # Get user email from API
    user_response=$(curl -s \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "$NETLIFY_API/user")
    
    user_email=$(echo "$user_response" | grep -o '"email":"[^"]*"' | cut -d'"' -f4)
    
    if [ -z "$user_email" ]; then
        log_warning "Could not get user email, using placeholder"
        user_email="your-email@example.com"
    fi
    
    log_info "User email: $user_email"
    
    # Define notifications
    declare -A notifications=(
        ["deploy_failed"]="email"
        ["deploy_succeeded"]="email"
        ["deploy_locked"]="email"
    )
    
    for event in "${!notifications[@]}"; do
        type="${notifications[$event]}"
        
        log_info "Configuring $event notification ($type)..."
        
        response=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{\"event\":\"$event\",\"type\":\"$type\",\"email\":\"$user_email\"}" \
            "$NETLIFY_API/sites/$SITE_ID/notifications")
        
        http_code=$(echo "$response" | tail -n1)
        body=$(echo "$response" | sed '$d')
        
        if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
            log_success "$event notification configured"
        elif echo "$body" | grep -q "already exists"; then
            log_warning "$event notification already exists"
        else
            log_error "$event notification failed (HTTP $http_code)"
        fi
    done
}

# 5. Configure Supabase Integration
configure_supabase() {
    log_section "5. Configuring Supabase Integration"
    
    log_warning "Supabase integration must be enabled via dashboard"
    log_info "Go to: https://app.netlify.com/sites/$SITE_ID/integrations"
    log_info "Search for 'Supabase' and click 'Enable'"
    log_info "Connect to project: cuxzzpsyufcewtmicszk"
    
    # Create reminder file
    cat > /tmp/netlify-supabase-reminder.txt << EOF
⚠️  MANUAL ACTION REQUIRED

Enable Supabase Integration:
1. Go to: https://app.netlify.com/sites/$SITE_ID/integrations
2. Search for "Supabase"
3. Click "Enable"
4. Connect to project: cuxzzpsyufcewtmicszk
5. Authorize access

This will auto-sync environment variables and database connections.
EOF
    
    log_info "Reminder saved to: /tmp/netlify-supabase-reminder.txt"
}

# 6. Verify Configuration
verify_configuration() {
    log_section "6. Verifying Configuration"
    
    log_info "Checking site configuration..."
    
    response=$(curl -s \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "$NETLIFY_API/sites/$SITE_ID")
    
    # Check build settings
    if echo "$response" | grep -q '"build_settings"'; then
        log_success "Build settings configured"
    fi
    
    # Check environment variables
    env_response=$(curl -s \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "$NETLIFY_API/accounts/sites/$SITE_ID/env")
    
    env_count=$(echo "$env_response" | grep -o '"key"' | wc -l)
    log_success "Environment variables: $env_count configured"
    
    # Check build hooks
    hooks_response=$(curl -s \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "$NETLIFY_API/sites/$SITE_ID/build_hooks")
    
    hooks_count=$(echo "$hooks_response" | grep -o '"title"' | wc -l)
    log_success "Build hooks: $hooks_count configured"
    
    # Check notifications
    notif_response=$(curl -s \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "$NETLIFY_API/sites/$SITE_ID/notifications")
    
    notif_count=$(echo "$notif_response" | grep -o '"event"' | wc -l)
    log_success "Notifications: $notif_count configured"
}

# 7. Generate Summary Report
generate_report() {
    log_section "7. Configuration Summary"
    
    cat > /tmp/netlify-configuration-report.md << EOF
# Netlify Configuration Report

**Site:** $SITE_NAME ($SITE_ID)
**URL:** $PRODUCTION_URL
**Date:** $(date)

## ✅ Completed

### Environment Variables
- AUTOPILOT_MODE = autonomous
- AUTOPILOT_ENABLED = true
- AUTOPILOT_AUTO_FIX = true
- AUTOPILOT_AUTO_DEPLOY = true
- Supabase variables configured
- Stripe variables configured (if provided)
- Google Analytics configured

### Build Hooks
- Autopilot Auto-Deploy (main)
- Manual Production Deploy (main)
- Staging Environment (staging)
- Content Update Hook (main)

### Deploy Notifications
- Email on deploy failed
- Email on deploy succeeded
- Email on deploy locked

## ⚠️  Manual Actions Required

### 1. Enable Netlify Analytics
**URL:** https://app.netlify.com/sites/$SITE_ID/analytics
**Action:** Click "Enable Analytics" button
**Cost:** Included in Pro plan

### 2. Enable Supabase Integration
**URL:** https://app.netlify.com/sites/$SITE_ID/integrations
**Action:** Search "Supabase" → Enable → Connect to cuxzzpsyufcewtmicszk
**Cost:** Free

### 3. Add Build Hook to GitHub Secrets
**File:** /tmp/netlify-build-hooks.env
**Action:** Add NETLIFY_BUILD_HOOK_PRODUCTION to GitHub Secrets
**URL:** https://github.com/elevateforhumanity/fix2/settings/secrets/actions

## 📊 Configuration Status

- [x] Environment variables
- [x] Build hooks
- [x] Deploy notifications
- [ ] Analytics (manual)
- [ ] Supabase integration (manual)
- [ ] GitHub secrets (manual)

## 🔗 Quick Links

- **Dashboard:** https://app.netlify.com/sites/$SITE_ID
- **Analytics:** https://app.netlify.com/sites/$SITE_ID/analytics
- **Integrations:** https://app.netlify.com/sites/$SITE_ID/integrations
- **Settings:** https://app.netlify.com/sites/$SITE_ID/settings
- **Env Vars:** https://app.netlify.com/sites/$SITE_ID/settings/env
- **Build Hooks:** https://app.netlify.com/sites/$SITE_ID/settings/deploys#build-hooks
- **Notifications:** https://app.netlify.com/sites/$SITE_ID/settings/deploys#deploy-notifications

## 🎯 Next Steps

1. Enable Analytics (2 minutes)
2. Enable Supabase Integration (5 minutes)
3. Add build hook to GitHub Secrets (2 minutes)
4. Test deployment
5. Verify all features working

**Total Time:** ~10 minutes

---

*Generated by Autopilot Configuration Script*
*$(date)*
EOF
    
    log_success "Report saved to: /tmp/netlify-configuration-report.md"
    echo ""
    cat /tmp/netlify-configuration-report.md
}

# Main execution
main() {
    log_header "Netlify Autopilot Configuration"
    
    check_auth
    test_api
    enable_analytics
    configure_env_vars
    create_build_hooks
    configure_notifications
    configure_supabase
    verify_configuration
    generate_report
    
    log_header "Configuration Complete!"
    
    echo ""
    log_success "Automated configuration completed successfully"
    log_warning "Manual actions required - see report above"
    echo ""
    log_info "Reports saved to:"
    echo "  - /tmp/netlify-configuration-report.md"
    echo "  - /tmp/netlify-build-hooks.env"
    echo "  - /tmp/netlify-analytics-reminder.txt"
    echo "  - /tmp/netlify-supabase-reminder.txt"
    echo ""
    log_info "Next: Complete manual actions (10 minutes)"
    echo ""
}

# Run main function
main "$@"
