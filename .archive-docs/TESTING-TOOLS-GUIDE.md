# Testing Tools Guide

Comprehensive guide to testing tools for Elevate for Humanity.

## Performance Testing

### 1. Lighthouse (Built into Chrome)

**What it tests**: Performance, Accessibility, Best Practices, SEO

**How to use**:

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select categories to test
4. Click "Analyze page load"

**Target Scores**:

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

**Free**: Yes
**URL**: Built into Chrome

---

### 2. GTmetrix

**What it tests**: Page speed, Core Web Vitals, waterfall analysis

**How to use**:

1. Go to https://gtmetrix.com
2. Enter your URL
3. Click "Analyze"
4. Review detailed performance report

**Target Metrics**:

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Free**: Yes (limited tests per day)
**URL**: https://gtmetrix.com

---

### 3. WebPageTest

**What it tests**: Detailed performance metrics, filmstrip view, connection throttling

**How to use**:

1. Go to https://www.webpagetest.org
2. Enter URL
3. Select test location and browser
4. Click "Start Test"

**Features**:

- Test from multiple locations
- Simulate different connection speeds
- Video capture of page load
- Detailed waterfall charts

**Free**: Yes
**URL**: https://www.webpagetest.org

---

## Accessibility Testing

### 4. axe DevTools (Browser Extension)

**What it tests**: WCAG 2.1 compliance, ARIA issues, color contrast

**How to use**:

1. Install extension: https://www.deque.com/axe/devtools/
2. Open DevTools
3. Go to "axe DevTools" tab
4. Click "Scan ALL of my page"

**Detects**:

- Missing alt text
- Color contrast issues
- ARIA problems
- Keyboard navigation issues

**Free**: Yes (Pro version available)
**URL**: https://www.deque.com/axe/devtools/

---

### 5. WAVE (Web Accessibility Evaluation Tool)

**What it tests**: Accessibility errors, alerts, and features

**How to use**:

1. Go to https://wave.webaim.org
2. Enter your URL
3. Click "WAVE this page"
4. Review visual feedback on page

**Features**:

- Visual indicators on page
- Detailed error descriptions
- Browser extension available
- Contrast checker

**Free**: Yes
**URL**: https://wave.webaim.org

---

### 6. Accessibility Insights

**What it tests**: Automated and manual accessibility tests

**How to use**:

1. Install extension: https://accessibilityinsights.io
2. Open extension
3. Run "FastPass" for quick scan
4. Run "Assessment" for detailed manual tests

**Features**:

- Automated testing
- Guided manual tests
- Tab stop visualization
- Color contrast analyzer

**Free**: Yes
**URL**: https://accessibilityinsights.io

---

## SEO Testing

### 7. Screaming Frog SEO Spider

**What it tests**: Crawlability, broken links, meta tags, redirects

**How to use**:

1. Download: https://www.screamingfrogseoseo.com
2. Install and open
3. Enter your URL
4. Click "Start"
5. Review crawl data

**Detects**:

- Broken links (404s)
- Missing meta descriptions
- Duplicate content
- Redirect chains
- XML sitemap issues

**Free**: Yes (up to 500 URLs)
**URL**: https://www.screamingfrogseoseo.com

---

### 8. Google Search Console

**What it tests**: Indexing, search performance, mobile usability

**How to use**:

1. Go to https://search.google.com/search-console
2. Add your property
3. Verify ownership
4. Review reports

**Features**:

- Index coverage
- Search performance
- Mobile usability
- Core Web Vitals
- Manual actions

**Free**: Yes
**URL**: https://search.google.com/search-console

---

### 9. Ahrefs Webmaster Tools

**What it tests**: SEO health, backlinks, keywords, technical issues

**How to use**:

1. Sign up: https://ahrefs.com/webmaster-tools
2. Add your website
3. Verify ownership
4. Run site audit

**Features**:

- Site audit (100+ checks)
- Backlink analysis
- Keyword rankings
- Content explorer

**Free**: Yes (limited features)
**URL**: https://ahrefs.com/webmaster-tools

---

## Cross-Browser Testing

### 10. BrowserStack

**What it tests**: Cross-browser compatibility, responsive design

**How to use**:

1. Sign up: https://www.browserstack.com
2. Select browser/device
3. Enter URL
4. Test interactively

**Features**:

- 3000+ real devices
- All major browsers
- Screenshot testing
- Automated testing

**Free**: Limited free trial
**URL**: https://www.browserstack.com

---

### 11. LambdaTest

**What it tests**: Cross-browser testing, responsive testing

**How to use**:

1. Sign up: https://www.lambdatest.com
2. Select browser/OS
3. Enter URL
4. Test live

**Features**:

- 3000+ browsers/devices
- Screenshot testing
- Automated testing
- Geolocation testing

**Free**: Limited free plan
**URL**: https://www.lambdatest.com

---

## Security Testing

### 12. Mozilla Observatory

**What it tests**: Security headers, SSL/TLS, content security

**How to use**:

1. Go to https://observatory.mozilla.org
2. Enter your URL
3. Click "Scan Me"
4. Review security score

**Checks**:

- Security headers
- SSL/TLS configuration
- Content Security Policy
- Cookies
- Subresource Integrity

**Free**: Yes
**URL**: https://observatory.mozilla.org

---

### 13. Security Headers

**What it tests**: HTTP security headers

**How to use**:

1. Go to https://securityheaders.com
2. Enter your URL
3. Click "Scan"
4. Review header grades

**Checks**:

- Strict-Transport-Security
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

**Free**: Yes
**URL**: https://securityheaders.com

---

## Mobile Testing

### 14. Google Mobile-Friendly Test

**What it tests**: Mobile usability

**How to use**:

1. Go to https://search.google.com/test/mobile-friendly
2. Enter your URL
3. Click "Test URL"
4. Review results

**Checks**:

- Text readability
- Tap targets
- Viewport configuration
- Content sizing

**Free**: Yes
**URL**: https://search.google.com/test/mobile-friendly

---

### 15. Responsive Design Checker

**What it tests**: Responsive design across devices

**How to use**:

1. Go to https://responsivedesignchecker.com
2. Enter your URL
3. Select device sizes
4. Review layouts

**Features**:

- Multiple device sizes
- Portrait/landscape
- Custom dimensions
- Screenshot capture

**Free**: Yes
**URL**: https://responsivedesignchecker.com

---

## Load Testing

### 16. K6 (Open Source)

**What it tests**: Load testing, stress testing, spike testing

**How to use**:

```bash
# Install
brew install k6  # macOS
# or download from https://k6.io

# Create test script
cat > test.js << 'EOF'
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10,  // 10 virtual users
  duration: '30s',
};

export default function() {
  let res = http.get('https://www.elevateforhumanity.org');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
EOF

# Run test
k6 run test.js
```

**Free**: Yes (open source)
**URL**: https://k6.io

---

## Monitoring Tools

### 17. UptimeRobot

**What it tests**: Uptime monitoring, response time

**How to use**:

1. Sign up: https://uptimerobot.com
2. Add monitor
3. Enter URL
4. Set check interval
5. Configure alerts

**Features**:

- 5-minute checks
- Email/SMS alerts
- Status pages
- Response time tracking

**Free**: Yes (up to 50 monitors)
**URL**: https://uptimerobot.com

---

### 18. Sentry (Error Tracking)

**What it tests**: Runtime errors, performance issues

**How to use**:

1. Sign up: https://sentry.io
2. Create project
3. Install SDK:

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

4. Add DSN to environment variables

**Features**:

- Error tracking
- Performance monitoring
- Release tracking
- User feedback

**Free**: Yes (limited events)
**URL**: https://sentry.io

---

## Testing Checklist

### Before Launch

- [ ] Run Lighthouse on all major pages
- [ ] Test with axe DevTools
- [ ] Scan with WAVE
- [ ] Crawl with Screaming Frog
- [ ] Check security headers
- [ ] Test on mobile devices
- [ ] Verify in multiple browsers
- [ ] Run load test with K6
- [ ] Set up uptime monitoring
- [ ] Configure error tracking

### After Launch

- [ ] Monitor Google Search Console
- [ ] Check Core Web Vitals
- [ ] Review error logs in Sentry
- [ ] Monitor uptime
- [ ] Track performance trends
- [ ] Review user feedback
- [ ] Check for broken links monthly
- [ ] Re-run accessibility tests quarterly

---

## Quick Start Commands

```bash
# Install testing tools
npm install -g lighthouse
npm install -g @axe-core/cli
brew install k6

# Run Lighthouse
lighthouse https://www.elevateforhumanity.org --view

# Run axe
axe https://www.elevateforhumanity.org

# Run load test
k6 run test.js

# Check security headers
curl -I https://www.elevateforhumanity.org
```

---

## Support

For questions about testing:

- Review test results carefully
- Fix critical issues first
- Document all findings
- Re-test after fixes
- Monitor continuously

**Last Updated**: 2025-12-29
