import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

type Params = Promise<{ code: string }>;

export default async function ProgramPage({ params }: { params: Params }) {
  const { code } = await params;
  
  // Redirect to dashboard (default view)
  redirect(`/admin/programs/${code}/dashboard`);
}
