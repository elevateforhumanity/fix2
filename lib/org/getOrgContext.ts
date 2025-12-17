import { cache } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

export interface OrgContext {
  organization_id: string;
  role: string;
  organization: {
    name: string;
    slug: string;
    type: string;
    status: string;
  };
}

export const getOrgContext = cache(
  async (supabase: SupabaseClient, userId: string): Promise<OrgContext> => {
    const { data, error } = await supabase
      .from('organization_users')
      .select(
        `
      organization_id,
      role,
      organizations (
        name,
        slug,
        type,
        status
      )
    `
      )
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error(`Failed to get org context: ${error.message}`);
    }

    if (!data) {
      throw new Error('User not associated with any organization');
    }

    return {
      organization_id: data.organization_id,
      role: data.role,
      organization: Array.isArray(data.organizations)
        ? data.organizations[0]
        : data.organizations,
    };
  }
);
