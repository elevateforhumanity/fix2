import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

export default function DashboardStats() {
  const stats: Stat[] = [
    {
      label: 'Courses Enrolled',
      value: 5,
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      label: 'Certificates Earned',
      value: 2,
      icon: <Award className="w-6 h-6" />,
    },
    {
      label: 'Hours Learned',
      value: '24.5',
      icon: <Clock className="w-6 h-6" />,
    },
    {
      label: 'Completion Rate',
      value: '78%',
      icon: <TrendingUp className="w-6 h-6" />,
      trend: '+12%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-brand-blue">{stat.icon}</div>
            {stat.trend && (
              <span className="text-sm text-green-600 font-medium">
                {stat.trend}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-slate-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
