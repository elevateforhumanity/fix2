import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import {
  GraduationCap,
  Shield,
  Users,
  Briefcase,
  Building2,
  UserCog,
  BarChart3,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portals | Elevate For Humanity',
  description: 'Access all available portals and dashboards',
};

interface Portal {
  name: string;
  description: string;
  href: string;
  icon: any;
  roles: string[];
  color: string;
}

const portals: Portal[] = [
  {
    name: 'Student Portal',
    description: 'Access your courses, track progress, and view certificates',
    href: '/lms/dashboard',
    icon: GraduationCap,
    roles: ['student'],
    color: 'blue',
  },
  {
    name: 'Admin Portal',
    description: 'Manage users, programs, courses, and system settings',
    href: '/admin',
    icon: Shield,
    roles: ['admin', 'super_admin'],
    color: 'red',
  },
  {
    name: 'Partner Portal',
    description: 'Manage your organization, courses, and students',
    href: '/partner/dashboard',
    icon: Users,
    roles: ['admin', 'super_admin', 'partner'],
    color: 'green',
  },
  {
    name: 'Workforce Board Portal',
    description: 'Program oversight, reporting, and compliance tracking',
    href: '/workforce-board',
    icon: Briefcase,
    roles: ['admin', 'super_admin', 'workforce_board', 'staff'],
    color: 'purple',
  },
  {
    name: 'Program Holder Portal',
    description: 'Manage apprenticeship programs and placements',
    href: '/program-holder/portal',
    icon: Building2,
    roles: ['admin', 'super_admin', 'program_holder'],
    color: 'orange',
  },
  {
    name: 'Staff Portal',
    description: 'Staff tools and resources',
    href: '/staff-portal/dashboard',
    icon: UserCog,
    roles: ['admin', 'super_admin', 'staff'],
    color: 'indigo',
  },
  {
    name: 'Board Dashboard',
    description: 'Executive dashboard and analytics',
    href: '/board/dashboard',
    icon: BarChart3,
    roles: ['admin', 'super_admin'],
    color: 'pink',
  },
  {
    name: 'LMS Dashboard',
    description: 'Learning management system',
    href: '/lms/dashboard',
    icon: BookOpen,
    roles: ['student', 'admin', 'super_admin'],
    color: 'teal',
  },
];

export default async function PortalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userRole = null;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    userRole = profile?.role;
  }

  // Filter portals based on user role
  const availablePortals =
    user && userRole
      ? portals.filter((portal) => portal.roles.includes(userRole))
      : portals;

  const colorClasses: Record<
    string,
    { bg: string; text: string; border: string; hover: string }
  > = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-100',
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      hover: 'hover:bg-red-100',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:bg-green-100',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:bg-purple-100',
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
      hover: 'hover:bg-orange-100',
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      hover: 'hover:bg-indigo-100',
    },
    pink: {
      bg: 'bg-pink-50',
      text: 'text-pink-600',
      border: 'border-pink-200',
      hover: 'hover:bg-pink-100',
    },
    teal: {
      bg: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-200',
      hover: 'hover:bg-teal-100',
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Portal Access
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {user
              ? `Welcome back! Access your available portals below.`
              : 'Login to access your portals and dashboards.'}
          </p>
          {userRole && (
            <p className="text-sm text-slate-500 mt-2">
              Current role: <span className="font-semibold">{userRole}</span>
            </p>
          )}
        </div>

        {/* Login prompt if not authenticated */}
        {!user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-center">
            <p className="text-blue-900 mb-4">
              Please login to access your portals
            </p>
            <Link
              href="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              Login
            </Link>
          </div>
        )}

        {/* Portals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availablePortals.map((portal) => {
            const Icon = portal.icon;
            const colors = colorClasses[portal.color];

            return (
              <Link
                key={portal.href}
                href={portal.href}
                className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 ${colors.hover} transition group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${colors.text} p-3 rounded-lg bg-white`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold ${colors.text} mb-2 group-hover:underline`}
                    >
                      {portal.name}
                    </h3>
                    <p className="text-slate-700 text-sm">
                      {portal.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {portal.roles.map((role) => (
                        <span
                          key={role}
                          className="text-xs bg-white px-2 py-1 rounded-full text-slate-600"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* All Portals (if logged in, show all for reference) */}
        {user && userRole && availablePortals.length < portals.length && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Other Portals (Requires Different Role)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
              {portals
                .filter((portal) => !portal.roles.includes(userRole))
                .map((portal) => {
                  const Icon = portal.icon;
                  const colors = colorClasses[portal.color];

                  return (
                    <div
                      key={portal.href}
                      className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 cursor-not-allowed`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`${colors.text} p-3 rounded-lg bg-white`}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`text-xl font-bold ${colors.text} mb-2`}
                          >
                            {portal.name}
                          </h3>
                          <p className="text-slate-700 text-sm">
                            {portal.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {portal.roles.map((role) => (
                              <span
                                key={role}
                                className="text-xs bg-white px-2 py-1 rounded-full text-slate-600"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-lg p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Need Help?</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>Can't access a portal?</strong> Make sure you're logged in
              with the correct account and have the appropriate role assigned.
            </p>
            <p>
              <strong>Need a different role?</strong> Contact your administrator
              or email{' '}
              <a
                href="mailto:support@elevateforhumanity.org"
                className="text-blue-600 hover:underline"
              >
                support@elevateforhumanity.org
              </a>
            </p>
            <p>
              <strong>Technical issues?</strong> Try clearing your browser cache
              or contact support.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
