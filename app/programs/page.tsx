import Link from 'next/link';
import Image from 'next/image';
import { ecdCourses } from '@/content/courses/ecdCatalog';

export default function ProgramsPage() {
  const categories = [
    { name: 'All Programs', slug: 'all' },
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'Skilled Trades', slug: 'trades' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Business', slug: 'business' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-4">
              Training Programs
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Explore Career Training Programs
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Browse WIOA-funded training programs, registered apprenticeships, and workforce development opportunities across Indiana.
            </p>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              All Training Programs ({ecdCourses.length})
            </h2>
            <p className="text-lg text-slate-600">
              State-approved programs with full or partial WIOA funding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecdCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/programs/${course.slug}`}
                className="group"
              >
                <div className="bg-white border border-slate-200 overflow-hidden hover:border-blue-600 transition">
                  <div className="relative h-48">
                    <Image
                      src={`/generated-images/ecd-courses/${course.coverImageKey}.png`}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {course.category}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        WIOA Eligible
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {course.shortDescription}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        {course.duration || '12-24 weeks'}
                      </span>
                      <span className="text-blue-600 font-semibold group-hover:underline">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Start Your Training?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Check your eligibility for WIOA-funded training programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Check Eligibility
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-slate-700 border border-slate-300 font-semibold hover:bg-slate-50 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
