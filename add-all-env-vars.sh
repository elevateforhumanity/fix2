#!/bin/bash

TOKEN="g3xnZCxstfcmPU4T0wad9fEp"

echo "🔧 Adding all missing environment variables to Vercel..."

# NextAuth
echo "Adding NEXTAUTH_SECRET..."
echo "$(openssl rand -base64 32)" | vercel env add NEXTAUTH_SECRET production --token $TOKEN 2>&1 | grep -E "(Added|exists)"

echo "Adding NEXTAUTH_URL..."
echo "https://elevateforhumanity.org" | vercel env add NEXTAUTH_URL production --token $TOKEN 2>&1 | grep -E "(Added|exists)"

# Email
echo "Adding EMAIL_FROM..."
echo "noreply@elevateforhumanity.org" | vercel env add EMAIL_FROM production --token $TOKEN 2>&1 | grep -E "(Added|exists)"

# Site URL
echo "Adding NEXT_PUBLIC_SITE_URL..."
echo "https://elevateforhumanity.org" | vercel env add NEXT_PUBLIC_SITE_URL production --token $TOKEN 2>&1 | grep -E "(Added|exists)"

# Cron Secret
echo "Adding CRON_SECRET..."
echo "$(openssl rand -base64 32)" | vercel env add CRON_SECRET production --token $TOKEN 2>&1 | grep -E "(Added|exists)"

echo ""
echo "✅ All environment variables added!"
echo ""
echo "⚠️  Still need manually (get from external services):"
echo "  - STRIPE_SECRET_KEY (from Stripe dashboard)"
echo "  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (from Stripe dashboard)"
echo "  - SENDGRID_API_KEY or RESEND_API_KEY (from email provider)"
