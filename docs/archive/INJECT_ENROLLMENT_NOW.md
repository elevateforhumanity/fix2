# 🎓 Inject Enrollment Programs - MANUAL STEPS

The Puppeteer automation is failing because Durable.co changed their login page.

## What You'll See After Injection

A beautiful enrollment section with:

- **Barber Apprenticeship** - 2,000 hours, State Licensure
- **Building Services Technician** - Multi-Trade, OSHA-10
- **Certified Nursing Assistant** - Healthcare, CNA Certification
- Link to view all 9 programs

## Manual Injection (5 minutes)

1. **Go to Durable.co**
   - Visit: https://durable.co/login
   - Login with: `Elevateforhumanity@gmail.com` / `Elijah1$`

2. **Navigate to Custom Code**
   - Click on your site settings
   - Find "Custom Code" or "Advanced" section
   - Look for "Head Code" or "Custom HTML"

3. **Add This Script**

   ```html
   <script
     src="https://main--elevateforhumanityfix.netlify.app/enrollment-injector.js"
     defer
   ></script>
   ```

4. **Save Changes**
   - Click "Save" or "Publish"
   - Wait 1-2 minutes for changes to propagate

5. **Verify**
   - Visit: https://www.elevateforhumanity.org
   - You should see the enrollment section appear below the hero section
   - It will have a gradient blue/purple background with 3 program cards

## What the Script Does

The enrollment-injector.js script:

1. Waits for your Durable page to load
2. Finds the best injection point (after first section)
3. Injects a beautiful enrollment section with program cards
4. Each card has "Learn More" buttons linking to program pages

## Troubleshooting

**If you don't see it:**

- Clear browser cache and refresh
- Check browser console for errors (F12)
- Verify the script tag was added correctly
- Wait 2-3 minutes for Durable's CDN to update

**If it looks broken:**

- The script includes all styling inline, so it should work immediately
- Check if there are any JavaScript errors in console

## Alternative: Direct HTML Injection

If the script doesn't work, you can inject the HTML directly into a page section:

1. Edit your homepage in Durable
2. Add a new "Custom HTML" block
3. Paste the enrollment HTML (see bridge/public/enrollment-injector.js for the HTML)
4. Save and publish

## Need Help?

The enrollment section is fully styled and ready to go. Once injected, visitors will see:

- 3 featured programs with descriptions
- Funding information (WRG, WIOA, Apprenticeship)
- "Learn More" buttons for each program
- "View All 9 Programs" link at the bottom

The script is smart - it won't inject twice if it's already there.
