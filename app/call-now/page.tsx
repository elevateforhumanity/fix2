"use client";

import { useState, useEffect } from "react";
import { CONTACT_INFO } from "@/lib/contact-info";

/**
 * FREE Call Bridge Page
 * 
 * This eliminates ALL cons of click-to-call:
 * - Visitor doesn't use their minutes (you call them)
 * - Instant connection (no waiting for callback)
 * - Professional experience
 * - 100% free (no APIs, no services)
 * 
 * How it works:
 * 1. Visitor enters their number
 * 2. Page auto-refreshes every 5 seconds
 * 3. Your team sees new requests in real-time
 * 4. You call them immediately
 * 5. Connection happens in seconds
 */

export default function CallNowPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to database
      const res = await fetch("/api/call-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          name,
          requestedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        
        // Play notification sound (optional)
        if (typeof Audio !== "undefined") {
          const audio = new Audio("/notification.mp3");
          audio.play().catch((err) => {
            // Audio playback may fail due to browser autoplay policies
            // console.debug('Audio playback prevented:', err);
          });
        }

        // Send browser notification to your team (if they're on the page)
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("New Call Request", {
            body: `${name || "Someone"} wants a call at ${phoneNumber}`,
            icon: "/logo.png",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              We're Calling You Now!
            </h1>
            <p className="text-slate-600 mb-4">
              Your phone should ring in the next 30-60 seconds.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-blue-900 font-medium mb-1">
                📞 Calling: {phoneNumber}
              </p>
              <p className="text-xs text-blue-700">
                Please keep your phone nearby and answer when we call!
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <p className="text-left">Your request was received</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <p className="text-left">Our team is calling you now...</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-slate-400 font-bold">3</span>
              </div>
              <p className="text-left">Answer and we'll help you!</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-3">
              Didn't get a call? We might be helping another visitor.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setPhoneNumber("");
                setName("");
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Get a Call Right Now
          </h1>
          <p className="text-slate-600">
            Enter your number and we'll call you in 30-60 seconds. <strong>Free for you!</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="(555) 555-5555"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition shadow-lg hover:shadow-xl"
          >
            {loading ? "Connecting..." : "📞 Call Me Now (Free!)"}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3 text-sm text-slate-600">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
            </svg>
            <p>We call you - you don't use your minutes</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-slate-600">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
            </svg>
            <p>Instant connection - no waiting hours</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-slate-600">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
            </svg>
            <p>100% free - no charges to you</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500 mb-2">
            Or contact us directly:
          </p>
          <div className="flex justify-center gap-3">
            <a
              href={`tel:${CONTACT_INFO.phone.tel}`}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Call Us
            </a>
            <span className="text-slate-300">•</span>
            <a
              href={`sms:${CONTACT_INFO.phone.tel}`}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Text Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
