import Link from 'next/link';
import { Metadata } from 'next';
import { Heart, Users, Award, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Volunteer with VITA | Elevate for Humanity',
  description: 'Become a certified VITA tax preparer and help your community.',
};

export default function VITAVolunteerPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-green-600 to-brand-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Volunteer with VITA</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Help families in your community file their taxes for free while
            gaining valuable experience.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <Heart className="w-16 h-16 text-brand-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">Give Back</h3>
            <p className="text-gray-700">Help families get their refunds</p>
          </div>
          <div className="text-center">
            <Users className="w-16 h-16 text-brand-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">
              Gain Experience
            </h3>
            <p className="text-gray-700">Build tax preparation skills</p>
          </div>
          <div className="text-center">
            <Award className="w-16 h-16 text-brand-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">Get Certified</h3>
            <p className="text-gray-700">IRS-certified tax preparer training</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-black mb-6">
            How to Volunteer
          </h2>
          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-black mb-1">Complete Training</h3>
                <p className="text-gray-700">Free IRS certification course</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-black mb-1">
                  Pass Certification
                </h3>
                <p className="text-gray-700">Become IRS-certified</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-black mb-1">
                  Start Volunteering
                </h3>
                <p className="text-gray-700">Help families during tax season</p>
              </div>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-green-700 transition"
          >
            Sign Up to Volunteer
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
