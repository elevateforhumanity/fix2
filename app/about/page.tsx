import Link from 'next/link';

export const metadata = {
  title: 'About Us | Elevate for Humanity',
  description:
    'Learn about our mission to provide free workforce training and career development.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">
              Elevate Connects Directory
            </span>
          </div>
        </div>
        <nav className="flex gap-3 items-center">
          <Link href="/programs" className="text-gray-700 hover:text-red-600 font-medium">
            Programs
          </Link>
          <Link href="/about" className="text-efh-red font-bold">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              About Elevate for Humanity
            </h1>
            <p className="text-2xl font-semibold mb-6 text-efh-orange italic">
              Innovate. Elevate. Reset.
            </p>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed animate-fade-in-up animate-delay-100">
              We provide free workforce training and career development programs
              to help individuals transform their lives through education and
              skill-building.
            </p>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 animate-fade-in-up animate-delay-200">Our Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed animate-fade-in-up animate-delay-300">
              To elevate communities by providing accessible, high-quality
              career and technical training that leads to meaningful employment
              and economic opportunity.
            </p>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 animate-fade-in-up animate-delay-400">What We Offer</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 animate-fade-in-left animate-delay-500">
                <span className="text-efh-teal text-xl">✓</span>
                <span>100% funded training programs through WIOA and WRG</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-left animate-delay-600">
                <span className="text-efh-teal text-xl">✓</span>
                <span>Industry-recognized certifications</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-left animate-delay-700">
                <span className="text-efh-teal text-xl">✓</span>
                <span>Hands-on training with experienced instructors</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-left animate-delay-800">
                <span className="text-efh-teal text-xl">✓</span>
                <span>Job placement assistance</span>
              </li>
              <li className="flex items-start gap-3 animate-fade-in-left animate-delay-900">
                <span className="text-efh-teal text-xl">✓</span>
                <span>Ongoing career support</span>
              </li>
            </ul>
            <div className="elevate-card bg-gradient-to-br from-efh-red/10 to-efh-orange/10 border-2 border-efh-red/20 p-8 mb-8 animate-scale-in">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Get Started?</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Join thousands of students who have transformed their careers
                through our programs.
              </p>
              <Link
                href="/enroll"
                className="elevate-btn-primary inline-block"
              >
                Check Your Eligibility
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
