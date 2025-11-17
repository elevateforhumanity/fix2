'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function EmployerOnboarding() {
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    roles: '',
    hires: '',
    safe_workplace: false,
    notify_changes: false,
    provide_feedback: false,
    signature: '',
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link
            href="/onboarding"
            className="text-orange-400 hover:text-orange-300 text-sm"
          >
            ← Back
          </Link>
          <h1 className="mt-4 text-2xl font-bold">
            Employer Partner Onboarding
          </h1>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Submitted!');
          }}
          className="space-y-6"
        >
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Contact Person *
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Roles Available *
              </label>
              <textarea
                required
                rows={3}
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Expected Hires (6-12 months)
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
              />
            </div>
          </div>
          <div className="rounded-2xl border border-orange-400/40 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Acknowledgments</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1 w-4 h-4" />
                <span className="text-sm">Provide safe workplace</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1 w-4 h-4" />
                <span className="text-sm">Notify Elevate of job changes</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1 w-4 h-4" />
                <span className="text-sm">Provide performance feedback</span>
              </label>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">
                Signature *
              </label>
              <input
                type="text"
                required
                placeholder="Type your full name"
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-400"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
