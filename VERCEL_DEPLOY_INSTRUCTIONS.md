# 🚀 Deploy to Vercel - Complete Instructions

**Status**: ✅ Code ready, build successful  
**Action Required**: Vercel authentication and deployment

---

## Authentication Required

Vercel CLI needs authentication. You have 3 options:

### Option 1: Interactive Login (Easiest)

```bash
vercel login
```

This will:

1. Open browser for authentication
2. Ask you to confirm in terminal
3. Save credentials locally

### Option 2: Token Authentication

If you have a Vercel token:

```bash
export VERCEL_TOKEN="your_token_here"
vercel --token $VERCEL_TOKEN --prod
```

Get token from: https://vercel.com/account/tokens

### Option 3: Vercel Dashboard (No CLI)

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `elevateforhumanity/fix2`
4. Configure and deploy

---

## Quick Deploy (After Authentication)

```bash
# Deploy to production
vercel --prod
```

That's it! Vercel will:

1. Detect Vite configuration
2. Install dependencies
3. Build the project
4. Deploy to production
5. Give you a URL

---

## Dashboard Deployment (Recommended)

### Step 1: Import Repository

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Authorize GitHub if needed
4. Select: `elevateforhumanity/fix2`

### Step 2: Configure Project

**Framework Preset**: Vite  
**Root Directory**: `./`  
**Build Command**: `pnpm build`  
**Output Directory**: `dist`  
**Install Command**: `pnpm install`

### Step 3: Environment Variables

Add these in Vercel dashboard:

```bash
NODE_ENV=production
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
VITE_API_URL=https://api.elevateforhumanity.org
VITE_SITE_URL=https://app.elevateforhumanity.org
VITE_ENABLE_AUTOPILOT=true
```

### Step 4: Deploy

Click **Deploy** button

Wait 2-3 minutes for deployment to complete.

---

## Custom Domain Setup

### After First Deployment

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Add domain: `app.elevateforhumanity.org`
4. Vercel will show DNS instructions

### Configure DNS in Cloudflare

1. Go to Cloudflare dashboard
2. Select domain: `elevateforhumanity.org`
3. Add DNS record:
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   TTL: Auto
   Proxy: DNS only (gray cloud)
   ```
4. Save

Wait 5-10 minutes for DNS propagation.

---

## Verification

### Check Deployment

```bash
# Check if site is live
curl -I https://your-project.vercel.app

# Should return HTTP/2 200
```

### Test Routes

Visit these URLs:

- `https://your-project.vercel.app/` - Homepage
- `https://your-project.vercel.app/lms` - LMS
- `https://your-project.vercel.app/programs` - Programs
- `https://your-project.vercel.app/about` - About

All should return 200 OK.

### Test Widget

Add to any HTML page:

```html
<div id="lms"></div>
<script src="https://your-project.vercel.app/embed/lms-widget.js"></script>
<script>
  ElevateLMS.embed('lms');
</script>
```

---

## Troubleshooting

### Build Fails

**Check locally first:**

```bash
pnpm install
pnpm build
```

If it works locally but fails on Vercel:

1. Check Node version (should be 20.x)
2. Verify environment variables are set
3. Check build logs in Vercel dashboard

### Environment Variables Not Working

1. Go to Vercel dashboard → Settings → Environment Variables
2. Ensure all variables are set for "Production"
3. Redeploy after adding variables

### Domain Not Working

1. Verify DNS record in Cloudflare
2. Check DNS propagation: `dig app.elevateforhumanity.org`
3. Wait 24-48 hours for full propagation
4. Try accessing via Vercel URL first

### 404 Errors

Vercel should automatically handle SPA routing. If not:

1. Check `vercel.json` has rewrites configured
2. Verify build output is in `dist/`
3. Check Vercel logs for errors

---

## Deploy Button

Click to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/elevateforhumanity/fix2)

This will:

1. Fork the repository (optional)
2. Import to Vercel
3. Configure automatically
4. Deploy immediately

---

## Continuous Deployment

After initial setup, Vercel automatically deploys:

- **Production**: Every push to `main` branch
- **Preview**: Every pull request

No additional configuration needed!

---

## Commands Reference

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Check deployment status
vercel ls

# View logs
vercel logs

# Open in browser
vercel open

# Remove deployment
vercel rm
```

---

## What Happens During Deployment

1. **Clone**: Vercel clones your repository
2. **Install**: Runs `pnpm install`
3. **Build**: Runs `pnpm build`
4. **Optimize**: Compresses and optimizes assets
5. **Deploy**: Uploads to Vercel CDN
6. **DNS**: Configures custom domain (if set)
7. **SSL**: Automatically provisions SSL certificate
8. **Live**: Site is live!

**Total time**: 2-3 minutes

---

## Environment Variables Explained

| Variable                      | Purpose                   | Required |
| ----------------------------- | ------------------------- | -------- |
| `NODE_ENV`                    | Set to production         | Yes      |
| `VITE_SUPABASE_URL`           | Supabase project URL      | Yes      |
| `VITE_SUPABASE_ANON_KEY`      | Supabase public key       | Yes      |
| `VITE_API_URL`                | Backend API URL           | Yes      |
| `VITE_SITE_URL`               | Frontend URL              | Yes      |
| `VITE_ENABLE_AUTOPILOT`       | Enable autopilot features | Optional |
| `VITE_GA_MEASUREMENT_ID`      | Google Analytics          | Optional |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe payments           | Optional |

---

## Architecture After Deployment

```
┌─────────────────────────────────────────┐
│  www.elevateforhumanity.org (Durable)  │
│  ├── Marketing pages                    │
│  └── Embeds LMS widget ──────────┐     │
└─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────┐
│  app.elevateforhumanity.org (Vercel)   │
│  ├── Full LMS application               │
│  ├── Course catalog                     │
│  ├── Student dashboard                  │
│  └── Embeddable widget                  │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Supabase (Database)                    │
│  ├── Authentication                     │
│  ├── Course data                        │
│  └── User data                          │
└─────────────────────────────────────────┘
```

---

## Next Steps After Deployment

1. **✅ Verify deployment** - Check all routes work
2. **✅ Configure custom domain** - Set up `app.elevateforhumanity.org`
3. **✅ Test widget** - Embed on Durable pages
4. **✅ Monitor logs** - Check Vercel dashboard for errors
5. **✅ Set up analytics** - Add Google Analytics if needed

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/
- **Deployment Guide**: See `DEPLOYMENT_COMPLETE.md`
- **Widget Guide**: See `DURABLE_INTEGRATION.md`

---

## Current Status

✅ **Code**: Committed and pushed  
✅ **Build**: Successful locally  
✅ **Config**: Optimized for Vercel  
⏳ **Deploy**: Waiting for authentication

**Next Action**: Choose one of the deployment methods above

---

**Ready to deploy?**

**Option A**: `vercel login` then `vercel --prod`  
**Option B**: Visit https://vercel.com/new and import repository  
**Option C**: Click the Deploy button above

🚀 **Let's go live!**
