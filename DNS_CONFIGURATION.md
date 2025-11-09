# 🌐 DNS Configuration for portal.elevateforhumanity.org

## Quick Reference

**Add this DNS record to your domain registrar:**

```
Type:  CNAME
Name:  portal
Value: elevateforhumanityfix.netlify.app
TTL:   3600
```

---

## Step-by-Step Instructions

### Step 1: Find Your DNS Provider

**Check where your domain is registered:**

```bash
whois elevateforhumanity.org | grep -i "registrar"
```

**Common providers:**
- Cloudflare
- GoDaddy
- Namecheap
- Google Domains
- AWS Route 53
- Hover
- Domain.com

---

### Step 2: Add CNAME Record

Choose your provider below:

## Cloudflare

1. **Login:** https://dash.cloudflare.com
2. **Select domain:** elevateforhumanity.org
3. **Go to:** DNS → Records
4. **Click:** "Add record"
5. **Configure:**
   - Type: `CNAME`
   - Name: `portal`
   - Target: `elevateforhumanityfix.netlify.app`
   - Proxy status: **DNS only** (gray cloud icon)
   - TTL: Auto
6. **Click:** "Save"

**Important:** Make sure proxy is OFF (gray cloud, not orange)

---

## GoDaddy

1. **Login:** https://dcc.godaddy.com
2. **Go to:** My Products → Domains
3. **Click:** DNS next to elevateforhumanity.org
4. **Click:** "Add" button
5. **Configure:**
   - Type: `CNAME`
   - Name: `portal`
   - Value: `elevateforhumanityfix.netlify.app`
   - TTL: `1 Hour`
6. **Click:** "Save"

---

## Namecheap

1. **Login:** https://ap.www.namecheap.com
2. **Go to:** Domain List
3. **Click:** "Manage" next to elevateforhumanity.org
4. **Go to:** Advanced DNS tab
5. **Click:** "Add New Record"
6. **Configure:**
   - Type: `CNAME Record`
   - Host: `portal`
   - Value: `elevateforhumanityfix.netlify.app`
   - TTL: `Automatic`
7. **Click:** "Save All Changes"

---

## Google Domains

1. **Login:** https://domains.google.com
2. **Select:** elevateforhumanity.org
3. **Go to:** DNS
4. **Scroll to:** Custom records
5. **Click:** "Manage custom records"
6. **Click:** "Create new record"
7. **Configure:**
   - Host name: `portal`
   - Type: `CNAME`
   - TTL: `3600`
   - Data: `elevateforhumanityfix.netlify.app`
8. **Click:** "Save"

---

## AWS Route 53

1. **Login:** https://console.aws.amazon.com/route53
2. **Go to:** Hosted zones
3. **Select:** elevateforhumanity.org
4. **Click:** "Create record"
5. **Configure:**
   - Record name: `portal`
   - Record type: `CNAME`
   - Value: `elevateforhumanityfix.netlify.app`
   - TTL: `300`
   - Routing policy: Simple routing
6. **Click:** "Create records"

---

## Hover

1. **Login:** https://www.hover.com/signin
2. **Select:** elevateforhumanity.org
3. **Go to:** DNS tab
4. **Click:** "Add a Record"
5. **Configure:**
   - Type: `CNAME`
   - Hostname: `portal`
   - Target: `elevateforhumanityfix.netlify.app`
6. **Click:** "Save"

---

## Domain.com

1. **Login:** https://www.domain.com/signin
2. **Go to:** My Domains
3. **Click:** elevateforhumanity.org
4. **Go to:** DNS & Nameservers
5. **Click:** "Add DNS Record"
6. **Configure:**
   - Type: `CNAME`
   - Name: `portal`
   - Content: `elevateforhumanityfix.netlify.app`
   - TTL: `3600`
7. **Click:** "Add Record"

---

## Step 3: Verify DNS Configuration

### Wait for Propagation

**DNS changes take time to propagate:**
- Minimum: 5-10 minutes
- Typical: 1-2 hours
- Maximum: 24-48 hours

### Check DNS Status

**Using command line:**
```bash
# Check if CNAME is set
dig portal.elevateforhumanity.org

# Should show:
# portal.elevateforhumanity.org. 3600 IN CNAME elevateforhumanityfix.netlify.app.
```

**Using online tools:**
1. Visit: https://dnschecker.org
2. Enter: `portal.elevateforhumanity.org`
3. Select: `CNAME`
4. Click: "Search"
5. Check: Green checkmarks globally

**Using nslookup:**
```bash
nslookup portal.elevateforhumanity.org
```

---

## Step 4: Verify in Netlify

1. **Go to:** https://app.netlify.com/sites/elevateforhumanityfix/settings/domain
2. **Check:** portal.elevateforhumanity.org should show "Netlify DNS"
3. **Status:** Should show green checkmark when DNS is configured

---

## Troubleshooting

### CNAME Not Resolving

**Problem:** `dig portal.elevateforhumanity.org` returns no results

**Solutions:**
1. Wait longer (DNS can take 24-48 hours)
2. Check record was saved in DNS provider
3. Verify spelling: `portal` (not `www.portal` or `portal.`)
4. Clear local DNS cache:
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Linux
   sudo systemd-resolve --flush-caches
   
   # Windows
   ipconfig /flushdns
   ```

### CNAME Points to Wrong Target

**Problem:** CNAME points to old value or wrong Netlify site

**Solutions:**
1. Update CNAME value to: `elevateforhumanityfix.netlify.app`
2. Remove any trailing dots
3. Make sure it's CNAME, not A record
4. Wait for DNS propagation

### Cloudflare Proxy Enabled

**Problem:** Orange cloud icon in Cloudflare

**Solutions:**
1. Click the orange cloud to turn it gray
2. Must be "DNS only" for Netlify to work
3. Save changes
4. Wait 5 minutes for propagation

### Multiple CNAME Records

**Problem:** Multiple `portal` records exist

**Solutions:**
1. Delete all `portal` CNAME records
2. Add only one CNAME record
3. Value: `elevateforhumanityfix.netlify.app`
4. Save and wait for propagation

---

## Verification Checklist

After adding DNS record, verify:

- [ ] CNAME record added in DNS provider
- [ ] Record name is `portal` (not `www.portal`)
- [ ] Record value is `elevateforhumanityfix.netlify.app`
- [ ] Record type is CNAME (not A or AAAA)
- [ ] Cloudflare proxy is OFF (if using Cloudflare)
- [ ] DNS propagation complete (check with dig or dnschecker.org)
- [ ] Netlify shows domain as configured
- [ ] HTTPS certificate provisioned in Netlify
- [ ] Site loads at https://portal.elevateforhumanity.org

---

## Next Steps

After DNS is configured:

1. **Enable HTTPS in Netlify:**
   - Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain
   - Click "Verify DNS configuration"
   - Click "Provision certificate"
   - Enable "Force HTTPS"

2. **Test the site:**
   - Visit: https://portal.elevateforhumanity.org
   - Verify new design loads
   - Test navigation and links

3. **Update main site:**
   - Update links on www.elevateforhumanity.org
   - Point "Student Login" to portal subdomain

---

## Support

**Need help?**

- **Netlify Support:** https://www.netlify.com/support/
- **DNS Checker:** https://dnschecker.org
- **Netlify Docs:** https://docs.netlify.com/domains-https/custom-domains/

**Common issues:**
- DNS not propagating → Wait 24-48 hours
- SSL not working → Verify DNS first, then provision certificate
- Site not loading → Check DNS with dig command
