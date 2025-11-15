# Vercel Deployment Quick Fix

## 🦊 The Problem (One Sentence)

Your package.json is heavy with server-only libraries (ffmpeg, Google TTS, AWS SDK) that break Vercel Edge runtime, and your Node version might be mismatched.

---

## ✅ The 3-Step Fix

### 1. Set Node Version in Vercel (CRITICAL)

Your `package.json` requires Node 20+:

```json
"engines": { "node": ">=20.11.1 <23" }
```

**Action Required:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Project
2. **Settings** → **General** → **Node.js Version**
3. Set to **20.x** or **22.x**
4. **Save** and **Redeploy**

### 2. Add Environment Variables

**Minimum required for basic functionality:**

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx...
STRIPE_SECRET_KEY=sk_xxx...
```

**Where to add:**

- Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
- Add for: Production, Preview, Development

### 3. Verify Build

Run locally to test:

```bash
node vercel-check.mjs
npm run build
```

Then push to trigger Vercel deployment.

---

## 🔧 What We Already Fixed

✅ **Added prebuild validation** (`vercel-check.mjs`)

- Runs before every build
- Shows missing environment variables
- Warns about heavy dependencies

✅ **Added runtime declarations** to API routes

- `app/api/program-holder/mou-pdf/route.ts` - PDF generation
- `app/api/files/route.ts` - File uploads

✅ **Verified version alignment**

- `next@16.0.1` matches `@next/bundle-analyzer@16.0.1`

---

## 📋 Pre-Deploy Checklist

- [ ] Node version set to 20.x or 22.x in Vercel
- [ ] All 6 critical environment variables added to Vercel
- [ ] Run `node vercel-check.mjs` - no critical errors
- [ ] Run `npm run build` locally - succeeds
- [ ] Push to GitHub or deploy via Vercel CLI

---

## 🚨 If Build Still Fails

1. **Check Vercel build logs** for specific error
2. **Verify Node version** in logs shows v20.x or v22.x
3. **Confirm environment variables** are set in Vercel dashboard
4. **Look for "Module not found"** errors → means heavy lib used in wrong place

---

## 📚 Full Documentation

See `VERCEL_DEPLOYMENT_FIX_GUIDE.md` for:

- Detailed explanation of all fixes
- Heavy dependency usage rules
- Common issues and solutions
- Complete environment variable list

---

**Quick Deploy:**

```bash
git add .
git commit -m "fix: Vercel deployment configuration"
git push origin main
```

Then check Vercel dashboard for deployment status.
