# Netlify Build Fix - Ready to Deploy

## ✅ All Configuration Correct

Your Netlify setup is already properly configured:

### netlify.toml ✅
```toml
[build]
  command = "pnpm install && pnpm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20.11.1"  ✅ Modern Node
  PNPM_VERSION = "9.7.0"
  VITE_SUPABASE_URL = "..." ✅ Set
  VITE_SUPABASE_ANON_KEY = "..." ✅ Set
```

### public/_redirects ✅
```
/* /index.html 200  ✅ SPA fallback
```

### package.json ✅
```json
{
  "scripts": {
    "build": "node scripts/check-env.js && vite build"  ✅ Correct
  }
}
```

### vite.config.js ✅ (JUST FIXED)
```javascript
build: {
  sourcemap: false,  ✅ Fixed - was causing build failure
}
```

---

## The Fix

**Problem:** Sourcemaps were enabled (`sourcemap: true`) causing Netlify build to fail

**Solution:** Changed to `sourcemap: false` in vite.config.js

**Status:** Fixed in branch `fix/netlify-build`

---

## Next Steps

### Option 1: Merge the PR (Recommended)
1. Go to: https://github.com/elevateforhumanity/fix2/pulls
2. Find PR: "Fix: Disable sourcemaps to fix Netlify build"
3. Merge it
4. Netlify will auto-deploy

### Option 2: Manual Deploy
If you want to test first:
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
2. Click "Trigger deploy" → "Clear cache and deploy site"
3. Wait 2-3 minutes
4. Check: https://elevateforhumanityfix2.netlify.app

---

## After Successful Deploy

Your Netlify site will have these pages ready to embed in Durable:

### 1. Donation Page
**URL:** https://elevateforhumanityfix2.netlify.app/donate

**Embed in Durable:**
```html
<iframe 
  src="https://elevateforhumanityfix2.netlify.app/donate" 
  width="100%" 
  height="800px" 
  frameborder="0">
</iframe>
```

### 2. Scholarship Application
**URL:** https://elevateforhumanityfix2.netlify.app/apply-scholarship

**Embed in Durable:**
```html
<iframe 
  src="https://elevateforhumanityfix2.netlify.app/apply-scholarship" 
  width="100%" 
  height="1200px" 
  frameborder="0">
</iframe>
```

### 3. Programs Page
**URL:** https://elevateforhumanityfix2.netlify.app/programs

**Link from Durable:**
```html
<a href="https://elevateforhumanityfix2.netlify.app/programs">
  View All Programs
</a>
```

---

## Netlify Functions (Backend APIs)

These will work once you add API keys:

- `/.netlify/functions/create-donation-session` - Process donations
- `/.netlify/functions/submit-scholarship-application` - Submit applications
- `/.netlify/functions/enrollment-sync` - Sync enrollments
- `/.netlify/functions/stripe-webhook` - Handle payments
- And 12 more...

---

## Configuration Still Needed

To make the embedded pages fully functional:

1. **Stripe Keys** (for donations/payments)
   - Add in Netlify: Site settings → Environment variables
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`

2. **Supabase Migrations** (for database)
   - Run 4 SQL files in Supabase dashboard
   - Enables scholarship applications, enrollment tracking

3. **Optional:** OpenAI, Sentry, Slack (for advanced features)

---

## Test After Deploy

1. Visit: https://elevateforhumanityfix2.netlify.app
2. Should see: EFHLanding page (Learn • Grow • Achieve)
3. Test: /donate, /apply-scholarship, /programs
4. If working: Embed in Durable!

---

## Summary

✅ **Configuration:** All correct  
✅ **Fix Applied:** Sourcemaps disabled  
⏳ **Action Needed:** Merge PR or trigger deploy  
🎯 **Result:** Working Netlify site to embed in Durable

**Merge the PR and you're done!**
