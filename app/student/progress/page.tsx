import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  Download,
  Award,
} from 'lucide-react';

export const metadata = {
  robots: { index: false, follow: false },
  title: 'My Progress | Student Portal',
};

export default async function StudentProgressPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/progress');
  }

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(
      `
      id,
      status,
      created_at,
      completed_at,
      program:programs(id, name, description),
      steps:enrollment_steps(
        id,
        sequence_order,
        status,
        started_at,
        completed_at,
        provider:partner_lms_providers(
          id,
          provider_name,
          logo_url
        )
      )
    `
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Training Progress
          </h1>
          <p className="text-gray-600">
            Track your progress through each training partner
          </p>
        </div>

        {!enrollments || enrollments.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Circle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Active Enrollments
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't been enrolled in any programs yet.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Browse Programs
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {enrollments.map((enrollment) => {
              const steps = enrollment.steps || [];
              const totalSteps = steps.length;
              const completedSteps = steps.filter(
                (s) => s.status === 'completed'
              ).length;
              const currentStep = steps.find((s) => s.status === 'in_progress');
              const progressPercent =
                totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
              const isComplete = enrollment.status === 'completed';

              return (
                <div
                  key={enrollment.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          {enrollment.program?.name || 'Program'}
                        </h2>
                        <p className="text-blue-100 text-sm">
                          {enrollment.program?.description}
                        </p>
                      </div>
                      {isComplete && (
                        <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-semibold">Completed</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Overall Progress
                        </span>
                        <span className="text-sm font-bold">
                          {completedSteps} / {totalSteps} Partners Complete
                        </span>
                      </div>
                      <div className="w-full bg-blue-900/30 rounded-full h-3">
                        <div
                          className="bg-white h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="p-6">
                    {totalSteps === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>Training steps are being configured...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {steps
                          .sort((a, b) => a.sequence_order - b.sequence_order)
                          .map((step, index) => {
                            const isCompleted = step.status === 'completed';
                            const isActive = step.status === 'in_progress';
                            const isPending = step.status === 'pending';
                            const provider = step.provider;

                            return (
                              <div
                                key={step.id}
                                className={`flex items-start gap-4 p-4 rounded-lg border-2 transition ${
                                  isActive
                                    ? 'border-blue-500 bg-blue-50'
                                    : isCompleted
                                      ? 'border-green-200 bg-green-50'
                                      : 'border-gray-200 bg-gray-50'
                                }`}
                              >
                                {/* Step Number & Status Icon */}
                                <div className="flex-shrink-0">
                                  {isCompleted ? (
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                      <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                  ) : isActive ? (
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                      {index + 1}
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                      {index + 1}
                                    </div>
                                  )}
                                </div>

                                {/* Partner Info */}
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    {provider?.logo_url && (
                                      <img
                                        src={provider.logo_url}
                                        alt={provider.provider_name}
                                        className="w-8 h-8 object-contain"
                                      />
                                    )}
                                    <h3 className="font-semibold text-gray-900">
                                      {provider?.provider_name ||
                                        'Training Partner'}
                                    </h3>
                                  </div>

                                  <div className="flex items-center gap-4 text-sm">
                                    {isCompleted && step.completed_at && (
                                      <span className="text-green-700 font-medium">
                                        ✓ Completed{' '}
                                        {new Date(
                                          step.completed_at
                                        ).toLocaleDateString()}
                                      </span>
                                    )}
                                    {isActive && step.started_at && (
                                      <span className="text-blue-700 font-medium">
                                        Started{' '}
                                        {new Date(
                                          step.started_at
                                        ).toLocaleDateString()}
                                      </span>
                                    )}
                                    {isPending && (
                                      <span className="text-gray-500">
                                        Waiting for previous step
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Action Button */}
                                {isActive && (
                                  <Link
                                    href={`/student/courses?provider=${provider?.id}`}
                                    className="flex-shrink-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                                  >
                                    Launch Training
                                    <ExternalLink className="w-4 h-4" />
                                  </Link>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    )}

                    {/* Certificate Download */}
                    {isComplete && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Award className="w-8 h-8 text-green-600" />
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                Certificate Available
                              </h4>
                              <p className="text-sm text-gray-600">
                                You've completed all training partners!
                              </p>
                            </div>
                          </div>
                          <Link
                            href={`/student/certificates?enrollment=${enrollment.id}`}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
