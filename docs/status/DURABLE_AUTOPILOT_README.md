# 🤖 Durable Autopilot

Automated deployment of enrollment programs to www.elevateforhumanity.org

## Quick Start

```bash
# Simple command
./durable
```

That's it! The autopilot will:

1. ✅ Login to Durable.co
2. ✅ Find your site
3. ✅ Add Custom HTML block
4. ✅ Paste enrollment code
5. ✅ Publish changes
6. ✅ Verify deployment

---

## Installation

```bash
# Install dependencies (if not already installed)
pnpm install puppeteer

# Make executable
chmod +x durable
chmod +x durable-autopilot.js
```

---

## Usage

### Option 1: Simple Command (Recommended)

```bash
./durable
```

### Option 2: Direct Node Command

```bash
node durable-autopilot.js
```

### Option 3: With Custom Credentials

```bash
export DURABLE_EMAIL="your-email@example.com"
export DURABLE_PASSWORD="your-password"
./durable
```

---

## What It Does

The autopilot automates these manual steps:

1. **Login to Durable.co**
   - Navigates to https://durable.co/login
   - Enters credentials
   - Handles login

2. **Find Your Site**
   - Searches for "Elevate for Humanity"
   - Clicks Edit button

3. **Add Custom HTML Block**
   - Finds "Add Section" button
   - Selects "Custom HTML" option

4. **Paste Enrollment Code**
   - Reads DURABLE_ENROLLMENT_CODE.html
   - Pastes into code editor
   - Verifies paste

5. **Publish Changes**
   - Clicks Publish button
   - Handles confirmation modals

6. **Verify Deployment**
   - Visits www.elevateforhumanity.org
   - Checks for enrollment programs
   - Takes screenshot as proof

---

## Configuration

Edit `durable-autopilot.js` to customize:

```javascript
const CONFIG = {
  email: 'Elevateforhumanity@gmail.com', // Your email
  password: 'Elijah1$', // Your password
  siteUrl: 'https://www.elevateforhumanity.org',
  siteName: 'Elevate for Humanity',
  headless: false, // Set to true to hide browser
  timeout: 60000, // 60 seconds
};
```

---

## Screenshots

The autopilot takes screenshots at each step:

```
logs/
├── 01-login-page-[timestamp].png
├── 05-after-login-[timestamp].png
├── 07-dashboard-[timestamp].png
├── 09-site-editor-[timestamp].png
├── 16-code-pasted-[timestamp].png
├── 18-published-[timestamp].png
├── 20-verification-[timestamp].png
└── deployment-status.json
```

Use these to debug if something goes wrong.

---

## Troubleshooting

### Issue: Login fails

**Solution:**

- Check credentials in script
- Durable.co UI may have changed
- Try manual login first to verify credentials

### Issue: Site not found

**Solution:**

- Verify site name in CONFIG
- Check if site exists in your Durable account
- Try clicking first site manually

### Issue: Custom HTML option not found

**Solution:**

- Look for "Embed" or "Code" block instead
- Durable.co may have renamed the option
- Add block manually, autopilot will paste code

### Issue: Code not pasted

**Solution:**

- Check if code editor appeared
- Try pasting manually from DURABLE_ENROLLMENT_CODE.html
- Verify file exists and is readable

### Issue: Changes not visible

**Solution:**

- Wait 60 seconds for CDN propagation
- Hard refresh (Ctrl+Shift+R)
- Check if Publish button was clicked

---

## Manual Fallback

If autopilot fails, you can always deploy manually:

1. Open `DURABLE_ENROLLMENT_CODE.html`
2. Copy all code
3. Go to https://durable.co/login
4. Login manually
5. Edit homepage
6. Add Custom HTML block
7. Paste code
8. Publish

Takes 2 minutes manually.

---

## Advanced Usage

### Run in Headless Mode

```bash
# Edit durable-autopilot.js
# Change: headless: false
# To: headless: true

./durable
```

### Schedule with Cron

```bash
# Run daily at 2 AM
0 2 * * * cd /workspaces/fix2 && ./durable >> logs/cron.log 2>&1
```

### GitHub Actions

```yaml
name: Deploy Enrollment Programs

on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install puppeteer
      - run: node durable-autopilot.js
        env:
          DURABLE_EMAIL: ${{ secrets.DURABLE_EMAIL }}
          DURABLE_PASSWORD: ${{ secrets.DURABLE_PASSWORD }}
      - uses: actions/upload-artifact@v4
        with:
          name: screenshots
          path: logs/
```

---

## Success Criteria

Deployment is successful when:

- ✅ Login succeeds
- ✅ Site editor loads
- ✅ Custom HTML block added
- ✅ Enrollment code pasted (all 150 lines)
- ✅ Changes published
- ✅ Live site shows enrollment programs
- ✅ All 3 programs visible
- ✅ Purple gradient styling present

---

## Files

- `durable` - Simple runner script (just run `./durable`)
- `durable-autopilot.js` - Main autopilot script
- `DURABLE_ENROLLMENT_CODE.html` - HTML code to deploy
- `logs/` - Screenshots and status

---

## Support

**Issue:** Autopilot fails
**Solution:** Check `logs/` for screenshots, try manual deployment

**Issue:** Durable.co UI changed
**Solution:** Update selectors in `durable-autopilot.js`

**Issue:** Need help
**Solution:** Review screenshots in `logs/` directory

---

## What Gets Deployed

### 3 Enrollment Programs:

1. **AI & Machine Learning**
   - $1,997 | 12 weeks | 89% placement

2. **Data Science Bootcamp**
   - $4,950 | 16 weeks | 92% placement

3. **Cybersecurity Specialist**
   - $3,495 | 20 weeks | 95% placement

### Features:

- Purple gradient design
- Enroll Now buttons
- Federal funding badges
- Mobile responsive

---

## Time Savings

**Manual:** 10-15 minutes per deployment
**Autopilot:** 2-5 minutes per deployment
**Savings:** 5-10 minutes per deployment

**Monthly (4 updates):** Save 20-40 minutes
**Yearly (52 updates):** Save 4-8 hours

---

## Version

**Version:** 1.0
**Created:** 2025-11-02
**Status:** Ready to use

---

## Quick Reference

```bash
# Run autopilot
./durable

# View logs
ls -lh logs/

# View status
cat logs/deployment-status.json

# Clean logs
rm -rf logs/*.png

# Test manually
node durable-autopilot.js
```

---

**Ready to deploy!** Just run `./durable` 🚀
