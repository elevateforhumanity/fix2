"use client";

import { useState } from "react";

export default function ProgramHolderAcknowledgementPage() {
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; msg: string }>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!orgName || !contactName || !email || !agreed) {
      setStatus({
        type: "error",
        msg: "Please complete all required fields and confirm that you agree.",
      });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/program-holders/acknowledgement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgName,
          contactName,
          title,
          email,
          phone,
          agreed,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Unable to save acknowledgement.");
      }

      setStatus({
        type: "success",
        msg: "Thank you. Your acknowledgement has been received.",
      });

      setOrgName("");
      setContactName("");
      setTitle("");
      setEmail("");
      setPhone("");
      setAgreed(false);
    } catch (err: any) {
      console.error(err);
      setStatus({
        type: "error",
        msg: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Program Holders • Site Partners
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Program Holder / Site Partner Acknowledgement
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            This page summarizes your responsibilities as a program holder or site partner
            hosting Elevate for Humanity learners, apprentices, or participants. Please
            review the key points and submit the acknowledgement form at the bottom.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 md:py-10">
        <div className="space-y-6 text-sm text-slate-700">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              1. Role & Environment
            </h2>
            <ul className="mt-2 space-y-1.5">
              <li>• Provide a safe, professional learning environment for learners.</li>
              <li>• Treat all learners with respect, including those with justice involvement.</li>
              <li>• Clearly communicate basic rules: schedule, dress code, safety expectations.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              2. Attendance, Hours & Communication
            </h2>
            <ul className="mt-2 space-y-1.5">
              <li>• Track attendance and hours using the tools or templates provided.</li>
              <li>• Notify Elevate of repeated tardiness, absences, or no call / no show.</li>
              <li>• Let us know early when there are performance or conduct concerns.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              3. Training, Supervision & Safety
            </h2>
            <ul className="mt-2 space-y-1.5">
              <li>• Provide meaningful, program-aligned tasks with appropriate supervision.</li>
              <li>• Maintain a harassment-free, discrimination-free work environment.</li>
              <li>• Avoid assigning work that is unsafe, illegal, or far outside program scope.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              4. Documentation & Compliance
            </h2>
            <ul className="mt-2 space-y-1.5">
              <li>• Provide basic documentation when requested: hours, evaluations, incidents.</li>
              <li>• Understand some learners are funded through workforce or re-entry programs.</li>
              <li>• Cooperate reasonably with reporting and audits related to the partnership.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              5. Partnership & Changes
            </h2>
            <ul className="mt-2 space-y-1.5">
              <li>• Communicate with Elevate if you need to pause or end hosting learners.</li>
              <li>• Work with us on safe, clear transitions for any learners currently in placement.</li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-2xl border border-slate-100 bg-white p-5 text-sm shadow-sm"
        >
          <h2 className="text-sm font-semibold text-slate-900">
            Acknowledgement & Contact Information
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Please complete this section so we have a record of who is acknowledging on
            behalf of your organization or site.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Organization / Site Name <span className="text-red-500">*</span>
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Example: Kenny's Barber Shop"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Primary Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="First and last name"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Title / Role
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Owner, Manager, Site Lead, etc."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
              />
            </div>
          </div>

          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-slate-700">
              Phone
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 555-5555"
            />
          </div>

          <div className="mt-2 space-y-2 rounded-xl bg-slate-50 px-3 py-3">
            <label className="flex items-start gap-2 text-xs text-slate-700">
              <input
                type="checkbox"
                className="mt-[2px] h-4 w-4 rounded border-slate-300"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I confirm that I have read and understand the Program Holder / Site Partner
                responsibilities above, I am authorized to agree on behalf of my
                organization or site, and I agree to work with Elevate for Humanity in the
                spirit of safety, respect, and shared accountability for learner success.
              </span>
            </label>
          </div>

          {status && (
            <p
              className={`text-xs ${
                status.type === "success" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {status.msg}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Acknowledgement"}
          </button>
        </form>
      </section>
    </main>
  );
}
