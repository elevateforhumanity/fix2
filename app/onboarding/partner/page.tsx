'use client';
import Link from 'next/link';

export default function PartnerOnboarding() {
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
          <h1 className="mt-4 text-2xl font-bold">Referral Partner Form</h1>
          <p className="mt-2 text-slate-300">
            WorkOne, Re-Entry, Community Organizations
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Referral submitted!');
          }}
          className="space-y-6"
        >
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 space-y-4">
            <h2 className="text-lg font-bold">Your Organization</h2>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Organization *
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Case Manager Name *
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
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 space-y-4">
            <h2 className="text-lg font-bold">Participant Information</h2>
            <div>
              <label className="block text-sm font-semibold mb-2">Name *</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
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
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Requested Program *
              </label>
              <select
                required
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
              >
                <option value="">Select...</option>
                <option>Medical Assistant</option>
                <option>Barber Apprenticeship</option>
                <option>HVAC Tech</option>
                <option>Building Maintenance</option>
                <option>Workforce Readiness</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Notes</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-400"
          >
            Submit Referral
          </button>
        </form>
      </section>
    </main>
  );
}
