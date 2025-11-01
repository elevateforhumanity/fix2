#!/bin/bash
set -e

echo "🤖 PUPPET AUTOPILOT: FORCE NETLIFY DEPLOYMENT"
echo "=============================================="
echo ""

# Check if we have Netlify auth token in environment
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "❌ NETLIFY_AUTH_TOKEN not set"
    echo ""
    echo "To enable autonomous deployment, set:"
    echo "  export NETLIFY_AUTH_TOKEN=your_token"
    echo ""
    echo "Get token from: https://app.netlify.com/user/applications#personal-access-tokens"
    echo ""
    exit 1
fi

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"

echo "📊 Configuration:"
echo "  Site ID: $SITE_ID"
echo "  Token: ${NETLIFY_AUTH_TOKEN:0:20}..."
echo ""

# Step 1: Build locally
echo "🔨 Step 1: Building locally..."
if pnpm build 2>&1 | tail -5; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Step 2: Verify dist
echo ""
echo "🔍 Step 2: Verifying dist..."
if [ -f "dist/index.html" ] && [ -f "dist/api/efh-config.json" ]; then
    echo "✅ dist/index.html exists"
    echo "✅ dist/api/efh-config.json exists"
    FILE_COUNT=$(find dist -type f | wc -l)
    echo "✅ Total files in dist: $FILE_COUNT"
else
    echo "❌ Required files missing in dist"
    exit 1
fi

# Step 3: Create deployment via API
echo ""
echo "🚀 Step 3: Creating deployment via Netlify API..."

# Create a zip of dist
cd dist
zip -r -q ../deploy.zip .
cd ..

echo "✅ Created deploy.zip ($(du -h deploy.zip | cut -f1))"

# Upload to Netlify
echo ""
echo "📤 Step 4: Uploading to Netlify..."

DEPLOY_RESPONSE=$(curl -s -X POST \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys" \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary "@deploy.zip")

DEPLOY_ID=$(echo "$DEPLOY_RESPONSE" | jq -r '.id' 2>/dev/null || echo "")

if [ -z "$DEPLOY_ID" ] || [ "$DEPLOY_ID" = "null" ]; then
    echo "❌ Deployment failed"
    echo "$DEPLOY_RESPONSE" | jq '.' 2>/dev/null || echo "$DEPLOY_RESPONSE"
    exit 1
fi

echo "✅ Deployment created: $DEPLOY_ID"

# Step 5: Wait for deployment
echo ""
echo "⏳ Step 5: Waiting for deployment to complete..."

for i in {1..60}; do
    sleep 2
    
    STATUS_RESPONSE=$(curl -s \
      "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys/$DEPLOY_ID" \
      -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN")
    
    STATE=$(echo "$STATUS_RESPONSE" | jq -r '.state' 2>/dev/null || echo "")
    
    if [ "$STATE" = "ready" ]; then
        echo "✅ Deployment complete!"
        break
    elif [ "$STATE" = "error" ]; then
        echo "❌ Deployment failed"
        echo "$STATUS_RESPONSE" | jq '.error_message' 2>/dev/null
        exit 1
    else
        echo -ne "\r⏳ Status: $STATE (${i}s)..."
    fi
done

echo ""

# Step 6: Test endpoints
echo ""
echo "🧪 Step 6: Testing endpoints..."

sleep 5  # Give CDN time to update

TEST_PASSED=0
TEST_FAILED=0

# Test main site
echo -n "Testing main site... "
if curl -sf "https://elevateforhumanityfix2.netlify.app/" > /dev/null 2>&1; then
    echo "✅"
    ((TEST_PASSED++))
else
    echo "❌"
    ((TEST_FAILED++))
fi

# Test API endpoints
for endpoint in efh-config.json programs.json partnerships.json stats.json; do
    echo -n "Testing /api/$endpoint... "
    if curl -sf "https://elevateforhumanityfix2.netlify.app/api/$endpoint" | jq empty 2>/dev/null; then
        echo "✅"
        ((TEST_PASSED++))
    else
        echo "❌"
        ((TEST_FAILED++))
    fi
done

# Cleanup
rm -f deploy.zip

# Summary
echo ""
echo "=============================================="
if [ $TEST_FAILED -eq 0 ]; then
    echo "✅ SUCCESS! All tests passed ($TEST_PASSED/5)"
    echo "=============================================="
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "📊 Working Endpoints:"
    echo "  ✅ https://elevateforhumanityfix2.netlify.app/"
    echo "  ✅ https://elevateforhumanityfix2.netlify.app/api/efh-config.json"
    echo "  ✅ https://elevateforhumanityfix2.netlify.app/api/programs.json"
    echo "  ✅ https://elevateforhumanityfix2.netlify.app/api/partnerships.json"
    echo "  ✅ https://elevateforhumanityfix2.netlify.app/api/stats.json"
    echo ""
    exit 0
else
    echo "⚠️  PARTIAL SUCCESS: $TEST_PASSED passed, $TEST_FAILED failed"
    echo "=============================================="
    echo ""
    echo "Deployment completed but some tests failed."
    echo "Check the endpoints manually."
    echo ""
    exit 1
fi
