import { PropsWithChildren, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import ChatAssistant from '../components/ChatAssistant';
import FooterLegal from '../components/FooterLegal';

const APPLICATION_URL = import.meta.env.VITE_APPLICATION_FORM_URL || '/apply';

const navigation = [
  {
    label: 'Programs',
    items: [
      { to: '/programs', label: 'All Programs' },
      { to: '/programs/barber', label: 'Barber Apprenticeship' },
      { to: '/programs/building-tech', label: 'Building Services' },
      { to: '/programs/cna', label: 'CNA' },
      { to: '/programs/cpr-aed-first-aid', label: 'CPR/AED/First Aid' },
      { to: '/programs/business-startup-marketing', label: 'Business Startup' },
      { to: '/programs/tax-office-startup', label: 'Tax Office' },
      { to: '/programs/esthetician-client-services', label: 'Esthetician' },
      { to: '/programs/beauty-career-educator', label: 'Beauty Educator' },
      { to: '/programs/public-safety-reentry', label: 'Public Safety Reentry' },
    ],
  },
  {
    label: 'Learning',
    items: [
      { to: '/lms', label: 'Student Dashboard' },
      { to: '/lms/courses', label: 'Course Catalog' },
      { to: '/certificates', label: 'My Certificates' },
      { to: '/verify', label: 'Verify Certificate' },
      { to: '/student-handbook', label: 'Student Handbook' },
      { to: '/live-classroom', label: 'Live Classes' },
      { to: '/ai-tutor', label: 'AI Tutor' },
    ],
  },
  {
    label: 'Community',
    items: [
      { to: '/community', label: 'Community Hub' },
      { to: '/hub', label: 'Student Hub' },
      { to: '/groups', label: 'Study Groups' },
      { to: '/calendar', label: 'Events Calendar' },
      { to: '/connect', label: 'Connect' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { to: '/about', label: 'About Us' },
      { to: '/partners', label: 'Partners' },
      { to: '/support', label: 'Support Center' },
      { to: '/funding-impact', label: 'Funding & Impact' },
      { to: '/government', label: 'Government Programs' },
      { to: '/philanthropy', label: 'Philanthropy' },
    ],
  },
];

export default function FullSiteLayout({ children }: PropsWithChildren) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-brand-700">
                Elevate for Humanity
              </span>
            </Link>
            {/* Desktop Navigation */}
            <nav
              role="navigation"
              className="hidden lg:flex items-center gap-6"
            >
              {navigation.map((section) => (
                <div
                  key={section.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(section.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-brand-text hover:text-brand-600 transition-colors">
                    {section.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {openDropdown === section.label && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-brand-border rounded-lg shadow-lg py-2">
                      {section.items.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm hover:bg-brand-surface transition-colors ${
                              isActive
                                ? 'text-brand-700 font-medium'
                                : 'text-brand-text'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/auth/login"
                className="text-sm font-medium text-brand-text hover:text-brand-600"
              >
                Sign In
              </Link>
              <a
                href={APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Apply Now
              </a>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-border bg-white">
            <div className="container py-4 space-y-4">
              {navigation.map((section) => (
                <div key={section.label}>
                  <div className="font-semibold text-brand-text mb-2">
                    {section.label}
                  </div>
                  <div className="space-y-1 pl-4">
                    {section.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `block py-1 text-sm ${
                            isActive
                              ? 'text-brand-700 font-medium'
                              : 'text-brand-text-muted'
                          }`
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t space-y-2">
                <Link
                  to="/auth/login"
                  className="block text-sm font-medium text-brand-text"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <a
                  href={APPLICATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn block text-center"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
      <main role="main" className="flex-1">
        {children}
      </main>
      {/* Chat Assistant */}
      <ChatAssistant />
      {/* Footer */}
      <footer className="mt-16 border-t bg-brand-surface-dark">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-brand-text mb-4">
                Elevate for Humanity
              </h3>
              <p className="text-sm text-brand-text-muted">
                Career & Technical training that elevates communities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-brand-text mb-3">Programs</h4>
              <ul className="space-y-2 text-sm text-brand-text-muted">
                <li>
                  <Link to="/programs" className="hover:text-brand-600">
                    All Programs
                  </Link>
                </li>
                <li>
                  <Link to="/programs/barber" className="hover:text-brand-600">
                    Barber Apprenticeship
                  </Link>
                </li>
                <li>
                  <Link to="/programs/cna" className="hover:text-brand-600">
                    CNA Training
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programs/building-tech"
                    className="hover:text-brand-600"
                  >
                    Building Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand-text mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-brand-text-muted">
                <li>
                  <Link to="/about" className="hover:text-brand-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/partners" className="hover:text-brand-600">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-brand-600">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/verify" className="hover:text-brand-600">
                    Verify Certificate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand-text mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-brand-text-muted">
                <li>
                  <a href="tel:+13173143757" className="hover:text-brand-600">
                    📞 (317) 314-3757
                  </a>
                </li>
                <li>
                  <Link to="/connect" className="hover:text-brand-600">
                    ✉️ Contact Form
                  </Link>
                </li>
                <li>
                  <span>📍 Indianapolis, IN</span>
                </li>
                <li>
                  <span className="text-xs">elevateforhumanity.org</span>
                </li>
                <li className="pt-2">
                  <Link to="/privacy-policy" className="hover:text-brand-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="hover:text-brand-600">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Social Media Links */}
          <div className="mt-8 pt-8 border-t border-brand-border">
            <div className="flex justify-center gap-6 mb-4">
              <a
                href="https://www.facebook.com/elevate.founder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text-muted hover:text-brand-600 transition-colors"
                aria-label="Facebook Personal Profile"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text-muted hover:text-brand-600 transition-colors"
                aria-label="Facebook Page"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text-muted hover:text-brand-600 transition-colors"
                aria-label="YouTube Channel"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text-muted hover:text-brand-600 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text-muted hover:text-brand-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <div className="text-center text-sm text-brand-text-muted">
              © {new Date().getFullYear()} Elevate for Humanity. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
      <FooterLegal />
    </div>
  );
}
