#!/usr/bin/env bash
set -euo pipefail

: "${NETLIFY_AUTH_TOKEN:?NETLIFY_AUTH_TOKEN is required}"

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

echo "→ Setting Netlify environment variables for site $SITE_ID"

# Function to set env var
set_env() {
  local key=$1
  local value=$2
  
  if [ -z "$value" ]; then
    echo "  ⚠ Skipping $key (not provided)"
    return
  fi
  
  # Check if variable exists
  existing=$(curl -fsS -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "https://api.netlify.com/api/v1/accounts/$(curl -fsS -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "https://api.netlify.com/api/v1/sites/$SITE_ID" | grep -o '"account_slug":"[^"]*"' | cut -d'"' -f4)/env/$key" 2>/dev/null || echo "")
  
  if [ -n "$existing" ]; then
    # Update existing
    curl -fsS -X PATCH \
      -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
      -H "Content-Type: application/json" \
      "https://api.netlify.com/api/v1/accounts/$(curl -fsS -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
      "https://api.netlify.com/api/v1/sites/$SITE_ID" | grep -o '"account_slug":"[^"]*"' | cut -d'"' -f4)/env/$key" \
      -d "{\"key\":\"$key\",\"values\":[{\"value\":\"$value\",\"context\":\"all\"}]}" > /dev/null
    echo "  ✓ Updated $key"
  else
    # Create new
    curl -fsS -X POST \
      -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
      -H "Content-Type: application/json" \
      "https://api.netlify.com/api/v1/accounts/$(curl -fsS -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
      "https://api.netlify.com/api/v1/sites/$SITE_ID" | grep -o '"account_slug":"[^"]*"' | cut -d'"' -f4)/env" \
      -d "{\"key\":\"$key\",\"values\":[{\"value\":\"$value\",\"context\":\"all\"}]}" > /dev/null
    echo "  ✓ Created $key"
  fi
}

# Set environment variables
set_env "VITE_SUPABASE_URL" "${VITE_SUPABASE_URL:-}"
set_env "VITE_SUPABASE_ANON_KEY" "${VITE_SUPABASE_ANON_KEY:-}"
set_env "VITE_API_URL" "${VITE_API_URL:-https://api.elevateforhumanity.org}"
set_env "VITE_STRIPE_PUBLISHABLE_KEY" "${VITE_STRIPE_PUBLISHABLE_KEY:-}"

echo "✓ Environment variables configured"
echo ""
echo "Next steps:"
echo "1. Trigger a deploy: netlify deploy --prod"
echo "2. Or use Netlify UI: Deploys → Trigger deploy → Clear cache and deploy site"
