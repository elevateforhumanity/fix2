import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/sitemap-page",
  },
  title: 'Sitemap | Elevate For Humanity',
  description: 'Complete sitemap of all pages on Elevate For Humanity website.',
};

const sitemapSections = [
  {
    title: 'Main Pages',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About Us' },
      { href: '/programs', label: 'Programs' },
      { href: '/courses', label: 'Courses' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/apply', label: 'Talk to an Advisor' },
    ]
  },
  {
    title: 'Funding Options',
    links: [
      { href: '/funding', label: 'Funding Overview' },
      { href: '/funding/wioa', label: 'WIOA Funding' },
      { href: '/funding/wrg', label: 'Workforce Ready Grant' },
      { href: '/pay', label: 'Payment Options' },
    ]
  },
  {
    title: 'Programs',
    links: [
      { href: '/programs/barber-apprenticeship', label: 'Barber Apprenticeship' },
      { href: '/programs/cna', label: 'CNA Training' },
      { href: '/programs/direct-support-professional', label: 'Direct Support Professional (DSP)' },
      { href: '/programs/hvac-technician', label: 'HVAC Technician' },
      { href: '/programs/cdl', label: 'CDL Training' },
      { href: '/programs/tax-preparation', label: 'Tax Preparation' },
      { href: '/programs/business-startup', label: 'Business Startup' },
    ]
  },
  {
    title: 'Student Resources',
    links: [
      { href: '/login', label: 'Student Login' },
      { href: '/signup', label: 'Create Account' },
      { href: '/student/dashboard', label: 'Student Dashboard' },
      { href: '/lms', label: 'Learning Management System' },
    ]
  },
  {
    title: 'Staff & Admin',
    links: [
      { href: '/staff-portal', label: 'Staff Portal' },
      { href: '/admin', label: 'Admin Dashboard' },
      { href: '/workforce-board', label: 'Workforce Board' },
    ]
  },
  {
    title: 'Information',
    links: [
      { href: '/faq', label: 'FAQ' },
      { href: '/blog', label: 'Blog' },
      { href: '/team', label: 'Our Team' },
      { href: '/accreditation', label: 'Accreditation' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/dmca', label: 'DMCA Policy' },
      { href: '/accessibility', label: 'Accessibility' },
    ]
  }
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Sitemap
          </h1>
          <p className="text-xl text-slate-600">
            Complete directory of all pages on our website
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapSections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Contact us and we'll help you find the information you need.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition text-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
