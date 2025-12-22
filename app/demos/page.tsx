import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Users,
  Building2,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'See the Workforce Hub in Operation | Elevate For Humanity',
  description:
    'Watch how our platform replaces staff, enforces compliance, and operates workforce systems end-to-end.',
};

/**
 * DEMOS PAGE - 10/10 ENTERPRISE GRADE
 *
 * This is not a feature tour. This is workflow demonstration.
 *
 * For licensing buyers: Shows staff replacement capability
 * For agencies: Shows compliance automation
 * For funders: Shows operational efficiency
 *
 * Each demo answers:
 * - What problem does this solve?
 * - What workflow does it automate?
 * - What staff does it replace?
 * - What liability does it remove?
 */

export default function DemosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/efh/hero/hero-main.jpg"
          alt="Workforce hub in operation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="h-4 w-4" />
              <span>Live System Demonstrations</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              See the Workforce Hub
              <br />
              in Operation
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Watch how our platform replaces staff, enforces compliance, and
              operates workforce systems end-to-end.
            </p>
          </div>
        </div>
      </section>

      {/* What These Demos Show */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            What These Demos Demonstrate
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <Clock className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">
                Staff Replacement
              </h3>
              <p className="text-sm text-slate-600">
                See which manual processes are automated and what labor is
                eliminated
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <Shield className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">
                Compliance Enforcement
              </h3>
              <p className="text-sm text-slate-600">
                Watch how the platform prevents errors and enforces requirements
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <CheckCircle className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">
                Workflow Automation
              </h3>
              <p className="text-sm text-slate-600">
                Follow complete workflows from intake to placement
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <TrendingUp className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">
                Licensing Capability
              </h3>
              <p className="text-sm text-slate-600">
                Understand how this can be deployed for your organization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Demos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Workflow Demonstrations
          </h2>
          <p className="text-lg text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Each demo shows a complete workflow from start to finish,
            highlighting staff replacement and compliance automation.
          </p>

          <div className="space-y-8">
            {/* Student Onboarding Workflow */}
            <div className="bg-slate-50 rounded-xl p-8 border-2 border-slate-200 hover:border-blue-600 transition">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Student Onboarding Workflow
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-2">
                        Problem
                      </div>
                      <p className="text-slate-900">
                        Manual onboarding takes 40 hours per student. High error
                        rate. Inconsistent process.
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-2">
                        Solution
                      </div>
                      <p className="text-slate-900">
                        Automated workflow reduces to 2 hours. Zero errors.
                        Enforced progression.
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-2">
                        Staff Replaced
                      </div>
                      <p className="text-slate-900">
                        Intake coordinator, eligibility verifier, document
                        processor
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 mb-6">
                    <h4 className="font-bold text-slate-900 mb-4">
                      Workflow Steps:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Application Submitted
                          </div>
                          <div className="text-sm text-slate-600">
                            Platform validates data, checks duplicates, assigns
                            advisor automatically
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Eligibility Verified
                          </div>
                          <div className="text-sm text-slate-600">
                            System checks requirements, flags missing docs,
                            locks enrollment until complete
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Program Enrolled
                          </div>
                          <div className="text-sm text-slate-600">
                            Funding secured, prerequisites assigned, compliance
                            tracking activated
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          ✓
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Training Begins
                          </div>
                          <div className="text-sm text-slate-600">
                            Student cannot skip steps. Platform enforces
                            progression. Advisor notified of issues.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href="/demo/student"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      <span>Watch Workflow Demo</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <div className="text-sm text-slate-600">
                      <strong>Result:</strong> 95% faster, zero errors, full
                      audit trail
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Holder Compliance Workflow */}
            <div className="bg-slate-50 rounded-xl p-8 border-2 border-slate-200 hover:border-purple-600 transition">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Program Holder Compliance Workflow
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-2">
                        Problem
                      </div>
                      <p className="text-slate-900">
                        Manual compliance tracking. Missed deadlines.
                        Inconsistent reporting. High liability.
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-2">
                        Solution
                      </div>
                      <p className="text-slate-900">
                        Automated obligation engine. Overdue alerts. Enforced
                        requirements. Protected from errors.
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-2">
                        Staff Replaced
                      </div>
                      <p className="text-slate-900">
                        Compliance officer, report coordinator, audit preparer
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 mb-6">
                    <h4 className="font-bold text-slate-900 mb-4">
                      Workflow Steps:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Student Accepted
                          </div>
                          <div className="text-sm text-slate-600">
                            Platform creates compliance schedule, assigns
                            deadlines, activates tracking
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Progress Monitored
                          </div>
                          <div className="text-sm text-slate-600">
                            System flags at-risk students, surfaces overdue
                            reports, calculates compliance score
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Reports Generated
                          </div>
                          <div className="text-sm text-slate-600">
                            One-click reporting for DOL, ETPL, WIOA. Audit-ready
                            documentation.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          ✓
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Compliance Maintained
                          </div>
                          <div className="text-sm text-slate-600">
                            Platform prevents non-compliance. Protects from
                            errors. Reduces liability.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href="/demo/admin"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      <span>Watch Workflow Demo</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <div className="text-sm text-slate-600">
                      <strong>Result:</strong> 80% less labor, zero missed
                      deadlines, full protection
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Funding Application Workflow */}
            <div className="bg-slate-50 rounded-xl p-8 border-2 border-slate-200 hover:border-green-600 transition">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Funding Application Workflow
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-2">
                        Problem
                      </div>
                      <p className="text-slate-900">
                        Complex funding applications. High rejection rate.
                        Manual verification. Slow processing.
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-2">
                        Solution
                      </div>
                      <p className="text-slate-900">
                        Guided application process. Pre-validation. Automated
                        verification. Fast approval.
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-2">
                        Staff Replaced
                      </div>
                      <p className="text-slate-900">
                        Funding coordinator, eligibility specialist, document
                        verifier
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 mb-6">
                    <h4 className="font-bold text-slate-900 mb-4">
                      Workflow Steps:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Eligibility Checked
                          </div>
                          <div className="text-sm text-slate-600">
                            Platform determines which funding sources apply,
                            shows requirements
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Application Guided
                          </div>
                          <div className="text-sm text-slate-600">
                            Step-by-step process, real-time validation, cannot
                            submit incomplete
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Documents Verified
                          </div>
                          <div className="text-sm text-slate-600">
                            Automated checks, instant feedback, clear next steps
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          ✓
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Funding Secured
                          </div>
                          <div className="text-sm text-slate-600">
                            Student notified, enrollment unlocked, training
                            begins
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href="/demo/grants"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      <span>Watch Workflow Demo</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <div className="text-sm text-slate-600">
                      <strong>Result:</strong> 70% faster approval, 90% fewer
                      rejections
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Licensing Buyers */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Licensing Opportunity</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Deploy This for Your Organization
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            These workflows can be white-labeled and deployed for training
            providers, workforce boards, and government agencies.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Reduced Labor</h4>
              <p className="text-sm text-slate-600">
                Automate 70-95% of manual processes
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">
                Reduced Liability
              </h4>
              <p className="text-sm text-slate-600">
                Platform prevents compliance errors
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">
                Reduced Variability
              </h4>
              <p className="text-sm text-slate-600">
                Enforced workflows ensure consistency
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Schedule Live Demo
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to See It Live?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Schedule a personalized demonstration with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition"
            >
              Schedule Demo
            </Link>
            <Link
              href="/demo/student"
              className="inline-block px-8 py-4 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition border-2 border-white"
            >
              Try Interactive Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
