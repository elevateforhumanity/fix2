import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="font-black text-zinc-900 text-xl mb-3">Elevate for Humanity</div>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Real careers. Real fast. From home. Free training for those who qualify.
            </p>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-4">Programs</h3>
            <div className="space-y-2">
              <Link href="/programs" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">All Programs</Link>
              <Link href="/programs/barber-apprenticeship" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">Barber Apprenticeship</Link>
              <Link href="/programs/cna" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">CNA Healthcare</Link>
              <Link href="/programs/hvac-technician" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">HVAC Technician</Link>
              <Link href="/programs/cdl" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">CDL Training</Link>
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-4">Resources</h3>
            <div className="space-y-2">
              <Link href="/funding" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">Funding Options</Link>
              <Link href="/platform" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">Platform</Link>
              <Link href="/platform/apps" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">Apps</Link>
              <Link href="/store" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">Store</Link>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-4">Company</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">About Us</Link>
              <Link href="/contact" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">Contact</Link>
              <Link href="/apply" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">Apply Now</Link>
              <Link href="/privacy-policy" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">Privacy Policy</Link>
              <Link href="/terms-of-service" className="block text-sm text-zinc-600 hover:text-zinc-900 transition">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="tel:3173143757" className="text-xs text-zinc-600 hover:text-zinc-900 transition font-medium">
                317-314-3757
              </Link>
              <Link href="mailto:elevate4humanityedu@gmail.com" className="text-xs text-zinc-600 hover:text-zinc-900 transition font-medium">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
