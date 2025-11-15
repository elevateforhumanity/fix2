# www.elevateforhumanity.org - INCORRECT DNS CONFIGURATION

**Date:** 2025-11-15  
**Status:** ❌ Site Inaccessible  
**Issue:** Domain incorrectly pointed to Cloudflare instead of Durablesites.co

---

## 🔴 Problem Summary

The website **www.elevateforhumanity.org** is currently inaccessible because the DNS is incorrectly configured. The domain is pointing to Cloudflare when it should point directly to Durablesites.co hosting.

### Error Details:

```
curl: (35) OpenSSL/3.0.13: error:0A000410:SSL routines::sslv3 alert handshake failure
```

### What This Means:

- The server is rejecting SSL/TLS connections
- HTTPS is not working
- HTTP redirects to HTTPS (which fails)
- Result: Site is completely inaccessible

---

## 🔍 Technical Details

### DNS Resolution:

```
Domain: www.elevateforhumanity.org
CNAME: websites.durablesites.com
IPv4: 104.18.22.157, 104.18.23.157
IPv6: 2606:4700::6812:169d, 2606:4700::6812:179d
CDN: Cloudflare
```

### HTTP Behavior:

```
HTTP (port 80) → 301 Redirect → HTTPS (port 443)
HTTPS (port 443) → SSL Handshake Failure ❌
```

### Hosting Platform:

- **Platform:** Durablesites.co (website builder)
- **CDN:** Cloudflare
- **Purpose:** Marketing site (not the LMS)

---

## 🎯 Root Cause

### DNS Pointing to Wrong Location

**Problem:** Domain DNS is configured to use Cloudflare nameservers when it should point directly to Durablesites.co

**Current (WRONG) Setup:**

```
www.elevateforhumanity.org
  ↓
Cloudflare CDN (104.18.22.157, 104.18.23.157)
  ↓
websites.durablesites.com (CNAME)
  ↓
SSL Handshake Failure ❌
```

**Correct Setup Should Be:**

```
www.elevateforhumanity.org
  ↓
Direct CNAME to Durablesites.co hosting
  ↓
Durablesites.co serves site with their SSL ✅
```

**Why This Happened:**

- Someone added the domain to Cloudflare
- Cloudflare nameservers were set at domain registrar
- This intercepts traffic before it reaches Durablesites.co
- Cloudflare expects SSL on origin, but can't complete handshake

**Who Can Fix:** Domain administrator with access to domain registrar

---

## ✅ How to Fix

### Option 1: Remove Cloudflare Completely (RECOMMENDED)

**This is the correct fix - the site should NOT be on Cloudflare**

1. **Find Your Domain Registrar:**
   - Check where elevateforhumanity.org is registered
   - Common registrars: GoDaddy, Namecheap, Google Domains, etc.
   - Login to your registrar account

2. **Get Durablesites.co DNS Settings:**
   - Login to Durablesites.co
   - Find DNS/domain settings
   - Look for nameservers or CNAME records they provide
   - Should be something like:
     - CNAME: `websites.durablesites.com`
     - Or specific nameservers from Durablesites

3. **Update DNS at Registrar:**

   **If using CNAME (most common):**

   ```
   Type: CNAME
   Name: www
   Value: websites.durablesites.com (or value from Durablesites)
   TTL: Auto or 3600
   ```

   **If using Nameservers:**
   - Replace Cloudflare nameservers with Durablesites nameservers
   - Remove any Cloudflare nameservers

4. **Remove from Cloudflare:**
   - Login to Cloudflare: https://dash.cloudflare.com
   - Select domain: elevateforhumanity.org
   - Go to Overview
   - Scroll down and click "Remove Site from Cloudflare"
   - Confirm removal

5. **Wait for DNS Propagation:**
   - DNS changes take 1-48 hours to propagate
   - Usually works within 1-2 hours
   - Check status: https://dnschecker.org/#A/www.elevateforhumanity.org

6. **Test:**
   - Visit: https://www.elevateforhumanity.org
   - Should now load with Durablesites.co SSL ✅

### Option 2: Fix Cloudflare SSL Mode (Temporary Workaround)

**Only if you can't remove Cloudflare immediately:**

1. **Login to Cloudflare:**
   - Go to: https://dash.cloudflare.com
   - Select domain: elevateforhumanity.org

2. **Change SSL Mode:**
   - Go to: SSL/TLS → Overview
   - Change to: **Flexible**
   - This bypasses origin SSL requirement

3. **Test:**
   - Wait 1-2 minutes
   - Visit: https://www.elevateforhumanity.org
   - Should now load ✅

⚠️ **Warning:** This is NOT the proper fix. The site should not be on Cloudflare at all.

### Option 3: Get Durablesites.co DNS Information

**If you don't know the correct DNS settings:**

1. **Login to Durablesites.co:**
   - Go to: https://durablesites.co
   - Login to your account

2. **Find Domain Settings:**
   - Look for "Domain" or "DNS" settings
   - Find the section about connecting custom domains
   - Copy the CNAME or nameserver information

3. **Common Durablesites.co Settings:**

   ```
   CNAME: websites.durablesites.com
   OR
   A Record: [IP address provided by Durablesites]
   ```

4. **Contact Support if Needed:**
   - Email: support@durablesites.co
   - Subject: "Need DNS Settings for Custom Domain"
   - Message:

     ```
     Hello,

     I need the correct DNS settings to point my custom domain
     www.elevateforhumanity.org to my Durablesites site.

     What CNAME or A record should I use?

     Thank you!
     ```

---

## 🔍 Verification Steps

### After Fix is Applied:

1. **Test HTTPS:**

   ```bash
   curl -I https://www.elevateforhumanity.org
   # Should return: HTTP/1.1 200 OK
   ```

2. **Test in Browser:**
   - Visit: https://www.elevateforhumanity.org
   - Should load without certificate warnings
   - Check padlock icon in address bar

3. **Check SSL Certificate:**
   - Visit: https://www.ssllabs.com/ssltest/analyze.html?d=www.elevateforhumanity.org
   - Should show valid certificate
   - Grade should be A or B

4. **Test All Pages:**
   - Homepage: https://www.elevateforhumanity.org
   - About: https://www.elevateforhumanity.org/about
   - Programs: https://www.elevateforhumanity.org/programs
   - Contact: https://www.elevateforhumanity.org/contact

---

## 📊 Impact Assessment

### Current Impact:

- ❌ Marketing site completely inaccessible
- ❌ No new visitor traffic
- ❌ No lead generation
- ❌ SEO impact (search engines can't crawl)
- ❌ Brand reputation impact

### Sites NOT Affected:

- ✅ elevateconnectsdirectory.org (LMS) - Different hosting
- ✅ This repository (fix2) - Not deployed yet

### Urgency:

- **Priority:** HIGH
- **Impact:** Complete site outage
- **Recommended Action:** Fix within 24 hours

---

## 🔐 Security Considerations

### Why SSL Matters:

- **Trust:** Browsers show "Not Secure" warning without SSL
- **SEO:** Google penalizes non-HTTPS sites
- **Security:** Protects visitor data in transit
- **Compliance:** Required for payment processing

### Current Security Status:

- ❌ No working SSL certificate
- ❌ Site inaccessible
- ⚠️ If fixed with "Flexible" mode: Less secure (Cloudflare to origin not encrypted)
- ✅ Proper fix: "Full" mode with valid origin certificate

---

## 📞 Who to Contact

### Durablesites.co Support:

- **Website:** https://durablesites.co
- **Support:** Check their website for contact info
- **Account:** Login to check support tickets

### Cloudflare Support:

- **Dashboard:** https://dash.cloudflare.com
- **Support:** Available for paid plans
- **Community:** https://community.cloudflare.com

### Domain Registrar:

- Check where elevateforhumanity.org is registered
- May need to verify domain ownership
- Check DNS settings

---

## 🔄 Related Issues

### This is NOT Related To:

- ❌ fix2 repository deployment
- ❌ elevateconnectsdirectory.org (different site)
- ❌ Vercel deployment
- ❌ Supabase connection

### This IS Related To:

- ✅ Marketing site hosting (Durablesites.co)
- ✅ Cloudflare CDN configuration
- ✅ SSL certificate management
- ✅ Domain DNS settings

---

## 📝 Action Items

### Immediate (Within 24 Hours):

- [ ] Login to Cloudflare dashboard
- [ ] Check SSL/TLS mode setting
- [ ] Try changing to "Flexible" mode (temporary fix)
- [ ] Test if site loads
- [ ] Contact Durablesites.co support if no Cloudflare access

### Short Term (Within 1 Week):

- [ ] Get valid SSL certificate installed on origin
- [ ] Change Cloudflare back to "Full" mode
- [ ] Verify SSL Labs test shows A/B grade
- [ ] Test all pages load correctly
- [ ] Monitor for any recurring issues

### Long Term (Within 1 Month):

- [ ] Document SSL certificate renewal process
- [ ] Set up monitoring/alerts for SSL expiration
- [ ] Consider moving to more reliable hosting
- [ ] Evaluate if Durablesites.co meets needs

---

## 🎯 Recommended Solution

**Best Approach (Remove Cloudflare):**

1. **Get DNS Info:** Login to Durablesites.co and get correct CNAME/nameservers
2. **Update Registrar:** Change DNS at domain registrar to point to Durablesites.co
3. **Remove Cloudflare:** Delete site from Cloudflare dashboard
4. **Wait:** DNS propagation (1-48 hours, usually 1-2 hours)
5. **Verify:** Test site loads correctly

**Quick Workaround (If Urgent):**

1. **Cloudflare:** Change SSL mode to "Flexible"
2. **Test:** Site should load immediately
3. **Plan:** Still remove Cloudflare properly later

**Timeline:**

- Quick workaround: 5 minutes (if you have Cloudflare access)
- Proper fix: 1-48 hours (DNS propagation time)

**Why Remove Cloudflare:**

- Durablesites.co already provides hosting and SSL
- Cloudflare adds unnecessary complexity
- Current setup is misconfigured
- Direct connection is simpler and works better

---

## 📚 Additional Resources

### SSL/TLS Testing:

- **SSL Labs:** https://www.ssllabs.com/ssltest/
- **Why No Padlock:** https://www.whynopadlock.com/

### Cloudflare Documentation:

- **SSL Modes:** https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/
- **SSL Troubleshooting:** https://developers.cloudflare.com/ssl/troubleshooting/

### General SSL Info:

- **Let's Encrypt:** https://letsencrypt.org/ (free SSL certificates)
- **SSL Checker:** https://www.sslshopper.com/ssl-checker.html

---

## ✅ Summary

**Problem:** www.elevateforhumanity.org has SSL/TLS handshake failure  
**Cause:** Invalid/missing SSL certificate on origin server  
**Quick Fix:** Change Cloudflare SSL mode to "Flexible"  
**Proper Fix:** Get Durablesites.co to install valid SSL certificate  
**Priority:** HIGH - Site completely down  
**ETA:** 5 minutes (quick fix) or 24-48 hours (proper fix)

---

**Last Updated:** 2025-11-15 21:36 UTC  
**Status:** Awaiting fix from site administrator
