# Local Development Setup Guide

**For**: Developers and team members setting up local environment  
**Status**: Ready to use

---

## 🚀 QUICK START

### Option 1: Automatic Setup (Recommended)

Pull environment variables directly from Vercel:

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Link to your Vercel project
vercel link

# Pull environment variables
./pull-env-from-vercel.sh
```

### Option 2: Manual Setup

If you don't have Vercel CLI or prefer manual setup:

```bash
# Run the interactive setup script
./setup-local-env.sh
```

The script will prompt you for:
- Supabase URL
- Supabase anonymous key
- Supabase service role key
- Site URL (defaults to localhost:3000)
- Optional: Stripe keys
- Optional: Resend API key

---

## 📋 REQUIRED ENVIRONMENT VARIABLES

### Supabase (Required)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to find these:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy the values

### Site URL (Required)

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🔧 OPTIONAL ENVIRONMENT VARIABLES

### Stripe (For payment features)

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Where to find these:**
1. Go to https://dashboard.stripe.com
2. Go to Developers → API keys
3. Use test keys for local development

### Email (For notifications)

```bash
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@elevateforhumanity.org
```

**Where to find these:**
1. Go to https://resend.com/dashboard
2. Go to API Keys
3. Create a new API key

### Analytics (Optional)

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Monitoring (Optional)

```bash
SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=...
```

---

## 📁 FILE STRUCTURE

### .env.local (Your local environment)
- **Location**: Root of project
- **Status**: In .gitignore (won't be committed)
- **Purpose**: Your personal local environment variables
- **Created by**: Setup scripts or manually

### .env.example (Template)
- **Location**: Root of project
- **Status**: Committed to git
- **Purpose**: Shows what variables are needed
- **Use**: Reference for what to set

### .envrc (Direnv config)
- **Location**: Root of project
- **Status**: Committed to git
- **Purpose**: Loads .env.local automatically with direnv
- **Use**: Optional - for direnv users

---

## 🔐 SECURITY BEST PRACTICES

### DO:
- ✅ Use test/development keys locally
- ✅ Keep .env.local in .gitignore
- ✅ Use different keys for dev/staging/production
- ✅ Rotate keys regularly
- ✅ Use environment-specific Supabase projects

### DON'T:
- ❌ Commit .env.local to git
- ❌ Share your service role key
- ❌ Use production keys locally
- ❌ Hardcode secrets in code
- ❌ Share .env.local files via email/slack

---

## 🧪 TESTING YOUR SETUP

### 1. Test Supabase Connection

```bash
# Run the test script
node test-supabase-connection.mjs
```

Expected output:
```
✅ NEXT_PUBLIC_SUPABASE_URL: Set
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set
✅ SUPABASE_SERVICE_ROLE_KEY: Set
✅ Supabase connection successful!
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Test Login

1. Open http://localhost:3000/login
2. Try to login with test credentials
3. Should authenticate via Supabase

### 4. Test Protected Routes

1. Try to access http://localhost:3000/admin/dashboard
2. Should redirect to login if not authenticated
3. After login, should access dashboard

---

## 🐛 TROUBLESHOOTING

### "Supabase is not configured" Error

**Problem**: Environment variables not loaded

**Solutions**:
1. Check .env.local exists in project root
2. Restart your dev server (npm run dev)
3. Verify variables are set: `cat .env.local`
4. Check for typos in variable names

### "Invalid API key" Error

**Problem**: Wrong Supabase keys

**Solutions**:
1. Verify keys from Supabase dashboard
2. Make sure you copied the full key (they're long!)
3. Check for extra spaces or line breaks
4. Regenerate keys if needed

### "Cannot connect to Supabase" Error

**Problem**: Network or URL issue

**Solutions**:
1. Check your internet connection
2. Verify Supabase URL is correct
3. Check if Supabase project is active
4. Try accessing Supabase dashboard directly

### Variables Not Loading

**Problem**: .env.local not being read

**Solutions**:
1. Make sure file is named exactly `.env.local`
2. File must be in project root (same level as package.json)
3. Restart your dev server
4. Check file permissions: `ls -la .env.local`

---

## 📚 ADDITIONAL RESOURCES

### Supabase Documentation
- Getting Started: https://supabase.com/docs/guides/getting-started
- Authentication: https://supabase.com/docs/guides/auth
- Database: https://supabase.com/docs/guides/database

### Next.js Environment Variables
- Documentation: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- Best Practices: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order

### Vercel CLI
- Documentation: https://vercel.com/docs/cli
- Environment Variables: https://vercel.com/docs/cli/env

---

## 🎯 QUICK REFERENCE

### Setup Commands

```bash
# Option 1: Pull from Vercel (automatic)
vercel login
vercel link
./pull-env-from-vercel.sh

# Option 2: Manual setup (interactive)
./setup-local-env.sh

# Option 3: Copy from example (manual)
cp .env.example .env.local
# Then edit .env.local with your values
```

### Test Commands

```bash
# Test Supabase connection
node test-supabase-connection.mjs

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Useful Commands

```bash
# View current environment variables
cat .env.local

# Check if variables are loaded
echo $NEXT_PUBLIC_SUPABASE_URL

# Backup your .env.local
cp .env.local .env.local.backup

# Restore from backup
cp .env.local.backup .env.local
```

---

## ✅ CHECKLIST

Before starting development, make sure:

- [ ] .env.local file exists in project root
- [ ] NEXT_PUBLIC_SUPABASE_URL is set
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY is set
- [ ] SUPABASE_SERVICE_ROLE_KEY is set
- [ ] NEXT_PUBLIC_SITE_URL is set
- [ ] Test script runs successfully
- [ ] Dev server starts without errors
- [ ] Login page loads at /login
- [ ] Can authenticate with test user

---

## 🆘 NEED HELP?

### Common Issues
1. Check this guide's Troubleshooting section
2. Review .env.example for required variables
3. Verify Supabase dashboard for correct keys
4. Restart dev server after changing .env.local

### Still Stuck?
1. Check Supabase project status
2. Verify all keys are correct
3. Try regenerating Supabase keys
4. Contact team lead or admin

---

**Last Updated**: January 23, 2025  
**Maintained By**: Development Team
