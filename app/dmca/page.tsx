import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DMCA Policy & Copyright Protection | Elevate For Humanity',
  description: 'Our Digital Millennium Copyright Act (DMCA) policy and procedures for reporting copyright infringement.',
  robots: 'noindex, nofollow', // Don't index legal pages
};

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-white">
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
      </div>
    </div>
  );
}
