import WorkOneChecklist from '@/components/workone/WorkOneChecklist';

export const dynamic = 'force-dynamic';

export default function ProgressPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          WorkOne Progress Checklist
        </h1>
        <p className="text-sm text-neutral-600">
          This tracks your steps from inquiry → WorkOne appointment → funding
          pathway → enrollment.
        </p>
      </div>
      <WorkOneChecklist />
    </div>
  );
}
