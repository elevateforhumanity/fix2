import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
  CheckCircle,
  Circle,
  FileText,
  Video,
  Link as LinkIcon,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Welcome Packet | Student Dashboard',
  description: 'Complete your welcome packet to get started',
};

interface PageProps {
  params: {
    packetId: string;
  };
}

export default async function WelcomePacketPage({ params }: PageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/welcome-packet/' + params.packetId);
  }

  // Get welcome packet
  const { data: packet } = await supabase
    .from('welcome_packets')
    .select(
      `
      *,
      enrollment:enrollments(
        *,
        program:programs(*)
      )
    `
    )
    .eq('id', params.packetId)
    .eq('student_id', user.id)
    .single();

  if (!packet) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Welcome Packet Not Found
          </h1>
          <p className="text-slate-600 mb-6">
            This welcome packet does not exist or you don't have access to it.
          </p>
          <Link
            href="/student/dashboard"
            className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Get packet items
  const { data: items } = await supabase
    .from('welcome_packet_items')
    .select('*')
    .eq('packet_id', params.packetId)
    .order('created_at', { ascending: true });

  const totalItems = items?.length || 0;
  const completedItems = items?.filter((item) => item.completed).length || 0;
  const requiredItems = items?.filter((item) => item.required).length || 0;
  const completedRequiredItems =
    items?.filter((item) => item.required && item.completed).length || 0;
  const completionPercentage =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'video':
        return Video;
      case 'link':
        return LinkIcon;
      case 'form':
        return FileText;
      default:
        return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome to Elevate for Humanity!
              </h1>
              <p className="text-slate-600 mt-1">
                {packet.enrollment?.program?.name}
              </p>
            </div>
            <Link
              href="/student/dashboard"
              className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Card */}
        <div className="bg-white rounded-xl p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
              <p className="text-blue-100">
                {completedItems} of {totalItems} items complete
                {requiredItems > 0 &&
                  ` • ${completedRequiredItems}/${requiredItems} required items`}
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-4xl md:text-5xl lg:text-6xl">
                {completionPercentage}%
              </div>
              <div className="text-blue-100 mt-2">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-blue-900 rounded-full h-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {packet.status === 'completed' && (
            <div className="mt-4 flex items-center gap-2 text-green-300">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">
                All required items completed! You're ready to start.
              </span>
            </div>
          )}
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Welcome to Your Program!
          </h2>
          <p className="text-slate-700 mb-4">
            We're excited to have you join us! This welcome packet contains
            everything you need to get started with your{' '}
            {packet.enrollment?.program?.name} program.
          </p>
          <p className="text-slate-700 mb-4">
            Please complete all required items before your first day. If you
            have any questions, our student services team is here to help.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>First Day:</strong>{' '}
              {new Date(packet.enrollment?.start_date || '').toLocaleDateString(
                'en-US',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}
            </p>
          </div>
        </div>

        {/* Packet Items */}
        <div className="space-y-4">
          {items &&
            items.map((item, index) => {
              const Icon = getIcon(item.type);
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${
                    item.completed
                      ? 'border-green-200 bg-green-50'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {item.completed ? (
                        <CheckCircle className="w-6 h-6 text-brand-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            {item.title}
                            {item.required && (
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                                Required
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <Icon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      </div>

                      {item.completed && item.completed_at && (
                        <p className="text-xs text-brand-green-600 mb-3">
                          ✓ Completed on{' '}
                          {new Date(item.completed_at).toLocaleDateString()}
                        </p>
                      )}

                      {/* Action Button */}
                      {!item.completed && item.url && (
                        <div className="mt-4">
                          <Link
                            href={item.url}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition-colors font-semibold"
                          >
                            {item.type === 'video'
                              ? 'Watch Video'
                              : item.type === 'form'
                                ? 'Complete Form'
                                : 'View Document'}
                          </Link>
                        </div>
                      )}

                      {item.completed && item.url && (
                        <div className="mt-4">
                          <Link
                            href={item.url}
                            className="inline-flex items-center gap-2 text-brand-blue-600 hover:text-brand-blue-700 text-sm font-semibold"
                          >
                            View Again
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Need Help?
              </h3>
              <p className="text-blue-800 mb-4">
                Our student services team is here to support you through the
                onboarding process.
              </p>
              <div className="space-y-2 text-sm text-blue-800">
                <p>
                  <strong>Phone:</strong> 317-314-3757
                </p>
                <p>
                  <strong>Email:</strong> support@elevateforhumanity.org
                </p>
                <p>
                  <strong>Hours:</strong> Monday-Friday, 8am-5pm EST
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        {packet.status === 'completed' && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  You're All Set!
                </h3>
                <p className="text-green-800 mb-4">
                  You've completed all required items. Here's what to do next:
                </p>
                <ul className="list-disc list-inside space-y-2 text-green-800">
                  <li>Mark your calendar for your first day</li>
                  <li>Review your program workbook</li>
                  <li>Set up your student portal access</li>
                  <li>Prepare any required materials</li>
                </ul>
                <div className="mt-4">
                  <Link
                    href="/student/dashboard"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
