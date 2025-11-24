"use client";

import { useState } from "react";

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    const res = await fetch("/api/support/ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
    });
    if (res.ok) {
      setStatus("done");
      setSubject("");
      setBody("");
    } else {
      setStatus("idle");
      alert("There was an issue submitting your request.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">Support</h1>
        <p className="mt-2 text-sm text-slate-600">
          Submit a ticket to the Elevate for Humanity support team.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-sm">
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Subject
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Describe your issue
            </label>
            <textarea
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit Ticket"}
          </button>
          {status === "done" && (
            <p className="text-xs text-red-600">
              Your ticket was submitted. Our team will follow up by email.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
