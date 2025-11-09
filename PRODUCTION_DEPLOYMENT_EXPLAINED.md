# 🌐 Production Deployment Architecture Explained

## The Confusion

You're seeing two different sites:

1. **www.elevateforhumanity.org** - Production site (Durable.co)
2. **elevateforhumanityfix.netlify.app** - Development/staging site (Netlify)

**The changes we made are ONLY deployed to Netlify, NOT to the Durable.co production site.**

---

## 🏗️ Current Architecture

### Production Site (www.elevateforhumanity.org)
- **Platform:** Durable.co (website builder)
- **Source:** NOT from this GitHub repo
- **Managed:** Via Durable.co dashboard
- **Status:** This is your LIVE production site
- **Changes:** Must be made through Durable.co interface

### Development Site (elevateforhumanityfix.netlify.app)
- **Platform:** Netlify
- **Source:** This GitHub repo (elevateforhumanity/fix2)
- **Managed:** Via GitHub Actions + Netlify
- **Status:** Staging/development environment
- **Changes:** Automatically deploy from GitHub

---

## 🎯 The Problem

**What you want:**
- Deploy the new design system to **www.elevateforhumanity.org**

**What's happening:**
- The new design is only on **elevateforhumanityfix.netlify.app**
- www.elevateforhumanity.org is a separate Durable.co site

---

## ✅ Solutions

### Option 1: Point Domain to Netlify (Recommended)

**This makes the Netlify site your production site.**

**Step 1: Configure Custom Domain in Netlify**
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain
2. Click "Add custom domain"
3. Enter: `www.elevateforhumanity.org`
4. Click "Verify"

**Step 2: Update DNS Records**
1. Go to your domain registrar (where you bought elevateforhumanity.org)
2. Update DNS records:
   ```
   Type: CNAME
   Name: www
   Value: elevateforhumanityfix.netlify.app
   TTL: 3600
   ```

**Step 3: Enable HTTPS**
1. Netlify will automatically provision SSL certificate
2. Wait 24-48 hours for DNS propagation

**Result:** www.elevateforhumanity.org will show the new design from this GitHub repo

---

### Option 2: Export and Upload to Durable.co

**This keeps Durable.co as your host but manually updates the design.**

**Step 1: Build the Site**
```bash
cd /workspaces/fix2
pnpm install
pnpm build
```

**Step 2: Get Build Files**
The `dist/` folder contains all files:
- `dist/index.html`
- `dist/assets/` (CSS, JS, images)

**Step 3: Upload to Durable.co**
1. Log in to Durable.co dashboard
2. Go to your site editor
3. Replace existing pages with new HTML/CSS
4. Upload assets to Durable.co

**Limitations:**
- Manual process (no automatic deployments)
- May lose Durable.co features
- Difficult to maintain

---

### Option 3: Use Subdomain for New LMS

**Keep both sites running separately.**

**Setup:**
1. Point `portal.elevateforhumanity.org` to Netlify
2. Keep `www.elevateforhumanity.org` on Durable.co
3. Link between them

**DNS Configuration:**
```
Type: CNAME
Name: portal
Value: elevateforhumanityfix.netlify.app
TTL: 3600
```

**Result:**
- www.elevateforhumanity.org - Marketing site (Durable.co)
- portal.elevateforhumanity.org - LMS/Student portal (Netlify)

---

## 🔍 How to Check Current Setup

### Check DNS Records
```bash
# Check where www points to
dig www.elevateforhumanity.org

# Check if portal subdomain exists
dig portal.elevateforhumanity.org
```

### Check Durable.co Site
1. Log in to: https://durable.co
2. Find your site: elevateforhumanity.org
3. Check if it's actively managed there

---

## 📋 Recommended Approach

**I recommend Option 3 (Subdomain):**

**Why:**
- ✅ Keep existing marketing site on Durable.co
- ✅ Deploy LMS/student portal from GitHub to Netlify
- ✅ Automatic deployments from GitHub
- ✅ Professional separation of concerns
- ✅ Easy to maintain both

**Setup:**
1. Configure `portal.elevateforhumanity.org` → Netlify
2. Update navigation on www.elevateforhumanity.org:
   - "Student Login" → https://portal.elevateforhumanity.org/login
   - "Student Portal" → https://portal.elevateforhumanity.org
3. Keep marketing content on www.elevateforhumanity.org

---

## 🚀 Quick Action Plan

**To deploy changes to production:**

1. **Decide on architecture:**
   - Option 1: Move everything to Netlify
   - Option 2: Manual export to Durable.co
   - Option 3: Use subdomain (recommended)

2. **If using subdomain (Option 3):**
   ```bash
   # Configure Netlify custom domain
   # Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain
   # Add: portal.elevateforhumanity.org
   
   # Update DNS (at your domain registrar)
   # Add CNAME: portal → elevateforhumanityfix.netlify.app
   ```

3. **Configure GitHub Secrets** (for automatic deployments):
   - NETLIFY_AUTH_TOKEN
   - NETLIFY_SITE_ID
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

4. **Test:**
   - Visit: https://portal.elevateforhumanity.org
   - Verify new design loads
   - Test student login

---

## 🆘 Current Status

**Right Now:**
- ✅ New design code is in GitHub
- ✅ Deploys to elevateforhumanityfix.netlify.app (when secrets configured)
- ❌ Does NOT deploy to www.elevateforhumanity.org (Durable.co site)

**To See Your Changes:**
1. Visit: https://elevateforhumanityfix.netlify.app (after configuring secrets)
2. Or configure custom domain to point to Netlify

---

## 📞 Next Steps

**Tell me which option you prefer:**

1. **Move everything to Netlify** (Option 1)
   - I'll help configure custom domain
   - Migrate away from Durable.co

2. **Keep Durable.co, use subdomain** (Option 3)
   - I'll help set up portal.elevateforhumanity.org
   - Keep marketing site separate

3. **Manual export to Durable.co** (Option 2)
   - I'll create export instructions
   - Manual process for updates

**Which approach do you want to take?**
