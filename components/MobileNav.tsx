'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, BookOpen, Users, Award, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'My Courses', href: '/lms/courses' },
    { icon: Users, label: 'Study Groups', href: '/study-groups' },
    { icon: Award, label: 'Achievements', href: '/achievements' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all ${
          scrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg" />
            <span className="font-bold text-lg">Elevate</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-6 bg-gradient-to-br from-red-600 to-orange-500 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User size={32} />
              </div>
              <div>
                <div className="font-semibold text-lg">John Doe</div>
                <div className="text-sm text-white/80">Student</div>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div>
                <div className="font-semibold">Level 5</div>
                <div className="text-white/80">1,250 pts</div>
              </div>
              <div>
                <div className="font-semibold">3 Courses</div>
                <div className="text-white/80">In Progress</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition"
                >
                  <Icon size={20} className="text-gray-600" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 text-red-600 border-red-600 hover:bg-red-50"
            >
              <LogOut size={20} />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="lg:hidden h-16" />
    </>
  );
}
