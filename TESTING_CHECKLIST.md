# Testing Checklist - Skeleton Page Fix

## Pre-Deployment Checklist

Before testing, ensure:

- [ ] Environment variables added to Netlify Dashboard
  - [ ] `VITE_API_URL=https://api.elevateforhumanity.org`
  - [ ] `VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co`
  - [ ] `VITE_SUPABASE_ANON_KEY=[key from NETLIFY_ENV_VARS_REQUIRED.md]`
- [ ] New deployment triggered (clear cache + deploy)
- [ ] Deployment completed successfully (check Netlify dashboard)

---

## Test Environment

### Test URLs
- **Netlify App:** https://elevateforhumanityfix.netlify.app
- **Marketing Site:** https://elevateforhumanity.org (Durable.co)

### Test Browsers
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browser (optional)

---

## 1. Homepage Tests

### URL: https://elevateforhumanityfix.netlify.app/

#### Visual Tests
- [ ] Page loads without skeleton/blank state
- [ ] Hero section displays immediately
- [ ] Navigation menu visible
- [ ] Footer loads
- [ ] Images load correctly
- [ ] No layout shifts (CLS)

#### Console Tests (DevTools → Console)
- [ ] No JavaScript errors
- [ ] No CORS errors
- [ ] API calls succeed
- [ ] Supabase connection works

#### Network Tests (DevTools → Network)
- [ ] API calls go to `https://api.elevateforhumanity.org`
- [ ] Supabase calls go to `https://cuxzzpsyufcewtmicszk.supabase.co`
- [ ] All requests return 200 OK (or expected status)
- [ ] No 404 errors for assets

---

## 2. Programs Page Tests

### URL: https://elevateforhumanityfix.netlify.app/programs

#### Visual Tests
- [ ] Programs list loads immediately
- [ ] No skeleton cards
- [ ] Program images display
- [ ] Program descriptions visible
- [ ] "Apply Now" buttons work

#### Functional Tests
- [ ] Click on a program card
- [ ] Program detail page loads
- [ ] Back button works
- [ ] Navigation between programs works

---

## 3. LMS Tests

### URL: https://elevateforhumanityfix.netlify.app/lms

#### Visual Tests
- [ ] LMS dashboard loads
- [ ] Course list displays
- [ ] No skeleton states
- [ ] User profile section loads (if logged in)

#### Functional Tests
- [ ] Click on a course
- [ ] Course content loads
- [ ] Video player works (if applicable)
- [ ] Progress tracking visible

---

## 4. Certificates Page Tests

### URL: https://elevateforhumanityfix.netlify.app/certificates

#### Visual Tests
- [ ] Certificates page loads
- [ ] Certificate list displays
- [ ] No skeleton states
- [ ] Certificate images/previews load

#### Functional Tests
- [ ] Click "View Certificate"
- [ ] Certificate detail loads
- [ ] Download/print works (if applicable)

---

## 5. Authentication Tests

### Login Page: https://elevateforhumanityfix.netlify.app/auth/login

#### Visual Tests
- [ ] Login form displays immediately
- [ ] No skeleton state
- [ ] Form fields visible
- [ ] Submit button works

#### Functional Tests
- [ ] Enter credentials
- [ ] Submit form
- [ ] Check API call goes to correct endpoint
- [ ] Verify Supabase auth works
- [ ] Redirect after login works

### Signup Page: https://elevateforhumanityfix.netlify.app/auth/signup

#### Visual Tests
- [ ] Signup form displays immediately
- [ ] All fields visible
- [ ] No skeleton state

#### Functional Tests
- [ ] Fill out form
- [ ] Submit registration
- [ ] Verify API calls work
- [ ] Check email verification (if applicable)

---

## 6. API Integration Tests

### Check API Endpoints

Open DevTools → Network tab and verify:

#### Supabase Calls
- [ ] Auth calls go to `https://cuxzzpsyufcewtmicszk.supabase.co/auth/v1/`
- [ ] Data calls go to `https://cuxzzpsyufcewtmicszk.supabase.co/rest/v1/`
- [ ] Realtime calls go to `wss://cuxzzpsyufcewtmicszk.supabase.co/realtime/v1/`
- [ ] All calls include correct `apikey` header

#### Custom API Calls
- [ ] API calls go to `https://api.elevateforhumanity.org`
- [ ] No calls to `localhost` or `127.0.0.1`
- [ ] No calls to wrong domains
- [ ] CORS headers present in responses

---

## 7. Performance Tests

### Lighthouse Audit (DevTools → Lighthouse)

Run audit and check:
- [ ] Performance score > 80
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1

### Loading Speed
- [ ] Homepage loads in < 3 seconds
- [ ] Subsequent pages load in < 1 second
- [ ] No long loading spinners
- [ ] Smooth transitions

---

## 8. Mobile Responsiveness Tests

### Test on Mobile Device or DevTools Device Mode

- [ ] Homepage responsive
- [ ] Navigation menu works (hamburger)
- [ ] Programs page responsive
- [ ] Forms work on mobile
- [ ] Touch interactions work
- [ ] No horizontal scroll

---

## 9. SEO Tests

### Meta Tags (View Page Source)
- [ ] `<title>` tag present
- [ ] `<meta name="description">` present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URL set

### Sitemap
- [ ] Visit: https://elevateforhumanityfix.netlify.app/sitemap.xml
- [ ] Sitemap loads correctly
- [ ] All pages listed
- [ ] Valid XML format

### Robots.txt
- [ ] Visit: https://elevateforhumanityfix.netlify.app/robots.txt
- [ ] File exists
- [ ] Sitemap URL included

---

## 10. Security Tests

### HTTPS
- [ ] Site loads over HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate valid

### Headers (DevTools → Network → Response Headers)
- [ ] `Strict-Transport-Security` present
- [ ] `X-Content-Type-Options: nosniff` present
- [ ] `X-Frame-Options` present
- [ ] `Content-Security-Policy` present
- [ ] `Referrer-Policy` present

---

## 11. Error Handling Tests

### 404 Page
- [ ] Visit non-existent page: https://elevateforhumanityfix.netlify.app/nonexistent
- [ ] Custom 404 page displays
- [ ] Navigation still works
- [ ] Can return to homepage

### Network Errors
- [ ] Disable network (DevTools → Network → Offline)
- [ ] Reload page
- [ ] Check error message displays
- [ ] Re-enable network
- [ ] Verify recovery

---

## 12. Cross-Browser Tests

### Chrome/Edge
- [ ] All tests pass
- [ ] No console errors
- [ ] Smooth performance

### Firefox
- [ ] All tests pass
- [ ] No console errors
- [ ] Smooth performance

### Safari (if available)
- [ ] All tests pass
- [ ] No console errors
- [ ] Smooth performance

---

## Success Criteria

The fix is successful when:

✅ **No skeleton pages** - All content loads immediately  
✅ **No CORS errors** - API calls work correctly  
✅ **Correct API URLs** - Calls go to production endpoints  
✅ **Fast loading** - Pages load in < 3 seconds  
✅ **No console errors** - Clean browser console  
✅ **Mobile responsive** - Works on all devices  
✅ **SEO optimized** - Meta tags and sitemap present  
✅ **Secure** - HTTPS and security headers configured  

---

## Failure Scenarios

If tests fail, check:

### Still seeing skeleton pages?
1. Verify environment variables are set in Netlify
2. Check deployment completed successfully
3. Hard refresh browser (Ctrl+Shift+R)
4. Clear browser cache
5. Check build logs for errors

### API calls failing?
1. Verify `VITE_API_URL` is correct
2. Check API server is running
3. Verify CORS headers on API server
4. Check Supabase project is active

### CORS errors?
1. Verify CSP headers include API domain
2. Check `public/_headers` file
3. Verify `netlify.toml` headers
4. Check API server CORS configuration

---

## Reporting Issues

If you find issues, document:

1. **URL** where issue occurs
2. **Browser** and version
3. **Steps to reproduce**
4. **Expected behavior**
5. **Actual behavior**
6. **Console errors** (screenshot)
7. **Network tab** (screenshot of failed requests)

---

## Next Steps After Testing

### If All Tests Pass ✅
1. Update Durable.co "Get Started" link
2. Monitor for 24 hours
3. Consider Phase 2: Custom subdomain (optional)
4. Plan Phase 3: Full architecture split (future)

### If Tests Fail ❌
1. Review error messages
2. Check environment variables
3. Verify deployment logs
4. Consult troubleshooting guides
5. Seek support if needed

---

**Last Updated:** 2025-11-05  
**Status:** Ready for testing after deployment
