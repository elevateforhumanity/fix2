# 🚨 URGENT: Deploy New Design System

## Current Situation

- ✅ New design system code is in GitHub (commit 15a2e18b)
- ❌ Netlify is showing OLD build (hasn't deployed new code)
- ❌ GitHub Actions can't deploy without secrets

## 🎯 FASTEST FIX (Choose One)

### Option 1: Netlify Dashboard (2 minutes - NO SETUP NEEDED)

**This is the easiest and fastest way:**

1. **Go to Netlify:**
   - Visit: https://app.netlify.com/sites/elevateforhumanityfix/deploys

2. **Trigger Deploy:**
   - Click the **"Trigger deploy"** button (top right corner)
   - Select **"Deploy site"**

3. **Wait for Build:**
   - Watch the build progress (takes 1-2 minutes)
   - Status will show "Building" → "Published"

4. **Verify:**
   - Visit: https://elevateforhumanityfix.netlify.app
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - You should see the new design with "Sign In" and "Create Account" buttons

**✅ This will deploy the latest code from GitHub immediately!**

---

### Option 2: Netlify CLI (if you have Netlify access)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Go to project directory
cd /workspaces/fix2

# Build the project
pnpm install
pnpm build

# Deploy to production
netlify deploy --prod --dir=dist --site=elevateforhumanityfix
```

---

### Option 3: Configure GitHub Secrets (for automatic future deploys)

**This enables automatic deployment on every push to main.**

**Step 1: Get Netlify Credentials**

1. **NETLIFY_AUTH_TOKEN:**
   - Go to: https://app.netlify.com/user/applications
   - Click "New access token"
   - Name: "GitHub Actions Deploy"
   - Copy the token

2. **NETLIFY_SITE_ID:**
   - Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/general
   - Find "API ID" under "Site information"
   - Copy the ID (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

**Step 2: Add to GitHub Secrets**

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions

2. Click "New repository secret"

3. Add these secrets:
   - Name: `NETLIFY_AUTH_TOKEN`, Value: (paste token from step 1)
   - Name: `NETLIFY_SITE_ID`, Value: (paste ID from step 1)
   - Name: `VITE_SUPABASE_URL`, Value: (your Supabase URL)
   - Name: `VITE_SUPABASE_ANON_KEY`, Value: (your Supabase anon key)

**Step 3: Trigger Deployment**

```bash
# Make an empty commit to trigger GitHub Actions
git commit --allow-empty -m "trigger: deploy new design system"
git push origin main
```

**Step 4: Watch Deployment**

- Go to: https://github.com/elevateforhumanity/fix2/actions
- Click on the running workflow
- Wait for "Deploy to Netlify" to complete (2-3 minutes)

---

## 🔍 How to Verify Changes Are Live

After deploying, check these:

1. **Homepage:**
   - Should have gradient hero (red to orange)
   - "Sign In" and "Create Account" buttons in top right
   - Trust metrics section (WIOA/WRG eligible, etc.)
   - Featured programs with cards

2. **Navigation:**
   - Professional sticky header
   - Dropdown menu for Programs
   - Mobile responsive hamburger menu

3. **Program Pages:**
   - Visit: https://elevateforhumanityfix.netlify.app/programs/barber
   - Should have tabbed interface (Overview, Curriculum, Schedule, etc.)
   - Sticky sidebar with "Apply Now" button

4. **Fonts:**
   - Headings should use Poppins font
   - Body text should use Inter font

5. **Colors:**
   - Primary red: #E41E26
   - Secondary orange: #F97316
   - Professional color scheme throughout

---

## 🐛 Troubleshooting

### "I triggered deploy but still see old site"

**Clear your browser cache:**

- **Chrome/Edge:** `Ctrl+Shift+Delete` → Clear cached images and files
- **Firefox:** `Ctrl+Shift+Delete` → Cached Web Content
- **Safari:** `Cmd+Option+E`
- **Or:** Open in Incognito/Private mode

### "Netlify build failed"

**Check build logs:**

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys
2. Click the failed deploy
3. Click "Deploy log"
4. Look for error messages

**Common issues:**

- Missing environment variables → Add to Netlify site settings
- Build command error → Check `netlify.toml` configuration
- Dependency issues → Check `package.json` and `pnpm-lock.yaml`

### "GitHub Actions workflow not running"

**Check workflow status:**

1. Go to: https://github.com/elevateforhumanity/fix2/actions
2. Look for "Deploy to Netlify" workflow
3. If not running, secrets are missing

**Fix:**

- Add required secrets (see Option 3 above)
- Or use Option 1 (Netlify Dashboard) instead

---

## 📊 What Changed

**Commit 15a2e18b includes:**

- ✅ Professional EFH design system (Tailwind + CSS variables)
- ✅ New homepage with hero, trust metrics, program catalog
- ✅ Tabbed program detail pages
- ✅ Professional navigation with auth buttons
- ✅ SEO metadata and schema.org markup
- ✅ Branded 404 page
- ✅ Responsive design for mobile/tablet/desktop
- ✅ Poppins + Inter fonts from Google Fonts
- ✅ Accessibility improvements

---

## ⚡ TL;DR - DO THIS NOW

**Fastest solution (2 minutes):**

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys
2. Click "Trigger deploy" → "Deploy site"
3. Wait 2 minutes
4. Visit: https://elevateforhumanityfix.netlify.app
5. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`

**Done! Your new design will be live.** 🚀

---

**Questions?** Check `GITHUB_SECRETS_SETUP.md` for detailed secret configuration instructions.
