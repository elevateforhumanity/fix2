'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Award, 
  Calendar,
  MessageCircle,
  FolderOpen,
  Bell,
  User,
  Settings,
  Users,
  Briefcase,
  Clock,
  CreditCard,
  Folder,
  Star,
  Target,
  Eye,
  Globe,
  Plug,
  Shield,
  Video
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/portal/student/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/portal/student/courses', icon: BookOpen },
  { name: 'Assignments', href: '/portal/student/assignments', icon: FileText },
  { name: 'Grades', href: '/portal/student/grades', icon: Award },
  { name: 'Schedule', href: '/portal/student/calendar', icon: Calendar },
  { name: 'Messages', href: '/portal/student/messages', icon: MessageCircle },
  { name: 'Resources', href: '/portal/student/resources', icon: FolderOpen },
  { name: 'Notifications', href: '/portal/student/notifications', icon: Bell },
  { name: 'Certificates', href: '/portal/student/certificates', icon: Award },
  { name: 'Study Groups', href: '/portal/student/study-groups', icon: Users },
  { name: 'Career Counseling', href: '/portal/student/career-counseling', icon: Briefcase },
  { name: 'Apprenticeship Hours', href: '/portal/student/apprenticeship-hours', icon: Clock },
  { name: 'Payments', href: '/portal/student/payments', icon: CreditCard },
  { name: 'Portfolio', href: '/portal/student/portfolio', icon: Folder },
  { name: 'Peer Review', href: '/portal/student/peer-review', icon: Star },
  { name: 'Competencies', href: '/portal/student/competencies', icon: Target },
  { name: 'Accessibility', href: '/portal/student/accessibility', icon: Eye },
  { name: 'Profile', href: '/portal/student/profile', icon: User },
  { name: 'Settings', href: '/portal/student/settings', icon: Settings },
];

export default function StudentPortalNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/portal/student/dashboard" className="text-xl font-bold text-blue-600">
              Student Portal
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navigation.slice(0, 8).map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/portal/student/notifications"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Bell size={20} />
            </Link>
            <Link
              href="/portal/student/profile"
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
