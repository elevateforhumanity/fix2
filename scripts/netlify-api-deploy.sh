#!/bin/bash
# Netlify API Deployment Script
# Triggers deployment and checks configuration via Netlify API

set -e

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
SITE_NAME="elevateproduction"

echo "🚀 Netlify API Deployment Tool"
echo "================================"
echo ""
echo "Site: $SITE_NAME"
echo "Site ID: $SITE_ID"
echo ""

# Check if NETLIFY_AUTH_TOKEN is set
if [ -z "${NETLIFY_AUTH_TOKEN:-}" ]; then
    echo "❌ NETLIFY_AUTH_TOKEN not set"
    echo ""
    echo "To get your token:"
    echo "1. Go to: https://app.netlify.com/user/applications"
    echo "2. Click 'New access token'"
    echo "3. Copy the token"
    echo "4. Run: export NETLIFY_AUTH_TOKEN='your_token_here'"
    echo ""
    exit 1
fi

echo "✅ NETLIFY_AUTH_TOKEN is set"
echo ""

# Function to make API calls
api_call() {
    local method=$1
    local endpoint=$2
    local data=${3:-}
    
    if [ -z "$data" ]; then
        curl -s -X "$method" \
            -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
            -H "Content-Type: application/json" \
            "https://api.netlify.com/api/v1/$endpoint"
    else
        curl -s -X "$method" \
            -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "https://api.netlify.com/api/v1/$endpoint"
    fi
}

# 1. Get site info
echo "1️⃣  Fetching site information..."
SITE_INFO=$(api_call GET "sites/$SITE_ID")

if echo "$SITE_INFO" | grep -q "error"; then
    echo "❌ Error fetching site info:"
    echo "$SITE_INFO" | jq -r '.message // .error'
    exit 1
fi

SITE_URL=$(echo "$SITE_INFO" | jq -r '.url')
REPO=$(echo "$SITE_INFO" | jq -r '.build_settings.repo_url // "Not connected"')
BRANCH=$(echo "$SITE_INFO" | jq -r '.build_settings.repo_branch // "Not set"')
BUILD_CMD=$(echo "$SITE_INFO" | jq -r '.build_settings.cmd // "Not set"')
PUBLISH_DIR=$(echo "$SITE_INFO" | jq -r '.build_settings.dir // "Not set"')

echo "✅ Site found"
echo "   URL: $SITE_URL"
echo "   Repo: $REPO"
echo "   Branch: $BRANCH"
echo "   Build command: $BUILD_CMD"
echo "   Publish directory: $PUBLISH_DIR"
echo ""

# 2. Check build settings
echo "2️⃣  Verifying build settings..."

if [ "$BUILD_CMD" != "npm run build" ]; then
    echo "⚠️  Build command is: $BUILD_CMD"
    echo "   Expected: npm run build"
    echo ""
    echo "   To fix, run:"
    echo "   Update in Netlify dashboard or use API to update"
fi

if [ "$PUBLISH_DIR" != "dist" ]; then
    echo "⚠️  Publish directory is: $PUBLISH_DIR"
    echo "   Expected: dist"
    echo ""
fi

if [ "$BRANCH" != "main" ]; then
    echo "⚠️  Branch is: $BRANCH"
    echo "   Expected: main"
    echo ""
fi

# 3. Get latest deploy
echo "3️⃣  Checking latest deploy..."
DEPLOYS=$(api_call GET "sites/$SITE_ID/deploys?per_page=1")
LATEST_DEPLOY=$(echo "$DEPLOYS" | jq -r '.[0]')

if [ "$LATEST_DEPLOY" != "null" ]; then
    DEPLOY_ID=$(echo "$LATEST_DEPLOY" | jq -r '.id')
    DEPLOY_STATE=$(echo "$LATEST_DEPLOY" | jq -r '.state')
    DEPLOY_CREATED=$(echo "$LATEST_DEPLOY" | jq -r '.created_at')
    DEPLOY_URL=$(echo "$LATEST_DEPLOY" | jq -r '.deploy_ssl_url')
    
    echo "✅ Latest deploy:"
    echo "   ID: $DEPLOY_ID"
    echo "   State: $DEPLOY_STATE"
    echo "   Created: $DEPLOY_CREATED"
    echo "   URL: $DEPLOY_URL"
else
    echo "⚠️  No deploys found"
fi
echo ""

# 4. Trigger new deploy
echo "4️⃣  Triggering new deployment..."
echo ""
read -p "Do you want to trigger a new deploy? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "   Triggering deploy..."
    
    # Create a build hook or trigger via API
    DEPLOY_RESPONSE=$(api_call POST "sites/$SITE_ID/builds" '{"clear_cache": true}')
    
    if echo "$DEPLOY_RESPONSE" | grep -q "error"; then
        echo "❌ Error triggering deploy:"
        echo "$DEPLOY_RESPONSE" | jq -r '.message // .error'
    else
        NEW_DEPLOY_ID=$(echo "$DEPLOY_RESPONSE" | jq -r '.id')
        echo "✅ Deploy triggered!"
        echo "   Deploy ID: $NEW_DEPLOY_ID"
        echo "   Monitor at: https://app.netlify.com/sites/$SITE_NAME/deploys/$NEW_DEPLOY_ID"
        echo ""
        echo "   Waiting for deploy to start..."
        sleep 5
        
        # Check deploy status
        for i in {1..12}; do
            DEPLOY_STATUS=$(api_call GET "sites/$SITE_ID/deploys/$NEW_DEPLOY_ID")
            STATE=$(echo "$DEPLOY_STATUS" | jq -r '.state')
            
            echo "   Status: $STATE"
            
            if [ "$STATE" = "ready" ]; then
                echo "✅ Deploy completed successfully!"
                echo "   Site is live at: $SITE_URL"
                break
            elif [ "$STATE" = "error" ]; then
                echo "❌ Deploy failed"
                echo "   Check logs at: https://app.netlify.com/sites/$SITE_NAME/deploys/$NEW_DEPLOY_ID"
                break
            fi
            
            sleep 10
        done
    fi
else
    echo "   Deploy cancelled"
fi
echo ""

# 5. Get environment variables
echo "5️⃣  Checking environment variables..."
ENV_VARS=$(api_call GET "accounts/$(echo "$SITE_INFO" | jq -r '.account_slug')/env")

if echo "$ENV_VARS" | grep -q "error"; then
    echo "⚠️  Could not fetch environment variables"
else
    ENV_COUNT=$(echo "$ENV_VARS" | jq 'length')
    echo "✅ Found $ENV_COUNT environment variables"
    
    # Check for required variables
    if echo "$ENV_VARS" | jq -e '.[] | select(.key == "NODE_VERSION")' > /dev/null; then
        NODE_VER=$(echo "$ENV_VARS" | jq -r '.[] | select(.key == "NODE_VERSION") | .values[0].value')
        echo "   ✅ NODE_VERSION: $NODE_VER"
    else
        echo "   ⚠️  NODE_VERSION not set"
    fi
fi
echo ""

# 6. Summary
echo "================================"
echo "📊 Summary"
echo "================================"
echo ""
echo "Site: $SITE_NAME"
echo "URL: $SITE_URL"
echo "Status: $(echo "$SITE_INFO" | jq -r '.state')"
echo ""
echo "Configuration:"
echo "  Repository: $REPO"
echo "  Branch: $BRANCH"
echo "  Build command: $BUILD_CMD"
echo "  Publish directory: $PUBLISH_DIR"
echo ""
echo "Latest deploy: $DEPLOY_STATE"
echo ""
echo "Next steps:"
echo "1. Visit: $SITE_URL"
echo "2. Check deploy logs: https://app.netlify.com/sites/$SITE_NAME/deploys"
echo "3. Update settings if needed: https://app.netlify.com/sites/$SITE_NAME/settings"
echo ""
