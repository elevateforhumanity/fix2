# Fix Portal Domain Configuration

## Current Issue

The Netlify site is deployed to:

- ✅ **Current:** https://elevateforhumanity.org
- ❌ **Should be:** https://portal.elevateforhumanity.org

## Why This Matters

According to the architecture:

- **elevateforhumanity.org** → Durable.co landing page (simple marketing site)
- **portal.elevateforhumanity.org** → Netlify React app (full application)

## Solution: Update Netlify Custom Domain

### Step 1: Access Netlify Domain Settings

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain
2. You'll see current domain: `elevateforhumanity.org`

### Step 2: Remove Current Domain (Optional)

If `elevateforhumanity.org` should NOT be on Netlify:

1. Click the three dots next to `elevateforhumanity.org`
2. Select "Remove domain"
3. Confirm removal

### Step 3: Add Portal Subdomain

1. Click "Add custom domain"
2. Enter: `portal.elevateforhumanity.org`
3. Click "Verify"
4. Netlify will check DNS and show instructions

### Step 4: Configure DNS

In your DNS provider (where elevateforhumanity.org is registered):

**Add CNAME Record:**

```
Type: CNAME
Name: portal
Value: main--elevateforhumanityfix.netlify.app
TTL: 3600
```

**Or use the Netlify subdomain:**

```
Type: CNAME
Name: portal
Value: elevateforhumanityfix.netlify.app
TTL: 3600
```

### Step 5: Wait for DNS Propagation

- DNS changes take 5-30 minutes (up to 48 hours)
- Check status: https://dnschecker.org/#CNAME/portal.elevateforhumanity.org
- Test with: `nslookup portal.elevateforhumanity.org`

### Step 6: Enable HTTPS

1. Netlify will auto-provision SSL certificate
2. Wait for "HTTPS" to show as active
3. This usually takes 5-10 minutes after DNS resolves

### Step 7: Verify Deployment

Test the site:

```bash
curl -I https://portal.elevateforhumanity.org/
```

Should return HTTP 200 with the React app.

## Alternative: Use Netlify CLI

If you have access to Netlify CLI:

```bash
# Login to Netlify
netlify login

# Link to site
netlify link --id 12f120ab-3f63-419b-bc49-430f043415c1

# Add custom domain
netlify domains:add portal.elevateforhumanity.org

# Check status
netlify domains:list
```

## Current Site Information

- **Site ID:** 12f120ab-3f63-419b-bc49-430f043415c1
- **Site Name:** elevateforhumanityfix
- **Current Domain:** elevateforhumanity.org
- **Target Domain:** portal.elevateforhumanity.org
- **Netlify URL:** https://main--elevateforhumanityfix.netlify.app

## DNS Configuration Summary

After setup, your DNS should look like:

```
elevateforhumanity.org
├── A record → Durable.co IP (main landing page)
└── CNAME portal → elevateforhumanityfix.netlify.app (React app)
```

## Verification Checklist

- [ ] Access Netlify domain settings
- [ ] Add portal.elevateforhumanity.org as custom domain
- [ ] Configure DNS CNAME record
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate is active
- [ ] Test https://portal.elevateforhumanity.org
- [ ] Confirm React app loads correctly

## Expected Timeline

- **DNS Configuration:** 5 minutes
- **DNS Propagation:** 15-30 minutes
- **SSL Provisioning:** 5-10 minutes after DNS
- **Total Time:** ~30-45 minutes

## After Configuration

Once portal.elevateforhumanity.org is live:

1. Update canonical URLs in the app
2. Update sitemap.xml
3. Update Google Search Console
4. Test all functionality

## Support Resources

- **Netlify Dashboard:** https://app.netlify.com/sites/elevateforhumanityfix
- **DNS Checker:** https://dnschecker.org
- **Netlify Docs:** https://docs.netlify.com/domains-https/custom-domains/
