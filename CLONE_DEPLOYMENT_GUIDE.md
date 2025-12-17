# Clone Deployment Guide

This guide explains how to deploy a new clone of the Workforce Operating System.

## Overview

This codebase is designed to be safely cloned and deployed multiple times with complete data isolation. Each clone operates as an independent instance with its own:

- Organization data
- User base
- Billing
- Branding
- Configuration

## Prerequisites

1. **Supabase Project**
   - Create new Supabase project
   - Run all migrations in order:
     - `001_initial_schema.sql`
     - `002_multi_tenant_foundation.sql`
     - `003_workforce_reporting_views.sql`
     - `004_org_invites.sql`
     - `005_org_subscriptions.sql`

2. **Stripe Account** (for billing)
   - Create Stripe account
   - Set up webhook endpoint
   - Configure products/prices

3. **Resend Account** (for emails)
   - Create Resend account
   - Verify domain

4. **Hosting** (choose one)
   - Vercel (recommended)
   - Netlify
   - Self-hosted

## Deployment Steps

### 1. Clone Repository

```bash
git clone https://github.com/elevateforhumanity/fix2.git your-org-name
cd your-org-name
```

### 2. Configure Environment

```bash
cp .env.clone.example .env.local
```

Edit `.env.local` and fill in all required values:

```bash
# Clone identity
CLONE_ORG_SLUG=your-org-slug
CLONE_ORG_NAME=Your Organization Name
CLONE_ADMIN_EMAIL=admin@yourorg.com

# Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Auth
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=https://yourorg.com
NEXT_PUBLIC_SITE_URL=https://yourorg.com

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Email
RESEND_API_KEY=re_...
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Run Database Migrations

In Supabase SQL Editor, run migrations in order:

1. `supabase/001_initial_schema.sql`
2. `supabase/002_multi_tenant_foundation.sql`
3. `supabase/003_workforce_reporting_views.sql`
4. `supabase/004_org_invites.sql`
5. `supabase/005_org_subscriptions.sql`

### 5. Bootstrap Clone

First, create the admin user account by signing up through the UI, then run:

```bash
pnpm tsx scripts/bootstrap-clone.ts
```

This will:

- Create organization
- Seed default configuration
- Assign admin role
- Create trial subscription

### 6. Deploy

#### Vercel (Recommended)

```bash
vercel
```

Add all environment variables in Vercel dashboard.

#### Self-Hosted

```bash
pnpm build
pnpm start
```

### 7. Configure Organization

1. Log in as admin
2. Navigate to Settings → Organization
3. Configure:
   - Branding (logo, colors, name)
   - Features (enable/disable modules)
   - Limits (students, staff, programs)
   - Funding sources
   - Delivery modes

### 8. Set Up Billing

1. Create Stripe products for your plans
2. Configure webhook to point to: `https://yourorg.com/api/webhooks/stripe`
3. Test subscription flow

## White-Label Configuration

To fully white-label the instance:

1. **Update Organization Settings**

   ```json
   {
     "branding": {
       "site_name": "Your Institute",
       "logo_url": "https://cdn.yourorg.com/logo.png",
       "primary_color": "#0F172A",
       "hide_elevate_branding": true
     }
   }
   ```

2. **Custom Domain**
   - Point domain to hosting provider
   - Configure SSL certificate
   - Update `NEXT_PUBLIC_SITE_URL`

3. **Email Branding**
   - Configure Resend with your domain
   - Customize email templates in `lib/email/`

## Data Isolation

Each clone is completely isolated:

- ✅ Separate Supabase project
- ✅ Separate Stripe account
- ✅ Separate user base
- ✅ Separate organization data
- ✅ No shared credentials
- ✅ No data leakage

## License Enforcement

The system enforces licenses at the organization level:

- **Active**: Full access to all features
- **Grace**: Payment past due, limited time to update
- **Restricted**: Payment failed, admin features locked
- **Inactive**: No subscription, limited functionality

Students are never blocked from completing enrolled courses.

## Monitoring

Monitor your clone:

1. **Supabase Dashboard**
   - Database health
   - API usage
   - Auth metrics

2. **Stripe Dashboard**
   - Subscription status
   - Payment failures
   - Revenue metrics

3. **Application Logs**
   - Error tracking
   - Performance monitoring
   - User activity

## Support

For technical support:

- Documentation: `/docs`
- Issues: GitHub Issues
- Email: support@elevateforhumanity.org

## Security Checklist

Before going live:

- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] RLS policies enabled
- [ ] Stripe webhook configured
- [ ] Email domain verified
- [ ] SSL certificate active
- [ ] Admin account secured
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] License active

## Pricing Models

This clone supports multiple pricing models:

1. **SaaS Subscription**
   - Monthly/annual billing
   - Per-seat pricing
   - Feature tiers

2. **One-Time License**
   - Perpetual license
   - Annual maintenance
   - Support packages

3. **Enterprise**
   - Custom pricing
   - Unlimited seats
   - White-label included
   - Priority support

Configure pricing in organization settings and Stripe.
