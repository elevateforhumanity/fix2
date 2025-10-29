// =============================
// File: src/components/FooterLegal.tsx
// Description: Site-wide legal footer with IP notice links
// =============================
import { Link } from "react-router-dom";

export default function FooterLegal() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm text-gray-600">
          <p className="leading-tight">
            © {year} Elevate for Humanity. All rights reserved. Unauthorized copying, distribution, or reverse engineering is prohibited.
          </p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/legal/terms" className="hover:text-gray-900">Terms of Use</Link>
            <Link to="/legal/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link to="/legal/ip-notice" className="hover:text-gray-900">IP Notice</Link>
            <Link to="/legal/dmca" className="hover:text-gray-900">DMCA</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
