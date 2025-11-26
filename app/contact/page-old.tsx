// app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-orange-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 mb-6">
              <Mail size={16} />
              <span>Get In Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Contact Us
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Have questions about our programs, funding, or how to get started? We're here to help. Reach out and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <Phone size={20} className="text-red-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1">Phone</div>
                      <a href="tel:+13173143757" className="text-slate-600 hover:text-red-600 transition-colors">
                        (317) 314-3757
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Mail size={20} className="text-brandPrimary" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1">Email</div>
                      <a href="mailto:Elevate4humanityedu@gmail.com" className="text-slate-600 hover:text-brandPrimary transition-colors">
                        Elevate4humanityedu@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <MapPin size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1">Location</div>
                      <p className="text-slate-600">
                        8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240<br />
                        Serving Indianapolis and surrounding areas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <Clock size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1">Hours</div>
                      <p className="text-slate-600">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: By appointment<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/apply" className="block text-red-600 hover:text-red-700 font-semibold transition-colors">
                    → Apply Now
                  </Link>
                  <Link href="/programs" className="block text-slate-600 hover:text-red-600 transition-colors">
                    → View Programs
                  </Link>
                  <Link href="/funding/state-programs" className="block text-slate-600 hover:text-red-600 transition-colors">
                    → Funding Options
                  </Link>
                  <Link href="/faq" className="block text-slate-600 hover:text-red-600 transition-colors">
                    → FAQ
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Send Us a Message
                </h2>

                {status === "success" ? (
                  <div className="p-6 bg-red-50 rounded-xl border border-red-200 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Thank you for contacting us. We'll get back to you within 1-2 business days.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                          placeholder="(317) 314-3757"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                        >
                          <option value="">Select a subject</option>
                          <option value="program-inquiry">Program Inquiry</option>
                          <option value="funding">Funding Questions</option>
                          <option value="application">Application Help</option>
                          <option value="employer">Employer Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    {status === "error" && (
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-red-600">
                          There was an error sending your message. Please try again or call us directly.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-700 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                      <Send size={20} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Callout */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Have a Quick Question?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Check out our FAQ page for answers to common questions about programs, funding, and the application process.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
          >
            View Frequently Asked Questions
            <Mail size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
