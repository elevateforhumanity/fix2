import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import TrainingChecklist from './TrainingChecklist';

export const metadata = {
  title: 'Staff Training | Elevate for Humanity',
};

async function getTrainingProgress(userId: string) {
  const supabase = await createClient();
  
  const { data } = await supabase
    .from('staff_training_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  return data || {
    onboarding_complete: false,
    orientation_watched: false,
    policies_reviewed: false,
    system_access: false,
    shadowing_complete: false,
    compliance_training: false,
    customer_service: false,
    software_training: false,
    emergency_procedures: false,
  };
}

export default async function StaffTrainingPage() {
  const { user } = await requireRole(['staff', 'admin', 'super_admin']);
  const progress = await getTrainingProgress(user.id);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Staff Training Portal</h1>
        
        <TrainingChecklist userId={user.id} initialProgress={progress} />
      </div>
    </div>
  );
}
