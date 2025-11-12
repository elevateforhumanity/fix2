import Link from 'next/link';
import { programs } from '../src/data/programs';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <span className="text-xl font-bold">Elevate for Humanity</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/programs" className="hover:text-blue-600">Programs</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
              <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            </nav>
            <div className="flex gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded">
                Sign In
              </Link>
              <Link href="/apply" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your Career with Free Training
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Build in-demand skills, earn industry certifications, and launch your dream career—100% funded through federal programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <span className="px-6 py-3 bg-white/20 backdrop-blur rounded-full font-semibold border-2 border-white/30">
              💰 100% Funded
            </span>
            <span className="px-6 py-3 bg-white/20 backdrop-blur rounded-full font-semibold border-2 border-white/30">
              📜 8 Career Pathways
            </span>
            <span className="px-6 py-3 bg-white/20 backdrop-blur rounded-full font-semibold border-2 border-white/30">
              🎓 Industry Certifications
            </span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/programs" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100">
              Browse Programs
            </Link>
            <Link href="/apply" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 6).map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="border rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-4">{program.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {program.funding.map((fund) => (
                      <span key={fund} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {fund}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/programs" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 inline-block">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Elevate for Humanity</h3>
              <p className="text-gray-400">Career & Technical training that elevates communities.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/programs/barber" className="hover:text-white">Barber Apprenticeship</Link></li>
                <li><Link href="/programs/building-tech" className="hover:text-white">Building Services</Link></li>
                <li><Link href="/programs/cna" className="hover:text-white">CNA Training</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 (317) 314-3757</li>
                <li>📍 Indianapolis, IN</li>
                <li>elevateforhumanity.org</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-wrap justify-between items-center gap-4">
            <p className="text-gray-400">© 2025 Elevate for Humanity. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
