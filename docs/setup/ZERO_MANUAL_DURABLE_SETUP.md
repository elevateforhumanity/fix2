# Zero-Manual Durable Setup

**Fully automated deployment - no manual steps required**

---

## 🚀 One Command Setup

Run this single command:

```bash
./scripts/setup-durable-option-a.sh
```

**That's it!** The script will:

- ✅ Verify all files
- ✅ Validate configuration
- ✅ Copy files to public directory
- ✅ Build the project
- ✅ Commit and push to GitHub
- ✅ Trigger auto-deployment via GitHub Actions
- ✅ Provide Durable integration code

**Time:** ~2 minutes  
**Manual steps:** 0 (except one-time Durable paste)

---

## 📋 What Gets Deployed

### Bridge Script

- **File:** `efh-bridge.js` (8.8KB)
- **Purpose:** Injects content into Durable slots
- **URL:** `https://elevateforhumanityfix2.netlify.app/efh-bridge.js

### Configuration

- **File:** `efh-config.json` (4.0KB)
- **Purpose:** Dynamic content (programs, features, testimonials)
- **URL:** `https://elevateforhumanityfix2.netlify.app/api/efh-config.json

### Content Included

- ✅ Hero section with CTA
- ✅ 6 programs (Barber, HVAC, Healthcare, Drug Testing, Digital, Leadership)
- ✅ 6 features (Job Placement, Certifications, Financial Support, etc.)
- ✅ 4 testimonials from graduates
- ✅ Call-to-action section

---

## 🔄 Automated Workflow

### Initial Setup (One-Time)

```bash
# Run the setup script
./scripts/setup-durable-option-a.sh

# Script automatically:
# 1. Validates files
# 2. Builds project
# 3. Commits to git
# 4. Pushes to GitHub
# 5. Triggers GitHub Actions
# 6. Deploys to Netlify
```

### Future Updates (Zero Manual)

```bash
# 1. Edit content
nano bridge/api/efh-config.json

# 2. Deploy (automated)
./scripts/deploy-durable-bridge.sh

# OR just push to git:
git add bridge/api/efh-config.json
git commit -m "Update programs"
git push

# GitHub Actions automatically:
# - Builds project
# - Deploys to Netlify
# - Updates live site
```

---

## 🤖 GitHub Actions Automation

**Workflow:** `.github/workflows/durable-bridge-auto-deploy.yml`

**Triggers:**

- Push to `main` branch
- Changes in `bridge/**` directory
- Manual workflow dispatch

**Actions:**

1. Checkout code
2. Setup Node.js and pnpm
3. Install dependencies
4. Copy bridge files
5. Build project
6. Deploy to Netlify
7. Verify deployment
8. Create summary with Durable code

**View Progress:**
[https://github.com/elevateforhumanity/fix2/actions](https://github.com/elevateforhumanity/fix2/actions)

---

## 📝 One-Time Durable Setup

After running the setup script, add this to Durable **once**:

### Script Tag (in `<head>`)

```html
<script
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

### Content Slots (in page body)

```html
<div data-efh-slot="hero"></div>
<div data-efh-slot="programs"></div>
<div data-efh-slot="features"></div>
<div data-efh-slot="testimonials"></div>
<div data-efh-slot="cta"></div>
```

**That's it!** Never edit Durable again.

---

## 🎯 Update Workflow

### To Update Content:

**Option 1: Quick Script**

```bash
# Edit config
nano bridge/api/efh-config.json

# Deploy automatically
./scripts/deploy-durable-bridge.sh
```

**Option 2: Git Push**

```bash
# Edit config
nano bridge/api/efh-config.json

# Commit and push
git add bridge/api/efh-config.json
git commit -m "Update content"
git push

# GitHub Actions auto-deploys
```

**Option 3: GitHub Web UI**

1. Go to: [bridge/api/efh-config.json](https://github.com/elevateforhumanity/fix2/blob/main/bridge/api/efh-config.json)
2. Click "Edit" (pencil icon)
3. Make changes
4. Commit directly to main
5. GitHub Actions auto-deploys

**Result:** Changes appear on Durable in ~2 minutes. No Durable edits needed!

---

## 📊 Content Examples

### Add a New Program

```json
{
  "programs": [
    {
      "name": "Culinary Arts",
      "url": "/programs/culinary",
      "summary": "Master professional cooking and start your culinary career."
    }
  ]
}
```

### Update Hero Section

```json
{
  "hero": {
    "title": "Transform Your Future Today",
    "subtitle": "New programs starting monthly",
    "ctaLabel": "Apply Now",
    "ctaUrl": "https://elevateforhumanityfix2.netlify.app/apply"
  }
}
```

### Add a Testimonial

```json
{
  "testimonials": [
    {
      "quote": "Best decision I ever made!",
      "author": "Jane D., Graduate"
    }
  ]
}
```

---

## ✅ Verification

### Check Deployment Status

```bash
# View GitHub Actions
open https://github.com/elevateforhumanity/fix2/actions

# Check Netlify
netlify status

# Verify files are live
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .
```

### Test in Browser

1. Visit your Durable site
2. Open console (F12)
3. Look for: `[EFH Bridge] Initialization complete ✅`
4. Verify content appears in slots

---

## 🔧 Scripts Reference

### Setup Script

```bash
./scripts/setup-durable-option-a.sh
```

- **Purpose:** Initial one-time setup
- **Actions:** Validates, builds, commits, pushes, deploys
- **Time:** ~2 minutes

### Deploy Script

```bash
./scripts/deploy-durable-bridge.sh
```

- **Purpose:** Update content and deploy
- **Actions:** Copies files, builds, commits, pushes
- **Time:** ~1 minute

---

## 🎨 Customization

### Change Colors

Edit `bridge/public/efh-bridge.js`:

```javascript
// Hero gradient
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

// CTA button
background: #ff7a00;

// Change to your brand colors
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Add New Slots

1. Add to `bridge/public/efh-bridge.js`:

```javascript
if (config.pricing && getSlot('pricing')) {
  const pricingSlot = getSlot('pricing');
  pricingSlot.innerHTML = `<div>${config.pricing.content}</div>`;
}
```

2. Add to `bridge/api/efh-config.json`:

```json
{
  "pricing": {
    "content": "Your pricing content here"
  }
}
```

3. Add to Durable:

```html
<div data-efh-slot="pricing"></div>
```

4. Deploy:

```bash
./scripts/deploy-durable-bridge.sh
```

---

## 🐛 Troubleshooting

### Deployment Failed

**Check GitHub Actions:**

```bash
open https://github.com/elevateforhumanity/fix2/actions
```

**Re-run workflow:**

1. Go to failed workflow
2. Click "Re-run all jobs"

### Content Not Updating

**Clear cache:**

```bash
# Force rebuild
git commit --allow-empty -m "Force rebuild"
git push
```

**Check Netlify:**

```bash
netlify status
netlify open
```

### Bridge Script Not Loading

**Verify deployment:**

```bash
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js
# Should return: 200 OK
```

**Check Durable:**

- Verify script tag is in `<head>`
- Check browser console for errors
- Ensure Durable allows custom scripts

---

## 📈 Benefits

### Zero Manual Work

- ✅ No manual builds
- ✅ No manual deployments
- ✅ No Durable edits (after initial setup)
- ✅ No file copying
- ✅ No verification steps

### Fully Automated

- ✅ Git push → Auto-deploy
- ✅ Config change → Auto-update
- ✅ Build → Test → Deploy pipeline
- ✅ Deployment verification

### Developer Friendly

- ✅ Edit JSON, not HTML
- ✅ Version controlled content
- ✅ Git history of all changes
- ✅ Easy rollback (git revert)

### Fast Updates

- ✅ Edit config: 30 seconds
- ✅ Deploy: 2 minutes (automated)
- ✅ Live on Durable: 2 minutes
- ✅ Total: ~5 minutes

---

## 🎯 Summary

### Initial Setup

```bash
./scripts/setup-durable-option-a.sh
# Add script to Durable (one-time)
# Add slots to Durable (one-time)
# Done!
```

### Future Updates

```bash
# Edit config
nano bridge/api/efh-config.json

# Deploy (automated)
git add . && git commit -m "Update" && git push

# OR use quick script
./scripts/deploy-durable-bridge.sh
```

### Result

- ✅ Zero manual deployment steps
- ✅ Zero Durable edits (after setup)
- ✅ Fully automated pipeline
- ✅ Content updates in minutes

---

## 📚 Documentation

- **This guide:** Zero-manual setup
- **Setup instructions:** `DURABLE_SETUP_INSTRUCTIONS.md`
- **Bridge docs:** `bridge/README.md`
- **Quick start:** `DURABLE_GITPOD_QUICKSTART.md`
- **Integration plan:** `GITPOD_AUTOPILOT_INTEGRATION_PLAN.md`

---

## 🚀 Ready to Go!

Run the setup:

```bash
./scripts/setup-durable-option-a.sh
```

Then add the script to Durable (provided by setup script).

**That's it! Zero manual work from now on.** 🎉

---

**Status:** ✅ FULLY AUTOMATED  
**Manual Steps:** 1 (paste script in Durable)  
**Future Updates:** 0 manual steps  
**Deployment Time:** ~2 minutes (automated)
