import Link from "next/link";

const nav = [
  { href: "/programs", label: "Programs" },
  { href: "/funding", label: "Funding" },
  { href: "/platform", label: "Platform" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="font-black text-zinc-900 tracking-tight">
          Elevate for Humanity
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} className="font-bold text-zinc-800 hover:text-zinc-950 transition">
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/platform/licensing"
            className="hidden sm:inline-flex rounded-xl border border-zinc-300 bg-white px-4 py-2 font-extrabold hover:bg-zinc-50 transition"
          >
            License
          </Link>
          <Link
            href="/apply"
            className="inline-flex rounded-xl bg-zinc-900 text-white px-4 py-2 font-extrabold hover:bg-zinc-800 transition"
          >
            Apply
          </Link>
        </div>
      </div>
    </header>
  );
}
