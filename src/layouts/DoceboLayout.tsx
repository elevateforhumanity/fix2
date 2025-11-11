import { PropsWithChildren, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  { to: '/', label: 'Home' },
  {
    label: 'Programs',
    items: [
      { to: '/programs', label: 'All Programs' },
      { to: '/programs/barber', label: 'Barber Apprenticeship' },
      { to: '/programs/building-tech', label: 'Building Services' },
      { to: '/programs/cna', label: 'CNA Training' },
      { to: '/programs/hvac', label: 'HVAC & Welding' },
    ],
  },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/student-portal', label: 'Student Portal' },
];

export default function DoceboLayout({ children }: PropsWithChildren) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header - Docebo Style */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: '100%',
          background: 'white',
          borderBottom: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '72px',
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '20px',
                }}
              >
                E
              </div>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                Elevate for Humanity
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="desktop-nav"
              style={{
                gap: 'var(--space-1)',
              }}
            >
              {navigation.map((item) =>
                'items' in item ? (
                  <div
                    key={item.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="nav-link"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: 'var(--space-2)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {item.label}
                      <ChevronDown size={16} />
                    </button>
                    {openDropdown === item.label && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          marginTop: 'var(--space-1)',
                          minWidth: '220px',
                          background: 'white',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-lg)',
                          padding: 'var(--space-1)',
                        }}
                      >
                        {item.items.map((subItem) => (
                          <NavLink
                            key={subItem.to}
                            to={subItem.to}
                            style={{
                              display: 'block',
                              padding: 'var(--space-2)',
                              fontSize: '14px',
                              color: 'var(--text-primary)',
                              textDecoration: 'none',
                              borderRadius: 'var(--radius-sm)',
                            }}
                            className="dropdown-link"
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="nav-link"
                    style={{
                      padding: 'var(--space-2)',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* CTA Buttons */}
            <div
              className="desktop-nav"
              style={{
                gap: 'var(--space-2)',
                alignItems: 'center',
              }}
            >
              <Link to="/login" className="btn-ghost btn-sm">
                Sign In
              </Link>
              <Link to="/apply" className="btn-primary btn-sm">
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-2)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              borderTop: '1px solid var(--border-light)',
              background: 'white',
              padding: 'var(--space-3)',
            }}
            className="mobile-menu"
          >
            {navigation.map((item) =>
              'items' in item ? (
                <div key={item.label} style={{ marginBottom: 'var(--space-2)' }}>
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: 'var(--space-1)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ paddingLeft: 'var(--space-2)' }}>
                    {item.items.map((subItem) => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: 'var(--space-1) 0',
                          fontSize: '14px',
                          color: 'var(--text-secondary)',
                          textDecoration: 'none',
                        }}
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: 'var(--space-2) 0',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </NavLink>
              )
            )}
            <div
              style={{
                marginTop: 'var(--space-3)',
                paddingTop: 'var(--space-3)',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              <Link to="/login" className="btn-outline btn-sm">
                Sign In
              </Link>
              <Link to="/apply" className="btn-primary btn-sm">
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Footer - Docebo Style */}
      <footer
        style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-light)',
          marginTop: 'var(--space-10)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-6)',
              padding: 'var(--space-8) 0',
            }}
          >
            {/* Company Info */}
            <div>
              <h3 style={{ marginBottom: 'var(--space-2)' }}>
                Elevate for Humanity
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Career & Technical training that elevates communities.
              </p>
            </div>

            {/* Programs */}
            <div>
              <h4 style={{ marginBottom: 'var(--space-2)', fontSize: '16px' }}>
                Programs
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 'var(--space-1)' }}>
                  <Link
                    to="/programs/barber"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Barber Apprenticeship
                  </Link>
                </li>
                <li style={{ marginBottom: 'var(--space-1)' }}>
                  <Link
                    to="/programs/building-tech"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Building Services
                  </Link>
                </li>
                <li style={{ marginBottom: 'var(--space-1)' }}>
                  <Link
                    to="/programs/cna"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    CNA Training
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 style={{ marginBottom: 'var(--space-2)', fontSize: '16px' }}>
                Resources
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 'var(--space-1)' }}>
                  <Link
                    to="/about"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    About Us
                  </Link>
                </li>
                <li style={{ marginBottom: 'var(--space-1)' }}>
                  <Link
                    to="/contact"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Contact
                  </Link>
                </li>
                <li style={{ marginBottom: 'var(--space-1)' }}>
                  <Link
                    to="/support"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ marginBottom: 'var(--space-2)', fontSize: '16px' }}>
                Contact
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li
                  style={{
                    marginBottom: 'var(--space-1)',
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                  }}
                >
                  📞 (317) 314-3757
                </li>
                <li
                  style={{
                    marginBottom: 'var(--space-1)',
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                  }}
                >
                  📍 Indianapolis, IN
                </li>
                <li
                  style={{
                    marginBottom: 'var(--space-1)',
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                  }}
                >
                  elevateforhumanity.org
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              borderTop: '1px solid var(--border-light)',
              padding: 'var(--space-4) 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
            }}
          >
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              © {new Date().getFullYear()} Elevate for Humanity. All rights
              reserved.
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Link
                to="/privacy-policy"
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
              >
                Privacy
              </Link>
              <Link
                to="/terms-of-service"
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
        }
        
        .nav-link:hover {
          color: var(--color-primary);
        }
        
        .dropdown-link:hover {
          background: var(--bg-secondary);
        }
      `}</style>
    </div>
  );
}
