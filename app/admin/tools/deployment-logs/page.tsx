"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Deployment {
  id: string;
  commit: string;
  branch: string;
  status: "building" | "ready" | "error";
  timestamp: string;
  duration: string;
  url: string;
}

export default function DeploymentLogs() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with real Vercel API call
    const mockDeployments: Deployment[] = [
      {
        id: "dpl_3f947afb",
        commit: "3f947afb - 🔥 AGGRESSIVE CACHE BUSTING",
        branch: "main",
        status: "ready",
        timestamp: "2 minutes ago",
        duration: "2m 15s",
        url: "https://fix2-gpql-git-main-elevate.vercel.app",
      },
      {
        id: "dpl_9a461a2a",
        commit: "9a461a2a - ✨ MEDICAL ASSISTANT PROGRAM",
        branch: "main",
        status: "ready",
        timestamp: "15 minutes ago",
        duration: "2m 8s",
        url: "https://fix2-gpql-9a461a2a.vercel.app",
      },
      {
        id: "dpl_d8a51136",
        commit: "d8a51136 - ✨ COMPREHENSIVE ABOUT PAGE",
        branch: "main",
        status: "ready",
        timestamp: "30 minutes ago",
        duration: "2m 12s",
        url: "https://fix2-gpql-d8a51136.vercel.app",
      },
    ];

    setTimeout(() => {
      setDeployments(mockDeployments);
      setLoading(false);
    }, 500);
  }, []);

  function getStatusBadge(status: Deployment["status"]) {
    switch (status) {
      case "building":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Building
          </span>
        );
      case "ready":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Ready
          </span>
        );
      case "error":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Error
          </span>
        );
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="text-sm text-blue-600 hover:underline"
            >
              ← Back to Admin
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Deployment Logs
            </h1>
            <p className="text-sm text-slate-600">
              View recent deployments and their status
            </p>
          </div>
          <Link
            href="/admin/tools/force-deploy"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            🚀 Force Deploy
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-sm text-slate-500">
              Loading deployments...
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {deployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className="p-5 hover:bg-slate-50 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusBadge(deployment.status)}
                        <span className="text-xs text-slate-500">
                          {deployment.timestamp}
                        </span>
                        <span className="text-xs text-slate-500">
                          Duration: {deployment.duration}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 mb-1">
                        {deployment.commit}
                      </p>
                      <p className="text-xs text-slate-500">
                        Branch: {deployment.branch} • ID: {deployment.id}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={deployment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                      >
                        Visit
                      </a>
                      <a
                        href={`https://vercel.com/elevate-48e460c9/fix2-gpql/${deployment.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                      >
                        Logs
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Deployment Pipeline
          </h2>
          <div className="grid gap-4 md:grid-cols-4 text-xs">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900 mb-1">1. Git Push</p>
              <p className="text-slate-600">
                Code pushed to main branch triggers GitHub Action
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900 mb-1">
                2. Deploy Hook
              </p>
              <p className="text-slate-600">
                GitHub Action calls Vercel Deploy Hook URL
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900 mb-1">3. Build</p>
              <p className="text-slate-600">
                Vercel builds 296 pages with zero cache
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900 mb-1">4. Deploy</p>
              <p className="text-slate-600">
                Fresh deployment goes live on edge network
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
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
            . You can also integrate the Vercel API to show live logs directly
            in this admin panel.
          </p>
        </div>
      </div>
    </main>
  );
}
