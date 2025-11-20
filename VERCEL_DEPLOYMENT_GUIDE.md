# Vercel Deployment Guide - Never Fight Ghost Caches Again

**Project:** fix2-gpql  
**Primary domain:** https://www.elevateforhumanity.org  
**Project base URL:** https://fix2-gpql.vercel.app

---

## 🎯 The Problem This Solves

Vercel creates **immutable deployment URLs** with unique hashes like:

- `https://fix2-gpql-qfpvev81v-elevate-48e460c9.vercel.app` ← OLD deployment (frozen)
- `https://fix2-gpql-guasaBMcMYkSJBTihNAM62wwn5qJ.vercel.app` ← NEW deployment

**Each hash URL is a snapshot in time and will NEVER update.**

If you keep checking an old hash URL, you'll think "new builds aren't working" when they actually are - you're just looking at the wrong URL.

---

## ✅ 10-Step Deployment Checklist

### 0. First Time Setup (One Time Only)

Authenticate with Vercel:

```bash
npx vercel login
```

Follow the prompts to log in with your Vercel account.

### 1. Make a tiny, obvious visual change

In any visible component (e.g., `app/page.tsx`), add:

```tsx
<p className="text-[10px] text-slate-400 mt-2">BUILD MARKER: v2025-11-20-01</p>
```

Change the marker each time (`...02`, `...03`, etc.). This tells you for sure which build you're looking at.

### 2. Check Git is clean

```bash
git status
```

If there are changes you care about, commit them before deploying.

### 3. Run a clean build in Gitpod

```bash
pnpm clean-build
```

This removes `.next` and `node_modules/.cache`, reinstalls deps, lints, and builds.

### 4. Deploy using Vercel CLI

```bash
pnpm deploy:prod
```

This runs clean build + deploys to production.

### 5. Grab the URL Vercel just printed

It will show something like:

```
https://fix2-gpql-guasaBMcMYkSJBTihNAM62wwn5qJ.vercel.app
```

**THAT is the new deployment.**

Do not go back to an old one like `...qfpvev81v...` – those are frozen.

### 6. Use the "live" URLs, not old hash URLs

After deploy, only check:

- ✅ https://fix2-gpql.vercel.app ← project base (latest deployment)
- ✅ https://www.elevateforhumanity.org ← once this is wired as production

These should now show your new BUILD MARKER line.

### 7. Hard refresh your browser

- **Desktop:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- **Mobile:** Close tab → reopen → revisit URL

This clears your browser cache so you're not seeing a stale copy.

### 8. Double-check the marker

Find the page where you added:

```
BUILD MARKER: v2025-11-20-01
```

If you see it on:

- ✅ fix2-gpql.vercel.app
- ✅ www.elevateforhumanity.org

Then you know the build is live and you're not stuck on an old deployment.

### 9. Do NOT reuse old deployment URLs

Anything like:

```
https://fix2-gpql-qfpvev81v-elevate-48e460c9.vercel.app
```

Is a snapshot of one past build. It will never update. Think of those as archived screenshots.

### 10. If something looks off

Re-run:

```bash
pnpm clean-build
pnpm deploy:prod
```

- Confirm the Git SHA in Vercel matches your latest commit
- Re-check the marker text

---

## 🚀 Available Scripts

### Clean Build

Removes all caches and rebuilds from scratch:

```bash
pnpm clean-build
```

What it does:

```bash
rm -rf .next node_modules/.cache && pnpm install && pnpm lint && pnpm build
```

### Deploy to Production

Runs clean build + deploys to Vercel:

```bash
pnpm deploy:prod
```

What it does:

```bash
pnpm clean-build && npx vercel --prod --confirm
```

### Deploy to Preview

Deploys to a preview URL (not production):

```bash
pnpm deploy:preview
```

What it does:

```bash
pnpm clean-build && npx vercel --confirm
```

---

## 🐛 Troubleshooting

### "I don't see my changes"

1. **Check which URL you're using**
   - ❌ Old hash URL? → Will never update
   - ✅ Project base URL? → Should show latest

2. **Hard refresh your browser**
   - Desktop: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Mobile: Close tab → reopen → revisit URL

3. **Check the build marker**
   - If it doesn't match your latest marker, you're on an old deployment

4. **Verify in Vercel Dashboard**
   - Go to https://vercel.com/elevate-48e460c9/fix2-gpql
   - Check the topmost deployment (latest)
   - Click its URL to see the actual latest build

### "Build failed"

1. **Check environment variables**

   ```bash
   pnpm prebuild
   ```

   This runs the vercel-check script to verify critical env vars

2. **Check build logs in Vercel**
   - Go to Vercel dashboard → Deployments
   - Click the failed deployment
   - Read the build logs

3. **Test build locally**
   ```bash
   pnpm clean-build
   ```
   If it fails locally, fix the errors before deploying

---

## 📋 Quick Reference

| What                  | URL                                            |
| --------------------- | ---------------------------------------------- |
| **Latest deployment** | https://fix2-gpql.vercel.app                   |
| **Production domain** | https://www.elevateforhumanity.org             |
| **Vercel Dashboard**  | https://vercel.com/elevate-48e460c9/fix2-gpql  |
| **Old deployments**   | ❌ Ignore hash URLs - they're frozen snapshots |

---

## 🎓 Understanding Vercel Deployments

### Every deployment gets 3 URLs:

1. **Unique hash URL** (immutable)
   - Example: `fix2-gpql-abc123xyz.vercel.app`
   - This NEVER changes - it's a frozen snapshot
   - Useful for: Testing specific builds, rollback references

2. **Project base URL** (always latest)
   - Example: `fix2-gpql.vercel.app`
   - This ALWAYS points to the latest successful deployment
   - Useful for: Testing current code

3. **Production domain** (your custom domain)
   - Example: `www.elevateforhumanity.org`
   - This points to whatever you've set as production
   - Useful for: End users, production testing

### When you deploy:

- ✅ Project base URL updates automatically
- ✅ Production domain updates (if deploying to prod)
- ❌ Old hash URLs stay frozen forever

---

## 💡 Pro Tips

1. **Always use build markers** - They're your source of truth
2. **Bookmark the project base URL** - Not individual deployment URLs
3. **Check Vercel dashboard** - When in doubt, see what's actually deployed
4. **Hard refresh often** - Browser caching can fool you
5. **Test on multiple devices** - Mobile caching is aggressive

---

## 🧷 Optional: Gitpod Reminder

Add this to `.gitpod.yml` to get a reminder every time the workspace starts:

```yaml
tasks:
  - name: Deployment Reminder
    command: |
      echo "🔁 Elevate Deployment Reminder"
      echo "1) Change BUILD MARKER text in a visible component."
      echo "2) Run: pnpm deploy:prod"
      echo "3) Check: https://fix2-gpql.vercel.app or https://www.elevateforhumanity.org"
      echo "4) Ignore old hashed URLs like ...qfpvev81v..."
```

---

**Last updated:** 2025-11-20  
**Maintained by:** Ona (AI Assistant)
