import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/terms-of-service",
  },
  title: 'Terms of Service | Elevate For Humanity',
  description: 'Terms of Service and intellectual property rights for Elevate For Humanity Career & Technical Institute.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-slate-300">
              Last Updated: December 8, 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Elevate For Humanity Career & Technical Institute website 
              (www.elevateforhumanity.org), you agree to be bound by these Terms of Service and all 
              applicable laws and regulations.
            </p>

            <h2>2. Intellectual Property Rights</h2>
            <p>
              <strong>All content on this website is protected by U.S. Copyright Law.</strong>
            </p>
            <ul>
              <li>
                <strong>Copyright Ownership:</strong> All content, including but not limited to text, 
                graphics, logos, images, audio clips, video clips, digital downloads, data compilations, 
                software, curriculum materials, course descriptions, and program information is the 
                property of Elevate For Humanity Career & Technical Institute or its content suppliers 
                and is protected by United States and international copyright laws.
              </li>
              <li>
                <strong>Trademark Rights:</strong> "Elevate For Humanity," the Elevate For Humanity logo, 
                and all related names, logos, product and service names, designs, and slogans are 
                trademarks of Elevate For Humanity Career & Technical Institute.
              </li>
              <li>
                <strong>Platform Technology:</strong> The website platform, including its design, 
                architecture, user interface, and underlying code, is proprietary and protected by 
                copyright and trade secret laws.
              </li>
            </ul>

            <h2>3. Prohibited Uses</h2>
            <p>You may not:</p>
            <ul>
              <li>Copy, reproduce, distribute, or create derivative works from any content on this website without express written permission</li>
              <li>Use automated systems (bots, scrapers, crawlers) to access or collect data from this website</li>
              <li>Reverse engineer, decompile, or disassemble any software or technology used on this website</li>
              <li>Remove, alter, or obscure any copyright, trademark, or other proprietary notices</li>
              <li>Use content for AI training, machine learning, or large language model development</li>
              <li>Frame or mirror any part of this website without prior written authorization</li>
              <li>Use this website to compete with Elevate For Humanity or create a similar service</li>
            </ul>

            <h2>4. AI and Machine Learning Restrictions</h2>
            <p>
              <strong>Explicit Prohibition:</strong> The use of any content from this website for training 
              artificial intelligence systems, machine learning models, large language models (LLMs), or 
              any automated content generation systems is strictly prohibited without express written 
              permission from Elevate For Humanity.
            </p>

            <h2>5. User Accounts and Access</h2>
            <ul>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You may not share your account with others or allow unauthorized access</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
            </ul>

            <h2>6. Student Data and Privacy</h2>
            <p>
              We comply with FERPA (Family Educational Rights and Privacy Act) and other applicable 
              privacy laws. See our <Link href="/privacy-policy" className="text-orange-600 hover:text-orange-700">Privacy Policy</Link> for details.
            </p>

            <h2>7. DMCA Compliance</h2>
            <p>
              We respect intellectual property rights and expect users to do the same. If you believe 
              your copyrighted work has been infringed, please see our{' '}
              <Link href="/dmca" className="text-orange-600 hover:text-orange-700">DMCA Policy</Link>.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              Elevate For Humanity Career & Technical Institute shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages resulting from your use of or 
              inability to use the website or services.
            </p>

            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Elevate For Humanity, its officers, directors, 
              employees, and agents from any claims, damages, losses, liabilities, and expenses 
              (including legal fees) arising from your violation of these Terms of Service.
            </p>

            <h2>10. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be 
              effective immediately upon posting. Your continued use of the website constitutes 
              acceptance of modified terms.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of the State of Indiana, United States, 
              without regard to its conflict of law provisions.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 not-prose">
              <p className="font-semibold mb-2">Elevate For Humanity Career & Technical Institute</p>
              <p>8888 Keystone Crossing Suite 1300</p>
              <p>Indianapolis, IN 46240</p>
              <p className="mt-2">Email: <a href="mailto:legal@elevateforhumanity.org" className="text-orange-600 hover:text-orange-700">legal@elevateforhumanity.org</a></p>
              <p>Phone: <a href="tel:+13173143757" className="text-orange-600 hover:text-orange-700">(317) 314-3757</a></p>
            </div>

            <div className="mt-12 p-6 bg-orange-50 border-l-4 border-orange-600 rounded">
              <p className="font-semibold text-orange-900 mb-2">Copyright Notice</p>
              <p className="text-sm text-orange-800">
                © {new Date().getFullYear()} Elevate For Humanity Career & Technical Institute. 
                All rights reserved. Unauthorized reproduction, modification, distribution, or use 
                of any content from this website is strictly prohibited and may result in civil and 
                criminal penalties.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/" 
                className="inline-block px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
