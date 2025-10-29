#!/bin/bash

# =============================================
# Cloudflare Worker Deployment Script
# Autonomous Autopilot v7.0
# =============================================

set -e

echo "☁️  Cloudflare Worker Deployment"
echo "=================================="
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Error: Wrangler CLI not found"
    echo ""
    echo "Install with:"
    echo "  npm install -g wrangler"
    echo "  # or"
    echo "  pnpm add -g wrangler"
    exit 1
fi

echo "✅ Wrangler CLI found: $(wrangler --version)"
echo ""

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo "⚠️  Not logged in to Cloudflare"
    echo ""
    echo "Logging in..."
    wrangler login
    echo ""
fi

echo "✅ Logged in to Cloudflare"
echo ""

# Check if wrangler.toml exists
if [ ! -f "wrangler.toml" ]; then
    echo "❌ Error: wrangler.toml not found"
    echo ""
    echo "Make sure you're in the project root directory"
    exit 1
fi

echo "✅ wrangler.toml found"
echo ""

# Check if account_id is set
if ! grep -q "account_id" wrangler.toml; then
    echo "⚠️  Warning: account_id not set in wrangler.toml"
    echo ""
    echo "Get your account ID from:"
    echo "  https://dash.cloudflare.com → Workers & Pages → Account ID"
    echo ""
    read -p "Enter your Cloudflare Account ID: " account_id
    
    # Add account_id to wrangler.toml
    sed -i "/^name = /a account_id = \"$account_id\"" wrangler.toml
    echo "✅ Added account_id to wrangler.toml"
    echo ""
fi

# Deploy worker
echo "🚀 Deploying worker..."
echo ""

if wrangler deploy; then
    echo ""
    echo "=================================="
    echo "✅ Worker deployed successfully!"
    echo ""
    echo "Worker URL:"
    wrangler deployments list --limit 1 | grep "https://" || echo "  Check Cloudflare dashboard for URL"
    echo ""
    echo "Next steps:"
    echo "  1. Set secrets: wrangler secret put SECRET_NAME"
    echo "  2. Test worker: curl https://your-worker.workers.dev/health"
    echo "  3. View logs: wrangler tail"
    echo "  4. View analytics: https://dash.cloudflare.com"
    echo "=================================="
else
    echo ""
    echo "❌ Deployment failed"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Check wrangler.toml configuration"
    echo "  2. Verify account_id is correct"
    echo "  3. Check worker code for syntax errors"
    echo "  4. Run 'wrangler dev' to test locally"
    exit 1
fi
