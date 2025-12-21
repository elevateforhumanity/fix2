import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { AppHeader } from '../components/AppHeader';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  earned_at: string | null;
  progress?: number;
  total?: number;
}

export default function AchievementsScreen({ navigation }: any) {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_badges')
        .select('*, badges(*)')
        .eq('user_id', user?.id);

      if (error) throw error;

      // Transform data
      const badgeData =
        data?.map((item: any) => ({
          id: item.badges.id,
          name: item.badges.name,
          description: item.badges.description,
          icon: item.badges.icon,
          category: item.badges.category,
          earned_at: item.earned_at,
          progress: item.progress,
          total: item.badges.requirement_count,
        })) || [];

      setBadges(badgeData);
    } catch (error) {
      console.error('Error loading badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareBadge = async (badge: Badge) => {
    try {
      await Share.share({
        message: `I just earned the "${badge.name}" badge on Elevate! ${badge.description}`,
      });
    } catch (error) {
      console.error('Error sharing badge:', error);
    }
  };

  const filteredBadges = badges.filter((badge) => {
    if (filter === 'earned') return badge.earned_at !== null;
    if (filter === 'locked') return badge.earned_at === null;
    return true;
  });

  const earnedCount = badges.filter((b) => b.earned_at).length;
  const totalCount = badges.length;
  const completionPercentage =
    totalCount > 0 ? (earnedCount / totalCount) * 100 : 0;

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      learning: 'book',
      completion: 'checkmark-circle',
      streak: 'flame',
      social: 'people',
      milestone: 'trophy',
    };
    return icons[category] || 'star';
  };

  const renderBadge = (badge: Badge) => {
    const isEarned = badge.earned_at !== null;
    const progress = badge.progress || 0;
    const total = badge.total || 1;
    const progressPercentage = (progress / total) * 100;

    return (
      <TouchableOpacity
        key={badge.id}
        style={[styles.badgeCard, !isEarned && styles.badgeCardLocked]}
        onPress={() => isEarned && shareBadge(badge)}
      >
        <View style={styles.badgeIconContainer}>
          <Ionicons
            name={getCategoryIcon(badge.category) as any}
            size={48}
            color={isEarned ? '#4F46E5' : '#9CA3AF'}
          />
          {isEarned && (
            <View style={styles.earnedBadge}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
          )}
        </View>

        <View style={styles.badgeInfo}>
          <Text style={[styles.badgeName, !isEarned && styles.badgeNameLocked]}>
            {badge.name}
          </Text>
          <Text style={styles.badgeDescription}>{badge.description}</Text>

          {!isEarned && badge.progress !== undefined && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {progress}/{total}
              </Text>
            </View>
          )}

          {isEarned && badge.earned_at && (
            <Text style={styles.earnedDate}>
              Earned {new Date(badge.earned_at).toLocaleDateString()}
            </Text>
          )}
        </View>

        {isEarned && (
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => shareBadge(badge)}
          >
            <Ionicons name="share-social" size={20} color="#4F46E5" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <AppHeader title="Achievements" showBack />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Loading achievements...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Achievements" showBack />

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{earnedCount}</Text>
          <Text style={styles.statLabel}>Earned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalCount - earnedCount}</Text>
          <Text style={styles.statLabel}>Locked</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {Math.round(completionPercentage)}%
          </Text>
          <Text style={styles.statLabel}>Complete</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'all' && styles.filterButtonTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'earned' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('earned')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'earned' && styles.filterButtonTextActive,
            ]}
          >
            Earned
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'locked' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('locked')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'locked' && styles.filterButtonTextActive,
            ]}
          >
            Locked
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredBadges.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="trophy-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyStateText}>
              {filter === 'earned'
                ? 'No badges earned yet'
                : filter === 'locked'
                  ? 'All badges unlocked!'
                  : 'No badges available'}
            </Text>
          </View>
        ) : (
          filteredBadges.map(renderBadge)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4F46E5',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  badgeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeCardLocked: {
    opacity: 0.6,
  },
  badgeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  earnedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  badgeNameLocked: {
    color: '#9CA3AF',
  },
  badgeDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  earnedDate: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
});
