import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  UserCog,
  Users,
  BarChart3,
  Settings,
  Shield,
  Database,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Portal | Elevate For Humanity',
  description:
    'System administration, user management, reporting, and configuration.',
};

export default function AdminPortalPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={200}
                height={80}
                className="brightness-0 invert"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <UserCog className="w-5 h-5" />
              <span className="text-sm font-bold">
                For System Administrators
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Admin Portal
              <br />
              <span className="text-gray-300">Complete Control</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium">
              Manage users, configure systems, generate reports, and oversee all
              platform operations.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-2xl"
            >
              Access Admin Portal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            Admin Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'User Management',
                description:
                  'Create, edit, and manage all user accounts and roles',
              },
              {
                icon: BarChart3,
                title: 'Analytics & Reports',
                description: 'Generate system-wide reports and analytics',
              },
              {
                icon: Settings,
                title: 'System Configuration',
                description: 'Configure platform settings and integrations',
              },
              {
                icon: Shield,
                title: 'Security & Permissions',
                description: 'Manage access controls and security settings',
              },
              {
                icon: Database,
                title: 'Data Management',
                description: 'Import, export, and manage platform data',
              },
              {
                icon: CheckCircle,
                title: 'Audit Logs',
                description: 'Track all system changes and user activities',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6"
                >
                  <Icon className="w-12 h-12 text-gray-900 mb-4" />
                  <h3 className="text-xl font-bold text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-black">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Manage the Platform?
          </h2>
          <p className="text-xl mb-8">
            Access the admin portal to configure and oversee operations
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-5 rounded-xl text-lg font-black hover:bg-gray-100 transition"
          >
            Access Admin Portal
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
