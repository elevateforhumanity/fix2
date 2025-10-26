import { useParams, Link } from 'react-router-dom';
import { programs } from '../data/programs';

export default function ProgramDetail() {
  const { slug } = useParams();
  const p = programs.find((x) => x.slug === slug);

  if (!p) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-2xl font-bold">Program not found</h1>
        <p className="mt-2 text-slate-600">
          Please return to the programs page.
        </p>
        <Link
          to="/programs"
          className="mt-4 inline-block rounded-lg bg-orange-600 px-4 py-2 text-white"
        >
          Back to Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
              Elevate for Humanity
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
              {p.name}
            </h1>
            <p className="mt-2 text-slate-600">{p.tagline}</p>
            <p className="mt-4 text-slate-700">{p.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              {p.funding.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-slate-100 px-2 py-1 text-slate-700"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.indianacareerconnect.com"
                className="rounded-xl bg-orange-600 px-5 py-3 text-white font-semibold hover:bg-orange-700"
              >
                Apply Now
              </a>
              <Link
                to="/contact"
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:border-slate-400"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-orange-200">
            <img
              src={p.heroSrc}
              alt={`${p.name} — ${p.tagline}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="h-full w-full bg-gradient-to-br from-orange-50 to-white flex items-center justify-center text-center p-6">
                    <div>
                      <p class="text-sm uppercase tracking-widest text-slate-500">${p.name}</p>
                      <p class="mt-2 text-slate-600">${p.tagline}</p>
                      <p class="mt-4 text-xs text-slate-400">Add ${p.slug}-hero.jpg to public/images/</p>
                    </div>
                  </div>
                `;
              }}
            />
          </div>
        </div>
      </section>
      {/* DETAILS */}
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            What You'll Learn
          </h2>
          <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-1">
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="text-lg font-bold text-slate-900">
            Eligibility & Funding
          </h3>
          <p className="mt-2 text-slate-700">
            We help you determine eligibility for programs like{' '}
            {p.funding.join(', ')} and connect you with employer partners for
            paid on-the-job training.
          </p>
          <p className="mt-3 text-slate-700">
            Start your application and an advisor will reach out with next
            steps.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            Request Info
          </Link>
        </div>
      </section>
    </div>
  );
}
