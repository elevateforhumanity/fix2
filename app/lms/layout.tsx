import { LmsSidebar } from '@/components/lms/LmsSidebar';
// Image asset: /images/facilities-new/facility-9.jpg
import MobileNav from '@/components/mobile/MobileNav';
import InstallPrompt from '@/components/mobile/InstallPrompt';

// Don't force dynamic - let pages control their own caching
export const dynamicParams = true;

export default async function LMSLayout({ children }: { children: React.ReactNode }) {
  // Auth checks moved to individual pages that need them
  // Landing page (/lms) is public, dashboard requires auth
  
  return (
    <>
      {/* Mobile Navigation - Only show on mobile, below main header */}
      <div className="lg:hidden">
        <MobileNav />
        <InstallPrompt />
      </div>
      
      <div className="flex bg-slate-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:w-64 lg:overflow-y-auto">
          <LmsSidebar />
        </div>
        
        {/* Main Content - offset for sidebar on desktop */}
        <div className="flex-1 lg:ml-64 pb-20 lg:pb-0 pt-16 lg:pt-0">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
