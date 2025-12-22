# Get Real Environment Variables

Your `.env.local` file currently has **placeholder values**. You need to replace them with real credentials.

## Option 1: Pull from Vercel (Recommended)

If your project is deployed on Vercel, pull the real variables:

### Step 1: Get Vercel Token

1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: "Development Environment"
4. Copy the token

### Step 2: Set Token in Gitpod

```bash
gp env VERCEL_TOKEN='paste-your-token-here'
```

### Step 3: Pull Variables

```bash
npm run env:pull
```

This will download all real environment variables from Vercel to `.env.local`.

---

## Option 2: Get from Supabase Dashboard

If you don't have Vercel access, get credentials directly from Supabase:

### Step 1: Go to Supabase Dashboard

1. Visit: https://supabase.com/dashboard
2. Select your project
3. Go to: **Settings** → **API**

### Step 2: Copy These Values

You'll see three important values:

**Project URL:**

```
https://xxxxxxxxxxxxx.supabase.co
```

**anon/public key:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MTYxNiwiZXhwIjoxOTMxNzM3NjE2fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**service_role key:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2MTYxNjE2MTYsImV4cCI6MTkzMTczNzYxNn0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Update .env.local

Open `.env.local` and replace the placeholder values:

```bash
# Edit the file
nano .env.local
```

Replace these lines:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-service-role-key-here
```

With your actual values from Supabase dashboard.

---

## Option 3: Check Vercel Dashboard Manually

If you have Vercel access but no token:

1. Go to: https://vercel.com/dashboard
2. Select your project: **fix2**
3. Go to: **Settings** → **Environment Variables**
4. Copy each variable value
5. Paste into `.env.local`

---

## Verify Your Setup

After updating `.env.local`, verify it has real values:

```bash
# Check if values are real (not placeholders)
cat .env.local | grep SUPABASE

# Should show real URLs and keys, not "your-project-ref" or "your-anon-key-here"
```

Real values look like:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MTYxNiwiZXhwIjoxOTMxNzM3NjE2fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Quick Commands

```bash
# Option 1: Pull from Vercel (if token is set)
npm run env:pull

# Option 2: Manual setup
npm run env:setup
nano .env.local  # Then paste real values

# Verify
cat .env.local | grep SUPABASE

# Test connection
npm run supabase:test
```

---

## ⚠️ Important

- **Never commit `.env.local`** - It's already in `.gitignore`
- **Keep credentials secret** - Don't share them publicly
- **Use Vercel for production** - Environment variables are managed there

---

## After Getting Real Variables

Once you have real credentials in `.env.local`:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Your website should now work!
```

---

## Need Help?

**Can't find Supabase project?**

- Check if you have access to the Supabase organization
- Ask team admin for access

**Can't access Vercel?**

- Ask team admin for Vercel project access
- Or get Supabase credentials directly (Option 2)

**Still having issues?**

- Check `.env.local` has no placeholder text
- Verify Supabase project is active
- Check Supabase project URL is correct
