// app/docs/page.tsx
import Link from 'next/link';
import {
  BookOpen,
  Users,
  GraduationCap,
  Building2,
  FileText,
  Video,
} from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Home
          </Link>
          <Link href="/docs" className="text-red-600 font-semibold">
            Documentation
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 via-orange-500 to-blue-600 text-white py-16">
        <div className="elevate-container text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Everything you need to know about using Elevate for Humanity
          </p>
        </div>
      </section>

      <main className="elevate-container py-12">
        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Start Guides
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/docs/students"
              className="elevate-card hover:border-red-300 transition"
            >
              <GraduationCap className="h-8 w-8 text-red-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">For Students</h3>
              <p className="text-sm text-gray-600">
                Learn how to enroll, access courses, and track your progress
              </p>
            </Link>

            <Link
              href="/docs/program-holders"
              className="elevate-card hover:border-red-300 transition"
            >
              <Building2 className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">
                For Program Holders
              </h3>
              <p className="text-sm text-gray-600">
                Manage programs, track learners, and report outcomes
              </p>
            </Link>

            <Link
              href="/docs/admins"
              className="elevate-card hover:border-red-300 transition"
            >
              <Users className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">
                For Administrators
              </h3>
              <p className="text-sm text-gray-600">
                Configure the system, manage users, and generate reports
              </p>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Feature Documentation
          </h2>
          <div className="space-y-4">
            <Link
              href="/docs/lms"
              className="elevate-card flex items-center gap-4 hover:border-red-300 transition"
            >
              <Video className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-bold text-gray-900">
                  Learning Management System
                </h3>
                <p className="text-sm text-gray-600">
                  Courses, lessons, quizzes, and progress tracking
                </p>
              </div>
            </Link>

            <Link
              href="/docs/case-management"
              className="elevate-card flex items-center gap-4 hover:border-red-300 transition"
            >
              <FileText className="h-6 w-6 text-orange-600" />
              <div>
                <h3 className="font-bold text-gray-900">Case Management</h3>
                <p className="text-sm text-gray-600">
                  Track participants, funding sources, and outcomes
                </p>
              </div>
            </Link>

            <Link
              href="/docs/reporting"
              className="elevate-card flex items-center gap-4 hover:border-red-300 transition"
            >
              <FileText className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-bold text-gray-900">
                  Reporting & Analytics
                </h3>
                <p className="text-sm text-gray-600">
                  Generate reports for WIOA, WRG, and other funding sources
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* API Documentation */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Developer Resources
          </h2>
          <div className="elevate-card">
            <h3 className="font-bold text-gray-900 mb-2">API Documentation</h3>
            <p className="text-gray-600 mb-4">
              Integrate with Elevate for Humanity using our REST API
            </p>
            <Link
              href="/docs/api"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              View API Docs →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
