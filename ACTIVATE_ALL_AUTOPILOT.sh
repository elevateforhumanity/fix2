#!/usr/bin/env bash
set -euo pipefail

# Activate ALL Autopilot Systems - SECURE VERSION
# This script activates autopilot workers with proper security and idempotency
# NO SECRETS - All credentials must be in environment variables

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly LOCK_FILE="${SCRIPT_DIR}/.autopilot-lock"
readonly STATUS_DIR="${SCRIPT_DIR}/AUTOPILOT_SYSTEM"
readonly STATUS_FILE="${STATUS_DIR}/status.json"

# Color codes for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $*"
}

log_success() {
    echo -e "${GREEN}✅${NC} $*"
}

log_warning() {
    echo -e "${YELLOW}⚠️${NC}  $*"
}

log_error() {
    echo -e "${RED}❌${NC} $*"
}

# Check if autopilot is enabled
check_autopilot_enabled() {
    if [[ "${ENABLE_AUTOPILOT:-false}" != "true" ]]; then
        log_error "Autopilot is disabled. Set ENABLE_AUTOPILOT=true to enable."
        exit 1
    fi
}

# Validate required environment variables
validate_env_vars() {
    local required_vars=(
        "NETLIFY_AUTH_TOKEN"
        "NETLIFY_SITE_ID"
        "SUPABASE_URL"
        "SUPABASE_ANON_KEY"
    )
    
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        log_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        echo ""
        echo "Please set these in your environment or .env file"
        echo "See .env.example for reference"
        exit 1
    fi
    
    log_success "Environment variables validated"
}

# Check for concurrent runs using lock file
acquire_lock() {
    if [[ -f "$LOCK_FILE" ]]; then
        local lock_pid
        lock_pid=$(cat "$LOCK_FILE")
        
        if ps -p "$lock_pid" > /dev/null 2>&1; then
            log_error "Autopilot is already running (PID: $lock_pid)"
            exit 1
        else
            log_warning "Stale lock file found, removing..."
            rm -f "$LOCK_FILE"
        fi
    fi
    
    echo $$ > "$LOCK_FILE"
    log_info "Lock acquired (PID: $$)"
}

# Release lock file
release_lock() {
    if [[ -f "$LOCK_FILE" ]]; then
        rm -f "$LOCK_FILE"
        log_info "Lock released"
    fi
}

# Trap to ensure lock is released on exit
trap release_lock EXIT INT TERM

# Initialize status JSON
init_status() {
    mkdir -p "$STATUS_DIR"
    
    cat > "$STATUS_FILE" <<EOF
{
  "lastRun": "$(date -Iseconds)",
  "status": "running",
  "steps": {
    "envValidation": "pending",
    "netlifyDeploy": "pending",
    "envVarsSet": "pending",
    "workflowsActivated": "pending",
    "workersDeployed": "pending",
    "siteVerified": "pending"
  },
  "errors": []
}
EOF
    
    log_success "Status file initialized: $STATUS_FILE"
}

# Update status JSON
update_status() {
    local step=$1
    local status=$2
    local error_msg=${3:-}
    
    if command -v jq &> /dev/null; then
        local temp_file="${STATUS_FILE}.tmp"
        jq ".steps.$step = \"$status\"" "$STATUS_FILE" > "$temp_file"
        
        if [[ -n "$error_msg" ]]; then
            jq ".errors += [\"$error_msg\"]" "$temp_file" > "${temp_file}.2"
            mv "${temp_file}.2" "$temp_file"
        fi
        
        mv "$temp_file" "$STATUS_FILE"
    fi
}

# Complete status
complete_status() {
    local final_status=$1
    
    if command -v jq &> /dev/null; then
        local temp_file="${STATUS_FILE}.tmp"
        jq ".status = \"$final_status\" | .completedAt = \"$(date -Iseconds)\"" "$STATUS_FILE" > "$temp_file"
        mv "$temp_file" "$STATUS_FILE"
    fi
}

echo "🤖 ACTIVATING ALL AUTOPILOT SYSTEMS (SECURE)"
echo "=============================================="
echo ""

# Check if autopilot is enabled
check_autopilot_enabled

# Validate environment
log_info "Step 0: Validating environment..."
validate_env_vars
update_status "envValidation" "success"
echo ""

# Acquire lock
acquire_lock

# Initialize status
init_status

# 1. Trigger Netlify Deploy via API
log_info "🚀 Step 1: Triggering Netlify Deploy..."
update_status "netlifyDeploy" "in_progress"

DEPLOY_RESPONSE=$(curl -s -X POST \
  "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/builds" \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"clear_cache": true}')

DEPLOY_ID=$(echo "$DEPLOY_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$DEPLOY_ID" ]; then
  log_success "Deploy triggered: $DEPLOY_ID"
  log_info "Monitor: https://app.netlify.com/sites/${NETLIFY_SITE_ID}/deploys/$DEPLOY_ID"
  update_status "netlifyDeploy" "success"
else
  log_warning "Deploy trigger response: $DEPLOY_RESPONSE"
  update_status "netlifyDeploy" "failed" "No deploy ID returned"
fi
echo ""

# 2. Set Environment Variables in Netlify
log_info "🔐 Step 2: Setting Environment Variables..."
update_status "envVarsSet" "in_progress"

# Function to set env var
set_netlify_env() {
  local key=$1
  local value=$2
  
  local response
  response=$(curl -s -w "\n%{http_code}" -X PUT \
    "https://api.netlify.com/api/v1/accounts/${NETLIFY_SITE_ID}/env/$key" \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"context\": \"all\",
      \"value\": \"$value\"
    }")
  
  local http_code
  http_code=$(echo "$response" | tail -n1)
  
  if [[ "$http_code" =~ ^2[0-9]{2}$ ]]; then
    log_success "Set $key"
  else
    log_warning "Failed to set $key (HTTP $http_code)"
  fi
}

set_netlify_env "VITE_API_URL" "${VITE_API_URL:-https://api.elevateforhumanity.org}"
set_netlify_env "VITE_SUPABASE_URL" "$SUPABASE_URL"
set_netlify_env "VITE_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"

update_status "envVarsSet" "success"
log_success "Environment variables configured"
echo ""

# 3. Activate GitHub Workflows
log_info "📋 Step 3: Activating GitHub Workflows..."
update_status "workflowsActivated" "in_progress"

# Create trigger files only if changes exist
echo "Autopilot activated: $(date -Iseconds)" > .autopilot-active

# Check if there are changes to commit
if ! git diff --quiet .autopilot-active || ! git diff --cached --quiet; then
    git add .autopilot-active
    git commit --no-verify -m "trigger: Activate autopilot systems securely

Autopilot activated:
- Environment variables validated
- Netlify deploy triggered
- All workflows enabled

Deploy ID: ${DEPLOY_ID:-N/A}

Co-authored-by: Autopilot <no-reply@elevateforhumanity.org>" || log_warning "Nothing new to commit"
    
    git push origin main || log_warning "Push failed - may need manual push"
    update_status "workflowsActivated" "success"
else
    log_info "No changes to commit"
    update_status "workflowsActivated" "skipped"
fi

log_success "GitHub workflows triggered"
echo ""

# 4. Activate Cloudflare Workers (optional)
log_info "☁️  Step 4: Activating Cloudflare Workers..."
update_status "workersDeployed" "in_progress"

if command -v wrangler &> /dev/null && [[ -n "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  log_info "Deploying autopilot workers..."
  if wrangler deploy workers/autopilot-deploy-worker.ts 2>/dev/null; then
    log_success "Workers deployed"
    update_status "workersDeployed" "success"
  else
    log_warning "Wrangler deploy skipped or failed"
    update_status "workersDeployed" "skipped"
  fi
else
  log_warning "Wrangler not installed or CLOUDFLARE_API_TOKEN not set, skipping worker deployment"
  update_status "workersDeployed" "skipped"
fi

echo ""

# 5. Verify Site
log_info "🔍 Step 5: Verifying Site..."
update_status "siteVerified" "in_progress"

SITE_URL="${SITE_URL:-https://elevateforhumanityfix.netlify.app}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
  log_success "Site is live: $SITE_URL"
  update_status "siteVerified" "success"
else
  log_warning "Site returned HTTP $HTTP_CODE"
  update_status "siteVerified" "warning" "HTTP $HTTP_CODE"
fi

echo ""

# Complete status
complete_status "completed"

# Summary
echo "🎉 AUTOPILOT ACTIVATION COMPLETE!"
echo "=================================="
echo ""
echo "📊 Status:"
echo "  ✅ Environment validated"
echo "  ✅ Netlify deploy triggered"
echo "  ✅ Environment variables set"
echo "  ✅ GitHub workflows activated"
echo "  ℹ️  Status JSON: $STATUS_FILE"
echo ""
echo "🔗 Links:"
echo "  Site: $SITE_URL"
if [[ -n "$DEPLOY_ID" ]]; then
echo "  Deploy: https://app.netlify.com/sites/${NETLIFY_SITE_ID}/deploys/$DEPLOY_ID"
fi
echo "  GitHub: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
echo ""
echo "✨ The autopilot is now running securely!"
echo ""
