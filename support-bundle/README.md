# Support Bundle - Durable.co Enrollment Programs Deployment

## What's Included

This bundle contains everything needed to deploy enrollment programs to www.elevateforhumanity.org

### Files:

1. **MANUAL_TASKS_SCRIPT.md** - Complete step-by-step manual tasks documentation
   - Use this to create ChatGPT autopilot script
   - Includes pseudocode and automation examples
   - Error handling and success criteria

2. **DURABLE_ENROLLMENT_CODE.html** - Ready-to-paste HTML code
   - 3 enrollment programs with pricing
   - Purple gradient design
   - Enroll Now buttons
   - Federal funding badges

3. **QUICK_START.md** - 2-minute quick start guide
   - Fastest way to go live manually
   - Simple copy/paste instructions

4. **MANUAL_DURABLE_SETUP.md** - Detailed manual setup instructions
   - Step-by-step with screenshots guidance
   - Troubleshooting tips

5. **puppeteer-durable-integration.js** - Existing automation script
   - Needs Durable.co UI updates
   - Use as reference for ChatGPT

6. **.autopilot-config.json** - Autopilot configuration
   - Shows current automation setup
   - Deployment targets and settings

## Quick Start (Manual - 2 minutes)

1. Open `DURABLE_ENROLLMENT_CODE.html`
2. Copy all the code
3. Go to https://durable.co/login
4. Login with: Elevateforhumanity@gmail.com / Elijah1$
5. Edit your homepage
6. Add Custom HTML block
7. Paste the code
8. Publish
9. Visit www.elevateforhumanity.org

Done! ✅

## Automation with ChatGPT

### Option 1: ChatGPT Advanced Voice Mode

1. Open ChatGPT Advanced Voice Mode
2. Say: "Read MANUAL_TASKS_SCRIPT.md and create a Puppeteer automation script"
3. Provide the file contents
4. ChatGPT will generate the automation script
5. Save as `autopilot-deploy.js`
6. Run: `node autopilot-deploy.js`

### Option 2: ChatGPT API

```bash
# Create automation script
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "gpt-4",
    "messages": [{
      "role": "user",
      "content": "Read this manual tasks document and create a Puppeteer script: [paste MANUAL_TASKS_SCRIPT.md]"
    }]
  }'
```

### Option 3: Use Existing Script (Needs Updates)

```bash
# Install dependencies
npm install puppeteer

# Set credentials
export DURABLE_EMAIL="Elevateforhumanity@gmail.com"
export DURABLE_PASSWORD="Elijah1$"

# Run existing script (may need UI updates)
node puppeteer-durable-integration.js
```

## What Gets Deployed

### 3 Enrollment Programs:

1. **AI & Machine Learning**
   - Price: $1,997
   - Duration: 12 weeks
   - Placement Rate: 89%

2. **Data Science Bootcamp**
   - Price: $4,950
   - Duration: 16 weeks
   - Placement Rate: 92%

3. **Cybersecurity Specialist**
   - Price: $3,495
   - Duration: 20 weeks
   - Placement Rate: 95%

### Features:

- Beautiful purple gradient design
- "Enroll Now" call-to-action buttons
- "View All 50+ Programs" link
- Federal funding badges
- DOL compliance indicators
- Mobile responsive

## Verification

After deployment, check:

- ✅ Visit https://www.elevateforhumanity.org
- ✅ Scroll to enrollment section
- ✅ Verify all 3 programs visible
- ✅ Test "Enroll Now" buttons
- ✅ Check mobile responsiveness

## Troubleshooting

**Issue:** Code doesn't paste

- **Solution:** Use "Embed" or "Code" block instead of "Custom HTML"

**Issue:** Changes not visible

- **Solution:** Wait 60 seconds, hard refresh (Ctrl+Shift+R)

**Issue:** Styling broken

- **Solution:** Ensure ALL code was pasted (check for truncation)

**Issue:** Buttons don't work

- **Solution:** Update href="/contact" to your contact page URL

## Support

For issues or questions:

- Review MANUAL_TASKS_SCRIPT.md for detailed steps
- Check existing puppeteer-durable-integration.js for automation examples
- Verify credentials are correct
- Ensure Durable.co site is accessible

## Next Steps

1. **Deploy Now** - Use manual method (2 minutes)
2. **Automate Later** - Create ChatGPT script for future updates
3. **Add More Programs** - Edit DURABLE_ENROLLMENT_CODE.html
4. **Set Up Bridge** - For automatic content updates

---

**Created:** 2025-11-02
**Version:** 1.0
**Status:** Ready to Deploy
