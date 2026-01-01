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
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Portal | Elevate for Humanity',
  description:
    'Access your student portal - courses, assignments, grades, and career services.',
};

export default function DashboardLandingPage() {
  // Redirect to student portal - this is the only public dashboard
  const studentPortal = {
    title: 'Student Portal',
    description:
      'Access your courses, assignments, grades, career services, and more',
    href: '/student/dashboard',
    icon: GraduationCap,
  };

  const Icon = studentPortal.icon;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
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

          <GraduationCap className="h-20 w-20 text-white mx-auto mb-6" />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Student Portal
          </h1>

          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Access your courses, assignments, grades, career services, and more
          </p>

          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all"
          >
            <span>Access Student Portal</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            What's in Your Portal
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-blue-600 rounded-xl p-8">
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">Courses</h3>
              <p className="text-black">
                Access all your training courses, lessons, and learning
                materials
              </p>
            </div>

            <div className="bg-white border-2 border-green-600 rounded-xl p-8">
              <Award className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">Grades</h3>
              <p className="text-black">
                Track your progress, view grades, and monitor completion status
              </p>
            </div>

            <div className="bg-white border-2 border-purple-600 rounded-xl p-8">
              <Briefcase className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Career Services
              </h3>
              <p className="text-black">
                Access job boards, resume help, and career counseling
              </p>
            </div>

            <div className="bg-white border-2 border-orange-600 rounded-xl p-8">
              <Users className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">Support</h3>
              <p className="text-black">
                Get help from instructors, advisors, and support staff
              </p>
            </div>

            <div className="bg-white border-2 border-teal-600 rounded-xl p-8">
              <BarChart3 className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Progress Tracking
              </h3>
              <p className="text-black">
                Monitor your attendance, completion rates, and milestones
              </p>
            </div>

            <div className="bg-white border-2 border-pink-600 rounded-xl p-8">
              <Building2 className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">Resources</h3>
              <p className="text-black">
                Download forms, access tools, and view important documents
              </p>
            </div>
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
