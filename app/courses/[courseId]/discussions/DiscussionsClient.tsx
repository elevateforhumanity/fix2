'use client';

import { useState } from 'react';

type Reply = {
  id: string;
  body: string;
  author_id: string;
  created_at: string;
};

type Thread = {
  id: string;
  title: string;
  body: string;
  author_id: string;
  created_at: string;
  replies: Reply[];
};

export default function DiscussionsClient({
  courseId,
  initialThreads,
  currentUserId,
}: {
  courseId: string;
  initialThreads: Thread[];
  currentUserId: string;
}) {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posting, setPosting] = useState(false);

  async function createThread(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !body) return;
    setPosting(true);

    const res = await fetch('/api/discussions/thread', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, title, body }),
    });
    const data = await res.json();
    setPosting(false);

    if (!res.ok) {
      alert(data.error || 'Unable to post thread');
      return;
    }

    setThreads((prev) => [data.thread, ...prev]);
    setTitle('');
    setBody('');
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Course Discussions
        </h1>

        <form
          onSubmit={createThread}
          className="mt-4 space-y-2 rounded-2xl border border-slate-100 bg-white p-4 text-sm shadow-sm"
        >
          <p className="text-xs font-semibold text-slate-700">
            Start a new topic
          </p>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Short topic title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Ask a question or start a discussion…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            type="submit"
            disabled={posting}
            className="rounded-2xl bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-60"
          >
            {posting ? 'Posting…' : 'Post'}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {threads.map((t) => (
            <article
              key={t.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 text-sm shadow-sm"
            >
              <h2 className="text-sm font-semibold text-slate-900">
                {t.title}
              </h2>
              <p className="mt-1 text-sm text-slate-700">{t.body}</p>
              <p className="mt-1 text-[10px] text-slate-500">
                Posted {new Date(t.created_at).toLocaleString()}
              </p>
            </article>
          ))}
          {threads.length === 0 && (
            <p className="text-sm text-slate-500">
              No discussions yet. Be the first to post.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
