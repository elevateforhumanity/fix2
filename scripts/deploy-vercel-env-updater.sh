#!/bin/bash

# Deploy Vercel Environment Variable Updater Worker
# This worker automatically updates Vercel env vars for domain migration

set -e

echo "🚀 Deploying Vercel Environment Variable Updater Worker"
echo "========================================================"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Navigate to workers directory
cd "$(dirname "$0")/../workers"

echo ""
echo "📦 Step 1: Building worker..."
echo ""

# Deploy the worker
wrangler deploy vercel-env-updater.ts --config wrangler-vercel-env-updater.toml

echo ""
echo "🔐 Step 2: Setting secrets..."
echo ""

# Check if secrets are already set
echo "Please set the following secrets if not already set:"
echo ""
echo "  wrangler secret put VERCEL_TOKEN --config wrangler-vercel-env-updater.toml"
echo "  wrangler secret put VERCEL_PROJECT_ID --config wrangler-vercel-env-updater.toml"
echo "  wrangler secret put VERCEL_TEAM_ID --config wrangler-vercel-env-updater.toml"
echo ""

read -p "Have you set the secrets? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please set the secrets and run this script again."
    exit 1
fi

echo ""
echo "✅ Worker deployed successfully!"
echo ""
echo "📍 Worker URL: https://vercel-env-updater.elevateforhumanity.workers.dev"
echo ""
echo "🔧 To trigger the update, run:"
echo ""
echo "  curl -X POST https://vercel-env-updater.elevateforhumanity.workers.dev"
echo ""
echo "This will:"
echo "  1. Update NEXT_PUBLIC_SITE_URL to https://www.elevateforhumanity.org"
echo "  2. Update NEXT_PUBLIC_APP_URL to https://www.elevateforhumanity.org"
echo "  3. Apply to all environments (production, preview, development)"
echo "  4. Trigger a new deployment"
echo ""
