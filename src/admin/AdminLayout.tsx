/**
 * Admin Layout
 * Main layout for admin section with navigation
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useOrg } from '../hooks/useOrg';
import { signOut } from '../hooks/useAuth';
import { can, getRoleName } from '../lib/rbac';

export default function AdminLayout() {
  const { user, role } = useAuth();
  const { currentOrg, memberships, switchOrg } = useOrg(user?.id || null);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  const navItems = [
    { label: 'Launchpad', to: '/admin', exact: true, show: true, icon: '🚀' },
    { label: 'Dashboard', to: '/admin/dashboard', show: true, icon: '📊' },
    {
      label: 'Users',
      to: '/admin/users',
      show: role && can.manageUsers(role),
      icon: '👥',
    },
    {
      label: 'Courses',
      to: '/admin/courses',
      show: role && can.viewCourses(role),
      icon: '📚',
    },
    {
      label: 'Enrollments',
      to: '/admin/enrollments',
      show: role && can.viewCourses(role),
      icon: '🎓',
    },
    {
      label: 'Community',
      to: '/admin/community',
      show: role && can.viewCourses(role),
      icon: '💬',
    },
    {
      label: 'Marketing',
      to: '/admin/marketing',
      show: role && can.manageIntegrations(role),
      icon: '📢',
    },
    {
      label: 'Assessments',
      to: '/admin/assessments',
      show: role && can.viewCourses(role),
      icon: '📝',
    },
    {
      label: 'Analytics',
      to: '/admin/analytics',
      show: role && can.viewAnalytics(role),
      icon: '📈',
    },
    {
      label: 'Integrations',
      to: '/admin/integrations',
      show: role && can.manageIntegrations(role),
      icon: '🔌',
    },
    {
      label: 'Organizations',
      to: '/admin/orgs',
      show: role && role === 'owner',
      icon: '🏢',
    },
    {
      label: 'Billing',
      to: '/admin/billing',
      show: role && can.viewBilling(role),
      icon: '💳',
    },
    {
      label: 'Audit Log',
      to: '/admin/audit',
      show: role && can.viewAudit(role),
      icon: '📋',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold">Elevate Admin</h1>
            {/* Org Switcher */}
            {memberships.length > 1 && (
              <select
                value={currentOrg?.id || ''}
                onChange={(e) => switchOrg(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {memberships.map((m) => (
                  <option key={m.org.id} value={m.org.id}>
                    {m.org.name} ({m.role})
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex items-center gap-4">
            {/* Current Org Info */}
            {currentOrg && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">{currentOrg.name}</span>
                <span className="mx-2">•</span>
                <span className="capitalize">{currentOrg.tier}</span>
              </div>
            )}
            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium">{user?.email}</div>
                <div className="text-xs text-gray-500">
                  {role && getRoleName(role)}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-1">
            {navItems
              .filter((item) => item.show)
              .map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span>{item.label}</span>
                </NavLink>
              ))}
          </nav>
          {/* Quick Stats */}
          {currentOrg && (
            <div className="p-4 mt-6 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Quick Stats
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`font-medium ${
                      currentOrg.status === 'active'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {currentOrg.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium capitalize">
                    {currentOrg.tier}
                  </span>
                </div>
              </div>
            </div>
          )}
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
