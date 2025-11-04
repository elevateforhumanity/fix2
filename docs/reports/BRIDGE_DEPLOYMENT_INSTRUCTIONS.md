# Bridge Deployment Instructions for www.elevateforhumanity.org

**Current Status:** Bridge files are built and ready ✅  
**Target:** www.elevateforhumanity.org (Durable.co site)  
**Issue:** Netlify subdomain returns 404 (needs configuration)

---

## 🎯 Two Deployment Options

### Option A: Host Bridge on Netlify (Recommended)

**Pros:**

- Automatic deployments via autopilot
- Version control for content
- Health monitoring
- Self-healing

**Cons:**

- Requires Netlify configuration
- Currently returning 404

### Option B: Host Bridge on Durable Directly (Quick Start)

**Pros:**

- No external dependencies
- Works immediately
- Simple setup

**Cons:**

- Manual updates required
- No autopilot integration
- No health monitoring

---

## 🚀 Option A: Netlify Deployment (Full Autopilot)

### Step 1: Configure Netlify Site

The Netlify site `elevateforhumanityfix2.netlify.app` needs to be configured:

1. **Go to Netlify Dashboard:**
   - https://app.netlify.com/sites/elevateforhumanityfix2

2. **Check Site Settings:**
   - Verify the site is linked to the GitHub repo
   - Check build settings match `netlify.toml`
   - Ensure environment variables are set

3. **Trigger Manual Deploy:**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"
   - Wait 2-3 minutes for build

4. **Verify Deployment:**
   ```bash
   curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
   # Should return: HTTP/2 200
   ```

### Step 2: Add Bridge to Durable

Once Netlify is working, add to your Durable site:

```html
<!-- In Durable Custom Code (head section) -->
<script
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

### Step 3: Add Content Slots

In your Durable pages:

```html
<div data-efh-slot="hero"></div>
<div data-efh-slot="programs"></div>
<div data-efh-slot="features"></div>
<div data-efh-slot="testimonials"></div>
<div data-efh-slot="cta"></div>
```

---

## 🚀 Option B: Direct Durable Deployment (Quick)

If Netlify is not working, you can embed the bridge directly in Durable:

### Step 1: Copy Bridge Script to Durable

1. **Get the bridge script:**

   ```bash
   cat /workspaces/fix2/dist/efh-bridge.js
   ```

2. **In Durable Custom Code:**
   ```html
   <script>
     // Paste the entire contents of efh-bridge.js here
   </script>
   ```

### Step 2: Copy Configuration to Durable

1. **Get the configuration:**

   ```bash
   cat /workspaces/fix2/dist/api/efh-config.json
   ```

2. **In Durable Custom Code (before bridge script):**
   ```html
   <script>
     window.EFH_CONFIG = {
       // Paste the entire contents of efh-config.json here
     };
   </script>
   ```

### Step 3: Modify Bridge to Use Inline Config

Update the bridge script to use `window.EFH_CONFIG` instead of fetching from URL.

---

## 📋 Current File Locations

### In Repository

```
/workspaces/fix2/
├── bridge/
│   ├── public/
│   │   └── efh-bridge.js          # Source bridge script
│   └── api/
│       └── efh-config.json        # Source configuration
├── dist/
│   ├── efh-bridge.js              # Built bridge script ✅
│   └── api/
│       └── efh-config.json        # Built configuration ✅
└── public/
    ├── efh-bridge.js              # Copied for build ✅
    └── api/
        └── efh-config.json        # Copied for build ✅
```

### Bridge Content

**Script:** `/workspaces/fix2/dist/efh-bridge.js` (9.1 KB)
**Config:** `/workspaces/fix2/dist/api/efh-config.json` (4.0 KB)

Both files are ready to deploy!

---

## 🔧 Troubleshooting Netlify 404

### Check 1: Netlify Site Configuration

```bash
# Check if site exists
curl -I https://elevateforhumanityfix2.netlify.app

# If 404, the site might not be deployed
```

**Possible Issues:**

- Site not linked to GitHub repo
- Build failed
- Site not published
- Wrong publish directory

### Check 2: Build Settings

In Netlify dashboard, verify:

- **Build command:** `rm -rf dist node_modules/.vite && pnpm install && pnpm run build`
- **Publish directory:** `dist`
- **Node version:** 20.11.1

### Check 3: Environment Variables

Required in Netlify:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `NODE_VERSION=20.11.1`
- `PNPM_VERSION=9.7.0`

### Check 4: Deploy Logs

1. Go to Netlify dashboard
2. Click on "Deploys"
3. Check latest deploy log
4. Look for errors

---

## 🎯 Recommended Next Steps

### Immediate (Choose One):

**Option 1: Fix Netlify (Best for long-term)**

1. Log into Netlify dashboard
2. Check site configuration
3. Trigger manual deploy
4. Verify bridge endpoints work
5. Add to Durable

**Option 2: Direct Embed (Quick start)**

1. Copy bridge files from dist/
2. Embed directly in Durable
3. Test functionality
4. Fix Netlify later for autopilot

### After Bridge is Working:

1. ✅ Test all content slots
2. ✅ Verify styling looks good
3. ✅ Check mobile responsiveness
4. ✅ Test on different browsers
5. ✅ Monitor for errors

---

## 📝 Integration Code for Durable

### Full Integration (Copy-Paste Ready)

```html
<!-- ============================================ -->
<!-- EFH Bridge Integration                      -->
<!-- Add to Durable Custom Code                  -->
<!-- ============================================ -->

<!-- Step 1: Add to <head> section -->
<script
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>

<!-- Step 2: Add to page body where you want content -->

<!-- Hero Section (Full-width banner) -->
<div data-efh-slot="hero"></div>

<!-- Programs Grid -->
<section style="max-width: 1200px; margin: 3rem auto; padding: 0 1rem;">
  <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 2rem;">
    Our Programs
  </h2>
  <div data-efh-slot="programs"></div>
</section>

<!-- Features Section -->
<section style="background: #f9fafb; padding: 3rem 1rem;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 2rem;">
      Why Choose Us
    </h2>
    <div data-efh-slot="features"></div>
  </div>
</section>

<!-- Testimonials -->
<section style="max-width: 1200px; margin: 3rem auto; padding: 0 1rem;">
  <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 2rem;">
    Success Stories
  </h2>
  <div data-efh-slot="testimonials"></div>
</section>

<!-- Call to Action -->
<div data-efh-slot="cta"></div>
```

---

## 🔄 Content Updates (After Setup)

### With Netlify (Automatic):

```bash
# 1. Edit configuration
nano bridge/api/efh-config.json

# 2. Commit and push
git add bridge/api/efh-config.json
git commit -m "Update content"
git push origin main

# 3. Autopilot deploys automatically (30 minutes)
# Or trigger manually:
./scripts/deploy-durable-bridge.sh
```

### With Direct Embed (Manual):

1. Edit configuration in repository
2. Copy new config to Durable
3. Save and publish Durable site

---

## 📊 What the Bridge Provides

### Content Sections

1. **Hero Section**
   - Title: "Elevate for Humanity Empowerment Center"
   - Subtitle: Transform Your Future Through Skills Training
   - CTA: "Apply Now" button

2. **Programs (6 total)**
   - Barber Apprenticeship
   - HVAC & Welding
   - Healthcare (CNA/QMA)
   - Drug Testing Business
   - Digital Skills
   - Leadership Development

3. **Features (6 total)**
   - Job Placement
   - Industry Certifications
   - Financial Support
   - Mentorship
   - Flexible Scheduling
   - Fast Track

4. **Testimonials (4 total)**
   - Real success stories from graduates

5. **Call to Action**
   - "Ready to Transform Your Future?"
   - Application button

### Styling

- ✅ Modern gradient backgrounds
- ✅ Hover effects
- ✅ Responsive grid layouts
- ✅ Professional typography
- ✅ Smooth transitions
- ✅ Mobile-friendly

---

## 🤖 Autopilot Features (When Netlify Works)

Once Netlify is configured:

- ✅ Auto-deploy on content changes
- ✅ Health monitoring every 30 minutes
- ✅ Self-healing if bridge fails
- ✅ Automatic pushes every 30 minutes
- ✅ Zero manual intervention

---

## 📞 Support

### Files to Check

- **Setup Guide:** `DURABLE_BRIDGE_SETUP.md`
- **Integration Code:** `DURABLE_INTEGRATION_CODE.html`
- **This Guide:** `BRIDGE_DEPLOYMENT_INSTRUCTIONS.md`

### Scripts to Run

```bash
# Health check
./scripts/durable-bridge-health-check.sh

# Test bridge
./scripts/test-durable-bridge.sh

# Deploy bridge
./scripts/deploy-durable-bridge.sh
```

### Logs to View

```bash
# Health log
cat logs/durable-bridge-health.log

# Status
cat logs/durable-bridge-status.json | jq .
```

---

## ✅ Summary

**Bridge Files:** ✅ Ready in `dist/`  
**Netlify Site:** ❌ Returns 404 (needs configuration)  
**Durable Site:** ✅ Live at www.elevateforhumanity.org  
**Integration Code:** ✅ Ready to copy-paste

**Next Step:** Choose Option A (fix Netlify) or Option B (direct embed)

---

**Last Updated:** 2025-11-01 09:22 UTC  
**Status:** Awaiting Netlify configuration or direct embed
