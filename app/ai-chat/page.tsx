'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const PRESET_PROMPTS: { label: string; text: string }[] = [
  {
    label: 'WRG / WIOA Program',
    text: 'Help me write a WRG/WIOA-friendly description for an Elevate for Humanity HVAC training program, including outcomes, target audience, and wraparound supports.',
  },
  {
    label: 'Apprenticeship Pitch',
    text: 'Create a clear, funder-ready explanation of how Elevate for Humanity uses DOL-registered apprenticeships and JRI/EmployIndy partners to move people into sustainable careers.',
  },
  {
    label: 'Partner One-Pager',
    text: 'Draft a one-page overview that I can give to employers and community partners explaining Elevate for Humanity, our LMS, and how we handle onboarding and support.',
  },
  {
    label: 'Student Success Story',
    text: 'Write a compelling student success story template that I can use for social media and grant reports, focusing on transformation and outcomes.',
  },
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hey boss 👋 I'm your Elevate AI Helper. Ask me about programs, apprenticeships, WRG, JRI, WIOA, or anything you're building.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessages = async (allMessages: ChatMessage[]) => {
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Request failed');
      }

      const data = await res.json();
      const reply: ChatMessage = {
        role: 'assistant',
        content: data.reply,
      };
      setMessages((prev) => [...prev, reply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I hit an error talking to the AI engine. Check your API key, then try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
    };
    const nextMessages = [...messages, newMessage];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    await sendMessages(nextMessages);
  };

  const handlePresetClick = async (text: string) => {
    if (loading) return;

    const newMessage: ChatMessage = {
      role: 'user',
      content: text,
    };
    const nextMessages = [...messages, newMessage];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    await sendMessages(nextMessages);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-efh-orange to-efh-red flex items-center justify-center text-white font-bold text-lg shadow-md">
              E
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-sm text-slate-900">
                Elevate for Humanity
              </div>
              <div className="text-xs text-slate-500">
                Workforce · Wellness · AI Assistant
              </div>
            </div>
          </Link>
          <span className="hidden sm:inline text-xs font-semibold text-efh-red uppercase tracking-[0.2em]">
            AI HELPER
          </span>
        </div>
      </header>
      {/* Main Chat Area */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-4 md:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)] h-[calc(100vh-140px)]">
          {/* Chat area */}
          <section className="flex flex-col bg-white/90 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h1 className="text-base font-semibold text-slate-900">
                    Elevate AI Chat
                  </h1>
                  <p className="text-xs text-slate-500">
                    Ask questions. Plan programs. Refine grants. Boss energy
                    only.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-[11px] font-medium">
                  ● Online
                </span>
              </div>
              {/* Preset prompts */}
              <div className="flex flex-wrap gap-2">
                {PRESET_PROMPTS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePresetClick(preset.text)}
                    disabled={loading}
                    className="text-[11px] rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={[
                      'max-w-[80%] rounded-2xl px-3 py-2 shadow-sm',
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-efh-orange to-efh-red text-white'
                        : 'bg-slate-100 text-slate-900',
                    ].join(' ')}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-500 rounded-2xl px-3 py-2 text-xs">
                    Thinking…
                  </div>
                </div>
              )}
            </div>
            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-200 px-4 py-3 bg-white"
            >
              <div className="flex items-center gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question about Elevate, WRG, JRI, WIOA, apprenticeships…"
                  className="flex-1 resize-none rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-efh-orange/60 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as any);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-2xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-efh-orange via-red-500 to-efh-red shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  {loading ? 'Sending…' : 'Send'}
                </button>
              </div>
            </form>
          </section>
          {/* Right panel – strategy ideas */}
          <aside className="hidden md:flex flex-col bg-white/80 rounded-3xl border border-slate-200 shadow-sm p-4 space-y-4 text-xs">
            <h2 className="text-sm font-semibold text-slate-900">
              Strategy ideas
            </h2>
            <ul className="space-y-2 text-slate-600">
              <li>• Turn your LMS features into a funder-ready one-pager.</li>
              <li>• Map WRG / JRI / WIOA language into Elevate wording.</li>
              <li>• Draft social posts announcing new apprenticeships.</li>
              <li>• Create compelling student success stories for grants.</li>
              <li>• Write partner outreach emails that convert.</li>
            </ul>
            <div className="mt-2 rounded-2xl bg-gradient-to-br from-efh-orange/10 to-efh-red/10 p-3 text-[11px] text-slate-700">
              Pro tip: Paste language from WorkOne, EmployIndy, WRG, or JRI and
              say "Rewrite this in Elevate for Humanity voice for students,
              partners, or funders."
            </div>
            <div className="mt-auto pt-4 border-t border-slate-200">
              <Link
                href="/"
                className="block text-center px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
