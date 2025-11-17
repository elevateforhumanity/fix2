"use client";
import Link from "next/link";

export default function SchoolOnboarding() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/onboarding" className="text-orange-400 hover:text-orange-300 text-sm">← Back</Link>
          <h1 className="mt-4 text-2xl font-bold">Training Provider / School Onboarding</h1>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <form onSubmit={(e) => { e.preventDefault(); alert("Submitted!"); }} className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 space-y-4">
            <div><label className="block text-sm font-semibold mb-2">Organization Name *</label><input type="text" required className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white" /></div>
            <div><label className="block text-sm font-semibold mb-2">Address *</label><input type="text" required className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white" /></div>
            <div><label className="block text-sm font-semibold mb-2">Site Manager *</label><input type="text" required className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white" /></div>
            <div><label className="block text-sm font-semibold mb-2">Hours of Operation *</label><input type="text" required className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white" /></div>
            <div><label className="block text-sm font-semibold mb-2">Maximum Student Capacity</label><input type="number" className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white" /></div>
          </div>
          <div className="rounded-2xl border border-orange-400/40 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Policies</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3"><input type="checkbox" required className="mt-1 w-4 h-4" /><span className="text-sm">Provide safe environment</span></label>
              <label className="flex items-start gap-3"><input type="checkbox" required className="mt-1 w-4 h-4" /><span className="text-sm">Allow Elevate check-ins</span></label>
              <label className="flex items-start gap-3"><input type="checkbox" required className="mt-1 w-4 h-4" /><span className="text-sm">Notify Elevate of issues</span></label>
            </div>
            <div className="mt-6"><label className="block text-sm font-semibold mb-2">Signature *</label><input type="text" required placeholder="Type your full name" className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white" /></div>
          </div>
          <button type="submit" className="w-full rounded-full bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-400">Submit</button>
        </form>
      </section>
    </main>
  );
}
