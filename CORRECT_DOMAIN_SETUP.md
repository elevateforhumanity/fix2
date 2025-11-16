# CORRECT Domain Setup - Final Configuration

## 🎯 CORRECT ARCHITECTURE

### Marketing Site - www.elevateforhumanity.org

- **Platform**: Durable (durablesites.co)
- **Purpose**: Public marketing, lead generation, program information
- **DNS**: Should point to Durable, NOT Cloudflare or Vercel

### LMS Platform - Vercel Project

- **Platform**: Vercel (fix2-gpql)
- **Repository**: elevateforhumanity/fix2
- **URL**: https://vercel.com/elevate-48e460c9/fix2-gpql
- **Domain**: Should use a different domain (NOT www.elevateforhumanity.org)
- **Suggested domains**:
  - `lms.elevateforhumanity.org`
  - `app.elevateforhumanity.org`
  - `www.elevateconnectsdirectory.org`

---

## ❌ CURRENT PROBLEM

**www.elevateforhumanity.org** is pointing to Cloudflare (104.18.x.x) but:

1. It's NOT configured in Cloudflare properly
2. It SHOULD be pointing to Durable instead
3. This causes SSL handshake failure

---

## ✅ THE FIX

### Step 1: Remove from Cloudflare (Autopilot)

Run the autopilot script to clean up Cloudflare:

```bash
# Set your Cloudflare API token
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"

# Run the cleanup script
node scripts/workers/remove-elevateforhumanity-from-cloudflare.mjs
```

**What it does:**

- Finds elevateforhumanity.org zone in Cloudflare
- Updates DNS records to point to Durable
- Disables Cloudflare proxy
- Removes conflicting records

### Step 2: Configure DNS for Durable

After running the script, your DNS should be:

```
Type   Name   Target                    TTL    Proxy
CNAME  www    sites.durablesites.co     Auto   No
```

**OR manually update in your DNS provider:**

1. Log in to your DNS provider (GoDaddy, Cloudflare, etc.)
2. Find the DNS record for `www.elevateforhumanity.org`
3. Change it to:
   - Type: CNAME
   - Name: www
   - Target: `sites.durablesites.co` (or the CNAME Durable provides)
   - TTL: Auto
   - Proxy: Disabled (DNS only)

### Step 3: Configure in Durable

1. Log in to Durable: https://durablesites.co
2. Go to your site settings
3. Add custom domain: `www.elevateforhumanity.org`
4. Verify DNS
5. Wait for SSL certificate (5-10 minutes)

---

## 🚀 VERCEL PROJECT SETUP

Since www.elevateforhumanity.org should be on Durable, the Vercel project needs a different domain.

### Recommended: Use lms.elevateforhumanity.org

1. Go to Vercel project: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains
2. Add domain: `lms.elevateforhumanity.org`
3. Update DNS:
   ```
   Type   Name   Target
   CNAME  lms    cname.vercel-dns.com
   ```
4. Wait for SSL certificate
5. Update environment variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://lms.elevateforhumanity.org
   ```

### Alternative: Use www.elevateconnectsdirectory.org

If you want to keep using elevateconnectsdirectory.org:

1. Add domain in Vercel: `www.elevateconnectsdirectory.org`
2. DNS should already be configured (if it was on Netlify)
3. Update environment variables accordingly

---

## 📋 COMPLETE DNS CONFIGURATION

After all fixes, your DNS should look like:

### elevateforhumanity.org zone:

```
Type   Name   Target                    Purpose
A      @      [Durable IP]              Apex domain
CNAME  www    sites.durablesites.co     Marketing site (Durable)
CNAME  lms    cname.vercel-dns.com      LMS Platform (Vercel)
MX     @      SMTP.GOOGLE.COM           Email
TXT    @      google-site-verification  Google verification
```

### elevateconnectsdirectory.org zone (if using):

```
Type   Name   Target                    Purpose
A      @      76.76.21.21               Apex domain (Vercel)
CNAME  www    cname.vercel-dns.com      LMS Platform (Vercel)
```

---

## 🎯 FINAL ARCHITECTURE

```
www.elevateforhumanity.org
├─ Platform: Durable (durablesites.co)
├─ Purpose: Marketing site
└─ Content: Homepage, About, Programs, Contact

lms.elevateforhumanity.org
├─ Platform: Vercel (fix2-gpql)
├─ Repository: elevateforhumanity/fix2
├─ Purpose: LMS Platform
└─ Content: Student portal, courses, admin dashboard
```

---

## ⚡ QUICK START GUIDE

### Option A: Use Autopilot Script (Recommended)

```bash
# 1. Get Cloudflare API token
# Go to: https://dash.cloudflare.com/profile/api-tokens
# Create token with "Zone.DNS" edit permissions

# 2. Export token
export CLOUDFLARE_API_TOKEN="your-token-here"

# 3. Run cleanup script
node scripts/workers/remove-elevateforhumanity-from-cloudflare.mjs

# 4. Configure Durable
# Go to durablesites.co and add www.elevateforhumanity.org

# 5. Add LMS domain to Vercel
# Go to vercel.com and add lms.elevateforhumanity.org
```

### Option B: Manual Setup

```bash
# 1. Update DNS for www.elevateforhumanity.org
# Point to: sites.durablesites.co

# 2. Configure in Durable
# Add custom domain: www.elevateforhumanity.org

# 3. Add DNS for lms.elevateforhumanity.org
# Point to: cname.vercel-dns.com

# 4. Configure in Vercel
# Add custom domain: lms.elevateforhumanity.org

# 5. Update environment variables
# Set NEXT_PUBLIC_SITE_URL in Vercel
```

---

## 🔍 VERIFICATION

After setup, test:

### Marketing Site (Durable):

```bash
curl -I https://www.elevateforhumanity.org
# Should return: HTTP/2 200
# Server: Durable or similar
```

### LMS Platform (Vercel):

```bash
curl -I https://lms.elevateforhumanity.org
# Should return: HTTP/2 200
# Server: Vercel
```

---

## 📝 ENVIRONMENT VARIABLES

Update in Vercel project settings:

```env
# Change from:
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org

# To:
NEXT_PUBLIC_SITE_URL=https://lms.elevateforhumanity.org
```

---

## 🚨 IMPORTANT NOTES

1. **DO NOT** add www.elevateforhumanity.org to Vercel
2. **DO NOT** point www.elevateforhumanity.org to Vercel
3. **USE** lms.elevateforhumanity.org for the Vercel project
4. **KEEP** www.elevateforhumanity.org on Durable for marketing

---

## 📞 TROUBLESHOOTING

### If Cloudflare script fails:

1. Check API token has correct permissions
2. Verify elevateforhumanity.org is in your Cloudflare account
3. Manually update DNS in Cloudflare dashboard

### If Durable doesn't work:

1. Check you have the correct CNAME target from Durable
2. Verify DNS propagation: https://dnschecker.org
3. Contact Durable support for CNAME target

### If Vercel deployment fails:

1. Ensure domain is added in Vercel project
2. Check DNS is pointing to Vercel
3. Verify environment variables are set

---

## ✅ SUCCESS CHECKLIST

- [ ] Cloudflare cleanup complete (or manual DNS update)
- [ ] www.elevateforhumanity.org points to Durable
- [ ] www.elevateforhumanity.org configured in Durable
- [ ] lms.elevateforhumanity.org points to Vercel
- [ ] lms.elevateforhumanity.org configured in Vercel
- [ ] Environment variables updated
- [ ] Both sites load with valid SSL
- [ ] Marketing site shows Durable content
- [ ] LMS site shows Vercel deployment

---

**Time to Complete**: 15-30 minutes (including DNS propagation)

**Result**: Clean separation between marketing site (Durable) and LMS platform (Vercel)
