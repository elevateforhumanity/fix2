import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="header-logo">
          <h1>Elevate for Humanity</h1>
        </Link>
        <nav className="header-nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
