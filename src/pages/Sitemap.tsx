import { Link } from 'react-router-dom';

export default function Sitemap() {
  const sections = [
    {
      title: 'Main Pages',
      links: [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
        { to: '/support', label: 'Support' },
        { to: '/partners', label: 'Partners' },
      ],
    },
    {
      title: 'Programs',
      links: [
        { to: '/programs', label: 'All Programs' },
        { to: '/programs/barber', label: 'Barber Apprenticeship' },
        {
          to: '/programs/building-tech',
          label: 'Building Services Technician',
        },
        { to: '/programs/cna', label: 'Certified Nursing Assistant' },
        { to: '/programs/cpr-aed-first-aid', label: 'CPR, AED & First Aid' },
        {
          to: '/programs/business-startup-marketing',
          label: 'Business Start-Up',
        },
        { to: '/programs/tax-office-startup', label: 'Tax Office Startup' },
        { to: '/programs/esthetician-client-services', label: 'Esthetician' },
        { to: '/programs/beauty-career-educator', label: 'Beauty Educator' },
        {
          to: '/programs/public-safety-reentry',
          label: 'Public Safety Reentry',
        },
      ],
    },
    {
      title: 'Learning',
      links: [
        { to: '/lms', label: 'Student Dashboard' },
        { to: '/lms/courses', label: 'Course Catalog' },
        { to: '/certificates', label: 'My Certificates' },
        { to: '/verify', label: 'Verify Certificate' },
        { to: '/student-handbook', label: 'Student Handbook' },
      ],
    },
    {
      title: 'Community',
      links: [
        { to: '/community', label: 'Community Hub' },
        { to: '/hub', label: 'Student Hub' },
        { to: '/groups', label: 'Study Groups' },
        { to: '/calendar', label: 'Events Calendar' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { to: '/funding-impact', label: 'Funding & Impact' },
        { to: '/government', label: 'Government Programs' },
        { to: '/philanthropy', label: 'Philanthropy' },
        { to: '/business-hub', label: 'Business Hub' },
        { to: '/educator-hub', label: 'Educator Hub' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { to: '/privacy-policy', label: 'Privacy Policy' },
        { to: '/terms-of-service', label: 'Terms of Service' },
        { to: '/refund-policy', label: 'Refund Policy' },
        { to: '/accessibility', label: 'Accessibility' },
      ],
    },
  ];

  return (
    <section className="section">
      <div className="container max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-brown-900 mb-4">Sitemap</h1>
        <p className="text-brown-600 mb-12">
          Complete overview of all pages on Elevate for Humanity
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-brown-900 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-brown-600 hover:text-green-600 transition-colors"
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
  );
}
