import MobileNav from '@/components/mobile/MobileNav';
import InstallPrompt from '@/components/mobile/InstallPrompt';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function LMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileNav />
      <InstallPrompt />
      <div className="has-bottom-nav">
        {children}
      </div>
    </>
  );
}
