# Autopilot Task: Link Vercel Project fix2-1c7w

## Objective

Connect the GitHub repository `elevateforhumanity/fix2` to the correct Vercel project `fix2-1c7w` and deploy with all environment variables configured.

## Current Issue

- Repository is deploying to wrong Vercel project (`fix2-8mig` or `fix2-i3z8`)
- Need to deploy to: `https://vercel.com/gitpod/fix2-1c7w`
- Latest commit `3abfcd07` has all deprecated packages removed
- Old commits still have deprecated warnings

## Required Actions

### 1. Disconnect Old Projects

- Remove any existing Vercel project connections
- Clean up `.vercel` directory (already done)

### 2. Connect to fix2-1c7w Project

Navigate to: https://vercel.com/gitpod/fix2-1c7w

**Settings → Git:**

- Click "Connect Git Repository"
- Select repository: `elevateforhumanity/fix2`
- Branch: `main`
- Root Directory: `./` (default)
- Click "Connect"

### 3. Configure Environment Variables

Navigate to: Settings → Environment Variables

Add these 6 variables for **Production** environment:

```bash
SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
SUPABASE_SERVICE_ROLE_KEY=[Get from Supabase Dashboard → Settings → API → service_role key]
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
NEXT_PUBLIC_SITE_URL=https://www.elevateconnectsdirectory.org
```

### 4. Configure Build Settings

Navigate to: Settings → General → Build & Development Settings

Verify these settings:

- Framework Preset: **Next.js**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node.js Version: **20.x**

### 5. Deploy

- Go to **Deployments** tab
- Click **"Deploy"** or **"Redeploy"**
- Ensure it's building commit: `3abfcd07` or later
- Uncheck "Use existing build cache"
- Click **Deploy**

## Expected Results

### Build Should Show:

✅ No deprecated package warnings (xss-clean, lodash.isequal, node-domexception removed)
✅ No @supabase/auth-helpers warnings (migrated to @supabase/ssr)
✅ Stripe API version correct (2025-10-29.clover)
✅ Build completes successfully
✅ Site accessible at deployment URL

### Deployment URL:

- Production: `https://fix2-1c7w.vercel.app` (or custom domain)
- Should redirect to: `https://www.elevateconnectsdirectory.org`

## Verification Steps

After deployment:

1. Check build logs - should be clean with no deprecation warnings
2. Visit deployment URL - should load without 500 errors
3. Test key pages:
   - Homepage: `/`
   - LMS Dashboard: `/lms/dashboard`
   - Programs: `/programs`
   - Login: `/login`

## Troubleshooting

### If build fails:

- Check environment variables are all set
- Verify commit is `3abfcd07` or later
- Check build logs for specific errors
- Ensure SUPABASE_SERVICE_ROLE_KEY is correct

### If 500 errors:

- Verify all 6 environment variables are set in Vercel
- Check function logs in Vercel dashboard
- Ensure Supabase project is accessible

## Files Changed (Latest Commits)

- `3abfcd07` - Trigger Vercel rebuild with clean dependencies
- `56c08ac0` - Remove packages with deprecated dependencies
- `873974b2` - Migrate from @supabase/auth-helpers to @supabase/ssr
- `c20d4e66` - Fix Stripe API version for Vercel build

## Success Criteria

- [ ] Repository connected to fix2-1c7w project
- [ ] All 6 environment variables configured
- [ ] Build completes with no deprecation warnings
- [ ] Site loads without 500 errors
- [ ] Custom domain points to deployment

## Notes

- Old projects (fix2-8mig, fix2-i3z8) can be deleted after successful deployment
- Build cache should be cleared for first deployment
- Latest code has all deprecated packages removed
- This will save money on build costs (fewer warnings, faster builds)
