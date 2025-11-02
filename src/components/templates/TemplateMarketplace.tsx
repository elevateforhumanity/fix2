import React, { useState } from 'react';

interface Template {
  id: string;
  name: string;
  category: 'trade' | 'healthcare' | 'tech' | 'business' | 'government';
  description: string;
  preview: string;
  programs: string[];
  courses: number;
  pages: string[];
  featured: boolean;
}

const templates: Template[] = [
  {
    id: 'trade-school',
    name: 'Trade School Template',
    category: 'trade',
    description: 'Perfect for barber schools, HVAC training, and electrical programs',
    preview: '🔧',
    programs: ['Barber', 'HVAC', 'Electrician'],
    courses: 15,
    pages: ['Home', 'Programs', 'Enrollment', 'Contact'],
    featured: true,
  },
  {
    id: 'healthcare',
    name: 'Healthcare Template',
    category: 'healthcare',
    description: 'Designed for CNA, Medical Assistant, and Phlebotomy programs',
    preview: '🏥',
    programs: ['CNA', 'Medical Assistant', 'Phlebotomy'],
    courses: 12,
    pages: ['Home', 'Programs', 'Certifications', 'Apply'],
    featured: true,
  },
  {
    id: 'technology',
    name: 'Technology Bootcamp',
    category: 'tech',
    description: 'Modern template for coding bootcamps and tech training',
    preview: '💻',
    programs: ['Web Development', 'Cybersecurity', 'Data Science'],
    courses: 18,
    pages: ['Home', 'Bootcamps', 'Career Services', 'Apply'],
    featured: true,
  },
  {
    id: 'business',
    name: 'Business School',
    category: 'business',
    description: 'Professional template for business and entrepreneurship programs',
    preview: '💼',
    programs: ['Entrepreneurship', 'Marketing', 'Management'],
    courses: 10,
    pages: ['Home', 'Programs', 'Success Stories', 'Enroll'],
    featured: false,
  },
  {
    id: 'government',
    name: 'Government/WIOA',
    category: 'government',
    description: 'Compliance-focused template for government-funded programs',
    preview: '🏛️',
    programs: ['Apprenticeships', 'Job Training', 'Upskilling'],
    courses: 8,
    pages: ['Home', 'Programs', 'Eligibility', 'Apply'],
    featured: false,
  },
];

const categories = [
  { value: 'all', label: 'All Templates', icon: '📚' },
  { value: 'trade', label: 'Trade Skills', icon: '🔧' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'tech', label: 'Technology', icon: '💻' },
  { value: 'business', label: 'Business', icon: '💼' },
  { value: 'government', label: 'Government', icon: '🏛️' },
];

export const TemplateMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);

  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const handleInstall = async (template: Template) => {
    setIsInstalling(true);
    try {
      // Simulate installation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Template "${template.name}" installed successfully!`);
      setSelectedTemplate(null);
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Template Marketplace</h1>
          <p className="text-gray-600">
            Choose a professional template to get started in minutes
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
              onClick={() => setSelectedTemplate(template)}
            >
              {/* Preview */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <div className="text-8xl">{template.preview}</div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                  {template.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">📚 Programs:</span>
                    <span>{template.programs.length}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">📖 Courses:</span>
                    <span>{template.courses}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">📄 Pages:</span>
                    <span>{template.pages.length}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTemplate(template);
                  }}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600">No templates found in this category</p>
          </div>
        )}
      </div>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Preview */}
              <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mb-6">
                <div className="text-9xl">{selectedTemplate.preview}</div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-600">{selectedTemplate.description}</p>
              </div>

              {/* Included Programs */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Included Programs</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedTemplate.programs.map((program, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg text-center">
                      <div className="font-medium text-blue-900">{program}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Pages */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Included Pages</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedTemplate.pages.map((page, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="text-sm font-medium text-gray-700">{page}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">What's Included</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✅</span>
                    {selectedTemplate.programs.length} pre-configured programs
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✅</span>
                    {selectedTemplate.courses} sample courses with lessons
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✅</span>
                    {selectedTemplate.pages.length} professionally designed pages
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✅</span>
                    Branded color scheme and styling
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✅</span>
                    Sample content and images
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2">✅</span>
                    Mobile-responsive design
                  </li>
                </ul>
              </div>

              {/* Install Button */}
              <button
                onClick={() => handleInstall(selectedTemplate)}
                disabled={isInstalling}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
              >
                {isInstalling ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⏳</span>
                    Installing...
                  </span>
                ) : (
                  '🚀 Install This Template'
                )}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Installation takes about 30 seconds. You can customize everything after installation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateMarketplace;
