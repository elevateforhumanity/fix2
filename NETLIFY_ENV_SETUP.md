# Netlify Environment Variables Setup

## Required Environment Variables

Go to: **Netlify Dashboard > Site Settings > Environment Variables**

Add the following variables:

### Supabase Configuration
```
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
```

### Stripe Configuration
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx
```

## How to Add

1. Log in to Netlify
2. Go to your site
3. Click **Site settings**
4. Click **Environment variables** in the left sidebar
5. Click **Add a variable**
6. Add each variable with its key and value
7. Set scope to **All scopes** or specific deploy contexts
8. Click **Save**

## After Adding Variables

Trigger a new deploy:
- Go to **Deploys** tab
- Click **Trigger deploy** > **Clear cache and deploy site**

This ensures the new environment variables are used in the build.
