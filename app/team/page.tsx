// app/team/page.tsx
import Image from "next/image";

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
    link: "/team/carlina-wilkes",
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
      "Licensed for over 20 years in nails and esthetics and former beauty school leader, overseeing enrollment and beauty-industry pathways.",
  },
  {
    name: "Sharon Douglass",
    title: "Clinical Training & Healthcare Compliance Advisor",
    image: "/images/sharon-douglas.jpg",
    blurb:
      "Respiratory therapist and health informatics professional with 30+ years of experience in patient safety, quality, and clinical operations.",
  },
  {
    name: "Ameco Martin",
    title: "Director of Staffing & Workforce Placement",
    image: "/images/ameco-martin.jpg",
    blurb:
      "Connects students to real jobs, internships, apprenticeships, and employer partners, supporting transitions from training to employment.",
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
      <section className="relative h-[400px] w-full overflow-hidden bg-white">
        <Image
          src="/images/gallery/image6.jpg"
          alt="Our Team"
          fill
          className="object-cover brightness-105"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/50 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 mb-3">
              Our Team
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl md:text-2xl text-slate-700">
              Real people who care about your success.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
            >
              <div className="h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  {member.name}
                </h2>
                <p className="mt-1 text-[0.8rem] font-medium text-indigo-700">
                  {member.title}
                </p>
                <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                  {member.blurb}
                </p>
                {member.link && (
                  <div className="mt-3">
                    <a
                      href={member.link}
                      className="text-[0.75rem] font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      View Profile →
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
