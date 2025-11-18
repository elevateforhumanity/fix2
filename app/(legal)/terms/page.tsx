// app/(legal)/terms/page.tsx
export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-4 text-3xl font-bold">Terms of Service</h1>
        <p className="mb-4 text-sm text-slate-500">
          Last updated: November 18, 2025
        </p>
        
        <div className="prose prose-slate max-w-none">
          <p className="mb-4">
            These Terms of Service ("Terms") govern your access to and use of the
            Elevate for Humanity platform, including all associated websites,
            applications, and services (collectively, the "Services").
          </p>

          <h2 className="mt-6 text-xl font-semibold">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using the Services, you agree to be bound by these
            Terms and all applicable laws and regulations. If you do not agree with
            any part of these Terms, you may not access the Services.
          </p>

          <h2 className="mt-6 text-xl font-semibold">2. Use of the Services</h2>
          <p className="mb-4">
            You agree to use the Services only for lawful purposes and in
            accordance with these Terms, including all workforce, training, and
            educational activities made available through the platform.
          </p>

          <h3 className="mt-4 text-lg font-semibold">2.1 Eligibility</h3>
          <p className="mb-4">
            You must be at least 18 years old to use the Services. By using the
            Services, you represent and warrant that you meet this age requirement.
          </p>

          <h3 className="mt-4 text-lg font-semibold">2.2 Account Registration</h3>
          <p className="mb-4">
            To access certain features of the Services, you may be required to
            register for an account. You agree to provide accurate, current, and
            complete information during the registration process and to update such
            information to keep it accurate, current, and complete.
          </p>

          <h2 className="mt-6 text-xl font-semibold">3. Accounts and Security</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your login
            credentials and for all activities that occur under your account. You
            agree to immediately notify us of any unauthorized use of your account
            or any other breach of security.
          </p>

          <h2 className="mt-6 text-xl font-semibold">4. Data and Privacy</h2>
          <p className="mb-4">
            Our collection and use of personal information is described in our
            Privacy Policy. By using the Services, you consent to such collection
            and use, including the transfer of this information to the United States
            and/or other countries for storage, processing, and use by Elevate for
            Humanity and its affiliates.
          </p>

          <h2 className="mt-6 text-xl font-semibold">5. Intellectual Property</h2>
          <p className="mb-4">
            The Services and their entire contents, features, and functionality
            (including but not limited to all information, software, text, displays,
            images, video, and audio, and the design, selection, and arrangement
            thereof) are owned by Elevate for Humanity, its licensors, or other
            providers of such material and are protected by United States and
            international copyright, trademark, patent, trade secret, and other
            intellectual property or proprietary rights laws.
          </p>

          <h2 className="mt-6 text-xl font-semibold">6. Prohibited Uses</h2>
          <p className="mb-4">You may not use the Services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
            <li>To impersonate or attempt to impersonate Elevate for Humanity, an employee, another user, or any other person or entity</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold">7. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and bar access to the Services
            immediately, without prior notice or liability, under our sole
            discretion, for any reason whatsoever and without limitation, including
            but not limited to a breach of the Terms.
          </p>

          <h2 className="mt-6 text-xl font-semibold">8. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall Elevate for Humanity, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential, or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or inability
            to access or use the Services.
          </p>

          <h2 className="mt-6 text-xl font-semibold">9. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these
            Terms at any time. If a revision is material, we will provide at least
            30 days' notice prior to any new terms taking effect. What constitutes a
            material change will be determined at our sole discretion.
          </p>

          <h2 className="mt-6 text-xl font-semibold">10. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mb-4">
            <strong>Elevate for Humanity</strong><br />
            Email: legal@elevateforhumanity.org<br />
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
    </main>
  );
}
