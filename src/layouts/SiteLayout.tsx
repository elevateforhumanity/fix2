import { PropsWithChildren, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import ChatAssistant from '../components/ChatAssistant';

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
            <nav className="hidden lg:flex items-center gap-6">
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
      <main className="flex-1">{children}</main>
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
              <h4 className="font-semibold text-brand-text mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-brand-text-muted">
                <li>
                  <Link to="/privacy-policy" className="hover:text-brand-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="hover:text-brand-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="hover:text-brand-600">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="/accessibility" className="hover:text-brand-600">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-brand-border text-center text-sm text-brand-text-muted">
            © {new Date().getFullYear()} Elevate for Humanity. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
