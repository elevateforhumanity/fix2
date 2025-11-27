export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">
            About Elevate For Humanity
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            Elevate For Humanity is a workforce training and community
            development initiative focused on real people, real barriers, and
            real opportunity.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Our Mission
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-700">
            We connect individuals to career training, supportive services, and
            job placement by partnering with workforce boards, employers,
            schools, and community-based organizations. Our goal is to break
            cycles, build skills, and elevate families and communities.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-slate-900">
            What We Offer
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-700">
            <li>Free and funded training in high-demand careers</li>
            <li>Support with workforce grants and funding eligibility</li>
            <li>Partnerships with employers and workforce boards</li>
            <li>Guidance from application through job placement</li>
            <li>Special pathways for adults, parents, youth, and returning citizens</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
