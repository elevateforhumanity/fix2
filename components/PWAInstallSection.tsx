'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PWAInstallSection() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert('To install: \n\n• On iOS: Tap Share button, then "Add to Home Screen"\n• On Android: Tap menu (⋮) then "Install app" or "Add to Home screen"');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowButton(false);
    }
  };

  return (
    <section className="py-12   ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700 mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              Progressive Web App
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Download the App
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              Access Elevate for Humanity directly from your home screen. No app store needed - 
              works on any device with offline access and push notifications.
            </p>
            
            <button
              onClick={handleInstall}
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-orange-600 px-8 py-4 text-white font-bold text-lg hover:bg-orange-700 transition-all shadow-lg"
            >
              📱 Download the App
            </button>

            <p className="mt-6 text-sm text-slate-600">
              ✓ Works offline - access courses anywhere<br/>
              ✓ Fast and lightweight - no app store required<br/>
              ✓ Push notifications for assignments and updates<br/>
              ✓ Automatic updates - always the latest version
            </p>
          </div>

          <div className="relative aspect-square max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <Image
              src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__8/image-96fb9850-11b3-4a4b-b272-f2318aa47c8b.png?Expires=2080931577&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=wxuR4n47Ur6YnSL5Uzd8kTRC7t1mXA6YCvDzHziBqwsENTQIGBkXkLcMcp2~QBXUaZgmxrS~a1II8ygKorH5O6IRf-IAXg8bRGFN8qKCG-YI7ucStQDIdoOgkBGb4GbK4qYFgSMsXiF6rtWHli3fun~73aehkCIirR49Y-zQKmI7lIV6qoNz1f61vk~YblxBF8pQWJhbdqTIl9sQTEgLHEN7fnzCkA3-yc0fydrTlV~k7oVfQfoMiQN6KZ4VvnVLxYouzwHjoMeqa8O91H4wrcAWh26RdR4mq4DwWXksKEwqrsnZMIKnFUQDfC6MVaYw6gtdaQBdaiyHd9TVMMHMkQ__"
              alt="Elevate for Humanity App"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
