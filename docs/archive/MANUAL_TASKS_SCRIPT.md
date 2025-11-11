# Manual Tasks Script - For ChatGPT Autopilot Automation

## Overview

This document lists all manual tasks that need to be done to get www.elevateforhumanity.org live with enrollment programs. Use this to create an autopilot script with ChatGPT Advanced Voice Mode or other automation tools.

---

## Task 1: Login to 

**Action:** Navigate to  and authenticate
**Steps:**

1. Go to URL: `https://durable.co/login`
2. Wait for page load (selector: `input[type="email"]` or `input[name="email"]`)
3. Enter email: `Elevateforhumanity@gmail.com`
4. Enter password: `Elijah1$`
5. Click login button
6. Wait for dashboard to load

**Automation Notes:**

- Use Puppeteer/Playwright for browser automation
- Handle 2FA if enabled (may need manual intervention)
- Save session cookies for future runs

**Success Criteria:**

- Dashboard URL contains `/dashboard` or `/sites`
- Site list is visible

---

## Task 2: Select Website

**Action:** Navigate to www.elevateforhumanity.org site editor
**Steps:**

1. From dashboard, find site: "Elevate for Humanity Career and Technical Institute"
2. Click "Edit" or "Edit Site" button
3. Wait for editor to load

**Automation Notes:**

- Site may be in a list or grid view
- Look for text matching "elevateforhumanity" or "Elevate for Humanity"
- Editor URL likely: `https://durable.co/editor/[site-id]`

**Success Criteria:**

- Editor interface is visible
- Can see page sections/blocks

---

## Task 3: Navigate to Homepage

**Action:** Ensure editing the homepage (not another page)
**Steps:**

1. Check current page in editor
2. If not homepage, click "Pages" menu
3. Select "Home" or "Index" page
4. Wait for page to load in editor

**Automation Notes:**

- Homepage is usually the default
- May need to identify by URL path "/"

**Success Criteria:**

- Editing homepage (root path)
- Can see hero section

---

## Task 4: Add Custom HTML Block

**Action:** Insert a new HTML/Code block after the hero section
**Steps:**

1. Scroll to find the hero section (first section with large heading)
2. Click "Add Section" or "+" button below hero
3. Look for "Custom HTML", "Code Block", or "Embed" option
4. Click to add the block
5. Wait for code editor to appear

**Automation Notes:**

-  UI may vary - look for:
  - "Custom Code"
  - "HTML"
  - "Embed"
  - "Advanced"
- May need to click "Show More" to see all block types

**Success Criteria:**

- Code editor/textarea is visible
- Can paste HTML code

---

## Task 5: Paste Enrollment Programs Code

**Action:** Insert the enrollment programs HTML
**Steps:**

1. Read file: `/workspaces/fix2/DURABLE_ENROLLMENT_CODE.html`
2. Copy entire contents
3. Paste into the Custom HTML block editor
4. Verify code is pasted correctly (no truncation)

**Automation Notes:**

- Use `fs.readFileSync()` to read file
- Paste using `page.type()` or `page.evaluate()` to set textarea value
- Code is ~150 lines, ensure all is pasted

**Success Criteria:**

- All HTML code is in the editor
- No error messages
- Preview shows purple gradient section

---

## Task 6: Save/Publish Changes

**Action:** Make the changes live on the website
**Steps:**

1. Look for "Save", "Publish", or "Update" button (usually top-right)
2. Click the button
3. If modal appears asking to confirm, click "Publish" or "Yes"
4. Wait for success message
5. Note: May take 30-60 seconds to propagate

**Automation Notes:**

- Button text may be:
  - "Publish"
  - "Save & Publish"
  - "Update Site"
  - "Go Live"
- Wait for network idle after clicking

**Success Criteria:**

- Success message appears
- No error messages
- Changes are saved

---

## Task 7: Verify Live Site

**Action:** Check that enrollment programs appear on www.elevateforhumanity.org
**Steps:**

1. Open new tab
2. Navigate to: `https://www.elevateforhumanity.org`
3. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Scroll down to find enrollment programs section
5. Verify all 3 programs are visible:
   - AI & Machine Learning
   - Data Science Bootcamp
   - Cybersecurity Specialist
6. Click "Enroll Now" button to test functionality

**Automation Notes:**

- Use `page.goto()` with `waitUntil: 'networkidle'`
- Take screenshot for verification
- Check for text: "Enroll in Our Programs Today"
- Verify purple gradient background exists

**Success Criteria:**

- Enrollment section is visible
- All 3 programs display correctly
- Buttons are clickable
- Styling matches design (purple gradient)

---

## Task 8: Add Bridge Script (Optional - For Dynamic Updates)

**Action:** Add bridge script to site head for future automatic updates
**Steps:**

1. In Durable editor, go to Settings
2. Find "Custom Code" or "Head Scripts" section
3. Add this code to HEAD section:

```html
<script
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

4. Save settings
5. Publish changes

**Automation Notes:**

- Settings may be in:
  - Site Settings → Advanced
  - Settings → Custom Code
  - Settings → SEO & Analytics
- Look for "Head Code" or "Custom Scripts"

**Success Criteria:**

- Script tag is in HEAD section
- No JavaScript errors in console
- Bridge script loads successfully

---

## Automation Script Pseudocode

```javascript
// Puppeteer/Playwright Script
async function deployEnrollmentPrograms() {
  // Task 1: Login
  await page.goto('https://durable.co/login');
  await page.type('input[type="email"]', 'Elevateforhumanity@gmail.com');
  await page.type('input[type="password"]', 'Elijah1$');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  // Task 2: Select Site
  await page.click('text=Elevate for Humanity');
  await page.click('text=Edit');
  await page.waitForSelector('.editor-canvas');

  // Task 3: Navigate to Homepage (usually default)
  // Already on homepage after clicking Edit

  // Task 4: Add Custom HTML Block
  await page.click('button:has-text("Add Section")');
  await page.click('text=Custom HTML');

  // Task 5: Paste Code
  const enrollmentCode = fs.readFileSync(
    './DURABLE_ENROLLMENT_CODE.html',
    'utf8'
  );
  await page.fill('textarea.code-editor', enrollmentCode);

  // Task 6: Publish
  await page.click('button:has-text("Publish")');
  await page.waitForSelector('text=Published successfully');

  // Task 7: Verify
  await page.goto('https://www.elevateforhumanity.org');
  await page.waitForTimeout(3000); // Wait for CDN
  const enrollmentVisible = await page.isVisible(
    'text=Enroll in Our Programs Today'
  );

  if (enrollmentVisible) {
    console.log('✅ Enrollment programs deployed successfully!');
    await page.screenshot({ path: 'deployment-success.png' });
  } else {
    throw new Error('❌ Enrollment programs not visible on live site');
  }

  // Task 8: Add Bridge Script (optional)
  await page.goto('https://durable.co/editor/[site-id]/settings');
  await page.click('text=Custom Code');
  await page.fill(
    'textarea[name="head_code"]',
    '<script src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js" data-efh-org="elevate-for-humanity" data-env="prod" defer></script>'
  );
  await page.click('button:has-text("Save")');

  return {
    success: true,
    timestamp: new Date().toISOString(),
    url: 'https://www.elevateforhumanity.org',
  };
}
```

---

## ChatGPT Prompt for Automation

Use this prompt with ChatGPT Advanced Voice Mode or API:

```
I need you to create a Puppeteer automation script that:

1. Logs into  with email "Elevateforhumanity@gmail.com" and password "Elijah1$"
2. Navigates to my site "Elevate for Humanity Career and Technical Institute"
3. Opens the site editor
4. Adds a Custom HTML block after the hero section
5. Pastes the contents of DURABLE_ENROLLMENT_CODE.html into that block
6. Publishes the changes
7. Verifies the enrollment programs appear on https://www.elevateforhumanity.org
8. Takes a screenshot as proof
9. Optionally adds a bridge script to the site head for future updates

The script should:
- Handle errors gracefully
- Wait for elements to load before interacting
- Take screenshots at each step for debugging
- Log progress to console
- Return success/failure status
- Save session cookies for future runs

Use the selectors and steps documented in MANUAL_TASKS_SCRIPT.md
```

---

## Error Handling

**Common Issues:**

1. **Login fails** - Check credentials, handle 2FA
2. **Site not found** - Search by URL instead of name
3. **Custom HTML option missing** - Try "Embed" or "Code" block
4. **Publish button disabled** - Ensure code is valid HTML
5. **Changes not visible** - Wait 60s for CDN, hard refresh
6. **Bridge script errors** - Check Netlify deployment first

**Retry Strategy:**

- Retry failed steps up to 3 times
- Wait 5 seconds between retries
- Take screenshot on each failure
- Log detailed error messages

---

## Success Metrics

**Deployment is successful when:**

- ✅ Login to  succeeds
- ✅ Site editor loads
- ✅ Custom HTML block is added
- ✅ Enrollment code is pasted
- ✅ Changes are published
- ✅ Live site shows enrollment programs
- ✅ All 3 programs are visible
- ✅ Buttons are functional
- ✅ Styling is correct (purple gradient)

**Time Estimate:** 2-5 minutes (automated) vs 10-15 minutes (manual)

---

## Files Needed for Automation

1. `DURABLE_ENROLLMENT_CODE.html` - The HTML to paste
2. `scripts/puppeteer-durable-integration.js` - Existing automation script (needs fixes)
3. `.env` file with:
   ```
   DURABLE_EMAIL=Elevateforhumanity@gmail.com
   DURABLE_PASSWORD=Elijah1$
   ```

---

## Next Steps

1. **Download this file** along with `DURABLE_ENROLLMENT_CODE.html`
2. **Give to ChatGPT** with prompt above
3. **Run the generated script** with: `node autopilot-deploy.js`
4. **Verify deployment** at www.elevateforhumanity.org
5. **Set up cron job** to run daily/weekly for updates

---

## Support Bundle Contents

When downloading support bundle, include:

- ✅ MANUAL_TASKS_SCRIPT.md (this file)
- ✅ DURABLE_ENROLLMENT_CODE.html
- ✅ QUICK_START.md
- ✅ MANUAL_DURABLE_SETUP.md
- ✅ scripts/puppeteer-durable-integration.js
- ✅ .autopilot-config.json
- ✅ Screenshots of current site state

---

**Last Updated:** 2025-11-02
**Status:** Ready for automation
**Estimated Automation Time:** 2-5 minutes
