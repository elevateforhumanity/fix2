# 🚀 DEPLOY NOW - Replace Next.js with Vite/React

**Site**: elevateforhumanityfix.netlify.app  
**Custom Domain**: portal.elevateforhumanity.org  
**Current Issue**: Still serving old Next.js build  
**Solution**: Deploy the Vite/React app immediately

---

## ⚡ Option A: One-Command Deploy (Recommended)

**Requirements**: NETLIFY_AUTH_TOKEN

```bash
# Set your token
export NETLIFY_AUTH_TOKEN=<your-token>

# Deploy immediately
bash scripts/deploy-now-direct.sh
```

**What it does:**
1. ✅ Installs Netlify CLI
2. ✅ Installs dependencies (npm/pnpm)
3. ✅ Builds Vite/React app → `dist/`
4. ✅ Deploys to production
5. ✅ Verifies deployment
6. ✅ Tests routes

**Time**: 2-3 minutes

---

## 🖱️ Option B: Manual Deploy (No Token Needed)

### Step 1: Build Locally

```bash
cd /workspaces/fix2
npm install
npm run build
```

**Verify**: Check that `dist/index.html` exists

### Step 2: Deploy via Netlify Dashboard

1. **Go to**: https://app.netlify.com/sites/elevateforhumanityfix/deploys

2. **Drag and drop** the `dist/` folder onto the deploy area

3. **Wait 30 seconds** for "Published" status

4. **Done!** Site is live

**Time**: 2 minutes

---

## 🔍 Verify Deployment Worked

### Check 1: No More Next.js

```bash
curl -s https://elevateforhumanityfix.netlify.app/ | grep -E "_next/static|/assets"
```

**Expected**: Should see `/assets/` (Vite), NOT `/_next/static` (Next.js)

### Check 2: Routes Work

```bash
curl -I https://elevateforhumanityfix.netlify.app/support
```

**Expected**: `HTTP/2 200` (not 404)

### Check 3: SPA Routing Active

```bash
curl -I https://elevateforhumanityfix.netlify.app/programs/barber
```

**Expected**: `HTTP/2 200` (deep links work)

---

## ⚙️ Netlify Configuration Checklist

### Build Settings

Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/deploys

Verify:
- ✅ **Build command**: `npm run build` (or `pnpm run build`)
- ✅ **Publish directory**: `dist`
- ✅ **Node version**: 20.11.1 (set in netlify.toml)

### Environment Variables

Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/env

Add these (if not already set):
```bash
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_API_URL=https://api.elevateforhumanity.org
VITE_STRIPE_PUBLISHABLE_KEY=<your-key>
```

**After adding**: Trigger another deploy to bake them in

### SPA Redirect

Verify `public/_redirects` exists:
```
/*    /index.html   200
```

✅ Already in place

---

## 🌐 Custom Domain Setup

### Current Status
- **Netlify URL**: https://elevateforhumanityfix.netlify.app
- **Custom Domain**: portal.elevateforhumanity.org (pending DNS)

### Setup Steps

**In Netlify**:
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain
2. Click "Add custom domain"
3. Enter: `portal.elevateforhumanity.org`
4. Click "Verify"

**In Cloudflare DNS**:
1. Go to: https://dash.cloudflare.com
2. Select: `elevateforhumanity.org`
3. Add DNS record:
   - **Type**: CNAME
   - **Name**: portal
   - **Target**: elevateforhumanityfix.netlify.app
   - **TTL**: 3600
   - **Proxy**: OFF (gray cloud)
4. Save

**Wait**: 5-10 minutes for DNS propagation

**Verify**:
```bash
dig portal.elevateforhumanity.org
```

---

## 🚨 Troubleshooting

### Still Seeing Next.js After Deploy?

**Cause**: CDN cache or browser cache

**Fix**:
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys
2. Click "Trigger deploy" → "Clear cache and deploy site"
3. Hard refresh browser: `Cmd/Ctrl + Shift + R`

### Routes Still 404?

**Cause**: `_redirects` file not copied or wrong publish directory

**Fix**:
1. Check build logs for "Copied _redirects"
2. Verify publish directory is `dist` (not `.next`)
3. Redeploy

### Wrong Site on Custom Domain?

**Cause**: Custom domain attached to old Next.js site

**Fix**:
1. Remove domain from old site
2. Add domain to new Vite/React site
3. Wait for DNS propagation

### Build Fails?

**Cause**: Missing dependencies or build errors

**Fix**:
1. Test locally: `npm run build`
2. Check `package.json` for all dependencies
3. Verify Node version: 20.11.1
4. Check build logs for specific errors

---

## 📊 Expected Results

### After Successful Deploy

**All routes return 200 OK:**
- ✅ `/` - Homepage
- ✅ `/programs` - Programs listing
- ✅ `/about` - About page
- ✅ `/support` - Support page
- ✅ `/community` - Community page
- ✅ `/connect` - Connect page
- ✅ `/lms` - Learning Management System
- ✅ `/certificates` - Certificates
- ✅ `/programs/barber` - Deep link example

**Technical Indicators:**
- ✅ HTML contains `/assets/` (Vite bundles)
- ✅ No `/_next/static` references
- ✅ `cache-status: "Netlify Edge"` (not "Next.js")
- ✅ Custom 404 page for invalid routes
- ✅ Security headers present

---

## 🎯 Quick Deploy Commands

### Full Automated Deploy
```bash
export NETLIFY_AUTH_TOKEN=<token>
bash scripts/deploy-now-direct.sh
```

### Build Only
```bash
npm install && npm run build
```

### Deploy Only (after build)
```bash
netlify deploy --prod --dir=dist --site=12f120ab-3f63-419b-bc49-430f043415c1
```

### Verify After Deploy
```bash
bash scripts/verify-deployment.sh https://elevateforhumanityfix.netlify.app
```

---

## 📝 Site Details

**Netlify Site ID**: `12f120ab-3f63-419b-bc49-430f043415c1`  
**Netlify Site Name**: `elevateforhumanityfix`  
**Primary URL**: https://elevateforhumanityfix.netlify.app  
**Custom Domain**: https://portal.elevateforhumanity.org  
**Framework**: Vite + React  
**Build Output**: `dist/`  
**Node Version**: 20.11.1

---

## ✅ Deployment Checklist

Before deploying:
- [x] Configuration files updated (vite.config.js, netlify.toml)
- [x] SPA redirect configured (public/_redirects)
- [x] Custom 404 page created
- [x] Security headers consolidated
- [x] Build command verified
- [x] Publish directory set to `dist`

After deploying:
- [ ] Verify Vite build (not Next.js)
- [ ] Test all routes return 200
- [ ] Check security headers
- [ ] Set environment variables
- [ ] Configure custom domain
- [ ] Test on multiple devices

---

**Ready to deploy? Run:**

```bash
export NETLIFY_AUTH_TOKEN=<your-token>
bash scripts/deploy-now-direct.sh
```

**Or manually drag `dist/` folder to Netlify dashboard.**

---

**Status**: ⏳ Ready to deploy  
**Action Required**: Run deployment script or manual deploy  
**ETA**: 2-3 minutes to live site
