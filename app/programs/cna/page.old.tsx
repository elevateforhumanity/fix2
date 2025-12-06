import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, DollarSign, MapPin, Award, CheckCircle, 
  Users, BookOpen, Briefcase, TrendingUp, Heart 
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Certified Nursing Assistant (CNA) | Elevate for Humanity",
  description: "Career training and workforce development programs.",
  openGraph: {
    title: "Program | Elevate for Humanity",
    description: "Career training and workforce development programs.",
    images: ["/images/programs-new/program-18.jpg"],
    type: "website",
  },
};

export default function CNAPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-red-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Heart className="text-white" size={20} />
                <span className="text-sm font-semibold">Healthcare Career</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Certified Nursing Assistant (CNA) Training
              </h1>
              <p className="text-xl text-red-50 mb-8">
                Start your healthcare career in just 6-8 weeks. 100% FREE through WIOA funding. 
                No tuition, no debt. Real CNA jobs waiting in Indianapolis.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-red-50 transition"
                >
                  Apply Now - FREE Training
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-800 text-white rounded-lg font-bold text-lg hover:bg-red-900 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/healthcare-hd.jpg"
                alt="CNA Training - Certified Nursing Assistant"
                fill
                className="object-cover"
                quality={100}
                priority sizes="100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">6-8 Weeks</div>
              <div className="text-sm text-slate-600">Program Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">120 Hours</div>
              <div className="text-sm text-slate-600">Clinical Training</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">$28K-$35K</div>
              <div className="text-sm text-slate-600">Starting Salary</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">85%</div>
              <div className="text-sm text-slate-600">Job Placement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Image */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-16">
            <Image
              src="/media/programs/cpr-group-training-hd.jpg"
              alt="CNA students practicing hands-on skills"
              fill
              className="object-cover"
              quality={100} sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                What You'll Learn
              </h2>
              <div className="space-y-4">
                {[
                  'Basic Nursing Skills & Patient Care',
                  'Vital Signs Monitoring (BP, Pulse, Temperature)',
                  'Infection Control & Safety Procedures',
                  'Personal Care & Hygiene Assistance',
                  'Nutrition & Feeding Assistance',
                  'Mobility & Transfer Techniques',
                  'Communication with Patients & Families',
                  'Medical Terminology & Documentation',
                  'Emergency Response & First Aid',
                  'End-of-Life Care & Comfort Measures',
                ].map((skill, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Career Opportunities
              </h2>
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-2">Certified Nursing Assistant</h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Work in hospitals, nursing homes, assisted living facilities
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <DollarSign size={16} />
                      $28K-$35K/year
                    </span>
                    <span className="flex items-center gap-1 text-brandPrimary font-semibold">
                      <TrendingUp size={16} />
                      High Demand
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-2">Home Health Aide</h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Provide in-home care for elderly and disabled patients
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <DollarSign size={16} />
                      $26K-$32K/year
                    </span>
                    <span className="flex items-center gap-1 text-brandPrimary font-semibold">
                      <TrendingUp size={16} />
                      Growing Field
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-2">Patient Care Technician</h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Advanced role in hospitals with additional training
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <DollarSign size={16} />
                      $32K-$40K/year
                    </span>
                    <span className="flex items-center gap-1 text-brandPrimary font-semibold">
                      <TrendingUp size={16} />
                      Career Growth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Training Image */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Real Clinical Experience
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                Get 120 hours of hands-on clinical training in real healthcare facilities. Work with actual patients under the supervision of licensed nurses.
              </p>
              <p className="text-lg text-slate-600">
                You'll practice in hospitals, nursing homes, and assisted living facilities throughout Indianapolis.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/healthcare-professional-1-hd.jpg"
                alt="CNA clinical training in healthcare facility"
                fill
                className="object-cover"
                quality={100} sizes="100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Program Details
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Clock className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Duration</h3>
              <p className="text-slate-600">
                6-8 weeks full-time training including 120 hours of clinical practice in real healthcare settings.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Award className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Certification</h3>
              <p className="text-slate-600">
                Earn Indiana State CNA License. Eligible to take state certification exam upon completion.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <MapPin className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Training Sites</h3>
              <p className="text-slate-600">
                Ivy Tech Community College, American Red Cross, and partner healthcare facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Success Image */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/healthcare-professional-2-hd.jpg"
                alt="Successful CNA graduate working in healthcare"
                fill
                className="object-cover"
                quality={100} sizes="100vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Start Your Career Immediately
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                85% of our CNA graduates are hired within 30 days of certification. Hospitals and nursing homes are actively recruiting.
              </p>
              <p className="text-lg text-slate-600">
                Starting pay ranges from $28K-$35K per year with benefits, paid time off, and opportunities for advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                100% FREE Training
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                This program is fully funded through WIOA, WRG, and JRI. No tuition, no fees, no debt.
                We cover everything including books, supplies, and certification exam fees.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-slate-700 shadow-sm">
                  WIOA Approved
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-slate-700 shadow-sm">
                  WRG Eligible
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-slate-700 shadow-sm">
                  JRI Funded
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Requirements
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">High school diploma or GED</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">Background check (required for healthcare)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">Drug screening</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">Physical ability to perform patient care tasks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">Immunizations (TB test, Hepatitis B, etc.)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Healthcare Career?
          </h2>
          <p className="text-xl text-red-50 mb-8">
            Apply now for FREE CNA training. Classes starting soon in Indianapolis.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-red-50 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-800 text-white rounded-lg font-bold text-lg hover:bg-red-900 transition border-2 border-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
