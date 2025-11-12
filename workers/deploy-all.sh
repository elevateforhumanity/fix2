#!/bin/bash

# Deploy All Cloudflare Workers
# Deploys video generation, template sync, and media download workers

set -e

echo "🚀 Deploying Cloudflare Workers"
echo "================================"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found"
    echo "Install with: npm install -g wrangler"
    exit 1
fi

echo "✅ Wrangler CLI found"
echo ""

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo "❌ Not logged in to Cloudflare"
    echo "Login with: wrangler login"
    exit 1
fi

echo "✅ Logged in to Cloudflare"
echo ""

# Deploy Template Sync Worker
echo "📦 Deploying Template Sync Worker..."
wrangler deploy --config wrangler-template-sync.toml
echo "✅ Template Sync Worker deployed"
echo ""

# Deploy Media Download Worker
echo "📦 Deploying Media Download Worker..."
wrangler deploy --config wrangler-media-download.toml
echo "✅ Media Download Worker deployed"
echo ""

# Deploy Video Generation Worker
echo "📦 Deploying Video Generation Worker..."
wrangler deploy --config wrangler-video.toml
echo "✅ Video Generation Worker deployed"
echo ""

echo "================================"
echo "🎉 All workers deployed successfully!"
echo ""
echo "Test your workers:"
echo "  Template Sync: curl https://template-sync-worker.YOUR_SUBDOMAIN.workers.dev/health"
echo "  Media Download: curl https://media-download-worker.YOUR_SUBDOMAIN.workers.dev/health"
echo "  Video Generation: curl https://video-generation-worker.YOUR_SUBDOMAIN.workers.dev/health"
echo ""
echo "View logs:"
echo "  wrangler tail --config wrangler-template-sync.toml"
echo "  wrangler tail --config wrangler-media-download.toml"
echo "  wrangler tail --config wrangler-video.toml"
echo ""
