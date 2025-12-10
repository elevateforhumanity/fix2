import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  GraduationCap, 
  Users, 
  Building2, 
  UserCheck, 
  BarChart3, 
  Settings,
  BookOpen,
  Briefcase,
  Shield,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboards | Elevate For Humanity',
  description: 'Access all portals and dashboards - Student, Instructor, Employer, Admin, and more.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/dashboards',
  },
};

export default function DashboardsPage() {
  const dashboards = [
    {
      category: 'Student Access',
      description: 'For students enrolled in training programs',
      color: 'blue',
      items: [
        {
          title: 'Student Dashboard',
          description: 'View your courses, assignments, and progress',
          href: '/student/dashboard',
          icon: GraduationCap,
          features: ['Course Progress', 'Assignments', 'Grades', 'Certificates'],
        },
        {
          title: 'Learning Management System',
          description: 'Access course materials and online learning',
          href: '/lms/dashboard',
          icon: BookOpen,
          features: ['Video Lessons', 'Quizzes', 'Discussion Forums', 'Resources'],
        },
        {
          title: 'My Certificates',
          description: 'View and download your earned certificates',
          href: '/student/certificates',
          icon: Shield,
          features: ['Digital Certificates', 'Verification', 'Share on LinkedIn'],
        },
        {
          title: 'Portfolio',
          description: 'Showcase your work and achievements',
          href: '/student/portfolio',
          icon: Briefcase,
          features: ['Upload Work', 'Share Portfolio', 'Track Skills'],
        },
      ],
    },
    {
      category: 'Partner Access',
      description: 'For employers, program holders, and instructors',
      color: 'purple',
      items: [
        {
          title: 'Employer Portal',
          description: 'Post jobs and hire trained graduates',
          href: '/employer/dashboard',
          icon: Briefcase,
          features: ['Post Jobs', 'View Candidates', 'Hire Graduates', 'Analytics'],
        },
        {
          title: 'Program Holder Portal',
          description: 'Manage training programs and partnerships',
          href: '/program-holder/dashboard',
          icon: Building2,
          features: ['Program Management', 'Student Tracking', 'Reports', 'Compliance'],
        },
        {
          title: 'Instructor Portal',
          description: 'Teach courses and track student progress',
          href: '/portal/instructor/dashboard',
          icon: UserCheck,
          features: ['Course Management', 'Grade Students', 'Attendance', 'Resources'],
        },
      ],
    },
    {
      category: 'Administration',
      description: 'For administrators and board members',
      color: 'green',
      items: [
        {
          title: 'Admin Console',
          description: 'Full platform administration and management',
          href: '/admin/dashboard',
          icon: Settings,
          features: ['User Management', 'Program Setup', 'Reports', 'System Config'],
        },
        {
          title: 'Board Portal',
          description: 'Board member access and governance',
          href: '/board/dashboard',
          icon: Users,
          features: ['Board Documents', 'Meeting Minutes', 'Voting', 'Reports'],
        },
        {
          title: 'Workforce Board',
          description: 'Workforce development board access',
          href: '/workforce-board/dashboard',
          icon: BarChart3,
          features: ['Workforce Data', 'Grant Management', 'Compliance', 'Analytics'],
        },
      ],
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'from-blue-600 to-blue-700',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      hover: 'hover:border-blue-500',
    },
    purple: {
      bg: 'from-purple-600 to-purple-700',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      hover: 'hover:border-purple-500',
    },
    green: {
      bg: 'from-green-600 to-green-700',
      light: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      hover: 'hover:border-green-500',
    },
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Dashboards"
          fill
          className="object-cover brightness-110"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Access Your Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Choose your portal to get started
          </p>
        </div>
      </section>

      {/* Dashboards Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-16">
            {dashboards.map((section) => {
              const colors = colorClasses[section.color as keyof typeof colorClasses];
              
              return (
                <div key={section.category}>
                  {/* Section Header */}
                  <div className={`bg-gradient-to-r ${colors.bg} rounded-2xl p-8 text-white mb-8`}>
                    <h2 className="text-3xl font-bold mb-2">{section.category}</h2>
                    <p className="text-lg opacity-90">{section.description}</p>
                  </div>

                  {/* Dashboard Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.items.map((dashboard) => {
                      const Icon = dashboard.icon;
                      
                      return (
                        <Link
                          key={dashboard.href}
                          href={dashboard.href}
                          className={`group bg-white rounded-xl border-2 ${colors.border} ${colors.hover} p-6 transition-all hover:shadow-xl`}
                        >
                          <div className={`w-14 h-14 ${colors.light} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <Icon className={`h-7 w-7 ${colors.text}`} />
                          </div>
                          
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {dashboard.title}
                          </h3>
                          
                          <p className="text-slate-600 mb-4 text-sm">
                            {dashboard.description}
                          </p>

                          <div className="space-y-2 mb-4">
                            {dashboard.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                                <div className={`w-1.5 h-1.5 rounded-full ${colors.bg}`} />
                                {feature}
                              </div>
                            ))}
                          </div>

                          <div className={`flex items-center gap-2 ${colors.text} font-semibold text-sm group-hover:gap-3 transition-all`}>
                            Access Dashboard
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Need Help Finding Your Dashboard?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Not sure which dashboard to use? Contact our support team for assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              >
                Contact Support
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Quick Links
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/apply"
                className="p-4 bg-white rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-slate-900">Apply for Training</p>
                <p className="text-sm text-slate-600 mt-1">Start your application</p>
              </Link>
              <Link
                href="/programs"
                className="p-4 bg-white rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-slate-900">Browse Programs</p>
                <p className="text-sm text-slate-600 mt-1">View all training options</p>
              </Link>
              <Link
                href="/login"
                className="p-4 bg-white rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-slate-900">Login</p>
                <p className="text-sm text-slate-600 mt-1">Access your account</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
