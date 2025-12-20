'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, CheckCircle, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ProgramHolderApplicationPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: 'nonprofit',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    state: 'IN',
    zip: '',
    programsInterested: [] as string[],
    estimatedStudents: '',
    howHeardAboutUs: '',
    additionalInfo: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const supabase = createClient();

  const programOptions = [
    'Barber Training',
    'CNA',
    'CDL',
    'HVAC',
    'Medical Assistant',
    'Esthetician',
    'Building Maintenance',
    'Business & Entrepreneurship',
    'All Programs',
  ];

  const organizationTypes = [
    { value: 'nonprofit', label: 'Non-Profit Organization' },
    { value: 'government', label: 'Government Agency' },
    { value: 'workforce_board', label: 'Workforce Development Board' },
    { value: 'community_org', label: 'Community Organization' },
    { value: 'educational', label: 'Educational Institution' },
    { value: 'other', label: 'Other' },
  ];

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleProgramToggle(program: string) {
    const current = formData.programsInterested;
    if (current.includes(program)) {
      setFormData({
        ...formData,
        programsInterested: current.filter((p) => p !== program),
      });
    } else {
      setFormData({ ...formData, programsInterested: [...current, program] });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login?redirect=/program-holder/apply');
        return;
      }

      const { error: insertError } = await supabase
        .from('program_holder_applications')
        .insert({
          user_id: user.id,
          organization_name: formData.organizationName,
          organization_type: formData.organizationType,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          programs_interested: formData.programsInterested,
          estimated_students: parseInt(formData.estimatedStudents) || null,
          how_heard_about_us: formData.howHeardAboutUs,
          additional_info: formData.additionalInfo,
          status: 'pending',
        });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err: unknown) {
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden bg-white">
          <Image
            src="/images/efh/hero/hero-main.jpg"
            alt="Application submitted"
            fill
            className="object-cover"
            priority
            quality={95}
            sizes="100vw"
          />
        </section>
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <CheckCircle
                className="text-brand-green-600 mx-auto mb-4"
                size={64}
              />
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Application Submitted!
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                Our team will review your application and contact you within 2-3
                business days.
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-8 py-3 bg-brand-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
              >
                Return to Home
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden bg-white">
        <Image
          src="/images/efh/hero/hero-main.jpg"
          alt="Become a program holder"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="text-blue-700" size={40} />
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Become a Program Holder
            </h1>
          </div>
          <p className="text-base md:text-lg text-slate-700">
            Partner with Elevate for Humanity to deliver free workforce training
            to your community.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-600" size={20} />
                <p className="text-red-800 font-semibold">Error</p>
              </div>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Organization Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Organization Type *
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {organizationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Program Interest
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Programs Interested In *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {programOptions.map((program) => (
                      <label
                        key={program}
                        className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.programsInterested.includes(
                            program
                          )}
                          onChange={() => handleProgramToggle(program)}
                          className="w-5 h-5 text-blue-700 border-slate-300 rounded"
                        />
                        <span className="text-slate-700">{program}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estimated Students Per Year
                  </label>
                  <input
                    type="number"
                    name="estimatedStudents"
                    value={formData.estimatedStudents}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={
                  submitting || formData.programsInterested.length === 0
                }
                className="flex-1 px-8 py-4 bg-brand-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-lg"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-300 rounded-lg font-semibold hover:bg-slate-50 text-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16    text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg mb-8 text-blue-100">
              Take the first step toward a better career today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
