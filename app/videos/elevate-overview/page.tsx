// app/videos/elevate-overview/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { AdvancedVideoPlayer } from "@/components/AdvancedVideoPlayer";

export const metadata: Metadata = {
  title: "Elevate Overview Video - How We Work",
  description: "Watch our overview video to learn how Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["elevate overview", "how it works", "workforce development video", "career training video"],
  openGraph: {
    title: "Elevate Overview Video | Elevate for Humanity",
    description: "Watch our overview video to learn how we connect job seekers with free career training.",
    images: ["/images/facilities-new/facility-12.jpg"],
    type: "website",
  },
};

export default function ElevateOverviewVideoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Breadcrumb / back link */}
      <section className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto max-w-6xl px-6 py-4 md:px-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link
              href="/"
              className="hover:text-orange-300 transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              href="/videos"
              className="hover:text-orange-300 transition-colors"
            >
              Videos
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Elevate Overview</span>
          </nav>
        </div>
      </section>

      {/* Main video + details */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-500/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 md:flex-row md:px-10 lg:py-14">
          {/* Video area */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-2xl">
              <AdvancedVideoPlayer
                src="/videos/elevate-overview.mp4"
              />
            </div>

            {/* Video meta / quick details */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300">
                  Overview
                </span>
                <span>Approx. length: 1 minute</span>
                <span>Audience: learners, employers, and partners</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  #fundedtraining
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  #apprenticeships
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  #workforcepartners
                </span>
              </div>
            </div>
          </div>

          {/* Right column: description & CTAs */}
          <div className="w-full max-w-md space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                Elevate in 60 seconds
              </p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                What Elevate For Humanity actually does — in plain language.
              </h1>
              <p className="mt-3 text-sm text-slate-200">
                Use this short video wherever you need to quickly explain Elevate:
                learners who see a flyer, employers who scan a QR code, workforce
                partners deciding which programs to refer into, and donors who
                want to understand your impact.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
              <p className="font-semibold text-orange-300">
                This video should answer three questions clearly:
              </p>
              <ul className="space-y-1 text-slate-300">
                <li>• Who Elevate serves (learners, employers, workforce partners).</li>
                <li>• What you actually offer (funded training, support, job pipelines).</li>
                <li>
                  • How people get started (apply, refer, partner, or schedule a
                  conversation).
                </li>
              </ul>
            </div>

            {/* Primary calls to action */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Next steps
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href="/apply"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md hover:bg-emerald-400"
                >
                  I&apos;m ready to explore training
                </Link>
                <Link
                  href="/employers"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-orange-300 hover:bg-red-500/10"
                >
                  I&apos;m an employer / partner
                </Link>
              </div>
            </div>

            {/* Small box for QR/usage notes */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-[11px] text-slate-300">
              <p className="font-semibold text-slate-100">
                Where this video works best
              </p>
              <ul className="mt-2 space-y-1">
                <li>• QR codes on flyers, posters, and mailers.</li>
                <li>• Landing page for workforce and employer presentations.</li>
                <li>• Link in social posts and text campaigns.</li>
                <li>• Embedded in partner websites or portals.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sections under the video: breakdown + audience tabs */}
      <section className="border-b border-slate-800 bg-slate-950 py-14">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-[1.3fr,1fr]">
            {/* Left: video breakdown */}
            <div>
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                What to cover inside the 60-second overview.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                This isn&apos;t a full documentary — it&apos;s a clear, welcoming
                elevator pitch. Think of it as your &quot;trailer&quot; for the
                full Elevate ecosystem.
              </p>

              <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                <VideoBeatCard
                  label="0–15 seconds"
                  title="Who we serve"
                  bullets={[
                    "Learners who need a funded path into better-paying careers.",
                    "Employers who want prepared talent, not resumes.",
                    "Workforce partners who need programs that actually stick.",
                  ]}
                />
                <VideoBeatCard
                  label="15–35 seconds"
                  title="What we offer"
                  bullets={[
                    "Career-aligned programs: healthcare, trades, CDL, re-entry, and more.",
                    "Funding: WIOA, WRG, OJT, WEX, and employer-sponsored options (where approved).",
                    "Support: coaching, barrier navigation, and job placement connections.",
                  ]}
                />
                <VideoBeatCard
                  label="35–50 seconds"
                  title="How it works"
                  bullets={[
                    "Simple interest form or referral.",
                    "Coaching conversation to match program + funding.",
                    "Training → support → interviews → job/apprenticeship.",
                  ]}
                />
                <VideoBeatCard
                  label="50–60 seconds"
                  title="Call to action"
                  bullets={[
                    "Learners: scan/apply to explore funded programs.",
                    "Employers: reach out to start a hiring pipeline.",
                    "Partners: connect to offer Elevate as an option.",
                  ]}
                />
              </div>
            </div>

            {/* Right: audience boxes */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm">
              <h3 className="text-sm font-semibold text-white">
                Who this video speaks to
              </h3>
              <AudienceCard
                title="Learners & families"
                body="Helps them see that they're not just signing up for a class, but for a supported pathway with real people they can call."
                bullets={[
                  "Use clear, simple language.",
                  "Show faces that look like your community.",
                  "Include quick success snapshots.",
                ]}
              />
              <AudienceCard
                title="Employers & HR"
                body="Shows that you understand their time pressure, their need for reliability, and that you handle the paperwork and coordination."
                bullets={[
                  "Mention OJT/WEX and on-ramp options.",
                  "Highlight support you provide to new hires.",
                ]}
              />
              <AudienceCard
                title="Workforce & referral partners"
                body="Positions Elevate as an extension of their toolbox, not competition — a place to send people who need a structured path."
                bullets={[
                  "Clarify how you coordinate and report back.",
                  "Invite them to co-design cohorts and pipelines.",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-red-500/15 via-slate-950 to-slate-950 py-14">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to plug this into your outreach?
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Once your final video file is ready, this page becomes the home base
            for QR codes, social links, and presentations. From here, people can
            move directly into applying, partnering, or referring.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-red-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              Send learners here to get started
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-8 py-3 text-sm font-semibold text-orange-300 hover:bg-red-500/10"
            >
              Talk about employer / partner campaigns
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ----- Helper components ----- */

type VideoBeatCardProps = {
  label: string;
  title: string;
  bullets: string[];
};

function VideoBeatCard({ label, title, bullets }: VideoBeatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300">
        {label}
      </p>
      <h3 className="mt-1 text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
    </div>
  );
}

type AudienceCardProps = {
  title: string;
  body: string;
  bullets: string[];
};

function AudienceCard({ title, body, bullets }: AudienceCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-[11px] text-slate-200">
      <p className="text-xs font-semibold text-white">{title}</p>
      <p className="mt-1 text-[11px] text-slate-300">{body}</p>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
    </div>
  );
}
