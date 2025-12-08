import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'DMCA Policy & Copyright Protection | Elevate For Humanity',
  description: 'Our Digital Millennium Copyright Act (DMCA) policy and procedures for reporting copyright infringement.',
  robots: 'noindex, nofollow', // Don't index legal pages
};

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Dmca"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Dmca
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Copyright Notice - Visible on every page */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-sm">
        <p>
          © 2024 Elevate for Humanity. All Rights Reserved. | 
          <span className="font-bold"> Original Content - Do Not Copy</span> | 
          Protected by U.S. Copyright Law
        </p>
      </div>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">DMCA Policy & Copyright Protection</h1>

          {/* Copyright Notice */}
          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-12">
            <h2 className="text-2xl font-bold text-red-900 mb-4">⚠️ Copyright Notice</h2>
            <p className="text-red-800 mb-4">
              <strong>ALL CONTENT ON THIS WEBSITE IS PROTECTED BY U.S. COPYRIGHT LAW.</strong>
            </p>
            <p className="text-red-800">
              This includes but is not limited to: text, images, graphics, logos, program descriptions, 
              curriculum materials, training content, website design, code, and all other materials.
            </p>
          </div>

          {/* Ownership */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Copyright Ownership</h2>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="mb-4">
                <strong>Copyright Owner:</strong> Elevate for Humanity Career & Technical Institute
              </p>
              <p className="mb-4">
                <strong>Registration:</strong> U.S. Copyright Office (Registration Pending)
              </p>
              <p className="mb-4">
                <strong>Effective Date:</strong> January 1, 2023
              </p>
              <p className="mb-4">
                <strong>Jurisdiction:</strong> United States of America
              </p>
              <p>
                <strong>Designated Agent:</strong> Elizabeth L. Greene, Founder & CEO
              </p>
            </div>
          </div>

          {/* What's Protected */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Protected Materials</h2>
            <p className="mb-4">The following materials are protected by copyright and may NOT be copied:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Program Descriptions:</strong> All 28+ training program descriptions, curricula, and outcomes</li>
              <li><strong>Website Content:</strong> All text, articles, blog posts, and written materials</li>
              <li><strong>Images & Graphics:</strong> All photographs, illustrations, logos, and visual designs</li>
              <li><strong>Training Materials:</strong> Course content, lesson plans, assessments, and educational resources</li>
              <li><strong>Website Design:</strong> Layout, structure, color schemes, and user interface</li>
              <li><strong>Source Code:</strong> All website code, scripts, and technical implementations</li>
              <li><strong>Branding:</strong> "Elevate for Humanity" name, logo, taglines, and brand identity</li>
              <li><strong>Partnership Materials:</strong> MOU templates, agreements, and partnership documents</li>
              <li><strong>Student Materials:</strong> Handbooks, forms, certificates, and student-facing documents</li>
            </ul>
          </div>

          {/* Unique Identifiers */}
          <div className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">🔒 Unique Identifiers</h2>
            <p className="text-blue-800 mb-4">
              Our content contains unique identifiers and watermarks that allow us to track unauthorized use:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li>Digital watermarks in images</li>
              <li>Unique text patterns and phrasing</li>
              <li>Proprietary program structures</li>
              <li>Specific WIOA approval numbers</li>
              <li>Partner-specific language and agreements</li>
            </ul>
          </div>

          {/* DMCA Takedown */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">DMCA Takedown Procedure</h2>
            <p className="mb-4">
              If you believe your copyrighted work has been copied in a way that constitutes copyright infringement, 
              or if you believe content on our site infringes your copyright, please provide our Copyright Agent 
              with the following information:
            </p>
            
            <div className="bg-slate-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">Required Information:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>A physical or electronic signature of the copyright owner or authorized agent</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing</li>
                <li>Contact information (address, telephone number, email)</li>
                <li>A statement of good faith belief that use is not authorized</li>
                <li>A statement that the information is accurate and you are authorized to act</li>
              </ol>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6">
              <h3 className="text-xl font-bold mb-4">Send DMCA Notices To:</h3>
              <p className="mb-2"><strong>Copyright Agent:</strong> Elizabeth L. Greene</p>
              <p className="mb-2"><strong>Email:</strong> dmca@elevateforhumanity.org</p>
              <p className="mb-2"><strong>Mail:</strong> 8888 Keystone Crossing, Suite 1300, Indianapolis, IN 46240</p>
              <p className="mb-2"><strong>Phone:</strong> (317) 314-3757</p>
            </div>
          </div>

          {/* Penalties */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Penalties for Infringement</h2>
            <div className="bg-red-50 border-l-4 border-red-600 p-6">
              <p className="text-red-800 mb-4">
                <strong>Copyright infringement is a serious offense under U.S. law.</strong>
              </p>
              <p className="text-red-800 mb-4">
                Violators may be subject to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-red-800">
                <li><strong>Statutory Damages:</strong> $750 to $30,000 per work infringed</li>
                <li><strong>Willful Infringement:</strong> Up to $150,000 per work</li>
                <li><strong>Attorney's Fees:</strong> Infringer pays our legal costs</li>
                <li><strong>Injunctive Relief:</strong> Court orders to cease infringement</li>
                <li><strong>Criminal Penalties:</strong> Up to 5 years imprisonment for willful infringement</li>
              </ul>
            </div>
          </div>

          {/* Permitted Uses */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Permitted Uses</h2>
            <p className="mb-4">You MAY:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>View our website for personal, non-commercial use</li>
              <li>Share links to our pages on social media</li>
              <li>Quote brief excerpts with proper attribution and link back</li>
              <li>Print pages for your personal reference</li>
            </ul>

            <p className="mb-4">You MAY NOT:</p>
            <ul className="list-disc pl-6 space-y-2 text-red-600 font-semibold">
              <li>Copy our program descriptions or curriculum</li>
              <li>Use our images, graphics, or logos</li>
              <li>Reproduce our website design or layout</li>
              <li>Scrape or harvest our content</li>
              <li>Create derivative works based on our content</li>
              <li>Use our content for commercial purposes</li>
              <li>Remove copyright notices or attributions</li>
            </ul>
          </div>

          {/* Monitoring */}
          <div className="mb-12 bg-yellow-50 border-l-4 border-yellow-600 p-6">
            <h2 className="text-2xl font-bold text-yellow-900 mb-4">🔍 Active Monitoring</h2>
            <p className="text-yellow-800 mb-4">
              We actively monitor for unauthorized use of our content using:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-yellow-800">
              <li>Automated plagiarism detection tools</li>
              <li>Google Alerts for our unique content</li>
              <li>Reverse image search</li>
              <li>Legal monitoring services</li>
              <li>Industry partner reports</li>
            </ul>
            <p className="text-yellow-800 mt-4 font-semibold">
              We WILL pursue legal action against infringers.
            </p>
          </div>

          {/* Trademark */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Trademark Protection</h2>
            <p className="mb-4">
              The following are trademarks of Elevate for Humanity:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>"Elevate for Humanity"</strong> - Our company name</li>
              <li><strong>EFH Logo</strong> - Our visual brand identity</li>
              <li><strong>"100% Funded Career Training"</strong> - Our tagline</li>
              <li><strong>"Earn While You Learn"</strong> - Our program description</li>
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Trademark Registration: Pending with U.S. Patent and Trademark Office
            </p>
          </div>

          {/* Contact */}
          <div className="bg-slate-900 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Questions About Copyright?</h2>
            <p className="mb-4">
              If you have questions about using our content or want to request permission:
            </p>
            <p className="mb-2"><strong>Email:</strong> legal@elevateforhumanity.org</p>
            <p className="mb-2"><strong>Phone:</strong> (317) 314-3757</p>
            <p className="text-sm text-slate-400 mt-4">
              We respond to all inquiries within 2 business days.
            </p>
          </div>

          {/* Related Pages */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <Link href="/terms-of-service" className="block p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <h3 className="font-bold text-lg mb-2">Terms of Service</h3>
              <p className="text-sm text-slate-600">Our terms and conditions</p>
            </Link>
            <Link href="/privacy-policy" className="block p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <h3 className="font-bold text-lg mb-2">Privacy Policy</h3>
              <p className="text-sm text-slate-600">How we protect your data</p>
            </Link>
            <Link href="/intellectual-property" className="block p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <h3 className="font-bold text-lg mb-2">IP Protection</h3>
              <p className="text-sm text-slate-600">Our intellectual property rights</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Copyright */}
      <div className="bg-slate-900 text-white py-8 px-4 text-center">
        <p className="text-sm mb-2">
          © 2024 Elevate for Humanity Career & Technical Institute. All Rights Reserved.
        </p>
        <p className="text-xs text-slate-400">
          Protected by U.S. Copyright Law (17 U.S.C. § 101 et seq.) | 
          Unauthorized reproduction is prohibited and will be prosecuted.
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Original Content ID: EFH-2024-{Date.now().toString(36).toUpperCase()} | 
          This page contains unique identifiers for copyright tracking.
        </p>
      
      {/* Storytelling Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Your Journey Starts Here
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Every great career begins with a single step. Whether you're looking to change careers, 
                  upgrade your skills, or enter the workforce for the first time, we're here to help you succeed. 
                  Our programs are 100% free, government-funded, and designed to get you hired fast.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">100% free training - no tuition, no hidden costs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Industry-recognized certifications that employers value</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Job placement assistance and career support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Flexible scheduling for working adults</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="Students learning"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands who have launched successful careers through our free training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg shadow-2xl transition-all"
              >
                Browse All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
