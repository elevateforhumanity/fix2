# 📱 Elevate Mobile App

> Complete mobile learning experience with offline support, push notifications, and biometric authentication.

[![Status](https://img.shields.io/badge/status-100%25%20complete-success)](/)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)](/)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-61DAFB)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-50-000020)](https://expo.dev)

---

## ✨ Features

### Core Functionality

- ✅ **Authentication** - Email/password + biometric login
- ✅ **Course Browsing** - Search and filter courses
- ✅ **Video Player** - Watch lessons with progress tracking
- ✅ **Certificates** - View and share earned certificates
- ✅ **Achievements** - Badge system with progress tracking
- ✅ **AI Tutor** - Chat with AI for help and explanations
- ✅ **Leaderboard** - Compete with other learners

### Advanced Features

- ✅ **Push Notifications** - Course updates, deadlines, achievements
- ✅ **Offline Mode** - Download courses for offline learning
- ✅ **Biometric Auth** - Face ID, Touch ID, Fingerprint support
- ✅ **Auto-Sync** - Automatic sync when connection restored
- ✅ **Secure Storage** - Encrypted credential storage

---

## 📱 Screenshots

| Home                                            | Courses                                               | Lesson Player                                       | Achievements                                                    |
| ----------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------- |
| ![Home](../../docs/screenshots/mobile-home.png) | ![Courses](../../docs/screenshots/mobile-courses.png) | ![Player](../../docs/screenshots/mobile-player.png) | ![Achievements](../../docs/screenshots/mobile-achievements.png) |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20 or higher
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **iOS Simulator** (Mac only) or **Android Emulator**
- **Expo account** (free at [expo.dev](https://expo.dev))

### Installation

1. **Navigate to mobile app directory:**

   ```bash
   cd mobile-app/elevate-mobile
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment:**

   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server:**

   ```bash
   npm start
   ```

5. **Run on simulator/emulator:**

   ```bash
   # iOS (Mac only)
   npm run ios

   # Android
   npm run android

   # Web (for testing)
   npm run web
   ```

---

## ⚙️ Configuration

### Environment Variables

Create `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Expo Project Setup

1. **Create Expo account** at [expo.dev](https://expo.dev)

2. **Create new project:**

   ```bash
   eas init
   ```

3. **Update `app.json`:**
   ```json
   {
     "expo": {
       "extra": {
         "eas": {
           "projectId": "your-project-id-here"
         }
       }
     }
   }
   ```

### Database Setup

Run the push tokens migration in Supabase:

```sql
-- File: /supabase/migrations/20241221_push_tokens.sql
-- Creates tables for push notifications
```

See [../../RUN_MIGRATION_INSTRUCTIONS.md](../../RUN_MIGRATION_INSTRUCTIONS.md)

---

## 📂 Project Structure

```
elevate-mobile/
├── src/
│   ├── screens/           # All app screens
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CoursesScreen.tsx
│   │   ├── CourseDetailScreen.tsx
│   │   ├── LessonPlayerScreen.tsx
│   │   ├── CertificatesScreen.tsx
│   │   ├── AchievementsScreen.tsx
│   │   ├── AITutorScreen.tsx
│   │   └── LeaderboardScreen.tsx
│   ├── services/          # Business logic
│   │   ├── pushNotifications.ts
│   │   ├── offlineStorage.ts
│   │   └── biometricAuth.ts
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/               # Utilities
│   │   └── supabase.ts
│   └── navigation/        # Navigation setup
│       └── AppNavigator.tsx
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── README.md             # This file
```

---

## 🎨 Screens

### 1. Login Screen

- Email/password authentication
- Biometric login option
- "Remember me" functionality
- Password reset link

### 2. Register Screen

- Account creation
- Email verification
- Terms acceptance
- Auto-login after registration

### 3. Home Screen

- Dashboard with stats
- Quick actions
- Recent courses
- Upcoming deadlines
- Achievement highlights

### 4. Courses Screen

- Browse all courses
- Search functionality
- Filter by category
- Enrollment status

### 5. Course Detail Screen

- Course information
- Lesson list
- Enrollment button
- Progress tracking
- Certificate preview

### 6. Lesson Player Screen

- Video player with controls
- Lesson content
- Progress tracking
- Next/previous navigation
- Completion marking

### 7. Certificates Screen

- Earned certificates
- Share functionality
- Download option
- Certificate details

### 8. Achievements Screen

- Badge collection
- Progress tracking
- Earned/locked states
- Share achievements
- Stats overview

### 9. AI Tutor Screen

- Chat interface
- Quick prompts
- Conversation history
- Real-time responses
- Offline fallback

### 10. Leaderboard Screen

- Rankings display
- Time frames (week/month/all)
- Current user highlight
- Stats display
- Pull to refresh

---

## 🔧 Services

### Push Notifications

**Features:**

- Register for push tokens
- Handle notification permissions
- Schedule local notifications
- Deep linking to screens
- Badge count management

**Usage:**

```typescript
import {
  registerForPushNotifications,
  savePushToken,
} from './services/pushNotifications';

// Register for push notifications
const token = await registerForPushNotifications();
if (token) {
  await savePushToken(userId, token);
}
```

### Offline Storage

**Features:**

- Cache courses and lessons
- Track progress offline
- Sync when online
- Pending action queue
- Storage size tracking

**Usage:**

```typescript
import { performFullSync, getCachedCourses } from './services/offlineStorage';

// Sync all data
await performFullSync(userId);

// Get cached courses
const courses = await getCachedCourses();
```

### Biometric Authentication

**Features:**

- Face ID support (iOS)
- Touch ID support (iOS)
- Fingerprint support (Android)
- Secure credential storage
- Fallback to passcode

**Usage:**

```typescript
import {
  authenticateWithBiometrics,
  enableBiometric,
} from './services/biometricAuth';

// Authenticate
const result = await authenticateWithBiometrics();
if (result.success) {
  // Proceed with login
}

// Enable biometric login
await enableBiometric(email, password);
```

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- LoginScreen
```

### Test on Devices

**iOS:**

```bash
# Simulator
npm run ios

# Physical device
# 1. Connect iPhone via USB
# 2. Trust computer on device
# 3. Run: npm run ios
```

**Android:**

```bash
# Emulator
npm run android

# Physical device
# 1. Enable USB debugging
# 2. Connect via USB
# 3. Run: npm run android
```

---

## 📦 Dependencies

### Core

- `expo` - Expo SDK
- `react-native` - React Native framework
- `react-navigation` - Navigation library
- `@supabase/supabase-js` - Supabase client

### Features

- `expo-notifications` - Push notifications
- `expo-local-authentication` - Biometric auth
- `expo-secure-store` - Secure storage
- `expo-av` - Video player
- `@react-native-async-storage/async-storage` - Offline storage
- `@react-native-community/netinfo` - Network detection

### UI

- `react-native-safe-area-context` - Safe area handling
- `@expo/vector-icons` - Icon library

---

## 🚀 Deployment

### Build for Production

#### iOS (App Store)

1. **Configure EAS:**

   ```bash
   eas build:configure
   ```

2. **Build:**

   ```bash
   eas build --platform ios --profile production
   ```

3. **Submit:**
   ```bash
   eas submit --platform ios
   ```

**Requirements:**

- Apple Developer account ($99/year)
- App Store Connect setup
- Provisioning profiles
- Push notification certificates

#### Android (Google Play)

1. **Configure EAS:**

   ```bash
   eas build:configure
   ```

2. **Build:**

   ```bash
   eas build --platform android --profile production
   ```

3. **Submit:**
   ```bash
   eas submit --platform android
   ```

**Requirements:**

- Google Play Developer account ($25 one-time)
- Signing key
- Play Console setup
- Firebase Cloud Messaging (for push)

---

## 📊 Performance

### Optimization Tips

1. **Images:**
   - Use optimized images
   - Implement lazy loading
   - Cache images locally

2. **Data:**
   - Paginate large lists
   - Cache API responses
   - Use React.memo for expensive components

3. **Navigation:**
   - Use lazy loading for screens
   - Optimize navigation transitions
   - Preload next screen data

4. **Offline:**
   - Cache essential data
   - Implement smart sync
   - Show offline indicators

---

## 🐛 Troubleshooting

### Common Issues

**Build fails:**

```bash
# Clear cache
expo start -c

# Reinstall dependencies
rm -rf node_modules
npm install
```

**Push notifications not working:**

- Check Expo project ID in `app.json`
- Verify push token registration
- Check notification permissions
- Run push tokens migration

**Biometric auth not working:**

- Check device support
- Verify enrollment (Face ID/Touch ID/Fingerprint)
- Check permissions in app settings

**Offline mode not syncing:**

- Check network connection
- Verify Supabase credentials
- Check pending sync queue
- Clear offline cache and re-sync

**Video player issues:**

- Check video URL format
- Verify network connection
- Check video codec support
- Try different video source

---

## 📱 App Store Submission

### Checklist

#### Assets

- [ ] App icon (1024x1024)
- [ ] Splash screen
- [ ] Screenshots (all required sizes)
- [ ] App preview video (optional)

#### Information

- [ ] App name
- [ ] Description
- [ ] Keywords
- [ ] Support URL
- [ ] Privacy policy URL
- [ ] Age rating
- [ ] Content rating (Android)

#### Technical

- [ ] Build uploaded
- [ ] TestFlight testing (iOS)
- [ ] Internal testing (Android)
- [ ] Beta testing
- [ ] Final review

---

## 🔐 Security

### Best Practices

1. **Credentials:**
   - Never log sensitive data
   - Use Expo SecureStore for credentials
   - Implement biometric auth

2. **API:**
   - Use HTTPS only
   - Validate all inputs
   - Handle errors gracefully

3. **Storage:**
   - Encrypt sensitive data
   - Clear data on logout
   - Implement auto-logout

4. **Permissions:**
   - Request only needed permissions
   - Explain permission usage
   - Handle permission denials

---

## 📈 Analytics

### Recommended Services

1. **Amplitude** - User analytics
2. **Sentry** - Error tracking
3. **Firebase Analytics** - Event tracking
4. **Crashlytics** - Crash reporting

### Key Metrics

- Daily active users (DAU)
- Course completion rate
- Lesson watch time
- Badge earn rate
- Push notification open rate
- Offline usage percentage
- Biometric login adoption

---

## 🤝 Contributing

This is a proprietary project. For access or collaboration:

- **Email:** elevate4humanityedu@gmail.com
- **Phone:** (317) 314-3757

---

## 📄 License

Proprietary - See [../../LICENSE_AGREEMENT.md](../../LICENSE_AGREEMENT.md)

---

## 🆘 Support

### Getting Help

- **Documentation:** [MOBILE_APP_100_PERCENT_COMPLETE.md](../MOBILE_APP_100_PERCENT_COMPLETE.md)
- **Issues:** Create a GitHub issue
- **Email:** elevate4humanityedu@gmail.com
- **Phone:** (317) 314-3757

---

## 🎉 Acknowledgments

Built with:

- [React Native](https://reactnative.dev)
- [Expo](https://expo.dev)
- [Supabase](https://supabase.com)
- [React Navigation](https://reactnavigation.org)

---

**Made with ❤️ by Elevate For Humanity**
