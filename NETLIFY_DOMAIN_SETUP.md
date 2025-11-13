# Netlify Domain Configuration Guide

## Current Situation

Based on your DNS records, you have:
- **elevateforhumanity.org** - Primary domain (A record: 172.66.0.42)
- **www.elevateforhumanity.org** - CNAME to Durablesites.co (showing fallback site)
- **elevateconnectsdirectory.org** - Secondary domain (A record: 75.2.60.5)
- **www.elevateconnectsdirectory.org** - CNAME to elevateproduction.netlify.app

## Problem

The www subdomain is pointing to a different service (Durablesites.co) instead of your Netlify site.

## Solution

### Option 1: Use Netlify for Both Apex and WWW (Recommended)

This makes both `elevateforhumanity.org` and `www.elevateforhumanity.org` point to your Netlify site.

#### Step 1: Add Custom Domain in Netlify

1. Go to Netlify Dashboard: https://app.netlify.com/
2. Select your site (Site ID: `12f120ab-3f63-419b-bc49-430f043415c1`)
3. Go to **Domain settings**
4. Click **Add custom domain**
5. Enter: `elevateforhumanity.org`
6. Click **Verify**
7. Netlify will show you DNS records to configure

#### Step 2: Update DNS Records

In your DNS provider (looks like Durable Technologies):

**Remove these records**:
```
A     @    172.66.0.42
CNAME www  Durablesites.co
```

**Add these records** (Netlify will provide exact values):
```
A     @    75.2.60.5
CNAME www  [your-site].netlify.app
```

Or use Netlify DNS (recommended):
```
NETLIFY  @    [your-site].netlify.app
NETLIFY  www  [your-site].netlify.app
```

#### Step 3: Enable HTTPS

1. In Netlify Domain settings
2. Wait for DNS propagation (5-10 minutes)
3. Click **Verify DNS configuration**
4. Click **Provision certificate** (automatic)
5. Enable **Force HTTPS**

#### Step 4: Set Primary Domain

1. In Netlify Domain settings
2. Set primary domain to: `elevateforhumanity.org` (without www)
3. This will redirect www to non-www automatically

---

### Option 2: Keep Current Setup (Not Recommended)

If you want to keep the current DNS setup:

1. Update all URLs in the code to use the apex domain only
2. Don't use www subdomain
3. Users accessing www will see the Durablesites fallback

---

## Recommended Configuration

### Primary Domain: elevateforhumanity.org

**Netlify Settings**:
- Primary domain: `elevateforhumanity.org`
- Domain aliases: `www.elevateforhumanity.org`
- HTTPS: Enabled
- Force HTTPS: Enabled

**DNS Records** (in your DNS provider):
```
Type   Name   Content                          TTL
A      @      75.2.60.5                        Auto
CNAME  www    elevateproduction.netlify.app    Auto
```

Or if using Netlify DNS:
```
Type      Name   Content
NETLIFY   @      elevateproduction.netlify.app
NETLIFY   www    elevateproduction.netlify.app
```

### Secondary Domain: elevateconnectsdirectory.org

**Netlify Settings**:
- Add as domain alias
- Redirect to primary domain

**DNS Records**:
```
Type   Name   Content                          TTL
A      @      75.2.60.5                        Auto
CNAME  www    elevateproduction.netlify.app    Auto
```

**Redirect Configuration** (add to netlify.toml):
```toml
[[redirects]]
  from = "https://elevateconnectsdirectory.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://www.elevateconnectsdirectory.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://www.elevateforhumanity.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true
```

---

## Step-by-Step Setup

### 1. Update DNS Records

Contact your DNS provider (Durable Technologies) or access DNS settings:

**For elevateforhumanity.org**:
```
Change:
  A     @    172.66.0.42
  CNAME www  Durablesites.co

To:
  A     @    75.2.60.5
  CNAME www  elevateproduction.netlify.app
```

**Keep these records** (for email and verification):
```
MX    @    SMTP.GOOGLE.COM (Priority: 1)
TXT   @    google-site-verification=9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so
TXT   @    google-site-verification=e05R0DWw4zbryQeir_hCg57NUx47Ul_TVJcgpsiegA4
```

### 2. Configure Netlify

1. Log in to Netlify: https://app.netlify.com/
2. Go to your site
3. **Domain settings** → **Add custom domain**
4. Add: `elevateforhumanity.org`
5. Add: `www.elevateforhumanity.org`
6. Add: `elevateconnectsdirectory.org`
7. Add: `www.elevateconnectsdirectory.org`
8. Set `elevateforhumanity.org` as primary
9. Wait for DNS propagation
10. Enable HTTPS

### 3. Update netlify.toml

Add redirects to force non-www and redirect secondary domain:

```toml
# Redirect all domains to primary
[[redirects]]
  from = "https://elevateconnectsdirectory.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://www.elevateconnectsdirectory.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://www.elevateforhumanity.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true

# Redirect HTTP to HTTPS (handled by Netlify, but explicit)
[[redirects]]
  from = "http://elevateforhumanity.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301
  force = true
```

### 4. Remove Old _redirects File

The current `_redirects` file is for a SPA, not Next.js:

```bash
rm _redirects
```

Next.js routing is handled automatically by the `@netlify/plugin-nextjs` plugin.

### 5. Deploy and Test

```bash
git add netlify.toml
git commit -m "Configure domain redirects"
git push
```

Wait for deployment, then test:
- https://elevateforhumanity.org ✅
- https://www.elevateforhumanity.org → redirects to https://elevateforhumanity.org ✅
- https://elevateconnectsdirectory.org → redirects to https://elevateforhumanity.org ✅

---

## Troubleshooting

### "www shows fallback site"

**Cause**: CNAME points to Durablesites.co instead of Netlify

**Fix**: Update DNS CNAME record:
```
CNAME www elevateproduction.netlify.app
```

### "SSL certificate error"

**Cause**: DNS not propagated or certificate not provisioned

**Fix**:
1. Wait 10-30 minutes for DNS propagation
2. In Netlify, click "Verify DNS configuration"
3. Click "Provision certificate"

### "Site not found"

**Cause**: Domain not added to Netlify

**Fix**:
1. Go to Netlify Domain settings
2. Add custom domain
3. Verify DNS records

### "Redirect loop"

**Cause**: Conflicting redirect rules

**Fix**:
1. Check netlify.toml redirects
2. Remove duplicate rules
3. Ensure `force = true` on redirects

---

## Final DNS Configuration

After setup, your DNS should look like this:

### elevateforhumanity.org
```
Type   Name   Content                                      Priority
A      @      75.2.60.5                                    -
CNAME  www    elevateproduction.netlify.app                -
MX     @      SMTP.GOOGLE.COM                              1
TXT    @      google-site-verification=9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so
TXT    @      google-site-verification=e05R0DWw4zbryQeir_hCg57NUx47Ul_TVJcgpsiegA4
```

### elevateconnectsdirectory.org
```
Type   Name   Content                          Priority
A      @      75.2.60.5                        -
CNAME  www    elevateproduction.netlify.app    -
```

---

## Testing Checklist

After DNS changes propagate (10-30 minutes):

- [ ] https://elevateforhumanity.org loads correctly
- [ ] https://www.elevateforhumanity.org redirects to https://elevateforhumanity.org
- [ ] https://elevateconnectsdirectory.org redirects to https://elevateforhumanity.org
- [ ] https://www.elevateconnectsdirectory.org redirects to https://elevateforhumanity.org
- [ ] SSL certificate is valid (green padlock)
- [ ] All pages load correctly
- [ ] No mixed content warnings

---

## Quick Fix (If You Have DNS Access)

**Immediate action to fix www subdomain**:

1. Change this DNS record:
   ```
   CNAME www Durablesites.co
   ```
   
   To:
   ```
   CNAME www elevateproduction.netlify.app
   ```

2. Wait 5-10 minutes for DNS propagation

3. Test: https://www.elevateforhumanity.org

That's it! The www subdomain will now point to your Netlify site instead of the fallback.

---

## Support

- **Netlify Docs**: https://docs.netlify.com/domains-https/custom-domains/
- **DNS Propagation Check**: https://www.whatsmydns.net/
- **SSL Test**: https://www.ssllabs.com/ssltest/

---

**Status**: ⚠️ DNS configuration needed
**Priority**: High - Users seeing wrong site on www subdomain
**Estimated Time**: 10 minutes + DNS propagation (10-30 minutes)
