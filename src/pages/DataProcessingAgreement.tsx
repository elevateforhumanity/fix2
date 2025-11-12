/**
 * Data Processing Agreement (DPA) Page
 * GDPR-compliant data processing agreement
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, Shield, Lock, Database } from 'lucide-react';

export default function DataProcessingAgreement() {
  return (
    <>
      <Helmet>
        <title>Data Processing Agreement | Elevate for Humanity</title>
        <meta
          name="description"
          content="Data Processing Agreement outlining how Elevate for Humanity processes and protects your personal data in compliance with GDPR."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Data Processing Agreement
                </h1>
                <p className="text-gray-600 mt-2">
                  Last Updated: November 12, 2025
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              This Data Processing Agreement ("DPA") forms part of the Terms of Service between Elevate for Humanity ("Data Processor") and you ("Data Controller" or "User") and governs the processing of personal data in accordance with GDPR and applicable data protection laws.
            </p>
          </div>

          {/* Definitions */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. Definitions
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  "Personal Data"
                </h3>
                <p className="text-gray-700 text-sm">
                  Any information relating to an identified or identifiable natural person, including but not limited to: name, email address, phone number, educational records, progress data, and assessment results.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  "Processing"
                </h3>
                <p className="text-gray-700 text-sm">
                  Any operation performed on Personal Data, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure, erasure, or destruction.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  "Data Controller"
                </h3>
                <p className="text-gray-700 text-sm">
                  The entity that determines the purposes and means of processing Personal Data (you, the user).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  "Data Processor"
                </h3>
                <p className="text-gray-700 text-sm">
                  The entity that processes Personal Data on behalf of the Data Controller (Elevate for Humanity).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  "Sub-processor"
                </h3>
                <p className="text-gray-700 text-sm">
                  Any third-party processor engaged by the Data Processor to process Personal Data.
                </p>
              </div>
            </div>
          </div>

          {/* Scope and Purpose */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. Scope and Purpose of Processing
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  2.1 Subject Matter
                </h3>
                <p className="text-gray-700">
                  The processing of Personal Data necessary to provide learning management system services, including course delivery, progress tracking, assessment, and certification.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  2.2 Duration
                </h3>
                <p className="text-gray-700">
                  The duration of this DPA shall be for the term of the Terms of Service, plus any retention period required by law or as specified in our Privacy Policy.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  2.3 Nature and Purpose
                </h3>
                <p className="text-gray-700 mb-3">
                  We process Personal Data for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>User authentication and account management</li>
                  <li>Course enrollment and access control</li>
                  <li>Learning progress tracking and analytics</li>
                  <li>Assessment and grading</li>
                  <li>Certificate generation and verification</li>
                  <li>Communication regarding courses and services</li>
                  <li>Compliance with legal obligations (WIOA, FERPA)</li>
                  <li>Platform improvement and analytics</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  2.4 Categories of Data Subjects
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Students and learners</li>
                  <li>Instructors and educators</li>
                  <li>Administrative staff</li>
                  <li>Prospective students</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  2.5 Types of Personal Data
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Identity data (name, date of birth, ID numbers)</li>
                  <li>Contact data (email, phone, address)</li>
                  <li>Educational data (courses, grades, certificates)</li>
                  <li>Technical data (IP address, browser type, device info)</li>
                  <li>Usage data (course activity, time spent, interactions)</li>
                  <li>Profile data (preferences, interests, feedback)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Processor Obligations */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                3. Data Processor Obligations
              </h2>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.1 Processing Instructions
                </h3>
                <p className="text-gray-700 text-sm">
                  We will process Personal Data only on documented instructions from you, unless required to do so by applicable law. We will immediately inform you if we believe any instruction violates GDPR or other data protection laws.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.2 Confidentiality
                </h3>
                <p className="text-gray-700 text-sm">
                  We ensure that all personnel authorized to process Personal Data are bound by confidentiality obligations and receive appropriate training on data protection.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.3 Security Measures
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Regular backups and disaster recovery procedures</li>
                  <li>Monitoring and logging of system access</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.4 Sub-processors
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  We may engage the following sub-processors to assist in providing our services:
                </p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <ul className="space-y-2">
                    <li>
                      <strong>Supabase Inc.</strong> - Database and authentication services
                      <br />
                      <span className="text-gray-600">Location: United States</span>
                    </li>
                    <li>
                      <strong>Cloudflare Inc.</strong> - CDN and security services
                      <br />
                      <span className="text-gray-600">Location: United States</span>
                    </li>
                    <li>
                      <strong>Google LLC</strong> - Analytics services
                      <br />
                      <span className="text-gray-600">Location: United States</span>
                    </li>
                    <li>
                      <strong>Stripe Inc.</strong> - Payment processing
                      <br />
                      <span className="text-gray-600">Location: United States</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 text-sm mt-2">
                  We will notify you of any intended changes concerning the addition or replacement of sub-processors, giving you the opportunity to object to such changes.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.5 Data Subject Rights
                </h3>
                <p className="text-gray-700 text-sm">
                  We will assist you in responding to requests from data subjects exercising their rights under GDPR, including rights of access, rectification, erasure, restriction, data portability, and objection.
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.6 Data Breach Notification
                </h3>
                <p className="text-gray-700 text-sm">
                  We will notify you without undue delay (within 72 hours) after becoming aware of a personal data breach, providing all relevant information to enable you to meet your own notification obligations.
                </p>
              </div>

              <div className="border-l-4 border-pink-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.7 Data Protection Impact Assessment
                </h3>
                <p className="text-gray-700 text-sm">
                  We will provide reasonable assistance with data protection impact assessments and prior consultations with supervisory authorities when required.
                </p>
              </div>

              <div className="border-l-4 border-teal-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.8 Deletion or Return of Data
                </h3>
                <p className="text-gray-700 text-sm">
                  Upon termination of services, we will delete or return all Personal Data to you, unless retention is required by law. You may request data export at any time through your account settings.
                </p>
              </div>

              <div className="border-l-4 border-cyan-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.9 Audit Rights
                </h3>
                <p className="text-gray-700 text-sm">
                  We will make available to you all information necessary to demonstrate compliance with this DPA and allow for and contribute to audits, including inspections, conducted by you or an auditor mandated by you.
                </p>
              </div>
            </div>
          </div>

          {/* International Transfers */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                4. International Data Transfers
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              Personal Data may be transferred to and processed in countries outside the European Economic Area (EEA), including the United States.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Transfer Mechanisms
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                We ensure that such transfers are protected by appropriate safeguards:
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                <li>Adequacy decisions by the European Commission</li>
                <li>Binding Corporate Rules (where applicable)</li>
                <li>Certification mechanisms (e.g., Privacy Shield successor frameworks)</li>
              </ul>
            </div>

            <p className="text-gray-700 text-sm">
              Upon request, we will provide you with a copy of the relevant safeguards in place for international data transfers.
            </p>
          </div>

          {/* Liability and Indemnification */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                5. Liability and Indemnification
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  5.1 Liability
                </h3>
                <p className="text-gray-700 text-sm">
                  Each party's liability under this DPA shall be subject to the limitations and exclusions of liability set out in the Terms of Service, except where prohibited by applicable law.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  5.2 Indemnification
                </h3>
                <p className="text-gray-700 text-sm">
                  We will indemnify you against any claims, losses, or damages arising from our breach of this DPA, except to the extent caused by your instructions or your breach of this DPA.
                </p>
              </div>
            </div>
          </div>

          {/* Term and Termination */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Term and Termination
            </h2>

            <p className="text-gray-700 mb-4">
              This DPA shall remain in effect for as long as we process Personal Data on your behalf. Upon termination:
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>We will cease all processing of Personal Data</li>
              <li>We will delete or return all Personal Data within 30 days</li>
              <li>We will provide certification of deletion upon request</li>
              <li>We may retain Personal Data as required by law</li>
            </ul>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Governing Law and Jurisdiction
            </h2>

            <p className="text-gray-700">
              This DPA shall be governed by and construed in accordance with the laws of the State of Indiana, United States, without regard to its conflict of law provisions. Any disputes arising from this DPA shall be subject to the exclusive jurisdiction of the courts of Marion County, Indiana.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Questions or Concerns?
            </h2>

            <p className="text-gray-700 mb-4">
              If you have any questions about this Data Processing Agreement, please contact our Data Protection Officer:
            </p>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:dpo@elevateforhumanity.org"
                  className="text-blue-600 hover:underline"
                >
                  dpo@elevateforhumanity.org
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a
                  href="tel:3173143757"
                  className="text-blue-600 hover:underline"
                >
                  (317) 314-3757
                </a>
              </p>
              <p>
                <strong>Address:</strong> Marion County, Indiana
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <Link
                to="/privacy"
                className="text-blue-600 hover:underline font-medium"
              >
                Privacy Policy →
              </Link>
              <Link
                to="/cookie-policy"
                className="text-blue-600 hover:underline font-medium"
              >
                Cookie Policy →
              </Link>
              <Link
                to="/terms"
                className="text-blue-600 hover:underline font-medium"
              >
                Terms of Service →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
