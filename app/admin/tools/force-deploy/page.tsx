"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForceDeploy() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/admin/redeploy", { method: "POST" });
    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error || "Failed.");
      setLoading(false);
      return;
    }

    setMsg("🚀 Fresh deployment started on Vercel.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Link
            href="/admin"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Admin
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Force Fresh Deployment
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            This clears old cache and triggers a completely fresh deployment on
            Vercel. Use this when you need to ensure the latest code is live
            immediately.
          </p>

          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 mb-6">
            <p className="text-xs font-semibold text-amber-900 mb-1">
              ⚠️ When to use this:
            </p>
            <ul className="text-xs text-amber-800 space-y-1">
              <li>• Site is showing old content after a push</li>
              <li>• Need to bypass Vercel&apos;s edge cache immediately</li>
              <li>• Critical bug fix needs to go live ASAP</li>
              <li>• Testing deployment pipeline</li>
            </ul>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={run}
            disabled={loading}
          >
            {loading ? "Deploying..." : "🚀 Force Fresh Deploy"}
          </button>

          {msg && (
            <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm text-emerald-900">{msg}</p>
              <p className="text-xs text-emerald-700 mt-2">
                Check deployment status:{" "}
                <a
                  href="https://vercel.com/elevate-48e460c9/fix2-gpql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Vercel Dashboard
                </a>
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            How it works
          </h2>
          <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
            <li>Triggers Vercel Deploy Hook via API</li>
            <li>Vercel starts fresh build from latest main branch</li>
            <li>All caches are bypassed (no reuse of old artifacts)</li>
            <li>New deployment goes live in ~2-3 minutes</li>
            <li>Edge cache is automatically invalidated</li>
          </ol>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-900 mb-2">
              Alternative methods:
            </p>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>
                • <strong>Gitpod:</strong> Run{" "}
                <code className="bg-slate-200 px-1 rounded">
                  ./.gitpod.d/force-vercel-redeploy.sh
                </code>
              </li>
              <li>
                • <strong>Git push:</strong> Any push to main triggers auto-deploy
              </li>
              <li>
                • <strong>Vercel Dashboard:</strong> Manual redeploy from UI
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
