/**
 * Module Player Page
 * 
 * Handles different module types:
 * - SCORM packages (launches SCORM player)
 * - External partner links (Milady, etc.)
 * - Internal content
 * - JRI badges
 */

import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import ScormPlayer from '@/components/student/ScormPlayer';
import ExternalModuleLauncher from '@/components/student/ExternalModuleLauncher';

interface PageProps {
  params: {
    slug: string;
    moduleId: string;
  };
}

export default async function ModulePlayerPage({ params }: PageProps) {
  const supabase = createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Get student record
  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();

  if (!student) {
    redirect('/student/setup');
  }

  // Get module details
  const { data: module, error: moduleError } = await supabase
    .from('course_modules')
    .select(`
      *,
      program:programs(*),
      scorm_packages(*)
    `)
    .eq('id', params.moduleId)
    .single();

  if (moduleError || !module) {
    notFound();
  }

  // Verify student is enrolled in this program
  const { data: enrollment } = await supabase
    .from('student_enrollments')
    .select('id, status')
    .eq('student_id', student.id)
    .eq('program_id', module.program_id)
    .eq('status', 'active')
    .single();

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Access Denied
          </h1>
          <p className="text-slate-600 mb-6">
            You must be enrolled in {module.program?.name} to access this module.
          </p>
          <Link href="/programs" className="glow-btn">
            Browse Programs
          </Link>
        </div>
      </div>
    );
  }

  // Get or create module progress
  let { data: progress } = await supabase
    .from('enrollment_module_progress')
    .select('*')
    .eq('enrollment_id', enrollment.id)
    .eq('module_id', params.moduleId)
    .single();

  if (!progress) {
    // Create progress record
    const { data: newProgress } = await supabase
      .from('enrollment_module_progress')
      .insert({
        enrollment_id: enrollment.id,
        module_id: params.moduleId,
        status: 'in_progress'
      })
      .select()
      .single();
    
    progress = newProgress;
  } else if (progress.status === 'not_started') {
    // Update to in_progress
    await supabase
      .from('enrollment_module_progress')
      .update({ 
        status: 'in_progress',
        last_accessed_at: new Date().toISOString()
      })
      .eq('id', progress.id);
  } else {
    // Just update last_accessed_at
    await supabase
      .from('enrollment_module_progress')
      .update({ last_accessed_at: new Date().toISOString() })
      .eq('id', progress.id);
  }

  return (
    <div className="min-h-screen bg-slate-900">
      
      {/* Module Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href={`/student/programs/${params.slug}`}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ← Back to Program
              </Link>
              <div className="h-6 w-px bg-slate-700" />
              <div>
                <h1 className="text-lg font-semibold text-white">
                  {module.title}
                </h1>
                <p className="text-sm text-slate-400">
                  {module.program?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {module.required_hours && (
                <span className="text-sm text-slate-400">
                  {module.required_hours} hours
                </span>
              )}
              <span className={`badge ${
                progress?.status === 'completed' ? 'badge-success' :
                progress?.status === 'in_progress' ? 'badge-primary' :
                'badge-warning'
              }`}>
                {progress?.status || 'not_started'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* SCORM Module */}
        {module.content_type === 'scorm' && module.scorm_packages && module.scorm_packages.length > 0 && (
          <ScormPlayer
            scormPackage={module.scorm_packages[0]}
            moduleId={module.id}
            enrollmentId={enrollment.id}
            progressId={progress?.id}
          />
        )}

        {/* External Partner Module */}
        {module.content_type === 'external_link' && module.external_url && (
          <ExternalModuleLauncher
            module={module}
            enrollmentId={enrollment.id}
            progressId={progress?.id}
          />
        )}

        {/* JRI Badge Module */}
        {module.content_type === 'jri_badge_set' && (
          <div className="glow-card p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Job Ready Indy Badges
            </h2>
            <p className="text-slate-300 mb-6">
              Complete all 6 Job Ready Indy badges to build your employability skills.
            </p>
            {module.external_url ? (
              <a 
                href={module.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn inline-block"
              >
                Launch JRI Platform →
              </a>
            ) : module.scorm_packages && module.scorm_packages.length > 0 ? (
              <ScormPlayer
                scormPackage={module.scorm_packages[0]}
                moduleId={module.id}
                enrollmentId={enrollment.id}
                progressId={progress?.id}
              />
            ) : (
              <p className="text-slate-400">JRI content not yet configured</p>
            )}
          </div>
        )}

        {/* Other Module Types */}
        {module.content_type === 'other' && (
          <div className="glow-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {module.title}
            </h2>
            <div className="text-slate-300 mb-6">
              {module.description}
            </div>
            {module.implementation_notes && (
              <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-slate-400">
                {module.implementation_notes}
              </div>
            )}
            <div className="mt-6">
              <p className="text-slate-400 text-sm">
                This module requires in-person or shop-based training. 
                Contact your instructor for details.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
