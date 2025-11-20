# 🚀 Enterprise Deployment System - Setup Guide

**Status:** ✅ CODE DEPLOYED - Needs Configuration

---

## What You Now Have

✅ **Auto-deploy on every commit** - GitHub Action ready
✅ **Admin dashboard "Force Deploy" button** - `/admin/tools/force-deploy`
✅ **Deployment logs viewer** - `/admin/tools/deployment-logs`
✅ **Gitpod one-click redeploy script** - `./.gitpod.d/force-vercel-redeploy.sh`
✅ **Permanent anti-cache middleware** - `middleware.ts`
✅ **Full protection** - Site NEVER serves old builds

---

## Setup Steps (5 minutes)

### Step 1: Create Vercel Deploy Hook

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/git
2. Scroll to "Deploy Hooks"
3. Click "Create Hook"
4. Settings:
   - **Name:** `prod-main-auto`
   - **Branch:** `main`
5. Click "Create Hook"
6. **Copy the URL** - looks like:
   ```
   https://api.vercel.com/v1/integrations/deploy/prj_xxxx/xxxxxx
   ```

---

### Step 2: Add to Vercel Environment Variables

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables
2. Click "Add New"
3. Settings:
   - **Key:** `VERCEL_DEPLOY_HOOK_URL`
   - **Value:** Paste the Deploy Hook URL from Step 1
   - **Environments:** Production, Preview, Development (all)
4. Click "Save"

---

### Step 3: Add to GitHub Secrets

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Settings:
   - **Name:** `VERCEL_DEPLOY_HOOK_URL`
   - **Value:** Paste the same Deploy Hook URL
4. Click "Add secret"

---

### Step 4: Add to Local .env.local (Gitpod)

In your Gitpod workspace:

```bash
echo "VERCEL_DEPLOY_HOOK_URL=your-deploy-hook-url-here" >> .env.local
```

Replace `your-deploy-hook-url-here` with the actual URL.

---

### Step 5: Test the System

#### Test Auto-Deploy:

```bash
git commit --allow-empty -m "Test auto-deploy"
git push origin main
```

Watch GitHub Actions: https://github.com/elevateforhumanity/fix2/actions

#### Test Admin Button:

1. Visit: https://www.elevateforhumanity.org/admin/tools/force-deploy
2. Click "🚀 Force Fresh Deploy"
3. Should see success message

#### Test Gitpod Script:

```bash
./.gitpod.d/force-vercel-redeploy.sh
```

Should output: "🔥 Fresh deployment started!"

---

## How It Works

### Automatic Deployment Flow:

```
1. Developer pushes to main
   ↓
2. GitHub Action triggers
   ↓
3. Calls Vercel Deploy Hook
   ↓
4. Vercel starts fresh build
   ↓
5. 296 pages generated (no cache)
   ↓
6. Deployment goes live
   ↓
7. Edge cache invalidated
```

**Time:** ~2-3 minutes from push to live

---

### Manual Deployment Options:

**Option A: Admin Panel**

- Visit `/admin/tools/force-deploy`
- Click button
- Wait for success message

**Option B: Gitpod Terminal**

```bash
./.gitpod.d/force-vercel-redeploy.sh
```

**Option C: Direct API Call**

```bash
curl -X POST "$VERCEL_DEPLOY_HOOK_URL"
```

---

## Admin Panel Features

### Force Deploy Page

**URL:** `/admin/tools/force-deploy`

**Features:**

- One-click deployment trigger
- Success/error messaging
- Direct link to Vercel dashboard
- Usage guidelines
- Alternative methods documentation

### Deployment Logs Page

**URL:** `/admin/tools/deployment-logs`

**Features:**

- Recent deployment history
- Status badges (Building, Ready, Error)
- Deployment duration tracking
- Direct links to preview URLs
- Direct links to Vercel logs
- Pipeline visualization

---

## Verification

After setup, verify everything works:

### 1. Check Headers

```bash
curl -I https://www.elevateforhumanity.org
```

Should show:

```
Cache-Control: no-store, max-age=0, must-revalidate
```

### 2. Check Build ID

View page source, look for:

```html
<script src="/_next/static/build-1234567890-abc123/...">
```

Build ID should change with every deployment.

### 3. Check GitHub Action

Visit: https://github.com/elevateforhumanity/fix2/actions

Should see "Auto Fresh Deploy to Vercel" workflow running on every push.

### 4. Check Vercel Deployments

Visit: https://vercel.com/elevate-48e460c9/fix2-gpql

Should see new deployments appearing automatically.

---

## Troubleshooting

### GitHub Action Not Running

**Check:**

1. Is `VERCEL_DEPLOY_HOOK_URL` added to GitHub secrets?
2. Is the workflow file at `.github/workflows/vercel-force.yml`?
3. Are you pushing to the `main` branch?

**Fix:**

```bash
git push origin main
```

### Admin Button Returns Error

**Check:**

1. Is `VERCEL_DEPLOY_HOOK_URL` in Vercel environment variables?
2. Are you logged in as admin?
3. Is the API route at `/app/api/admin/force-redeploy/route.ts`?

**Fix:**
Add environment variable in Vercel dashboard.

### Gitpod Script Fails

**Check:**

1. Is `VERCEL_DEPLOY_HOOK_URL` in `.env.local`?
2. Is the script executable?

**Fix:**

```bash
chmod +x .gitpod.d/force-vercel-redeploy.sh
echo "VERCEL_DEPLOY_HOOK_URL=your-url" >> .env.local
```

### Still Seeing Old Content

**Try:**

1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Force redeploy from admin panel
4. Wait 2-3 minutes for deployment to complete

---

## Maintenance

### Regular Tasks:

- **None required** - System is fully automated

### Optional Enhancements:

- Add Vercel API integration for real-time logs
- Add deployment notifications (Slack, email)
- Add rollback functionality
- Add deployment approval workflow

---

## Security Notes

### Deploy Hook URL:

- Keep secret - anyone with URL can trigger deployments
- Rotate if compromised
- Don't commit to git (use environment variables)

### Admin Access:

- Only admins can access `/admin/tools/*` pages
- Protected by `requireAdmin` middleware
- Uses RBAC system

---

## Support

### Documentation:

- Main docs: `/CACHE_BUSTING_SYSTEM.md`
- This setup guide: `/DEPLOYMENT_SYSTEM_SETUP.md`

### Links:

- Vercel Dashboard: https://vercel.com/elevate-48e460c9/fix2-gpql
- GitHub Actions: https://github.com/elevateforhumanity/fix2/actions
- Admin Panel: https://www.elevateforhumanity.org/admin/tools/force-deploy

---

## Status Checklist

- [ ] Vercel Deploy Hook created
- [ ] `VERCEL_DEPLOY_HOOK_URL` added to Vercel
- [ ] `VERCEL_DEPLOY_HOOK_URL` added to GitHub secrets
- [ ] `VERCEL_DEPLOY_HOOK_URL` added to `.env.local`
- [ ] Tested auto-deploy (push to main)
- [ ] Tested admin button
- [ ] Tested Gitpod script
- [ ] Verified headers show `no-store`
- [ ] Verified build ID changes on each deploy

---

**Once all checkboxes are complete, your enterprise deployment system is fully operational!** 🚀
