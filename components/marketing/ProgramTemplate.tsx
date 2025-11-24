// components/marketing/ProgramTemplate.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, DollarSign, Users, Award, Briefcase, GraduationCap } from "lucide-react";

interface ProgramData {
  name: string;
  slug: string;
  description: string;
  duration: string;
  salaryRange: string;
  heroImage: string;
  skills: Array<{ title: string; description: string }>;
  jobTitles: Array<{ title: string; setting: string }>;
  outcomes: {
    jobPlacement: number;
    certificationPass: number;
    satisfaction: number;
  };
  certification: string;
  schedule: string[];
  requirements: string[];
  support: string[];
}

interface ProgramTemplateProps {
  program: ProgramData;
}

export function ProgramTemplate({ program }: ProgramTemplateProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-6">
                <Award size={16} />
                <span>100% FREE Training</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                {program.name} Training Program
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {program.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                  <Clock size={24} className="text-emerald-600" />
                  <div>
                    <div className="text-sm text-slate-600">Duration</div>
                    <div className="font-bold text-slate-900">{program.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                  <DollarSign size={24} className="text-emerald-600" />
                  <div>
                    <div className="text-sm text-slate-600">Salary Range</div>
                    <div className="font-bold text-slate-900">{program.salaryRange}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-emerald-700 transition-all hover:scale-105"
                >
                  Apply Now - It's Free
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/funding/state-programs"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-all"
                >
                  Learn About Funding
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={program.heroImage}
                  alt={`${program.name} in training`}
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What You'll Learn
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our comprehensive curriculum covers all the skills you need to excel as a {program.name}.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {program.skills.map((skill, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{skill.title}</h3>
                  <p className="text-sm text-slate-600">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Outcomes Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Career Opportunities
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                {program.name}s are in high demand across healthcare settings. Upon completion, you'll be qualified for positions including:
              </p>

              <div className="space-y-4">
                {program.jobTitles.map((job, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                    <Briefcase size={20} className="text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">{job.title}</div>
                      <div className="text-sm text-slate-600">{job.setting}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Program Outcomes</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700">Job Placement Rate</span>
                    <span className="text-2xl font-bold text-emerald-600">{program.outcomes.jobPlacement}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-emerald-600 h-3 rounded-full" style={{ width: `${program.outcomes.jobPlacement}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700">Certification Pass Rate</span>
                    <span className="text-2xl font-bold text-blue-600">{program.outcomes.certificationPass}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${program.outcomes.certificationPass}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700">Student Satisfaction</span>
                    <span className="text-2xl font-bold text-purple-600">{program.outcomes.satisfaction}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-purple-600 h-3 rounded-full" style={{ width: `${program.outcomes.satisfaction}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-3 mb-2">
                  <Award size={20} className="text-emerald-600" />
                  <span className="font-bold text-slate-900">Certification Included</span>
                </div>
                <p className="text-sm text-slate-600">
                  {program.certification}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Program Details
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Clock size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Schedule</h3>
              <p className="text-slate-600 mb-4">
                Flexible options to fit your life:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                {program.schedule.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <GraduationCap size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Requirements</h3>
              <p className="text-slate-600 mb-4">
                Minimal prerequisites:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                {program.requirements.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Support Services</h3>
              <p className="text-slate-600 mb-4">
                We're here to help you succeed:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                {program.support.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-purple-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your {program.name} Career?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join our next cohort and begin your journey to a rewarding healthcare career. 100% funded training with no cost to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-emerald-600 shadow-lg hover:bg-slate-50 transition-all hover:scale-105"
            >
              Apply Now - It's Free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
