import Link from 'next/link';

export const metadata = {
  title: 'Apply Now | Elevate for Humanity',
  description: 'Apply for free workforce training programs.',
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 elevate-gradient-red-orange rounded-lg flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <span className="text-xl font-bold">Elevate for Humanity</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-slate-900">
            Apply for Training
          </h1>
          <p className="text-xl text-slate-700 mb-12">
            Start your application for 100% funded workforce training programs.
          </p>
          <div className="bg-orange-50 border border-orange-100 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">
              Application Process
            </h2>
            <ol className="space-y-4 text-slate-700">
              <li className="flex gap-3">
                <span className="font-bold text-orange-600">1.</span>
                <span>Choose your program</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600">2.</span>
                <span>Complete the application form</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600">3.</span>
                <span>Submit required documents</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600">4.</span>
                <span>Attend orientation</span>
              </li>
            </ol>
          </div>
          <div className="space-y-4">
            <Link
              href="/programs"
              className="elevate-btn-primary block text-center"
            >
              Browse Programs
            </Link>
            <Link
              href="/contact"
              className="elevate-btn-secondary block text-center"
            >
              Contact Us for Help
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
