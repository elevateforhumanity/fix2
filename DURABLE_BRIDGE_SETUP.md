# Bridge Setup for www.elevateforhumanity.org (Durable)

**Status:** ✅ Bridge files ready to deploy  
**Target:** www.elevateforhumanity.org (Durable.co site)

---

## 🎯 What We Have

### Bridge Files Built ✅

```bash
dist/efh-bridge.js          # 9.1 KB - Bridge script
dist/api/efh-config.json    # 4.0 KB - Configuration
```

These files are ready and will be deployed to Netlify.

---

## 🚀 Deployment Options

### Option 1: Deploy to Netlify Subdomain (Recommended First)

This deploys the bridge to `elevateforhumanityfix2.netlify.app` so you can test it before adding to Durable.

```bash
# Deploy to Netlify
cd /workspaces/fix2
pnpm build
netlify deploy --prod

# Or trigger via GitHub
git push origin main
```

**Bridge URLs after deployment:**

- Script: `https://elevateforhumanityfix2.netlify.app/efh-bridge.js`
- Config: `https://elevateforhumanityfix2.netlify.app/api/efh-config.json`

### Option 2: Add Bridge to Durable Site

Once deployed to Netlify, add this to your Durable.co site:

#### Step 1: Add Script to Durable

In your Durable site settings, go to **Custom Code** and add to the `<head>` section:

```html
<script
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

#### Step 2: Add Content Slots to Durable Pages

In your Durable page editor, add these HTML blocks where you want content:

```html
<!-- Hero Section -->
<div data-efh-slot="hero"></div>

<!-- Programs Grid -->
<div data-efh-slot="programs"></div>

<!-- Features Section -->
<div data-efh-slot="features"></div>

<!-- Testimonials -->
<div data-efh-slot="testimonials"></div>

<!-- Call to Action -->
<div data-efh-slot="cta"></div>
```

---

## 📋 What the Bridge Will Inject

### Hero Section

- Title: "Elevate for Humanity Empowerment Center"
- Subtitle: Transform Your Future Through Skills Training
- CTA Button: "Apply Now"

### Programs (6 Programs)

1. Barber Apprenticeship
2. HVAC & Welding
3. Healthcare (CNA/QMA)
4. Drug Testing Business
5. Digital Skills
6. Leadership Development

### Features (6 Features)

- Job Placement
- Industry Certifications
- Financial Support
- Mentorship
- Flexible Scheduling
- Fast Track

### Testimonials (4 Testimonials)

- Real success stories from graduates

### Call to Action

- "Ready to Transform Your Future?"
- Application button

---

## 🔄 How It Works

```
Durable Site (www.elevateforhumanity.org)
    ↓
Loads bridge script from Netlify
    ↓
Bridge fetches config from Netlify
    ↓
Bridge injects content into slots
    ↓
Content appears on Durable site
```

**Benefits:**

- ✅ Update content by editing `bridge/api/efh-config.json`
- ✅ No need to edit Durable site after initial setup
- ✅ Automatic deployments via autopilot
- ✅ Version control for all content

---

## 🎨 Styling

The bridge includes inline styles that match modern design:

- Gradient backgrounds
- Hover effects
- Responsive grid layouts
- Professional typography
- Smooth transitions

All styles are self-contained and won't conflict with Durable's styles.

---

## 🔧 Testing Before Adding to Durable

### Test the Bridge Script

```bash
# Check if script is accessible
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js

# Check if config is accessible
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .

# Run health check
./scripts/durable-bridge-health-check.sh

# Run functionality tests
./scripts/test-durable-bridge.sh
```

### Test in Browser

1. Open browser console (F12)
2. Visit a test page with the bridge script
3. Look for: `[EFH Bridge] Initialization complete ✅`
4. Verify content appears in slots

---

## 📝 Step-by-Step Setup

### Phase 1: Deploy Bridge to Netlify ✅

```bash
# Already done! Bridge files are in dist/
# Just need to deploy

cd /workspaces/fix2
git push origin main

# Or manual deploy
netlify deploy --prod
```

### Phase 2: Test Bridge Endpoints

```bash
# Wait 2-3 minutes for deployment
# Then test endpoints

curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .
```

### Phase 3: Add to Durable (Manual)

1. Log into Durable.co
2. Go to your site settings
3. Find "Custom Code" or "Head Code" section
4. Add the script tag (see above)
5. Save and publish

### Phase 4: Add Content Slots (Manual)

1. Edit your Durable pages
2. Add HTML blocks with `data-efh-slot` attributes
3. Save and publish
4. Verify content appears

---

## 🔄 Updating Content

Once set up, updating content is easy:

```bash
# 1. Edit configuration
nano bridge/api/efh-config.json

# 2. Commit and push
git add bridge/api/efh-config.json
git commit -m "Update bridge content"
git push origin main

# 3. Wait for autopilot to deploy (30 minutes)
# Or trigger manually:
gh workflow run durable-bridge-auto-deploy.yml

# 4. Changes appear on Durable site automatically!
```

---

## 🤖 Autopilot Integration

The bridge is integrated with autopilot:

- ✅ **Auto-deploy** on changes to `bridge/**`
- ✅ **Health monitoring** every 30 minutes
- ✅ **Auto-healing** if bridge fails
- ✅ **Automatic pushes** every 30 minutes

You don't need to manually deploy after the initial setup!

---

## 🔗 URLs Summary

### Current Status

- **Durable Site:** https://www.elevateforhumanity.org (live)
- **Netlify Site:** https://elevateforhumanityfix2.netlify.app (404 - needs deployment)

### After Deployment

- **Bridge Script:** https://elevateforhumanityfix2.netlify.app/efh-bridge.js
- **Configuration:** https://elevateforhumanityfix2.netlify.app/api/efh-config.json

### Durable Integration

- **Main Site:** https://www.elevateforhumanity.org
- **With Bridge:** Content injected via bridge script

---

## ⚠️ Important Notes

1. **Durable Site Stays Separate**
   - Your Durable site remains on www.elevateforhumanity.org
   - Bridge files are hosted on Netlify
   - Bridge injects content into Durable

2. **Two Deployments**
   - Durable: Your main site (managed by Durable)
   - Netlify: Bridge files only (managed by autopilot)

3. **CORS Headers**
   - Bridge script must be accessible from Durable
   - Netlify automatically handles CORS
   - No additional configuration needed

4. **Caching**
   - Bridge script is cached for 1 hour
   - Config is cached for 5 minutes
   - Changes may take a few minutes to appear

---

## 🚀 Ready to Deploy?

Run this command to deploy the bridge to Netlify:

```bash
cd /workspaces/fix2
git push origin main
```

Then wait 2-3 minutes and verify:

```bash
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
```

Once you see `HTTP/2 200`, you can add the script to your Durable site!

---

## 📞 Need Help?

- **Health Check:** `./scripts/durable-bridge-health-check.sh`
- **Test Bridge:** `./scripts/test-durable-bridge.sh`
- **Deploy Bridge:** `./scripts/deploy-durable-bridge.sh`
- **View Logs:** `cat logs/durable-bridge-health.log`

---

**Status:** ✅ Ready to deploy  
**Next Step:** Push to GitHub to trigger deployment
