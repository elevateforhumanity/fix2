// app/contact/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get Started Today",
  description: "Have questions about our training programs or workforce services? Contact Elevate for Humanity to learn how we can help you or your organization.",
  keywords: ["contact", "get started", "workforce support", "training inquiry", "help"],
  openGraph: {
    title: "Contact Us - Get Started Today | Elevate for Humanity",
    description: "Have questions about our training programs or workforce services? Contact us to learn how we can help.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-3xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            Contact Elevate For Humanity™
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Let's talk about next steps.
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-200">
            Whether you&apos;re a learner, partner, or employer, share a little
            about what you&apos;re looking for and our team will follow up.
          </p>

          <form className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                I am a...
              </label>
              <select className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400">
                <option>Future learner</option>
                <option>Parent/guardian</option>
                <option>Case manager / agency staff</option>
                <option>Employer</option>
                <option>Training provider / school</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                How can we help?
              </label>
              <textarea
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400 h-28"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 transition"
            >
              Send Message
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-500">
            If you prefer, you can also start with the{" "}
            <Link href="/apply" className="text-orange-300 hover:text-orange-200">
              application form
            </Link>{" "}
            and we&apos;ll reach out from there.
          </p>
        </div>
      </section>
    </main>
  );
}
