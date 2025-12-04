// app/team/page.tsx
export default function TeamPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Our Team
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Leadership, instructors, and support behind Elevate for Humanity.
          </h1>
          <p className="mt-3 text-sm text-slate-700 max-w-2xl mx-auto">
            Elevate for Humanity Technical &amp; Career Institute is powered by
            leaders, educators, and professionals who believe in second chances,
            strong community, and real pathways to opportunity.
          </p>
        </header>

        <section className="space-y-8">
          {/* Elizabeth */}
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Elizabeth Greene – Chief Executive Officer
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Elizabeth Greene is a visionary workforce architect and community
              advocate committed to creating equitable pathways for individuals
              and families across Indiana. As Chief Executive Officer of Elevate
              for Humanity Technical &amp; Career Institute, she leads with
              purpose, compassion, and a strong belief in transforming
              communities through education, empowerment, and access.
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Under her leadership, Elevate has become a federal and state–aligned
              Registered Apprenticeship sponsor, fully approved on RAPIDS, a
              fundable provider on the ETPL, and eligible for WIOA, WRG, and JRI
              funding. Her mission is simple and unwavering:{" "}
              <span className="font-medium">
                build pathways, remove barriers, and elevate humanity—one life at
                a time.
              </span>
            </p>
          </article>

          {/* Dr Wilkes */}
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Dr. Carlina Annette Wilkes – Executive Director of Financial
              Operations &amp; Organizational Compliance
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Dr. Carlina Annette Wilkes is a highly accomplished executive and
              retired federal professional with more than 24 years of
              distinguished service within the Defense Finance and Accounting
              Service (DFAS). She brings deep expertise in financial management,
              organizational compliance, workforce development, and strategic
              program oversight.
            </p>
            <p className="mt-2 text-sm text-slate-700">
              She holds the Department of Defense Financial Management
              Certification, Level II, along with a Doctorate in Ministry, a
              Master of Arts in Ministry, a Bachelor of Applied Management, and
              specialized credentials in Accounting and Paralegal Studies. At
              Elevate, she helps ensure that operations are accountable,
              compliant, and aligned with both mission and regulation.
            </p>
          </article>

          {/* Clystjah */}
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Clystjah Woodley – Life Coach &amp; Student Success Coach
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Clystjah Woodley is a compassionate and purpose-driven Life Coach
              dedicated to empowering individuals to heal, grow, and move
              forward with clarity and confidence. She supports Elevate learners
              with mindset coaching, accountability, and emotional wellness,
              creating safe spaces where students feel seen, heard, and
              supported as they work toward their goals.
            </p>
          </article>

          {/* Delores */}
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Delores Reynolds – Social Media Director
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Delores Reynolds is a creative strategist and digital storyteller
              dedicated to amplifying Elevate for Humanity's mission across
              every platform. As Social Media Director, she transforms complex
              programs and powerful success stories into meaningful content that
              informs, inspires, and connects with the community.
            </p>
          </article>

          {/* Johanna */}
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Johanna George – Beauty Programs Director
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Johanna George is a highly experienced beauty industry professional
              with more than 20 years as a licensed Nail Technician and
              Esthetician. She spent seven years successfully running a beauty
              school, overseeing enrollment, curriculum, instructors, and daily
              operations.
            </p>
            <p className="mt-2 text-sm text-slate-700">
              As Beauty Programs Director at Elevate, she guides the design and
              delivery of beauty and barber programs, ensuring students are
              fully prepared for licensure and real-world work in salons, spas,
              barbershops, or suite-based businesses.
            </p>
          </article>

          {/* Sharon */}
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Sharon Douglass – Respiratory Therapy &amp; Health Informatics
              Specialist
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Sharon Douglass is a seasoned healthcare professional with over 30
              years of experience as a Respiratory Therapist and a Master of
              Science in Health Informatics. She has worked at the intersection
              of patient care, clinical operations, and data systems, helping
              organizations improve safety, quality, and efficiency.
            </p>
            <p className="mt-2 text-sm text-slate-700">
              At Elevate, Sharon supports healthcare-focused curriculum and
              workforce training, ensuring programs are grounded in real
              bedside experience and informed by current clinical standards.
            </p>
          </article>

          {/* Alina */}
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Alina Smith, PMHNP – Psychiatric Nurse Practitioner (Partner
              Provider)
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Alina Smith is a board-certified Psychiatric Mental Health Nurse
              Practitioner (PMHNP) with a Master's in Nursing from Purdue
              University and a focus on mental health across the lifespan. She
              provides mental health assessments, behavioral health support, and
              medication management for individuals ages five and older.
            </p>
            <p className="mt-2 text-sm text-slate-700">
              As a partner provider, she supports Elevate's commitment to
              trauma-informed, whole-person care by integrating mental wellness
              into training and workforce pathways.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
