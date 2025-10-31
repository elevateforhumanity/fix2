import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function AppLayout({ title, children }) {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | App` : 'App'}</title>
        <meta
          name="description"
          content="Workforce readiness and learning platform."
        />
      </Helmet>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header style={{ padding: '12px 24px', background: '#0f172a' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <nav
            role="navigation"
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <NavLink style={linkStyle} to="/">
              Home
            </NavLink>
            <NavLink style={linkStyle} to="/courses">
              Courses
            </NavLink>
            <NavLink style={linkStyle} to="/account">
              Account
            </NavLink>
            <NavLink style={linkStyle} to="/support">
              Support
            </NavLink>
            <NavLink style={linkStyle} to="/partners">
              Partners
            </NavLink>
          </nav>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              background: 'linear-gradient(to right, #059669, #10b981)',
              color: 'white',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            <span>Buy Black Certified</span>
          </div>
        </div>
      </header>
      <main role="main" id="main-content">
        {children}
      </main>
      <footer
        style={{
          padding: 24,
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--brand-text-muted)',
          borderTop: '1px solid var(--brand-border)',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <NavLink style={footerLinkStyle} to="/privacy-policy">
            Privacy Policy
          </NavLink>
          {' | '}
          <NavLink style={footerLinkStyle} to="/terms-of-service">
            Terms of Service
          </NavLink>
          {' | '}
          <NavLink style={footerLinkStyle} to="/refund-policy">
            Refund Policy
          </NavLink>
          {' | '}
          <NavLink style={footerLinkStyle} to="/support">
            Support
          </NavLink>
        </div>
        <div>
          © {new Date().getFullYear()} Elevate for Humanity. All rights
          reserved.
        </div>
      </footer>
    </>
  );
}

const linkStyle = ({ isActive }) => ({
  color: isActive ? '#38bdf8' : 'var(--brand-border)',
  textDecoration: 'none',
  fontWeight: 500,
});

const footerLinkStyle = {
  color: 'var(--brand-text-muted)',
  textDecoration: 'none',
  fontSize: 12,
};

AppLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
