import DeviceCompatibility from '@/components/DeviceCompatibility';

export const metadata = {
  title: 'PWA Test | Elevate LMS',
  description: 'Test PWA installation and features',
};

export default function PWATestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            PWA Installation Test
          </h1>
          <p className="text-gray-600 mb-6">
            This page helps you test the Progressive Web App installation and
            features.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                Installation Instructions
              </h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p>
                  <strong>iOS (Safari):</strong>
                </p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Tap the Share button (square with arrow)</li>
                  <li>Scroll down and tap "Add to Home Screen"</li>
                  <li>Tap "Add" in the top right</li>
                  <li>Launch the app from your home screen</li>
                </ol>

                <p className="mt-3">
                  <strong>Android (Chrome):</strong>
                </p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Tap the menu button (three dots)</li>
                  <li>Tap "Install app" or "Add to Home Screen"</li>
                  <li>Tap "Install" in the dialog</li>
                  <li>Launch the app from your app drawer</li>
                </ol>

                <p className="mt-3">
                  <strong>Desktop (Chrome/Edge):</strong>
                </p>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Look for the install icon in the address bar</li>
                  <li>Click "Install" in the prompt</li>
                  <li>The app will open in a standalone window</li>
                </ol>
              </div>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                Features to Test
              </h3>
              <ul className="text-sm text-green-800 space-y-1 list-disc ml-5">
                <li>App installs and opens in standalone mode</li>
                <li>App icon displays correctly on home screen</li>
                <li>Splash screen shows on launch</li>
                <li>Bottom navigation works</li>
                <li>Offline mode (enable airplane mode)</li>
                <li>Push notifications (grant permission)</li>
                <li>App shortcuts (long-press icon on Android)</li>
                <li>Share target (share content to the app)</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">
                Quick Tests
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if ('serviceWorker' in navigator) {
                      navigator.serviceWorker.ready.then(() => {
                        alert('✅ Service Worker is active!');
                      });
                    } else {
                      alert('❌ Service Worker not supported');
                    }
                  }}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 active:scale-98 transition-all"
                >
                  Test Service Worker
                </button>

                <button
                  onClick={() => {
                    if ('Notification' in window) {
                      Notification.requestPermission().then((permission) => {
                        if (permission === 'granted') {
                          new Notification('Test Notification', {
                            body: 'PWA notifications are working!',
                            icon: '/icon-192.png',
                          });
                        }
                      });
                    } else {
                      alert('❌ Notifications not supported');
                    }
                  }}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 active:scale-98 transition-all"
                >
                  Test Notifications
                </button>

                <button
                  onClick={() => {
                    if ('share' in navigator) {
                      navigator.share({
                        title: 'Elevate LMS',
                        text: 'Check out this learning platform!',
                        url: window.location.origin,
                      });
                    } else {
                      alert('❌ Web Share API not supported');
                    }
                  }}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 active:scale-98 transition-all"
                >
                  Test Web Share
                </button>

                <button
                  onClick={async () => {
                    if (
                      'storage' in navigator &&
                      'estimate' in navigator.storage
                    ) {
                      const estimate = await navigator.storage.estimate();
                      const used = (estimate.usage || 0) / 1024 / 1024;
                      const quota = (estimate.quota || 0) / 1024 / 1024;
                      alert(
                        `Storage:\n` +
                          `Used: ${used.toFixed(2)} MB\n` +
                          `Quota: ${quota.toFixed(2)} MB\n` +
                          `Available: ${(quota - used).toFixed(2)} MB`
                      );
                    } else {
                      alert('❌ Storage API not supported');
                    }
                  }}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 active:scale-98 transition-all"
                >
                  Check Storage
                </button>
              </div>
            </div>
          </div>
        </div>

        <DeviceCompatibility />
      </div>
    </div>
  );
}
