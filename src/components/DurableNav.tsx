import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mainNavigation, ctaButton, branding } from '../config/navigation';
import '../styles/design-system-v2.css';

export default function DurableNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <div className="logo-text">{branding.name}</div>
            <div
              className="logo-subtitle"
              style={{ fontSize: '0.875rem', opacity: 0.8 }}
            >
              {branding.subtitle}
            </div>
          </Link>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '2px',
                background: 'var(--color-brown)',
                marginBottom: '5px',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                background: 'var(--color-brown)',
                marginBottom: '5px',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                background: 'var(--color-brown)',
              }}
            />
          </button>
          <ul className="nav-menu">
            {mainNavigation.filter(link => !link.items).map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link
                to={ctaButton.to}
                className="button"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                {ctaButton.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
