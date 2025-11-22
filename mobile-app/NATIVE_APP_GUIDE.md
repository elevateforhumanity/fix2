# Elevate for Humanity - Native Mobile App Development Guide

## 🎯 Project Overview

This directory contains the React Native/Expo mobile app for Elevate for Humanity. The app provides native iOS and Android experiences for students to access training programs, track progress, and connect with opportunities.

---

## 📁 Project Structure

```
mobile-app/
├── elevate-mobile/          # Main Expo/React Native project
│   ├── src/
│   │   ├── screens/         # App screens
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ProgramsScreen.tsx
│   │   │   ├── ProgressScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── components/      # Reusable components
│   │   ├── navigation/      # Navigation setup
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   └── config.ts        # App configuration
│   ├── assets/              # Images, fonts, etc.
│   ├── app.json             # Expo configuration
│   └── package.json         # Dependencies
└── NATIVE_APP_GUIDE.md      # This file
```

---

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v18 or higher)
   ```bash
   node --version
   ```

2. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

3. **Expo Go App** (for testing)
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

4. **For iOS Development:**
   - Mac computer with macOS
   - Xcode (latest version)
   - iOS Simulator
   - Apple Developer Account ($99/year)

5. **For Android Development:**
   - Android Studio
   - Android SDK
   - Android Emulator or physical device

### Installation

```bash
cd mobile-app/elevate-mobile
npm install
```

### Running the App

**Development Mode (Expo Go):**
```bash
npm start
```
Then scan the QR code with:
- iOS: Camera app
- Android: Expo Go app

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web Browser:**
```bash
npm run web
```

---

## 🏗️ Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [x] Set up Expo project
- [x] Install dependencies
- [x] Create basic navigation
- [x] Design authentication screens
- [ ] Implement API integration
- [ ] Set up state management (Redux/Context)
- [ ] Configure environment variables

### Phase 2: Core Features (Weeks 3-6)
- [ ] User authentication (login/register/logout)
- [ ] Home screen with program overview
- [ ] Programs list and detail screens
- [ ] Video player for course content
- [ ] Progress tracking
- [ ] Profile management
- [ ] Push notifications setup

### Phase 3: Advanced Features (Weeks 7-10)
- [ ] Offline mode
- [ ] Certificate downloads
- [ ] Calendar integration
- [ ] Chat/messaging
- [ ] Job board integration
- [ ] Document uploads
- [ ] Payment integration (if needed)

### Phase 4: Polish & Testing (Weeks 11-12)
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] User testing
- [ ] Accessibility improvements
- [ ] Analytics integration

### Phase 5: App Store Submission (Weeks 13-14)
- [ ] Create app store assets
- [ ] Write app descriptions
- [ ] Take screenshots
- [ ] Submit to Apple App Store
- [ ] Submit to Google Play Store
- [ ] Wait for approval

---

## 📱 Screens to Build

### Authentication
1. **Splash Screen** - App logo and loading
2. **Onboarding** - 3-4 slides explaining the app
3. **Login Screen** - Email/password login
4. **Register Screen** - Create new account
5. **Forgot Password** - Password reset

### Main App
6. **Home Screen** - Dashboard with quick actions
7. **Programs Screen** - Browse all training programs
8. **Program Detail** - View program information
9. **Course Player** - Watch videos, read content
10. **Progress Screen** - Track completion and certificates
11. **Calendar Screen** - Upcoming classes and deadlines
12. **Messages Screen** - Chat with instructors/support
13. **Profile Screen** - User settings and info
14. **Notifications Screen** - App notifications
15. **Settings Screen** - App preferences

---

## 🔌 API Integration

### Base URL
- Development: `http://localhost:3000`
- Production: `https://www.elevateforhumanity.org`

### Key Endpoints

**Authentication:**
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

**Programs:**
```typescript
GET /api/programs
GET /api/programs/:id
GET /api/programs/:id/enroll
```

**User:**
```typescript
GET /api/user/profile
PUT /api/user/profile
GET /api/user/progress
GET /api/user/certificates
```

**Content:**
```typescript
GET /api/courses/:id/content
POST /api/courses/:id/progress
GET /api/courses/:id/videos
```

---

## 🎨 Design System

### Colors
```typescript
const colors = {
  primary: '#10b981',      // Emerald green
  secondary: '#f97316',    // Orange
  background: '#0f172a',   // Dark slate
  surface: '#1e293b',      // Lighter slate
  text: '#ffffff',         // White
  textSecondary: '#94a3b8', // Gray
  error: '#ef4444',        // Red
  success: '#22c55e',      // Green
  warning: '#f59e0b',      // Amber
};
```

### Typography
```typescript
const typography = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: 'normal' },
  caption: { fontSize: 14, fontWeight: 'normal' },
};
```

### Spacing
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

---

## 📦 Required Dependencies

Already installed:
- `expo` - Expo framework
- `react-native` - React Native core
- `@react-navigation/native` - Navigation
- `@react-navigation/stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator
- `axios` - HTTP client
- `@react-native-async-storage/async-storage` - Local storage

To install:
```bash
npm install react-native-video
npm install react-native-pdf
npm install expo-notifications
npm install expo-camera
npm install expo-document-picker
npm install expo-file-system
npm install @react-native-community/netinfo
npm install react-native-reanimated
npm install react-native-gesture-handler
```

---

## 🔐 Environment Variables

Create `.env` file:
```
API_BASE_URL=https://www.elevateforhumanity.org
SENTRY_DSN=your_sentry_dsn
GOOGLE_ANALYTICS_ID=your_ga_id
```

---

## 🍎 iOS App Store Submission

### Requirements
1. **Apple Developer Account** ($99/year)
   - Sign up: https://developer.apple.com/programs/

2. **App Store Connect**
   - Create app listing
   - Add app information
   - Upload screenshots
   - Set pricing (Free)

3. **Build the App**
   ```bash
   eas build --platform ios
   ```

4. **Submit for Review**
   - Upload build to App Store Connect
   - Fill out app information
   - Submit for review
   - Wait 1-7 days for approval

### App Store Assets Needed
- **App Icon** (1024x1024px)
- **Screenshots** (various sizes for different devices)
  - iPhone 6.7" (1290x2796px) - 3 required
  - iPhone 6.5" (1242x2688px) - 3 required
  - iPhone 5.5" (1242x2208px) - 3 required
  - iPad Pro 12.9" (2048x2732px) - 3 required
- **App Preview Videos** (optional but recommended)
- **App Description** (4000 characters max)
- **Keywords** (100 characters max)
- **Support URL**
- **Privacy Policy URL**

---

## 🤖 Google Play Store Submission

### Requirements
1. **Google Play Developer Account** ($25 one-time)
   - Sign up: https://play.google.com/console/

2. **Google Play Console**
   - Create app
   - Add app details
   - Upload screenshots
   - Set pricing (Free)

3. **Build the App**
   ```bash
   eas build --platform android
   ```

4. **Submit for Review**
   - Upload APK/AAB to Play Console
   - Fill out store listing
   - Submit for review
   - Wait 1-3 days for approval

### Play Store Assets Needed
- **App Icon** (512x512px)
- **Feature Graphic** (1024x500px)
- **Screenshots** (various sizes)
  - Phone (1080x1920px minimum) - 2-8 required
  - 7" Tablet (1200x1920px) - optional
  - 10" Tablet (1600x2560px) - optional
- **Promo Video** (YouTube URL, optional)
- **Short Description** (80 characters max)
- **Full Description** (4000 characters max)
- **Privacy Policy URL**

---

## 🧪 Testing

### Manual Testing
1. Test on real devices (iOS and Android)
2. Test all user flows
3. Test offline functionality
4. Test push notifications
5. Test different screen sizes
6. Test accessibility features

### Automated Testing
```bash
npm test
```

### Beta Testing
- **iOS:** TestFlight (Apple's beta testing platform)
- **Android:** Google Play Internal Testing

---

## 📊 Analytics & Monitoring

### Recommended Tools
1. **Firebase Analytics** - User behavior tracking
2. **Sentry** - Error monitoring
3. **Mixpanel** - Advanced analytics
4. **Amplitude** - Product analytics

### Implementation
```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/analytics
npm install @sentry/react-native
```

---

## 🚀 Deployment

### Using Expo EAS (Recommended)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure EAS**
   ```bash
   eas build:configure
   ```

4. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

5. **Build for Android**
   ```bash
   eas build --platform android
   ```

6. **Submit to Stores**
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

---

## 💰 Cost Breakdown

### One-Time Costs
- Google Play Developer Account: $25
- App design/development: $50,000-$150,000 (if hiring)

### Annual Costs
- Apple Developer Program: $99/year
- Expo EAS Build: $29-$99/month (optional, for easier builds)
- Backend hosting: $20-$200/month
- Push notifications: $0-$50/month
- Analytics: $0-$100/month

### Total First Year
- DIY: $150-$500
- Professional: $50,000-$200,000

---

## 👥 Team Needed

### Minimum Team
1. **React Native Developer** (1 person, 3-6 months)
   - Build app features
   - Integrate APIs
   - Handle app store submissions

### Ideal Team
1. **React Native Developer** (1-2 people)
2. **UI/UX Designer** (1 person)
3. **Backend Developer** (1 person, if API changes needed)
4. **QA Tester** (1 person)
5. **Project Manager** (1 person)

---

## 📚 Resources

### Documentation
- Expo: https://docs.expo.dev/
- React Native: https://reactnative.dev/
- React Navigation: https://reactnavigation.org/

### Tutorials
- Expo Tutorial: https://docs.expo.dev/tutorial/introduction/
- React Native School: https://www.reactnativeschool.com/
- YouTube: "React Native Tutorial for Beginners"

### Communities
- Expo Discord: https://chat.expo.dev/
- React Native Community: https://www.reactnative.dev/community/overview
- Stack Overflow: https://stackoverflow.com/questions/tagged/react-native

---

## 🐛 Common Issues & Solutions

### Issue: "Unable to resolve module"
**Solution:**
```bash
npm install
npx expo start --clear
```

### Issue: "Build failed on iOS"
**Solution:**
- Update Xcode to latest version
- Clean build folder: `cd ios && xcodebuild clean`
- Reinstall pods: `cd ios && pod install`

### Issue: "Android build fails"
**Solution:**
- Update Android Studio
- Check Java version (needs Java 11)
- Clear gradle cache: `cd android && ./gradlew clean`

---

## 📞 Support

For development questions:
- Email: dev@elevateforhumanity.org
- Slack: #mobile-dev channel
- GitHub Issues: https://github.com/elevateforhumanity/fix2/issues

---

## ✅ Next Steps

1. **Review this guide** and understand the scope
2. **Set up development environment** (Node.js, Expo, etc.)
3. **Run the starter project** to see it working
4. **Start building screens** following the roadmap
5. **Test frequently** on real devices
6. **Prepare app store assets** early
7. **Submit to stores** when ready

**Estimated Timeline:** 3-6 months for full development and launch

**Budget:** $50,000-$150,000 for professional development, or DIY with time investment

Good luck! 🚀
