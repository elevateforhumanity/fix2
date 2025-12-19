import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Users, Building2, Globe, Shield, Zap, BarChart } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/platform/licensing',
  },
  title: 'Platform Licensing | Launch Your Own Workforce Hub',
  description:
    'License the Elevate infrastructure to run programs, manage funding, track outcomes, and support learners — without building from scratch.',
};

export default function LicensingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Platform Licensing"
          fill
          className="object-cover brightness-50"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Launch Your Own Workforce & Training Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
            License the Elevate infrastructure to run programs, manage funding, track outcomes, and support learners — without building from scratch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#licensing-tiers"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg font-bold transition-colors"
            >
              View Licensing Options
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-lg text-lg font-bold transition-colors"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* License Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-8 text-gray-900">
            What You're Licensing
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              When you purchase an Elevate platform license, you're buying{' '}
              <strong>deployment rights</strong> to the software, not ownership
              of the source code. Here's what that means:
            </p>

            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <span>
                  You can deploy the platform on your own infrastructure
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <span>You can customize it for your organization's needs</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <span>
                  You can white-label it with your branding (School/Enterprise
                  only)
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <span>
                  You receive updates and support per your license terms
                </span>
              </li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What You Cannot Do
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <span>
                    Resell or redistribute the platform as your own product
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Remove copyright notices or attribution</span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Use it for purposes outside your license scope</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* License Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-12 text-center text-gray-900">
            License Comparison
          </h2>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Right / Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Single
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      School
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Deploy on your domain
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Number of domains
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">1</td>
                    <td className="px-6 py-4 text-center text-gray-600">3</td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      White-label branding
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Remove "Powered by Elevate"
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Source code access
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Modify source code
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Updates & bug fixes
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      1 year
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Lifetime
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Lifetime
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Support level
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Email
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Priority
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Dedicated
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Multi-tenant architecture
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Custom integrations
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Add-on
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Resell as SaaS
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Contact us
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-8 text-gray-900">
            Detailed License Terms
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg md:text-lg font-semibold mb-4 text-gray-900">
                Single License
              </h3>
              <p className="text-gray-700 mb-4">
                {getLicenseDescription('single')}
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Deploy on one production domain</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Unlimited development/staging environments</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>
                    Must display "Powered by Elevate For Humanity" in footer
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>1 year of updates and email support</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg md:text-lg font-semibold mb-4 text-gray-900">
                School / Training Provider License
              </h3>
              <p className="text-gray-700 mb-4">
                {getLicenseDescription('school')}
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Deploy on up to 3 production domains</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>
                    Full white-label rights (remove all Elevate branding)
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Multi-program and multi-instructor support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Lifetime updates and priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Requires approval (EIN, mission verification)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg md:text-lg font-semibold mb-4 text-gray-900">
                Enterprise License
              </h3>
              <p className="text-gray-700 mb-4">
                {getLicenseDescription('enterprise')}
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Unlimited production domains</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>
                    Multi-tenant architecture for serving multiple organizations
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Custom integrations and API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Dedicated account manager and SLA</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Lifetime updates and 24/7 support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-6">
            Questions About Licensing?
          </h2>
          <p className="text-base md:text-lg mb-8 text-blue-100">
            We're here to help you choose the right license for your
            organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Contact Sales
            </Link>
            <Link
              href="/platform"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 border-white"
            >
              View Licenses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
