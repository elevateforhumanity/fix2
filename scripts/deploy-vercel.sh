#!/bin/bash
# Deploy to Vercel (no auth needed for first deploy)
set -e

echo "📦 Building..."
npm run build

echo "🚀 Deploying to Vercel..."
npx vercel --prod --yes

echo "✅ Deployed to Vercel!"
