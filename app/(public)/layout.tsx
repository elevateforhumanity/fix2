import SiteHeader from '@/components/site/SiteHeader';
import NewSiteFooter from '@/components/site/SiteFooter';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <NewSiteFooter />
    </>
  );
}
