import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Elevate for Humanity',
  description:
    'Get in touch with our team for questions about our training programs.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">
              Elevate for Humanity
            </span>
          </div>
        </div>
        <nav className="flex gap-3 items-center">
          <Link href="/programs" className="text-gray-700 hover:text-red-600 font-medium">
            Programs
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">
            About
          </Link>
          <Link href="/contact" className="text-efh-red font-bold">
            Contact
          </Link>
          <Link href="/login" className="elevate-btn-secondary">
            Sign In
          </Link>
          <Link href="/signup" className="elevate-btn-primary">
            Get Started Free
          </Link>
        </nav>
      </header>
      <main className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="elevate-container max-w-4xl">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Contact Us</h1>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              Have questions? We're here to help you get started on your career
              journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="elevate-card p-8 animate-fade-in-left">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2 text-efh-red">Phone</h3>
                  <p className="text-gray-700">(317) 314-3757</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-efh-red">Location</h3>
                  <p className="text-gray-700">Indianapolis, IN</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-efh-red">Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 9am - 5pm</p>
                </div>
              </div>
            </div>
            <div className="elevate-card bg-gradient-to-br from-efh-orange/10 to-efh-red/10 border-2 border-efh-orange/20 p-8 animate-fade-in-right">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Quick Links</h2>
              <div className="space-y-3">
                <Link
                  href="/enroll"
                  className="block text-efh-red hover:text-efh-orange font-medium transition-colors"
                >
                  → Check Your Eligibility
                </Link>
                <Link
                  href="/programs"
                  className="block text-efh-red hover:text-efh-orange font-medium transition-colors"
                >
                  → Browse Programs
                </Link>
                <Link
                  href="/faq"
                  className="block text-efh-red hover:text-efh-orange font-medium transition-colors"
                >
                  → Frequently Asked Questions
                </Link>
                <Link
                  href="/login"
                  className="block text-efh-red hover:text-efh-orange font-medium transition-colors"
                >
                  → Student Portal
                </Link>
              </div>
            </div>
          </div>
          <div className="elevate-gradient-red-orange text-white p-8 rounded-xl shadow-xl animate-scale-in">
            <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
            <p className="mb-6 text-white/90">
              Don't wait to transform your career. Our programs are 100% funded
              and ready for you.
            </p>
            <Link
              href="/enroll"
              className="elevate-btn-secondary inline-block"
            >
              Check Your Eligibility
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
