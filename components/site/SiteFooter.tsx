import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <div className="flex-shrink-0">
            <div className="font-black text-zinc-900 text-lg">Elevate for Humanity</div>
            <p className="mt-1 text-xs text-zinc-600 max-w-xs">
              Workforce training and career development platform
            </p>
          </div>

          {/* Horizontal Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href="/programs" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Programs</Link>
            <Link href="/funding" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Funding</Link>
            <Link href="/apply" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Apply</Link>
            <Link href="/platform" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Platform</Link>
            <Link href="/platform/apps" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Apps</Link>
            <Link href="/platform/licensing" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Licensing</Link>
            <Link href="/store" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Store</Link>
            <Link href="/about" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">About</Link>
            <Link href="/contact" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Contact</Link>
            <Link href="/privacy-policy" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Privacy</Link>
            <Link href="/terms-of-service" className="text-zinc-700 hover:text-zinc-900 hover:underline font-medium">Terms</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-zinc-100 text-xs text-zinc-500 text-center md:text-left">
          © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
