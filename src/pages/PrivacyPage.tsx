import { Section } from '../components/ds';

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <Section spacing="lg">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="text-sm text-slate-600">Last updated: January 10, 2025</p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Introduction</h2>
          <p>
            Elevate for Humanity ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Information We Collect</h2>
          <h3 className="text-xl font-semibold text-slate-900 mt-6">Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Apply to our training programs</li>
            <li>Register for an account</li>
            <li>Contact us for support or information</li>
            <li>Subscribe to our newsletter</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name, email address, phone number</li>
            <li>Mailing address, city, county</li>
            <li>Educational background and work experience</li>
            <li>Program preferences and career goals</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-6">Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your program applications and enrollment</li>
            <li>Communicate with you about training opportunities and funding options</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Improve our website and services</li>
            <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
            <li>Comply with legal obligations and reporting requirements</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Partner Organizations:</strong> WorkOne, EmployIndy, Indiana DWD, and other workforce development partners for funding verification and placement coordination</li>
            <li><strong>Training Providers:</strong> Host employers and training sites where you will complete your program</li>
            <li><strong>Service Providers:</strong> Third-party vendors who assist with website hosting, email delivery, and analytics</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
            over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal requirements)</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to improve your experience on our website. 
            You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not knowingly collect personal 
            information from children. If you believe we have collected information from a child, please contact us.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8">Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us:</p>
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
