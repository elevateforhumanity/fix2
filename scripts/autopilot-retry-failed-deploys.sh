#!/usr/bin/env bash
set -euo pipefail

# Autopilot: Retry Failed Netlify Deployments
# Monitors deployments and automatically retries failures

NETLIFY_AUTH_TOKEN="nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae"
NETLIFY_SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

echo "🤖 Autopilot: Monitoring & Retrying Failed Deployments"
echo "======================================================"
echo ""

# Get recent deployments
echo "📋 Checking recent deployments..."
DEPLOYS=$(curl -s "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys?per_page=10" \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN")

# Parse deployment states
FAILED_COUNT=$(echo "$DEPLOYS" | grep -o '"state":"error"' | wc -l)
BUILDING_COUNT=$(echo "$DEPLOYS" | grep -o '"state":"building"' | wc -l)
READY_COUNT=$(echo "$DEPLOYS" | grep -o '"state":"ready"' | wc -l)

echo "  ✅ Ready: $READY_COUNT"
echo "  🔨 Building: $BUILDING_COUNT"
echo "  ❌ Failed: $FAILED_COUNT"
echo ""

# If there are failed deployments, retry
if [ "$FAILED_COUNT" -gt 0 ]; then
  echo "⚠️  Found $FAILED_COUNT failed deployment(s)"
  echo "🔄 Triggering new deployment..."
  
  RETRY_RESPONSE=$(curl -s -X POST \
    "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/builds" \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"clear_cache": true}')
  
  RETRY_DEPLOY_ID=$(echo "$RETRY_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
  
  if [ -n "$RETRY_DEPLOY_ID" ]; then
    echo "✅ Retry deployment triggered: $RETRY_DEPLOY_ID"
    echo "   Monitor: https://app.netlify.com/sites/elevateforhumanityfix/deploys/$RETRY_DEPLOY_ID"
    
    # Wait and monitor
    echo ""
    echo "⏳ Monitoring retry deployment..."
    
    for i in {1..60}; do
      sleep 10
      
      STATUS=$(curl -s \
        "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys/$RETRY_DEPLOY_ID" \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" | \
        grep -o '"state":"[^"]*"' | cut -d'"' -f4)
      
      echo "  [$i] Status: $STATUS"
      
      if [ "$STATUS" = "ready" ]; then
        echo ""
        echo "✅ Deployment successful!"
        break
      elif [ "$STATUS" = "error" ]; then
        echo ""
        echo "❌ Deployment failed again"
        
        # Get error details
        ERROR_MSG=$(curl -s \
          "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys/$RETRY_DEPLOY_ID" \
          -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" | \
          grep -o '"error_message":"[^"]*"' | cut -d'"' -f4)
        
        if [ -n "$ERROR_MSG" ]; then
          echo "   Error: $ERROR_MSG"
        fi
        
        # Try one more time with different settings
        echo ""
        echo "🔄 Attempting final retry with fresh build..."
        
        curl -s -X POST \
          "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/builds" \
          -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
          -H "Content-Type: application/json" \
          -d '{"clear_cache": true}' > /dev/null
        
        echo "✅ Final retry triggered"
        break
      fi
    done
  else
    echo "❌ Failed to trigger retry"
    echo "   Response: $RETRY_RESPONSE"
  fi
else
  echo "✅ No failed deployments found"
  
  # Check if any are currently building
  if [ "$BUILDING_COUNT" -gt 0 ]; then
    echo "⏳ $BUILDING_COUNT deployment(s) currently building..."
    echo "   Monitor: https://app.netlify.com/sites/elevateforhumanityfix/deploys"
  fi
fi

echo ""
echo "📊 Current Site Status:"
echo "======================"

# Check site health
SITE_URL="https://elevateforhumanityfix.netlify.app"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL")

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Site is live and accessible"
  echo "   URL: $SITE_URL"
else
  echo "⚠️  Site returned HTTP $HTTP_CODE"
  echo "   URL: $SITE_URL"
fi

echo ""
echo "🔗 Quick Links:"
echo "  Site: $SITE_URL"
echo "  Deploys: https://app.netlify.com/sites/elevateforhumanityfix/deploys"
echo "  Settings: https://app.netlify.com/sites/elevateforhumanityfix/settings"
echo ""
echo "✨ Autopilot monitoring complete!"
