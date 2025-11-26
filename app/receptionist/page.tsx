"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CONTACT_INFO } from "@/lib/contact-info";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIReceptionistPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm the Elevate for Humanity AI receptionist. How can I help you today? I can answer questions about our programs, help you apply, connect you with the right person, or schedule a call.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/receptionist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Speak the response
      speak(data.response);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: `I apologize, but I'm having trouble connecting right now. Please try again or call us directly at ${CONTACT_INFO.phone.display}.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: "Apply for Training", action: "I want to apply for training programs" },
    { label: "Talk to Someone", action: "I need to speak with a real person" },
    { label: "Program Information", action: "Tell me about your programs" },
    { label: "Schedule a Call", action: "I'd like to schedule a call" },
  ];

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brandPrimary">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">AI Receptionist</h1>
                <p className="text-xs text-slate-600">Available 24/7 • Instant Responses</p>
              </div>
            </div>
            <Link
              href="/"
              className="text-sm text-brandPrimary hover:text-brandPrimary font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-brandPrimary text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === "user" ? "text-blue-100" : "text-slate-500"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-3">
            <p className="text-xs font-semibold text-slate-600 mb-2">Quick Actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`flex-shrink-0 p-3 rounded-xl transition ${
                  isListening
                    ? "bg-red-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message or use voice..."
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brandPrimary focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 px-6 py-3 bg-brandPrimary text-white rounded-xl hover:bg-brandPrimaryDark disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">AI-Powered</h3>
            <p className="text-xs text-slate-600">Instant answers to your questions</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-2xl mb-2">🎤</div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Voice Enabled</h3>
            <p className="text-xs text-slate-600">Speak or type your questions</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-2xl mb-2">⏰</div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">24/7 Available</h3>
            <p className="text-xs text-slate-600">Get help anytime, day or night</p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900 font-medium mb-2">
            Need to speak with a real person?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="text-sm px-4 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition"
            >
              Contact Form
            </Link>
            <a
              href={`tel:${CONTACT_INFO.phone.tel}`}
              className="text-sm px-4 py-2 bg-white border border-blue-300 text-brandPrimary rounded-lg hover:bg-blue-50 transition flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {CONTACT_INFO.phone.display}
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email.general}`}
              className="text-sm px-4 py-2 bg-white border border-blue-300 text-brandPrimary rounded-lg hover:bg-blue-50 transition flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
          <p className="text-xs text-brandPrimary mt-3">
            📞 Office Hours: {CONTACT_INFO.hours.office}
          </p>
        </div>
      </div>
    </main>
  );
}
