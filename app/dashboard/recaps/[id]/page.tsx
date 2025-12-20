import RecapDetail from '@/components/recaps/RecapDetail';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

export const dynamic = 'force-dynamic';

export default function RecapDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <RecapDetail recapId={params.id} />
    </div>
  );
}
