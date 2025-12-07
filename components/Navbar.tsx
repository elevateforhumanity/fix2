'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link 
          href="/" 
          className={`text-2xl font-bold transition-colors ${
            scrolled ? 'text-slate-900' : 'text-white'
          }`}
        >
          Elevate
        </Link>
        
        <div className="flex gap-6">
          <Link 
            href="/programs" 
            className={`font-semibold transition-colors ${
              scrolled ? 'text-slate-900 hover:text-orange-600' : 'text-white hover:text-orange-400'
            }`}
          >
            Programs
          </Link>
          <Link 
            href="/apply" 
            className={`font-semibold transition-colors ${
              scrolled ? 'text-slate-900 hover:text-orange-600' : 'text-white hover:text-orange-400'
            }`}
          >
            Apply
          </Link>
          <Link 
            href="/contact" 
            className={`font-semibold transition-colors ${
              scrolled ? 'text-slate-900 hover:text-orange-600' : 'text-white hover:text-orange-400'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
