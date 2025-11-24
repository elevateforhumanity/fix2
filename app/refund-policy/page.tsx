// app/refund-policy/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Elevate For Humanity",
  description: "Refund policy for Elevate for Humanity training programs. Learn about our policies for funded and self-pay students.",
};

export default function RefundPolicyPage() {
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
            Refund Policy
          </h1>
          <p className="text-slate-600 mb-8">
            Last Updated: January 2025
          </p>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Overview
            </h2>
            <p className="text-slate-700 mb-4">
              Elevate for Humanity is committed to providing accessible, high-quality career training. Since most of our programs are 100% funded through state and federal programs (WIOA, WRG, Next Level Jobs), there are typically no tuition costs to students and therefore no refunds to process.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Funded Programs (WIOA, WRG, Next Level Jobs)
            </h2>
            <p className="text-slate-700 mb-4">
              For students enrolled through state or federal funding programs:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>There is no tuition cost to the student</li>
              <li>All training costs are covered by the funding program</li>
              <li>Students do not pay for books, supplies, or certification exams</li>
              <li>No refunds are applicable as no payment was made by the student</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Withdrawal Policy
            </h2>
            <p className="text-slate-700 mb-4">
              Students may withdraw from a program at any time by providing written notice to their advisor. The withdrawal policy varies based on funding source:
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              Before Program Start
            </h3>
            <p className="text-slate-700 mb-4">
              Students may withdraw before the program start date without penalty. Any materials provided will be returned.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              During First Week
            </h3>
            <p className="text-slate-700 mb-4">
              Students may withdraw during the first week of training without impacting future funding eligibility. Materials must be returned in good condition.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              After First Week
            </h3>
            <p className="text-slate-700 mb-4">
              Withdrawal after the first week may impact future funding eligibility depending on the funding source. Students should consult with their advisor before withdrawing.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Self-Pay Students
            </h2>
            <p className="text-slate-700 mb-4">
              In rare cases where a student pays out-of-pocket for training:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Before Program Start:</strong> 100% refund minus $50 administrative fee</li>
              <li><strong>First Week:</strong> 75% refund</li>
              <li><strong>Second Week:</strong> 50% refund</li>
              <li><strong>After Second Week:</strong> No refund</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Program Cancellation by Elevate
            </h2>
            <p className="text-slate-700 mb-4">
              If Elevate for Humanity cancels a program:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>Students will receive full refund of any payments made</li>
              <li>Students will be offered enrollment in the next available cohort</li>
              <li>Students may transfer to a different program without penalty</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Materials and Equipment
            </h2>
            <p className="text-slate-700 mb-4">
              All materials, books, and equipment provided by Elevate for Humanity remain the property of the organization unless otherwise stated. Upon withdrawal, students must return all materials in good condition within 7 days.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Refund Processing
            </h2>
            <p className="text-slate-700 mb-4">
              Approved refunds will be processed within 30 business days of the withdrawal date. Refunds will be issued using the original payment method.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Questions
            </h2>
            <p className="text-slate-700 mb-4">
              If you have questions about our refund policy, please contact:
            </p>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <p className="text-slate-700">
                <strong>Elevate for Humanity</strong><br />
                Email: <a href="mailto:info@elevateforhumanity.org" className="text-emerald-600 hover:text-emerald-700">info@elevateforhumanity.org</a><br />
                Phone: <a href="tel:+13175551234" className="text-emerald-600 hover:text-emerald-700">(317) 555-1234</a>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Policy Changes
            </h2>
            <p className="text-slate-700 mb-4">
              Elevate for Humanity reserves the right to modify this refund policy at any time. Changes will be posted on this page with an updated "Last Updated" date. Students enrolled at the time of policy changes will be subject to the policy in effect at the time of their enrollment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
