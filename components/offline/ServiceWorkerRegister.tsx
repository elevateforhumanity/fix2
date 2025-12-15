// components/offline/ServiceWorkerRegister.tsx
'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        // Error: $1
    }
  }, []);

  return null;
}
