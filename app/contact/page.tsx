'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      role: formData.get('role'),
      interest: formData.get('interest'),
      followup: formData.get('followup'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      setSubmitStatus('success');
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <section className="w-full border-b bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Contact & Get Started · Elevate For Humanity
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Tell Us Where You Are Right Now
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            You don&apos;t have to have it all figured out. Use this form to
            share a little about your situation, and someone from Elevate For
            Humanity will follow up with next steps.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {submitStatus === 'success' && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <p className="font-semibold">✅ Thank you! We received your message.</p>
            <p className="mt-1 text-xs">
              Someone from our team will follow up with you within 1-2 business days.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-semibold">❌ Something went wrong</p>
            <p className="mt-1 text-xs">{errorMessage}</p>
          </div>
        )}

        <form
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-xs font-semibold text-slate-900">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="First and last name"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-900">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Best number to reach you"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900">
              I am reaching out as a: <span className="text-red-600">*</span>
            </label>
            <select
              name="role"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select one</option>
              <option value="student">Future student / learner</option>
              <option value="parent">Parent / family member</option>
              <option value="employer">Employer / HR</option>
              <option value="case-manager">Case manager / referral partner</option>
              <option value="community">Community partner / other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900">
              What are you interested in?
            </label>
            <textarea
              name="interest"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={4}
              placeholder="Example: CNA or Barber program, I need help with funding, I'm an employer looking for talent, I'm justice-involved and need a second chance, etc."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900">
              How do you prefer we follow up?
            </label>
            <input
              type="text"
              name="followup"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Text, call, email, best times, or anything we should know before we reach out."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-brandBlue px-4 py-2 text-sm font-semibold text-white hover:bg-brandBlueDark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit & Request Follow-Up'}
          </button>

          <p className="mt-2 text-[11px] text-slate-500">
            By submitting this form you&apos;re giving Elevate For Humanity
            permission to contact you about training, funding, and related
            opportunities. We won&apos;t sell your information.
          </p>
        </form>
      </main>
    </div>
  );
}
