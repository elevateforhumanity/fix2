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
              <select
                name="program_interest"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="">Select a program...</option>
                <optgroup label="Healthcare">
                  <option value="CNA">Certified Nursing Assistant (CNA)</option>
                  <option value="Medical Assistant">Medical Assistant</option>
                  <option value="Phlebotomy">Phlebotomy</option>
                  <option value="EKG Technician">EKG Technician</option>
                  <option value="Patient Care Tech">Patient Care Tech</option>
                </optgroup>
                <optgroup label="Skilled Trades & Building">
                  <option value="HVAC">HVAC</option>
                  <option value="Building Maintenance">Building Maintenance</option>
                  <option value="Facilities Tech">Facilities Tech</option>
                  <option value="CDL">CDL / Transportation</option>
                </optgroup>
                <optgroup label="Beauty & Wellness">
                  <option value="Barber">Barber Apprenticeship</option>
                  <option value="Esthetics">Esthetics</option>
                  <option value="Beauty Career Educator">Beauty Career Educator</option>
                </optgroup>
                <optgroup label="Business & Technology">
                  <option value="Tax Prep">Tax Prep / IRS VITA</option>
                  <option value="Office & Admin">Office & Admin</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Digital Skills">Digital Skills</option>
                </optgroup>
                <optgroup label="Retail & Customer Service">
                  <option value="RISE Up">NRF Foundation RISE Up</option>
                </optgroup>
                <option value="Other">Other / Unsure</option>
              </select>
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

          {/* Holistic Support Section */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Holistic Support for Your Success
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              We recognize that career success requires support in multiple areas of life. 
              Through our parent organization SELFISH INC, we offer:
            </p>

            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Mental Wellness Services</h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Remove emotional barriers to employment through trauma recovery, divorce support, 
                    and addiction counseling. Learn more at{" "}
                    <a href="https://www.selfishinc.org" className="text-red-600 hover:underline">
                      selfishinc.org
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Financial Literacy Training</h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Build financial stability through VITA tax preparation certification and tax business 
                    management courses through RISE Forward Foundation.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Physical Wellness Resources</h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Optional body contouring services through our partner Curvature Body Sculpting 
                    for confidence and self-care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
