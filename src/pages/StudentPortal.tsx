import { Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Calendar,
  Users,
  MessageSquare,
  FileText,
} from 'lucide-react';

export default function StudentPortal() {
  const portalLinks = [
    {
      title: 'Student Dashboard',
      description: 'Access your courses, track progress, and view assignments',
      icon: BookOpen,
      to: '/lms',
      color: 'bg-blue-500',
    },
    {
      title: 'My Certificates',
      description: 'View and download your earned certificates',
      icon: Award,
      to: '/certificates',
      color: 'bg-green-500',
    },
    {
      title: 'Course Catalog',
      description: 'Browse available courses and enroll in new programs',
      icon: FileText,
      to: '/lms/courses',
      color: 'bg-purple-500',
    },
    {
      title: 'Events Calendar',
      description: 'View upcoming classes, workshops, and events',
      icon: Calendar,
      to: '/calendar',
      color: 'bg-orange-500',
    },
    {
      title: 'Community Hub',
      description: 'Connect with fellow students and join study groups',
      icon: Users,
      to: '/community',
      color: 'bg-pink-500',
    },
    {
      title: 'AI Tutor',
      description: 'Get instant help with your coursework',
      icon: MessageSquare,
      to: '/ai-tutor',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brown-700 to-brown-800 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Student Portal
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Access all your learning resources, courses, and student services in
            one place
          </p>
        </div>
      </section>
      {/* Quick Links Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portalLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group border border-brown-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-green-600"
                >
                  <div
                    className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-brown-900 mb-2 group-hover:text-green-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-brown-600">{link.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Resources Section */}
      <section className="bg-beige-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-brown-900 mb-8 text-center">
            Student Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg border border-brown-200">
              <h3 className="text-xl font-semibold text-brown-900 mb-3">
                Student Handbook
              </h3>
              <p className="text-brown-600 mb-4">
                Review policies, procedures, and important information for
                students
              </p>
              <Link
                to="/student-handbook"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View Handbook →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg border border-brown-200">
              <h3 className="text-xl font-semibold text-brown-900 mb-3">
                Support Center
              </h3>
              <p className="text-brown-600 mb-4">
                Get help with technical issues, course questions, and more
              </p>
              <Link
                to="/support"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Get Support →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Sign In CTA */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-brown-900 mb-4">
            New to Elevate for Humanity?
          </h2>
          <p className="text-lg text-brown-600 mb-8 max-w-2xl mx-auto">
            Create an account to access your courses and start your learning
            journey
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/auth/login" className="btn-secondary">
              Sign In
            </Link>
            <Link to="/auth/signup" className="btn">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
