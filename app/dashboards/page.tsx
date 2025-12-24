import { Metadata } from 'next';
import Link from 'next/link';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Building2,
  Briefcase,
  School,
  UserCog,
  Shield,
  Store,
  Palette,
  UserCheck,
  Home,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Dashboards | Elevate for Humanity',
  description:
    'Access all platform dashboards - Student, Instructor, Admin, Partner, and more.',
};

export default function DashboardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LayoutDashboard className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Platform Dashboards
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Access your personalized dashboard based on your role
          </p>
        </div>
      </section>

      {/* Dashboards Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Student Dashboard */}
            <DashboardCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Student Dashboard"
              description="Access your courses, assignments, grades, and AI tutor"
              href="/student/dashboard"
              color="blue"
              features={[
                'My Courses',
                'Assignments & Grades',
                'AI Tutor',
                'Certificates',
                'Career Counseling',
              ]}
            />

            {/* Instructor Dashboard */}
            <DashboardCard
              icon={<Users className="w-8 h-8" />}
              title="Instructor Dashboard"
              description="Manage your classes, students, and course materials"
              href="/instructor/dashboard"
              color="green"
              features={[
                'My Classes',
                'Student Management',
                'Grading',
                'Course Materials',
                'Analytics',
              ]}
            />

            {/* Admin Dashboard */}
            <DashboardCard
              icon={<Shield className="w-8 h-8" />}
              title="Admin Dashboard"
              description="Platform administration, analytics, and management"
              href="/admin"
              color="purple"
              features={[
                'Analytics',
                'User Management',
                'Reports',
                'AI Course Builder',
                'Security',
              ]}
            />

            {/* Program Holder Dashboard */}
            <DashboardCard
              icon={<Building2 className="w-8 h-8" />}
              title="Program Holder Dashboard"
              description="Manage programs, students, and partnerships"
              href="/program-holder/dashboard"
              color="orange"
              features={[
                'Program Management',
                'Student Tracking',
                'Reports',
                'Communications',
              ]}
            />

            {/* Employer Dashboard */}
            <DashboardCard
              icon={<Briefcase className="w-8 h-8" />}
              title="Employer Dashboard"
              description="Post jobs, review candidates, and hire graduates"
              href="/employer/dashboard"
              color="indigo"
              features={[
                'Job Postings',
                'Candidate Review',
                'Hiring Pipeline',
                'Analytics',
              ]}
            />

            {/* Program Holder Dashboard */}
            <DashboardCard
              icon={<School className="w-8 h-8" />}
              title="Program Holder Dashboard"
              description="Manage training programs and certifications"
              href="/program-holder/dashboard"
              color="pink"
              features={[
                'Program Management',
                'Certifications',
                'Compliance',
                'Reporting',
              ]}
            />

            {/* Workforce Board Dashboard */}
            <DashboardCard
              icon={<UserCog className="w-8 h-8" />}
              title="Workforce Board Dashboard"
              description="Oversight, funding, and workforce development"
              href="/workforce-board/dashboard"
              color="teal"
              features={[
                'Funding Oversight',
                'Program Approval',
                'Compliance',
                'Regional Analytics',
              ]}
            />

            {/* Staff Portal */}
            <DashboardCard
              icon={<UserCheck className="w-8 h-8" />}
              title="Staff Portal"
              description="Internal staff tools and resources"
              href="/staff-portal/dashboard"
              color="cyan"
              features={[
                'Student Support',
                'Case Management',
                'Internal Tools',
                'Communications',
              ]}
            />

            {/* Board Dashboard */}
            <DashboardCard
              icon={<Users className="w-8 h-8" />}
              title="Board Dashboard"
              description="Board member access and governance"
              href="/board/dashboard"
              color="slate"
              features={[
                'Governance',
                'Financial Reports',
                'Strategic Planning',
                'Meeting Materials',
              ]}
            />

            {/* Shop Dashboard */}
            <DashboardCard
              icon={<Store className="w-8 h-8" />}
              title="Shop Dashboard"
              description="Manage shop operations and inventory"
              href="/shop/dashboard"
              color="amber"
              features={['Inventory', 'Sales', 'Orders', 'Analytics']}
            />

            {/* Creator Dashboard */}
            <DashboardCard
              icon={<Palette className="w-8 h-8" />}
              title="Creator Dashboard"
              description="Create and manage course content"
              href="/creator/dashboard"
              color="rose"
              features={[
                'Content Creation',
                'Course Builder',
                'Media Library',
                'Publishing',
              ]}
            />

            {/* Delegate Dashboard */}
            <DashboardCard
              icon={<UserCheck className="w-8 h-8" />}
              title="Delegate Dashboard"
              description="Delegated access and permissions"
              href="/delegate/dashboard"
              color="violet"
              features={[
                'Delegated Tasks',
                'Permissions',
                'Reports',
                'Communications',
              ]}
            />

            {/* Parent Portal */}
            <DashboardCard
              icon={<Home className="w-8 h-8" />}
              title="Parent Portal"
              description="Monitor student progress and communicate"
              href="/portal/parent/dashboard"
              color="emerald"
              features={[
                'Student Progress',
                'Grades & Attendance',
                'Communications',
                'Resources',
              ]}
            />

            {/* LMS Dashboard */}
            <DashboardCard
              icon={<BookOpen className="w-8 h-8" />}
              title="LMS Dashboard"
              description="Learning Management System access"
              href="/lms/dashboard"
              color="sky"
              features={[
                'Course Catalog',
                'Learning Paths',
                'Assessments',
                'Certificates',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Need Help Finding Your Dashboard?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact our support team and we'll help you get to the right place
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Contact Support
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition"
            >
              View Help Center
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({
  icon,
  title,
  description,
  href,
  color,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
  features: string[];
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    indigo: 'from-indigo-500 to-indigo-600',
    pink: 'from-pink-500 to-pink-600',
    teal: 'from-teal-500 to-teal-600',
    cyan: 'from-cyan-500 to-cyan-600',
    slate: 'from-slate-500 to-slate-600',
    amber: 'from-amber-500 to-amber-600',
    rose: 'from-rose-500 to-rose-600',
    violet: 'from-violet-500 to-violet-600',
    emerald: 'from-emerald-500 to-emerald-600',
    sky: 'from-sky-500 to-sky-600',
  };

  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
    >
      {/* Header */}
      <div
        className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} p-6 text-white`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            {icon}
          </div>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/90">{description}</p>
      </div>

      {/* Features */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-600">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
          <span>Access Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
