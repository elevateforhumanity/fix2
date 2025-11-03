import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/durable-design.css';

export default function DurableNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <div className="logo-text">Elevate for Humanity</div>
            <div className="logo-subtitle" style={{fontSize: '0.875rem', opacity: 0.8}}>
              Career & Technical Institute
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
              padding: '0.5rem'
            }}
          >
            <div style={{width: '24px', height: '2px', background: 'var(--color-brown)', marginBottom: '5px'}}></div>
            <div style={{width: '24px', height: '2px', background: 'var(--color-brown)', marginBottom: '5px'}}></div>
            <div style={{width: '24px', height: '2px', background: 'var(--color-brown)'}}></div>
          </button>

          <ul className="nav-menu">
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/lms">LMS</Link></li>
            <li><Link to="/partners">Partners</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/apply" className="button" style={{padding: '0.75rem 1.5rem'}}>Apply Now</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
