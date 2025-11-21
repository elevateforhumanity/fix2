import { AutomatedEnrollmentWorkflow } from '@/components/AutomatedEnrollmentWorkflow';

export const metadata = {
  title: 'Apply for Training | Elevate for Humanity',
  description: 'Complete your application for WIOA, WRG, or JRI-funded training programs',
};

export default function ApplyWorkflowPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Apply for Free Training
          </h1>
          <p className="text-xl text-gray-600">
            Complete this application to get started with WIOA, WRG, or JRI-funded training
          </p>
        </div>
        
        <AutomatedEnrollmentWorkflow />
      </div>
    </div>
  );
}
