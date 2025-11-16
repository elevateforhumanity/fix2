# Add www.elevateconnectsdirectory.org to Netlify

## Current Status

**DNS Configuration:** ✅ CORRECT

- www.elevateconnectsdirectory.org → CNAME → elevateproduction.netlify.app

**Netlify Configuration:** ❌ NOT ADDED

- Domain not added to Netlify dashboard
- Using wrong SSL certificate (\*.netlify.app)

## What Needs to Be Done

Add **www.elevateconnectsdirectory.org** as a custom domain in Netlify.

---

## Option 1: Automatic (with API token)

### Step 1: Get Netlify API Token

1. Go to: https://app.netlify.com/user/applications
2. Click "New access token"
3. Name it: "Domain Setup"
4. Copy the token

### Step 2: Run Autopilot Script

```bash
export NETLIFY_AUTH_TOKEN='your-token-here'
bash scripts/netlify-add-www-domain.sh
```

This will:

- Add www.elevateconnectsdirectory.org to Netlify
- Trigger SSL certificate provisioning
- Wait for SSL to be ready
- Verify everything works

---

## Option 2: Manual (2 minutes)

### Step 1: Open Netlify Dashboard

**Click here:** https://app.netlify.com/sites/elevateproduction/settings/domain

### Step 2: Add Domain

1. Scroll to "Domain aliases" section
2. Click **"Add domain alias"** button
3. Type: `www.elevateconnectsdirectory.org`
4. Click **"Verify"**
5. Click **"Add domain"**

### Step 3: Wait for SSL

- Status will show: "HTTPS: Certificate provisioning in progress..."
- Wait 2-10 minutes (usually 3-5 minutes)
- Refresh page to check status
- When ready: "HTTPS: Secured ✓"

### Step 4: Test

1. Visit: https://www.elevateconnectsdirectory.org
2. Should load without SSL errors
3. Clear browser cache if needed (Ctrl+Shift+R)

---

## What Will Happen

### Before Adding Domain:

```
Browser → www.elevateconnectsdirectory.org
       → DNS: elevateproduction.netlify.app
       → Netlify: "I don't know this domain"
       → Serves: *.netlify.app certificate
       → Browser: ❌ SSL ERROR
```

### After Adding Domain:

```
Browser → www.elevateconnectsdirectory.org
       → DNS: elevateproduction.netlify.app
       → Netlify: "I know this domain!"
       → Serves: www.elevateconnectsdirectory.org certificate
       → Browser: ✅ Secure connection
```

---

## Timeline

- **Add domain**: 30 seconds (manual) or 10 seconds (automatic)
- **SSL provisioning**: 2-10 minutes (automatic by Netlify)
- **Total**: 3-11 minutes

---

## Verification

After adding the domain, verify:

```bash
# Check SSL certificate
curl -Ivk https://www.elevateconnectsdirectory.org 2>&1 | grep "subject:"
# Should show: CN=www.elevateconnectsdirectory.org or CN=*.elevateconnectsdirectory.org

# Check site loads
curl -I https://www.elevateconnectsdirectory.org
# Should show: HTTP/2 200
```

---

## Troubleshooting

### "Domain already in use"

- Domain might be on another Netlify site
- Check all your Netlify sites
- Remove from other site first

### "DNS not configured"

- DNS is correct (verified)
- Wait 5 minutes and try again
- Sometimes takes time to propagate

### SSL not provisioning after 15 minutes

- Check domain spelling: `www.elevateconnectsdirectory.org`
- Verify DNS still points to elevateproduction.netlify.app
- Contact Netlify support: https://www.netlify.com/support/

---

## Important Notes

1. **www vs non-www**: You're adding the www version
2. **Apex domain**: elevateconnectsdirectory.org (without www) can be added separately if needed
3. **Primary domain**: You can set www as primary in Netlify settings
4. **Redirects**: Configure www → non-www or vice versa in Netlify settings

---

## After SSL is Provisioned

Once you see "HTTPS: Secured ✓" in Netlify:

1. **Clear browser cache**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Visit**: https://www.elevateconnectsdirectory.org
3. **Verify**:
   - No SSL errors ✅
   - Site loads correctly ✅
   - All styling visible ✅
   - All images loading ✅

---

## Quick Links

**Add Domain:**
https://app.netlify.com/sites/elevateproduction/settings/domain

**Netlify Dashboard:**
https://app.netlify.com/sites/elevateproduction

**Get API Token:**
https://app.netlify.com/user/applications

---

**This is the ONLY remaining configuration step!**
