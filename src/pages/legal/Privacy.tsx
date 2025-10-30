// =============================
// File: src/pages/legal/Privacy.tsx
// Description: Privacy Policy page
// Route: /legal/privacy
// =============================
export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        Privacy Policy
      </h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-brand-text-muted mb-4">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>
        <h2>Introduction</h2>
        <p>
          Elevate for Humanity ("EFH", "we", "us", or "our") is committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our
          learning management platform.
        </p>
        <h2>Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Name, email address, and contact information</li>
          <li>Account credentials (encrypted passwords)</li>
          <li>Profile information and preferences</li>
          <li>Payment information (processed securely through Stripe)</li>
        </ul>
        <h3>Learning Data</h3>
        <ul>
          <li>Course enrollments and progress</li>
          <li>Quiz responses and grades</li>
          <li>Certificates earned</li>
          <li>Learning activity and engagement metrics</li>
        </ul>
        <h3>Technical Information</h3>
        <ul>
          <li>IP address and browser information</li>
          <li>Device information and operating system</li>
          <li>Usage data and analytics</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>Provide and maintain our educational services</li>
          <li>Process enrollments and payments</li>
          <li>Track learning progress and issue certificates</li>
          <li>Communicate with you about courses and updates</li>
          <li>Improve our platform and user experience</li>
          <li>Comply with legal obligations</li>
        </ul>
        <h2>Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share information
          with:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> Supabase (database), Stripe
            (payments), Netlify (hosting)
          </li>
          <li>
            <strong>Instructors:</strong> Limited student data for course
            management
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by law or to
            protect our rights
          </li>
        </ul>
        <h2>Data Security</h2>
        <p>
          We implement industry-standard security measures including encryption,
          secure authentication, and regular security audits. However, no method
          of transmission over the Internet is 100% secure.
        </p>
        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Export your learning data</li>
        </ul>
        <h2>Cookies</h2>
        <p>
          We use cookies and similar technologies to maintain your session,
          remember preferences, and analyze site usage. You can control cookies
          through your browser settings.
        </p>
        <h2>Children's Privacy</h2>
        <p>
          Our platform is not intended for children under 13. We do not
          knowingly collect information from children under 13. If you believe
          we have collected such information, please contact us.
        </p>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of significant changes by posting the new policy on this page and
          updating the "Last Updated" date.
        </p>
        <h2>Contact Us</h2>
        <p>For privacy-related questions or requests, contact us at:</p>
        <p>
          Elevate for Humanity
          <br />
          9465 Counselors Row, Suite 200
          <br />
          Indianapolis, IN 46240
          <br />
          Email:{' '}
          <a href="mailto:privacy@elevateforhumanity.org">
            privacy@elevateforhumanity.org
          </a>
          <br />
          Phone: <a href="tel:+13173143757">(317) 314-3757</a>
        </p>
      </div>
    </main>
  );
}
