# DURABLE.CO DNS CONFIGURATION FOR STANDALONE LMS
**Purpose:** Use Durable.co ONLY as the public face/domain host
**LMS Backend:** Hosted independently on Netlify
**Integration:** Manual script injection into Durable.co

---

## 🎯 UNDERSTANDING THE SETUP

### What Durable.co Does:
- ✅ Hosts your **public-facing website** (marketing, info pages)
- ✅ Provides the **domain/DNS** (elevateforhumanity.org)
- ✅ Acts as the **front door** for visitors

### What Durable.co Does NOT Do:
- ❌ Does NOT host your LMS
- ❌ Does NOT host your database
- ❌ Does NOT run your backend

### What YOU Host Independently:
- ✅ **LMS Application:** Hosted on Netlify (elevateproduction.netlify.app)
- ✅ **Database:** Hosted on Supabase
- ✅ **Backend APIs:** Serverless functions on Netlify
- ✅ **Student Portal:** Full LMS functionality

### How They Connect:
```
Visitor → elevateforhumanity.org (Durable.co)
         ↓
         Durable.co page loads
         ↓
         JavaScript injected into Durable.co page
         ↓
         Script loads LMS content from Netlify
         ↓
         Student sees full LMS embedded in Durable.co site
```

---

## 🌐 DNS CONFIGURATION IN DURABLE.CO

### Option 1: Keep Domain at Durable.co (SIMPLEST)

**What to do:** NOTHING

Durable.co automatically manages:
- ✅ DNS hosting
- ✅ SSL certificate
- ✅ Domain routing
- ✅ CDN

**Your domain:** `elevateforhumanity.org` stays pointed to Durable.co

**DNS Records (Durable.co manages automatically):**
```
Type: A
Name: @
Value: [Durable.co IP - they manage this]

Type: CNAME
Name: www
Value: [Durable.co domain - they manage this]
```

**You do:** Just inject your LMS scripts into Durable.co pages

---

### Option 2: Use Subdomain for LMS (RECOMMENDED)

**Setup:**
```
elevateforhumanity.org          → Durable.co (marketing site)
portal.elevateforhumanity.org   → Netlify (LMS)
api.elevateforhumanity.org      → Supabase (database)
```

**DNS Records in Durable.co Dashboard:**

1. **Main domain (already configured by Durable):**
   ```
   Type: A
   Name: @
   Value: [Durable.co manages]
   ```

2. **LMS Subdomain (YOU ADD THIS):**
   ```
   Type: CNAME
   Name: portal
   Value: elevateproduction.netlify.app
   TTL: 1 hour
   ```

3. **API Subdomain (YOU ADD THIS - optional):**
   ```
   Type: CNAME
   Name: api
   Value: cuxzzpsyufcewtmicszk.supabase.co
   TTL: 1 hour
   ```

**Result:**
- `elevateforhumanity.org` → Durable.co site (marketing)
- `portal.elevateforhumanity.org` → Your LMS (Netlify)
- `api.elevateforhumanity.org` → Your API (Supabase)

---

## 📋 STEP-BY-STEP: ADD SUBDOMAIN IN DURABLE.CO

### Step 1: Login to Durable.co
1. Go to: https://durable.co/login
2. Login with your credentials

### Step 2: Access DNS Settings
1. Click on your site
2. Go to **Settings** → **Domain**
3. Click **Advanced DNS Settings** or **Manage DNS**

### Step 3: Add CNAME Record for LMS
```
Record Type: CNAME
Host/Name: portal
Points to: elevateproduction.netlify.app
TTL: 3600 (1 hour)
```

Click **Save** or **Add Record**

### Step 4: Add CNAME Record for API (Optional)
```
Record Type: CNAME
Host/Name: api
Points to: cuxzzpsyufcewtmicszk.supabase.co
TTL: 3600 (1 hour)
```

Click **Save** or **Add Record**

### Step 5: Wait for DNS Propagation
- **Time:** 5 minutes to 24 hours
- **Check:** https://dnschecker.org
- **Test:** Visit portal.elevateforhumanity.org

---

## 🔧 NETLIFY CONFIGURATION FOR SUBDOMAIN

### Step 1: Add Custom Domain in Netlify

1. Go to: https://app.netlify.com/sites/elevateproduction/settings/domain
2. Click **Add custom domain**
3. Enter: `portal.elevateforhumanity.org`
4. Click **Verify**
5. Netlify will check DNS and confirm

### Step 2: Enable SSL

Netlify automatically provisions SSL certificate:
- ✅ Free Let's Encrypt certificate
- ✅ Auto-renewal
- ✅ HTTPS enforced

**Wait:** 5-10 minutes for SSL to activate

### Step 3: Test

Visit: https://portal.elevateforhumanity.org

Should show your LMS!

---

## 📝 MANUAL SCRIPT INJECTION INTO DURABLE.CO

### What You'll Inject:

Create an **embed script** that loads your LMS into Durable.co pages.

### Step 1: Create Embed Script

Save this as `public/lms-embed.js` in your Netlify project:

```javascript
/**
 * EFH LMS Embed Script
 * Injects LMS content into Durable.co pages
 */

(function() {
  'use strict';
  
  console.log('🎓 EFH LMS Embed Loading...');
  
  // Configuration
  const LMS_URL = 'https://portal.elevateforhumanity.org';
  const API_URL = 'https://api.elevateforhumanity.org';
  
  // Find injection point
  const targetElement = document.querySelector('[data-efh-lms]');
  
  if (!targetElement) {
    console.warn('⚠️ No [data-efh-lms] element found');
    return;
  }
  
  // Create iframe for LMS
  const iframe = document.createElement('iframe');
  iframe.src = LMS_URL;
  iframe.style.width = '100%';
  iframe.style.height = '800px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';
  iframe.setAttribute('allowfullscreen', 'true');
  
  // Inject iframe
  targetElement.innerHTML = '';
  targetElement.appendChild(iframe);
  
  console.log('✅ EFH LMS Embedded Successfully');
})();
```

### Step 2: Deploy to Netlify

```bash
# Add file to your project
git add public/lms-embed.js
git commit -m "Add LMS embed script"
git push

# Netlify auto-deploys
# Script available at: https://portal.elevateforhumanity.org/lms-embed.js
```

### Step 3: Inject into Durable.co Page

1. **Login to Durable.co**
2. **Edit the page** where you want LMS
3. **Add Custom Code Block:**

```html
<!-- LMS Injection Point -->
<div data-efh-lms style="margin: 40px 0;"></div>

<!-- Load LMS Embed Script -->
<script src="https://portal.elevateforhumanity.org/lms-embed.js" defer></script>
```

4. **Save and Publish**

### Step 4: Test

Visit your Durable.co page → Should see LMS embedded!

---

## 🎨 ALTERNATIVE: BUTTON LINK TO LMS

### Simpler Option: Just Link to LMS

Instead of embedding, add a button that links to your LMS:

```html
<!-- In Durable.co page -->
<div style="text-align: center; margin: 40px 0;">
  <a href="https://portal.elevateforhumanity.org" 
     style="display: inline-block; 
            background: #0066CC; 
            color: white; 
            padding: 16px 32px; 
            border-radius: 8px; 
            text-decoration: none; 
            font-size: 18px; 
            font-weight: 600;">
    🎓 Access Student Portal
  </a>
</div>
```

**Benefits:**
- ✅ Simpler (no iframe)
- ✅ Better performance
- ✅ Full LMS experience
- ✅ Easier to maintain

---

## 🔐 SECURITY CONSIDERATIONS

### 1. CORS Configuration

Your Netlify LMS needs to allow embedding from Durable.co:

**Add to `netlify.toml`:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "ALLOW-FROM https://elevateforhumanity.org"
    Content-Security-Policy = "frame-ancestors 'self' https://elevateforhumanity.org"
```

### 2. Authentication

Students should login at: `portal.elevateforhumanity.org`

**NOT** embedded in Durable.co (security risk)

### 3. Sensitive Data

**Never** embed pages with:
- ❌ Payment forms
- ❌ Personal information
- ❌ Admin panels

**Always** link to standalone LMS for these.

---

## 📊 RECOMMENDED ARCHITECTURE

### Public Marketing Site (Durable.co)
```
elevateforhumanity.org
├── Home page
├── About us
├── Programs overview
├── Contact
└── [Button: "Access Student Portal" → portal.elevateforhumanity.org]
```

### Student Portal (Netlify)
```
portal.elevateforhumanity.org
├── Login
├── Dashboard
├── Courses
├── Certificates
├── Profile
└── [All LMS functionality]
```

### API Backend (Supabase)
```
api.elevateforhumanity.org
└── [Database, Auth, Functions]
```

---

## 🎯 FINAL DNS CONFIGURATION

### In Durable.co DNS:

```
# Main domain (Durable.co manages)
Type: A
Name: @
Value: [Durable.co IP]

# WWW redirect (Durable.co manages)
Type: CNAME
Name: www
Value: [Durable.co domain]

# LMS subdomain (YOU ADD)
Type: CNAME
Name: portal
Value: elevateproduction.netlify.app

# API subdomain (YOU ADD - optional)
Type: CNAME
Name: api
Value: cuxzzpsyufcewtmicszk.supabase.co
```

### Result:
- ✅ `elevateforhumanity.org` → Durable.co (marketing)
- ✅ `www.elevateforhumanity.org` → Redirects to apex
- ✅ `portal.elevateforhumanity.org` → Netlify (LMS)
- ✅ `api.elevateforhumanity.org` → Supabase (API)

---

## ✅ VERIFICATION CHECKLIST

After setup:

- [ ] Main domain resolves to Durable.co
- [ ] Portal subdomain resolves to Netlify
- [ ] SSL works on all domains
- [ ] LMS loads at portal.elevateforhumanity.org
- [ ] Button/link on Durable.co site works
- [ ] Students can login to portal
- [ ] No CORS errors in console

---

## 🚀 QUICK START

### Minimal Setup (5 minutes):

1. **Add DNS record in Durable.co:**
   ```
   CNAME: portal → elevateproduction.netlify.app
   ```

2. **Add domain in Netlify:**
   ```
   portal.elevateforhumanity.org
   ```

3. **Add button to Durable.co site:**
   ```html
   <a href="https://portal.elevateforhumanity.org">Access LMS</a>
   ```

4. **Done!**

---

## 📞 SUPPORT

### If DNS doesn't work:

1. **Check DNS propagation:** https://dnschecker.org
2. **Wait 24 hours** for full propagation
3. **Verify CNAME record** in Durable.co dashboard
4. **Check Netlify domain** is added and verified

### If embedding doesn't work:

1. **Check browser console** for errors
2. **Verify CORS headers** in Netlify
3. **Test iframe directly** in browser
4. **Consider using button link** instead

---

**SUMMARY:**
- ✅ Durable.co hosts domain and marketing site
- ✅ Netlify hosts LMS independently
- ✅ Subdomain (portal.elevateforhumanity.org) points to Netlify
- ✅ Simple button link connects them
- ✅ Fully standalone, no dependencies

**RESULT:** Clean separation, full control, no confusion!
