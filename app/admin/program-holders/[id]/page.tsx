import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

type Params = Promise<{ id: string }>;

export default async function ProgramHolderPage({ params }: { params: Params }) {
  const { id } = await params;
  
  // Redirect to countersign-mou (default view)
  redirect(`/admin/program-holders/${id}/countersign-mou`);
}
