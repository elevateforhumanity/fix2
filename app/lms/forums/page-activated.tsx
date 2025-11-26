// app/lms/forums/page.tsx - ACTIVATED VERSION
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Pin, Lock, TrendingUp } from "lucide-react";

type Forum = {
  id: string;
  name: string;
  description: string;
  threadCount: number;
  postCount: number;
  lastActivity: string | null;
  isPinned?: boolean;
  isLocked?: boolean;
};

export default function ForumsPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/forums");
        const data = await res.json();
        setForums(data);
      } catch (e) {
        console.error("Failed to load forums", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Community Forums</h1>
        <p className="text-sm text-slate-600">
          Ask questions, share wins, and connect with other Elevate learners and instructors.
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Forums" value={forums.length.toString()} />
        <StatCard label="Total Threads" value={forums.reduce((sum, f) => sum + f.threadCount, 0).toString()} />
        <StatCard label="Total Posts" value={forums.reduce((sum, f) => sum + f.postCount, 0).toString()} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-sm text-slate-500">Loading forums...</div>
        </div>
      ) : forums.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-sm text-slate-600 mb-2">No forums yet</p>
          <p className="text-xs text-slate-500">
            Check back soon or talk to your Elevate coach to create forums.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {forums.map((forum) => (
            <Link
              key={forum.id}
              href={`/lms/forums/${forum.id}`}
              className="block rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-base font-semibold text-slate-900">{forum.name}</h2>
                    {forum.isPinned && (
                      <Pin className="w-4 h-4 text-orange-500" />
                    )}
                    {forum.isLocked && (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {forum.description || "Discussion area for this program."}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs rounded-full bg-blue-100 px-3 py-1 text-brandPrimary font-medium">
                    {forum.threadCount} threads
                  </span>
                  <span className="text-xs rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                    {forum.postCount} posts
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Last activity:{" "}
                  {forum.lastActivity
                    ? new Date(forum.lastActivity).toLocaleDateString()
                    : "No posts yet"}
                </span>
                <span className="text-brandPrimary font-medium hover:underline">
                  View threads →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  );
}
