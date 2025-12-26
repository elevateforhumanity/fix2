import VolunteerApplicationForm from '@/components/vita/VolunteerApplicationForm';

export const metadata = {
  title: 'VITA Volunteer Portal | RISE Foundation',
  description: 'Apply to become a VITA volunteer tax preparer',
};

export default function VolunteerPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Become a VITA Volunteer</h1>
        <p className="text-lg text-gray-600 mb-8">
          Help your community by providing free tax preparation services.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <VolunteerApplicationForm />
        </div>
      </div>
    </div>
  );
}
