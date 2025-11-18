import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.elevateforhumanity.lms',
  appName: 'Elevate LMS',
  webDir: 'out', // or ".next" if using SSR export strategy
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      spinnerColor: '#f97316',
      backgroundColor: '#ffffff',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
};

export default config;
