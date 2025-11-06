#!/usr/bin/env bash
set -euo pipefail

: "${NETLIFY_AUTH_TOKEN:?NETLIFY_AUTH_TOKEN is required}"

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
PORTAL_DOMAIN="${PORTAL_DOMAIN:-portal.elevateforhumanity.org}"
NETLIFY_TARGET="${NETLIFY_TARGET:-elevateforhumanityfix.netlify.app}"

echo "→ Adding custom domain to Netlify: $PORTAL_DOMAIN"
curl -fsS -X POST \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/domains" \
  -d "{\"domain\":\"$PORTAL_DOMAIN\"}" || true

if [[ -n "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "→ Configuring DNS in Cloudflare"
  ZONE="elevateforhumanity.org"
  ZONE_ID=$(curl -fsS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    "https://api.cloudflare.com/client/v4/zones?name=$ZONE" | sed -n 's/.*"id":"\([^"]*\)".*/\1/p' | head -n1)

  # Upsert CNAME
  REC_ID=$(curl -fsS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=CNAME&name=$PORTAL_DOMAIN" \
    | sed -n 's/.*"id":"\([^"]*\)".*/\1/p' | head -n1)

  PAYLOAD=$(jq -nc --arg content "$NETLIFY_TARGET" '{type:"CNAME",name:"portal",content:$content,ttl:3600,proxied:false}')

  if [[ -n "$REC_ID" ]]; then
    curl -fsS -X PUT -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" \
      --data "$PAYLOAD" "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$REC_ID" > /dev/null
  else
    curl -fsS -X POST -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" \
      --data "$PAYLOAD" "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" > /dev/null
  fi
  echo "✓ DNS CNAME portal → $NETLIFY_TARGET"
else
  echo "⚠ No CLOUDFLARE_API_TOKEN. Add this DNS record manually:"
  echo "   CNAME  portal  $NETLIFY_TARGET"
fi

echo "→ Requesting SSL on Netlify"
curl -fsS -X POST -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/ssl" > /dev/null || true

echo "✓ Done. Verify: https://$PORTAL_DOMAIN (after DNS propagates)"
