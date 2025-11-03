#!/bin/bash

# Deploy Cloudflare Worker - Trigger GitHub Actions
# This script triggers the GitHub Actions workflow to deploy the worker

set -e

echo "🚀 Deploying Cloudflare Worker via GitHub Actions..."
echo ""

# Check if we're in the right directory
if [ ! -f "wrangler-enrollment.toml" ]; then
    echo "❌ Error: wrangler-enrollment.toml not found"
    echo "   Please run this script from the repository root"
    exit 1
fi

# Check if worker file exists
if [ ! -f "workers/enrollment-injector-worker.ts" ]; then
    echo "❌ Error: workers/enrollment-injector-worker.ts not found"
    exit 1
fi

echo "✅ Worker file found: workers/enrollment-injector-worker.ts"
echo "✅ Config file found: wrangler-enrollment.toml"
echo ""

# Make a small change to trigger workflow
echo "📝 Updating worker timestamp to trigger deployment..."
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
sed -i "s/VERSION: .*/VERSION: 1.0.0 - Deployed $TIMESTAMP/" workers/enrollment-injector-worker.ts

echo "✅ Worker file updated"
echo ""

# Commit and push
echo "📤 Committing and pushing to trigger GitHub Actions..."
git add workers/enrollment-injector-worker.ts
git commit -m "Autopilot: Deploy Cloudflare Worker - $TIMESTAMP" || echo "No changes to commit"
git push origin main

echo ""
echo "✅ Push complete!"
echo ""
echo "🤖 GitHub Actions will now deploy the worker"
echo "   Monitor at: https://github.com/elevateforhumanity/fix2/actions"
echo ""
echo "⏳ Deployment typically takes 1-2 minutes"
echo ""
echo "📍 Worker will be available at:"
echo "   - https://enrollment-injector.workers.dev (if workers_dev = true)"
echo "   - https://elevateforhumanity.org/* (when routes are configured)"
echo ""
