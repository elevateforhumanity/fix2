#!/bin/bash

# Configuration Completion Script
# Run this after getting API keys from services

set -e

echo "🚀 Elevate for Humanity - Production Configuration"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running in correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Must run from project root${NC}"
    exit 1
fi

echo "This script will help you configure production services."
echo ""

# Step 1: Database Migrations
echo -e "${YELLOW}Step 1: Database Migrations${NC}"
echo "----------------------------"
echo "Migration files are in: supabase/migrations/"
echo ""
echo "To apply migrations:"
echo "1. Go to https://supabase.com/dashboard"
echo "2. Select your project"
echo "3. SQL Editor → New Query"
echo "4. Copy/paste each migration file:"
echo "   - 20251222_add_funding_verification.sql"
echo "   - 20251222_add_lesson_time_tracking.sql"
echo "   - 20251222_add_certificate_revocation.sql"
echo "   - 20251222_add_forum_moderation.sql"
echo "   - 20251222_add_followup_tracking.sql"
echo "5. Run each one"
echo ""
read -p "Have you applied all migrations? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Please apply migrations first${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Migrations applied${NC}"
echo ""

# Step 2: Resend API
echo -e "${YELLOW}Step 2: Resend API Configuration${NC}"
echo "--------------------------------"
echo "1. Go to https://resend.com"
echo "2. Sign up (free tier: 100 emails/day)"
echo "3. Get API key from dashboard"
echo ""
read -p "Enter your Resend API key (starts with re_): " RESEND_KEY
if [ -z "$RESEND_KEY" ]; then
    echo -e "${YELLOW}⚠ Skipping Resend (email alerts will log to console)${NC}"
else
    echo "RESEND_API_KEY=$RESEND_KEY" >> .env.local
    echo -e "${GREEN}✓ Resend API key saved to .env.local${NC}"
    echo ""
    echo "Next: Add to Vercel"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Select your project → Settings → Environment Variables"
    echo "3. Add: RESEND_API_KEY = $RESEND_KEY"
    echo "4. Environments: Production, Preview, Development"
    echo ""
    echo "Domain Verification (Required for production):"
    echo "1. Resend Dashboard → Domains"
    echo "2. Add: elevateforhumanity.org"
    echo "3. Add DNS records provided by Resend"
    echo ""
fi
read -p "Press enter to continue..."
echo ""

# Step 3: Cloudflare Turnstile
echo -e "${YELLOW}Step 3: Cloudflare Turnstile${NC}"
echo "----------------------------"
echo "1. Go to https://dash.cloudflare.com"
echo "2. Turnstile → Add Site"
echo "3. Domain: elevateforhumanity.org"
echo "4. Widget Mode: Managed"
echo ""
read -p "Enter your Turnstile Site Key: " TURNSTILE_SITE
read -p "Enter your Turnstile Secret Key: " TURNSTILE_SECRET
if [ -z "$TURNSTILE_SITE" ] || [ -z "$TURNSTILE_SECRET" ]; then
    echo -e "${YELLOW}⚠ Skipping Turnstile (basic spam protection only)${NC}"
else
    echo "NEXT_PUBLIC_TURNSTILE_SITE_KEY=$TURNSTILE_SITE" >> .env.local
    echo "TURNSTILE_SECRET_KEY=$TURNSTILE_SECRET" >> .env.local
    echo -e "${GREEN}✓ Turnstile keys saved to .env.local${NC}"
    echo ""
    echo "Next: Add to Vercel"
    echo "1. Go to Vercel → Environment Variables"
    echo "2. Add: NEXT_PUBLIC_TURNSTILE_SITE_KEY = $TURNSTILE_SITE"
    echo "3. Add: TURNSTILE_SECRET_KEY = $TURNSTILE_SECRET"
    echo "4. Environments: All"
    echo ""
fi
read -p "Press enter to continue..."
echo ""

# Step 4: Cron Secret
echo -e "${YELLOW}Step 4: Cron Secret${NC}"
echo "-------------------"
echo "Generating secure random secret..."
CRON_SECRET=$(openssl rand -base64 32)
echo "CRON_SECRET=$CRON_SECRET" >> .env.local
echo -e "${GREEN}✓ Cron secret generated and saved${NC}"
echo ""
echo "Next: Add to Vercel"
echo "1. Go to Vercel → Environment Variables"
echo "2. Add: CRON_SECRET = $CRON_SECRET"
echo "3. Environments: Production"
echo ""
read -p "Press enter to continue..."
echo ""

# Summary
echo ""
echo "=================================================="
echo -e "${GREEN}Configuration Complete!${NC}"
echo "=================================================="
echo ""
echo "Environment variables saved to .env.local"
echo ""
echo "Next Steps:"
echo "1. Add all variables to Vercel (see instructions above)"
echo "2. Redeploy your application"
echo "3. Test all features"
echo ""
echo "Verification:"
echo "- Email alerts: Submit application form"
echo "- Spam protection: Check forms for Turnstile widget"
echo "- Cron jobs: Check Vercel dashboard → Cron Jobs"
echo "- Migrations: Check Supabase tables"
echo ""
echo "Documentation:"
echo "- PRODUCTION_SETUP.md - Detailed instructions"
echo "- DEPLOYMENT_COMPLETE.md - Verification checklist"
echo ""
echo -e "${GREEN}🎉 Your platform is ready for production!${NC}"
