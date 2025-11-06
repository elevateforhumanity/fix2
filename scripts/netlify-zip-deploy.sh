#!/usr/bin/env bash
set -euo pipefail

echo "🤖 AUTOPILOT: Deploying dist/ as ZIP via Netlify API"

: "${NETLIFY_AUTH_TOKEN:?NETLIFY_AUTH_TOKEN required}"

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

if [ ! -d "dist" ]; then
  echo "❌ dist/ folder not found"
  exit 1
fi

echo "→ Creating ZIP archive..."
cd dist && zip -r -q ../deploy.zip . && cd ..

echo "→ Deploying ZIP to Netlify..."
DEPLOY_URL=$(curl -sS -X POST \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary "@deploy.zip" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys" | \
  grep -o '"ssl_url":"[^"]*"' | cut -d'"' -f4)

if [ -z "$DEPLOY_URL" ]; then
  echo "❌ Deployment failed"
  exit 1
fi

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "   Live at: $DEPLOY_URL"

rm -f deploy.zip
