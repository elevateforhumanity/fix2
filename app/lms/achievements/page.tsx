import MobileAchievementCard from '@/components/mobile/MobileAchievementCard';
import Image from 'next/image';
import { Award, Trophy, Star, Zap, Target, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Achievements | Elevate LMS',
  description: 'Your achievements and badges',
};

const achievements = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    unlocked: true,
    unlockedAt: '2024-11-01',
  },
  {
    id: '2',
    title: 'Quick Learner',
    description: 'Complete 5 lessons in one day',
    icon: '⚡',
    unlocked: true,
    unlockedAt: '2024-11-05',
  },
  {
    id: '3',
    title: 'Perfect Score',
    description: 'Get 100% on a quiz',
    icon: '💯',
    unlocked: true,
    unlockedAt: '2024-11-08',
  },
  {
    id: '4',
    title: 'Course Master',
    description: 'Complete your first course',
    icon: '🏆',
    unlocked: false,
    progress: 75,
    total: 100,
  },
  {
    id: '5',
    title: 'Dedicated Student',
    description: 'Log in for 7 consecutive days',
    icon: '📅',
    unlocked: false,
    progress: 4,
    total: 7,
  },
  {
    id: '6',
    title: 'Knowledge Seeker',
    description: 'Complete 10 courses',
    icon: '📚',
    unlocked: false,
    progress: 1,
    total: 10,
  },
];

export default function AchievementsPage() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white px-4 py-8 safe-area-inset-top">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Achievements</h1>
              <p className="text-white/90 text-sm">
                {unlockedCount} of {totalCount} unlocked
              </p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {unlockedCount}
            </div>
            <div className="text-xs text-gray-600">Unlocked</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {totalCount - unlockedCount}
            </div>
            <div className="text-xs text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(progressPercent)}%
            </div>
            <div className="text-xs text-gray-600">Complete</div>
          </div>
        </div>
        {/* Unlocked Achievements */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Unlocked ({unlockedCount})
          </h2>
          <div className="space-y-3">
            {achievements
              .filter((a) => a.unlocked)
              .map((achievement) => (
                <MobileAchievementCard key={achievement.id} {...achievement} />
              ))}
          </div>
        </div>
        {/* Locked Achievements */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            In Progress ({totalCount - unlockedCount})
          </h2>
          <div className="space-y-3">
            {achievements
              .filter((a) => !a.unlocked)
              .map((achievement) => (
                <MobileAchievementCard key={achievement.id} {...achievement} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
