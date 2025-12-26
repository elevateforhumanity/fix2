import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingBag,
  DollarSign,
  Package,
  TrendingUp,
  Plus,
  BarChart,
} from 'lucide-react';

/**
 * SHOP DASHBOARD
 *
 * For shop owners who sell products and services on the platform.
 * Part of the Skool-like marketplace system.
 */
export default async function ShopDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/shop/dashboard');
  }

  // Get shop owner profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'shop') {
    redirect('/dashboard');
  }

  // Get shop profile with stats
  const { data: shopProfile } = await supabase
    .from('shop_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get products count
  const { count: totalProducts } = await supabase
    .from('shop_products')
    .select('*', { count: 'exact', head: true })
    .eq('shop_id', user.id);

  // Get orders count
  const { count: totalOrders } = await supabase
    .from('shop_orders')
    .select('*', { count: 'exact', head: true })
    .eq('shop_id', user.id);

  // Get pending orders count
  const { count: pendingOrders } = await supabase
    .from('shop_orders')
    .select('*', { count: 'exact', head: true })
    .eq('shop_id', user.id)
    .eq('status', 'pending');

  // Get recent orders
  const { data: recentOrders } = await supabase
    .from('shop_orders')
    .select('*')
    .eq('shop_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const totalRevenue = shopProfile?.total_revenue || 0;
  const totalSales = shopProfile?.total_sales || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your products and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalProducts || 0}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalOrders || 0}
                </p>
              </div>
              <ShoppingBag className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingOrders || 0}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/shop/products/new"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <Plus className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Add Product
            </h3>
            <p className="text-sm text-gray-600">
              Create a new product listing
            </p>
          </Link>

          <Link
            href="/shop/orders"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <ShoppingBag className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Orders
            </h3>
            <p className="text-sm text-gray-600">
              View and fulfill customer orders
            </p>
            {(pendingOrders || 0) > 0 && (
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                {pendingOrders} pending
              </span>
            )}
          </Link>

          <Link
            href="/shop/analytics"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <BarChart className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              View Analytics
            </h3>
            <p className="text-sm text-gray-600">Track sales and performance</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Order #1234</p>
                  <p className="text-sm text-gray-600">2 items • $89.99</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Order #1233</p>
                  <p className="text-sm text-gray-600">1 item • $49.99</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded">
                  Completed
                </span>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Order #1232</p>
                  <p className="text-sm text-gray-600">3 items • $149.99</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Products
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Manage your product catalog</p>
              <Link
                href="/shop/products"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>

          {/* Shop Management Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Shop Management</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link href="/shop/onboarding" className="p-3 bg-white border rounded-lg hover:border-blue-500 hover:shadow text-sm">Onboarding</Link>
              <Link href="/shop/apply" className="p-3 bg-white border rounded-lg hover:border-blue-500 hover:shadow text-sm">Apply</Link>
              <Link href="/shop/reports" className="p-3 bg-white border rounded-lg hover:border-blue-500 hover:shadow text-sm">Reports</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
