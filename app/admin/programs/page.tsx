"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Program = {
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  funding: string[];
  partnerName?: string;
  etplApproved: boolean;
};

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/programs");
      const data = await res.json();
      setPrograms(data.programs);
      setLoading(false);
    };
    load();
  }, []);

  const filteredPrograms = programs.filter((p) => {
    if (filter === "all") return true;
    if (filter === "wioa") return p.funding.includes("WIOA");
    if (filter === "wrg") return p.funding.includes("WRG");
    if (filter === "apprenticeship") return p.funding.includes("Apprenticeship");
    if (filter === "etpl") return p.etplApproved;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-600">Loading programs…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <Link href="/admin/dashboard" className="text-sky-600 hover:underline">
              ← Back to Admin Dashboard
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Programs (Admin View)
          </h1>
          <p className="text-slate-600">
            All {programs.length} workforce-enabled programs from a single source of truth.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-sky-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            All Programs ({programs.length})
          </button>
          <button
            onClick={() => setFilter("wioa")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "wioa"
                ? "bg-emerald-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            WIOA ({programs.filter((p) => p.funding.includes("WIOA")).length})
          </button>
          <button
            onClick={() => setFilter("wrg")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "wrg"
                ? "bg-purple-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            WRG ({programs.filter((p) => p.funding.includes("WRG")).length})
          </button>
          <button
            onClick={() => setFilter("apprenticeship")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "apprenticeship"
                ? "bg-orange-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            Apprenticeship ({programs.filter((p) => p.funding.includes("Apprenticeship")).length})
          </button>
          <button
            onClick={() => setFilter("etpl")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "etpl"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            ETPL Approved ({programs.filter((p) => p.etplApproved).length})
          </button>
        </div>

        {/* Programs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Partner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Funding
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    ETPL
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredPrograms.map((p) => (
                  <tr key={p.slug} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{p.tagline}</p>
                        <p className="text-xs text-slate-400 mt-1 font-mono">{p.slug}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
                      {p.duration}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {p.partnerName || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {p.funding.map((f) => (
                          <span
                            key={f}
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              f === "WIOA"
                                ? "bg-emerald-50 text-emerald-700"
                                : f === "WRG"
                                ? "bg-purple-50 text-purple-700"
                                : f === "Apprenticeship"
                                ? "bg-orange-50 text-orange-700"
                                : "bg-slate-50 text-slate-700"
                            }`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {p.etplApproved ? (
                        <span className="inline-flex items-center text-emerald-700">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Yes
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right text-sm">
                      <Link
                        href={`/programs/${p.slug}`}
                        target="_blank"
                        className="text-sky-600 hover:text-sky-700 hover:underline font-medium"
                      >
                        View Page →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-2xl font-bold text-slate-900">{programs.length}</p>
            <p className="text-sm text-slate-600">Total Programs</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-2xl font-bold text-emerald-600">
              {programs.filter((p) => p.funding.includes("WIOA")).length}
            </p>
            <p className="text-sm text-slate-600">WIOA Eligible</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-2xl font-bold text-purple-600">
              {programs.filter((p) => p.funding.includes("WRG")).length}
            </p>
            <p className="text-sm text-slate-600">WRG Eligible</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-2xl font-bold text-indigo-600">
              {programs.filter((p) => p.etplApproved).length}
            </p>
            <p className="text-sm text-slate-600">ETPL Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
