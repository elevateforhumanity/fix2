import Link from 'next/link';
import { programs } from '../../../src/data/programs';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) return {};

  return {
    title: `${program.name} | Elevate for Humanity`,
    description: program.summary,
  };
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = programs.find((p) => p.slug === params.slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-xl font-bold">Elevate for Humanity</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/programs" className="hover:text-blue-600">Programs</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
              <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <Link href="/programs" className="text-white/80 hover:text-white mb-4 inline-block">
              ← Back to Programs
            </Link>
            <h1 className="text-5xl font-bold mb-4">{program.name}</h1>
            <p className="text-2xl opacity-90 mb-6">{program.tagline}</p>
            <div className="flex flex-wrap gap-3">
              {program.funding.map((fund) => (
                <span key={fund} className="px-4 py-2 bg-white/20 backdrop-blur rounded-full font-semibold border-2 border-white/30">
                  {fund}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
              <p className="text-xl text-gray-700 mb-8">{program.summary}</p>

              <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
              <ul className="space-y-3 mb-8">
                {program.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl">✓</span>
                    <span className="text-gray-700">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
                <h3 className="text-xl font-bold mb-2">Funding Available</h3>
                <p className="text-gray-700">
                  This program is 100% funded through: {program.funding.join(', ')}
                </p>
              </div>

              {program.cta && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 font-medium">{program.cta}</p>
                </div>
              )}

              <div className="mt-12 flex gap-4">
                <Link href="/apply" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700">
                  Apply Now
                </Link>
                <Link href="/contact" className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
