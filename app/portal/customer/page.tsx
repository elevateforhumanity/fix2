import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function CustomerPortal() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get customer's purchases
  const { data: purchases } = await supabase
    .from('purchases')
    .select('*, products(*)')
    .eq('email', user.email)
    .order('created_at', { ascending: false });

  // Get customer's licenses
  const { data: licenses } = await supabase
    .from('licenses')
    .select('*, products(*)')
    .eq('email', user.email)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Customer Portal</h1>

        {/* Purchases Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Purchases</h2>
          
          {!purchases || purchases.length === 0 ? (
            <p className="text-gray-600">No purchases yet.</p>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase: any) => (
                <div key={purchase.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{purchase.products?.title}</h3>
                  <p className="text-gray-600 text-sm">
                    Purchased: {new Date(purchase.created_at).toLocaleDateString()}
                  </p>
                  {purchase.repo && (
                    <p className="text-sm text-blue-600 mt-2">
                      Repository: {purchase.repo}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Licenses Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Licenses</h2>
          
          {!licenses || licenses.length === 0 ? (
            <p className="text-gray-600">No licenses yet.</p>
          ) : (
            <div className="space-y-4">
              {licenses.map((license: any) => (
                <div key={license.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{license.products?.title}</h3>
                  <p className="text-gray-600 text-sm">
                    Issued: {new Date(license.created_at).toLocaleDateString()}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Clone Repository
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                      View Documentation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
