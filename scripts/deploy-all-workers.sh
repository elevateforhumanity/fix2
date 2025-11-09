#!/usr/bin/env bash
# Complete deployment script for all Autopilot workers
# Usage: ./scripts/deploy-all-workers.sh

set -euo pipefail

echo "🚀 Autopilot Workers Deployment Script"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check required environment variables
check_env() {
    local var_name=$1
    if [[ -z "${!var_name:-}" ]]; then
        echo -e "${RED}❌ Missing required environment variable: $var_name${NC}"
        return 1
    fi
    echo -e "${GREEN}✅ $var_name is set${NC}"
}

echo "📋 Checking required environment variables..."
echo ""

# Supabase variables
check_env "SUPABASE_PROJECT_REF" || exit 1
check_env "SUPABASE_SERVICE_ROLE_KEY" || exit 1
check_env "SUPABASE_URL" || exit 1
check_env "AUTOPILOT_SECRET" || exit 1

# Netlify variables
check_env "NETLIFY_BUILD_HOOK" || exit 1
check_env "NETLIFY_TOKEN" || exit 1
check_env "NETLIFY_SITE_ID" || exit 1

# GitHub variables
check_env "GITHUB_TOKEN" || exit 1

# Cloudflare variables (optional)
if [[ -n "${CLOUDFLARE_ACCOUNT_ID:-}" ]] && [[ -n "${CLOUDFLARE_API_TOKEN:-}" ]]; then
    echo -e "${GREEN}✅ Cloudflare credentials found${NC}"
    DEPLOY_CLOUDFLARE=true
else
    echo -e "${YELLOW}⚠️  Cloudflare credentials not found - skipping Cloudflare Worker${NC}"
    DEPLOY_CLOUDFLARE=false
fi

echo ""
echo "================================================"
echo "Step 1: Deploy Supabase Edge Functions"
echo "================================================"
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found. Install it first:${NC}"
    echo "   npm install -g supabase"
    exit 1
fi

echo "📦 Deploying autopilot-db-worker..."
supabase functions deploy autopilot-db-worker \
    --project-ref "$SUPABASE_PROJECT_REF" \
    --no-verify-jwt

echo ""
echo "🔧 Setting environment variables for autopilot-db-worker..."
supabase secrets set \
    SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY" \
    SUPABASE_URL="$SUPABASE_URL" \
    AUTOPILOT_SECRET="$AUTOPILOT_SECRET" \
    --project-ref "$SUPABASE_PROJECT_REF"

echo ""
echo "📦 Deploying autopilot-ai-worker..."
supabase functions deploy autopilot-ai-worker \
    --project-ref "$SUPABASE_PROJECT_REF" \
    --no-verify-jwt

echo ""
echo "🔧 Setting environment variables for autopilot-ai-worker..."
supabase secrets set \
    SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY" \
    SUPABASE_URL="$SUPABASE_URL" \
    AUTOPILOT_SECRET="$AUTOPILOT_SECRET" \
    --project-ref "$SUPABASE_PROJECT_REF"

echo ""
echo "📦 Deploying autopilot-health-worker..."
supabase functions deploy autopilot-health-worker \
    --project-ref "$SUPABASE_PROJECT_REF" \
    --no-verify-jwt

echo ""
echo "🔧 Setting environment variables for autopilot-health-worker..."
supabase secrets set \
    SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY" \
    SUPABASE_URL="$SUPABASE_URL" \
    AUTOPILOT_SECRET="$AUTOPILOT_SECRET" \
    NETLIFY_BUILD_HOOK="$NETLIFY_BUILD_HOOK" \
    --project-ref "$SUPABASE_PROJECT_REF"

echo ""
echo -e "${GREEN}✅ All Supabase Edge Functions deployed successfully!${NC}"

# Deploy Cloudflare Worker if credentials are available
if [[ "$DEPLOY_CLOUDFLARE" == true ]]; then
    echo ""
    echo "================================================"
    echo "Step 2: Deploy Cloudflare Worker"
    echo "================================================"
    echo ""

    # Check if Wrangler is installed
    if ! command -v wrangler &> /dev/null; then
        echo -e "${RED}❌ Wrangler CLI not found. Install it first:${NC}"
        echo "   npm install -g wrangler"
        exit 1
    fi

    echo "📦 Deploying autopilot-deploy-worker to Cloudflare..."
    
    # Set Cloudflare credentials
    export CLOUDFLARE_ACCOUNT_ID
    export CLOUDFLARE_API_TOKEN

    # Deploy the worker
    wrangler deploy

    echo ""
    echo "🔧 Setting secrets for Cloudflare Worker..."
    echo "$AUTOPILOT_SECRET" | wrangler secret put AUTOPILOT_TOKEN
    echo "$NETLIFY_TOKEN" | wrangler secret put NETLIFY_TOKEN
    echo "$NETLIFY_SITE_ID" | wrangler secret put NETLIFY_SITE_ID
    echo "$GITHUB_TOKEN" | wrangler secret put GITHUB_TOKEN
    echo "$SUPABASE_URL" | wrangler secret put SUPABASE_URL

    echo ""
    echo -e "${GREEN}✅ Cloudflare Worker deployed successfully!${NC}"
fi

echo ""
echo "================================================"
echo "Step 3: Configure GitHub Actions Secrets"
echo "================================================"
echo ""

echo "📝 You need to manually add these secrets to your GitHub repository:"
echo ""
echo "   Repository Settings → Secrets and variables → Actions → New repository secret"
echo ""
echo "   Required secrets:"
echo "   - SUPABASE_PROJECT_REF"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo "   - SUPABASE_URL"
echo "   - AUTOPILOT_SECRET"
echo "   - NETLIFY_BUILD_HOOK"
echo "   - NETLIFY_TOKEN"
echo "   - NETLIFY_SITE_ID"
echo "   - GITHUB_TOKEN (usually auto-available as secrets.GITHUB_TOKEN)"

if [[ "$DEPLOY_CLOUDFLARE" == true ]]; then
    echo "   - CLOUDFLARE_WORKER_URL (get from Cloudflare dashboard after deployment)"
fi

echo ""
echo "================================================"
echo "Step 4: Verify Deployments"
echo "================================================"
echo ""

echo "🧪 Testing Supabase Edge Functions..."

# Test autopilot-db-worker
echo ""
echo "Testing autopilot-db-worker health check..."
WORKER_URL="https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/autopilot-db-worker"
RESPONSE=$(curl -s -X POST "$WORKER_URL" \
    -H "Content-Type: application/json" \
    -H "x-autopilot-secret: $AUTOPILOT_SECRET" \
    -d '{"task":"health_check"}' \
    -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [[ "$HTTP_CODE" == "200" ]]; then
    echo -e "${GREEN}✅ autopilot-db-worker is healthy${NC}"
    echo "   Response: $BODY"
else
    echo -e "${RED}❌ autopilot-db-worker health check failed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $BODY"
fi

# Test autopilot-health-worker
echo ""
echo "Testing autopilot-health-worker..."
HEALTH_URL="https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/autopilot-health-worker"
RESPONSE=$(curl -s -X POST "$HEALTH_URL" \
    -H "Content-Type: application/json" \
    -H "x-autopilot-secret: $AUTOPILOT_SECRET" \
    -d '{"task":"full_health_check"}' \
    -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [[ "$HTTP_CODE" == "200" ]]; then
    echo -e "${GREEN}✅ autopilot-health-worker is healthy${NC}"
    echo "   Response: $BODY"
else
    echo -e "${RED}❌ autopilot-health-worker check failed (HTTP $HTTP_CODE)${NC}"
    echo "   Response: $BODY"
fi

echo ""
echo "================================================"
echo "🎉 Deployment Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Add GitHub secrets (see Step 3 above)"
echo "2. Push to main branch to trigger first autopilot run"
echo "3. Monitor GitHub Actions: https://github.com/YOUR_ORG/YOUR_REPO/actions"
echo "4. Check Supabase Functions logs: https://supabase.com/dashboard/project/$SUPABASE_PROJECT_REF/functions"

if [[ "$DEPLOY_CLOUDFLARE" == true ]]; then
    echo "5. Check Cloudflare Worker logs: https://dash.cloudflare.com/$CLOUDFLARE_ACCOUNT_ID/workers"
fi

echo ""
echo "Worker URLs:"
echo "  - DB Worker: https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/autopilot-db-worker"
echo "  - AI Worker: https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/autopilot-ai-worker"
echo "  - Health Worker: https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/autopilot-health-worker"

echo ""
echo -e "${GREEN}✅ All done! Your Autopilot system is ready.${NC}"
