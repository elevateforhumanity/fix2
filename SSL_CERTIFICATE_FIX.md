# SSL Certificate Error Fix Guide
## www.elevateforhumanity.org HSTS Issue

**Date:** November 10, 2025  
**Issue:** SSL certificate mismatch causing HSTS error  
**Severity:** 🔴 **CRITICAL** - Site is inaccessible

---

## 🔍 Root Cause Analysis

### What's Happening

**The Problem:**
```
www.elevateforhumanity.org is pointing to Netlify (elevateforhumanityfix2.netlify.app)
BUT the SSL certificate is for *.netlify.app, NOT www.elevateforhumanity.org
```

**DNS Configuration Found:**
```bash
www.elevateforhumanity.org → elevateforhumanityfix2.netlify.app
Certificate: CN=*.netlify.app (WRONG)
Expected: CN=www.elevateforhumanity.org or *.elevateforhumanity.org
```

**Why HSTS Makes It Worse:**
- The domain has HSTS enabled (`max-age=15552000; includeSubDomains`)
- Chrome remembers "this domain MUST use valid HTTPS"
- When certificate is invalid, Chrome blocks access completely
- No bypass option due to HSTS policy

---

## 🎯 Current Domain Setup

### What's Working ✅

**elevateforhumanity.org (apex domain)**
- ✅ SSL Certificate: Valid (Google Trust Services)
- ✅ Server: Cloudflare
- ✅ Status: Working correctly
- ✅ Hosting: Durable.co (Next.js marketing site)

### What's Broken ❌

**www.elevateforhumanity.org (www subdomain)**
- ❌ Points to: elevateforhumanityfix2.netlify.app
- ❌ SSL Certificate: *.netlify.app (MISMATCH)
- ❌ Status: SSL error, inaccessible
- ❌ HSTS: Enforced, no bypass

**elevateforhumanityfix2.netlify.app**
- ⚠️ SSL Certificate: Valid for *.netlify.app
- ⚠️ Status: 404 error (no deployment)
- ⚠️ Issue: Site not deployed or wrong site name

---

## 🚨 Critical Issues Found

### Issue 1: Wrong DNS Configuration
**www.elevateforhumanity.org** is pointing to Netlify, but should point to the same place as the apex domain (Durable.co/Cloudflare).

### Issue 2: SSL Certificate Not Configured
Netlify doesn't have a custom SSL certificate for www.elevateforhumanity.org.

### Issue 3: Site Not Deployed
Both Netlify sites return 404:
- elevateforhumanityfix.netlify.app → 404
- elevateforhumanityfix2.netlify.app → 404

### Issue 4: HSTS Prevents Access
HSTS policy prevents browser from accessing site with invalid certificate.

---

## 🔧 Solution Options

### Option 1: Fix www Subdomain (RECOMMENDED - 15 minutes)

**Goal:** Make www.elevateforhumanity.org work like elevateforhumanity.org

**Steps:**

#### A. Update DNS Configuration

1. **Login to your DNS provider** (where elevateforhumanity.org is registered)
   - Likely Cloudflare based on the apex domain

2. **Find the www CNAME record**
   ```
   Current: www → elevateforhumanityfix2.netlify.app
   ```

3. **Delete or update the www record**
   
   **Option A: Redirect www to apex (simplest)**
   ```
   Type: CNAME
   Name: www
   Target: elevateforhumanity.org
   Proxy: ON (orange cloud in Cloudflare)
   ```
   
   **Option B: Point to same hosting as apex**
   - Check where elevateforhumanity.org points
   - Make www point to the same place

4. **Save changes**
   - DNS propagation: 5-60 minutes
   - Clear browser cache or use incognito mode

#### B. Clear HSTS Cache (User Side)

**Chrome:**
1. Go to: `chrome://net-internals/#hsts`
2. Under "Delete domain security policies"
3. Enter: `elevateforhumanity.org`
4. Click "Delete"
5. Also delete: `www.elevateforhumanity.org`

**Firefox:**
1. Close all Firefox windows
2. Delete file: `SiteSecurityServiceState.txt`
   - Windows: `%APPDATA%\Mozilla\Firefox\Profiles\`
   - Mac: `~/Library/Application Support/Firefox/Profiles/`
   - Linux: `~/.mozilla/firefox/`

**Safari:**
1. Clear all website data
2. Restart Safari

---

### Option 2: Fix Netlify Deployment (If you want Netlify for www)

**Goal:** Make www.elevateforhumanity.org work with Netlify

**Steps:**

#### A. Add Custom Domain in Netlify

1. **Login to Netlify:** https://app.netlify.com
2. **Find your site:** elevateforhumanityfix2 (or create new)
3. **Go to:** Site settings → Domain management
4. **Click:** "Add custom domain"
5. **Enter:** `www.elevateforhumanity.org`
6. **Click:** "Verify"

#### B. Configure DNS

Netlify will show you what DNS records to add:
```
Type: CNAME
Name: www
Target: elevateforhumanityfix2.netlify.app
```

**Important:** If using Cloudflare:
- Turn OFF proxy (gray cloud, not orange)
- Or use Cloudflare's "Full (strict)" SSL mode

#### C. Wait for SSL Certificate

1. Netlify will auto-provision Let's Encrypt certificate
2. Usually takes 1-5 minutes
3. Check status in Netlify: Domain settings → HTTPS

#### D. Deploy Your Site

The Netlify site is returning 404, so you need to deploy:

```bash
# In this repository
pnpm install
pnpm build

# Deploy to Netlify
# Option 1: Use Netlify CLI
netlify deploy --prod

# Option 2: Push to GitHub
# Netlify will auto-deploy if connected
git add .
git commit -m "Deploy site"
git push
```

---

### Option 3: Consolidate Everything (BEST LONG-TERM)

**Goal:** One hosting platform for everything

**Recommended Setup:**

```
elevateforhumanity.org → Durable.co (marketing site)
www.elevateforhumanity.org → Redirect to apex
app.elevateforhumanity.org → Netlify (React LMS)
portal.elevateforhumanity.org → Netlify (React LMS)
```

**Benefits:**
- ✅ Clear separation of concerns
- ✅ Professional subdomains
- ✅ No SSL conflicts
- ✅ Easy to manage

**Steps:**

1. **Keep apex domain on Durable.co**
   - elevateforhumanity.org stays as-is

2. **Redirect www to apex**
   ```
   Type: CNAME
   Name: www
   Target: elevateforhumanity.org
   Proxy: ON (Cloudflare)
   ```

3. **Deploy React app to subdomain**
   ```
   Type: CNAME
   Name: app (or portal)
   Target: elevateforhumanityfix2.netlify.app
   Proxy: OFF (Cloudflare)
   ```

4. **Add custom domain in Netlify**
   - Add: app.elevateforhumanity.org
   - Wait for SSL certificate
   - Deploy site

---

## 🚀 Quick Fix (5 Minutes)

**If you just want www to work NOW:**

### Step 1: Update DNS

**In Cloudflare (or your DNS provider):**

```
Type: CNAME
Name: www
Target: elevateforhumanity.org
Proxy: ON (orange cloud)
TTL: Auto
```

### Step 2: Clear HSTS in Chrome

1. Go to: `chrome://net-internals/#hsts`
2. Delete: `www.elevateforhumanity.org`
3. Delete: `elevateforhumanity.org`

### Step 3: Test

1. Wait 2-3 minutes for DNS
2. Open incognito window
3. Visit: https://www.elevateforhumanity.org
4. Should redirect to https://elevateforhumanity.org

---

## 🔍 Verification Commands

**Check DNS:**
```bash
# Check what www points to
getent hosts www.elevateforhumanity.org

# Should show same IP as apex domain
getent hosts elevateforhumanity.org
```

**Check SSL Certificate:**
```bash
# Check www certificate
openssl s_client -connect www.elevateforhumanity.org:443 -servername www.elevateforhumanity.org 2>&1 | grep "subject\|issuer"

# Should match apex domain certificate
openssl s_client -connect elevateforhumanity.org:443 -servername elevateforhumanity.org 2>&1 | grep "subject\|issuer"
```

**Check HSTS:**
```bash
# Check HSTS header
curl -sI https://www.elevateforhumanity.org | grep -i strict-transport

# Should return valid response, not SSL error
```

---

## 📋 Checklist

### Immediate Actions (Do Now)

- [ ] Identify DNS provider (likely Cloudflare)
- [ ] Login to DNS management
- [ ] Check current www CNAME record
- [ ] Decide: Redirect www to apex OR fix Netlify
- [ ] Update DNS record
- [ ] Clear HSTS cache in browsers
- [ ] Wait 5-10 minutes for DNS propagation
- [ ] Test in incognito window

### If Using Netlify

- [ ] Login to Netlify
- [ ] Add custom domain: www.elevateforhumanity.org
- [ ] Update DNS as instructed by Netlify
- [ ] Wait for SSL certificate (1-5 minutes)
- [ ] Deploy site to Netlify
- [ ] Test deployment

### Verification

- [ ] www.elevateforhumanity.org loads without SSL error
- [ ] Certificate is valid for www.elevateforhumanity.org
- [ ] No HSTS warnings in browser
- [ ] Site content displays correctly

---

## 🆘 If Still Not Working

### Check These:

1. **DNS Propagation**
   ```bash
   # Check if DNS has updated
   getent hosts www.elevateforhumanity.org
   ```
   - If still shows old IP, wait longer (up to 1 hour)

2. **Browser Cache**
   - Use incognito/private window
   - Or clear all browser data

3. **HSTS Cache**
   - Must clear HSTS cache in chrome://net-internals/#hsts
   - Restart browser after clearing

4. **Cloudflare Proxy**
   - If using Cloudflare, check proxy status
   - Orange cloud = proxied (good for redirects)
   - Gray cloud = DNS only (needed for Netlify)

5. **Netlify SSL**
   - Check Netlify dashboard: Domain settings → HTTPS
   - Status should be "Certificate active"
   - If pending, wait up to 24 hours

---

## 📞 Need Help?

### DNS Provider Support

**Cloudflare:**
- Docs: https://developers.cloudflare.com/dns/
- Support: https://support.cloudflare.com

**GoDaddy:**
- Docs: https://www.godaddy.com/help/manage-dns-680
- Support: (480) 505-8877

**Namecheap:**
- Docs: https://www.namecheap.com/support/knowledgebase/category/10/dns-and-nameservers/
- Support: Live chat on website

### Netlify Support

- Docs: https://docs.netlify.com/domains-https/custom-domains/
- Support: https://www.netlify.com/support/
- Community: https://answers.netlify.com

---

## 🎯 Recommended Solution

**Based on your current setup:**

### Best Approach: Redirect www to apex

**Why:**
- ✅ Fastest fix (5 minutes)
- ✅ No SSL certificate issues
- ✅ No Netlify deployment needed
- ✅ Matches current hosting (Durable.co)
- ✅ Standard practice (www → apex)

**How:**
1. Update DNS: www → elevateforhumanity.org (CNAME)
2. Enable Cloudflare proxy (orange cloud)
3. Clear HSTS cache
4. Test in 5 minutes

**Then Later:**
- Deploy React LMS to app.elevateforhumanity.org
- Keep marketing site on apex domain
- Professional subdomain structure

---

## 📊 Current vs. Recommended Setup

### Current (Broken)
```
elevateforhumanity.org → Durable.co ✅
www.elevateforhumanity.org → Netlify (404) ❌
```

### Recommended
```
elevateforhumanity.org → Durable.co (marketing) ✅
www.elevateforhumanity.org → Redirect to apex ✅
app.elevateforhumanity.org → Netlify (React LMS) ✅
```

---

**Fix this now to restore site access. The HSTS policy makes this a critical issue that blocks all users.**

