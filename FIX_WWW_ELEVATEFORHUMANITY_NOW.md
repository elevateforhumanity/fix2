# FIX www.elevateforhumanity.org NOW

## ❌ PROBLEM IDENTIFIED

**www.elevateforhumanity.org is NOT working** because the DNS is pointing to the wrong place.

### Current INCORRECT Configuration:

```
CNAME  www  elevateproduction.netlify.app  ❌ WRONG
```

This points to the **LMS** (Learning Management System), not the **marketing site**.

### What SHOULD Be Configured:

```
CNAME  www  [Durablesites.co domain]  ✅ CORRECT
```

---

## 🎯 THE FIX

You need to change the DNS for **www.elevateforhumanity.org** to point to **Durablesites.co**, not Netlify.

### Step 1: Get Durablesites.co CNAME Target

1. Log in to your **Durablesites.co** account
2. Go to your site settings/domain settings
3. Look for "Custom Domain" or "Connect Domain"
4. Find the CNAME target (it will look like one of these):
   - `sites.durablesites.co`
   - `[your-site-name].durablesites.co`
   - `proxy.durablesites.co`
   - Or a specific subdomain they provide

### Step 2: Update DNS Records

Go to your DNS provider (where you manage elevateforhumanity.org DNS) and update:

**CHANGE THIS:**

```
Type   Name   Target
CNAME  www    elevateproduction.netlify.app  ❌ DELETE THIS
```

**TO THIS:**

```
Type   Name   Target
CNAME  www    [durablesites-target-from-step-1]  ✅ ADD THIS
```

### Step 3: Verify in Durablesites.co

1. Go back to Durablesites.co
2. Add/verify the custom domain: `www.elevateforhumanity.org`
3. Wait for SSL certificate to provision (5-10 minutes)

---

## 📋 CORRECT DOMAIN ARCHITECTURE

After the fix, your domains should be:

### Marketing Site (Durablesites.co)

```
www.elevateforhumanity.org  →  Durablesites.co  ✅
elevateforhumanity.org      →  Redirect to www  ✅
```

### LMS Platform (Netlify - this repo)

```
www.elevateconnectsdirectory.org  →  elevateproduction.netlify.app  ✅
elevateconnectsdirectory.org      →  Redirect to www                ✅
```

---

## 🔍 WHY THIS HAPPENED

Someone previously changed the DNS to point **both domains** to Netlify:

From `BOTH_DOMAINS_CONFIGURED.md`:

```
### elevateforhumanity.org:
CNAME  www  elevateproduction.netlify.app ✅ CORRECT  ← THIS IS WRONG!
```

This was incorrect. The marketing site should stay on Durablesites.co.

---

## ⚡ QUICK FIX CHECKLIST

- [ ] Log in to Durablesites.co
- [ ] Find the CNAME target for custom domains
- [ ] Log in to DNS provider (GoDaddy/Cloudflare/etc.)
- [ ] Change www CNAME from `elevateproduction.netlify.app` to Durablesites target
- [ ] Save DNS changes
- [ ] Wait 5-15 minutes for propagation
- [ ] Verify www.elevateforhumanity.org loads the marketing site
- [ ] Verify SSL certificate is active (https://)

---

## 🚨 IMPORTANT

**DO NOT** point www.elevateforhumanity.org to Netlify. That's for the LMS only.

**Correct Setup:**

- Marketing site = Durablesites.co = www.elevateforhumanity.org
- LMS Platform = Netlify = www.elevateconnectsdirectory.org

---

## 📞 IF YOU DON'T HAVE DURABLESITES.CO ACCESS

If you don't have access to Durablesites.co or don't have a marketing site there:

### Option A: Use This Repo for Marketing Site Too

Point www.elevateforhumanity.org to Netlify and create marketing pages in this repo:

1. Keep DNS pointing to `elevateproduction.netlify.app`
2. Add www.elevateforhumanity.org as a custom domain in Netlify
3. Create marketing pages in `/app/` directory
4. Use `/lms/` for the LMS portal

### Option B: Create Marketing Site on Durablesites.co

1. Sign up for Durablesites.co
2. Create a marketing site
3. Get the CNAME target
4. Update DNS as described above

---

## ✅ VERIFICATION

After fixing DNS, test:

1. **Marketing Site**: https://www.elevateforhumanity.org
   - Should show: Marketing content, program information
   - Should NOT show: LMS login, course dashboard

2. **LMS Platform**: https://www.elevateconnectsdirectory.org
   - Should show: LMS login, course dashboard, student portal
   - Should NOT show: Marketing content

---

## 🎯 NEXT STEPS AFTER FIX

Once www.elevateforhumanity.org is working:

1. **Submit to Google Search Console**
   - Add property: www.elevateforhumanity.org
   - Verify ownership
   - Submit sitemap

2. **Update Social Media Links**
   - Facebook, LinkedIn, Instagram
   - Point to www.elevateforhumanity.org

3. **Add Cross-Links**
   - Marketing site: "Access LMS" → www.elevateconnectsdirectory.org
   - LMS: "Back to Main Site" → www.elevateforhumanity.org

---

## 📝 SUMMARY

**Problem**: www.elevateforhumanity.org points to Netlify (LMS) instead of Durablesites.co (marketing)

**Solution**: Change DNS CNAME for www to point to Durablesites.co target

**Result**: Marketing site works on www.elevateforhumanity.org, LMS works on www.elevateconnectsdirectory.org

**Time to Fix**: 5-15 minutes (plus DNS propagation)
