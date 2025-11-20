# 🚀 Vercel Hard Refresh - Aggressive Cache Busting

## What This Does

Forces a brand-new production deployment and clears all stale cache. No more waiting for old builds to expire.

---

## 🔧 Setup (One-Time)

### Step 1: Get Your Vercel Credentials

1. **Get VERCEL_TOKEN:**
   - Go to: https://vercel.com/account/tokens
   - Click "Create Token"
   - Name it: "Autopilot Hard Refresh"
   - Copy the token

2. **Get VERCEL_PROJECT_ID:**
   - Go to your project: https://vercel.com/elevate-48e460c9s-projects/fix2-gpql
   - Click "Settings"
   - Scroll to "Project ID"
   - Copy it

3. **Get VERCEL_ORG_ID:**
   - Go to: https://vercel.com/teams/elevate-48e460c9s-team/settings
   - Look for "Team ID" or "Organization ID"
   - Copy it

### Step 2: Add to GitHub Secrets

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Add these three secrets:
   - `VERCEL_TOKEN` = (your token from step 1)
   - `VERCEL_PROJECT_ID` = (your project ID)
   - `VERCEL_ORG_ID` = (your org ID)

### Step 3: Add to Vercel Environment Variables (Optional - for API endpoint)

1. Go to: https://vercel.com/elevate-48e460c9s-projects/fix2-gpql/settings/environment-variables
2. Add:
   - `VERCEL_TOKEN` = (your token)
   - `VERCEL_PROJECT_ID` = (your project ID)
   - `VERCEL_ORG_ID` = (your org ID)

---

## 🎯 How to Use

### Method 1: GitHub Actions (Automatic)

**Triggers automatically on every push to main.**

Or run manually:

1. Go to: https://github.com/elevateforhumanity/fix2/actions
2. Click "Autopilot – Vercel Hard Refresh"
3. Click "Run workflow"
4. Select branch: `main`
5. Click "Run workflow"

It will:

- ✅ Create a fresh deployment
- ✅ Wait for it to finish building
- ✅ Make it live
- ✅ Clear all cache

### Method 2: Command Line

```bash
# Set environment variables
export VERCEL_TOKEN="your_token"
export VERCEL_PROJECT_ID="your_project_id"
export VERCEL_ORG_ID="your_org_id"

# Run the script
npm run autopilot:vercel:hard-refresh
```

### Method 3: Admin Dashboard Button (Coming Soon)

Add a "Force Refresh" button to your admin dashboard that calls:

```typescript
const response = await fetch('/api/admin/vercel-hard-refresh', {
  method: 'POST',
});
```

---

## 📋 What Pages Are Force-Dynamic

These pages will NEVER serve stale cache:

- ✅ `/programs` - Always fresh program list
- ✅ `/admin/courses` - Always fresh course data
- ✅ `/admin/contacts` - Always fresh contact data
- ✅ All API routes - Always dynamic

To add more pages, add this to the top of the page file:

```typescript
export const dynamic = 'force-dynamic';
```

---

## 🔍 Troubleshooting

### "Missing env vars" error

Make sure you've added all three secrets to GitHub:

- VERCEL_TOKEN
- VERCEL_PROJECT_ID
- VERCEL_ORG_ID

### "Unauthorized" error

Your VERCEL_TOKEN might be expired or invalid. Create a new one.

### "Deployment failed" error

Check the Vercel dashboard for build errors:
https://vercel.com/elevate-48e460c9s-projects/fix2-gpql/deployments

### Still seeing old content

1. Hard refresh your browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Try incognito/private mode
4. Wait 30 seconds for CDN to propagate

---

## 🎉 Success!

Once set up, you can:

- ✅ Force new deployments anytime
- ✅ Never wait for stale cache to expire
- ✅ See changes immediately
- ✅ Run from GitHub Actions or command line

**No more 8-hour-old cache!** 🚀
