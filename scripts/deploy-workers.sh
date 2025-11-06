#!/bin/bash
set -e

echo "🚀 Deploying Cloudflare Workers"
echo "================================"

# Check if CLOUDFLARE_API_TOKEN is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ CLOUDFLARE_API_TOKEN not set"
    echo "   Set it with: export CLOUDFLARE_API_TOKEN=your_token"
    echo "   Or add to GitHub Secrets"
    exit 1
fi

# Deploy autopilot worker
echo "📦 Deploying autopilot-deploy-worker..."
npx wrangler deploy --config wrangler.toml

echo "✅ Workers deployed successfully"
echo ""
echo "Worker URL: https://autopilot-deploy-worker.elevateforhumanity.workers.dev"
echo ""
echo "Next steps:"
echo "1. Set secrets: npx wrangler secret put AUTOPILOT_TOKEN"
echo "2. Set secrets: npx wrangler secret put NETLIFY_TOKEN"
echo "3. Set secrets: npx wrangler secret put NETLIFY_SITE_ID"
echo "4. Set secrets: npx wrangler secret put GITHUB_TOKEN"
echo "5. Set secrets: npx wrangler secret put SUPABASE_URL"
