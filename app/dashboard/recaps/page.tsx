import RecapCreateForm from '@/components/recaps/RecapCreateForm';
import RecapList from '@/components/recaps/RecapList';


export const dynamic = 'force-dynamic';

export default function RecapsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Meeting Recaps</h1>
        <p className="text-sm text-neutral-600">
          Paste a transcript or notes and generate a clean "Read AI style" recap
          with action items.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <RecapCreateForm />
        </div>
        <div className="lg:col-span-3">
          <RecapList />
        </div>
      </div>
    </div>
  );
}
