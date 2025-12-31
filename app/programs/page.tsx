import Link from 'next/link';
import Image from 'next/image';
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
    <main className="min-h-screen bg-white">
      {/* Video Hero Banner - Wix Style */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/programs-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-6xl w-full rich-animate">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={200}
                height={80}
                className="mx-auto brightness-0 invert"
              />
            </div>
            
            {/* Badge */}
            <div className="rich-badge mb-8 bg-teal-500/20 border-teal-500/30 text-teal-100">
              <GraduationCap className="w-5 h-5" />
              <span>50+ Career Training Programs</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              FREE CAREER TRAINING PROGRAMS
            </h1>
            
            {/* Subheadline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
              100% Free • No Tuition • No Debt
            </h2>
            
            {/* Body */}
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Browse our complete catalog of 50+ training programs across all industries
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/apply"
                className="rich-button-primary uppercase inline-flex items-center gap-3"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#programs"
                className="rich-button-secondary text-white border-white hover:bg-white hover:text-teal-600 uppercase inline-flex items-center gap-3"
              >
                <span>Browse Programs</span>
                <Search className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Navigation */}
      <nav className="rich-nav bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rich-nav-link px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <section id="programs" className="pt-16 pb-8 px-4">
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
