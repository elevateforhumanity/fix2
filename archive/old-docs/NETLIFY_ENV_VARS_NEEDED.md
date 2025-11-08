# Netlify Environment Variables Configuration

## Currently Configured (from env:list output)

✅ Already set in Netlify:

- `NODE_VERSION` - 20.11.1
- `PNPM_VERSION` - 9.7.0
- `NODE_OPTIONS` - --max_old_space_size=4096
- `CI` - true
- `GENERATE_SOURCEMAP` - false
- `VITE_SUPABASE_URL` - https://cuxzzpsyufcewtmicszk.supabase.co
- `VITE_SUPABASE_ANON_KEY` - (configured)
- `SUPABASE_ANON_KEY` - (configured)
- `SUPABASE_SERVICE_ROLE_KEY` - (configured)
- `SUPABASE_JWT_SECRET` - (configured)
- `SUPABASE_DATABASE_URL` - (configured)
- `STRIPE_SECRET_KEY` - (configured)
- `VITE_STRIPE_PUBLISHABLE_KEY` - (configured)
- `NETLIFY_DATABASE_URL` - (configured)
- `NETLIFY_DATABASE_URL_UNPOOLED` - (configured)

## Required by Netlify Functions (Missing)

### OpenAI Integration

- `OPENAI_API_KEY` - Required for content generation functions
  - Get from: https://platform.openai.com/api-keys
  - Scope: All (Builds, Functions, Runtime)

### Social Media Automation (Optional)

- `FACEBOOK_PAGE_ACCESS_TOKEN` - For Facebook posting
- `FACEBOOK_PAGE_ID` - Facebook page ID
- `INSTAGRAM_ACCESS_TOKEN` - For Instagram posting
- `INSTAGRAM_ACCOUNT_ID` - Instagram account ID
- `LINKEDIN_ACCESS_TOKEN` - For LinkedIn posting
- `LINKEDIN_ORGANIZATION_ID` - LinkedIn organization ID

### Monitoring & Notifications (Optional)

- `SLACK_WEBHOOK_URL` - For Slack notifications

### Stripe Configuration (Additional)

- `STRIPE_WEBHOOK_SECRET` - For webhook verification
  - Get from: Stripe Dashboard > Developers > Webhooks
  - Scope: All (Functions, Runtime)
- `STRIPE_SELFISH_INC_ACCOUNT_ID` - Connected account ID for split payouts
  - Get from: Stripe Dashboard > Connect > Accounts
  - Scope: All (Functions, Runtime)

### Application Configuration

- `FRONTEND_URL` - Your production URL
  - Value: `https://elevateforhumanity.org` or `https://elevateforhumanityfix2.netlify.app`
  - Scope: All

### Supabase (Additional)

- `SUPABASE_URL` - Same as VITE_SUPABASE_URL (for functions)
  - Value: `https://cuxzzpsyufcewtmicszk.supabase.co`
  - Scope: All (Functions, Runtime)
- `SUPABASE_SERVICE_KEY` - Alias for SUPABASE_SERVICE_ROLE_KEY
  - Value: Same as SUPABASE_SERVICE_ROLE_KEY
  - Scope: All (Functions, Runtime)

## Priority Setup

### Critical (Required for Core Functionality)

1. `OPENAI_API_KEY` - Content generation won't work without this
2. `STRIPE_WEBHOOK_SECRET` - Payment webhooks will fail without this
3. `FRONTEND_URL` - Needed for CORS and redirects
4. `SUPABASE_URL` - Functions need this
5. `SUPABASE_SERVICE_KEY` - Functions need this

### Optional (Enhanced Features)

- Social media variables - Only if using social media automation
- Slack webhook - Only if using Slack notifications
- Stripe connected account - Only if using split payouts

## How to Add Environment Variables

### Via Netlify CLI:

```bash
export NETLIFY_AUTH_TOKEN="nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae"

# Critical variables
netlify env:set OPENAI_API_KEY "your-openai-key"
netlify env:set STRIPE_WEBHOOK_SECRET "whsec_your_webhook_secret"
netlify env:set FRONTEND_URL "https://elevateforhumanity.org"
netlify env:set SUPABASE_URL "https://cuxzzpsyufcewtmicszk.supabase.co"
netlify env:set SUPABASE_SERVICE_KEY "your-service-role-key"

# Optional - Stripe split payouts
netlify env:set STRIPE_SELFISH_INC_ACCOUNT_ID "acct_your_account_id"

# Optional - Social media
netlify env:set FACEBOOK_PAGE_ACCESS_TOKEN "your-token"
netlify env:set FACEBOOK_PAGE_ID "your-page-id"
netlify env:set INSTAGRAM_ACCESS_TOKEN "your-token"
netlify env:set INSTAGRAM_ACCOUNT_ID "your-account-id"
netlify env:set LINKEDIN_ACCESS_TOKEN "your-token"
netlify env:set LINKEDIN_ORGANIZATION_ID "your-org-id"

# Optional - Monitoring
netlify env:set SLACK_WEBHOOK_URL "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
```

### Via Netlify Dashboard:

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/env
2. Click "Add a variable"
3. Enter key and value
4. Select scopes: "All" for most variables
5. Click "Create variable"

## Verification

After adding variables, verify with:

```bash
netlify env:list
```
