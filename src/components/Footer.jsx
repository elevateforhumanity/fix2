import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Elevate for Humanity</h3>
          <p>Empowering communities through technology and innovation</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/accessibility">Accessibility</Link>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.youtube.com/@elevateforhumanity"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>✊🏿</span>
            <span>Buy Black Certified</span>
          </div>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Elevate for Humanity. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
