import { generateLicenseKey, hashLicenseKey } from '@/lib/store/license';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { email, productId } = await req.json();

    if (!email || !productId) {
      return Response.json({ error: 'Email and productId required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Verify product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    // Generate license key
    const licenseKey = generateLicenseKey();
    const licenseHash = hashLicenseKey(licenseKey);

    // Store license
    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .insert({
        email,
        product_id: productId,
        license_key: licenseHash,
      })
      .select()
      .single();

    if (licenseError) {
      console.error('Failed to store license:', licenseError);
      return Response.json({ error: 'Failed to generate license' }, { status: 500 });
    }

    return Response.json({
      success: true,
      licenseKey, // Only return once, should be emailed to customer
      licenseId: license.id,
    });
  } catch (error: any) {
    console.error('License generation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
