import { getMyPartnerContext } from '@/lib/partner/access';


export default async function PartnerDashboardPage() {
  const ctx = await getMyPartnerContext();
  const shops = ctx?.shops ?? [];
  const isAdmin = ['admin', 'super_admin', 'org_admin'].includes(
    ctx?.profileRole ?? ''
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border p-5">
        <div className="text-lg font-semibold">Welcome</div>
        <div className="text-sm text-gray-600 mt-1">
          {isAdmin
            ? 'You have admin access.'
            : "You're signed in as a partner user."}
        </div>
      </div>

      <div className="rounded-2xl border p-5">
        <div className="font-semibold">Your Locations</div>
        <div className="mt-3 space-y-2">
          {shops.length === 0 ? (
            <div className="text-sm text-gray-600">
              No shops assigned yet. Admin must add you to a shop.
            </div>
          ) : (
            shops.map((s: any) => (
              <div
                key={s.shop_id}
                className="rounded-xl border p-3 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{s.shop?.name ?? s.shop_id}</div>
                  <div className="text-xs text-gray-500">
                    Role: {s.staff_role} • Status:{' '}
                    {s.shop?.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
