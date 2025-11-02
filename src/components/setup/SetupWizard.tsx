import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WizardStep {
  id: string;
  title: string;
  description: string;
}

interface SetupData {
  organizationName: string;
  trainingType: string;
  programCount: string;
  targetAudience: string[];
  logo?: File;
  primaryColor?: string;
}

const steps: WizardStep[] = [
  {
    id: 'organization',
    title: 'Organization Info',
    description: 'Tell us about your organization',
  },
  {
    id: 'programs',
    title: 'Program Selection',
    description: 'What type of training do you provide?',
  },
  {
    id: 'audience',
    title: 'Target Audience',
    description: 'Who are you training?',
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'Customize your look',
  },
  {
    id: 'review',
    title: 'Review & Launch',
    description: 'Review and launch your platform',
  },
];

const trainingTypes = [
  {
    value: 'trade',
    label: 'Trade Skills',
    icon: '🔧',
    programs: ['Barber', 'HVAC', 'Electrician'],
  },
  {
    value: 'healthcare',
    label: 'Healthcare',
    icon: '🏥',
    programs: ['CNA', 'Medical Assistant', 'Phlebotomy'],
  },
  {
    value: 'technology',
    label: 'Technology',
    icon: '💻',
    programs: ['Web Development', 'Cybersecurity', 'Data Science'],
  },
  {
    value: 'business',
    label: 'Business',
    icon: '💼',
    programs: ['Entrepreneurship', 'Marketing', 'Management'],
  },
  {
    value: 'government',
    label: 'Government/WIOA',
    icon: '🏛️',
    programs: ['Apprenticeships', 'Job Training', 'Upskilling'],
  },
];

const audienceOptions = [
  { value: 'youth', label: 'Youth (16-24)' },
  { value: 'adults', label: 'Adults (25-54)' },
  { value: 'veterans', label: 'Veterans' },
  { value: 'justice', label: 'Justice-involved individuals' },
  { value: 'all', label: 'All of the above' },
];

export const SetupWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [setupData, setSetupData] = useState<SetupData>({
    organizationName: '',
    trainingType: '',
    programCount: '1-3',
    targetAudience: [],
  });

  const updateData = (field: keyof SetupData, value: any) => {
    setSetupData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsGenerating(true);
    try {
      // Generate organization setup
      await generateOrganization(setupData);

      // Redirect to dashboard
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Setup failed:', error);
      setIsGenerating(false);
    }
  };

  const generateOrganization = async (data: SetupData) => {
    // This will be implemented with actual API calls
    // For now, just simulate the process
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'organization':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name *
              </label>
              <input
                type="text"
                value={setupData.organizationName}
                onChange={(e) => updateData('organizationName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Elevate Career Institute"
                required
              />
            </div>
          </div>
        );

      case 'programs':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What type of training do you provide? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainingTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateData('trainingType', type.value)}
                    className={`p-6 border-2 rounded-lg text-left transition-all ${
                      setupData.trainingType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{type.icon}</div>
                    <div className="font-semibold text-lg mb-1">
                      {type.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {type.programs.join(', ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many programs will you offer?
              </label>
              <select
                value={setupData.programCount}
                onChange={(e) => updateData('programCount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="1-3">1-3 programs</option>
                <option value="4-10">4-10 programs</option>
                <option value="10+">10+ programs</option>
              </select>
            </div>
          </div>
        );

      case 'audience':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Who is your target audience? (Select all that apply)
              </label>
              <div className="space-y-3">
                {audienceOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={setupData.targetAudience.includes(option.value)}
                      onChange={(e) => {
                        const newAudience = e.target.checked
                          ? [...setupData.targetAudience, option.value]
                          : setupData.targetAudience.filter(
                              (a) => a !== option.value
                            );
                        updateData('targetAudience', newAudience);
                      }}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Your Logo (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateData('logo', e.target.files?.[0])}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📁</div>
                  <div className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color (Optional)
              </label>
              <input
                type="color"
                value={setupData.primaryColor || '#3B82F6'}
                onChange={(e) => updateData('primaryColor', e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-2">
                We'll auto-detect colors from your logo if uploaded
              </p>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Setup Summary</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-600">Organization</dt>
                  <dd className="font-medium">{setupData.organizationName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Training Type</dt>
                  <dd className="font-medium">
                    {
                      trainingTypes.find(
                        (t) => t.value === setupData.trainingType
                      )?.label
                    }
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Program Count</dt>
                  <dd className="font-medium">
                    {setupData.programCount} programs
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Target Audience</dt>
                  <dd className="font-medium">
                    {setupData.targetAudience
                      .map(
                        (a) => audienceOptions.find((o) => o.value === a)?.label
                      )
                      .join(', ')}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold mb-2">What we'll create for you:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✅ Organization profile and settings</li>
                <li>✅ 3 sample programs with courses</li>
                <li>✅ 15 sample lessons with content</li>
                <li>✅ Branded pages and templates</li>
                <li>✅ Demo students and instructors</li>
                <li>✅ Sample certificates</li>
              </ul>
            </div>
            {isGenerating && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                <p className="mt-4 text-gray-600">
                  Generating your platform...
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case 'organization':
        return setupData.organizationName.trim().length > 0;
      case 'programs':
        return setupData.trainingType.length > 0;
      case 'audience':
        return setupData.targetAudience.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 ${index !== steps.length - 1 ? 'mr-2' : ''}`}
              >
                <div
                  className={`h-2 rounded-full transition-all ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
        </div>
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>
          {renderStepContent()}
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleComplete}
                disabled={!canProceed() || isGenerating}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {isGenerating ? 'Generating...' : 'Launch Platform'}
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Continue
              </button>
            )}
          </div>
        </div>
        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Need help?{' '}
          <a href="/support" className="text-blue-600 hover:underline">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
