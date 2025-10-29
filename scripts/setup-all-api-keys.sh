#!/bin/bash

# =============================================
# Complete API Keys Setup Script
# Autonomous Autopilot v7.0
# =============================================

set -e

echo "🔑 Complete API Keys Setup"
echo "=================================="
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
fi

echo "This script will help you add all API keys to your .env file."
echo ""
echo "You mentioned you have:"
echo "  ✅ Stripe keys"
echo "  ✅ Social media API keys"
echo ""
echo "Let's add them to your .env file."
echo ""

# ============================================
# STRIPE KEYS
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "💳 STRIPE CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Get your Stripe keys from: https://dashboard.stripe.com/apikeys"
echo ""

read -p "Enter STRIPE_SECRET_KEY (sk_test_... or sk_live_...): " stripe_secret
read -p "Enter VITE_STRIPE_PUBLISHABLE_KEY (pk_test_... or pk_live_...): " stripe_pub
read -p "Enter STRIPE_WEBHOOK_SECRET (whsec_...): " stripe_webhook

# Update .env file
sed -i "s|STRIPE_SECRET_KEY=.*|STRIPE_SECRET_KEY=$stripe_secret|g" .env
sed -i "s|VITE_STRIPE_PUBLISHABLE_KEY=.*|VITE_STRIPE_PUBLISHABLE_KEY=$stripe_pub|g" .env
sed -i "s|STRIPE_WEBHOOK_SECRET=.*|STRIPE_WEBHOOK_SECRET=$stripe_webhook|g" .env

echo ""
echo "✅ Stripe keys added to .env"
echo ""

# ============================================
# OPENAI KEY
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🤖 OPENAI CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Get your OpenAI key from: https://platform.openai.com/api-keys"
echo ""

read -p "Enter OPENAI_API_KEY (sk-proj-... or skip to continue): " openai_key

if [ ! -z "$openai_key" ]; then
    sed -i "s|OPENAI_API_KEY=.*|OPENAI_API_KEY=$openai_key|g" .env
    echo ""
    echo "✅ OpenAI key added to .env"
else
    echo ""
    echo "⏭️  Skipped OpenAI key"
fi
echo ""

# ============================================
# TWITTER/X KEYS
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🐦 TWITTER/X CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Get your Twitter keys from: https://developer.twitter.com/en/portal/dashboard"
echo ""

read -p "Enter TWITTER_API_KEY (or skip to continue): " twitter_key
if [ ! -z "$twitter_key" ]; then
    read -p "Enter TWITTER_API_SECRET: " twitter_secret
    read -p "Enter TWITTER_ACCESS_TOKEN: " twitter_token
    read -p "Enter TWITTER_ACCESS_SECRET: " twitter_access_secret
    
    # Add to .env if not exists
    if ! grep -q "TWITTER_API_KEY" .env; then
        echo "" >> .env
        echo "# Twitter/X Configuration" >> .env
        echo "TWITTER_API_KEY=$twitter_key" >> .env
        echo "TWITTER_API_SECRET=$twitter_secret" >> .env
        echo "TWITTER_ACCESS_TOKEN=$twitter_token" >> .env
        echo "TWITTER_ACCESS_SECRET=$twitter_access_secret" >> .env
    else
        sed -i "s|TWITTER_API_KEY=.*|TWITTER_API_KEY=$twitter_key|g" .env
        sed -i "s|TWITTER_API_SECRET=.*|TWITTER_API_SECRET=$twitter_secret|g" .env
        sed -i "s|TWITTER_ACCESS_TOKEN=.*|TWITTER_ACCESS_TOKEN=$twitter_token|g" .env
        sed -i "s|TWITTER_ACCESS_SECRET=.*|TWITTER_ACCESS_SECRET=$twitter_access_secret|g" .env
    fi
    
    echo ""
    echo "✅ Twitter/X keys added to .env"
else
    echo ""
    echo "⏭️  Skipped Twitter/X keys"
fi
echo ""

# ============================================
# LINKEDIN KEYS
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "💼 LINKEDIN CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Get your LinkedIn keys from: https://www.linkedin.com/developers/apps"
echo ""

read -p "Enter LINKEDIN_CLIENT_ID (or skip to continue): " linkedin_id
if [ ! -z "$linkedin_id" ]; then
    read -p "Enter LINKEDIN_CLIENT_SECRET: " linkedin_secret
    
    # Add to .env if not exists
    if ! grep -q "LINKEDIN_CLIENT_ID" .env; then
        echo "" >> .env
        echo "# LinkedIn Configuration" >> .env
        echo "LINKEDIN_CLIENT_ID=$linkedin_id" >> .env
        echo "LINKEDIN_CLIENT_SECRET=$linkedin_secret" >> .env
    else
        sed -i "s|LINKEDIN_CLIENT_ID=.*|LINKEDIN_CLIENT_ID=$linkedin_id|g" .env
        sed -i "s|LINKEDIN_CLIENT_SECRET=.*|LINKEDIN_CLIENT_SECRET=$linkedin_secret|g" .env
    fi
    
    echo ""
    echo "✅ LinkedIn keys added to .env"
else
    echo ""
    echo "⏭️  Skipped LinkedIn keys"
fi
echo ""

# ============================================
# FACEBOOK KEYS
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📘 FACEBOOK CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Get your Facebook keys from: https://developers.facebook.com/apps"
echo ""

read -p "Enter FACEBOOK_APP_ID (or skip to continue): " facebook_id
if [ ! -z "$facebook_id" ]; then
    read -p "Enter FACEBOOK_APP_SECRET: " facebook_secret
    
    # Add to .env if not exists
    if ! grep -q "FACEBOOK_APP_ID" .env; then
        echo "" >> .env
        echo "# Facebook Configuration" >> .env
        echo "FACEBOOK_APP_ID=$facebook_id" >> .env
        echo "FACEBOOK_APP_SECRET=$facebook_secret" >> .env
    else
        sed -i "s|FACEBOOK_APP_ID=.*|FACEBOOK_APP_ID=$facebook_id|g" .env
        sed -i "s|FACEBOOK_APP_SECRET=.*|FACEBOOK_APP_SECRET=$facebook_secret|g" .env
    fi
    
    echo ""
    echo "✅ Facebook keys added to .env"
else
    echo ""
    echo "⏭️  Skipped Facebook keys"
fi
echo ""

# ============================================
# SLACK WEBHOOK
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "💬 SLACK CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Get your Slack webhook from: https://api.slack.com/apps"
echo ""

read -p "Enter SLACK_WEBHOOK_URL (or skip to continue): " slack_webhook
if [ ! -z "$slack_webhook" ]; then
    sed -i "s|SLACK_WEBHOOK_URL=.*|SLACK_WEBHOOK_URL=$slack_webhook|g" .env
    echo ""
    echo "✅ Slack webhook added to .env"
else
    echo ""
    echo "⏭️  Skipped Slack webhook"
fi
echo ""

# ============================================
# CLOUDFLARE KEYS
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "☁️  CLOUDFLARE CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Get your Cloudflare keys from: https://dash.cloudflare.com"
echo ""

read -p "Enter CLOUDFLARE_ACCOUNT_ID (or skip to continue): " cf_account
if [ ! -z "$cf_account" ]; then
    read -p "Enter CLOUDFLARE_API_TOKEN: " cf_token
    
    sed -i "s|CLOUDFLARE_ACCOUNT_ID=.*|CLOUDFLARE_ACCOUNT_ID=$cf_account|g" .env
    sed -i "s|CLOUDFLARE_API_TOKEN=.*|CLOUDFLARE_API_TOKEN=$cf_token|g" .env
    sed -i "s|CF_ACCOUNT_ID=.*|CF_ACCOUNT_ID=$cf_account|g" .env
    sed -i "s|CF_API_TOKEN=.*|CF_API_TOKEN=$cf_token|g" .env
    
    echo ""
    echo "✅ Cloudflare keys added to .env"
else
    echo ""
    echo "⏭️  Skipped Cloudflare keys"
fi
echo ""

# ============================================
# SUMMARY
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ SETUP COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "All API keys have been added to .env file."
echo ""
echo "Next steps:"
echo "  1. Verify .env file: cat .env"
echo "  2. Test build: pnpm run build"
echo "  3. Add to Netlify: See COMPLETE_SETUP_CHECKLIST.md"
echo "  4. Add to GitHub Secrets (for Cloudflare): See CLOUDFLARE_SETUP_GUIDE.md"
echo ""
echo "⚠️  IMPORTANT: Never commit .env to git!"
echo "   The .env file is already in .gitignore"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
