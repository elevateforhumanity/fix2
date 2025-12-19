'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Mount on client only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Critical: server render and first client render both return null
  if (!mounted || !GA_MEASUREMENT_ID) {
    return null;
  }

  // Track page views on route change (only after mounted)
  useEffect(() => {
    if (!mounted || !GA_MEASUREMENT_ID) return;

    // Track page view
    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [mounted, pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}
