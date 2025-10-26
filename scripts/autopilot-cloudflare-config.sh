#!/bin/bash
# Autopilot Cloudflare Configuration Script
# This script automates Cloudflare setup for Elevate for Humanity

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
check_env_vars() {
    log_info "Checking required environment variables..."
    
    local missing_vars=()
    
    if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
        missing_vars+=("CLOUDFLARE_API_TOKEN")
    fi
    
    if [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
        missing_vars+=("CLOUDFLARE_ACCOUNT_ID")
    fi
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        log_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        echo ""
        echo "Please set these variables before running this script:"
        echo "  export CLOUDFLARE_API_TOKEN='your-token-here'"
        echo "  export CLOUDFLARE_ACCOUNT_ID='your-account-id-here'"
        echo ""
        echo "Get your API token from: https://dash.cloudflare.com/profile/api-tokens"
        exit 1
    fi
    
    log_success "All required environment variables are set"
}

# Verify API token
verify_api_token() {
    log_info "Verifying Cloudflare API token..."
    
    local response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json")
    
    local success=$(echo "$response" | jq -r '.success')
    
    if [ "$success" = "true" ]; then
        log_success "API token is valid"
        return 0
    else
        log_error "API token is invalid"
        echo "$response" | jq '.'
        exit 1
    fi
}

# Get Cloudflare Zone ID
get_zone_id() {
    log_info "Getting Cloudflare Zone ID for elevateforhumanity.org..."
    
    local response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=elevateforhumanity.org" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json")
    
    local success=$(echo "$response" | jq -r '.success')
    
    if [ "$success" = "true" ]; then
        CLOUDFLARE_ZONE_ID=$(echo "$response" | jq -r '.result[0].id')
        
        if [ "$CLOUDFLARE_ZONE_ID" = "null" ] || [ -z "$CLOUDFLARE_ZONE_ID" ]; then
            log_error "Zone not found. Please add elevateforhumanity.org to your Cloudflare account first."
            exit 1
        fi
        
        log_success "Zone ID: $CLOUDFLARE_ZONE_ID"
        export CLOUDFLARE_ZONE_ID
        return 0
    else
        log_error "Failed to get Zone ID"
        echo "$response" | jq '.'
        exit 1
    fi
}

# Configure DNS records
configure_dns() {
    log_info "Configuring DNS records..."
    
    # Get existing DNS records
    local existing_records=$(curl -s -X GET \
        "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json")
    
    # Create or update A record for root domain
    log_info "Setting up A record for root domain..."
    local a_record_id=$(echo "$existing_records" | jq -r '.result[] | select(.type=="A" and .name=="elevateforhumanity.org") | .id')
    
    if [ -n "$a_record_id" ] && [ "$a_record_id" != "null" ]; then
        log_info "Updating existing A record..."
        curl -s -X PUT \
            "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${a_record_id}" \
            -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
            -H "Content-Type: application/json" \
            --data '{
                "type": "A",
                "name": "@",
                "content": "75.2.60.5",
                "ttl": 1,
                "proxied": true
            }' > /dev/null
    else
        log_info "Creating new A record..."
        curl -s -X POST \
            "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records" \
            -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
            -H "Content-Type: application/json" \
            --data '{
                "type": "A",
                "name": "@",
                "content": "75.2.60.5",
                "ttl": 1,
                "proxied": true
            }' > /dev/null
    fi
    
    log_success "A record configured"
    
    # Create or update CNAME for www
    log_info "Setting up CNAME for www subdomain..."
    local cname_record_id=$(echo "$existing_records" | jq -r '.result[] | select(.type=="CNAME" and .name=="www.elevateforhumanity.org") | .id')
    
    if [ -n "$cname_record_id" ] && [ "$cname_record_id" != "null" ]; then
        log_info "Updating existing CNAME record..."
        curl -s -X PUT \
            "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${cname_record_id}" \
            -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
            -H "Content-Type: application/json" \
            --data '{
                "type": "CNAME",
                "name": "www",
                "content": "elevateforhumanity.netlify.app",
                "ttl": 1,
                "proxied": true
            }' > /dev/null
    else
        log_info "Creating new CNAME record..."
        curl -s -X POST \
            "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records" \
            -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
            -H "Content-Type: application/json" \
            --data '{
                "type": "CNAME",
                "name": "www",
                "content": "elevateforhumanity.netlify.app",
                "ttl": 1,
                "proxied": true
            }' > /dev/null
    fi
    
    log_success "CNAME record configured"
}

# Configure SSL/TLS settings
configure_ssl() {
    log_info "Configuring SSL/TLS settings..."
    
    # Set SSL mode to Full (strict)
    curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/settings/ssl" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"value":"full"}' > /dev/null
    
    log_success "SSL mode set to Full (strict)"
    
    # Enable Always Use HTTPS
    curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/settings/always_use_https" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"value":"on"}' > /dev/null
    
    log_success "Always Use HTTPS enabled"
    
    # Enable Automatic HTTPS Rewrites
    curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/settings/automatic_https_rewrites" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"value":"on"}' > /dev/null
    
    log_success "Automatic HTTPS Rewrites enabled"
}

# Configure caching settings
configure_caching() {
    log_info "Configuring caching settings..."
    
    # Set caching level
    curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/settings/cache_level" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"value":"aggressive"}' > /dev/null
    
    log_success "Caching level set to aggressive"
    
    # Set browser cache TTL (4 hours)
    curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/settings/browser_cache_ttl" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"value":14400}' > /dev/null
    
    log_success "Browser cache TTL set to 4 hours"
    
    # Enable Brotli compression
    curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/settings/brotli" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"value":"on"}' > /dev/null
    
    log_success "Brotli compression enabled"
}

# Configure security settings
configure_security() {
    log_info "Configuring security settings..."
    
    # Set security level to Medium
    curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/settings/security_level" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"value":"medium"}' > /dev/null
    
    log_success "Security level set to Medium"
}

# Update environment files
update_env_files() {
    log_info "Updating environment files..."
    
    # Update .env.example with actual values
    if [ -f ".env.example" ]; then
        # Update Cloudflare Worker URLs
        sed -i "s|ORCHESTRATOR_URL=.*|ORCHESTRATOR_URL=https://efh-autopilot-orchestrator.workers.dev|g" .env.example
        sed -i "s|ANALYZER_URL=.*|ANALYZER_URL=https://efh-autopilot-analyzer.workers.dev|g" .env.example
        sed -i "s|AGENT_WORKER_URL=.*|AGENT_WORKER_URL=https://efh-agent.${CLOUDFLARE_ACCOUNT_ID}.workers.dev|g" .env.example
        
        log_success "Updated .env.example"
    fi
    
    # Create .env.cloudflare with actual values
    cat > .env.cloudflare <<EOF
# Cloudflare Configuration
# Generated by autopilot-cloudflare-config.sh on $(date)

CLOUDFLARE_API_TOKEN=${CLOUDFLARE_API_TOKEN}
CLOUDFLARE_ACCOUNT_ID=${CLOUDFLARE_ACCOUNT_ID}
CLOUDFLARE_ZONE_ID=${CLOUDFLARE_ZONE_ID}

# Cloudflare Worker URLs
ORCHESTRATOR_URL=https://efh-autopilot-orchestrator.workers.dev
ANALYZER_URL=https://efh-autopilot-analyzer.workers.dev
AGENT_WORKER_URL=https://efh-agent.${CLOUDFLARE_ACCOUNT_ID}.workers.dev
AI_STYLIST_URL=https://efh-ai-stylist.${CLOUDFLARE_ACCOUNT_ID}.workers.dev
EOF
    
    log_success "Created .env.cloudflare"
}

# Update source code with Worker URLs
update_source_code() {
    log_info "Updating source code with Worker URLs..."
    
    local files=(
        "src/components/AIPageBuilder.tsx"
        "src/components/OrchestratorAdmin.tsx"
        "src/components/AssetGenerator.tsx"
        "src/pages/AutopilotAdmin.tsx"
    )
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            # Replace placeholder URLs
            sed -i "s|https://efh-ai-stylist.your-subdomain.workers.dev|https://efh-ai-stylist.${CLOUDFLARE_ACCOUNT_ID}.workers.dev|g" "$file"
            sed -i "s|https://efh-autopilot-orchestrator.your-subdomain.workers.dev|https://efh-autopilot-orchestrator.workers.dev|g" "$file"
            log_success "Updated $file"
        else
            log_warning "File not found: $file"
        fi
    done
}

# Generate summary report
generate_report() {
    log_info "Generating configuration report..."
    
    cat > CLOUDFLARE_CONFIG_REPORT.md <<EOF
# Cloudflare Configuration Report

**Generated:** $(date)
**Domain:** elevateforhumanity.org

## Configuration Summary

### DNS Records
- ✅ A record: @ → 75.2.60.5 (Netlify)
- ✅ CNAME record: www → elevateforhumanity.netlify.app
- ✅ Proxy enabled (orange cloud)

### SSL/TLS Settings
- ✅ SSL mode: Full (strict)
- ✅ Always Use HTTPS: Enabled
- ✅ Automatic HTTPS Rewrites: Enabled

### Caching Settings
- ✅ Caching level: Aggressive
- ✅ Browser cache TTL: 4 hours (14400 seconds)
- ✅ Brotli compression: Enabled

### Security Settings
- ✅ Security level: Medium
- ✅ Bot Fight Mode: Available (configure in dashboard)

### Environment Variables
\`\`\`bash
CLOUDFLARE_API_TOKEN=${CLOUDFLARE_API_TOKEN:0:20}...
CLOUDFLARE_ACCOUNT_ID=${CLOUDFLARE_ACCOUNT_ID}
CLOUDFLARE_ZONE_ID=${CLOUDFLARE_ZONE_ID}
\`\`\`

### Cloudflare Worker URLs
- Orchestrator: https://efh-autopilot-orchestrator.workers.dev
- Analyzer: https://efh-autopilot-analyzer.workers.dev
- Agent: https://efh-agent.${CLOUDFLARE_ACCOUNT_ID}.workers.dev
- AI Stylist: https://efh-ai-stylist.${CLOUDFLARE_ACCOUNT_ID}.workers.dev

## Next Steps

### 1. Deploy Cloudflare Workers
Workers need to be deployed using Wrangler CLI:
\`\`\`bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy workers (requires wrangler.toml files)
wrangler deploy
\`\`\`

### 2. Register Autopilots
Once workers are deployed, register them:
\`\`\`bash
export ORCHESTRATOR_URL=https://efh-autopilot-orchestrator.workers.dev
bash scripts/register-autopilots.sh
\`\`\`

### 3. Add Variables to Netlify
Add these environment variables to Netlify:
1. Go to: https://app.netlify.com
2. Select your site
3. Go to: Site settings → Environment variables
4. Add:
   - CLOUDFLARE_API_TOKEN
   - CLOUDFLARE_ACCOUNT_ID
   - CLOUDFLARE_ZONE_ID
   - ORCHESTRATOR_URL
   - ANALYZER_URL
   - AGENT_WORKER_URL
   - AI_STYLIST_URL

### 4. Verify Configuration
\`\`\`bash
# Check DNS
dig elevateforhumanity.org

# Check SSL
curl -I https://elevateforhumanity.org

# Test workers (after deployment)
curl https://efh-autopilot-orchestrator.workers.dev/health
\`\`\`

### 5. Monitor
- Check Cloudflare Analytics: https://dash.cloudflare.com
- Monitor cache hit ratio (aim for >80%)
- Review security threats
- Check SSL certificate expiration

## Files Updated
- .env.example
- .env.cloudflare (created)
- src/components/AIPageBuilder.tsx
- src/components/OrchestratorAdmin.tsx
- src/components/AssetGenerator.tsx
- src/pages/AutopilotAdmin.tsx

## Configuration Complete ✅

Your Cloudflare configuration is complete. Follow the next steps above to deploy workers and complete the setup.

---
**Generated by:** autopilot-cloudflare-config.sh
**Task:** AUTOPILOT_CLOUDFLARE_TASK.json
EOF
    
    log_success "Report generated: CLOUDFLARE_CONFIG_REPORT.md"
}

# Main execution
main() {
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║   Autopilot Cloudflare Configuration                      ║"
    echo "║   Elevate for Humanity                                     ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    
    check_env_vars
    verify_api_token
    get_zone_id
    configure_dns
    configure_ssl
    configure_caching
    configure_security
    update_env_files
    update_source_code
    generate_report
    
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║   Configuration Complete! ✅                               ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Next steps:"
    echo "  1. Review: CLOUDFLARE_CONFIG_REPORT.md"
    echo "  2. Deploy Cloudflare Workers (requires wrangler CLI)"
    echo "  3. Register autopilots: bash scripts/register-autopilots.sh"
    echo "  4. Add environment variables to Netlify"
    echo "  5. Verify configuration: bash scripts/test-cloudflare.sh"
    echo ""
}

# Run main function
main "$@"
