# Critical User Flow Test Plan

## Test Environment
- **URL**: [To be filled with Vercel production URL]
- **Date**: 2025-12-27
- **Tester**: [Name]

---

## Flow 1: Apply → Login → Next Steps

### Prerequisites
- Clear browser cache and cookies
- Use incognito/private browsing mode
- Have test credentials ready

### Test Steps

#### Step 1: Apply Page (`/apply`)
1. Navigate to `/apply`
2. **Verify**:
   - [ ] Page loads without errors
   - [ ] No "Loading..." infinite loop
   - [ ] Application form is visible
   - [ ] All form fields render correctly
   - [ ] No placeholder text (555, lorem, TBD, etc.)
   - [ ] Submit button is functional

3. **Fill out form**:
   - Enter valid test data
   - Submit application

4. **Expected Result**:
   - [ ] Form submits successfully
   - [ ] Confirmation message appears OR redirect to next step
   - [ ] No console errors in browser DevTools

#### Step 2: Login Page (`/login`)
1. Navigate to `/login`
2. **Verify**:
   - [ ] Page loads without errors
   - [ ] Login form is immediately visible (no infinite "Loading...")
   - [ ] Email and password fields present
   - [ ] "Forgot password" link works
   - [ ] No placeholder text

3. **Test login with invalid credentials**:
   - Enter wrong email/password
   - Submit form

4. **Expected Result**:
   - [ ] Error message displays clearly
   - [ ] Form remains functional (can retry)
   - [ ] No white screen or crash

5. **Test login with valid credentials**:
   - Enter correct email/password
   - Submit form

6. **Expected Result**:
   - [ ] Login succeeds
   - [ ] Redirects to appropriate dashboard
   - [ ] No console errors

#### Step 3: Next Steps Page (`/next-steps`)
1. Navigate to `/next-steps` (while logged in)
2. **Verify**:
   - [ ] Page loads without errors
   - [ ] Checklist is visible (no infinite "Loading...")
   - [ ] User-specific data displays correctly
   - [ ] Action items are clear
   - [ ] No placeholder text

3. **Test when logged out**:
   - Log out
   - Navigate to `/next-steps`

4. **Expected Result**:
   - [ ] Shows "Please log in" message OR redirects to login
   - [ ] No crash or white screen

---

## Flow 2: Program Browsing → Enrollment

### Test Steps

#### Step 1: Programs Page (`/programs`)
1. Navigate to `/programs`
2. **Verify**:
   - [ ] All programs display correctly
   - [ ] Images load properly
   - [ ] No placeholder content
   - [ ] Links work

#### Step 2: Individual Program Page
1. Click on a program (e.g., `/programs/barber-apprenticeship`)
2. **Verify**:
   - [ ] Program details load
   - [ ] Enrollment CTA is visible
   - [ ] No errors

#### Step 3: Enrollment Flow
1. Click "Enroll" or "Apply"
2. **Verify**:
   - [ ] Redirects to appropriate page
   - [ ] Form loads correctly
   - [ ] Can complete enrollment

---

## Flow 3: Error Handling

### Test Steps

#### Test 1: Network Error Simulation
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Try to submit a form

**Expected Result**:
- [ ] User sees clear error message
- [ ] Form doesn't crash
- [ ] Can retry when back online

#### Test 2: Invalid Data
1. Submit forms with invalid data:
   - Empty required fields
   - Invalid email format
   - Invalid phone number

**Expected Result**:
- [ ] Validation errors display clearly
- [ ] Form highlights problem fields
- [ ] User can correct and resubmit

#### Test 3: API Errors
1. Test pages that fetch data
2. Check behavior when API returns errors

**Expected Result**:
- [ ] Error messages display (not crashes)
- [ ] Retry options available
- [ ] No infinite loading states

---

## Flow 4: Mobile Responsiveness

### Test Steps
1. Test all above flows on mobile device or DevTools mobile emulation
2. **Verify**:
   - [ ] All pages render correctly on mobile
   - [ ] Forms are usable on small screens
   - [ ] Navigation works
   - [ ] No horizontal scrolling issues

---

## Flow 5: Security & Privacy

### Test Steps

#### Test 1: Policy Pages
1. Navigate to `/privacy-policy`
2. Navigate to `/terms-of-service`
3. **Verify**:
   - [ ] Pages load correctly
   - [ ] Content is complete
   - [ ] No placeholder text

#### Test 2: Redirects
1. Navigate to `/privacy` (old URL)
2. Navigate to `/terms` (old URL)
3. **Verify**:
   - [ ] Redirects to canonical URLs
   - [ ] No 404 errors

#### Test 3: XSS Protection
1. Try to submit forms with HTML/script tags
2. **Verify**:
   - [ ] Content is sanitized
   - [ ] No script execution
   - [ ] Data displays safely

---

## Performance Checks

### Test Steps
1. Open DevTools → Lighthouse
2. Run audit on key pages:
   - `/` (homepage)
   - `/programs`
   - `/apply`
   - `/login`

3. **Target Scores**:
   - [ ] Performance: >70
   - [ ] Accessibility: >90
   - [ ] Best Practices: >90
   - [ ] SEO: >90

---

## Browser Compatibility

### Test in Multiple Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Critical Issues Checklist

### Must Fix Before Production
- [ ] No infinite loading states
- [ ] All forms submit successfully
- [ ] Error messages display correctly
- [ ] No console errors on critical paths
- [ ] Authentication works reliably
- [ ] No placeholder/dev content visible

### Should Fix (Non-Blocking)
- [ ] Performance optimization
- [ ] Minor UI polish
- [ ] Additional error handling
- [ ] Enhanced loading states

---

## Sign-Off

**Tested By**: ___________________  
**Date**: ___________________  
**Status**: [ ] PASS [ ] FAIL [ ] NEEDS WORK  
**Notes**:

---

## Automated Test Command

Run smoke test:
```bash
./scripts/closeout_smoke.sh https://your-production-url.vercel.app
```

Expected output:
```
✅ All smoke tests passed!
```
