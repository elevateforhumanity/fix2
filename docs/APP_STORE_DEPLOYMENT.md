# App Store Deployment Guide

Complete guide for deploying Elevate For Humanity to iOS App Store and Google Play Store.

---

## Prerequisites

### iOS App Store
- Apple Developer Account ($99/year)
- Mac with Xcode installed
- Valid certificates and provisioning profiles
- App Store Connect access

### Google Play Store
- Google Play Developer Account ($25 one-time)
- Android Studio installed
- Signing key generated
- Google Play Console access

---

## Option 1: Progressive Web App (PWA) - Recommended

### Advantages
- ✅ Single codebase
- ✅ Instant updates
- ✅ No app store approval delays
- ✅ Lower maintenance
- ✅ Already implemented

### Current PWA Features
- ✅ Offline functionality
- ✅ Push notifications
- ✅ Install prompts
- ✅ App-like experience
- ✅ Home screen icon
- ✅ Splash screen

### PWA Installation
Users can install directly from the website:
1. Visit https://www.elevateforhumanity.org
2. Click "Install" or "Add to Home Screen"
3. App installs without app store

---

## Option 2: Native App Wrapper (Capacitor)

### Setup Capacitor

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android

# Initialize Capacitor
npx cap init "Elevate For Humanity" "org.elevateforhumanity.app"

# Add platforms
npx cap add ios
npx cap add android

# Build web assets
npm run build

# Copy to native projects
npx cap copy

# Open in native IDEs
npx cap open ios
npx cap open android
```

### Capacitor Configuration

Create `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.elevateforhumanity.app',
  appName: 'Elevate For Humanity',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#dc2626',
      showSpinner: false,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#dc2626',
    },
  },
};

export default config;
```

---

## iOS App Store Deployment

### 1. Prepare iOS Project

```bash
# Open Xcode
npx cap open ios

# In Xcode:
# 1. Select project in navigator
# 2. Update Bundle Identifier: org.elevateforhumanity.app
# 3. Set Team (your Apple Developer account)
# 4. Set Version and Build number
# 5. Configure signing certificates
```

### 2. App Store Assets

Required assets in `ios/App/App/Assets.xcassets/`:

- **App Icon**: 1024x1024px (all sizes generated automatically)
- **Launch Screen**: Storyboard or image
- **Screenshots**: 
  - iPhone 6.7" (1290x2796px) - 3 required
  - iPhone 6.5" (1242x2688px) - 3 required
  - iPad Pro 12.9" (2048x2732px) - 2 required

### 3. App Store Connect Setup

1. Create new app in App Store Connect
2. Fill in app information:
   - Name: Elevate For Humanity
   - Subtitle: Career Training & Education
   - Category: Education
   - Content Rights: Yes
   - Age Rating: 4+

3. Add app description:
```
Transform your career with 100% funded training programs in healthcare, skilled trades, CDL, and more.

Features:
• Free career training programs
• WIOA-approved courses
• Interactive learning modules
• Progress tracking
• Certificate generation
• Offline learning support
• Push notifications for updates
• Career counseling resources

Programs include:
- Certified Nursing Assistant (CNA)
- Medical Assistant
- CDL Training
- HVAC Technician
- Welding
- Barbering
- And many more!

Serving Marion County, Indiana with comprehensive workforce development programs.
```

4. Add keywords:
```
career training, education, workforce development, free training, WIOA, healthcare training, skilled trades, CDL, certification, job training
```

5. Upload screenshots and preview videos

### 4. Build and Submit

```bash
# Archive app in Xcode
# Product > Archive

# Upload to App Store Connect
# Window > Organizer > Distribute App

# Submit for review
# In App Store Connect, submit new version
```

### 5. App Review Information

Provide test account:
- Email: test@elevateforhumanity.org
- Password: [Test password]

Notes for reviewer:
```
This app provides free career training programs for Marion County, Indiana residents. 
Users can browse programs, enroll in courses, track progress, and earn certificates.
Some features require authentication to access personalized content.
```

---

## Google Play Store Deployment

### 1. Prepare Android Project

```bash
# Open Android Studio
npx cap open android

# In Android Studio:
# 1. Update applicationId in build.gradle
# 2. Set versionCode and versionName
# 3. Configure signing
```

### 2. Generate Signing Key

```bash
# Generate keystore
keytool -genkey -v -keystore elevate-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias elevate-key

# Add to android/app/build.gradle:
android {
    signingConfigs {
        release {
            storeFile file('elevate-release-key.jks')
            storePassword 'your-password'
            keyAlias 'elevate-key'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### 3. Play Store Assets

Required assets:

- **App Icon**: 512x512px (PNG, 32-bit)
- **Feature Graphic**: 1024x500px
- **Screenshots**: 
  - Phone: 16:9 or 9:16 ratio (min 320px)
  - 7-inch tablet: 16:9 or 9:16 ratio
  - 10-inch tablet: 16:9 or 9:16 ratio
  - At least 2 screenshots per device type

### 4. Play Console Setup

1. Create new app in Google Play Console
2. Fill in app details:
   - App name: Elevate For Humanity
   - Short description (80 chars):
   ```
   Free career training in healthcare, trades, CDL & more. WIOA-approved programs.
   ```
   
   - Full description (4000 chars):
   ```
   Transform Your Career with Free Training Programs
   
   Elevate For Humanity provides 100% funded career training programs in healthcare, skilled trades, CDL, and more. Our WIOA-approved programs help Marion County, Indiana residents gain the skills they need for in-demand careers.
   
   KEY FEATURES:
   
   📚 Free Career Training
   Access comprehensive training programs at no cost. All programs are 100% funded through WIOA and other workforce development initiatives.
   
   🎓 Multiple Program Options
   Choose from healthcare (CNA, Medical Assistant), skilled trades (HVAC, Welding), transportation (CDL), beauty services (Barbering), and more.
   
   📱 Learn Anywhere
   Access course materials on your phone, tablet, or computer. Download lessons for offline learning.
   
   ✅ Track Your Progress
   Monitor your learning journey with built-in progress tracking and milestone celebrations.
   
   🏆 Earn Certificates
   Receive official certificates upon program completion to boost your career prospects.
   
   🔔 Stay Updated
   Get push notifications for new courses, upcoming classes, and important deadlines.
   
   💼 Career Support
   Access career counseling, job placement assistance, and ongoing support.
   
   AVAILABLE PROGRAMS:
   
   Healthcare:
   • Certified Nursing Assistant (CNA)
   • Medical Assistant
   • Dental Assistant
   • Pharmacy Technician
   • Phlebotomy Technician
   
   Skilled Trades:
   • HVAC Technician
   • Welding
   • Electrical
   • Plumbing
   • Construction Trades
   
   Transportation:
   • CDL Training
   • Forklift Operator
   
   Beauty & Wellness:
   • Barbering
   • Cosmetology
   
   Business & Technology:
   • Medical Billing & Coding
   • Cybersecurity
   • Tax Preparation
   
   And many more!
   
   WHO CAN APPLY:
   
   Programs are available to Marion County, Indiana residents who meet WIOA eligibility requirements. We serve:
   • Adults seeking career change
   • Dislocated workers
   • Youth (16-24)
   • Veterans
   • Individuals with barriers to employment
   
   WHY CHOOSE ELEVATE FOR HUMANITY:
   
   ✓ 100% Free Training
   ✓ Industry-Recognized Certifications
   ✓ Flexible Scheduling
   ✓ Job Placement Assistance
   ✓ Supportive Learning Environment
   ✓ Experienced Instructors
   ✓ Modern Facilities
   
   ABOUT US:
   
   Elevate For Humanity is a workforce development organization dedicated to providing accessible, high-quality career training to underserved communities. We partner with local employers, training providers, and government agencies to create pathways to sustainable careers.
   
   Download the app today and take the first step toward your new career!
   
   For questions or support, contact us at support@elevateforhumanity.org
   ```

3. Add app category: Education
4. Add content rating questionnaire
5. Set target audience: 13+
6. Add privacy policy URL
7. Set up pricing: Free

### 5. Build and Upload

```bash
# Build release APK/AAB
cd android
./gradlew bundleRelease

# Upload to Play Console
# Release > Production > Create new release
# Upload android/app/build/outputs/bundle/release/app-release.aab
```

### 6. Release Rollout

1. Internal testing (optional)
2. Closed testing (optional)
3. Open testing (optional)
4. Production release

---

## Post-Deployment

### Monitoring

- **iOS**: App Store Connect Analytics
- **Android**: Google Play Console Statistics
- **Both**: Firebase Analytics, Sentry error tracking

### Updates

```bash
# Update version
# iOS: Increment build number in Xcode
# Android: Increment versionCode in build.gradle

# Rebuild and resubmit
npm run build
npx cap copy
npx cap sync

# iOS: Archive and upload
# Android: Build and upload AAB
```

### App Store Optimization (ASO)

1. Monitor keyword rankings
2. A/B test screenshots
3. Respond to reviews
4. Update descriptions based on user feedback
5. Add localized content for other languages

---

## Database Schema for Mobile Features

```sql
-- Push subscriptions
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription JSONB NOT NULL,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, endpoint)
);

-- Offline sync queue
CREATE TABLE IF NOT EXISTS offline_sync_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  action_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  synced_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending'
);

-- Device registrations
CREATE TABLE IF NOT EXISTS device_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  device_type TEXT NOT NULL,
  device_name TEXT,
  os_version TEXT,
  app_version TEXT,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, device_id)
);
```

---

## Compliance & Legal

### Privacy Policy Requirements
- Data collection disclosure
- Third-party services (Supabase, Stripe, etc.)
- User rights (access, deletion, portability)
- Cookie usage
- Analytics tracking

### Terms of Service
- User responsibilities
- Account termination
- Intellectual property
- Limitation of liability
- Dispute resolution

### App Store Specific
- **iOS**: App Tracking Transparency (ATT) if tracking users
- **Android**: Data safety section in Play Console
- **Both**: Age-appropriate content ratings

---

## Support & Maintenance

### User Support Channels
- In-app support chat
- Email: support@elevateforhumanity.org
- Phone: [Support number]
- FAQ section in app

### Monitoring & Alerts
- Crash reporting (Sentry)
- Performance monitoring (Firebase)
- User feedback collection
- App store review monitoring

---

## Cost Summary

### One-Time Costs
- Apple Developer Account: $99/year
- Google Play Developer Account: $25 (one-time)
- App Store assets creation: $0-500 (if outsourced)

### Ongoing Costs
- Server hosting: Covered by Vercel
- Database: Covered by Supabase
- Push notifications: Free tier available
- Maintenance: Internal development time

---

## Timeline

### PWA (Immediate)
- Already deployed ✅
- Users can install now ✅

### Native Apps (2-4 weeks)
- Week 1: Capacitor setup, native builds
- Week 2: Testing, asset creation
- Week 3: App store submissions
- Week 4: Review process, launch

---

**Recommendation**: Start with PWA (already live), then add native apps if needed for specific features or discoverability.
