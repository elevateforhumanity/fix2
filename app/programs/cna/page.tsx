import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'CNA Training Program | Elevate Connects',
  description:
    'Become a Certified Nursing Assistant in 6-8 weeks. State certification included. Most students qualify for free training through WIOA.',
};

export default function CNAProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 to-cyan-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">Healthcare Career</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Certified Nursing Assistant (CNA)
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Start your healthcare career in 6-8 weeks. Get hands-on training
              in real medical facilities. State certification exam included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/enroll/cna"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border-2 border-white/30 transition-all"
              >
                Check WIOA Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">6-8 Weeks</div>
              <div className="text-sm text-slate-600">Program Length</div>
            </div>
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">$32,000+</div>
              <div className="text-sm text-slate-600">Starting Salary</div>
            </div>
            <div className="text-center">
              <Calendar className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">Feb 5th</div>
              <div className="text-sm text-slate-600">Next Class Starts</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">8 Spots</div>
              <div className="text-sm text-slate-600">Remaining</div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">
            What You'll Learn
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Clinical Skills
              </h3>
              <ul className="space-y-4">
                {[
                  'Taking and recording vital signs (blood pressure, temperature, pulse)',
                  'Assisting patients with daily activities (bathing, dressing, eating)',
                  'Helping patients move safely (transfers, walking, wheelchair use)',
                  'Maintaining patient hygiene and comfort',
                  'Recognizing and reporting changes in patient condition',
                  'Following infection control procedures',
                  'Documenting care in medical records',
                ].map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Where You'll Train
              </h3>
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-blue-900 mb-3">
                  Real Healthcare Facilities
                </h4>
                <p className="text-blue-800 mb-4">
                  You'll complete your clinical hours in actual hospitals,
                  nursing homes, and assisted living facilities - not just a
                  classroom.
                </p>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li>• 40 hours classroom instruction</li>
                  <li>• 35+ hours hands-on clinical practice</li>
                  <li>• Work with real patients under supervision</li>
                  <li>• Learn from experienced RNs and CNAs</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                State Certification
              </h3>
              <div className="bg-green-50 rounded-xl p-6">
                <p className="text-green-900 mb-4">
                  Upon completing the program, you'll be prepared to take your
                  state's CNA certification exam. We include:
                </p>
                <ul className="space-y-2 text-sm text-green-900">
                  <li>• Exam preparation and practice tests</li>
                  <li>• Skills demonstration practice</li>
                  <li>• Written exam review</li>
                  <li>• Registration assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">
            Program Schedule
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Class Schedule Options
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Day Program</h4>
                  <p className="text-slate-600 mb-2">
                    Monday - Friday, 9:00 AM - 3:00 PM
                  </p>
                  <p className="text-sm text-slate-500">6 weeks total</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Evening Program
                  </h4>
                  <p className="text-slate-600 mb-2">
                    Monday - Thursday, 5:30 PM - 9:30 PM
                  </p>
                  <p className="text-sm text-slate-500">8 weeks total</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">
                    Weekend Program
                  </h4>
                  <p className="text-slate-600 mb-2">
                    Saturday & Sunday, 8:00 AM - 4:00 PM
                  </p>
                  <p className="text-sm text-slate-500">8 weeks total</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Requirements
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Age</p>
                    <p className="text-sm text-slate-600">
                      Must be 18 years or older
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Education</p>
                    <p className="text-sm text-slate-600">
                      High school diploma or GED
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      Background Check
                    </p>
                    <p className="text-sm text-slate-600">
                      Required for clinical placement
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Physical</p>
                    <p className="text-sm text-slate-600">
                      Health screening and immunizations
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Outlook */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">
            After Graduation
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Where CNAs Work
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>• Hospitals</li>
                <li>• Nursing homes</li>
                <li>• Assisted living facilities</li>
                <li>• Home health agencies</li>
                <li>• Rehabilitation centers</li>
                <li>• Hospice care</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Typical Schedule
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>• Full-time or part-time</li>
                <li>• Day, evening, or night shifts</li>
                <li>• 12-hour or 8-hour shifts</li>
                <li>• Weekend and holiday options</li>
                <li>• Flexible scheduling available</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Career Growth
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>• Advance to LPN/LVN</li>
                <li>• Pursue RN degree</li>
                <li>• Specialize in areas like pediatrics</li>
                <li>• Move into supervisory roles</li>
                <li>• Continue education while working</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Healthcare Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Next class starts February 5th. Only 8 spots remaining.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/enroll/cna"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-slate-100 font-bold px-8 py-4 rounded-lg transition-all"
            >
              Enroll Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border-2 border-white/30 transition-all"
            >
              Have Questions? Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
