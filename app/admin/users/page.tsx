import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'User Management | Admin',
  description: 'Manage staff access and permissions',
};

export default async function UserManagementPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/users');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  // Only admins can manage users
  if (profile?.role !== 'admin') {
    redirect('/unauthorized');
  }

  // Fetch all users
  const { data: users } = await supabase
    .from('profiles')
    .select('id, full_name, email, role, created_at')
    .order('created_at', { ascending: false });

  const roleColors: Record<string, string> = {
    admin: 'bg-red-100 text-red-800',
    staff: 'bg-blue-100 text-blue-800',
    instructor: 'bg-purple-100 text-purple-800',
    student: 'bg-green-100 text-green-800',
    partner: 'bg-orange-100 text-orange-800',
  };

  const rolePermissions: Record<string, string[]> = {
    admin: [
      'Full system access',
      'Manage users and permissions',
      'View all reports',
      'Manage programs and courses',
      'Access payroll and HR',
      'Manage compliance data',
    ],
    staff: [
      'View student records',
      'Generate reports',
      'Track attendance',
      'Manage enrollments',
      'View analytics',
    ],
    instructor: [
      'View assigned students',
      'Track attendance',
      'Grade assignments',
      'View course materials',
    ],
    student: [
      'Access own records',
      'View courses',
      'Submit assignments',
      'Track progress',
    ],
    partner: [
      'View partnership details',
      'Access training materials',
      'Submit reports',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="mt-2 text-gray-600">
              Manage staff access and permissions
            </p>
          </div>
          <button className="px-6 py-3 bg-brandPrimary text-white font-semibold rounded-lg hover:bg-brandPrimaryDark transition-colors">
            + Add User
          </button>
        </div>

        {/* Role Permissions Reference */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Role Permissions</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <div key={role}>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold mb-3 ${roleColors[role]}`}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  {permissions.map((permission, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-semibold">
                            {user.full_name?.charAt(0) || user.email?.charAt(0) || '?'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name || 'No name'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${roleColors[user.role] || 'bg-gray-100 text-gray-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-brandPrimary hover:text-blue-900 mr-4">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">How to Manage Access</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-brandPrimary">1.</span>
              <span><strong>Add User:</strong> Click "+ Add User" to invite new staff members via email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-brandPrimary">2.</span>
              <span><strong>Assign Role:</strong> Choose the appropriate role (Admin, Staff, Instructor, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-brandPrimary">3.</span>
              <span><strong>Edit Permissions:</strong> Click "Edit" to change a user's role or access level</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-brandPrimary">4.</span>
              <span><strong>Remove Access:</strong> Click "Remove" to revoke a user's access to the system</span>
            </li>
          </ol>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link
            href="/admin/dashboard"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Admin Dashboard</h3>
            <p className="text-sm text-gray-600">Return to main admin dashboard</p>
          </Link>
          <Link
            href="/admin/audit-logs"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Audit Logs</h3>
            <p className="text-sm text-gray-600">View user activity and changes</p>
          </Link>
          <Link
            href="/admin/security"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Security Settings</h3>
            <p className="text-sm text-gray-600">Manage security and access policies</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
