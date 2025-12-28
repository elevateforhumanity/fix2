import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita/appointments',
  },
  title: 'Book VITA Appointment | Elevate For Humanity',
  description: 'Schedule your free tax preparation appointment.',
};

export default async function VITAAppointmentsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .gte('datetime', new Date().toISOString())
    .order('datetime', { ascending: true })
    .limit(20);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-zinc-900   text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Book Your Free Tax Appointment
          </h1>
          <p className="text-xl text-blue-100">
            Get help with your taxes from IRS-certified volunteers
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Available Time Slots
              </h2>

              {!appointments || appointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">
                    No appointments available at this time.
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    Please check back later or contact us.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold text-slate-900">
                              {new Date(apt.datetime).toLocaleDateString(
                                'en-US',
                                {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-600">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(apt.datetime).toLocaleTimeString(
                                'en-US',
                                {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                }
                              )}
                            </span>
                          </div>
                        </div>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                What to Bring
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Photo ID</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Social Security cards for all family members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>W-2 forms from all employers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>1099 forms (interest, dividends, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Bank account and routing numbers for direct deposit
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Need Help?
              </h3>
              <p className="text-blue-800 text-sm mb-4">
                Contact us if you have questions about your appointment.
              </p>
              <Link
                href="/contact"
                className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
