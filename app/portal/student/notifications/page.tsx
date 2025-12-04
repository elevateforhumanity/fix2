import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Bell, CheckCheck, Trash2, Settings, BookOpen, Award, MessageSquare, Calendar, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Notifications | Student Portal',
  description: 'View and manage your notifications',
};

type NotificationType = 'assignment' | 'grade' | 'message' | 'announcement' | 'achievement' | 'reminder';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  link?: string;
}

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch notifications
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const unreadCount = notifications?.filter(n => !n.read).length || 0;
  const todayNotifications = notifications?.filter(n => {
    const notifDate = new Date(n.created_at);
    const today = new Date();
    return notifDate.toDateString() === today.toDateString();
  }) || [];
  
  const earlierNotifications = notifications?.filter(n => {
    const notifDate = new Date(n.created_at);
    const today = new Date();
    return notifDate.toDateString() !== today.toDateString();
  }) || [];

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'assignment':
        return <BookOpen className="text-blue-600" size={20} />;
      case 'grade':
        return <Award className="text-green-600" size={20} />;
      case 'message':
        return <MessageSquare className="text-purple-600" size={20} />;
      case 'announcement':
        return <Bell className="text-orange-600" size={20} />;
      case 'achievement':
        return <Award className="text-yellow-600" size={20} />;
      case 'reminder':
        return <Calendar className="text-red-600" size={20} />;
      default:
        return <AlertCircle className="text-gray-600" size={20} />;
    }
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div className={`p-4 border-l-4 ${notification.read ? 'border-gray-200 bg-white' : 'border-blue-500 bg-blue-50'} hover:bg-gray-50 transition`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          notification.read ? 'bg-gray-100' : 'bg-blue-100'
        }`}>
          {getNotificationIcon(notification.type as NotificationType)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={`font-semibold ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {!notification.read && (
                <button className="p-1 hover:bg-blue-100 rounded" title="Mark as read">
                  <CheckCheck size={16} className="text-blue-600" />
                </button>
              )}
              <button className="p-1 hover:bg-red-100 rounded" title="Delete">
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2">
              <CheckCheck size={20} />
              Mark all as read
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
              <Settings size={20} />
              Settings
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications?.length || 0}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-gray-600">Unread</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCheck className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{(notifications?.length || 0) - unreadCount}</p>
                <p className="text-sm text-gray-600">Read</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{todayNotifications.length}</p>
                <p className="text-sm text-gray-600">Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {/* Today */}
          {todayNotifications.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-semibold text-gray-900">Today</h2>
              </div>
              <div className="divide-y">
                {todayNotifications.map((notification: any) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          )}

          {/* Earlier */}
          {earlierNotifications.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-semibold text-gray-900">Earlier</h2>
              </div>
              <div className="divide-y">
                {earlierNotifications.map((notification: any) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {(!notifications || notifications.length === 0) && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Bell className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications yet</h3>
              <p className="text-gray-600">
                When you receive notifications, they'll appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
