"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Deployment = {
  id: string;
  url: string | null;
  state: string;
  createdAt: number;
  createdBy?: string;
  target?: string;
  meta?: {
    gitBranch?: string;
    gitCommitSha?: string;
    gitCommitMessage?: string;
  };
};

type CiRun = {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  event: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  branch: string;
  commitSha: string;
};

export default function DevOpsOverviewPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [deployLoading, setDeployLoading] = useState(false);
  const [logs, setLogs] = useState<string[] | null>(null);
  const [logsForId, setLogsForId] = useState<string | null>(null);
  const [logsLoading, setLogsLoading] = useState(false);
  const [rollbackLoadingId, setRollbackLoadingId] = useState<string | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);

  const [ciRuns, setCiRuns] = useState<CiRun[]>([]);
  const [ciLoading, setCiLoading] = useState(false);

  useEffect(() => {
    refreshDeployments();
    refreshCiRuns();
  }, []);

  async function refreshDeployments() {
    setDeployLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/devops/deployments", {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to load deployments.");
      } else {
        setDeployments(data.deployments || []);
      }
    } catch (err: any) {
      setMessage(err?.message || "Error loading deployments.");
    } finally {
      setDeployLoading(false);
    }
  }

  async function refreshCiRuns() {
    setCiLoading(true);
    try {
      const res = await fetch("/api/admin/devops/ci", { method: "GET" });
      const data = await res.json();
      if (!res.ok) {
        if (!message) setMessage(data.error || "Failed to load CI runs.");
      } else {
        setCiRuns(data.runs || []);
      }
    } catch (err: any) {
      if (!message) setMessage(err?.message || "Error loading CI runs.");
    } finally {
      setCiLoading(false);
    }
  }

  async function loadLogs(id: string) {
    setLogs(null);
    setLogsForId(id);
    setLogsLoading(true);
    try {
      const res = await fetch(
        `/api/admin/devops/deployments/${id}/logs`,
        { method: "GET" }
      );
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to load logs.");
      } else {
        setLogs(data.lines || []);
      }
    } catch (err: any) {
      setMessage(err?.message || "Error loading logs.");
    } finally {
      setLogsLoading(false);
    }
  }

  async function rollback(id: string) {
    const confirmText =
      "Are you sure you want to instant rollback production to this deployment?\n\n" +
      "⚠ This uses Vercel Instant Rollback and may pause auto-assign of production domains until you reset it in Vercel. Proceed?";
    if (!window.confirm(confirmText)) return;

    setRollbackLoadingId(id);
    setMessage(null);

    try {
      const res = await fetch(
        `/api/admin/devops/deployments/${id}/rollback`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Rollback failed.");
      } else {
        setMessage(
          data.message ||
            "Rollback triggered. Check Vercel dashboard for status."
        );
        setTimeout(refreshDeployments, 3000);
      }
    } catch (err: any) {
      setMessage(err?.message || "Error triggering rollback.");
    } finally {
      setRollbackLoadingId(null);
    }
  }

  function formatDate(ts: number | string) {
    const d = new Date(ts);
    return d.toLocaleString();
  }

  function shortSha(sha?: string) {
    if (!sha) return "";
    return sha.slice(0, 7);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Link
            href="/admin"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Admin
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            DevOps & CI/CD Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            See all deployments, inspect build logs, trigger instant rollback, and
            monitor GitHub Actions runs in one place.
          </p>
        </header>

        {message && (
          <div className="mb-6 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-900">
            {message}
          </div>
        )}

        {/* Deployments section */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Deployment Timeline
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Each row is effectively a "cache snapshot" of your site at that
                deployment ID.
              </p>
            </div>
            <button
              onClick={refreshDeployments}
              disabled={deployLoading}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {deployLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      Target
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      State
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      Branch / Commit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      URL
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {deployments.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        No deployments found.
                      </td>
                    </tr>
                  )}
                  {deployments.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="text-xs text-slate-900">
                          {formatDate(d.createdAt)}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          {d.id}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                          {d.target || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                            d.state === "READY"
                              ? "bg-emerald-50 text-emerald-700"
                              : d.state === "ERROR"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {d.state}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {d.meta?.gitBranch && (
                          <div className="text-xs font-mono text-slate-900">
                            {d.meta.gitBranch}
                          </div>
                        )}
                        {d.meta?.gitCommitSha && (
                          <div className="text-xs font-mono text-slate-500">
                            {shortSha(d.meta.gitCommitSha)}
                          </div>
                        )}
                        {d.meta?.gitCommitMessage && (
                          <div className="text-xs text-slate-500 line-clamp-2 mt-1">
                            {d.meta.gitCommitMessage}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {d.url ? (
                          <a
                            href={d.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-600 hover:underline break-all"
                          >
                            {d.url.replace('https://', '')}
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => loadLogs(d.id)}
                            className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                          >
                            {logsLoading && logsForId === d.id
                              ? "Loading..."
                              : "View Logs"}
                          </button>
                          {d.target === "production" && (
                            <button
                              onClick={() => rollback(d.id)}
                              disabled={rollbackLoadingId === d.id}
                              className="inline-flex items-center justify-center rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition disabled:opacity-50"
                            >
                              {rollbackLoadingId === d.id
                                ? "Rolling back..."
                                : "Rollback"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {logsForId && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-900 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                <span className="text-xs font-mono text-slate-100">
                  Logs for deployment: {logsForId}
                </span>
                <button
                  onClick={() => {
                    setLogsForId(null);
                    setLogs(null);
                  }}
                  className="text-xs text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>
              <pre className="px-4 py-3 text-xs text-emerald-200 max-h-96 overflow-auto whitespace-pre-wrap">
                {logsLoading
                  ? "Loading logs..."
                  : logs && logs.length > 0
                  ? logs.join("\n")
                  : "No logs available."}
              </pre>
            </div>
          )}
        </section>

        {/* CI/CD section */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                GitHub Actions – CI/CD Runs
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Mirrors your GitHub Actions runs so you don&apos;t have to leave your LMS
                admin.
              </p>
            </div>
            <button
              onClick={refreshCiRuns}
              disabled={ciLoading}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {ciLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      Started
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      Workflow
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      Branch / Commit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                      Event
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700">
                      Open
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ciRuns.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        No CI runs found.
                      </td>
                    </tr>
                  )}
                  {ciRuns.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-xs text-slate-900">
                        {formatDate(r.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-900">
                        {r.name}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs font-mono text-slate-900">
                          {r.branch}
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                          {shortSha(r.commitSha)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs">
                          <span className="font-semibold uppercase text-slate-900">
                            {r.status}
                          </span>
                        </div>
                        {r.conclusion && (
                          <div className="text-xs text-slate-500">
                            {r.conclusion}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-700">
                        {r.event}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View in GitHub
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            💡 Pro Tip: Real-time deployment tracking
          </p>
          <p className="text-xs text-blue-800">
            To see real-time deployment logs, visit the{" "}
            <a
              href="https://vercel.com/elevate-48e460c9/fix2-gpql"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              Vercel Dashboard
            </a>
            . This admin panel integrates the Vercel API to show live logs directly
            without leaving your LMS.
          </p>
        </div>
      </div>
    </main>
  );
}
