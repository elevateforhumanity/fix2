# Public Site Verification Checklist

## 🚨 CRITICAL: Vercel Deployment Status

**Action Required:** Check Vercel dashboard to ensure deployment is successful.

Latest commits pushed:
- `f157feaf` - Trigger Vercel rebuild with cleared cache
- `050de4d3` - Fix About, Contact, and Demos pages
- `11e677ab` - Add final verification documentation
- `9123f612` - Final quality fix: restore hero improvements

## ✅ What Should Be Live on Public Site

### Homepage (/)
- [x] Hero image: `/images/efh/hero/hero-main.jpg`
- [x] Light overlay: `white/70` (not dark)
- [x] Brightness filter: `brightness-110`
- [x] Headline: "Career training that works." (text-8xl)
- [x] Tagline: "WIOA-approved programs. Real careers."
- [x] Left-aligned layout
- [x] Dark text on light background (slate-900)
- [x] Clean buttons (rounded-md)
- [x] Pure white background
- [x] Generous spacing (py-32)

### About Page (/about)
- [x] Hero image: `/images/efh/hero/hero-main.jpg`
- [x] Light overlay: `white/80`
- [x] Brightness filter: `brightness-110`
- [x] Headline: "About Elevate" (text-8xl)
- [x] Tagline: "Connecting people to free workforce training"
- [x] Left-aligned layout
- [x] Height: 500px

### Contact Page (/contact)
- [x] No blue gradient
- [x] Pure white background
- [x] Headline: "Get in touch" (text-8xl)
- [x] Tagline: "We're here to help you start your career journey."
- [x] Left-aligned layout
- [x] Clean buttons

### Demos Page (/demos)
- [x] No blue gradient
- [x] Pure white background
- [x] Headline: "Platform demos" (text-8xl)
- [x] Tagline: "See how our workforce training platform works."
- [x] Left-aligned layout
- [x] Clean buttons

### Programs Pages (/programs/*)
- [x] All 6 programs using HD images from `/media/programs/`
- [x] HVAC: hvac-hd.jpg
- [x] Barber: barber-hd.jpg
- [x] CNA: cna-hd.jpg
- [x] Building Tech: building-tech-hd.jpg
- [x] CDL: cdl-hd.jpg
- [x] Career Readiness: multi-training-programs-optimized.jpg
- [x] Indiana Career Connect CTAs
- [x] WorkOne appointment links
- [x] Dynamic routing working (no static folders)

## ❌ What Should NOT Be on Public Site

### Old/Wrong Elements:
- ❌ Dark overlays (slate-900/90, black/60)
- ❌ Blue gradient backgrounds (from-blue-600 to-blue-800)
- ❌ Old image paths (/images/artlist/hero-training-*.jpg)
- ❌ Center-aligned hero text
- ❌ Small headlines (text-5xl or text-6xl)
- ❌ Long, wordy copy
- ❌ Rounded-full buttons
- ❌ Slate-50 backgrounds
- ❌ Duplicate "Featured Programs" section
- ❌ Static program folders (32 removed)

## 🔍 How to Verify

### 1. Check Vercel Dashboard
- Go to Vercel dashboard
- Find your project
- Check latest deployment status
- Ensure it says "Ready" not "Building" or "Error"

### 2. Visit Public URL
- Open your production URL in incognito/private window
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check each page listed above

### 3. Visual Checks
- **Brightness:** All hero images should be bright, not dark
- **Text:** All hero text should be dark (slate-900) on light background
- **Headlines:** Should be HUGE (text-8xl)
- **Copy:** Should be short and punchy
- **Backgrounds:** Should be pure white, not gray
- **Buttons:** Should be rounded-md, not rounded-full

### 4. Mobile Check
- Test on mobile device
- Ensure responsive design works
- Check images load correctly
- Verify text is readable

## 🚨 If Site Still Looks Wrong

### Possible Issues:

1. **Vercel Build Failed**
   - Check Vercel dashboard for errors
   - Look for environment variable issues
   - Check build logs

2. **CDN Cache Not Cleared**
   - Vercel should auto-clear on deploy
   - May take 1-2 minutes to propagate
   - Try hard refresh in browser

3. **Browser Cache**
   - Clear browser cache
   - Use incognito/private window
   - Try different browser

4. **Deployment Not Complete**
   - Wait for Vercel to finish deploying
   - Check deployment status
   - Look for "Ready" status

## 📝 Environment Variables Required

Your Vercel project needs these set:

### Critical:
- `NEXT_PUBLIC_SITE_URL` - Your production URL
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

### Optional (for full functionality):
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `ADMIN_DASHBOARD_PASSWORD`

## 🎯 Expected Result

After successful deployment, your public site should:
- ✅ Look clean, bright, and professional
- ✅ Match Industrious quality standards
- ✅ Have HUGE headlines
- ✅ Use short, punchy copy
- ✅ Display HD images with light overlays
- ✅ Have pure white backgrounds
- ✅ Show left-aligned hero sections
- ✅ Use consistent styling throughout

## 📊 Quality Score Target

- Homepage: 90%+ match with Industrious
- About: 90%+ match
- Contact: 90%+ match
- Demos: 90%+ match
- Programs: 95%+ match

## 🔧 If You See Issues

1. **Check Vercel deployment logs**
2. **Verify environment variables are set**
3. **Wait 2-3 minutes for CDN propagation**
4. **Hard refresh browser (Ctrl+Shift+R)**
5. **Try incognito/private window**
6. **Check different device/browser**

## 📞 Next Steps

1. Check Vercel dashboard now
2. Wait for deployment to complete
3. Visit public URL in incognito window
4. Verify all pages look correct
5. Test on mobile device
6. Report any remaining issues

---

**Last Updated:** After commit `f157feaf`
**Status:** Waiting for Vercel deployment
**Expected:** All changes should be live within 2-3 minutes
