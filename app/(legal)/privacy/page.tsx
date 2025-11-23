// app/(legal)/privacy/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Your Data Protection Rights",
  description: "Read our privacy policy to understand how Elevate for Humanity collects, uses, and protects your personal information. GDPR compliant.",
  keywords: ["privacy policy", "data protection", "GDPR", "personal information", "user privacy"],
  openGraph: {
    title: "Privacy Policy | Elevate for Humanity",
    description: "Understand how we collect, use, and protect your personal information. GDPR compliant.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-4 text-sm text-slate-500">
          Last updated: November 18, 2025
        </p>
        
        <div className="prose prose-slate max-w-none">
          <p className="mb-4">
            This Privacy Policy explains how Elevate for Humanity ("we", "us",
            "our") collects, uses, and protects information about users of our
            workforce training and education platform.
          </p>
          <h2 className="mt-6 text-xl font-semibold">1. Information We Collect</h2>
          
          <h3 className="mt-4 text-lg font-semibold">1.1 Information You Provide</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Account Information:</strong> Name, email address, phone number, date of birth</li>
            <li><strong>Profile Information:</strong> Educational background, work history, skills, certifications</li>
            <li><strong>Training Data:</strong> Course enrollments, progress, completion status, grades, assessments</li>
            <li><strong>Employment Information:</strong> Employer details, job placements, apprenticeship records</li>
            <li><strong>Payment Information:</strong> Billing address and payment method details (processed securely through third-party providers)</li>
          </ul>
          <h3 className="mt-4 text-lg font-semibold">1.2 Information We Collect Automatically</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Usage Data:</strong> Pages visited, features used, time spent, click patterns</li>
            <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
            <li><strong>Log Data:</strong> Access times, error logs, performance data</li>
            <li><strong>Cookies and Similar Technologies:</strong> See our Cookie Policy for details</li>
          </ul>
          <h2 className="mt-6 text-xl font-semibold">2. How We Use Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve the Services</li>
            <li>Process enrollments and track training progress</li>
            <li>Facilitate job placements and apprenticeships</li>
            <li>Communicate with you about your account and training</li>
            <li>Comply with workforce development regulations (WIOA, DOL, DWD)</li>
            <li>Generate reports for funding agencies and partners</li>
            <li>Detect, prevent, and address technical issues and security threats</li>
            <li>Analyze usage patterns to improve user experience</li>
          </ul>
          <h2 className="mt-6 text-xl font-semibold">3. Information Sharing</h2>
          <p className="mb-4">We may share your information with:</p>
          
          <h3 className="mt-4 text-lg font-semibold">3.1 Workforce Partners</h3>
          <p className="mb-4">
            We share training and employment data with workforce development boards,
            referring agencies and workforce partners, and employers as necessary to
            facilitate your training and job placement.
          </p>
          <h3 className="mt-4 text-lg font-semibold">3.2 Training Providers</h3>
          <p className="mb-4">
            We share enrollment and progress information with our partner training
            institutions and instructors.
          </p>
          <h3 className="mt-4 text-lg font-semibold">3.3 Government Agencies</h3>
          <p className="mb-4">
            We report training outcomes to the Department of Labor (DOL), Department
            of Workforce Development (DWD), and other agencies as required by law or
            funding agreements.
          </p>
          <h3 className="mt-4 text-lg font-semibold">3.4 Service Providers</h3>
          <p className="mb-4">
            We use third-party service providers for hosting, analytics, payment
            processing, and other operational needs. These providers are
            contractually obligated to protect your information.
          </p>
          <h2 className="mt-6 text-xl font-semibold">4. Legal Basis for Processing (GDPR)</h2>
          <p className="mb-4">
            For users in the European Economic Area, our legal bases for processing
            personal data include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Contract:</strong> Processing necessary to provide the Services</li>
            <li><strong>Consent:</strong> Where you have given explicit consent</li>
            <li><strong>Legal Obligation:</strong> Compliance with workforce development regulations</li>
            <li><strong>Legitimate Interests:</strong> Improving services, security, and fraud prevention</li>
          </ul>
          <h2 className="mt-6 text-xl font-semibold">5. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
            <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
            <li><strong>Object:</strong> Object to certain processing activities</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, contact us at privacy@elevateforhumanity.org.
          </p>
          <h2 className="mt-6 text-xl font-semibold">6. Data Security</h2>
          <p className="mb-4">
            We implement technical and organizational measures to protect your
            information, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Encryption of data in transit and at rest</li>
            <li>Access controls and authentication requirements</li>
            <li>Regular security audits and penetration testing</li>
            <li>Audit logging of all administrative actions</li>
            <li>Employee training on data protection</li>
          </ul>
          <h2 className="mt-6 text-xl font-semibold">7. FERPA Compliance</h2>
          <p className="mb-4">
            When handling student education records on behalf of educational
            institutions, we act as a "school official" under the Family Educational
            Rights and Privacy Act (FERPA) and comply with all applicable
            requirements.
          </p>
          <h2 className="mt-6 text-xl font-semibold">8. Data Retention</h2>
          <p className="mb-4">
            We retain your information for as long as necessary to provide the
            Services and comply with legal obligations. Training records may be
            retained for up to 7 years as required by workforce development
            regulations.
          </p>
          <h2 className="mt-6 text-xl font-semibold">9. Children's Privacy</h2>
          <p className="mb-4">
            Our Services are not directed to individuals under 18. We do not
            knowingly collect personal information from children under 18.
          </p>
          <h2 className="mt-6 text-xl font-semibold">10. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you
            of material changes by posting the new policy on this page and updating
            the "Last updated" date.
          </p>
          <h2 className="mt-6 text-xl font-semibold">11. Contact Us</h2>
          <p className="mb-4">
            For questions about this Privacy Policy or to exercise your rights,
            contact us at:
          </p>
          <p className="mb-4">
            <strong>Elevate for Humanity</strong><br />
            Email: privacy@elevateforhumanity.org<br />
            Phone: (555) 123-4567<br />
            Address: [Your Address]
          </p>
        </div>
      </div>
    </main>
  );
}
