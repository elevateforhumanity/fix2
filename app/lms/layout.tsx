import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import { LmsSidebar } from '@/components/lms/LmsSidebar';
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
      <div className="min-h-screen flex bg-slate-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <LmsSidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 has-bottom-nav">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
