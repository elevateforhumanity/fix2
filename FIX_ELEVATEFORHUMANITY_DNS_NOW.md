# FIX www.elevateforhumanity.org DNS - IMMEDIATE ACTION REQUIRED

**Date:** 2025-11-15  
**Issue:** Domain incorrectly pointed to Cloudflare  
**Impact:** Site is DOWN (SSL handshake failure)  
**Solution:** Remove from Cloudflare, point to Durablesites.co

---

## 🚨 WHAT WENT WRONG

The domain **www.elevateforhumanity.org** was added to Cloudflare (likely during Cloudflare Workers setup) and the nameservers were changed. This broke the Durablesites.co marketing site.

**Current (BROKEN) State:**

```
Domain: elevateforhumanity.org
Nameservers: Cloudflare nameservers
DNS: Points to websites.durablesites.com (CNAME)
SSL: Handshake failure ❌
Result: Site completely DOWN
```

**Correct State Should Be:**

```
Domain: elevateforhumanity.org
Nameservers: Domain registrar default OR Durablesites nameservers
DNS: Managed by Durablesites.co
SSL: Provided by Durablesites.co ✅
Result: Site works perfectly
```

---

## ✅ IMMEDIATE FIX (3 Steps)

### Step 1: Remove Site from Cloudflare

1. **Login to Cloudflare:**
   - Go to: https://dash.cloudflare.com
   - Login with your credentials

2. **Select Domain:**
   - Click on: **elevateforhumanity.org**

3. **Remove Site:**
   - Scroll to bottom of Overview page
   - Click: **"Remove Site from Cloudflare"**
   - Confirm removal

**This will:**

- Remove Cloudflare DNS management
- Stop Cloudflare from intercepting traffic
- Allow direct connection to Durablesites.co

---

### Step 2: Update Nameservers at Domain Registrar

**Find Your Domain Registrar:**

Check where elevateforhumanity.org is registered:

- GoDaddy
- Namecheap
- Google Domains
- Cloudflare Registrar
- Other

**Login to Registrar:**

1. Go to your domain registrar's website
2. Login to your account
3. Find: elevateforhumanity.org
4. Go to: DNS Settings or Nameservers

**Change Nameservers:**

**Option A: Use Durablesites Nameservers (Recommended)**

Login to Durablesites.co and get their nameservers, then set:

```
Nameserver 1: [Get from Durablesites]
Nameserver 2: [Get from Durablesites]
```

**Option B: Use Registrar Default Nameservers**

Remove Cloudflare nameservers and use registrar's default:

```
Remove: xxx.ns.cloudflare.com
Remove: yyy.ns.cloudflare.com
Use: Registrar's default nameservers
```

**Save Changes**

---

### Step 3: Configure DNS at Durablesites.co

1. **Login to Durablesites.co:**
   - Go to: https://durablesites.co
   - Login to your account

2. **Find Domain Settings:**
   - Look for your site
   - Go to: Domain or DNS settings

3. **Connect Custom Domain:**
   - Add: elevateforhumanity.org
   - Add: www.elevateforhumanity.org
   - Follow Durablesites instructions

4. **Verify SSL:**
   - Durablesites should automatically provision SSL
   - Wait 5-10 minutes for SSL certificate

---

## 🔍 Verification Steps

### After Making Changes:

**Wait 1-2 hours for DNS propagation**

Then test:

1. **Check DNS:**

   ```bash
   # Should NOT show Cloudflare IPs
   nslookup www.elevateforhumanity.org
   ```

2. **Test HTTPS:**

   ```bash
   curl -I https://www.elevateforhumanity.org
   # Should return: HTTP/1.1 200 OK
   ```

3. **Test in Browser:**
   - Visit: https://www.elevateforhumanity.org
   - Should load without errors
   - Check SSL certificate (should be from Durablesites or Let's Encrypt)

4. **Check SSL Certificate:**
   - Go to: https://www.ssllabs.com/ssltest/analyze.html?d=www.elevateforhumanity.org
   - Should show valid certificate
   - Grade should be A or B

---

## 📋 Alternative: Quick Fix (If You Can't Remove from Cloudflare)

**If you need the site working NOW and can't remove from Cloudflare:**

### Temporary Workaround:

1. **Login to Cloudflare:**
   - Go to: https://dash.cloudflare.com
   - Select: elevateforhumanity.org

2. **Change SSL Mode:**
   - Go to: SSL/TLS → Overview
   - Change to: **Flexible**
   - Save

3. **Test:**
   - Wait 1-2 minutes
   - Visit: https://www.elevateforhumanity.org
   - Should now load ✅

⚠️ **Warning:** This is NOT the proper fix. You should still remove the site from Cloudflare and point directly to Durablesites.co.

---

## 🎯 Why This Happened

**Root Cause:**

During Cloudflare Workers setup (for enrollment form injection), the domain was added to Cloudflare. This changed the nameservers from the registrar/Durablesites to Cloudflare.

**The Problem:**

- Cloudflare expects SSL on the origin server
- Durablesites.co has SSL, but Cloudflare can't complete handshake
- This is because the DNS is misconfigured

**The Solution:**

- Remove domain from Cloudflare entirely
- Point directly to Durablesites.co
- Let Durablesites manage DNS and SSL

---

## 🚫 What NOT to Do

**Don't:**

- ❌ Try to fix SSL in Cloudflare (wrong approach)
- ❌ Add more DNS records in Cloudflare
- ❌ Contact Durablesites support (they can't fix Cloudflare issues)
- ❌ Wait for it to "fix itself" (it won't)

**Do:**

- ✅ Remove site from Cloudflare
- ✅ Change nameservers at registrar
- ✅ Let Durablesites manage DNS
- ✅ Wait for DNS propagation

---

## 📞 Where to Get Help

### Cloudflare Support:

- **Dashboard:** https://dash.cloudflare.com
- **Community:** https://community.cloudflare.com
- **Docs:** https://developers.cloudflare.com

### Durablesites Support:

- **Website:** https://durablesites.co
- **Support:** Check their website for contact info

### Domain Registrar Support:

- Check your registrar's support page
- Usually have live chat or phone support

---

## ✅ Expected Timeline

**Immediate (0-5 minutes):**

- Remove site from Cloudflare
- Change nameservers at registrar

**Short Term (1-2 hours):**

- DNS propagation begins
- Some users can access site

**Complete (24-48 hours):**

- Full DNS propagation worldwide
- All users can access site
- SSL certificate fully active

---

## 🎯 Final Architecture (Correct)

```
DOMAIN REGISTRAR (GoDaddy/Namecheap/etc)
├── Domain: elevateforhumanity.org
├── Nameservers: Durablesites nameservers
└── DNS Management: Delegated to Durablesites

DURABLESITES.CO
├── Hosts: www.elevateforhumanity.org
├── Provides: SSL certificate
├── Manages: DNS records
└── Serves: Marketing website

CLOUDFLARE
├── NOT USED for elevateforhumanity.org
└── (Can be used for other domains if needed)

Elevate for Humanity
├── Domain: www.elevateforhumanity.org
├── Hosted: Vercel (when deployed)
└── Separate from marketing site
```

---

## 📝 Action Checklist

- [ ] Login to Cloudflare dashboard
- [ ] Remove elevateforhumanity.org from Cloudflare
- [ ] Login to domain registrar
- [ ] Change nameservers (remove Cloudflare nameservers)
- [ ] Login to Durablesites.co
- [ ] Configure custom domain
- [ ] Wait for DNS propagation (1-2 hours)
- [ ] Test site loads correctly
- [ ] Verify SSL certificate is valid
- [ ] Check SSL Labs test shows A/B grade
- [ ] Update documentation

---

## 🚀 After Fix is Complete

**Update these files:**

- [ ] Mark ELEVATEFORHUMANITY_ORG_ISSUE.md as RESOLVED
- [ ] Update DEPLOYMENT_STATUS_CURRENT.md
- [ ] Document what was learned
- [ ] Add note to prevent future issues

**Prevent Future Issues:**

- [ ] Document: "Do NOT add elevateforhumanity.org to Cloudflare"
- [ ] Document: "Only elevateforhumanity.org should be on Vercel"
- [ ] Add warning in Cloudflare Workers documentation

---

## 💡 Lessons Learned

**What Happened:**

- Cloudflare Workers setup required adding domain to Cloudflare
- This changed nameservers and broke the marketing site
- Cloudflare SSL mode was incompatible with Durablesites setup

**What to Do Differently:**

- Don't add marketing site domain to Cloudflare
- Use Cloudflare Workers on a different domain if needed
- Keep marketing site (elevateforhumanity.org) on Durablesites
- Keep LMS (elevateforhumanity.org) on Vercel

**Key Takeaway:**

- **Two separate domains = Two separate hosting platforms**
- **Don't mix them!**

---

**Status:** Ready to execute  
**Priority:** CRITICAL - Site is completely down  
**ETA:** 1-2 hours (after nameserver change)  
**Action Required:** Remove from Cloudflare NOW
