#!/usr/bin/env bash
set -euo pipefail

: "${NETLIFY_AUTH_TOKEN:?NETLIFY_AUTH_TOKEN is required}"

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

echo "→ Triggering Netlify deploy with cache clear for site $SITE_ID"

# Get the latest build hook or create one
BUILD_HOOK=$(curl -fsS -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/build_hooks" | \
  grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$BUILD_HOOK" ]; then
  echo "  → Creating build hook..."
  BUILD_HOOK=$(curl -fsS -X POST \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.netlify.com/api/v1/sites/$SITE_ID/build_hooks" \
    -d '{"title":"Autopilot Deploy","branch":"main"}' | \
    grep -o '"url":"[^"]*"' | cut -d'"' -f4)
fi

echo "  → Triggering build via webhook..."
curl -fsS -X POST "$BUILD_HOOK" -d '{"clear_cache":true}' > /dev/null

echo "✓ Deploy triggered with cache clear"
echo ""
echo "Monitor progress at:"
echo "  https://app.netlify.com/sites/elevateforhumanityfix/deploys"
