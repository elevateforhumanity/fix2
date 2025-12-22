# Environment Setup Guide

This guide explains how to set up your local development environment for the fix2 project.

## Quick Start (Automated)

Run the automated setup script:

```bash
./setup-env.sh
```

This will:

1. Pull all environment variables from Vercel
2. Create `.env.local` with all required variables
3. Verify critical variables are present

## Prerequisites

### 1. Vercel Token

You need a Vercel token to pull environment variables.

**For Gitpod/Codespaces (Recommended):**

```bash
# Set as persistent environment variable
gp env VERCEL_TOKEN='your-vercel-token-here'

# Then restart your workspace or export it
export VERCEL_TOKEN='your-vercel-token-here'
```

**Get a Vercel Token:**

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: "Development Environment"
4. Copy the token

**For Local Development:**

```bash
# Option 1: Login to Vercel CLI
vercel login

# Option 2: Set environment variable
export VERCEL_TOKEN='your-token-here'
```

## Manual Setup

If you prefer manual setup or the automated script fails:

### Step 1: Pull from Vercel

```bash
# With token
vercel env pull .env.local --token="your-token-here"

# Or after login
vercel login
vercel env pull .env.local
```

### Step 2: Verify Variables

Check that critical variables are present:

```bash
grep "NEXT_PUBLIC_SUPABASE_URL" .env.local
grep "SUPABASE_SERVICE_ROLE_KEY" .env.local
grep "NEXTAUTH_SECRET" .env.local
grep "STRIPE_SECRET_KEY" .env.local
```

### Step 3: Start Development

```bash
npm install
npm run dev
```

## Required Environment Variables

The application requires these critical variables:

### Database & Authentication

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin key
- `POSTGRES_URL` - Database connection string
- `NEXTAUTH_SECRET` - NextAuth session encryption
- `NEXTAUTH_URL` - Application URL

### Payment Processing

- `STRIPE_SECRET_KEY` - Stripe API secret
- `STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook verification
- `AFFIRM_PUBLIC_KEY` - Affirm payment key
- `AFFIRM_PRIVATE_KEY` - Affirm API secret

### External Services

- `OPENAI_API_KEY` - OpenAI API access
- `RESEND_API_KEY` - Email service
- `UPSTASH_REDIS_REST_URL` - Redis cache
- `WORKOS_API_KEY` - WorkOS authentication

### Configuration

- `NEXT_PUBLIC_SITE_URL` - Application URL
- `NODE_ENV` - Environment mode
- `VERCEL_TOKEN` - Vercel API access
- `VERCEL_PROJECT_ID` - Project identifier

## Adding New Variables

### To Vercel (Production)

```bash
# Add a single variable
vercel env add VARIABLE_NAME production

# Or use the dashboard
# https://vercel.com/elevate-48e460c9/fix2/settings/environment-variables
```

### To Local Environment

After adding to Vercel, pull the updated variables:

```bash
./setup-env.sh
```

Or manually:

```bash
vercel env pull .env.local --token="your-token-here"
```

## Troubleshooting

### `.env.local` not found

**Problem:** Another environment doesn't have `.env.local`

**Solution:** `.env.local` is gitignored (by design). Each environment must run the setup:

```bash
./setup-env.sh
```

### Missing variables

**Problem:** Some variables are empty or missing

**Solution:** Add them to Vercel first:

1. Go to https://vercel.com/elevate-48e460c9/fix2/settings/environment-variables
2. Add the missing variable
3. Re-run setup: `./setup-env.sh`

### Vercel authentication failed

**Problem:** Cannot authenticate with Vercel

**Solutions:**

```bash
# Option 1: Set token
export VERCEL_TOKEN='your-token-here'

# Option 2: Login
vercel login

# Option 3: For Gitpod, set persistent variable
gp env VERCEL_TOKEN='your-token-here'
```

### Variables not loading in app

**Problem:** App can't read environment variables

**Solutions:**

1. Restart dev server:

   ```bash
   pkill -f "next dev"
   npm run dev
   ```

2. Verify `.env.local` exists:

   ```bash
   ls -la .env.local
   ```

3. Check variable format:
   ```bash
   head -20 .env.local
   ```

## Security Best Practices

### ✅ DO

- Run `./setup-env.sh` in each new environment
- Keep `.env.local` gitignored
- Store secrets in Vercel
- Use `VERCEL_TOKEN` for automation
- Backup `.env.local` before overwriting

### ❌ DON'T

- Commit `.env.local` to git
- Hardcode secrets in code
- Share `.env.local` via Slack/email
- Push secrets to public repositories
- Use production secrets in development

## For Team Members

### First Time Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/elevateforhumanity/fix2.git
   cd fix2
   ```

2. Get Vercel token from team admin

3. Run setup:

   ```bash
   export VERCEL_TOKEN='token-from-admin'
   ./setup-env.sh
   ```

4. Start development:
   ```bash
   npm install
   npm run dev
   ```

### Updating Variables

When environment variables change:

```bash
./setup-env.sh
```

This will pull the latest variables from Vercel.

## CI/CD Integration

### GitHub Actions

```yaml
- name: Setup Environment
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  run: |
    npm install -g vercel
    vercel env pull .env.local --token="$VERCEL_TOKEN"
```

### Gitpod

Add to `.gitpod.yml`:

```yaml
tasks:
  - name: Setup Environment
    init: |
      if [ -n "$VERCEL_TOKEN" ]; then
        ./setup-env.sh
      else
        echo "⚠️  Set VERCEL_TOKEN: gp env VERCEL_TOKEN='your-token'"
      fi
```

## Architecture

### Why This Approach?

1. **No Secrets in Git** - All secrets stay in Vercel
2. **Single Source of Truth** - Vercel is the authoritative source
3. **Easy Onboarding** - New developers run one script
4. **Consistent Environments** - Everyone gets the same variables
5. **Secure** - Token-based authentication

### How It Works

```
┌─────────────────┐
│  Vercel         │
│  (Production)   │
│  - All secrets  │
│  - 72 variables │
└────────┬────────┘
         │
         │ vercel env pull
         │
         ▼
┌─────────────────┐
│  .env.local     │
│  (Local Only)   │
│  - Gitignored   │
│  - Per-machine  │
└─────────────────┘
```

## Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Verify Vercel has all required variables
3. Contact team admin for Vercel token
4. Check `.env.example` for required variables

## Related Files

- `setup-env.sh` - Automated setup script
- `.env.example` - Template with all variable names
- `.env.local` - Your local environment (gitignored)
- `.gitignore` - Ensures `.env.local` is never committed
