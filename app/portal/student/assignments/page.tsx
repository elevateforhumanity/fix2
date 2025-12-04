import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Assignments | Student Portal',
  description: 'View and submit your assignments',
};

export default async function AssignmentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch assignments
  const { data: assignments } = await supabase
    .from('assignments')
    .select(`
      *,
      courses (name)
    `)
    .order('due_date', { ascending: true });

  const pending = assignments?.filter(a => !a.submitted_at) || [];
  const submitted = assignments?.filter(a => a.submitted_at && !a.graded_at) || [];
  const graded = assignments?.filter(a => a.graded_at) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Assignments</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-orange-600" size={32} />
              <div>
                <p className="text-2xl font-bold">{pending.length}</p>
                <p className="text-gray-600">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600" size={32} />
              <div>
                <p className="text-2xl font-bold">{submitted.length}</p>
                <p className="text-gray-600">Submitted</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={32} />
              <div>
                <p className="text-2xl font-bold">{graded.length}</p>
                <p className="text-gray-600">Graded</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">All Assignments</h2>
          </div>
          <div className="divide-y">
            {assignments && assignments.length > 0 ? (
              assignments.map((assignment: any) => (
                <div key={assignment.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{assignment.title}</h3>
                      <p className="text-gray-600 mt-1">{assignment.courses?.name}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-gray-500">
                          Due: {new Date(assignment.due_date).toLocaleDateString()}
                        </span>
                        {assignment.points && (
                          <span className="text-gray-500">{assignment.points} points</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {assignment.graded_at ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Graded: {assignment.grade}%
                        </span>
                      ) : assignment.submitted_at ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          Submitted
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                          Pending
                        </span>
                      )}
                      <Link
                        href={`/portal/student/assignments/${assignment.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">No assignments yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
