import { Section } from '../components/ds';

export default function TermsPage() {
  return (
    <main className="bg-white">
      <Section spacing="lg">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
          <p className="text-sm text-slate-600">Last updated: January 10, 2025</p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Agreement to Terms</h2>
          <p>
            By accessing or using the Elevate for Humanity website and services ("Services"), you agree to be 
            bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Eligibility</h2>
          <p>To use our Services and apply to our programs, you must:</p>
          <ul>
            <li>Be at least 18 years of age</li>
            <li>Have the legal capacity to enter into binding agreements</li>
            <li>Provide accurate and complete information during registration and application</li>
            <li>Meet program-specific eligibility requirements (e.g., funding eligibility, background checks)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Program Applications</h2>
          <h3 className="text-xl font-semibold text-slate-900 mt-6">Application Process</h3>
          <p>
            Submitting an application does not guarantee acceptance into a program. All applications are subject 
            to review, funding availability, and partner approval.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6">Accuracy of Information</h3>
          <p>
            You agree to provide truthful, accurate, and complete information in your application. Providing 
            false or misleading information may result in disqualification or termination from programs.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6">Funding and Costs</h3>
          <p>
            Many of our programs are funded through WIOA, WRG, JRI, OJT, or WEX. Funding eligibility is determined 
            by partner organizations (WorkOne, EmployIndy, Indiana DWD). We do not guarantee funding approval.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Services for any unlawful purpose</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with or disrupt the Services or servers</li>
            <li>Attempt to gain unauthorized access to any portion of the Services</li>
            <li>Harass, abuse, or harm other users or staff</li>
            <li>Upload or transmit viruses, malware, or malicious code</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, images, and software, is the property 
            of Elevate for Humanity or its licensors and is protected by copyright and trademark laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or create derivative works from our content without 
            express written permission.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Third-Party Links</h2>
          <p>
            Our Services may contain links to third-party websites (e.g., partner organizations, training providers). 
            We are not responsible for the content, privacy practices, or terms of service of these external sites.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Disclaimers</h2>
          <h3 className="text-xl font-semibold text-slate-900 mt-6">No Guarantees</h3>
          <p>
            We do not guarantee program acceptance, funding approval, job placement, or specific outcomes. 
            Success depends on individual effort, funding availability, and market conditions.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6">Services Provided "As Is"</h3>
          <p>
            Our Services are provided "as is" and "as available" without warranties of any kind, either express 
            or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, 
            or non-infringement.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Elevate for Humanity shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages arising out of or related to your use of the Services.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Elevate for Humanity, its officers, directors, employees, 
            and partners from any claims, damages, losses, or expenses arising from your use of the Services or 
            violation of these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the Services at any time, with or without 
            cause, and with or without notice. Upon termination, your right to use the Services will immediately cease.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Indiana, 
            without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of any material changes by posting 
            the new Terms on this page and updating the "Last updated" date. Your continued use of the Services 
            after changes constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Contact Us</h2>
          <p>If you have questions about these Terms, please contact us:</p>
          <ul>
            <li>Email: <a href="mailto:info@elevateforhumanity.org" className="text-amber-600 hover:text-amber-700">info@elevateforhumanity.org</a></li>
            <li>Phone: <a href="tel:+13173143757" className="text-amber-600 hover:text-amber-700">(317) 314-3757</a></li>
            <li>Address: Indianapolis, IN</li>
          </ul>
        </div>
      </Section>
    </main>
  );
}
