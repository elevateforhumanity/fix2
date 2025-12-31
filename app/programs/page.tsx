import Link from 'next/link';
import { Metadata } from 'next';
import { 
  GraduationCap,
  Search,
  GitCompare,
  Briefcase,
  BookOpen,
  Zap,
  TrendingUp,
  Building2,
  Award,
  FileCheck,
  CheckCircle,
  MapPin,
  Calendar,
  CalendarDays,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Training Programs in Indiana | Indiana Career Connect',
  description:
    'Find your path to a better career. 100% free training programs in healthcare, skilled trades, and business. Funded by Indiana Career Connect and WIOA. Start today.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
};

export default function ProgramsBioSitePage() {
  // Internal navigation for Programs subpages
  const navLinks = [
    { label: 'Programs Catalog', href: '/programs-catalog' },
    { label: 'Program Finder', href: '/program-finder' },
    { label: 'Compare Programs', href: '/compare-programs' },
    { label: 'Apprenticeships', href: '/apprenticeships' },
    { label: 'Courses', href: '/courses' },
    { label: 'Pathways', href: '/pathways' },
    { label: 'Credentials', href: '/credentials' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Accreditation', href: '/accreditation' },
    { label: 'Features', href: '/features' },
  ];

  const links = [
    {
      title: 'Programs Catalog',
      description: 'Browse our complete catalog of 50+ training programs',
      href: '/programs-catalog',
      icon: BookOpen,
      color: 'orange'
    },
    {
      title: 'Program Finder',
      description: 'Take our quiz to find your perfect program match',
      href: '/program-finder',
      icon: Search,
      color: 'blue'
    },
    {
      title: 'Compare Programs',
      description: 'Side-by-side comparison of programs',
      href: '/compare-programs',
      icon: GitCompare,
      color: 'green'
    },
    {
      title: 'Apprenticeships',
      description: 'Earn while you learn with paid apprenticeships',
      href: '/apprenticeships',
      icon: Briefcase,
      color: 'purple'
    },
    {
      title: 'Individual Courses',
      description: 'Take single courses to build specific skills',
      href: '/courses',
      icon: BookOpen,
      color: 'pink'
    },
    {
      title: 'Micro Classes',
      description: 'Short 1-4 hour classes for quick skills',
      href: '/micro-classes',
      icon: Zap,
      color: 'yellow'
    },
    {
      title: 'Career Pathways',
      description: 'Clear paths from training to employment',
      href: '/pathways',
      icon: TrendingUp,
      color: 'indigo'
    },
    {
      title: 'Industries',
      description: 'Explore programs by industry sector',
      href: '/industries',
      icon: Building2,
      color: 'cyan'
    },
    {
      title: 'Credentials',
      description: 'Industry-recognized certifications you\'ll earn',
      href: '/credentials',
      icon: Award,
      color: 'red'
    },
    {
      title: 'Certificates',
      description: 'Completion certificates and digital badges',
      href: '/certificates',
      icon: FileCheck,
      color: 'teal'
    },
    {
      title: 'Accreditation',
      description: 'Our accreditations and quality standards',
      href: '/accreditation',
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      title: 'Platform Features',
      description: 'LMS, mobile app, AI tutoring, and more',
      href: '/features',
      icon: Zap,
      color: 'violet'
    },
    {
      title: 'Locations',
      description: 'Find training locations near you',
      href: '/locations',
      icon: MapPin,
      color: 'rose'
    },
    {
      title: 'Class Schedule',
      description: 'View upcoming class start dates',
      href: '/schedule',
      icon: Calendar,
      color: 'amber'
    },
    {
      title: 'Academic Calendar',
      description: 'Important dates and deadlines',
      href: '/calendar',
      icon: CalendarDays,
      color: 'lime'
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Internal Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <section className="pt-16 pb-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Free Career Training Programs
          </h1>
          
          {/* Tagline */}
          <p className="text-xl text-gray-600 mb-8">
            50+ Programs in Healthcare, Skilled Trades & Business
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div>
              <div className="text-3xl font-black text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Free</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-600">85%</div>
              <div className="text-sm text-gray-600">Job Placement</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-orange-500 hover:scale-105 transform"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${link.color}-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${link.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            );
          })}

          {/* Apply CTA */}
          <Link
            href="/apply"
            className="block bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 transform text-center"
          >
            <h3 className="text-2xl font-black text-white mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-white/90 mb-4">
              Apply now - takes just 5 minutes
            </p>
            <div className="inline-flex items-center gap-2 text-white font-bold">
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <section className="pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">
            Questions? Contact us at{' '}
            <a href="mailto:elevate4humanityedu@gmail.com" className="text-orange-600 hover:underline">
              elevate4humanityedu@gmail.com
            </a>
          </p>
          <p className="text-xs text-gray-400">
            © 2025 Elevate for Humanity. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
