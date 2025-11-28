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
    <section className="py-12 bg-gradient-to-br from-orange-50 to-white">
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
              Install Our Web App
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              Access Elevate for Humanity directly from your home screen. No app store needed - 
              works on any device with offline access and push notifications.
            </p>
            
            <button
              onClick={handleInstall}
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-white font-semibold hover:bg-orange-600 transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add to Home Screen
            </button>

            <p className="mt-6 text-sm text-slate-600">
              ✓ Works offline - access courses anywhere<br/>
              ✓ Fast and lightweight - no app store required<br/>
              ✓ Push notifications for assignments and updates<br/>
              ✓ Automatic updates - always the latest version
            </p>
          </div>

          <div className="relative aspect-square max-w-sm mx-auto bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center">
            <Image
              src="/assets/logo-efh.svg"
              alt="Elevate for Humanity Logo"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
