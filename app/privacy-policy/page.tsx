import { Metadata } from 'next';

import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/privacy-policy',
  },
  title: 'Privacy Policy | Elevate For Humanity',
  description:
    'Privacy Policy for Elevate for Humanity. Learn how we collect, use, and protect your personal information.',
};

export default async function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Privacy Policy"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100">
            How we collect, use, and protect your personal information
          </p>
          <p className="text-sm text-gray-200">
            Last Updated: January 1, 2026
          </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
                
                <p className="text-gray-600 mb-8">
                  <strong>Effective Date:</strong> January 1, 2026<br />
                  <strong>Last Updated:</strong> January 1, 2026
                </p>

                <p className="mb-6">
                  Elevate for Humanity ("we," "us," or "our") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website elevateforhumanity.org and use our services.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h3>
                
                <h4 className="text-xl font-semibold mt-6 mb-3">Personal Information</h4>
                <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Register for an account</li>
                  <li>Apply for training programs</li>
                  <li>Contact us for support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p className="mb-6">This information may include:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Name, email address, phone number</li>
                  <li>Mailing address</li>
                  <li>Date of birth</li>
                  <li>Employment history and education background</li>
                  <li>Social Security Number (for WIOA eligibility verification)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>

                <h4 className="text-xl font-semibold mt-6 mb-3">Automatically Collected Information</h4>
                <p className="mb-4">When you visit our website, we automatically collect certain information about your device, including:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website</li>
                  <li>Device identifiers</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h3>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Process your applications and enrollments</li>
                  <li>Provide training and educational services</li>
                  <li>Communicate with you about programs, events, and updates</li>
                  <li>Verify WIOA eligibility and process funding</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">3. Information Sharing and Disclosure</h3>
                <p className="mb-4">We may share your information with:</p>
                
                <h4 className="text-xl font-semibold mt-6 mb-3">Service Providers</h4>
                <p className="mb-6">
                  Third-party vendors who perform services on our behalf, including payment processing, 
                  data analysis, email delivery, hosting services, and customer service.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">Government Agencies</h4>
                <p className="mb-6">
                  WIOA administrators, WorkOne Indiana, and other government entities as required for 
                  program eligibility verification and compliance.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">Employer Partners</h4>
                <p className="mb-6">
                  With your consent, we may share your information with employer partners for job 
                  placement and apprenticeship opportunities.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">Legal Requirements</h4>
                <p className="mb-6">
                  When required by law, court order, or government regulation, or to protect our rights, 
                  property, or safety.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">4. Cookies and Tracking Technologies</h3>
                <p className="mb-4">We use cookies and similar tracking technologies to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Understand how you use our website</li>
                  <li>Improve website performance</li>
                  <li>Deliver targeted advertising</li>
                </ul>
                <p className="mb-6">
                  You can control cookies through your browser settings. However, disabling cookies may 
                  limit your ability to use certain features of our website.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">Third-Party Analytics</h4>
                <p className="mb-6">
                  We use Google Analytics and Facebook Pixel to analyze website traffic and user behavior. 
                  These services may collect information about your online activities over time and across 
                  different websites.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h3>
                <p className="mb-6">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the Internet or electronic storage is 100% secure.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">6. Your Rights and Choices</h3>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a machine-readable format</li>
                </ul>
                <p className="mb-6">
                  To exercise these rights, contact us at elevate4humanityedu@gmail.com
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">7. Children's Privacy</h3>
                <p className="mb-6">
                  Our services are not directed to individuals under 16 years of age. We do not knowingly 
                  collect personal information from children under 16. If you believe we have collected 
                  information from a child under 16, please contact us immediately.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">8. California Privacy Rights</h3>
                <p className="mb-6">
                  California residents have additional rights under the California Consumer Privacy Act (CCPA), 
                  including the right to know what personal information is collected, the right to delete 
                  personal information, and the right to opt-out of the sale of personal information. 
                  We do not sell personal information.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">9. Changes to This Privacy Policy</h3>
                <p className="mb-6">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h3>
                <p className="mb-4">
                  If you have questions or concerns about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <p className="mb-2"><strong>Elevate for Humanity</strong></p>
                  <p className="mb-2">Indianapolis, IN</p>
                  <p className="mb-2">Email: elevate4humanityedu@gmail.com</p>
                  <p className="mb-2">Phone: (317) 800-1234</p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    By using our website and services, you acknowledge that you have read and understood 
                    this Privacy Policy and agree to its terms.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h3>
              <p className="text-gray-600 mb-6">
                We're here to help. Contact us anytime with privacy-related questions or concerns.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>100% free training programs</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Industry-standard certifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Career support and job placement</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/artlist/hero-training-2.jpg"
                  alt="Privacy Policy"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Learn</h3>
                <p className="text-gray-600">
                  Access quality training programs
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Certify</h3>
                <p className="text-gray-600">Earn industry certifications</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Work</h3>
                <p className="text-gray-600">Get hired in your field</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Join thousands who have launched successful careers through our
              programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white text-lg"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
