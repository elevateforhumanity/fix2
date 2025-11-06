#!/usr/bin/env bash
set -euo pipefail

echo "🤖 AUTOPILOT: Deploying dist/ via Netlify API"

: "${NETLIFY_AUTH_TOKEN:?NETLIFY_AUTH_TOKEN required}"

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
DIST_DIR="dist"

if [ ! -d "$DIST_DIR" ]; then
  echo "❌ dist/ folder not found"
  exit 1
fi

echo "→ Creating deployment archive..."
cd "$DIST_DIR"
tar -czf ../deploy.tar.gz .
cd ..

echo "→ Getting file hash..."
FILE_HASH=$(sha256sum deploy.tar.gz | cut -d' ' -f1)

echo "→ Creating deployment via API..."
DEPLOY_RESPONSE=$(curl -sS -X POST \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys" \
  -d "{\"files\":{}}")

DEPLOY_ID=$(echo "$DEPLOY_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$DEPLOY_ID" ]; then
  echo "❌ Failed to create deployment"
  echo "$DEPLOY_RESPONSE"
  exit 1
fi

echo "✓ Deployment created: $DEPLOY_ID"

echo "→ Uploading files..."
cd "$DIST_DIR"
for file in $(find . -type f); do
  FILE_PATH="${file#./}"
  FILE_HASH=$(sha256sum "$file" | cut -d' ' -f1)
  
  curl -sS -X PUT \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/octet-stream" \
    --data-binary "@$file" \
    "https://api.netlify.com/api/v1/deploys/$DEPLOY_ID/files/$FILE_PATH" > /dev/null
  
  echo "  ✓ $FILE_PATH"
done
cd ..

echo "→ Publishing deployment..."
curl -sS -X POST \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys/$DEPLOY_ID/restore" > /dev/null

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "   Site: https://elevateforhumanityfix.netlify.app"
echo "   Deploy ID: $DEPLOY_ID"

rm -f deploy.tar.gz
