# GitHub Secrets Setup - Required for Deployment

## Quick Setup

Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions

Add these 5 secrets:

### 1. NETLIFY_AUTH_TOKEN
Get from: https://app.netlify.com/user/applications#personal-access-tokens
- Click "New access token"
- Copy the token
- Paste as secret value

### 2. NETLIFY_SITE_ID
Get from: https://app.netlify.com/sites/elevateforhumanityfix2/settings/general
- Look for "Site ID" 
- Copy the ID (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
- Paste as secret value

### 3. VITE_SUPABASE_URL
```
https://cuxzzpsyufcewtmicszk.supabase.co
```

### 4. VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
(Get actual key from Supabase dashboard)

### 5. VITE_STRIPE_PUBLISHABLE_KEY
```
pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
(Get from Stripe dashboard)

## After Adding Secrets

1. Go to: https://github.com/elevateforhumanity/fix2/actions
2. Find "Deploy to Netlify" workflow
3. Click "Re-run all jobs"

Site will deploy to: https://elevateforhumanityfix2.netlify.app
