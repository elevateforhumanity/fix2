# Vercel Environment Variables Setup Guide

This guide helps you pull environment variables from Vercel and set them up locally for development.

## Prerequisites

- Vercel CLI installed: `npm i -g vercel`
- Access to the Elevate for Humanity Vercel project
- Logged into Vercel CLI: `vercel login`

## Step 1: Link Your Local Project to Vercel

```bash
# From the project root directory
vercel link
```

Follow the prompts:
- Select your Vercel scope/team
- Link to existing project: `elevateforhumanity/fix2` (or your project name)
- Confirm the directory

## Step 2: Pull Environment Variables from Vercel

```bash
# Pull all environment variables from Vercel
vercel env pull .env.local
```

This creates a `.env.local` file with all your Vercel environment variables.

## Step 3: Verify Environment Variables

Check that `.env.local` contains:

```bash
cat .env.local
```

You should see:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Step 4: Run Development Server

```bash
npm run dev
```

Your local environment now has access to all Vercel environment variables.

## Alternative: Manual Setup

If you prefer to set variables manually:

### 1. Get Variables from Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Copy each variable value

### 2. Create `.env.local` File

```bash
# Create the file
touch .env.local
```

### 3. Add Variables to `.env.local`

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## Step 5: Verify Setup

Test that environment variables are loaded:

```bash
# Check if variables are accessible
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"
```

## Troubleshooting

### Variables Not Loading

1. Ensure `.env.local` is in the project root
2. Restart your development server
3. Check that `.env.local` is in `.gitignore` (it should be)

### Vercel CLI Not Working

```bash
# Reinstall Vercel CLI
npm uninstall -g vercel
npm install -g vercel

# Login again
vercel login
```

### Missing Variables

If some variables are missing:

```bash
# Pull specific environment (development, preview, production)
vercel env pull .env.local --environment=production
```

## Security Notes

⚠️ **NEVER commit `.env.local` to git**
- It's already in `.gitignore`
- Contains sensitive API keys
- Only for local development

⚠️ **Service Role Keys**
- `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security
- Only use server-side (API routes, server components)
- Never expose to client

⚠️ **Stripe Keys**
- `STRIPE_SECRET_KEY` is server-only
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is safe for client
- Test keys start with `pk_test_` / `sk_test_`
- Live keys start with `pk_live_` / `sk_live_`

## Quick Reference Commands

```bash
# Pull all environment variables
vercel env pull .env.local

# Pull from specific environment
vercel env pull .env.local --environment=production

# List all environment variables
vercel env ls

# Add a new environment variable
vercel env add VARIABLE_NAME

# Remove an environment variable
vercel env rm VARIABLE_NAME
```

## Next Steps

After setting up environment variables:

1. Run database migrations in Supabase
2. Create Stripe products and prices
3. Update `lms-data/programs.ts` with Stripe IDs
4. Test enrollment flow locally

## Support

If you encounter issues:
1. Check Vercel CLI version: `vercel --version`
2. Verify project link: `vercel ls`
3. Check Vercel dashboard for variable values
4. Contact team lead for access issues
