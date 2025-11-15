# Vercel Deployment Fix Guide

## 🦊 The One-Slot Fox Summary

> Your package.json is not broken, but it's heavy and server-only in places. The main issues for Vercel are:
> 1. **Node version mismatch** - Vercel must use Node 20+ to match your engines requirement
> 2. **Heavy server libraries** - ffmpeg, Google TTS, AWS SDK, react-pdf must stay on Node.js runtime only
> 3. **Build validation** - Added prebuild check to catch missing environment variables early

---

## ✅ What We Fixed

### 1. Added Pre-Build Environment Check

**File:** `vercel-check.mjs`

This script runs before every build and validates:
- Node.js version
- Critical environment variables (Supabase, Stripe, etc.)
- Optional environment variables (VAPID, AWS, OpenAI, etc.)
- Heavy dependencies that require special handling

**Updated package.json:**
```json
"scripts": {
  "prebuild": "node vercel-check.mjs",
  "build": "next build"
}
```

Now every Vercel build will show you exactly what's missing or misconfigured.

### 2. Added Runtime Declarations to API Routes

Heavy server-side operations now explicitly use Node.js runtime:

**Files updated:**
- `app/api/program-holder/mou-pdf/route.ts` - PDF generation
- `app/api/files/route.ts` - File uploads

**Pattern used:**
```typescript
// Use Node.js runtime for heavy operations
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  // Your code here
}
```

### 3. Verified Version Alignment

✅ **Confirmed:** `next` and `@next/bundle-analyzer` both at version `16.0.1`

---

## 🚨 Critical: Set Node Version in Vercel

Your `package.json` declares:
```json
"engines": {
  "node": ">=20.11.1 <23"
}
```

**You MUST set Vercel to use Node 20 or 22:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **General**
4. Find **Node.js Version**
5. Set to **20.x** or **22.x**
6. Save and **Redeploy**

If Vercel is still on Node 18, builds will fail or behave unpredictably.

---

## 📦 Heavy Dependencies - Usage Rules

These libraries are in your dependencies and **MUST** only be used in specific contexts:

### Server-Only Libraries

| Library | Purpose | Where to Use |
|---------|---------|--------------|
| `@ffmpeg-installer/ffmpeg` | Video processing | Background workers, Node.js API routes |
| `@ffprobe-installer/ffprobe` | Video analysis | Background workers, Node.js API routes |
| `@google-cloud/text-to-speech` | TTS generation | Background workers, Node.js API routes |
| `@aws-sdk/client-s3` | S3 uploads | Node.js API routes with `runtime='nodejs'` |
| `@react-pdf/renderer` | PDF generation | Node.js API routes with `runtime='nodejs'` |
| `canvas` | Image manipulation | Node.js API routes, server components |
| `fluent-ffmpeg` | Video processing | Background workers, Node.js API routes |

### ✅ Safe Usage Pattern

```typescript
// app/api/video/process/route.ts
export const runtime = "nodejs"; // 🔴 CRITICAL

import ffmpeg from "@ffmpeg-installer/ffmpeg";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Your server-side logic with ffmpeg here
  return NextResponse.json({ ok: true });
}
```

### ❌ NEVER Do This

```typescript
// ❌ DON'T import heavy libs in client components
"use client";

import ffmpeg from "@ffmpeg-installer/ffmpeg"; // 💥 BREAKS BUILD
import { S3Client } from "@aws-sdk/client-s3"; // 💥 BREAKS BUILD

export default function MyComponent() {
  // This will fail on Vercel
}
```

```typescript
// ❌ DON'T use heavy libs without runtime declaration
// app/api/upload/route.ts

import { S3Client } from "@aws-sdk/client-s3";

// Missing: export const runtime = "nodejs";

export async function POST(req: Request) {
  // This might fail on Edge runtime
}
```

---

## 🔐 Environment Variables Checklist

### Critical (Required for Basic Functionality)

Run `node vercel-check.mjs` to see which are missing.

- [ ] `NEXT_PUBLIC_SITE_URL` - Your site URL
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key

### Optional (For Advanced Features)

- [ ] `NEXT_PUBLIC_VAPID_PUBLIC_KEY` - Push notifications
- [ ] `VAPID_PRIVATE_KEY` - Push notifications
- [ ] `VAPID_SUBJECT` - Push notifications
- [ ] `AWS_ACCESS_KEY_ID` - S3 uploads
- [ ] `AWS_SECRET_ACCESS_KEY` - S3 uploads
- [ ] `AWS_REGION` - S3 region
- [ ] `AWS_S3_BUCKET` - S3 bucket name
- [ ] `GOOGLE_APPLICATION_CREDENTIALS` - Google Cloud TTS
- [ ] `OPENAI_API_KEY` - AI features
- [ ] `RESEND_API_KEY` - Email sending

**To add environment variables in Vercel:**
1. Go to **Settings** → **Environment Variables**
2. Add each variable for Production, Preview, and Development
3. Redeploy after adding variables

---

## 🧪 Testing Your Build

### Local Test

```bash
# Run the prebuild check
node vercel-check.mjs

# Build locally
npm run build

# Check for errors
echo $?  # Should be 0 if successful
```

### Vercel Build Logs

After deploying, check the build logs for:

1. **Node version confirmation:**
   ```
   Node version: v20.x.x
   ```

2. **Environment variable status:**
   ```
   ✅ NEXT_PUBLIC_SITE_URL: [set]
   ✅ NEXT_PUBLIC_SUPABASE_URL: [set]
   ```

3. **Build success:**
   ```
   ✅ All critical environment variables are set
   ```

---

## 🔧 Common Issues and Solutions

### Issue: "Module not found" for heavy dependencies

**Cause:** Importing server-only libraries in client components or Edge runtime

**Solution:**
1. Add `export const runtime = 'nodejs';` to the route
2. Move heavy imports to server-only files
3. Use dynamic imports if needed:
   ```typescript
   const { S3Client } = await import("@aws-sdk/client-s3");
   ```

### Issue: Build succeeds but runtime errors

**Cause:** Missing environment variables

**Solution:**
1. Run `node vercel-check.mjs` locally
2. Add missing variables to Vercel
3. Redeploy

### Issue: "Cannot find module 'canvas'" or similar

**Cause:** Native dependencies not available in Edge runtime

**Solution:**
1. Ensure route has `export const runtime = 'nodejs';`
2. Check that the route isn't accidentally using Edge runtime
3. Verify the dependency is in `dependencies`, not `devDependencies`

### Issue: Slow cold starts

**Cause:** Heavy dependencies loading on every request

**Solution:**
1. Consider moving heavy operations to background workers
2. Use Vercel's serverless functions for heavy operations
3. Implement caching where possible

---

## 📋 Deployment Checklist

Before deploying to Vercel:

- [ ] Run `node vercel-check.mjs` - all critical vars should be set
- [ ] Run `npm run build` locally - should succeed
- [ ] Verify Node version in Vercel is 20.x or 22.x
- [ ] All environment variables added to Vercel
- [ ] Heavy dependencies only used in Node.js runtime routes
- [ ] No server-only imports in client components
- [ ] Test the build in Vercel preview deployment first

---

## 🚀 Quick Deploy Commands

```bash
# 1. Validate environment
node vercel-check.mjs

# 2. Test build locally
npm run build

# 3. Deploy to Vercel (if using Vercel CLI)
vercel --prod

# Or push to GitHub and let Vercel auto-deploy
git add .
git commit -m "fix: Vercel deployment configuration"
git push origin main
```

---

## 📚 Additional Resources

- [Next.js Runtime Configuration](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Node.js Version](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js)

---

## 🆘 Still Having Issues?

1. Check Vercel build logs for specific errors
2. Run `node vercel-check.mjs` and share output
3. Verify all environment variables are set in Vercel dashboard
4. Ensure Node version is 20.x or 22.x in Vercel settings
5. Check that heavy dependencies have `runtime='nodejs'` in their routes

---

**Last Updated:** 2025-11-15
**Status:** ✅ Ready for deployment
