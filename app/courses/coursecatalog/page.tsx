import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coursecatalog | Elevate For Humanity',
  description: 'Learn more about Coursecatalog inside the Elevate For Humanity workforce ecosystem.',
};

export default function CoursecatalogPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Coursecatalog | Elevate For Humanity
        </h1>
        <p className="text-gray-600 mb-8">
          Learn more about Coursecatalog inside the Elevate For Humanity workforce ecosystem.
        </p>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <p className="text-gray-700">
            Content for this page is being developed. Check back soon for updates.
          </p>
        </div>
      </div>
    </div>
  );
}
