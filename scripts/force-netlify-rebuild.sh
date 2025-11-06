#!/usr/bin/env bash
set -euo pipefail

echo "🔥 FORCING COMPLETE NETLIFY REBUILD"
echo "This will overwrite the old Next.js deployment with the new Vite/React build"
echo ""

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

if [ -z "${NETLIFY_AUTH_TOKEN:-}" ]; then
  echo "❌ NETLIFY_AUTH_TOKEN not set"
  echo ""
  echo "Get your token from: https://app.netlify.com/user/applications#personal-access-tokens"
  echo ""
  echo "Then run:"
  echo "  export NETLIFY_AUTH_TOKEN=<your-token>"
  echo "  bash scripts/force-netlify-rebuild.sh"
  exit 1
fi

echo "→ Step 1: Clearing ALL caches..."
curl -fsS -X DELETE \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/builds/cache" || echo "  (cache clear attempted)"

echo "→ Step 2: Removing old Next.js plugin configuration..."
# The netlify.toml in the repo is already updated, so this will use the new config

echo "→ Step 3: Triggering fresh build from main branch..."
BUILD_ID=$(curl -fsS -X POST \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/builds" \
  -d '{"clear_cache":true}' | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

echo "✓ Build triggered: $BUILD_ID"
echo ""
echo "→ Monitoring build progress..."
echo "  URL: https://app.netlify.com/sites/elevateforhumanityfix/deploys/$BUILD_ID"
echo ""

# Poll build status
for i in {1..60}; do
  sleep 5
  STATUS=$(curl -fsS -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "https://api.netlify.com/api/v1/builds/$BUILD_ID" | \
    grep -o '"state":"[^"]*"' | cut -d'"' -f4 || echo "unknown")
  
  case "$STATUS" in
    "ready")
      echo "✅ BUILD SUCCESSFUL!"
      echo ""
      echo "→ Verifying deployment..."
      sleep 10  # Wait for CDN propagation
      
      # Test routes
      echo "Testing routes..."
      for route in "/" "/programs" "/support" "/community"; do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://elevateforhumanityfix.netlify.app$route")
        if [ "$HTTP_CODE" = "200" ]; then
          echo "  ✓ $route (200 OK)"
        else
          echo "  ✗ $route ($HTTP_CODE)"
        fi
      done
      
      echo ""
      echo "🎉 Deployment complete!"
      echo "   Live at: https://elevateforhumanityfix.netlify.app"
      exit 0
      ;;
    "error")
      echo "❌ BUILD FAILED"
      echo "   Check logs: https://app.netlify.com/sites/elevateforhumanityfix/deploys/$BUILD_ID"
      exit 1
      ;;
    "building"|"enqueued"|"processing")
      echo "  ⏳ Status: $STATUS (${i}0s elapsed)"
      ;;
    *)
      echo "  ⏳ Building... (${i}0s elapsed)"
      ;;
  esac
done

echo "⏱ Build taking longer than expected (5 minutes)"
echo "   Monitor at: https://app.netlify.com/sites/elevateforhumanityfix/deploys/$BUILD_ID"
