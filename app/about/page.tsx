export const metadata = {
  title: "About Elevate For Humanity",
  description: "We connect people to training, funding, and careers—with real human support.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <p className="text-[11px] uppercase tracking-widest text-orange-700">
        ORIGINAL-SITE-EFH-ORIGINAL-2024 • Owner: Elizabeth L. Greene
      </p>
      <h1 className="mt-2 text-3xl font-extrabold">About Us</h1>
      <p className="mt-3 text-slate-700 max-w-3xl">
        Elevate For Humanity is a workforce development ecosystem that blends training providers, employers, and workforce
        boards. Our focus is simple: help real people step into real jobs—without the maze. We integrate WIOA/WRG funding,
        apprenticeships, case management, and an LMS built for adult learners.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { h: "Aligned Programs", p: "Designed with employers so credentials mean something on day one." },
          { h: "Funding First", p: "We connect learners to WIOA, WRG, and employer funding before tuition blocks them." },
          { h: "Human Support", p: "Coaches, case managers, and instructors who actually know your name." },
        ].map((c) => (
          <div key={c.h} className="rounded-2xl border border-slate-200 p-5">
            <div className="font-semibold">{c.h}</div>
            <div className="text-sm text-slate-700">{c.p}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
