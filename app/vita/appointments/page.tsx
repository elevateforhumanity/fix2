import AppointmentScheduler from '@/components/tax/AppointmentScheduler';

export const metadata = {
  title: 'Book VITA Appointment | Free Tax Prep',
  description: 'Schedule your free tax preparation appointment with RISE Foundation VITA',
};

export default function VITAAppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Book Your Free Tax Prep Appointment</h1>
        <p className="text-lg text-gray-600 mb-8">
          Schedule a time to get your taxes prepared for free by IRS-certified volunteers.
        </p>
        <AppointmentScheduler />
      </div>
    </div>
  );
}
