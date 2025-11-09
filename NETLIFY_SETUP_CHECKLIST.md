# 🔧 Netlify Setup Checklist

**Site**: elevateforhumanityfix  
**Dashboard**: https://app.netlify.com/sites/elevateforhumanityfix

---

## ✅ Required Settings

### 1. Build & Deploy Settings

Go to: **Site settings → Build & deploy → Build settings**

```
Build command: pnpm install --frozen-lockfile && pnpm build
Publish directory: dist
Base directory: (leave empty)
```

### 2. Environment Variables

Go to: **Site settings → Environment variables**

**Required:**

```bash
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
VITE_API_URL=https://api.elevateforhumanity.org
VITE_SITE_URL=https://elevateforhumanityfix.netlify.app
NODE_ENV=production
```

**Optional:**

```bash
VITE_ENABLE_AUTOPILOT=true
VITE_GA_MEASUREMENT_ID=G-EFHWORKFORCE01
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXX
```

⚠️ **Important**: Set scope to "Production" for all variables

### 3. Node Version

Go to: **Site settings → Build & deploy → Environment**

```
Node version: 20
```

Or it's set in `netlify.toml` (already configured)

---

## 🔍 Troubleshooting Guide

### Issue: Blank White Page

**Cause**: Missing SPA redirects or wrong publish directory

**Fix**:

1. Verify `netlify.toml` has the redirect rule (✅ already added)
2. Check publish directory is `dist` (not `build` or `.next`)
3. Clear cache and redeploy

### Issue: 404 on Routes

**Cause**: SPA redirect not working

**Fix**:

1. Ensure `netlify.toml` exists in repo root (✅ done)
2. Verify redirect rule: `/* → /index.html` (✅ configured)
3. Redeploy

### Issue: Styles Missing / Design Wrong

**Cause**: Assets not found (wrong base or publish dir)

**Fix**:

1. Check `vite.config.js` has `base: '/'` (✅ correct)
2. Verify publish directory is `dist` (✅ set)
3. Clear cache: **Deploys → Trigger deploy → Clear cache and deploy site**

### Issue: Build Fails - "pnpm not found"

**Cause**: Node/pnpm version not set

**Fix**:

1. Check `netlify.toml` has `PNPM_VERSION` (✅ set to 9.7.0)
2. Check `NODE_VERSION` is set (✅ set to 20)
3. Redeploy

### Issue: Build Fails - Environment Variable Errors

**Cause**: Missing Vite environment variables

**Fix**:

1. Go to **Site settings → Environment variables**
2. Add all `VITE_*` variables listed above
3. Set scope to "Production"
4. Redeploy

### Issue: Build Succeeds but Site Shows Old Version

**Cause**: CDN cache

**Fix**:

1. **Deploys → Trigger deploy → Clear cache and deploy site**
2. Wait 60 seconds
3. Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`

---

## 🚀 Force Fresh Deployment

### Method 1: Netlify Dashboard (Easiest)

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys
2. Click: **Trigger deploy**
3. Select: **Clear cache and deploy site**
4. Wait 2-3 minutes

### Method 2: CLI (If Authenticated)

```bash
# Run the script
./force-netlify-deploy.sh
```

Or manually:

```bash
netlify login
pnpm build
netlify deploy --prod --dir=dist
```

### Method 3: Git Push (Automatic)

```bash
# Any push to main triggers deployment
git commit --allow-empty -m "trigger deployment"
git push origin main
```

---

## 📋 Build Log Checklist

When checking **Deploys → Latest deploy → Deploy log**, look for:

### ✅ Good Signs

```
✓ Installing pnpm
✓ Installing dependencies
✓ Building Vite project
✓ dist directory created
✓ Site is live
```

### ❌ Red Flags

```
✗ Command 'pnpm' not found → Fix: Set PNPM_VERSION in netlify.toml
✗ VITE_SUPABASE_URL is not defined → Fix: Add environment variables
✗ Build failed → Check error message for specific issue
✗ No publish directory found → Fix: Verify publish = "dist"
```

---

## 🔧 Current Configuration

### netlify.toml (✅ Configured)

```toml
[build]
  command = "pnpm install --frozen-lockfile && pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--version"
  PNPM_VERSION = "9.7.0"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### vite.config.js (✅ Correct)

```javascript
base: '/'; // ✅ Default, no subpath
```

### package.json (✅ Correct)

```json
"scripts": {
  "build": "node scripts/check-env.js && vite build"
}
```

---

## 🎯 Quick Fix Steps

If site is not showing correctly:

1. **Clear Cache Deploy**
   - Deploys → Trigger deploy → Clear cache and deploy site

2. **Check Environment Variables**
   - Site settings → Environment variables
   - Ensure all `VITE_*` variables are set

3. **Verify Build Settings**
   - Build command: `pnpm install --frozen-lockfile && pnpm build`
   - Publish directory: `dist`

4. **Check Latest Deploy Log**
   - Look for first red error line
   - Fix that specific issue

5. **Hard Refresh Browser**
   - `Ctrl+Shift+R` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

---

## 📊 Expected Build Output

### Successful Build Log Should Show:

```
1. Installing pnpm 9.7.0
2. Running: pnpm install --frozen-lockfile
3. Packages: +1726
4. Running: pnpm build
5. vite v7.1.12 building for production...
6. ✓ 2799 modules transformed
7. dist/index.html created
8. dist/assets/* created
9. Site is live ✨
```

### Build Time

- **Expected**: 2-3 minutes
- **If longer**: Check for dependency issues

### Output Size

- **dist/ folder**: ~10-15 MB
- **Compressed**: ~3-5 MB served via CDN

---

## 🌐 Verification After Deploy

### Check These URLs (All Should Return 200)

```bash
# Homepage
curl -I https://elevateforhumanityfix.netlify.app/

# LMS
curl -I https://elevateforhumanityfix.netlify.app/lms

# Deep link
curl -I https://elevateforhumanityfix.netlify.app/programs/barber

# Widget
curl -I https://elevateforhumanityfix.netlify.app/embed/lms-widget.js
```

### Check Build Type

```bash
curl -s https://elevateforhumanityfix.netlify.app | grep -E "assets/|_next/"
```

**Expected**: Should only show `/assets/` (Vite), NOT `/_next/` (Next.js)

---

## 🆘 Still Having Issues?

### Get the Error Message

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys
2. Click latest deploy
3. Scroll to first **red error line** in log
4. Copy that line

### Common Error Messages & Fixes

| Error                              | Fix                                    |
| ---------------------------------- | -------------------------------------- |
| `Command 'pnpm' not found`         | Add `PNPM_VERSION` to netlify.toml     |
| `VITE_SUPABASE_URL is not defined` | Add environment variables              |
| `No publish directory found`       | Set publish to `dist`                  |
| `Build command failed`             | Check build runs locally: `pnpm build` |
| `Module not found`                 | Run `pnpm install` locally first       |

---

## ✅ Final Checklist

Before considering deployment complete:

- [ ] `netlify.toml` exists in repo root
- [ ] Build command includes `pnpm install --frozen-lockfile && pnpm build`
- [ ] Publish directory set to `dist`
- [ ] All `VITE_*` environment variables added
- [ ] Node version set to 20
- [ ] SPA redirect configured (`/* → /index.html`)
- [ ] Latest deploy shows "Published"
- [ ] Site loads at https://elevateforhumanityfix.netlify.app
- [ ] All routes return 200 (not 404)
- [ ] Styles and design show correctly
- [ ] Widget script accessible

---

## 📞 Support

- **Netlify Docs**: https://docs.netlify.com
- **Netlify Support**: https://answers.netlify.com
- **Build Issues**: Check deploy log for specific error
- **Site Issues**: Clear cache and redeploy

---

**Current Status**: ✅ Configuration files updated and pushed  
**Next Action**: Netlify will auto-deploy in 2-3 minutes  
**Monitor**: https://app.netlify.com/sites/elevateforhumanityfix/deploys

🚀 **Deployment in progress!**
