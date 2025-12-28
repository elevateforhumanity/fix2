# CANONICAL URL FIX - STOP BLINKING/SPLIT DEPLOYMENT

**Date:** 2025-12-28  
**Issue:** Homepage shows different content on different URL variants  
**Root Cause:** Multiple deployment sources or redirect layers

---

## ✅ WHAT WAS FIXED

### 1. Added Vercel Edge Redirect
**File:** `vercel.json`

```json
{
  "source": "/:path*",
  "has": [
    {
      "type": "host",
      "value": "elevateforhumanity.org"
    }
  ],
  "destination": "https://www.elevateforhumanity.org/:path*",
  "permanent": true,
  "statusCode": 308
}
```

**Why:** Ensures apex domain redirects at Vercel edge (fastest)

### 2. Existing Next.js Redirect (Already in place)
**File:** `next.config.mjs`

Already has apex → www redirect in `async redirects()`

**Why:** Application-level fallback

---

## 🎯 CANONICAL URL STRATEGY

**Single Source of Truth:**
```
https://www.elevateforhumanity.org
```

**All variants redirect to canonical:**
- `http://elevateforhumanity.org` → `https://www.elevateforhumanity.org`
- `http://www.elevateforhumanity.org` → `https://www.elevateforhumanity.org`
- `https://elevateforhumanity.org` → `https://www.elevateforhumanity.org`

**Redirect Type:** 308 Permanent (preserves POST requests)

---

## 🔍 VERIFICATION STEPS

### 1. Check Vercel Domain Settings
Go to: https://vercel.com/elevateforhumanity/fix2/settings/domains

**Verify:**
- ✅ `www.elevateforhumanity.org` is set as PRIMARY
- ✅ `elevateforhumanity.org` redirects to www
- ✅ HTTPS is enforced

### 2. Test All URL Variants
```bash
# Should all redirect to https://www.elevateforhumanity.org
curl -I http://elevateforhumanity.org
curl -I http://www.elevateforhumanity.org
curl -I https://elevateforhumanity.org
```

**Expected:** All return `308 Permanent Redirect` to canonical

### 3. Check for Redirect Loops
Open DevTools → Network tab → Load homepage

**Expected:**
- 1 redirect (if on apex)
- 1 document load
- Normal asset loads

**NOT Expected:**
- Multiple document loads
- Repeated redirects
- Flashing/reloading

### 4. Clear Browser Cache
```
Chrome DevTools:
1. Application → Service Workers → Unregister all
2. Application → Storage → Clear site data
3. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
```

---

## ⚠️ CLOUDFLARE CHECK (If Applicable)

**If DNS is on Cloudflare:**

### Disable Conflicting Rules
1. Go to Cloudflare dashboard
2. Check **Page Rules** for elevateforhumanity.org
3. **Disable** any "Always Use HTTPS" or redirect rules
4. Let Vercel handle all redirects

### Why?
Two redirect layers (Cloudflare + Vercel) can cause:
- Redirect loops
- Split deployments
- Blinking/flashing
- Different content on different URLs

**Rule:** Only ONE system should own redirects

---

## 🚀 DEPLOYMENT STATUS

**Commit:** 69c864029  
**Status:** ✅ Deployed to Vercel  
**Canonical:** https://www.elevateforhumanity.org

---

## 📋 POST-DEPLOYMENT CHECKLIST

- [ ] Verify Vercel domain settings (www is primary)
- [ ] Test all URL variants redirect correctly
- [ ] Check for redirect loops in DevTools
- [ ] Clear browser cache and test
- [ ] If using Cloudflare, disable conflicting rules
- [ ] Monitor for 24 hours to confirm no blinking

---

## 🔧 IF STILL BLINKING AFTER THIS

### Check These:

1. **Service Worker**
   - Unregister all service workers
   - Clear cache
   - Hard refresh

2. **Multiple Vercel Projects**
   - Ensure only ONE project is connected to domain
   - Check for old/duplicate deployments

3. **DNS Propagation**
   - Wait 24-48 hours for DNS to fully propagate
   - Use https://dnschecker.org to verify

4. **Cloudflare Proxy**
   - If orange cloud is on, try turning it off temporarily
   - Or ensure Cloudflare SSL is "Full (strict)"

---

## 📊 EXPECTED BEHAVIOR

**Before Fix:**
- Different content on apex vs www
- Blinking/flashing on load
- Multiple redirects
- Inconsistent hero banner

**After Fix:**
- Single canonical URL
- One redirect (apex → www)
- Consistent content
- No blinking
- Fast load

---

## ✅ VERIFICATION COMMAND

```bash
# Run this to verify redirects
curl -sI http://elevateforhumanity.org | grep -E "HTTP|Location"
curl -sI https://elevateforhumanity.org | grep -E "HTTP|Location"
curl -sI https://www.elevateforhumanity.org | grep -E "HTTP|Location"
```

**Expected Output:**
```
HTTP/2 308
location: https://www.elevateforhumanity.org/

HTTP/2 308
location: https://www.elevateforhumanity.org/

HTTP/2 200
```

---

**End of Fix Documentation**
