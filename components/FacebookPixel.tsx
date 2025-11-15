'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
  }
}

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  useEffect(() => {
    if (!pixelId) return;

    // Initialize Facebook Pixel
    if (!window.fbq) {
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      );

      window.fbq!('init', pixelId);
    }

    // Track page view
    window.fbq!('track', 'PageView');
  }, [pathname, searchParams, pixelId]);

  if (!pixelId) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}

// Helper functions for tracking events
export const trackFacebookEvent = (
  eventName: string,
  data?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
};

// Predefined events
export const trackCourseView = (courseId: string, courseName: string) => {
  trackFacebookEvent('ViewContent', {
    content_name: courseName,
    content_category: 'Course',
    content_ids: [courseId],
    content_type: 'product',
  });
};

export const trackEnrollment = (
  courseId: string,
  courseName: string,
  value?: number
) => {
  trackFacebookEvent('InitiateCheckout', {
    content_name: courseName,
    content_category: 'Course',
    content_ids: [courseId],
    value: value || 0,
    currency: 'USD',
  });
};

export const trackCourseCompletion = (courseId: string, courseName: string) => {
  trackFacebookEvent('Purchase', {
    content_name: courseName,
    content_category: 'Course',
    content_ids: [courseId],
    value: 0,
    currency: 'USD',
  });
};

export const trackSignup = (method: string = 'email') => {
  trackFacebookEvent('CompleteRegistration', {
    content_name: 'User Signup',
    status: 'completed',
    method,
  });
};

export const trackSearch = (searchQuery: string) => {
  trackFacebookEvent('Search', {
    search_string: searchQuery,
  });
};
