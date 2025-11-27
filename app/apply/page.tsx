"use client";

import { useState } from "react";

export default function ApplyPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      program_interest: formData.get("program_interest"),
      referral_source: formData.get("referral_source"),
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      (event.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-100 bg-slate-50 py-8">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Apply to Elevate For Humanity
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            Fill out this short form so we can match you with the right program and funding.
            A staff member or case manager will follow up with your next steps.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-3xl px-4">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm md:p-6"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Full Name *
              </label>
              <input
                name="full_name"
                required
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Phone
                </label>
                <input
                  name="phone"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Which program are you most interested in?
              </label>
              <input
                name="program_interest"
                placeholder="Example: CNA, HVAC, Barber, CDL…"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                How did you hear about us?
              </label>
              <input
                name="referral_source"
                placeholder="WorkOne, case manager, social media, friend…"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            {status === "success" && (
              <p className="text-xs text-emerald-600">
                Thank you! Your application was received. We'll contact you with next steps.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Submit Application"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
