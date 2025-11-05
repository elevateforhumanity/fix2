#!/bin/bash
# Autopilot: Complete Portal Domain Setup
# Configures portal.elevateforhumanity.org on Netlify + DNS

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# Configuration
SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
PORTAL_DOMAIN="portal.elevateforhumanity.org"
NETLIFY_TARGET="main--elevateforhumanityfix.netlify.app"
CLOUDFLARE_ZONE="elevateforhumanity.org"

log_header() {
    echo -e "\n${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}${BOLD}  $1${NC}"
    echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════${NC}\n"
}

log_success() { echo -e "  ${GREEN}✓${NC} $1"; }
log_error() { echo -e "  ${RED}✖${NC} $1"; }
log_warning() { echo -e "  ${YELLOW}⚠${NC} $1"; }
log_info() { echo -e "  ${BLUE}ℹ${NC} $1"; }

# Check authentication
check_auth() {
    log_header "Checking Authentication"
    
    if [ -z "${NETLIFY_AUTH_TOKEN:-}" ]; then
        log_error "NETLIFY_AUTH_TOKEN not set"
        echo ""
        echo "Get your token from: https://app.netlify.com/user/applications#personal-access-tokens"
        echo "Then run: export NETLIFY_AUTH_TOKEN='your_token'"
        exit 1
    fi
    log_success "Netlify token found"
    
    if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
        log_warning "CLOUDFLARE_API_TOKEN not set - will skip DNS configuration"
        log_info "Get token from: https://dash.cloudflare.com/profile/api-tokens"
        SKIP_DNS=true
    else
        log_success "Cloudflare token found"
        SKIP_DNS=false
    fi
}

# Step 1: Add custom domain to Netlify
add_netlify_domain() {
    log_header "Step 1: Adding Custom Domain to Netlify"
    
    log_info "Adding $PORTAL_DOMAIN to site..."
    
    response=$(curl -s -w "\n%{http_code}" \
        -X POST \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        -H "Content-Type: application/json" \
        "https://api.netlify.com/api/v1/sites/$SITE_ID/domains" \
        -d "{\"domain\": \"$PORTAL_DOMAIN\"}")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
        log_success "Domain added successfully"
    elif echo "$body" | grep -q "already exists"; then
        log_warning "Domain already exists on this site"
    else
        log_error "Failed to add domain (HTTP $http_code)"
        echo "$body"
        exit 1
    fi
}

# Step 2: Configure DNS
configure_dns() {
    if [ "$SKIP_DNS" = true ]; then
        log_header "Step 2: DNS Configuration (Skipped)"
        log_warning "CLOUDFLARE_API_TOKEN not set"
        log_info "Manual DNS setup required:"
        echo ""
        echo "  Add CNAME record:"
        echo "    Type: CNAME"
        echo "    Name: portal"
        echo "    Target: $NETLIFY_TARGET"
        echo "    TTL: 3600"
        echo ""
        return 0
    fi
    
    log_header "Step 2: Configuring DNS on Cloudflare"
    
    # Get Zone ID
    log_info "Getting Cloudflare Zone ID..."
    zone_response=$(curl -s \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        "https://api.cloudflare.com/client/v4/zones?name=$CLOUDFLARE_ZONE")
    
    zone_id=$(echo "$zone_response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [ -z "$zone_id" ]; then
        log_error "Could not find Cloudflare zone"
        exit 1
    fi
    log_success "Zone ID: $zone_id"
    
    # Check for existing record
    log_info "Checking for existing DNS record..."
    existing=$(curl -s \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records?name=$PORTAL_DOMAIN")
    
    record_id=$(echo "$existing" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [ -n "$record_id" ]; then
        log_info "Updating existing record..."
        update_response=$(curl -s -X PUT \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records/$record_id" \
            -d "{
                \"type\": \"CNAME\",
                \"name\": \"portal\",
                \"content\": \"$NETLIFY_TARGET\",
                \"ttl\": 3600,
                \"proxied\": false
            }")
        
        if echo "$update_response" | grep -q '"success":true'; then
            log_success "DNS record updated"
        else
            log_error "Failed to update DNS record"
            exit 1
        fi
    else
        log_info "Creating new DNS record..."
        create_response=$(curl -s -X POST \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records" \
            -d "{
                \"type\": \"CNAME\",
                \"name\": \"portal\",
                \"content\": \"$NETLIFY_TARGET\",
                \"ttl\": 3600,
                \"proxied\": false,
                \"comment\": \"Portal subdomain - added by autopilot\"
            }")
        
        if echo "$create_response" | grep -q '"success":true'; then
            log_success "DNS record created"
        else
            log_error "Failed to create DNS record"
            exit 1
        fi
    fi
}

# Step 3: Provision SSL
provision_ssl() {
    log_header "Step 3: Provisioning SSL Certificate"
    
    log_info "Requesting SSL certificate for $PORTAL_DOMAIN..."
    
    ssl_response=$(curl -s -X POST \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "https://api.netlify.com/api/v1/sites/$SITE_ID/ssl")
    
    if echo "$ssl_response" | grep -q '"state":"provisioning"' || echo "$ssl_response" | grep -q '"state":"issued"'; then
        log_success "SSL certificate provisioning started"
        log_info "Certificate will be ready in 5-10 minutes"
    else
        log_warning "SSL provisioning may take a few minutes"
        log_info "Netlify will auto-provision once DNS propagates"
    fi
}

# Step 4: Trigger deployment
trigger_deployment() {
    log_header "Step 4: Triggering Deployment"
    
    log_info "Creating deployment..."
    
    deploy_response=$(curl -s -X POST \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys")
    
    deploy_id=$(echo "$deploy_response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [ -n "$deploy_id" ]; then
        log_success "Deployment triggered: $deploy_id"
        log_info "Monitor at: https://app.netlify.com/sites/elevateforhumanityfix/deploys/$deploy_id"
    else
        log_warning "Could not trigger deployment"
        log_info "Trigger manually at: https://app.netlify.com/sites/elevateforhumanityfix/deploys"
    fi
}

# Main execution
main() {
    log_header "🚀 Autopilot: Portal Domain Setup"
    
    check_auth
    add_netlify_domain
    configure_dns
    provision_ssl
    trigger_deployment
    
    log_header "✅ Setup Complete!"
    
    echo ""
    echo "📊 Configuration Summary:"
    echo "   Domain: $PORTAL_DOMAIN"
    echo "   Target: $NETLIFY_TARGET"
    echo "   Site ID: $SITE_ID"
    echo ""
    echo "⏱️  Timeline:"
    echo "   DNS Propagation: 5-30 minutes"
    echo "   SSL Certificate: 5-10 minutes after DNS"
    echo "   Total: ~15-40 minutes"
    echo ""
    echo "🔍 Verification:"
    echo "   DNS: https://dnschecker.org/#CNAME/$PORTAL_DOMAIN"
    echo "   Site: https://$PORTAL_DOMAIN (wait for DNS)"
    echo "   Netlify: https://app.netlify.com/sites/elevateforhumanityfix"
    echo ""
    echo "✨ Your portal will be live at: https://$PORTAL_DOMAIN"
    echo ""
}

main "$@"
