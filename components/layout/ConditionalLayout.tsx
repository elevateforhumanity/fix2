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
    <>
      {!isSupersonicSection && <SiteHeader />}
      {!isSupersonicSection && <Breadcrumbs />}
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      {!isSupersonicSection && <SiteFooter />}
    </>
  );
}
