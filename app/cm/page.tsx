// app/cm/page.tsx - Case Manager Dashboard
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, TrendingUp, Award, Calendar, AlertCircle } from "lucide-react";

type LearnerRow = {
  learner_id: string;
  first_name: string | null;
  last_name: string | null;
  primary_program: string | null;
  status: string;
  percent_complete: number;
  last_activity: string | null;
  funding_type: string | null;
};

type CmSummary = {
  assigned_learners: number;
  active_enrollments: number;
  completions_last_30_days: number;
};

type CmDashboardResponse = {
  summary: CmSummary;
  learners: LearnerRow[];
};

export default function CaseManagerDashboardPage() {
  const [data, setData] = useState<CmDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cm/dashboard");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load dashboard");
        setData(json);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error loading dashboard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Case Manager Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">Loading your caseload…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Case Manager Dashboard
          </h1>
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">
                {error || "Failed to load dashboard"}
              </p>
              <p className="text-xs text-red-700 mt-1">
                Please contact your administrator if this problem persists.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { summary, learners } = data;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Case Manager Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            See your caseload, monitor learner progress, and track completions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            label="Assigned Learners"
            value={summary.assigned_learners}
            hint="Total learners assigned to your caseload"
            bgColor="bg-blue-50"
          />
          <SummaryCard
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            label="Active Enrollments"
            value={summary.active_enrollments}
            hint="Learners currently in a program"
            bgColor="bg-green-50"
          />
          <SummaryCard
            icon={<Award className="w-6 h-6 text-purple-600" />}
            label="Completions (Last 30 Days)"
            value={summary.completions_last_30_days}
            hint="Programs completed by your learners"
            bgColor="bg-purple-50"
          />
        </div>

        {/* Learners Table */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Learners
            </h2>
            <p className="text-xs text-gray-500">
              Click a learner to see detailed program progress
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Learner
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Primary Program
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      % Complete
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Funding
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {learners.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-sm text-gray-500"
                      >
                        No learners assigned yet. Contact your administrator to get started.
                      </td>
                    </tr>
                  ) : (
                    learners.map((l) => (
                      <tr key={l.learner_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900">
                            {l.first_name} {l.last_name}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-900">
                            {l.primary_program || "—"}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${l.percent_complete}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {l.percent_complete}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              l.status === "active"
                                ? "bg-green-100 text-green-700"
                                : l.status === "completed"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {l.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            {l.last_activity
                              ? new Date(l.last_activity).toLocaleDateString()
                              : "—"}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-gray-700">
                            {l.funding_type || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            href={`/cm/learners/${l.learner_id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Help Text */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            📋 Case Manager Tools
          </h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Click "View" to see detailed progress and add coordination notes</li>
            <li>• Monitor completion percentages to identify learners who need support</li>
            <li>• Track last activity dates to follow up with inactive learners</li>
            <li>• Export reports for workforce boards and funding partners</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  hint,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  hint?: string;
  bgColor?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className={`w-12 h-12 ${bgColor || "bg-gray-50"} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-semibold text-gray-900">{label}</div>
      {hint && (
        <div className="mt-2 text-xs text-gray-500">{hint}</div>
      )}
    </div>
  );
}
