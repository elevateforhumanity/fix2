'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function ElevateChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-24 z-40 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white text-sm font-semibold px-5 py-3 shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
        title="Chat with Elevate AI"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">Chat with AI</span>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-scale-in">
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <div className="flex items-center gap-3">
                <MessageCircle size={24} />
                <div>
                  <div className="text-sm font-semibold">Elevate AI Helper</div>
                  <div className="text-xs opacity-90">Powered by OpenAI</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            <iframe
              src="/ai-chat"
              className="flex-1 w-full border-0"
              title="Elevate AI Chat"
            />
          </div>
        </div>
      )}
    </>
  );
}
