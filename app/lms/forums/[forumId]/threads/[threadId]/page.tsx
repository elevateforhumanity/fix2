// app/lms/forums/[forumId]/threads/[threadId]/page.tsx
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, ThumbsUp, CheckCircle, Lock } from "lucide-react";

type ThreadDetail = {
  id: string;
  title: string;
  createdAt: string;
  lastActivity: string;
  createdByName: string;
  viewCount: number;
  isLocked: boolean;
};

type Post = {
  id: string;
  content: string;
  createdAt: string;
  authorName: string;
  avatarUrl: string | null;
  isSolution: boolean;
  likesCount: number;
};

type ThreadResponse = {
  thread: ThreadDetail;
  posts: Post[];
};

export default function ThreadPage() {
  const params = useParams<{ forumId: string; threadId: string }>();
  const { forumId, threadId } = params;

  const [data, setData] = useState<ThreadResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [posting, setPosting] = useState(false);

  async function loadThread() {
    if (!forumId || !threadId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/forums/${forumId}/threads/${threadId}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Failed to load thread", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadThread();
  }, [forumId, threadId]);

  async function handleReply(e: FormEvent) {
    e.preventDefault();
    if (!reply.trim()) return;

    try {
      setPosting(true);
      const res = await fetch(`/api/forums/${forumId}/threads/${threadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reply.trim() }),
      });
      if (!res.ok) {
        console.error("Failed to post reply");
        return;
      }
      setReply("");
      await loadThread();
    } finally {
      setPosting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm text-slate-500">Loading discussion...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-slate-600 mb-4">Thread not found or unavailable.</p>
        <Link
          href={`/lms/forums/${forumId}`}
          className="text-sm text-brandPrimary hover:underline"
        >
          ← Back to forum
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <Link
          href={`/lms/forums/${forumId}`}
          className="inline-flex items-center gap-1 text-sm text-brandPrimary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to forum
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-2">
            {data.thread.isLocked && (
              <span className="flex items-center gap-1 text-xs rounded-full bg-slate-100 px-2 py-1 text-slate-600">
                <Lock className="w-3 h-3" />
                Locked
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{data.thread.title}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>Started by {data.thread.createdByName}</span>
            <span>•</span>
            <span>{new Date(data.thread.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {data.thread.viewCount} views
            </span>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        {data.posts.map((p, index) => (
          <article
            key={p.id}
            className={`rounded-2xl border-2 bg-white p-5 shadow-sm ${
              p.isSolution ? "border-green-300 bg-green-50" : "border-slate-200"
            }`}
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                {p.avatarUrl ? (
                  <img
                    src={p.avatarUrl}
                    alt={p.authorName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center text-sm text-white font-bold">
                    {p.authorName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{p.authorName}</span>
                      {index === 0 && (
                        <span className="text-xs rounded-full bg-blue-100 px-2 py-0.5 text-brandPrimary">
                          Original Poster
                        </span>
                      )}
                      {p.isSolution && (
                        <span className="flex items-center gap-1 text-xs rounded-full bg-green-100 px-2 py-0.5 text-green-700">
                          <CheckCircle className="w-3 h-3" />
                          Solution
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(p.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {p.content}
                </p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
                  <button className="flex items-center gap-1 text-xs text-slate-600 hover:text-brandPrimary transition">
                    <ThumbsUp className="w-3 h-3" />
                    {p.likesCount > 0 && <span>{p.likesCount}</span>}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {data.posts.length === 0 && (
          <div className="text-center py-8 text-sm text-slate-500">
            No replies yet. Be the first to respond!
          </div>
        )}
      </section>

      {!data.thread.isLocked ? (
        <section className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900 mb-3">Add your reply</h2>
          <form onSubmit={handleReply} className="space-y-3">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Share your thoughts, answer the question, or add to the discussion..."
              className="w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm min-h-[100px] focus:border-brandPrimary focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={posting || !reply.trim()}
                className="rounded-lg bg-brandPrimary px-6 py-2 text-sm font-semibold text-white hover:bg-brandPrimaryDark disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {posting ? "Posting..." : "Post Reply"}
              </button>
            </div>
          </form>
        </section>
      ) : (
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 text-center">
          <Lock className="w-8 h-8 mx-auto mb-2 text-slate-400" />
          <p className="text-sm text-slate-600">This thread is locked and no longer accepting replies.</p>
        </div>
      )}
    </div>
  );
}
