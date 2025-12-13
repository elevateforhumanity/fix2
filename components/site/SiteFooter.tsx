import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-black text-zinc-900">Elevate for Humanity</div>
          <p className="mt-2 text-sm text-zinc-600">
            Workforce training, funding pathways, and a licensable platform built for community impact.
          </p>
        </div>

        <div>
          <div className="font-extrabold text-zinc-900">Explore</div>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <Link href="/programs" className="text-zinc-700 hover:underline">Programs</Link>
            <Link href="/funding" className="text-zinc-700 hover:underline">Funding</Link>
            <Link href="/apply" className="text-zinc-700 hover:underline">Apply</Link>
          </div>
        </div>

        <div>
          <div className="font-extrabold text-zinc-900">Platform</div>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <Link href="/platform" className="text-zinc-700 hover:underline">Overview</Link>
            <Link href="/platform/apps" className="text-zinc-700 hover:underline">Apps</Link>
            <Link href="/platform/licensing" className="text-zinc-700 hover:underline">Licensing</Link>
            <Link href="/store" className="text-zinc-700 hover:underline">Store</Link>
          </div>
        </div>

        <div>
          <div className="font-extrabold text-zinc-900">Company</div>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <Link href="/about" className="text-zinc-700 hover:underline">About</Link>
            <Link href="/contact" className="text-zinc-700 hover:underline">Contact</Link>
            <Link href="/privacy-policy" className="text-zinc-700 hover:underline">Privacy</Link>
            <Link href="/terms-of-service" className="text-zinc-700 hover:underline">Terms</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
