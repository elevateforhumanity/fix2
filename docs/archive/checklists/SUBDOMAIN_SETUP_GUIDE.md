# 🚀 Subdomain Setup Guide - portal.elevateforhumanity.org

## Overview

**Goal:** Deploy the new LMS design to `portal.elevateforhumanity.org` while keeping the marketing site on `www.elevateforhumanity.org`

**Architecture:**

- **www.elevateforhumanity.org** → Durable.co (marketing site)
- **portal.elevateforhumanity.org** → Netlify (LMS/student portal)

---

## Step 1: Configure Netlify Custom Domain

### 1.1 Add Custom Domain in Netlify

1. **Go to Netlify Site Settings:**
   - Visit: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain

2. **Add Custom Domain:**
   - Click "Add custom domain" button
   - Enter: `portal.elevateforhumanity.org`
   - Click "Verify"
   - Click "Add domain" (ignore the warning about not owning it yet)

3. **Configure DNS:**
   - Netlify will show you the DNS configuration needed
   - Keep this page open for reference

### 1.2 Alternative: Use Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link to site
netlify link --name elevateforhumanityfix

# Add custom domain
netlify domains:add portal.elevateforhumanity.org
```

---

## Step 2: Configure DNS Records

### 2.1 Find Your DNS Provider

Your domain `elevateforhumanity.org` is registered with a domain registrar. Common providers:

- GoDaddy
- Namecheap
- Cloudflare
- Google Domains
- AWS Route 53

**To find your provider:**

```bash
whois elevateforhumanity.org | grep -i "registrar"
```

### 2.2 Add CNAME Record

**Log in to your DNS provider and add:**

```
Type:  CNAME
Name:  portal
Value: elevateforhumanityfix.netlify.app
TTL:   3600 (or Auto)
```

**Example for different providers:**

**Cloudflare:**

1. Go to: https://dash.cloudflare.com
2. Select domain: elevateforhumanity.org
3. Go to: DNS → Records
4. Click "Add record"
5. Type: CNAME
6. Name: portal
7. Target: elevateforhumanityfix.netlify.app
8. Proxy status: DNS only (gray cloud)
9. Click "Save"

**GoDaddy:**

1. Go to: https://dcc.godaddy.com/manage/dns
2. Select: elevateforhumanity.org
3. Click "Add" under DNS Records
4. Type: CNAME
5. Name: portal
6. Value: elevateforhumanityfix.netlify.app
7. TTL: 1 Hour
8. Click "Save"

**Namecheap:**

1. Go to: https://ap.www.namecheap.com/domains/list
2. Click "Manage" next to elevateforhumanity.org
3. Go to: Advanced DNS
4. Click "Add New Record"
5. Type: CNAME Record
6. Host: portal
7. Value: elevateforhumanityfix.netlify.app
8. TTL: Automatic
9. Click "Save"

### 2.3 Verify DNS Configuration

**Wait 5-10 minutes, then check:**

```bash
# Check if DNS is propagated
dig portal.elevateforhumanity.org

# Should show CNAME pointing to Netlify
# Look for: portal.elevateforhumanity.org. 3600 IN CNAME elevateforhumanityfix.netlify.app.
```

**Or use online tool:**

- Visit: https://dnschecker.org
- Enter: portal.elevateforhumanity.org
- Type: CNAME
- Check propagation globally

---

## Step 3: Enable HTTPS in Netlify

### 3.1 Provision SSL Certificate

1. **Go to Netlify Domain Settings:**
   - Visit: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain

2. **Enable HTTPS:**
   - Scroll to "HTTPS" section
   - Click "Verify DNS configuration"
   - Click "Provision certificate"
   - Wait 1-2 minutes for certificate to be issued

3. **Force HTTPS:**
   - Toggle "Force HTTPS" to ON
   - This redirects http:// to https://

### 3.2 Verify HTTPS

```bash
# Check SSL certificate
curl -I https://portal.elevateforhumanity.org

# Should return: HTTP/2 200
```

---

## Step 4: Configure GitHub Secrets

**For automatic deployments, add these secrets:**

**Go to:** https://github.com/elevateforhumanity/fix2/settings/secrets/actions

### Required Secrets:

**1. NETLIFY_AUTH_TOKEN**

- Get from: https://app.netlify.com/user/applications
- Click "New access token"
- Name: "GitHub Actions - Portal Deploy"
- Copy token and add to GitHub Secrets

**2. NETLIFY_SITE_ID**

- Get from: https://app.netlify.com/sites/elevateforhumanityfix/settings/general
- Copy "API ID" (under Site details)
- Add to GitHub Secrets

**3. VITE_SUPABASE_URL**

- Get from: https://app.supabase.com/project//settings/api
- Copy "Project URL"
- Add to GitHub Secrets

**4. VITE_SUPABASE_ANON_KEY**

- Get from: https://app.supabase.com/project//settings/api
- Copy "anon public" key
- Add to GitHub Secrets

### Add Secrets via GitHub CLI:

```bash
# Set secrets (you'll be prompted for values)
gh secret set NETLIFY_AUTH_TOKEN --repo elevateforhumanity/fix2
gh secret set NETLIFY_SITE_ID --repo elevateforhumanity/fix2
gh secret set VITE_SUPABASE_URL --repo elevateforhumanity/fix2
gh secret set VITE_SUPABASE_ANON_KEY --repo elevateforhumanity/fix2
```

---

## Step 5: Update Main Site Links

### 5.1 Update Durable.co Site

**Log in to Durable.co and update these links:**

**Navigation Links:**

- "Student Login" → `https://portal.elevateforhumanity.org/login
- "Student Portal" → `https://portal.elevateforhumanity.org
- "Student Dashboard" → `https://portal.elevateforhumanity.org/lms/dashboard

**Call-to-Action Buttons:**

- "Apply Now" → `https://portal.elevateforhumanity.org/apply
- "Enroll" → `https://portal.elevateforhumanity.org/apply
- "Get Started" → `https://portal.elevateforhumanity.org/apply

### 5.2 Update Footer Links

**Add to footer on www.elevateforhumanity.org:**

```
Student Resources:
- Student Portal: https://portal.elevateforhumanity.org
- Login: https://portal.elevateforhumanity.org/login
- My Courses: https://portal.elevateforhumanity.org/lms
```

---

## Step 6: Test Deployment

### 6.1 Trigger Deployment

```bash
# Make an empty commit to trigger GitHub Actions
git commit --allow-empty -m "deploy: trigger portal deployment"
git push origin main
```

### 6.2 Watch Deployment

1. **GitHub Actions:**
   - Go to: https://github.com/elevateforhumanity/fix2/actions
   - Click on "Deploy to Netlify" workflow
   - Watch build progress

2. **Netlify Dashboard:**
   - Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys
   - Watch deploy progress
   - Should show "Published" when complete

### 6.3 Verify Portal

**Visit:** https://portal.elevateforhumanity.org

**Check:**

- ✅ Homepage loads with new design
- ✅ Navigation shows "Sign In" and "Create Account"
- ✅ Programs page works
- ✅ Student login page accessible
- ✅ HTTPS is enabled (padlock icon)
- ✅ Responsive design on mobile

---

## Step 7: Update Documentation

### 7.1 Update README.md

```bash
# Update production URLs in README
sed -i 's|https://elevateforhumanity.org|https://portal.elevateforhumanity.org|g' README.md
```

### 7.2 Update Environment Variables

**Create `.env.production`:**

```bash
VITE_SITE_URL=https://portal.elevateforhumanity.org
VITE_PUBLIC_URL=https://portal.elevateforhumanity.org
VITE_SITE_NAME="Elevate for Humanity - Student Portal"
```

---

## Troubleshooting

### DNS Not Propagating

**Issue:** portal.elevateforhumanity.org not resolving

**Solutions:**

1. Wait 24-48 hours for full DNS propagation
2. Clear DNS cache: `sudo systemd-resolve --flush-caches` (Linux)
3. Use different DNS server: `8.8.8.8` (Google DNS)
4. Check DNS with: `dig portal.elevateforhumanity.org @8.8.8.8`

### SSL Certificate Not Provisioning

**Issue:** HTTPS not working

**Solutions:**

1. Verify DNS is fully propagated
2. Check CNAME points to Netlify (not IP address)
3. Wait 1-2 hours after DNS propagation
4. Contact Netlify support if still failing

### Deployment Failing

**Issue:** GitHub Actions workflow fails

**Solutions:**

1. Check all 4 GitHub Secrets are configured
2. Verify secret names match exactly (case-sensitive)
3. Check build logs for specific errors
4. Verify `netlify.toml` configuration is correct

### Old Site Still Showing

**Issue:** Changes not visible on portal subdomain

**Solutions:**

1. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
2. Clear browser cache completely
3. Try incognito/private mode
4. Check Netlify deploy logs for errors
5. Verify correct branch is deployed (should be `main`)

---

## Maintenance

### Updating the Portal

**Automatic (Recommended):**

1. Make changes in GitHub repo
2. Commit and push to `main` branch
3. GitHub Actions automatically deploys
4. Changes live in 2-3 minutes

**Manual:**

```bash
# Build locally
pnpm build

# Deploy via Netlify CLI
netlify deploy --prod --dir=dist
```

### Monitoring

**Check deployment status:**

- GitHub Actions: https://github.com/elevateforhumanity/fix2/actions
- Netlify Deploys: https://app.netlify.com/sites/elevateforhumanityfix/deploys

**Check site health:**

```bash
# Check if site is up
curl -I https://portal.elevateforhumanity.org

# Check SSL certificate expiry
echo | openssl s_client -servername portal.elevateforhumanity.org -connect portal.elevateforhumanity.org:443 2>/dev/null | openssl x509 -noout -dates
```

---

## Summary

**What You'll Have:**

1. **www.elevateforhumanity.org**
   - Marketing site (Durable.co)
   - Public-facing content
   - Links to portal for student access

2. **portal.elevateforhumanity.org**
   - LMS/Student portal (Netlify)
   - New professional design
   - Automatic deployments from GitHub
   - Student login, courses, certificates

**Benefits:**

- ✅ Separation of concerns
- ✅ Automatic deployments
- ✅ Professional subdomain
- ✅ Easy to maintain
- ✅ Keep existing marketing site

---

## Next Steps

1. ✅ Add custom domain in Netlify
2. ✅ Configure DNS CNAME record
3. ✅ Enable HTTPS
4. ✅ Configure GitHub Secrets
5. ✅ Update links on main site
6. ✅ Test deployment
7. ✅ Verify portal works

**Estimated Time:** 30-60 minutes (plus DNS propagation time)

**Need help?** Check the troubleshooting section or contact support.
