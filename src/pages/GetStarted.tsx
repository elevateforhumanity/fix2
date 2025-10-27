import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-surface">
      <section className="section pt-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
              Get Started with Elevate for Humanity
            </h1>
            <p className="text-xl text-brand-text-muted">
              Your journey to a new career starts here. Follow these simple
              steps.
            </p>
          </div>
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-brand-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-info text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-brand-text mb-2">
                    Browse Programs
                  </h2>
                  <p className="text-brand-text-muted mb-4">
                    Explore our 9 career training programs and find the one that
                    matches your goals.
                  </p>
                  <Link
                    to="/programs"
                    className="inline-flex items-center gap-2 text-brand-info font-semibold hover:text-brand-info-hover"
                  >
                    View All Programs <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-brand-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-info text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-brand-text mb-2">
                    Check Funding Options
                  </h2>
                  <p className="text-brand-text-muted mb-4">
                    Most programs are funded through WIOA, WRG, or other
                    state/federal programs.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                      WIOA
                    </span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                      WRG
                    </span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                      Apprenticeship
                    </span>
                  </div>
                  <Link
                    to="/funding-impact"
                    className="inline-flex items-center gap-2 text-brand-info font-semibold hover:text-brand-info-hover"
                  >
                    Learn About Funding <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-brand-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-info text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-brand-text mb-2">
                    Apply Online
                  </h2>
                  <p className="text-brand-text-muted mb-4">
                    Complete your application through Indiana Career Connect or
                    our online form.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.indianacareerconnect.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      Apply via Indiana Career Connect
                    </a>
                    <Link to="/apply" className="btn-outline">
                      Alternative Application
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Step 4 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-brand-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-success text-white rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-brand-text mb-2">
                    Start Learning
                  </h2>
                  <p className="text-brand-text-muted mb-4">
                    Once approved, you'll receive access to your student portal
                    and can begin your training.
                  </p>
                  <Link
                    to="/lms"
                    className="inline-flex items-center gap-2 text-brand-info font-semibold hover:text-brand-info-hover"
                  >
                    Preview Student Portal <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-brand-text mb-2">
              Have Questions?
            </h3>
            <p className="text-brand-text-muted mb-6">
              Our team is here to help you every step of the way.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="btn">
                Contact Us
              </Link>
              <Link to="/support" className="btn-outline">
                Visit Support Center
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
