import React from 'react';
import Link from 'next/link';

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
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <a
            href="https://www.facebook.com/elevateforhumanity"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com/company/elevate-for-humanity"
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
        <p>
          &copy; {new Date().getFullYear()} Elevate for Humanity. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
