import VirtualCareerFair from '@/components/VirtualCareerFair';

export const metadata = {
  title: 'Virtual Career Fair | Elevate for Humanity',
  description: 'Connect with employers and explore job opportunities',
  openGraph: {
    images: ["/images/students-new/student-24.jpg"],
    type: "website",
  }};

export default function CareerFairPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Virtual Career Fair</h1>
          <p className="mt-2 text-gray-600">
            Connect with employers and explore job opportunities
          </p>
        </div>
        
        <VirtualCareerFair />
      </div>
    </div>
  );
}
