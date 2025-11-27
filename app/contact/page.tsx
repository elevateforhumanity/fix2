"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">
            Contact Us
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            Have questions about enrollment, programs, employers, or funding?
            Send us a message and our team will connect with you.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-3xl px-4">
          <form
            className="space-y-4 rounded-xl border border-slate-100 bg-white p-4 text-sm shadow-sm md:p-6"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("sent");
            }}
          >
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                Name *
              </label>
              <input
                required
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                Email *
              </label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                Message *
              </label>
              <textarea
                rows={4}
                required
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900"
              ></textarea>
            </div>

            <button
              type="submit"
              className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Send Message
            </button>

            {status === "sent" && (
              <p className="text-xs text-green-600">
                Message sent! We'll get back to you. (You can later wire this to
                email or CRM.)
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
