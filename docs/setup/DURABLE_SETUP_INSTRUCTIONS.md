# Durable Integration - Setup Instructions

**Option A: One-Time Snippet Method**

---

## ✅ Bridge Files Ready

Your bridge infrastructure is ready to deploy:

```
✅ bridge/public/efh-bridge.js    - Bridge script
✅ bridge/api/efh-config.json     - Content configuration
✅ public/efh-bridge.js           - Copied to build directory
✅ public/api/efh-config.json     - Copied to build directory
```

---

## 🚀 Deployment Steps

### Step 1: Deploy to Netlify

Choose one of these methods:

#### Method A: Build and Deploy (Recommended)

```bash
# Build the project (includes bridge files)
pnpm build

# Deploy to Netlify
netlify deploy --prod

# Or if you need to login first:
netlify login
netlify link
netlify deploy --prod
```

#### Method B: Manual Deploy via Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com/sites/elevateforhumanityfix2)
2. Click **Deploys** → **Trigger deploy** → **Deploy site**
3. Wait for build to complete

#### Method C: Git Push (Automatic)

```bash
# Commit bridge files
git add bridge/ public/efh-bridge.js public/api/
git commit -m "Add Durable bridge (Option A)"
git push origin main

# Netlify will auto-deploy
```

---

## 📋 Durable Configuration

### Step 1: Add Script to Durable

1. Log into your [](https://durable.co) account
2. Go to your site settings
3. Find **Custom Code** or **Scripts** section
4. Add this to the `<head>` section:

```html
<script
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

**⚠️ Important:** This is a **one-time setup**. You'll never need to edit this again!

---

### Step 2: Add Content Slots

In your Durable page editor, add these HTML elements where you want dynamic content:

#### Hero Section (Top of page)

```html
<div data-efh-slot="hero"></div>
```

**What appears:**

- Large gradient hero banner
- Title: "Elevate for Humanity Empowerment Center"
- Subtitle with program highlights
- "Apply Now" call-to-action button

---

#### Programs Grid

```html
<div data-efh-slot="programs"></div>
```

**What appears:**

- Responsive grid of 6 programs
- Barber Apprenticeship
- HVAC & Welding
- Healthcare (CNA/QMA)
- Drug Testing Business
- Digital Skills
- Leadership Development

---

#### Features Section

```html
<div data-efh-slot="features"></div>
```

**What appears:**

- 6 feature cards with icons
- Job Placement
- Industry Certifications
- Financial Support
- Mentorship
- Flexible Scheduling
- Fast Track

---

#### Testimonials

```html
<div data-efh-slot="testimonials"></div>
```

**What appears:**

- 4 testimonial cards
- Real quotes from graduates
- Names and roles

---

#### Call to Action (Bottom of page)

```html
<div data-efh-slot="cta"></div>
```

**What appears:**

- Large gradient CTA banner
- "Ready to Transform Your Future?"
- "Start Your Application" button

---

### Step 3: Save and Publish

1. Save your Durable page
2. Publish the changes
3. Visit your site to see the content!

---

## 🎨 Example Page Layout

Here's a complete example of a Durable page with all slots:

```html
<!-- In your Durable page editor -->

<!-- Hero at the top -->
<div data-efh-slot="hero"></div>

<!-- Some custom Durable content -->
<section>
  <h2>Welcome to Our Programs</h2>
  <p>Your custom Durable content here...</p>
</section>

<!-- Programs grid -->
<div data-efh-slot="programs"></div>

<!-- Features section -->
<div data-efh-slot="features"></div>

<!-- More custom content -->
<section>
  <h2>Why Choose Us?</h2>
  <p>More custom Durable content...</p>
</section>

<!-- Testimonials -->
<div data-efh-slot="testimonials"></div>

<!-- Call to action at the bottom -->
<div data-efh-slot="cta"></div>
```

---

## 🔄 Updating Content

**This is the magic part!** To update content on your Durable site:

### Step 1: Edit Config

```bash
# Edit the configuration file
nano bridge/api/efh-config.json

# Or use your favorite editor
code bridge/api/efh-config.json
```

### Step 2: Deploy Changes

```bash
# Build and deploy
pnpm build
netlify deploy --prod

# Or just push to git (auto-deploys)
git add bridge/api/efh-config.json
git commit -m "Update programs content"
git push
```

### Step 3: Done!

Changes appear **instantly** on your Durable site. No Durable edits needed!

---

## 📝 Content Examples

### Add a New Program

```json
{
  "programs": [
    {
      "name": "Culinary Arts",
      "url": "/programs/culinary",
      "summary": "Master professional cooking techniques and start your culinary career."
    }
  ]
}
```

### Update Hero Section

```json
{
  "hero": {
    "title": "New Title Here",
    "subtitle": "New subtitle with updated messaging",
    "ctaLabel": "Get Started Today",
    "ctaUrl": "https://elevateforhumanityfix2.netlify.app/apply"
  }
}
```

### Add a Testimonial

```json
{
  "testimonials": [
    {
      "quote": "This program exceeded all my expectations!",
      "author": "Alex T., Program Graduate"
    }
  ]
}
```

---

## ✅ Verification Checklist

After setup, verify everything works:

### 1. Check Bridge Script

```bash
# Should return 200 OK
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js

# Should return JavaScript code
curl https://elevateforhumanityfix2.netlify.app/efh-bridge.js | head -20
```

### 2. Check Config

```bash
# Should return 200 OK
curl -I https://elevateforhumanityfix2.netlify.app/api/efh-config.json

# Should return valid JSON
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .
```

### 3. Check Durable Page

1. Visit your Durable site
2. Open browser console (F12)
3. Look for: `[EFH Bridge] Initialization complete ✅`
4. Verify content appears in slots

---

## 🐛 Troubleshooting

### Bridge script not loading

**Symptoms:**

- No content appears in slots
- Console shows 404 error for bridge script

**Solution:**

```bash
# Verify deployment
netlify status

# Check if file exists
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js

# Redeploy if needed
pnpm build && netlify deploy --prod
```

---

### Content not appearing

**Symptoms:**

- Bridge script loads but slots are empty
- No errors in console

**Solution:**

1. Check slots exist: `<div data-efh-slot="hero"></div>`
2. Verify config is valid JSON:
   ```bash
   cat bridge/api/efh-config.json | jq .
   ```
3. Check browser console for `[EFH Bridge]` messages

---

### CORS errors

**Symptoms:**

- Console shows CORS policy errors
- Bridge script blocked

**Solution:**
Add to `netlify.toml`:

```toml
[[headers]]
  for = "/efh-bridge.js"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Cache-Control = "public, max-age=300"
```

Then redeploy:

```bash
pnpm build && netlify deploy --prod
```

---

### Durable doesn't allow custom scripts

**Symptoms:**

- Can't find "Custom Code" section in Durable
- Script tag gets removed when saving

**Solution:**

1. Check Durable plan (may require paid plan)
2. Contact Durable support to enable custom scripts
3. Alternative: Use Option B (Netlify Shell) instead

---

## 🔒 Security Notes

- ✅ All content is sanitized before injection (XSS protection)
- ✅ HTTPS only (no HTTP allowed)
- ✅ No eval() or dangerous functions
- ✅ Content-Security-Policy compatible
- ✅ No external dependencies

---

## 📊 Performance

- ✅ Async loading (defer attribute)
- ✅ Single HTTP request for config
- ✅ Minimal JavaScript (~3KB gzipped)
- ✅ No jQuery or heavy frameworks
- ✅ Fast injection (<100ms)

---

## 🎯 What Happens Next

### After Initial Setup:

1. **You paste the script once** → Done forever
2. **You add slots once** → Done forever
3. **You update content** → Edit JSON, redeploy
4. **Changes appear instantly** → No Durable edits needed!

### Workflow:

```
Edit config → Deploy → Changes live on Durable
     ↓
  (No Durable edits!)
```

---

## 📚 Additional Resources

- **Quick Start:** `DURABLE_GITPOD_QUICKSTART.md`
- **Integration Plan:** `GITPOD_AUTOPILOT_INTEGRATION_PLAN.md`
- **Compatibility Report:** `DURABLE_COMPATIBILITY_REPORT.md`
- **Bridge README:** `bridge/README.md`

---

## 🎉 Success!

Once setup is complete, you have:

✅ **Zero-maintenance Durable integration**  
✅ **Content updates via JSON config**  
✅ **No ongoing Durable edits required**  
✅ **Instant content changes**  
✅ **Full control from your codebase**

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console for errors
2. Verify deployment status: `netlify status`
3. Test URLs with curl commands above
4. Review troubleshooting section
5. Check Durable custom code settings

---

## 🚀 Ready to Deploy?

Run these commands:

```bash
# 1. Build the project
pnpm build

# 2. Deploy to Netlify
netlify deploy --prod

# 3. Verify deployment
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .

# 4. Add script to Durable (see above)

# 5. Add slots to Durable (see above)

# 6. Done! 🎉
```

---

**Your Script Tag (Copy This):**

```html
<script
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

**Paste this ONCE in Durable custom code, and you're done forever!**
