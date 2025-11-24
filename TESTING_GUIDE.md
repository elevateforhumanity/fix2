# Testing Guide: Marketing Site + LMS Integration

## Overview

This guide provides comprehensive testing procedures for the integrated Elevate for Humanity platform, covering the complete user journey from marketing site through application to LMS enrollment.

---

## Test Environment Setup

### Prerequisites

1. **Local Development Environment**
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

2. **Test Database**
- Use separate test database
- Seed with test data
- Reset between test runs

3. **Email Testing**
- Use email testing service (e.g., Mailtrap, MailHog)
- Configure SMTP settings for test environment

---

## Test Scenarios

### 1. Marketing Site Navigation

**Objective:** Verify all marketing pages are accessible and functional

**Test Steps:**
1. Navigate to homepage (`/`)
   - ✅ Page loads without errors
   - ✅ Hero section displays correctly
   - ✅ Programs overview visible
   - ✅ CTAs are clickable

2. Test Programs dropdown in navigation
   - ✅ Dropdown opens on hover/click
   - ✅ All 8 programs listed
   - ✅ Links navigate to correct pages

3. Visit each program page
   - ✅ `/programs/medical-assistant`
   - ✅ `/programs/phlebotomy`
   - ✅ `/programs/ekg-technician`
   - ✅ `/programs/pharmacy-technician`
   - ✅ `/programs/dental-assistant`
   - ✅ `/programs/patient-care-technician`
   - ✅ `/programs/sterile-processing`
   - ✅ `/programs/healthcare-administration`

4. Test Funding dropdown
   - ✅ Dropdown opens correctly
   - ✅ State Programs link works
   - ✅ Federal Programs link works

5. Visit resource pages
   - ✅ `/students` - For Students page
   - ✅ `/employers` - For Employers page
   - ✅ `/about` - About page
   - ✅ `/contact` - Contact page
   - ✅ `/blog` - Blog listing

6. Test footer links
   - ✅ All program links work
   - ✅ Resource links functional
   - ✅ Legal pages accessible
   - ✅ Social media links present

**Expected Results:**
- All pages load without errors
- Navigation is intuitive and responsive
- Mobile view works correctly
- All links navigate to correct destinations

---

### 2. Application Flow

**Objective:** Test complete application submission process

**Test Steps:**

#### Step 1: Personal Information
1. Navigate to `/apply`
2. Fill out personal information:
   - First Name: "Test"
   - Last Name: "User"
   - Email: "test@example.com"
   - Phone: "(317) 555-1234"
   - Date of Birth: "01/01/1990"
   - Address: "123 Main St"
   - City: "Indianapolis"
   - State: "IN"
   - ZIP: "46201"
3. Click "Continue"

**Validation Checks:**
- ✅ Required fields validated
- ✅ Email format validated
- ✅ Phone format validated
- ✅ Date format validated
- ✅ ZIP code format validated
- ✅ Progress indicator updates

#### Step 2: Program Selection
1. Select program: "Medical Assistant"
2. Select start date: "As soon as possible"
3. Select schedule: "Full-time (Daytime)"
4. Click "Continue"

**Validation Checks:**
- ✅ All fields required
- ✅ Program options display correctly
- ✅ Progress indicator updates

#### Step 3: Funding & Eligibility
1. Select funding: "WIOA"
2. Select employment status: "Unemployed"
3. Select income: "Under $25,000"
4. Select education: "Yes" (has diploma)
5. Click "Continue"

**Validation Checks:**
- ✅ All fields required
- ✅ Funding options clear
- ✅ Progress indicator updates

#### Step 4: Review & Submit
1. Review information displayed
2. Answer support questions:
   - Transportation: "Yes"
   - Childcare: "No"
   - Computer access: "Yes"
3. Add optional additional info
4. Click "Submit Application"

**Validation Checks:**
- ✅ Review shows correct data
- ✅ All fields required
- ✅ Submit button enabled
- ✅ Loading state during submission

**Expected Results:**
- Application submitted successfully
- Confirmation message displayed
- Application stored in database
- Confirmation email sent

---

### 3. Contact Form

**Objective:** Test contact form submission

**Test Steps:**
1. Navigate to `/contact`
2. Fill out form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "(317) 555-1234"
   - Subject: "Program Inquiry"
   - Message: "I have questions about..."
3. Click "Send Message"

**Validation Checks:**
- ✅ Required fields validated
- ✅ Email format validated
- ✅ Subject dropdown works
- ✅ Success message displays
- ✅ Form resets after submission

**Expected Results:**
- Message sent successfully
- Email received by admin
- Success confirmation shown

---

### 4. Authentication Flow

**Objective:** Test user authentication and authorization

**Test Steps:**

#### Application Approval (Admin)
1. Login as admin
2. Navigate to `/admin/applications`
3. Find test application
4. Review application details
5. Click "Approve"

**Expected Results:**
- ✅ Application status updated
- ✅ User account created
- ✅ Verification email sent

#### Email Verification (User)
1. Check test email inbox
2. Find verification email
3. Click verification link
4. Verify redirect to portal

**Expected Results:**
- ✅ Email received
- ✅ Link works
- ✅ Account verified
- ✅ Redirected to `/portal`

#### Portal Access
1. Access `/portal`
2. Verify dashboard loads
3. Check enrolled programs
4. Test navigation

**Expected Results:**
- ✅ Dashboard accessible
- ✅ User information correct
- ✅ Enrolled program visible
- ✅ Navigation shows authenticated state

#### LMS Access
1. Navigate to enrolled program
2. Access course materials
3. View lessons
4. Test video player

**Expected Results:**
- ✅ Course accessible
- ✅ Lessons load correctly
- ✅ Video player works
- ✅ Progress tracked

---

### 5. Mobile Responsiveness

**Objective:** Verify mobile experience

**Test Devices:**
- iPhone (375px width)
- iPad (768px width)
- Android phone (360px width)

**Test Steps:**
1. Test homepage on mobile
   - ✅ Layout adapts correctly
   - ✅ Navigation menu works
   - ✅ Images scale properly
   - ✅ Text readable

2. Test application form on mobile
   - ✅ Form fields accessible
   - ✅ Keyboard doesn't obscure fields
   - ✅ Progress indicator visible
   - ✅ Submit button accessible

3. Test navigation on mobile
   - ✅ Hamburger menu works
   - ✅ Dropdowns function correctly
   - ✅ Links tap-friendly
   - ✅ Close button works

**Expected Results:**
- All pages responsive
- Touch targets adequate size
- No horizontal scrolling
- Content readable without zooming

---

### 6. Performance Testing

**Objective:** Verify site performance

**Metrics to Check:**
- ✅ Page load time < 3 seconds
- ✅ First Contentful Paint < 1.5 seconds
- ✅ Time to Interactive < 3.5 seconds
- ✅ Lighthouse score > 90

**Tools:**
- Chrome DevTools
- Lighthouse
- WebPageTest
- GTmetrix

**Test Pages:**
- Homepage (`/`)
- Program page (`/programs/medical-assistant`)
- Application page (`/apply`)
- Portal dashboard (`/portal`)

---

### 7. Accessibility Testing

**Objective:** Ensure WCAG 2.1 AA compliance

**Test Steps:**
1. Run automated accessibility audit
   - Use axe DevTools
   - Use Lighthouse accessibility audit
   - Check WAVE tool

2. Manual keyboard navigation
   - ✅ Tab through all interactive elements
   - ✅ Focus indicators visible
   - ✅ Skip to main content link works
   - ✅ No keyboard traps

3. Screen reader testing
   - ✅ Headings structured correctly
   - ✅ Images have alt text
   - ✅ Forms have labels
   - ✅ ARIA labels present

4. Color contrast
   - ✅ Text meets 4.5:1 ratio
   - ✅ Interactive elements meet 3:1 ratio
   - ✅ Focus indicators visible

**Expected Results:**
- No critical accessibility issues
- Keyboard navigation works
- Screen reader compatible
- Color contrast sufficient

---

### 8. SEO Testing

**Objective:** Verify SEO optimization

**Test Steps:**
1. Check meta tags
   - ✅ Title tags present and unique
   - ✅ Meta descriptions present
   - ✅ Open Graph tags configured
   - ✅ Keywords appropriate

2. Check structured data
   - ✅ Organization schema
   - ✅ Course schema (program pages)
   - ✅ Breadcrumbs
   - ✅ Valid JSON-LD

3. Check technical SEO
   - ✅ Sitemap.xml generated
   - ✅ Robots.txt configured
   - ✅ Canonical URLs set
   - ✅ 404 page exists

4. Check page speed
   - ✅ Images optimized
   - ✅ Code minified
   - ✅ Caching configured
   - ✅ CDN enabled

**Tools:**
- Google Search Console
- Screaming Frog
- Lighthouse SEO audit
- Schema.org validator

---

### 9. Cross-Browser Testing

**Objective:** Verify compatibility across browsers

**Browsers to Test:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

**Test Scenarios:**
- Homepage loads correctly
- Navigation works
- Forms submit successfully
- Styles render correctly
- JavaScript functions properly

**Expected Results:**
- Consistent experience across browsers
- No layout issues
- All features functional

---

### 10. Security Testing

**Objective:** Verify security measures

**Test Steps:**
1. Test authentication
   - ✅ Protected routes require login
   - ✅ Unauthorized access blocked
   - ✅ Session management works
   - ✅ Logout clears session

2. Test form validation
   - ✅ Server-side validation present
   - ✅ SQL injection prevented
   - ✅ XSS attacks prevented
   - ✅ CSRF protection enabled

3. Test data protection
   - ✅ HTTPS enforced
   - ✅ Sensitive data encrypted
   - ✅ Passwords hashed
   - ✅ API keys not exposed

**Expected Results:**
- No security vulnerabilities
- Data properly protected
- Authentication secure

---

## Automated Testing

### Unit Tests

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage
```

**Coverage Goals:**
- Components: > 80%
- Utilities: > 90%
- API routes: > 85%

### Integration Tests

```bash
# Run integration tests
npm run test:integration
```

**Test Scenarios:**
- Application submission flow
- User authentication flow
- Email verification flow
- Enrollment process

### End-to-End Tests

```bash
# Run E2E tests
npm run test:e2e
```

**Test Scenarios:**
- Complete user journey
- Application to enrollment
- Portal access
- LMS interaction

---

## Bug Reporting

### Bug Report Template

```markdown
**Title:** Brief description

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop

**Steps to Reproduce:**
1. Navigate to...
2. Click on...
3. Enter...

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
Attach if applicable

**Priority:**
- Critical
- High
- Medium
- Low
```

---

## Test Results Documentation

### Test Run Template

```markdown
**Test Date:** 2025-01-23
**Tester:** Name
**Environment:** Production/Staging/Local

**Test Results:**
- Marketing Navigation: ✅ Pass
- Application Flow: ✅ Pass
- Contact Form: ✅ Pass
- Authentication: ✅ Pass
- Mobile Responsive: ✅ Pass
- Performance: ✅ Pass
- Accessibility: ⚠️ Minor issues
- SEO: ✅ Pass
- Cross-Browser: ✅ Pass
- Security: ✅ Pass

**Issues Found:**
1. [Issue description]
2. [Issue description]

**Notes:**
Additional observations
```

---

## Continuous Testing

### Pre-Deployment Checklist

- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] E2E tests passing
- [ ] Manual testing completed
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met
- [ ] Security scan completed
- [ ] Cross-browser testing done

### Post-Deployment Monitoring

- Monitor error logs
- Track user analytics
- Review application submissions
- Check email delivery rates
- Monitor page load times
- Review user feedback

---

## Support

**Testing Questions:**
- Email: qa@elevateforhumanity.org
- Slack: #testing

**Bug Reports:**
- GitHub Issues
- Email: bugs@elevateforhumanity.org

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** Active
