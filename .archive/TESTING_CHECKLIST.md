# Elevate for Humanity - Testing Checklist

## ✅ COMPLETED FIXES

### Images
- [x] Fixed medical-assistant image (now uses healthcare-professional-1-hd.jpg)
- [x] Fixed building-maintenance image (now uses building-tech-hd.jpg)
- [x] Fixed business-apprenticeship image (now uses it-hd.jpg)
- [x] Fixed esthetics-apprenticeship image (now uses medical-esthetics-training-hd.jpg)
- [x] Fixed childcare image (now uses counseling-training-hd.jpg)
- [x] Fixed rise-up/retail image (now uses multi-training-programs-optimized.jpg)

### Database & Compliance
- [x] Created employment outcomes tracking table
- [x] Created credentials attainment tracking table
- [x] Created quarterly performance metrics table
- [x] Created participant demographics table
- [x] Created follow-up schedule table
- [x] Created quiz/assessment engine tables
- [x] Created WIOA quarterly report API endpoint

### Features
- [x] Certificate PDF generation system (lib/certificate-generator.ts)
- [x] Quiz and assessment engine database schema
- [x] WIOA quarterly reporting API
- [x] Environment variables template (.env.local)

## 🧪 CRITICAL USER FLOWS TO TEST

### 1. Student Application Flow
**Path:** Home → Apply → Submit Application

**Test Steps:**
1. Navigate to homepage (/)
2. Click "Apply for Training" button
3. Fill out application form:
   - Full Name
   - Email
   - Phone
   - Program Interest (dropdown)
   - Referral Source
4. Submit form
5. Verify success message
6. Check database for new application record

**Expected Result:** Application saved to database, user receives confirmation

**API Endpoint:** POST /api/applications

---

### 2. Browse Programs Flow
**Path:** Home → Programs → Individual Program

**Test Steps:**
1. Navigate to homepage (/)
2. Click "View all programs"
3. Browse program grid
4. Click on specific program (e.g., CNA)
5. Verify program details load
6. Check "Apply Now" button works

**Expected Result:** All program pages load with correct images and content

**Pages to Test:**
- /programs
- /programs/cna
- /programs/hvac
- /programs/barber
- /programs/medical-assistant
- /programs/building-tech

---

### 3. Partner Application Flow
**Path:** Partners → Apply

**Test Steps:**
1. Navigate to /partners
2. Review partner information
3. Click "Apply to Become a Partner"
4. Fill out partner application
5. Submit

**Expected Result:** Partner application submitted successfully

---

### 4. Course Enrollment Flow (Requires Auth)
**Path:** Login → Browse Courses → Enroll

**Test Steps:**
1. Login to student portal
2. Navigate to /courses
3. Select a course
4. Click "Enroll"
5. Verify enrollment in database

**Expected Result:** Student enrolled in course, appears in dashboard

**API Endpoint:** POST /api/enrollments

---

### 5. Certificate Generation Flow (Requires Auth)
**Path:** Complete Course → Generate Certificate

**Test Steps:**
1. Login as student
2. Complete all course lessons
3. Pass final assessment
4. Click "Generate Certificate"
5. Download PDF certificate

**Expected Result:** Certificate PDF downloads with correct information

**API Endpoint:** POST /api/certificates/generate

---

## 📊 ADMIN/STAFF FLOWS TO TEST

### 6. WIOA Quarterly Report
**Path:** Admin → Reports → WIOA Quarterly

**Test Steps:**
1. Login as admin/staff
2. Navigate to reports section
3. Select quarter and year
4. Generate report
5. Download CSV/Excel

**Expected Result:** Report generates with accurate metrics

**API Endpoint:** GET /api/reports/wioa-quarterly?quarter=1&year=2024

---

### 7. Employment Outcome Tracking
**Path:** Admin → Students → Employment Outcomes

**Test Steps:**
1. Login as admin/staff
2. Navigate to student profile
3. Add employment outcome:
   - Employer name
   - Job title
   - Hourly wage
   - Employment date
4. Save outcome
5. Verify in database

**Expected Result:** Employment outcome saved, appears in reports

**Database Table:** employment_outcomes

---

### 8. Credential Verification
**Path:** Public → Verify Credential

**Test Steps:**
1. Navigate to /verify-credential
2. Enter certificate number
3. View verification details

**Expected Result:** Certificate details displayed if valid

**API Endpoint:** GET /api/certificates/verify?number=XXX

---

## 🔧 TECHNICAL TESTS

### 9. Database Migrations
**Test Steps:**
1. Run migration 002 (WIOA compliance)
2. Run migration 003 (employment outcomes)
3. Run migration 004 (quiz engine)
4. Verify all tables created
5. Check indexes and triggers

**Command:**
```bash
# Run migrations in Supabase SQL Editor
# Or via CLI if configured
```

---

### 10. Environment Variables
**Test Steps:**
1. Copy .env.example to .env.local
2. Add Supabase credentials
3. Add Google Analytics ID
4. Start dev server
5. Verify no environment errors

**Command:**
```bash
pnpm dev
```

---

### 11. API Endpoints Health Check
**Test Steps:**
1. Test /api/applications (POST)
2. Test /api/enrollments (POST)
3. Test /api/certificates/generate (POST)
4. Test /api/reports/wioa-quarterly (GET)
5. Verify proper error handling

**Tools:** Postman, curl, or browser DevTools

---

## 🎨 UI/UX TESTS

### 12. Responsive Design
**Test Steps:**
1. Test homepage on mobile (375px)
2. Test homepage on tablet (768px)
3. Test homepage on desktop (1920px)
4. Check navigation menu
5. Verify images scale properly

**Devices to Test:**
- iPhone SE (375px)
- iPad (768px)
- Desktop (1920px)

---

### 13. Accessibility
**Test Steps:**
1. Run Lighthouse audit
2. Check keyboard navigation
3. Verify alt text on images
4. Test screen reader compatibility
5. Check color contrast

**Tools:** Chrome Lighthouse, axe DevTools

---

### 14. Performance
**Test Steps:**
1. Run Lighthouse performance audit
2. Check page load times
3. Verify image optimization
4. Test with slow 3G network
5. Check bundle size

**Target Metrics:**
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3.8s

---

## 🔒 SECURITY TESTS

### 15. Authentication & Authorization
**Test Steps:**
1. Test login flow
2. Verify protected routes redirect
3. Test role-based access (student, instructor, admin)
4. Check session timeout
5. Test logout

---

### 16. Data Validation
**Test Steps:**
1. Submit forms with invalid data
2. Test SQL injection attempts
3. Test XSS attempts
4. Verify input sanitization
5. Check error messages don't leak info

---

## 📝 DOCUMENTATION TESTS

### 17. Setup Documentation
**Test Steps:**
1. Follow README instructions
2. Verify all dependencies install
3. Check environment setup guide
4. Test database setup instructions

---

### 18. API Documentation
**Test Steps:**
1. Review API endpoint documentation
2. Test example requests
3. Verify response formats
4. Check error codes

---

## 🚀 DEPLOYMENT TESTS

### 19. Vercel Deployment
**Test Steps:**
1. Push to main branch
2. Verify build succeeds
3. Check environment variables in Vercel
4. Test production URL
5. Verify analytics tracking

---

### 20. Database Connection
**Test Steps:**
1. Verify Supabase connection in production
2. Test database queries
3. Check connection pooling
4. Verify SSL connection

---

## 📈 MONITORING TESTS

### 21. Analytics Tracking
**Test Steps:**
1. Verify Google Analytics loads
2. Test page view tracking
3. Check event tracking (button clicks, form submissions)
4. Verify conversion tracking

---

### 22. Error Tracking
**Test Steps:**
1. Trigger intentional error
2. Verify error logged (Sentry if configured)
3. Check error details captured
4. Test error recovery

---

## ✅ SIGN-OFF CHECKLIST

Before going live, ensure:

- [ ] All critical user flows tested
- [ ] Database migrations run successfully
- [ ] Environment variables configured
- [ ] Images loading correctly
- [ ] Forms submitting properly
- [ ] Authentication working
- [ ] Reports generating accurately
- [ ] Certificates generating
- [ ] Mobile responsive
- [ ] Accessibility audit passed
- [ ] Performance metrics met
- [ ] Security review completed
- [ ] Analytics tracking verified
- [ ] Backup/recovery plan in place
- [ ] Support documentation ready

---

## 🐛 KNOWN ISSUES

### To Fix:
1. Partner page dropdown - needs investigation (user reported issue)
2. Some backup page files still reference old images (page-previous-version.tsx, etc.)
3. Need to add WCAG 2.1 AA compliance audit
4. Need to implement rate limiting on API endpoints
5. Need to add email notifications for applications

### Nice to Have:
1. Mobile app (PWA is available)
2. Advanced SCORM support
3. Video hosting integration
4. Real-time chat support
5. Multi-language support

---

## 📞 SUPPORT CONTACTS

**Technical Issues:**
- GitHub Issues: [repository]/issues
- Email: support@elevateforhumanity.org

**Compliance Questions:**
- WIOA Compliance: [contact]
- Data Privacy: [contact]

---

**Last Updated:** 2024-11-29
**Version:** 2.0.0
