'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function MigrationsPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const migrations = [
    {
      file: '20240116_add_cip_soc_codes.sql',
      description: 'CIP/SOC classification codes',
    },
    {
      file: '20240116_seed_cip_soc_codes.sql',
      description: 'Seed CIP/SOC data',
    },
    {
      file: '20241115_add_all_etpl_programs.sql',
      description: 'ETPL approved programs',
    },
    {
      file: '20241116_add_jri_courses.sql',
      description: 'JRI reentry courses',
    },
    {
      file: '20241116_add_nrf_rise_up_courses.sql',
      description: 'NRF Rise Up retail courses',
    },
    {
      file: '20241116_create_lms_courses_part1.sql',
      description: 'LMS Courses Part 1',
    },
    {
      file: '20241116_create_lms_courses_part2.sql',
      description: 'LMS Courses Part 2',
    },
    {
      file: '20241116_create_lms_courses_part3.sql',
      description: 'LMS Courses Part 3',
    },
    {
      file: '20241116_create_lms_courses_part4.sql',
      description: 'LMS Courses Part 4',
    },
    {
      file: '20241116_create_medical_assistant_course.sql',
      description: 'Medical Assistant course',
    },
    {
      file: '20251116020545_lesson_progress.sql',
      description: 'Lesson progress tracking',
    },
    {
      file: '20251116020748_course_completion_view.sql',
      description: 'Course completion views',
    },
    {
      file: '20251117_advanced_lms_features.sql',
      description: 'Advanced LMS features',
    },
    { file: '20251117_advanced_rbac.sql', description: 'Advanced RBAC system' },
    {
      file: '20251117_hr_payroll_system.sql',
      description: 'HR & Payroll system',
    },
    {
      file: '20251117_multi_tenancy.sql',
      description: 'Multi-tenancy support',
    },
    {
      file: '20251117_sso_and_2fa.sql',
      description: 'SSO & 2FA authentication',
    },
  ];

  const runMigrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/run-migrations', {
        method: 'POST',
      });
      const data = await res.json();
      setResults(data);
    } catch (error: any) {
      setResults({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Database Migrations</CardTitle>
            <p className="text-gray-600 mt-2">
              Run all SQL migrations to load courses, programs, and system
              features into the database.
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-yellow-900 mb-2">⚠️ Important</h3>
              <p className="text-sm text-yellow-800">
                This will run {migrations.length} SQL migration files. Make sure
                you have a database backup before proceeding.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-bold text-lg">Migrations to Run:</h3>
              {migrations.map((migration, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white border rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brandPrimary font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-sm text-gray-900">
                      {migration.file}
                    </div>
                    <div className="text-sm text-gray-600">
                      {migration.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={runMigrations}
              disabled={loading}
              className="w-full py-4 text-lg font-bold"
              size="lg"
            >
              {loading ? 'Running Migrations...' : 'Run All Migrations Now'}
            </Button>

            {results && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-bold mb-2">Results:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">
                Manual Alternative
              </h3>
              <p className="text-sm text-blue-800 mb-2">
                If the automated migration fails, you can run them manually:
              </p>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Go to Supabase Dashboard → SQL Editor</li>
                <li>
                  Open each migration file from{' '}
                  <code>supabase/migrations/</code>
                </li>
                <li>Copy and paste the SQL into the editor</li>
                <li>Run each migration in order</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
