"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Role = "Student" | "Instructor" | "Staff";

type Thread = {
  id: string;
  title: string;
  author: string;
  role: Role;
  createdAt: string;
  lastActivity: string;
  replies: number;
  likes: number;
  pinned?: boolean;
  tags?: string[];
};

type Reply = {
  id: string;
  author: string;
  role: Role;
  avatarInitial: string;
  createdAt: string;
  content: string;
  likes: number;
  isInstructor: boolean;
  isMine?: boolean;
};

type SortOption = "recent" | "active" | "likes";

const initialThreads: Thread[] = [
  {
    id: "t1",
    title: "Balancing work, family & training (any tips?)",
    author: "Ashley R.",
    role: "Student",
    createdAt: "2 days ago",
    lastActivity: "1 hour ago",
    replies: 8,
    likes: 21,
    pinned: true,
    tags: ["Support", "Scheduling"],
  },
  {
    id: "t2",
    title: "Live session: What to bring to your first clinical day",
    author: "Nurse Williams",
    role: "Instructor",
    createdAt: "3 days ago",
    lastActivity: "Yesterday",
    replies: 12,
    likes: 34,
    pinned: true,
    tags: ["Announcement", "Clinical"],
  },
  {
    id: "t3",
    title: "Struggling with Module 2 quiz – HVAC safety",
    author: "James P.",
    role: "Student",
    createdAt: "5 hours ago",
    lastActivity: "3 hours ago",
    replies: 5,
    likes: 9,
    tags: ["Quiz", "HVAC"],
  },
  {
    id: "t4",
    title: "Share your first client success story ✂️",
    author: "Coach D",
    role: "Instructor",
    createdAt: "1 week ago",
    lastActivity: "2 days ago",
    replies: 18,
    likes: 47,
    tags: ["Barber", "Wins"],
  },
];

const initialRepliesByThread: Record<string, Reply[]> = {
  t1: [
    {
      id: "r1",
      author: "Ashley R.",
      role: "Student",
      avatarInitial: "A",
      createdAt: "2 days ago",
      content:
        "I'm working full-time, have kids, and doing this program. How are y'all managing it without burning out?",
      likes: 10,
      isInstructor: false,
      isMine: true,
    },
    {
      id: "r2",
      author: "Coach Dee",
      role: "Instructor",
      avatarInitial: "D",
      createdAt: "Yesterday",
      content:
        "Set a fixed training block (even 30–45 min a day) and protect it like a work shift. Also use the mobile view to sneak in lessons on breaks.",
      likes: 15,
      isInstructor: true,
    },
    {
      id: "r3",
      author: "Marcus T.",
      role: "Student",
      avatarInitial: "M",
      createdAt: "1 hour ago",
      content:
        "I do modules after the kids go to bed and batch my assignments on Sundays. Also told my family this is 'temporary grind time' for a bigger goal.",
      likes: 5,
      isInstructor: false,
    },
  ],
  t2: [
    {
      id: "r4",
      author: "Nurse Williams",
      role: "Instructor",
      avatarInitial: "W",
      createdAt: "3 days ago",
      content:
        "For clinical: bring your badge, notebook, pen, and comfortable shoes. No long nails, no heavy perfumes, and hair pulled back.",
      likes: 22,
      isInstructor: true,
    },
  ],
  t3: [
    {
      id: "r5",
      author: "James P.",
      role: "Student",
      avatarInitial: "J",
      createdAt: "5 hours ago",
      content:
        "I keep missing questions on lockout/tagout. Any memory tricks?",
      likes: 2,
      isInstructor: false,
    },
    {
      id: "r6",
      author: "HVAC Instructor",
      role: "Instructor",
      avatarInitial: "H",
      createdAt: "3 hours ago",
      content:
        "Think: 'LOCK it, TAG it, TEST it.' Never touch equipment again until you confirm it's safe. That phrase will help on the quiz and on the job.",
      likes: 7,
      isInstructor: true,
    },
  ],
  t4: [
    {
      id: "r7",
      author: "Coach D",
      role: "Instructor",
      avatarInitial: "D",
      createdAt: "1 week ago",
      content:
        "Drop your first client success stories here. The little wins matter – first edge-up, first clean fade, first tip, all of it counts.",
      likes: 19,
      isInstructor: true,
    },
  ],
};

export default function CourseDiscussionsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [repliesByThread, setRepliesByThread] = useState<
    Record<string, Reply[]>
  >(initialRepliesByThread);
  const [selectedThreadId, setSelectedThreadId] = useState<string>(
    initialThreads[0]?.id ?? ""
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("active");
  const [newReply, setNewReply] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  const filteredThreads = useMemo(() => {
    let result = [...threads];

    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(s) ||
          t.author.toLowerCase().includes(s) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(s))
      );
    }

    // Always keep pinned threads at top
    result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

    // Then sort by selected option
    const nonPinned = result.filter((t) => !t.pinned);
    const pinned = result.filter((t) => t.pinned);

    nonPinned.sort((a, b) => {
      switch (sort) {
        case "recent":
          return 0; // already roughly in time order by default data
        case "active":
          return b.replies - a.replies;
        case "likes":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

    return [...pinned, ...nonPinned];
  }, [threads, search, sort]);

  const currentReplies: Reply[] = useMemo(() => {
    if (!selectedThreadId) return [];
    return repliesByThread[selectedThreadId] ?? [];
  }, [repliesByThread, selectedThreadId]);

  function handleSelectThread(id: string) {
    setSelectedThreadId(id);
    setNewReply("");
  }

  function handleLikeThread(id: string) {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, likes: t.likes + 1 } : t
      )
    );
  }

  function handleLikeReply(threadId: string, replyId: string) {
    setRepliesByThread((prev) => {
      const list = prev[threadId] ?? [];
      return {
        ...prev,
        [threadId]: list.map((r) =>
          r.id === replyId ? { ...r, likes: r.likes + 1 } : r
        ),
      };
    });
  }

  async function handlePostReply() {
    const trimmed = newReply.trim();
    if (!trimmed || !selectedThread) return;
    setIsPosting(true);

    // In production you would:
    // - Call Supabase / API to insert reply
    // - Re-fetch thread replies
    // Here we just simulate local append.
    const newReplyObj: Reply = {
      id: `local-${Date.now()}`,
      author: "You",
      role: "Student",
      avatarInitial: "Y",
      createdAt: "Just now",
      content: trimmed,
      likes: 0,
      isInstructor: false,
      isMine: true,
    };

    setRepliesByThread((prev) => {
      const list = prev[selectedThread.id] ?? [];
      return {
        ...prev,
        [selectedThread.id]: [...list, newReplyObj],
      };
    });

    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedThread.id
          ? { ...t, replies: (t.replies ?? 0) + 1, lastActivity: "Just now" }
          : t
      )
    );

    setNewReply("");
    setIsPosting(false);
  }

  const courseLabel = useMemo(() => {
    // You can replace this with a real course title lookup.
    return params.courseId
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }, [params.courseId]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-12">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
              Course Discussions
            </p>
            <h1 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900">
              Community Discussion – {courseLabel}
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Ask questions, share wins, and support other learners in this
              program. Instructors and staff may highlight important responses
              and announcements.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/lms/course/${params.courseId}`}
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
            >
              ← Back to Course
            </Link>
          </div>
        </header>

        {/* Top tools: search + filters */}
        <section className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search discussions by topic, name, or tag…"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                🔍
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Sort by:</span>
            <button
              type="button"
              onClick={() => setSort("active")}
              className={`rounded-full px-3 py-1 font-semibold ${
                sort === "active"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Most active
            </button>
            <button
              type="button"
              onClick={() => setSort("recent")}
              className={`rounded-full px-3 py-1 font-semibold ${
                sort === "recent"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Newest
            </button>
            <button
              type="button"
              onClick={() => setSort("likes")}
              className={`rounded-full px-3 py-1 font-semibold ${
                sort === "likes"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Most liked
            </button>
          </div>
        </section>

        {/* Main split layout */}
        <section className="grid gap-5 lg:grid-cols-[1.4fr,2fr]">
          {/* Thread list */}
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                All Threads
              </h2>
              <span className="text-[11px] text-slate-500">
                {filteredThreads.length} open discussions
              </span>
            </div>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {filteredThreads.map((thread) => {
                const isActive = thread.id === selectedThreadId;
                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => handleSelectThread(thread.id)}
                    className={`w-full text-left rounded-xl px-3 py-2.5 text-xs transition border ${
                      isActive
                        ? "border-blue-200 bg-blue-50"
                        : "border-slate-100 bg-slate-50/70 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          {thread.pinned && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                              📌 Pinned
                            </span>
                          )}
                          <p className="font-semibold text-slate-900">
                            {thread.title}
                          </p>
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {thread.author} · {thread.role} ·{" "}
                          {thread.createdAt}
                        </p>
                        {thread.tags && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {thread.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeThread(thread.id);
                          }}
                          className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50"
                        >
                          <span>👍</span>
                          <span>{thread.likes}</span>
                        </button>
                        <p className="text-[10px] text-slate-500">
                          💬 {thread.replies} · {thread.lastActivity}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredThreads.length === 0 && (
                <p className="text-xs text-slate-500">
                  No discussions match your search yet. Try a different keyword
                  or start a new thread.
                </p>
              )}
            </div>

            {/* New thread CTA placeholder (UI only – you can wire this later) */}
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-[11px] text-slate-600">
              Want to start a new conversation? In the next phase you can add a
              &quot;New Thread&quot; button here that opens a full editor with title,
              tags, and rich text.
            </div>
          </div>

          {/* Selected thread + replies */}
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col gap-4">
            {selectedThread ? (
              <>
                {/* Thread header */}
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        {selectedThread.pinned && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                            📌 Pinned by Instructor
                          </span>
                        )}
                        <h2 className="text-sm md:text-base font-semibold text-slate-900">
                          {selectedThread.title}
                        </h2>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Started by {selectedThread.author} ·{" "}
                        {selectedThread.role} · {selectedThread.createdAt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleLikeThread(selectedThread.id)}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100"
                    >
                      <span>👍</span>
                      <span>{selectedThread.likes}</span>
                    </button>
                  </div>
                </div>

                {/* Replies list */}
                <div className="flex-1 space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {currentReplies.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      No replies yet. Be the first to share your experience,
                      question, or encouragement.
                    </p>
                  ) : (
                    currentReplies.map((reply) => (
                      <div
                        key={reply.id}
                        className={`rounded-xl border px-3 py-2.5 text-xs ${
                          reply.isInstructor
                            ? "border-blue-100 bg-blue-50/70"
                            : "border-slate-100 bg-slate-50/70"
                        }`}
                      >
                        <div className="mb-1.5 flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-slate-50">
                              {reply.avatarInitial}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {reply.author}{" "}
                                {reply.isInstructor && (
                                  <span className="ml-1 rounded-full bg-blue-600 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                                    Instructor
                                  </span>
                                )}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {reply.createdAt}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleLikeReply(selectedThread.id, reply.id)
                            }
                            className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50"
                          >
                            <span>👍</span>
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                        <p className="text-[11px] whitespace-pre-wrap text-slate-800">
                          {reply.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* New reply box */}
                <div className="border-t border-slate-100 pt-3">
                  <p className="mb-1 text-[11px] font-semibold text-slate-800">
                    Add your reply
                  </p>
                  <p className="mb-2 text-[10px] text-slate-500">
                    Be respectful. No personal identifiers or private health
                    details. This space is for support, not emergency services.
                  </p>
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows={3}
                    placeholder="Share your experience, tip, or question…"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[10px] text-slate-500">
                      You are posting as <span className="font-semibold">You</span>{" "}
                      (Student)
                    </p>
                    <button
                      type="button"
                      disabled={!newReply.trim() || isPosting}
                      onClick={handlePostReply}
                      className={`inline-flex items-center justify-center rounded-lg px-4 py-1.5 text-[11px] font-semibold shadow-sm transition ${
                        !newReply.trim() || isPosting
                          ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isPosting ? "Posting…" : "Post Reply"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">
                Select a thread from the left to view replies and join the
                conversation.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
