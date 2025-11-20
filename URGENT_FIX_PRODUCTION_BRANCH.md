# 🚨 URGENT: Fix Production Branch

## The Problem

Vercel is deploying from the WRONG branch:

- ❌ Current: `deepsource-transform-aa6e7b14` (old, has TypeScript errors)
- ✅ Should be: `main` (has all fixes, build markers)

This is why you keep seeing the old build!

## The Fix (2 Minutes)

### Step 1: Change Production Branch

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/git

2. Scroll down to find **"Production Branch"** or **"Git Configuration"**

3. You should see a field that says:

   ```
   Production Branch: deepsource-transform-aa6e7b14
   ```

4. Change it to: `main`

5. Click "Save"

### Step 2: Trigger New Deployment

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql

2. Click the "Redeploy" button (top right)

3. **VERIFY** it shows "Branch: main" (not deepsource)

4. Uncheck "Use existing Build Cache"

5. Click "Redeploy"

### Step 3: Verify

Wait 2-3 minutes, then:

1. Open: https://www.elevateforhumanity.org
2. Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
3. Look for build marker in bottom-right: `BUILD: 2025-11-20-10:25`

## If You Can't Find "Production Branch" Setting

Try these locations:

1. **Settings → Git** (most common)
2. **Settings → General** → scroll down
3. **Deployments** → Click latest → Look for branch dropdown

## Alternative: Delete the Project and Reconnect

If you absolutely cannot find the setting:

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings
2. Scroll to bottom → "Delete Project"
3. Confirm deletion
4. Go to: https://vercel.com/new
5. Import: `elevateforhumanity/fix2`
6. Set Production Branch: `main`
7. Add domain: `www.elevateforhumanity.org`

## Why This Happened

DeepSource created automated branches for code analysis. Vercel picked up one of these branches as the production branch instead of `main`.

We've now deleted all DeepSource branches, but Vercel still thinks the production branch is the deleted one.

---

**This MUST be fixed in the Vercel dashboard - there's no way around it.**
