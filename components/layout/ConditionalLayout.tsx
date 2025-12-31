'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide main site header/footer for SupersonicFastCash section
  const isSupersonicSection = pathname?.startsWith('/supersonic-fast-cash');

  return (
    <div className="min-h-screen [--header-h:72px]">
      {!isSupersonicSection && (
        <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)]">
          <SiteHeader />
        </header>
      )}
      
      <main id="main-content" className={!isSupersonicSection ? "pt-[var(--header-h)]" : ""}>
        {!isSupersonicSection && <Breadcrumbs />}
        {children}
      </main>
      
      {!isSupersonicSection && <SiteFooter />}
    </div>
  );
}
