# Custom Domain Setup Guide

**Target Domain:** www.elevateforhumanity.org  
**Current Netlify Site:** elevateforhumanityfix2.netlify.app

## Option A: Use Netlify DNS (Recommended - Simplest)

### Step 1: Add Domain in Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site: `elevateforhumanityfix2`
3. Go to **Domain settings**
4. Click **Add custom domain**
5. Enter: `www.elevateforhumanity.org`
6. Click **Verify**

### Step 2: Update Nameservers
Netlify will provide nameservers like:
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find **Nameservers** or **DNS Settings**
3. Change to **Custom Nameservers**
4. Enter Netlify's nameservers
5. Save changes

### Step 3: Wait for Propagation
- DNS changes take 24-48 hours (usually faster)
- Netlify auto-provisions SSL certificate
- Site will be live at www.elevateforhumanity.org

### Step 4: Set Up Apex Redirect (Optional)
To redirect `elevateforhumanity.org` → `www.elevateforhumanity.org`:
1. In Netlify DNS, add domain: `elevateforhumanity.org`
2. Netlify automatically redirects apex to www

---

## Option B: Keep Cloudflare DNS

### Step 1: Add Domain in Netlify
1. Netlify Dashboard → Domain settings
2. Add custom domain: `www.elevateforhumanity.org`
3. Netlify will show you need to configure DNS

### Step 2: Configure Cloudflare DNS
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select domain: `elevateforhumanity.org`
3. Go to **DNS** → **Records**

### Step 3: Add CNAME Record
```
Type:    CNAME
Name:    www
Target:  elevateforhumanityfix2.netlify.app
TTL:     Auto
Proxy:   DNS only (gray cloud) ⚠️ Important for first setup
```

**Why DNS only?**
- Avoids SSL/handshake conflicts during initial setup
- Can enable Proxied (orange cloud) after site is stable

### Step 4: Add Apex Record (Optional)
For `elevateforhumanity.org` → `www.elevateforhumanity.org`:

**Option 4a: Page Rule (Recommended)**
```
Cloudflare → Page Rules → Create Page Rule
URL: elevateforhumanity.org/*
Setting: Forwarding URL (301 - Permanent Redirect)
Destination: https://www.elevateforhumanity.org/$1
```

**Option 4b: CNAME Flattening**
```
Type:    CNAME
Name:    @
Target:  elevateforhumanityfix2.netlify.app
Proxy:   DNS only
```

### Step 5: Verify SSL
1. Wait 5-10 minutes for DNS propagation
2. Visit https://www.elevateforhumanity.org
3. Check for green padlock (SSL active)
4. If working, optionally enable Cloudflare Proxy (orange cloud)

### Step 6: Enable Cloudflare Proxy (Optional)
After site is stable:
1. Change CNAME Proxy status to **Proxied** (orange cloud)
2. Benefits: DDoS protection, caching, analytics
3. Cloudflare handles SSL automatically

---

## Verification Checklist

After DNS setup:

- [ ] https://www.elevateforhumanity.org loads correctly
- [ ] SSL certificate is active (green padlock)
- [ ] All routes work (test /programs, /about, /contact)
- [ ] Redirects work (if configured)
- [ ] No mixed content warnings in console

## DNS Propagation Check

Check DNS status:
```bash
# Check DNS resolution
dig www.elevateforhumanity.org

# Check from multiple locations
https://www.whatsmydns.net/#CNAME/www.elevateforhumanity.org
```

## Troubleshooting

### "Domain already registered"
- Domain is already claimed by another Netlify site
- Contact Netlify support or remove from other site first

### SSL Certificate Not Provisioning
- Wait 24 hours for DNS propagation
- Ensure CNAME points to correct Netlify subdomain
- Try "Renew certificate" in Netlify Domain settings

### Cloudflare "Too Many Redirects"
- Disable Cloudflare Proxy (gray cloud)
- Check Cloudflare SSL/TLS mode is "Full" or "Full (strict)"
- Ensure no conflicting Page Rules

### Site Not Loading
- Verify CNAME target: `elevateforhumanityfix2.netlify.app`
- Check Netlify build succeeded
- Clear browser cache
- Test in incognito mode

## Current Configuration

### Netlify Settings
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### DNS Records (After Setup)
```
www.elevateforhumanity.org → CNAME → elevateforhumanityfix2.netlify.app
elevateforhumanity.org → Redirect → https://www.elevateforhumanity.org
```

## Timeline

- **Immediate:** Netlify configuration (5 minutes)
- **5-10 minutes:** DNS propagation starts
- **1-4 hours:** Most users see new site
- **24-48 hours:** Full global propagation
- **Auto:** SSL certificate provisioned by Netlify

## Support Resources

- [Netlify Custom Domains Docs](https://docs.netlify.com/domains-https/custom-domains/)
- [Cloudflare DNS Docs](https://developers.cloudflare.com/dns/)
- [Netlify Support](https://www.netlify.com/support/)

---

**Recommendation:** Use **Option A (Netlify DNS)** for simplest setup with zero configuration. Netlify handles everything automatically.
