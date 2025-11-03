import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/durable-design.css';

export default function DurableFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="flex flex-wrap gap-8" style={{ marginBottom: '3rem' }}>
          {/* Column 1 - About */}
          <div style={{ flex: '1 1 250px' }}>
            <h3
              style={{
                fontSize: '1.25rem',
                marginBottom: '1rem',
                color: 'white',
              }}
            >
              Elevate for Humanity
            </h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Career & Technical Institute
            </p>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              Empowering futures through workforce training and apprenticeship
              programs in Marion County, Indiana.
            </p>
          </div>
          {/* Column 2 - Programs */}
          <div style={{ flex: '1 1 200px' }}>
            <h4
              style={{ fontSize: '1rem', marginBottom: '1rem', color: 'white' }}
            >
              Programs
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/programs/barber">Barber Apprenticeship</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/programs/building-tech">Building Services</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/programs/hvac">HVAC & Welding</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/programs/healthcare">Healthcare CNA/QMA</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/programs">View All Programs</Link>
              </li>
            </ul>
          </div>
          {/* Column 3 - Quick Links */}
          <div style={{ flex: '1 1 200px' }}>
            <h4
              style={{ fontSize: '1rem', marginBottom: '1rem', color: 'white' }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/about">About Us</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/partners">Partners & Employers</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/lms">Student Portal</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/apply">Apply Now</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          {/* Column 4 - Contact */}
          <div style={{ flex: '1 1 200px' }}>
            <h4
              style={{ fontSize: '1rem', marginBottom: '1rem', color: 'white' }}
            >
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>📍 Marion County, IN</li>
              <li style={{ marginBottom: '0.5rem' }}>
                📧 elevateforhumanity@gmail.com
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                🌐{' '}
                <a
                  href="https://www.indianacareerconnect.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Indiana Career Connect
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer Bottom */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            © 2025 Elevate for Humanity Career and Technical Institute. All
            rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            <Link to="/legal/privacy">Privacy Policy</Link>
            <Link to="/legal/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
