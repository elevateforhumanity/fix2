import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { programs } from '../data/programs';

const APPLICATION_URL = import.meta.env.VITE_APPLICATION_FORM_URL || 'https://www.indianacareerconnect.com';

export default function ProgramDetail() {
  const { slug } = useParams();
  const p = programs.find((x) => x.slug === slug);

  if (!p) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        <Helmet>
          <title>Program Not Found | Elevate for Humanity</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1 className="text-2xl font-bold">Program not found</h1>
        <p className="mt-2 text-brand-text-muted">
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

  const pageTitle = `${p.name} | Elevate for Humanity`;
  const pageDescription = `${p.tagline} - ${p.summary}`;
  const pageUrl = `https://elevateforhumanity.org/programs/${p.slug}`;
  const imageUrl = `https://elevateforhumanity.org${p.cardSrc}`;

  return (
    <div className="bg-white">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Elevate for Humanity" />
        {/* Additional SEO */}
        <meta
          name="keywords"
          content={`${p.name}, workforce development, training program, ${p.funding.join(', ')}, Indianapolis`}
        />
        <meta name="author" content="Elevate for Humanity" />
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: p.name,
            description: p.summary,
            provider: {
              '@type': 'Organization',
              name: 'Elevate for Humanity',
              url: 'https://elevateforhumanity.org',
            },
            image: imageUrl,
            offers: {
              '@type': 'Offer',
              category: 'Educational',
            },
          })}
        </script>
      </Helmet>
      {/* HERO */}
      <section className="relative border-b border-brand-border">
        <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
              Elevate for Humanity
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-text">
              {p.name}
            </h1>
            <p className="mt-2 text-brand-text-muted">{p.tagline}</p>
            <p className="mt-4 text-brand-text">{p.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              {p.funding.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-brand-surface-dark px-2 py-1 text-brand-text"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-orange-600 px-5 py-3 text-white font-semibold hover:bg-orange-700"
              >
                Apply Now
              </a>
              <Link
                to="/contact"
                className="rounded-xl border border-brand-border-dark px-5 py-3 font-semibold hover:border-slate-400"
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
                      <p class="text-sm uppercase tracking-widest text-brand-text-light">${p.name}</p>
                      <p class="mt-2 text-brand-text-muted">${p.tagline}</p>
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
          <h2 className="text-xl font-bold text-brand-text">
            What You'll Learn
          </h2>
          <ul className="mt-3 list-disc pl-5 text-brand-text space-y-1">
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-border p-5">
          <h3 className="text-lg font-bold text-brand-text">
            Eligibility & Funding
          </h3>
          <p className="mt-2 text-brand-text">
            We help you determine eligibility for programs like{' '}
            {p.funding.join(', ')} and connect you with employer partners for
            paid on-the-job training.
          </p>
          <p className="mt-3 text-brand-text">
            Start your application and an advisor will reach out with next
            steps.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-block rounded-lg bg-brand-secondary-hover px-4 py-2 text-white"
          >
            Request Info
          </Link>
        </div>
      </section>
    </div>
  );
}
