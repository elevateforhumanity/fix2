#!/usr/bin/env node

/**
 * Mass fix all placeholder admin pages
 * Converts placeholder pages to functional pages with real data
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const adminDir = 'app/admin';
let fixed = 0;

// Template for functional admin page
const functionalTemplate = (pageName, tableName, description) => `import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/${pageName}",
  },
  title: '${pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Admin',
  description: '${description}',
};

export default async function ${pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch data from database
  const { data: items, count } = await supabase
    .from('${tableName}')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">${pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h1>
            <p className="text-xl text-blue-100">${description}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Items</h3>
              <p className="text-3xl font-bold text-blue-600">{count || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active</h3>
              <p className="text-3xl font-bold text-green-600">{items?.filter(i => i.status === 'active').length || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Recent</h3>
              <p className="text-3xl font-bold text-purple-600">{items?.filter(i => {
                const created = new Date(i.created_at);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return created > weekAgo;
              }).length || 0}</p>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">All Items</h2>
            </div>
            <div className="overflow-x-auto">
              {items && items.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.id.slice(0, 8)}...</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.title || item.name || item.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={\`px-2 py-1 rounded-full text-xs \${
                            item.status === 'active' ? 'bg-green-100 text-green-800' :
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }\`}>
                            {item.status || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Link 
                            href={\`/admin/${pageName}/\${item.id}\`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <p className="text-lg mb-2">No items found</p>
                  <p className="text-sm">Items will appear here once they are created</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

// Map page names to database tables
const pageToTable = {
  'students': 'profiles',
  'enrollments': 'enrollments',
  'applications': 'applications',
  'applicants': 'applications',
  'programs': 'programs',
  'courses': 'courses',
  'users': 'profiles',
  'certificates': 'certificates',
  'completions': 'course_completions',
  'progress': 'student_progress',
  'grants': 'grants',
  'contacts': 'contacts',
  'employers': 'employers',
  'partners': 'partners',
  'documents': 'documents',
  'files': 'storage_files',
  'audit-logs': 'audit_logs',
  'barriers': 'student_barriers',
  'outcomes': 'student_outcomes',
  'retention': 'retention_metrics',
  'impact': 'impact_metrics',
};

const pageDescriptions = {
  'students': 'Manage all student accounts and profiles',
  'enrollments': 'View and manage course enrollments',
  'applications': 'Review and process student applications',
  'applicants': 'Manage applicant pipeline',
  'programs': 'Manage training programs',
  'courses': 'Manage course catalog',
  'users': 'Manage all user accounts',
  'certificates': 'Issue and manage certificates',
  'completions': 'Track course completions',
  'progress': 'Monitor student progress',
  'grants': 'Manage grant applications and funding',
  'contacts': 'Manage contact database',
  'employers': 'Manage employer partnerships',
  'partners': 'Manage training partners',
  'documents': 'Document management system',
  'files': 'File storage and management',
  'audit-logs': 'System audit logs and activity',
  'barriers': 'Track and address student barriers',
  'outcomes': 'Track student outcomes and success',
  'retention': 'Monitor retention metrics',
  'impact': 'Measure program impact',
};

function fixPlaceholderPage(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  
  // Check if it's a placeholder
  if (!content.includes('No recent activity') && 
      !content.includes('Discover more about')) {
    return false;
  }
  
  // Extract page name from path
  const pathParts = filePath.split('/');
  const pageIndex = pathParts.indexOf('admin') + 1;
  const pageName = pathParts[pageIndex];
  
  // Skip if it's a dynamic route or nested page
  if (pageName.includes('[') || pathParts.length > 4) {
    return false;
  }
  
  // Get table name and description
  const tableName = pageToTable[pageName] || pageName;
  const description = pageDescriptions[pageName] || `Manage ${pageName}`;
  
  // Generate new content
  const newContent = functionalTemplate(pageName, tableName, description);
  
  // Write back to file
  writeFileSync(filePath, newContent, 'utf-8');
  
  console.log(`✅ Fixed: ${filePath}`);
  return true;
}

function scanAndFix(dir) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanAndFix(fullPath);
    } else if (item === 'page.tsx') {
      if (fixPlaceholderPage(fullPath)) {
        fixed++;
      }
    }
  }
}

console.log('🔧 Fixing all placeholder admin pages...\n');
scanAndFix(adminDir);
console.log(`\n✅ Fixed ${fixed} placeholder pages!`);
