#!/bin/bash
# Test health check endpoint

echo "🏥 Testing Health Check Endpoint"
echo "================================"
echo ""

URLS=(
  "https://www.elevateforhumanity.org/api/health"
  "https://www.elevateeducationedu.com/api/health"
  "https://www.elevateconnectsdirectory.org/api/health"
)

for URL in "${URLS[@]}"; do
  echo "Testing: $URL"
  
  # Test with curl
  RESPONSE=$(curl -s -w "\n%{http_code}" "$URL" 2>/dev/null)
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | head -n-1)
  
  if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Status: $HTTP_CODE (Healthy)"
    
    # Parse JSON response
    STATUS=$(echo "$BODY" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    if [ -n "$STATUS" ]; then
      echo "   📊 Health: $STATUS"
    fi
    
    # Check database
    DB_STATUS=$(echo "$BODY" | grep -o '"database":{[^}]*}' | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    if [ -n "$DB_STATUS" ]; then
      echo "   💾 Database: $DB_STATUS"
    fi
  elif [ "$HTTP_CODE" = "503" ]; then
    echo "   ⚠️  Status: $HTTP_CODE (Degraded)"
    echo "   Some checks failed - review response"
  elif [ "$HTTP_CODE" = "000" ]; then
    echo "   ❌ Cannot connect (site may not be deployed yet)"
  else
    echo "   ❌ Status: $HTTP_CODE (Error)"
  fi
  
  echo ""
done

echo "✅ Health Check Test Complete"
echo ""
echo "📋 What the health check monitors:"
echo "   • Environment variables configured"
echo "   • Database connectivity"
echo "   • System resources (memory, uptime)"
echo "   • Stripe API (if configured)"
echo "   • Resend API (if configured)"
echo ""
echo "🔍 To view full response:"
echo "   curl https://www.elevateforhumanity.org/api/health | jq"
echo ""
