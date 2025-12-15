import Link from 'next/link';

export const metadata = {
  title: 'LMS | Elevate for Humanity',
  description:
    'A workforce-ready LMS for program delivery, progress tracking, and partner-ready structure.',
};

export default function LmsPublicPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-10 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            A workforce-ready LMS built for real programs
          </h1>
          <p className="mt-4 text-lg text-zinc-700">
            Deliver training, track progress, and keep programs organized with a
            platform designed for workforce pathways, partner programs, and
            student success.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/login?next=/lms/dashboard"
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-bold hover:bg-zinc-800 text-center"
            >
              Login to LMS
            </Link>
            <Link
              href="/inquiry?topic=lms"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-bold hover:bg-zinc-50 text-center"
            >
              Request a Demo
            </Link>
          </div>
        </section>

        <section className="mt-14 grid md:grid-cols-3 gap-6">
          <Card
            title="Program delivery"
            desc="A clean training experience with modules, resources, and structured outcomes."
            bullets={[
              'Modules & milestones',
              'Resources & assignments',
              'Hybrid-friendly flow',
            ]}
          />
          <Card
            title="Progress tracking"
            desc="Track participation and progress in a way that supports completion and retention."
            bullets={[
              'Clear checkpoints',
              'Progress visibility',
              'Completion-ready structure',
            ]}
          />
          <Card
            title="Partner-ready"
            desc="Designed to support partner programs, accountability, and consistent workflows."
            bullets={[
              'Partner program support',
              'Audit-friendly organization',
              'Standardized processes',
            ]}
          />
        </section>

        <section className="mt-14 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 sm:p-10">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
            How it works
          </h2>
          <ol className="mt-6 space-y-3 list-decimal pl-5 text-zinc-700 max-w-3xl">
            <li>Students submit an inquiry or application.</li>
            <li>We confirm fit, timeline, and next steps.</li>
            <li>Students get LMS access and start training.</li>
            <li>
              Progress is tracked through milestones and completion steps.
            </li>
            <li>Completion outcomes and next steps are supported.</li>
          </ol>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/login?next=/lms/dashboard"
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-bold hover:bg-zinc-800 text-center"
            >
              Login
            </Link>
            <Link
              href="/inquiry?topic=lms"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-bold hover:bg-zinc-50 text-center"
            >
              Talk to an Advisor
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({
  title,
  desc,
  bullets,
}: {
  title: string;
  desc: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
      <p className="mt-2 text-zinc-700">{desc}</p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700 list-disc pl-5">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
