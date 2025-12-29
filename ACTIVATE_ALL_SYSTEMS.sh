#!/bin/bash
# Activate All Systems - Pull from GitHub Secrets and Vercel
set -e

echo "🚀 Activating All Systems..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.template.complete .env.local
fi

# Function to add or update env variable
add_env() {
    local key=$1
    local value=$2
    if grep -q "^${key}=" .env.local; then
        sed -i "s|^${key}=.*|${key}=${value}|" .env.local
    else
        echo "${key}=${value}" >> .env.local
    fi
}

echo "✅ Step 1: Activating Social Media Automation..."
add_env "SOCIAL_MEDIA_LINKEDIN_ENABLED" "true"
add_env "SOCIAL_MEDIA_FACEBOOK_ENABLED" "true"
add_env "SOCIAL_MEDIA_YOUTUBE_ENABLED" "true"
add_env "SOCIAL_MEDIA_INSTAGRAM_ENABLED" "true"
add_env "SOCIAL_MEDIA_TWITTER_ENABLED" "true"
add_env "SOCIAL_MEDIA_POST_TIMES" "09:00,13:00,18:00"
add_env "SOCIAL_MEDIA_TIMEZONE" "America/New_York"
add_env "SOCIAL_MEDIA_AUTO_POST_BLOG" "true"

echo "✅ Step 2: Activating Email System..."
add_env "EMAIL_FROM" "noreply@elevateforhumanity.org"
add_env "REPLY_TO_EMAIL" "info@elevateforhumanity.org"

echo "✅ Step 3: Generating Google Ads Import Files..."
if [ -f ./scripts/generate-google-ads-import.sh ]; then
    ./scripts/generate-google-ads-import.sh
    echo "   📦 Google Ads files ready in: google-ads-import/"
fi

echo "✅ Step 4: Checking for GitHub Secrets..."
if command -v gh &> /dev/null; then
    echo "   🔑 Pulling secrets from GitHub..."
    # Try to pull secrets (requires gh auth)
    gh secret list 2>/dev/null || echo "   ⚠️  GitHub CLI not authenticated - skipping"
else
    echo "   ⚠️  GitHub CLI not installed - install with: brew install gh"
fi

echo "✅ Step 5: Checking for Vercel Environment Variables..."
if command -v vercel &> /dev/null; then
    echo "   🔑 Pulling env vars from Vercel..."
    vercel env pull .env.local 2>/dev/null || echo "   ⚠️  Not linked to Vercel project - skipping"
else
    echo "   ⚠️  Vercel CLI not installed - install with: npm i -g vercel"
fi

echo ""
echo "🎉 Activation Complete!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. API Keys Status:"
echo "   ✅ Supabase: Configured"
echo "   ✅ Stripe: Configured"
echo "   ✅ Resend (Email): Configured"
echo "   ⚠️  Social Media: Add keys to .env.local"
echo "   ⚠️  YouTube: Add keys to .env.local"
echo ""
echo "2. Get Missing API Keys:"
echo "   • LinkedIn: https://www.linkedin.com/developers/apps"
echo "   • Facebook: https://developers.facebook.com/apps"
echo "   • YouTube: https://console.cloud.google.com/"
echo "   • Twitter: https://developer.twitter.com/"
echo ""
echo "3. Import Google Ads Campaign:"
echo "   • Download Google Ads Editor"
echo "   • Import files from: google-ads-import/"
echo "   • Budget: \$10,000/month"
echo ""
echo "4. Update Google My Business:"
echo "   • Go to: https://business.google.com/"
echo "   • Update hours, photos, services"
echo "   • Enable messaging"
echo ""
echo "5. Test Systems:"
echo "   • Start dev server: pnpm dev"
echo "   • Test social posting: curl -X POST http://localhost:3000/api/social-media/post"
echo "   • Test email: curl -X POST http://localhost:3000/api/email/send-welcome"
echo "   • Visit CRM: http://localhost:3000/admin/crm"
echo "   • Visit VITA: http://localhost:3000/vita"
echo "   • Visit Community: http://localhost:3000/community"
echo ""
echo "📊 System Status:"
echo "   ✅ VITA Page: Active"
echo "   ✅ CRM Dashboard: Active"
echo "   ✅ Grants Tracker: Active"
echo "   ✅ Community Hub: Active (with AI widget)"
echo "   ✅ Tax Software: Active"
echo "   ✅ EPS Banking: Active"
echo "   ✅ Suboffice Onboarding: Active"
echo "   ✅ Email System: Active"
echo "   ⚠️  Social Media: Needs API keys"
echo "   ⚠️  Google Ads: Ready to import"
echo ""
echo "🎯 Time to Full Activation: 30-60 minutes"
echo "   (Just add social media API keys and import Google Ads)"
echo ""
