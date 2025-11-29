import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Founder - Elizabeth L. Greene | Elevate For Humanity",
  description: "Meet Elizabeth L. Greene, Founder and CEO of Elevate For Humanity. A mission-driven leader dedicated to expanding access to quality training and career advancement.",
};

export default function FounderPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-1/2 space-y-6">
          <p className="text-sm font-semibold tracking-wide text-orange-500 uppercase">
            Our Founder
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Elizabeth L. Greene
          </h1>
          <p className="text-xl font-medium text-slate-700">
            Founder &amp; Chief Executive Officer, Elevate For Humanity™
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Elizabeth L. Greene is the Founder and CEO of Elevate For Humanity™, a mission-driven workforce organization dedicated to expanding access to quality training, career advancement, and employer-connected opportunities.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Elizabeth leads with a blend of professional discipline and genuine care for the people and communities Elevate For Humanity serves. Her approach is simple: keep the work human, keep the systems strong, and keep the focus on helping individuals move forward with confidence.
          </p>
        </div>

        <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-orange-200 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            {/* TODO: Add founder photo at /public/images/founder-elizabeth-red-blazer.jpg */}
            <div className="text-center text-white p-8">
              <div className="text-8xl font-bold mb-4">ELG</div>
              <p className="text-xl font-semibold">Elizabeth L. Greene</p>
              <p className="text-sm opacity-90">Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
          {/* Leadership Focus */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              A Leader Focused on People and Progress
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Elizabeth believes that when individuals receive the right support, training, and encouragement, entire communities can thrive. She brings a steady, thoughtful leadership style that prioritizes:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">Access for every type of learner</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">Clear, supportive pathways to better careers</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">Strong communication with partners and employers</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">High-quality training experiences</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">Professional, dependable systems that build trust</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              Her work is grounded in respect, integrity, and the belief that opportunity should be understandable and reachable for everyone.
            </p>
          </div>

          {/* Building Pathways */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              Building Pathways That Work for Real People
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Under Elizabeth's guidance, Elevate For Humanity provides:
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">Career-aligned training programs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">Simple enrollment and navigation support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">Tools that help students stay engaged and motivated</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">Direct connections to employers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">Organized processes that make partnerships easier</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              She ensures that programs are not only compliant — but also welcoming, encouraging, and designed with the learner in mind.
            </p>
          </div>

          {/* Mission With Heart */}
          <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl p-8 border border-orange-200">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              Mission With Heart
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Elizabeth's mission is rooted in humanity. She believes that workforce development should feel empowering — not overwhelming. Her vision is to create a space where individuals feel seen, supported, and capable of achieving long-term success.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              This mission guides Elevate For Humanity as it continues to grow, collaborate with partners, and expand its training pathways.
            </p>
          </div>

          {/* Leadership Qualities */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              A Trusted, Approachable Leader
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Colleagues and partners describe Elizabeth as:
            </p>
            <ul className="grid grid-cols-2 gap-4 mb-6">
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-blue-500 font-bold text-xl">★</span>
                <span className="text-lg font-medium">Grounded</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-blue-500 font-bold text-xl">★</span>
                <span className="text-lg font-medium">Solutions-focused</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-blue-500 font-bold text-xl">★</span>
                <span className="text-lg font-medium">Forward-thinking</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-blue-500 font-bold text-xl">★</span>
                <span className="text-lg font-medium">Compassionate</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="text-blue-500 font-bold text-xl">★</span>
                <span className="text-lg font-medium">Reliable</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              She leads with professionalism, but also with warmth — ensuring Elevate For Humanity remains both structurally strong and human-centered.
            </p>
          </div>

          {/* Closing CTA */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-10 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              Explore our training programs and discover how Elevate For Humanity can support your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-orange-600 text-lg font-bold shadow-xl hover:bg-orange-50 transition-all hover:scale-105"
              >
                Explore Programs
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white text-lg font-bold hover:bg-white/10 transition-all hover:scale-105"
              >
                Check Funding Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
