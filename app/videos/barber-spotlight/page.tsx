// app/videos/barber-spotlight/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { AdvancedVideoPlayer } from "@/components/AdvancedVideoPlayer";

export const metadata: Metadata = {
  title: "Barber Spotlight Video - Success Story",
  description: "Watch a success story from our barber apprenticeship program. See how our graduates transform their lives through career training.",
  keywords: ["barber success story", "barber apprenticeship video", "graduate spotlight", "career transformation"],
  openGraph: {
    title: "Barber Spotlight Video | Elevate for Humanity",
    description: "Watch a success story from our barber apprenticeship program.",
    images: ["/images/courses/barber-apprenticeship-10002417-cover.jpg"],
    type: "website",
  },
};

export default function BarberSpotlightVideoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Breadcrumb */}
      <section className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto max-w-6xl px-6 py-4 md:px-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-300 transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              href="/videos"
              className="hover:text-emerald-300 transition-colors"
            >
              Videos
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Barber Apprenticeship Spotlight</span>
          </nav>
        </div>
      </section>

      {/* Main video + info */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-orange-500/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 md:flex-row md:px-10 lg:py-14">
          {/* Video area */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-2xl">
              <AdvancedVideoPlayer
                src="/videos/barber-spotlight.mp4"
                title="Barber Apprenticeship Success Story"
              />
            </div>

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-400">
                  Program spotlight
                </span>
                <span>Approx. length: 2–3 minutes</span>
                <span>Audience: re-entry, learners &amp; community partners</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  #barberapprenticeship
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  #reentry
                </span>
                <span className="rounded-full bg-slate-900 px-2 py-1">
                  #secondchances
                </span>
              </div>
            </div>
          </div>

          {/* Right column – story & CTAs */}
          <div className="w-full max-w-md space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-400">
                Barber Apprenticeship • Re-entry
              </p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                From incarceration to owning a chair — how the barber pathway
                actually works.
              </h1>
              <p className="mt-3 text-sm text-slate-200">
                This video walks through what the{" "}
                <span className="font-semibold text-orange-400">
                  Barber Apprenticeship
                </span>{" "}
                looks like for someone coming home: where the hours happen, how
                mentorship works, and what support Elevate provides so it isn&apos;t
                just &quot;good luck.&quot;
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
              <p className="font-semibold text-orange-400">
                This video should help people see:
              </p>
              <ul className="space-y-1 text-slate-300">
                <li>• That a real, licensed career is possible after incarceration.</li>
                <li>• What the day-to-day looks like inside a partnering shop.</li>
                <li>• How Elevate, barbers, and partners share responsibility.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Next steps
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href="/programs/barber-apprenticeship"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md hover:bg-orange-400"
                >
                  Learn about the Barber Apprenticeship
                </Link>
                <Link
                  href="/partners/reentry"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-orange-400 px-4 py-2 text-sm font-semibold text-orange-400 hover:bg-orange-500/10"
                >
                  I&apos;m a re-entry / community partner
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-[11px] text-slate-300">
              <p className="font-semibold text-slate-100">
                Places this video should live
              </p>
              <ul className="mt-2 space-y-1">
                <li>• QR codes on re-entry flyers, intake packets, and posters.</li>
                <li>• Shared in groups at transitional housing or community orgs.</li>
                <li>• Embedded on the Barber Apprenticeship program page.</li>
                <li>• Sent to probation/parole and case managers as a resource.</li>
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
                What to show in the Barber spotlight.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Keep it honest and hopeful. People watching this will be deciding,
                &quot;Is this really for someone like me?&quot;
              </p>

              <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                <VideoBeatCard
                  label="0–20 seconds"
                  title="Who this pathway is for"
                  bullets={[
                    "Justice-involved adults who want a legal, creative career.",
                    "People who like community, conversation, and hands-on work.",
                    "Those ready to commit to hours and show up consistently.",
                  ]}
                />
                <VideoBeatCard
                  label="20–45 seconds"
                  title="What the apprenticeship looks like"
                  bullets={[
                    "Real shops, real barbers, real clients.",
                    "How hours are recorded and reported.",
                    "Mentorship and expectations for professionalism.",
                  ]}
                />
                <VideoBeatCard
                  label="45–70 seconds"
                  title="How Elevate and partners support you"
                  bullets={[
                    "Check-ins with staff and case management.",
                    "Help navigating barriers (ID, schedule, transportation).",
                    "Coaching around communication and expectations.",
                  ]}
                />
                <VideoBeatCard
                  label="70–90 seconds"
                  title="The vision on the other side"
                  bullets={[
                    "Owning a chair, renting a suite, or opening a shop.",
                    "Paying it forward by mentoring others.",
                    "Staying connected to Elevate as an alum.",
                  ]}
                />
              </div>
            </div>

            {/* Right: people featured / releases */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm">
              <h3 className="text-sm font-semibold text-white">
                Who to feature in the video.
              </h3>
              <AudienceCard
                title="Graduate / current apprentice"
                body="Let them tell their story in their own words. The power is in the details — where they were before, what changed, and where they are now."
                bullets={[
                  "Keep audio clear and background simple.",
                  "Ask about a specific turning point or &quot;lightbulb&quot; moment.",
                ]}
              />
              <AudienceCard
                title="Barber mentor / shop owner"
                body="Helps viewers see that real industry professionals believe in this pathway and in the people coming through it."
                bullets={[
                  "Have them speak to reliability, growth, and community.",
                  "Mention how Elevate supports them as employers/mentors.",
                ]}
              />
              <AudienceCard
                title="Short note from Elevate team"
                body="Reassures viewers that they won&apos;t be doing this alone — and that you understand re-entry isn&apos;t a straight line."
                bullets={[
                  "Keep it short and encouraging, not lecturing.",
                  "Invite them clearly into taking the next step.",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-orange-500/15 via-slate-950 to-slate-950 py-14">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to turn the clippers into a career?
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            When this video is live, this page becomes where people land after
            scanning your QR codes or following your link. From here, they can
            move straight into learning about the program and raising their hand.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/programs/barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-orange-400"
            >
              Explore Barber Apprenticeship details
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-orange-400 px-8 py-3 text-sm font-semibold text-orange-400 hover:bg-orange-500/10"
            >
              Talk about re-entry / shop partnerships
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Helper components (reuse structure) */

type VideoBeatCardProps = {
  label: string;
  title: string;
  bullets: string[];
};

function VideoBeatCard({ label, title, bullets }: VideoBeatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-400">
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
