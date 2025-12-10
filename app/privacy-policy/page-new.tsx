import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Elevate For Humanity',
  description: 'How we collect, use, and protect your personal information. FERPA compliant student data protection.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="   text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-slate-300">
            Last Updated: December 8, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Elevate for Humanity ("we," "us," or "our") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
                <p className="font-semibold text-blue-900">
                  We are FERPA compliant and follow strict data protection standards to keep your information safe.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12 bg-slate-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className="mb-2"><strong>Elevate for Humanity</strong></p>
              <p className="mb-2">8888 Keystone Crossing, Suite 1300</p>
              <p className="mb-2">Indianapolis, IN 46240</p>
              <p className="mb-2">Phone: (317) 314-3757</p>
              <p className="mb-2">Email: privacy@elevateforhumanity.org</p>
              <p className="mb-2">Website: www.elevateforhumanity.org</p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">1. Information We Collect</h2>
              
              <h3 className="text-2xl font-semibold mb-4">Personal Information You Provide</h3>
              <p className="mb-4">When you apply for our programs or use our services, we collect:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
                <li><strong>Identification:</strong> Date of birth, Social Security Number (for WIOA eligibility)</li>
                <li><strong>Education Records:</strong> Prior education, transcripts, certifications</li>
                <li><strong>Employment Information:</strong> Work history, current employment status, income</li>
                <li><strong>Demographic Information:</strong> Gender, race/ethnicity (optional, for reporting)</li>
                <li><strong>Financial Information:</strong> Bank account details (for stipend payments)</li>
                <li><strong>Health Information:</strong> Disability status (optional, for accommodations)</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, navigation paths</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
                <li><strong>Location Data:</strong> General location based on IP address</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">2. How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your application and enrollment</li>
                <li>Determine WIOA eligibility and secure funding</li>
                <li>Provide training and educational services</li>
                <li>Track your progress and issue certifications</li>
                <li>Process stipend and support service payments</li>
                <li>Communicate with you about your program</li>
                <li>Provide career counseling and job placement</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our programs and services</li>
                <li>Generate aggregate reports (anonymized data)</li>
              </ul>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">3. Third-Party Services We Use</h2>
              <p className="mb-4">We share your information with trusted third-party service providers:</p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold">Supabase (Database Hosting)</h4>
                  <p className="text-slate-600">Stores student records securely with encryption</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold">Vercel (Website Hosting)</h4>
                  <p className="text-slate-600">Hosts our website and application</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold">Stripe (Payment Processing)</h4>
                  <p className="text-slate-600">Processes stipend payments securely</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold">Google Analytics</h4>
                  <p className="text-slate-600">Analyzes website usage (anonymized)</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold">SendGrid (Email Service)</h4>
                  <p className="text-slate-600">Sends program communications</p>
                </div>
              </div>
              
              <p className="mt-6 text-sm text-slate-600">
                All third-party providers are required to maintain the confidentiality and security of your information 
                and may only use it for the purposes we specify.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">4. How Long We Keep Your Data</h2>
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-3 text-left">Data Type</th>
                    <th className="border border-slate-300 p-3 text-left">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-3">Transcripts & Certificates</td>
                    <td className="border border-slate-300 p-3">Permanent</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3">Grades & Attendance</td>
                    <td className="border border-slate-300 p-3">Permanent</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3">Financial Records</td>
                    <td className="border border-slate-300 p-3">7 years</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3">Application Materials</td>
                    <td className="border border-slate-300 p-3">7 years</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3">Audit Logs</td>
                    <td className="border border-slate-300 p-3">7 years</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3">Marketing Data</td>
                    <td className="border border-slate-300 p-3">Until you opt-out</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">5. Your Privacy Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correct:</strong> Request correction of inaccurate information</li>
                <li><strong>Delete:</strong> Request deletion of your information (with exceptions)</li>
                <li><strong>Export:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restrict:</strong> Limit how we use your information</li>
                <li><strong>Object:</strong> Object to certain uses of your information</li>
                <li><strong>Complain:</strong> File a complaint with supervisory authorities</li>
              </ul>
              
              <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
                <p className="font-semibold text-green-900 mb-2">To Exercise Your Rights:</p>
                <p>Email: privacy@elevateforhumanity.org</p>
                <p>Phone: (317) 314-3757</p>
                <p className="text-sm mt-2">We will respond within 30 days</p>
              </div>
            </div>

            {/* FERPA Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">6. FERPA Rights (Student Records)</h2>
              <p className="mb-4">Under the Family Educational Rights and Privacy Act (FERPA), students have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Inspect and review their education records within 45 days</li>
                <li>Request amendment of records believed to be inaccurate</li>
                <li>Consent to disclosures of personally identifiable information</li>
                <li>File a complaint with the U.S. Department of Education</li>
              </ul>
              
              <p className="mt-4 text-sm text-slate-600">
                <strong>File FERPA Complaints:</strong><br />
                Family Policy Compliance Office<br />
                U.S. Department of Education<br />
                400 Maryland Avenue, SW<br />
                Washington, DC 20202-8520
              </p>
            </div>

            {/* Security */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">7. How We Protect Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Encryption:</strong> All data encrypted at rest (AES-256) and in transit (TLS 1.3)</li>
                <li><strong>Access Controls:</strong> Role-based access with least privilege principle</li>
                <li><strong>Authentication:</strong> Strong passwords, MFA available, session management</li>
                <li><strong>Monitoring:</strong> 24/7 security monitoring and audit logging</li>
                <li><strong>Backups:</strong> Regular encrypted backups with disaster recovery</li>
                <li><strong>Training:</strong> All staff trained on FERPA and data protection</li>
                <li><strong>Audits:</strong> Regular security audits and vulnerability scanning</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">8. Cookies and Tracking</h2>
              <p className="mb-4">We use cookies for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for site functionality (cannot be disabled)</li>
                <li><strong>Analytics Cookies:</strong> Google Analytics to understand site usage</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="mt-4">
                <Link href="/cookie-policy" className="text-orange-600 hover:text-orange-700 font-semibold">
                  View our Cookie Policy →
                </Link>
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">9. Children's Privacy</h2>
              <p>
                Our services are intended for individuals 18 years or older. If you are under 18, you must have 
                parental consent to use our services. We comply with COPPA (Children's Online Privacy Protection Act) 
                and obtain verifiable parental consent before collecting information from minors.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Posting the new policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending you an email notification (for significant changes)</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="mb-12 bg-orange-50 border-l-4 border-orange-600 p-6">
              <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
              <p className="mb-4">Contact our Privacy Officer:</p>
              <p className="mb-2"><strong>Email:</strong> privacy@elevateforhumanity.org</p>
              <p className="mb-2"><strong>Phone:</strong> (317) 314-3757</p>
              <p className="mb-2"><strong>Mail:</strong> 8888 Keystone Crossing, Suite 1300, Indianapolis, IN 46240</p>
            </div>

            {/* Related Pages */}
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <Link href="/terms-of-service" className="block p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <h3 className="font-bold text-lg mb-2">Terms of Service</h3>
                <p className="text-sm text-slate-600">Our terms and conditions</p>
              </Link>
              <Link href="/cookie-policy" className="block p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <h3 className="font-bold text-lg mb-2">Cookie Policy</h3>
                <p className="text-sm text-slate-600">How we use cookies</p>
              </Link>
              <Link href="/data-protection" className="block p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <h3 className="font-bold text-lg mb-2">Data Protection</h3>
                <p className="text-sm text-slate-600">How we protect your data</p>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
