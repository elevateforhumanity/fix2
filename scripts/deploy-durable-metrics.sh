#!/bin/bash

# Deploy Durable Object Metrics Worker to Cloudflare
# This script deploys the autopilot metrics storage system

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Deploying Durable Object Metrics Worker"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check for required environment variables
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ CLOUDFLARE_API_TOKEN not set"
    echo ""
    echo "Please set your Cloudflare API token:"
    echo "  export CLOUDFLARE_API_TOKEN=your-token-here"
    echo ""
    echo "Or update it in .env file"
    exit 1
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "❌ CLOUDFLARE_ACCOUNT_ID not set"
    exit 1
fi

if [ -z "$AUTOPILOT_TOKEN" ]; then
    echo "⚠️  AUTOPILOT_TOKEN not set, generating one..."
    AUTOPILOT_TOKEN=$(openssl rand -hex 32)
    echo "Generated token: $AUTOPILOT_TOKEN"
    echo ""
    echo "Add this to your .env file:"
    echo "AUTOPILOT_TOKEN=$AUTOPILOT_TOKEN"
    echo ""
fi

echo "✅ Environment variables loaded"
echo ""

# Navigate to workers directory
cd "$(dirname "$0")/../workers"

echo "📦 Deploying worker..."
export CLOUDFLARE_API_TOKEN
export CLOUDFLARE_ACCOUNT_ID

if wrangler deploy --config wrangler-metrics.toml; then
    echo "✅ Worker deployed successfully"
else
    echo "❌ Worker deployment failed"
    echo ""
    echo "Common issues:"
    echo "1. API token doesn't have 'Workers Scripts:Edit' permission"
    echo "2. Account ID is incorrect"
    echo "3. Durable Objects not enabled on your account"
    echo ""
    echo "To fix:"
    echo "1. Go to https://dash.cloudflare.com/profile/api-tokens"
    echo "2. Create a new token with 'Workers Scripts:Edit' permission"
    echo "3. Update CLOUDFLARE_API_TOKEN in .env"
    exit 1
fi

echo ""
echo "🔐 Setting AUTOPILOT_TOKEN secret..."
if echo "$AUTOPILOT_TOKEN" | wrangler secret put AUTOPILOT_TOKEN --config wrangler-metrics.toml; then
    echo "✅ Secret set successfully"
else
    echo "⚠️  Failed to set secret (you may need to do this manually)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Worker URL: https://efh-autopilot-metrics.workers.dev"
echo ""
echo "Available endpoints:"
echo "  • POST /store          - Store check results"
echo "  • GET  /summary        - Get metrics summary"
echo "  • GET  /recent?limit=N - Get recent checks"
echo "  • GET  /history?hours=N - Get historical data"
echo "  • GET  /trends?hours=N  - Get trend analysis"
echo "  • GET  /alerts         - Get alert history"
echo ""
echo "Next steps:"
echo "1. Add AUTOPILOT_TOKEN to GitHub secrets:"
echo "   gh secret set AUTOPILOT_TOKEN --body \"$AUTOPILOT_TOKEN\""
echo ""
echo "2. Test the worker:"
echo "   curl https://efh-autopilot-metrics.workers.dev/summary"
echo ""
echo "3. The GitHub workflow will automatically start feeding data"
echo ""
