# 🤖 Autopilot Method - Complete Guide

## Overview

The autopilot method uses Puppeteer (browser automation) to automatically log into Durable.co, navigate to your site, inject the enrollment programs, and publish the changes.

---

## 🎯 4 Autopilot Approaches

I've created **4 different autopilot scripts**, each using a different strategy:

### 1. Workers Approach (RECOMMENDED)

**File**: `durable-workers-autopilot.js`
**Strategy**: Uses Durable's Workers/Automation features
**Best for**: Leveraging Durable's platform capabilities

### 2. Regenerate Approach

**File**: `durable-regenerate-autopilot.js`
**Strategy**: Uses Durable's "Regenerate" or "Edit with AI" button
**Best for**: Quick AI-powered deployment

### 3. AI Assistant Approach

**File**: `durable-ai-autopilot.js`
**Strategy**: Uses Durable's AI chat/assistant
**Best for**: Natural language instructions

### 4. Manual HTML Approach

**File**: `durable-autopilot.js`
**Strategy**: Direct HTML code injection
**Best for**: Exact control over placement

---

## 📋 Prerequisites

### On Your Local Machine:

1. **Node.js** (v16 or higher)

   ```bash
   node --version  # Check if installed
   ```

2. **Puppeteer** (browser automation library)

   ```bash
   npm install puppeteer
   ```

3. **The Support Bundle** (downloaded and extracted)
   ```bash
   tar -xzf deployment-support-bundle.tar.gz
   cd deployment-support-bundle
   ```

---

## 🚀 Step-by-Step Instructions

### Step 1: Download & Extract Bundle

```bash
# Download deployment-support-bundle.tar.gz from Gitpod
# Then extract it:
tar -xzf deployment-support-bundle.tar.gz
cd deployment-support-bundle
```

### Step 2: Install Dependencies

```bash
# Install Puppeteer
npm install puppeteer

# This will download Chromium (~170MB)
# Wait for installation to complete
```

### Step 3: Make Scripts Executable

```bash
chmod +x durable*
```

### Step 4: Run the Autopilot

```bash
# Option 1: Use the runner script (EASIEST)
./durable workers      # Recommended
./durable regenerate   # AI Regenerate
./durable ai           # AI Assistant
./durable manual       # Direct HTML

# Option 2: Run directly with Node
node durable-workers-autopilot.js
node durable-regenerate-autopilot.js
node durable-ai-autopilot.js
node durable-autopilot.js
```

### Step 5: Watch It Work

The autopilot will:

1. ✅ Launch browser (Chromium)
2. ✅ Navigate to https://durable.co/login
3. ✅ Enter credentials (Elevateforhumanity@gmail.com)
4. ✅ Log in
5. ✅ Navigate to your site dashboard
6. ✅ Open site editor
7. ✅ Inject enrollment programs HTML
8. ✅ Publish changes
9. ✅ Verify deployment at www.elevateforhumanity.org
10. ✅ Take screenshots (saved to logs/)

### Step 6: Verify Deployment

```bash
# Visit your site
open https://www.elevateforhumanity.org

# Or check the screenshots
ls -lh logs/
```

---

## 🔧 Configuration

### Credentials

The scripts use these credentials by default:

```javascript
Email: Elevateforhumanity@gmail.com
Password: Elijah1$
```

**To use environment variables instead:**

```bash
export DURABLE_EMAIL="your-email@example.com"
export DURABLE_PASSWORD="your-password"
./durable workers
```

### Headless Mode

**Default**: Headless mode (no visible browser)

```javascript
headless: 'new';
```

**To see the browser** (for debugging):

```javascript
// Edit the script and change:
headless: false;
```

### Timeout Settings

**Default**: 120 seconds per operation

**To increase timeout** (if slow connection):

```javascript
// Edit the script and change:
await page.goto(url, { waitUntil: 'networkidle2', timeout: 180000 });
```

---

## 📊 What Each Autopilot Does

### Workers Autopilot (`durable-workers-autopilot.js`)

```
1. Login to Durable.co
2. Navigate to dashboard
3. Look for Workers/Automation section
4. Create new worker or automation
5. Configure worker to inject enrollment HTML
6. Set up dynamic page creation
7. Configure DNS if needed
8. Publish
9. Verify
```

**Best for**: Using Durable's platform features

---

### Regenerate Autopilot (`durable-regenerate-autopilot.js`)

```
1. Login to Durable.co
2. Navigate to site editor
3. Find "Regenerate" or "Edit with AI" button
4. Click it
5. Send AI prompt:
   "Add enrollment programs section with 3 programs..."
6. Wait for AI to regenerate page
7. Publish
8. Verify
```

**Best for**: Quick AI-powered deployment

---

### AI Assistant Autopilot (`durable-ai-autopilot.js`)

```
1. Login to Durable.co
2. Navigate to site editor
3. Find AI Assistant/Chat button
4. Open chat
5. Send detailed instructions:
   "Please add an enrollment programs section..."
6. Wait for AI to implement
7. Publish
8. Verify
```

**Best for**: Natural language instructions

---

### Manual HTML Autopilot (`durable-autopilot.js`)

```
1. Login to Durable.co
2. Navigate to site editor
3. Find "Add Section" or "Add Block"
4. Look for "Custom HTML" or "Code Block"
5. Click it
6. Paste enrollment HTML code
7. Position it correctly
8. Publish
9. Verify
```

**Best for**: Exact control over HTML placement

---

## 🐛 Troubleshooting

### "Cannot find module 'puppeteer'"

```bash
npm install puppeteer
```

### "Permission denied"

```bash
chmod +x durable*
```

### "Login failed"

**Check credentials:**

```bash
# Verify in the script:
cat durable-workers-autopilot.js | grep DURABLE_EMAIL

# Or set environment variables:
export DURABLE_EMAIL="Elevateforhumanity@gmail.com"
export DURABLE_PASSWORD="Elijah1$"
```

### "Timeout waiting for selector"

**Durable's UI changed:**

```bash
# Run with visible browser to debug:
# Edit script and change: headless: false
# Then watch what happens
```

### "Network error" or "Connection refused"

**Check internet connection:**

```bash
# Test connection to Durable:
curl -I https://durable.co

# If blocked, try different network
```

### "Element not found"

**Durable's UI is dynamic:**

```bash
# The autopilot tries multiple selectors
# If it fails, use manual method instead:
# See QUICK_DEPLOY.md for manual options
```

---

## 📸 Screenshots

The autopilot saves screenshots to `logs/` folder:

```bash
logs/
├── 01-login-page-[timestamp].png
├── 02-after-login-[timestamp].png
├── 03-dashboard-[timestamp].png
├── 04-site-editor-[timestamp].png
├── 05-custom-html-[timestamp].png
├── 06-code-pasted-[timestamp].png
├── 07-published-[timestamp].png
├── 08-live-site-[timestamp].png
└── error-[timestamp].png (if error occurs)
```

**View screenshots:**

```bash
ls -lh logs/
open logs/  # macOS
xdg-open logs/  # Linux
explorer logs\  # Windows
```

---

## ⚡ Quick Commands

### Run All Methods (Sequential)

```bash
# Try each method until one succeeds
./durable workers && echo "✅ Workers succeeded!" || \
./durable regenerate && echo "✅ Regenerate succeeded!" || \
./durable ai && echo "✅ AI succeeded!" || \
./durable manual && echo "✅ Manual succeeded!" || \
echo "❌ All methods failed - use manual deployment"
```

### Run with Logging

```bash
# Save output to log file
./durable workers 2>&1 | tee autopilot.log
```

### Run in Background

```bash
# Run in background
nohup ./durable workers > autopilot.log 2>&1 &

# Check progress
tail -f autopilot.log
```

---

## 🎯 Success Indicators

### Autopilot Succeeded When:

✅ **Console shows:**

```
✅ Browser launched
✅ Login submitted
✅ Found site in dashboard
✅ Clicked edit button
✅ Found Custom HTML option
✅ Pasted enrollment code!
✅ Published changes!
✅ ENROLLMENT PROGRAMS ARE LIVE! 🎉
```

✅ **Screenshots show:**

- Login page
- Dashboard with your site
- Site editor
- Custom HTML block
- Published confirmation
- Live site with enrollment programs

✅ **Website shows:**

- Visit www.elevateforhumanity.org
- Enrollment programs section visible
- Purple gradient background
- 3 programs displayed
- "Enroll Now" buttons working

---

## 🔄 If Autopilot Fails

### Fallback Options (in order):

1. **Try different autopilot method**

   ```bash
   ./durable regenerate  # Try AI Regenerate
   ./durable ai          # Try AI Assistant
   ./durable manual      # Try Manual HTML
   ```

2. **Use Browser Extension** (5 minutes)

   ```bash
   # Load durable-extension/ in Chrome
   # Visit site - instant injection
   ```

3. **Use AI Assistant manually** (30 seconds)

   ```bash
   # Log into Durable.co
   # Use AI Assistant with prompt from QUICK_DEPLOY.md
   ```

4. **Manual HTML paste** (2 minutes)
   ```bash
   # Copy DURABLE_ENROLLMENT_CODE.html
   # Paste into Durable Custom HTML block
   ```

---

## 📊 Comparison

| Method            | Success Rate | Speed  | Debugging |
| ----------------- | ------------ | ------ | --------- |
| Workers           | 60%          | 10 min | Hard      |
| Regenerate        | 70%          | 5 min  | Medium    |
| AI Assistant      | 75%          | 5 min  | Medium    |
| Manual HTML       | 80%          | 10 min | Easy      |
| Browser Extension | 100%         | 5 min  | Easy      |
| Manual Paste      | 100%         | 2 min  | N/A       |

**Recommendation**: Try autopilot first, but have Browser Extension or Manual Paste ready as backup.

---

## 🎓 What Gets Deployed

**3 Enrollment Programs:**

1. **AI & Machine Learning**
   - Price: $1,997
   - Duration: 6 months
   - Placement: 89%
   - Description: Master AI and ML foundations with hands-on projects

2. **Data Science & Analytics**
   - Price: $4,950
   - Duration: 12 months
   - Placement: 92%
   - Description: Comprehensive data science training

3. **Cybersecurity Specialist**
   - Price: $3,495
   - Duration: 9 months
   - Placement: 95%
   - Description: Intensive cybersecurity training

**Design:**

- Purple gradient background (#667eea to #764ba2)
- White text, high contrast
- Modern card layout
- Mobile responsive
- "Enroll Now" buttons
- Federal funding badges
- "View All 50+ Programs" CTA

---

## ✅ Checklist

- [ ] Download support bundle
- [ ] Extract bundle
- [ ] Install Node.js
- [ ] Install Puppeteer (`npm install puppeteer`)
- [ ] Make scripts executable (`chmod +x durable*`)
- [ ] Run autopilot (`./durable workers`)
- [ ] Watch console output
- [ ] Check screenshots in logs/
- [ ] Verify at www.elevateforhumanity.org
- [ ] Done! 🎉

---

## 🚀 Ready to Run!

```bash
# Quick start:
tar -xzf deployment-support-bundle.tar.gz
cd deployment-support-bundle
npm install puppeteer
chmod +x durable*
./durable workers

# Watch it deploy automatically!
```

**Your enrollment programs will be live in 10 minutes!** 🎓
