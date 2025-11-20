# HSTS Error Fix: www.elevateforhumanity.org

## The Problem

You're seeing this error:

```
www.elevateforhumanity.org normally uses encryption to protect your information.
When Chrome tried to connect to www.elevateforhumanity.org this time, the website
sent back unusual and incorrect credentials.

You cannot visit www.elevateforhumanity.org right now because the website uses HSTS.
```

## What Caused This

1. **www.elevateforhumanity.org was previously connected to Netlify**
2. **Netlify sent HSTS headers** (HTTP Strict Transport Security)
3. **Your browser cached these HSTS settings**
4. **Now the domain points somewhere else** (Durable.co)
5. **Browser refuses to connect** because HSTS is still cached

## The Root Cause

**www.elevateforhumanity.org should NEVER have been connected to Netlify.**

Your architecture should be:

```
Durable.co (elevateforhumanity.org)
    ↓ (embeds or links to)
Netlify (elevateproduction.netlify.app)
```

NOT:

```
www.elevateforhumanity.org → Netlify ❌ WRONG
```

## What We Fixed

### 1. Removed Domain from netlify.toml

**Before:**

```toml
[[redirects]]
  from = "https://www.elevateforhumanity.org/*"
  to = "https://www.elevateforhumanity.org/:splat"
  status = 301
  force = true
```

**After:**

```toml
# Removed - this domain should not be here
```

### 2. Changed All URLs to Netlify URL

Changed in 14 files:

- `src/components/SEO.jsx`
- `src/components/DynamicSEO.tsx`
- `src/lib/seo/SEO.jsx`
- `src/pages/ProgramDetail.tsx`
- `src/pages/Programs.tsx`
- `src/pages/CourseLibrary.jsx`
- `src/pages/SocialMediaManager.tsx`
- `src/pages/Ecosystem.jsx`
- `src/pages/DurableConsole.tsx`
- `src/pages/Partners.jsx`
- `src/utils/addCourseSchema.ts`
- `src/lib/api-client.js`
- `src/watermark/tracking-beacon.js`

**From:**

```javascript
const SITE_URL = 'https://www.elevateforhumanity.org';
```

**To:**

```javascript
const SITE_URL = 'https://elevateproduction.netlify.app';
```

## How to Fix the HSTS Error

### Option 1: Clear HSTS in Chrome (Recommended)

1. Open Chrome
2. Go to: `chrome://net-internals/#hsts`
3. Scroll to **"Delete domain security policies"**
4. Enter: `elevateforhumanity.org`
5. Click **"Delete"**
6. Enter: `www.elevateforhumanity.org`
7. Click **"Delete"**
8. Restart Chrome

### Option 2: Clear HSTS in Edge

1. Open Edge
2. Go to: `edge://net-internals/#hsts`
3. Follow same steps as Chrome above

### Option 3: Clear HSTS in Firefox

1. Close all Firefox windows
2. Find your Firefox profile folder:
   - Windows: `%APPDATA%\Mozilla\Firefox\Profiles\`
   - Mac: `~/Library/Application Support/Firefox/Profiles/`
   - Linux: `~/.mozilla/firefox/`
3. Delete file: `SiteSecurityServiceState.txt`
4. Restart Firefox

### Option 4: Clear HSTS in Safari

1. Safari → Preferences → Privacy
2. Click **"Manage Website Data"**
3. Search for: `elevateforhumanity.org`
4. Click **"Remove"**
5. Click **"Done"**
6. Restart Safari

### Option 5: Use Incognito/Private Mode

Incognito mode doesn't have cached HSTS:

1. Open incognito window
2. Visit the site
3. Should work (but only in incognito)

## Run the Puppetmaster Fix Script

This script will:

- Remove the domain from Netlify
- Verify configuration
- Rebuild with correct URLs
- Deploy fresh build

```bash
# Set your Netlify token
export NETLIFY_AUTH_TOKEN='your_token'

# Run the fix
bash scripts/puppetmaster-fix-hsts-domain.sh
```

## Verify the Fix

### 1. Check Netlify Dashboard

Go to: https://app.netlify.com/sites/elevateproduction/settings/domain

**Should show:**

```
Primary domain: elevateproduction.netlify.app
Custom domains: (none)
```

**If you see any custom domains:**

1. Click **"Options"** next to the domain
2. Click **"Remove domain"**
3. Confirm removal

### 2. Check Your Site

Visit: https://elevateproduction.netlify.app

Should load without errors.

### 3. Verify DNS

Check where www.elevateforhumanity.org actually points:

```bash
nslookup www.elevateforhumanity.org
```

Should point to **Durable.co**, NOT Netlify.

## Correct Architecture

### What You Should Have

```
┌─────────────────────────────────────────┐
│ Durable.co                              │
│ elevateforhumanity.org                  │
│ www.elevateforhumanity.org              │
│ - Landing page                          │
│ - Marketing content                     │
└─────────────────────────────────────────┘
              │
              │ (iframe or link)
              ▼
┌─────────────────────────────────────────┐
│ Netlify                                 │
│ elevateproduction.netlify.app           │
│ - React app                             │
│ - LMS functionality                     │
└─────────────────────────────────────────┘
```

### What You Should NOT Have

```
www.elevateforhumanity.org → Netlify ❌ WRONG
```

## Why This Happened

1. **Someone connected www.elevateforhumanity.org to Netlify**
2. **Netlify automatically enabled HTTPS with HSTS**
3. **HSTS tells browsers: "Always use HTTPS for this domain"**
4. **Browser cached this for up to 1 year**
5. **Domain was moved to Durable.co**
6. **Browser still expects Netlify's SSL certificate**
7. **Certificate mismatch = HSTS error**

## How to Prevent This

### 1. Never Connect Custom Domains to Netlify

Your Netlify site should ONLY use:

```
elevateproduction.netlify.app
```

### 2. Use Durable.co for Public Domain

Your public domain should be on Durable.co:

```
elevateforhumanity.org
www.elevateforhumanity.org
```

### 3. Embed Netlify in Durable

In Durable.co, embed the Netlify app:

```html
<iframe src="https://elevateproduction.netlify.app"></iframe>
```

Or link to it:

```html
<a href="https://elevateproduction.netlify.app">Launch LMS</a>
```

## DNS Configuration

### At Your Domain Registrar

**For elevateforhumanity.org:**

```
Type: A or CNAME
Name: @
Value: (Durable.co's IP or domain)
```

**For www.elevateforhumanity.org:**

```
Type: CNAME
Name: www
Value: (Durable.co's domain)
```

**NOT:**

```
Value: elevateproduction.netlify.app ❌ WRONG
```

## Testing

After clearing HSTS:

1. **Test Durable.co site:**

   ```
   https://www.elevateforhumanity.org
   https://www.elevateforhumanity.org
   ```

   Should load Durable.co landing page

2. **Test Netlify app:**

   ```
   https://elevateproduction.netlify.app
   ```

   Should load React app

3. **Test in different browsers:**
   - Chrome (after clearing HSTS)
   - Firefox
   - Safari
   - Edge

4. **Test in incognito:**
   Should work immediately

## If Error Persists

### 1. Wait for HSTS to Expire

HSTS can be cached for up to 1 year. If you can't clear it:

- Use incognito mode
- Use different browser
- Wait for cache to expire

### 2. Check DNS Propagation

DNS changes take 24-48 hours:

```bash
# Check current DNS
nslookup www.elevateforhumanity.org

# Check from different location
https://www.whatsmydns.net/
```

### 3. Contact Domain Registrar

If DNS isn't updating:

- Log into domain registrar
- Verify DNS records
- Contact support if needed

### 4. Check Durable.co Configuration

In Durable.co dashboard:

- Verify domain is connected
- Check SSL certificate status
- Verify site is published

## Summary

✅ **Fixed:** Removed www.elevateforhumanity.org from Netlify  
✅ **Fixed:** Changed all URLs to elevateproduction.netlify.app  
✅ **Fixed:** Removed redirect from netlify.toml  
✅ **Fixed:** Rebuilt with correct configuration

⚠️ **Manual:** Clear HSTS from browser (see instructions above)  
⚠️ **Manual:** Verify no custom domains in Netlify dashboard  
⚠️ **Manual:** Ensure DNS points to Durable.co, not Netlify

**Your Netlify app:** https://elevateproduction.netlify.app  
**Your public site:** https://www.elevateforhumanity.org (on Durable.co)

**These should be separate!**
