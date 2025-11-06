# Quick Fix: Stop Skeleton/Blank Page Issues

## Problem

React SPA shows blank/skeleton because API URLs are wrong.

## Solution (15 minutes)

### Step 1: Fix Environment Variables

```bash
cd /workspaces/fix2

# Update .env.production
cat > .env.production << 'ENVEOF'
VITE_API_URL=https://api.elevateforhumanity.org
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
ENVEOF
```

### Step 2: Add to Netlify

Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/deploys#environment

Add same variables.

### Step 3: Deploy

```bash
git add .env.production
git commit -m "fix: Add production env vars"
git push origin main
```

Done! Site will work properly now.
