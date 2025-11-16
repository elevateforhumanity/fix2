'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

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

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
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
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h1 className="text-base font-semibold text-slate-900">
                  Elevate AI Chat
                </h1>
                <p className="text-xs text-slate-500">
                  Ask questions. Plan programs. Refine grants. Boss energy only.
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-[11px] font-medium">
                ● Online
              </span>
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

          {/* Right panel – info / script ideas */}
          <aside className="hidden md:flex flex-col bg-white/80 rounded-3xl border border-slate-200 shadow-sm p-4 space-y-4 text-xs">
            <h2 className="text-sm font-semibold text-slate-900">
              Try asking me:
            </h2>
            <ul className="space-y-2 text-slate-600">
              <li>
                • Draft a WRG / WIOA friendly program description for HVAC.
              </li>
              <li>• Explain ETPL + JRI + apprenticeships like I'm a funder.</li>
              <li>• Rewrite this grant paragraph to sound more polished.</li>
              <li>
                • What are the requirements for truck driving certification?
              </li>
              <li>• Help me write a student success story.</li>
            </ul>
            <div className="mt-2 rounded-2xl bg-gradient-to-br from-efh-orange/10 to-efh-red/10 p-3 text-[11px] text-slate-700">
              Pro tip: Paste in text from partner sites (WorkOne, EmployIndy,
              WRG, JRI) and ask me to "translate" it into Elevate language.
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
