#!/bin/bash
# Manual Environment Setup Guide
# Since you have variables in Vercel, let's create .env.local

echo "🔧 Setting up .env.local"
echo "========================"
echo ""
echo "Since you have environment variables deployed in Vercel,"
echo "let's create .env.local with the required variables."
echo ""

# Create .env.local from template
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
else
    echo "⚠️  .env.local already exists"
    read -p "Overwrite? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp .env.example .env.local
        echo "✅ Overwrote .env.local"
    fi
fi

echo ""
echo "📋 Required Variables"
echo "===================="
echo ""
echo "Go to your Vercel dashboard and copy these values:"
echo ""
echo "1. Supabase (https://supabase.com/dashboard)"
echo "   NEXT_PUBLIC_SUPABASE_URL="
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY="
echo "   SUPABASE_SERVICE_ROLE_KEY="
echo ""
echo "2. Authentication"
echo "   NEXTAUTH_SECRET= (generate with: openssl rand -base64 32)"
echo "   NEXTAUTH_URL=https://www.elevateforhumanity.org"
echo "   NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org"
echo ""
echo "3. Stripe (https://dashboard.stripe.com)"
echo "   STRIPE_SECRET_KEY="
echo "   STRIPE_PUBLISHABLE_KEY="
echo "   STRIPE_WEBHOOK_SECRET="
echo ""
echo "4. Optional Services"
echo "   OPENAI_API_KEY= (for AI features)"
echo "   RESEND_API_KEY= (for emails)"
echo "   UPSTASH_REDIS_REST_URL= (for caching)"
echo "   UPSTASH_REDIS_REST_TOKEN="
echo ""
echo "5. Analytics"
echo "   NEXT_PUBLIC_GA_MEASUREMENT_ID= (Google Analytics)"
echo "   NEXT_PUBLIC_FACEBOOK_APP_ID= (Facebook Pixel)"
echo ""
echo "📝 Edit .env.local now:"
echo "   code .env.local"
echo ""
echo "Or use nano:"
echo "   nano .env.local"
echo ""
echo "After filling in values, run:"
echo "   npm run build"
echo ""
