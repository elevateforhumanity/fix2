import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  GraduationCap,
  Users,
  Briefcase,
  Building2,
  UserCog,
  BarChart3,
  BookOpen,
  ShoppingBag,
  Award,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboards & Portals | Elevate for Humanity',
  description: 'Access your dashboard - Student Portal, LMS, Admin, Partner Portal, Employer Portal, and more.',
};

export default function DashboardLandingPage() {
  const dashboards = [
    {
      title: 'Student Portal',
      description: 'Access courses, assignments, grades, and career services',
      href: '/student/dashboard',
      icon: GraduationCap,
      audience: 'For Students'
    },
    {
      title: 'LMS',
      description: 'Full learning platform with interactive courses and forums',
      href: '/lms/dashboard',
      icon: BookOpen,
      audience: 'For Students'
    },
    {
      title: 'Admin Dashboard',
      description: 'Manage students, programs, and system operations',
      href: '/admin',
      icon: UserCog,
      audience: 'For Administrators'
    },
    {
      title: 'Staff Portal',
      description: 'Staff tools for student and course management',
      href: '/staff-portal',
      icon: Users,
      audience: 'For Staff'
    },
    {
      title: 'Program Holder',
      description: 'Manage training programs and compliance',
      href: '/program-holder/dashboard',
      icon: Award,
      audience: 'For Program Holders'
    },
    {
      title: 'Partner Portal',
      description: 'Training partner tools and reporting',
      href: '/partner',
      icon: Briefcase,
      audience: 'For Partners'
    },
    {
      title: 'Employer Portal',
      description: 'Post jobs and review candidates',
      href: '/employer',
      icon: Building2,
      audience: 'For Employers'
    },
    {
      title: 'Workforce Board',
      description: 'Oversight and performance metrics',
      href: '/workforce-board',
      icon: BarChart3,
      audience: 'For Boards'
    },
    {
      title: 'Parent Portal',
      description: 'Monitor student progress and attendance',
      href: '/parent-portal',
      icon: Users,
      audience: 'For Parents'
    },
    {
      title: 'Resources Store',
      description: 'Course materials and supplies',
      href: '/store',
      icon: ShoppingBag,
      audience: 'For Everyone'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Green/Teal Theme */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={200}
              height={80}
              className="mx-auto"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Choose Your Dashboard
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Select the portal that matches your role to access courses, manage programs, or track progress
          </p>

          <div className="inline-flex items-center gap-2 bg-teal-100 px-6 py-3 rounded-full border-2 border-teal-200">
            <span className="text-teal-800 font-bold">10 Portals Available • 24/7 Access • Mobile Friendly</span>
          </div>
        </div>
      </section>

      {/* Dashboard Grid - Holiday Gift Round-up Style */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboards.map((dashboard) => {
              const Icon = dashboard.icon;
              return (
                <Link
                  key={dashboard.href}
                  href={dashboard.href}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-teal-500 hover:-translate-y-1 transform"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:scale-110 transition-all">
                    <Icon className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors" />
                  </div>

                  {/* Audience Badge */}
                  <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {dashboard.audience}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {dashboard.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {dashboard.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-teal-600 font-bold group-hover:gap-3 transition-all">
                    <span>Access Portal</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={150}
              height={60}
              className="mx-auto"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Need Help Finding Your Portal?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact our support team for assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/help"
              className="inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-teal-700 hover:scale-105 transition-all"
            >
              <span>Help Center</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-teal-50 hover:scale-105 transition-all"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Not Enrolled CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={150}
              height={60}
              className="mx-auto brightness-0 invert"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Not Enrolled Yet?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Apply now to get access to all student portals and resources
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:scale-105 transition-all"
          >
            <span>Apply Now - 100% Free</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-orange-100 mt-4">
            Takes 5 minutes • No commitment required
          </p>
        </div>
      </section>
    </main>
  );
}
