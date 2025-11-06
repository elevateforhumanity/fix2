/**
 * Section Component
 * Matches elevateforhumanity.org section layout exactly
 * Extracted from: https://www.elevateforhumanity.org
 */

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  titleAlign?: 'left' | 'center' | 'right';
  background?: 'white' | 'green' | 'brown' | 'beige' | 'gray';
  className?: string;
}

export default function Section({
  children,
  title,
  subtitle,
  titleAlign = 'left',
  background = 'white',
  className = '',
}: SectionProps) {
  // Background color classes
  const bgClasses = {
    white: 'bg-white',
    green: 'bg-[var(--color-green)]',
    brown: 'bg-[var(--color-brown)] text-white',
    beige: 'bg-[var(--color-beige)]',
    gray: 'bg-gray-50',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <section className={`section ${bgClasses[background]} ${className}`}>
      <div className="container">
        {(title || subtitle) && (
          <div className={`mb-12 ${alignClasses[titleAlign]}`}>
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
