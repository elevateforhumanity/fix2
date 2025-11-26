import GrantScholarshipApplication from '@/components/GrantScholarshipApplication';

export const metadata = {
  title: 'Apply for Financial Aid | Elevate for Humanity',
  description: 'Apply for WIOA, WRG, JRI funding and scholarships',
  openGraph: {
    images: ["/images/students-new/student-6.jpg"],
    type: "website",
  }};

export default function FinancialAidApplicationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Apply for Financial Aid</h1>
          <p className="mt-2 text-gray-600">
            Apply for WIOA, WRG, JRI funding or scholarships - 100% free training
          </p>
        </div>
        
        <GrantScholarshipApplication />
      </div>
    </div>
  );
}
