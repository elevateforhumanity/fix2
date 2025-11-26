import IndustryPartnershipPortal from '@/components/IndustryPartnershipPortal';

export const metadata = {
  title: 'Industry Partnership Portal | Elevate for Humanity',
  description: 'Partner with us to provide training and employment opportunities',
  openGraph: {
    images: ["/images/students-new/student-12.jpg"],
    type: "website",
  }};

export default function PartnerPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Industry Partnership Portal</h1>
          <p className="mt-2 text-gray-600">
            Partner with Elevate for Humanity to provide training sites and employment opportunities
          </p>
        </div>
        
        <IndustryPartnershipPortal />
      </div>
    </div>
  );
}
