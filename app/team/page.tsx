// app/team/page.tsx

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
    link: "/team/leslie-wafford",
  },
  {
    name: "Clystjah Woodley",
    title: "Life Coach & Student Success Mentor",
    image: "/images/clystjah-woodley.jpg",
    blurb:
      "Provides life coaching, mindset support, and accountability to help learners navigate real-life barriers while they complete training.",
    link: "/team/clystjah-woodley",
  },
  {
    name: "Delores Reynolds",
    title: "Director of Social Media & Digital Engagement",
    image: "/images/delores-reynolds.jpg",
    blurb:
      "Leads Elevate's online presence, storytelling, and engagement strategies to keep students and partners informed and inspired.",
    link: "/team/delores-reynolds",
  },
  {
    name: "Jozanna George",
    title: "Director of Beauty & Esthetics Programs",
    image: "/images/jozanna-george.jpg",
    blurb:
      "Licensed for over 20 years in nails and esthetics and former beauty school leader, overseeing enrollment and beauty-industry pathways.",
    link: "/team/jozanna-george",
  },
  {
    name: "Sharon Douglass",
    title: "Clinical Training & Healthcare Compliance Advisor",
    image: "/images/sharon-douglas.jpg",
    blurb:
      "Respiratory therapist and health informatics professional with 30+ years of experience in patient safety, quality, and clinical operations.",
    link: "/team/sharon-douglass",
  },
  {
    name: "Alina Perfect, PMHNP",
    title: "Psychiatric Mental Health Partner",
    image: "/images/alina-smith.jpg",
    blurb:
      "Board-certified Psychiatric Mental Health Nurse Practitioner partnering with Elevate to provide mental health assessment and medication management.",
    link: "https://www.choicetherapyllc.com",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
            Our Team
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Meet the people behind Elevate for Humanity.
          </h1>
          <p className="mt-3 text-sm text-slate-700 max-w-2xl mx-auto">
            Our team brings together lived experience, professional expertise,
            and a shared commitment to removing barriers and building real
            career pathways for our community.
          </p>
        </header>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-700 ease-out hover:translate-y-[-8px]"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  {member.name}
                </h2>
                <p className="mt-1 text-[0.8rem] font-medium text-slate-900">
                  {member.title}
                </p>
                <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                  {member.blurb}
                </p>
                {member.link && (
                  <div className="mt-3">
                    <a
                      href={member.link}
                      className="text-[0.75rem] font-semibold text-slate-900 hover:text-slate-900"
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
