# Mobile Testing Guide

## Overview

This guide covers testing the Elevate LMS PWA on iOS and Android devices.

## Pre-Testing Checklist

- [ ] Service worker is registered and active
- [ ] Manifest.json is properly configured
- [ ] All mobile components are responsive
- [ ] Offline functionality is implemented
- [ ] Push notifications are configured

## iOS Testing

### Devices to Test

- **iPhone SE (2nd gen)** - Small screen (4.7")
- **iPhone 12/13** - Standard screen (6.1")
- **iPhone 14 Pro Max** - Large screen (6.7")
- **iPad Air** - Tablet (10.9")

### iOS-Specific Features

1. **Add to Home Screen**
   - Open in Safari
   - Tap Share button
   - Select "Add to Home Screen"
   - Verify icon appears on home screen
   - Launch from home screen (should open in standalone mode)

2. **Safe Area Insets**
   - Test on devices with notch (iPhone X and newer)
   - Verify content doesn't overlap with notch
   - Check bottom navigation respects home indicator

3. **Gestures**
   - Swipe back gesture (should not conflict with app navigation)
   - Pull-to-refresh (should be disabled or controlled)
   - Pinch-to-zoom (should be disabled on UI elements)

4. **Video Playback**
   - Test inline video playback
   - Test fullscreen video
   - Verify controls work correctly
   - Check Picture-in-Picture support

5. **Notifications**
   - Note: iOS doesn't support web push notifications in PWAs
   - Test in-app notifications instead

### iOS Safari Quirks

- Service worker may not update immediately
- IndexedDB has storage limits (50MB on some devices)
- Video autoplay requires user interaction
- Audio must be unmuted by user action

## Android Testing

### Devices to Test

- **Pixel 4a** - Small screen (5.8")
- **Samsung Galaxy S21** - Standard screen (6.2")
- **OnePlus 9 Pro** - Large screen (6.7")
- **Samsung Galaxy Tab S7** - Tablet (11")

### Android-Specific Features

1. **Install PWA**
   - Open in Chrome
   - Tap menu (three dots)
   - Select "Install app" or "Add to Home Screen"
   - Verify app appears in app drawer
   - Launch from app drawer

2. **WebAPK**
   - After installation, verify WebAPK is created
   - Check app appears in Settings > Apps
   - Verify app can be uninstalled like native app

3. **Push Notifications**
   - Request notification permission
   - Send test notification
   - Verify notification appears in system tray
   - Test notification actions
   - Check notification settings in system

4. **Offline Mode**
   - Enable airplane mode
   - Verify cached content loads
   - Test offline indicator appears
   - Make changes offline
   - Go back online and verify sync

5. **Background Sync**
   - Make changes while offline
   - Close app
   - Go back online
   - Verify changes sync in background

### Android Chrome Quirks

- Service worker updates more aggressively
- Better IndexedDB support (larger storage)
- Better video format support (WebM, VP9)
- More reliable background sync

## Cross-Platform Testing

### Core Functionality

1. **Navigation**
   - [ ] Bottom navigation works on all screens
   - [ ] Hamburger menu opens/closes correctly
   - [ ] Back button behavior is correct
   - [ ] Deep links work properly

2. **Authentication**
   - [ ] Login works on mobile
   - [ ] Session persists across app restarts
   - [ ] Logout clears session properly

3. **Course Viewing**
   - [ ] Course cards display correctly
   - [ ] Course details page is readable
   - [ ] Lesson navigation works
   - [ ] Progress tracking updates

4. **Video Player**
   - [ ] Videos load and play
   - [ ] Controls are touch-friendly
   - [ ] Fullscreen works
   - [ ] Progress is saved
   - [ ] Playback speed controls work

5. **Offline Features**
   - [ ] Service worker caches assets
   - [ ] Offline page displays when no connection
   - [ ] Cached content loads offline
   - [ ] Progress syncs when back online

6. **Performance**
   - [ ] App loads in < 3 seconds on 3G
   - [ ] Smooth scrolling (60fps)
   - [ ] No layout shifts
   - [ ] Images load progressively

### Touch Interactions

- [ ] All buttons are at least 44x44px (Apple guideline)
- [ ] Touch targets don't overlap
- [ ] Swipe gestures work smoothly
- [ ] Long press actions work
- [ ] Double tap doesn't zoom

### Responsive Design

- [ ] Layout adapts to screen size
- [ ] Text is readable without zooming
- [ ] Images scale appropriately
- [ ] Forms are easy to fill on mobile
- [ ] Modals/dialogs fit on screen

## Testing Tools

### Browser DevTools

**Chrome DevTools**
```
1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select device from dropdown
4. Test different screen sizes
5. Throttle network to test slow connections
```

**Lighthouse**
```
1. Open DevTools
2. Go to Lighthouse tab
3. Select "Mobile" device
4. Check "Progressive Web App"
5. Run audit
6. Aim for score > 90
```

### Remote Debugging

**iOS (Safari)**
```
1. Enable Web Inspector on iOS device
   Settings > Safari > Advanced > Web Inspector
2. Connect device to Mac via USB
3. Open Safari on Mac
4. Develop > [Device Name] > [Page]
```

**Android (Chrome)**
```
1. Enable USB debugging on Android
   Settings > Developer Options > USB Debugging
2. Connect device to computer via USB
3. Open chrome://inspect in Chrome
4. Select device and page to inspect
```

### Testing Checklist

#### Installation
- [ ] PWA install prompt appears
- [ ] App installs successfully
- [ ] App icon displays correctly
- [ ] Splash screen shows on launch
- [ ] App opens in standalone mode

#### Offline
- [ ] Service worker registers
- [ ] Assets are cached
- [ ] Offline page displays
- [ ] Cached content loads
- [ ] Background sync works

#### Performance
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Speed Index < 3.4s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1

#### Accessibility
- [ ] Touch targets are large enough
- [ ] Color contrast meets WCAG AA
- [ ] Text is readable
- [ ] Forms are accessible
- [ ] Screen reader compatible

## Common Issues

### iOS

**Issue**: Service worker not updating
**Solution**: Clear Safari cache, close all tabs, restart Safari

**Issue**: Videos not playing
**Solution**: Ensure videos are in compatible format (H.264), add playsinline attribute

**Issue**: App not installing
**Solution**: Verify manifest.json is valid, check HTTPS is enabled

### Android

**Issue**: Push notifications not working
**Solution**: Check VAPID keys are configured, verify notification permission granted

**Issue**: App not appearing in app drawer
**Solution**: Wait a few minutes for WebAPK to be created, or reinstall

**Issue**: Background sync failing
**Solution**: Check service worker is active, verify sync event is registered

## Reporting Issues

When reporting mobile issues, include:

1. Device model and OS version
2. Browser name and version
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots or screen recording
6. Console errors (if any)

## Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [iOS PWA Guide](https://developer.apple.com/documentation/webkit/safari_web_extensions)
- [Android PWA Guide](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [Service Worker Cookbook](https://serviceworke.rs/)
