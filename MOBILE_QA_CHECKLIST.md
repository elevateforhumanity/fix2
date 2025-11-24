# Mobile QA Checklist for Elevate For Humanity

Use this checklist to test every page on your phone before going live.

---

## 📱 General Mobile Tests (All Pages)

### Layout & Spacing
- [ ] Page fits screen width (no horizontal scrolling)
- [ ] Text is readable without zooming
- [ ] Images don't overflow or stretch weird
- [ ] Buttons are easy to tap (minimum 44x44px)
- [ ] Adequate spacing between clickable elements
- [ ] Footer is readable and links work

### Navigation
- [ ] Hamburger menu opens smoothly
- [ ] All menu items are visible
- [ ] Dropdowns work (Programs, Micro Classes, Funding)
- [ ] Can close menu easily
- [ ] Logo/brand links back to homepage

### Performance
- [ ] Page loads in under 3 seconds
- [ ] Images load progressively (not all at once)
- [ ] Smooth scrolling (no lag or jank)
- [ ] Forms are responsive to input

### Typography
- [ ] Headlines are readable (not too big or small)
- [ ] Body text is at least 16px
- [ ] Line height allows easy reading
- [ ] Contrast is good (text vs background)

---

## 🏠 Homepage Specific Tests

### Hero Section
- [ ] Hero image loads and looks sharp
- [ ] Headline is readable (not cut off)
- [ ] "Apply Now" button is clearly visible
- [ ] "Schedule at Indiana Connect" button is clearly visible
- [ ] Fallback text for Indiana Connect is visible
- [ ] All white text has good contrast on background
- [ ] Feature badges (100% Funded, etc.) are readable

### How to Get Started Section
- [ ] 3 steps are clearly visible
- [ ] Step numbers are readable
- [ ] Cards stack vertically on mobile
- [ ] Indiana Connect link works

### Featured Program (Barbering)
- [ ] Image loads properly
- [ ] Text is readable on dark background
- [ ] "Learn More" and "Apply Now" buttons work
- [ ] Stats (2,000 hours, etc.) are visible

### Programs Grid
- [ ] Program cards stack vertically
- [ ] Images load for each program
- [ ] "Learn More" buttons are tappable
- [ ] Funding badges are visible
- [ ] "View All Programs" link works

### What Makes Us Different
- [ ] 4 cards stack vertically
- [ ] Images load properly
- [ ] Text is readable
- [ ] Links work

### Stats Section
- [ ] Numbers are large and readable
- [ ] Labels are clear
- [ ] Section has good contrast

### Final CTA
- [ ] "Apply Now" button is prominent
- [ ] "Talk to Someone" button is visible
- [ ] Both buttons are easy to tap

---

## 📚 Programs Page Tests

### Program Listings
- [ ] All 6 main programs show
- [ ] Program cards stack vertically
- [ ] Images load for each program
- [ ] Duration and funding info visible
- [ ] "Learn More" buttons work

### Filters (if present)
- [ ] Filter buttons are tappable
- [ ] Active filter is clearly indicated
- [ ] Results update when filter changes

---

## 🎓 Micro Classes Page Tests

### Class Listings
- [ ] All 12 partner programs show
- [ ] Cards stack vertically on mobile
- [ ] Images load properly
- [ ] Pricing is clearly visible
- [ ] Duration info is readable
- [ ] "Buy Now" buttons work
- [ ] Funding badges show when applicable

### Payment Flow
- [ ] "Buy Now" opens Stripe checkout
- [ ] Checkout is mobile-friendly
- [ ] Can go back if needed

---

## 💰 Funding Pages Tests

### State Programs Page
- [ ] WIOA info is clear
- [ ] WRG info is clear
- [ ] JRI info is clear
- [ ] Application process is explained
- [ ] Links to WorkOne work

### Federal Programs Page
- [ ] Program descriptions are readable
- [ ] Eligibility requirements are clear
- [ ] Application links work

---

## 📝 Apply Page Tests

### Form Fields
- [ ] All fields are visible
- [ ] Labels are clear
- [ ] Input fields are easy to tap
- [ ] Keyboard opens appropriately
- [ ] Dropdowns work on mobile
- [ ] Date pickers work (if present)

### Form Validation
- [ ] Error messages are visible
- [ ] Required fields are marked
- [ ] Can scroll to see errors
- [ ] Success message is clear

### Submit Button
- [ ] Button is always visible
- [ ] Loading state shows when submitting
- [ ] Can't double-submit

---

## 📞 Contact Page Tests

### Contact Form
- [ ] All fields work on mobile
- [ ] Phone number field accepts formatting
- [ ] Email validation works
- [ ] Message textarea is adequate size
- [ ] Submit button works

### Contact Info
- [ ] Phone number is clickable (opens dialer)
- [ ] Email is clickable (opens mail app)
- [ ] Address is readable
- [ ] Map loads (if present)

---

## 👤 Student Portal Tests

### Login Page
- [ ] Email field works
- [ ] Password field works
- [ ] "Show password" toggle works
- [ ] "Forgot password" link works
- [ ] "Sign up" link works
- [ ] Login button works

### Dashboard
- [ ] Stats cards are readable
- [ ] Course cards stack vertically
- [ ] Progress bars are visible
- [ ] Navigation works
- [ ] Logout button is accessible

---

## 🔧 Admin Portal Tests (Staff Only)

### Login
- [ ] Admin login page loads
- [ ] Can enter credentials
- [ ] Login works

### Dashboard
- [ ] Stats are readable
- [ ] Tables scroll horizontally if needed
- [ ] Action buttons work
- [ ] Navigation sidebar works (or hamburger menu)

### Applications Page
- [ ] Can view application list
- [ ] Can tap to view details
- [ ] Approve/reject buttons work
- [ ] Can select program and funding type

### Enrollments Page
- [ ] Table is readable
- [ ] Can scroll horizontally if needed
- [ ] Export CSV button works
- [ ] Filter buttons work

---

## 🎨 Visual Quality Checks

### Images
- [ ] Hero images are sharp (not blurry)
- [ ] Program images load properly
- [ ] No broken image icons
- [ ] Images are properly sized (not stretched)
- [ ] Alt text is present (for accessibility)

### Colors & Contrast
- [ ] White text on dark backgrounds is readable
- [ ] Red buttons have white text (good contrast)
- [ ] Links are distinguishable from regular text
- [ ] Visited links have different color (optional)

### Spacing
- [ ] No elements touching screen edges
- [ ] Adequate padding around content
- [ ] Sections have clear separation
- [ ] Cards have breathing room

---

## ⚡ Performance Checks

### Load Times
- [ ] Homepage loads in under 3 seconds
- [ ] Images load progressively
- [ ] No layout shift as page loads
- [ ] Fonts load quickly

### Interactions
- [ ] Buttons respond immediately to tap
- [ ] No delay when opening menus
- [ ] Smooth scrolling
- [ ] Forms respond quickly to input

### Network Conditions
- [ ] Test on WiFi
- [ ] Test on 4G/5G
- [ ] Test on slow 3G (if possible)
- [ ] Graceful degradation on slow connections

---

## 🔒 Security & Privacy

### HTTPS
- [ ] Site loads with https://
- [ ] No mixed content warnings
- [ ] Padlock icon shows in browser

### Forms
- [ ] Password fields are masked
- [ ] Sensitive data is encrypted
- [ ] No data leaks in URLs

---

## ♿ Accessibility Checks

### Screen Reader
- [ ] Images have alt text
- [ ] Buttons have descriptive labels
- [ ] Form fields have labels
- [ ] Headings are in logical order

### Keyboard Navigation
- [ ] Can tab through interactive elements
- [ ] Focus indicators are visible
- [ ] Can submit forms with Enter key
- [ ] Can close modals with Escape key

### Text Sizing
- [ ] Can zoom to 200% without breaking layout
- [ ] Text remains readable when zoomed
- [ ] No horizontal scrolling when zoomed

---

## 🌐 Browser Compatibility

Test on multiple mobile browsers:

### iOS (iPhone/iPad)
- [ ] Safari
- [ ] Chrome
- [ ] Firefox

### Android
- [ ] Chrome
- [ ] Samsung Internet
- [ ] Firefox

---

## 📊 Device Testing

Test on different screen sizes:

### Small Phones (320px - 375px)
- [ ] iPhone SE
- [ ] Small Android phones
- [ ] All content fits
- [ ] Buttons are tappable

### Medium Phones (375px - 414px)
- [ ] iPhone 12/13/14
- [ ] Most Android phones
- [ ] Layout looks good
- [ ] Images scale properly

### Large Phones (414px+)
- [ ] iPhone Pro Max
- [ ] Large Android phones
- [ ] Content doesn't look stretched
- [ ] Good use of space

### Tablets (768px+)
- [ ] iPad
- [ ] Android tablets
- [ ] Layout adapts appropriately
- [ ] Not just stretched phone view

---

## 🐛 Common Issues to Check

### Text Issues
- [ ] No text cut off at screen edges
- [ ] No overlapping text
- [ ] No text too small to read
- [ ] No text too large (overwhelming)

### Image Issues
- [ ] No stretched or squished images
- [ ] No blurry images
- [ ] No images loading slowly
- [ ] No broken image links

### Layout Issues
- [ ] No horizontal scrolling
- [ ] No elements off-screen
- [ ] No overlapping elements
- [ ] No weird gaps or spacing

### Button Issues
- [ ] All buttons are tappable
- [ ] Buttons don't overlap
- [ ] Button text is readable
- [ ] Hover states work (on tablets)

### Form Issues
- [ ] Keyboard doesn't cover input fields
- [ ] Can scroll to see all fields
- [ ] Validation messages are visible
- [ ] Submit button is always accessible

---

## ✅ Final Checks Before Launch

### Content
- [ ] All text is spell-checked
- [ ] Phone numbers are correct
- [ ] Email addresses are correct
- [ ] Links go to correct pages
- [ ] No "lorem ipsum" or placeholder text

### Functionality
- [ ] All forms submit successfully
- [ ] All links work
- [ ] All buttons do what they should
- [ ] No JavaScript errors in console

### SEO
- [ ] Page titles are descriptive
- [ ] Meta descriptions are present
- [ ] Images have alt text
- [ ] Headings are in logical order

### Analytics
- [ ] Google Analytics is tracking
- [ ] Facebook Pixel is working (if used)
- [ ] Conversion tracking is set up

---

## 🔄 Regular Maintenance Checks

### Weekly
- [ ] Check for broken links
- [ ] Review form submissions
- [ ] Check analytics for issues

### Monthly
- [ ] Test all pages on mobile
- [ ] Review load times
- [ ] Check for outdated content
- [ ] Test payment flows

### Quarterly
- [ ] Full mobile audit
- [ ] Update images if needed
- [ ] Review and update content
- [ ] Test on new devices/browsers

---

## 📝 Issue Reporting Template

When you find an issue, document it like this:

**Issue:** [Brief description]
**Page:** [URL or page name]
**Device:** [iPhone 12, Samsung Galaxy S21, etc.]
**Browser:** [Safari, Chrome, etc.]
**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected:** [What should happen]
**Actual:** [What actually happens]
**Screenshot:** [Attach if possible]
**Priority:** [High/Medium/Low]

---

## 🎯 Priority Levels

### 🔴 High Priority (Fix Immediately)
- Site doesn't load on mobile
- Forms don't submit
- Payment doesn't work
- Critical content is hidden
- Navigation is broken

### 🟡 Medium Priority (Fix This Week)
- Images are blurry
- Text is hard to read
- Buttons are hard to tap
- Layout looks weird
- Slow load times

### 🟢 Low Priority (Fix When Possible)
- Minor spacing issues
- Color tweaks
- Nice-to-have features
- Cosmetic improvements

---

## 📞 Quick Reference

### Test URLs
- Homepage: https://www.elevateforhumanity.org
- Programs: https://www.elevateforhumanity.org/programs
- Micro Classes: https://www.elevateforhumanity.org/micro-classes
- Apply: https://www.elevateforhumanity.org/apply
- Contact: https://www.elevateforhumanity.org/contact

### Key Contacts
- WorkOne: [Add phone number]
- Support Email: elizabethpowell6262@gmail.com
- Office: (317) 314-3757

### Testing Tools
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

---

**Last Updated:** November 24, 2024
**Version:** 1.0
**Status:** Ready for Testing ✅
