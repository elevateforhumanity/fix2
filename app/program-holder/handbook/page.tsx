import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AcknowledgeHandbookForm } from './AcknowledgeHandbookForm';
import { BookOpen, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employee Handbook | Elevate For Humanity',
  description: 'Program Holder Employee Handbook - Required Reading',
};

export default async function ProgramHolderHandbookPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if already acknowledged
  const { data: acknowledgement } = await supabase
    .from('program_holder_acknowledgements')
    .select('*')
    .eq('user_id', user.id)
    .eq('document_type', 'handbook')
    .single();

  if (acknowledgement) {
    redirect('/program-holder/dashboard?handbook=acknowledged');
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <BookOpen size={48} />
            <div>
              <h1 className="text-4xl font-bold">
                Program Holder Employee Handbook
              </h1>
              <p className="text-slate-300 mt-2">
                Required Reading - Please Review Carefully
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-slate max-w-none mb-12">
          <h2>Welcome to Elevate for Humanity</h2>
          <p>
            As a Program Holder partner, you play a critical role in delivering
            workforce development training to eligible participants. This
            handbook outlines your responsibilities, expectations, and the
            support available to you.
          </p>

          <h3>1. Program Holder Responsibilities</h3>
          <ul>
            <li>
              <strong>Student Enrollment:</strong> Enroll eligible students in
              approved training programs
            </li>
            <li>
              <strong>Progress Tracking:</strong> Monitor and report student
              progress through the platform
            </li>
            <li>
              <strong>Attendance Verification:</strong> Verify student
              attendance and participation
            </li>
            <li>
              <strong>Credential Issuance:</strong> Issue industry-recognized
              credentials upon completion
            </li>
            <li>
              <strong>Compliance Reporting:</strong> Submit required reports to
              funding agencies
            </li>
            <li>
              <strong>Quality Standards:</strong> Maintain high-quality training
              delivery
            </li>
          </ul>

          <h3>2. Student Management</h3>
          <p>
            You are responsible for managing all aspects of student enrollment,
            progress, and completion. This includes:
          </p>
          <ul>
            <li>Verifying student eligibility before enrollment</li>
            <li>Tracking attendance and participation</li>
            <li>Documenting student progress and achievements</li>
            <li>Reporting any issues or concerns immediately</li>
            <li>Ensuring students receive proper support services</li>
          </ul>

          <h3>3. Compliance Requirements</h3>
          <p>
            As a WIOA-funded program partner, you must comply with all federal,
            state, and local regulations:
          </p>
          <ul>
            <li>
              <strong>WIOA Compliance:</strong> Follow all Workforce Innovation
              and Opportunity Act requirements
            </li>
            <li>
              <strong>Data Privacy:</strong> Protect student personally
              identifiable information (PII)
            </li>
            <li>
              <strong>Equal Opportunity:</strong> Provide equal access to all
              eligible participants
            </li>
            <li>
              <strong>Non-Discrimination:</strong> Comply with all civil rights
              laws
            </li>
            <li>
              <strong>Reporting:</strong> Submit accurate and timely reports
            </li>
          </ul>

          <h3>4. Financial Responsibilities</h3>
          <p>Program Holders receive payment based on student outcomes:</p>
          <ul>
            <li>
              Payment is contingent on student completion and credential
              attainment
            </li>
            <li>Invoices must be submitted with proper documentation</li>
            <li>All expenditures must be allowable under WIOA guidelines</li>
            <li>Financial records must be maintained for audit purposes</li>
          </ul>

          <h3>5. Quality Assurance</h3>
          <p>
            Elevate for Humanity maintains high standards for all training
            programs:
          </p>
          <ul>
            <li>Instructors must be qualified and credentialed</li>
            <li>Curriculum must be industry-aligned and up-to-date</li>
            <li>Facilities must meet safety and accessibility standards</li>
            <li>Equipment must be current and properly maintained</li>
            <li>Student satisfaction must be monitored and addressed</li>
          </ul>

          <h3>6. Support Services</h3>
          <p>Elevate for Humanity provides support to Program Holders:</p>
          <ul>
            <li>Technical assistance with platform usage</li>
            <li>Compliance guidance and training</li>
            <li>Marketing and recruitment support</li>
            <li>Student support services coordination</li>
            <li>Regular check-ins and performance reviews</li>
          </ul>

          <h3>7. Termination and Suspension</h3>
          <p>Program Holder agreements may be terminated or suspended for:</p>
          <ul>
            <li>Non-compliance with WIOA regulations</li>
            <li>Failure to meet quality standards</li>
            <li>Misuse of funds</li>
            <li>Failure to submit required reports</li>
            <li>Violation of student rights</li>
            <li>Breach of MOU terms</li>
          </ul>

          <h3>8. Contact Information</h3>
          <p>For questions or support:</p>
          <ul>
            <li>
              <strong>Email:</strong> elevate4humanityedu@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> (317) 314-3757
            </li>
            <li>
              <strong>Platform Support:</strong> Available through dashboard
            </li>
          </ul>

          <h3>9. Acknowledgement</h3>
          <p>
            By acknowledging this handbook, you confirm that you have read,
            understood, and agree to comply with all policies and procedures
            outlined above. You understand that failure to comply may result in
            termination of your Program Holder agreement.
          </p>
        </div>

        {/* Acknowledgement Form */}
        <div className="bg-slate-50 rounded-xl p-8 border-2 border-slate-200">
          <div className="flex items-start gap-4 mb-6">
            <CheckCircle className="text-green-600 flex-shrink-0" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Acknowledgement Required
              </h3>
              <p className="text-slate-700">
                Please confirm that you have read and understood the Employee
                Handbook.
              </p>
            </div>
          </div>
          <AcknowledgeHandbookForm />
        </div>
      </div>
    </div>
  );
}
