#!/bin/bash
# Autopilot: Add elevateconnectsdirectory.org to Netlify
# Uses Netlify CLI to authenticate and add domain

set -e

echo "🤖 AUTOPILOT: Add Domain to Netlify"
echo "====================================="
echo ""

DOMAIN="elevateconnectsdirectory.org"
SITE_NAME="elevateproduction"

echo "Target Configuration:"
echo "  Domain: $DOMAIN"
echo "  Netlify Site: $SITE_NAME"
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found"
    echo ""
    echo "Installing Netlify CLI..."
    npm install -g netlify-cli
fi

echo "✅ Netlify CLI installed"
echo ""

# Check if already logged in
echo "Checking Netlify authentication..."
if netlify status 2>&1 | grep -q "Not logged in"; then
    echo "⚠️  Not logged in to Netlify"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "AUTHENTICATION REQUIRED"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Option 1: Use API Token (Recommended)"
    echo "  1. Get token: https://app.netlify.com/user/applications"
    echo "  2. Run: export NETLIFY_AUTH_TOKEN='your-token'"
    echo "  3. Run this script again"
    echo ""
    echo "Option 2: Login via Browser"
    echo "  Run: netlify login"
    echo "  This will open a browser to authenticate"
    echo ""
    
    # Check if we have a token in environment
    if [ -n "$NETLIFY_AUTH_TOKEN" ]; then
        echo "✅ Found NETLIFY_AUTH_TOKEN in environment"
        echo "   Using token for authentication"
        echo ""
    else
        echo "Attempting browser login..."
        netlify login
    fi
else
    echo "✅ Already authenticated with Netlify"
    echo ""
fi

# Link to the site
echo "Linking to Netlify site..."
if [ ! -f ".netlify/state.json" ]; then
    netlify link --name "$SITE_NAME"
    echo "✅ Linked to $SITE_NAME"
else
    echo "✅ Already linked to site"
fi
echo ""

# Add the domain using Netlify API
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ADDING DOMAIN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get site ID
SITE_ID=$(netlify api getSite --data '{}' 2>/dev/null | jq -r '.id' || echo "")

if [ -z "$SITE_ID" ]; then
    echo "❌ Could not get site ID"
    echo ""
    echo "Manual fallback:"
    echo "1. Go to: https://app.netlify.com/sites/$SITE_NAME/settings/domain"
    echo "2. Click 'Add domain alias'"
    echo "3. Enter: $DOMAIN"
    echo "4. Click 'Add domain'"
    exit 1
fi

echo "Site ID: $SITE_ID"
echo ""

# Add domain via API
echo "Adding $DOMAIN to Netlify..."

# Use netlify API to add domain
RESPONSE=$(netlify api createSiteDomain --data "{\"domain\": \"$DOMAIN\"}" 2>&1 || echo "error")

if echo "$RESPONSE" | grep -q "error\|Error\|already"; then
    if echo "$RESPONSE" | grep -q "already"; then
        echo "✅ Domain already added to Netlify"
    else
        echo "⚠️  Could not add domain via CLI"
        echo "Response: $RESPONSE"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "MANUAL FALLBACK"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "Add domain manually:"
        echo "1. Go to: https://app.netlify.com/sites/$SITE_NAME/settings/domain"
        echo "2. Click 'Add domain alias'"
        echo "3. Enter: $DOMAIN"
        echo "4. Click 'Add domain'"
        echo ""
        echo "Or use API token:"
        echo "  export NETLIFY_AUTH_TOKEN='your-token'"
        echo "  bash scripts/autopilot-add-domain.sh"
        exit 1
    fi
else
    echo "✅ Domain added successfully!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SSL CERTIFICATE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Netlify is now provisioning SSL certificate..."
echo "This takes 2-10 minutes (usually 3-5 minutes)"
echo ""
echo "Monitor progress:"
echo "  bash scripts/autopilot-check-ssl.sh"
echo ""
echo "Or check in dashboard:"
echo "  https://app.netlify.com/sites/$SITE_NAME/settings/domain"
echo ""

# Wait a moment and check SSL status
echo "Waiting 10 seconds before checking SSL status..."
sleep 10

echo ""
echo "Checking SSL status..."
SSL_CHECK=$(curl -Ivks "https://$DOMAIN" 2>&1 | grep "subject:" | head -1 || echo "")

if echo "$SSL_CHECK" | grep -q "CN=$DOMAIN"; then
    echo "✅ SSL certificate already active!"
    echo "   Certificate: $SSL_CHECK"
elif echo "$SSL_CHECK" | grep -q "CN=\*.netlify.app"; then
    echo "⏳ SSL provisioning in progress..."
    echo "   Current certificate: *.netlify.app"
    echo "   Expected: $DOMAIN"
    echo ""
    echo "Check again in a few minutes:"
    echo "  bash scripts/autopilot-check-ssl.sh"
else
    echo "⚠️  SSL status unclear"
    echo "   Response: $SSL_CHECK"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Domain added to Netlify"
echo "⏳ SSL certificate provisioning (2-10 minutes)"
echo ""
echo "Next steps:"
echo "1. Wait for SSL certificate"
echo "2. Clear browser cache (Ctrl+Shift+R)"
echo "3. Visit: https://$DOMAIN"
echo ""
echo "Monitor SSL:"
echo "  bash scripts/autopilot-check-ssl.sh"
echo ""
