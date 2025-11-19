'use client';

import { useState } from 'react';

export default function UniversalMOUPage() {
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [signature, setSignature] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/partners/mou', {
        method: 'POST',
        body: JSON.stringify({
          orgName,
          contactName,
          title,
          email,
          signature,
          agreed,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit MOU');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-8 w-8 text-emerald-600"
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
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Thank you!</h1>
          <p className="mt-2 text-sm text-slate-700">
            Your Universal MOU has been successfully submitted and recorded.
            We'll be in touch within 2 business days.
          </p>
          <a
            href="/partners"
            className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Return to Partners Page
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Universal MOU
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">
            Universal Program Partner MOU
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            Review the agreement below and complete the signature fields to
            finalize your partnership with Elevate for Humanity.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm shadow-sm space-y-6">
          <div>
            <h2 className="font-semibold text-slate-900 mb-2">1. Purpose</h2>
            <p className="text-slate-700">
              This Universal MOU outlines expectations for hosting Elevate
              learners, apprentices, and trainees across any program or training
              pathway. This agreement establishes a clear framework for safe,
              professional, and accountable partnerships.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 mb-2">
              2. Scope of Collaboration
            </h2>
            <p className="text-slate-700 mb-2">
              Partner may host learners for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Training, shadowing, and work experience (WEX)</li>
              <li>Externships, internships, and apprenticeship hours</li>
              <li>Administrative tasks and support activities</li>
              <li>Re-entry work and skill-building programs</li>
              <li>Any other mutually agreed learning experiences</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 mb-2">
              3. Responsibilities of Elevate for Humanity
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>
                Prepare learners with foundational training and professional
                expectations
              </li>
              <li>
                Provide a designated point of contact for communication and
                support
              </li>
              <li>
                Assist with documentation, attendance tracking, and evaluations
              </li>
              <li>
                Coordinate with workforce boards, case managers, and referral
                partners
              </li>
              <li>
                Intervene when attendance, conduct, or performance issues arise
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 mb-2">
              4. Responsibilities of Partner
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>
                Provide a safe, respectful, and professional learning
                environment
              </li>
              <li>
                Supervise learners appropriately within policy and state
                regulations
              </li>
              <li>
                Track attendance accurately and report absences or concerns
                promptly
              </li>
              <li>Provide feedback or evaluations when requested</li>
              <li>Treat all learners with dignity, regardless of background</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 mb-2">
              5. Safety & Professional Boundaries
            </h2>
            <p className="text-slate-700">
              Partner agrees to maintain a workplace free from harassment,
              discrimination, and unsafe conditions. Partner will notify Elevate
              immediately of any incidents impacting learner safety, including
              violence, threats, harassment, or substance use affecting safety.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 mb-2">
              6. Confidentiality & Data Sharing
            </h2>
            <p className="text-slate-700">
              Information shared between parties will be used only for training,
              compliance, and program reporting purposes. All data will be
              handled in alignment with applicable privacy and confidentiality
              expectations, including HIPAA where applicable.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 mb-2">
              7. Learner Status & Employment
            </h2>
            <p className="text-slate-700">
              Learners are training participants, not employees of Elevate. Any
              employment relationship created is solely between Partner and the
              individual learner. Elevate does not manage wages, payroll, or HR
              for Partner sites.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 mb-2">
              8. Term & Termination
            </h2>
            <p className="text-slate-700">
              This MOU is effective upon the latest signature date and continues
              for one (1) year, automatically renewing unless terminated by
              written notice (email accepted). Either party may terminate at any
              time. Parties agree to work together to support current learners
              through any transition.
            </p>
          </div>
        </div>

        {/* SIGNATURE FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 rounded-2xl bg-white p-6 border border-slate-200 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            Signature & Contact Information
          </h2>
          <p className="text-xs text-slate-600">
            Please complete all fields below to digitally sign this agreement.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Your organization or business name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Authorized Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="First and last name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Title / Role <span className="text-red-500">*</span>
            </label>
            <input
              required
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Owner, Manager, Director, etc."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Digital Signature <span className="text-red-500">*</span>
            </label>
            <input
              required
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-serif italic focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Type your full name exactly as signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">
              By typing your name, you are providing a legally binding
              electronic signature.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <label className="flex items-start gap-3 text-xs text-slate-700">
              <input
                required
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
              />
              <span>
                I confirm that I am authorized to represent this organization
                and agree to the terms of this Universal Program Partner MOU. I
                understand this is a legally binding electronic signature.{' '}
                <span className="text-red-500">*</span>
              </span>
            </label>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!agreed || loading}
              className="flex-1 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit MOU'}
            </button>
            <a
              href="/partners"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
