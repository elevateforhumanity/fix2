'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Code, 
  BookOpen, 
  Zap, 
  Image, 
  ShoppingCart, 
  Home,
  Settings,
  LogOut
} from 'lucide-react';

interface AdminNavProps {
  userRole: string;
}

export default function AdminNav({ userRole }: AdminNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/dev-studio', label: 'Dev Studio', icon: Code },
    { href: '/admin/course-studio', label: 'Course Studio', icon: BookOpen },
    { href: '/admin/autopilots', label: 'Autopilots', icon: Zap },
    { href: '/admin/media-studio', label: 'Media Studio', icon: Image },
    { href: '/admin/store/clones', label: 'Store Builder', icon: ShoppingCart },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-700">
      <div className="max-w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Elevate
            </div>
            <span className="text-sm text-gray-400">Admin Suite</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {userRole === 'super_admin' ? 'Super Admin' : 'Admin'}
            </span>
            <Link
              href="/admin/settings"
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <Link
              href="/api/auth/signout"
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
