# 🚀 Quick Deploy Guide

## One-Command Deploy

```bash
pnpm autopilot:deploy
```

This will:
1. Show git status
2. Remind you to update BUILD MARKER
3. Clean cache
4. Reinstall dependencies
5. Lint code
6. Build fresh
7. Deploy to Vercel production

---

## Before You Deploy

### 1. Add/Update Build Marker

In `app/page.tsx` (or any visible component):

```tsx
<p className="text-[10px] text-slate-400 mt-2 fixed bottom-2 right-2 bg-white/80 px-2 py-1 rounded">
  BUILD MARKER: v2025-11-20-01
</p>
```

Change the number each time: `...02`, `...03`, `...04`

### 2. Commit Your Changes (Optional)

```bash
git add .
git commit -m "Your commit message"
git push
```

---

## After Deploy

### ✅ Check These URLs ONLY:

- **Project Base:** https://fix2-gpql.vercel.app
- **Production:** https://www.elevateforhumanity.org (once connected)

### ❌ DO NOT Check:

- Old hash URLs like `https://fix2-gpql-qfpvev81v-elevate-48e460c9.vercel.app`
- These are frozen snapshots and will NEVER update

### 🔄 Hard Refresh Your Browser:

- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

### 🔍 Verify Your Build:

Look for your BUILD MARKER text. If you see it, you're on the new build!

---

## Other Useful Commands

```bash
# Deploy to preview (not production)
pnpm deploy:preview

# Just clean build (no deploy)
pnpm clean-build

# Clean cache only
pnpm clean

# Start dev server
pnpm dev
```

---

## Troubleshooting

### "I don't see my changes"

1. Check which URL you're using (see ✅ above)
2. Hard refresh your browser
3. Check if your BUILD MARKER matches
4. Go to Vercel dashboard and check latest deployment

### "Build failed"

1. Check environment variables: `pnpm prebuild`
2. Test build locally: `pnpm clean-build`
3. Check Vercel dashboard for error logs

---

## Understanding Vercel URLs

Every deployment creates 3 types of URLs:

1. **Unique Hash URL** (immutable, never changes)
   - Example: `fix2-gpql-abc123xyz.vercel.app`
   - This is a frozen snapshot
   - Useful for: Testing specific builds, rollback

2. **Project Base URL** (always latest)
   - Example: `fix2-gpql.vercel.app`
   - Always points to latest successful deployment
   - Useful for: Testing current code

3. **Production Domain** (your custom domain)
   - Example: `www.elevateforhumanity.org`
   - Points to production deployment
   - Useful for: End users

---

## Quick Reference

| Command | What It Does |
|---------|--------------|
| `pnpm autopilot:deploy` | Full clean build + production deploy |
| `pnpm deploy:prod` | Clean build + production deploy |
| `pnpm deploy:preview` | Clean build + preview deploy |
| `pnpm clean-build` | Clean cache + rebuild |
| `pnpm dev` | Start dev server |

---

**See VERCEL_DEPLOYMENT_GUIDE.md for complete documentation**
