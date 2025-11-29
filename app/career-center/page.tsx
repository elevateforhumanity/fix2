import Link from "next/link";
import { Briefcase, FileText, Award, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { ResumeBuilder } from "@/components/career/ResumeBuilder";

export const metadata = {
  title: "Career Center | Elevate For Humanity",
  description: "Build your resume, showcase your portfolio, and prepare for your career",
};

export default function CareerCenterPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <Briefcase size={16} />
              Career Services
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Career Center
            </h1>
            <p className="text-2xl text-blue-100 mb-8">
              Build your professional resume, showcase your skills, and prepare for job interviews
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Career Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <FileText size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Resume Builder</h3>
              <p className="text-slate-600 mb-4">
                Create a professional resume with our easy-to-use builder. Choose from templates designed for your industry.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <span>Available Now</span>
                <CheckCircle size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Award size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Portfolio Showcase</h3>
              <p className="text-slate-600 mb-4">
                Display your certifications, projects, and achievements in a professional portfolio.
              </p>
              <div className="flex items-center gap-2 text-slate-500 font-semibold">
                <span>Coming Soon</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Interview Prep</h3>
              <p className="text-slate-600 mb-4">
                Practice common interview questions and get tips for success in your field.
              </p>
              <div className="flex items-center gap-2 text-slate-500 font-semibold">
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Builder Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Build Your Resume</h2>
            <p className="text-xl text-slate-600">
              Create a professional resume that highlights your training, skills, and experience
            </p>
          </div>

          <ResumeBuilder />
        </div>
      </section>

      {/* Job Placement Support */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Job Placement Support
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                We don't just train you—we help you get hired. Our job placement team connects you with 100+ hiring employers.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Direct Employer Connections</p>
                    <p className="text-slate-600">We work with companies actively hiring in your field</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Interview Preparation</p>
                    <p className="text-slate-600">Practice interviews and get feedback from our team</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Follow-Up Support</p>
                    <p className="text-slate-600">We stay with you through your first 90 days on the job</p>
                  </div>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg"
              >
                Talk to Job Placement Team
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Results</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
                  <p className="text-slate-700">Job Placement Rate</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">$45K</div>
                  <p className="text-slate-700">Average Starting Salary</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                  <p className="text-slate-700">Hiring Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Career?</h2>
          <p className="text-2xl text-orange-100 mb-8">
            Start building your resume and connecting with employers today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition-all text-xl"
            >
              Apply for Training
              <ArrowRight size={24} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-orange-700 text-white rounded-lg font-bold hover:bg-orange-800 transition-all text-xl border-2 border-white/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
