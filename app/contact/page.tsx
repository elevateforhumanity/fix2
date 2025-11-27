"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <main className="bg-white">
      {/* Hero Section with Image */}
      <section className="relative bg-slate-900">
        <div className="relative h-64 md:h-80">
          <Image
            src="/images/hero-new/hero-4.jpg"
            alt="Contact Elevate for Humanity"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-6xl px-4 w-full">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Contact Us
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-100 md:text-lg">
              Have questions about enrollment, programs, employers, or funding?
              Send us a message and our team will connect with you.
            </p>
          </div>
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
               />
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
