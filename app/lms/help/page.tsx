import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, Book, Video, MessageCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center | LMS',
  description: 'Get help with using the learning management system',
};

export default function LMSHelpPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/lms/dashboard"
            className="text-red-600 hover:underline mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-red-600" />
            Help Center
          </h1>
          <p className="text-slate-600 mt-2">
            Find answers and get support for using the platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/docs/students"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
          >
            <Book className="h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Student Guide
            </h2>
            <p className="text-slate-600">
              Learn how to navigate courses, submit assignments, and track your
              progress
            </p>
          </Link>

          <Link
            href="/lms/support"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
          >
            <MessageCircle className="h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Contact Support
            </h2>
            <p className="text-slate-600">
              Get help from our support team via email, chat, or phone
            </p>
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Video className="h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Video Tutorials
            </h2>
            <p className="text-slate-600 mb-4">
              Watch step-by-step guides on using the platform
            </p>
            <button className="text-red-600 hover:underline text-sm font-medium">
              Coming Soon
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <FileText className="h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">FAQs</h2>
            <p className="text-slate-600 mb-4">
              Quick answers to common questions
            </p>
            <Link
              href="/faq"
              className="text-red-600 hover:underline text-sm font-medium"
            >
              View FAQs →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Common Topics
          </h2>
          <div className="space-y-4">
            <details className="border border-slate-200 rounded-lg p-4">
              <summary className="font-medium text-slate-900 cursor-pointer">
                How do I access my courses?
              </summary>
              <p className="text-slate-600 mt-2">
                Navigate to the LMS Dashboard and click on "My Courses". All
                your enrolled courses will be displayed there.
              </p>
            </details>

            <details className="border border-slate-200 rounded-lg p-4">
              <summary className="font-medium text-slate-900 cursor-pointer">
                How do I submit an assignment?
              </summary>
              <p className="text-slate-600 mt-2">
                Go to the course page, click on the assignment, and use the
                upload button to submit your work. You'll receive a confirmation
                once submitted.
              </p>
            </details>

            <details className="border border-slate-200 rounded-lg p-4">
              <summary className="font-medium text-slate-900 cursor-pointer">
                How do I track my progress?
              </summary>
              <p className="text-slate-600 mt-2">
                Visit the Progress page from your dashboard to see completion
                percentages, grades, and upcoming deadlines.
              </p>
            </details>

            <details className="border border-slate-200 rounded-lg p-4">
              <summary className="font-medium text-slate-900 cursor-pointer">
                How do I get my certificate?
              </summary>
              <p className="text-slate-600 mt-2">
                Once you complete all course requirements, your certificate will
                be automatically generated and available in the Certificates
                section.
              </p>
            </details>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Need More Help?</h3>
          <p className="text-blue-800 mb-4">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <Link
            href="/lms/support"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
