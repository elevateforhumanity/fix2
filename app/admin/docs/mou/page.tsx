"use client";

import { useState } from "react";

export default function MOUGeneratorPage() {
  const [programName, setProgramName] = useState("Barber Apprenticeship Program");
  const [partnerName, setPartnerName] = useState("Kenny's Barber Academy");
  const [city, setCity] = useState("Indianapolis");
  const [state, setState] = useState("Indiana");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2026-01-01");
  const [doc, setDoc] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/docs/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "mou",
          variables: {
            efh_name: "Elevate for Humanity",
            efh_signer_name: "Authorized Signer",
            efh_signer_title: "Executive Director",
            partner_name: partnerName,
            partner_signer_name: "Partner Representative",
            partner_signer_title: "Program Director",
            program_name: programName,
            city,
            state,
            start_date: startDate,
            end_date: endDate,
          },
        }),
      });

      const data = await res.json();
      setDoc(data.document || "");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          MOU Generator
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Generate a working MOU draft you can send to partners for review and
          signature.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3 text-sm">
          <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Program name
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Partner name
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-700">
                  City
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="w-24">
                <label className="block text-xs font-medium text-slate-700">
                  State
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-700">
                  Start date
                </label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-700">
                  End date
                </label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={generate}
              disabled={loading}
              className="mt-2 w-full rounded-2xl bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Generating…" : "Generate MOU Draft"}
            </button>
          </div>

          <div className="md:col-span-2 rounded-2xl border border-slate-100 bg-white p-4 text-xs shadow-sm">
            {doc ? (
              <textarea
                className="h-[480px] w-full resize-none border-0 bg-transparent font-mono text-[11px] leading-snug text-slate-800 focus:outline-none"
                value={doc}
                onChange={(e) => setDoc(e.target.value)}
              />
            ) : (
              <p className="text-xs text-slate-500">
                Your MOU draft will appear here. You can copy, edit, and send
                for signature.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
