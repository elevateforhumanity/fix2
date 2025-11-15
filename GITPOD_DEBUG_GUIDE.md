# 🔧 Gitpod Debug Guide

## Quick Fix Script

Use this script to debug why Vercel builds are failing.

### Run the Script

```bash
./gp-fix.sh
```

This one command will:
1. ✅ Check system info (Node, npm, pnpm versions)
2. ✅ Install dependencies
3. ✅ Check environment variables (safely masked)
4. ✅ Verify PWA files exist
5. ✅ Run PWA verification (31 checks)
6. ✅ Run TypeScript check
7. ✅ Run production build (same as Vercel)
8. ✅ Show required env vars for Vercel
9. ✅ Display git status and recent commits

---

## What the Script Checks

### 1. System Info
```
Node version: v20.11.1
NPM version:  10.2.4
PNPM version: 8.15.0
```

### 2. Dependencies
Installs using the correct package manager:
- `pnpm` if `pnpm-lock.yaml` exists
- `yarn` if `yarn.lock` exists
- `npm` otherwise

### 3. Environment Variables (Masked)
```
NEXT_PUBLIC_SUPABASE_URL = http******** (45 chars)
VAPID_PRIVATE_KEY = (not set)
```

### 4. PWA Files
```
✅ public/manifest.json
✅ public/sw.js
✅ public/icon-192.png
✅ public/icon-512.png
✅ app/offline/page.tsx
```

### 5. PWA Verification
Runs `npm run verify:pwa` to check all 31 PWA requirements.

### 6. TypeScript Check
Runs `npm run typecheck` to catch type errors before build.

### 7. Production Build
Runs `npm run build` - **this is exactly what Vercel does**.

---

## Interpreting Results

### ✅ If Build Succeeds in Gitpod

Your code is fine! The Vercel issue is likely:

**1. Missing Environment Variables**
```bash
# Check what Vercel needs
./gp-fix.sh | grep "Environment Variables needed"
```

Add these in Vercel Dashboard:
- Settings → Environment Variables
- Add each variable
- Redeploy

**2. Node Version Mismatch**
Check `package.json`:
```json
{
  "engines": {
    "node": ">=20.11.1 <23"
  }
}
```

Vercel should use this version automatically.

**3. Build Command Wrong**
In Vercel Dashboard → Settings → Build & Development:
- Build Command: `npm run build` or `pnpm build`
- Output Directory: `.next`
- Install Command: `npm install` or `pnpm install`

---

### ❌ If Build Fails in Gitpod

The error you see is probably the same one breaking Vercel.

**Common Errors:**

#### Module Not Found
```
Error: Cannot find module 'xxx'
```

**Fix:**
```bash
npm install xxx
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push origin main
```

#### TypeScript Error
```
Type error: xxx
```

**Fix:**
1. Find the file mentioned in error
2. Fix the type issue
3. Run `npm run typecheck` to verify
4. Commit and push

#### Out of Memory
```
JavaScript heap out of memory
```

**Fix:**
Add to `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

---

## Environment Variables Needed

### Required for Supabase
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### Required for PWA Push Notifications
```bash
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BNxxx...
VAPID_PRIVATE_KEY=xxx...
VAPID_SUBJECT=mailto:admin@elevateforhumanity.org
```

**Generate VAPID keys:**
```bash
npm run generate:vapid
```

### Optional
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
```

---

## Adding Env Vars to Vercel

### Method 1: Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. For each variable:
   - Click "Add New"
   - Name: `VARIABLE_NAME`
   - Value: `your_value`
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"
5. Redeploy after adding all variables

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Add env var
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste value when prompted

# Repeat for each variable
```

### Method 3: .env File (Local Only)

Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BNxxx...
VAPID_PRIVATE_KEY=xxx...
VAPID_SUBJECT=mailto:admin@elevateforhumanity.org
```

**Note**: This file is gitignored and won't be deployed to Vercel.

---

## Workflow

### 1. Debug Locally
```bash
./gp-fix.sh
```

### 2. Fix Any Errors
- Add missing dependencies
- Fix TypeScript errors
- Update configuration

### 3. Commit and Push
```bash
git add .
git commit -m "Fix build errors"
git push origin main
```

### 4. Add Env Vars to Vercel
- Go to Vercel Dashboard
- Add all required variables
- Redeploy

### 5. Verify Deployment
- Check build logs in Vercel
- Visit production URL
- Test at `/pwa-test`

---

## Troubleshooting

### Script Won't Run

**Error**: `Permission denied`

**Fix:**
```bash
chmod +x gp-fix.sh
./gp-fix.sh
```

### Dependencies Won't Install

**Error**: `npm ERR!` or `pnpm ERR!`

**Fix:**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Build Succeeds but Vercel Fails

**Most likely**: Missing environment variables

**Check:**
1. Run `./gp-fix.sh`
2. Look for "Environment Variables needed on Vercel"
3. Add each one to Vercel Dashboard
4. Redeploy

---

## Quick Commands

```bash
# Run debug script
./gp-fix.sh

# Just build (no checks)
npm run build

# Just verify PWA
npm run verify:pwa

# Just TypeScript check
npm run typecheck

# Generate VAPID keys
npm run generate:vapid

# Start dev server
npm run dev
```

---

## Gitpod Tasks

The script is also available as a Gitpod task:

1. Open Gitpod workspace
2. Look for "Vercel Build Check" task
3. Run `./gp-fix.sh` when prompted

---

## Support

- **Script**: `gp-fix.sh`
- **PWA Verification**: `npm run verify:pwa`
- **Documentation**: `/docs/`
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## Summary

**One command to rule them all:**
```bash
./gp-fix.sh
```

This will tell you:
- ✅ If your build works
- ❌ What's broken
- 🔑 What env vars Vercel needs
- 📋 What to do next

**If build succeeds in Gitpod but fails on Vercel:**
→ Add missing env vars to Vercel

**If build fails in Gitpod:**
→ Fix the error shown, commit, and push
