# Check GitHub Secrets & Netlify Environment Variables

## Required GitHub Secrets

Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions

### Critical Secrets (MUST HAVE):
1. **SUPABASE_ANON_KEY** - Get from Supabase Dashboard
2. **SUPABASE_SERVICE_ROLE_KEY** - Get from Supabase Dashboard  
3. **NETLIFY_AUTH_TOKEN** - Get from Netlify
4. **NETLIFY_SITE_ID** - Get from Netlify

### Optional Secrets:
- RESEND_API_KEY (for emails)
- STRIPE_SECRET_KEY (for payments)
- STRIPE_PUBLISHABLE_KEY (for payments)
- STRIPE_WEBHOOK_SECRET (for payments)
- CLOUDFLARE_ACCOUNT_ID (for video hosting)
- CLOUDFLARE_STREAM_API_TOKEN (for video hosting)

## How to Get Supabase Keys

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
2. Copy **anon public** key → Add as `SUPABASE_ANON_KEY`
3. Copy **service_role** key → Add as `SUPABASE_SERVICE_ROLE_KEY`

## How to Get Netlify Credentials

1. Go to: https://app.netlify.com/user/applications
2. Create new access token → Add as `NETLIFY_AUTH_TOKEN`
3. Go to your site settings → Copy Site ID → Add as `NETLIFY_SITE_ID`

## Manual Netlify Environment Variable Setup

If GitHub Actions aren't working, set these DIRECTLY in Netlify:

1. Go to: https://app.netlify.com/sites/[YOUR-SITE]/settings/deploys#environment
2. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
NEXT_PUBLIC_APP_URL=https://elevateconnectsdirectory.org
NEXT_PUBLIC_SITE_URL=https://elevateconnectsdirectory.org
NODE_ENV=production
```

3. Click "Save" then "Trigger deploy"

## Check Current Secrets (Run this in terminal)

```bash
# Check if gh CLI is authenticated
gh auth status

# List all secrets (won't show values, just names)
gh secret list

# Check specific secret exists
gh secret list | grep SUPABASE_ANON_KEY
gh secret list | grep NETLIFY_AUTH_TOKEN
```

## Run the Setup Workflow

Once secrets are added:

```bash
# Trigger the workflow manually
gh workflow run setup-supabase-keys.yml
```

## What's Blocking Your Site

Your site is showing "Internal Server Error" because:

1. `lib/supabase-admin.ts` throws an error if env vars are missing
2. Netlify doesn't have the environment variables configured
3. The GitHub workflow that sets them can't run without GitHub Secrets

**Fix: Add the secrets to GitHub OR manually add env vars to Netlify**
