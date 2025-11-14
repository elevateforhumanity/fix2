# Custom Domain Setup - www.elevateconnectsdirectory.org

**Goal:** Connect www.elevateconnectsdirectory.org to Netlify site  
**Current:** elevateconnects1.netlify.app (working)  
**Target:** www.elevateconnectsdirectory.org (with SSL)

---

## STEPS TO ADD CUSTOM DOMAIN

### 1. Add Domain in Netlify Dashboard

1. **Go to Netlify Dashboard**
   - Log in to https://app.netlify.com
   - Select your site (elevateconnects1)

2. **Navigate to Domain Settings**
   - Click "Domain management" or "Domain settings"
   - Click "Add custom domain"

3. **Add Your Domain**
   - Enter: `www.elevateconnectsdirectory.org`
   - Click "Verify"
   - Click "Add domain"

4. **Also Add Root Domain (Optional)**
   - Click "Add custom domain" again
   - Enter: `elevateconnectsdirectory.org`
   - This will redirect to www version

---

### 2. Configure DNS Settings

You need to update DNS records at your domain registrar (where you bought the domain).

#### Option A: Using Netlify DNS (Recommended)

**If using Netlify DNS:**
1. Netlify will show you nameservers
2. Go to your domain registrar
3. Update nameservers to Netlify's nameservers
4. Wait 24-48 hours for propagation

#### Option B: Using External DNS

**Add these DNS records at your registrar:**

For **www.elevateconnectsdirectory.org**:
```
Type: CNAME
Name: www
Value: elevateconnects1.netlify.app
TTL: 3600
```

For **elevateconnectsdirectory.org** (root):
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600
```

Or use ALIAS/ANAME record:
```
Type: ALIAS (or ANAME)
Name: @
Value: elevateconnects1.netlify.app
TTL: 3600
```

---

### 3. Wait for SSL Certificate

After adding the domain in Netlify:

1. **Automatic SSL Provisioning**
   - Netlify automatically requests SSL from Let's Encrypt
   - Usually takes 1-5 minutes
   - Can take up to 24 hours if DNS isn't propagated

2. **Check SSL Status**
   - In Netlify Dashboard → Domain settings
   - Look for "HTTPS" section
   - Should show "Certificate provisioned"

3. **Enable HTTPS**
   - Toggle "Force HTTPS" to ON
   - This redirects HTTP to HTTPS

---

### 4. Verify Domain Works

Test these URLs:
- http://www.elevateconnectsdirectory.org → Should redirect to HTTPS
- https://www.elevateconnectsdirectory.org → Should load site
- http://elevateconnectsdirectory.org → Should redirect to www + HTTPS
- https://www.elevateconnectsdirectory.org → Should redirect to www

---

## CURRENT DNS STATUS

### What We Found Earlier

The domain `elevateconnectsdirectory.org` currently points to Netlify, but:
- ❌ SSL certificate is for `*.netlify.app`, not your custom domain
- ❌ Custom domain not added in Netlify site settings

### Error Message
```
net::ERR_CERT_COMMON_NAME_INVALID
SSL certificate is for: *.netlify.app, netlify.app
Not valid for: elevateconnectsdirectory.org
```

This means:
1. DNS is pointing to Netlify ✅
2. But custom domain not configured in Netlify ❌
3. So Netlify serves default certificate ❌

---

## TROUBLESHOOTING

### Issue: "Domain already in use"
**Solution:** Domain might be claimed by another Netlify site
- Contact Netlify support to release it
- Or use a different subdomain

### Issue: SSL not provisioning
**Possible causes:**
1. DNS not propagated yet (wait 24-48 hours)
2. CAA records blocking Let's Encrypt
3. Domain verification failed

**Check DNS propagation:**
```bash
# Check if DNS is working
nslookup www.elevateconnectsdirectory.org

# Should return Netlify's IP or CNAME
```

### Issue: "Awaiting External DNS"
**Solution:** 
- DNS records not set up correctly
- Double-check CNAME/A records at registrar
- Wait for DNS propagation

---

## QUICK REFERENCE

### Netlify Dashboard Path
```
app.netlify.com 
→ Sites 
→ [Your Site] 
→ Domain management 
→ Add custom domain
```

### DNS Records Needed
```
www.elevateconnectsdirectory.org → CNAME → elevateconnects1.netlify.app
elevateconnectsdirectory.org → A → 75.2.60.5
```

### SSL Certificate
- Provider: Let's Encrypt (automatic)
- Renewal: Automatic every 90 days
- Cost: Free

---

## ALTERNATIVE: Keep Netlify Subdomain

If custom domain setup is complex, you can:

**Option 1:** Use Netlify subdomain permanently
- URL: https://elevateconnects1.netlify.app/
- Pros: Already working, free SSL, no DNS setup
- Cons: Long URL, not branded

**Option 2:** Use a different custom domain
- Try: elevateconnects.org or elevatelms.org
- Easier if you own it and it's not configured elsewhere

---

## AFTER DOMAIN IS CONNECTED

### Update Site URLs

Once custom domain works, update these files:

1. **index.html** - Meta tags
2. **.env.example** - Environment variables
3. **public/sitemap.xml** - Sitemap URLs
4. **public/robots.txt** - Sitemap reference

Run this command:
```bash
# Replace elevateconnects1.netlify.app with www.elevateconnectsdirectory.org
find . -type f -name "*.html" -o -name "*.xml" -o -name "*.txt" | \
  xargs sed -i 's|elevateconnects1.netlify.app|www.elevateconnectsdirectory.org|g'
```

Then rebuild and redeploy.

---

## TIMELINE

### Immediate (5 minutes)
- Add custom domain in Netlify
- Configure DNS records

### Short (1-24 hours)
- DNS propagation
- SSL certificate provisioning

### Complete (24-48 hours)
- Full DNS propagation worldwide
- All users can access custom domain

---

## SUPPORT

### Netlify Support
- Docs: https://docs.netlify.com/domains-https/custom-domains/
- Support: https://www.netlify.com/support/

### DNS Help
- Check propagation: https://dnschecker.org
- Lookup tool: https://mxtoolbox.com

---

## CURRENT STATUS

- ✅ Site deployed and working
- ✅ Accessible at: elevateconnects1.netlify.app
- ❌ Custom domain not configured
- ❌ SSL certificate not provisioned for custom domain

**Next Action:** Add custom domain in Netlify Dashboard

---

**Need help?** The main blocker is adding the domain in Netlify's dashboard. You'll need access to:
1. Netlify account (to add domain)
2. Domain registrar (to update DNS)
