# Multi-App PWA Setup for License Holders

## Overview

This codebase supports multiple installable PWA apps for different user roles and client organizations.

## Available PWA Manifests

### 1. Main Website App

- **File**: `/public/manifest.json`
- **Purpose**: Public-facing website
- **Start URL**: `/`
- **Theme Color**: Orange (#f97316)
- **Scope**: Entire site

### 2. Student Portal App

- **File**: `/public/manifest-student.json`
- **Purpose**: Student dashboard and courses
- **Start URL**: `/student/dashboard`
- **Theme Color**: Blue (#2563eb)
- **Scope**: `/student/`

### 3. LMS App

- **File**: `/public/manifest-lms.json`
- **Purpose**: Learning Management System
- **Start URL**: `/lms/dashboard`
- **Theme Color**: Purple (#7c3aed)
- **Scope**: `/lms/`

### 4. Admin Dashboard App

- **File**: `/public/manifest-admin.json`
- **Purpose**: Administrative functions
- **Start URL**: `/admin`
- **Theme Color**: Red (#dc2626)
- **Scope**: `/admin/`

### 5. Instructor Portal App

- **File**: `/public/manifest-instructor.json`
- **Purpose**: Instructor course management
- **Start URL**: `/instructor/dashboard`
- **Theme Color**: Green (#059669)
- **Scope**: `/instructor/`

## For License Holders: Customization Guide

### Step 1: Update Manifest Files

For each manifest file you want to customize:

```json
{
  "name": "YOUR ORGANIZATION NAME - Student Portal",
  "short_name": "YourOrg Student",
  "description": "Your custom description",
  "start_url": "/student/dashboard?source=pwa&org=yourorg",
  "theme_color": "#YOUR_BRAND_COLOR",
  "icons": [
    {
      "src": "/your-custom-icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Step 2: Create Custom Icons

Replace the default icons with your branded icons:

- `/public/icon-72.png` through `/public/icon-512.png`
- Create maskable versions for better mobile display
- Use your organization's logo/branding

### Step 3: Update Service Worker (Optional)

Edit `/public/sw.js` to customize caching strategy:

```javascript
const CACHE_NAME = 'yourorg-v1';
```

### Step 4: Add Manifest Links to Layouts

To enable specific manifests for different sections, add to the layout:

```typescript
// app/student/layout.tsx
export const metadata: Metadata = {
  manifest: '/manifest-student.json',
  // ... other metadata
};
```

### Step 5: Test Installation

1. Deploy your customized version
2. Visit each portal URL
3. Look for "Install App" prompt in browser
4. Install and test each PWA separately

## Benefits for License Holders

✅ **White-Label Ready**: Each manifest can be fully branded
✅ **Multiple Apps**: Users can install separate apps for different roles
✅ **Offline Support**: Each app works offline independently
✅ **Push Notifications**: Can be configured per app
✅ **App Store Alternative**: No need for iOS/Android app stores

## Technical Notes

- Each manifest has its own `scope` to prevent conflicts
- Service worker is shared across all apps
- Icons can be customized per manifest
- Theme colors differentiate apps on mobile devices
- Start URLs include tracking parameters

## Support

For questions about customizing PWAs for your license, contact:

- Email: elevate4humanityedu@gmail.com
- Documentation: This file

## License

This PWA configuration is included with your codebase license.
Customize freely for your organization's needs.
