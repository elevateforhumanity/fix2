import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import MobileNav from '@/components/mobile/MobileNav';
import InstallPrompt from '@/components/mobile/InstallPrompt';

// Don't force dynamic - let pages control their own caching
export const dynamicParams = true;

export default async function LMSLayout({ children }: { children: React.ReactNode }) {
  // Auth checks moved to individual pages that need them
  // Landing page (/lms) is public, dashboard requires auth
  
  return (
    <>
      <MobileNav />
      <InstallPrompt />
      <div className="has-bottom-nav">{children}</div>
    </>
  );
}
