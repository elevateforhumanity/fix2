import ProgramCard from '../components/ProgramCard';
import { programs } from '../data/programs';

export default function ProgramsPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Career Programs
        </h1>
        <p className="mt-2 text-slate-600">
          State-funded pathways with real employer partners and paid on-the-job
          training.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <ProgramCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
