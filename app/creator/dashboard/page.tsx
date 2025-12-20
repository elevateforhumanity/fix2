import { requireCreator } from '@/lib/creator';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

export default async function CreatorDashboardPage() {
  const { user, creator } = await requireCreator();
  const supabase = await createClient();

  // Fetch products
  const { data: products } = await supabase
    .from('marketplace_products')
    .select('*')
    .eq('creator_id', creator.id)
    .order('created_at', { ascending: false });

  // Fetch sales
  const { data: sales } = await supabase
    .from('marketplace_sales')
    .select('*')
    .eq('creator_id', creator.id)
    .order('created_at', { ascending: false });

  // Calculate earnings
  const totalEarnings =
    sales?.reduce((sum, sale) => sum + sale.creator_earnings_cents, 0) || 0;
  const pendingEarnings =
    sales
      ?.filter((s) => !s.paid_out)
      .reduce((sum, sale) => sum + sale.creator_earnings_cents, 0) || 0;
  const paidEarnings = totalEarnings - pendingEarnings;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-gray-600">Welcome back, {creator.display_name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-brand-green-600">
              ${(totalEarnings / 100).toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Pending Payout</p>
            <p className="text-3xl font-bold text-yellow-600">
              ${(pendingEarnings / 100).toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Paid Out</p>
            <p className="text-3xl font-bold text-brand-blue-600">
              ${(paidEarnings / 100).toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Sales</p>
            <p className="text-3xl font-bold">{sales?.length || 0}</p>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Products</h2>
            <Link
              href="/creator/products/new"
              className="bg-brand-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue-700 transition"
            >
              Add Product
            </Link>
          </div>

          {!products || products.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No products yet. Create your first product to start selling!
            </p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-600">
                      ${(product.price_cents / 100).toFixed(2)} •{' '}
                      <span
                        className={
                          product.status === 'approved'
                            ? 'text-brand-green-600'
                            : product.status === 'pending_review'
                              ? 'text-yellow-600'
                              : product.status === 'rejected'
                                ? 'text-red-600'
                                : 'text-gray-600'
                        }
                      >
                        {product.status}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/creator/products/${product.id}`}
                    className="text-brand-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Sales</h2>

          {!sales || sales.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No sales yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Your Earnings</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.slice(0, 10).map((sale) => (
                    <tr key={sale.id} className="border-b">
                      <td className="py-3 px-4">
                        {new Date(sale.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {products?.find((p) => p.id === sale.product_id)
                          ?.title || 'Unknown'}
                      </td>
                      <td className="py-3 px-4">
                        ${(sale.amount_cents / 100).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-brand-green-600">
                        ${(sale.creator_earnings_cents / 100).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        {sale.paid_out ? (
                          <span className="text-brand-green-600">Paid</span>
                        ) : (
                          <span className="text-yellow-600">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
