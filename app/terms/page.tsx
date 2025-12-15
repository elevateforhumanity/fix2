import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/terms',
  },
  title: 'Terms of Use | Elevate For Humanity',
  description: 'Terms of Use for Elevate for Humanity platform and services',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Use</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700 mb-8">
            Last Updated: December 14, 2024
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Platform Ownership
            </h2>
            <p className="text-slate-700 leading-relaxed">
              All content, systems, workflows, and instructional materials on
              this platform are owned and operated by Elevate for Humanity
              unless otherwise stated. Unauthorized use, reproduction, or
              representation of this platform or its components is prohibited.
              Access to the platform does not grant ownership or licensing
              rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Proprietary Systems
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              This website, platform, and all associated training systems,
              workflows, and instructional materials are proprietary to Elevate
              for Humanity. This includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Platform infrastructure and software systems</li>
              <li>Training program structures and curricula</li>
              <li>Enrollment and compliance workflows</li>
              <li>Partner integration systems</li>
              <li>Student management and tracking systems</li>
              <li>All instructional content and materials</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Access and Use
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Access to this platform is limited to authorized participants. By
              using this platform, you agree to use it only for its intended
              purpose of workforce training and career development. You may not:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
              <li>
                Copy, reproduce, or distribute platform content without
                authorization
              </li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Use automated tools to scrape or harvest data</li>
              <li>
                Represent yourself as affiliated with Elevate for Humanity
                without authorization
              </li>
              <li>Use the platform for any unlawful purpose</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-slate-700 leading-relaxed">
              All intellectual property rights in the platform, including
              copyrights, trademarks, trade secrets, and patents, are owned by
              Elevate for Humanity or its licensors. The Elevate for Humanity
              name, logo, and all related marks are trademarks of Elevate for
              Humanity.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              User Accounts
            </h2>
            <p className="text-slate-700 leading-relaxed">
              If you create an account on this platform, you are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account. You agree to
              notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Your use of the platform is also governed by our{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              . By using the platform, you consent to the collection and use of
              your information as described in the Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Disclaimer of Warranties
            </h2>
            <p className="text-slate-700 leading-relaxed">
              The platform is provided "as is" without warranties of any kind,
              either express or implied. Elevate for Humanity does not warrant
              that the platform will be uninterrupted or error-free.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-slate-700 leading-relaxed">
              To the fullest extent permitted by law, Elevate for Humanity shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or related to
              your use of the platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-slate-700 leading-relaxed">
              We reserve the right to modify these Terms of Use at any time.
              Changes will be effective immediately upon posting to the
              platform. Your continued use of the platform after changes are
              posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Governing Law
            </h2>
            <p className="text-slate-700 leading-relaxed">
              These Terms of Use are governed by the laws of the State of
              Indiana, United States, without regard to its conflict of law
              provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Contact Information
            </h2>
            <p className="text-slate-700 leading-relaxed">
              If you have questions about these Terms of Use, please contact us:
            </p>
            <div className="mt-4 text-slate-700">
              <p>
                <strong>Elevate for Humanity</strong>
              </p>
              <p>8888 Keystone Crossing, Suite 1300</p>
              <p>Indianapolis, IN 46240</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:info@elevateforhumanity.org"
                  className="text-blue-600 hover:underline"
                >
                  info@elevateforhumanity.org
                </a>
              </p>
              <p>
                Phone:{' '}
                <a
                  href="tel:317-314-3757"
                  className="text-blue-600 hover:underline"
                >
                  317-314-3757
                </a>
              </p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Elevate for Humanity is a workforce development program of SELFISH
              INC, a 501(c)(3) nonprofit organization.
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/privacy"
            className="text-blue-600 hover:underline font-semibold"
          >
            Privacy Policy
          </Link>
          <Link
            href="/refund-policy"
            className="text-blue-600 hover:underline font-semibold"
          >
            Refund Policy
          </Link>
          <Link
            href="/accessibility"
            className="text-blue-600 hover:underline font-semibold"
          >
            Accessibility
          </Link>
        </div>
      </div>
    </main>
  );
}
