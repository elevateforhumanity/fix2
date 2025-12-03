#!/bin/bash

# ============================================================================
# DEPLOYMENT MONITORING SCRIPT
# Monitor Vercel deployment until successful
# ============================================================================

URL="https://www.elevateforhumanity.org/"
MAX_WAIT=900  # 15 minutes
CHECK_INTERVAL=15
ELAPSED=0

echo "🔍 MONITORING DEPLOYMENT"
echo "======================="
echo ""
echo "URL: $URL"
echo "Max wait: $((MAX_WAIT / 60)) minutes"
echo "Check interval: ${CHECK_INTERVAL}s"
echo ""

# Get initial deployment age
INITIAL_RESPONSE=$(curl -sI "$URL" 2>&1)
INITIAL_AGE=$(echo "$INITIAL_RESPONSE" | grep -i "^age:" | awk '{print $2}' | tr -d '\r')
INITIAL_STATUS=$(echo "$INITIAL_RESPONSE" | grep "^HTTP" | awk '{print $2}')

echo "📊 Initial Status:"
echo "   HTTP Status: $INITIAL_STATUS"
echo "   Deployment Age: ${INITIAL_AGE}s ($(($INITIAL_AGE / 60)) min)"
echo ""

# Wait for deployment to start
echo "⏳ Waiting for new deployment to start..."
sleep 45

echo ""
echo "🔄 Monitoring for new deployment..."
echo ""

while [ $ELAPSED -lt $MAX_WAIT ]; do
    TIMESTAMP=$(date '+%H:%M:%S')
    
    # Get current status
    RESPONSE=$(curl -sI "$URL" 2>&1)
    AGE=$(echo "$RESPONSE" | grep -i "^age:" | awk '{print $2}' | tr -d '\r')
    HTTP_STATUS=$(echo "$RESPONSE" | grep "^HTTP" | awk '{print $2}')
    
    # Check if deployment is new (age < 5 minutes)
    if [ ! -z "$AGE" ] && [ "$AGE" -lt 300 ]; then
        echo ""
        echo "✅ NEW DEPLOYMENT DETECTED!"
        echo "   Time: $TIMESTAMP"
        echo "   Age: ${AGE}s ($(($AGE / 60)) min)"
        echo "   Status: HTTP $HTTP_STATUS"
        echo ""
        
        # Verify deployment is working
        echo "🔍 Verifying deployment..."
        sleep 10
        
        # Check multiple endpoints
        ENDPOINTS=("/" "/programs" "/courses" "/login")
        ALL_OK=true
        
        for endpoint in "${ENDPOINTS[@]}"; do
            STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${URL}${endpoint}" 2>/dev/null)
            if [ "$STATUS" = "200" ] || [ "$STATUS" = "301" ] || [ "$STATUS" = "302" ]; then
                echo "   ✅ ${endpoint}: HTTP $STATUS"
            else
                echo "   ⚠️  ${endpoint}: HTTP $STATUS"
                if [ "$endpoint" = "/" ]; then
                    ALL_OK=false
                fi
            fi
        done
        
        echo ""
        
        if [ "$ALL_OK" = true ]; then
            echo "✅ DEPLOYMENT SUCCESSFUL!"
            echo ""
            echo "📊 Final Status:"
            echo "   URL: $URL"
            echo "   HTTP Status: $HTTP_STATUS"
            echo "   Deployment Age: ${AGE}s"
            echo "   All endpoints: Operational"
            echo ""
            echo "🎉 Deployment monitoring complete!"
            exit 0
        else
            echo "⚠️  Some endpoints not responding, continuing to monitor..."
        fi
    else
        echo "[$TIMESTAMP] Check $((ELAPSED / CHECK_INTERVAL + 1)) | Age: ${AGE}s | Status: $HTTP_STATUS"
    fi
    
    sleep $CHECK_INTERVAL
    ELAPSED=$((ELAPSED + CHECK_INTERVAL))
done

echo ""
echo "⏱️  Monitoring timeout reached (${MAX_WAIT}s)"
echo ""
echo "📋 Final Check:"
FINAL_RESPONSE=$(curl -sI "$URL" 2>&1)
FINAL_AGE=$(echo "$FINAL_RESPONSE" | grep -i "^age:" | awk '{print $2}' | tr -d '\r')
FINAL_STATUS=$(echo "$FINAL_RESPONSE" | grep "^HTTP" | awk '{print $2}')

echo "   HTTP Status: $FINAL_STATUS"
echo "   Deployment Age: ${FINAL_AGE}s ($(($FINAL_AGE / 60)) min)"
echo ""

if [ "$FINAL_STATUS" = "200" ]; then
    echo "✅ Site is responding (HTTP 200)"
    echo "   Deployment may still be in progress"
    echo "   Check Vercel dashboard for details"
    exit 0
else
    echo "⚠️  Site status: HTTP $FINAL_STATUS"
    echo "   Manual verification recommended"
    exit 1
fi
