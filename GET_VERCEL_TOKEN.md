# 🔑 Get Your Vercel Token

## The token you provided is NOT a Vercel token

The key you gave me (`vck_4hHMv25bl6Y0NLdCpzLQyEVPPKJtQiLUx4V9yICDticDGLEEm91QovVp`) is an **AI Gateway API key**, not a Vercel token.

---

## How to Get Your Vercel Token:

### Step 1: Go to Vercel Dashboard
**URL:** https://vercel.com/account/tokens

### Step 2: Create New Token
1. Click **"Create Token"**
2. Name it: **"Domain Migration"**
3. Scope: **Full Access** (or at least access to fix2-gpql project)
4. Expiration: **No Expiration** (or 90 days)
5. Click **"Create"**

### Step 3: Copy the Token
- It will look like: `vercel_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- Copy it immediately (you won't see it again)

### Step 4: Run the Script
```bash
export VERCEL_TOKEN=vercel_your_actual_token_here
node scripts/update-vercel-env-vars.mjs
```

---

## OR: Update Manually (Faster - 2 Minutes)

If you don't want to create a token, just update manually:

### Go to Vercel Dashboard:
https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables

### Update These 2 Variables:

**1. NEXT_PUBLIC_SITE_URL**
- Click "Edit"
- Change value to: `https://www.elevateforhumanity.org`
- Make sure it's applied to: Production, Preview, Development
- Click "Save"

**2. NEXT_PUBLIC_APP_URL**
- Click "Edit"
- Change value to: `https://www.elevateforhumanity.org`
- Make sure it's applied to: Production, Preview, Development
- Click "Save"

### Then Redeploy:
1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/deployments
2. Click on the latest deployment
3. Click "Redeploy"
4. **UNCHECK** "Use existing Build Cache"
5. Click "Redeploy"

**Done in 2 minutes!**

---

## What Happens After:

✅ New deployment will use www.elevateforhumanity.org
✅ Sitemap will show 51 pages
✅ All SEO optimization will be live
✅ No password protection
✅ All fixes applied

---

## Verify:

After redeployment completes (3-5 minutes):

```bash
node scripts/verify-deployment.mjs
```

Should show all green checkmarks!

---

**The manual update is faster and easier. Just change those 2 environment variables in Vercel dashboard!** 🚀
