'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * ClaimApplications Component
 * 
 * Automatically claims any applications submitted before login
 * by matching the user's email address.
 * 
 * Usage: Add to any authenticated page (dashboard, student portal, etc.)
 */
export function ClaimApplications() {
  useEffect(() => {
    const claimApplications = async () => {
      const supabase = createClient();

      // Confirm user is logged in
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return;
      }

      // Call RPC function to claim applications
      const { error } = await supabase.rpc(
        'claim_applications_for_current_user'
      );

      if (error) {
        console.error('Error claiming applications:', error);
      } else {
        console.log('Applications claimed successfully');
      }
    };

    claimApplications();
  }, []);

  // This component doesn't render anything
  return null;
}
