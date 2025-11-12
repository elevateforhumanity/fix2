import Link from 'next/link';
import { programs } from '../src/data/programs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
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
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/apply">Apply Now</Link>
              </Button>
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
            <Button size="lg" variant="secondary" asChild>
              <Link href="/programs">Browse Programs</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 6).map((program) => (
              <Link key={program.slug} href={`/programs/${program.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500" />
                  <CardHeader>
                    <CardTitle>{program.name}</CardTitle>
                    <CardDescription>{program.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {program.funding.map((fund) => (
                        <Badge key={fund} variant="secondary">
                          {fund}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/programs">View All Programs</Link>
            </Button>
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
