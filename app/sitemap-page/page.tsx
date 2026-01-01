import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  Users,
  Briefcase,
  GraduationCap,
  Building2,
  Heart,
  DollarSign,
  Shield,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Site Map | Elevate For Humanity',
  description: 'Complete site map - find all pages and resources',
};

export default function SiteMapPage() {
  const sections = [
    {
      title: 'About Us',
      icon: Heart,
      links: [
        { href: '/about', label: 'About Elevate for Humanity' },
        { href: '/rise-foundation', label: 'RISE Foundation (501c3)' },
        { href: '/team', label: 'Our Team' },
        { href: '/contact', label: 'Contact Us' },
        { href: '/locations', label: 'Locations' },
      ],
    },
    {
      title: 'Programs & Training',
      icon: GraduationCap,
      links: [
        { href: '/programs', label: 'All Programs' },
        { href: '/programs-catalog', label: 'Programs Catalog' },
        { href: '/industries', label: 'Industries We Serve' },
        { href: '/micro-classes', label: 'Micro Classes' },
        { href: '/apprenticeships', label: 'Apprenticeships' },
        {
          href: '/programs/barber-apprenticeship',
          label: 'Barber Apprenticeship',
        },
      ],
    },
    {
      title: 'Services',
      icon: Briefcase,
      links: [
        { href: '/services', label: 'All Services' },
        { href: '/career-services', label: 'Career Services' },
        { href: '/career-center', label: 'Career Center' },
        { href: '/mentorship', label: 'Mentorship Program' },
        { href: '/support', label: 'Support Services' },
        { href: '/tax-services', label: 'Tax Services' },
        { href: '/vita', label: 'VITA Tax Prep' },
      ],
    },
    {
      title: 'Learning Platforms',
      icon: FileText,
      links: [
        { href: '/lms', label: 'Learning Management System' },
        { href: '/student/dashboard', label: 'Student Portal' },
        { href: '/courses', label: 'Courses' },
        { href: '/calendar', label: 'Calendar - Book Meeting' },
        { href: '/schedule', label: 'Schedule Appointment' },
      ],
    },
    {
      title: 'Portals & Dashboards',
      icon: Users,
      links: [
        { href: '/dashboard', label: 'All Portals' },
        { href: '/student/dashboard', label: 'Student Portal' },
        { href: '/staff-portal', label: 'Staff Portal' },
        { href: '/admin-portal', label: 'Admin Portal' },
        { href: '/program-holder-portal', label: 'Program Holder Portal' },
        { href: '/parent-portal', label: 'Parent Portal' },
        { href: '/workforce-board', label: 'Workforce Board Portal' },
        { href: '/partner', label: 'Partner Portal' },
        { href: '/employer', label: 'Employer Portal' },
      ],
    },
    {
      title: 'Partnerships',
      icon: Building2,
      links: [
        { href: '/licensing-partnerships', label: 'Licensing & Partnerships' },
        { href: '/partner', label: 'Become a Partner' },
        { href: '/employer', label: 'Employer Partnerships' },
      ],
    },
    {
      title: 'Resources & Store',
      icon: DollarSign,
      links: [
        { href: '/store', label: 'Store' },
        { href: '/store/licenses', label: 'Platform Licenses' },
        { href: '/store/subscriptions', label: 'Subscriptions' },
        { href: '/store/cart', label: 'Shopping Cart' },
        { href: '/downloads', label: 'Downloads' },
      ],
    },
    {
      title: 'Apply & Get Started',
      icon: Shield,
      links: [
        { href: '/apply', label: 'Apply Now' },
        { href: '/how-it-works', label: 'How It Works' },
        { href: '/next-steps', label: 'Next Steps' },
        { href: '/funding', label: 'Funding Information' },
        { href: '/financial-aid', label: 'Financial Aid Info' },
        { href: '/certificates', label: 'Certificates & Credentials' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-6">
            Site Map
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Find all pages and resources on Elevate for Humanity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-black">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link, lidx) => (
                    <li key={lidx}>
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
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-black mb-4">Can't find what you're looking for?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
