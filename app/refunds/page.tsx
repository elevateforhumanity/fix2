import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy | Elevate for Humanity',
  description: 'Refund and cancellation policy for Elevate for Humanity programs.',
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Refund Policy
        </h1>
        
        <div className="mt-8 space-y-6 text-base text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Free Programs (WIOA, WRG, JRI Funded)
            </h2>
            <p className="mt-3">
              Programs funded through WIOA, Workforce Ready Grants, Job Ready Indy, or other government/grant sources have no tuition cost to eligible participants. Since there is no payment, refunds do not apply.
            </p>
            <p className="mt-3">
              If you need to withdraw from a funded program, contact your case manager or Elevate coach immediately to discuss your options and any requirements from the funding source.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Paid Programs (ETPL & Self-Pay)
            </h2>
            <p className="mt-3">
              For programs where tuition is paid directly by the student or employer:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Before program start:</strong> Full refund minus any non-refundable registration or materials fees (if applicable).
              </li>
              <li>
                <strong>Within first week of program:</strong> Refund of tuition minus 10% administrative fee and any materials provided.
              </li>
              <li>
                <strong>After first week:</strong> Prorated refund based on percentage of program completed, minus administrative fees and materials costs.
              </li>
              <li>
                <strong>After 50% completion:</strong> No refund available.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Employer-Sponsored Programs
            </h2>
            <p className="mt-3">
              For programs paid by employers through OJT, WEX, or direct sponsorship, refund terms are governed by the agreement between Elevate for Humanity and the employer. Contact your HR department or Elevate partnership team for details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              How to Request a Refund
            </h2>
            <p className="mt-3">
              To request a refund or discuss withdrawal from a program:
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-6">
              <li>Contact your Elevate coach or program coordinator immediately</li>
              <li>Submit a written withdrawal request via email to <a href="mailto:support@elevateforhumanity.org" className="text-orange-600 hover:underline">support@elevateforhumanity.org</a></li>
              <li>Include your name, program name, reason for withdrawal, and preferred refund method</li>
              <li>Refunds are processed within 14 business days of approval</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Special Circumstances
            </h2>
            <p className="mt-3">
              We understand that life happens. If you need to withdraw due to medical emergency, family crisis, or other extenuating circumstances, contact us immediately. We will work with you to find a solution, which may include:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Deferring to a future cohort</li>
              <li>Modified refund terms</li>
              <li>Transfer to a different program</li>
              <li>Leave of absence with option to return</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Questions?
            </h2>
            <p className="mt-3">
              Contact us at <a href="mailto:support@elevateforhumanity.org" className="text-orange-600 hover:underline">support@elevateforhumanity.org</a> or call us at the number listed on your enrollment paperwork.
            </p>
          </section>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-600">
              <strong>Last Updated:</strong> November 2024
            </p>
            <p className="mt-2 text-sm text-slate-600">
              This refund policy is subject to change. The version in effect at the time of your enrollment applies to your program.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/terms"
              className="text-orange-600 hover:underline"
            >
              View Full Terms of Service
            </Link>
            {' · '}
            <Link
              href="/privacy"
              className="text-orange-600 hover:underline"
            >
              Privacy Policy
            </Link>
            {' · '}
            <Link
              href="/contact"
              className="text-orange-600 hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
