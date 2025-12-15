import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/server';
import { LMSNavigation } from '@/components/lms/LMSNavigation';

export default async function LmsAppLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login?next=/lms/dashboard');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  return (
    <div className="min-h-screen bg-slate-50">
      <LMSNavigation user={data.user} profile={profile} />
      <main>{children}</main>
    </div>
  );
}
