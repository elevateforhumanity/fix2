import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Elevate for Humanity",
  description: "Terms of Service and User Agreement for Elevate for Humanity Career and Training Institute",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-orange-500 hover:text-orange-600">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-600">
          Last Updated: November 27, 2024
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Elevate for Humanity website and services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p>
              Elevate for Humanity provides workforce training, career development programs, and educational services. 
              We partner with credential providers and employers to deliver training programs in healthcare, trades, 
              technology, and other career pathways.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Conduct</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use our services for any illegal purpose</li>
              <li>Scrape, copy, or reproduce our content without permission</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Impersonate any person or entity</li>
              <li>Upload malicious code or viruses</li>
              <li>Use our content to train AI or machine learning models</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Intellectual Property</h2>
            <p className="mb-2">
              All content on this website, including text, graphics, logos, images, and software, is the property of 
              Elevate for Humanity or our content suppliers and is protected by United States and international copyright laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any 
              of our content without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Partner Relationships</h2>
            <p>
              Elevate for Humanity partners with various credential providers and employers. We are an independent 
              training provider and are not owned by or affiliated with our partners beyond our educational partnerships. 
              All partner names and trademarks are property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Program Enrollment</h2>
            <p className="mb-2">
              Enrollment in our programs is subject to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Completion of application and intake process</li>
              <li>Meeting eligibility requirements</li>
              <li>Availability of funding or payment arrangements</li>
              <li>Acceptance by Elevate for Humanity</li>
            </ul>
            <p className="mt-2">
              We reserve the right to refuse enrollment to any applicant at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Tuition and Payments</h2>
            <p>
              Program costs vary by pathway and funding source. Tuition may be covered by grants (WRG, JRI), 
              employer sponsorship, or student payment. All payment terms will be clearly communicated before enrollment. 
              Refund policies vary by program and funding source.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Student Conduct</h2>
            <p className="mb-2">
              Students are expected to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Attend classes and complete assignments</li>
              <li>Treat staff, instructors, and fellow students with respect</li>
              <li>Follow workplace and safety guidelines</li>
              <li>Maintain professional conduct during work placements</li>
              <li>Comply with partner organization policies</li>
            </ul>
            <p className="mt-2">
              Violation of conduct policies may result in dismissal from the program.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Disclaimer of Warranties</h2>
            <p>
              Our services are provided "as is" without warranties of any kind, either express or implied. 
              We do not guarantee employment outcomes, certification results, or specific career advancement. 
              While we strive to provide high-quality training, individual results may vary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Limitation of Liability</h2>
            <p>
              Elevate for Humanity shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use of our services. Our total liability shall not exceed 
              the amount you paid for the specific program or service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Privacy</h2>
            <p>
              Your use of our services is also governed by our{" "}
              <Link href="/privacy" className="text-orange-500 hover:text-orange-600">
                Privacy Policy
              </Link>
              . Please review it to understand how we collect and use your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective 
              immediately upon posting to this page. Your continued use of our services after changes are posted 
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the 
              State of Indiana, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">14. Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
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
              By using Elevate for Humanity services, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms of Service.
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/privacy"
            className="rounded-md bg-orange-400 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-500"
          >
            View Privacy Policy
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
