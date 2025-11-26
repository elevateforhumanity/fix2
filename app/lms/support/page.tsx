import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, MessageCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support | LMS',
  description: 'Contact our support team for assistance',
};

export default function LMSSupportPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/lms/dashboard"
            className="text-red-600 hover:underline mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Contact Support</h1>
          <p className="text-slate-600 mt-2">
            We're here to help! Choose your preferred contact method below.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Mail className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
            <a
              href="mailto:info@elevateforhumanity.org"
              className="text-red-600 hover:underline text-sm"
            >
              info@elevateforhumanity.org
            </a>
            <p className="text-xs text-slate-500 mt-2">Response within 24 hours</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
            <a href="tel:+13175550100" className="text-red-600 hover:underline text-sm">
              (317) 555-0100
            </a>
            <p className="text-xs text-slate-500 mt-2">Mon-Fri, 9am-5pm EST</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <MessageCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Live Chat</h3>
            <button className="text-red-600 hover:underline text-sm">
              Start Chat
            </button>
            <p className="text-xs text-slate-500 mt-2">Available during business hours</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Submit a Support Ticket
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category *
              </label>
              <select
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select a category...</option>
                <option value="technical">Technical Issue</option>
                <option value="course">Course Access</option>
                <option value="assignment">Assignment Submission</option>
                <option value="certificate">Certificate Issue</option>
                <option value="account">Account/Login</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Priority
              </label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={6}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Please provide as much detail as possible about your issue..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Attachments
              </label>
              <input
                type="file"
                multiple
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                Upload screenshots or files that might help us understand your issue
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Submit Ticket
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Clock className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">
                Support Hours
              </h3>
              <p className="text-amber-800 text-sm">
                Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                Saturday - Sunday: Closed<br />
                Emergency support available 24/7 for critical issues
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
