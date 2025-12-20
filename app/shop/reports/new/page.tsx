import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ShopReportForm } from '@/components/shop/ShopReportForm';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

export default async function NewWeeklyReport() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/shop/reports/new');
  }

  // Get shop for this user
  const { data: staff } = await supabase
    .from('shop_staff')
    .select('shop_id')
    .eq('user_id', user.id);

  const shopId = staff?.[0]?.shop_id;

  if (!shopId) {
    redirect('/shop/dashboard');
  }

  // Get active placements for this shop
  const { data: placements } = await supabase
    .from('apprentice_placements')
    .select('id, profiles(id, full_name)')
    .eq('shop_id', shopId)
    .eq('status', 'active');

  // @ts-expect-error TS2322: Type '{ id: any; profiles: { id: any; full_name: any; }[]; }[]' is not assign...
  return <ShopReportForm placements={placements || []} />;
}
