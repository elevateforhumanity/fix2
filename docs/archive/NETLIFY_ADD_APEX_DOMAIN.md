# Add elevateforhumanity.org to Netlify

## Current Status

**DNS Configuration:** ✅ CORRECT

- elevateforhumanity.org → A Record → 75.2.60.5 (Netlify)

**Netlify Configuration:** ❌ NOT ADDED

- Domain not added to Netlify dashboard
- Using wrong SSL certificate (\*.netlify.app)
- **This is why you see the SSL error**

---

## What Needs to Be Done

Add **elevateforhumanity.org** (apex domain, no www) as a custom domain in Netlify.

---

## MANUAL SETUP (2 Minutes)

### Step 1: Open Netlify Dashboard

**Click this link:** https://app.netlify.com/sites/elevateproduction/settings/domain

### Step 2: Add Domain Alias

1. Look for "Domain aliases" section
2. Click **"Add domain alias"** button
3. Type exactly: `elevateforhumanity.org`
4. Click **"Verify"**
5. Netlify will check DNS (should show ✅)
6. Click **"Add domain"**

### Step 3: Wait for SSL Certificate

- You'll see: "HTTPS: Certificate provisioning in progress..."
- Wait **2-10 minutes** (usually 3-5 minutes)
- Refresh the page occasionally
- When ready: "HTTPS: Secured ✅"

### Step 4: Test

1. Clear browser cache: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Visit: https://www.elevateforhumanity.org
3. Should load without SSL errors
4. Should show your site with all styling

---

## AUTOMATIC SETUP (with API token)

If you have a Netlify API token:

```bash
# Set your token
export NETLIFY_AUTH_TOKEN='your-token-here'

# Run the script
bash scripts/netlify-add-apex-domain.sh
```

To get a token:

1. Go to: https://app.netlify.com/user/applications
2. Click "New access token"
3. Copy the token

---

## Why This Fixes the SSL Error

### Current Problem:

```
Browser → elevateforhumanity.org
       → DNS: 75.2.60.5 (Netlify)
       → Netlify: "I don't recognize this domain"
       → Serves: *.netlify.app certificate (WRONG)
       → Browser: ❌ ERR_CERT_COMMON_NAME_INVALID
```

### After Adding Domain:

```
Browser → elevateforhumanity.org
       → DNS: 75.2.60.5 (Netlify)
       → Netlify: "I know this domain!"
       → Provisions: Let's Encrypt SSL for elevateforhumanity.org
       → Serves: elevateforhumanity.org certificate (CORRECT)
       → Browser: ✅ Secure connection, site loads
```

---

## Timeline

- **Your action**: 30 seconds (add domain)
- **SSL provisioning**: 2-10 minutes (automatic)
- **Total**: 3-11 minutes

---

## Verification Commands

After adding the domain:

```bash
# Check DNS (should already be correct)
curl -s "https://dns.google/resolve?name=elevateforhumanity.org&type=A"
# Should show: 75.2.60.5

# Check SSL certificate
curl -Ivk https://www.elevateforhumanity.org 2>&1 | grep "subject:"
# Should show: CN=elevateforhumanity.org

# Check site loads
curl -I https://www.elevateforhumanity.org
# Should show: HTTP/2 200
```

---

## What You'll See in Netlify

### Before:

```
Custom domains
├── elevateproduction.netlify.app (Primary)
└── Domain aliases: (none)
```

### After Adding:

```
Custom domains
├── elevateproduction.netlify.app (Primary)
└── Domain aliases:
    └── elevateforhumanity.org
        └── HTTPS: Certificate provisioning in progress... ⏳
```

### After SSL Provisions:

```
Custom domains
├── elevateproduction.netlify.app (Primary)
└── Domain aliases:
    └── elevateforhumanity.org
        └── HTTPS: Secured ✅
```

---

## Troubleshooting

### "Domain already in use"

- Check if it's on another Netlify site
- Go to: https://app.netlify.com/teams
- Remove from other site first

### "DNS not configured"

- DNS is correct (I verified: 75.2.60.5)
- Wait 5 minutes and try again
- Sometimes takes time to propagate

### SSL taking too long (>15 min)

- Verify domain spelling: `elevateforhumanity.org`
- Check DNS still points to 75.2.60.5
- Contact Netlify support (instant chat)

---

## After SSL is Active

Once SSL shows "Secured ✅":

1. **Clear browser cache**: Ctrl+Shift+R or Cmd+Shift+R
2. **Visit**: https://www.elevateforhumanity.org
3. **Verify**:
   - ✅ No SSL errors
   - ✅ Secure padlock in browser
   - ✅ Site loads with all styling
   - ✅ All images display
   - ✅ Navigation works

---

## Quick Links

**Add Domain (Direct Link):**
https://app.netlify.com/sites/elevateproduction/settings/domain#custom-domains

**Netlify Dashboard:**
https://app.netlify.com/sites/elevateproduction

**Netlify Support:**
https://www.netlify.com/support/

---

## Summary

**Problem**: Domain not added to Netlify → Wrong SSL certificate → Browser error

**Solution**: Add elevateforhumanity.org in Netlify dashboard → SSL provisions → Site works

**Time**: 3-11 minutes total

**Action**: Click link above, add domain, wait for SSL

---

**This is the ONLY step needed to fix the SSL error!**

Everything else (DNS, code, styling, images, SEO, analytics) is already configured correctly.
