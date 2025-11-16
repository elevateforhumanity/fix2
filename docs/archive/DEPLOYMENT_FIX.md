# Deployment Fix Applied

## Issue

Netlify deployment was failing with error:

```
ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile"
because pnpm-lock.yaml is not up to date with package.json
```

## Root Cause

- Project was configured to use `pnpm` via `packageManager` field in package.json
- The `pnpm-lock.yaml` was out of sync with `package.json` after adding new dependencies
- Netlify's CI environment uses frozen lockfile by default

## Solution Applied

### Changes Made

1. **Removed pnpm configuration**
   - Deleted `packageManager: "pnpm@9.7.0"` from package.json
   - Deleted `pnpm-lock.yaml` file

2. **Switched to npm**
   - Generated new `package-lock.json` using npm
   - Netlify will now use npm for dependency installation

3. **Committed changes**
   - Commit: `72d572d6`
   - Message: "Switch from pnpm to npm for Netlify deployment"

## Verification Steps

### 1. Check Netlify Build Logs

Visit your Netlify dashboard and look for:

- ✅ "Installing npm packages using npm" (not pnpm)
- ✅ Successful dependency installation
- ✅ Build completes without errors

### 2. Expected Build Output

```
Installing npm packages using npm version X.X.X
added XXX packages in XXs
Build command from netlify.toml: "npm run build"
```

### 3. Monitor Deployment

1. Go to Netlify dashboard
2. Navigate to Deploys tab
3. Watch the latest deploy (commit `72d572d6`)
4. Check for successful completion

## If Deployment Still Fails

### Option 1: Clear Build Cache

In Netlify dashboard:

1. Go to Site settings
2. Build & deploy → Environment
3. Click "Clear build cache"
4. Trigger new deploy

### Option 2: Manual Dependency Install

If npm install fails, you may need to:

```bash
# Locally
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
git add package-lock.json
git commit -m "Regenerate package-lock with legacy peer deps"
git push
```

### Option 3: Update Build Command

In `netlify.toml`, change:

```toml
[build]
  command = "npm install --legacy-peer-deps && npm run build"
```

## Environment Variables to Verify

Ensure these are set in Netlify:

### Required

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### For MOU Features

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `MOU_ARCHIVE_EMAIL`

### Optional

- `NEXT_PUBLIC_APP_URL`

## Post-Deployment Checklist

Once deployment succeeds:

- [ ] Visit deployed site URL
- [ ] Test LMS pages load
- [ ] Test admin portal access
- [ ] Test program holder portal
- [ ] Verify MOU signing page works
- [ ] Check certificate verification
- [ ] Test API endpoints
- [ ] Verify email notifications (if configured)

## Deployment Timeline

- **Initial Deploy Failed:** ~8:13 PM (pnpm lockfile issue)
- **Fix Applied:** ~8:17 PM (switched to npm)
- **Expected Success:** ~8:20-8:25 PM

## Monitoring Commands

```bash
# Check latest commit
git log --oneline -1

# View deployment status (if netlify CLI installed)
netlify status

# Watch build logs
netlify watch
```

## Rollback Plan

If this fix doesn't work:

```bash
# Revert to previous working state
git revert 72d572d6
git push origin main
```

## Success Indicators

Deployment is successful when you see:

1. ✅ Green checkmark in Netlify dashboard
2. ✅ Site is live at your Netlify URL
3. ✅ All pages load without 404 errors
4. ✅ No console errors on homepage
5. ✅ API routes respond correctly

## Next Steps After Success

1. Test MOU workflow end-to-end
2. Run database migrations if not auto-applied
3. Verify storage buckets exist
4. Test email delivery
5. Update DNS if needed
6. Configure custom domain

## Support

If issues persist:

- Check Netlify build logs for specific errors
- Review Next.js build output
- Verify all environment variables are set
- Check Supabase connection
- Test locally with `npm run build`

---

**Status:** Fix applied and pushed  
**Commit:** 72d572d6  
**Time:** November 13, 2024 ~8:17 PM  
**Next Check:** Monitor Netlify dashboard for deployment status
