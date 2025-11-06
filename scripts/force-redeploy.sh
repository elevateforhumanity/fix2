#!/usr/bin/env bash
set -euo pipefail

echo "🔄 Forcing fresh Netlify deployment..."
echo ""
echo "This will:"
echo "1. Clear all caches"
echo "2. Use updated netlify.toml (Vite/React config)"
echo "3. Rebuild from scratch"
echo ""

if [ -n "${NETLIFY_AUTH_TOKEN:-}" ]; then
  SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
  
  echo "→ Clearing build cache..."
  curl -fsS -X DELETE \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "https://api.netlify.com/api/v1/sites/$SITE_ID/builds/cache" || true
  
  echo "→ Triggering fresh build..."
  curl -fsS -X POST \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "https://api.netlify.com/api/v1/sites/$SITE_ID/builds" \
    -d '{"clear_cache":true}' > /dev/null
  
  echo "✓ Deploy triggered!"
  echo ""
  echo "Monitor at: https://app.netlify.com/sites/elevateforhumanityfix/deploys"
else
  echo "⚠ NETLIFY_AUTH_TOKEN not set"
  echo ""
  echo "Manual steps:"
  echo "1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys"
  echo "2. Click 'Trigger deploy' → 'Clear cache and deploy site'"
  echo "3. Wait 2-3 minutes"
  echo "4. Verify: https://elevateforhumanityfix.netlify.app/support"
fi
