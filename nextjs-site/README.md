# Elevate for Humanity - Vite/React Build

This directory now contains the **Vite/React production build** (previously contained Next.js site).

## What Happened

- **Old:** Next.js site with app router
- **New:** Vite/React SPA build from `dist/` folder
- **Backup:** Old Next.js files saved in `nextjs-site-backup-20251107-015627.tar.gz`

## Contents

This is the production-ready Vite build with:

- ✅ React 19.1.1 SPA
- ✅ React Router for navigation
- ✅ Durable.co design system
- ✅ All LMS features
- ✅ Optimized assets
- ✅ Static HTML pages

## Deployment

This build is ready to deploy to:
- Netlify
- Vercel
- Any static hosting

### Netlify Configuration

```toml
[build]
  publish = "nextjs-site"
  command = "echo 'Already built'"
```

Or simply point Netlify to this directory as the publish folder.

## Original Next.js Site

If you need the original Next.js files, they are backed up in:
```
nextjs-site-backup-20251107-015627.tar.gz
```

To restore:
```bash
tar -xzf nextjs-site-backup-20251107-015627.tar.gz
```

## Build Source

This build was generated from:
- Source: `/src` directory (Vite/React)
- Build command: `pnpm build`
- Output: Originally in `/dist`, now copied here

---

**Replaced:** 2025-11-07 01:57 UTC  
**Reason:** Consolidate to single Vite/React build  
**Backup:** nextjs-site-backup-20251107-015627.tar.gz (167MB)
