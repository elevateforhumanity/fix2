import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Founder - Elizabeth L. Greene | Elevate For Humanity",
  description: "Meet Elizabeth L. Greene, the woman who built Elevate For Humanity from the ground up. Her story of determination, self-taught skills, and community impact.",
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
            Founder &amp; CEO, Elevate For Humanity™
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Elizabeth L. Greene is the heart, architect, and driving force behind
            Elevate For Humanity. She didn't inherit a system — she built one. From teaching herself advanced web development
            and AI tools to learning workforce policy and state funding rules, Elizabeth created an entire workforce ecosystem so people in her community could access real
            training, real credentials, and real jobs without taking on debt.
          </p>
          <blockquote className="border-l-4 border-orange-500 pl-6 py-4 italic text-xl text-slate-800 bg-orange-50 rounded-r-lg">
            "People aren't failing. The system is failing them.
            I built Elevate For Humanity so we'd finally have a system that fights for us."
          </blockquote>
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
          {/* My Why */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              "I built what I wish existed for me."
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              I didn't grow up with easy access to opportunity. I watched
              people I love work themselves to the bone and still barely survive.
              I saw parents trying to provide, returning citizens trying to
              restart, youth who had gifts but no guidance, and families who were
              always one crisis away from losing everything.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Over and over, I saw the same pattern: it wasn't a lack of
              talent — it was a lack of access.
              No one was explaining funding. No one was walking people through the steps. No one was building
              one place where you could get training, support, and a real pathway
              into work.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              Elevate For Humanity is my answer to that. It's the system I wish existed years ago, built so the next generation doesn't have to fight the same battles alone.
            </p>
          </div>

          {/* From Survival to System Builder */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              From "figure it out" to "I'll build it myself."
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              I didn't have a tech team, a big budget, or investors. I had a
              daughter watching me, a community depending on me, and a refusal to
              give up.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              So I taught myself everything:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">How to design and build modern websites using Next.js and React</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">How to create a full learning management system (LMS) with student and admin dashboards</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">How WIOA, Workforce Ready Grants, apprenticeships, and other state/federal programs actually work behind the scenes</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">How to turn complicated funding language into simple, human-centered pathways</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">•</span>
                <span className="text-lg">How to connect training providers, employers, and workforce boards into one ecosystem</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              What most organizations hire whole teams to build, I built piece by
              piece — late nights, early mornings, and a lot of trial and error.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              Elevate For Humanity isn't a template or a brochure site. It's a living system that can change lives.
            </p>
          </div>

          {/* What I Built */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              More than a website — a whole ecosystem.
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Through Elevate For Humanity, we've created:
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">A central hub where people can discover fully or partially funded training programs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">A guided funding pathway that helps residents use WIOA, Workforce Ready Grants, apprenticeships, and other programs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">An online LMS where learners can access courses, track progress, and stay connected</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">Student, admin, and partner dashboards to keep everyone aligned</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">Pathways for youth, adults, and returning citizens to move into real careers, not just short-term jobs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-2xl flex-shrink-0">✓</span>
                <span className="text-lg text-slate-700">A growing network of schools, training providers, and employers who want to be part of the solution</span>
              </li>
            </ul>
            <blockquote className="border-l-4 border-blue-500 pl-6 py-4 italic text-xl text-slate-800 bg-blue-50 rounded-r-lg">
              "What would make this easier, faster, and more human for the people we serve?"
            </blockquote>
          </div>

          {/* Who I Build For */}
          <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl p-8 border border-orange-200">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              My work is for the people who were told "no" too many times.
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              I built this for:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">→</span>
                <span className="text-lg">The single mom trying to hold everything together</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">→</span>
                <span className="text-lg">The young person who has never been told they're capable of greatness</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">→</span>
                <span className="text-lg">The father working multiple jobs and still falling short</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">→</span>
                <span className="text-lg">The returning citizen who deserves a real second chance</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-orange-500 font-bold text-xl">→</span>
                <span className="text-lg">The person who keeps getting doors closed in their face because of paperwork, transportation, or their past</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              Elevate For Humanity is a place where we see you, we believe you, and we're willing to walk with you from "I don't know where to start" to "I got the job."
            </p>
          </div>

          {/* Where We're Going */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              This is just the beginning.
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              My vision is for Elevate For Humanity to become:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-blue-500 font-bold text-xl">★</span>
                <span className="text-lg">A statewide model for workforce development</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-blue-500 font-bold text-xl">★</span>
                <span className="text-lg">A national platform that any city can plug into</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-blue-500 font-bold text-xl">★</span>
                <span className="text-lg">A bridge that connects government funding, training providers, and real employers</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <span className="text-blue-500 font-bold text-xl">★</span>
                <span className="text-lg">A safe place where people can rebuild their lives with dignity</span>
              </li>
            </ul>
            <p className="text-xl text-slate-900 leading-relaxed font-bold">
              I don't just want to run programs;<br />
              I want to change the way opportunity works in this country.
            </p>
          </div>

          {/* Closing CTA */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-10 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">
              A personal note from Elizabeth
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              If you're reading this and wondering whether you deserve a second chance, a fresh start, or a better career — <strong>you do</strong>.
              Elevate For Humanity was built for you.
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
                Check My Funding Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
