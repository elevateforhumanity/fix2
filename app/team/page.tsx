// app/team/page.tsx
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/team",
  },
  title: 'Our Team | Elevate For Humanity',
  description: 'Meet the dedicated team behind Elevate for Humanity - experienced professionals committed to providing free career training and support to help you succeed.',
};

type TeamMember = {
  name: string;
  title: string;
  image: string;
  blurb: string;
  link?: string;
};

const team: TeamMember[] = [
  {
    name: "Elizabeth L. Greene",
    title: "Founder, Chief Executive Officer & Executive Director",
    image: "/images/elizabeth-greene-founder.jpg",
    blurb:
      "Visionary founder of Elevate for Humanity, leading a fully integrated workforce, apprenticeship, and community support ecosystem.",
    link: "/founder",
  },
  {
    name: "Dr. Carlina Annette Wilkes",
    title: "Executive Director of Financial Operations & Organizational Compliance",
    image: "/images/carlina-wilkes.jpg",
    blurb:
      "Retired DFAS executive with 24+ years of federal service, specializing in financial management, organizational compliance, and strategic oversight.",
  },
  {
    name: "Leslie Wafford",
    title: "Director of Housing Stability & Eviction Prevention",
    image: "/images/leslie-wafford.jpg",
    blurb:
      "Focused on low-barrier, eviction-prevention practices and educating residents about their rights so families can remain housed and stable.",
  },
  {
    name: "Clystjah Woodley",
    title: "Life Coach & Student Success Mentor",
    image: "/images/clystjah-woodley.jpg",
    blurb:
      "Provides life coaching, mindset support, and accountability to help learners navigate real-life barriers while they complete training.",
  },
  {
    name: "Delores Reynolds",
    title: "Director of Social Media & Digital Engagement",
    image: "/images/delores-reynolds.jpg",
    blurb:
      "Leads Elevate's online presence, storytelling, and engagement strategies to keep students and partners informed and inspired.",
  },
  {
    name: "Johanna George",
    title: "Director of Beauty & Esthetics Programs",
    image: "/images/jozanna-george.jpg",
    blurb:
      "Licensed for over 20 years in nails and esthetics and former beauty school leader, overseeing enrollment and beauty-industry-standard pathways.",
  },
  {
    name: "Sharon Douglass",
    title: "Clinical Training & Healthcare Compliance Advisor",
    image: "/images/sharon-douglas.jpg",
    blurb:
      "Respiratory therapist and health informatics professional with 30+ years of experience in patient safety, quality, and clinical operations.",
  },

  {
    name: "Alina Perfect, PMHNP",
    title: "Psychiatric Mental Health Partner",
    image: "/images/alina-smith.jpg",
    blurb:
      "Board-certified Psychiatric Mental Health Nurse Practitioner partnering with Elevate to provide mental health assessment and medication management.",
    link: "/team/alina-perfect",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <Image
          src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__1/generated-image-76ea4a68-9d0c-4075-8ca3-751c9bbe9343.png?Expires=2080938929&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=ErR79kKxF2n2B4rTMfYOnPi29epaa2XwFAzIMC5pYbluSId9KuK1zBI1VfhJn18W2ud1bW68qEHArWsiT9yuoq9IZtfapB95LgnI~WynYvm4Or2E~iG0zF6exzBW7ilbq1onTgXqTHdGaXiJ52qXTFrPmae0Qqxlffe4qwVclCzRRE4tZR21rL9~PnPFMOZh0gg4gN8o9tth0OgtIq2G3EO3I4bW-CyqvpI284fmcOOHOKNO3Lgz81w5kLJ7GvIKcv04bGpOC~Paaq0WO6Z0ElVvWpsnhzDB6XsjrP0xm53Grp8UTIowRq~4EZmcdON15f7lR-E7hZhkBOBv1X28Wg__"
          alt="Meet Our Team"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet Our Team
          </h1>
          <p className="text-xl text-slate-600">
            Real people who care about your success.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow ring-1 ring-slate-200"
            >
              <div className="relative h-80 w-full overflow-hidden bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  {member.name}
                </h2>
                <p className="mt-2 text-sm font-semibold text-blue-600">
                  {member.title}
                </p>
                <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                  {member.blurb}
                </p>
                {member.link && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <a
                      href={member.link}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                    >
                      View Full Profile →
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
