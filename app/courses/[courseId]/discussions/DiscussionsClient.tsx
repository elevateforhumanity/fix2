'use client';

import { useState } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  Pin,
  Search,
  Filter,
  Send,
  Paperclip,
  AtSign,
  MoreVertical,
  Flag,
  Edit,
  Trash2,
} from 'lucide-react';

type Reply = {
  id: string;
  body: string;
  author_id: string;
  author_name?: string;
  created_at: string;
  likes: number;
  liked_by_user?: boolean;
};

type Thread = {
  id: string;
  title: string;
  body: string;
  author_id: string;
  author_name?: string;
  created_at: string;
  replies: Reply[];
  likes: number;
  liked_by_user?: boolean;
  is_pinned?: boolean;
  reply_count?: number;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'pinned' | 'popular'>('all');
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});

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

  async function createReply(threadId: string) {
    const text = replyText[threadId];
    if (!text?.trim()) return;

    const res = await fetch('/api/discussions/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId, body: text }),
    });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Unable to post reply');
      return;
    }

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              replies: [...t.replies, data.reply],
              reply_count: (t.reply_count || 0) + 1,
            }
          : t
      )
    );
    setReplyText((prev) => ({ ...prev, [threadId]: '' }));
  }

  async function toggleLike(
    threadId: string,
    isReply: boolean = false,
    replyId?: string
  ) {
    const endpoint = isReply
      ? '/api/discussions/like-reply'
      : '/api/discussions/like-thread';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId, replyId }),
    });

    if (!res.ok) return;

    if (isReply && replyId) {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? {
                ...t,
                replies: t.replies.map((r) =>
                  r.id === replyId
                    ? {
                        ...r,
                        likes: r.liked_by_user ? r.likes - 1 : r.likes + 1,
                        liked_by_user: !r.liked_by_user,
                      }
                    : r
                ),
              }
            : t
        )
      );
    } else {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? {
                ...t,
                likes: t.liked_by_user ? t.likes - 1 : t.likes + 1,
                liked_by_user: !t.liked_by_user,
              }
            : t
        )
      );
    }
  }

  async function togglePin(threadId: string) {
    const res = await fetch('/api/discussions/pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId }),
    });

    if (!res.ok) return;

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, is_pinned: !t.is_pinned } : t
      )
    );
  }

  const filteredThreads = threads
    .filter((t) => {
      if (filterBy === 'pinned') return t.is_pinned;
      if (filterBy === 'popular') return t.likes > 5;
      return true;
    })
    .filter((t) =>
      searchQuery
        ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.body.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Course Discussions
          </h1>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
            >
              <option value="all">All Threads</option>
              <option value="pinned">Pinned</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        <form
          onSubmit={createThread}
          className="mb-6 space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MessageCircle className="h-4 w-4" />
            Start a new discussion
          </div>
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Discussion title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="h-32 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="What would you like to discuss? Use @username to mention someone..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                title="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                title="Mention user"
              >
                <AtSign className="h-4 w-4" />
              </button>
            </div>
            <button
              type="submit"
              disabled={posting}
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {posting ? 'Posting…' : 'Post Discussion'}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {filteredThreads.map((t) => (
            <article
              key={t.id}
              className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {t.is_pinned && (
                        <Pin className="h-4 w-4 text-orange-500" />
                      )}
                      <h2 className="text-lg font-semibold text-slate-900">
                        {t.title}
                      </h2>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{t.body}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Posted by {t.author_name || 'User'}</span>
                      <span>•</span>
                      <span>{new Date(t.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{t.reply_count || t.replies.length} replies</span>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-100">
                    <MoreVertical className="h-4 w-4 text-slate-400" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => toggleLike(t.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      t.liked_by_user
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {t.likes || 0}
                  </button>
                  <button
                    onClick={() =>
                      setExpandedThreadId(
                        expandedThreadId === t.id ? null : t.id
                      )
                    }
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-600 hover:bg-slate-100"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Reply
                  </button>
                  <button
                    onClick={() => togglePin(t.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-600 hover:bg-slate-100"
                  >
                    <Pin className="h-4 w-4" />
                    {t.is_pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-600 hover:bg-slate-100">
                    <Flag className="h-4 w-4" />
                    Report
                  </button>
                </div>
              </div>

              {expandedThreadId === t.id && (
                <div className="border-t border-slate-200 bg-slate-50 p-5">
                  <div className="space-y-4 mb-4">
                    {t.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="bg-white rounded-lg p-4 border border-slate-200"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm text-slate-700 mb-2">
                              {reply.body}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span>{reply.author_name || 'User'}</span>
                              <span>•</span>
                              <span>
                                {new Date(
                                  reply.created_at
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <button className="p-1 rounded hover:bg-slate-100">
                            <MoreVertical className="h-3 w-3 text-slate-400" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => toggleLike(t.id, true, reply.id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                              reply.liked_by_user
                                ? 'bg-orange-50 text-orange-600'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <ThumbsUp className="h-3 w-3" />
                            {reply.likes || 0}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={replyText[t.id] || ''}
                      onChange={(e) =>
                        setReplyText((prev) => ({
                          ...prev,
                          [t.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          createReply(t.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => createReply(t.id)}
                      className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
          {filteredThreads.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">
                {searchQuery
                  ? 'No discussions found matching your search.'
                  : 'No discussions yet. Be the first to start one!'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
