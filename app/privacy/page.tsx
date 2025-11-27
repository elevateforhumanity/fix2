import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Elevate for Humanity",
  description: "Privacy Policy for Elevate for Humanity Career and Training Institute",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-orange-500 hover:text-orange-600">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-600">
          Last Updated: November 27, 2024
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="mb-2">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Date of birth and demographic information</li>
              <li>Educational background and work history</li>
              <li>Program preferences and career goals</li>
              <li>Payment and financial information (processed securely through Stripe)</li>
              <li>Communications with our staff</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Process your application and enrollment</li>
              <li>Provide training and educational services</li>
              <li>Communicate with you about programs and services</li>
              <li>Process payments and manage financial aid</li>
              <li>Connect you with employers and work placements</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Improve our services and website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
            <p className="mb-2">We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Credential Partners:</strong> To facilitate your training (Milady, HSI, Choice Medical, etc.)</li>
              <li><strong>Employers:</strong> With your consent, for work placements and hiring</li>
              <li><strong>Funding Agencies:</strong> To process grants and financial aid (WorkOne, EmployIndy, etc.)</li>
              <li><strong>Service Providers:</strong> Who help us operate our services (payment processors, email providers)</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="mt-2">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure. While we strive to protect 
              your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Cookies and Tracking</h2>
            <p className="mb-2">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Remember your preferences</li>
              <li>Understand how you use our website</li>
              <li>Improve website performance</li>
              <li>Provide personalized content</li>
            </ul>
            <p className="mt-2">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at Elevate4humanityedu@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect personal 
              information from children. If you believe we have collected information from a child, please 
              contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites (credential partners, funding agencies, etc.). 
              We are not responsible for the privacy practices of these external sites. Please review their 
              privacy policies before providing any information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and comply 
              with legal obligations. Student records are maintained according to state and federal education 
              regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes 
              by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-2 space-y-1">
              <p><strong>Elevate for Humanity</strong></p>
              <p>8888 Keystone Crossing Suite 1300</p>
              <p>Indianapolis, IN 46240</p>
              <p>Email: Elevate4humanityedu@gmail.com</p>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-6">
            <p className="text-xs text-slate-500">
              By using Elevate for Humanity services, you acknowledge that you have read and understood 
              this Privacy Policy.
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/terms"
            className="rounded-md bg-orange-400 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-500"
          >
            View Terms of Service
          </Link>
          <Link
            href="/"
            className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
