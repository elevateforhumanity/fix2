"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Link from "next/link";

type CompletionRow = {
  id: string;
  certificateNumber: string | null;
  certificateUrl: string;
  verificationUrl: string | null;
  issuedDate: string;
  courseName: string;
  partnerName: string;
  studentName: string;
  studentEmail: string;
  programName: string | null;
  fundingSource: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const RANGE_OPTIONS = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 90 days", value: 90 },
];

const FUNDING_FILTERS = [
  { label: "All funding", value: "all" },
  { label: "WIOA", value: "WIOA" },
  { label: "WRG", value: "WRG" },
  { label: "Apprenticeship", value: "Apprenticeship" },
  { label: "Other / Unknown", value: "other" },
];

export default function AdminCompletionsPage() {
  const [days, setDays] = useState(7);
  const [fundingFilter, setFundingFilter] = useState<string>("all");
  const [partnerFilter, setPartnerFilter] = useState<string>("all");

  const { data, isLoading } = useSWR<{ completions: CompletionRow[] }>(
    `/api/admin/completions?days=${days}`,
    fetcher
  );

  const completions = data?.completions ?? [];

  // Build unique partner list from data
  const partnerOptions = useMemo(() => {
    const set = new Set<string>();
    completions.forEach((c) => {
      if (c.partnerName) set.add(c.partnerName);
    });
    const base = [{ label: "All partners", value: "all" }];
    return base.concat(
      Array.from(set).sort().map((name) => ({
        label: name,
        value: name,
      }))
    );
  }, [completions]);

  // Apply filters
  const filteredCompletions = useMemo(() => {
    return completions.filter((row) => {
      let ok = true;

      if (fundingFilter !== "all") {
        const val = (row.fundingSource || "").toLowerCase();
        if (fundingFilter === "other") {
          if (val === "wioa" || val === "wrg" || val === "apprenticeship") {
            ok = false;
          }
        } else {
          if (!val.includes(fundingFilter.toLowerCase())) ok = false;
        }
      }

      if (partnerFilter !== "all") {
        if (row.partnerName !== partnerFilter) ok = false;
      }

      return ok;
    });
  }, [completions, fundingFilter, partnerFilter]);

  const totalCount = completions.length;
  const visibleCount = filteredCompletions.length;

  // CSV export
  const handleDownloadCsv = () => {
    if (!filteredCompletions.length) return;

    const headers = [
      "Issued Date",
      "Student Name",
      "Student Email",
      "Course Name",
      "Partner Name",
      "Program Name",
      "Funding Source",
      "Certificate Number",
      "Certificate URL",
      "Verification URL",
    ];

    const rows = filteredCompletions.map((row) => [
      new Date(row.issuedDate).toISOString(),
      row.studentName || "",
      row.studentEmail || "",
      row.courseName || "",
      row.partnerName || "",
      row.programName || "",
      row.fundingSource || "",
      row.certificateNumber || "",
      row.certificateUrl || "",
      row.verificationUrl || "",
    ]);

    const csv = [headers, ...rows]
      .map((line) =>
        line
          .map((field) => {
            const value = String(field ?? "");
            // Escape quotes and commas
            if (value.includes(",") || value.includes('"') || value.includes("\n")) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const suffix = `_${days}d`;
    a.href = url;
    a.download = `elevate_partner_completions${suffix}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // PIRL export
  const handleDownloadPirl = () => {
    if (!filteredCompletions.length) return;

    const headers = [
      "Participant ID",
      "First Name",
      "Last Name",
      "Email",
      "Training Provider",
      "Training Program",
      "Credential Type",
      "Credential Number",
      "Completion Date",
      "Funding Stream",
      "Verification URL",
    ];

    const rows = filteredCompletions.map((row) => {
      const [firstName, ...lastNameParts] = (row.studentName || "").split(" ");
      const lastName = lastNameParts.join(" ");
      
      return [
        row.studentEmail, // Using email as participant ID
        firstName || "",
        lastName || "",
        row.studentEmail || "",
        row.partnerName || "",
        row.courseName || "",
        "Certificate", // Credential type
        row.certificateNumber || "",
        new Date(row.issuedDate).toLocaleDateString("en-US"),
        row.fundingSource || "",
        row.verificationUrl || "",
      ];
    });

    const csv = [headers, ...rows]
      .map((line) =>
        line
          .map((field) => {
            const value = String(field ?? "");
            if (value.includes(",") || value.includes('"') || value.includes("\n")) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PIRL_completions_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-6">
        <div className="mb-4">
          <Link href="/admin/dashboard" className="text-sky-600 hover:underline text-sm">
            ← Back to Admin Dashboard
          </Link>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Partner Course Completions
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mt-1">
              Certificates issued through HSI, Certiport, Milady, CareerSafe and
              other partners. Use this view for WIOA, WRG, Apprenticeship and
              state reporting.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            {/* Time range */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-slate-600">
                Time range
              </label>
              <select
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              >
                {RANGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Download buttons */}
            <button
              type="button"
              onClick={handleDownloadCsv}
              disabled={!filteredCompletions.length}
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Download CSV
            </button>
            
            <button
              type="button"
              onClick={handleDownloadPirl}
              disabled={!filteredCompletions.length}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Export PIRL
            </button>
          </div>
        </div>
      </header>

      {/* Filters row */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-slate-50 rounded-lg p-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-slate-600 self-center mr-2">Funding:</span>
          {FUNDING_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFundingFilter(f.value)}
              className={[
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                fundingFilter === f.value
                  ? "border-sky-500 bg-sky-600 text-white shadow-sm"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-600">
            Partner
          </label>
          <select
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={partnerFilter}
            onChange={(e) => setPartnerFilter(e.target.value)}
          >
            {partnerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Card + table */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-900">{visibleCount}</span> of{" "}
            <span className="font-semibold text-slate-900">{totalCount}</span> completions in
            the last {days} days
          </p>
        </div>

        {isLoading ? (
          <div className="px-6 py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent"></div>
            <p className="mt-4 text-sm text-slate-600">Loading completions...</p>
          </div>
        ) : !filteredCompletions.length ? (
          <div className="px-6 py-12 text-center text-slate-600">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-sm">No completions match the selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Partner</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Program / Funding</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Issued</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Certificate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredCompletions.map((row) => {
                  const issued = new Date(row.issuedDate).toLocaleString();

                  return (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-sm text-slate-900">
                          {row.studentName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {row.studentEmail}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">
                          {row.courseName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {row.certificateNumber
                            ? `Certificate #${row.certificateNumber}`
                            : "No certificate number"}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                          {row.partnerName}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">
                          {row.programName || "Unmapped program"}
                        </div>
                        <div className="mt-1">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                            {row.fundingSource || "Unknown"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {issued}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <a
                            href={row.certificateUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 transition-colors"
                          >
                            View Certificate
                          </a>
                          {row.verificationUrl && (
                            <a
                              href={row.verificationUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-slate-500 hover:text-slate-700 underline"
                            >
                              Verify credential
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
