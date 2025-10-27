import { Link } from 'react-router-dom';
import type { Program } from '../data/programs';

const GOOGLE_FORM_URL = import.meta.env.VITE_APPLICATION_FORM_URL || '/apply';
const INDIANA_CAREER_CONNECT_URL = 'https://www.indianacareerconnect.com';

// State/federal funded programs require Indiana Career Connect first
const STATE_FUNDED_PROGRAMS = ['WIOA', 'WRG', 'WEX', 'OJT', 'Apprenticeship'];

function getApplicationUrl(program: Program): string {
  // Check if program has state/federal funding
  const hasStateFunding = program.funding.some((f) =>
    STATE_FUNDED_PROGRAMS.includes(f)
  );
  
  return hasStateFunding ? INDIANA_CAREER_CONNECT_URL : GOOGLE_FORM_URL;
}

export default function ProgramCard({ p }: { p: Program }) {
  const applicationUrl = getApplicationUrl(p);
  return (
    <article className="group rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:shadow-md transition">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
        <img
          src={p.cardSrc}
          alt={`${p.name} — ${p.tagline}`}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = `
              <div class="flex items-center justify-center h-full bg-brand-surface-dark">
                <span class="text-sm text-brand-text-light">Add ${p.slug} image</span>
              </div>
            `;
          }}
        />
      </div>
      <div className="mt-4">
        <h4 className="text-xl font-bold text-brand-text">{p.name}</h4>
        <p className="mt-1 text-brand-text-muted">{p.tagline}</p>
        <ul className="mt-3 list-disc pl-5 text-sm text-brand-text-muted space-y-1">
          {p.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {p.funding.map((f) => (
            <span
              key={f}
              className="rounded-full bg-orange-50 px-2 py-1 text-orange-700 ring-1 ring-orange-200"
            >
              {f}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <Link
            to={`/programs/${p.slug}`}
            className="rounded-lg bg-orange-600 px-4 py-2 text-white font-semibold hover:bg-orange-700"
          >
            Program Details
          </Link>
          <a
            href={applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-brand-border-dark px-4 py-2 font-semibold hover:border-slate-400"
          >
            {p.cta ?? 'Apply Now'}
          </a>
        </div>
      </div>
    </article>
  );
}
