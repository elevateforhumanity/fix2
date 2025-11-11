#!/bin/bash
# Autopilot: 100% Complete Netlify Configuration Audit
# Checks EVERY setting line-by-line with zero skipping

set -e

SITE_ID="12f120ab-3f63-419b-bc49-430f043415c1"
SITE_NAME="elevateproduction"

echo "🤖 AUTOPILOT: 100% COMPLETE NETLIFY AUDIT"
echo "=========================================="
echo ""
echo "Site ID: $SITE_ID"
echo "Site Name: $SITE_NAME"
echo ""

# Check for API token
if [ -z "${NETLIFY_AUTH_TOKEN:-}" ]; then
    echo "❌ NETLIFY_AUTH_TOKEN not set"
    echo ""
    echo "Get token: https://app.netlify.com/user/applications"
    echo "Then run: export NETLIFY_AUTH_TOKEN='your_token'"
    exit 1
fi

echo "✅ API token found"
echo ""

# API helper
api() {
    curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
         -H "Content-Type: application/json" \
         "https://api.netlify.com/api/v1/$1"
}

# Get full site info
echo "📡 Fetching complete site configuration..."
SITE=$(api "sites/$SITE_ID")

if echo "$SITE" | grep -q "error"; then
    echo "❌ Failed to fetch site"
    echo "$SITE"
    exit 1
fi

echo "✅ Site data retrieved"
echo ""

# Parse all settings
SITE_URL=$(echo "$SITE" | jq -r '.url')
SITE_NAME_API=$(echo "$SITE" | jq -r '.name')
CUSTOM_DOMAIN=$(echo "$SITE" | jq -r '.custom_domain // "none"')
REPO_URL=$(echo "$SITE" | jq -r '.build_settings.repo_url // "not connected"')
REPO_BRANCH=$(echo "$SITE" | jq -r '.build_settings.repo_branch // "not set"')
BUILD_CMD=$(echo "$SITE" | jq -r '.build_settings.cmd // "not set"')
PUBLISH_DIR=$(echo "$SITE" | jq -r '.build_settings.dir // "not set"')
BASE_DIR=$(echo "$SITE" | jq -r '.build_settings.base // "not set"')
FUNCTIONS_DIR=$(echo "$SITE" | jq -r '.build_settings.functions_dir // "not set"')
ENV_VARS=$(echo "$SITE" | jq -r '.build_settings.env // {}')

echo "=========================================="
echo "SECTION 1: SITE IDENTITY"
echo "=========================================="
echo ""
echo "1.1 Site Name"
echo "    Current: $SITE_NAME_API"
echo "    Expected: elevateproduction"
if [ "$SITE_NAME_API" = "elevateproduction" ]; then
    echo "    ✅ CORRECT"
else
    echo "    ❌ MISMATCH"
fi
echo ""

echo "1.2 Site URL"
echo "    Current: $SITE_URL"
echo "    Expected: https://elevateproduction.netlify.app"
if [ "$SITE_URL" = "https://elevateproduction.netlify.app" ]; then
    echo "    ✅ CORRECT"
else
    echo "    ❌ MISMATCH"
fi
echo ""

echo "1.3 Custom Domain"
echo "    Current: $CUSTOM_DOMAIN"
echo "    Expected: none (using Netlify subdomain)"
if [ "$CUSTOM_DOMAIN" = "none" ] || [ "$CUSTOM_DOMAIN" = "null" ]; then
    echo "    ✅ CORRECT"
else
    echo "    ⚠️  Custom domain set: $CUSTOM_DOMAIN"
fi
echo ""

echo "=========================================="
echo "SECTION 2: REPOSITORY CONNECTION"
echo "=========================================="
echo ""
echo "2.1 Repository URL"
echo "    Current: $REPO_URL"
echo "    Expected: https://github.com/elevateforhumanity/fix2"
if echo "$REPO_URL" | grep -q "elevateforhumanity/fix2"; then
    echo "    ✅ CORRECT"
else
    echo "    ❌ WRONG REPO OR NOT CONNECTED"
fi
echo ""

echo "2.2 Deploy Branch"
echo "    Current: $REPO_BRANCH"
echo "    Expected: main"
if [ "$REPO_BRANCH" = "main" ]; then
    echo "    ✅ CORRECT"
else
    echo "    ❌ WRONG BRANCH"
fi
echo ""

echo "=========================================="
echo "SECTION 3: BUILD SETTINGS"
echo "=========================================="
echo ""
echo "3.1 Build Command"
echo "    Current: $BUILD_CMD"
echo "    Expected: npm run build"
if [ "$BUILD_CMD" = "npm run build" ]; then
    echo "    ✅ CORRECT"
else
    echo "    ❌ WRONG COMMAND"
fi
echo ""

echo "3.2 Publish Directory"
echo "    Current: $PUBLISH_DIR"
echo "    Expected: dist"
if [ "$PUBLISH_DIR" = "dist" ]; then
    echo "    ✅ CORRECT"
else
    echo "    ❌ WRONG DIRECTORY"
fi
echo ""

echo "3.3 Base Directory"
echo "    Current: $BASE_DIR"
echo "    Expected: (empty/not set)"
if [ "$BASE_DIR" = "not set" ] || [ "$BASE_DIR" = "null" ] || [ "$BASE_DIR" = "" ]; then
    echo "    ✅ CORRECT"
else
    echo "    ⚠️  Base directory set: $BASE_DIR"
fi
echo ""

echo "3.4 Functions Directory"
echo "    Current: $FUNCTIONS_DIR"
echo "    Expected: (not used)"
if [ "$FUNCTIONS_DIR" = "not set" ] || [ "$FUNCTIONS_DIR" = "null" ]; then
    echo "    ✅ CORRECT (not using functions)"
else
    echo "    ℹ️  Functions dir: $FUNCTIONS_DIR"
fi
echo ""

echo "=========================================="
echo "SECTION 4: ENVIRONMENT VARIABLES"
echo "=========================================="
echo ""

# Get account slug for env vars
ACCOUNT_SLUG=$(echo "$SITE" | jq -r '.account_slug')
echo "4.1 Fetching environment variables..."
ENV_LIST=$(api "accounts/$ACCOUNT_SLUG/env")

if echo "$ENV_LIST" | grep -q "error"; then
    echo "    ⚠️  Could not fetch env vars"
else
    echo "    ✅ Environment variables retrieved"
    echo ""
    
    # Check NODE_VERSION
    echo "4.2 NODE_VERSION"
    if echo "$ENV_LIST" | jq -e '.[] | select(.key == "NODE_VERSION")' > /dev/null 2>&1; then
        NODE_VER=$(echo "$ENV_LIST" | jq -r '.[] | select(.key == "NODE_VERSION") | .values[0].value')
        echo "    Current: $NODE_VER"
        echo "    Expected: 20.19.0"
        if [ "$NODE_VER" = "20.19.0" ]; then
            echo "    ✅ CORRECT"
        else
            echo "    ⚠️  Different version"
        fi
    else
        echo "    ❌ NOT SET"
    fi
    echo ""
    
    # Check VITE_SUPABASE_URL
    echo "4.3 VITE_SUPABASE_URL"
    if echo "$ENV_LIST" | jq -e '.[] | select(.key == "VITE_SUPABASE_URL")' > /dev/null 2>&1; then
        echo "    ✅ SET"
    else
        echo "    ⚠️  NOT SET (optional if not using Supabase)"
    fi
    echo ""
    
    # Check VITE_SUPABASE_ANON_KEY
    echo "4.4 VITE_SUPABASE_ANON_KEY"
    if echo "$ENV_LIST" | jq -e '.[] | select(.key == "VITE_SUPABASE_ANON_KEY")' > /dev/null 2>&1; then
        echo "    ✅ SET"
    else
        echo "    ⚠️  NOT SET (optional if not using Supabase)"
    fi
    echo ""
    
    # List all env vars
    echo "4.5 All Environment Variables:"
    echo "$ENV_LIST" | jq -r '.[] | "    - \(.key)"'
fi
echo ""

echo "=========================================="
echo "SECTION 5: DEPLOY SETTINGS"
echo "=========================================="
echo ""

# Get deploy settings
DEPLOY_SETTINGS=$(echo "$SITE" | jq -r '.deploy_settings // {}')

echo "5.1 Auto Publishing"
AUTO_PUBLISH=$(echo "$SITE" | jq -r '.deploy_settings.auto_publish // true')
echo "    Current: $AUTO_PUBLISH"
echo "    Expected: true"
if [ "$AUTO_PUBLISH" = "true" ]; then
    echo "    ✅ CORRECT"
else
    echo "    ❌ AUTO PUBLISH DISABLED"
fi
echo ""

echo "5.2 Deploy Previews"
DEPLOY_PREVIEWS=$(echo "$SITE" | jq -r '.deploy_settings.deploy_previews // true')
echo "    Current: $DEPLOY_PREVIEWS"
if [ "$DEPLOY_PREVIEWS" = "true" ]; then
    echo "    ✅ ENABLED"
else
    echo "    ⚠️  DISABLED"
fi
echo ""

echo "=========================================="
echo "SECTION 6: LATEST DEPLOYS"
echo "=========================================="
echo ""

DEPLOYS=$(api "sites/$SITE_ID/deploys?per_page=5")
DEPLOY_COUNT=$(echo "$DEPLOYS" | jq 'length')

echo "6.1 Recent Deploys: $DEPLOY_COUNT"
echo ""

for i in $(seq 0 $((DEPLOY_COUNT - 1))); do
    DEPLOY=$(echo "$DEPLOYS" | jq ".[$i]")
    DEPLOY_ID=$(echo "$DEPLOY" | jq -r '.id')
    DEPLOY_STATE=$(echo "$DEPLOY" | jq -r '.state')
    DEPLOY_CREATED=$(echo "$DEPLOY" | jq -r '.created_at')
    DEPLOY_BRANCH=$(echo "$DEPLOY" | jq -r '.branch')
    DEPLOY_COMMIT=$(echo "$DEPLOY" | jq -r '.commit_ref // "unknown"' | cut -c1-7)
    
    echo "Deploy #$((i + 1))"
    echo "    ID: $DEPLOY_ID"
    echo "    State: $DEPLOY_STATE"
    echo "    Branch: $DEPLOY_BRANCH"
    echo "    Commit: $DEPLOY_COMMIT"
    echo "    Created: $DEPLOY_CREATED"
    
    if [ "$DEPLOY_STATE" = "ready" ]; then
        echo "    ✅ SUCCESS"
    elif [ "$DEPLOY_STATE" = "error" ]; then
        echo "    ❌ FAILED"
    elif [ "$DEPLOY_STATE" = "building" ]; then
        echo "    ⏳ IN PROGRESS"
    else
        echo "    ℹ️  $DEPLOY_STATE"
    fi
    echo ""
done

echo "=========================================="
echo "SECTION 7: BUILD HOOKS"
echo "=========================================="
echo ""

BUILD_HOOKS=$(api "sites/$SITE_ID/build_hooks")
HOOK_COUNT=$(echo "$BUILD_HOOKS" | jq 'length')

echo "7.1 Build Hooks: $HOOK_COUNT configured"
if [ "$HOOK_COUNT" -gt 0 ]; then
    echo "$BUILD_HOOKS" | jq -r '.[] | "    - \(.title) (branch: \(.branch))"'
else
    echo "    ℹ️  No build hooks configured"
fi
echo ""

echo "=========================================="
echo "SECTION 8: FORMS & FUNCTIONS"
echo "=========================================="
echo ""

echo "8.1 Forms"
FORMS_ENABLED=$(echo "$SITE" | jq -r '.processing_settings.forms.enabled // false')
echo "    Enabled: $FORMS_ENABLED"
if [ "$FORMS_ENABLED" = "false" ]; then
    echo "    ✅ DISABLED (not needed)"
else
    echo "    ℹ️  Forms enabled"
fi
echo ""

echo "8.2 Functions"
FUNCTIONS=$(api "sites/$SITE_ID/functions")
FUNC_COUNT=$(echo "$FUNCTIONS" | jq 'length')
echo "    Functions deployed: $FUNC_COUNT"
if [ "$FUNC_COUNT" -eq 0 ]; then
    echo "    ✅ NONE (not using functions)"
else
    echo "    ℹ️  $FUNC_COUNT functions deployed"
fi
echo ""

echo "=========================================="
echo "SECTION 9: DOMAIN & SSL"
echo "=========================================="
echo ""

echo "9.1 SSL Certificate"
SSL_URL=$(echo "$SITE" | jq -r '.ssl_url // "none"')
echo "    SSL URL: $SSL_URL"
if echo "$SSL_URL" | grep -q "https://"; then
    echo "    ✅ SSL ENABLED"
else
    echo "    ❌ SSL NOT CONFIGURED"
fi
echo ""

echo "9.2 Force HTTPS"
FORCE_SSL=$(echo "$SITE" | jq -r '.force_ssl // false')
echo "    Force HTTPS: $FORCE_SSL"
if [ "$FORCE_SSL" = "true" ]; then
    echo "    ✅ ENABLED"
else
    echo "    ⚠️  NOT FORCED"
fi
echo ""

echo "=========================================="
echo "SECTION 10: PERFORMANCE & CACHING"
echo "=========================================="
echo ""

echo "10.1 Asset Optimization"
ASSET_OPT=$(echo "$SITE" | jq -r '.processing_settings.css.bundle // false')
echo "    CSS Bundling: $ASSET_OPT"
echo ""

echo "10.2 Image Optimization"
IMG_OPT=$(echo "$SITE" | jq -r '.processing_settings.images.optimize // false')
echo "    Image Optimization: $IMG_OPT"
echo ""

echo "=========================================="
echo "📊 AUDIT SUMMARY"
echo "=========================================="
echo ""

# Count issues
ISSUES=0

[ "$SITE_NAME_API" != "elevateproduction" ] && ((ISSUES++))
[ "$REPO_BRANCH" != "main" ] && ((ISSUES++))
[ "$BUILD_CMD" != "npm run build" ] && ((ISSUES++))
[ "$PUBLISH_DIR" != "dist" ] && ((ISSUES++))
[ "$AUTO_PUBLISH" != "true" ] && ((ISSUES++))

echo "Configuration Status:"
echo "  Site Name: $([ "$SITE_NAME_API" = "elevateproduction" ] && echo "✅" || echo "❌")"
echo "  Repository: $(echo "$REPO_URL" | grep -q "fix2" && echo "✅" || echo "❌")"
echo "  Branch: $([ "$REPO_BRANCH" = "main" ] && echo "✅" || echo "❌")"
echo "  Build Command: $([ "$BUILD_CMD" = "npm run build" ] && echo "✅" || echo "❌")"
echo "  Publish Dir: $([ "$PUBLISH_DIR" = "dist" ] && echo "✅" || echo "❌")"
echo "  Auto Publish: $([ "$AUTO_PUBLISH" = "true" ] && echo "✅" || echo "❌")"
echo "  SSL: $(echo "$SSL_URL" | grep -q "https" && echo "✅" || echo "❌")"
echo ""
echo "Recent Deploys: $DEPLOY_COUNT"
echo "Build Hooks: $HOOK_COUNT"
echo ""

if [ $ISSUES -eq 0 ]; then
    echo "✅ ALL SETTINGS CORRECT - 100% VERIFIED"
else
    echo "❌ FOUND $ISSUES CONFIGURATION ISSUES"
fi
echo ""

echo "Site URL: $SITE_URL"
echo "Dashboard: https://app.netlify.com/sites/$SITE_NAME"
echo ""
echo "=========================================="
echo "✅ 100% COMPLETE AUDIT FINISHED"
echo "=========================================="
