'use client';

import Link from 'next/link';
import { Briefcase, Users, FileText, Plus } from 'lucide-react';

export default function EmployerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Employer Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Connect with qualified candidates
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/employer/post-job"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition border-2 border-gray-100 hover:border-brandPrimary"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-brandPrimary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Post a Job</h3>
            <p className="text-gray-600 text-sm">Create a new job posting</p>
          </Link>

          <Link
            href="/employer/jobs"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition border-2 border-gray-100 hover:border-orange-500"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              My Job Postings
            </h3>
            <p className="text-gray-600 text-sm">View and manage your jobs</p>
          </Link>

          <Link
            href="/employer/candidates"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition border-2 border-gray-100 hover:border-green-500"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Browse Candidates
            </h3>
            <p className="text-gray-600 text-sm">Find qualified talent</p>
          </Link>
        </div>

        {/* Getting Started */}
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Getting Started
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-brandPrimary font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Post Your First Job
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Create a job posting to start receiving applications from
                  qualified candidates.
                </p>
                <Link
                  href="/employer/post-job"
                  className="text-brandPrimary text-sm font-semibold hover:underline"
                >
                  Post a Job →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-brandPrimary font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Browse Our Talent Pool
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Search through our database of trained and certified
                  candidates.
                </p>
                <Link
                  href="/employer/candidates"
                  className="text-brandPrimary text-sm font-semibold hover:underline"
                >
                  Browse Candidates →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-brandPrimary font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Partner with Us
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Sign an MOU to become an official training partner and access
                  additional benefits.
                </p>
                <Link
                  href="/employer/mou"
                  className="text-brandPrimary text-sm font-semibold hover:underline"
                >
                  View MOU Options →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <FileText className="w-6 h-6 text-brandPrimary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-700 text-sm mb-3">
                Our team is here to help you find the right talent for your
                organization.
              </p>
              <Link
                href="/contact"
                className="inline-block px-4 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition text-sm font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
