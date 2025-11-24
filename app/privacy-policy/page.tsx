// app/privacy-policy/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Elevate For Humanity",
  description: "Privacy policy for Elevate for Humanity. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600 mb-8">
            Last Updated: January 2025
          </p>

          <div className="prose prose-slate max-w-none space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Introduction
              </h2>
              <p className="text-slate-700">
                Elevate for Humanity ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or participate in our training programs.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Personal Information
              </h3>
              <p className="text-slate-700 mb-3">
                We collect personal information that you voluntarily provide when you apply for training programs, contact us, or use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-slate-700">
                We use your information to process applications, determine funding eligibility, provide training services, and communicate with you about programs.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Data Security
              </h2>
              <p className="text-slate-700">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or disclosure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Your Rights
              </h2>
              <p className="text-slate-700">
                You have the right to access, correct, or delete your personal information. You may also opt-out of marketing communications at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Contact Us
              </h2>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <p className="text-slate-700">
                  <strong>Elevate for Humanity</strong><br />
                  Email: <a href="mailto:privacy@elevateforhumanity.org" className="text-emerald-600 hover:text-emerald-700">privacy@elevateforhumanity.org</a><br />
                  Phone: <a href="tel:+13175551234" className="text-emerald-600 hover:text-emerald-700">(317) 555-1234</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
