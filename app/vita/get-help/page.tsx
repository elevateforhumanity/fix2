import Link from 'next/link';
import { Metadata } from 'next';
import { DollarSign, FileText, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Get Free Tax Help | VITA | Elevate for Humanity',
  description:
    'Free tax preparation for individuals and families earning $60,000 or less.',
};

export default function VITAGetHelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-blue-600 to-brand-green-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Get Free Tax Help</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Free tax preparation for individuals and families earning $60,000 or
            less.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">
              Who Qualifies
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Individuals earning $60,000 or less
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Families with children</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Seniors and retirees</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Students</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Limited English speakers</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black mb-6">
              What to Bring
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Photo ID</span>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Social Security cards for all family members
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  W-2 forms from all employers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  1099 forms (if applicable)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Prior year tax return</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-brand-blue-50 rounded-2xl p-8 text-center">
          <DollarSign className="w-16 h-16 text-brand-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-black mb-4">
            100% Free Service
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            No fees, no hidden costs. Get your maximum refund.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-brand-blue-700 transition"
          >
            Schedule Appointment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
