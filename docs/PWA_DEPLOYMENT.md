# PWA Deployment Guide

## Pre-Deployment Checklist

### Required Files

- [x] `/public/manifest.json` - Web app manifest
- [x] `/public/sw.js` - Service worker
- [x] `/public/icon-*.png` - App icons (all sizes)
- [x] `/app/offline/page.tsx` - Offline fallback page
- [x] Service worker registration in layout

### Configuration

- [ ] HTTPS enabled (required for PWA)
- [ ] Manifest linked in HTML head
- [ ] Service worker registered on page load
- [ ] Icons generated for all required sizes
- [ ] Theme colors configured
- [ ] Start URL configured

### Environment Variables

Add these to your deployment platform:

```bash
# Push Notifications (optional)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_SUBJECT=mailto:admin@elevateforhumanity.org
```

## Deployment Steps

### 1. Build the Application

```bash
npm run build
```

Verify build completes without errors.

### 2. Test Production Build Locally

```bash
npm run start
```

Open `http://localhost:3000` and verify:
- Service worker registers
- Manifest loads correctly
- Icons display properly
- Offline mode works

### 3. Deploy to Vercel

#### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: GitHub Integration

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add environment variables
5. Deploy

### 4. Configure Domain

1. Add custom domain in Vercel dashboard
2. Update DNS records
3. Wait for SSL certificate provisioning
4. Verify HTTPS is working

### 5. Update Manifest URLs

Update `manifest.json` with production URLs:

```json
{
  "start_url": "https://yourdomain.com/",
  "scope": "https://yourdomain.com/",
  "icons": [
    {
      "src": "https://yourdomain.com/icon-192.png",
      ...
    }
  ]
}
```

## Post-Deployment Verification

### 1. PWA Audit with Lighthouse

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://yourdomain.com --view
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
- PWA: 100

### 2. Manual Testing

#### Desktop (Chrome)

1. Open DevTools (F12)
2. Go to Application tab
3. Check Service Workers section:
   - [ ] Service worker is registered
   - [ ] Status is "activated and running"
4. Check Manifest section:
   - [ ] Manifest loads without errors
   - [ ] All icons are present
   - [ ] Identity and presentation are correct
5. Check Storage section:
   - [ ] Cache Storage has entries
   - [ ] IndexedDB is initialized
6. Test install:
   - [ ] Install prompt appears (or in menu)
   - [ ] App installs successfully
   - [ ] App opens in standalone window

#### Mobile (iOS Safari)

1. Open site in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Verify:
   - [ ] Icon displays correctly
   - [ ] Name is correct
5. Launch from home screen:
   - [ ] Opens in standalone mode (no browser UI)
   - [ ] Splash screen displays
   - [ ] App functions correctly

#### Mobile (Android Chrome)

1. Open site in Chrome
2. Tap menu (three dots)
3. Select "Install app"
4. Verify:
   - [ ] Install prompt appears
   - [ ] Icon displays correctly
   - [ ] Name is correct
5. Launch from app drawer:
   - [ ] Opens in standalone mode
   - [ ] Splash screen displays
   - [ ] App functions correctly

### 3. Feature Testing

#### Offline Mode

1. Load the app
2. Enable airplane mode
3. Verify:
   - [ ] Cached pages load
   - [ ] Offline indicator appears
   - [ ] Offline page displays for uncached routes
4. Make changes offline
5. Disable airplane mode
6. Verify:
   - [ ] Changes sync automatically
   - [ ] Online indicator appears

#### Push Notifications

1. Grant notification permission
2. Subscribe to push
3. Send test notification
4. Verify:
   - [ ] Notification appears
   - [ ] Clicking opens app
   - [ ] Actions work correctly

#### Background Sync

1. Make changes while offline
2. Close app
3. Go back online
4. Verify:
   - [ ] Changes sync in background
   - [ ] No data loss

### 4. Performance Testing

#### Network Throttling

Test on different connection speeds:

- **Fast 3G**: App should load in < 5 seconds
- **Slow 3G**: App should load in < 10 seconds
- **Offline**: Cached content should load instantly

#### Metrics to Monitor

```javascript
// First Contentful Paint
Target: < 1.8s

// Time to Interactive
Target: < 3.8s

// Speed Index
Target: < 3.4s

// Total Blocking Time
Target: < 200ms

// Cumulative Layout Shift
Target: < 0.1
```

## Monitoring

### Service Worker Updates

Monitor service worker updates in production:

```javascript
// In ServiceWorkerRegistration.tsx
registration.addEventListener('updatefound', () => {
  console.log('New service worker available');
  // Prompt user to refresh
});
```

### Error Tracking

Add error tracking for service worker:

```javascript
// In sw.js
self.addEventListener('error', (event) => {
  console.error('Service worker error:', event.error);
  // Send to error tracking service
});
```

### Analytics

Track PWA-specific events:

```javascript
// Track installations
window.addEventListener('appinstalled', () => {
  gtag('event', 'pwa_install');
});

// Track standalone mode
if (window.matchMedia('(display-mode: standalone)').matches) {
  gtag('event', 'pwa_launch');
}
```

## Troubleshooting

### Service Worker Not Updating

**Problem**: Users see old version after deployment

**Solutions:**
1. Increment cache version in `sw.js`
2. Call `skipWaiting()` in service worker
3. Clear cache on activation
4. Prompt users to refresh

### Icons Not Displaying

**Problem**: App icon is blank or default

**Solutions:**
1. Verify icon paths in manifest
2. Check icon files exist and are accessible
3. Ensure icons are correct format (PNG)
4. Clear browser cache and reinstall

### Offline Mode Not Working

**Problem**: App doesn't work offline

**Solutions:**
1. Verify service worker is registered
2. Check cache strategy in `sw.js`
3. Ensure assets are being cached
4. Test with DevTools offline mode

### Push Notifications Failing

**Problem**: Notifications don't appear

**Solutions:**
1. Verify VAPID keys are configured
2. Check notification permission is granted
3. Ensure HTTPS is enabled
4. Test subscription endpoint

## Maintenance

### Regular Tasks

**Weekly:**
- Monitor error logs
- Check service worker status
- Review performance metrics

**Monthly:**
- Update dependencies
- Review and optimize cache strategy
- Test on new devices/browsers

**Quarterly:**
- Audit PWA score with Lighthouse
- Review and update icons
- Test installation flow

### Updating the PWA

When deploying updates:

1. Increment cache version in `sw.js`
2. Deploy new version
3. Service worker will update automatically
4. Users will see update prompt on next visit
5. Monitor update adoption rate

## Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Workbox (Service Worker Library)](https://developers.google.com/web/tools/workbox)
- [Web App Manifest Generator](https://www.simicart.com/manifest-generator.html/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## Support

For issues or questions:
- GitHub Issues: [Repository URL]
- Email: admin@elevateforhumanity.org
- Documentation: [Docs URL]
