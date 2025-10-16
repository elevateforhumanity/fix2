#!/bin/bash
set -e

echo "🚀 Deploying to Cloudflare Pages..."

# Build the project
echo "📦 Building project..."
pnpm run build

# Deploy to Cloudflare Pages
echo "☁️ Deploying to Cloudflare..."
wrangler pages deploy dist --project-name=elevateforhumanity

echo "✅ Deployment complete!"
