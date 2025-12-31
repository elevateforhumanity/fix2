import Link from 'next/link';
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
  Target,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboards & Portals | Elevate for Humanity',
  description: 'Access your dashboard - Student Portal, LMS, Admin, Partner Portal, Employer Portal, and more.',
};

export default function DashboardLandingPage() {
  const dashboards = [
    {
      title: 'Student Portal',
      description: 'Access your courses, assignments, grades, and career services.',
      href: '/student/dashboard',
      icon: GraduationCap,
      color: 'blue',
      features: ['My Courses', 'Assignments', 'Grades', 'Career Services'],
      audience: 'For Students'
    },
    {
      title: 'LMS (Learning Management System)',
      description: 'Full learning platform with courses, quizzes, forums, and collaboration tools.',
      href: '/lms/dashboard',
      icon: BookOpen,
      color: 'green',
      features: ['Course Library', 'Interactive Lessons', 'Discussion Forums', 'Progress Tracking'],
      audience: 'For Students'
    },
    {
      title: 'Admin Dashboard',
      description: 'Manage students, programs, enrollments, and system-wide operations.',
      href: '/admin',
      icon: Shield,
      color: 'red',
      features: ['Student Management', 'Program Admin', 'Reports', 'System Settings'],
      audience: 'For Administrators'
    },
    {
      title: 'Staff Portal',
      description: 'Staff tools for managing students, courses, and daily operations.',
      href: '/staff-portal',
      icon: UserCog,
      color: 'purple',
      features: ['Student Records', 'Attendance', 'Course Management', 'Reports'],
      audience: 'For Staff'
    },
    {
      title: 'Program Holder Dashboard',
      description: 'Manage your training programs, students, and compliance reporting.',
      href: '/program-holder/dashboard',
      icon: Award,
      color: 'orange',
      features: ['My Students', 'Attendance Tracking', 'Documents', 'Compliance Reports'],
      audience: 'For Program Holders'
    },
    {
      title: 'Partner Portal',
      description: 'Training partner tools for student management and reporting.',
      href: '/partner',
      icon: Briefcase,
      color: 'cyan',
      features: ['Student Roster', 'Progress Reports', 'Resources', 'Communication'],
      audience: 'For Training Partners'
    },
    {
      title: 'Employer Portal',
      description: 'Post jobs, review candidates, and manage your hiring pipeline.',
      href: '/employer',
      icon: Building2,
      color: 'indigo',
      features: ['Job Postings', 'Candidate Search', 'Placements', 'Reports'],
      audience: 'For Employers'
    },
    {
      title: 'Workforce Board Portal',
      description: 'Oversight tools for workforce development boards and agencies.',
      href: '/workforce-board',
      icon: BarChart3,
      color: 'teal',
      features: ['Program Oversight', 'Compliance', 'Performance Metrics', 'Reports'],
      audience: 'For Workforce Boards'
    },
    {
      title: 'Parent Portal',
      description: 'Monitor your student\'s progress, attendance, and achievements.',
      href: '/parent-portal',
      icon: Users,
      color: 'pink',
      features: ['Student Progress', 'Attendance', 'Grades', 'Communication'],
      audience: 'For Parents/Guardians'
    },
    {
      title: 'Student Resources Store',
      description: 'Purchase course materials, textbooks, uniforms, and supplies.',
      href: '/store',
      icon: ShoppingBag,
      color: 'yellow',
      features: ['Course Materials', 'Textbooks', 'Uniforms', 'Supplies'],
      audience: 'For Everyone'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <Target className="w-5 h-5" />
            <span className="text-sm font-semibold">Dashboards & Portals</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Access Your Dashboard
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose your portal to access courses, manage programs, or track progress
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-black mb-1">10</div>
              <div className="text-xs text-blue-100">Portals</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-black mb-1">24/7</div>
              <div className="text-xs text-blue-100">Access</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-black mb-1">Mobile</div>
              <div className="text-xs text-blue-100">Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* All Dashboards Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Choose Your Portal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the dashboard that matches your role
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboards.map((dashboard) => {
              const Icon = dashboard.icon;
              return (
                <Link
                  key={dashboard.href}
                  href={dashboard.href}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-500 hover:-translate-y-2 transform"
                >
                  {/* Header with Icon */}
                  <div className={`bg-gradient-to-br from-${dashboard.color}-500 to-${dashboard.color}-600 p-6`}>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-10 h-10 text-white" />
                      <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        {dashboard.audience}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {dashboard.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {dashboard.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-4">
                      {dashboard.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      <span>Access Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
            Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Not sure which portal to use? Contact us for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/help"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all"
            >
              <span>Help Center</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:border-blue-600 hover:scale-105 transition-all"
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Not Enrolled Yet?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Apply now to get access to all student portals and resources
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:scale-105 transition-all"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-orange-100 mt-4">
            Takes 5 minutes • 100% free • No commitment
          </p>
        </div>
      </section>
    </main>
  );
}
