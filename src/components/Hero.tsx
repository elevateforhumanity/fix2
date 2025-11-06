/**
 * Hero Component
 * Matches elevateforhumanity.org hero section exactly
 * Extracted from: https://www.elevateforhumanity.org
 */

import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  badges?: Array<{
    icon: string;
    text: string;
  }>;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  className?: string;
}

export default function Hero({
  title,
  subtitle,
  badges = [],
  primaryButton,
  secondaryButton,
  className = '',
}: HeroProps) {
  return (
    <section className={`hero ${className}`}>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-6 justify-center mb-8">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded bg-[var(--color-beige)] text-[var(--color-brown)] font-medium"
                >
                  {badge.icon} {badge.text}
                </span>
              ))}
            </div>
          )}

          {(primaryButton || secondaryButton) && (
            <div className="flex flex-wrap gap-6 justify-center">
              {primaryButton && (
                <Link to={primaryButton.href} className="button">
                  {primaryButton.text}
                </Link>
              )}
              {secondaryButton && (
                <Link to={secondaryButton.href} className="button-secondary">
                  {secondaryButton.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
