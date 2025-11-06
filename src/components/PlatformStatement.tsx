/**
 * Platform Statement Component
 * Proprietary platform description for Elevate for Humanity
 */

import React from 'react';

interface PlatformStatementProps {
  variant?: 'full' | 'short' | 'footer';
  className?: string;
}

export default function PlatformStatement({
  variant = 'full',
  className = '',
}: PlatformStatementProps) {
  if (variant === 'short') {
    return (
      <div className={`text-sm text-gray-600 ${className}`}>
        Proprietary Next.js platform with SSR, Supabase, and Cloudflare
        CDN—built for speed, security, and compliance.
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`text-xs text-gray-500 ${className}`}>
        <p>
          Proprietary Next.js platform with Supabase, Netlify, and Cloudflare
          CDN. Server-side rendering, role-based access, and secure data
          workflows power Elevate for Humanity's education, workforce, and
          healthcare programs.
        </p>
      </div>
    );
  }

  // Full variant
  return (
    <section className={`efh-tech-statement ${className}`}>
      <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
        Our Platform
      </h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          Elevate for Humanity operates on a{' '}
          <strong>proprietary enterprise platform</strong> built on a customized{' '}
          <strong>Next.js</strong> architecture with <strong>Supabase</strong>,{' '}
          <strong>Netlify</strong>, and <strong>Cloudflare CDN</strong>. Our
          system uses <strong>server-side rendering</strong>, dynamic data
          routing, and <strong>role-based access controls</strong> to deliver
          fast, secure, and compliant experiences across education, workforce,
          and healthcare programs.
        </p>
        <p>
          Because our source code, workflows, and APIs are proprietary, the
          platform cannot be replicated or hosted elsewhere without
          authorization. This protects our intellectual property while ensuring
          top-tier performance, security, and compliance.
        </p>
      </div>
    </section>
  );
}

// Export variants for convenience
export const PlatformStatementShort = () => (
  <PlatformStatement variant="short" />
);
export const PlatformStatementFooter = () => (
  <PlatformStatement variant="footer" />
);
