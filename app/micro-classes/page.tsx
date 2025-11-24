import Image from 'next/image';
import Link from 'next/link';
import { BuyNowButton } from '@/components/BuyNowButton';
import { Clock, Award, CheckCircle, DollarSign, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Micro Classes - Quick Certifications | Elevate For Humanity',
  description: 'Short-term certification programs through our partner training providers. Get certified quickly in high-demand skills.',
  keywords: ['micro classes', 'quick certifications', 'short-term training', 'partner programs'],
};

const microClasses = [
  {
    id: 'cpr-certification',
    name: 'CPR Certification',
    slug: 'cpr-certification',
    description: 'Get American Heart Association BLS/CPR certified in just one day. Required for most healthcare positions.',
    duration: '1 Day (8 hours)',
    price: 75,
    image: '/media/programs/cpr-certification.jpg',
    certification: 'AHA BLS/CPR Card',
    skills: ['Adult CPR', 'Child & Infant CPR', 'AED Use', 'Choking Relief'],
    fundingAvailable: true,
    fundingTypes: ['WIOA', 'WRG'],
  },
  {
    id: 'phlebotomy',
    name: 'Phlebotomy Technician',
    slug: 'phlebotomy',
    description: 'Learn blood draw techniques and become a certified Phlebotomy Technician. High demand in hospitals and labs.',
    duration: '6-8 Weeks',
    price: 1200,
    image: '/media/programs/phlebotomy.jpg',
    certification: 'Certified Phlebotomy Technician',
    skills: ['Venipuncture', 'Capillary Collection', 'Lab Safety', 'Patient Care'],
    fundingAvailable: true,
    fundingTypes: ['WIOA', 'WRG'],
  },
  {
    id: 'ekg-technician',
    name: 'EKG Technician',
    slug: 'ekg-technician',
    description: 'Master EKG procedures and interpretation. Work in hospitals, clinics, and cardiac care centers.',
    duration: '4-6 Weeks',
    price: 950,
    image: '/media/programs/ekg-technician.jpg',
    certification: 'Certified EKG Technician',
    skills: ['EKG Procedures', 'Heart Anatomy', 'Rhythm Analysis', 'Patient Monitoring'],
    fundingAvailable: true,
    fundingTypes: ['WIOA', 'WRG'],
  },
  {
    id: 'pharmacy-technician',
    name: 'Pharmacy Technician',
    slug: 'pharmacy-technician',
    description: 'Assist pharmacists in preparing and dispensing medications. Work in retail or hospital pharmacies.',
    duration: '12 Weeks',
    price: 1800,
    image: '/media/programs/pharmacy-tech.jpg',
    certification: 'Certified Pharmacy Technician',
    skills: ['Medication Dispensing', 'Pharmacy Math', 'Insurance Billing', 'Customer Service'],
    fundingAvailable: true,
    fundingTypes: ['WIOA', 'WRG'],
  },
  {
    id: 'dental-assistant',
    name: 'Dental Assistant',
    slug: 'dental-assistant',
    description: 'Support dental professionals in patient care and office operations. Start your dental career quickly.',
    duration: '10 Weeks',
    price: 1500,
    image: '/media/programs/dental-assistant.jpg',
    certification: 'Certified Dental Assistant',
    skills: ['Chairside Assisting', 'X-Rays', 'Sterilization', 'Patient Records'],
    fundingAvailable: true,
    fundingTypes: ['WIOA', 'WRG'],
  },
  {
    id: 'patient-care-technician',
    name: 'Patient Care Technician',
    slug: 'patient-care-technician',
    description: 'Combine CNA, EKG, and phlebotomy skills. Provide comprehensive patient care in hospitals.',
    duration: '14 Weeks',
    price: 2200,
    image: '/media/programs/patient-care-tech.jpg',
    certification: 'Patient Care Technician Certificate',
    skills: ['Basic Nursing', 'EKG', 'Phlebotomy', 'Vital Signs'],
    fundingAvailable: true,
    fundingTypes: ['WIOA', 'WRG'],
  },
  {
    id: 'sterile-processing',
    name: 'Sterile Processing Technician',
    slug: 'sterile-processing',
    description: 'Clean, sterilize, and prepare surgical instruments. Critical role in hospital operations.',
    duration: '8 Weeks',
    price: 1400,
    image: '/media/programs/sterile-processing.jpg',
    certification: 'Certified Sterile Processing Technician',
    skills: ['Instrument Cleaning', 'Sterilization', 'Quality Control', 'Infection Prevention'],
    fundingAvailable: true,
    fundingTypes: ['WIOA', 'WRG'],
  },
  {
    id: 'esthetician',
    name: 'Esthetician',
    slug: 'esthetician',
    description: 'Master skincare, facials, and beauty treatments. Launch your career in the growing wellness industry.',
    duration: '700 Hours',
    price: 5500,
    image: '/media/programs/esthetician.jpg',
    certification: 'Indiana State Esthetician License',
    skills: ['Facials', 'Waxing', 'Makeup', 'Skincare Analysis'],
    fundingAvailable: true,
    fundingTypes: ['WIOA', 'WRG'],
  },
  {
    id: 'culinary-arts',
    name: 'Culinary Arts',
    slug: 'culinary-arts',
    description: 'Professional cooking techniques and kitchen management. Train in real restaurant kitchens.',
    duration: '16 Weeks',
    price: 3200,
    image: '/media/programs/culinary.jpg',
    certification: 'Culinary Arts Certificate',
    skills: ['Cooking Techniques', 'Food Safety', 'Menu Planning', 'Kitchen Management'],
    fundingAvailable: false,
  },
  {
    id: 'financial-literacy',
    name: 'Financial Literacy',
    slug: 'financial-literacy',
    description: 'Master budgeting, credit, and money management. Essential life skills for career success.',
    duration: '4 Weeks',
    price: 250,
    image: '/media/programs/financial-literacy.jpg',
    certification: 'Financial Literacy Certificate',
    skills: ['Budgeting', 'Credit Management', 'Savings', 'Financial Planning'],
    fundingAvailable: true,
    fundingTypes: ['WIOA'],
  },
  {
    id: 'peer-recovery-coach',
    name: 'Peer Recovery Coach',
    slug: 'peer-recovery-coach',
    description: 'Support individuals in recovery. Make a difference in your community with this rewarding career.',
    duration: '40-80 Hours',
    price: 800,
    image: '/media/programs/peer-recovery.jpg',
    certification: 'Indiana Peer Recovery Coach Certification',
    skills: ['Recovery Support', 'Motivational Interviewing', 'Crisis Intervention', 'Resource Navigation'],
    fundingAvailable: true,
    fundingTypes: ['WIOA', 'JRI'],
  },
  {
    id: 'tax-office-certification',
    name: 'Tax Office Certification',
    slug: 'tax-office-certification',
    description: 'Prepare tax returns and help clients. Seasonal or year-round career opportunities.',
    duration: '60-80 Hours',
    price: 1100,
    image: '/media/programs/tax-prep.jpg',
    certification: 'IRS PTIN & Tax Preparer Certification',
    skills: ['Tax Law', 'Tax Software', 'Client Consultation', 'IRS Procedures'],
    fundingAvailable: false,
  },
];

export default function MicroClassesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              ⚡ Quick Certifications
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Micro Classes
            </h1>
            <p className="text-xl text-green-100 leading-relaxed mb-8">
              Short-term certification programs through our credentialed partner training providers. 
              Get certified quickly in high-demand skills. Enroll today and start learning immediately.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>1 Day to 16 Weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Industry Certifications</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Partner Training Providers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available Micro Classes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our selection of quick certification programs. All classes are provided by our 
              credentialed partner training providers and include industry-recognized certifications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {microClasses.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">📚</div>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ${program.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {program.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">What You'll Learn:</div>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certification */}
                  <div className="flex items-start gap-2 mb-6 p-3 bg-blue-50 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-blue-900">Certification:</div>
                      <div className="text-sm text-blue-800">{program.certification}</div>
                    </div>
                  </div>

                  {/* Funding Notice */}
                  {program.fundingAvailable && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-green-900">
                            FREE for Those Who Qualify
                          </div>
                          <div className="text-xs text-green-800">
                            100% funded through {program.fundingTypes?.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="space-y-3">
                    {program.fundingAvailable ? (
                      <>
                        {/* Free Funding Option */}
                        <Link
                          href="/apply"
                          className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all"
                        >
                          Apply for Free Funding
                        </Link>
                        
                        {/* Divider */}
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                          </div>
                        </div>

                        {/* Pay Out of Pocket */}
                        <BuyNowButton
                          programName={program.name}
                          programSlug={program.slug}
                          price={program.price}
                          className="w-full"
                        />
                        <div className="text-center text-xs text-gray-500">
                          Don't qualify for funding? Pay directly
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Only Buy Now for non-funded programs */}
                        <BuyNowButton
                          programName={program.name}
                          programSlug={program.slug}
                          price={program.price}
                          className="w-full"
                        />
                      </>
                    )}
                    
                    <Link
                      href={`/programs/${program.slug}`}
                      className="block text-center text-sm text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Micro Classes */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Micro Classes?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Completion</h3>
              <p className="text-gray-600">
                Get certified in as little as 1 day to 16 weeks. Perfect for career changers and skill builders.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Recognized</h3>
              <p className="text-gray-600">
                Earn certifications that employers recognize and value. All programs meet industry standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Credentialed Partners</h3>
              <p className="text-gray-600">
                Learn from experienced instructors at our partner training facilities across Indianapolis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Certified?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose your micro class and enroll today. Start learning immediately with our partner training providers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-all"
            >
              Browse Classes
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Have Questions?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
