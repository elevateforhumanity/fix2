#!/bin/bash
# Complete Netlify Configuration Audit
# Line-by-line verification of EVERYTHING in Netlify

set -e

echo "🔍 NETLIFY COMPLETE CONFIGURATION AUDIT"
echo "========================================"
echo ""

SITE_NAME="elevateproduction"
CORRECT_DOMAIN="www.elevateconnectsdirectory.org"
APEX_DOMAIN="elevateconnectsdirectory.org"

echo "Expected Configuration:"
echo "  Netlify Site: $SITE_NAME"
echo "  Primary Domain: $CORRECT_DOMAIN"
echo "  Apex Domain: $APEX_DOMAIN"
echo ""

# Check if we have Netlify token
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "❌ NETLIFY_AUTH_TOKEN not set"
    echo ""
    echo "To get full Netlify configuration, you need an API token:"
    echo "1. Go to: https://app.netlify.com/user/applications"
    echo "2. Create new access token"
    echo "3. Run: export NETLIFY_AUTH_TOKEN='your-token'"
    echo ""
    echo "Continuing with limited checks..."
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. DNS CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check apex domain
APEX_IP=$(curl -s "https://dns.google/resolve?name=$APEX_DOMAIN&type=A" | grep -o '"data":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Apex domain ($APEX_DOMAIN):"
echo "  Points to: $APEX_IP"
if [ "$APEX_IP" = "75.2.60.5" ]; then
    echo "  Status: ✅ Correct (Netlify load balancer)"
else
    echo "  Status: ❌ Wrong (should be 75.2.60.5)"
fi
echo ""

# Check www subdomain
WWW_TARGET=$(curl -s "https://dns.google/resolve?name=$CORRECT_DOMAIN&type=CNAME" | grep -o '"data":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -z "$WWW_TARGET" ]; then
    WWW_TARGET=$(curl -s "https://dns.google/resolve?name=$CORRECT_DOMAIN&type=A" | grep -o '"data":"[^"]*"' | head -1 | cut -d'"' -f4)
    WWW_TYPE="A"
else
    WWW_TYPE="CNAME"
fi

echo "WWW subdomain ($CORRECT_DOMAIN):"
echo "  Type: $WWW_TYPE"
echo "  Points to: $WWW_TARGET"
if [ "$WWW_TARGET" = "$SITE_NAME.netlify.app." ] || [ "$WWW_TARGET" = "$SITE_NAME.netlify.app" ]; then
    echo "  Status: ✅ Correct (CNAME to Netlify)"
elif [ "$WWW_TARGET" = "75.2.60.5" ]; then
    echo "  Status: ⚠️  Using A record (CNAME recommended)"
else
    echo "  Status: ❌ Wrong (should point to $SITE_NAME.netlify.app)"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. NETLIFY SITE STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Netlify subdomain
NETLIFY_STATUS=$(curl -sI "https://$SITE_NAME.netlify.app" | grep "HTTP" | head -1)
echo "Netlify subdomain ($SITE_NAME.netlify.app):"
echo "  Status: $NETLIFY_STATUS"
if echo "$NETLIFY_STATUS" | grep -q "200"; then
    echo "  ✅ Site is live"
else
    echo "  ❌ Site not accessible"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. SSL CERTIFICATES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check apex domain SSL
echo "Checking $APEX_DOMAIN SSL..."
APEX_SSL=$(curl -Ivks "https://$APEX_DOMAIN" 2>&1 | grep "subject:" | head -1 || echo "No SSL")
echo "  Certificate: $APEX_SSL"
if echo "$APEX_SSL" | grep -q "CN=$APEX_DOMAIN"; then
    echo "  Status: ✅ Valid SSL for $APEX_DOMAIN"
elif echo "$APEX_SSL" | grep -q "CN=\*.netlify.app"; then
    echo "  Status: ❌ Using *.netlify.app certificate (domain not added)"
else
    echo "  Status: ❌ SSL issue"
fi
echo ""

# Check www subdomain SSL
echo "Checking $CORRECT_DOMAIN SSL..."
WWW_SSL=$(curl -Ivks "https://$CORRECT_DOMAIN" 2>&1 | grep "subject:" | head -1 || echo "No SSL")
echo "  Certificate: $WWW_SSL"
if echo "$WWW_SSL" | grep -q "CN=$CORRECT_DOMAIN\|CN=\*\.elevateconnectsdirectory.org"; then
    echo "  Status: ✅ Valid SSL for $CORRECT_DOMAIN"
elif echo "$WWW_SSL" | grep -q "CN=\*.netlify.app"; then
    echo "  Status: ❌ Using *.netlify.app certificate (domain not added)"
else
    echo "  Status: ❌ SSL issue"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. NETLIFY CONFIGURATION (via API)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -n "$NETLIFY_AUTH_TOKEN" ]; then
    # Get site info
    SITE_INFO=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "https://api.netlify.com/api/v1/sites?name=$SITE_NAME" | jq '.[0]' 2>/dev/null || echo "{}")
    
    if [ "$SITE_INFO" != "{}" ] && [ "$SITE_INFO" != "null" ]; then
        SITE_ID=$(echo "$SITE_INFO" | jq -r '.id' 2>/dev/null)
        CUSTOM_DOMAIN=$(echo "$SITE_INFO" | jq -r '.custom_domain' 2>/dev/null)
        DOMAIN_ALIASES=$(echo "$SITE_INFO" | jq -r '.domain_aliases[]?' 2>/dev/null)
        SSL_ENABLED=$(echo "$SITE_INFO" | jq -r '.ssl' 2>/dev/null)
        
        echo "Site ID: $SITE_ID"
        echo "Custom Domain: $CUSTOM_DOMAIN"
        echo "Domain Aliases:"
        if [ -n "$DOMAIN_ALIASES" ]; then
            echo "$DOMAIN_ALIASES" | while read -r alias; do
                if [ "$alias" = "$CORRECT_DOMAIN" ] || [ "$alias" = "$APEX_DOMAIN" ]; then
                    echo "  ✅ $alias"
                else
                    echo "  ⚠️  $alias (unexpected)"
                fi
            done
        else
            echo "  ❌ No domain aliases configured"
        fi
        echo "SSL Enabled: $SSL_ENABLED"
        echo ""
    else
        echo "❌ Could not fetch site info from Netlify API"
        echo ""
    fi
else
    echo "⚠️  Skipped (no API token)"
    echo ""
    echo "To check full Netlify configuration:"
    echo "1. Get token: https://app.netlify.com/user/applications"
    echo "2. Run: export NETLIFY_AUTH_TOKEN='token'"
    echo "3. Run this script again"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. REQUIRED ACTIONS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

NEEDS_ACTION=false

# Check if domains are added
if echo "$APEX_SSL" | grep -q "CN=\*.netlify.app"; then
    echo "❌ ACTION REQUIRED: Add $APEX_DOMAIN to Netlify"
    echo "   Go to: https://app.netlify.com/sites/$SITE_NAME/settings/domain"
    echo "   Click: Add domain alias"
    echo "   Enter: $APEX_DOMAIN"
    echo ""
    NEEDS_ACTION=true
fi

if echo "$WWW_SSL" | grep -q "CN=\*.netlify.app"; then
    echo "❌ ACTION REQUIRED: Add $CORRECT_DOMAIN to Netlify"
    echo "   Go to: https://app.netlify.com/sites/$SITE_NAME/settings/domain"
    echo "   Click: Add domain alias"
    echo "   Enter: $CORRECT_DOMAIN"
    echo ""
    NEEDS_ACTION=true
fi

if [ "$NEEDS_ACTION" = false ]; then
    echo "✅ No actions required - configuration looks good!"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Correct Configuration:"
echo "  ✅ DNS: $APEX_DOMAIN → 75.2.60.5"
echo "  ✅ DNS: $CORRECT_DOMAIN → $SITE_NAME.netlify.app"
echo "  ⏳ Netlify: Add both domains as custom domains"
echo "  ⏳ SSL: Will provision automatically after adding domains"
echo ""
echo "Direct Link to Add Domains:"
echo "  https://app.netlify.com/sites/$SITE_NAME/settings/domain"
echo ""
