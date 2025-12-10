/**
 * Admin Enrollment Detail Page
 * 
 * Shows complete enrollment details with:
 * - Student info
 * - Program & funding details
 * - Transfer hours (approve/reject)
 * - Module progress
 * - Hours summary
 * - Funding amount editor
 */

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import TransferHoursApproval from '@/components/admin/TransferHoursApproval';
import FundingAmountEditor from '@/components/admin/FundingAmountEditor';
import ModuleProgressList from '@/components/admin/ModuleProgressList';
import HoursSummaryWidget from '@/components/admin/HoursSummaryWidget';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EnrollmentDetailPage({ params }: PageProps) {
  const supabase = createClient();

  // Fetch complete enrollment details
  const { data: enrollment, error } = await supabase
    .from('student_enrollments')
    .select(`
      *,
      student:students(*),
      program:programs(*),
      funding_program:funding_programs(*),
      transfer_hours(
        *,
        order: created_at.desc
      ),
      module_progress:enrollment_module_progress(
        *,
        module:course_modules(
          *,
          scorm_packages(*)
        ),
        order: module.order_index
      ),
      apprenticeship:apprenticeship_enrollments(*)
    `)
    .eq('id', params.id)
    .single();

  if (error || !enrollment) {
    notFound();
  }

  // Calculate transfer hours summary
  const approvedTransfers = enrollment.transfer_hours?.filter(
    (t: Record<string, unknown>) => t.status === 'approved'
  ) || [];

  const totalTransferred = {
    theory: approvedTransfers.reduce((sum: number, t: Record<string, unknown>) => 
      sum + (t.hours_theory_accepted || 0), 0
    ),
    practical: approvedTransfers.reduce((sum: number, t: Record<string, unknown>) => 
      sum + (t.hours_practical_accepted || 0), 0
    ),
    other: approvedTransfers.reduce((sum: number, t: Record<string, unknown>) => 
      sum + (t.hours_other_accepted || 0), 0
    )
  };

  const totalTransferredHours = 
    totalTransferred.theory + 
    totalTransferred.practical + 
    totalTransferred.other;

  // Calculate earned hours from module progress
  const completedModules = enrollment.module_progress?.filter(
    (mp: Record<string, unknown>) => mp.status === 'completed'
  ) || [];

  const totalEarnedHours = completedModules.reduce(
    (sum: number, mp: { module?: { required_hours?: number } }) => sum + (mp.module?.required_hours || 0),
    0
  );

  // Get total required hours from program modules
  const totalRequiredHours = enrollment.module_progress?.reduce(
    (sum: number, mp: { module?: { required_hours?: number } }) => sum + (mp.module?.required_hours || 0),
    0
  ) || 0;

  const remainingHours = totalRequiredHours - totalTransferredHours - totalEarnedHours;
  const progressPercent = totalRequiredHours > 0
    ? ((totalTransferredHours + totalEarnedHours) / totalRequiredHours) * 100
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="glow-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {enrollment.student?.first_name} {enrollment.student?.last_name}
              </h1>
              <p className="text-slate-300 mt-1">{enrollment.student?.email}</p>
              <div className="mt-4 flex gap-3">
                <span className="badge badge-primary">
                  {enrollment.program?.name}
                </span>
                <span className={`badge ${
                  enrollment.status === 'active' ? 'badge-success' : 'badge-warning'
                }`}>
                  {enrollment.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Enrollment ID</div>
              <div className="text-xs text-slate-500 font-mono">{enrollment.id}</div>
              <div className="text-sm text-slate-400 mt-2">Started</div>
              <div className="text-white">
                {new Date(enrollment.start_date || enrollment.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Hours Summary Widget */}
        <HoursSummaryWidget
          required={totalRequiredHours}
          transferred={totalTransferredHours}
          earned={totalEarnedHours}
          remaining={remainingHours}
          progressPercent={progressPercent}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column */}
          <div className="space-y-8">
            
            {/* Funding Details */}
            <div className="glow-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Funding Details
              </h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Funding Source</span>
                  <span className="text-white font-medium">
                    {enrollment.funding_program?.name}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-400">Funding Code</span>
                  <span className="text-white font-mono">
                    {enrollment.funding_program?.code}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Employer of Record</span>
                  <span className="text-white">
                    {enrollment.employer_of_record || 'Elevate For Humanity'}
                  </span>
                </div>

                {enrollment.external_case_id && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Case ID</span>
                    <span className="text-white font-mono">
                      {enrollment.external_case_id}
                    </span>
                  </div>
                )}

                <div className="border-t border-slate-700 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hourly Wage</span>
                    <span className="text-white">
                      {enrollment.wage_rate_hour 
                        ? `$${enrollment.wage_rate_hour.toFixed(2)}/hr`
                        : 'Not set'
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-slate-400">Stipend Amount</span>
                    <span className="text-white">
                      {enrollment.stipend_total_amount
                        ? `$${enrollment.stipend_total_amount.toFixed(2)}`
                        : 'Not set'
                      }
                    </span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-slate-400">Tuition Coverage</span>
                    <span className="text-white">
                      {enrollment.tuition_covered_amount
                        ? `$${enrollment.tuition_covered_amount.toFixed(2)}`
                        : 'Not set'
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <FundingAmountEditor enrollmentId={enrollment.id} />
              </div>
            </div>

            {/* Transfer Hours */}
            <div className="glow-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Transfer Hours
              </h2>

              {enrollment.transfer_hours && enrollment.transfer_hours.length > 0 ? (
                <TransferHoursApproval 
                  transferHours={enrollment.transfer_hours}
                  enrollmentId={enrollment.id}
                />
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <p>No transfer hours submitted</p>
                  <button className="glow-btn-secondary mt-4">
                    Add Transfer Hours
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Module Progress */}
            <div className="glow-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Module Progress
              </h2>

              <ModuleProgressList 
                moduleProgress={enrollment.module_progress || []}
                enrollmentId={enrollment.id}
              />
            </div>

            {/* Apprenticeship Details (if applicable) */}
            {enrollment.apprenticeship && enrollment.apprenticeship.length > 0 && (
              <div className="glow-card p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Apprenticeship Details
                </h2>

                {enrollment.apprenticeship.map((app: Record<string, unknown>) => (
                  <div key={app.id} className="space-y-3 text-sm">
                    {app.rapids_participant_id && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">RAPIDS ID</span>
                        <span className="text-white font-mono">
                          {app.rapids_participant_id}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-slate-400">RI Hours (Classroom)</span>
                      <span className="text-white">
                        {app.related_instruction_hours || 0} hrs
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">OJT Hours (Shop)</span>
                      <span className="text-white">
                        {app.on_the_job_hours || 0} hrs
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Transferred RI</span>
                      <span className="text-blue-400">
                        {app.transferred_related_instruction_hours || 0} hrs
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Transferred OJT</span>
                      <span className="text-blue-400">
                        {app.transferred_ojt_hours || 0} hrs
                      </span>
                    </div>

                    <div className="border-t border-slate-700 pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-300">Total Hours</span>
                        <span className="text-white">
                          {(app.related_instruction_hours || 0) + 
                           (app.on_the_job_hours || 0) +
                           (app.transferred_related_instruction_hours || 0) +
                           (app.transferred_ojt_hours || 0)} hrs
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
