// app/lms/forums/[forumId]/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MessageSquare, Eye, Pin, Lock, Plus } from "lucide-react";

type ThreadSummary = {
  id: string;
  title: string;
  createdAt: string;
  lastActivity: string;
  createdByName: string;
  replyCount: number;
  viewCount: number;
  isPinned: boolean;
  isLocked: boolean;
};

export default function ForumThreadsPage() {
  const params = useParams<{ forumId: string }>();
  const forumId = params.forumId;
  const router = useRouter();

  const [threads, setThreads] = useState<ThreadSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function loadThreads() {
    setLoading(true);
    try {
      const res = await fetch(`/api/forums/${forumId}`);
      const data = await res.json();
      setThreads(data);
    } catch (e) {
      console.error("Failed to load threads", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (forumId) loadThreads();
  }, [forumId]);

  async function handleCreateThread(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      setCreating(true);
      const res = await fetch(`/api/forums/${forumId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      if (!res.ok) {
        console.error("Failed to create thread");
        return;
      }
      const data = await res.json();
      setTitle("");
      setContent("");
      setShowCreateForm(false);
      await loadThreads();
      if (data.threadId) {
        router.push(`/lms/forums/${forumId}/threads/${data.threadId}`);
      }
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <Link
            href="/lms/forums"
            className="text-xs text-blue-600 hover:underline mb-2 inline-block"
          >
            ← Back to all forums
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Forum Discussions</h1>
          <p className="text-sm text-slate-600 mt-1">
            Ask questions, share knowledge, and connect with your community
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Thread
        </button>
      </header>

      {showCreateForm && (
        <section className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Start a new discussion</h2>
          <form onSubmit={handleCreateThread} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Thread Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Struggling with HVAC electrical module"
                className="w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Your Question or Topic
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe your question, share a win, or start a discussion..."
                className="w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm min-h-[120px] focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating || !title.trim() || !content.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {creating ? "Creating..." : "Create Thread"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-sm text-slate-500">Loading discussions...</div>
          </div>
        ) : threads.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p className="text-sm text-slate-600 mb-2">No discussions yet</p>
            <p className="text-xs text-slate-500">
              Be the first to start a conversation in this forum!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {threads.map((t) => (
              <Link
                key={t.id}
                href={`/lms/forums/${forumId}/threads/${t.id}`}
                className="block rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {t.isPinned && <Pin className="w-4 h-4 text-orange-500" />}
                      {t.isLocked && <Lock className="w-4 h-4 text-slate-400" />}
                      <h3 className="text-base font-semibold text-slate-900">{t.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600">
                      Started by {t.createdByName} • {new Date(t.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {t.replyCount} {t.replyCount === 1 ? "reply" : "replies"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {t.viewCount} views
                  </span>
                  <span className="ml-auto">
                    Last activity: {new Date(t.lastActivity).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
