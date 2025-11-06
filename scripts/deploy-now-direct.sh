#!/usr/bin/env bash
set -euo pipefail

# REQUIREMENTS:
#  - NETLIFY_AUTH_TOKEN (Personal Access Token)
#  - Either SITE_ID or SITE_NAME for your Netlify site
#  - Node 20+, npm or pnpm available

: "${NETLIFY_AUTH_TOKEN:?Set NETLIFY_AUTH_TOKEN first (export NETLIFY_AUTH_TOKEN=...)}"

# Prefilled for Elevate for Humanity
SITE_ID="${SITE_ID:-12f120ab-3f63-419b-bc49-430f043415c1}"
SITE_NAME="${SITE_NAME:-elevateforhumanityfix}"

SITE_FLAG=""
if [[ -n "${SITE_ID:-}" ]]; then SITE_FLAG="--site $SITE_ID"; fi
if [[ -z "$SITE_FLAG" && -n "${SITE_NAME:-}" ]]; then SITE_FLAG="--site $SITE_NAME"; fi
if [[ -z "$SITE_FLAG" ]]; then
  echo "➤ Set SITE_ID or SITE_NAME env var (export SITE_ID=xxxx OR SITE_NAME=elevateforhumanityfix)"
  exit 1
fi

echo "➤ Ensuring Netlify CLI is installed…"
if ! command -v netlify >/dev/null 2>&1; then
  npm install -g netlify-cli
fi

echo "➤ Installing deps…"
if command -v pnpm >/dev/null 2>&1; then
  pnpm install
  BUILD_CMD="pnpm run build"
else
  npm install
  BUILD_CMD="npm run build"
fi

echo "➤ Building site…"
$BUILD_CMD

# Verify build output
if [ ! -f "dist/index.html" ]; then
    echo "❌ Build failed - dist/index.html not found"
    exit 1
fi

echo "✅ Build complete: dist/index.html exists"

echo "➤ Deploying dist/ to Netlify (production)…"
netlify deploy \
  --auth "$NETLIFY_AUTH_TOKEN" \
  --prod \
  --dir=dist \
  $SITE_FLAG \
  --message="Vite/React deployment - overwrite Next.js build"

echo ""
echo "✅ Deployed. Site should be live at:"
echo "   https://elevateforhumanityfix.netlify.app"
echo "   https://portal.elevateforhumanity.org (if DNS configured)"
echo ""
echo "➤ Waiting 10 seconds for CDN propagation…"
sleep 10

echo "➤ Verifying deployment…"
echo ""
curl -sI https://elevateforhumanityfix.netlify.app/ | head -5
echo ""
echo "Checking for Vite assets (not Next.js)…"
if curl -s https://elevateforhumanityfix.netlify.app/ | grep -q "/assets/"; then
  echo "✅ Vite build detected (/assets/ found)"
else
  echo "⚠ Still might be Next.js - check manually"
fi

echo ""
echo "Testing /support route…"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://elevateforhumanityfix.netlify.app/support)
if [ "$STATUS" = "200" ]; then
  echo "✅ /support returns 200 OK"
else
  echo "⚠ /support returns $STATUS"
fi
