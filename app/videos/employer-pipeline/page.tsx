// app/videos/employer-pipeline/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { AdvancedVideoPlayer } from "@/components/AdvancedVideoPlayer";

export const metadata: Metadata = {
  title: "Employer Pipeline Video - Hire Skilled Workers",
  description: "Learn how employers connect with job-ready candidates through our talent pipeline. See how we help businesses build their workforce.",
  keywords: ["employer pipeline video", "hire workers", "talent pipeline", "workforce solutions video"],
  openGraph: {
    title: "Employer Pipeline Video | Elevate for Humanity",
    description: "Learn how employers connect with job-ready candidates through our talent pipeline.",
    images: ["/images/homepage/employer-partnerships.png"],
    type: "website",
  },
};

export default function EmployerPipelineVideoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Breadcrumb */}
      <section className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto max-w-6xl px-6 py-4 md:px-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-orange-300 transition-colors">
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
            <span className="text-slate-300">Employer & Workforce Pipeline</span>
          </nav>
        </div>
      </section>

      {/* Main video + info */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-500/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 md:flex-row md:px-10 lg:py-14">
          {/* Video area */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-2xl">
              <AdvancedVideoPlayer
                src="/videos/employer-pipeline.mp4"
                title="Employer Talent Pipeline"
              />
            </div>

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300">
                  For employers & partners
                </span>
                <span>Approx. length: 2 minutes</span>
                <span>Audience: HR, workforce boards, hiring managers</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  #talentpipeline
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  #OJT
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  #workforcepartners
                </span>
              </div>
            </div>
          </div>

          {/* Right column – story & CTAs */}
          <div className="w-full max-w-md space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                For employers & workforce partners
              </p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                How Elevate makes talent pipelines easier — not harder.
              </h1>
              <p className="mt-3 text-sm text-slate-200">
                This video walks employers and workforce boards through{" "}
                <span className="font-semibold text-orange-300">
                  OJT, WEX, and apprenticeship models
                </span>{" "}
                — and how Elevate handles the compliance, coordination, and
                support so you can focus on hiring and growing your team.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
              <p className="font-semibold text-orange-300">
                This video should help employers see:
              </p>
              <ul className="space-y-1 text-slate-300">
                <li>• That you understand their time constraints and hiring pain points.</li>
                <li>• How Elevate pre-screens, supports, and stays involved post-hire.</li>
                <li>• What funding options exist (OJT, WEX, upskilling grants).</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Next steps
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href="/employers"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md hover:bg-emerald-400"
                >
                  Learn about employer partnerships
                </Link>
                <Link
                  href="/partners/workforce"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-orange-300 hover:bg-red-500/10"
                >
                  I&apos;m a workforce board / case manager
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-[11px] text-slate-300">
              <p className="font-semibold text-slate-100">
                Where this video works best
              </p>
              <ul className="mt-2 space-y-1">
                <li>• Embedded in employer partnership proposals and decks.</li>
                <li>• Shared at chamber meetings, workforce board convenings.</li>
                <li>• Sent to HR teams considering OJT or apprenticeship models.</li>
                <li>• Linked in follow-up emails after initial employer conversations.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Breakdown: what to cover */}
      <section className="border-b border-slate-800 bg-slate-950 py-14">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-[1.3fr,1fr]">
            {/* Left */}
            <div>
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                What to cover in the Employer Pipeline video.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Keep it business-focused and practical. Employers want to know
                what&apos;s in it for them and what the process actually looks like.
              </p>

              <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                <VideoBeatCard
                  label="0–15 seconds"
                  title="The hiring challenge"
                  bullets={[
                    "Hard to find reliable, trained candidates.",
                    "High turnover and training costs.",
                    "Need for diversity and community investment.",
                  ]}
                />
                <VideoBeatCard
                  label="15–40 seconds"
                  title="How Elevate solves it"
                  bullets={[
                    "Pre-screened candidates with real training.",
                    "Support during onboarding and first 90 days.",
                    "Funding options: OJT, WEX, apprenticeships, upskilling grants.",
                  ]}
                />
                <VideoBeatCard
                  label="40–70 seconds"
                  title="What the process looks like"
                  bullets={[
                    "Initial conversation to understand your needs.",
                    "Match candidates from current cohorts or pipeline.",
                    "Elevate handles paperwork, check-ins, and troubleshooting.",
                  ]}
                />
                <VideoBeatCard
                  label="70–90 seconds"
                  title="Call to action"
                  bullets={[
                    "Schedule a 15-minute conversation.",
                    "Visit the employer partnership page for details.",
                    "Connect with workforce boards already working with Elevate.",
                  ]}
                />
              </div>
            </div>

            {/* Right: who to feature */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm">
              <h3 className="text-sm font-semibold text-white">
                Who to feature in the video.
              </h3>
              <AudienceCard
                title="Employer testimonial"
                body="Let a real employer speak to the quality of candidates, the support they received, and how the partnership helped them grow."
                bullets={[
                  "Focus on specific outcomes (retention, performance).",
                  "Keep it short and authentic, not overly scripted.",
                ]}
              />
              <AudienceCard
                title="Workforce board / case manager"
                body="Helps other workforce partners see that Elevate is a trusted referral option with real accountability."
                bullets={[
                  "Mention communication, reporting, and outcomes.",
                  "Speak to how Elevate complements their existing services.",
                ]}
              />
              <AudienceCard
                title="Elevate team member"
                body="Briefly explain the process, funding options, and how you stay involved post-placement."
                bullets={[
                  "Keep it professional and solution-focused.",
                  "Invite them clearly into the next step (call, meeting, email).",
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
            Ready to build a talent pipeline that actually works?
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            When this video is live, this page becomes your go-to link for
            employer and workforce partner conversations. From here, they can
            explore partnership options and schedule a call.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/employers"
              className="inline-flex items-center justify-center rounded-full bg-red-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              Explore employer partnerships
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-8 py-3 text-sm font-semibold text-orange-300 hover:bg-red-500/10"
            >
              Schedule a conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Helper components */

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
