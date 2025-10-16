# Supabase + Cloudflare Deployment Guide

## Overview

Your app now uses:
- **Frontend**: Cloudflare Pages (React/Vite app)
- **Backend**: Supabase (Database + Auth + Edge Functions)

## Step 1: Deploy Supabase Edge Functions

### Install Supabase CLI
```bash
npm install -g supabase
```

### Login to Supabase
```bash
supabase login
```

### Link to Your Project
```bash
supabase link --project-ref cuxzzpsyufcewtmicszk
```

### Deploy Edge Functions
```bash
supabase functions deploy courses
supabase functions deploy enrollments
supabase functions deploy dashboard
supabase functions deploy health
```

### Get Your Edge Function URLs
After deployment, your functions will be available at:
```
https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1/courses
https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1/enrollments
https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1/dashboard
https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1/health
```

## Step 2: Deploy Frontend to Cloudflare Pages

### Option A: Using Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build your app
pnpm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=elevateforhumanity
```

### Option B: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Click **Create a project**
4. Connect your GitHub repository: `elevateforhumanity/fix2`
5. Configure build settings:
   - **Build command**: `pnpm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`

6. Add environment variables:
   ```
   VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
   VITE_API_URL=https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1
   ```

7. Click **Save and Deploy**

## Step 3: Update Frontend API Calls

Your frontend should now call Supabase Edge Functions instead of the old Render backend.

Update any API calls to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1'

// Example API calls:
fetch(`${API_URL}/courses`)
fetch(`${API_URL}/enrollments`)
fetch(`${API_URL}/dashboard`)
```

## Step 4: Configure Supabase Auth Redirect URLs

1. Go to [Supabase Dashboard](https://app.supabase.com/project/cuxzzpsyufcewtmicszk)
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Cloudflare Pages URL to **Site URL** and **Redirect URLs**:
   ```
   https://elevateforhumanity.pages.dev
   https://yourdomain.com (if using custom domain)
   ```

## Step 5: Run Database Migrations

```bash
# Push migrations to Supabase
supabase db push
```

## Step 6: Test Your Deployment

### Test Backend (Edge Functions)
```bash
curl https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1/health
curl https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1/courses
```

### Test Frontend
Visit your Cloudflare Pages URL:
```
https://elevateforhumanity.pages.dev
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ├──────────────────────────────────┐
                     │                                  │
                     ▼                                  ▼
        ┌────────────────────────┐      ┌──────────────────────────┐
        │  CLOUDFLARE PAGES      │      │  SUPABASE                │
        │  (Frontend)            │      │  (Backend)               │
        │                        │      │                          │
        │  • React/Vite App      │      │  • PostgreSQL Database   │
        │  • Static Assets       │      │  • Auth System           │
        │  • Global CDN          │      │  • Edge Functions (API)  │
        │                        │      │  • Storage               │
        └────────────────────────┘      └──────────────────────────┘
```

## Benefits Over Render

✅ **No Server Maintenance**: Everything is serverless
✅ **Better Performance**: Global CDN for frontend
✅ **Auto-Scaling**: Backend scales automatically
✅ **Built-in Auth**: No need to build your own
✅ **Better Free Tier**: More generous limits
✅ **Integrated**: Database, Auth, API, Storage all in one place

## Cost Comparison

### Render (Old)
- Free tier: Limited hours, sleeps after inactivity
- Paid: $7+/month for always-on

### Supabase + Cloudflare (New)
- **Supabase Free Tier**:
  - 500MB database
  - 50,000 monthly active users
  - 2GB file storage
  - 2 million Edge Function invocations
  
- **Cloudflare Pages Free Tier**:
  - Unlimited bandwidth
  - Unlimited requests
  - 500 builds/month

## Troubleshooting

### Edge Functions Not Working
```bash
# Check function logs
supabase functions logs courses
supabase functions logs enrollments
```

### Database Connection Issues
```bash
# Test database connection
supabase db remote status
```

### Build Failures on Cloudflare
- Check build logs in Cloudflare Dashboard
- Verify environment variables are set
- Ensure `pnpm` is available (Cloudflare auto-detects it)

## Next Steps

1. ✅ Deploy Edge Functions to Supabase
2. ✅ Deploy Frontend to Cloudflare Pages
3. ✅ Update environment variables
4. ✅ Test the deployment
5. 🔄 Set up custom domain (optional)
6. 🔄 Configure CI/CD (optional)

## Support

- Supabase Docs: https://supabase.com/docs
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages
- Your Supabase Project: https://app.supabase.com/project/cuxzzpsyufcewtmicszk
