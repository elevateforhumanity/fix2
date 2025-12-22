'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  User,
  BookOpen,
  Briefcase,
  Users,
  Info,
} from 'lucide-react';
import Image from 'next/image';

// Navigation structure with proper categorization
const navigation = {
  programs: {
    label: 'Programs',
    icon: BookOpen,
    featured: [
      {
        name: 'Healthcare Careers',
        href: '/programs?category=healthcare',
        description: 'CNA, Medical Assistant, Home Health Aide',
        icon: '🏥',
      },
      {
        name: 'Skilled Trades',
        href: '/programs?category=trades',
        description: 'HVAC, CDL, Building Maintenance',
        icon: '🔧',
      },
      {
        name: 'Beauty & Wellness',
        href: '/programs?category=beauty',
        description: 'Barber, Esthetician, Beauty Educator',
        icon: '💇',
      },
      {
        name: 'Business & Finance',
        href: '/programs?category=business',
        description: 'Tax Prep, Business Startup',
        icon: '💼',
      },
    ],
    links: [
      { name: 'Browse All Programs', href: '/programs' },
      { name: 'Compare Programs', href: '/compare-programs' },
      { name: 'Program Finder', href: '/program-finder' },
      { name: 'Career Pathways', href: '/pathways' },
      { name: 'How It Works', href: '/how-it-works' },
    ],
    cta: {
      title: 'Ready to Start?',
      description: '100% funded training. No debt.',
      button: 'Apply Now',
      href: '/apply',
    },
  },
  resources: {
    label: 'Resources',
    icon: BookOpen,
    sections: [
      {
        title: 'Student Support',
        links: [
          { name: 'Career Services', href: '/career-services', icon: '💼' },
          { name: 'Financial Aid & Funding', href: '/funding', icon: '💰' },
          { name: 'Student Handbook', href: '/student-handbook', icon: '📖' },
          { name: 'FAQs & Support', href: '/faq', icon: '❓' },
          { name: 'AI Tutor', href: '/ai-tutor', icon: '🤖' },
        ],
      },
      {
        title: 'Community',
        links: [
          { name: 'Success Stories', href: '/success-stories', icon: '⭐' },
          { name: 'Alumni Network', href: '/alumni', icon: '🎓' },
          { name: 'Blog & News', href: '/blog', icon: '📰' },
          { name: 'Events & Webinars', href: '/events', icon: '📅' },
          { name: 'Community Forums', href: '/forums', icon: '💬' },
        ],
      },
      {
        title: 'Tools & Downloads',
        links: [
          { name: 'Workbooks & Materials', href: '/workbooks', icon: '📚' },
          { name: 'Downloads', href: '/downloads', icon: '⬇️' },
          { name: 'Mobile App', href: '/mobile-app', icon: '📱' },
          { name: 'Video Library', href: '/videos', icon: '🎥' },
        ],
      },
    ],
  },
  partners: {
    label: 'Partners',
    icon: Users,
    sections: [
      {
        title: 'For Employers',
        links: [
          { name: 'Hire Our Graduates', href: '/hire-graduates', icon: '👔' },
          { name: 'Employer Portal', href: '/employer', icon: '🏢' },
          { name: 'Apprenticeships', href: '/apprenticeships', icon: '🎯' },
          { name: 'OJT & Funding', href: '/ojt-and-funding', icon: '💵' },
        ],
      },
      {
        title: 'For Training Providers',
        links: [
          { name: 'Partner Portal', href: '/partner', icon: '🤝' },
          { name: 'Partner With Us', href: '/partner-with-us', icon: '✨' },
          {
            name: 'Training Providers',
            href: '/training-providers',
            icon: '🏫',
          },
          { name: 'Program Holders', href: '/program-holder', icon: '📋' },
        ],
      },
      {
        title: 'For Workforce Boards',
        links: [
          {
            name: 'Workforce Partners',
            href: '/workforce-partners',
            icon: '🏛️',
          },
          { name: 'Workforce Board', href: '/workforce-board', icon: '📊' },
          { name: 'Government Partners', href: '/government', icon: '🏛️' },
          { name: 'Grants & Funding', href: '/grants', icon: '💰' },
        ],
      },
    ],
  },
  about: {
    label: 'About',
    icon: Info,
    links: [
      { name: 'Our Mission', href: '/about', icon: '🎯' },
      { name: 'Our Team', href: '/team', icon: '👥' },
      { name: 'Founder Story', href: '/founder', icon: '✨' },
      { name: 'Annual Report', href: '/annual-report', icon: '📊' },
      { name: 'Transparency', href: '/transparency', icon: '🔍' },
      { name: 'Contact Us', href: '/contact', icon: '📧' },
      { name: 'Careers', href: '/careers', icon: '💼' },
    ],
  },
};

export function ModernNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo.png"
                alt="Elevate for Humanity"
                fill
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="hidden md:block">
              <div className="font-black text-xl text-slate-900">Elevate</div>
              <div className="text-xs text-slate-600 -mt-1">For Humanity</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Programs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('programs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-red-600 font-semibold transition-colors">
                Programs
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeDropdown === 'programs' && (
                <div className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Featured Programs */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                        Program Categories
                      </h3>
                      <div className="space-y-2">
                        {navigation.programs.featured.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                                {item.name}
                              </div>
                              <div className="text-sm text-slate-600">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                        Quick Links
                      </h3>
                      <div className="space-y-1 mb-6">
                        {navigation.programs.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block px-3 py-2 text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="bg-white rounded-xl p-6 border border-red-100">
                        <h4 className="font-bold text-slate-900 mb-1">
                          {navigation.programs.cta.title}
                        </h4>
                        <p className="text-sm text-slate-600 mb-4">
                          {navigation.programs.cta.description}
                        </p>
                        <Link
                          href={navigation.programs.cta.href}
                          className="inline-flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          {navigation.programs.cta.button}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-red-600 font-semibold transition-colors">
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-[700px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-3 gap-6">
                    {navigation.resources.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="flex items-center gap-2 px-2 py-2 text-sm text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                              <span>{link.icon}</span>
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Partners Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('partners')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-red-600 font-semibold transition-colors">
                Partners
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeDropdown === 'partners' && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-3 gap-6">
                    {navigation.partners.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="flex items-center gap-2 px-2 py-2 text-sm text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                              <span>{link.icon}</span>
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-slate-700 hover:text-red-600 font-semibold transition-colors">
                About
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-1">
                    {navigation.about.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <span>{link.icon}</span>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="hidden lg:flex items-center justify-center w-10 h-10 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Login */}
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-red-600 font-semibold transition-colors"
            >
              <User className="w-4 h-4" />
              Login
            </Link>

            {/* Apply CTA */}
            <Link
              href="/apply"
              className="hidden lg:inline-flex items-center justify-center bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all hover:scale-105 shadow-sm"
            >
              Apply Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            {/* Mobile Programs */}
            <div>
              <div className="font-bold text-slate-900 mb-3">Programs</div>
              {navigation.programs.featured.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 py-3 border-b border-slate-100"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-slate-600">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Resources */}
            <div>
              <div className="font-bold text-slate-900 mb-3">Resources</div>
              {navigation.resources.sections.map((section) => (
                <div key={section.title} className="mb-4">
                  <div className="text-sm font-semibold text-slate-600 mb-2">
                    {section.title}
                  </div>
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 py-2 text-slate-700"
                    >
                      <span>{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <Link
                href="/apply"
                className="block w-full bg-red-600 hover:bg-red-700 text-white text-center px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Apply Now
              </Link>
              <Link
                href="/login"
                className="block w-full border-2 border-slate-300 text-slate-700 text-center px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
