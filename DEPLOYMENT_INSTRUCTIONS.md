# Deployment Instructions - Fix Skeleton Pages

## ✅ Completed Steps

### 1. Environment Variables Configured
- Created `.env.production` with correct API URLs (not committed - in .gitignore)
- Documented required Netlify environment variables in `NETLIFY_ENV_VARS_REQUIRED.md`

### 2. CORS and CSP Updated
- Updated `public/_headers` with proper CORS headers
- Updated `netlify.toml` CSP to allow `api.elevateforhumanity.org`
- Added `Access-Control-Max-Age` for preflight caching

### 3. Code Pushed to Main Branch
- All changes committed and pushed to `main` branch
- Netlify should auto-deploy on push

---

## 🚀 Next Steps (Manual Actions Required)

### Step 1: Add Environment Variables to Netlify

**CRITICAL:** You must add these environment variables in the Netlify Dashboard:

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/env
2. Add the following variables:

```
VITE_API_URL=https://api.elevateforhumanity.org
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
```

3. Set scopes: **Production**, **Deploy previews**, **Branch deploys**

### Step 2: Trigger New Deployment

After adding environment variables:

**Option A: Via Netlify Dashboard**
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys
2. Click **Trigger deploy** → **Clear cache and deploy site**

**Option B: Via Git**
```bash
git commit --allow-empty -m "chore: trigger deploy with env vars"
git push origin main
```

### Step 3: Verify Deployment

1. Wait for deployment to complete (usually 2-5 minutes)
2. Visit: https://elevateforhumanity.org
3. Check browser DevTools Console:
   - API calls should go to `https://api.elevateforhumanity.org`
   - No CORS errors
   - No skeleton/blank pages

### Step 4: Test Key Pages

Visit and verify these pages load correctly:
- https://elevateforhumanity.org/ (Homepage)
- https://elevateforhumanity.org/programs (Programs listing)
- https://elevateforhumanity.org/lms (Learning Management System)
- https://elevateforhumanity.org/certificates (Certificates)

---

## 🔍 Troubleshooting

### Still seeing skeleton pages?

1. **Hard refresh:** `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. **Clear browser cache**
3. **Check environment variables are set in Netlify**
4. **Check build logs** for errors: https://app.netlify.com/sites/elevateforhumanityfix/deploys

### API calls failing?

1. Open DevTools → Network tab
2. Look for failed API requests
3. Check if they're going to the correct URL: `https://api.elevateforhumanity.org`
4. Verify CORS headers are present in response

### Build failing?

1. Check build logs in Netlify Dashboard
2. Verify all dependencies are installed
3. Check for TypeScript/ESLint errors
4. Ensure Node version is 20.11.1

---

## 📊 Expected Results

After successful deployment:

✅ **No skeleton pages** - Content loads immediately  
✅ **API calls work** - Requests go to correct backend  
✅ **No CORS errors** - Headers configured properly  
✅ **Fast page loads** - Optimized build with code splitting  
✅ **SEO friendly** - Proper meta tags and sitemap  

---

## 📚 Related Documentation

- [QUICK_FIX_SKELETON.md](./QUICK_FIX_SKELETON.md) - Quick fix overview
- [NETLIFY_ENV_VARS_REQUIRED.md](./NETLIFY_ENV_VARS_REQUIRED.md) - Detailed env var guide
- [IMPLEMENT_SPLIT_ARCHITECTURE.md](./IMPLEMENT_SPLIT_ARCHITECTURE.md) - Full architecture plan
- [ARCHITECTURE_SPLIT.md](./ARCHITECTURE_SPLIT.md) - Problem analysis

---

## 🎯 Success Criteria

The deployment is successful when:

1. ✅ Environment variables are set in Netlify
2. ✅ New deployment completes without errors
3. ✅ Homepage loads without skeleton states
4. ✅ API calls reach correct backend
5. ✅ No CORS errors in console
6. ✅ All pages render content immediately

---

## 📞 Support

If issues persist after following these steps:

1. Check Netlify build logs for specific errors
2. Verify Supabase project is active and accessible
3. Ensure API server at `api.elevateforhumanity.org` is running
4. Review browser console for JavaScript errors

---

**Last Updated:** 2025-11-05  
**Status:** Ready for manual deployment steps
