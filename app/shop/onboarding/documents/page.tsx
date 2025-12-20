import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ShopDocumentUpload } from '@/components/shop/ShopDocumentUpload';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

export default async function ShopDocumentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/shop/onboarding/documents');
  }

  // Get shop for this user
  const { data: staff } = await supabase
    .from('shop_staff')
    .select('shop_id, shops(*)')
    .eq('user_id', user.id);

  const shop = staff?.[0]?.shops;

  if (!shop) {
    redirect('/shop/dashboard');
  }

  // Get required documents
  const { data: requirements } = await supabase
    .from('shop_document_requirements')
    .select('*')
    .eq('state', 'IN')
    .eq('program_slug', 'barber-apprenticeship')
    .order('required', { ascending: false })
    .order('display_name');

  return (
    // @ts-expect-error TS2339: Property 'id' does not exist on type 'any[]'.
    <ShopDocumentUpload shopId={shop.id} requirements={requirements || []} />
  );
}
