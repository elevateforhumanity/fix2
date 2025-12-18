import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Tax Preparation Services | Free VITA & Paid Tax Prep | Elevate for Humanity',
  description:
    'Two ways to get your taxes done in Indianapolis: Free VITA tax help through Rise Up Foundation or full-service paid tax preparation through SupersonicFastCash.',
  keywords: [
    'tax preparation Indianapolis',
    'free tax help Indianapolis',
    'VITA tax services',
    'paid tax prep Indianapolis',
    'tax services Indianapolis',
    'Rise Up Foundation',
    'SupersonicFastCash',
  ],
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/tax',
  },
  openGraph: {
    title: 'Tax Preparation Services - Free & Paid Options',
    description:
      'Free VITA tax help or full-service paid tax preparation in Indianapolis.',
    url: 'https://www.elevateforhumanity.org/tax',
    type: 'website',
  },
};

export default function TaxHubPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero Banner */}
      <section className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold text-gray-500">
          Tax Preparation Services
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Two ways to get your taxes done — free (VITA) or full-service
          for-profit
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">
          We operate both a free community tax support pathway through Rise Up
          Foundation (VITA-style support) and a paid, full-service pathway
          through SupersonicFastCash. Choose the option that fits your needs.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
            href="/tax/rise-up-foundation"
          >
            Get Free Tax Help
          </Link>
          <Link
            className="px-6 py-3 rounded-lg border-2 border-black font-semibold hover:bg-gray-50 transition"
            href="/tax/supersonicfastcash"
          >
            Book Paid Tax Prep
          </Link>
          <Link
            className="px-6 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition"
            href="/tax/supersonicfastcash/documents"
          >
            Upload Documents
          </Link>
        </div>

        <div className="mt-6 rounded-xl bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-gray-700">
          <div className="font-semibold text-gray-900">Important:</div>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              Free services are offered through Rise Up Foundation and follow
              IRS VITA eligibility and volunteer program rules.
            </li>
            <li>
              Paid services are provided separately through SupersonicFastCash
              with separate pricing and engagement terms.
            </li>
            <li>
              Both programs maintain strict separation to ensure compliance with
              IRS regulations.
            </li>
          </ul>
        </div>
      </section>

      {/* Two-card chooser */}
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-green-200 bg-white p-8 shadow-sm hover:shadow-lg transition">
          <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold mb-4">
            FREE PATH
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Rise Up Foundation
          </h2>
          <p className="text-sm text-gray-500 mb-4">VITA-style support</p>
          <p className="text-gray-600 leading-relaxed">
            Free tax help for qualifying community members. Appointment-based
            service with trained volunteers. Bring your documents and we'll help
            you file for free.
          </p>

          <div className="mt-6 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">100% Free - No fees</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">
                IRS-certified volunteers
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">
                Income eligibility required
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Appointment-based</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold text-center hover:bg-green-700 transition"
              href="/tax/rise-up-foundation/free-tax-help"
            >
              See Free Tax Help
            </Link>
            <Link
              className="px-6 py-3 rounded-lg border-2 border-green-600 text-green-600 font-semibold text-center hover:bg-green-50 transition"
              href="/tax/rise-up-foundation/volunteer"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-blue-200 bg-white p-8 shadow-sm hover:shadow-lg transition">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-4">
            PAID PATH
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            SupersonicFastCash
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            For-profit tax preparation
          </p>
          <p className="text-gray-600 leading-relaxed">
            Fast, professional filing for individuals and small businesses.
            Document upload, status updates, refund advances, and clear pricing.
            Same-day service available.
          </p>

          <div className="mt-6 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">
                Professional tax preparers
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">
                Refund advances available
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">
                Business tax services
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Same-day filing</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition"
              href="/tax/supersonicfastcash/services"
            >
              View Services & Pricing
            </Link>
            <Link
              className="px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold text-center hover:bg-blue-50 transition"
              href="/tax/supersonicfastcash/documents"
            >
              Upload Documents
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Compare Your Options
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Feature
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">
                  Rise Up Foundation (Free)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">
                  SupersonicFastCash (Paid)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Cost
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">100% Free</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Paid (see pricing)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Eligibility
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Income limits apply
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  No restrictions
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Refund Advance
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Not available
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  $250-$7,500 available
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Business Returns
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Not available
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">Available</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Scheduling
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Appointment required
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Walk-ins welcome
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Document Upload
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Bring in person
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Online upload available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-12 rounded-2xl bg-gray-50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
        <p className="text-gray-600 mb-6">
          Not sure which option is right for you? Contact us and we'll help you
          choose the best path.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="tel:3173143757"
            className="px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            Call 317-314-3757
          </a>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg border-2 border-black font-semibold hover:bg-gray-50 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
